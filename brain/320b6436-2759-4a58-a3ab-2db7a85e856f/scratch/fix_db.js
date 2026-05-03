const postgres = require('postgres');
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, { ssl: 'require' });

async function fix() {
  try {
    console.log('Updating existing profile...');
    
    // Find the first available profile and assign it to Hasan for the demo
    const profiles = await sql`SELECT id FROM profiles LIMIT 1`;
    if (profiles.length > 0) {
        const id = profiles[0].id;
        await sql`
          UPDATE profiles 
          SET username = 'HasanBozkurt', 
              full_name = 'Hasan Bozkurt', 
              role_label = 'SAHA OPERATÖRÜ' 
          WHERE id = ${id}
        `;
        console.log(`Profile ${id} updated to HasanBozkurt.`);
    } else {
        console.log('No profiles found to update.');
    }
    
    console.log('Fix complete.');
  } catch (err) {
    console.log('ERROR:', err.message);
  } finally {
    process.exit();
  }
}

fix();
