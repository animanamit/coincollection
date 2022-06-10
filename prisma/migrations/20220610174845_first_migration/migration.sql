-- CreateTable
CREATE TABLE "Ruler" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Ruler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "rulerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "class" TEXT NOT NULL,
    "pictures" TEXT[],
    "page" INTEGER NOT NULL,
    "remarks" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_rulerId_fkey" FOREIGN KEY ("rulerId") REFERENCES "Ruler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
