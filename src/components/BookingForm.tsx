'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Car, Inquiry } from '@/types/car'
import { Button } from './Button'
import { getStoredInquiries, saveInquiries } from '@/lib/storage'

interface BookingFormProps {
  car?: Car | null
  cars?: Car[]
}

const getInitialForm = () => ({
  name: '',
  email: '',
  phone: '',
  budget: '',
  message: '',
})

export function BookingForm({ car, cars }: BookingFormProps) {
  const resolvedCars = cars ?? []
  const [selectedCarId, setSelectedCarId] = useState(car?.id ?? '')
  const [formData, setFormData] = useState(getInitialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (car?.id) {
      setSelectedCarId(car.id)
    }
  }, [car?.id])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Silakan lengkapi nama, email, telepon, dan pesan Anda.')
      return
    }

    const selectedCar = resolvedCars.find((item) => item.id === selectedCarId)
    const inquiry: Inquiry = {
      id: Date.now().toString(),
      carId: selectedCar?.id,
      carName: selectedCar?.name ?? 'Konsultasi umum',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      budget: formData.budget,
      message: formData.message,
      createdAt: new Date().toISOString(),
      status: 'Baru',
    }

    const existingInquiries = getStoredInquiries()
    saveInquiries([inquiry, ...existingInquiries])

    setSubmitted(true)
    setFormData(getInitialForm())
    setSelectedCarId(car?.id ?? '')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {resolvedCars.length > 0 && (
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
            Pilihan Kendaraan Impian
          </label>
          <select
            value={selectedCarId}
            onChange={(event) => setSelectedCarId(event.target.value)}
            className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm font-semibold text-mazda-charcoal outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all cursor-pointer"
          >
            <option value="">-- Pilih Kendaraan atau Konsultasi Umum --</option>
            {resolvedCars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.model}) - Rp {new Intl.NumberFormat('id-ID').format(item.price)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
            Nama Lengkap <span className="text-mazda-burgundy">*</span>
          </label>
          <input
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm text-mazda-charcoal placeholder-mazda-steel-gray outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium"
            placeholder="Contoh: Arief Budiman"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
            Alamat Email <span className="text-mazda-burgundy">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm text-mazda-charcoal placeholder-mazda-steel-gray outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium"
            placeholder="arief@domain.com"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
            Nomor Telepon / WhatsApp <span className="text-mazda-burgundy">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm text-mazda-charcoal placeholder-mazda-steel-gray outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium"
            placeholder="0812 3456 7890"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
            Estimasi Anggaran (Opsional)
          </label>
          <input
            value={formData.budget}
            onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
            className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm text-mazda-charcoal placeholder-mazda-steel-gray outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all font-medium"
            placeholder="Contoh: Rp 2.5 Miliar / DP Rp 500 Juta"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-mazda-charcoal mb-2">
          Catatan atau Kebutuhan Khusus <span className="text-mazda-burgundy">*</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="w-full rounded-xl border border-mazda-border-gray bg-mazda-light-gray/40 px-4 py-3.5 text-sm text-mazda-charcoal placeholder-mazda-steel-gray outline-none focus:bg-white focus:border-mazda-burgundy focus:ring-4 focus:ring-mazda-burgundy/10 transition-all min-h-[140px] font-medium leading-relaxed"
          placeholder="Jelaskan kebutuhan Anda, misalnya: ingin test drive Ferrari F8 hari Sabtu jam 10 pagi, atau ingin konsultasi skema leasing balon dengan bunga termurah."
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-xs sm:text-sm text-red-700 flex items-center gap-3 animate-slide-in-up">
          <span className="text-lg">⚠️</span>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {submitted && (
        <div className="rounded-2xl border border-green-300 bg-green-50 p-5 text-xs sm:text-sm text-green-800 flex items-start gap-3 animate-slide-in-up shadow-sm">
          <span className="text-xl">🎉</span>
          <div>
            <p className="font-mazda font-bold text-green-900 text-base">Permintaan Reservasi Berhasil Terkirim!</p>
            <p className="mt-1 leading-relaxed">
              Penasihat otomotif VIP kami telah menerima data Anda dan akan segera menghubungi via WhatsApp/Telepon untuk mengonfirmasi jadwal.
            </p>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" variant="primary" size="lg" className="w-full py-4 text-base shadow-glow">
          Kirim Permintaan Reservasi VIP →
        </Button>
      </div>
    </form>
  )
}
