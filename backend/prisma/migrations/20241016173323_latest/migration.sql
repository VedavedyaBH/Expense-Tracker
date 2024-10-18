/*
  Warnings:

  - The primary key for the `UserUtil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserUtil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserUtil" DROP CONSTRAINT "UserUtil_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserUtil_pkey" PRIMARY KEY ("userid");
