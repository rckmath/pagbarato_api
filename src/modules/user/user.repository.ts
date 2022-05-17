import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IUserRepository, IUser } from './user.interface';
import { Prisma } from '@prisma/client';
import { UserCreateDto, UserFindManyDto, UserUpdateDto } from './dtos';

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
        role: item.role,
        preferredSearchRangeInKm: new Prisma.Decimal(item.preferredSearchRangeInKm),
      },
    });

    return user as Partial<IUser>;
  }

  async update(id: string, item: UserUpdateDto): Promise<void> {
    await this._prisma.user.update({
      where: { id },
      data: {
        name: item.name,
        email: item.email,
        birthDate: item.birthDate,
        role: item.role ?? undefined,
        preferredSearchRangeInKm: item.preferredSearchRangeInKm ? new Prisma.Decimal(item.preferredSearchRangeInKm) : undefined,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await this._prisma.user.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: UserFindManyDto): Promise<Array<IUser>> {
    console.log(searchParameters);

    const users = await this._prisma.user.findMany({
      skip: searchParameters.skip,
      take: searchParameters.pageSize,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        email: { contains: searchParameters.email },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
        role: { in: searchParameters.role?.length ? searchParameters.role : undefined },
      },
    });

    return users;
  }

  async count(searchParameters: UserFindManyDto): Promise<number> {
    const userCount = await this._prisma.user.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        email: { contains: searchParameters.email },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
        role: { in: searchParameters.role?.length ? searchParameters.role : undefined },
      },
    });

    return userCount;
  }

  async findOne(id: string): Promise<IUser | null> {
    const foundUser: IUser | null = await this._prisma.user.findUnique({ where: { id } });
    return foundUser as IUser;
  }
}
