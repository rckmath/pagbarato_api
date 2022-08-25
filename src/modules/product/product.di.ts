import { ContainerModule } from 'inversify';

import { TYPES } from '@shared/ioc/types.ioc';

import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { IProductRepository, IProductService } from './product.interface';

export class ProductDI extends ContainerModule {
  public constructor() {
    super((bind) => {
      bind<IProductService>(TYPES.IProductService).to(ProductService);
      bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
    });
  }
}
