import { inject, injectable } from 'inversify';

import { IPriceRepository, IPriceService } from './price.interface';
import { PriceCreateDto, PriceDeleteDto, PriceDto, PriceFindManyDto, PriceFindOneDto, PriceUpdateDto } from './dtos';

import { TYPES } from '@shared/ioc/types.ioc';
import { NotFoundException } from '@shared/errors';

@injectable()
export class PriceService implements IPriceService {
  constructor(@inject(TYPES.IPriceRepository) private readonly _repository: IPriceRepository) {}

  async createOne(price: PriceCreateDto): Promise<PriceDto> {
    const response = await this._repository.create(price);
    return this.findOne({ id: response.id as string });
  }

  async findOne(price: PriceFindOneDto): Promise<PriceDto> {
    const foundPrice = await this._repository.findOne(price.id);
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

  async updateOne(item: PriceUpdateDto): Promise<void> {
    await this.findOne({ id: item.id });
    return this._repository.update(item.id, item);
  }

  async delete(item: PriceDeleteDto): Promise<void> {
    const idList = item.id as Array<string>;
    const priceList = await Promise.all(idList.map(async (id) => this._repository.findOne(id)));
    if (priceList.length) await this._repository.delete(idList);
  }
}
