"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Package,
  Leaf,
  Clock,
  Target,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"

const monthlyShipments = [
  { month: "Oca", shipments: 45, carbon: 1250 },
  { month: "Şub", shipments: 52, carbon: 1420 },
  { month: "Mar", shipments: 48, carbon: 1310 },
  { month: "Nis", shipments: 61, carbon: 1580 },
  { month: "May", shipments: 55, carbon: 1450 },
  { month: "Haz", shipments: 67, carbon: 1720 },
]

const efficiencyData = [
  { name: "Robot Verimi", value: 94, color: "oklch(0.6 0.15 230)" },
  { name: "Depo Doluluk", value: 78, color: "oklch(0.65 0.18 155)" },
  { name: "Enerji Tasarrufu", value: 86, color: "oklch(0.65 0.16 55)" },
]

const kpiCards = [
  {
    title: "Toplam Sevkiyat",
    value: "328",
    change: "%+12",
    trend: "up",
    icon: Package,
    color: "blue",
  },
  {
    title: "Karbon Tasarrufu",
    value: "2.4t",
    change: "%+8",
    trend: "up",
    icon: Leaf,
    color: "green",
  },
  {
    title: "Ort. Teslimat Süresi",
    value: "4.2 sa",
    change: "%-15",
    trend: "up",
    icon: Clock,
    color: "orange",
  },
  {
    title: "Hedef Başarısı",
    value: "%96",
    change: "%+3",
    trend: "up",
    icon: Target,
    color: "blue",
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
          Performans{" "}
          <span className="gradient-text-blue">Analizleri</span>
        </h1>
        <p className="text-muted-foreground">
          Detaylı istatistikler, trendler ve operasyonel veriler
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
                  kpi.color === "blue"
                    ? "glow-border-blue"
                    : kpi.color === "green"
                    ? "glow-border-green"
                    : "glow-border-orange"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        kpi.color === "blue"
                          ? "bg-primary/10"
                          : kpi.color === "green"
                          ? "bg-success/10"
                          : "bg-accent/10"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          kpi.color === "blue"
                            ? "text-primary"
                            : kpi.color === "green"
                            ? "text-success"
                            : "text-accent"
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-1 text-success text-xs">
                      <TrendingUp className="w-3 h-3" />
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Shipments Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-card border-0 glow-border-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Aylık Sevkiyat ve Karbon Analizi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyShipments}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.65 0.01 250)", fontSize: 12 }}
                    />
                    <YAxis
                      yAxisId="shipments"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.65 0.01 250)", fontSize: 12 }}
                    />
                    <YAxis
                      yAxisId="carbon"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.65 0.01 250)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 250 / 0.95)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                      }}
                      labelStyle={{ color: "oklch(0.95 0.01 250)" }}
                    />
                    <Bar
                      yAxisId="shipments"
                      dataKey="shipments"
                      fill="oklch(0.6 0.15 230)"
                      radius={[4, 4, 0, 0]}
                      name="Sevkiyat"
                    />
                    <Bar
                      yAxisId="carbon"
                      dataKey="carbon"
                      fill="oklch(0.65 0.18 155)"
                      radius={[4, 4, 0, 0]}
                      name="Karbon (kg)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Efficiency Pie Chart */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-green h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Verimlilik Metrikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={efficiencyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {efficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.16 0.01 250 / 0.95)",
                        border: "1px solid oklch(1 0 0 / 0.1)",
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                      }}
                      formatter={(value: number) => [`%${value}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {efficiencyData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">%{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Carbon Trend */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-0 glow-border-orange">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-success" />
              Karbon Ayak İzi Trendi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyShipments}>
                  <defs>
                    <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="oklch(0.65 0.18 155)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.65 0.18 155)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.65 0.01 250)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.65 0.01 250)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.01 250 / 0.95)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: "12px",
                      backdropFilter: "blur(20px)",
                    }}
                    labelStyle={{ color: "oklch(0.95 0.01 250)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="carbon"
                    stroke="oklch(0.65 0.18 155)"
                    strokeWidth={2}
                    fill="url(#carbonGradient)"
                    name="Karbon (kg CO2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
