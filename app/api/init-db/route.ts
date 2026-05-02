import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    // 0. Drop existing tables to ensure schema update
    await sql`DROP TABLE IF EXISTS shipments`;
    await sql`DROP TABLE IF EXISTS locas`;
    await sql`DROP TABLE IF EXISTS sensors`;
    await sql`DROP TABLE IF EXISTS robots`;
    await sql`DROP TABLE IF EXISTS system_logs`;

    // 1. Create Sensors Table
    await sql`
      CREATE TABLE sensors (
        id SERIAL PRIMARY KEY,
        depo_id TEXT NOT NULL,
        temp DOUBLE PRECISION,
        humidity DOUBLE PRECISION,
        gas DOUBLE PRECISION,
        target_temp DOUBLE PRECISION DEFAULT 12.0,
        target_humidity DOUBLE PRECISION DEFAULT 65.0,
        ventilation BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 2. Create Robots Table
    await sql`
      CREATE TABLE robots (
        id TEXT PRIMARY KEY,
        status TEXT,
        battery INTEGER,
        location TEXT,
        task TEXT,
        last_update TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 3. Create Locas Table
    await sql`
      CREATE TABLE locas (
        id TEXT PRIMARY KEY,
        depo_id TEXT,
        hammadde TEXT,
        occupancy INTEGER,
        last_update TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 4. Create Shipments Table
    await sql`
      CREATE TABLE shipments (
        id SERIAL PRIMARY KEY,
        destination TEXT,
        weight DOUBLE PRECISION,
        vehicle_plate TEXT,
        driver_name TEXT,
        shipment_date DATE,
        distance DOUBLE PRECISION,
        carbon_footprint DOUBLE PRECISION,
        cost_try DOUBLE PRECISION,
        currency TEXT,
        v_hash TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 5. Create Logs Table
    await sql`
      CREATE TABLE system_logs (
        id SERIAL PRIMARY KEY,
        level TEXT,
        source TEXT,
        message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // 6. Seed Data - Sensors
    await sql`
      INSERT INTO sensors (depo_id, temp, humidity, gas) VALUES 
      ('Depo-1 (Kuzey)', 12.5, 62, 140),
      ('Depo-2 (Güney)', 11.8, 68, 125),
      ('Depo-3 (Batı)', 13.1, 60, 150)
    `;

    // 7. Seed Data - Robots
    await sql`
      INSERT INTO robots (id, status, battery, location, task) VALUES 
      ('robot-alpha', 'active', 78, 'Depo-1 / Loca-1', 'Envanter Tarama'),
      ('robot-beta', 'charging', 42, 'Merkez / Şarj Locası', 'Şarj Ediliyor'),
      ('robot-gamma', 'active', 91, 'Depo-2 / Loca-3', 'Palet Taşıma')
    `;

    // 8. Seed Data - Locas
    await sql`
      INSERT INTO locas (id, depo_id, hammadde, occupancy) VALUES 
      ('L1-1', 'Depo-1 (Kuzey)', 'Patates', 85),
      ('L1-2', 'Depo-1 (Kuzey)', 'Patates', 40),
      ('L1-3', 'Depo-1 (Kuzey)', 'Boş', 0),
      ('L1-4', 'Depo-1 (Kuzey)', 'Soğan', 10),
      ('L2-1', 'Depo-2 (Güney)', 'Buğday', 95),
      ('L2-2', 'Depo-2 (Güney)', 'Mısır', 60),
      ('L2-3', 'Depo-2 (Güney)', 'Mısır', 30),
      ('L2-4', 'Depo-2 (Güney)', 'Boş', 0),
      ('L3-1', 'Depo-3 (Batı)', 'Elma', 75),
      ('L3-2', 'Depo-3 (Batı)', 'Elma', 80),
      ('L3-3', 'Depo-3 (Batı)', 'Armut', 20),
      ('L3-4', 'Depo-3 (Batı)', 'Boş', 0)
    `;

    return NextResponse.json({ 
      success: true, 
      message: "Supabase (PostgreSQL) şeması modern 'postgres' kütüphanesiyle başarıyla kuruldu." 
    });
  } catch (error: any) {
    console.error('Supabase Init Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
