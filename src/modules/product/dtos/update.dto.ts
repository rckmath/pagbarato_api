import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
import { ProductUnitType } from '../product.enum';

export default class ProductUpdateDto {
  constructor(public readonly id: string, public readonly name?: string, public readonly unit?: ProductUnitType) {}

  static from(body: Partial<ProductUpdateDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    return new ProductUpdateDto(body.id, body.name, body.unit);
  }
}
