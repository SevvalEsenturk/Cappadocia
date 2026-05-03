import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { distance, carbon, priceTRY, priceUSD, destName, weight, transportMode, cbamCost, cbamGrade } = body;

    // Ortam değişkenini kontrol et
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('HATA: GEMINI_API_KEY ortam değişkeni tanımlı değil!');
      return NextResponse.json({ 
        error: 'API Anahtarı Eksik. Lütfen .env.local dosyasını kontrol edin ve sunucuyu yeniden başlatın.' 
      }, { status: 500 });
    }

    console.log(`API Key kontrolü: ${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`);

    const prompt = `Sen PeriCloud adlı akıllı lojistik ve karbon yönetim sisteminin uzman yapay zeka danışmanısın (Gemma 3 27B). 
Kapadokya'daki doğal yeraltı depolarından uluslararası ihracat yapan bir kullanıcıya stratejik öneriler vereceksin.

Aşağıdaki teknik sevkiyat verilerini analiz et ve Türkçe olarak profesyonel, uygulanabilir ve rakamsal odaklı öneriler sun.

SEVKİYAT VERİLERİ:
- Rota: Kapadokya -> ${destName} (${distance} km)
- Ürün Ağırlığı: ${weight} ton
- Mevcut Taşıma Modu: ${transportMode === 'road' ? 'Kara Yolu (TIR)' : transportMode === 'air' ? 'Hava Kargo' : transportMode === 'rail' ? 'Demir Yolu' : 'Deniz Yolu'}
- Karbon Emisyonu: ${carbon} kg CO2
- Lojistik Maliyet: ${priceTRY} TRY (${priceUSD} USD)
- AB CBAM (Karbon Vergisi) Durumu: €${cbamCost} (Sınıf ${cbamGrade})

ANALİZ TAVSİYELERİ ŞUNLARI İÇERMELİDİR:
1. Maliyet Optimizasyonu: Alternatif taşıma modları veya zamanlama ile sağlanabilecek tasarruf.
2. Karbon Ayak İzi: CBAM vergisini düşürmek için emisyon azaltma stratejileri.
3. Rota Verimliliği: Kapadokya'nın jeopolitik konumunu kullanarak daha yeşil koridor önerileri.

KURALLAR:
- Madde madde (bullet points) yaz.
- Her madde mutlaka somut bir tahmin içermeli (örn: "%15 maliyet avantajı", "€120 vergi tasarrufu").
- Teknik, güven verici ve kısa bir dil kullan (max 5 madde).
- markdown formatı kullanma, sadece düz metin ve emojiler.`;

    // Sadece Gemma modelleri kullanılacak
    const models = [
      'gemma-3-27b',
      'gemma-3-27b-it',
      'gemma-3-12b',
      'gemma-3-4b'
    ];

    let lastError = '';

    for (const model of models) {
      try {
        console.log(`Denenen Gemma modeli: ${model}`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            console.log(`Başarılı Gemma modeli: ${model}`);
            return NextResponse.json({ 
              suggestion: aiText,
              modelUsed: model 
            });
          }
        }

        const errBody = await response.text();
        lastError = `${model}: ${response.status} - ${errBody}`;
        console.error(`Model ${model} başarısız:`, lastError);
      } catch (fetchErr) {
        lastError = `${model}: fetch error - ${fetchErr}`;
        console.error(lastError);
      }
    }

    return NextResponse.json({ 
      error: `Gemma API şu an meşgul veya ulaşılamıyor. Lütfen API anahtarınızı ve internetinizi kontrol edin.` 
    }, { status: 500 });

  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return NextResponse.json({ error: `Sunucu hatası: ${error}` }, { status: 500 });
  }
}
