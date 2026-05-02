# CaveGuard: Akıllı Doğal Depo Yönetim ve Yeşil Lojistik Platformu

## 🚀 Proje Hakkında
CaveGuard, Kapadokya'nın eşsiz doğal mağara depolarını 21. yüzyılın teknolojisiyle buluşturan kapsamlı bir WMS (Warehouse Management System) ve lojistik takip platformudur. 

---

## 📋 Teknik Zorunlu Kurallar Uyum Raporu (Jüri Bilgilendirme)

Bu bölüm, Kapadokya Hackathon 2026 kural kitapçığında belirtilen teknik zorunlulukların projede nasıl uygulandığını detaylandırmaktadır.

### KURAL 1: COĞRAFİ KARBON İZİ (Uygulandı ✅)
- **Soru:** Karbon ayak izi nasıl hesaplanıyor?
- **Cevap:** Projede her sevkiyat için dinamik bir hesaplama zinciri kurulmuştur. Varış noktası Nominatim API ile koordinata çevrilir, OpenRouteService ile gerçek yol mesafesi alınır.
- **Formül:** `Mesafe (km) * Ağırlık (ton) * Emisyon Faktörü`.
- **Faktörler:** Dökümandaki resmi değerler kullanılmıştır: Hava: 0.500, Kara: 0.100, Demir: 0.030, Deniz: 0.015 kg CO2/ton-km.
- **Teknoloji:** Nominatim + OpenRouteService (Açık kaynak veri).

### KURAL 2: CANLI DÖVİZ KURU (Uygulandı ✅)
- **Soru:** Kurlar nereden çekiliyor ve güncelleniyor?
- **Cevap:** Döviz kurları TCMB EVDS (evds3.tcmb.gov.tr) standartlarına uygun API servisinden çekilmektedir.
- **Dinamik Yapı:** Arayüzde kurlar her **10 saniyede bir** otomatik olarak arka planda yenilenmekte ve maliyet hesaplamalarına anlık yansıtılmaktadır. 
- **Gösterim:** Tüm maliyetler hem TRY hem USD olarak çift para birimli gösterilmektedir.

### KURAL 3: COĞRAFİ VERİ (Uygulandı ✅)
- **Soru:** Coğrafi işlem olarak ne yapıldı?
- **Cevap:** Mesafe hesaplamanın ötesinde, sevkiyat onaylandığı anda **Leaflet** kütüphanesi kullanılarak harita üzerinde canlı rota çizimi (Route Rendering) yapılmaktadır.
- **Veri Kaynağı:** Veriler ticari (Google Maps vb.) olmayan, açık kaynaklı OpenStreetMap veritabanından çekilmektedir.

### 🌟 BONUS: KURALLARIN BİRLEŞİMİ (Uygulandı ✅)
- **Hesap Zinciri:** Kullanıcı bir hedef girdiğinde; coğrafi mesafe hesaplanır -> bu mesafeden karbon emisyonu üretilir -> çıkan sonuç TCMB'den gelen anlık kur ile maliyete dönüştürülür. Tüm bu süreç tek bir hesaplama zincirinde (The Chain of Rules) birleştirilmiştir.

---

## 🛠️ Teknik Mimari
- **Frontend:** Next.js 14+ (App Router)
- **Database:** Supabase (PostgreSQL) - IPv4 Pooler entegrasyonu ile.
- **Güvenlik:** SHA-256 Dijital Mühürleme sistemi ile veri bütünlüğü.
- **Modern Stack:** Framer Motion (Animasyon), Tailwind CSS (Premium Tasarım).

## 🤖 Otonom Sistemler
Dashboard üzerinden mağara içi robotların (Alpha, Beta, Gamma) batarya ve görev takibi ile IoT sensörlerinin (Sıcaklık, Nem, Gaz) anlık takibi yapılabilmektedir.

---
**CaveGuard** - *Kapadokya'dan Geleceğe, Doğal ve Dijital Lojistik.*
