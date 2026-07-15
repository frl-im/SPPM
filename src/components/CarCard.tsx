'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types/car'

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
    <div className="bg-white text-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-300 border border-gray-200/80 hover:shadow-xl hover:-translate-y-1.5 group flex flex-col justify-between p-6 h-full">
      {/* Image Container - Clean Studio White aesthetic from input_file_1.png */}
      <div className="relative h-[210px] sm:h-[240px] w-full bg-white overflow-hidden shrink-0 flex items-center justify-center">
        {car.image ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2">🚗</div>
              <span className="text-gray-400 text-xs uppercase tracking-widest">No Image</span>
            </div>
          </div>
        )}

        {/* Featured Badge if applicable */}
        {car.isFeatured && (
          <div className="absolute top-2 right-2 bg-[#990000] text-white px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
            FEATURED
          </div>
        )}
      </div>

      {/* Content - Minimalist Mazda Typography */}
      <div className="pt-4 flex flex-col flex-grow justify-between border-t border-gray-100 mt-2">
        <div>
          {/* Title - Wide uppercase tracking like MAZDA CX-3 */}
          <h3 className="text-lg sm:text-xl font-mazda font-medium text-[#1A1A1A] uppercase tracking-[0.18em] group-hover:text-[#990000] transition-colors">
            {car.name}
          </h3>

          {/* Subtitle Category */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mt-1">
            {car.category} &bull; {car.model} &bull; {car.year}
          </p>

          {/* Specs Mini Line */}
          <div className="flex items-center gap-4 text-[11px] text-gray-500 font-light mt-2.5">
            <span>⛽ {car.fuel}</span>
            <span>🔄 {car.transmission}</span>
            <span>⭐ {car.rating} ({car.reviews})</span>
          </div>

          {/* Price */}
          <p className="text-sm sm:text-base font-normal text-[#444] mt-3 tracking-wide">
            {formattedPrice}
          </p>
        </div>

        {/* Actions - Clean Outline Buttons matching input_file_1.png */}
        <div className="pt-6 flex items-center gap-3">
          <Link href={`/car/${car.id}`} className="flex-1">
            <button
              type="button"
              className="w-full py-2.5 px-4 border border-[#333] bg-white text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-all cursor-pointer text-center"
            >
              EXPLORE
            </button>
          </Link>
          <Link href={`/booking?car=${car.id}`} className="flex-1">
            <button
              type="button"
              className="w-full py-2.5 px-4 border border-[#990000] bg-[#990000] text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-[#770000] transition-all cursor-pointer text-center"
            >
              BOOK
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
