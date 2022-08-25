import { inject, injectable } from 'inversify';

import { IPriceRepository, IPriceService } from './price.interface';
import { PriceCreateDto, PriceDeleteDto, PriceDto, PriceFindManyDto, PriceFindOneDto, PriceUpdateDto } from './dtos';

import { TYPES } from '@shared/ioc/types.ioc';
import { NotFoundException } from '@shared/errors';

import { IProductRepository } from '@product/product.interface';
import { ProductUnitType } from '@product/product.enum';

@injectable()
export class PriceService implements IPriceService {
  constructor(
    @inject(TYPES.IPriceRepository) private readonly _repository: IPriceRepository,
    @inject(TYPES.IProductRepository) private readonly _productRepository: IProductRepository
  ) {}

  async createOne(price: PriceCreateDto): Promise<PriceDto> {
    price.productId = price.productName
      ? (await this._productRepository.findOrCreate({ name: price.productName, unit: ProductUnitType.EA })).id
      : price.productId;
    const response = await this._repository.create(price);
    return this.findOne({ id: response.id });
  }

  async findOne(price: PriceFindOneDto): Promise<PriceDto> {
    const foundPrice = await this._repository.findOne(price.id as string);
    if (!foundPrice) throw new NotFoundException('Price');
    return PriceDto.from(foundPrice);
  }

  async findMany(searchParameters: PriceFindManyDto): Promise<Array<PriceDto>> {
    const foundPrices = await this._repository.find(searchParameters);
    return PriceDto.fromMany(foundPrices);
  }

  async count(searchParameters: PriceFindManyDto): Promise<number> {
    return this._repository.count(searchParameters);
  }

  async updateOne(price: PriceUpdateDto): Promise<void> {
    price.productId = price.productName
      ? (await this._productRepository.findOrCreate({ name: price.productName, unit: ProductUnitType.EA })).id
      : price.productId;
    await this.findOne({ id: price.id });
    return this._repository.update(price.id, price);
  }

  async delete(price: PriceDeleteDto): Promise<void> {
    const idList = price.id as Array<string>;
    const priceList = await Promise.all(idList.map(async (id) => this._repository.findOne(id)));
    if (priceList.length) await this._repository.delete(idList);
  }
}
