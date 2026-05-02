"use client"

import { motion } from "framer-motion"

const metrics = [
  { value: "99.9%", label: "Sistem Uptime", description: "Kesintisiz çalışma", color: "#3498db" },
  { value: "5M+", label: "Sensör Verisi/Gün", description: "Gerçek zamanlı analiz", color: "#2ecc71" },
  { value: "<100ms", label: "Tepki Süresi", description: "Ultra hızlı işlem", color: "#e67e22" },
  { value: "45+", label: "Ülke", description: "Global erişim", color: "#3498db" },
]

export function ImpactSection() {
  return (
    <section className="px-6 py-24 relative">
      <div className="max-w-5xl mx-auto">
        {/* Impact Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#3498db] uppercase tracking-wider mb-4">Etkimiz</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Dünya Çapında Güvenilen Platform
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-balance">
            Rakamlar kendini anlatıyor. Binlerce şirketin neden bizi tercih ettiğini görün.
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:border-[#3498db]/20 transition-all duration-300 group text-center relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${metric.color}15 0%, transparent 70%)`
                }}
              />
              <div className="relative">
                <p 
                  className="font-display text-3xl md:text-4xl font-bold mb-1 transition-colors"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </p>
                <p className="text-sm font-medium text-slate-700 mb-1">{metric.label}</p>
                <p className="text-xs text-slate-400">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-slate-200"
        >
          <p className="text-center text-sm text-slate-400 mb-8">Sektörde Öncülerle Çalışıyoruz</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["Kapadokya Lojistik", "TurkCargo", "EcoTrans", "SmartPort", "AnadoluFilo"].map((partner) => (
              <span
                key={partner}
                className="text-lg font-semibold text-slate-300 hover:text-[#3498db] transition-colors cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
