import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const sensors = await sql`SELECT * FROM sensors ORDER BY created_at DESC`;
    return NextResponse.json(sensors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const [newSensor] = await sql`
      INSERT INTO sensors (depo_id, temp, humidity, gas) 
      VALUES (${data.depo_id}, ${data.temp}, ${data.humidity}, ${data.gas}) 
      RETURNING *
    `;
    return NextResponse.json(newSensor);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
