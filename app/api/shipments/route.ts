import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  let connection;
  try {
    const data = await request.json();
    
    connection = await pool.getConnection();
    await connection.query('USE caveguard');
    
    await connection.query(`
      INSERT INTO shipments 
      (destination, weight, vehicle_plate, driver_name, shipment_date, distance, carbon_footprint, cost_try, currency, v_hash) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.destName, 
        data.weight, 
        data.vehiclePlate,
        data.driverName,
        data.shipmentDate,
        data.distance, 
        data.carbon, 
        data.priceTRY, 
        data.currency, 
        data.verificationHash
      ]
    );

    // Also log this event
    await connection.query(
      'INSERT INTO system_logs (level, source, message) VALUES (?, ?, ?)',
      ['SUCCESS', 'SHIPMENT', `Yeni sevkiyat onaylandı: ${data.destName}, Ağırlık: ${data.weight} ton`]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
