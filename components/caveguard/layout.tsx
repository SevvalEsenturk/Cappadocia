"use client"

import { useState, useEffect } from "react"
import { CaveGuardSidebar } from "./sidebar"
import { DashboardContent } from "./sections/dashboard"
import { ShipmentsContent } from "./sections/shipments"
import { RobotsContent } from "./sections/robots"
import { AnalyticsContent } from "./sections/analytics"
import { SettingsContent } from "./sections/settings"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Euro, RefreshCcw, Bell, User } from "lucide-react"

export function CaveGuardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [exchangeRates, setExchangeRates] = useState({ USD: 32.45, EUR: 35.12 })
  const [lastUpdate, setLastUpdate] = useState(new Date())

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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard": return <DashboardContent />
      case "shipments": return <ShipmentsContent globalRates={exchangeRates} />
      case "robots": return <RobotsContent />
      case "analytics": return <AnalyticsContent />
      case "settings": return <SettingsContent />
      default: return <DashboardContent />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden topo-pattern bg-background">
      <CaveGuardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
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
            <div className="hidden md:flex items-center text-[10px] text-muted-foreground gap-1 whitespace-nowrap">
              <RefreshCcw className="w-3 h-3 animate-spin-slow" /> {lastUpdate.toLocaleTimeString()}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-muted/20 border border-white/5 hover:bg-muted/40 transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="h-8 w-[1px] bg-white/5 mx-1 hidden sm:block" />
            <div className="flex items-center gap-2 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold">Admin</p>
                <p className="text-[9px] text-muted-foreground">Kapadokya HQ</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border border-white/10">
                <User className="w-5 h-5 text-white" />
              </div>
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
