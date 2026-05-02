"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function SettingsContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Sistem{" "}
          <span className="gradient-text-blue">Ayarlari</span>
        </h1>
        <p className="text-muted-foreground">
          CaveGuard sistem konfigurasyonu ve tercihler
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Bildirimler
              </CardTitle>
              <CardDescription>
                Uyari ve bildirim tercihlerinizi yonetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Kritik Uyarilar</Label>
                  <p className="text-xs text-muted-foreground">
                    Acil durum ve sistem hatalarindalerta
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sevkiyat Bildirimleri</Label>
                  <p className="text-xs text-muted-foreground">
                    Yeni sevkiyat ve teslimat guncellemeleri
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Robot Durum Degisiklikleri</Label>
                  <p className="text-xs text-muted-foreground">
                    Robot gorev ve durum bildirimleri
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Gunluk Raporlar</Label>
                  <p className="text-xs text-muted-foreground">
                    Her gun otomatik ozet raporu
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-green">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                Guvenlik
              </CardTitle>
              <CardDescription>
                Hesap ve erisim guvenlik ayarlari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Iki Faktorlu Dogrulama</Label>
                  <p className="text-xs text-muted-foreground">
                    Ekstra guvenlik katmani
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Oturum Kilidi</Label>
                  <p className="text-xs text-muted-foreground">
                    15 dakika islemsizlikte otomatik kilit
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>API Anahtari</Label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value="••••••••••••••••"
                    className="bg-input border-border/50"
                    readOnly
                  />
                  <Button variant="outline" size="sm">
                    Yenile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-orange">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-accent" />
                Sistem Konfigurasyonu
              </CardTitle>
              <CardDescription>
                Teknik sistem ayarlari ve tercihleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Veri Yenileme Hizi</Label>
                <Select defaultValue="5">
                  <SelectTrigger className="bg-input border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="1">Her 1 saniye</SelectItem>
                    <SelectItem value="5">Her 5 saniye</SelectItem>
                    <SelectItem value="10">Her 10 saniye</SelectItem>
                    <SelectItem value="30">Her 30 saniye</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Log Saklama Suresi</Label>
                <Select defaultValue="30">
                  <SelectTrigger className="bg-input border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="7">7 gun</SelectItem>
                    <SelectItem value="30">30 gun</SelectItem>
                    <SelectItem value="90">90 gun</SelectItem>
                    <SelectItem value="365">1 yil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Yedekleme</Label>
                  <p className="text-xs text-muted-foreground">
                    Gunluk veri yedeklemesi
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div variants={itemVariants}>
          <Card className="glass-card border-0 glow-border-blue">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Gorunum
              </CardTitle>
              <CardDescription>
                Arayuz ve gorsel tercihler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label>Koyu Tema</Label>
                    <p className="text-xs text-muted-foreground">
                      Karanlik mod aktif
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  Dil
                </Label>
                <Select defaultValue="tr">
                  <SelectTrigger className="bg-input border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    <SelectItem value="tr">Turkce</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animasyonlar</Label>
                  <p className="text-xs text-muted-foreground">
                    Arayuz gecis efektleri
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Connection Status */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-0 glow-border-green">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-success" />
              Baglanti Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium">Ana Sunucu</span>
                </div>
                <p className="text-xs text-muted-foreground">Baglanti suresi: 24s 12dk</p>
              </div>
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium">Sensor Agi</span>
                </div>
                <p className="text-xs text-muted-foreground">12 sensor aktif</p>
              </div>
              <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium">Robot Flotu</span>
                </div>
                <p className="text-xs text-muted-foreground">3 robot cevrimici</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 glow-border-blue">
          <Save className="w-4 h-4 mr-2" />
          Degisiklikleri Kaydet
        </Button>
      </motion.div>
    </motion.div>
  )
}
