import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const robots = await sql`SELECT * FROM robots ORDER BY id ASC`;
    return NextResponse.json(robots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    const [updatedRobot] = await sql`
      UPDATE robots 
      SET status = ${data.status}, battery = ${data.battery}, location = ${data.location}, task = ${data.task}, last_update = NOW() 
      WHERE id = ${data.id} 
      RETURNING *
    `;
    return NextResponse.json(updatedRobot);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
