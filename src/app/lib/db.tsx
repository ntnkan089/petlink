import { PrismaClient } from "@prisma/client";



//fancy way to not have to define new PrismaClient every time make any change a.
export const db = new PrismaClient()