const postgres = require('postgres');
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, { ssl: 'require' });

async function testGet() {
  try {
    const username = 'HasanBozkurt';
    const profiles = await sql`SELECT avatar_url, full_name FROM profiles WHERE username = ${username}`;
    console.log('GET RESULT:', JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.log('ERROR:', err.message);
  } finally {
    process.exit();
  }
}

testGet();
