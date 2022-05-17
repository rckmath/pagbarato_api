import { Prisma } from '@prisma/client';
import { PriceCreateDto, PriceFindManyDto, PriceFindOneDto, PriceDeleteDto, PriceUpdateDto, PriceDto } from './dtos';
import { PriceType } from './price.enum';

export interface IPrice {
  id: string;
  userId: string | null;
  productId: string | null;
  establishmentId: string | null;
  value: Prisma.Decimal;
  type: PriceType;
  isProductWithNearExpirationDate: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPriceService {
  createOne(item: PriceCreateDto): Promise<PriceDto>;
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
  update(id: string, item: PriceUpdateDto): Promise<void>;
  delete(idList: Array<string>): Promise<void>;
  count(searchParameters: PriceFindManyDto): Promise<number>;
}
