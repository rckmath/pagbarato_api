import { MissingFieldException } from '@shared/errors';
import { PriceType } from '../price.enum';

export default class PriceCreateDto {
  constructor(
    public readonly userId: string,
    public readonly establishmentId: string,
    public readonly value: number,
    public readonly type: PriceType = PriceType.COMMON,
    public readonly productId?: string,
    public readonly productName?: string,
    public readonly isProductWithNearExpirationDate: boolean = false,
    public readonly expiresAt?: Date
  ) {}

  static from(body: Partial<PriceCreateDto>) {
    if (!body.value) throw new MissingFieldException('value');
    if (!body.userId) throw new MissingFieldException('userId');
    if (!body.establishmentId) throw new MissingFieldException('establishmentId');
    if (!body.productId && body.productName) throw new MissingFieldException('productId or productName');

    return new PriceCreateDto(
      body.userId,
      body.establishmentId,
      body.value,
      body.type,
      body.productId,
      body.productName,
      body.isProductWithNearExpirationDate,
      body.expiresAt
    );
  }
}
