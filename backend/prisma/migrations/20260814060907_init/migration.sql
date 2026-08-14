-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bottom" INTEGER NOT NULL,
    "top" INTEGER NOT NULL,
    "left" INTEGER NOT NULL,
    "right" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
