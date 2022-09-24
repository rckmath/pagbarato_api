import { ThumbsType } from '../priceRate.enum';
import { IPriceRate } from '../priceRate.interface';

export default class PriceRateDto {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly priceId: string | null,
    public readonly thumbs: ThumbsType
  ) {}

  static from(priceRate: IPriceRate) {
    return new PriceRateDto(priceRate.id, priceRate.userId, priceRate.priceId, priceRate.thumbs);
  }

  static fromAdmin(priceRate: IPriceRate) {
    return new PriceRateDto(priceRate.id, priceRate.userId, priceRate.priceId, priceRate.thumbs);
  }

  static fromMany(priceRates: Array<IPriceRate>) {
    return priceRates.map((priceRate) => PriceRateDto.fromAdmin(priceRate));
  }
}
