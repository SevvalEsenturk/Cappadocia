"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Activity, 
  Map as MapIcon, 
  Fan, 
  Settings2, 
  AlertCircle,
  ThermometerSnowflake,
  Navigation
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Mock data for Warehouses and their specific Locations (Locas)
const warehousesData = {
  "Depo-1 (Kuzey)": {
    temp: 12.5,
    humidity: 68,
    gas: 0.02,
    status: "Optimal",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: true,
    activeLocas: ["L-101", "L-102", "L-105"],
    totalLocas: 24
  },
  "Depo-2 (Güney)": {
    temp: 14.8,
    humidity: 72,
    gas: 0.05,
    status: "Dikkat",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: true,
    activeLocas: ["L-201", "L-204"],
    totalLocas: 32
  },
  "Depo-3 (Batı)": {
    temp: 11.2,
    humidity: 60,
    gas: 0.01,
    status: "Optimal",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: false,
    activeLocas: ["L-310"],
    totalLocas: 16
  }
}

const environmentHistory = [
  { time: "00:00", temperature: 12.2, humidity: 68 },
  { time: "04:00", temperature: 12.5, humidity: 67 },
  { time: "08:00", temperature: 12.8, humidity: 65 },
  { time: "12:00", temperature: 13.1, humidity: 64 },
  { time: "16:00", temperature: 12.9, humidity: 66 },
  { time: "20:00", temperature: 12.6, humidity: 68 },
  { time: "24:00", temperature: 12.4, humidity: 69 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// Sub-component: Warehouse Map (Indoor Mapping)
function WarehouseMap({ selectedSection, onSelectSection }: { selectedSection: string, onSelectSection: (s: string) => void }) {
  const warehouses = [
    { id: "Depo-1 (Kuzey)", x: 30, y: 30, w: 150, h: 120, color: "oklch(0.65 0.18 155)" },
    { id: "Depo-2 (Güney)", x: 220, y: 30, w: 150, h: 120, color: "oklch(0.6 0.15 230)" },
    { id: "Depo-3 (Batı)", x: 30, y: 170, w: 150, h: 120, color: "oklch(0.6 0.15 230)" },
  ]

  return (
    <Card className="glass-card border-0 glow-border-blue h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          Kapadokya Doğal Depo & Loca İzleme
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex items-center justify-center p-4">
        <svg viewBox="0 0 400 320" className="w-full max-w-[500px] h-auto">
          {/* Warehouse Base Grid */}
          <rect x="10" y="10" width="380" height="300" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" rx="12" />
          
          {/* Main Access Road */}
          <rect x="190" y="10" width="20" height="300" fill="currentColor" fillOpacity="0.03" />

          {/* Warehouses */}
          {warehouses.map((w) => (
            <motion.g 
              key={w.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => onSelectSection(w.id)}
              className="cursor-pointer"
            >
              <rect 
                x={w.x} y={w.y} width={w.w} height={w.h} 
                fill={selectedSection === w.id ? w.color : "currentColor"} 
                fillOpacity={selectedSection === w.id ? 0.15 : 0.05}
                stroke={selectedSection === w.id ? w.color : "currentColor"}
                strokeWidth={selectedSection === w.id ? 2 : 1}
                strokeOpacity={selectedSection === w.id ? 1 : 0.2}
                rx="8"
              />
              
              {/* Loca Grid (Visual only) */}
              {Array.from({ length: 6 }).map((_, i) => (
                <rect 
                  key={i} 
                  x={w.x + 10 + (i % 3) * 45} 
                  y={w.y + 40 + Math.floor(i / 3) * 35} 
                  width="35" height="25" 
                  fill="currentColor" fillOpacity="0.05" rx="2" 
                />
              ))}

              <text 
                x={w.x + w.w / 2} y={w.y + 25} 
                textAnchor="middle" 
                fontSize="10" 
                fill="currentColor" 
                className="font-bold uppercase tracking-wider"
              >
                {w.id}
              </text>
            </motion.g>
          ))}
        </svg>
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[9px] text-muted-foreground uppercase tracking-widest font-mono">
           <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_var(--success)]" /> Optimal
           </div>
           <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" /> Kritik
           </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sub-component: Climate Controls
function ClimateControls({ sectionName, data }: { sectionName: string, data: any }) {
  return (
    <Card className="glass-card border-0 glow-border-orange h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-accent" />
          {sectionName} İklimlendirme Ayarları
        </CardTitle>
        <CardDescription>Hedef değerleri ve sistem modlarını belirleyin</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Hedef Sıcaklık</label>
            <span className="text-xs font-bold text-primary">{data.targetTemp}°C</span>
          </div>
          <Slider defaultValue={[data.targetTemp]} max={25} min={5} step={0.5} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Hedef Nem</label>
            <span className="text-xs font-bold text-success">{data.targetHumidity}%</span>
          </div>
          <Slider defaultValue={[data.targetHumidity]} max={90} min={40} step={1} />
        </div>

        <div className="pt-4 border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-medium">Otonom Havalandırma</label>
              <p className="text-[10px] text-muted-foreground">Sensör verilerine göre otomatik fan kontrolü</p>
            </div>
            <Switch defaultChecked={data.ventilation} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-medium">Turbo Mod</label>
              <p className="text-[10px] text-muted-foreground">Hızlı soğutma/nem dengeleme</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardContent() {
  const [selectedSection, setSelectedSection] = useState("Depo-1 (Kuzey)")
  const [warehouses, setWarehouses] = useState(warehousesData)
  const [locas, setLocas] = useState<any[]>([])
  const [selectedLoca, setSelectedLoca] = useState<any | null>(null)
  const [targets, setTargets] = useState({ temp: 12, humidity: 65 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Sensors
        const sensorRes = await fetch('/api/sensors')
        const sensorData = await sensorRes.json()
        if (sensorData && sensorData.length > 0) {
          const latest = sensorData[0]
          setWarehouses(prev => ({
            ...prev,
            [latest.depo_id]: {
              ...prev[latest.depo_id as keyof typeof prev],
              temp: parseFloat(latest.temp),
              humidity: parseFloat(latest.humidity),
              gas: parseFloat(latest.gas)
            }
          }))
        }

        // Fetch Locas for selected Warehouse
        const locasRes = await fetch(`/api/locas?depo_id=${encodeURIComponent(selectedSection)}`)
        const locasData = await locasRes.json()
        const fetchedLocas = Array.isArray(locasData) ? locasData : []
        setLocas(fetchedLocas)
        
        // Eğer seçili loca yoksa veya seçili loca bu depoya ait değilse ilk locayı seç
        if (fetchedLocas.length > 0) {
          if (!selectedLoca || !fetchedLocas.find(l => l.id === selectedLoca.id)) {
            setSelectedLoca(fetchedLocas[0])
          }
        } else {
          setSelectedLoca(null)
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [selectedSection])

  const currentData = warehouses[selectedSection as keyof typeof warehouses]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Nevşehir <span className="gradient-text-blue">Doğal Depo Yönetimi</span>
          </h1>
          <p className="text-muted-foreground">
            Bölgesel sensör verileri ve otonom iklimlendirme kontrolü
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1.5 px-3">
            <MapIcon className="w-3 h-3 mr-2" /> Bölge: Kapadokya-1
          </Badge>
          <Badge variant="outline" className="bg-success/5 text-success border-success/20 py-1.5 px-3">
            <Activity className="w-3 h-3 mr-2" /> Sistem: Stabil
          </Badge>
        </div>
      </motion.div>

      {/* Main Grid: Map and Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="xl:col-span-2">
          <WarehouseMap selectedSection={selectedSection} onSelectSection={setSelectedSection} />
        </motion.div>
        
        {/* Climate Controls */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-orange h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-accent" />
                {selectedLoca ? `${selectedLoca.id} İklimlendirme Ayarları` : 'İklimlendirme Ayarları'}
              </CardTitle>
              <CardDescription>IoT cihazı hedef değerlerini ve sistem modlarını belirleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Hedef Sıcaklık</label>
                  <span className="text-xs font-bold text-primary">{targets.temp}°C</span>
                </div>
                <Slider 
                  value={[targets.temp]} 
                  onValueChange={(v) => setTargets(prev => ({ ...prev, temp: v[0] }))}
                  max={25} min={5} step={0.5} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Hedef Nem</label>
                  <span className="text-xs font-bold text-success">{targets.humidity}%</span>
                </div>
                <Slider 
                  value={[targets.humidity]} 
                  onValueChange={(v) => setTargets(prev => ({ ...prev, humidity: v[0] }))}
                  max={90} min={40} step={1} 
                />
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-xs font-medium">Otonom Havalandırma</label>
                    <p className="text-[10px] text-muted-foreground">Sensör verilerine göre otomatik fan kontrolü</p>
                  </div>
                  <Switch defaultChecked={currentData.ventilation} />
                </div>
                <Button className="w-full bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                  Ayarları Uygula
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selected Loca Sensors */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedLoca ? (
          <>
            <Card className="glass-card border-0 glow-border-blue">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  {selectedLoca.id} Sıcaklığı <Thermometer className="w-3 h-3 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Her loca için benzersiz ama tutarlı bir değer üretelim (örnek: depo verisinden ufak sapmalar) */}
                <div className="text-2xl font-bold">{(currentData.temp + (parseInt(selectedLoca.id.replace(/\D/g,'') || "0") % 3) * 0.4).toFixed(1)}°C</div>
                <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <ThermometerSnowflake className="w-2 h-2" /> Hedef: {targets.temp}°C
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 glow-border-green">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  {selectedLoca.id} Nem Oranı <Droplets className="w-3 h-3 text-success" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">%{(currentData.humidity + (parseInt(selectedLoca.id.replace(/\D/g,'') || "0") % 5) - 2).toFixed(1)}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Hedef: %{targets.humidity}</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 glow-border-orange">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  {selectedLoca.id} Gaz Seviyesi <Wind className="w-3 h-3 text-accent" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.max(0.01, currentData.gas - 0.01).toFixed(2)} <small className="text-[10px]">ppm</small></div>
                <div className="text-[10px] text-success mt-1">Güvenli Aralığın Altında</div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  {selectedLoca.id} Havalandırma <Fan className={`w-3 h-3 ${currentData.ventilation ? "text-success animate-spin" : "text-muted-foreground"}`} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.ventilation ? "AKTİF" : "KAPALI"}</div>
                <div className="text-[10px] text-muted-foreground mt-1">RPM: {currentData.ventilation ? "1450" : "0"}</div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="col-span-full p-8 text-center text-muted-foreground bg-muted/10 rounded-2xl border border-white/5">
            Lütfen detaylarını görmek için aşağıdan bir loca seçiniz.
          </div>
        )}

        <Card className="glass-card border-0 glow-border-blue col-span-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium flex items-center gap-2">
              <Activity className="w-3 h-3 text-primary" />
              Loca Durumları ({selectedSection})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(locas) && locas.length > 0 ? (
                locas.map((loca: any) => (
                  <div 
                    key={loca.id} 
                    onClick={() => setSelectedLoca(loca)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer",
                      selectedLoca?.id === loca.id 
                        ? "bg-primary/10 border-primary/40 shadow-[0_0_15px_rgba(52,152,219,0.1)]" 
                        : "bg-muted/20 border-white/5 hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={cn("text-xs font-bold", selectedLoca?.id === loca.id && "text-primary")}>{loca.id}</span>
                      <Badge variant="outline" className={cn(
                        "text-[9px] py-0",
                        loca.hammadde === "Boş" ? "bg-muted text-muted-foreground" : "bg-success/10 text-success border-success/20"
                      )}>
                        {loca.hammadde}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Doluluk</span>
                        <span className="font-mono">%{loca.occupancy}</span>
                      </div>
                      <Progress value={loca.occupancy} className="h-1" />
                    </div>
                    {/* Loca bazlı mini sensör özeti */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-primary/70"/> {(currentData.temp + (parseInt(loca.id.replace(/\D/g,'') || "0") % 3) * 0.4).toFixed(1)}°C</div>
                      <div className="flex items-center gap-1"><Droplets className="w-3 h-3 text-success/70"/> %{(currentData.humidity + (parseInt(loca.id.replace(/\D/g,'') || "0") % 5) - 2).toFixed(1)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-xs text-muted-foreground italic">
                  Bu depo için loca verisi bulunamadı. Lütfen /api/init-db rotasını çalıştırın.
                </div>
              )}
            </div>
            {Array.isArray(locas) && (
              <p className="text-[10px] text-muted-foreground mt-4 text-center italic">
                Toplam {currentData.totalLocas} locadan {locas.filter(l => l.hammadde !== "Boş").length} tanesi dolu.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Historical Data Section */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Bölgesel Geçmiş Analizi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={environmentHistory}>
                  <XAxis dataKey="time" hide />
                  <Tooltip 
                    contentStyle={{ background: "rgba(0,0,0,0.8)", border: "none", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Area type="monotone" dataKey="temperature" stroke="#3498db" fill="rgba(52, 152, 219, 0.1)" />
                  <Area type="monotone" dataKey="humidity" stroke="#2ecc71" fill="rgba(46, 204, 113, 0.1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
