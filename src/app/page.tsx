'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { CarCard } from '@/components/CarCard'
import { getStoredCars } from '@/lib/storage'

export default function Home() {
  const carsData = getStoredCars()
  const featuredCars = carsData.filter((car) => car.isFeatured).slice(0, 6)

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Premium Cinematic */}
      <section className="relative w-full min-h-[780px] md:min-h-[880px] flex items-center justify-center bg-mazda-black text-white">
        {/* Background Image with zoom animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {carsData.length > 0 && (
            <Image
              src={carsData[0].image}
              alt="Featured Car"
              fill
              className="object-cover object-center scale-105 animate-pulse-glow transition-transform duration-1000 opacity-60"
              priority
            />
          )}
          {/* Multi-layered Gradient Overlays for readability and luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-mazda-black via-mazda-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-mazda-black via-transparent to-mazda-black/40 z-10" />
          {/* Glowing ambient light */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-mazda-burgundy/30 rounded-full blur-[120px] pointer-events-none z-10" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-mazda-cyan/15 rounded-full blur-[100px] pointer-events-none z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-float">
              <span className="w-2 h-2 rounded-full bg-mazda-burgundy animate-ping" />
              <span className="text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase">
                Koleksi Eksklusif SPPM
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 font-mazda font-bold leading-[1.1] tracking-tight">
              Pengalaman <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-mazda-cyan">
                Berkendara Premium
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-light">
              Temukan koleksi mobil premium terpilih dengan teknologi terdepan, desain aerodinamis memukau, dan performa melampaui ekspektasi Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-glow">
                  Jelajahi Sekarang →
                </Button>
              </Link>
              <Link href="/booking" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Jadwalkan Test Drive
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-2xl sm:text-3xl font-bold font-mazda text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy to-red-400">
                  {carsData.length}+
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Mobil Premium</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-2xl sm:text-3xl font-bold font-mazda text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan to-blue-400">
                  4.9★
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Rating Kepuasan</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="text-2xl sm:text-3xl font-bold font-mazda text-white">
                  100%
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Inspeksi Lolos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom smooth transition shape */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
      </section>

      {/* Featured Cars Section - Premium */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="mb-4 inline-block">
              <span className="text-mazda-burgundy text-xs font-mazda font-bold tracking-[0.25em] uppercase px-4 py-2 bg-mazda-burgundy/10 rounded-full border border-mazda-burgundy/20">
                Pilihan Istimewa
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-mazda-black mb-6 font-mazda font-bold">
              Kendaraan <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy to-[#5A0718]">Legendaris</span>
            </h2>
            <p className="text-base sm:text-lg text-mazda-steel-gray leading-relaxed">
              Koleksi mobil sports dan supercar premium pilihan dengan performa ekstrem dan estetika desain yang menginspirasi setiap perjalanan Anda.
            </p>
          </div>

          {/* Cars Grid */}
          {featuredCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <Link href="/catalog">
                  <Button variant="secondary" size="lg" className="px-10 shadow-sm hover:shadow-md">
                    Lihat Semua Koleksi ({carsData.length} Kendaraan) →
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-mazda-light-gray rounded-3xl p-16 text-center border border-mazda-border-gray shadow-sm max-w-2xl mx-auto">
              <div className="mb-6 text-7xl">🚗</div>
              <h3 className="text-2xl text-mazda-charcoal mb-3 font-mazda font-bold">
                Katalog Sedang Diperbarui
              </h3>
              <p className="text-sm text-mazda-steel-gray mb-6 max-w-md mx-auto">
                Koleksi eksklusif kami sedang dalam tahap penyelenggaraan. Silakan kembali lagi beberapa saat lagi.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="md">Hubungi Showroom</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Why Choose Us */}
      <section className="py-24 md:py-32 bg-mazda-light-gray relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mazda-blue/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-mazda-burgundy text-xs font-mazda font-bold tracking-[0.25em] uppercase px-4 py-2 bg-mazda-burgundy/10 rounded-full border border-mazda-burgundy/20 inline-block mb-4">
              Komitmen Kami
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-mazda-black mb-6 font-mazda font-bold">
              Mengapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy to-[#5A0718]">SPPM?</span>
            </h2>
            <p className="text-base sm:text-lg text-mazda-steel-gray">
              Dedikasi tanpa henti untuk memberikan standar pelayanan internasional dan kepuasan kepemilikan mobil mewah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-mazda-border-gray/70 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-burgundy to-[#5A0718] rounded-2xl flex items-center justify-center mb-8 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-2xl text-mazda-black mb-3 font-mazda font-bold">
                Koleksi Eksklusif
              </h3>
              <p className="text-sm text-mazda-medium-gray leading-relaxed">
                Hanya kendaraan terbaik pilihan dengan spesifikasi tertinggi dan riwayat pemeliharaan sempurna yang lulus kurasi ketat kami.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-mazda-border-gray/70 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-charcoal to-mazda-black rounded-2xl flex items-center justify-center mb-8 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl text-mazda-black mb-3 font-mazda font-bold">
                Standar Sertifikasi
              </h3>
              <p className="text-sm text-mazda-medium-gray leading-relaxed">
                Setiap kendaraan melewati 150+ poin inspeksi menyeluruh serta dilengkapi sertifikat keaslian dan jaminan garansi resmi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-mazda-border-gray/70 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-burgundy via-[#7A0825] to-mazda-black rounded-2xl flex items-center justify-center mb-8 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl text-mazda-black mb-3 font-mazda font-bold">
                Layanan Excellence
              </h3>
              <p className="text-sm text-mazda-medium-gray leading-relaxed">
                Konsultan pribadi Anda siap menemani dari proses konsultasi, pengajuan pembiayaan, hingga pengiriman kendaraan ke garasi rumah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Box */}
            <div className="lg:col-span-7 rounded-3xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray via-white to-mazda-light-gray p-8 sm:p-12 flex flex-col justify-between shadow-sm">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-mazda-burgundy/10 text-mazda-burgundy text-xs font-mazda font-bold uppercase tracking-widest mb-6 border border-mazda-burgundy/20">
                  Kepercayaan Pelanggan
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-mazda-black mb-6 font-mazda font-bold leading-tight">
                  Layanan premium yang <span className="text-mazda-burgundy">mudah dipercaya</span>
                </h2>
                <p className="text-base text-mazda-steel-gray leading-relaxed mb-8">
                  Kami menggabungkan kurasi mobil premium, konsultasi finansial transparan, dan test drive eksklusif dalam satu alur yang nyaman dan profesional.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="rounded-2xl bg-white p-6 border border-mazda-border-gray/60 shadow-sm hover:border-mazda-burgundy/30 transition-colors">
                  <div className="text-3xl font-mazda font-bold text-mazda-burgundy mb-1">24/7</div>
                  <p className="text-xs text-mazda-steel-gray font-medium">Layanan respon cepat untuk pertanyaan, penjadwalan, dan darurat.</p>
                </div>
                <div className="rounded-2xl bg-white p-6 border border-mazda-border-gray/60 shadow-sm hover:border-mazda-burgundy/30 transition-colors">
                  <div className="text-3xl font-mazda font-bold text-mazda-black mb-1">100%</div>
                  <p className="text-xs text-mazda-steel-gray font-medium">Transparansi harga, riwayat servis, dan kondisi riil kendaraan.</p>
                </div>
              </div>
            </div>

            {/* Right Box - Testimonials */}
            <div className="lg:col-span-5 rounded-3xl border border-mazda-border-gray/70 bg-white p-8 sm:p-10 shadow-premium flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-mazda font-bold text-mazda-black mb-6 flex items-center gap-2">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-mazda-steel-gray font-normal">(4.9/5 Rating)</span>
                </h3>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-mazda-light-gray/80 p-6 border border-mazda-border-gray/40">
                    <p className="text-sm text-mazda-charcoal italic leading-relaxed">
                      “Proses konsultasi sangat smooth. Tim SPPM menjelaskan spesifikasi Ferrari dan opsi pembiayaan dengan sangat transparan.”
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-mazda-border-gray/40">
                      <div className="w-9 h-9 rounded-full bg-mazda-burgundy text-white flex items-center justify-center font-bold text-xs">
                        AR
                      </div>
                      <div>
                        <p className="text-xs font-bold text-mazda-black">Arief Budiman</p>
                        <p className="text-[11px] text-mazda-steel-gray">Customer Ferrari F8 Tributo</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-mazda-light-gray/80 p-6 border border-mazda-border-gray/40">
                    <p className="text-sm text-mazda-charcoal italic leading-relaxed">
                      “Saya dapat membandingkan opsi supercar dan langsung mencoba test drive di akhir pekan. Layanan yang benar-benar first-class.”
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-mazda-border-gray/40">
                      <div className="w-9 h-9 rounded-full bg-mazda-charcoal text-white flex items-center justify-center font-bold text-xs">
                        DN
                      </div>
                      <div>
                        <p className="text-xs font-bold text-mazda-black">Dinda Permatasari</p>
                        <p className="text-[11px] text-mazda-steel-gray">Customer Porsche 911 Turbo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-mazda-border-gray/50 flex flex-col sm:flex-row gap-3">
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
