'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Katalog', href: '/catalog' },
    { name: 'Tentang', href: '/about' },
    { name: 'Booking', href: '/booking' },
    { name: 'Kontak', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 border-b border-mazda-border-gray/50 shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mazda-burgundy to-[#5A0718] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-mazda font-bold text-xl tracking-tighter">S</span>
          </div>
          <div>
            <div className="text-2xl font-bold font-mazda text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy via-mazda-charcoal to-mazda-black tracking-tight">
              SPPM
            </div>
            <div className="text-[10px] font-semibold text-mazda-steel-gray tracking-[0.25em] uppercase -mt-1">
              Luxury Motors
            </div>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide font-mazda font-semibold transition-colors relative py-2 ${
                  isActive
                    ? 'text-mazda-burgundy'
                    : 'text-mazda-charcoal hover:text-mazda-burgundy'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-mazda-burgundy to-mazda-cyan transition-all duration-300 rounded-full ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* CTA Button & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Link href="/contact">
              <Button variant="primary" size="sm" className="shadow-sm hover:shadow-md">
                Konsultasi
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-mazda-charcoal hover:bg-mazda-light-gray focus:outline-none focus:ring-2 focus:ring-mazda-burgundy/20"
            aria-label="Toggle Menu"
          >
            <span className="text-2xl leading-none">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-mazda-border-gray/50 bg-white/95 backdrop-blur-xl animate-scale-in px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-mazda font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-mazda-burgundy/10 text-mazda-burgundy border border-mazda-burgundy/20'
                      : 'text-mazda-charcoal hover:bg-mazda-light-gray'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="text-xs">●</span>}
                </Link>
              )
            })}
          </div>
          <div className="pt-3 border-t border-mazda-border-gray/40 flex flex-col gap-2">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Konsultasi Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
