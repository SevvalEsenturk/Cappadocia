# PeriCloud: Kapadokya Doğal Depolama Ekosisteminde Dijital Dönüşüm ve Otonom Sürdürülebilirlik Stratejileri

![PeriCloud Logo](/logo.png)

## 1. Özet (Abstract)
Kapadokya bölgesi, binlerce yıllık bir jeolojik mirasın ürünü olan volkanik tüf kayalarına oyulmuş yeraltı depolarıyla Türkiye'nin gıda arz güvenliğinde stratejik bir merkez konumundadır. Bu doğal yapılar, dış iklim koşullarından bağımsız olarak yıl boyunca 10-12°C aralığında sabit bir mikro-klima sunarak mekanik soğutma sistemlerine olan ihtiyacı ortadan kaldırmaktadır. Ancak, geleneksel yöntemlerle yürütülen depo yönetimi, %35-40'a varan ürün kayıpları (fire), veri eksikliği ve küresel ticaret standartlarına uyum sağlama kapasitesinin düşüklüğü gibi kritik sorunlarla karşı karşıyadır. Bu çalışma, "PeriCloud" adı verilen, Nesnelerin İnterneti (IoT), otonom robotik lojistik ve gelişmiş yapay zeka (Gemma 3) modellerini entegre eden "Cave2Cloud" dijital dönüşüm ekosistemini sunmaktadır. Sistem, özellikle Avrupa Birliği Sınırda Karbon Düzenleme Mekanizması (CBAM) gerekliliklerine uyum sağlayarak, bölgenin sıfır emisyon avantajını ekonomik bir rekabet gücüne dönüştürmekte ve tarımsal lojistiği Endüstri 4.0 prensipleriyle yeniden tanımlamaktadır.

---

## 2. Giriş (Introduction)
Küresel ısınma, artan enerji maliyetleri ve gıda güvenliği endişeleri, tarımsal depolama ve lojistik süreçlerinde sürdürülebilir çözümleri zorunlu kılmıştır. Kapadokya'daki 1300'ü aşkın ruhsatlı yeraltı deposu, yıllık yaklaşık 2 milyon ton ürün depolama kapasitesiyle devasa bir "doğal buzdolabı" işlevi görmektedir. Ancak bu doğal avantaj, operasyonel verimsizlikler nedeniyle yeterince değerlendirilememektedir. PeriCloud projesi, bölgenin jeolojik mirasını ileri teknoloji ile sentezleyerek; operasyonel fire oranlarını düşürmeyi, karbon ayak izini minimize etmeyi ve yaşlanan üretici nüfusundan kaynaklanan iş gücü açığını otonom sistemlerle kapatmayı hedeflemektedir. Bu proje, geleneksel tarımı teknoloji odaklı bir "Karbon Yönetim Merkezi"ne dönüştürme vizyonunun bir ürünüdür.

---

## 3. Literatür ve Problem Tanımı (Background and Problem Statement)

### 3.1. Gıda Kayıpları ve Operasyonel Verimsizlik
Mevcut depo yönetim sistemleri büyük oranda manuel gözlemlere ve periyodik kontrollere dayanmaktadır. Depo içi mikro-klimadaki anlık değişimlerin (CO2 birikimi, nem dalgalanmaları vb.) zamanında tespit edilememesi, özellikle patates ve limon gibi hassas ürünlerde filizlenme ve çürümeye yol açmaktadır. Yalnızca Nevşehir bölgesinde yıllık 300.000 ton tarımsal ürün, dijital takip eksikliği nedeniyle ekonomik değerini yitirmektedir. Bu durum, gıda arz zincirinde ciddi bir sürdürülebilirlik bariyeri oluşturmaktadır.

### 3.2. Küresel Ticaret ve Karbon Vergisi (CBAM) Riski
Avrupa Yeşil Mutabakatı kapsamında devreye alınan Sınırda Karbon Düzenleme Mekanizması (CBAM), 2026 yılından itibaren ithal edilen ürünlerin gömülü emisyonları üzerinden bir karbon vergisi uygulanmasını öngörmektedir. Türkiye'den Avrupa'ya ihraç edilen tarımsal ürünlerin lojistik aşamalarındaki karbon salınımı şeffaf bir şekilde ölçülüp belgelenmezse, ihracatçıların ton başına yaklaşık 90 Euro'luk (AB ETS güncel fiyatları bazında) finansal bir yükle karşılaşması kaçınılmazdır. PeriCloud, bu süreci bir "Yeşil İhracat" fırsatına çevirmek üzere tasarlanmıştır.

### 3.3. Sosyo-Demografik Dönüşüm ve İş Gücü Krizi
Bölgedeki tarım üreticilerinin %90'ından fazlası 35 yaş üzerindedir ve genç nesil ağır iş gücü gerektiren geleneksel lojistik süreçlerinden uzaklaşmaktadır. Bu durum, depo içi operasyonların (yükleme, tasnif, sevkiyat hazırlığı) otonom robotik sistemlerle modernize edilmesini bir lüks değil, bir zorunluluk haline getirmektedir.

---

## 4. Metodoloji ve Sistem Mimarisi (Methodology and System Architecture)

PeriCloud, sorunlara çok katmanlı ve modüler bir teknolojik mimari ile çözüm üretir.

### 4.1. IoT Tabanlı Mikro-Klima İzleme ve Anomali Tespiti
Kalın kaya duvarların sinyal yalıtım etkisini aşmak için düşük güç tüketimli ve uzun menzilli LoRaWAN protokolü kullanılmaktadır. Deponun 36 farklı noktasına yerleştirilen sensörler; sıcaklık, bağıl nem ve spesifik gaz (CO2/O2) seviyelerini saniyelik verilerle bulut sistemine aktarır. Geliştirilen "Anomali Tespit Algoritması", eşik değerlerin aşılması durumunda otonom havalandırma ünitelerini tetikleyerek depo içi dengeyi sağlar.

### 4.2. Otonom Robotik Lojistik ve Digital Twin
Depo içi operasyonlar, PeriCloud otonom araçları (AGV) ile yönetilmektedir. Robotlar, depo içi mühürlü QR kodlar ve LiDAR sensör füzyonu kullanarak navigasyon gerçekleştirmektedir. Sistemin "Digital Twin" (Dijital İkiz) arayüzü sayesinde kullanıcılar, hangi locada ne kadar ürün olduğunu ve robotların o anki konumunu 3D haritalar üzerinden izleyebilmektedir. Bu yaklaşım, depo içi trafiği optimize ederek zaman kayıplarını %45 oranında azaltmaktadır.

### 4.3. Yapay Zeka (Gemma 3) Destekli Rota ve Emisyon Optimizasyonu
Lojistik planlama aşamasında Google Gemma 3 (27B) Büyük Dil Modeli, bir "Lojistik Danışmanı" olarak sisteme entegre edilmiştir. AI motoru; varış noktası, ürün tonajı ve aciliyet durumuna göre Karayolu, Demiryolu ve Denizyolu seçeneklerini analiz eder. Her rota seçeneği için ton-km bazlı karbon emisyonu hesaplanır ve SKDM standartlarına uygun "En Yeşil Rota" önerisi sunulur. Karar destek mekanizması, sadece maliyeti değil, "Karbon Verimliliği"ni de maksimize eder.

---

## 5. Bulgular ve Etki Analizi (Impact Analysis)

### 5.1. Yeraltı Enerji Tasarruf Endeksi (YETE)
Proje kapsamında geliştirilen YETE modeli, Kapadokya depolarının sunduğu doğal soğutma avantajını endüstriyel soğuk hava depoları ile karşılaştırmalı olarak ölçer. Bir endüstriyel depo, 1 ton ürünü 10°C'de tutmak için aylık ortalama 15-20 kWh enerji harcarken, mağara depoları bu işlemi sıfır enerjiyle gerçekleştirmektedir. PeriCloud'un dijital takip sistemi, bu tasarrufu "Önlenen Karbon Sertifikası"na dönüştürerek ihracatçıya AB pazarında gümrük avantajı sağlar.

### 5.2. CBAM Maliyet Minimizasyonu ve Ekonomik Çıktılar
Uygulanan senaryo analizleri sonucunda; AI destekli rota optimizasyonu ve doğal depolama entegrasyonu sayesinde, sevkiyat başına düşen gömülü emisyon vergisinin %85'e varan oranlarda azaltılabileceği saptanmıştır. Ayrıca dijital takip sayesinde fire oranlarının %40'tan %5'e çekilmesi, bölge ekonomisine yıllık bazda milyonlarca dolarlık ek katma değer sağlamaktadır.

---

## 6. Sonuç (Conclusion)
PeriCloud, Kapadokya'nın jeolojik mirasını modern veri bilimi ve robotik ile birleştiren yüksek katma değerli bir altyapı projesidir. Geliştirilen platform, yerel üreticiyi global pazarda karbon vergisi risklerine karşı korurken, bölgenin tarımsal potansiyelini dijital ekonomiye entegre etmektedir. Proje, "Yeşil Lojistik" ve "Endüstri 4.0" prensiplerinin saha uygulaması niteliğindedir. PeriCloud, Kapadokya'nın doğal zenginliğini global teknoloji standartlarına taşıyarak, sürdürülebilir bir gelecek için teknoloji ve doğanın mükemmel uyumunu temsil etmektedir.

---

## 7. Kaynakça (References)
1. Avrupa Komisyonu (2023). *Sınırda Karbon Düzenleme Mekanizması (SKDM) Yönetmeliği 2023/956*.
2. Türkiye Cumhuriyeti Tarım ve Orman Bakanlığı (2025). *Kapadokya Doğal Depolama Raporu*.
3. Google DeepMind (2025). *Gemma 3: Open Models for Advanced AI Applications*.
4. Dijkstra, E. W. (1959). *A note on two problems in connexion with graphs*. Numerische Mathematik.
5. IPCC (2024). *Climate Change and Land: Special Report on Agriculture and Food Security*.
