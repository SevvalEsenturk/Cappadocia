"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Battery,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Box,
  Terminal,
  Activity,
  Zap,
  Navigation,
  Waypoints,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const robotsData = [
  {
    id: "robot-alpha",
    name: "Robot-Alpha",
    status: "active",
    battery: 78,
    location: "Bölüm A-3",
    task: "Envanter Tarama",
    lastUpdate: "2 saniye önce",
    path: [[50, 50], [100, 100], [150, 80]],
  },
  {
    id: "robot-beta",
    name: "Robot-Beta",
    status: "charging",
    battery: 42,
    location: "Şarj İstasyonu",
    task: "Şarj Ediliyor",
    lastUpdate: "15 saniye önce",
    path: [],
  },
  {
    id: "robot-gamma",
    name: "Robot-Gamma",
    status: "active",
    battery: 91,
    location: "Bölüm B-1",
    task: "Palet Taşıma",
    lastUpdate: "5 saniye önce",
    path: [[200, 50], [250, 80]],
  },
]

const systemLogs = [
  { time: "14:32:15", type: "info", message: "[ALPHA] QR kodu başarıyla okundu: SKU-2847" },
  { time: "14:32:12", type: "success", message: "[ALPHA] Nesne algılama: Palet tespit edildi" },
  { time: "14:32:08", type: "info", message: "[GAMMA] Rota hesaplandı: A3 -> B1" },
  { time: "14:31:55", type: "warning", message: "[BETA] Düşük pil uyarısı - şarj istasyonuna yönlendiriliyor" },
  { time: "14:31:42", type: "success", message: "[GAMMA] Görev tamamlandı: Envanter sayımı" },
  { time: "14:31:30", type: "info", message: "[ALPHA] Yeni görev atandı: Bölge A-3 taraması" },
]

export function RobotsContent() {
  const [selectedRobot, setSelectedRobot] = useState(robotsData[0])
  const [isManualMode, setIsManualMode] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 lg:p-8 space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Otonom Robot <span className="gradient-text-blue">Görev Kontrol Merkezi</span>
        </h1>
        <p className="text-muted-foreground">
          Depo içi robot filosu yönetimi, gerçek zamanlı navigasyon ve tele-operasyon
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Map */}
        <Card className="lg:col-span-2 glass-card border-0 glow-border-blue overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Navigasyon Haritası (Live)
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Activity className="w-3 h-3 mr-2 animate-pulse" />
                TELEMETRİ AKTİF
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative aspect-video bg-muted/10 rounded-xl overflow-hidden border border-white/5">
              <svg viewBox="0 0 400 240" className="w-full h-full">
                <defs>
                  <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.5" fill="currentColor" fillOpacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dots)" />
                
                {/* Section Silhouettes */}
                <rect x="20" y="20" width="160" height="90" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.1" rx="8" />
                <rect x="220" y="20" width="160" height="90" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.1" rx="8" />
                <rect x="20" y="130" width="160" height="90" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.1" rx="8" />
                <rect x="220" y="130" width="160" height="90" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.1" rx="8" />

                {/* Simulated Paths */}
                <motion.path 
                  d="M 40 40 L 100 80 L 140 50" 
                  fill="none" 
                  stroke="oklch(0.6 0.15 230)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Active Robots on Map */}
                {robotsData.map((robot, i) => (
                  <motion.g key={robot.id} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <circle 
                      cx={robot.id === "robot-alpha" ? 140 : robot.id === "robot-gamma" ? 300 : 360} 
                      cy={robot.id === "robot-alpha" ? 50 : robot.id === "robot-gamma" ? 80 : 220} 
                      r="6" 
                      fill={robot.status === "active" ? "oklch(0.6 0.15 230)" : "oklch(0.6 0.1 50)"}
                      className={robot.id === selectedRobot.id ? "animate-pulse" : ""}
                    />
                    {robot.id === selectedRobot.id && (
                      <circle 
                        cx={robot.id === "robot-alpha" ? 140 : robot.id === "robot-gamma" ? 300 : 360} 
                        cy={robot.id === "robot-alpha" ? 50 : robot.id === "robot-gamma" ? 80 : 220} 
                        r="12" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeOpacity="0.3"
                      />
                    )}
                  </motion.g>
                ))}
              </svg>
              
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Badge className="bg-background/80 backdrop-blur-md text-[10px] py-0 h-6">
                  <QrCode className="w-3 h-3 mr-1 text-primary" /> Son Taranan: SKU-92
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet List & Quick Control */}
        <div className="space-y-4">
          <Card className="glass-card border-0 glow-border-blue">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Robot Filosu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {robotsData.map((robot) => (
                <button
                  key={robot.id}
                  onClick={() => setSelectedRobot(robot)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl transition-all border",
                    selectedRobot.id === robot.id 
                      ? "bg-primary/10 border-primary/30" 
                      : "bg-muted/30 border-transparent hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      robot.status === "active" ? "bg-success/10" : "bg-orange-500/10"
                    )}>
                      <Bot className={cn(
                        "w-4 h-4",
                        robot.status === "active" ? "text-success" : "text-orange-500"
                      )} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{robot.name}</p>
                      <p className="text-[10px] text-muted-foreground">{robot.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono">{robot.battery}%</p>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden mt-1">
                      <div 
                        className={cn("h-full", robot.battery > 50 ? "bg-success" : "bg-orange-500")}
                        style={{ width: `${robot.battery}%` }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card className="glass-card border-0 glow-border-orange overflow-hidden">
            <CardHeader className="pb-2 bg-accent/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs uppercase tracking-wider">Kontrol Paneli</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Manuel</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn("w-6 h-6 rounded-full", isManualMode ? "bg-primary text-white" : "bg-muted")}
                    onClick={() => setIsManualMode(!isManualMode)}
                  >
                    <Zap className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-2 place-items-center">
                <div />
                <Button variant="outline" size="icon" disabled={!isManualMode} className="w-10 h-10"><ChevronUp className="w-4 h-4" /></Button>
                <div />
                <Button variant="outline" size="icon" disabled={!isManualMode} className="w-10 h-10"><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" disabled={!isManualMode} className="w-10 h-10 bg-primary/20"><Play className="w-4 h-4 text-primary" /></Button>
                <Button variant="outline" size="icon" disabled={!isManualMode} className="w-10 h-10"><ChevronRight className="w-4 h-4" /></Button>
                <div />
                <Button variant="outline" size="icon" disabled={!isManualMode} className="w-10 h-10"><ChevronDown className="w-4 h-4" /></Button>
                <div />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-[10px] gap-2">
                  <QrCode className="w-3 h-3" /> QR TARA
                </Button>
                <Button variant="outline" size="sm" className="text-[10px] gap-2">
                  <Zap className="w-3 h-3 text-orange-500" /> ŞARJA GİT
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Logs */}
      <Card className="glass-card border-0 glow-border-blue">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-white/5">
          <CardTitle className="text-sm flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" /> Sistem Operasyon Günlüğü
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-2">
            <RotateCcw className="w-3 h-3" /> Temizle
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-40">
            <div className="p-4 font-mono text-[11px] space-y-2">
              {systemLogs.map((log, i) => (
                <div key={i} className="flex gap-4 border-b border-white/5 pb-2 last:border-0">
                  <span className="text-muted-foreground shrink-0">{log.time}</span>
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 h-fit",
                    log.type === "success" ? "bg-success/20 text-success" : "bg-primary/20 text-primary"
                  )}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="text-foreground/80">{log.message}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
