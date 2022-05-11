import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { UserDto } from './dtos';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { IUserRepository, IUserService } from './user.interface';

export class UserDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IUserService<UserDto>>(TYPES.IUserService).to(UserService);
      bind<IUserRepository<UserEntity>>(TYPES.IUserRepository).to(UserRepository);
    });
  }
}
