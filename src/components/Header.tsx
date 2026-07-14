'use client'

import Link from 'next/link'
import { Button } from './Button'

export function Header() {
  return (
    <header className="bg-white border-b border-mazda-border-gray/50 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy to-mazda-charcoal">
            SPPM
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Beranda
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/catalog" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Katalog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/about" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Tentang
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/booking" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Booking
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/admin" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Admin
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/contact" className="text-body text-mazda-charcoal font-mazda font-medium hover:text-mazda-burgundy transition-colors relative group">
            Kontak
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mazda-burgundy group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <Button variant="primary" size="md">
              Konsultasi
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
