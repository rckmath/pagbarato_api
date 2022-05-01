import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService } from './user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserDto } from './dtos';
import FirebaseClient from '@root/src/shared/infra/firebase';

@injectable()
export class UserService<T extends UserDto> implements IUserService<T> {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository<UserEntity>) {}

  async createOne(user: UserCreateDto): Promise<T> {
    const userFirebase = await FirebaseClient.auth().createUser({
      email: user.email,
      displayName: user.name,
      password: user.password,
    });

    user.firebaseId = userFirebase.uid;

    const userEntity = UserEntity.create(user);

    const createdUser = await this._repository.create(userEntity);

    return UserDto.from(createdUser) as T;
  }
}
