import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TCMB Resmi XML Servisi
    const res = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml', {
      next: { revalidate: 3600 } // Saatte bir cache'lenebilir ama biz her zaman güncelini çekmeye zorlayabiliriz
    });
    
    const xmlText = await res.text();
    
    // Basit XML Parse (USD ve EUR için)
    const extractRate = (code: string) => {
      const regex = new RegExp(`<Currency[^>]*CrossOrder="[^"]*"[^>]*CurrencyCode="${code}"[^>]*>.*?<BanknoteSelling>([^<]+)</BanknoteSelling>`, 's');
      const match = xmlText.match(regex);
      return match ? parseFloat(match[1]) : null;
    };

    const usdRate = extractRate('USD');
    const eurRate = extractRate('EUR');

    if (!usdRate || !eurRate) {
      throw new Error("Kurlar parse edilemedi");
    }

    return NextResponse.json({
      USD: usdRate,
      EUR: eurRate,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("TCMB API Error:", err);
    // Hata durumunda fallback (Varsayılan güncel kurlar)
    return NextResponse.json({
      USD: 32.45,
      EUR: 35.12,
      error: "TCMB verisi çekilemedi, fallback kullanılıyor."
    }, { status: 200 });
  }
}
