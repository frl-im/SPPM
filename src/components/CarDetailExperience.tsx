'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Car, CarColorOption } from '@/types/car'

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
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [animationTrigger, setAnimationTrigger] = useState(1)
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2))
  const [tenor, setTenor] = useState(36)
  const [interestRate, setInterestRate] = useState(6.5)

  const financedAmount = Math.max(car.price - downPayment, 0)

  const installment = useMemo(
    () => calculateInstallment(financedAmount, interestRate, tenor),
    [financedAmount, interestRate, tenor],
  )

  const colorEffect = getColorFilterStyle(selectedColor)

  const handleSelectColor = (option: CarColorOption) => {
    setSelectedColor(option)
    setAnimationTrigger((prev) => prev + 1)
  }

  return (
    <>
      <AnimationStyles />
      <div className="space-y-8">
        {/* Color Experience Section */}
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-6 sm:p-8 shadow-premium">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-4 border-b border-mazda-border-gray/60">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold">
                Visualisasi Premium
              </span>
              <h2 className="text-2xl font-mazda font-bold mt-1 text-mazda-black">
                Eksplorasi Pilihan Warna
              </h2>
              <p className="text-sm text-mazda-steel-gray mt-1 font-light">
                Klik warna favorit Anda untuk memicu animasi masuk kendaraan dan melihat pantulan cat eksklusif di showroom kami.
              </p>
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-mazda-border-gray px-4 py-2 text-xs font-mazda font-bold text-mazda-charcoal bg-mazda-light-gray/80 self-start shadow-sm">
              <span
                className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-inner"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="tracking-wide">{selectedColor.name}</span>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            {colorOptions.map((option) => {
              const isSelected = selectedColor.name === option.name
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => handleSelectColor(option)}
                  className={`flex items-center gap-3.5 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-mazda-burgundy bg-mazda-burgundy/10 shadow-lg scale-[1.03] ring-2 ring-mazda-burgundy/25'
                      : 'border-mazda-border-gray/80 bg-mazda-light-gray/40 hover:border-mazda-burgundy/50 hover:bg-white hover:scale-[1.01]'
                  }`}
                >
                  <span
                    className="h-9 w-9 rounded-full border-2 border-white shadow-md relative flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && (
                      <span className="text-xs text-white font-bold drop-shadow">✓</span>
                    )}
                  </span>
                  <span>
                    <span className="block font-mazda font-bold text-sm text-mazda-charcoal">
                      {option.name}
                    </span>
                    <span className="block text-[11px] text-mazda-steel-gray font-light">Cat Eksklusif</span>
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

          {/* Estimasi Rincian Pembayaran - 2x2 Spacious Layout (Guaranteed ZERO Collision / Overlap) */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-6 sm:p-8 lg:p-10 text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/25 rounded-full blur-[130px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/15">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-mazda-cyan font-mazda font-bold block mb-1">
                    Simulasi Finansial VIP
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight">
                    Estimasi Rincian Pembayaran
                  </h3>
                </div>
                <div className="inline-flex items-center gap-3 text-xs text-gray-300 bg-white/10 px-4 py-2 rounded-full border border-white/15 self-start sm:self-auto shadow-inner">
                  <span>Tenor: <strong className="text-white">{tenor} Bln</strong></span>
                  <span>•</span>
                  <span>Bunga: <strong className="text-white">{interestRate}%</strong></span>
                </div>
              </div>

              {/* Grid 2x2 Sangat Lega: Setiap kotak mendapat setengah lebar penuh kontainer (atau 1 kolom di HP) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch">
                {/* 1. Pinjaman Pokok */}
                <div className="rounded-2xl bg-white/5 p-6 sm:p-7 border border-white/15 backdrop-blur-md flex flex-col justify-between shadow-xl hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-300 font-bold">
                      Pinjaman Pokok
                    </p>
                    <span className="text-[11px] text-gray-400 font-medium px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                      Setelah dikurangi DP
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight leading-tight break-all sm:break-normal">
                    {formatCurrency(financedAmount)}
                  </p>
                </div>

                {/* 2. Cicilan per Bulan (VIP Highlight) */}
                <div className="rounded-2xl bg-gradient-to-br from-mazda-burgundy via-[#800A27] to-[#5A0718] p-6 sm:p-7 border border-white/25 shadow-2xl flex flex-col justify-between ring-2 ring-mazda-burgundy/50 transform md:-translate-y-1">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3.5 mb-4">
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Cicilan per Bulan
                    </p>
                    <span className="text-[11px] text-mazda-cyan font-bold px-2.5 py-0.5 rounded bg-black/30 border border-white/15">
                      Angsuran Rutin
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-mazda font-bold text-white tracking-tight leading-tight drop-shadow-md break-all sm:break-normal">
                    {formatCurrency(installment.monthly)}
                  </p>
                </div>

                {/* 3. Total Bunga */}
                <div className="rounded-2xl bg-white/5 p-6 sm:p-7 border border-white/15 backdrop-blur-md flex flex-col justify-between shadow-xl hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-300 font-bold">
                      Total Bunga
                    </p>
                    <span className="text-[11px] text-gray-400 font-medium px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                      Akumulasi Tenor
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight leading-tight break-all sm:break-normal">
                    {formatCurrency(installment.interest)}
                  </p>
                </div>

                {/* 4. Total Pembayaran */}
                <div className="rounded-2xl bg-white/5 p-6 sm:p-7 border border-white/15 backdrop-blur-md flex flex-col justify-between shadow-xl hover:border-white/30 transition-all">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                    <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-300 font-bold">
                      Total Pembayaran
                    </p>
                    <span className="text-[11px] text-gray-400 font-medium px-2.5 py-0.5 rounded bg-white/5 border border-white/10">
                      Pokok + Bunga
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight leading-tight break-all sm:break-normal">
                    {formatCurrency(installment.total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

