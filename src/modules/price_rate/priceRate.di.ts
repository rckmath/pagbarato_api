import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { PriceRateRepository } from './priceRate.repository';
import { IPriceRateRepository } from './priceRate.interface';

export class PriceRateDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IPriceRateRepository>(TYPES.IPriceRateRepository).to(PriceRateRepository);
    });
  }
}
