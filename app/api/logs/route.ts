import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const logs = await sql`SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 50`;
    return NextResponse.json(logs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const [newLog] = await sql`
      INSERT INTO system_logs (level, source, message) 
      VALUES (${data.level}, ${data.source}, ${data.message}) 
      RETURNING *
    `;
    return NextResponse.json(newLog);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
