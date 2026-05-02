"use client"

import Link from "next/link"
import { Bot, Menu, X, LogIn } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "#features", label: "Özellikler" },
  { href: "#testimonials", label: "Referanslar" },
  { href: "#pricing", label: "Fiyatlandırma" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-16 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">CaveGuard</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium rounded-full transition-all text-slate-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Link
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            Yönetim Paneli
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl rounded-2xl bg-white p-4 shadow-xl border border-slate-100">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl transition-colors text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 text-sm rounded-xl bg-blue-600 text-white font-bold"
            >
              <LogIn className="w-4 h-4" />
              Yönetim Paneli
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
