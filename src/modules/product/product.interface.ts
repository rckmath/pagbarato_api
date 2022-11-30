import { TrustingType } from '@price/price.enum';
import { IPrice } from '@price/price.interface';
import { ProductCreateDto, ProductFindManyDto, ProductFindOneDto, ProductDeleteDto, ProductUpdateDto, ProductDto } from './dtos';
import { ProductUnitType } from './product.enum';

export interface IProduct {
  id: string;
  name: string;
  unit: ProductUnitType;
  createdAt: Date;
  updatedAt: Date;
  lowestPrice?: number | null;
  lowestPriceEstablishment?: string | null;
  lowestPriceTrustingFactor?: TrustingType | null;
  prices?: Array<IPrice>;
}

export interface IProductService {
  createOne(item: ProductCreateDto): Promise<ProductDto>;
  findOne(item: ProductFindOneDto): Promise<ProductDto>;
  findMany(searchParameters: ProductFindManyDto): Promise<Array<ProductDto>>;
  updateOne(item: ProductUpdateDto): Promise<void>;
  delete(item: ProductDeleteDto): Promise<void>;
  count(searchParameters: ProductFindManyDto): Promise<number>;
}

export interface IProductRepository {
  findOrCreate(item: ProductCreateDto): Promise<IProduct>;
  create(item: ProductCreateDto): Promise<IProduct>;
  find(searchParameters: ProductFindManyDto): Promise<Array<IProduct>>;
  findOne(searchParameters: ProductFindOneDto): Promise<IProduct | null>;
  update(id: string, item: ProductUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
  count(searchParameters: ProductFindManyDto): Promise<number>;
}
