/*
  Warnings:

  - You are about to drop the column `resetPasswordCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordCode",
DROP COLUMN "verificationCode";

-- CreateTable
CREATE TABLE "UserUtil" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "resetPasswordCode" TEXT,
    "verificationCode" TEXT,

    CONSTRAINT "UserUtil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserUtil_userid_key" ON "UserUtil"("userid");

-- AddForeignKey
ALTER TABLE "UserUtil" ADD CONSTRAINT "UserUtil_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
