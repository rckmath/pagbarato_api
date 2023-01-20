import { injectable } from 'inversify';

import { db as _db } from '@database/index';
import { Price, Prisma } from '@prisma/client';

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
        thumbsUp: item.thumbsUp,
        thumbsDown: item.thumbsDown,
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
        userId: { in: searchParameters.userId?.length ? searchParameters.userId : undefined },
        product: { isNot: null },
        establishment: { isNot: null },
      },
      ...(searchParameters.includeDetails && {
        include: {
          establishment: true,
          product: true,
          user: true,
        },
      }),
    });
  }

  async findByRange(searchParameters: PriceFindManyByRangeDto): Promise<Array<IPrice>> {
    let response: IPrice[] = [];

    const { latitude, longitude, radius, productIdList, lowestOnly } = searchParameters;

    const select = !lowestOnly
      ? Prisma.sql`SELECT "Price"."id", "Price".* FROM "Price" `
      : Prisma.sql`SELECT DISTINCT ON("Price"."productId") "Price"."id", "Price"."productId", "Price"."establishmentId", "Price"."value", "Price"."thumbsUp", "Price"."thumbsDown" FROM "Price"`;

    const join = Prisma.sql`INNER JOIN "Establishment" ON "Price"."establishmentId"="Establishment"."id" `;

    const where = Prisma.sql`WHERE "Price"."productId" IN (${Prisma.join(
      productIdList.map((x) => x)
    )}) AND ST_DWithin(ST_MakePoint("Establishment"."longitude","Establishment"."latitude"), ST_MakePoint(${longitude}, ${latitude})::geography, ${radius} * 1) `;

    const order = !lowestOnly ? Prisma.sql`ORDER BY "Price"."value" ASC ` : Prisma.sql`ORDER BY "Price"."productId", "Price"."value" ASC `;

    const limit = lowestOnly ? Prisma.sql`LIMIT ${productIdList.length}` : Prisma.empty;

    response = await _db.$queryRaw<Price[]>(
      Prisma.sql`${select}
        ${join}
        ${where}
        ${order}
        ${limit}`
    );

    return response;
  }

  async count(searchParameters: PriceFindManyDto): Promise<number> {
    return _db.price.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
        createdAt: {
          gte: searchParameters.fromDate,
          lte: searchParameters.toDate,
        },
        product: { isNot: null },
        establishment: { isNot: null },
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
