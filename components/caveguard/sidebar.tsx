"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import {
  LayoutDashboard,
  Truck,
  Bot,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Wifi,
  Sun,
  Moon,
  LogIn
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navItems = [
  { id: "dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { id: "shipments", labelKey: "nav.shipments", icon: Truck },
  { id: "robots", labelKey: "nav.robots", icon: Bot },
  { id: "analytics", labelKey: "nav.analytics", icon: BarChart3 },
  { id: "settings", labelKey: "nav.settings", icon: Settings },
]

export function CaveGuardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useI18n()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: isCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 glow-border-blue">
            <Mountain className="w-5 h-5 text-primary" />
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-lg font-semibold tracking-tight gradient-text-blue">
                  CaveGuard
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  Mission Control
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            const Icon = item.icon

            const buttonContent = (
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  "hover:bg-sidebar-accent",
                  isActive
                    ? "bg-primary/10 text-primary glow-border-blue"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {t(item.labelKey)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )

            if (isCollapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                  <TooltipContent side="right" className="glass-card">
                    {t(item.labelKey)}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.id}>{buttonContent}</div>
          })}
        </nav>

        {/* Theme Toggle & User Profile */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl",
                "hover:bg-sidebar-accent text-sidebar-foreground/70"
              )}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-orange-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500" />
              )}
              {!isCollapsed && (
                <span>{theme === "dark" ? t("nav.darkMode") : t("nav.lightMode")}</span>
              )}
            </Button>
          )}




          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className={cn(
              "w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10"
            )}
          >
            <LogIn className="w-4 h-4 rotate-180" />
            {!isCollapsed && <span>{t("nav.logout")}</span>}
          </Button>

          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl",
              "bg-success/10 border border-success/20"
            )}
          >
            <div className="relative flex items-center justify-center">
              <Wifi className="w-4 h-4 text-success" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full animate-pulse-glow" />
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="text-xs font-medium text-success">{t("nav.systemOnline")}</span>
                  <span className="text-[10px] text-muted-foreground">{t("nav.allActive")}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </Button>
      </motion.aside>
    </TooltipProvider>
  )
}
