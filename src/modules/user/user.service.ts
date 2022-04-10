import { inject, injectable } from 'inversify';

import { IUserRepository, IUserService } from './user.interface';
import { UserEntity } from './user.entity';
import { TYPES } from '@shared/ioc/types.ioc';

@injectable()
export class UserService<T extends UserEntity> implements IUserService<T> {
  constructor(@inject(TYPES.IUserRepository) private readonly _repository: IUserRepository<T>) {}

  async createOne(item: T): Promise<T> {
    return this._repository.create(item);
  }

  async getById(_id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
