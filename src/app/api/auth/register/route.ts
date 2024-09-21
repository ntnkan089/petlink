import { NextResponse } from "next/server";

import {db} from '../../../lib/db'

export async function POST(request: Request) {
  try {

    const { name, email, phone, password } = await request.json();
    
    const user = await db.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            phone: phone,
            bio: "hello.",
            user_img: "",
        },
      })
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}