/*
  Warnings:

  - Added the required column `updatedAt` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_tutorialId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
