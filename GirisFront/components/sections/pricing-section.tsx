"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Profesyonel",
    description: "Depo içi operasyonlar için kapsamlı çözüm",
    price: "2,499",
    currency: "TRY",
    period: "/ay",
    features: [
      "Depo içi takip sistemi",
      "Depo anomali tespiti",
      "Gerekli IoT cihazlar",
      "API erişimi",
      "Cloud depolama alanı",
      "Temel analitik raporlar",
      "E-posta desteği",
    ],
    cta: "Demo için Tıklayınız!!",
    highlighted: true,
  },
  {
    name: "Kurumsal",
    description: "Depo içi sevkiyat dahil tam entegrasyon",
    price: "Özel",
    currency: "",
    period: "",
    features: [
      "Profesyonel paketteki her şey",
      "Depo içi sevkiyat yönetimi",
      "Özel müşteri temsilcisi",
      "SLA garantisi",
      "Sınırsız depolama",
      "Gelişmiş güvenlik",
      "Özel eğitim ve onboarding",
      "7/24 öncelikli destek",
    ],
    cta: "Satış ile Görüşün",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#3498db] uppercase tracking-wider mb-4">Fiyatlandırma</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Şeffaf ve Basit Fiyatlandırma
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-balance text-lg">
            Gizli ücret yok. Sürpriz yok. Size uygun planı seçin.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-2xl flex flex-col h-full ${
                plan.highlighted 
                  ? "bg-gradient-to-b from-[#3498db]/10 to-[#2ecc71]/5 border-2 border-[#3498db]/30 glow-blue" 
                  : "glass-card"
              }`}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="mb-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#3498db] text-white">
                    En Popüler
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-slate-800">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-slate-800">
                  {plan.currency && <span className="text-lg text-slate-400 mr-1">{plan.currency}</span>}
                  {plan.price}
                </span>
                <span className="text-sm text-slate-400">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? "text-[#2ecc71]" : "text-[#3498db]"}`} />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#"
                className={`block w-full py-3 px-6 text-center rounded-full font-medium text-sm transition-all mt-auto ${
                  plan.highlighted
                    ? "bg-[#3498db] text-white hover:bg-[#2980b9] hover:shadow-lg hover:shadow-[#3498db]/20"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-slate-400 mt-8"
        >
          Tüm planlar 14 günlük ücretsiz deneme süresi içerir. Kredi kartı gerekmez.
        </motion.p>
      </div>
    </section>
  )
}
