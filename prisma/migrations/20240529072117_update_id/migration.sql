/*
  Warnings:

  - The primary key for the `functions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `menus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `menus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `menus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `relation_group_functions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `relation_group_functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `relation_group_functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `relation_group_functions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `menu_id` on the `functions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `group_id` on the `relation_group_functions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `function_id` on the `relation_group_functions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "functions" DROP CONSTRAINT "functions_created_by_fkey";

-- DropForeignKey
ALTER TABLE "functions" DROP CONSTRAINT "functions_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "functions" DROP CONSTRAINT "functions_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_created_by_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_created_by_fkey";

-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "relation_group_functions" DROP CONSTRAINT "relation_group_functions_created_by_fkey";

-- DropForeignKey
ALTER TABLE "relation_group_functions" DROP CONSTRAINT "relation_group_functions_function_id_fkey";

-- DropForeignKey
ALTER TABLE "relation_group_functions" DROP CONSTRAINT "relation_group_functions_group_id_fkey";

-- DropForeignKey
ALTER TABLE "relation_group_functions" DROP CONSTRAINT "relation_group_functions_updated_by_fkey";

-- AlterTable
ALTER TABLE "functions" DROP CONSTRAINT "functions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "menu_id",
ADD COLUMN     "menu_id" INTEGER NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER,
ADD CONSTRAINT "functions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "groups" DROP CONSTRAINT "groups_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER,
ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "menus" DROP CONSTRAINT "menus_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER,
ADD CONSTRAINT "menus_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "relation_group_functions" DROP CONSTRAINT "relation_group_functions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "group_id",
ADD COLUMN     "group_id" INTEGER NOT NULL,
DROP COLUMN "function_id",
ADD COLUMN     "function_id" INTEGER NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER,
ADD CONSTRAINT "relation_group_functions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "functions" ADD CONSTRAINT "functions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "functions" ADD CONSTRAINT "functions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "functions" ADD CONSTRAINT "functions_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_group_functions" ADD CONSTRAINT "relation_group_functions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_group_functions" ADD CONSTRAINT "relation_group_functions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_group_functions" ADD CONSTRAINT "relation_group_functions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "relation_group_functions" ADD CONSTRAINT "relation_group_functions_function_id_fkey" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
