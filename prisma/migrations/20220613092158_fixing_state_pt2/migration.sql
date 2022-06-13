/*
  Warnings:

  - Added the required column `stateId` to the `Ruler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ruler" ADD COLUMN     "stateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ruler" ADD CONSTRAINT "Ruler_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;