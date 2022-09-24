import { UserDto } from '@user/dtos';
import { ProductDto } from '@product/dtos';
import { EstablishmentDto } from '@establishment/dtos';
import { PriceRateDto } from '@price_rate/dtos';

import { IPrice } from '../price.interface';
import { PriceType } from '../price.enum';
import { Prisma } from '@prisma/client';

export default class PriceDto {
  constructor(
    public readonly id: string,
    public readonly userId: string | null,
    public readonly productId: string | null,
    public readonly establishmentId: string | null,
    public readonly value: number,
    public readonly type: PriceType,
    public readonly thumbsUp: number | null,
    public readonly thumbsDown: number | null,
    public readonly isProductWithNearExpirationDate: boolean,
    public readonly createdAt: Date,
    public readonly expiresAt: Date | null,
    public readonly updatedAt?: Date,
    public readonly user?: UserDto | null,
    public readonly rates?: Array<PriceRateDto>,
    public readonly product?: ProductDto | null,
    public readonly establishment?: EstablishmentDto | null
  ) {}

  static from(price: IPrice) {
    const user = price.user ? UserDto.from(price.user) : null;
    const product = price.product ? ProductDto.from(price.product) : null;
    const rates = price.rates?.length ? PriceRateDto.fromMany(price.rates) : [];
    const establishment = price.establishment ? EstablishmentDto.from(price.establishment) : null;

    price.value = parseFloat(new Prisma.Decimal(price.value).toNumber().toFixed(2));

    return new PriceDto(
      price.id,
      price.userId,
      price.productId,
      price.establishmentId,
      price.value,
      price.type,
      price.thumbsUp,
      price.thumbsDown,
      price.isProductWithNearExpirationDate,
      price.createdAt,
      price.expiresAt,
      price.updatedAt,
      user,
      rates,
      product,
      establishment
    );
  }

  static fromMany(prices: Array<IPrice>): Array<PriceDto> {
    return prices.map((price) => PriceDto.from(price));
  }
}
