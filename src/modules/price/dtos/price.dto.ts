import { UserDto } from '@user/dtos';
import { ProductDto } from '@product/dtos';
import { EstablishmentDto } from '@establishment/dtos';

import { IPrice } from '../price.interface';
import { PriceType } from '../price.enum';

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
    public readonly updatedAt?: Date,
    public readonly user?: UserDto,
    public readonly product?: ProductDto,
    public readonly establishment?: EstablishmentDto
  ) {}

  static from(price: IPrice) {
    const user = price.user ? UserDto.from(price.user) : undefined;
    const product = price.product ? ProductDto.from(price.product) : undefined;
    const establishment = price.establishment ? EstablishmentDto.from(price.establishment) : undefined;

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
      price.updatedAt,
      user,
      product,
      establishment
    );
  }

  static fromMany(prices: Array<IPrice>): Array<PriceDto> {
    return prices.map((price) => PriceDto.from(price));
  }
}
