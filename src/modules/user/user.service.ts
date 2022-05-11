import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService } from './user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserDto, UserFindOneDto } from './dtos';

import FirebaseClient from '@infra/firebase';
import { FirebaseIntegrationException, NotFoundException } from '@shared/errors';
import { FIREBASE_ERROR_MESSAGE } from './user.errors';

@injectable()
export class UserService<T extends UserDto> implements IUserService<T> {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository<UserEntity>) {}

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

  async createOne(user: UserCreateDto): Promise<T | null> {
    const firebaseId: string = await this.createUserOnFirebase(user);
    const userEntity = UserEntity.create({ ...user, firebaseId });
    const response = await this._repository.create(userEntity);
    return this.findOne({ id: response.id });
  }

  async findOne(user: UserFindOneDto): Promise<T | null> {
    const foundUser = await this._repository.findOne(user.id);
    if (!foundUser) throw new NotFoundException('User');
    return UserDto.from(foundUser) as T;
  }
}
