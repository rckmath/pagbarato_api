import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
import { ThumbsType } from '../priceRate.enum';

export default class PriceRateCreateDto {
  constructor(public userId: string, public readonly priceId: string, public readonly thumbs: ThumbsType = ThumbsType.UP) {}

  static from(body: Partial<PriceRateCreateDto>) {
    if (!body.thumbs) throw new MissingFieldException('thumbs');
    if (!body.userId) throw new MissingFieldException('userId');
    if (!body.priceId) throw new MissingFieldException('priceId');
    if (body.userId && !isValidUUID(body.userId)) throw new InvalidFieldException('userId', body.userId);
    if (body.priceId && !isValidUUID(body.priceId)) throw new InvalidFieldException('priceId', body.priceId);

    return new PriceRateCreateDto(body.userId, body.priceId, body.thumbs);
  }
}
