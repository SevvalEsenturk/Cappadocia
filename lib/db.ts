import postgres from 'postgres';

// Supabase PostgreSQL bağlantı bilgileri
const connectionString = 'postgresql://postgres:DJL16pTtnADq5tvb@db.nxhjdawwlpybqcbheeux.supabase.co:5432/postgres';

// sql objesi doğrudan sorgu yapmak için kullanılır
const sql = postgres(connectionString, {
  ssl: 'require', // Supabase için SSL zorunludur
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export default sql;
