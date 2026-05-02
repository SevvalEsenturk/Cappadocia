"use client"

import { motion } from "framer-motion"

const metrics = [
  { value: "99.9%", label: "Sistem Uptime", description: "Kesintisiz çalışma", color: "#3498db" },
  { value: "5M+", label: "Sensör Verisi/Gün", description: "Gerçek zamanlı analiz", color: "#2ecc71" },
  { value: "<100ms", label: "Tepki Süresi", description: "Ultra hızlı işlem", color: "#e67e22" },
  { value: "1200+", label: "Ton Kapasite", description: "Toplam Depolama", color: "#3498db" },
]

export function ImpactSection() {
  return (
    <section className="px-6 py-24 relative bg-white/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Etkimiz</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Rakamlarla CaveGuard Gücü
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Kapadokya'nın doğal yapısını korurken, teknolojinin sınırlarını zorlayan verimlilik değerleri.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm text-center relative overflow-hidden group"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ background: metric.color }}
              />
              <p className="text-3xl md:text-4xl font-black mb-2" style={{ color: metric.color }}>
                {metric.value}
              </p>
              <p className="text-sm font-bold text-slate-700 mb-1">{metric.label}</p>
              <p className="text-xs text-slate-400">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-slate-100 text-center"
        >
          <p className="text-sm text-slate-400 mb-8 font-bold uppercase tracking-widest">Sektörün Öncüleri CaveGuard Kullanıyor</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            {["Kapadokya Lojistik", "TurkCargo", "EcoTrans", "SmartPort", "AnadoluFilo"].map((partner) => (
              <span key={partner} className="text-xl font-black text-slate-300">{partner}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
