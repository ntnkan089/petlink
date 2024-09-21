-- CreateTable
CREATE TABLE "contacted_pets" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "contacted_pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacted_pets" ADD CONSTRAINT "contacted_pets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacted_pets" ADD CONSTRAINT "contacted_pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
