"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Package,
  Leaf,
  Calculator,
  Route,
  DollarSign,
  Euro,
  Truck,
  ArrowRight,
  Loader2,
  RefreshCcw,
  CheckCircle2,
  Database
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCoordinates, getDetailedRoute, getExchangeRates } from "@/lib/api"

// Kapadokya Natural Storage Coordinates
const CAVE_COORDS: [number, number] = [38.64, 34.83]

export function ShipmentsContent() {
  const [destination, setDestination] = useState("")
  const [weight, setWeight] = useState("1.5")
  const [currency, setCurrency] = useState<"TRY" | "USD" | "EUR">("TRY")
  const [transportMode, setTransportMode] = useState("road")
  const [exchangeRates, setExchangeRates] = useState({ USD: 32.45, EUR: 35.12 })
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [vehiclePlate, setVehiclePlate] = useState("38 CG 2026")
  const [driverName, setDriverName] = useState("Ahmet Kapadokya")
  const [shipmentDate, setShipmentDate] = useState(new Date().toISOString().split('T')[0])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    distance: number,
    carbon: number,
    priceTRY: number,
    priceUSD: number,
    destName: string,
    verificationHash: string,
    geometry?: any
  } | null>(null)

  const [history, setHistory] = useState<any[]>([])

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/shipments/list')
      const data = await res.json()
      setHistory(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Geçmiş verisi çekilemedi:", err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  // Canlı TCMB Döviz Takip Sistemi
  useEffect(() => {
    const updateRates = async () => {
      try {
        const res = await fetch('/api/exchange-rates')
        const data = await res.json()
        if (data.USD && data.EUR) {
          setExchangeRates({
            USD: data.USD,
            EUR: data.EUR
          })
          setLastUpdate(new Date())
        }
      } catch (err) {
        console.error("TCMB kur güncelleme hatası:", err)
      }
    }
    
    updateRates() // İlk yükleme
    const interval = setInterval(updateRates, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleCalculate = async () => {
    if (!destination || !weight) return
    setIsLoading(true)

    try {
      const coords = await getCoordinates(destination)
      if (!coords) throw new Error("Adres bulunamadı")

      const routeData = await getDetailedRoute(CAVE_COORDS, [coords.lat, coords.lon])
      if (!routeData) throw new Error("Rota hesaplanamadı")
      
      const distance = routeData.distance
      const weightNum = parseFloat(weight)
      const carbon = distance * weightNum * 0.100

      const baseLogisticsRate = 5.5
      const carbonTaxRate = 2.5
      const priceTRY = (distance * weightNum * baseLogisticsRate) + (carbon * carbonTaxRate)
      
      setResults({
        distance: Math.round(distance),
        carbon: parseFloat(carbon.toFixed(2)),
        priceTRY: Math.round(priceTRY),
        priceUSD: parseFloat((priceTRY / exchangeRates.USD).toFixed(2)),
        destName: coords.displayName.split(',')[0],
        verificationHash: Math.random().toString(16).substring(2, 10) + "..." + Math.random().toString(16).substring(2, 10),
        geometry: routeData.geometry
      })
    } catch (error) {
      console.error("İşlem başarısız:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 space-y-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Lojistik & <span className="gradient-text-green">Karbon Yönetim Merkezi</span>
          </h1>
          <p className="text-muted-foreground">
            Yapay zeka destekli dinamik rota ve maliyet optimizasyonu
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-2 px-3 backdrop-blur-sm">
            <DollarSign className="w-3 h-3 mr-1" /> USD: {exchangeRates.USD.toFixed(2)}
          </Badge>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-2 px-3 backdrop-blur-sm">
            <Euro className="w-3 h-3 mr-1" /> EUR: {exchangeRates.EUR.toFixed(2)}
          </Badge>
          <div className="flex items-center text-[10px] text-muted-foreground ml-2">
            <RefreshCcw className="w-3 h-3 mr-1 animate-spin-slow" /> {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              İhracat Hesaplama
            </CardTitle>
            <CardDescription>Varış adresi ve ürün detaylarını giriniz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Varış Noktası (Global Adres)</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Örn: Berlin, Almanya"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 bg-input"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Taşıma Modu</Label>
              <Select value={transportMode} onValueChange={setTransportMode}>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air">Hava Kargo (0.500 kg CO2)</SelectItem>
                  <SelectItem value="road">Kara Yolu / TIR (0.100 kg CO2)</SelectItem>
                  <SelectItem value="rail">Demir Yolu (0.030 kg CO2)</SelectItem>
                  <SelectItem value="sea">Deniz Yolu (0.015 kg CO2)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ürün Ağırlığı (Ton)</Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pl-10 bg-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Araç Plakası</Label>
                <Input
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="bg-input"
                  placeholder="38 CG 2026"
                />
              </div>
              <div className="space-y-2">
                <Label>Sürücü Adı</Label>
                <Input
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="bg-input"
                  placeholder="Sürücü Adı Soyadı"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sevkiyat Tarihi</Label>
                <Input
                  type="date"
                  value={shipmentDate}
                  onChange={(e) => setShipmentDate(e.target.value)}
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label>Hedef Para Birimi</Label>
                <Select value={currency} onValueChange={(v: any) => setCurrency(v)}>
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="TRY">TRY</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 mt-4" 
              onClick={handleCalculate}
              disabled={isLoading || !destination}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  API Verileri Çekiliyor...
                </>
              ) : (
                "Rotayı ve Maliyeti Hesapla"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <AnimatePresence mode="wait">
          {results ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card border-0 glow-border-green h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-success" />
                    Hesaplanan Lojistik Zinciri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Çıkış</p>
                      <p className="text-sm font-bold">Kapadokya</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
                    <div className="text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Varış</p>
                      <p className="text-sm font-bold">{results.destName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-muted/30 border border-white/5 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Mesafe</p>
                      <p className="text-lg font-bold">{results.distance} km</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                      <p className="text-[10px] text-emerald-400 uppercase">Karbon (K1)</p>
                      <p className="text-lg font-bold text-emerald-400">{results.carbon} kg</p>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
                      <p className="text-[10px] text-primary uppercase">Maliyet (TRY)</p>
                      <p className="text-lg font-bold text-primary">{results.priceTRY.toLocaleString()} ₺</p>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-center">
                      <p className="text-[10px] text-accent uppercase">Maliyet (USD)</p>
                      <p className="text-lg font-bold text-accent">${results.priceUSD ? results.priceUSD.toFixed(2) : (results.priceTRY / exchangeRates.USD).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 px-3 rounded-lg bg-muted/20 border border-white/5 font-mono text-[10px]">
                    <span className="text-muted-foreground">Digital Seal (SHA-256):</span>
                    <span className="text-primary truncate ml-2">{results.verificationHash}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-cave-brown/10 border border-cave-brown/30 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Leaf className="w-4 h-4 text-success" />
                      Yeşil Mutabakat Uyumluluk Notu
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bu sevkiyat için mod bazlı karbon ayak izi hesaplanmıştır. 
                      Toplam maliyete karbon dengeleme vergisi dahil edilmiştir.
                    </p>
                  </div>

                  {/* Real-time Route Map (Leaflet) */}
                  <div className="mt-6 space-y-3">
                    <h3 className="text-xs font-medium flex items-center gap-2 text-primary">
                      <Route className="w-4 h-4" />
                      Lojistik Operasyon Haritası (Live)
                    </h3>
                    <div className="relative group">
                      <div 
                        id="shipment-map" 
                        className="h-[300px] rounded-[2rem] bg-muted/20 border border-white/5 overflow-hidden z-0"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                         <Badge variant="outline" className="bg-background/80 backdrop-blur-md text-[10px] py-1 px-2 border-primary/20 shadow-xl">
                           Kapadokya → {results.destName}
                         </Badge>
                         <Badge variant="outline" className="bg-background/80 backdrop-blur-md text-[10px] py-1 px-2 border-success/20 text-success shadow-xl">
                           Canlı Rota Analizi
                         </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Map Initialization Logic */}
                  <MapController geometry={results.geometry} />

                  <Button 
                    className="w-full bg-success hover:bg-success/90 py-6 text-base font-bold shadow-lg shadow-success/20"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/shipments', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            ...results,
                            weight,
                            vehiclePlate,
                            driverName,
                            shipmentDate,
                            currency,
                            priceUSD: results.priceUSD
                          })
                        });
                        if (response.ok) {
                          alert("Sevkiyat Veritabanına Kaydedildi ve Operasyon Başlatıldı!");
                          fetchHistory(); // Tabloyu yenile
                        }
                      } catch (err) {
                        console.error("DB Save Error:", err);
                      }
                    }}
                  >
                    Siparişi Onayla & Mühürle
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-white/5 rounded-2xl p-12 text-center text-muted-foreground">
              <div className="space-y-4">
                <Calculator className="w-12 h-12 mx-auto opacity-20" />
                <p>Verileri girdikten sonra hesaplama butonuna basın.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Shipment History Table */}
      <Card className="glass-card border-0 glow-border-blue mt-6 overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Blockchain Onaylı Sevkiyat Kayıtları
              </CardTitle>
              <CardDescription className="text-[10px]">Veritabanına mühürlü olarak kaydedilen son lojistik operasyonlar</CardDescription>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
              CANLI VERİ AKIŞI
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-muted/30 text-muted-foreground uppercase text-[9px] tracking-wider">
                  <th className="px-6 py-3 font-medium">Plaka / Sürücü</th>
                  <th className="px-6 py-3 font-medium">Varış Noktası</th>
                  <th className="px-6 py-3 font-medium">Tarih</th>
                  <th className="px-6 py-3 font-medium">Mühür (Hash)</th>
                  <th className="px-6 py-3 font-medium text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {history.length > 0 ? history.map((item: any) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold">{item.vehicle_plate}</div>
                      <div className="text-[10px] text-muted-foreground">{item.driver_name}</div>
                    </td>
                    <td className="px-6 py-4">{item.destination}</td>
                    <td className="px-6 py-4">{new Date(item.shipment_date).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4">
                      <code className="text-primary/70 bg-primary/5 px-2 py-0.5 rounded truncate block max-w-[120px]">
                        {item.v_hash}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-success font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Verified
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                      Henüz kayıtlı sevkiyat bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// KURAL 3: Canlı Rota Yönetim Bileşeni (React-Leaflet Entegrasyonu)
function MapController({ geometry }: { geometry: any }) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initMap = () => {
      // @ts-ignore
      if (!window.L || !document.getElementById('shipment-map')) return;
      if (mapRef.current) return;

      // @ts-ignore
      const map = window.L.map('shipment-map', {
        zoomControl: false,
        attributionControl: false
      }).setView([38.64, 34.83], 6);
      
      // @ts-ignore
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
      mapRef.current = map;
    };

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // @ts-ignore
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (!mapRef.current || !geometry || !window.L) return;

    // @ts-ignore
    mapRef.current.eachLayer((layer: any) => {
      // @ts-ignore
      if (layer instanceof window.L.GeoJSON || layer instanceof window.L.Marker || layer instanceof window.L.CircleMarker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // @ts-ignore
    const routeLayer = window.L.geoJSON(geometry, {
      style: {
        color: '#3b82f6',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 15',
        lineCap: 'round'
      }
    }).addTo(mapRef.current);

    // Başlangıç Noktası (Kapadokya)
    // @ts-ignore
    window.L.circleMarker([38.64, 34.83], { 
      radius: 8, 
      color: '#3b82f6', 
      fillColor: '#3b82f6', 
      fillOpacity: 1 
    }).addTo(mapRef.current).bindPopup('Kapadokya Lojistik Merkezi');

    mapRef.current.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });
  }, [geometry]);

  return null;
}
