import Link from "next/link"
import { Github, Twitter, Linkedin, Bot } from "lucide-react"

const footerLinks = {
  urun: [
    { label: "Özellikler", href: "#features" },
    { label: "Fiyatlandırma", href: "#pricing" },
    { label: "Değişiklik Günlüğü", href: "#" },
    { label: "Dokümantasyon", href: "#" },
    { label: "API", href: "#" },
  ],
  sirket: [
    { label: "Hakkımızda", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kariyer", href: "#" },
    { label: "İletişim", href: "#" },
  ],
  yasal: [
    { label: "Gizlilik Politikası", href: "#" },
    { label: "Kullanım Koşulları", href: "#" },
    { label: "Güvenlik", href: "#" },
    { label: "KVKK", href: "#" },
  ],
}

export function FooterSection() {
  return (
    <footer className="px-6 py-16 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#3498db] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold text-slate-800">LogiSense</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Otonom robotlar ve IoT ile lojistik operasyonlarınızı dönüştürün.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-pulse" />
              <span className="text-xs text-slate-400">Sistem Çevrimiçi</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-slate-800 mb-4">Ürün</h4>
            <ul className="space-y-3">
              {footerLinks.urun.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-[#3498db] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-slate-800 mb-4">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.sirket.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-[#3498db] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-slate-800 mb-4">Yasal</h4>
            <ul className="space-y-3">
              {footerLinks.yasal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-[#3498db] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} LogiSense. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="#" 
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#3498db]/10 flex items-center justify-center text-slate-400 hover:text-[#3498db] transition-colors" 
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link 
              href="#" 
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#3498db]/10 flex items-center justify-center text-slate-400 hover:text-[#3498db] transition-colors" 
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link 
              href="#" 
              className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-[#3498db]/10 flex items-center justify-center text-slate-400 hover:text-[#3498db] transition-colors" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
