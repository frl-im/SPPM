'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Car, Inquiry } from '@/types/car'
import { Button } from './Button'
import { getStoredInquiries, saveInquiries } from '@/lib/storage'
import { carsData } from '@/data/cars'

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

export function BookingForm({ car, cars = carsData }: BookingFormProps) {
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

    const selectedCar = cars.find((item) => item.id === selectedCarId)
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {cars.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-mazda-charcoal mb-2">
            Mobil yang diminati
          </label>
          <select
            value={selectedCarId}
            onChange={(event) => setSelectedCarId(event.target.value)}
            className="input-field"
          >
            <option value="">Pilih mobil yang Anda minati</option>
            {cars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.model}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-mazda-charcoal mb-2">Nama lengkap</label>
          <input
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="input-field"
            placeholder="Masukkan nama Anda"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-mazda-charcoal mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            className="input-field"
            placeholder="contoh@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-mazda-charcoal mb-2">Nomor telepon</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            className="input-field"
            placeholder="08xxx"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-mazda-charcoal mb-2">Budget</label>
          <input
            value={formData.budget}
            onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
            className="input-field"
            placeholder="Contoh: Rp 800 juta"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-mazda-charcoal mb-2">Pesan / kebutuhan Anda</label>
        <textarea
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="input-field min-h-[120px]"
          placeholder="Ceritakan kebutuhan Anda, misalnya ingin test drive, ingin melihat opsi leasing, atau ingin mobil dengan warna tertentu."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {submitted && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Permintaan Anda berhasil tersimpan. Tim kami akan menghubungi Anda dalam waktu dekat.
        </div>
      )}

      <Button type="submit" variant="primary" size="md">
        Kirim Permintaan
      </Button>
    </form>
  )
}
