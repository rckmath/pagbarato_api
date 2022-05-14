import { Container } from 'inversify';
import { PrismaService } from '@database/prisma';

import { UserDI } from '@user/user.di';
import { EstablishmentDI } from '@establishment/establishment.di';

const container = new Container({ skipBaseClassChecks: true });

container.bind(PrismaService).toSelf();
container.load(new UserDI());
container.load(new EstablishmentDI());

export { container };
