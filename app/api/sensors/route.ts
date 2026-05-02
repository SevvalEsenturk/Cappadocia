import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  let connection;
  try {
    const { depo_id, temp, humidity, gas } = await request.json();
    
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    await connection.query(
      'INSERT INTO sensors (depo_id, temp, humidity, gas) VALUES (?, ?, ?, ?)',
      [depo_id, temp, humidity, gas]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    const [rows] = await connection.query('SELECT * FROM sensors ORDER BY timestamp DESC LIMIT 10');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
