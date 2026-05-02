"use client"

import { motion } from "framer-motion"
import { Bot, Cpu, Leaf, ShieldCheck, Map, BarChart3 } from "lucide-react"

const features = [
  {
    title: "Otonom Depo Robotları",
    description: "Kapadokya'nın zorlu mağara koşullarına özel tasarlanmış, otonom navigasyon yapabilen robot filosu.",
    icon: Bot,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Mağara IoT Sensörleri",
    description: "Sıcaklık, nem ve gaz değerlerini anlık takip eden, doğal yapıyı koruyan kablosuz sensör ağı.",
    icon: Cpu,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Karbon Ayak İzi Takibi",
    description: "Doğal soğutma sayesinde %90 enerji tasarrufu ve lojistik rotalarda karbon emisyon analizi.",
    icon: Leaf,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Dijital Mühür (Blockchain)",
    description: "Tüm sevkiyat ve depo hareketleri SHA-256 dijital mühürlerle değiştirilemez şekilde kaydedilir.",
    icon: ShieldCheck,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Akıllı Rotalama",
    description: "OpenRouteService entegrasyonu ile canlı trafik ve maliyet odaklı sevkiyat planlaması.",
    icon: Map,
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "Yönetim Paneli",
    description: "Tüm operasyonu tek bir merkezden izleyebileceğiniz, yapay zeka destekli yönetim arayüzü.",
    icon: BarChart3,
    color: "bg-slate-50 text-slate-600"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Teknolojik Avantajlar</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Doğal depolama alanlarını geleceğin teknolojisiyle buluşturan temel özelliklerimiz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-[#f8fafc] hover:bg-white hover:shadow-xl transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
