'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types/car'
import { Button } from './Button'

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(car.price)

  return (
    <div className="bg-white text-mazda-charcoal rounded-2xl overflow-hidden transition-all duration-300 border border-mazda-border-gray/70 shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 group flex flex-col h-full">
      {/* Image Container - Premium */}
      <div className="relative h-[260px] bg-gradient-to-br from-mazda-light-gray to-mazda-faded-gray overflow-hidden shrink-0">
        {car.image ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🚗</div>
              <span className="text-mazda-steel-gray text-caption">No Image</span>
            </div>
          </div>
        )}
        
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Category Badge - Premium */}
        <div className="absolute top-4 right-4 bg-mazda-burgundy text-white px-4 py-1.5 rounded-full text-xs font-mazda font-bold shadow-md">
          {car.category}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/40">
          <span className="text-sm">⭐</span>
          <span className="text-xs font-mazda font-bold text-mazda-charcoal">{car.rating}</span>
          <span className="text-xs text-mazda-steel-gray font-medium">({car.reviews})</span>
        </div>

        {/* Model & Year watermark badge at bottom left of image */}
        <div className="absolute bottom-3 left-4 text-white font-mazda font-semibold text-xs drop-shadow-md">
          {car.model} &bull; {car.year}
        </div>
      </div>

      {/* Content - Premium */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-2xl font-mazda font-bold text-mazda-charcoal group-hover:text-mazda-burgundy transition-colors line-clamp-1">
              {car.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-mazda-medium-gray mb-5 line-clamp-2 leading-relaxed">
            {car.description}
          </p>

          {/* Specs Grid - Premium */}
          <div className="grid grid-cols-2 gap-2.5 mb-5 pb-5 border-b border-mazda-border-gray/50">
            <div className="flex items-center gap-2 p-2.5 bg-mazda-light-gray rounded-xl">
              <span className="text-base">⛽</span>
              <span className="text-xs text-mazda-charcoal font-semibold truncate">{car.fuel}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-mazda-light-gray rounded-xl">
              <span className="text-base">🔄</span>
              <span className="text-xs text-mazda-charcoal font-semibold truncate">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-mazda-light-gray rounded-xl">
              <span className="text-base">🎨</span>
              <span className="text-xs text-mazda-charcoal font-semibold truncate">{car.color}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-mazda-light-gray rounded-xl">
              <span className="text-base">⚡</span>
              <span className="text-xs text-mazda-charcoal font-semibold truncate">Performance</span>
            </div>
          </div>

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-1.5">
                {car.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-mazda-burgundy/5 text-mazda-burgundy border border-mazda-burgundy/15 px-3 py-1 rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
                {car.features.length > 3 && (
                  <span className="text-[11px] bg-mazda-light-gray text-mazda-steel-gray px-2.5 py-1 rounded-full font-medium">
                    +{car.features.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="pt-2">
          <div className="mb-5">
            <p className="text-[11px] uppercase tracking-wider text-mazda-steel-gray font-semibold mb-0.5">
              Harga Mulai Dari
            </p>
            <p className="text-2xl font-mazda font-bold text-mazda-burgundy tracking-tight">
              {formattedPrice}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href={`/car/${car.id}`} className="flex-1">
              <Button variant="secondary" size="sm" className="w-full py-3">
                Detail
              </Button>
            </Link>
            <Link href={`/booking?car=${car.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full py-3">
                Hubungi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
