'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'BERANDA', href: '/' },
    { name: 'VEHICLES / KATALOG', href: '/catalog' },
    { name: 'BUILD & BOOK', href: '/booking' },
    { name: 'WHY SPPM', href: '/about' },
    { name: 'CONTACT US', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#141414]/95 border-b border-white/10 shadow-lg transition-all duration-300 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo - Mazda Emblem Inspired Silver/White Ring */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-full border-2 border-white/85 bg-gradient-to-b from-white/15 to-transparent flex items-center justify-center shadow-md group-hover:border-white transition-all">
            <span className="text-white font-mazda font-bold text-xl tracking-tighter drop-shadow">S</span>
          </div>
          <div>
            <div className="text-2xl font-bold font-mazda tracking-[0.1em] uppercase text-white group-hover:text-gray-200 transition-colors">
              SPPM
            </div>
            <div className="text-[9px] font-medium text-gray-400 tracking-[0.3em] uppercase -mt-1">
              Luxury Motors
            </div>
          </div>
        </Link>

        {/* Navigation Links - Desktop (input_file_0.png style uppercase tracking) */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.22em] font-mazda font-medium transition-colors relative py-2 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-mazda-burgundy transition-all duration-300 rounded-full ${
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
              <Button variant="primary" size="sm" className="shadow-sm hover:shadow-md text-xs tracking-widest uppercase px-5">
                Konsultasi
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-mazda-burgundy/40"
            aria-label="Toggle Menu"
          >
            <span className="text-2xl leading-none">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#161618] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-scale-in">
          <div className="grid grid-cols-1 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-mazda font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-mazda-burgundy/20 text-white border border-mazda-burgundy/40'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="text-mazda-burgundy text-sm">●</span>}
                </Link>
              )
            })}
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full text-xs tracking-widest uppercase">
                Konsultasi Sekarang
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
