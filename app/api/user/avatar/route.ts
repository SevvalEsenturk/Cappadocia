import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import sql from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const username = formData.get('username') as string;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
    }

    if (!username) {
      return NextResponse.json({ error: 'Kullanıcı doğrulanamadı.' }, { status: 401 });
    }

    // 1. Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Sadece JPG, PNG ve WebP formatları desteklenmektedir.' }, { status: 400 });
    }

    // 2. Dosya boyutu kontrolü (2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Dosya boyutu 2MB\'dan küçük olmalıdır.' }, { status: 400 });
    }

    // 3. Kullanıcı bilgilerini al
    const users = await sql`SELECT id FROM profiles WHERE username = ${username}`;
    if (users.length === 0) {
      return NextResponse.json({ error: 'Kullanıcı profili bulunamadı.' }, { status: 404 });
    }
    const userId = users[0].id;

    // Supabase Key Check
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    if (!anonKey || !supabase) {
      return NextResponse.json({ 
        error: 'Supabase Anon Key eksik.',
        help: 'Lütfen .env dosyanıza NEXT_PUBLIC_SUPABASE_ANON_KEY değerini ekleyin.'
      }, { status: 500 });
    }

    // 4. Supabase Storage'a yükle
    const fileExt = file.name.split('.').pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    console.log('Attempting upload to Supabase...', { filePath, bucket: 'avatars' });
    
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase Upload Error:', uploadError);
      return NextResponse.json({ 
        error: `Supabase Storage Hatası: ${uploadError.message}`,
        details: uploadError,
        help: "Supabase panelinden 'avatars' adında bir 'Public' bucket oluşturduğunuzdan emin olun."
      }, { status: 500 });
    }

    // 5. Public URL al
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    // 6. Veritabanını güncelle
    try {
      await sql`
        UPDATE profiles 
        SET avatar_url = ${publicUrl}, 
            avatar_path = ${filePath},
            updated_at = NOW() 
        WHERE id = ${userId}
      `;
    } catch (dbError: any) {
      console.error('Database Update Error:', dbError);
      return NextResponse.json({ error: `Veritabanı Hatası: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      avatar_url: publicUrl 
    });

  } catch (error: any) {
    console.error('Avatar API General Error:', error);
    return NextResponse.json({ error: `Sistem Hatası: ${error.message}` }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    const profiles = await sql`SELECT avatar_url, full_name FROM profiles WHERE username = ${username}`;
    if (profiles.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(profiles[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
