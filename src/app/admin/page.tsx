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
  const [activeAdminTab, setActiveAdminTab] = useState<'OPERATIONAL' | 'ANALYTICS'>('OPERATIONAL')

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

  const analytics = useMemo(() => {
    const totalValuation = cars.reduce((acc, car) => acc + car.price, 0)
    const averagePrice = cars.length > 0 ? totalValuation / cars.length : 0

    // Category distribution
    const categoryMap: Record<string, number> = {}
    cars.forEach((car) => {
      const cat = car.category || 'Lainnya'
      categoryMap[cat] = (categoryMap[cat] || 0) + 1
    })
    const categoryBreakdown = Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count,
      percentage: cars.length > 0 ? Math.round((count / cars.length) * 100) : 0,
    }))

    // Price tiers breakdown (< 2M, 2M - 5M, > 5M)
    const tierUnder2M = cars.filter((c) => c.price < 2000000000).length
    const tier2Mto5M = cars.filter((c) => c.price >= 2000000000 && c.price <= 5000000000).length
    const tierOver5M = cars.filter((c) => c.price > 5000000000).length
    const priceTiers = [
      { label: '< Rp 2 Miliar (Luxury Sports)', count: tierUnder2M, percentage: cars.length > 0 ? Math.round((tierUnder2M / cars.length) * 100) : 0, barHex: '#3B82F6', colorClass: 'from-blue-600 to-blue-400' },
      { label: 'Rp 2M - Rp 5M (Supercar Flagship)', count: tier2Mto5M, percentage: cars.length > 0 ? Math.round((tier2Mto5M / cars.length) * 100) : 0, barHex: '#00D1FF', colorClass: 'from-mazda-cyan to-blue-500' },
      { label: '> Rp 5 Miliar (Hypercar / VIP Bespoke)', count: tierOver5M, percentage: cars.length > 0 ? Math.round((tierOver5M / cars.length) * 100) : 0, barHex: '#800A27', colorClass: 'from-mazda-burgundy to-red-600' },
    ]

    // Lead types breakdown
    const simLeads = inquiries.filter((i) => i.type === 'Simulation').length
    const customLeads = inquiries.filter((i) => i.type === 'CustomBuild').length
    const generalLeads = inquiries.filter((i) => !i.type || i.type === 'General').length
    const leadTypes = [
      { label: 'Simulasi Cicilan (Kalkulator Resmi)', count: simLeads, percentage: inquiries.length > 0 ? Math.round((simLeads / inquiries.length) * 100) : 0, color: 'from-blue-600 to-cyan-500', icon: '📊' },
      { label: 'Custom Build & Spesifikasi Khusus', count: customLeads, percentage: inquiries.length > 0 ? Math.round((customLeads / inquiries.length) * 100) : 0, color: 'from-purple-600 to-pink-500', icon: '🛠️' },
      { label: 'Reservasi & Konsultasi Umum', count: generalLeads, percentage: inquiries.length > 0 ? Math.round((generalLeads / inquiries.length) * 100) : 0, color: 'from-amber-500 to-orange-500', icon: '📩' },
    ]

    // Lead status breakdown
    const statusBaru = inquiries.filter((i) => i.status === 'Baru').length
    const statusDiproses = inquiries.filter((i) => i.status === 'Diproses').length
    const statusSelesai = inquiries.filter((i) => i.status === 'Selesai').length
    const responseRate = inquiries.length > 0 ? Math.round(((statusDiproses + statusSelesai) / inquiries.length) * 100) : 0

    // Average Tenor and DP for simulation leads
    const simInquiries = inquiries.filter((i) => i.simulationDetails)
    const avgTenor = simInquiries.length > 0 ? Math.round(simInquiries.reduce((acc, i) => acc + (i.simulationDetails?.tenor || 36), 0) / simInquiries.length) : 36
    const avgDP = simInquiries.length > 0 ? Math.round(simInquiries.reduce((acc, i) => acc + (i.simulationDetails?.downPayment || 0), 0) / simInquiries.length) : 500000000

    // Top highest valuation cars
    const topValuedCars = [...cars].sort((a, b) => b.price - a.price).slice(0, 5)

    return {
      totalValuation,
      averagePrice,
      categoryBreakdown,
      priceTiers,
      leadTypes,
      statusBaru,
      statusDiproses,
      statusSelesai,
      responseRate,
      avgTenor,
      avgDP,
      topValuedCars,
    }
  }, [cars, inquiries])

  const handleExportCSV = () => {
    const header = ['ID', 'Klien', 'Email', 'Telepon', 'Unit / Minat', 'Tipe Lead', 'Status', 'Tanggal']
    const rows = inquiries.map((item) => [
      item.id,
      `"${item.name}"`,
      item.email,
      item.phone,
      `"${item.carName || 'Konsultasi'}"`,
      item.type || 'General',
      item.status,
      item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : '-',
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `SPPM_Executive_Report_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

      {/* Executive Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 mb-10 animate-fade-in">
        <div className="border-b border-mazda-border-gray/80 bg-white/90 backdrop-blur-md rounded-2xl px-6 pt-2 shadow-premium flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 sm:gap-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveAdminTab('OPERATIONAL')}
              className={`py-4 px-2 font-mazda font-bold text-xs uppercase tracking-[0.18em] border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'OPERATIONAL'
                  ? 'border-mazda-burgundy text-mazda-burgundy'
                  : 'border-transparent text-mazda-steel-gray hover:text-mazda-charcoal'
              }`}
            >
              Manajemen Operasional & Reservasi
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab('ANALYTICS')}
              className={`py-4 px-2 font-mazda font-bold text-xs uppercase tracking-[0.18em] border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'ANALYTICS'
                  ? 'border-mazda-burgundy text-mazda-burgundy'
                  : 'border-transparent text-mazda-steel-gray hover:text-mazda-charcoal'
              }`}
            >
              Laporan & Grafik Statistik Eksekutif
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-mazda-steel-gray pb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Executive Portal Active</span>
          </div>
        </div>
      </div>

      {activeAdminTab === 'ANALYTICS' ? (
        /* =========================================================================
         * 📊 DASHBOARD LAPORAN & GRAFIK STATISTIK KHUSUS ADMIN (ULTRA-ELEGANT)
         * ========================================================================= */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-8 animate-fade-in pb-16">
          {/* Header Action Bar */}
          <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mazda font-bold uppercase tracking-[0.25em] text-mazda-burgundy block">
                Executive Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mt-1.5 tracking-tight">
                Laporan & Analitik Kinerja SPPM
              </h2>
              <p className="text-sm text-mazda-steel-gray mt-1 max-w-2xl font-light leading-relaxed">
                Tinjauan komprehensif atas valuasi armada showroom, distribusi harga, serta efektivitas penanganan konsultasi klien prioritas.
              </p>
            </div>
            <div className="flex items-center gap-3.5 flex-wrap">
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-6 py-3.5 rounded-xl bg-mazda-light-gray/80 hover:bg-[#E2E4E6] border border-mazda-border-gray text-mazda-charcoal text-xs font-mazda font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-2xs"
              >
                Unduh Rekap (.CSV)
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3.5 rounded-xl bg-mazda-burgundy hover:bg-[#800A27] text-white text-xs font-mazda font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
              >
                Cetak Laporan PDF
              </button>
            </div>
          </div>

          {/* Key Financial Metrics (4 Cards) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                  Total Valuasi Armada
                </span>
                <p className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-burgundy mt-2.5 tracking-tight">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(analytics.totalValuation)}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Akumulasi OTR</span>
                <span className="font-mono font-bold text-mazda-charcoal">{cars.length} Unit</span>
              </div>
            </div>

            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                  Rata-Rata Harga / Unit
                </span>
                <p className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mt-2.5 tracking-tight">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(analytics.averagePrice)}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Standar Showroom</span>
                <span className="font-semibold text-mazda-charcoal">Kelas Flagship</span>
              </div>
            </div>

            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                    SLA Penanganan Leads
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {analytics.responseRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
                  <div className="bg-mazda-charcoal h-full rounded-full transition-all duration-1000" style={{ width: `${analytics.responseRate}%` }} />
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Tertangani</span>
                <span className="font-mono font-bold text-mazda-charcoal">{analytics.statusDiproses + analytics.statusSelesai} dari {inquiries.length}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                  Simulasi Tenor Favorit
                </span>
                <p className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mt-2.5 tracking-tight">
                  {analytics.avgTenor} <span className="text-base font-light text-mazda-steel-gray uppercase">Bulan</span>
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Rata-rata DP</span>
                <span className="font-mono font-bold text-mazda-charcoal">Rp {new Intl.NumberFormat('id-ID').format(analytics.avgDP)}</span>
              </div>
            </div>
          </div>

          {/* Charts Section 1: Kategori & Segmentasi Harga */}
          <div className="grid gap-8 md:grid-cols-2 items-stretch">
            {/* Grafik 1: Distribusi Kategori Armada */}
            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium flex flex-col justify-between">
              <div>
                <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <span className="text-[10px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                    Inventaris Showroom
                  </span>
                  <h3 className="text-lg font-mazda font-bold text-mazda-charcoal mt-1 tracking-tight">
                    Distribusi Kategori Kendaraan
                  </h3>
                </div>

                <div className="space-y-5">
                  {analytics.categoryBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-mazda-charcoal">
                        <span className="uppercase tracking-wider">{item.name}</span>
                        <span className="font-mono text-mazda-steel-gray font-normal">{item.count} Unit ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-mazda-light-gray/60 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-mazda-charcoal transition-all duration-1000"
                          style={{ width: `${Math.max(6, item.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Total Koleksi Aktif</span>
                <span className="font-mono font-bold text-mazda-charcoal">{cars.length} Kendaraan</span>
              </div>
            </div>

            {/* Grafik 2: Segmentasi Harga Supercar */}
            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium flex flex-col justify-between">
              <div>
                <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <span className="text-[10px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                    Segmentasi Pasar
                  </span>
                  <h3 className="text-lg font-mazda font-bold text-mazda-charcoal mt-1 tracking-tight">
                    Komposisi Kelas Harga Armada
                  </h3>
                </div>

                {/* Refined Proportional Bar Visual */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-mazda-light-gray my-5">
                  {analytics.priceTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className="h-full transition-all duration-1000 border-r border-white/40 last:border-none"
                      style={{
                        width: `${Math.max(10, tier.percentage)}%`,
                        backgroundColor: idx === 0 ? '#8C8D8E' : idx === 1 ? '#1A1A1A' : '#800A27'
                      }}
                    />
                  ))}
                </div>

                <div className="grid gap-3.5 mt-6">
                  {analytics.priceTiers.map((tier, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-mazda-border-gray/60 bg-mazda-light-gray/30">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: idx === 0 ? '#8C8D8E' : idx === 1 ? '#1A1A1A' : '#800A27' }}
                        />
                        <span className="text-xs font-semibold text-mazda-charcoal">{tier.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-mazda-charcoal">
                        {tier.count} Unit <span className="font-light text-mazda-steel-gray">({tier.percentage}%)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Fokus Penawaran VIP</span>
                <span className="font-semibold text-mazda-charcoal">Supercar & Hypercar</span>
              </div>
            </div>
          </div>

          {/* Charts Section 2: Tren & Tipe Pengajuan Leads */}
          <div className="grid gap-8 md:grid-cols-2 items-stretch">
            {/* Grafik 3: Komposisi Tipe Leads */}
            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium flex flex-col justify-between">
              <div>
                <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <span className="text-[10px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                    Lead Intelligence
                  </span>
                  <h3 className="text-lg font-mazda font-bold text-mazda-charcoal mt-1 tracking-tight">
                    Asal & Tipe Minat Klien VIP
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {analytics.leadTypes.map((type, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-mazda-border-gray/80 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mazda font-bold uppercase tracking-wider text-mazda-charcoal">
                          {type.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-mazda-charcoal">
                          {type.count} <span className="font-light text-mazda-steel-gray">({type.percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-mazda-light-gray/60 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-mazda-burgundy transition-all duration-1000"
                          style={{ width: `${Math.max(6, type.percentage)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Total Pengajuan Klien</span>
                <span className="font-mono font-bold text-mazda-charcoal">{inquiries.length} Reservasi</span>
              </div>
            </div>

            {/* Grafik 4: Status Penanganan & Konversi */}
            <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium flex flex-col justify-between">
              <div>
                <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <span className="text-[10px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                    Penanganan & Konversi
                  </span>
                  <h3 className="text-lg font-mazda font-bold text-mazda-charcoal mt-1 tracking-tight">
                    Status Reservasi Masuk
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-mazda-border-gray bg-mazda-light-gray/30 text-center">
                    <span className="block text-2xl font-mono font-bold text-mazda-charcoal">{analytics.statusBaru}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-mazda-steel-gray mt-1">Baru</span>
                  </div>
                  <div className="p-4 rounded-xl border border-mazda-border-gray bg-mazda-light-gray/30 text-center">
                    <span className="block text-2xl font-mono font-bold text-amber-700">{analytics.statusDiproses}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800 mt-1">Diproses</span>
                  </div>
                  <div className="p-4 rounded-xl border border-mazda-border-gray bg-mazda-light-gray/30 text-center">
                    <span className="block text-2xl font-mono font-bold text-emerald-700">{analytics.statusSelesai}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mt-1">Selesai</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-mazda-border-gray/80 bg-white space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-mazda-charcoal">
                    <span>Tingkat Efektivitas SLA</span>
                    <span className="font-mono font-bold text-mazda-charcoal">{analytics.responseRate}%</span>
                  </div>
                  <div className="w-full bg-mazda-light-gray rounded-full h-1.5 overflow-hidden">
                    <div className="bg-mazda-charcoal h-full rounded-full transition-all duration-1000" style={{ width: `${analytics.responseRate}%` }} />
                  </div>
                  <p className="text-[11px] text-mazda-steel-gray font-light pt-0.5 leading-relaxed">
                    SLA menghitung persentase respons dan penutupan transaksi oleh tim penasihat eksekutif.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-mazda-steel-gray">
                <span>Standar Mutu Pelayanan</span>
                <span className="font-semibold text-mazda-charcoal">Min. 85% SLA</span>
              </div>
            </div>
          </div>

          {/* Laporan Eksekutif: Top 5 Unit Valuasi Tertinggi */}
          <div className="rounded-2xl border border-mazda-border-gray/80 bg-white p-8 shadow-premium">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-mazda-border-gray/60 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-mazda font-bold uppercase tracking-[0.2em] text-mazda-steel-gray block">
                  Katalog Flagship
                </span>
                <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mt-1 tracking-tight">
                  Top 5 Kendaraan dengan Valuasi Tertinggi
                </h3>
              </div>
              <span className="text-[11px] font-mono text-mazda-steel-gray uppercase tracking-wider border border-mazda-border-gray px-3 py-1.5 rounded-lg bg-mazda-light-gray/30">
                Peringkat Valuasi OTR
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-mazda-border-gray text-[10px] font-mazda font-bold uppercase tracking-widest text-mazda-steel-gray">
                    <th className="py-4 px-4 font-mono">#</th>
                    <th className="py-4 px-4">Nama Unit & Varian</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Tahun</th>
                    <th className="py-4 px-4">Harga OTR (IDR)</th>
                    <th className="py-4 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mazda-border-gray/40 text-xs sm:text-sm">
                  {analytics.topValuedCars.map((car, idx) => (
                    <tr key={car.id} className="hover:bg-mazda-light-gray/40 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-mazda-burgundy">{idx + 1}</td>
                      <td className="py-4 px-4 font-mazda font-bold text-mazda-charcoal">
                        {car.name} <span className="text-mazda-steel-gray font-light ml-1">({car.model})</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded border border-mazda-border-gray text-mazda-charcoal text-[11px] font-semibold">
                          {car.category || 'Sports Car'}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-mazda-charcoal">{car.year}</td>
                      <td className="py-4 px-4 font-mono font-bold text-mazda-charcoal">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(car.price)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {car.isFeatured ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-mazda-burgundy/30 text-mazda-burgundy bg-mazda-burgundy/5 text-[10px] font-bold uppercase tracking-wider">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-gray-500 bg-gray-50 text-[10px] font-semibold uppercase tracking-wider">
                            Reguler
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
         * 🏎️ TAB OPERASIONAL & RESERVASI (DEFAULT)
         * ========================================================================= */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-10 animate-fade-in">
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Jarak Tempuh</label>
                    <input type="number" value={formData.mileage} onChange={(event) => setFormData({ ...formData, mileage: Number(event.target.value) })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">URL Gambar / Foto</label>
                    <input value={formData.image} onChange={(event) => setFormData({ ...formData, image: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Fitur Unggulan</label>
                  <input value={formData.features} onChange={(event) => setFormData({ ...formData, features: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium" placeholder="Carbon Ceramic Brakes, Carbon Steering, Titanium Exhaust (pisahkan dengan koma)" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">Deskripsi Eksklusif</label>
                  <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3 text-sm text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all min-h-[110px] font-medium leading-relaxed" placeholder="Jelaskan sejarah unit, keistimewaan performa, dan jaminan sertifikasi resmi." />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <input id="isFeatured" type="checkbox" checked={formData.isFeatured} onChange={(event) => setFormData({ ...formData, isFeatured: event.target.checked })} className="h-5 w-5 rounded border-mazda-border-gray text-mazda-burgundy focus:ring-mazda-burgundy cursor-pointer" />
                  <label htmlFor="isFeatured" className="text-xs uppercase tracking-wider font-bold text-mazda-charcoal cursor-pointer">
                    Jadikan Unit Unggulan (Tampil di Halaman Depan & Featured Carousel)
                  </label>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-mazda-burgundy hover:bg-[#800A27] text-white py-4 text-sm font-mazda font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer mt-4">
                  + Simpan & Terbitkan Unit ke Katalog
                </Button>
              </form>
            </div>

            {/* Catalog List & Inquiries */}
            <div className="space-y-8">
              {/* Car List */}
              <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium">
                <div className="flex items-center justify-between border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                      Inventaris Aktif
                    </span>
                    <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mt-1">Daftar Kendaraan</h2>
                  </div>
                  <span className="text-xs text-mazda-steel-gray font-semibold bg-mazda-light-gray px-3 py-1.5 rounded-full">
                    {cars.length} Unit
                  </span>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {cars.length === 0 ? (
                    <p className="text-mazda-steel-gray text-center py-10 text-sm">Belum ada kendaraan dalam inventaris.</p>
                  ) : (
                    cars.map((car) => (
                      <div key={car.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-mazda-border-gray/80 bg-mazda-light-gray/30 p-4 hover:bg-white hover:border-mazda-burgundy/40 transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-xl bg-gray-200 overflow-hidden relative flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-mazda font-bold text-mazda-charcoal text-base">{car.name}</h3>
                              {car.isFeatured && (
                                <span className="bg-mazda-burgundy text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  Unggulan
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-mazda-steel-gray font-medium mt-0.5">{car.model} • {car.year}</p>
                            <p className="text-sm font-mono font-bold text-mazda-burgundy mt-1">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(car.price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(car.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              car.isFeatured
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {car.isFeatured ? '⭐ Featured' : '☆ Set Featured'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCar(car.id)}
                            className="px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Inquiries */}
              <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 shadow-premium">
                <div className="flex items-center justify-between border-b border-mazda-border-gray/60 pb-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                      Pesan & Leads
                    </span>
                    <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mt-1">Reservasi Konsultasi VIP</h2>
                  </div>
                  <span className="text-xs text-green-700 font-semibold bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                    {inquiries.length} Pesan
                  </span>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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
      )}
    </div>
  )
}
