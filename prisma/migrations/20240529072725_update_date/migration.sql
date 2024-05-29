/*
  Warnings:

  - Made the column `created_by` on table `functions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `relation_group_functions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "functions" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "menus" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "relation_group_functions" ALTER COLUMN "created_by" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthdate" SET DATA TYPE DATE;
