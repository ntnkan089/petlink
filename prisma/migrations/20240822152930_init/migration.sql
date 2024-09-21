-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_petId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "contacted_pets" DROP CONSTRAINT "contacted_pets_petId_fkey";

-- DropForeignKey
ALTER TABLE "contacted_pets" DROP CONSTRAINT "contacted_pets_userId_fkey";

-- DropForeignKey
ALTER TABLE "fav_pets" DROP CONSTRAINT "fav_pets_petId_fkey";

-- DropForeignKey
ALTER TABLE "fav_pets" DROP CONSTRAINT "fav_pets_userId_fkey";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fav_pets" ADD CONSTRAINT "fav_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fav_pets" ADD CONSTRAINT "fav_pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacted_pets" ADD CONSTRAINT "contacted_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacted_pets" ADD CONSTRAINT "contacted_pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
