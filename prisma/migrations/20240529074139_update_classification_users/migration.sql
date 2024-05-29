-- CreateEnum
CREATE TYPE "EClassification" AS ENUM ('SYSTEM', 'ADMINISTRATOR', 'MEMBERSHIP', 'VISITOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "classification" "EClassification" NOT NULL DEFAULT 'VISITOR';
