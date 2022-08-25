import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { EstablishmentService } from './establishment.service';
import { EstablishmentRepository } from './establishment.repository';
import { IEstablishmentRepository, IEstablishmentService } from './establishment.interface';

export class EstablishmentDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IEstablishmentService>(TYPES.IEstablishmentService).to(EstablishmentService);
      bind<IEstablishmentRepository>(TYPES.IEstablishmentRepository).to(EstablishmentRepository);
    });
  }
}
