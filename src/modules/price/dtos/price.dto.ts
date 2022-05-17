import { PriceType } from '../price.enum';
import { IPrice } from '../price.interface';

export default class PriceDto {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly productId: string | null,
    public readonly establishmentId: string | null,
    public readonly value: number,
    public readonly type: PriceType,
    public readonly isProductWithNearExpirationDate: boolean,
    public readonly createdAt: Date,
    public readonly expiresAt: Date | null,
    public readonly updatedAt?: Date
  ) {}

  static from(price: IPrice) {
    return new PriceDto(
      price.id,
      price.userId,
      price.productId,
      price.establishmentId,
      price.value.toNumber(),
      price.type,
      price.isProductWithNearExpirationDate,
      price.createdAt,
      price.expiresAt,
      price.updatedAt
    );
  }

  static fromMany(prices: Array<IPrice>) {
    return prices.map((price) => PriceDto.from(price));
  }
}
