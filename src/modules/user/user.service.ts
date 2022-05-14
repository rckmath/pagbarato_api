import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService } from './user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { UserCreateDto, UserDeleteDto, UserDto, UserFindManyDto, UserFindOneDto, UserUpdateDto } from './dtos';

import FirebaseClient from '@infra/firebase';
import { FirebaseIntegrationException, NotFoundException } from '@shared/errors';
import { FIREBASE_ERROR_MESSAGE } from './user.errors';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository) {}
  async createUserOnFirebase(user: UserCreateDto): Promise<string> {
    let firebaseUserId = null;

    try {
      const firebaseUser = await FirebaseClient.auth().createUser({
        email: user.email,
        displayName: user.name,
        password: user.password,
      });

      if (!firebaseUser) {
        throw new FirebaseIntegrationException({ message: FIREBASE_ERROR_MESSAGE.USER_CREATION });
      }

      firebaseUserId = firebaseUser.uid;
    } catch (err: any) {
      throw new FirebaseIntegrationException(err);
    }

    return firebaseUserId;
  }

  async createOne(user: UserCreateDto): Promise<UserDto> {
    user.firebaseId = await this.createUserOnFirebase(user);
    const response = await this._repository.create(user);
    return this.findOne({ id: response.id as string });
  }

  async findOne(user: UserFindOneDto): Promise<UserDto> {
    const foundUser = await this._repository.findOne(user.id);
    if (!foundUser) throw new NotFoundException('User');
    return UserDto.from(foundUser);
  }

  async findMany(searchParameters: UserFindManyDto): Promise<Array<UserDto>> {
    const foundUsers = await this._repository.find(searchParameters);
    return UserDto.fromMany(foundUsers);
  }

  async count(searchParameters: UserFindManyDto): Promise<number> {
    return this._repository.count(searchParameters);
  }

  async updateOne(item: UserUpdateDto): Promise<void> {
    await this.findOne({ id: item.id });
    return this._repository.update(item.id, item);
  }

  async delete(item: UserDeleteDto): Promise<void> {
    const idList = item.id as Array<string>;

    const userList = await Promise.all(idList.map(async (id) => this._repository.findOne(id)));

    if (userList.length) {
      const firebasePromises = userList.map(async (user) => {
        if (user) return FirebaseClient.auth().deleteUser(user.firebaseId);
      });

      await Promise.all([...firebasePromises, this._repository.delete(idList)]);
    }
  }
}
