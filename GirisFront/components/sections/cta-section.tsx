"use client"

import Link from "next/link"
import { ArrowRight, Bot, Leaf, BarChart3 } from "lucide-react"
import { LiquidCtaButton } from "@/components/buttons/liquid-cta-button"
import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section className="px-6 py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3498db]/8 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Feature icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {[
            { icon: Bot, color: "#3498db" },
            { icon: Leaf, color: "#2ecc71" },
            { icon: BarChart3, color: "#e67e22" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center"
            >
              <item.icon className="w-6 h-6" style={{ color: item.color }} />
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-slate-800 mb-6"
        >
          Lojistiğinizi Dönüştürmeye
          <span className="block bg-gradient-to-r from-[#3498db] to-[#2ecc71] bg-clip-text text-transparent">
            Hazır mısınız?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-500 mb-10 text-balance"
        >
          Binlerce şirket zaten LogiSense ile operasyonlarını optimize ediyor. 
          Siz de ücretsiz deneme ile başlayın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#pricing">
            <LiquidCtaButton>Demo için Tıklayınız!!</LiquidCtaButton>
          </Link>
          <Link
            href="#"
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-500 hover:text-[#3498db] transition-colors"
          >
            <span>Demo Talep Et</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2ecc71]" />
            <span>Kredi kartı gerekmez</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3498db]" />
            <span>5 dakikada kurulum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#e67e22]" />
            <span>7/24 destek</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
