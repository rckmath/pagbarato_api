import { injectable } from 'inversify';

import { db as _db } from '@database/index';

import { IProductRepository, IProduct } from './product.interface';
import { ProductCreateDto, ProductFindManyDto, ProductUpdateDto } from './dtos';
import { Prisma, Product } from '@prisma/client';

const getWhereQuery = (searchParameters: ProductFindManyDto) => {
  let whereCount = 0;
  let nameWhere = Prisma.empty;
  let idWhere = Prisma.empty;
  let where = Prisma.empty;

  if (searchParameters.name) {
    nameWhere = Prisma.sql`WHERE to_tsvector(concat_ws(' ', "public"."Product"."name")) @@ to_tsquery(${searchParameters.name}) `;
    whereCount++;
  }

  if (searchParameters.id && searchParameters.id.length) {
    const idList = searchParameters.id as string[];
    const preQuery = Prisma.sql`"public"."Product"."id" IN (${Prisma.join(idList.map((x) => x))}) `;
    idWhere = Prisma.sql`${whereCount ? Prisma.sql`AND ${preQuery}` : Prisma.sql`WHERE ${preQuery}`} `;
    whereCount++;
  }

  where = Prisma.sql`${nameWhere}${idWhere}`;

  return where;
};

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
    const where = getWhereQuery(searchParameters);
    const order = Prisma.sql`ORDER BY "public"."Product"."updatedAt"`;

    return _db.$queryRaw<Product[]>(
      Prisma.sql`SELECT * from "Product"
      ${where}
      ${order}
      ${searchParameters.orderDescending ? Prisma.sql`DESC` : Prisma.sql`ASC`}
      ${searchParameters.paginate ? Prisma.sql`LIMIT ${searchParameters.pageSize} OFFSET ${searchParameters.skip}` : Prisma.empty}`
    );
  }

  async count(searchParameters: ProductFindManyDto): Promise<number> {
    return _db.product.count({
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
