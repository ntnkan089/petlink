import {db} from '../../lib/db'

export async function GET(request: Request) {

  try {
    const users = await db.a.findMany();
    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Failed to fetch users', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    //const body = await request.json();
    const newA = await db.a.create({
      data: {
        name: /* body.name || */ 'New user',
      },
    });
    return new Response(JSON.stringify(newA), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Failed to create user', { status: 500 });
  }
}


