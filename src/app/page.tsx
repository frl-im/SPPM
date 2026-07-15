'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { CarCard } from '@/components/CarCard'
import { getStoredCars } from '@/lib/storage'

export default function Home() {
  const carsData = getStoredCars()
  const [activeTab, setActiveTab] = useState<string>('ALL')

  const categories = ['ALL', 'SPORTS CAR', 'EXECUTIVE', 'SUV', 'ELECTRIC']
  
  const filteredCars = carsData.filter((car) => {
    if (activeTab === 'ALL') return true
    return car.category?.toUpperCase() === activeTab
  }).slice(0, 6)

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Hero Section - Official Mazda Global Aesthetic (input_file_0.png) */}
      <section className="relative w-full min-h-[680px] md:min-h-[800px] flex items-center justify-center bg-[#141414] text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {carsData.length > 0 && (
            <Image
              src={carsData[0].image}
              alt="Featured Mazda / SPPM Supercar"
              fill
              className="object-cover object-center transition-transform duration-1000 opacity-75"
              priority
            />
          )}
          {/* Subtle vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 z-10" />
        </div>

        {/* Content Box Over Car (input_file_0.png DISCOVER MORE style) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 flex flex-col items-center sm:items-start justify-end min-h-[680px] md:min-h-[800px]">
          <div className="max-w-2xl mb-12 text-center sm:text-left">
            <span className="inline-block px-3.5 py-1 mb-4 text-[10px] font-mazda font-bold tracking-[0.3em] uppercase bg-black/50 border border-white/20 text-gray-200">
              CRAFTED IN LUXURY
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 font-mazda font-light leading-tight tracking-wide uppercase">
              PURSUE <span className="font-bold">PERFECTION</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg leading-relaxed font-light">
              Rasakan keindahan lekukan desain aerodinamis kelas dunia serta performa mengemudi yang menyatu sempurna dengan jiwa Anda.
            </p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link href="/catalog">
                <button
                  type="button"
                  className="px-8 py-3 border border-white/80 bg-black/40 backdrop-blur-md text-white text-xs font-medium uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all shadow-xl cursor-pointer"
                >
                  DISCOVER MORE
                </button>
              </Link>
              <Link href="/booking">
                <button
                  type="button"
                  className="px-8 py-3 border border-mazda-burgundy bg-mazda-burgundy/90 text-white text-xs font-medium uppercase tracking-[0.25em] hover:bg-[#770000] transition-all shadow-xl cursor-pointer"
                >
                  TEST DRIVE
                </button>
              </Link>
            </div>
          </div>

          {/* Floating Burgundy Plus FAB Button from input_file_0.png */}
          <Link
            href="/contact"
            className="absolute right-6 bottom-10 w-14 h-14 rounded-full bg-[#990000] text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-[#770000] transition-all z-30"
            title="Hubungi Kami"
          >
            <span className="text-2xl font-light leading-none">+</span>
          </Link>
        </div>
      </section>

      {/* EXPLORE THE RANGE Section - Exact Mazda Aesthetic (input_file_1.png) */}
      <section className="py-20 md:py-28 bg-white text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-mazda font-light tracking-[0.25em] uppercase text-[#1A1A1A] mb-8">
              EXPLORE THE RANGE
            </h2>

            {/* Category Tabs with red bottom border indicator (input_file_1.png style) */}
            <div className="flex flex-wrap gap-8 border-b border-gray-200 pb-3">
              {categories.map((cat) => {
                const isActive = activeTab === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveTab(cat)}
                    className={`text-xs uppercase tracking-[0.22em] pb-3 -mb-3 transition-all font-mazda cursor-pointer ${
                      isActive
                        ? 'border-b-2 border-[#990000] font-semibold text-[#1A1A1A]'
                        : 'text-gray-400 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {cat === 'ALL' ? 'ALL VEHICLES' : cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cars Grid (Using our ultra-clean CarCard matching input_file_1.png) */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-400 text-sm">
              Tidak ada kendaraan di kategori <span className="font-semibold text-gray-700">{activeTab}</span> saat ini.
            </div>
          )}

          <div className="flex justify-center pt-14">
            <Link href="/catalog">
              <button
                type="button"
                className="px-10 py-3.5 border border-[#333] bg-white text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.25em] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer shadow-sm"
              >
                VIEW FULL CATALOG ({carsData.length} MODELS) →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* LET'S BUILD YOUR MAZDA / SPPM UNIQUELY FOR YOU Section (input_file_2.png) */}
      <section className="py-20 bg-[#F8F8F8] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-mazda font-light tracking-[0.18em] uppercase text-[#1A1A1A] max-w-xl leading-snug">
              LET&apos;S BUILD YOUR SPPM <br className="hidden sm:block" />
              <span className="font-medium">UNIQUELY FOR YOU</span>
            </h2>
            <Link
              href="/booking"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#990000] inline-flex items-center gap-2 transition-colors"
            >
              <span>BUILD YOUR SPPM</span>
              <span>→</span>
            </Link>
          </div>

          {/* 4 White Outline Cards exact layout from input_file_2.png */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: GRADE */}
            <Link href="/booking" className="block group">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-7 h-full shadow-sm group-hover:shadow-md group-hover:border-[#990000]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 mb-6 group-hover:bg-[#990000] group-hover:text-white transition-colors text-2xl">
                  🏎️
                </div>
                <h3 className="text-sm font-mazda font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-1.5">
                  GRADE
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Performance and key features
                </p>
              </div>
            </Link>

            {/* Card 2: VISUAL */}
            <Link href="/booking" className="block group">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-7 h-full shadow-sm group-hover:shadow-md group-hover:border-[#990000]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 mb-6 group-hover:bg-[#990000] group-hover:text-white transition-colors text-2xl">
                  🚗
                </div>
                <h3 className="text-sm font-mazda font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-1.5">
                  VISUAL
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Look and feel
                </p>
              </div>
            </Link>

            {/* Card 3: ACCESSORIES */}
            <Link href="/booking" className="block group">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-7 h-full shadow-sm group-hover:shadow-md group-hover:border-[#990000]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 mb-6 group-hover:bg-[#990000] group-hover:text-white transition-colors text-2xl">
                  ⚙️
                </div>
                <h3 className="text-sm font-mazda font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-1.5">
                  ACCESSORIES
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Perfection into detail
                </p>
              </div>
            </Link>

            {/* Card 4: SUMMARY */}
            <Link href="/booking" className="block group">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-7 h-full shadow-sm group-hover:shadow-md group-hover:border-[#990000]/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 mb-6 group-hover:bg-[#990000] group-hover:text-white transition-colors text-2xl">
                  🛍️
                </div>
                <h3 className="text-sm font-mazda font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-1.5">
                  SUMMARY
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Get your SPPM supercar
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Box */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-[#F8F8F8] p-8 sm:p-12 flex flex-col justify-between shadow-sm">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#990000]/10 text-[#990000] text-xs font-mazda font-bold uppercase tracking-widest mb-6 border border-[#990000]/20">
                  Kepercayaan Pelanggan
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-6 font-mazda font-bold leading-tight">
                  Layanan premium yang <span className="text-[#990000]">mudah dipercaya</span>
                </h2>
                <p className="text-base text-gray-500 leading-relaxed mb-8">
                  Kami menggabungkan kurasi mobil premium, konsultasi finansial transparan, dan test drive eksklusif dalam satu alur yang nyaman dan profesional.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                  <div className="text-3xl font-mazda font-bold text-[#990000] mb-1">24/7</div>
                  <p className="text-xs text-gray-500 font-medium">Layanan respon cepat untuk pertanyaan, penjadwalan, dan darurat.</p>
                </div>
                <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                  <div className="text-3xl font-mazda font-bold text-[#1A1A1A] mb-1">100%</div>
                  <p className="text-xs text-gray-500 font-medium">Transparansi harga, riwayat servis, dan kondisi riil kendaraan.</p>
                </div>
              </div>
            </div>

            {/* Right Box - Testimonials */}
            <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-mazda font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-500 font-normal">(4.9/5 Rating)</span>
                </h3>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#F8F8F8] p-6 border border-gray-200/80">
                    <p className="text-sm text-[#1A1A1A] italic leading-relaxed">
                      “Proses konsultasi sangat smooth. Tim SPPM menjelaskan spesifikasi Ferrari dan opsi pembiayaan dengan sangat transparan.”
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200/80">
                      <div className="w-9 h-9 rounded-full bg-[#990000] text-white flex items-center justify-center font-bold text-xs">
                        AR
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1A]">Arief Budiman</p>
                        <p className="text-[11px] text-gray-500">Customer Ferrari F8 Tributo</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#F8F8F8] p-6 border border-gray-200/80">
                    <p className="text-sm text-[#1A1A1A] italic leading-relaxed">
                      “Saya dapat membandingkan opsi supercar dan langsung mencoba test drive di akhir pekan. Layanan yang benar-benar first-class.”
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200/80">
                      <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs">
                        DN
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1A]">Dinda Permatasari</p>
                        <p className="text-[11px] text-gray-500">Customer Porsche 911 Turbo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row gap-3">
                <Link href="/booking" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">Jadwalkan Test Drive</Button>
                </Link>
                <Link href="/faq" className="flex-1">
                  <Button variant="secondary" size="md" className="w-full">Lihat FAQ</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Dark Banner */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white relative overflow-hidden border-t border-mazda-burgundy/30">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-mazda-cyan/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold uppercase tracking-widest mb-6 border border-white/15">
                Konsultasi Prioritas
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 font-mazda font-bold leading-tight tracking-tight">
                Siap Memulai <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan to-white">Perjalanan</span> Premium Anda?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                Hubungi tim sales expert kami untuk konsultasi spesifikasi, penawaran harga spesial, maupun jadwal kunjungan privat ke showroom.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="px-8 py-4 shadow-glow">
                    Hubungi Sales Expert
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button variant="ghost" size="lg" className="px-8 py-4">
                    Eksplorasi Katalog
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-mazda-burgundy via-white/20 to-mazda-cyan/30 shadow-2xl">
                <div className="bg-[#141619] rounded-[22px] p-8 sm:p-10 text-center border border-white/10 backdrop-blur-xl">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-mazda-burgundy to-[#5A0718] flex items-center justify-center shadow-lg mb-6">
                    <span className="text-4xl">🏁</span>
                  </div>
                  <h3 className="text-2xl font-mazda font-bold text-white mb-2">Drive Your Dream</h3>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Dapatkan pendampingan langsung dari penasihat otomotif senior kami 7 hari dalam seminggu.
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-left">
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider">Hotline VIP (24/7)</p>
                      <p className="text-base font-bold text-white mt-0.5">+62 800 1234 567</p>
                    </div>
                    <a
                      href="tel:+628001234567"
                      className="px-4 py-2 rounded-lg bg-mazda-burgundy text-white text-xs font-bold hover:bg-[#6D0821] transition-colors"
                    >
                      Panggil
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
