import { injectable } from 'inversify';

import { db as _db } from '@database/index';

import { IPriceRateRepository, IPriceRate } from './priceRate.interface';
import { PriceRateCreateDto } from './dtos';
import { ThumbsType } from './priceRate.enum';

@injectable()
export class PriceRateRepository implements IPriceRateRepository {
  async deleteIfExists(item: PriceRateCreateDto): Promise<void> {
    const existingPriceRate = await _db.priceRate.findFirst({ where: { userId: item.userId, priceId: item.priceId } });

    if (!existingPriceRate) return;

    await _db.price.update({
      where: { id: item.priceId },
      data: {
        thumbsUp: { decrement: existingPriceRate.thumbs === ThumbsType.UP ? 1 : 0 },
        thumbsDown: { decrement: existingPriceRate.thumbs === ThumbsType.DOWN ? 1 : 0 },
      },
    });

    await _db.priceRate.delete({ where: { id: existingPriceRate.id } });
  }

  async create(item: PriceRateCreateDto): Promise<IPriceRate> {
    await this.deleteIfExists(item);

    const createdPriceRate = await _db.priceRate.create({ data: { userId: item.userId, priceId: item.priceId, thumbs: item.thumbs } });

    if (createdPriceRate) {
      await _db.price.update({
        where: { id: item.priceId },
        data: {
          thumbsUp: { increment: item.thumbs === ThumbsType.UP ? 1 : 0 },
          thumbsDown: { increment: item.thumbs === ThumbsType.DOWN ? 1 : 0 },
        },
      });
    }

    return createdPriceRate;
  }

  async deleteAndUpdatePrice(idList: Array<string>): Promise<void> {
    const foundRates = await _db.priceRate.findMany({ where: { id: { in: idList } } });

    if (foundRates.length) {
      const pricesToUpdateList = foundRates.map((x) => ({
        id: x.priceId as string,
        thumbs: x.thumbs,
      }));

      const pricesToUpdate = await _db.price.findMany({
        where: { id: { in: pricesToUpdateList.map((x) => x.id) } },
        select: { id: true },
      });

      if (pricesToUpdate.length) {
        const thumbsUpList = pricesToUpdateList.filter((x) => x.thumbs === ThumbsType.UP && pricesToUpdate.find((x) => x.id === x.id));
        const thumbsDownList = pricesToUpdateList.filter((x) => x.thumbs === ThumbsType.DOWN && pricesToUpdate.find((x) => x.id === x.id));

        if (thumbsUpList.length) {
          await _db.price.updateMany({
            where: { id: { in: thumbsUpList.map((x) => x.id) } },
            data: { thumbsUp: { decrement: 1 } },
          });
        }

        if (thumbsDownList.length) {
          await _db.price.updateMany({
            where: { id: { in: thumbsDownList.map((x) => x.id) } },
            data: { thumbsDown: { decrement: 1 } },
          });
        }
      }
    }

    await _db.priceRate.deleteMany({ where: { id: { in: idList } } });
  }
}
