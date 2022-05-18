import { PrismaService } from './prisma';

declare global {
  // eslint-disable-next-line no-var
  var db: PrismaService | undefined;
}

export const db = global.db || new PrismaService();

if (process.env.NODE_ENV !== 'production') global.db = db;
