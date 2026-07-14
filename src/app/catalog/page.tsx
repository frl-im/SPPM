'use client'

import { useState } from 'react'
import { CarCard } from '@/components/CarCard'
import { Button } from '@/components/Button'
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
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Dark Luxury */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
              Koleksi Lengkap SPPM
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
              Katalog <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Mobil Premium</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              Jelajahi jajaran supercar, sports car, dan kendaraan eksekutif dengan filter spesifikasi canggih serta transparansi informasi terlengkap.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-7 shadow-premium sticky top-24 h-fit">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-mazda-border-gray/60">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <h3 className="text-lg font-mazda font-bold text-mazda-charcoal">Filter Kendaraan</h3>
                </div>
                {(searchTerm || filters.category || filters.fuel || filters.transmission) && (
                  <button
                    onClick={handleReset}
                    className="text-xs font-mazda font-bold text-mazda-burgundy hover:text-mazda-black transition-colors px-2.5 py-1 rounded-lg bg-mazda-burgundy/10"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
                  Cari Mobil atau Model
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mazda-steel-gray">🔍</span>
                  <input
                    type="text"
                    placeholder="Contoh: Ferrari, Z Proto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-mazda-border-gray bg-mazda-light-gray/60 text-sm text-mazda-charcoal placeholder-mazda-steel-gray focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-3">
                    Kategori Kendaraan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, category: undefined })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                        !filters.category
                          ? 'bg-mazda-burgundy text-white shadow-md'
                          : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                      }`}
                    >
                      Semua
                    </button>
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFilters({ ...filters, category: cat })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                          filters.category === cat
                            ? 'bg-mazda-burgundy text-white shadow-md'
                            : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fuel Type Filter */}
              {fuels.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-3">
                    Bahan Bakar
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, fuel: undefined })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                        !filters.fuel
                          ? 'bg-mazda-charcoal text-white shadow-md'
                          : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                      }`}
                    >
                      Semua
                    </button>
                    {fuels.map((fuel) => (
                      <button
                        type="button"
                        key={fuel}
                        onClick={() => setFilters({ ...filters, fuel })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                          filters.fuel === fuel
                            ? 'bg-mazda-charcoal text-white shadow-md'
                            : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Transmission Filter */}
              {transmissions.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-3">
                    Transmisi
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, transmission: undefined })}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                        !filters.transmission
                          ? 'bg-mazda-charcoal text-white shadow-md'
                          : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                      }`}
                    >
                      Semua
                    </button>
                    {transmissions.map((trans) => (
                      <button
                        type="button"
                        key={trans}
                        onClick={() => setFilters({ ...filters, transmission: trans })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mazda font-semibold transition-all duration-200 ${
                          filters.transmission === trans
                            ? 'bg-mazda-charcoal text-white shadow-md'
                            : 'bg-mazda-light-gray text-mazda-charcoal hover:bg-mazda-border-gray/60'
                        }`}
                      >
                        {trans}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-8 xl:col-span-9 pt-4 sm:pt-0">
            {filteredCars.length > 0 ? (
              <>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white px-6 py-4 rounded-2xl border border-mazda-border-gray/60 shadow-sm">
                  <div>
                    <span className="text-sm text-mazda-steel-gray">Menampilkan </span>
                    <span className="font-mazda font-bold text-mazda-burgundy text-base">{filteredCars.length}</span>
                    <span className="text-sm text-mazda-charcoal font-medium"> dari {carsData.length} kendaraan eksklusif</span>
                  </div>
                  {(searchTerm || filters.category || filters.fuel || filters.transmission) && (
                    <div className="text-xs text-mazda-steel-gray flex items-center gap-2">
                      <span>Filter aktif</span>
                      <button
                        onClick={handleReset}
                        className="text-mazda-burgundy underline hover:text-mazda-black font-semibold"
                      >
                        Bersihkan
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-mazda-border-gray bg-white p-16 text-center shadow-premium my-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-mazda-burgundy/10 flex items-center justify-center text-4xl mb-6">
                  🔍
                </div>
                <h3 className="text-2xl font-mazda font-bold text-mazda-charcoal mb-2">Kendaraan Tidak Ditemukan</h3>
                <p className="text-sm text-mazda-steel-gray max-w-md mx-auto mb-8">
                  Tidak ada mobil yang sesuai dengan kriteria pencarian atau filter Anda saat ini. Cobalah untuk melonggarkan filter.
                </p>
                <Button variant="primary" size="md" onClick={handleReset}>
                  Reset Semua Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
