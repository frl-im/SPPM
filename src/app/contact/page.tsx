'use client'

import Link from 'next/link'
import { BookingForm } from '@/components/BookingForm'
import { getStoredCars } from '@/lib/storage'

export default function Contact() {
  const carsData = getStoredCars()

  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Dark Cinematic */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
            Layanan Pelanggan VIP
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
            Hubungi Tim <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Concierge SPPM</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Baik Anda membutuhkan janji temu privat di showroom, negosiasi skema pembiayaan khusus, atau spesifikasi teknis mendalam, tim penasihat senior kami siap melayani Anda 24/7.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
        {/* Left Column: Contact Details & Showroom */}
        <div className="space-y-6 sticky top-24">
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold block mb-2">
              Markas Eksklusif
            </span>
            <h2 className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mb-6">
              Informasi Kontak VIP
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-mazda-light-gray/40 border border-mazda-border-gray/60">
                <div className="w-10 h-10 rounded-xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-lg flex-shrink-0 font-bold">
                  📍
                </div>
                <div>
                  <h3 className="font-mazda font-bold text-mazda-charcoal text-sm mb-1">Showroom Flagship & Private Lounge</h3>
                  <p className="text-xs text-mazda-steel-gray leading-relaxed font-light">
                    Jl. Merdeka No. 123, SCBD VIP District, Jakarta Pusat 12190
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-mazda-light-gray/40 border border-mazda-border-gray/60">
                <div className="w-10 h-10 rounded-xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-lg flex-shrink-0 font-bold">
                  📞
                </div>
                <div>
                  <h3 className="font-mazda font-bold text-mazda-charcoal text-sm mb-1">Telepon & Hotline 24 Jam</h3>
                  <p className="text-xs text-mazda-steel-gray font-semibold">+62 800 1234 5678 (Toll Free)</p>
                  <p className="text-xs text-mazda-steel-gray mt-0.5">+62 811 9988 7766 (Concierge WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-mazda-light-gray/40 border border-mazda-border-gray/60">
                <div className="w-10 h-10 rounded-xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-lg flex-shrink-0 font-bold">
                  📧
                </div>
                <div>
                  <h3 className="font-mazda font-bold text-mazda-charcoal text-sm mb-1">Email Resmi</h3>
                  <p className="text-xs text-mazda-steel-gray font-medium">vip@sppm-supercars.com</p>
                  <p className="text-xs text-mazda-steel-gray mt-0.5">sales@sppm-supercars.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-mazda-light-gray/40 border border-mazda-border-gray/60">
                <div className="w-10 h-10 rounded-xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-lg flex-shrink-0 font-bold">
                  🕐
                </div>
                <div>
                  <h3 className="font-mazda font-bold text-mazda-charcoal text-sm mb-1">Jam Operasional Showroom</h3>
                  <p className="text-xs text-mazda-steel-gray">Senin - Jumat: 09.00 - 20.00 WIB</p>
                  <p className="text-xs text-mazda-steel-gray mt-0.5">Sabtu - Minggu: 10.00 - 18.00 WIB (Sesuai Reservasi)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Booking CTA Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-7 sm:p-9 text-white border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mazda-burgundy/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold block mb-2">
                Akses Eksklusif
              </span>
              <h3 className="text-2xl font-mazda font-bold text-white mb-2">Ingin Reservasi Cepat?</h3>
              <p className="text-xs text-gray-300 mb-6 leading-relaxed font-light">
                Jadwalkan test drive langsung atau minta brosur spesifikasi unit langsung melalui halaman reservasi kami.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-mazda-burgundy px-6 py-3.5 text-xs font-mazda font-bold text-white shadow-glow hover:bg-mazda-red transition-all"
              >
                <span>Buka Halaman Booking & Reservasi</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Booking & Consultation Form */}
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-10 shadow-premium">
          <div className="border-b border-mazda-border-gray/60 pb-5 mb-7">
            <span className="text-xs font-mazda font-bold text-mazda-burgundy uppercase tracking-widest bg-mazda-burgundy/10 px-3 py-1 rounded-full">
              Formulir Pertanyaan & Konsultasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mt-3">
              Kirim Pesan Langsung
            </h2>
            <p className="text-sm text-mazda-steel-gray mt-1">
              Isi data diri Anda di bawah ini untuk terhubung seketika dengan tim spesialis penjualan kami.
            </p>
          </div>
          <BookingForm cars={carsData} />
        </div>
      </div>
    </div>
  )
}
