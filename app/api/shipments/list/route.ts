import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const shipments = await sql`SELECT * FROM shipments ORDER BY created_at DESC LIMIT 5`;
    return NextResponse.json(shipments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
