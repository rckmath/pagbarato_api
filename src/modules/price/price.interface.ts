import { Prisma } from '@prisma/client';

import { IEstablishment } from '@establishment/establishment.interface';
import { IPriceRate } from '@price_rate/priceRate.interface';
import { IProduct } from '@product/product.interface';
import { IUser } from '@user/user.interface';

import {
  PriceCreateDto,
  PriceFindManyDto,
  PriceFindOneDto,
  PriceDeleteDto,
  PriceUpdateDto,
  PriceDto,
  PriceFindManyByRangeDto,
} from './dtos';

import { PriceRateCreateDto, PriceRateDto } from '@price_rate/dtos';

import { PriceType } from './price.enum';

export interface IPrice {
  id: string;
  userId: string | null;
  productId: string | null;
  establishmentId: string | null;
  value: Prisma.Decimal | number;
  type: PriceType;
  thumbsUp: number | null;
  thumbsDown: number | null;
  isProductWithNearExpirationDate: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser | null;
  rates?: Array<IPriceRate>;
  product?: IProduct | null;
  establishment?: IEstablishment | null;
}

export interface IPriceService {
  createOne(item: PriceCreateDto): Promise<PriceDto>;
  createRate(item: PriceRateCreateDto): Promise<PriceRateDto>;
  findOne(item: PriceFindOneDto): Promise<PriceDto>;
  findMany(searchParameters: PriceFindManyDto): Promise<Array<PriceDto>>;
  updateOne(item: PriceUpdateDto): Promise<void>;
  delete(item: PriceDeleteDto): Promise<void>;
  count(searchParameters: PriceFindManyDto): Promise<number>;
}

export interface IPriceRepository {
  create(item: PriceCreateDto): Promise<IPrice>;
  find(searchParameters: PriceFindManyDto): Promise<Array<IPrice>>;
  findOne(id: IPrice['id']): Promise<IPrice | null>;
  findByRange(searchParameters: PriceFindManyByRangeDto): Promise<Array<IPrice>>;
  update(id: string, item: PriceUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
  count(searchParameters: PriceFindManyDto): Promise<number>;
}
