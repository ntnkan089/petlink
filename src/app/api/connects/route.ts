// /src/app/api/connects/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { getSession } from 'next-auth/react';
export async function GET(request: Request) {

    const prisma = new PrismaClient();
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id'); 
    if (!user_id) {
        return NextResponse.json({ error: 'Missing user_id parameter' }, { status: 400 });
    }

    try {
        const contacts = await prisma.contacted_pets.findMany({
            where: {
                pet: {
                    ownerId: user_id,
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        user_img: true,
                    },
                },
                pet: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { id: 'desc' },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
