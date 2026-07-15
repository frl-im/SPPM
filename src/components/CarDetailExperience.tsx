'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Car, CarColorOption, Inquiry } from '@/types/car'
import { getStoredInquiries, saveInquiries } from '@/lib/storage'

const AnimationStyles = () => (
  <style>{`
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.97);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes showroomCarEnter {
      0% {
        opacity: 0;
        transform: scale(0.85) translateY(45px) rotate(-1.5deg);
        filter: brightness(1.9) contrast(1.3) blur(6px);
      }
      50% {
        opacity: 0.95;
        transform: scale(1.03) translateY(-6px) rotate(0.5deg);
        filter: brightness(1.2) contrast(1.1) blur(1px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0) rotate(0deg);
        filter: brightness(1) contrast(1) blur(0px);
      }
    }

    @keyframes paintSweep {
      0% {
        transform: translateX(-130%) skewX(-28deg);
        opacity: 1;
      }
      100% {
        transform: translateX(230%) skewX(-28deg);
        opacity: 0;
      }
    }

    .animate-slide-in-left {
      animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-slide-in-up {
      animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-scale-in {
      animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-showroom-car {
      animation: showroomCarEnter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-paint-sweep {
      animation: paintSweep 0.9s ease-out forwards;
    }
  `}</style>
)

interface CarDetailExperienceProps {
  car: Car
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

function calculateInstallment(principal: number, annualRate: number, months: number) {
  if (months <= 0) {
    return { monthly: principal, total: principal, interest: 0 }
  }

  if (annualRate <= 0) {
    return { monthly: principal / months, total: principal, interest: 0 }
  }

  const monthlyRate = annualRate / 100 / 12
  const monthly = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months))

  return {
    monthly,
    total: monthly * months,
    interest: monthly * months - principal,
  }
}

// Helper untuk menyesuaikan tone visualisasi warna pada foto mobil
function getColorFilterStyle(option: CarColorOption) {
  const name = option.name.toLowerCase()
  const hex = option.hex.toLowerCase()

  if (name.includes('yellow') || name.includes('giallo') || hex === '#ffd700' || hex === '#e5c158') {
    return {
      filter: 'sepia(0.6) saturate(3.8) hue-rotate(15deg) brightness(1.05) contrast(1.1)',
      overlayColor: '#FFD700',
      overlayOpacity: 0.38,
    }
  }
  if (name.includes('red') || name.includes('rosso') || hex === '#d40000' || hex === '#ff0000') {
    return {
      filter: 'sepia(0.65) saturate(4.2) hue-rotate(-35deg) brightness(0.95) contrast(1.18)',
      overlayColor: '#D40000',
      overlayOpacity: 0.42,
    }
  }
  if (name.includes('black') || name.includes('nero') || name.includes('midnight') || hex === '#1a1a1a' || hex === '#000000') {
    return {
      filter: 'grayscale(0.95) brightness(0.65) contrast(1.45)',
      overlayColor: '#050505',
      overlayOpacity: 0.55,
    }
  }
  if (name.includes('gray') || name.includes('nardo') || name.includes('grey') || hex === '#686a6c' || hex === '#7a7a7a') {
    return {
      filter: 'grayscale(0.85) brightness(0.95) contrast(1.25)',
      overlayColor: '#686A6C',
      overlayOpacity: 0.35,
    }
  }
  if (name.includes('white') || name.includes('bianco') || name.includes('silver') || hex === '#ffffff' || hex === '#c0c0c0') {
    return {
      filter: 'grayscale(0.7) brightness(1.2) contrast(1.15)',
      overlayColor: option.hex,
      overlayOpacity: 0.28,
    }
  }
  if (name.includes('blue') || name.includes('blu')) {
    return {
      filter: 'sepia(0.5) saturate(3.5) hue-rotate(180deg) brightness(1.05) contrast(1.12)',
      overlayColor: '#0055FF',
      overlayOpacity: 0.38,
    }
  }

  // Default fallback
  return {
    filter: 'saturate(1.35) contrast(1.12)',
    overlayColor: option.hex,
    overlayOpacity: 0.35,
  }
}

export function CarDetailExperience({ car }: CarDetailExperienceProps) {
  const colorOptions = car.colorOptions ?? [{ name: car.color, hex: '#7A7A7A' }]
  const [selectedColor, setSelectedColor] = useState<CarColorOption>(colorOptions[0])
  const [animationTrigger, setAnimationTrigger] = useState<number>(0)
  const [feelsTab, setFeelsTab] = useState<'EXTERIOR' | 'INTERIOR'>('EXTERIOR')
  const [selectedTrim, setSelectedTrim] = useState<string>('Pro Autoexe')

  const [downPayment, setDownPayment] = useState<number>(car.price * 0.2)
  const [tenor, setTenor] = useState<number>(36)
  const [interestRate, setInterestRate] = useState<number>(3.5)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const financedAmount = useMemo(
    () => Math.max(0, car.price - downPayment),
    [car.price, downPayment],
  )

  const installment = useMemo(
    () => calculateInstallment(financedAmount, interestRate, tenor),
    [financedAmount, interestRate, tenor],
  )

  const colorEffect = getColorFilterStyle(selectedColor)

  const handleSelectColor = (option: CarColorOption) => {
    setSelectedColor(option)
    setAnimationTrigger((prev) => prev + 1)
  }

  const [leadName, setLeadName] = useState<string>('')
  const [leadEmail, setLeadEmail] = useState<string>('')
  const [leadPhone, setLeadPhone] = useState<string>('')
  const [leadMessage, setLeadMessage] = useState<string>('')
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false)
  const [leadError, setLeadError] = useState<string>('')

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLeadError('')

    if (!leadName || !leadEmail || !leadPhone) {
      setLeadError('Silakan lengkapi Nama, Email, dan Nomor WhatsApp/Telepon Anda.')
      return
    }

    const inquiry: Inquiry = {
      id: Date.now().toString(),
      carId: car.id,
      carName: `${car.name} ${car.model} (${selectedTrim}) • ${selectedColor.name}`,
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      budget: `DP Rp ${new Intl.NumberFormat('id-ID').format(downPayment)} (${Math.round((downPayment / car.price) * 100)}%) / Tenor ${tenor} Bln / Cicilan Rp ${new Intl.NumberFormat('id-ID').format(installment.monthly)}/bln`,
      message: leadMessage || `Permintaan resmi hasil simulasi cicilan dan spesifikasi khusus untuk ${car.name} ${car.model} (${selectedTrim}) warna ${selectedColor.name}.`,
      type: 'Simulation',
      simulationDetails: {
        downPayment,
        tenor,
        interestRate,
        monthlyInstallment: installment.monthly,
        totalPrice: installment.total,
      },
      customSpecs: {
        color: selectedColor.name,
        trim: selectedTrim,
        exteriorOption: feelsTab === 'EXTERIOR' ? 'Paket Eksterior Unggulan' : 'Standar',
        interiorOption: 'Kulit Premium Nappa / Alcantara',
        accessories: ['JBL Pro Sound System', 'Carbon Ceramic Brakes'],
      },
      createdAt: new Date().toISOString(),
      status: 'Baru',
    }

    const existing = getStoredInquiries()
    saveInquiries([inquiry, ...existing])
    setLeadSubmitted(true)
    setLeadName('')
    setLeadEmail('')
    setLeadPhone('')
    setLeadMessage('')
  }

  const subNavs = ['HIGHLIGHT', 'DESIGN', 'GALLERY', 'FEELS', 'SPECS', 'ACCESSORIES']
  const trimOptions = ['Pro Autoexe', 'Touring Sport', 'Kuro Edition']

  return (
    <>
      <AnimationStyles />
      <div className="space-y-12">
        {/* Mazda Sub-Navigation Bar matching input_file_3.png */}
        <div className="border-b border-gray-200/80 pb-4 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {subNavs.map((nav) => {
              const isFeels = nav === 'FEELS'
              return (
                <span
                  key={nav}
                  className={`text-xs uppercase tracking-[0.22em] font-mazda transition-all pb-4 -mb-4 ${
                    isFeels
                      ? 'border-b-2 border-[#990000] text-[#1A1A1A] font-bold'
                      : 'text-gray-400 font-medium hover:text-[#1A1A1A] cursor-pointer'
                  }`}
                >
                  {nav}
                </span>
              )
            })}
          </div>
        </div>

        {/* FEELS Section Header matching input_file_3.png */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-mazda font-light uppercase tracking-[0.28em] text-[#1A1A1A] mb-3">
            FEELS
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Find the grade and color that perfectly aligns with your individuality across our luxury supercar selection.
          </p>

          {/* Exterior / Interior Switcher Pills matching input_file_3.png */}
          <div className="inline-flex items-center gap-2 mt-6 p-1 bg-gray-100/80 rounded-full border border-gray-200">
            <button
              type="button"
              onClick={() => setFeelsTab('EXTERIOR')}
              className={`px-6 py-2 rounded-full text-xs font-mazda font-bold uppercase tracking-widest transition-all cursor-pointer ${
                feelsTab === 'EXTERIOR'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              EXTERIOR
            </button>
            <button
              type="button"
              onClick={() => setFeelsTab('INTERIOR')}
              className={`px-6 py-2 rounded-full text-xs font-mazda font-bold uppercase tracking-widest transition-all cursor-pointer ${
                feelsTab === 'INTERIOR'
                  ? 'bg-[#1A1A1A] text-white shadow-md'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              INTERIOR
            </button>
          </div>

          {/* Trim Selection Pills matching input_file_3.png ([Pro Autoexe] etc.) */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {trimOptions.map((trim) => {
              const isTrimActive = selectedTrim === trim
              return (
                <button
                  key={trim}
                  type="button"
                  onClick={() => setSelectedTrim(trim)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer border ${
                    isTrimActive
                      ? 'border-[#990000] bg-[#990000]/5 text-[#990000] font-bold'
                      : 'border-gray-200 text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {trim}
                </button>
              )
            })}
          </div>
        </div>

        {/* Color Experience Section */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#990000] font-mazda font-bold">
                Pilihan Warna {selectedTrim}
              </span>
              <h3 className="text-xl font-mazda font-bold mt-0.5 text-[#1A1A1A]">
                {selectedColor.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 px-4 py-2 text-xs font-mazda font-bold text-[#1A1A1A] bg-gray-50 self-start">
              <span
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="tracking-wide uppercase">{selectedColor.name}</span>
            </div>
          </div>

          {/* Color Swatches - Square/Circle Mazda Studio style matching input_file_3.png */}
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
            {colorOptions.map((option) => {
              const isSelected = selectedColor.name === option.name
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleSelectColor(option)}
                  className={`group flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'border-[#990000] bg-[#990000]/5 shadow-md scale-105'
                      : 'border-gray-200/80 bg-gray-50/50 hover:border-gray-400 hover:bg-white'
                  }`}
                  title={option.name}
                >
                  <span
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg border-2 border-white shadow-md relative flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && (
                      <span className="text-xs text-white font-bold drop-shadow">✓</span>
                    )}
                  </span>
                  <span className="font-mazda font-bold text-[11px] text-[#1A1A1A] max-w-[80px] truncate text-center uppercase tracking-wider">
                    {option.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Car Entrance & Showroom Preview */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-mazda-border-gray/70 bg-gradient-to-br from-[#0F1113] via-[#16181B] to-[#0A0B0C] p-6 sm:p-8 flex items-center justify-center relative shadow-2xl min-h-[300px] sm:min-h-[380px]">
              {/* Dynamic Showroom Floor Lighting & Ambient Glow reflecting selected color */}
              <div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-[180px] rounded-full blur-[75px] transition-all duration-700 pointer-events-none opacity-70"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Dynamic Car Container keyed to animationTrigger to run entrance animation every time a color is clicked */}
              <div
                key={`car-stage-${animationTrigger}`}
                className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden flex items-center justify-center animate-showroom-car"
              >
                {/* Base Car Photo with color matching filter */}
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-all duration-500"
                  style={{ filter: colorEffect.filter }}
                />

                {/* Color Paint Layer (mix-blend-color gives accurate hue tint on body) */}
                <div
                  className="absolute inset-0 mix-blend-color transition-colors duration-500 pointer-events-none"
                  style={{
                    backgroundColor: colorEffect.overlayColor,
                    opacity: colorEffect.overlayOpacity,
                  }}
                />

                {/* Metallic Gloss Layer */}
                <div
                  className="absolute inset-0 mix-blend-overlay transition-colors duration-500 pointer-events-none"
                  style={{
                    backgroundColor: selectedColor.hex,
                    opacity: 0.25,
                  }}
                />

                {/* High-Tech Laser Scan / Paint Booth Sweep Animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-28deg] animate-paint-sweep" />
                </div>

                {/* Badge Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-mazda font-bold shadow-xl">
                  <span
                    className="w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span>Showroom Transition: {selectedColor.name}</span>
                </div>
              </div>
            </div>

            {/* Color Character Card */}
            <div
              key={`desc-${selectedColor.name}-${animationTrigger}`}
              className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-7 sm:p-8 text-white animate-slide-in-left flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[90px] pointer-events-none transition-all duration-700 opacity-40"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold">
                    Karakter Warna
                  </span>
                  <span className="text-xs font-mono text-gray-300 bg-white/10 px-3 py-1 rounded-md border border-white/15">
                    {selectedColor.hex}
                  </span>
                </div>
                <h3 className="mt-3 text-3xl font-mazda font-bold text-white tracking-tight">{selectedColor.name}</h3>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed font-light">
                  Lapisan cat eksklusif dengan formulasi multi-layer ini memberikan pantulan cahaya dramatis di setiap lekukan bodi aerodynamic supercar Anda. Dirancang dengan teknologi proteksi UV berlapis dan kejernihan kristal premium.
                </p>
              </div>

              <div className="mt-8 relative z-10 p-5 rounded-2xl bg-white/5 border border-white/15 flex items-center gap-4 backdrop-blur-sm shadow-inner">
                <span
                  className="h-10 w-10 rounded-full border-2 border-white shadow-xl flex-shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <p className="text-sm font-mazda font-bold text-white">Sertifikat Warna Asli SPPM</p>
                  <p className="text-xs text-gray-400 font-light mt-0.5">Garansi resmi keaslian pigmen & ketahanan cat hingga 5 tahun</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financing Simulator Section */}
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-8 shadow-premium animate-slide-in-up">
          <div className="border-b border-mazda-border-gray/60 pb-4 mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
              Simulasi Pembiayaan VIP
            </span>
            <h2 className="text-2xl font-mazda font-bold mt-1 text-mazda-black">
              Kalkulator Cicilan Fleksibel
            </h2>
            <p className="text-sm text-mazda-steel-gray mt-1 font-light">
              Sesuaikan uang muka, tenor, dan suku bunga untuk mengestimasi rencana pembiayaan Anda bersama mitra leasing resmi kami.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group cursor-pointer">
              <span className="mb-2.5 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Uang Muka (DP)
              </span>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="10000000"
                  value={downPayment}
                  onChange={(event) => setDownPayment(Number(event.target.value || 0))}
                  className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3.5 text-base font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all shadow-sm"
                />
              </div>
              <p className="mt-2.5 text-xs font-semibold text-mazda-burgundy">{formatCurrency(downPayment)}</p>
            </label>

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group cursor-pointer">
              <span className="mb-2.5 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Tenor (Bulan)
              </span>
              <input
                type="number"
                min="1"
                max="120"
                value={tenor}
                onChange={(event) => setTenor(Number(event.target.value || 1))}
                className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3.5 text-base font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all shadow-sm"
              />
              <p className="mt-2.5 text-xs font-semibold text-mazda-steel-gray">
                {tenor} Bulan ({Math.round((tenor / 12) * 10) / 10} Tahun)
              </p>
            </label>

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group cursor-pointer">
              <span className="mb-2.5 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Suku Bunga Tahunan
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={interestRate}
                onChange={(event) => setInterestRate(Number(event.target.value || 0))}
                className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3.5 text-base font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all shadow-sm"
              />
              <p className="mt-2.5 text-xs font-semibold text-mazda-steel-gray">{interestRate.toFixed(1)}% / Tahun</p>
            </label>
          </div>

          {/* Optimized Clean Trigger Box for Pop-Up Modal */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-mazda-light-gray/80 via-white to-mazda-light-gray/40 border border-mazda-border-gray shadow-sm">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-mazda-burgundy font-mazda font-bold block mb-1">
                Kalkulasi Finansial Siap
              </span>
              <h4 className="text-lg font-mazda font-bold text-mazda-black">
                Simulasi Pembiayaan {car.name}
              </h4>
              <p className="text-xs text-mazda-steel-gray mt-1 font-light">
                DP: <strong className="text-mazda-charcoal font-semibold">{formatCurrency(downPayment)}</strong> • Tenor: <strong className="text-mazda-charcoal font-semibold">{tenor} Bulan</strong> • Bunga: <strong className="text-mazda-charcoal font-semibold">{interestRate}% / thn</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-mazda-burgundy via-[#800A27] to-[#5A0718] px-8 py-4 text-sm font-mazda font-bold text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ring-4 ring-mazda-burgundy/15 cursor-pointer"
            >
              <span>✨ CEK HASIL SIMULASI CICILAN</span>
              <span className="text-mazda-cyan font-mono text-base font-bold">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Luxury Glassmorphism VIP Pop-Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-scale-in overflow-y-auto">
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-6 sm:p-8 lg:p-10 text-white border border-white/15 shadow-2xl overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/25 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-mazda-cyan/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between gap-4 pb-6 border-b border-white/15">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-mazda-cyan text-[11px] font-mazda font-bold uppercase tracking-wider mb-2.5">
                  <span>💎 Sertifikat Estimasi Pembiayaan VIP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight">
                  {car.name} {car.model}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                  Warna Terpilih: <strong className="text-white font-medium">{selectedColor.name}</strong> • Harga OTR: <strong className="text-white font-semibold">{formatCurrency(car.price)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-gray-300 hover:text-white hover:bg-white/20 flex items-center justify-center text-lg transition-all cursor-pointer flex-shrink-0"
                aria-label="Tutup Pop-up"
              >
                ✕
              </button>
            </div>

            {/* Hero Monthly Installment Card inside Pop-Up */}
            <div className="relative z-10 mt-6 rounded-2xl bg-gradient-to-br from-mazda-burgundy via-[#800A27] to-[#5A0718] p-6 sm:p-8 border border-white/25 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ring-2 ring-mazda-burgundy/50">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-mazda-cyan font-mazda font-bold block mb-1">
                  Angsuran Rutin Bulanan
                </span>
                <h4 className="text-3xl sm:text-4xl font-mazda font-bold text-white tracking-tight drop-shadow-md break-all sm:break-normal">
                  {formatCurrency(installment.monthly)}
                </h4>
                <p className="text-xs text-white/80 font-light mt-1">
                  Estimasi cicilan tetap selama tenor <strong className="font-semibold text-white">{tenor} bulan ({Math.round((tenor / 12) * 10) / 10} tahun)</strong>
                </p>
              </div>
              <div className="sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 border-white/20 pt-3 sm:pt-0">
                <span className="text-xs text-white/70">Suku Bunga</span>
                <span className="text-lg sm:text-2xl font-mazda font-bold text-white font-mono">{interestRate}% / thn</span>
              </div>
            </div>

            {/* Detailed Table Grid */}
            <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4 sm:p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Harga Kendaraan (OTR)</p>
                  <p className="text-base font-mazda font-bold text-white mt-0.5">{formatCurrency(car.price)}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono">100%</span>
              </div>

              <div className="rounded-xl bg-white/5 p-4 sm:p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Uang Muka (DP)</p>
                  <p className="text-base font-mazda font-bold text-mazda-cyan mt-0.5">{formatCurrency(downPayment)}</p>
                </div>
                <span className="text-xs text-mazda-cyan font-mono font-bold">
                  {Math.round((downPayment / car.price) * 100)}%
                </span>
              </div>

              <div className="rounded-xl bg-white/5 p-4 sm:p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Pinjaman Pokok (Utang)</p>
                  <p className="text-base font-mazda font-bold text-white mt-0.5">{formatCurrency(financedAmount)}</p>
                </div>
                <span className="text-xs text-gray-400">Setelah DP</span>
              </div>

              <div className="rounded-xl bg-white/5 p-4 sm:p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Total Bunga Leasing</p>
                  <p className="text-base font-mazda font-bold text-white mt-0.5">{formatCurrency(installment.interest)}</p>
                </div>
                <span className="text-xs text-gray-400">Akumulasi</span>
              </div>

              <div className="sm:col-span-2 rounded-xl bg-white/10 p-5 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-mazda-cyan uppercase tracking-wider font-bold">Total Pembayaran Keseluruhan</p>
                  <p className="text-xs text-gray-400">Akumulasi seluruh cicilan (Pokok + Bunga) selama {tenor} bulan</p>
                </div>
                <p className="text-xl sm:text-2xl font-mazda font-bold text-white tracking-tight break-all sm:break-normal">
                  {formatCurrency(installment.total)}
                </p>
              </div>
            </div>

            {/* Native Lead Capture Form inside Modal */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/15">
              <div className="rounded-2xl bg-white/5 border border-white/15 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-mazda-cyan font-mazda font-bold">
                      Form Resmi Pengajuan Leads
                    </span>
                    <h4 className="text-lg font-mazda font-bold text-white mt-0.5">
                      Kirim Spesifikasi & Hasil Simulasi ke Penasihat SPPM
                    </h4>
                  </div>
                  <span className="text-2xl">📝</span>
                </div>

                {leadSubmitted ? (
                  <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-5 text-green-300 flex items-start gap-3 animate-scale-in">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="font-mazda font-bold text-white text-base">Hasil Simulasi & Spesifikasi Berhasil Terkirim!</p>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        Data kontak Anda beserta kalkulasi DP Rp {new Intl.NumberFormat('id-ID').format(downPayment)} dan tenor {tenor} bulan untuk {car.name} ({selectedTrim}) telah tersimpan dalam basis data sebagai lead prioritas. Tim penasihat VIP kami akan segera menghubungi Anda.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 mt-2">
                    {leadError && (
                      <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-red-300 text-xs flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{leadError}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-mazda">Nama Lengkap *</label>
                        <input
                          type="text"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Contoh: Arief Budiman"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-cyan transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-mazda">Email *</label>
                        <input
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="arief@domain.com"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-cyan transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-mazda">No. WhatsApp *</label>
                        <input
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="0812 3456 7890"
                          className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-cyan transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5 font-mazda">Deskripsi / Catatan Pesanan Custom</label>
                      <textarea
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder={`Spesifikasi Terpilih: ${car.name} (${selectedTrim}), Warna ${selectedColor.name}. Tambahkan catatan custom seperti jadwal test drive atau pertanyaan leasing...`}
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-mazda-cyan transition-all min-h-[80px]"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-gray-400 font-light">
                        ℹ️ Angka simulasi & spesifikasi otomatis terlampir ke basis data.
                      </span>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-mazda-cyan to-[#0088CC] text-[#1A1A1A] font-mazda font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        🚀 Kirim Spesifikasi & Simulasi ke Basis Data
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-gray-400 font-light text-center sm:text-left">
                * Angka simulasi ini merupakan estimasi resmi dari kalkulator SPPM dan dapat disesuaikan dengan paket kemitraan leasing pilihan Anda.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mazda font-bold text-white transition-all cursor-pointer"
                >
                  Tutup
                </button>
                <a
                  href={`/booking?carId=${car.id}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-mazda-burgundy hover:bg-[#800A27] text-xs font-mazda font-bold text-white transition-all shadow-lg text-center cursor-pointer"
                >
                  Reservasi Unit Ini
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

