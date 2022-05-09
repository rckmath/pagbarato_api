import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { UserEntity } from './user.entity';
import { IUserRepository, User, UserComplete } from './user.interface';
import { UserRoleType as PrismaUserRoleType } from '@prisma/client';
import FirebaseClient from '@infra/firebase';

@injectable()
export class UserRepository<T> implements IUserRepository<UserEntity> {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: UserEntity): Promise<User> {
    const userCreated = await this._prisma.user.create({
      data: {
        name: item.name,
        birthDate: item.birthDate,
        firebaseId: item.firebaseId,
        role: item.role as PrismaUserRoleType,
      },
    });

    return {
      id: userCreated.id,
      name: userCreated.name,
      createdAt: userCreated.createdAt,
    };
  }

  async update(_id: string, _item: Partial<T>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(_id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async find(_item: Partial<T>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: string): Promise<UserComplete | null> {
    const foundUser = await this._prisma.user.findUnique({ where: { id } });

    if (!foundUser) return foundUser;

    const userFirebase = await FirebaseClient.auth().getUser(foundUser.firebaseId);

    return {
      id: foundUser.id,
      role: foundUser.role,
      name: foundUser.name,
      email: userFirebase.email || '',
      createdAt: foundUser.createdAt,
      birthDate: foundUser.birthDate,
      updatedAt: foundUser.updatedAt,
    };
  }
}
