"use client"

import { motion } from "framer-motion"
import { 
  Bot, 
  Thermometer, 
  Leaf, 
  Map, 
  BarChart3, 
  Cpu,
  ArrowRight,
  Activity
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#3498db] uppercase tracking-wider mb-4">Özellikler</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Tam Entegre Lojistik Çözümü
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-balance">
            Otonom robotlardan çevresel izlemeye, karbon takibinden rota optimizasyonuna kadar her şey tek platformda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Card 1 - Robot Monitoring (wider - 3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#3498db]/10 flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Bot className="w-5 h-5 text-[#3498db]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">Otonom Robot İzleme</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">
                  Canlı kamera görüntüsü, QR kod algılama ve nesne takibi ile robotlarınızı gerçek zamanlı izleyin.
                </p>
                <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
                      <span className="text-xs text-slate-500">Robot-Alpha | Canlı</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="flex items-center gap-1.5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <Activity className="w-3 h-3 text-[#2ecc71]" />
                        <span className="text-xs text-slate-400">Aktif</span>
                      </motion.div>
                    </div>
                  </div>
                  {/* Robot status cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Batarya", value: "87%", icon: "battery" },
                      { label: "Konum", value: "A-12", icon: "location" },
                      { label: "Görev", value: "Taşıyor", icon: "task" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        className="bg-white rounded-lg p-2.5 border border-slate-100"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-slate-700 font-semibold text-sm">{stat.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Terminal log simulation */}
                  <div className="bg-slate-800 rounded-lg p-3 font-mono text-xs space-y-1">
                    {[
                      { time: "14:32:15", msg: "QR Code Detected: PKG-2847", color: "#3498db" },
                      { time: "14:32:18", msg: "Object Tracking: Active", color: "#2ecc71" },
                      { time: "14:32:22", msg: "Route Optimized: -12% distance", color: "#e67e22" },
                    ].map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-slate-500">[{log.time}]</span>
                        <span style={{ color: log.color }}>{log.msg}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 - Environmental Sensors (narrower - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#2ecc71]/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Thermometer className="w-5 h-5 text-[#2ecc71]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">Çevresel Sensörler</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">Sıcaklık, nem ve gaz seviyesi takibi.</p>
                <div className="mt-auto space-y-3">
                  {[
                    { label: "Sıcaklık", value: "23.5°C", percent: 70, color: "#e67e22" },
                    { label: "Nem", value: "45%", percent: 45, color: "#3498db" },
                    { label: "Gaz (ppm)", value: "120", percent: 30, color: "#2ecc71" },
                  ].map((sensor, i) => (
                    <div key={sensor.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{sensor.label}</span>
                        <span className="text-slate-700 font-medium">{sensor.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: sensor.color }}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${sensor.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3 - Carbon Footprint (narrower - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#2ecc71]/10 flex items-center justify-center"
                    whileHover={{ y: -2 }}
                  >
                    <Leaf className="w-5 h-5 text-[#2ecc71]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">Karbon Yönetimi</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">Karbon ayak izi hesaplama ve raporlama.</p>
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-3">
                    <motion.span
                      className="text-4xl font-display font-bold text-[#2ecc71]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      -42%
                    </motion.span>
                    <span className="text-slate-400 text-sm">karbon azaltımı</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100">
                    <div className="flex justify-between text-slate-500 mb-2">
                      <span>Bu Ay</span>
                      <span className="text-[#2ecc71] font-medium">1,245 kg CO2</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Geçen Ay</span>
                      <span className="text-slate-400">2,147 kg CO2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 4 - Route Optimization (wider - 3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#e67e22]/10 flex items-center justify-center"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Map className="w-5 h-5 text-[#e67e22]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">Sevkiyat ve Rota Optimizasyonu</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">Mesafe, maliyet ve karbon ayak izi hesaplama ile akıllı rota planlama.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-auto">
                  {[
                    { label: "Mesafe", value: "847 km", color: "#3498db" },
                    { label: "Karbon", value: "234 kg", color: "#2ecc71" },
                    { label: "Maliyet (EUR)", value: "1,245", color: "#e67e22" },
                    { label: "Maliyet (USD)", value: "1,358", color: "#e67e22" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100"
                    >
                      <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                      <p className="font-semibold" style={{ color: stat.color }}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ x: 6 }}
                  className="mt-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#3498db] transition-colors"
                >
                  Tüm entegrasyonları gör <ArrowRight className="w-4 h-4" />
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 5 - Analytics Dashboard (full width on mobile, 2 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#3498db]/10 flex items-center justify-center"
                  >
                    <BarChart3 className="w-5 h-5 text-[#3498db]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">Analitik Panel</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">24 saatlik çevresel veri grafikleri.</p>
                {/* Mini chart visualization */}
                <div className="mt-auto">
                  <div className="flex items-end gap-1 h-20">
                    {[35, 55, 40, 75, 50, 85, 60, 70, 45, 90, 65, 80].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-sm origin-bottom"
                        style={{
                          background: i % 2 === 0 
                            ? "linear-gradient(to top, #3498db, #5dade2)" 
                            : "linear-gradient(to top, #2ecc71, #58d68d)"
                        }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: h / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.04, ease: "easeOut" }}
                        whileHover={{ scaleY: 1, transition: { duration: 0.2 } }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 6 - IoT Integration (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-3"
          >
            <Card className="group h-full overflow-hidden glass-card hover:border-[#3498db]/20 transition-all duration-300 rounded-2xl border-0">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-[#3498db]/10 flex items-center justify-center"
                  >
                    <Cpu className="w-5 h-5 text-[#3498db]" />
                  </motion.div>
                  <p className="font-heading font-semibold text-slate-800">50+ IoT Entegrasyonu</p>
                </div>
                <p className="text-slate-500 text-sm mb-5">Tum sensor ve cihazlarinizi tek platformda yonetin.</p>
                <div className="grid grid-cols-6 gap-2 mt-auto">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="aspect-square rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer hover:border-[#3498db]/30 transition-colors"
                    >
                      <div 
                        className="w-5 h-5 rounded"
                        style={{
                          backgroundColor: ["#3498db", "#2ecc71", "#e67e22", "#3498db", "#2ecc71", "#e67e22"][i] + "20"
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
