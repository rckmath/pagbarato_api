import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IUserRepository, IUser } from './user.interface';
import { UserRoleType as PrismaUserRoleType } from '@prisma/client';
import { UserCreateDto } from './dtos';

@injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: UserCreateDto): Promise<Partial<IUser>> {
    const user = await this._prisma.user.create({
      data: {
        name: item.name,
        email: item.email,
        birthDate: item.birthDate,
        firebaseId: item.firebaseId as string,
        role: item.role as PrismaUserRoleType,
      },
    });

    return user as Partial<IUser>;
  }

  async update(_id: string, _item: Partial<IUser>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(idList: Array<string>): Promise<void> {
    await this._prisma.user.deleteMany({ where: { id: { in: idList } } });
  }

  async find(_item: Partial<IUser>): Promise<Array<IUser>> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: string): Promise<IUser | null> {
    const foundUser: IUser | null = await this._prisma.user.findUnique({ where: { id } });
    if (!foundUser) return null;
    return foundUser as IUser;
  }
}
