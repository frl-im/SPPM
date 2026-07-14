'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Car } from '@/types/car'
//import { Button } from './Button'

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
    <div className="bg-[#FFFFFF] text-[#0E0F10] rounded-[5px] overflow-hidden transition-all duration-200 border-none shadow-[0px_2px_8px_rgba(0,0,0,0.08)] group">
      {/* Image Container - Premium */}
      <div className="relative h-[280px] bg-gradient-to-br from-mazda-light-gray to-mazda-faded-gray overflow-hidden">
        {car.image ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🚗</div>
              <span className="text-mazda-steel-gray text-caption">No Image</span>
            </div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
        
        {/* Category Badge - Premium */}
        <div className="absolute top-5 right-5 bg-mazda-burgundy text-white px-5 py-2 rounded-full text-caption font-mazda font-bold backdrop-blur-md shadow-lg hover:shadow-xl transition-all">
          {car.category}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
          <span className="text-lg">⭐</span>
          <span className="text-caption font-mazda font-bold text-mazda-charcoal">{car.rating}</span>
          <span className="text-caption text-mazda-steel-gray">({car.reviews})</span>
        </div>
      </div>

      {/* Content - Premium */}
      <div className="p-7">
        {/* Title & Model */}
        <div className="mb-4">
          <h3 className="text-[28px] leading-[33.6px] text-[#212529] font-mazda font-bold mb-1 transition-colors group-hover:text-[#910A2D]">
            {car.name}
          </h3>
          <p className="text-caption text-mazda-steel-gray font-medium">
            {car.model} • {car.year}
          </p>
        </div>

        {/* Description */}
        <p className="text-[15.2px] leading-[22.8px] text-[#898989] mb-5 line-clamp-2">
          {car.description}
        </p>

        {/* Specs Grid - Premium */}
        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-mazda-border-gray/50">
          <div className="flex items-center gap-2 p-2 bg-mazda-light-gray rounded-lg">
            <span className="text-lg">⛽</span>
            <span className="text-caption text-mazda-charcoal font-medium">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-mazda-light-gray rounded-lg">
            <span className="text-lg">🔄</span>
            <span className="text-caption text-mazda-charcoal font-medium">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-mazda-light-gray rounded-lg">
            <span className="text-lg">🎨</span>
            <span className="text-caption text-mazda-charcoal font-medium">{car.color}</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-mazda-light-gray rounded-lg">
            <span className="text-lg">⚡</span>
            <span className="text-caption text-mazda-charcoal font-medium">Performance</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="text-caption text-mazda-steel-gray font-bold mb-2">Fitur Unggulan:</p>
          <div className="flex flex-wrap gap-2">
            {car.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-xs bg-mazda-burgundy/10 text-mazda-burgundy px-3 py-1 rounded-full font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Price - Premium */}
        <div className="mb-7">
          <p className="text-[12px] text-[#B5B6B6] leading-[18px] mb-1">Harga Mulai Dari</p>
          <p className="text-[28px] font-mazda font-bold leading-[33.6px] text-[#910A2D]">
            {formattedPrice}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href={`/car/${car.id}`} className="flex-1">
            <button className="w-full bg-transparent text-[#B5B6B6] font-mazda font-bold text-[15.2px] leading-[22.8px] py-[8px] px-[8px] rounded-[0px] border-none hover:text-[#212529] hover:bg-[#F2F2F2] active:text-[#212529] active:bg-[#DEE2E6] transition-all duration-200">
              Detail
            </button>
          </Link>
          <Link href={`/booking?car=${car.id}`} className="flex-1">
            <button className="w-full bg-[#910A2D] text-[#FFFFFF] font-mazda font-bold text-[15.2px] leading-[22.8px] py-[12px] px-[24px] rounded-[6px] border border-[#910A2D] shadow-none hover:bg-[#6D0821] hover:text-[#FFFFFF] active:bg-[#5A0619] transition-all duration-200">
              Hubungi
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
