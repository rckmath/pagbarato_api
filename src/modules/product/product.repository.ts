import { injectable } from 'inversify';

import { db as _db } from '@database/index';

import { IProductRepository, IProduct } from './product.interface';
import { ProductCreateDto, ProductFindManyDto, ProductUpdateDto } from './dtos';

@injectable()
export class ProductRepository implements IProductRepository {
  async findOrCreate(item: ProductCreateDto): Promise<IProduct> {
    return _db.product.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        unit: item.unit,
      },
    });
  }

  async create(item: ProductCreateDto): Promise<IProduct> {
    return _db.product.create({
      data: {
        name: item.name,
        unit: item.unit,
      },
    });
  }

  async update(id: string, item: ProductUpdateDto): Promise<void> {
    await _db.product.update({
      where: { id },
      data: {
        name: item.name,
        unit: item.unit,
      },
    });
  }

  async delete(idList: Array<string>): Promise<void> {
    await _db.product.deleteMany({ where: { id: { in: idList } } });
  }

  async find(searchParameters: ProductFindManyDto): Promise<Array<IProduct>> {
    return _db.product.findMany({
      skip: searchParameters.paginate ? searchParameters.skip : undefined,
      take: searchParameters.paginate ? searchParameters.pageSize : undefined,
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });
  }

  async count(searchParameters: ProductFindManyDto): Promise<number> {
    return _db.product.count({
      orderBy: {
        [`${searchParameters.orderBy}`]: searchParameters.orderDescending ? 'desc' : 'asc',
      },
      where: {
        name: { contains: searchParameters.name },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });
  }

  async findOne(id: string): Promise<IProduct | null> {
    return _db.product.findUnique({
      where: { id },
      include: {
        prices: {
          orderBy: {
            value: 'asc',
          },
          include: {
            establishment: true,
          },
        },
      },
    });
  }
}
