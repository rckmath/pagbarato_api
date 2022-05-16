import { MissingFieldException } from '@shared/errors';
import { ProductUnitType } from '../product.enum';

export default class ProductCreateDto {
  constructor(public readonly name: string, public readonly unit: ProductUnitType) {}

  static from(body: Partial<ProductCreateDto>) {
    if (!body.name) throw new MissingFieldException('name');
    if (!body.unit) throw new MissingFieldException('unit');
    return new ProductCreateDto(body.name, body.unit);
  }
}
