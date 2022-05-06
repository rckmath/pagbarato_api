import { UserCreateDto, UserDto, UserFindOneDto } from './dtos';
import { UserEntity } from './user.entity';
import { UserRoleType } from './user.enum';

export type User = {
  id: string;
  name: string;
  createdAt: Date;
};

export type UserComplete = User & {
  email: string;
  role: UserRoleType;
  birthDate: Date | null;
  updatedAt: Date;
};

export interface IUserService<T extends UserDto> {
  createOne(item: UserCreateDto): Promise<T | null>;
  findOne(item: UserFindOneDto): Promise<T | null>;
}

export interface IUserRepository<T extends UserEntity> {
  create(item: Partial<T>): Promise<User>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  find(item: Partial<T>): Promise<User[]>;
  findOne(id: string): Promise<UserComplete | null>;
}
