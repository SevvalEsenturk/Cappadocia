"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Başlangıç",
    price: "4.999",
    features: ["1 Depo Yönetimi", "2 Robot Desteği", "10 Sensör Erişimi", "Temel Analitik"],
    button: "Hemen Başla",
    color: "bg-slate-50"
  },
  {
    name: "Profesyonel",
    price: "12.499",
    features: ["5 Depo Yönetimi", "10 Robot Desteği", "50 Sensör Erişimi", "Blockchain Kayıt", "Öncelikli Destek"],
    button: "Popüler Seçim",
    color: "bg-blue-600 text-white shadow-xl shadow-blue-200",
    popular: true
  },
  {
    name: "Kurumsal",
    price: "Teklif Al",
    features: ["Sınırsız Depo", "Filo Yönetimi", "Tam API Erişimi", "Özel Entegrasyon", "7/24 Teknik Ekip"],
    button: "İletişime Geç",
    color: "bg-slate-50"
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Hizmet Paketleri</h2>
          <p className="text-slate-500">İhtiyacınıza en uygun otonom lojistik çözümünü seçin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[2.5rem] border border-slate-100 flex flex-col ${plan.color}`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.price !== "Teklif Al" && <span className="text-sm opacity-60">₺/ay</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm font-medium">
                    <Check className={`w-4 h-4 ${plan.popular ? 'text-white' : 'text-emerald-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  plan.popular ? 'bg-white text-blue-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.button}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
