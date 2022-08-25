import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
import { PriceType } from '../price.enum';

export default class PriceUpdateDto {
  constructor(
    public readonly id: string,
    public readonly userId?: string,
    public readonly establishmentId?: string,
    public productId?: string,
    public readonly productName?: string,
    public readonly value?: number,
    public readonly type?: PriceType,
    public readonly expiresAt?: Date,
    public readonly isProductWithNearExpirationDate?: boolean
  ) {}

  static from(body: Partial<PriceUpdateDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    if (body.userId && !isValidUUID(body.userId)) throw new InvalidFieldException('userId', body.userId);
    if (body.establishmentId && !isValidUUID(body.establishmentId))
      throw new InvalidFieldException('establishmentId', body.establishmentId);
    if (!body.productId && !body.productName) throw new MissingFieldException('productId or productName');
    if (body.productId && !isValidUUID(body.productId)) throw new InvalidFieldException('productId', body.productId);

    return new PriceUpdateDto(
      body.id,
      body.userId,
      body.establishmentId,
      body.productId,
      body.productName,
      body.value,
      body.type,
      body.expiresAt,
      body.isProductWithNearExpirationDate
    );
  }
}
