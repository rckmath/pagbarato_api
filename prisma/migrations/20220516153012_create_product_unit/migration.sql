-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('G', 'KG', 'EA', 'BOX', 'DZ');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "UnitType" NOT NULL DEFAULT E'EA';
