import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IUserRepository } from './user.interface';
import { UserEntity } from './user.entity';

import { UserRoleType as PrismaUserRoleType } from '@prisma/client';

@injectable()
export class UserRepository<T extends UserEntity> implements IUserRepository<T> {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: T): Promise<T> {
      const userCreated = await this._prisma.user.create({
        data: {
          name: item.name,
          email: item.email,
          birthDate: item.birthDate,
          password: item.password,
          role: item.role as PrismaUserRoleType,
        },
      });
      
      return userCreated as T;
  }

  async update(_id: string, _item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(_id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async find(_item: T): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(_id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
