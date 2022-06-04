import { inject, injectable } from 'inversify';

import { Prisma, Product } from '@prisma/client';

import { db as _db } from '@database/index';
import { TYPES } from '@shared/ioc/types.ioc';

import { IProductRepository, IProduct } from './product.interface';
import { PRODUCT_DEFAULT_SEARCH_RANGE_IN_KM } from './product.enum';
import { ProductCreateDto, ProductFindManyDto, ProductUpdateDto } from './dtos';

import { IPriceRepository } from '@price/price.interface';
import { PriceFindManyByRangeDto } from '@price/dtos';

import { IEstablishmentRepository } from '@establishment/establishment.interface';
import { EstablishmentFindManyDto } from '@establishment/dtos';

const getWhereQuery = (searchParameters: ProductFindManyDto) => {
  let whereCount = 0;
  let nameWhere = Prisma.empty;
  let idWhere = Prisma.empty;
  let where = Prisma.empty;

  if (searchParameters.name) {
    nameWhere = Prisma.sql`WHERE to_tsvector(concat_ws(' ', "Product"."name")) @@ to_tsquery(${searchParameters.name}) `;
    whereCount++;
  }

  if (searchParameters.id && searchParameters.id.length) {
    const idList = searchParameters.id as string[];
    const preQuery = Prisma.sql`"Product"."id" IN (${Prisma.join(idList.map((x) => x))}) `;
    idWhere = Prisma.sql`${whereCount ? Prisma.sql`AND ${preQuery}` : Prisma.sql`WHERE ${preQuery}`} `;
    whereCount++;
  }

  where = Prisma.sql`${nameWhere}${idWhere}`;

  return where;
};

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @inject(TYPES.IPriceRepository) private readonly _priceRepository: IPriceRepository,
    @inject(TYPES.IEstablishmentRepository) private readonly _establishmentRepository: IEstablishmentRepository
  ) {}

  async findOrCreate(item: ProductCreateDto): Promise<IProduct> {
    const foundProducts = await _db.product.findMany({
      where: {
        name: { search: item.name.split(' ').join('&') },
      },
    });

    if (foundProducts.length === 1) return foundProducts[0];

    return this.create(item);
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
    let products: Array<IProduct> = [];

    const where = getWhereQuery(searchParameters);
    const order = Prisma.sql`ORDER BY "Product"."name"`;

    products = await _db.$queryRaw<Product[]>(
      Prisma.sql`SELECT * from "Product"
      ${where}
      ${order}
      ${searchParameters.orderDescending ? Prisma.sql`DESC` : Prisma.sql`ASC`}
      ${searchParameters.paginate ? Prisma.sql`LIMIT ${searchParameters.pageSize} OFFSET ${searchParameters.skip}` : Prisma.empty}`
    );

    if (!searchParameters.priceFiltering) return products;

    const productsLowestPrice = await this._priceRepository.findByRange(
      PriceFindManyByRangeDto.from({
        lowestOnly: true,
        productIdList: products.map((x) => x.id),
        latitude: searchParameters.usersLatitude as number,
        longitude: searchParameters.usersLongitude as number,
        radius: searchParameters.rangeRadius ?? PRODUCT_DEFAULT_SEARCH_RANGE_IN_KM,
      })
    );

    const productsEstablishmentsLowestPrice = await this._establishmentRepository.find(
      EstablishmentFindManyDto.from({
        paginate: false,
        id: productsLowestPrice.map((price) => price.establishmentId as string).join(','),
      })
    );

    productsLowestPrice.forEach(
      (price) => (price.establishment = productsEstablishmentsLowestPrice.find(({ id }) => id === price.establishmentId))
    );

    products = products.map((x) => {
      const price = productsLowestPrice.find(({ productId }) => productId === x.id);
      if (!price) return x;
      return {
        ...x,
        lowestPrice: price?.value ? parseFloat(new Prisma.Decimal(price.value).toNumber().toFixed(2)) : undefined,
        lowestPriceEstablishment: price?.establishment?.name,
      };
    }).filter(x => x.lowestPrice);

    return products;
  }

  async count(searchParameters: ProductFindManyDto): Promise<number> {
    return _db.product.count({
      where: {
        name: { search: searchParameters.name },
        id: { in: searchParameters.id?.length ? searchParameters.id : undefined },
      },
    });
  }

  async findOne(id: string): Promise<IProduct | null> {
    let product: IProduct | null = null;
    
    product = await _db.product.findUnique({
      where: { id },
      include: {
        prices: {
          orderBy: { value: 'asc' },
          include: { establishment: true },
        },
      },
    });

    return product;

     // if (!product) return null;
 // 
     // const productNearPrices = await this._priceRepository.findByRange(
     //   PriceFindManyByRangeDto.from({
     //     lowestOnly: false,
     //     productIdList: [product.id],
     //     latitude: searchParameters.usersLatitude as number,
     //     longitude: searchParameters.usersLongitude as number,
     //     radius: searchParameters.rangeRadius ?? PRODUCT_DEFAULT_SEARCH_RANGE_IN_KM,
     //   })
     // );
 // 
     // const productsEstablishmentsLowestPrice = await this._establishmentRepository.find(
     //   EstablishmentFindManyDto.from({
     //     paginate: false,
     //     id: productNearPrices.map((price) => price.establishmentId as string).join(','),
     //   })
     // );
 // 
     // productNearPrices.forEach(
     //   (price) => (price.establishment = productsEstablishmentsLowestPrice.find(({ id }) => id === price.establishmentId))
     // );
 // 
     // return product;
  }
}
