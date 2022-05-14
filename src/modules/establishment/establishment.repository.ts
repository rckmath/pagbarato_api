import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IEstablishmentRepository, IEstablishment } from './establishment.interface';
import { Prisma } from '@prisma/client';
import { EstablishmentCreateDto, EstablishmentFindManyDto, EstablishmentUpdateDto } from './dtos';

@injectable()
export class EstablishmentRepository implements IEstablishmentRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: EstablishmentCreateDto): Promise<IEstablishment> {
    const establishment = await this._prisma.establishment.create({
      data: {
        name: item.name,
        latitude: new Prisma.Decimal(item.latitude),
        longitude: new Prisma.Decimal(item.longitude),
      },
    });

    return establishment;
  }

  async update(id: string, item: EstablishmentUpdateDto): Promise<void> {
    await this._prisma.establishment.update({
      where: { id },
      data: {
        name: item.name,
        latitude: item.latitude ? new Prisma.Decimal(item.latitude) : undefined,
        longitude: item.longitude ? new Prisma.Decimal(item.longitude) : undefined,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await this._prisma.establishment.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: EstablishmentFindManyDto): Promise<Array<IEstablishment>> {
    const establishments = await this._prisma.establishment.findMany({
      skip: searchParameters.skip,
      take: searchParameters.pageSize,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id },
        name: { contains: searchParameters.name },
      },
    });

    return establishments;
  }

  async count(searchParameters: EstablishmentFindManyDto): Promise<number> {
    const establishmentCount = await this._prisma.establishment.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id },
        name: { contains: searchParameters.name },
      },
    });

    return establishmentCount;
  }

  async findOne(id: string): Promise<IEstablishment | null> {
    const foundEstablishment: IEstablishment | null = await this._prisma.establishment.findUnique({ where: { id } });
    if (!foundEstablishment) return null;
    return foundEstablishment as IEstablishment;
  }
}
