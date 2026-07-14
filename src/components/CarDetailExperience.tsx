'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Car } from '@/types/car'

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

    .animate-slide-in-left {
      animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-slide-in-up {
      animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-scale-in {
      animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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

  return (
    <>
      <AnimationStyles />
      <div className="space-y-6">
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
                Pilih warna favorit Anda untuk melihat penyesuaian nuansa bodi kendaraan secara dinamis.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mazda-border-gray px-4 py-1.5 text-xs font-mazda font-bold text-mazda-charcoal bg-mazda-light-gray/80 self-start">
              <span
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span>{selectedColor.name}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {colorOptions.map((option) => {
              const isSelected = selectedColor.name === option.name
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedColor(option)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-mazda-burgundy bg-mazda-burgundy/10 shadow-md scale-[1.02]'
                      : 'border-mazda-border-gray/80 bg-mazda-light-gray/40 hover:border-mazda-burgundy/40 hover:bg-white'
                  }`}
                >
                  <span
                    className="h-8 w-8 rounded-full border-2 border-white shadow-md relative flex items-center justify-center"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && (
                      <span className="text-[10px] text-white font-bold drop-shadow">✓</span>
                    )}
                  </span>
                  <span>
                    <span className="block font-mazda font-bold text-xs text-mazda-charcoal">
                      {option.name}
                    </span>
                    <span className="block text-[11px] text-mazda-steel-gray">Cat Eksklusif</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray to-white p-6 animate-scale-in flex items-center justify-center">
              <div className="relative w-full h-[260px] sm:h-[320px] rounded-xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center shadow-inner">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-all duration-500"
                  style={{
                    filter: `hue-rotate(${selectedColor.hex === '#7A7A7A' ? 0 : selectedColor.name.includes('Yellow') ? 45 : selectedColor.name.includes('Red') ? -30 : selectedColor.name.includes('Black') ? 0 : 200}deg) saturate(1.1)`,
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay rounded-xl transition-colors duration-500"
                  style={{
                    backgroundColor: selectedColor.hex,
                    opacity: 0.1,
                  }}
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  Live Preview
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-6 sm:p-7 text-white animate-slide-in-left flex flex-col justify-between border border-white/10 shadow-xl">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold">
                  Karakter Warna
                </span>
                <h3 className="mt-2 text-2xl font-mazda font-bold text-white">{selectedColor.name}</h3>
                <p className="mt-3 text-xs text-gray-300 leading-relaxed font-light">
                  Lapisan cat premium dengan formulasi multi-layer ini memantulkan cahaya dengan indah dalam berbagai sudut pandang, menegaskan siluet tegas kendaraan Anda.
                </p>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span
                  className="h-6 w-6 rounded-full border-2 border-white/80 shadow-md flex-shrink-0"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div>
                  <p className="text-xs font-bold text-white">Sertifikat Warna Asli</p>
                  <p className="text-[11px] text-gray-400">Garansi ketahanan cat hingga 5 tahun</p>
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

          <div className="grid gap-5 md:grid-cols-3">
            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
              <span className="mb-2 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Uang Muka (DP)
              </span>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="10000000"
                  value={downPayment}
                  onChange={(event) => setDownPayment(Number(event.target.value || 0))}
                  className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3 text-sm font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all"
                />
              </div>
              <p className="mt-2 text-xs font-semibold text-mazda-burgundy">{formatCurrency(downPayment)}</p>
            </label>

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
              <span className="mb-2 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Tenor (Bulan)
              </span>
              <input
                type="number"
                min="1"
                max="120"
                value={tenor}
                onChange={(event) => setTenor(Number(event.target.value || 1))}
                className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3 text-sm font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all"
              />
              <p className="mt-2 text-xs font-semibold text-mazda-steel-gray">
                {tenor} Bulan ({Math.round((tenor / 12) * 10) / 10} Tahun)
              </p>
            </label>

            <label className="rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-mazda-light-gray/60 to-white p-5 hover:border-mazda-burgundy/40 transition-all group">
              <span className="mb-2 block text-xs font-mazda font-bold text-mazda-charcoal uppercase tracking-wider">
                Suku Bunga Tahunan
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={interestRate}
                onChange={(event) => setInterestRate(Number(event.target.value || 0))}
                className="w-full rounded-xl border border-mazda-border-gray bg-white px-4 py-3 text-sm font-bold text-mazda-charcoal outline-none focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all"
              />
              <p className="mt-2 text-xs font-semibold text-mazda-steel-gray">{interestRate.toFixed(1)}% / Tahun</p>
            </label>
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-6 sm:p-8 text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-mazda-burgundy/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold block mb-6">
                Estimasi Rincian Pembayaran
              </span>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Pinjaman Pokok</p>
                  <p className="mt-2 text-xl font-mazda font-bold text-white">{formatCurrency(financedAmount)}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-mazda-burgundy/80 to-[#5A0718] p-5 border border-white/20 shadow-lg">
                  <p className="text-[11px] uppercase tracking-wider text-white/90 font-semibold">Cicilan / Bulan</p>
                  <p className="mt-2 text-2xl font-mazda font-bold text-white">{formatCurrency(installment.monthly)}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Total Bunga</p>
                  <p className="mt-2 text-xl font-mazda font-bold text-white">{formatCurrency(installment.interest)}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 border border-white/10 backdrop-blur-md">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Total Pembayaran</p>
                  <p className="mt-2 text-xl font-mazda font-bold text-white">{formatCurrency(installment.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

