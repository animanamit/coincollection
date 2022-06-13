/*
  Warnings:

  - Added the required column `name` to the `Ruler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ruler" ADD COLUMN     "name" TEXT NOT NULL;
