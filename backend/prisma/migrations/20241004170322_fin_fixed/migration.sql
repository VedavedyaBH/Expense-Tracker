/*
  Warnings:

  - You are about to drop the `_CategoryToExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToExpense" DROP CONSTRAINT "_CategoryToExpense_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToExpense" DROP CONSTRAINT "_CategoryToExpense_B_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "categoryId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "_CategoryToExpense";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
