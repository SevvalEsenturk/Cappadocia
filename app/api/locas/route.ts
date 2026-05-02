import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const depo_id = searchParams.get('depo_id');
    
    let locas;
    if (depo_id) {
      locas = await sql`SELECT * FROM locas WHERE depo_id = ${depo_id} ORDER BY id ASC`;
    } else {
      locas = await sql`SELECT * FROM locas ORDER BY id ASC`;
    }
    
    return NextResponse.json(locas);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
