'use client'

import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getStoredCars } from '@/lib/storage'
import { Button } from '@/components/Button'

interface CarDetailPageProps {
  params: { id: string }
}

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
    <div className="bg-[#F8F9FA]">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/catalog" className="text-mazda-cyan hover:text-white text-sm font-semibold">
            ← Kembali ke katalog
          </Link>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mt-6">{car.name}</h1>
          <p className="text-lg text-mazda-light-gray mt-2">{car.model} • {car.year}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-mazda-border-gray bg-white p-6 shadow-sm overflow-hidden">
          <div className="relative h-[420px] rounded-xl overflow-hidden">
            <Image src={car.image} alt={car.name} fill className="object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-mazda-burgundy font-semibold">Mulai dari</p>
            <p className="text-4xl font-mazda font-bold text-mazda-charcoal mt-2">{formattedPrice}</p>
            <p className="text-mazda-steel-gray mt-4">{car.description}</p>
          </div>

          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Spesifikasi utama</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <p className="text-sm text-mazda-steel-gray">Kategori</p>
                <p className="font-semibold text-mazda-charcoal">{car.category}</p>
              </div>
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <p className="text-sm text-mazda-steel-gray">Warna</p>
                <p className="font-semibold text-mazda-charcoal">{car.color}</p>
              </div>
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <p className="text-sm text-mazda-steel-gray">Transmisi</p>
                <p className="font-semibold text-mazda-charcoal">{car.transmission}</p>
              </div>
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <p className="text-sm text-mazda-steel-gray">Bahan bakar</p>
                <p className="font-semibold text-mazda-charcoal">{car.fuel}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Fitur unggulan</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span key={feature} className="rounded-full bg-mazda-burgundy/10 px-3 py-2 text-sm text-mazda-burgundy font-semibold">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Link href={`/booking?car=${car.id}`}>
                <Button variant="primary" size="md">Booking & Test Drive</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="md">Hubungi Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
