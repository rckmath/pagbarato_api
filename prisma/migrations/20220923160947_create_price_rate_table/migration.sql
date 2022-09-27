-- CreateEnum
CREATE TYPE "ThumbsType" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "PriceRate" (
    "id" CHAR(36) NOT NULL,
    "userId" CHAR(36),
    "priceId" CHAR(36),
    "thumbs" "ThumbsType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PriceRate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceRate" ADD CONSTRAINT "PriceRate_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceRate" ADD CONSTRAINT "PriceRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
