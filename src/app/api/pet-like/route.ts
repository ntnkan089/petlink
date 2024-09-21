// src/app/api/favorite/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, petId, from } = await request.json();

  try {
   let pet = null;
   if(from === 'pet_z'){
     pet = await prisma.pet.findFirst({

      where: { aid: petId }
  });
  console.log(pet?.id);
   }
    const existingFavorite = await prisma.fav_pets.findFirst({
      where: {
        AND: [
          { userId: userId },
          { petId: pet?pet.id: petId },
        ],
      },
    });

    // If it doesn't exist, create a new favorite
    if (!existingFavorite) {
      const favorite = await prisma.fav_pets.create({
        data: {
          userId,
          petId: pet?pet.id: petId,
        },
      });

      return NextResponse.json(favorite);
    } else {
      return NextResponse.json({ message: 'Favorite already exists' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
