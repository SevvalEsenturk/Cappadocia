import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { distance, carbon, priceTRY, priceUSD, destName, weight, transportMode, cbamCost, cbamGrade, cbamCertificates } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY ortam değişkeni tanımlı değil');
      return NextResponse.json({ error: 'GEMINI_API_KEY tanımlı değil' }, { status: 500 });
    }

    const prompt = `Sen PeriCloud adlı bir lojistik ve karbon yönetim sisteminin yapay zeka danışmanısın.
Kapadokya'daki doğal yeraltı depolarından uluslararası ihracat yapılıyor.

Aşağıdaki sevkiyat verilerini analiz et ve Türkçe olarak kısa, net, uygulanabilir optimizasyon önerileri ver.
Önerilerin şunları kapsamalı:
1. Maliyet düşürme fırsatları (alternatif taşıma modu, konsolidasyon, zamanlama)
2. Karbon emisyonu azaltma tavsiyeleri (AB CBAM vergisini düşürmek için)
3. Rota optimizasyonu (varsa daha kısa alternatif koridor)

SEVKİYAT VERİLERİ:
- Çıkış: Kapadokya Yeraltı Deposu
- Varış: ${destName}
- Mesafe: ${distance} km
- Ürün Ağırlığı: ${weight} ton
- Taşıma Modu: ${transportMode === 'road' ? 'Kara Yolu (TIR)' : transportMode === 'air' ? 'Hava Kargo' : transportMode === 'rail' ? 'Demir Yolu' : 'Deniz Yolu'}
- Karbon Emisyonu: ${carbon} kg CO2
- Lojistik Maliyet: ${priceTRY} TRY (${priceUSD} USD)
- CBAM Vergisi: €${cbamCost} (Sınıf ${cbamGrade})
- Gerekli CBAM Sertifikası: ${cbamCertificates} adet

KURALLAR:
- Kısa ve öz yaz (en fazla 4-5 madde).
- Her maddeyi emoji ile başlat.
- Somut rakamsal tasarruf tahminleri ver (ör: "%70 emisyon düşüşü", "€50 CBAM tasarrufu").
- Cevabını düz metin olarak ver, markdown kullanma.`;

    // Sırasıyla farklı modelleri dene
    const models = [
      'gemma-3-27b-it',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-1.5-flash'
    ];

    let lastError = '';

    for (const model of models) {
      try {
        console.log(`Denenen model: ${model}`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            console.log(`Başarılı model: ${model}`);
            return NextResponse.json({ suggestion: aiText });
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

    console.error('Tüm modeller başarısız. Son hata:', lastError);
    return NextResponse.json({ error: `Gemini API hatası: ${lastError}` }, { status: 500 });
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return NextResponse.json({ error: `Sunucu hatası: ${error}` }, { status: 500 });
  }
}
