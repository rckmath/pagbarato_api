import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { IUserRepository, IUserService } from './user.interface';

export class UserDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IUserService>(TYPES.IUserService).to(UserService);
      bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
    });
  }
}
