import { IPrice } from '@price/price.interface';
import { IUser } from '@user/user.interface';
import { PriceRateCreateDto } from './dtos';
import { ThumbsType } from './priceRate.enum';

export interface IPriceRate {
  id: string;
  userId: string | null;
  priceId: string | null;
  thumbs: ThumbsType;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser | null;
  price?: IPrice | null;
}

export interface IPriceRateRepository {
  create(item: PriceRateCreateDto): Promise<IPriceRate>;
  deleteIfExists(item: PriceRateCreateDto): Promise<void>;
  deleteAndUpdatePrice(idList: Array<string>): Promise<void>;
}
