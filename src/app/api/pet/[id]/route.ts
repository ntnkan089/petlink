import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const url = new URL(request.url);
    const user_id = url.searchParams.get('user_id'); 
    const {id} = params
    console.log(id)
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        // Find pet by ID
        const pet = await prisma.pet.findFirst({
            where: { id: id }
        });
        
        if (!pet) {
            return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
        }

        const liked = user_id? await prisma.fav_pets.findFirst({
            where: {
                userId: user_id,
                petId: id,
            },
        }): null

        return NextResponse.json({
            ...pet,
            liked: liked ? true : false,
        });;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
