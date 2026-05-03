const postgres = require('postgres');
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, { ssl: 'require' });

async function verify() {
  try {
    const username = 'HasanBozkurt';
    const users = await sql`SELECT id FROM profiles WHERE username = ${username}`;
    console.log('QUERY RESULT:', JSON.stringify(users, null, 2));
  } catch (err) {
    console.log('ERROR:', err.message);
  } finally {
    process.exit();
  }
}

verify();
