import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  let connection;
  try {
    const { level, source, message } = await request.json();
    
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    await connection.query(
      'INSERT INTO system_logs (level, source, message) VALUES (?, ?, ?)',
      [level, source, message]
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
    
    const [rows] = await connection.query('SELECT * FROM system_logs ORDER BY timestamp DESC LIMIT 50');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
