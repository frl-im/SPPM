'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/Button'
import { Car, Inquiry } from '@/types/car'
import { getStoredCars, getStoredInquiries, saveCars, saveInquiries } from '@/lib/storage'
import { carsData } from '@/data/cars'

const getBlankCarForm = () => ({
  name: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  image: '/images/1000419780.jpg',
  description: '',
  category: 'Sports Car',
  color: '',
  transmission: 'Automatic' as 'Automatic' | 'Manual',
  fuel: 'Petrol' as 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric',
  mileage: 0,
  features: '',
  rating: 5,
  reviews: 0,
  isFeatured: false,
})

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [formData, setFormData] = useState(getBlankCarForm)

  useEffect(() => {
    setCars(getStoredCars())
    setInquiries(getStoredInquiries())
  }, [])

  const stats = useMemo(() => ({
    totalCars: cars.length,
    featuredCars: cars.filter((car) => car.isFeatured).length,
    totalInquiries: inquiries.length,
  }), [cars, inquiries])

  const handleAddCar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newCar: Car = {
      id: Date.now().toString(),
      name: formData.name,
      model: formData.model,
      year: formData.year,
      price: formData.price,
      image: formData.image,
      description: formData.description,
      category: formData.category,
      color: formData.color,
      transmission: formData.transmission,
      fuel: formData.fuel,
      mileage: formData.mileage,
      features: formData.features.split(',').map((item) => item.trim()).filter(Boolean),
      rating: formData.rating,
      reviews: formData.reviews,
      isFeatured: formData.isFeatured,
    }

    const nextCars = [newCar, ...cars]
    setCars(nextCars)
    saveCars(nextCars)
    setFormData(getBlankCarForm())
  }

  const handleDeleteCar = (id: string) => {
    const nextCars = cars.filter((car) => car.id !== id)
    setCars(nextCars)
    saveCars(nextCars)
  }

  const handleToggleFeatured = (id: string) => {
    const nextCars = cars.map((car) => car.id === id ? { ...car, isFeatured: !car.isFeatured } : car)
    setCars(nextCars)
    saveCars(nextCars)
  }

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    const nextInquiries = inquiries.map((item) => item.id === id ? { ...item, status } : item)
    setInquiries(nextInquiries)
    saveInquiries(nextInquiries)
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-mazda-cyan mb-4">Panel Admin</p>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mb-4">Kelola katalog dan permintaan pelanggan</h1>
          <p className="max-w-3xl text-lg text-mazda-light-gray leading-relaxed">
            Semua data disimpan secara lokal di browser Anda agar demo admin tetap berjalan tanpa backend.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-6 shadow-sm">
            <p className="text-sm text-mazda-steel-gray">Total mobil</p>
            <p className="text-3xl font-mazda font-bold mt-2">{stats.totalCars}</p>
          </div>
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-6 shadow-sm">
            <p className="text-sm text-mazda-steel-gray">Mobil featured</p>
            <p className="text-3xl font-mazda font-bold mt-2">{stats.featuredCars}</p>
          </div>
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-6 shadow-sm">
            <p className="text-sm text-mazda-steel-gray">Permintaan masuk</p>
            <p className="text-3xl font-mazda font-bold mt-2">{stats.totalInquiries}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-6">Tambah mobil baru</h2>
            <form onSubmit={handleAddCar} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama</label>
                  <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="input-field" placeholder="Contoh: Porsche 911" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Model</label>
                  <input value={formData.model} onChange={(event) => setFormData({ ...formData, model: event.target.value })} className="input-field" placeholder="Contoh: Turbo S" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Harga</label>
                  <input type="number" value={formData.price} onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tahun</label>
                  <input type="number" value={formData.year} onChange={(event) => setFormData({ ...formData, year: Number(event.target.value) })} className="input-field" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Kategori</label>
                  <input value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Warna</label>
                  <input value={formData.color} onChange={(event) => setFormData({ ...formData, color: event.target.value })} className="input-field" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Transmisi</label>
                  <select value={formData.transmission} onChange={(event) => setFormData({ ...formData, transmission: event.target.value as 'Automatic' | 'Manual' })} className="input-field">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Bahan bakar</label>
                  <select value={formData.fuel} onChange={(event) => setFormData({ ...formData, fuel: event.target.value as 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' })} className="input-field">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Deskripsi</label>
                <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="input-field min-h-[90px]" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Fitur (pisahkan dengan koma)</label>
                <input value={formData.features} onChange={(event) => setFormData({ ...formData, features: event.target.value })} className="input-field" placeholder="Premium Audio, Sunroof, Safety Package" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.isFeatured} onChange={(event) => setFormData({ ...formData, isFeatured: event.target.checked })} />
                <span className="text-sm font-medium">Tampilkan sebagai featured</span>
              </div>
              <Button type="submit" variant="primary" size="md">Simpan mobil</Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-mazda font-bold mb-6">Daftar mobil</h2>
              <div className="space-y-4">
                {cars.map((car) => (
                  <div key={car.id} className="rounded-xl border border-mazda-border-gray p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-mazda-charcoal">{car.name}</h3>
                        <p className="text-sm text-mazda-steel-gray">{car.model} • {car.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleToggleFeatured(car.id)}>{car.isFeatured ? 'Featured' : 'Jadikan Featured'}</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCar(car.id)}>Hapus</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-mazda font-bold mb-6">Permintaan pelanggan</h2>
              <div className="space-y-4">
                {inquiries.map((item) => (
                  <div key={item.id} className="rounded-xl border border-mazda-border-gray p-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-mazda-charcoal">{item.name}</h3>
                        <p className="text-sm text-mazda-steel-gray">{item.carName ?? 'Konsultasi umum'}</p>
                      </div>
                      <select value={item.status} onChange={(event) => handleStatusChange(item.id, event.target.value as Inquiry['status'])} className="input-field w-auto min-w-[140px]">
                        <option value="Baru">Baru</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </div>
                    <p className="text-sm text-mazda-steel-gray mb-2">{item.message}</p>
                    <p className="text-xs text-mazda-steel-gray">{item.email} • {item.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
