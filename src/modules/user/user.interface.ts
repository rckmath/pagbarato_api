import { UserCreateDto, UserDto } from './dtos';
import { UserEntity } from './user.entity';
import { UserRoleType } from './user.enum';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserService<T extends UserDto> {
  createOne(item: UserCreateDto): Promise<T>;
}

export interface IUserRepository<T extends UserEntity> {
  create(item: Partial<T>): Promise<IUser>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  find(item: Partial<T>): Promise<IUser[]>;
  findOne(id: string): Promise<IUser>;
}
