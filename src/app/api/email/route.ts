// /src/app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { sendMail } from '@/app/lib/mail';

import { PrismaClient } from '@prisma/client';
import {compileWelcomeTemplate} from '@/app/lib/mail'

export async function POST(request: Request) {
    try {
        const prisma = new PrismaClient();
        const { subject, message, toEmail, from_email, from_name, to_name, mobile, pet_id, user_id } = await request.json();
        const url = 'http://localhost:3000'
        const existingContactOrOwner = await prisma.contacted_pets.findFirst({
            
            where: 
                    {
                        userId: user_id,
                        petId: pet_id,
                    }
                    
            
        });
        const existingOwner = await prisma.pet.findFirst({
            where: {
                ownerId: user_id,
                id: pet_id
            },
        })
        await sendMail({
            to: toEmail,
            name: "pet-sto",
            subject: `Mail from PetLink user`,
            body: compileWelcomeTemplate(from_name, to_name, url, subject, message, from_email, mobile),
        });

        if(!existingContactOrOwner&&!existingOwner){
            await prisma.contacted_pets.create({
                data: {
                    userId: user_id,
                    petId: pet_id,
                },
            });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }
}
