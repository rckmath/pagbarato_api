import { inject, injectable } from 'inversify';

import { IProductRepository, IProductService } from './product.interface';
import { ProductCreateDto, ProductDeleteDto, ProductDto, ProductFindManyDto, ProductFindOneDto, ProductUpdateDto } from './dtos';

import { IUserRepository } from '@user/user.interface';

import { TYPES } from '@shared/ioc/types.ioc';
import { NotFoundException } from '@shared/errors';

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository) private readonly _repository: IProductRepository,
    @inject(TYPES.IUserRepository) private readonly _userRepository: IUserRepository
  ) {}

  async createOne(product: ProductCreateDto): Promise<ProductDto> {
    const response = await this._repository.create(product);
    return this.findOne({
      id: response.id,
      rangeFiltering: false,
    });
  }

  async findOne(searchParameters: ProductFindOneDto): Promise<ProductDto> {
    const foundProduct = await this._repository.findOne(searchParameters);
    if (!foundProduct) throw new NotFoundException('Product');
    return ProductDto.from(foundProduct);
  }

  async findMany(searchParameters: ProductFindManyDto): Promise<Array<ProductDto>> {
    const foundProducts = await this._repository.find(searchParameters);
    return ProductDto.fromMany(foundProducts);
  }

  async count(searchParameters: ProductFindManyDto): Promise<number> {
    return this._repository.count(searchParameters);
  }

  async updateOne(item: ProductUpdateDto): Promise<void> {
    await this.findOne({ id: item.id, rangeFiltering: false });
    return this._repository.update(item.id, item);
  }

  async delete(item: ProductDeleteDto): Promise<void> {
    const idList = item.id as Array<string>;
    const productList = await Promise.all(idList.map(async (id) => this._repository.findOne({ id, rangeFiltering: false })));
    if (productList.length) await this._repository.delete(idList);
  }
}
