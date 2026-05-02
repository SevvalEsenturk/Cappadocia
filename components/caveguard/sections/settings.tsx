"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useI18n } from "@/lib/i18n"
import {
  Bell,
  Shield,
  Database,
  Wifi,
  Monitor,
  Moon,
  Sun,
  Globe,
  Save,
  Lock,
  User,
  Key,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Bot,
  Thermometer,
  BellRing,
  BellOff
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function SettingsContent() {
  const { t, lang, setLang } = useI18n()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [userRole, setUserRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("Kullanıcı")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Bildirim popup state
  const [toasts, setToasts] = useState<{id: number, msg: string, type: "on" | "off"}[]>([])
  const toastId = useRef(0)

  const [settings, setSettings] = useState({
    criticalAlerts: true,
    shipmentNotifs: true,
    robotAlerts: true,
    refreshRate: "10",
    twoFactor: false,
    autoBackup: true,
    maxRobotSpeed: "1.2",
    tempAlertThreshold: "18"
  })

  useEffect(() => {
    setMounted(true)
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")
    setUserRole(role)
    if (name) setUserName(name)
  }, [])

  const isAdmin = userRole === "admin"
  const isDark = theme === "dark"

  // Bildirim toast gösterme
  const showToast = (msg: string, type: "on" | "off") => {
    const id = ++toastId.current
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  // Bildirim toggle handler
  const handleNotifToggle = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    showToast(
      value ? t("set.notifEnabled") : t("set.notifDisabled"),
      value ? "on" : "off"
    )
  }

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-8 space-y-6 relative">
      {/* Bildirim Toast'ları — ekranın sağ üstünde */}
      <div className="fixed top-20 right-6 z-[100] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              className={cn(
                "px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm pointer-events-auto border",
                toast.type === "on"
                  ? "bg-emerald-500/90 text-white border-emerald-400/50"
                  : "bg-red-500/90 text-white border-red-400/50"
              )}
            >
              {toast.type === "on" ? <BellRing className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              {toast.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Kullanıcı Bilgi Çubuğu */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border",
            isAdmin ? "bg-primary/20 border-primary/30" : "bg-emerald-500/20 border-emerald-500/30"
          )}>
            <User className={cn("w-6 h-6", isAdmin ? "text-primary" : "text-emerald-500")} />
          </div>
          <div>
            <p className="text-base font-bold">{userName}</p>
            <Badge variant="outline" className={cn("text-[9px] uppercase tracking-widest",
              isAdmin ? "text-primary border-primary/30 bg-primary/5" : "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
            )}>
              {isAdmin ? t("set.sysAdmin") : t("set.fieldOp")}
            </Badge>
          </div>
        </div>
        {!isAdmin && (
          <div className="hidden sm:flex items-center gap-2 p-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] text-amber-400 font-bold">{t("set.adminOnlyWarn")}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ═══ BİLDİRİM TERCİHLERİ ═══ */}
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="w-5 h-5 text-primary" /> {t("set.notifications")}
            </CardTitle>
            <CardDescription className="text-[10px]">{t("set.notifDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> {t("set.criticalAlerts")}
              </Label>
              <Switch
                checked={settings.criticalAlerts}
                onCheckedChange={(v) => handleNotifToggle("criticalAlerts", v)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-blue-400" /> {t("set.shipmentUpdates")}
              </Label>
              <Switch
                checked={settings.shipmentNotifs}
                onCheckedChange={(v) => handleNotifToggle("shipmentNotifs", v)}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="flex items-center gap-2 text-sm">
                <Bot className="w-4 h-4 text-emerald-400" /> {t("set.robotAlerts")}
              </Label>
              <Switch
                checked={settings.robotAlerts}
                onCheckedChange={(v) => handleNotifToggle("robotAlerts", v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ═══ GÖRÜNÜM ═══ */}
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Monitor className="w-5 h-5 text-primary" /> {t("set.appearance")}
            </CardTitle>
            <CardDescription className="text-[10px]">{t("set.appearanceDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="flex items-center gap-2 text-sm">
                {mounted && isDark ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-orange-400" />}
                {mounted && isDark ? t("set.darkMode") : t("set.lightMode")}
              </Label>
              {mounted && (
                <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* ═══ GÜVENLİK (Admin) ═══ */}
        <Card className={cn("glass-card border-0 relative overflow-hidden", isAdmin ? "glow-border-green" : "")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-success" /> {t("set.security")}
              {!isAdmin && <Lock className="w-3 h-3 text-amber-400 ml-1" />}
            </CardTitle>
            <CardDescription className="text-[10px]">
              {isAdmin ? t("set.securityDescAdmin") : t("set.securityDescUser")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAdmin && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-3 p-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Lock className="w-7 h-7 text-amber-400" />
                  </div>
                  <p className="text-sm font-bold text-amber-400">{t("set.adminRequired")}</p>
                  <p className="text-[10px] text-muted-foreground max-w-[200px]">{t("set.adminRequiredDesc")}</p>
                </div>
              </div>
            )}
            <div className="space-y-2 p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> {t("set.apiKey")}</Label>
              <div className="flex gap-2">
                <Input type="password" value="cg-prod-2026-xxxx-xxxx" readOnly className="bg-background/50 font-mono text-[11px]" />
                <Button variant="outline" size="sm" disabled={!isAdmin}>{t("set.copy")}</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm">{t("set.twoFactor")}</Label>
              <Switch disabled={!isAdmin} checked={settings.twoFactor} onCheckedChange={(v) => setSettings({...settings, twoFactor: v})} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm">{t("set.autoBackup")}</Label>
              <Switch disabled={!isAdmin} checked={settings.autoBackup} onCheckedChange={(v) => setSettings({...settings, autoBackup: v})} />
            </div>
          </CardContent>
        </Card>

        {/* ═══ SİSTEM KONFİGÜRASYONU (Admin) ═══ */}
        <Card className={cn("glass-card border-0 relative overflow-hidden", isAdmin ? "glow-border-orange" : "")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="w-5 h-5 text-orange-400" /> {t("set.systemConfig")}
              {!isAdmin && <Lock className="w-3 h-3 text-amber-400 ml-1" />}
            </CardTitle>
            <CardDescription className="text-[10px]">
              {isAdmin ? t("set.sysDescAdmin") : t("set.sysDescUser")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAdmin && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-3 p-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Lock className="w-7 h-7 text-amber-400" />
                  </div>
                  <p className="text-sm font-bold text-amber-400">{t("set.adminRequired")}</p>
                  <p className="text-[10px] text-muted-foreground max-w-[200px]">{t("set.sysAdminRequiredDesc")}</p>
                </div>
              </div>
            )}
            <div className="space-y-2 p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm flex items-center gap-2"><Wifi className="w-4 h-4 text-blue-400" /> {t("set.refreshRate")}</Label>
              <Select value={settings.refreshRate} onValueChange={(v) => setSettings({...settings, refreshRate: v})} disabled={!isAdmin}>
                <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t("set.every1s")}</SelectItem>
                  <SelectItem value="5">{t("set.every5s")}</SelectItem>
                  <SelectItem value="10">{t("set.every10s")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm flex items-center gap-2"><Bot className="w-4 h-4 text-emerald-400" /> {t("set.robotMaxSpeed")}</Label>
              <Input type="number" step="0.1" value={settings.maxRobotSpeed} onChange={(e) => setSettings({...settings, maxRobotSpeed: e.target.value})} disabled={!isAdmin} className="bg-background/50" />
            </div>
            <div className="space-y-2 p-3 rounded-xl bg-muted/10 border border-white/5">
              <Label className="text-sm flex items-center gap-2"><Thermometer className="w-4 h-4 text-red-400" /> {t("set.tempThreshold")}</Label>
              <Input type="number" value={settings.tempAlertThreshold} onChange={(e) => setSettings({...settings, tempAlertThreshold: e.target.value})} disabled={!isAdmin} className="bg-background/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kaydet */}
      <div className="flex items-center justify-between">
        <div>
          {saveSuccess && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-success text-sm font-bold">
              <CheckCircle2 className="w-5 h-5" /> {t("set.saved")}
            </motion.div>
          )}
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold text-base">
          {isSaving ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("set.saving")}</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> {t("set.saveBtn")}</>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
