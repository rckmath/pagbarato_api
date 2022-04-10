import { IRead } from "@database/interfaces/read.interface";
import { IWrite } from "@database/interfaces/write.interface";
import { UserEntity } from "./user.entity";

export interface IUserDto {}

export interface IUserService<T extends UserEntity> {
  createOne(item: T): Promise<T>;
  getById(id: string): Promise<T>;
}

export interface IUserRepository<T extends UserEntity> extends IWrite<T>, IRead<T> {}