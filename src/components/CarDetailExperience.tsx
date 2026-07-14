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

    @keyframes carEnter {
      0% {
        opacity: 0;
        transform: scale(0.88) translateX(-35px);
        filter: brightness(1.4) blur(3px);
      }
      60% {
        opacity: 1;
        transform: scale(1.02) translateX(5px);
        filter: brightness(1.1) blur(0px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateX(0);
        filter: brightness(1) blur(0px);
      }
    }

    @keyframes colorScan {
      0% {
        left: -100%;
        opacity: 0.8;
      }
      100% {
        left: 200%;
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

    .animate-car-enter {
      animation: carEnter 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-color-scan {
      animation: colorScan 0.85s ease-out forwards;
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
      filter: 'sepia(0.6) saturate(3.5) hue-rotate(15deg) brightness(1.05) contrast(1.1)',
      overlayColor: '#FFD700',
      overlayOpacity: 0.32,
    }
  }
  if (name.includes('red') || name.includes('rosso') || hex === '#d40000' || hex === '#ff0000') {
    return {
      filter: 'sepia(0.6) saturate(4) hue-rotate(-35deg) brightness(0.95) contrast(1.15)',
      overlayColor: '#D40000',
      overlayOpacity: 0.35,
    }
  }
  if (name.includes('black') || name.includes('nero') || hex === '#1a1a1a' || hex === '#000000') {
    return {
      filter: 'grayscale(0.95) brightness(0.7) contrast(1.35)',
      overlayColor: '#0A0A0A',
      overlayOpacity: 0.45,
    }
  }
  if (name.includes('white') || name.includes('bianco') || hex === '#ffffff') {
    return {
      filter: 'grayscale(0.8) brightness(1.25) contrast(1.1)',
      overlayColor: '#FFFFFF',
      overlayOpacity: 0.25,
    }
  }
  if (name.includes('blue') || name.includes('blu')) {
    return {
      filter: 'sepia(0.5) saturate(3) hue-rotate(180deg) brightness(1.05) contrast(1.1)',
      overlayColor: '#0055FF',
      overlayOpacity: 0.32,
    }
  }

  // Default fallback menggunakan hex warna terpilih
  return {
    filter: 'saturate(1.4) contrast(1.1)',
    overlayColor: option.hex,
    overlayOpacity: 0.28,
  }
}

export function CarDetailExperience({ car }: CarDetailExperienceProps) {
  const colorOptions = car.colorOptions ?? [{ name: car.color, hex: '#7A7A7A' }]
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [downPayment, setDownPayment] = useState(Math.round(car.price * 0.2))
  const [tenor, setTenor] = useState(36)
  const [interestRate, setInterestRate] = useState(6.5)

  const financedAmount = Math.max(car.price - downPayment, 0)

  const installment = useMemo(
    () => calculateInstallment(financedAmount, interestRate, tenor),
    [financedAmount, interestRate, tenor],
  )

  const colorEffect = getColorFilterStyle(selectedColor)

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
                Pilih warna favorit Anda untuk melihat penyesuaian nuansa bodi kendaraan dan animasi masuk secara dinamis.
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
          <div className="mt-6 flex flex-wrap gap-3">
            {colorOptions.map((option) => {
              const isSelected = selectedColor.name === option.name
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedColor(option)}
                  className={`flex items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-mazda-burgundy bg-mazda-burgundy/10 shadow-md scale-[1.03] ring-2 ring-mazda-burgundy/20'
                      : 'border-mazda-border-gray/80 bg-mazda-light-gray/40 hover:border-mazda-burgundy/40 hover:bg-white hover:scale-[1.01]'
                  }`}
                >
                  <span
                    className="h-8 w-8 rounded-full border-2 border-white shadow-md relative flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && (
                      <span className="text-[11px] text-white font-bold drop-shadow">✓</span>
                    )}
                  </span>
                  <span>
                    <span className="block font-mazda font-bold text-xs text-mazda-charcoal">
                      {option.name}
                    </span>
                    <span className="block text-[11px] text-mazda-steel-gray font-light">Cat Eksklusif</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Car Entrance & Preview */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-mazda-border-gray/70 bg-gradient-to-br from-[#121417] via-[#1A1D20] to-[#0E0F10] p-6 sm:p-8 flex items-center justify-center relative shadow-xl">
              {/* Ambient Showroom Floor Glow reflecting selected color */}
              <div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[85%] h-[160px] rounded-full blur-[65px] transition-all duration-700 pointer-events-none opacity-60"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Dynamic Car Container keyed to trigger entrance animation every time a color is clicked */}
              <div
                key={selectedColor.name}
                className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden flex items-center justify-center animate-car-enter"
              >
                {/* Base Car Photo with color matching filter */}
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover"
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
                    opacity: 0.22,
                  }}
                />

                {/* High-Tech Laser Scan Animation when entering */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-color-scan"
                  />
                </div>

                {/* Badge Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-[11px] font-mazda font-bold shadow-lg">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span>Live Color Transition</span>
                </div>
              </div>
            </div>

            {/* Color Character Card */}
            <div
              key={`desc-${selectedColor.name}`}
              className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-7 sm:p-8 text-white animate-slide-in-left flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-mazda-burgundy/15 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold">
                    Karakter Warna
                  </span>
                  <span className="text-xs font-mono text-gray-400 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                    {selectedColor.hex}
                  </span>
                </div>
                <h3 className="mt-3 text-3xl font-mazda font-bold text-white tracking-tight">{selectedColor.name}</h3>
                <p className="mt-4 text-sm text-gray-300 leading-relaxed font-light">
                  Lapisan cat eksklusif dengan formulasi multi-layer ini memberikan pantulan cahaya dramatis di setiap lekukan bodi aerodynamic supercar Anda. Dirancang dengan teknologi proteksi UV berlapis dan kejernihan kristal premium.
                </p>
              </div>

              <div className="mt-8 relative z-10 p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 backdrop-blur-sm">
                <span
                  className="h-9 w-9 rounded-full border-2 border-white/80 shadow-lg flex-shrink-0"
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
            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
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

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
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

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
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

          {/* Estimasi Rincian Pembayaran - Clean & Spacious Layout */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-6 sm:p-8 lg:p-10 text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mazda-burgundy/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/15">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-mazda-cyan font-mazda font-bold block mb-1">
                    Simulasi Finansial
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-mazda font-bold text-white tracking-tight">
                    Estimasi Rincian Pembayaran
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                  <span>Tenor: <strong className="text-white">{tenor} Bln</strong></span>
                  <span>•</span>
                  <span>Bunga: <strong className="text-white">{interestRate}%</strong></span>
                </div>
              </div>

              {/* Responsive & Spacious 4-Column Grid with zero clipping/overflow */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-md flex flex-col justify-between min-w-0 overflow-hidden shadow-lg hover:border-white/25 transition-all">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-300 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      Pinjaman Pokok
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">Setelah dikurangi DP</p>
                  </div>
                  <p className="mt-5 text-xl sm:text-2xl font-mazda font-bold text-white break-words tracking-tight">
                    {formatCurrency(financedAmount)}
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-mazda-burgundy via-[#800A27] to-[#5A0718] p-6 border border-white/20 shadow-xl flex flex-col justify-between min-w-0 overflow-hidden ring-2 ring-mazda-burgundy/40 transform lg:-translate-y-1">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      Cicilan per Bulan
                    </p>
                    <p className="text-[11px] text-mazda-cyan mt-1 font-semibold">Estimasi angsuran rutin</p>
                  </div>
                  <p className="mt-5 text-2xl sm:text-3xl font-mazda font-bold text-white break-words tracking-tight drop-shadow">
                    {formatCurrency(installment.monthly)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-md flex flex-col justify-between min-w-0 overflow-hidden shadow-lg hover:border-white/25 transition-all">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-300 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      Total Bunga
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">Akumulasi selama tenor</p>
                  </div>
                  <p className="mt-5 text-xl sm:text-2xl font-mazda font-bold text-white break-words tracking-tight">
                    {formatCurrency(installment.interest)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-6 border border-white/10 backdrop-blur-md flex flex-col justify-between min-w-0 overflow-hidden shadow-lg hover:border-white/25 transition-all">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-300 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      Total Pembayaran
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">Keseluruhan cicilan</p>
                  </div>
                  <p className="mt-5 text-xl sm:text-2xl font-mazda font-bold text-white break-words tracking-tight">
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

