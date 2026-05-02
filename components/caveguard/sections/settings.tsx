"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Settings,
  Bell,
  Shield,
  Database,
  Wifi,
  Monitor,
  Moon,
  Globe,
  Save,
  Lock,
  User,
  LogOut,
  Key,
  ShieldAlert
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
  const [user, setUser] = useState<{username: string, role: string} | null>(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    criticalAlerts: true,
    shipmentNotifs: true,
    darkTheme: true,
    language: "tr",
    refreshRate: "10"
  });

  // Giriş Kontrolü
  useEffect(() => {
    const savedUser = sessionStorage.getItem("caveguard_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "ahmetkapadokya" && loginData.password === "ahmet1") {
      const userData = { username: "Ahmet Kapadokya", role: "user" };
      setUser(userData);
      sessionStorage.setItem("caveguard_user", JSON.stringify(userData));
    } else if (loginData.username === "admin" && loginData.password === "admin") {
      const userData = { username: "Sistem Yöneticisi", role: "admin" };
      setUser(userData);
      sessionStorage.setItem("caveguard_user", JSON.stringify(userData));
    } else {
      alert("Hatalı kullanıcı adı veya şifre! (İpucu: ahmetkapadokya / ahmet1)");
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("caveguard_user");
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Ayarlar başarıyla bulut sistemine kaydedildi.");
    }, 1000);
  };

  // Eğer giriş yapılmamışsa Giriş Ekranını Göster
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
          <Card className="glass-card border-0 glow-border-blue p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Sistem Girişi</h2>
              <p className="text-sm text-muted-foreground">Devam etmek için kimlik doğrulaması yapın</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label>Kullanıcı Adı</Label>
                <Input 
                  placeholder="Kullanıcı adınızı girin" 
                  className="bg-background/50" 
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Parola</Label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-background/50"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 font-bold text-lg">
                Giriş Yap
              </Button>
              <p className="text-[10px] text-center text-muted-foreground pt-4">
                Test Verisi: ahmetkapadokya / ahmet1 veya admin / admin
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-8 space-y-6">
      {/* User Info Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold">{user.username}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{user.role === 'admin' ? 'Sistem Yöneticisi' : 'Saha Operatörü'}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-500 hover:bg-red-400/10">
          <LogOut className="w-4 h-4 mr-2" /> Çıkış Yap
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Bell className="w-5 h-5 text-primary" /> Bildirim Tercihleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Kritik Uyarilar</Label>
              <Switch 
                checked={settings.criticalAlerts} 
                onCheckedChange={(v) => setSettings({...settings, criticalAlerts: v})} 
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Sevkiyat Güncellemeleri</Label>
              <Switch 
                checked={settings.shipmentNotifs} 
                onCheckedChange={(v) => setSettings({...settings, shipmentNotifs: v})} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Security (Role Based) */}
        <Card className={cn("glass-card border-0", isAdmin ? "glow-border-green" : "opacity-60 grayscale-[0.5]")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-success" /> Güvenlik Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAdmin && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-3 mb-4">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-tighter">Yalnızca Yönetici Erişimi</p>
              </div>
            )}
            <div className="space-y-2 opacity-50 pointer-events-none">
              <Label>API Anahtarı (Production)</Label>
              <div className="flex gap-2">
                <Input type="password" value="••••••••••••••••" readOnly className="bg-input" />
                <Button variant="outline" size="sm" disabled>Kopyala</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Çift Faktörlü Doğrulama</Label>
              <Switch disabled={!isAdmin} />
            </div>
          </CardContent>
        </Card>

        {/* System (Role Based) */}
        <Card className={cn("glass-card border-0", isAdmin ? "glow-border-orange" : "opacity-60 grayscale-[0.5]")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Database className="w-5 h-5 text-orange-400" /> Sistem Konfigürasyonu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {!isAdmin && (
              <div className="absolute inset-0 z-10 bg-background/20 backdrop-blur-[1px] flex items-center justify-center">
                <Badge className="bg-orange-500/80 text-white border-0 py-1.5 px-4 rounded-full shadow-2xl">
                  <Lock className="w-3 h-3 mr-2" /> Admin Yetkisi Gerekli
                </Badge>
              </div>
            )}
            <div className="space-y-2">
              <Label>Veri Yenileme Hızı</Label>
              <Select value={settings.refreshRate} onValueChange={(v) => setSettings({...settings, refreshRate: v})} disabled={!isAdmin}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Her 1 sn</SelectItem>
                  <SelectItem value="5">Her 5 sn</SelectItem>
                  <SelectItem value="10">Her 10 sn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance (All Users) */}
        <Card className="glass-card border-0 glow-border-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Monitor className="w-5 h-5 text-primary" /> Görünüm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2"><Moon className="w-4 h-4" /> Karanlık Mod</Label>
              <Switch checked={settings.darkTheme} onCheckedChange={(v) => setSettings({...settings, darkTheme: v})} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Globe className="w-4 h-4" /> Sistem Dili</Label>
              <Select value={settings.language} onValueChange={(v) => setSettings({...settings, language: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold">
          {isSaving ? "Kaydediliyor..." : "Ayarları Güncelle"}
        </Button>
      </div>
    </motion.div>
  )
}
