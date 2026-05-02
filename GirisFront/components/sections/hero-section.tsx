"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LiquidCtaButton } from "@/components/buttons/liquid-cta-button"
import { Bot, ArrowRight, Cpu, Leaf, BarChart3 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#3498db]/15 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#2ecc71]/15 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
          <span className="text-sm text-slate-600">Sistem Çevrimiçi — v2.0 Yapay Zeka Destekli</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-slate-800 block">Lojistiği Yeniden</span>
          <span className="bg-gradient-to-r from-[#3498db] via-[#2ecc71] to-[#3498db] bg-clip-text text-transparent">
            Tanımlıyoruz.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
        >
          Otonom robotlar, çevresel sensörler ve karbon ayak izi takibi ile 
          lojistik operasyonlarınızı dönüştürün. Gerçek zamanlı izleme ve 
          yapay zeka destekli analiz.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#pricing">
            <LiquidCtaButton>Ücretsiz Deneyin</LiquidCtaButton>
          </Link>
          <Link
            href="#features"
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-500 hover:text-[#3498db] transition-colors"
          >
            <span>Nasıl Çalışır?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Bot, label: "Otonom Robotlar", color: "#3498db" },
            { icon: Cpu, label: "IoT Sensörler", color: "#2ecc71" },
            { icon: Leaf, label: "Karbon Takibi", color: "#e67e22" },
            { icon: BarChart3, label: "Analitik Panel", color: "#3498db" },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-[#3498db]/30 transition-colors cursor-default"
            >
              <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
              <span className="text-sm text-slate-600">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative"
        >
          <div className="glass-card rounded-2xl p-2 glow-blue">
            <div className="rounded-xl overflow-hidden border border-[#3498db]/10">
              <img
                src="/analytics-dashboard-light-mode.jpg"
                alt="LogiSense Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -left-4 top-1/4 hidden lg:block"
          >
            <div className="glass-card rounded-xl p-4 glow-green">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2ecc71]/15 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#2ecc71]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Karbon Tasarrufu</p>
                  <p className="text-lg font-semibold text-slate-800">-42%</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute -right-4 bottom-1/4 hidden lg:block"
          >
            <div className="glass-card rounded-xl p-4 glow-blue">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#3498db]/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#3498db]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Aktif Robotlar</p>
                  <p className="text-lg font-semibold text-slate-800">24/7</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
