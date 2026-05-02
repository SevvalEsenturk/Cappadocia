"use client"

import { useState, useEffect } from "react"
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
  CheckCircle2
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
import { getCoordinates, getRouteDistance, getExchangeRates } from "@/lib/api"

// Kapadokya Natural Storage Coordinates
const CAVE_COORDS: [number, number] = [38.64, 34.83]

export function ShipmentsContent() {
  const [destination, setDestination] = useState("")
  const [weight, setWeight] = useState("10")
  const [currency, setCurrency] = useState<"TRY" | "EUR" | "USD">("EUR")
  const [isLoading, setIsLoading] = useState(false)
  const [rates, setRates] = useState<{ EUR: number, USD: number } | null>(null)
  const [results, setResults] = useState<{
    distance: number,
    carbon: number,
    priceTRY: number,
    priceDisplay: number,
    destName: string
  } | null>(null)

  // Initial currency fetch
  useEffect(() => {
    getExchangeRates().then(setRates)
  }, [])

  const handleCalculate = async () => {
    if (!destination || !weight) return
    setIsLoading(true)

    try {
      // 1. Get Destination Coordinates (KURAL 3)
      const coords = await getCoordinates(destination)
      if (!coords) throw new Error("Adres bulunamadı")

      // 2. Get Route Distance (KURAL 3)
      const distance = await getRouteDistance(CAVE_COORDS, [coords.lat, coords.lon])
      
      // 3. Calculate Carbon Footprint (KURAL 1)
      // Formula: distance (km) * weight (ton) * 0.100 kg CO2/ton-km
      const weightNum = parseFloat(weight)
      const carbon = distance * weightNum * 0.100

      // 4. Calculate Price with Live FX (KURAL 2)
      const baseLogisticsRate = 5.5 // TRY per ton-km
      const carbonTaxRate = 2.5 // TRY per kg CO2
      const priceTRY = (distance * weightNum * baseLogisticsRate) + (carbon * carbonTaxRate)
      
      let priceDisplay = priceTRY
      if (rates) {
        if (currency === "EUR") priceDisplay = priceTRY / rates.EUR
        else if (currency === "USD") priceDisplay = priceTRY / rates.USD
      }

      setResults({
        distance: Math.round(distance),
        carbon: parseFloat(carbon.toFixed(2)),
        priceTRY: Math.round(priceTRY),
        priceDisplay: parseFloat(priceDisplay.toFixed(2)),
        destName: coords.displayName.split(',')[0]
      })
    } catch (error) {
      console.error("Calculation failed:", error)
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
            Global <span className="gradient-text-green">Lojistik & Karbon Paneli</span>
          </h1>
          <p className="text-muted-foreground">
            Kural 1, 2 ve 3 tabanlı dinamik ihracat yönetim sistemi
          </p>
        </div>
        {rates && (
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-2">
            <RefreshCcw className="w-3 h-3 mr-2" /> Canlı Kur: 1 EUR = {rates.EUR.toFixed(2)} TRY
          </Badge>
        )}
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

            <div className="grid grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-muted/30 border border-white/5">
                      <p className="text-[10px] text-muted-foreground">Mesafe</p>
                      <p className="text-lg font-bold">{results.distance} <small className="text-xs">km</small></p>
                    </div>
                    <div className="p-3 rounded-xl bg-success/5 border border-success/20">
                      <p className="text-[10px] text-success">Karbon (K1)</p>
                      <p className="text-lg font-bold text-success">{results.carbon} <small className="text-xs">kg</small></p>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/5 border border-accent/20">
                      <p className="text-[10px] text-accent">Maliyet (K2)</p>
                      <p className="text-lg font-bold text-accent">{results.priceDisplay} <small className="text-xs">{currency}</small></p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cave-brown/10 border border-cave-brown/30 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Leaf className="w-4 h-4 text-success" />
                      Yeşil Mutabakat Uyumluluk Notu
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bu sevkiyat için 0.100 katsayısı ile karbon ayak izi hesaplanmıştır. 
                      Toplam maliyete karbon dengeleme vergisi dahil edilmiştir.
                    </p>
                  </div>

                  <Button className="w-full bg-success hover:bg-success/90">
                    Siparişi Onayla & Robotu Tetikle
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

      {/* Dynamic Map Component Placeholder */}
      <Card className="glass-card border-0 overflow-hidden">
        <div className="h-48 bg-muted/20 relative flex items-center justify-center">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="z-10 flex items-center gap-3 bg-background/80 p-3 rounded-full border border-white/10 backdrop-blur-md">
            <Route className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">OpenRouteService Canlı Rota Katmanı</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
