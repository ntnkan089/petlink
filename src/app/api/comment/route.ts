import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    
    const petId = searchParams.get('petId');

    if (!petId) {
        return NextResponse.json({ error: 'Pet ID is required' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { petId: petId },
            orderBy: { id: 'desc' },
            include: {
                user: {
                    select: {
                        name: true,
                        user_img: true,
                    },
                },
            },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(request: Request) {
    const { userId, petId, content } = await request.json();

    if (!userId || !petId || !content) {
        return NextResponse.json({ error: 'User ID, Pet ID, and content are required' }, { status: 400 });
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                petId: petId,
                userId,
            },
        });

        return NextResponse.json(newComment);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
