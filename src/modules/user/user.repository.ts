import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IUserRepository, IUser } from './user.interface';
import { UserRoleType as PrismaUserRoleType, Prisma } from '@prisma/client';
import { UserCreateDto, UserFindManyDto } from './dtos';

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
        preferredSearchRange: new Prisma.Decimal(item.preferredSearchRange),
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

  async find(searchParameters: UserFindManyDto): Promise<Array<IUser>> {
    const users = await this._prisma.user.findMany({
      skip: searchParameters.skip,
      take: searchParameters.pageSize,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id },
        name: { contains: searchParameters.name },
        email: { contains: searchParameters.email },
        role: { in: searchParameters.role as Array<PrismaUserRoleType> },
      },
    });

    return users;
  }

  async count(searchParameters: UserFindManyDto): Promise<number> {
    const userCount = await this._prisma.user.count({
      skip: searchParameters.skip,
      take: searchParameters.pageSize,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id },
        name: { contains: searchParameters.name },
        email: { contains: searchParameters.email },
        role: { in: searchParameters.role as Array<PrismaUserRoleType> },
      },
    });

    return userCount;
  }

  async findOne(id: string): Promise<IUser | null> {
    const foundUser: IUser | null = await this._prisma.user.findUnique({ where: { id } });
    if (!foundUser) return null;
    return foundUser as IUser;
  }
}
