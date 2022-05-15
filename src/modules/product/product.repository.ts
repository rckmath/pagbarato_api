import { injectable } from 'inversify';

import { PrismaService } from '@database/prisma';

import { IProductRepository, IProduct } from './product.interface';
import { ProductCreateDto, ProductFindManyDto, ProductUpdateDto } from './dtos';

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async create(item: ProductCreateDto): Promise<IProduct> {
    const product = await this._prisma.product.create({
      data: {
        name: item.name,
      },
    });

    return product;
  }

  async update(id: string, item: ProductUpdateDto): Promise<void> {
    await this._prisma.product.update({
      where: { id },
      data: {
        name: item.name,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await this._prisma.product.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: ProductFindManyDto): Promise<Array<IProduct>> {
    const products = await this._prisma.product.findMany({
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

    return products;
  }

  async count(searchParameters: ProductFindManyDto): Promise<number> {
    const productCount = await this._prisma.product.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        id: { in: searchParameters.id },
        name: { contains: searchParameters.name },
      },
    });

    return productCount;
  }

  async findOne(id: string): Promise<IProduct | null> {
    const foundProduct: IProduct | null = await this._prisma.product.findUnique({ where: { id } });
    if (!foundProduct) return null;
    return foundProduct as IProduct;
  }
}
