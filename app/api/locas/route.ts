import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const depo_id = searchParams.get('depo_id');
    
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    let query = 'SELECT * FROM locas';
    let params: any[] = [];
    
    if (depo_id) {
      query += ' WHERE depo_id = ?';
      params.push(depo_id);
    }
    
    const [rows] = await connection.query(query, params);
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
