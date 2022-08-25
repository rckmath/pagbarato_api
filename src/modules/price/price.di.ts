import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { PriceService } from './price.service';
import { PriceRepository } from './price.repository';
import { IPriceRepository, IPriceService } from './price.interface';

export class PriceDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IPriceService>(TYPES.IPriceService).to(PriceService);
      bind<IPriceRepository>(TYPES.IPriceRepository).to(PriceRepository);
    });
  }
}
