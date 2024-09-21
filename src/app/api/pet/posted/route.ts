import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get('ownerId');

  if (!ownerId) {
    return NextResponse.json({ message: 'ownerId is required' }, { status: 400 });

  }

  try {
    const pets = await prisma.pet.findMany({
      where: {
        ownerId: ownerId,
      },
    });

    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    console.error('Error fetching posted pets:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
