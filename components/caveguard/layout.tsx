"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PeriCloudSidebar } from "./sidebar"
import { DashboardContent } from "./sections/dashboard"
import { ShipmentsContent } from "./sections/shipments"
import { RobotsContent } from "./sections/robots"
import { AnalyticsContent } from "./sections/analytics"
import { SettingsContent } from "./sections/settings"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Euro, RefreshCcw, Bell, User, X } from "lucide-react"
import { I18nProvider, useI18n } from "@/lib/i18n"
import { UserAvatar } from "@/components/ui/user-avatar"

export function PeriCloudLayout() {
  return (
    <I18nProvider>
      <PeriCloudInner />
    </I18nProvider>
  )
}

interface Notification {
  id: number
  icon: string
  title: string
  desc: string
  time: string
  read: boolean
}

function PeriCloudInner() {
  const { t } = useI18n()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [exchangeRates, setExchangeRates] = useState({ USD: 32.45, EUR: 35.12 })
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [userName, setUserName] = useState("Kullanıcı")
  const [userRole, setUserRole] = useState("")
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, icon: "🤖", title: "Robot Alpha", desc: "Loca A3'e ürün teslimi tamamlandı.", time: "2 dk önce", read: false },
    { id: 2, icon: "⚠️", title: "Sıcaklık Uyarısı", desc: "Loca B7 sıcaklığı 19°C — eşik değere yaklaşıyor.", time: "5 dk önce", read: false },
    { id: 3, icon: "🚛", title: "Sevkiyat #SH-0042", desc: "Berlin sevkiyatı başarıyla mühürlendi.", time: "12 dk önce", read: false },
    { id: 4, icon: "⚡", title: "Robot Beta", desc: "Batarya %15 — şarj istasyonuna yönlendirildi.", time: "18 dk önce", read: true },
    { id: 5, icon: "📊", title: "Günlük Rapor", desc: "Bugünkü toplam sevkiyat: 4 adet, 38.2 ton.", time: "1 saat önce", read: true },
    { id: 6, icon: "🛡️", title: "Sistem Güvenlik", desc: "Tüm robotlar güvenli bölgede. İhlal yok.", time: "2 saat önce", read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const role = localStorage.getItem("userRole")
    if (name) setUserName(name)
    if (role) setUserRole(role)
  }, [])

  // Dışarı tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Global TCMB Döviz Takip Sistemi
  useEffect(() => {
    const updateRates = async () => {
      try {
        const res = await fetch('/api/exchange-rates')
        const data = await res.json()
        if (data.USD && data.EUR) {
          setExchangeRates({ USD: data.USD, EUR: data.EUR })
          setLastUpdate(new Date())
        }
      } catch (err) {
        console.error("Global Kur Hatası:", err)
      }
    }
    updateRates()
    const interval = setInterval(updateRates, 10000)
    return () => clearInterval(interval)
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardContent />
      case "shipments": return <ShipmentsContent />
      case "robots": return <RobotsContent />
      case "analytics": return <AnalyticsContent />
      case "settings": return <SettingsContent />
      default: return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden topo-pattern bg-background">
      <PeriCloudSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Global Header */}
        <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 lg:px-8 z-50 shrink-0">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1.5 px-3 flex items-center gap-2 whitespace-nowrap">
              <DollarSign className="w-3 h-3" /> USD: {exchangeRates.USD.toFixed(2)}
            </Badge>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 py-1.5 px-3 flex items-center gap-2 whitespace-nowrap">
              <Euro className="w-3 h-3" /> EUR: {exchangeRates.EUR.toFixed(2)}
            </Badge>
            {lastUpdate && (
              <div className="hidden md:flex items-center text-[10px] text-muted-foreground gap-1 whitespace-nowrap">
                <RefreshCcw className="w-3 h-3 animate-spin-slow" /> {lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* ═══ BİLDİRİM BUTONU + DROPDOWN ═══ */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 rounded-xl bg-muted/20 border border-white/5 hover:bg-muted/40 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-background animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-80 sm:w-96 rounded-2xl bg-background border border-white/10 shadow-2xl z-[100] overflow-hidden"
                  >
                    {/* Başlık */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-muted/10">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary" /> Bildirimler
                        {unreadCount > 0 && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[9px] px-1.5 py-0">{unreadCount} yeni</Badge>
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-medium">
                            Tümünü oku
                          </button>
                        )}
                        <button onClick={() => setShowNotifs(false)} className="p-1 rounded-lg hover:bg-muted/20">
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Bildirim Listesi */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 transition-colors cursor-pointer hover:bg-muted/10 ${
                            !notif.read ? "bg-primary/5" : ""
                          }`}
                          onClick={() => setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
                        >
                          <span className="text-lg mt-0.5 shrink-0">{notif.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold truncate">{notif.title}</p>
                              {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{notif.desc}</p>
                            <p className="text-[9px] text-muted-foreground/60 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Alt Bar */}
                    <div className="px-4 py-2.5 border-t border-white/5 bg-muted/5 text-center">
                      <button
                        onClick={() => { setShowNotifs(false); setActiveSection("settings"); }}
                        className="text-[11px] text-primary font-bold hover:underline"
                      >
                        Bildirim Ayarlarını Yönet →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-8 w-[1px] bg-white/5 mx-1 hidden sm:block" />
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold">{userName}</p>
                <p className="text-[9px] text-muted-foreground">{userRole === "admin" ? t("header.sysAdmin") : t("header.fieldOp")}</p>
              </div>
              <UserAvatar 
                username={userName.replace(/\s/g, '')} 
                className="w-9 h-9" 
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="grid-overlay min-h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}
