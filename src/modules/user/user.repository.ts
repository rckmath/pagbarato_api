import { injectable } from 'inversify';

import { db as _db } from '@database/index';
import { Prisma } from '@prisma/client';

import { IUserRepository, IUser } from './user.interface';
import { UserCreateDto, UserFindManyDto, UserFindOneDto, UserUpdateDto } from './dtos';

@injectable()
export class UserRepository implements IUserRepository {
  async create(item: UserCreateDto): Promise<IUser> {
    return _db.user.create({
      data: {
        name: item.name,
        email: item.email,
        birthDate: item.birthDate,
        firebaseId: item.firebaseId as string,
        role: item.role,
      },
    });
  }

  async update(id: string, item: UserUpdateDto): Promise<void> {
    await _db.user.update({
      where: { id },
      data: {
        name: item.name,
        email: item.email,
        birthDate: item.birthDate,
        role: item.role ?? undefined,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await _db.user.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: UserFindManyDto): Promise<Array<IUser>> {
    return _db.user.findMany({
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
  }

  async count(searchParameters: UserFindManyDto): Promise<number> {
    return _db.user.count({
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
  }

  async findOne(item: UserFindOneDto): Promise<IUser | null> {
    return _db.user.findUnique({
      where: {
        id: item.id,
        email: item.email,
        firebaseId: item.firebaseId,
      },
    });
  }
}
