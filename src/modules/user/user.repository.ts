import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { UserEntity } from './user.entity';
import { IUserRepository } from './user.interface';

@injectable()
export class UserRepository<T extends UserEntity> implements IUserRepository<T> {
  constructor(private readonly _prisma: PrismaService) {}

  async create(_item: T): Promise<T> {
    throw new Error('Method not implemented.');
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
