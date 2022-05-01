import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { UserEntity } from './user.entity';
import { IUser, IUserRepository } from './user.interface';
import { UserRoleType as PrismaUserRoleType } from '@prisma/client';
import FirebaseClient from '@root/src/shared/infra/firebase';

@injectable()
export class UserRepository<T> implements IUserRepository<UserEntity> {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: UserEntity): Promise<IUser> {
    const userCreated = await this._prisma.user.create({
      data: {
        name: item.name,
        birthDate: item.birthDate,
        firebaseId: item.firebaseId,
        role: item.role as PrismaUserRoleType,
      },
    });

    const userFirebase = await FirebaseClient.auth().getUser(userCreated.firebaseId);

    return {
      id: userCreated.id,
      name: userCreated.name,
      role: userCreated.role,
      email: userFirebase.email ?? '',
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
      birthDate: userCreated.birthDate,
    };
  }

  async update(_id: string, _item: Partial<T>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(_id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async find(_item: Partial<T>): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(_id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
