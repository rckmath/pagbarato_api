import { UserCreateDto, UserFindManyDto, UserFindOneDto, UserDeleteDto, UserUpdateDto, UserDto } from './dtos';
import { UserRoleType } from './user.enum';

export interface IUser {
  id: string;
  firebaseId: string;
  name: string;
  createdAt: Date;
  email: string;
  role: UserRoleType;
  birthDate: Date | null;
  updatedAt: Date;
}

export interface IUserService {
  createOne(item: UserCreateDto): Promise<UserDto>;
  findOne(item: UserFindOneDto): Promise<UserDto>;
  findMany(item: UserFindManyDto): Promise<Array<UserDto>>;
  updateOne(item: UserUpdateDto): Promise<void>;
  delete(item: UserDeleteDto): Promise<void>;
}

export interface IUserRepository {
  create(item: UserCreateDto): Promise<Partial<IUser>>;
  find(item: Partial<IUser>): Promise<Array<IUser>>;
  findOne(id: IUser['id']): Promise<IUser | null>;
  update(id: string, item: UserUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
}
