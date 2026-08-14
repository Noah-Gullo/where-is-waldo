/*
  Warnings:

  - You are about to drop the column `game` on the `Score` table. All the data in the column will be lost.
  - Added the required column `board` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "game",
ADD COLUMN     "board" TEXT NOT NULL;
