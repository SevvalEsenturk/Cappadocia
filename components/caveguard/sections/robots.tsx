"use client"

import { useState, useEffect, useCallback } from "react"
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
  RotateCcw,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Grid Konfigürasyonu
const GRID_SIZE_X = 20;
const GRID_SIZE_Y = 10;
const MAIN_ROAD_ROWS = [4, 5]; // Robotların çalışabileceği ana koridor

interface Robot {
  id: string;
  name: string;
  status: "active" | "charging" | "idle";
  battery: number;
  x: number;
  y: number;
  task: string;
}

const initialRobots: Robot[] = [
  { id: "alpha", name: "Robot-Alpha", status: "active", battery: 85, x: 2, y: 4, task: "Palet Taşıma" },
  { id: "beta", name: "Robot-Beta", status: "charging", battery: 42, x: 18, y: 5, task: "Şarj İstasyonu" },
  { id: "gamma", name: "Robot-Gamma", status: "active", battery: 91, x: 10, y: 4, task: "Bölge Devriyesi" },
];

export function RobotsContent() {
  const [robots, setRobots] = useState<Robot[]>(initialRobots);
  const [selectedRobot, setSelectedRobot] = useState<Robot>(initialRobots[0]);
  const [logs, setLogs] = useState<any[]>([
    { time: "22:15:02", type: "info", msg: "Dijkstra rota motoru otonom robotlara aktarıldı." },
    { time: "22:14:55", type: "success", msg: "Robot-Alpha ana koridorda güvenli bölgeye ulaştı." }
  ]);

  // Robot Simülasyonu: Sadece ana yolda hareket ederler
  useEffect(() => {
    const interval = setInterval(() => {
      setRobots(prev => prev.map(robot => {
        if (robot.status === "charging") return robot;

        let newX = robot.x + (Math.random() > 0.5 ? 1 : -1);
        // Sınır kontrolü ve sadece ana yolda kalma (x ekseninde hareket)
        if (newX < 0) newX = 0;
        if (newX >= GRID_SIZE_X) newX = GRID_SIZE_X - 1;

        return { ...robot, x: newX, battery: Math.max(0, robot.battery - 0.05) };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Otonom Robot <span className="text-primary">Filo Yönetimi</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Mağara içi lojistik robotlarının GridMap üzerinden gerçek zamanlı takibi
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3">
            <Activity className="w-3 h-3 mr-2 animate-pulse" />
            Filo Sağlığı: %98
          </Badge>
          <Badge className="bg-success/10 text-success border-success/20 py-1 px-3">
            <Zap className="w-3 h-3 mr-2" />
            Enerji Verimliliği: A++
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Robot Grid Map */}
        <Card className="lg:col-span-3 glass-card border-0 glow-border-blue overflow-hidden min-h-[500px]">
          <CardHeader className="pb-2 bg-muted/5 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary" />
                Depo Lojistik Haritası
              </CardTitle>
              <CardDescription className="text-[10px]">Robotlar sadece yeşil işaretli ana koridorda hareket edebilirler.</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success/40" />
                <span className="text-[9px] uppercase">Ana Yol</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500/20" />
                <span className="text-[9px] uppercase">Loca (Yasak)</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative w-full aspect-[20/10] bg-muted/10 rounded-2xl border border-white/5 p-4">
              <div
                className="grid h-full w-full gap-1"
                style={{
                  gridTemplateColumns: 'repeat(20, 1fr)',
                  gridTemplateRows: 'repeat(10, 1fr)'
                }}
              >
                {Array.from({ length: GRID_SIZE_X * GRID_SIZE_Y }).map((_, i) => {
                  const x = i % GRID_SIZE_X;
                  const y = Math.floor(i / GRID_SIZE_X);
                  const isMainRoad = MAIN_ROAD_ROWS.includes(y);

                  return (
                    <div
                      key={i}
                      className={cn(
                        "rounded-sm border border-white/[0.03] transition-colors flex items-center justify-center relative",
                        isMainRoad ? "bg-success/5 hover:bg-success/10" : "bg-orange-500/[0.02]"
                      )}
                    >
                      {/* Robot Visualization */}
                      {robots.map(robot => (
                        robot.x === x && robot.y === y && (
                          <motion.div
                            key={robot.id}
                            layoutId={robot.id}
                            className={cn(
                              "w-full h-full rounded-sm shadow-xl flex items-center justify-center z-10",
                              robot.id === selectedRobot.id ? "bg-primary border-2 border-white/50" : "bg-muted-foreground/50"
                            )}
                            onClick={() => setSelectedRobot(robot)}
                          >
                            <Bot className="w-3 h-3 text-white" />
                          </motion.div>
                        )
                      ))}

                      {/* Loca Numbers */}
                      {!isMainRoad && x % 4 === 0 && (
                        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold opacity-10 uppercase tracking-tighter">
                          Loca {y < 4 ? `Üst-${x}` : `Alt-${x}`}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Grid Legends & Info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="p-3 rounded-2xl bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4">
                  <div className="text-center px-4 border-r border-white/10">
                    <p className="text-[9px] text-muted-foreground uppercase">Aktif Robotlar</p>
                    <p className="text-lg font-bold">3</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-[9px] text-muted-foreground uppercase">İş Gücü Verimi</p>
                    <p className="text-lg font-bold text-success">+%42</p>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md flex items-center gap-3">
                  <Info className="w-4 h-4 text-blue-400" />
                  <p className="text-[10px] text-blue-300">
                    <b>Kısıtlama Aktif:</b> Robotlar ürün locasına giremez, sadece kapıda yükleme yapar.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fleet Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card border-0 shadow-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-muted/10">
              <CardTitle className="text-xs uppercase tracking-widest">Robot Durumları</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {robots.map(robot => (
                <div
                  key={robot.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer",
                    selectedRobot.id === robot.id ? "bg-primary/10 border-primary/30" : "bg-muted/20 border-white/5 hover:bg-muted/40"
                  )}
                  onClick={() => setSelectedRobot(robot)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-xl", robot.status === "active" ? "bg-success/20 text-success" : "bg-orange-500/20 text-orange-500")}>
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{robot.name}</p>
                        <p className="text-[10px] text-muted-foreground">{robot.task}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[9px] border-white/10 uppercase">{robot.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">Batarya Sağlığı</span>
                      <span className="font-bold">{Math.round(robot.battery)}%</span>
                    </div>
                    <Progress value={robot.battery} className="h-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-muted/10">
              <CardTitle className="text-xs uppercase tracking-widest">Sistem Logları</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px] p-4">
                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-3 text-[10px] font-mono border-b border-white/5 pb-2">
                      <span className="text-muted-foreground">{log.time}</span>
                      <span className={log.type === "success" ? "text-success" : "text-primary"}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
