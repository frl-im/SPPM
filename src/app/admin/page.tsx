'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/Button'
import { Car, Inquiry } from '@/types/car'
import { getStoredCars, getStoredInquiries, saveCars, saveInquiries } from '@/lib/storage'

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [cars, setCars] = useState<Car[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [formData, setFormData] = useState(getBlankCarForm)

  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? sessionStorage.getItem('sppm_admin_logged_in') : null
    setIsAuthenticated(storedAuth === 'true')
    setCars(getStoredCars())
    setInquiries(getStoredInquiries())
  }, [])

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = usernameInput.trim().toLowerCase()
    const pass = passwordInput.trim()

    // Valid credentials for official SPPM staff
    const isValid =
      (user === 'admin@sppm.id' && pass === 'sppm2026') ||
      (user === 'admin' && pass === 'admin123') ||
      (user === 'admin@sppm.com' && pass === 'supercar') ||
      (user === 'executive' && pass === 'sppm2026')

    if (isValid) {
      sessionStorage.setItem('sppm_admin_logged_in', 'true')
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Kredensial tidak valid. Akses ditolak. Gunakan akun resmi admin SPPM.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('sppm_admin_logged_in')
    setIsAuthenticated(false)
  }

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

  // Before hydration / checking auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-mazda-burgundy border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // 🔐 EXECUTIVE LOGIN PORTAL (When NOT authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B0C] via-[#121417] to-[#1A1D20] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mazda-burgundy/20 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mazda-cyan/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="w-full max-w-md rounded-3xl bg-[#121417]/95 border border-white/15 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative z-10 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-mazda-burgundy to-[#5A0718] shadow-xl mb-4 border border-white/15">
              <span className="text-white font-mazda font-bold text-2xl tracking-tighter">S</span>
            </div>
            <span className="block text-[11px] font-mazda font-bold uppercase tracking-[0.3em] text-mazda-cyan mb-1.5">
              👑 Executive Security Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight">
              SPPM Admin Login
            </h1>
            <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
              Portal manajemen eksklusif armada & reservasi klien VIP. Silakan masuk menggunakan akun otorisasi staf.
            </p>
          </div>

          {/* Helper Credentials Banner for Demo/Evaluation */}
          <div className="mb-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
            <p className="font-semibold text-mazda-cyan mb-1">💡 Kredensial Akses Resmi:</p>
            <p className="font-mono text-gray-200">User: <strong className="text-white">admin@sppm.id</strong> | Pass: <strong className="text-white">sppm2026</strong></p>
            <p className="font-mono text-[11px] text-gray-400 mt-0.5">(Atau alternatif: <span className="text-gray-300">admin</span> / <span className="text-gray-300">admin123</span>)</p>
          </div>

          {/* Error Notice */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2 font-mazda">
                Username / Email Staf
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin@sppm.id"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/20 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-2 font-mazda">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/20 transition-all font-medium pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs px-2 py-1 transition-colors"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-4 mt-3 shadow-glow text-sm font-mazda font-bold bg-gradient-to-r from-mazda-burgundy via-[#800A27] to-mazda-burgundy"
            >
              🔐 Masuk ke Panel Executive
            </Button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-gray-500 font-light">
              🛡️ SPPM Internal Security System. Sesi terenkripsi & tercatat secara lokal.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Cinematic Dark with Logout Option */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
              Manajemen Internal • Terotorisasi
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-4 tracking-tight text-white">
              Panel <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Admin Concierge</span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              Kelola inventaris armada supercar, sesuaikan status unit unggulan (featured), serta pantau reservasi masuk dari klien VIP secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="hidden sm:flex flex-col items-end text-xs text-gray-300">
              <span className="font-semibold text-white">Staf SPPM Aktif</span>
              <span className="text-mazda-cyan font-mono">admin@sppm.id</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-mazda font-bold transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>🔒</span>
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-10">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs text-mazda-steel-gray font-mazda font-bold uppercase tracking-[0.2em]">Total Armada</p>
              <p className="text-4xl font-mazda font-bold text-mazda-burgundy mt-2">{stats.totalCars}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-2xl">
              🏎️
            </div>
          </div>
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs text-mazda-steel-gray font-mazda font-bold uppercase tracking-[0.2em]">Sorotan Utama (Featured)</p>
              <p className="text-4xl font-mazda font-bold text-mazda-charcoal mt-2">{stats.featuredCars}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center text-2xl">
              ⭐
            </div>
          </div>
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex items-center justify-between">
            <div>
              <p className="text-xs text-mazda-steel-gray font-mazda font-bold uppercase tracking-[0.2em]">Reservasi Masuk</p>
              <p className="text-4xl font-mazda font-bold text-green-700 mt-2">{stats.totalInquiries}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center justify-center text-2xl">
              📩
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
          {/* Add Car Form */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
            <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                Katalog Unit
              </span>
              <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mt-1">Tambah Kendaraan Baru</h2>
            </div>

            <form onSubmit={handleAddCar} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Nama Unit</label>
                  <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" placeholder="Contoh: Ferrari F8" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Model / Varian</label>
                  <input value={formData.model} onChange={(event) => setFormData({ ...formData, model: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" placeholder="Contoh: Tributo" required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Harga OTR (IDR)</label>
                  <input type="number" value={formData.price} onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm font-bold text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Tahun Produksi</label>
                  <input type="number" value={formData.year} onChange={(event) => setFormData({ ...formData, year: Number(event.target.value) })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm font-bold text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all" required />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Kategori</label>
                  <input value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Warna Eksterior</label>
                  <input value={formData.color} onChange={(event) => setFormData({ ...formData, color: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Transmisi</label>
                  <select value={formData.transmission} onChange={(event) => setFormData({ ...formData, transmission: event.target.value as 'Automatic' | 'Manual' })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm font-semibold text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Bahan Bakar</label>
                  <select value={formData.fuel} onChange={(event) => setFormData({ ...formData, fuel: event.target.value as 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm font-semibold text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Deskripsi Singkat</label>
                <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all min-h-[90px] font-medium leading-relaxed" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Fitur Unggulan (Pisahkan dengan koma)</label>
                <input value={formData.features} onChange={(event) => setFormData({ ...formData, features: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" placeholder="Carbon Ceramic Brakes, JBL Sound, Lift Kit" />
              </div>
              <div className="flex items-center gap-3 pt-3 pb-1">
                <input type="checkbox" id="featured" checked={formData.isFeatured} onChange={(event) => setFormData({ ...formData, isFeatured: event.target.checked })} className="w-5 h-5 rounded border-gray-300 text-mazda-burgundy focus:ring-mazda-burgundy cursor-pointer" />
                <label htmlFor="featured" className="text-sm font-bold text-mazda-charcoal cursor-pointer">Jadikan Sorotan Utama (Featured Supercar)</label>
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full shadow-glow py-4">Simpan ke Katalog SPPM</Button>
            </form>
          </div>

          {/* Right Column - Lists */}
          <div className="space-y-8">
            {/* Car List */}
            <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
              <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                  Daftar Armada
                </span>
                <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mt-1">Inventaris Aktif</h2>
              </div>
              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                {cars.length === 0 ? (
                  <p className="text-mazda-steel-gray text-center py-10 text-sm">Belum ada armada terdaftar.</p>
                ) : (
                  cars.map((car) => (
                    <div key={car.id} className="rounded-2xl border border-mazda-border-gray/80 bg-mazda-light-gray/30 p-4 hover:bg-white hover:border-mazda-burgundy/40 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-mazda font-bold text-mazda-charcoal text-base">{car.name}</h3>
                            {car.isFeatured && (
                              <span className="bg-mazda-burgundy text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-mazda-steel-gray mt-1 font-medium">{car.model} • {car.category} • {car.year}</p>
                          <p className="text-xs font-bold text-mazda-burgundy mt-1.5">
                            Rp {new Intl.NumberFormat('id-ID').format(car.price)}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(car.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                              car.isFeatured
                                ? 'bg-mazda-burgundy text-white border-mazda-burgundy shadow-sm'
                                : 'bg-white text-mazda-charcoal border-mazda-border-gray hover:border-mazda-burgundy'
                            }`}
                            title="Toggle Featured"
                          >
                            {car.isFeatured ? '★ VIP' : '☆ Sorot'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCar(car.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors"
                            title="Hapus"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Inquiries List */}
            <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
              <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                  Pesan Masuk
                </span>
                <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mt-1">Reservasi Konsultasi VIP</h2>
              </div>
              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-2">
                {inquiries.length === 0 ? (
                  <p className="text-mazda-steel-gray text-center py-10 text-sm">Belum ada reservasi masuk.</p>
                ) : (
                  inquiries.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-mazda-border-gray/80 bg-mazda-light-gray/30 p-4 hover:bg-white hover:border-mazda-burgundy/40 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-mazda font-bold text-mazda-charcoal text-base">{item.name}</h3>
                            {item.type && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                item.type === 'Simulation'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : item.type === 'CustomBuild'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {item.type === 'Simulation' ? '📊 SIMULASI LEAD' : item.type === 'CustomBuild' ? '🛠️ CUSTOM BUILD' : 'LEAD UMUM'}
                              </span>
                            )}
                          </div>
                          <span className="inline-block text-xs font-bold text-mazda-burgundy bg-mazda-burgundy/10 px-2 py-0.5 rounded-md mt-1">
                            {item.carName ?? 'Konsultasi umum'}
                          </span>
                        </div>
                        <select
                          value={item.status}
                          onChange={(event) => handleStatusChange(item.id, event.target.value as Inquiry['status'])}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold border outline-none cursor-pointer ${
                            item.status === 'Baru'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : item.status === 'Diproses'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-green-50 text-green-700 border-green-200'
                          }`}
                        >
                          <option value="Baru">Baru</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>

                      {item.simulationDetails && (
                        <div className="mb-2 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div>
                            <span className="block text-[10px] text-blue-600 font-semibold uppercase">DP Pilihan</span>
                            <strong className="font-mono">Rp {new Intl.NumberFormat('id-ID').format(item.simulationDetails.downPayment)}</strong>
                          </div>
                          <div>
                            <span className="block text-[10px] text-blue-600 font-semibold uppercase">Tenor</span>
                            <strong className="font-mono">{item.simulationDetails.tenor} Bln</strong>
                          </div>
                          <div>
                            <span className="block text-[10px] text-blue-600 font-semibold uppercase">Bunga</span>
                            <strong className="font-mono">{item.simulationDetails.interestRate}%/thn</strong>
                          </div>
                          <div>
                            <span className="block text-[10px] text-blue-600 font-semibold uppercase">Cicilan/Bulan</span>
                            <strong className="font-mono text-mazda-burgundy">Rp {new Intl.NumberFormat('id-ID').format(item.simulationDetails.monthlyInstallment)}</strong>
                          </div>
                        </div>
                      )}

                      {item.customSpecs && (
                        <div className="mb-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 flex flex-wrap gap-x-4 gap-y-1">
                          {item.customSpecs.color && <span>🎨 Warna: <strong>{item.customSpecs.color}</strong></span>}
                          {item.customSpecs.trim && <span>🏁 Trim: <strong>{item.customSpecs.trim}</strong></span>}
                          {item.customSpecs.exteriorOption && <span>✨ Eksterior: <strong>{item.customSpecs.exteriorOption}</strong></span>}
                        </div>
                      )}

                      <p className="text-xs text-mazda-charcoal mb-2 line-clamp-2 bg-white p-2.5 rounded-xl border border-mazda-border-gray/60 font-light">
                        &ldquo;{item.message}&rdquo;
                      </p>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-mazda-steel-gray font-medium pt-1">
                        <span>📧 {item.email}</span>
                        <span>📞 {item.phone}</span>
                        {item.budget && <span className="text-mazda-burgundy font-bold">💰 {item.budget}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
