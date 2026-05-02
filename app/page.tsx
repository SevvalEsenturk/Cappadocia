import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ImpactSection } from "@/components/landing/impact-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <HeroSection />
      <ImpactSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400 font-medium tracking-wide">© 2026 CAVEGUARD MISSION CONTROL. TÜM HAKLARI SAKLIDIR.</p>
        <p className="text-[10px] text-slate-300 mt-2 uppercase tracking-[0.2em]">Kapadokya Hackathon 2026 Projesi</p>
      </footer>
    </main>
  )
}
