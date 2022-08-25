import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
import { PriceType } from '../price.enum';

export default class PriceCreateDto {
  constructor(
    public userId: string,
    public readonly establishmentId: string,
    public readonly value: number,
    public readonly type: PriceType = PriceType.COMMON,
    public productId?: string,
    public readonly productName?: string,
    public readonly isProductWithNearExpirationDate: boolean = false,
    public readonly expiresAt?: Date
  ) {}

  static from(body: Partial<PriceCreateDto>) {
    if (!body.value) throw new MissingFieldException('value');
    if (!body.userId) throw new MissingFieldException('userId');
    if (!body.establishmentId) throw new MissingFieldException('establishmentId');
    if (!body.productId && !body.productName) throw new MissingFieldException('productId or productName');
    if (body.userId && !isValidUUID(body.userId)) throw new InvalidFieldException('userId', body.userId);
    if (body.productId && !isValidUUID(body.productId)) throw new InvalidFieldException('productId', body.productId);
    if (body.establishmentId && !isValidUUID(body.establishmentId))
      throw new InvalidFieldException('establishmentId', body.establishmentId);

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
