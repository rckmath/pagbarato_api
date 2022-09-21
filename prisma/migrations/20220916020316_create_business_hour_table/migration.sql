-- CreateEnum
CREATE TYPE "DayOfWeekType" AS ENUM ('SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'HOLIDAYS');

-- CreateTable
CREATE TABLE "BusinessHour" (
    "id" CHAR(36) NOT NULL,
    "establishmentId" CHAR(36),
    "day" "DayOfWeekType" NOT NULL,
    "openingAt" TIMESTAMP(3),
    "closureAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessHour" ADD CONSTRAINT "BusinessHour_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
