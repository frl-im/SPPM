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
    <div className="w-full">
      {/* Hero Section - Premium dengan Background Image */}
      <section className="relative w-full min-h-[750px] md:min-h-[850px] overflow-hidden flex items-center">
        {/* Background dengan Featured Car Image */}
        <div className="absolute inset-0 z-0">
          {carsData.length > 0 && (
            <Image
              src={carsData[0].image}
              alt="Featured Car"
              fill
              className="object-cover object-center"
              priority
            />
          )}
          {/* Gradient Overlay - Dark to Transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-block">
              <span className="text-mazda-cyan text-caption font-mazda font-bold tracking-widest uppercase px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
                Koleksi Eksklusif
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 font-mazda font-bold leading-tight">
              Pengalaman <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-mazda-burgundy to-white">
                Berkendara Premium
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-mazda-light-gray mb-10 max-w-xl leading-relaxed font-light">
              Temukan koleksi mobil premium terpilih dengan teknologi terdepan, desain memukau, dan performa yang melampaui ekspektasi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/catalog">
                <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                  Jelajahi Sekarang
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Info Pembelian
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-8 border-t border-white/20 flex gap-8">
              <div>
                <div className="text-3xl font-bold text-mazda-burgundy">{carsData.length}+</div>
                <p className="text-mazda-light-gray text-sm">Mobil Premium</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-mazda-cyan">4.8★</div>
                <p className="text-mazda-light-gray text-sm">Rating Kepuasan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section - Premium */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-block">
              <span className="text-mazda-burgundy text-caption font-mazda font-bold tracking-widest uppercase px-4 py-2 bg-mazda-burgundy/10 rounded-full">
                Pilihan Istimewa
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl text-mazda-black mb-6 font-mazda font-bold">
              Kendaraan <span className="text-mazda-burgundy">Legendaris</span>
            </h2>
            <p className="text-xl text-mazda-steel-gray leading-relaxed">
              Koleksi mobil sports dan supercar premium pilihan dengan performa ekstrem dan desain yang menginspirasi
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

              <div className="flex justify-center pt-12 border-t border-mazda-border-gray">
                <Link href="/catalog">
                  <Button variant="secondary" size="lg" className="px-12">
                    Lihat Semua Koleksi →
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-mazda-faded-gray rounded-2xl p-20 text-center border border-mazda-border-gray">
              <div className="mb-6 text-7xl">🚗</div>
              <h3 className="text-h2 text-mazda-charcoal mb-4 font-mazda font-bold">
                Katalog Sedang Diperbarui
              </h3>
              <p className="text-body text-mazda-steel-gray mb-4 max-w-md mx-auto">
                Koleksi eksklusif kami sedang dalam tahap penyelenggaraan
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Premium */}
      <section className="py-24 md:py-32 bg-mazda-light-gray relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mazda-blue/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-mazda-burgundy text-caption font-mazda font-bold tracking-widest uppercase px-4 py-2 bg-mazda-burgundy/10 rounded-full inline-block">
              Komitmen Kami
            </span>
            <h2 className="text-5xl md:text-6xl text-mazda-black mt-6 mb-6 font-mazda font-bold">
              Mengapa <span className="text-mazda-burgundy">SPPM?</span>
            </h2>
            <p className="text-xl text-mazda-steel-gray">
              Dedikasi kami untuk memberikan pengalaman premium yang tak terlupakan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-2xl border border-mazda-border-gray hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-burgundy to-mazda-burgundy/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-h4 text-mazda-black mb-3 font-mazda font-bold">
                Koleksi Eksklusif
              </h3>
              <p className="text-body text-mazda-steel-gray leading-relaxed">
                Hanya kendaraan terbaik pilihan dengan spesifikasi premium dan kondisi sempurna yang kami tawarkan.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-2xl border border-mazda-border-gray hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-cyan to-mazda-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-h4 text-mazda-black mb-3 font-mazda font-bold">
                Standar Kualitas
              </h3>
              <p className="text-body text-mazda-steel-gray leading-relaxed">
                Setiap kendaraan telah melewati pemeriksaan menyeluruh dan sertifikasi internasional yang ketat.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-2xl border border-mazda-border-gray hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-mazda-burgundy/80 to-mazda-burgundy/60 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-h4 text-mazda-black mb-3 font-mazda font-bold">
                Layanan Excellence
              </h3>
              <p className="text-body text-mazda-steel-gray leading-relaxed">
                Tim expert kami siap memberikan konsultasi profesional dan dukungan penuh hingga penyerahan kendaraan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & FAQ Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div className="rounded-3xl border border-mazda-border-gray bg-mazda-light-gray p-10">
              <span className="inline-block px-4 py-2 rounded-full bg-mazda-burgundy/10 text-mazda-burgundy text-caption font-mazda font-bold uppercase tracking-widest mb-6">
                Kenapa pelanggan percaya
              </span>
              <h2 className="text-4xl md:text-5xl text-mazda-black mb-6 font-mazda font-bold">
                Layanan premium yang <span className="text-mazda-burgundy">mudah dipercaya</span>
              </h2>
              <p className="text-lg text-mazda-steel-gray leading-relaxed mb-8">
                Kami menggabungkan pencarian mobil premium, konsultasi personal, dan penawaran transparan dalam satu pengalaman yang halus dan efisien.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 border border-mazda-border-gray">
                  <p className="text-2xl font-mazda font-bold text-mazda-black">24/7</p>
                  <p className="text-sm text-mazda-steel-gray">Layanan respon cepat untuk pertanyaan dan booking.</p>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-mazda-border-gray">
                  <p className="text-2xl font-mazda font-bold text-mazda-black">100%</p>
                  <p className="text-sm text-mazda-steel-gray">Transparansi informasi harga dan kondisi kendaraan.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-mazda-border-gray bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-mazda font-bold text-mazda-black mb-6">Testimoni singkat</h3>
              <div className="space-y-4">
                <div className="rounded-2xl bg-mazda-light-gray p-5">
                  <p className="text-body text-mazda-charcoal">“Proses konsultasi sangat smooth dan timnya sangat informatif.”</p>
                  <p className="text-sm font-semibold text-mazda-burgundy mt-2">- Arief, customer premium</p>
                </div>
                <div className="rounded-2xl bg-mazda-light-gray p-5">
                  <p className="text-body text-mazda-charcoal">“Saya dapat membandingkan opsi mobil dengan mudah sebelum memutuskan.”</p>
                  <p className="text-sm font-semibold text-mazda-burgundy mt-2">- Dinda, pembeli pertama</p>
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <Link href="/booking">
                  <Button variant="primary" size="md">Booking sekarang</Button>
                </Link>
                <Link href="/faq">
                  <Button variant="secondary" size="md">Lihat FAQ</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-mazda-black via-mazda-charcoal to-mazda-burgundy/20 relative overflow-hidden">
        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-mazda-blue/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl text-white mb-6 font-mazda font-bold leading-tight">
                Siap Mengalami <span className="text-mazda-cyan">Perjalanan</span> Premium?
              </h2>
              <p className="text-lg text-mazda-light-gray mb-8 leading-relaxed">
                Hubungi tim expert kami untuk konsultasi personal. Kami menyediakan paket pembiayaan fleksibel dan layanan purna jual yang comprehensive.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div>
                  <div className="text-4xl font-bold text-mazda-burgundy">1000+</div>
                  <p className="text-mazda-light-gray">Pelanggan Puas</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mazda-cyan">24/7</div>
                  <p className="text-mazda-light-gray">Support</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="px-8 py-4 text-lg">
                    Konsultasi Sekarang
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button variant="secondary" size="lg" className="px-8 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
                    Lihat Katalog
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-mazda-burgundy/30 to-mazda-blue/30 rounded-3xl blur-2xl" />
                <div className="relative w-full aspect-square bg-white/5 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 group cursor-pointer hover:border-mazda-burgundy/50 transition-all">
                  <div className="text-center">
                    <div className="text-7xl mb-4">🏁</div>
                    <p className="text-white font-mazda font-bold text-lg">Drive Your Dream</p>
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
