import postgres from 'postgres';

// Yeni IPv4 uyumlu Supabase Pooler bağlantı bilgileri
const connectionString = 'postgresql://postgres.nxhjdawwlpybqcbheeux:DJL16pTtnADq5tvb@aws-0-eu-west-1.pooler.supabase.com:5432/postgres';

const sql = postgres(connectionString, {
  ssl: 'require',
  prepare: false // Pooler kullanırken 'false' olması bağlantı kararlılığı için kritiktir
});

export default sql;
