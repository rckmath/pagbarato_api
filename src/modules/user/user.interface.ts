import { Prisma } from '@prisma/client';
import { UserCreateDto, UserFindManyDto, UserFindOneDto, UserDeleteDto, UserUpdateDto, UserDto } from './dtos';
import { UserRoleType } from './user.enum';

export interface IUser {
  id: string;
  firebaseId: string;
  name: string;
  email: string;
  preferredSearchRange: Prisma.Decimal;
  role: UserRoleType;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserService {
  createOne(item: UserCreateDto): Promise<UserDto>;
  findOne(item: UserFindOneDto): Promise<UserDto>;
  findMany(searchParameters: UserFindManyDto): Promise<Array<UserDto>>;
  updateOne(item: UserUpdateDto): Promise<void>;
  delete(item: UserDeleteDto): Promise<void>;
  count(searchParameters: UserFindManyDto): Promise<number>;
}

export interface IUserRepository {
  create(item: UserCreateDto): Promise<Partial<IUser>>;
  find(searchParameters: UserFindManyDto): Promise<Array<IUser>>;
  findOne(id: IUser['id']): Promise<IUser | null>;
  update(id: string, item: UserUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
  count(searchParameters: UserFindManyDto): Promise<number>;
}
