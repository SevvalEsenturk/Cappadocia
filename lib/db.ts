import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// NOT: Şifreyi güvenlik için .env dosyasında saklamak en iyisidir.
// Ancak hackathon hızı için şimdilik buraya tanımlıyoruz.
const password = '2CuGdj3g68B0fViDkQ3d';

export const pool = mysql.createPool({
  host: 'database-1.cdygw48uq67v.eu-central-1.rds.amazonaws.com',
  port: 3306,
  database: 'mysql', // İlk bağlantı için varsayılan DB
  user: 'admin',
  password: password,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(process.cwd(), 'global-bundle.pem'))
  },
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

export async function query(sql: string, params: any[] = []) {
  const [results] = await pool.execute(sql, params);
  return results;
}
