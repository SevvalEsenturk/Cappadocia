"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bot, ShieldCheck, ArrowRight, Loader2, User, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simüle edilen giriş kontrolü (Hackathon isterlerine göre)
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userName", "Sistem Yöneticisi")
        router.push("/dashboard")
      } else if (username === "ahmetkapadokya" && password === "ahmet1") {
        localStorage.setItem("userRole", "user")
        localStorage.setItem("userName", "Ahmet Kapadokya")
        router.push("/dashboard")
      } else {
        setError("Geçersiz kullanıcı adı veya şifre.")
        setIsLoading(false)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/40 blur-[100px] rounded-full" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100/40 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 p-10">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="mb-6 group">
              <div className="w-32 h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                <img src="/logo.png" alt="PeriCloud Logo" className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PeriCloud</h1>
            <p className="text-slate-500 mt-2 font-medium">Yönetim Paneli Girişi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Kullanıcı Adı</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-red-500 font-bold text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sistemi Başlat
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Blockchain Güvenlik Doğrulaması Aktif
          </div>

          {/* Kullanıcı Bilgi Kutusu */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-[11px] font-bold text-slate-300 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Tanımlı Kullanıcılar
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">A</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">admin / admin</p>
                    <p className="text-[9px] text-blue-400">🛡️ Sistem Yöneticisi — Tüm erişim</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">U</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">ahmetkapadokya / ahmet1</p>
                    <p className="text-[9px] text-emerald-400">👷 Saha Operatörü — Kısıtlı erişim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Giriş yapamıyor musunuz? <span className="text-blue-600 font-bold cursor-pointer hover:underline">Sistem Yöneticisine Başvurun</span>
        </p>
      </motion.div>
    </div>
  )
}
