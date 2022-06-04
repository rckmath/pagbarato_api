import { injectable } from 'inversify';

import { db as _db } from '@database/index';
import { Prisma } from '@prisma/client';

import { IPriceRepository, IPrice } from './price.interface';
import { PriceCreateDto, PriceFindManyDto, PriceFindManyByRangeDto, PriceUpdateDto } from './dtos';

@injectable()
export class PriceRepository implements IPriceRepository {
  async create(item: PriceCreateDto): Promise<IPrice> {
    return _db.price.create({
      data: {
        userId: item.userId,
        productId: item.productId,
        establishmentId: item.establishmentId,
        type: item.type,
        expiresAt: item.expiresAt,
        value: new Prisma.Decimal(item.value),
        isProductWithNearExpirationDate: item.isProductWithNearExpirationDate,
      },
    });
  }

  async update(id: string, item: PriceUpdateDto): Promise<void> {
    await _db.price.update({
      where: { id },
      data: {
        userId: item.userId,
        productId: item.productId,
        establishmentId: item.establishmentId,
        type: item.type,
        expiresAt: item.expiresAt,
        value: item.value ? new Prisma.Decimal(item.value) : undefined,
        isProductWithNearExpirationDate: item.isProductWithNearExpirationDate,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await _db.price.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: PriceFindManyDto): Promise<Array<IPrice>> {
    return _db.price.findMany({
      skip: searchParameters.paginate ? searchParameters.skip : undefined,
      take: searchParameters.paginate ? searchParameters.pageSize : undefined,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });
  }

  // async findByRange(searchParameters: PriceFindManyByRangeDto): Promise<Array<IPrice>> {
  //   const where = Prisma.sql`WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, radius * 1000) `
  // }

  async count(searchParameters: PriceFindManyDto): Promise<number> {
    return _db.price.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });
  }

  async findOne(id: string): Promise<IPrice | null> {
    return _db.price.findUnique({
      where: { id },
      include: {
        establishment: true,
        product: true,
        user: true,
      },
    });
  }
}
