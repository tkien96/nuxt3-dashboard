/*
  Warnings:

  - You are about to alter the column `name` on the `groups` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `reated_at` on the `relation_group_functions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "functions" ALTER COLUMN "menu_id" SET DEFAULT 0,
ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "columns" JSON,
ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0,
ALTER COLUMN "parent" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "option_details" ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "options" ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "relation_group_functions" DROP COLUMN "reated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "group_id" SET DEFAULT 0,
ALTER COLUMN "function_id" SET DEFAULT 0,
ALTER COLUMN "created_by" SET DEFAULT 0,
ALTER COLUMN "updated_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "setting" ADD COLUMN     "favicon" VARCHAR(255);
