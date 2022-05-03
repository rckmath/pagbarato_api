import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService, User } from './user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserDto, UserFindOneDto } from './dtos';

import FirebaseClient from '@infra/firebase';
import { FirebaseIntegrationException, NotFoundException } from '@shared/errors';

@injectable()
export class UserService<T extends UserDto> implements IUserService<T> {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository<UserEntity>) {}

  async createOne(user: UserCreateDto): Promise<T> {
    const userFirebase = await FirebaseClient.auth()
      .createUser({
        email: user.email,
        displayName: user.name,
        password: user.password,
      })
      .catch((err) => {
        throw new FirebaseIntegrationException(err.errorInfo.code, err.errorInfo.message);
      });

    const userEntity = UserEntity.create({ ...user, firebaseId: userFirebase.uid });

    const createdUser = await this._repository.create(userEntity);

    return UserDto.from(createdUser) as T;
  }

  async findOne(user: UserFindOneDto): Promise<T | null> {
    const foundUser = await this._repository.findOne(user.id);

    if (!foundUser) throw new NotFoundException('User');

    return UserDto.fromAdmin(foundUser) as T;
  }
}
