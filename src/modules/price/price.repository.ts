import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IPriceRepository, IPrice } from './price.interface';
import { PriceCreateDto, PriceFindManyDto, PriceUpdateDto } from './dtos';
import { Prisma } from '@prisma/client';

@injectable()
export class PriceRepository implements IPriceRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: PriceCreateDto): Promise<IPrice> {
    const price = await this._prisma.price.create({
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

    return price;
  }

  async update(id: string, item: PriceUpdateDto): Promise<void> {
    await this._prisma.price.update({
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
    await this._prisma.price.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: PriceFindManyDto): Promise<Array<IPrice>> {
    const prices = await this._prisma.price.findMany({
      skip: searchParameters.skip,
      take: searchParameters.pageSize,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });

    return prices;
  }

  async count(searchParameters: PriceFindManyDto): Promise<number> {
    const priceCount = await this._prisma.price.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });

    return priceCount;
  }

  async findOne(id: string): Promise<IPrice | null> {
    const foundPrice: IPrice | null = await this._prisma.price.findUnique({ where: { id } });
    if (!foundPrice) return null;
    return foundPrice as IPrice;
  }
}
