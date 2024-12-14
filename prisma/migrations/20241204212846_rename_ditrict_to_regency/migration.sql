/*
  Warnings:

  - You are about to drop the column `districtId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_districtId_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_provinceId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "districtId",
ADD COLUMN     "regencyId" INTEGER;

-- DropTable
DROP TABLE "District";

-- CreateTable
CREATE TABLE "Regency" (
    "id" INTEGER NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Regency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_regencyId_fkey" FOREIGN KEY ("regencyId") REFERENCES "Regency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regency" ADD CONSTRAINT "Regency_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;
