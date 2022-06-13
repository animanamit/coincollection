/*
  Warnings:

  - You are about to drop the column `stateId` on the `Ruler` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ruler" DROP CONSTRAINT "Ruler_stateId_fkey";

-- AlterTable
ALTER TABLE "Ruler" DROP COLUMN "stateId";
