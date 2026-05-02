import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await sql`
      INSERT INTO shipments 
      (destination, weight, vehicle_plate, driver_name, shipment_date, distance, carbon_footprint, cost_try, currency, v_hash) 
      VALUES (
        ${data.destName}, 
        ${data.weight}, 
        ${data.vehiclePlate},
        ${data.driverName},
        ${data.shipmentDate},
        ${data.distance}, 
        ${data.carbon}, 
        ${data.priceTRY}, 
        ${data.currency}, 
        ${data.verificationHash}
      )
    `;

    // Also log this event
    await sql`
      INSERT INTO system_logs (level, source, message) 
      VALUES ('SUCCESS', 'SHIPMENT', ${`Yeni sevkiyat onaylandı: ${data.destName}, Ağırlık: ${data.weight} ton`})
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Shipment Save Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
