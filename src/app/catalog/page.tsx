'use client'

import { useState } from 'react'
import { CarCard } from '@/components/CarCard'
//import { Button } from '@/components/Button'
import { getStoredCars } from '@/lib/storage'
import { FilterOptions } from '@/types/car'

export default function Catalog() {
  const [filters, setFilters] = useState<FilterOptions>({})
  const [searchTerm, setSearchTerm] = useState('')
  const carsData = getStoredCars()

  // Apply filters and search
  const filteredCars = carsData.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !filters.category || car.category === filters.category
    const matchesFuel = !filters.fuel || car.fuel === filters.fuel
    const matchesTransmission =
      !filters.transmission || car.transmission === filters.transmission
    const matchesPrice =
      (!filters.priceMin || car.price >= filters.priceMin) &&
      (!filters.priceMax || car.price <= filters.priceMax)

    return matchesSearch && matchesCategory && matchesFuel && matchesTransmission && matchesPrice
  })

  const handleReset = () => {
    setFilters({})
    setSearchTerm('')
  }

  // Get unique values for filters
  const categories = [...new Set(carsData.map((car) => car.category))]
  const fuels = [...new Set(carsData.map((car) => car.fuel))]
  const transmissions = [...new Set(carsData.map((car) => car.transmission))]

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* Page Header - Premium */}
      <section className="bg-gradient-to-r from-[#212529] to-[#0E0F10] text-[#FFFFFF] py-[80px]">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-[32px]">
          <div className="mb-2">
            <span className="text-[#0DCAF0] text-[15.2px] leading-[22.8px] font-mazda font-bold tracking-widest uppercase">
              Koleksi Lengkap
            </span>
          </div>
          <h1 className="text-[48px] leading-[57.6px] text-[#FFFFFF] mb-3 font-mazda font-bold">
            Katalog Mobil
          </h1>
          <p className="text-[20px] leading-[30px] font-mazda font-normal text-[#B5B6B6] max-w-2xl">
            Jelajahi rangkaian lengkap kendaraan premium kami dengan filter pencarian yang canggih dan mudah digunakan
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-4 lg:px-[32px] py-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-[#FFFFFF] text-[#B5B6B6] rounded-[5px] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] p-[16px_16px_24px_24px] sticky top-24 transition-shadow">
              <h3 className="text-[28px] leading-[33.6px] text-[#212529] font-mazda font-bold mb-6 pb-4 border-b border-[#DEE2E6]">
                ⚙️ Filter
              </h3>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-bold mb-2">
                  Cari Mobil
                </label>
                <input
                  type="text"
                  placeholder="Nama atau model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#FFFFFF] text-[#212529] text-[28.8px] leading-[43.2px] font-mazda font-normal py-[6px] pl-[60px] pr-[12px] h-[55px] rounded-[6px] border border-[#DEE2E6] focus:border-[#910A2D] focus:shadow-[0px_0px_0px_3px_rgba(145,10,45,0.1)] focus:outline-none placeholder:text-[#B5B6B6]"
                />
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <label className="block text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-bold mb-3">
                    Kategori
                  </label>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="radio"
                        id="cat-all"
                        name="category"
                        value=""
                        checked={!filters.category}
                        onChange={() => setFilters({ ...filters, category: undefined })}
                        className="mr-2"
                      />
                      <label htmlFor="cat-all" className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                        Semua Kategori
                      </label>
                    </div>
                    {categories.map((cat) => (
                      <div key={cat}>
                        <input
                          type="radio"
                          id={`cat-${cat}`}
                          name="category"
                          value={cat}
                          checked={filters.category === cat}
                          onChange={() => setFilters({ ...filters, category: cat })}
                          className="mr-2"
                        />
                        <label htmlFor={`cat-${cat}`} className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fuel Type Filter */}
              {fuels.length > 0 && (
                <div className="mb-6">
                  <label className="block text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-bold mb-3">
                    Tipe Bahan Bakar
                  </label>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="radio"
                        id="fuel-all"
                        name="fuel"
                        value=""
                        checked={!filters.fuel}
                        onChange={() => setFilters({ ...filters, fuel: undefined })}
                        className="mr-2"
                      />
                      <label htmlFor="fuel-all" className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                        Semua Tipe
                      </label>
                    </div>
                    {fuels.map((fuel) => (
                      <div key={fuel}>
                        <input
                          type="radio"
                          id={`fuel-${fuel}`}
                          name="fuel"
                          value={fuel}
                          checked={filters.fuel === fuel}
                          onChange={() => setFilters({ ...filters, fuel })}
                          className="mr-2"
                        />
                        <label htmlFor={`fuel-${fuel}`} className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                          {fuel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transmission Filter */}
              {transmissions.length > 0 && (
                <div className="mb-6">
                  <label className="block text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-bold mb-3">
                    Transmisi
                  </label>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="radio"
                        id="trans-all"
                        name="transmission"
                        value=""
                        checked={!filters.transmission}
                        onChange={() => setFilters({ ...filters, transmission: undefined })}
                        className="mr-2"
                      />
                      <label htmlFor="trans-all" className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                        Semua Tipe
                      </label>
                    </div>
                    {transmissions.map((trans) => (
                      <div key={trans}>
                        <input
                          type="radio"
                          id={`trans-${trans}`}
                          name="transmission"
                          value={trans}
                          checked={filters.transmission === trans}
                          onChange={() => setFilters({ ...filters, transmission: trans })}
                          className="mr-2"
                        />
                        <label htmlFor={`trans-${trans}`} className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal cursor-pointer">
                          {trans}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-transparent text-[#B5B6B6] font-mazda font-bold text-[15.2px] leading-[22.8px] py-[8px] px-[8px] rounded-[0px] border-none hover:text-[#212529] hover:bg-[#F2F2F2] active:text-[#212529] active:bg-[#DEE2E6] transition-all duration-200"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Main Content - Car Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-[15.2px] leading-[22.8px] text-[#212529] font-mazda font-normal mb-6">
                Menampilkan <span className="font-bold text-[#910A2D]">{filteredCars.length}</span> mobil
              </p>
            </div>

            {/* Car Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-[#F8F9FA] rounded-[0px] p-[48px_32px] text-center border-none">
                <div className="mb-6 text-7xl">🔍</div>
                <p className="text-[28px] leading-[33.6px] text-[#212529] font-mazda font-bold mb-3">
                  Tidak Ada Hasil Pencarian
                </p>
                <p className="text-[15.2px] leading-[22.8px] text-[#898989] font-mazda font-normal mb-6 max-w-md mx-auto">
                  Coba sesuaikan kriteria filter atau hubungi tim kami untuk membantu menemukan kendaraan yang tepat.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-[#910A2D] text-[#FFFFFF] font-mazda font-bold text-[15.2px] leading-[22.8px] py-[12px] px-[24px] rounded-[6px] border border-[#910A2D] shadow-none hover:bg-[#6D0821] active:bg-[#5A0619] transition-all duration-200"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
