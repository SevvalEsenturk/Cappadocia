"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  Leaf,
  Target,
  BrainCircuit,
  Euro,
  Zap,
  Globe2,
  ShieldCheck,
  TrendingDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts"

// 1. YETE (Yeraltı Enerji Tasarruf Endeksi) Verisi
const energySavingsData = [
  { month: "Oca", mekanikEnerji: 420, dogalDepoEnerji: 45, tasarruf: 375 },
  { month: "Şub", mekanikEnerji: 390, dogalDepoEnerji: 42, tasarruf: 348 },
  { month: "Mar", mekanikEnerji: 450, dogalDepoEnerji: 48, tasarruf: 402 },
  { month: "Nis", mekanikEnerji: 510, dogalDepoEnerji: 50, tasarruf: 460 },
  { month: "May", mekanikEnerji: 680, dogalDepoEnerji: 55, tasarruf: 625 },
  { month: "Haz", mekanikEnerji: 850, dogalDepoEnerji: 60, tasarruf: 790 },
]

// 2. AB CBAM (Karbon Vergisi) Karşılaştırma Verisi (Maliyet €)
const cbamCostData = [
  { dest: "Almanya", standartVergi: 4200, periCloudVergi: 0 },
  { dest: "Fransa", standartVergi: 3800, periCloudVergi: 0 },
  { dest: "Hollanda", standartVergi: 5100, periCloudVergi: 450 },
  { dest: "İtalya", standartVergi: 2900, periCloudVergi: 0 },
  { dest: "İspanya", standartVergi: 3400, periCloudVergi: 120 },
]

// 3. Gemma 3 AI Karar Dağılımı (Lojistik Modu Önerileri)
const aiDecisionsData = [
  { name: "Demir Yolu (Optimum)", value: 55, color: "oklch(0.65 0.18 155)" }, // Yeşil
  { name: "Deniz Yolu (Düşük Karbon)", value: 30, color: "oklch(0.6 0.15 230)" }, // Mavi
  { name: "Kara Yolu (Zorunlu)", value: 15, color: "oklch(0.65 0.16 55)" }, // Turuncu
]

const kpiCards = [
  {
    title: "Önlenen CBAM Karbon Vergisi",
    value: "€14,250",
    change: "Bu Çeyrek",
    trend: "up",
    icon: Euro,
    color: "green",
    desc: "AB Sınırında sıfır emisyon avantajı"
  },
  {
    title: "Enerji Tasarrufu (YETE)",
    value: "450 MWh",
    change: "Yıllık",
    trend: "up",
    icon: Zap,
    color: "blue",
    desc: "Mekanik soğutma yerine doğal depo"
  },
  {
    title: "Yapay Zeka (Gemma) Kazancı",
    value: "$8,400",
    change: "%+15 Lojistik kârı",
    trend: "up",
    icon: BrainCircuit,
    color: "violet",
    desc: "Otonom rota ve mod optimizasyonu"
  },
  {
    title: "Sertifikalı Yeşil İhracat",
    value: "1,250 Ton",
    change: "Blockchain Onaylı",
    trend: "up",
    icon: ShieldCheck,
    color: "emerald",
    desc: "Uluslararası standartlarda doğrulanmış"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function AnalyticsContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Sürdürülebilirlik & <span className="gradient-text-green">Finansal Etki</span>
        </h1>
        <p className="text-muted-foreground">
          Sıfır enerji depoları, CBAM vergisi analizi ve otonom lojistik tasarrufları
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <motion.div key={kpi.title} variants={itemVariants}>
              <Card
                className={`glass-card card-hover border-0 ${
                  kpi.color === "blue" ? "glow-border-blue"
                    : kpi.color === "green" || kpi.color === "emerald" ? "glow-border-green"
                    : kpi.color === "violet" ? "glow-border-purple"
                    : "glow-border-orange"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        kpi.color === "blue" ? "bg-primary/10 text-primary"
                          : kpi.color === "green" || kpi.color === "emerald" ? "bg-success/10 text-success"
                          : kpi.color === "violet" ? "bg-violet-500/10 text-violet-400"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-success text-[10px] font-bold uppercase tracking-wider bg-success/10 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-mono">{kpi.value}</p>
                  <p className="text-xs font-bold text-muted-foreground mt-1">{kpi.title}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">{kpi.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CBAM Vergi Karşılaştırması */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-card border-0 glow-border-green h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe2 className="w-4 h-4 text-success" />
                AB CBAM (Karbon Vergisi) Yükü Karşılaştırması
              </CardTitle>
              <CardDescription className="text-[11px]">
                Hedef ülkelere ihracatta Standart Depolama vs PeriCloud entegrasyonu kaynaklı vergi maliyetleri (€)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cbamCostData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="dest"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      tickFormatter={(value) => `€${value}`}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      contentStyle={{
                        backgroundColor: "rgba(10,10,10,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                        fontSize: '12px'
                      }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                    <Bar
                      dataKey="standartVergi"
                      name="Standart İhracat Vergisi (€)"
                      fill="oklch(0.65 0.16 55)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                    <Bar
                      dataKey="periCloudVergi"
                      name="PeriCloud İhracat Vergisi (€)"
                      fill="oklch(0.65 0.18 155)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Yapay Zeka Karar Dağılımı */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-purple h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BrainCircuit className="w-4 h-4 text-violet-400" />
                Gemma 3 Lojistik Optimizasyonu
              </CardTitle>
              <CardDescription className="text-[11px]">Yapay zeka otonom taşıma modu seçimleri</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aiDecisionsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {aiDecisionsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: "rgba(0,0,0,0.9)", border: "none", borderRadius: "8px", fontSize: "12px" }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-2 mt-4">
                {aiDecisionsData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold">%{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* YETE Enerji Tasarrufu */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <Card className="glass-card border-0 glow-border-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Leaf className="w-4 h-4 text-primary" />
                Yeraltı Enerji Tasarruf Endeksi (YETE)
              </CardTitle>
              <CardDescription className="text-[11px]">
                Kapadokya Doğal Depoları kullanılarak mekanik soğutmaya kıyasla sağlanan enerji tasarrufu (kWh x 1000)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energySavingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTasarruf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.6 0.15 230)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="oklch(0.6 0.15 230)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMekanik" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.65 0.16 55)" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="oklch(0.65 0.16 55)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "rgba(10,10,10,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="mekanikEnerji" 
                      name="Mekanik Soğutma İhtiyacı" 
                      stroke="oklch(0.65 0.16 55)" 
                      fillOpacity={1} 
                      fill="url(#colorMekanik)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tasarruf" 
                      name="PeriCloud Net Enerji Tasarrufu" 
                      stroke="oklch(0.6 0.15 230)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTasarruf)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
      </div>
    </motion.div>
  )
}
