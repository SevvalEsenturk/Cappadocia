import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    const [rows] = await connection.query('SELECT * FROM shipments ORDER BY created_at DESC LIMIT 5');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
