import { PriceDto } from '@price/dtos';

import { ProductUnitType } from '../product.enum';
import { IProduct } from '../product.interface';

export default class ProductDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unit: ProductUnitType,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
    public readonly prices?: Array<PriceDto>,
    public readonly lowestPrice?: number | null
  ) {}

  static from(product: IProduct) {
    const prices = product.prices?.length ? PriceDto.fromMany(product.prices) : [];
    const lowestPrice = prices?.length ? prices[0].value : null;
    return new ProductDto(product.id, product.name, product.unit, product.createdAt, product.updatedAt, prices, lowestPrice);
  }

  static fromMany(products: Array<IProduct>): Array<ProductDto> {
    return products.map((product) => ProductDto.from(product));
  }
}
