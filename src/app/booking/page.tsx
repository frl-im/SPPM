'use client'

import { BookingForm } from '@/components/BookingForm'
import { getStoredCars } from '@/lib/storage'

interface BookingPageProps {
  searchParams?: {
    car?: string
  }
}

export default function BookingPage({ searchParams }: BookingPageProps) {
  const carsData = getStoredCars()
  const selectedCar = carsData.find((car) => car.id === searchParams?.car) ?? null

  return (
    <div className="bg-[#F8F9FA]">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-mazda-cyan mb-4">Booking & Konsultasi</p>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mb-4">
            Jadwalkan konsultasi atau test drive Anda
          </h1>
          <p className="max-w-3xl text-lg text-mazda-light-gray leading-relaxed">
            Isi formulir di bawah ini untuk meminta informasi lebih lanjut, menjadwalkan test drive, atau mendapatkan penawaran terbaik untuk kendaraan impian Anda.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Kenapa memilih SPPM?</h2>
            <ul className="space-y-3 text-mazda-steel-gray">
              <li>• Tim konsultasi premium siap membantu Anda memilih kendaraan sesuai kebutuhan.</li>
              <li>• Dapatkan informasi lengkap terkait harga, warna, spesifikasi, dan opsi pembiayaan.</li>
              <li>• Test drive dan kunjungan showroom dapat diatur sesuai jadwal Anda.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Layanan yang tersedia</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <h3 className="font-semibold mb-2">Konsultasi mobil</h3>
                <p className="text-sm text-mazda-steel-gray">Pilih kendaraan yang paling cocok untuk gaya hidup dan budget Anda.</p>
              </div>
              <div className="rounded-lg bg-mazda-light-gray p-4">
                <h3 className="font-semibold mb-2">Test drive</h3>
                <p className="text-sm text-mazda-steel-gray">Jadwalkan pengalaman berkendara langsung di showroom atau lokasi yang Anda pilih.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-mazda font-bold mb-2">Formulir pemesanan</h2>
          <p className="text-mazda-steel-gray mb-6">
            Isi detail kebutuhan Anda dan kami akan menghubungi Anda secepatnya.
          </p>
          <BookingForm car={selectedCar} cars={carsData} />
        </div>
      </div>
    </div>
  )
}
