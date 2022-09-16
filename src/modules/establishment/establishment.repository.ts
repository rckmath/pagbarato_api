import { injectable } from 'inversify';

import { db as _db } from '@database/index';

import { IEstablishmentRepository, IEstablishment } from './establishment.interface';
import { Prisma } from '@prisma/client';
import { EstablishmentCreateDto, EstablishmentFindManyDto, EstablishmentUpdateDto } from './dtos';

@injectable()
export class EstablishmentRepository implements IEstablishmentRepository {
  async create(item: EstablishmentCreateDto): Promise<IEstablishment> {
    console.log(item)
    const establishment = await _db.establishment.create({
      data: {
        name: item.name,
        latitude: new Prisma.Decimal(item.latitude),
        longitude: new Prisma.Decimal(item.longitude),
        businessesHours: item.businessesHours?.length
          ? {
              createMany: {
                data: item.businessesHours.map((businessHours) => ({
                  day: businessHours.day,
                  openingAt: businessHours.openingAt,
                  closureAt: businessHours.closureAt,
                })),
              },
            }
          : undefined,
      },
      include: { businessesHours: true },
    });

    return establishment;
  }

  async update(id: string, item: EstablishmentUpdateDto): Promise<void> {
    await _db.establishment.update({
      where: { id },
      data: {
        name: item.name,
        latitude: item.latitude ? new Prisma.Decimal(item.latitude) : undefined,
        longitude: item.longitude ? new Prisma.Decimal(item.longitude) : undefined,
        businessesHours: item.businessesHours?.length
          ? {
              createMany: {
                data: item.businessesHours.map((businessHours) => ({
                  day: businessHours.day,
                  openingAt: businessHours.openingAt,
                  closureAt: businessHours.closureAt,
                })),
              },
            }
          : undefined,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await _db.establishment.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: EstablishmentFindManyDto): Promise<Array<IEstablishment>> {
    const establishments = await _db.establishment.findMany({
      skip: searchParameters.paginate ? searchParameters.skip : undefined,
      take: searchParameters.paginate ? searchParameters.pageSize : undefined,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
        createdAt: {
          gte: searchParameters.fromDate,
          lte: searchParameters.toDate,
        },
      },
    });

    return establishments;
  }

  async count(searchParameters: EstablishmentFindManyDto): Promise<number> {
    const establishmentCount = await _db.establishment.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
        createdAt: {
          gte: searchParameters.fromDate,
          lte: searchParameters.toDate,
        },
      },
    });

    return establishmentCount;
  }

  async findOne(id: string): Promise<IEstablishment | null> {
    return _db.establishment.findUnique({
      where: { id },
      include: { businessesHours: true },
    });
  }
}
