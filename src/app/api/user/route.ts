import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });

  }

  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        fav_pets: {
          include: {
            pet: true,
          },
        },
        contacted_pets: {
          include: {
            pet: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
