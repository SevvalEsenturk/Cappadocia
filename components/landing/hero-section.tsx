"use client"

import { motion } from "framer-motion"
import { Bot, ArrowRight, Cpu, Leaf, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-600">Kapadokya Hackathon 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
        >
          Doğal Depolama <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
            Dijital Gelecek.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          PeriCloud, Kapadokya'nın doğal mağara depolarını IoT sensörler ve otonom robotlarla modernize eden dünyanın ilk akıllı doğal lojistik platformudur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/login"
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2 overflow-hidden"
          >
            Sisteme Giriş Yap
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 text-slate-600 font-bold hover:text-blue-600 transition-colors"
          >
            Nasıl Çalışır?
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Bot, label: "Otonom Robot", color: "text-blue-500" },
            { icon: Cpu, label: "Akıllı Sensör", color: "text-emerald-500" },
            { icon: Leaf, label: "Yeşil Lojistik", color: "text-orange-500" },
            { icon: ShieldCheck, label: "Mühürlü Kayıt", color: "text-purple-500" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center gap-2">
              <item.icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
