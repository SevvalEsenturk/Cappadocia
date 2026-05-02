"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Bot,
  Battery,
  BatteryCharging,
  Activity,
  Zap,
  Navigation,
  Info,
  Box,
  ArrowRight,
  Clock,
  Shield
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

// ═══════════════════════════════════════════════════
//  DEPO YERLEŞIM PLANI (Kapadokya Yeraltı Deposu)
//
//  Satır 0-1: Üst Loca Sırası (Ürün Depolama)
//  Satır 2-3: ══ ANA KORİDOR (Robot hareket alanı) ══
//  Satır 4-5: Alt Loca Sırası (Ürün Depolama)
//
//  Sütun 0: Giriş    Sütun 11: Çıkış/Şarj
// ═══════════════════════════════════════════════════

const COLS = 12;
const ROWS = 6;
const CORRIDOR_ROWS = [2, 3]; // Robotlar SADECE bu satırlarda hareket eder

interface Robot {
  id: string;
  name: string;
  color: string;
  status: "active" | "charging" | "idle";
  battery: number;
  x: number;
  y: number;
  task: string;
  carrying: string | null;
}

const initialRobots: Robot[] = [
  { id: "R1", name: "Alpha",  color: "bg-blue-500",   status: "active",   battery: 87, x: 1,  y: 2, task: "Palet Taşıma",       carrying: "Patates (2T)" },
  { id: "R2", name: "Beta",   color: "bg-amber-500",  status: "charging", battery: 34, x: 10, y: 3, task: "Şarj Ediliyor",       carrying: null },
  { id: "R3", name: "Gamma",  color: "bg-emerald-500", status: "active",  battery: 93, x: 6,  y: 2, task: "Loca Kontrolü",       carrying: "Limon (1T)" },
];

// Loca etiketleri
function getLocaLabel(x: number, y: number): string | null {
  if (CORRIDOR_ROWS.includes(y)) return null;
  if (x === 0 || x === COLS - 1) return null; // Giriş/Çıkış
  const side = y < 2 ? "A" : "B";
  return `${side}${x}`;
}

export function RobotsContent() {
  const [robots, setRobots] = useState<Robot[]>(initialRobots);
  const [selectedId, setSelectedId] = useState("R1");
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState([
    { time: "00:28:14", icon: "🤖", msg: "Alpha — Loca A3'ten 2T patates yüklendi, çıkışa taşınıyor." },
    { time: "00:27:52", icon: "⚡", msg: "Beta — Batarya %34, şarj istasyonuna bağlandı." },
    { time: "00:27:30", icon: "✅", msg: "Gamma — Loca B5 sıcaklık kontrolü tamamlandı: 14°C (normal)." },
    { time: "00:26:18", icon: "📦", msg: "Alpha — Loca A7'den palet alındı, ana koridora çıkıldı." },
    { time: "00:25:45", icon: "🛡️", msg: "Sistem — Tüm robotlar güvenli bölgede. İhlal yok." },
  ]);

  const selected = robots.find(r => r.id === selectedId) || robots[0];
  const { t } = useI18n();

  // Simülasyon: Her 2.5 saniyede robotları ana koridorda hareket ettir
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setRobots(prev => prev.map(robot => {
        if (robot.status === "charging") {
          // Şarjdaki robot yerinde kalır, batarya yavaşça artar
          return { ...robot, battery: Math.min(100, robot.battery + 0.5) };
        }
        // Sadece x ekseninde (ana koridor boyunca) hareket
        let newX = robot.x + (Math.random() > 0.5 ? 1 : -1);
        newX = Math.max(1, Math.min(COLS - 2, newX));
        return { ...robot, x: newX, battery: Math.max(0, robot.battery - 0.08) };
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            {t("robot.title").split(" ").slice(0,1).join(" ")} <span className="text-primary">{t("robot.title").split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-muted-foreground text-sm">{t("robot.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-success/10 text-success border-success/20 py-1.5 px-3">
            <Activity className="w-3 h-3 mr-2 animate-pulse" /> {t("robot.systemActive")}
          </Badge>
          <Badge className="bg-primary/10 text-primary border-primary/20 py-1.5 px-3">
            <Bot className="w-3 h-3 mr-2" /> {robots.filter(r => r.status === "active").length}/{robots.length} {t("robot.onDuty")}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ SOL: DEPO HARİTASI ═══ */}
        <Card className="lg:col-span-2 glass-card border-0 glow-border-blue overflow-hidden">
          <CardHeader className="pb-2 bg-muted/5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" /> {t("robot.mapTitle")}
                </CardTitle>
                <CardDescription className="text-[10px] mt-1">{t("robot.mapDesc")}</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-success/20 border border-success/30" />
                  <span className="text-[9px] font-medium">{t("robot.corridor")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-orange-500/10 border border-orange-500/20" />
                  <span className="text-[9px] font-medium">{t("robot.loca")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-500 border border-blue-400" />
                  <span className="text-[9px] font-medium">{t("robot.robot")}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Üst Etiket: ÜST LOCA SIRASI */}
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-3 h-3 text-orange-400 opacity-40" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-orange-400/50">{t("robot.upperLoca")}</span>
            </div>

            {/* GRID */}
            <div className="relative w-full rounded-2xl border border-white/5 bg-muted/5 overflow-hidden">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
              >
                {Array.from({ length: COLS * ROWS }).map((_, i) => {
                  const x = i % COLS;
                  const y = Math.floor(i / COLS);
                  const isCorridor = CORRIDOR_ROWS.includes(y);
                  const locaLabel = getLocaLabel(x, y);
                  const isEntrance = x === 0 && isCorridor;
                  const isExit = x === COLS - 1 && isCorridor;
                  const robotHere = robots.find(r => r.x === x && r.y === y);

                  return (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square border border-white/[0.04] flex items-center justify-center relative transition-colors",
                        isCorridor
                          ? "bg-success/[0.06] hover:bg-success/10"
                          : "bg-orange-500/[0.03]",
                        isEntrance && "bg-blue-500/10",
                        isExit && "bg-amber-500/10"
                      )}
                    >
                      {/* Giriş/Çıkış etiketleri */}
                      {isEntrance && (
                        <span className="text-[7px] font-bold text-blue-400 uppercase">{t("robot.entrance")}</span>
                      )}
                      {isExit && (
                        <span className="text-[7px] font-bold text-amber-400 uppercase">{t("robot.exit")}</span>
                      )}

                      {/* Loca etiketleri */}
                      {locaLabel && !robotHere && (
                        <span className="text-[8px] font-bold text-muted-foreground/20 select-none">{locaLabel}</span>
                      )}

                      {/* Robot */}
                      {robotHere && (
                        <motion.div
                          layoutId={robotHere.id}
                          className={cn(
                            "absolute inset-1 rounded-lg flex flex-col items-center justify-center cursor-pointer z-10 shadow-lg transition-shadow",
                            robotHere.color,
                            selectedId === robotHere.id && "ring-2 ring-white/60 shadow-2xl"
                          )}
                          onClick={() => setSelectedId(robotHere.id)}
                          title={`${robotHere.name} — ${robotHere.task}`}
                        >
                          <Bot className="w-4 h-4 text-white drop-shadow-sm" />
                          <span className="text-[6px] font-black text-white/80 mt-0.5">{robotHere.id}</span>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Koridor ortasındaki ok işaretleri */}
              <div className="absolute left-0 right-0 pointer-events-none flex items-center justify-center" style={{ top: '41.66%', height: '16.66%' }}>
                <div className="flex items-center gap-1 opacity-10">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ArrowRight key={i} className="w-4 h-4 text-success" />
                  ))}
                </div>
              </div>
            </div>

            {/* Alt Etiket: ALT LOCA SIRASI */}
            <div className="flex items-center gap-2 mt-2">
              <Box className="w-3 h-3 text-orange-400 opacity-40" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-orange-400/50">{t("robot.lowerLoca")}</span>
            </div>

            {/* Alt bilgi çubuğu */}
            <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <Shield className="w-4 h-4 text-blue-400 shrink-0" />
              <p className="text-[10px] text-muted-foreground">
                <span className="text-blue-400 font-bold">{t("robot.safetyRule")}</span> {t("robot.safetyDesc")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ═══ SAĞ: ROBOT DETAY PANELİ ═══ */}
        <div className="space-y-6">
          {/* Seçili Robot Detayı */}
          <Card className="glass-card border-0 shadow-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-muted/10 border-b border-white/5">
              <CardTitle className="text-xs uppercase tracking-widest flex items-center gap-2">
                <Bot className="w-3 h-3" /> {t("robot.selectedRobot")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", selected.color)}>
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold">{selected.name}</p>
                  <p className="text-[10px] text-muted-foreground">{selected.task}</p>
                  <Badge variant="outline" className={cn("text-[9px] mt-1",
                    selected.status === "active" ? "text-success border-success/30" :
                    selected.status === "charging" ? "text-amber-400 border-amber-400/30" :
                    "text-muted-foreground"
                  )}>
                    {selected.status === "active" ? t("robot.onDutyStatus") :
                     selected.status === "charging" ? t("robot.chargingStatus") : t("robot.idleStatus")}
                  </Badge>
                </div>
              </div>

              {/* Batarya */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground flex items-center gap-1">
                    {selected.status === "charging" ? <BatteryCharging className="w-3 h-3 text-amber-400" /> : <Battery className="w-3 h-3" />}
                    {t("robot.battery")}
                  </span>
                  <span className={cn("font-bold", selected.battery > 50 ? "text-success" : selected.battery > 20 ? "text-amber-400" : "text-red-400")}>
                    %{Math.round(selected.battery)}
                  </span>
                </div>
                <Progress value={selected.battery} className="h-2" />
              </div>

              {/* Konum & Yük */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/10 border border-white/5">
                  <p className="text-[9px] text-muted-foreground uppercase font-medium mb-1">{t("robot.position")}</p>
                  <p className="text-xs font-bold font-mono">X:{selected.x} Y:{selected.y}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/10 border border-white/5">
                  <p className="text-[9px] text-muted-foreground uppercase font-medium mb-1">{t("robot.cargo")}</p>
                  <p className="text-xs font-bold">{selected.carrying || "—"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tüm Robotlar */}
          <Card className="glass-card border-0 shadow-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-muted/10 border-b border-white/5">
              <CardTitle className="text-xs uppercase tracking-widest">{t("robot.fleetSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {robots.map(robot => (
                <div
                  key={robot.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                    selectedId === robot.id ? "bg-primary/10 border-primary/30" : "bg-muted/5 border-white/5 hover:bg-muted/10"
                  )}
                  onClick={() => setSelectedId(robot.id)}
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", robot.color)}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold truncate">{robot.name}</p>
                    <p className="text-[9px] text-muted-foreground truncate">{robot.task}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn("text-[10px] font-bold", robot.battery > 50 ? "text-success" : "text-amber-400")}>%{Math.round(robot.battery)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sistem Logları */}
          <Card className="glass-card border-0 shadow-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-muted/10 border-b border-white/5">
              <CardTitle className="text-xs uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> {t("robot.logs")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[180px] p-4">
                <div className="space-y-2">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 text-[10px] pb-2 border-b border-white/5">
                      <span className="text-muted-foreground font-mono whitespace-nowrap">{log.time}</span>
                      <span className="text-sm leading-none">{log.icon}</span>
                      <span className="text-foreground/70 leading-relaxed">{log.msg}</span>
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
