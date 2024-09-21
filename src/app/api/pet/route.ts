import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();




export async function POST(request: Request) {
    const {
        aid,
        name,
        breed,
        ownerId,
        photo,
        from,
        gender,
        age,
        status,
        address,
        about,
        url
    } = await request.json();

    try {
        let pet = await prisma.pet.findFirst({
            where: { aid: parseInt(aid) },
        });

        if (!pet && from === 'pet_z') {
            pet = await prisma.pet.create({
                data: {
                    aid,
                    name,
                    breed,
                    ownerId,
                    photo,
                    from,
                    gender,
                    age,
                    status,
                    address,
                    about,
                    url
                },
            });
        }
        else if(from ==='cur'){
            pet = await prisma.pet.create({
                data: {
                    name,
                    breed,
                    ownerId,
                    photo,
                    from,
                    gender,
                    age,
                    status,
                    address,
                    about
                },
            });
        }

        return NextResponse.json(pet);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const pets = await prisma.pet.findMany({
            where: {
                from: {
                    in: ['cur'],
                },
            },
        });

        return NextResponse.json(pets);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}