"use client"

import Link from "next/link"
import { Bot, Menu, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "#features", label: "Özellikler" },
  { href: "#testimonials", label: "Referanslar" },
  { href: "#pricing", label: "Fiyatlandırma" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-14 px-6 rounded-2xl glass">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3498db] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-slate-800">LogiSense</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm rounded-full transition-colors text-slate-500 hover:text-[#3498db]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#pricing"
            className="ml-2 px-5 py-2 text-sm rounded-full bg-[#3498db] text-white font-medium hover:bg-[#2980b9] transition-colors"
          >
            Demo Talep Et
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-500 hover:text-[#3498db]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-5xl rounded-2xl glass p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm rounded-lg transition-colors text-slate-500 hover:text-[#3498db] hover:bg-[#3498db]/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-5 py-2.5 text-sm rounded-lg bg-[#3498db] text-white font-medium hover:bg-[#2980b9] transition-colors text-center"
            >
              Demo Talep Et
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
