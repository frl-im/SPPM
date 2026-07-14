import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getStoredCars } from '@/lib/storage'
import { Button } from '@/components/Button'
import { CarDetailExperience } from '@/components/CarDetailExperience'

interface CarDetailPageProps {
  params: { id: string }
}

export function generateStaticParams() {
  return getStoredCars().map((car) => ({ id: car.id }))
}

export const dynamicParams = false

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const cars = getStoredCars()
  const car = cars.find((item) => item.id === params.id)

  if (!car) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <div className="bg-mazda-light-gray/60 min-h-screen pb-24">
      {/* Luxury Dark Header */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-20 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-mazda-cyan hover:text-white text-xs font-mazda font-bold uppercase tracking-widest transition-colors mb-6 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm"
          >
            <span>←</span> Kembali ke Katalog
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-mazda-burgundy text-white text-xs font-mazda font-bold uppercase tracking-widest">
                  {car.category}
                </span>
                <span className="text-gray-400 text-sm font-medium">Tahun {car.year}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold tracking-tight text-white">
                {car.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mt-2 font-light">{car.model}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-6 py-4 rounded-2xl md:text-right">
              <p className="text-xs uppercase tracking-widest text-mazda-cyan font-bold">Harga OTR Resmi</p>
              <p className="text-2xl sm:text-3xl font-mazda font-bold text-white mt-0.5">{formattedPrice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
        {/* Left Column: Image Gallery & Highlights */}
        <div className="space-y-8 sticky top-24">
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-4 sm:p-6 shadow-premium overflow-hidden group">
            <div className="relative h-[360px] sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Sertifikasi Lolos 150+ Poin Inspeksi
                </span>
                <span className="text-xs text-gray-300 font-medium hidden sm:inline">Foto Unit Riil Showroom</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-white p-4 shadow-sm text-center">
              <p className="text-xs text-mazda-steel-gray uppercase tracking-wider mb-1">Transmisi</p>
              <p className="font-mazda font-bold text-mazda-charcoal text-base">{car.transmission}</p>
            </div>
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-white p-4 shadow-sm text-center">
              <p className="text-xs text-mazda-steel-gray uppercase tracking-wider mb-1">Bahan Bakar</p>
              <p className="font-mazda font-bold text-mazda-charcoal text-base">{car.fuel}</p>
            </div>
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-white p-4 shadow-sm text-center">
              <p className="text-xs text-mazda-steel-gray uppercase tracking-wider mb-1">Warna Dasar</p>
              <p className="font-mazda font-bold text-mazda-charcoal text-base">{car.color}</p>
            </div>
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-white p-4 shadow-sm text-center">
              <p className="text-xs text-mazda-steel-gray uppercase tracking-wider mb-1">Garansi</p>
              <p className="font-mazda font-bold text-mazda-burgundy text-base">Resmi SPPM</p>
            </div>
          </div>
        </div>

        {/* Right Column: Specs, Features & Interactive Experience */}
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-8 shadow-premium">
            <div className="flex items-center justify-between border-b border-mazda-border-gray/60 pb-4 mb-4">
              <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                Ringkasan Kendaraan
              </span>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                Unit Tersedia
              </span>
            </div>
            <p className="text-mazda-charcoal text-sm sm:text-base leading-relaxed font-light">
              {car.description}
            </p>
          </div>

          {/* Detailed Specs Card */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-8 shadow-premium">
            <h2 className="text-xl font-mazda font-bold mb-5 text-mazda-black flex items-center gap-2">
              <span>📋</span> Spesifikasi Utama
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-mazda-light-gray/70 p-4 border border-mazda-border-gray/50">
                <p className="text-xs text-mazda-steel-gray uppercase tracking-wider">Kategori</p>
                <p className="font-mazda font-bold text-mazda-charcoal mt-1">{car.category}</p>
              </div>
              <div className="rounded-xl bg-mazda-light-gray/70 p-4 border border-mazda-border-gray/50">
                <p className="text-xs text-mazda-steel-gray uppercase tracking-wider">Warna Resmi</p>
                <p className="font-mazda font-bold text-mazda-charcoal mt-1">{car.color}</p>
              </div>
              <div className="rounded-xl bg-mazda-light-gray/70 p-4 border border-mazda-border-gray/50">
                <p className="text-xs text-mazda-steel-gray uppercase tracking-wider">Sistem Transmisi</p>
                <p className="font-mazda font-bold text-mazda-charcoal mt-1">{car.transmission}</p>
              </div>
              <div className="rounded-xl bg-mazda-light-gray/70 p-4 border border-mazda-border-gray/50">
                <p className="text-xs text-mazda-steel-gray uppercase tracking-wider">Tipe Bahan Bakar</p>
                <p className="font-mazda font-bold text-mazda-charcoal mt-1">{car.fuel}</p>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-8 shadow-premium">
            <h2 className="text-xl font-mazda font-bold mb-5 text-mazda-black flex items-center gap-2">
              <span>✨</span> Fitur Unggulan
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {car.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-xl bg-mazda-burgundy/10 border border-mazda-burgundy/20 px-3.5 py-2 text-xs text-mazda-burgundy font-mazda font-bold shadow-sm"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-mazda-border-gray/60 flex flex-col sm:flex-row gap-3">
              <Link href={`/booking?car=${car.id}`} className="flex-1">
                <Button variant="primary" size="lg" className="w-full shadow-glow">
                  Booking & Test Drive
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button variant="secondary" size="lg" className="w-full">
                  Hubungi Sales Expert
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Color & Financing Experience */}
          <CarDetailExperience car={car} />
        </div>
      </div>
    </div>
  )
}
