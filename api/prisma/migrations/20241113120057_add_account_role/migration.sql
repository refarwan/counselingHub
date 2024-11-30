-- CreateEnum
CREATE TYPE "Role" AS ENUM ('administrator', 'konselor', 'konseli');

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'konseli';
