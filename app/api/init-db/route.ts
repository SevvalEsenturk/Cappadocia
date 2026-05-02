import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // 1. Create Database
    await connection.query('CREATE DATABASE IF NOT EXISTS caveguard');
    await connection.query('USE caveguard');

    // 0. Drop existing tables to ensure schema update (Clean Install for Hackathon)
    await connection.query('DROP TABLE IF EXISTS shipments');
    await connection.query('DROP TABLE IF EXISTS locas');
    await connection.query('DROP TABLE IF EXISTS sensors');
    await connection.query('DROP TABLE IF EXISTS robots');
    await connection.query('DROP TABLE IF EXISTS system_logs');

    // 2. Create Sensors Table with Targets
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sensors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        depo_id VARCHAR(50),
        temp DECIMAL(5,2),
        humidity DECIMAL(5,2),
        gas DECIMAL(5,2),
        target_temp DECIMAL(5,2) DEFAULT 12.0,
        target_humidity DECIMAL(5,2) DEFAULT 65.0,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Create Locas Table (New)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS locas (
        id VARCHAR(50) PRIMARY KEY,
        depo_id VARCHAR(50),
        hammadde VARCHAR(100),
        occupancy INT,
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 4. Create Robots Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS robots (
        id VARCHAR(50) PRIMARY KEY,
        status VARCHAR(20),
        battery INT,
        location VARCHAR(100),
        task VARCHAR(100),
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 5. Create Shipments Table with Vehicle Info
    await connection.query(`
      CREATE TABLE IF NOT EXISTS shipments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        destination VARCHAR(255),
        weight DECIMAL(10,2),
        vehicle_plate VARCHAR(20),
        driver_name VARCHAR(100),
        shipment_date DATE,
        distance INT,
        carbon_footprint DECIMAL(10,2),
        cost_try DECIMAL(10,2),
        currency VARCHAR(10),
        v_hash VARCHAR(64),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Create System Logs Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(10),
        source VARCHAR(50),
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Insert Initial Robot Data if empty
    const [robotsRows]: any = await connection.query('SELECT COUNT(*) as count FROM robots');
    if (robotsRows[0].count === 0) {
      await connection.query(`
        INSERT INTO robots (id, status, battery, location, task) VALUES 
        ('robot-alpha', 'active', 78, 'Depo-1 / Loca-1', 'Envanter Tarama'),
        ('robot-beta', 'charging', 42, 'Merkez / Şarj Locası', 'Şarj Ediliyor'),
        ('robot-gamma', 'active', 91, 'Depo-2 / Loca-3', 'Palet Taşıma')
      `);
    }

    // 7. Insert Initial Loca Data if empty
    const [locasRows]: any = await connection.query('SELECT COUNT(*) as count FROM locas');
    if (locasRows[0].count === 0) {
      await connection.query(`
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
      `);
    }

    return NextResponse.json({ 
      success: true, 
      message: "CaveGuard veritabanı şeması başarıyla oluşturuldu, Depo/Localar ve robotlar senkronize edildi." 
    });
  } catch (error: any) {
    console.error('DB Init Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  } finally {
    if (connection) connection.release();
  }
}
