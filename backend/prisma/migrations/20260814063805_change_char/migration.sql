/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Character";

-- CreateTable
CREATE TABLE "character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bottom" INTEGER NOT NULL,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "right" INTEGER NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);
