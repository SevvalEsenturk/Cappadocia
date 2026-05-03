const postgres = require('postgres');
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, { ssl: 'require' });

async function check() {
  try {
    const res = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles'`;
    console.log('COLUMNS:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.log('ERROR:', err.message);
  } finally {
    process.exit();
  }
}

check();
