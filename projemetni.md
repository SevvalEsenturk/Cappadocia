Harika bir fikir! Kapadokya’nın doğal depoları (limon, patates vb. muhafazası) bölgenin en büyük değerlerinden biri ve Hackathon'un "Cave2Cloud — Kapadokya'dan Global Pazara" temasına mükemmel uyuyor.
Senin IoT (LoRaWAN, sıcaklık/anomali sensörleri) ve Robotik (ESP32-CAM, QR otonom navigasyon) tabanlı altyapını, hackathon'un zorunlu yazılım kuralları (Karbon İzi, Canlı Döviz, Coğrafi Veri) ile kusursuz bir şekilde harmanlayarak jürinin istediği "tam zincir (bonus)" modeline entegre ettim.
İşte projenin Hackathon kurallarına birebir uyumlu, GitHub README veya sunum altyapısı olarak kullanabileceğin proje metni:
________________________________________
PROJE METNİ: CaveGuard - Global Doğal Depo Lojistik ve Karbon Yönetim Sistemi
1. Proje Özeti (Ne, Neden, Nasıl?)
Ne? CaveGuard, Kapadokya'daki yeraltı doğal depolarının iç ortamını (sıcaklık, nem, gaz anomalileri) LoRaWAN tabanlı sensörlerle bölgesel olarak izleyen; depo içi lojistiği ESP32-CAM ve QR kod entegreli otonom robotlarla sağlayan ve depodaki ürünlerin global pazara ihracat sürecini (Lojistik Rota, Karbon İzi, Dinamik Fiyatlandırma) bulut üzerinden yöneten uçtan uca bir sistemdir.
Neden? Doğal depoların iç lojistiği büyük oranda insan gücüne dayalıdır ve verimsizdir. Ayrıca, Kapadokya'dan globale ihraç edilen ürünlerin lojistik maliyetleri ve Avrupa Yeşil Mutabakatı kapsamında zorunlu hale gelen karbon ayak izi takibi geleneksel yöntemlerle yapılamamaktadır. CaveGuard, bu süreci dijitalleştirerek "Cave2Cloud" temasını hayata geçirir.
Nasıl? * Donanım: Depo bölümlerindeki sensör verileri LoRaWAN ile merkezi ağ geçidine aktarılır. Bulut arayüzünden bir "Sevkiyat Emri" geldiğinde, depo içi otonom robotlar harekete geçer. ESP32-CAM modülleriyle yerdeki/paletlerdeki QR kodları okuyarak hedef rotalarını belirler ve ürünleri yükleme alanına (çıkışa) taşır.
•	Yazılım: Web arayüzü üzerinden globale yapılacak sevkiyatın adresi girilir. Sistem otomatik olarak API'ler aracılığıyla rotayı çizer, karbon emisyonunu hesaplar ve TCMB canlı kurları ile toplam maliyeti hedef döviz cinsinden ekrana yansıtır.
________________________________________
2. Zorunlu Teknik Kuralların Entegrasyonu (Bonus Puan Hedefli)
Proje, jürinin özellikle vurguladığı "Bonus - Kuralların Birleşimi" maddesini tek bir hesap zincirinde birleştirir. Süreç, web arayüzünde bir "İhracat/Sevkiyat Talebi" oluşturulduğunda şu sırayla çalışır:
•	KURAL 3 (Coğrafi Veri): Kullanıcı arayüzden çıkış noktasını (Kapadokya Doğal Depo) ve hedef noktayı (Örn: Berlin, Almanya) seçer. Nominatim API kullanılarak adresler koordinata çevrilir. OpenRouteService API kullanılarak aradaki en uygun karayolu/denizyolu rotası çizilir ve toplam mesafe dinamik olarak çekilir (Hardcoded mesafe kullanılmaz).
•	KURAL 1 (Coğrafi Karbon İzi):
OpenRouteService'den dönen mesafe bilgisi (km) ve gönderilecek ürünün ağırlığı (ton) alınır. Sistem karayolu (TIR) taşımacılığı için şartnamede verilen 0.100 kg CO2 / ton-km emisyon katsayısını kullanarak sevkiyatın toplam karbon ayak izini hesaplar. Bu karbon emisyonunu dengelemek (offset) için sanal bir karbon vergisi/maliyeti çıkartılır.
•	KURAL 2 (Canlı Döviz Kuru):
Hesaplanan ürün maliyeti, lojistik maliyeti ve Karbon Vergisi maliyeti, anlık olarak TCMB EVDS API'den çekilen canlı döviz kuru (Örn: EUR/TRY) ile işlenir. Kullanıcının (Avrupalı alıcının) karşısına dinamik bir "Toplam İhracat Fiyatı (EUR)" çıkartılır. Kur dalgalanmaları maliyete anında yansır. Hardcoded kur kesinlikle kullanılmaz.
Zincir Reaksiyon (Donanım Tetiklemesi): Müşteri web arayüzünden döviz bazlı bu siparişi onayladığında, bulut sistemi deponun içindeki MQTT/Websocket sunucusuna sinyal gönderir. ESP32-CAM taşıyan robotlar uyanır, sipariş edilen ürünün bulunduğu depo bölümünün (Örn: Bölüm-A) QR kodunu tarayarak bulur ve sevkiyat alanına taşımaya başlar.
________________________________________
3. Sistem Mimarisi ve Kullanılan Teknolojiler
IoT ve Robotik Katmanı (Cave Katmanı):
•	Sensör Ağı: Çevresel verileri (Sıcaklık/Nem) okuyan ve anomalileri tespit eden LoRaWAN modülleri.
•	Otonom Taşıma: Gövdesinde ESP32-CAM barındıran robotik araçlar. Depo zeminindeki veya paletlerdeki QR kodları OpenCV/MicroPython veya C++ tabanlı bir algoritma ile okuyup önceden tanımlı yükleme hedeflerine gider.
Bulut ve Yazılım Katmanı (Cloud Katmanı - Önerilen Altyapı):
•	Frontend: Next.js / React (Vercel üzerinde deploy edilecek - Şartnamede önerilen platform)
•	Backend & Veritabanı: Supabase (Kullanıcı girişleri, depo stok verileri, anomali logları için)
•	Dış API'ler: Nominatim (Geocoding), OpenRouteService (Routing), TCMB EVDS (Döviz Kuru).
________________________________________
4. Geliştirme ve Teslimat Stratejisi (Hackathon Süreci İçin)
•	Saatlik Commitler: Teslimat zorunlulukları gereği projenin GitHub reposuna hackathon süresince düzenli ve saatlik commitler atılacaktır.
•	Canlı Demo: Proje Vercel üzerinden canlıya alınacak, jüri sunumunda lokal host yerine bu canlı link kullanılacaktır.
•	Donanım Demosu: Hackathon alanında 7 dakikalık sunum esnasında, robotun QR kodu okuyup hareket etmesi ve sensörlerden gelen anlık sıcaklık verisinin dashboard'da değişimi canlı/videolu olarak gösterilecektir.
•	İş Modeli: Cave2Cloud konsepti gereği, sistem sadece bir depo otomasyonu olarak değil, Kapadokya'daki yerel üreticinin ürünlerini karbon ayak izi hesaplanmış ve Avrupa standartlarına uygun bir şekilde (anlık kur fiyatlamasıyla) globale satabildiği bir "SaaS ve Lojistik Altyapısı" olarak jüriye pazarlanacaktır.
________________________________________
Ekip İçi Tavsiye: Şartnameye göre sunum sadece 7 dakika (3 dk demo, 2 dk iş modeli, 2 dk soru-cevap). Jürinin teknik kural uyumuna %25 ağırlık verdiği görülüyor. Sunum sırasında robotun hareket etmesini doğrudan web arayüzündeki rota (Kural 3) ve döviz (Kural 2) hesaplaması bittikten sonra "Siparişi Onayla" butonuna basılmasına bağlarsan (Siber-Fiziksel Sistem entegrasyonu), "İnovasyon" ve "Teknik Uygulama" puanlarını tavan yaptırabilirsin.

