"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// ═══════════════════════════════════════════════════
//  GLOBAL ÇEVİRİ SİSTEMİ (TR / EN)
// ═══════════════════════════════════════════════════

const allTranslations: Record<string, Record<string, string>> = {
  tr: {
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.shipments": "Sevkiyat Yönetimi",
    "nav.robots": "Robot İzleme",
    "nav.analytics": "Analizler",
    "nav.settings": "Ayarlar",
    "nav.logout": "Oturumu Kapat",
    "nav.systemOnline": "Sistem Çevrimiçi",
    "nav.allActive": "Tüm sistemler aktif",
    "nav.darkMode": "Aydınlık Mod",
    "nav.lightMode": "Karanlık Mod",

    // Header
    "header.sysAdmin": "Sistem Yöneticisi",
    "header.fieldOp": "Saha Operatörü",

    // Shipments
    "ship.title": "Lojistik & Karbon Yönetim Merkezi",
    "ship.subtitle": "Yapay zeka destekli dinamik rota ve maliyet optimizasyonu",
    "ship.calcTitle": "İhracat Hesaplama",
    "ship.calcDesc": "Varış adresi ve ürün detaylarını giriniz",
    "ship.destination": "Varış Noktası (Global Adres)",
    "ship.destPlaceholder": "Örn: Berlin, Almanya",
    "ship.transportMode": "Taşıma Modu",
    "ship.weight": "Ürün Ağırlığı (Ton)",
    "ship.plate": "Araç Plakası",
    "ship.driver": "Sürücü Adı",
    "ship.date": "Sevkiyat Tarihi",
    "ship.currency": "Hedef Para Birimi",
    "ship.calculate": "Rotayı ve Maliyeti Hesapla",
    "ship.calculating": "API Verileri Çekiliyor...",
    "ship.resultsTitle": "Hesaplanan Lojistik Zinciri",
    "ship.from": "Çıkış",
    "ship.to": "Varış",
    "ship.distance": "Mesafe",
    "ship.carbon": "Karbon (K1)",
    "ship.costTRY": "Maliyet (TRY)",
    "ship.costUSD": "Maliyet (USD)",
    "ship.confirm": "Siparişi Onayla & Mühürle",
    "ship.mapTitle": "Lojistik Operasyon Haritası (Live)",
    "ship.liveRoute": "Canlı Rota Analizi",
    "ship.historyTitle": "Blockchain Onaylı Sevkiyat Kayıtları",
    "ship.historyDesc": "Veritabanına mühürlü olarak kaydedilen son lojistik operasyonlar",
    "ship.liveData": "CANLI VERİ AKIŞI",
    "ship.plateDriver": "Plaka / Sürücü",
    "ship.destCol": "Varış Noktası",
    "ship.dateCol": "Tarih",
    "ship.hashCol": "Mühür (Hash)",
    "ship.statusCol": "Durum",
    "ship.noRecords": "Henüz kayıtlı sevkiyat bulunmuyor.",
    "ship.emptyState": "Verileri girdikten sonra hesaplama butonuna basın.",
    "ship.cbamTitle": "AB SKDM (CBAM) Uyumluluk Raporu",
    "ship.cbamClass": "SINIF",
    "ship.embeddedEmission": "Gömülü Emisyon",
    "ship.cbamTax": "CBAM Vergisi",
    "ship.cbamCert": "Sertifika",
    "ship.cbamReg": "AB Yönetmeliği 2023/956:",
    "ship.air": "Hava Kargo (0.500 kg CO2)",
    "ship.road": "Kara Yolu / TIR (0.100 kg CO2)",
    "ship.rail": "Demir Yolu (0.030 kg CO2)",
    "ship.sea": "Deniz Yolu (0.015 kg CO2)",

    // Robots
    "robot.title": "Robot Filo Takip Merkezi",
    "robot.subtitle": "Kapadokya yeraltı deposu — otonom lojistik robotlarının canlı izlenmesi",
    "robot.systemActive": "Sistem Aktif",
    "robot.onDuty": "Görevde",
    "robot.mapTitle": "Depo Yerleşim Planı",
    "robot.mapDesc": "Robotlar yalnızca yeşil ana koridorda hareket eder • Localara giremezler",
    "robot.corridor": "Koridor",
    "robot.loca": "Loca",
    "robot.robot": "Robot",
    "robot.upperLoca": "Üst Loca Sırası (Ürün Depolama)",
    "robot.lowerLoca": "Alt Loca Sırası (Ürün Depolama)",
    "robot.safetyRule": "Güvenlik Kuralı:",
    "robot.safetyDesc": "Robotlar loca içine giremez. Ürün yükleme/boşaltma işlemi loca kapısında, ana koridor üzerinden yapılır.",
    "robot.selectedRobot": "Seçili Robot",
    "robot.battery": "Batarya Durumu",
    "robot.position": "Konum",
    "robot.cargo": "Taşınan Yük",
    "robot.fleetSummary": "Filo Özeti",
    "robot.logs": "Operasyon Logları",
    "robot.onDutyStatus": "● Görevde",
    "robot.chargingStatus": "⚡ Şarjda",
    "robot.idleStatus": "○ Bekliyor",
    "robot.entrance": "GİRİŞ",
    "robot.exit": "ÇIKIŞ",

    // Settings
    "set.notifications": "Bildirim Tercihleri",
    "set.notifDesc": "Tüm kullanıcılar düzenleyebilir",
    "set.criticalAlerts": "Kritik Sistem Uyarıları",
    "set.shipmentUpdates": "Sevkiyat Güncellemeleri",
    "set.robotAlerts": "Robot Durum Bildirimleri",
    "set.appearance": "Görünüm Ayarları",
    "set.appearanceDesc": "Tüm kullanıcılar düzenleyebilir",
    "set.darkMode": "Karanlık Mod",
    "set.lightMode": "Aydınlık Mod",
    "set.language": "Sistem Dili",
    "set.security": "Güvenlik Ayarları",
    "set.securityDescAdmin": "Tam erişim yetkiniz var",
    "set.securityDescUser": "Bu bölüm yalnızca yönetici hesabıyla erişilebilir",
    "set.apiKey": "API Anahtarı (Production)",
    "set.copy": "Kopyala",
    "set.twoFactor": "Çift Faktörlü Doğrulama (2FA)",
    "set.autoBackup": "Otomatik Yedekleme",
    "set.systemConfig": "Sistem Konfigürasyonu",
    "set.sysDescAdmin": "Kritik sistem parametreleri",
    "set.sysDescUser": "Bu bölüm yalnızca yönetici hesabıyla erişilebilir",
    "set.refreshRate": "Veri Yenileme Hızı",
    "set.robotMaxSpeed": "Robot Maks. Hız (m/s)",
    "set.tempThreshold": "Sıcaklık Uyarı Eşiği (°C)",
    "set.saveBtn": "Ayarları Güncelle",
    "set.saving": "Kaydediliyor...",
    "set.saved": "Ayarlar başarıyla kaydedildi",
    "set.adminRequired": "Admin Yetkisi Gerekli",
    "set.adminRequiredDesc": "Bu ayarlara erişmek için admin/admin ile giriş yapmalısınız",
    "set.sysAdminRequiredDesc": "Sistem konfigürasyonu değişiklikleri admin onayı gerektirir",
    "set.sysAdmin": "🛡️ Sistem Yöneticisi",
    "set.fieldOp": "👷 Saha Operatörü",
    "set.adminOnlyWarn": "Bazı ayarlar yalnızca admin erişimine açıktır",
    "set.every1s": "Her 1 saniye (Yüksek Performans)",
    "set.every5s": "Her 5 saniye (Dengeli)",
    "set.every10s": "Her 10 saniye (Ekonomik)",
    "set.notifEnabled": "✅ Bildirimler aktif edildi",
    "set.notifDisabled": "🔕 Bildirimler kapatıldı",
  },
}

interface I18nContextType {
  lang: string
  setLang: (lang: string) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType>({
  lang: "tr",
  setLang: () => {},
  t: (key) => key
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return allTranslations["tr"]?.[key] || key
  }

  return (
    <I18nContext.Provider value={{ lang: "tr", setLang: () => {}, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
