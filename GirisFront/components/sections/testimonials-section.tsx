"use client"

import { motion } from "motion/react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "LogiSense ile operasyonel verimliliğimiz %40 arttı. Otonom robot takibi sayesinde depo yönetimi çok daha kolay.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Ahmet Yılmaz",
    role: "Operasyon Direktörü, TurkCargo",
  },
  {
    text: "Karbon ayak izi raporlama özelliği sayesinde sürdürülebilirlik hedeflerimize çok daha hızlı ulaştık.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Zeynep Kaya",
    role: "Sürdürülebilirlik Müdürü, EcoTrans",
  },
  {
    text: "Gerçek zamanlı sensör verileri ile depo sıcaklığı ve nem kontrolü artık sorun olmaktan çıktı.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Mehmet Demir",
    role: "Lojistik Müdürü, Kapadokya Lojistik",
  },
  {
    text: "Rota optimizasyonu ile yakıt maliyetlerimizi %25 azalttık. ROI ilk ayda kendini gösterdi.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Elif Öztürk",
    role: "Filo Yöneticisi, SmartPort",
  },
  {
    text: "Teknik destek ekibi muhteşem. Kurulum süreci çok hızlı ve sorunsuz geçti.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Ayşe Çelik",
    role: "IT Müdürü, AnadoluFilo",
  },
  {
    text: "IoT entegrasyonları sayesinde tüm cihazlarımızı tek panelden yönetebiliyoruz. Harika bir deneyim.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Can Aksoy",
    role: "CTO, TechLogistics",
  },
  {
    text: "Dashboard arayüzü çok kullanıcı dostu. Eğitim ihtiyacı neredeyse sıfır.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Selin Yıldız",
    role: "Proje Yöneticisi, CargoPlus",
  },
  {
    text: "Yapay zeka destekli analiz özellikleri iş kararları almamızı kolaylaştırdı.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Burak Şahin",
    role: "Veri Analisti, LogiTech",
  },
  {
    text: "7/24 sistem uptime ile hiç kesinti yaşamadık. Güvenilirlik konusunda harika.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Deniz Arslan",
    role: "Operasyon Şefi, TransEurope",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const logos = ["TurkCargo", "EcoTrans", "SmartPort", "AnadoluFilo", "LogiTech", "CargoPlus"]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-12"
        >
          <div className="glass py-1.5 px-4 rounded-full text-sm text-[#3498db] font-medium">Referanslar</div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-800 mt-6 text-center tracking-tight">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-center mt-4 text-slate-500 text-lg text-balance">
            Sektörde lider şirketlerin LogiSense deneyimlerini dinleyin.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

        <div className="mt-16 pt-16 border-t border-slate-200">
          <p className="text-center text-sm text-slate-400 mb-8">Sektörde Öncülerle Çalışıyoruz</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-xl font-semibold text-slate-300 whitespace-nowrap flex-shrink-0 hover:text-[#3498db] transition-colors"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
