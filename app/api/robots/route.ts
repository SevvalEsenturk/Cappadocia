import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    const [rows] = await connection.query('SELECT * FROM robots');
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}

export async function PATCH(request: Request) {
  let connection;
  try {
    const { id, status, battery, location, task } = await request.json();
    
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    await connection.query(
      'UPDATE robots SET status = ?, battery = ?, location = ?, task = ? WHERE id = ?',
      [status, battery, location, task, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
