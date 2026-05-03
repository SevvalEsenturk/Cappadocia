const postgres = require('postgres');
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, { ssl: 'require' });

async function updateHasan() {
  const nickname = "HasanBozkurt";
  const avatar_url = "https://nxhjdawwlpybqcbheeux.supabase.co/storage/v1/object/public/avatars/WhatsApp%20Image%202026-05-03%20at%2007.17.36.jpeg";
  const avatar_path = "WhatsApp Image 2026-05-03 at 07.17.36.jpeg";

  try {
    console.log(`Updating profile for ${nickname}...`);
    
    const result = await sql`
      UPDATE profiles 
      SET avatar_url = ${avatar_url}, 
          avatar_path = ${avatar_path},
          updated_at = NOW() 
      WHERE username = ${nickname}
    `;
    
    console.log('Update successful:', result);
    
    // Verify
    const verify = await sql`SELECT * FROM profiles WHERE username = ${nickname}`;
    console.log('Verified Profile:', JSON.stringify(verify, null, 2));

  } catch (err) {
    console.log('ERROR:', err.message);
  } finally {
    process.exit();
  }
}

updateHasan();
