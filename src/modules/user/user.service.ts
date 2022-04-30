import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService, UserCreate } from './user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { UserEntity } from './user.entity';

@injectable()
export class UserService<T extends UserEntity> implements IUserService<T> {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository<UserEntity>) {}
 
  async createOne(item: UserCreate): Promise<T> {
    const userEntity = UserEntity.create(item);

    const createdUser = await this._repository.create(userEntity);

    console.log(createdUser);

    return createdUser as T;
  }
}
