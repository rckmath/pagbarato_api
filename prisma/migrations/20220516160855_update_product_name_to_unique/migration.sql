/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
