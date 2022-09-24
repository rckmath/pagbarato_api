import { Container } from 'inversify';
import { PrismaService } from '@database/prisma';

import { UserDI } from '@user/user.di';
import { PriceDI } from '@price/price.di';
import { ProductDI } from '@product/product.di';
import { PriceRateDI } from '@price_rate/priceRate.di';
import { EstablishmentDI } from '@establishment/establishment.di';

const container = new Container({ skipBaseClassChecks: true });

container.bind(PrismaService).toSelf();
container.load(new UserDI());
container.load(new PriceRateDI());
container.load(new PriceDI());
container.load(new ProductDI());
container.load(new EstablishmentDI());

export { container };
