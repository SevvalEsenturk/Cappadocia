"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    text: "PeriCloud ile operasyonel verimliliğimiz %40 arttı. Otonom robot takibi sayesinde depo yönetimi çok daha kolay.",
    name: "Ahmet Yılmaz",
    role: "Operasyon Direktörü, TurkCargo",
  },
  {
    text: "Doğal depolama alanlarındaki karbon ayak izi raporlama özelliği sürdürülebilirlik hedeflerimize katkı sağladı.",
    name: "Zeynep Kaya",
    role: "Sürdürülebilirlik Müdürü, EcoTrans",
  },
  {
    text: "Gerçek zamanlı sensör verileri ile mağara içi sıcaklık ve nem kontrolü artık sorun olmaktan çıktı.",
    name: "Mehmet Demir",
    role: "Lojistik Müdürü, Kapadokya Lojistik",
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Müşteri Yorumları</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Sektör liderlerinin PeriCloud hakkındaki görüşleri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm relative"
            >
              <div className="flex gap-1 mb-4 text-orange-400">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 italic mb-6">"{item.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
