import { IRead, IWrite } from '@database/interfaces';
import { BaseAttributes } from '@database/base.type';
import { UserEntity } from './user.entity';
import { UserRoleType } from './user.enum';

export type UserCreate = {
  email: string;
  name: string;
  password: string;
  role: UserRoleType | null;
  birthDate: Date | null;
};

export type User = BaseAttributes & {
  email: string;
  name: string;
  role: UserRoleType;
  birthDate: Date | null;
};

export interface IUserService<T extends UserEntity> {
  createOne(item: UserCreate): Promise<T>;
}

export interface IUserRepository<T extends UserEntity> extends IWrite<T>, IRead<T> {}
