import { ProductCreateDto, ProductFindManyDto, ProductFindOneDto, ProductDeleteDto, ProductUpdateDto, ProductDto } from './dtos';
import { ProductUnitType } from './product.enum';

export interface IProduct {
  id: string;
  name: string;
  unit: ProductUnitType;
  createdAt: Date;
  updatedAt: Date;
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
  create(item: ProductCreateDto): Promise<IProduct>;
  find(searchParameters: ProductFindManyDto): Promise<Array<IProduct>>;
  findOne(id: IProduct['id']): Promise<IProduct | null>;
  update(id: string, item: ProductUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
  count(searchParameters: ProductFindManyDto): Promise<number>;
}
