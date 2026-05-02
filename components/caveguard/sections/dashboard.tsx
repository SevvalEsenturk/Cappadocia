"use client"

import { useState } from "react"
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

// Mock data for different sections
const sectionsData = {
  "Bölüm A": {
    temp: 12.5,
    humidity: 68,
    gas: 0.02,
    status: "Optimal",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: true,
  },
  "Bölüm B": {
    temp: 14.8,
    humidity: 72,
    gas: 0.05,
    status: "Dikkat",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: true,
  },
  "Bölüm C": {
    temp: 11.2,
    humidity: 60,
    gas: 0.01,
    status: "Optimal",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: false,
  },
  "Bölüm D": {
    temp: 13.1,
    humidity: 65,
    gas: 0.03,
    status: "Optimal",
    targetTemp: 12,
    targetHumidity: 65,
    ventilation: true,
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
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// Sub-component: Warehouse Map (Indoor Mapping)
function WarehouseMap({ selectedSection, onSelectSection }: { selectedSection: string, onSelectSection: (s: string) => void }) {
  const sections = [
    { id: "Bölüm A", x: 50, y: 50, w: 140, h: 100, color: "oklch(0.65 0.18 155)" },
    { id: "Bölüm B", x: 210, y: 50, w: 140, h: 100, color: "oklch(0.6 0.15 230)" },
    { id: "Bölüm C", x: 50, y: 170, w: 140, h: 100, color: "oklch(0.6 0.15 230)" },
    { id: "Bölüm D", x: 210, y: 170, w: 140, h: 100, color: "oklch(0.65 0.18 155)" },
  ]

  return (
    <Card className="glass-card border-0 glow-border-blue h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Navigation className="w-4 h-4 text-primary" />
          İç Mekan Haritalama (Nevşehir Depo-1)
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex items-center justify-center p-4">
        <svg viewBox="0 0 400 320" className="w-full max-w-[500px] h-auto">
          {/* Warehouse Walls */}
          <rect x="20" y="20" width="360" height="280" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" rx="10" />
          
          {/* Corridor */}
          <rect x="190" y="20" width="20" height="280" fill="currentColor" fillOpacity="0.05" />

          {/* Sections */}
          {sections.map((s) => (
            <motion.g 
              key={s.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectSection(s.id)}
              className="cursor-pointer"
            >
              <rect 
                x={s.x} y={s.y} width={s.w} height={s.h} 
                fill={selectedSection === s.id ? s.color : "currentColor"} 
                fillOpacity={selectedSection === s.id ? 0.2 : 0.05}
                stroke={selectedSection === s.id ? s.color : "currentColor"}
                strokeWidth={selectedSection === s.id ? 2 : 1}
                strokeOpacity={selectedSection === s.id ? 1 : 0.2}
                rx="8"
              />
              <text 
                x={s.x + s.w / 2} y={s.y + s.h / 2} 
                textAnchor="middle" 
                fontSize="12" 
                fill="currentColor" 
                fillOpacity="0.8"
                style={{ fontWeight: selectedSection === s.id ? 700 : 400 }}
              >
                {s.id}
              </text>
              {/* Fake Robot Indicator */}
              {s.id === "Bölüm B" && (
                <motion.circle 
                  cx={s.x + 20} cy={s.y + 20} r="4" 
                  fill="oklch(0.65 0.16 55)" 
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.g>
          ))}
        </svg>
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
           <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-success" /> Optimal
           </div>
           <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-accent" /> Dikkat
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
  const [selectedSection, setSelectedSection] = useState("Bölüm A")
  const currentData = sectionsData[selectedSection as keyof typeof sectionsData]

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
        <motion.div variants={itemVariants}>
          <ClimateControls sectionName={selectedSection} data={currentData} />
        </motion.div>
      </div>

      {/* Selected Section Sensors */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
              Bölüm Sıcaklığı <Thermometer className="w-3 h-3 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.temp}°C</div>
            <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
              <ThermometerSnowflake className="w-2 h-2" /> Hedef: {currentData.targetTemp}°C
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 glow-border-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
              Nem Oranı <Droplets className="w-3 h-3 text-success" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.humidity}%</div>
            <div className="text-[10px] text-muted-foreground mt-1">Hedef: %{currentData.targetHumidity}</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 glow-border-orange">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
              Gaz Seviyesi <Wind className="w-3 h-3 text-accent" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.gas} <small className="text-[10px]">ppm</small></div>
            <div className="text-[10px] text-success mt-1">Güvenli Aralığın Altında</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center justify-between">
              Havalandırma <Fan className={`w-3 h-3 ${currentData.ventilation ? "text-success animate-spin" : "text-muted-foreground"}`} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.ventilation ? "AKTİF" : "KAPALI"}</div>
            <div className="text-[10px] text-muted-foreground mt-1">RPM: {currentData.ventilation ? "1450" : "0"}</div>
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
