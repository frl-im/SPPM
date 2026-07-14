'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#181A1D] via-[#0E0F10] to-[#0A0B0C] text-white border-t border-mazda-burgundy/30 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mazda-burgundy/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mazda-blue/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mazda-burgundy to-[#5A0718] flex items-center justify-center shadow-md">
                <span className="text-white font-mazda font-bold text-xl tracking-tighter">S</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-mazda text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-mazda-steel-gray tracking-tight">
                  SPPM
                </span>
                <span className="block text-[10px] font-semibold text-mazda-cyan tracking-[0.25em] uppercase -mt-1">
                  Luxury Motors
                </span>
              </div>
            </Link>
            <p className="text-sm text-mazda-steel-gray leading-relaxed pr-4">
              Platform penjualan kendaraan mewah terdepan dengan standar kualitas internasional, transparansi penuh, dan layanan purnajual excellence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-mazda-steel-gray hover:text-white hover:bg-mazda-burgundy hover:border-mazda-burgundy transition-all duration-300 text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-mazda-steel-gray hover:text-white hover:bg-mazda-burgundy hover:border-mazda-burgundy transition-all duration-300 text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-mazda-steel-gray hover:text-white hover:bg-mazda-burgundy hover:border-mazda-burgundy transition-all duration-300 text-xs font-bold"
                aria-label="LinkedIn"
              >
                IN
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-mazda font-bold text-mazda-cyan mb-6">Navigasi Utama</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Katalog Mobil Premium
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Booking & Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Tentang SPPM
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-mazda font-bold text-mazda-cyan mb-6">Informasi & Layanan</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/faq" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Pertanyaan Umum (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-mazda-steel-gray hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Garansi & Customer Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-mazda font-bold text-mazda-cyan mb-6">Hubungi Showroom</h4>
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 transition hover:border-mazda-burgundy/40">
                <p className="text-[11px] uppercase tracking-wider text-mazda-steel-gray mb-1">Hotline Resmi (24/7)</p>
                <a href="tel:+628001234567" className="text-base text-white font-bold hover:text-mazda-cyan transition-colors">
                  +62 800 1234 567
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-mazda-steel-gray mb-1">Email Layanan</p>
                <a href="mailto:info@sppm.com" className="text-sm text-white font-semibold hover:text-mazda-cyan transition-colors">
                  info@sppm.com
                </a>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-mazda-steel-gray mb-1">Lokasi Utama</p>
                <p className="text-sm text-white font-semibold">Jakarta Central Business District, ID</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-mazda-steel-gray">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} SPPM. Semua hak dilindungi. Diinspirasi oleh filosofi desain Mazda yang elegan & berkelas.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
