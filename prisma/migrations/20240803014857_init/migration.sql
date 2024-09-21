/*
  Warnings:

  - The primary key for the `pet` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_petId_fkey";

-- DropForeignKey
ALTER TABLE "contacted_pets" DROP CONSTRAINT "contacted_pets_petId_fkey";

-- DropForeignKey
ALTER TABLE "fav_pets" DROP CONSTRAINT "fav_pets_petId_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "petId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "contacted_pets" ALTER COLUMN "petId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "fav_pets" ALTER COLUMN "petId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "pet" DROP CONSTRAINT "pet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "pet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "pet_id_seq";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fav_pets" ADD CONSTRAINT "fav_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacted_pets" ADD CONSTRAINT "contacted_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
