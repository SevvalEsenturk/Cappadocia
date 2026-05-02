"use client"

import { motion } from "framer-motion"
import { ArrowRight, Bot } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 p-12 md:p-20 relative overflow-hidden text-center text-white shadow-2xl">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl">
            Lojistik Operasyonlarınızı Geleceğe Taşıyın
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl">
            Kapadokya'nın doğal depolama gücünü CaveGuard teknolojisi ile birleştirin. Bugün ücretsiz bir demo planlayın.
          </p>
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2"
          >
            Sistemi Şimdi Deneyin
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </Link>
        </div>
      </div>
    </section>
  )
}
