'use client'

'use client'

import Link from 'next/link'
import { BookingForm } from '@/components/BookingForm'
import { getStoredCars } from '@/lib/storage'

export default function Contact() {
  const carsData = getStoredCars()

  return (
    <div className="w-full bg-[#F8F9FA]">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-mazda-cyan mb-4">Hubungi tim SPPM</p>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mb-4">Kami siap membantu Anda menemukan mobil impian</h1>
          <p className="max-w-3xl text-lg text-mazda-light-gray leading-relaxed">
            Apapun kebutuhan Anda—konsultasi, test drive, atau detail pembiayaan—tim kami siap merespons dengan layanan personal yang cepat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Informasi kontak</h2>
            <div className="space-y-5 text-mazda-steel-gray">
              <div>
                <h3 className="font-semibold text-mazda-charcoal">📍 Alamat showroom</h3>
                <p>Jl. Merdeka No. 123, Jakarta Pusat, 12190, Indonesia</p>
              </div>
              <div>
                <h3 className="font-semibold text-mazda-charcoal">📞 Telepon</h3>
                <p>+62 800 1234 5678</p>
              </div>
              <div>
                <h3 className="font-semibold text-mazda-charcoal">📧 Email</h3>
                <p>info@sppm.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-mazda-charcoal">🕐 Jam operasional</h3>
                <p>Senin - Jumat: 09.00 - 18.00<br />Sabtu: 10.00 - 17.00</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-mazda font-bold mb-4">Butuh bantuan lebih cepat?</h2>
            <p className="text-mazda-steel-gray mb-4">Anda bisa langsung mengirim permintaan booking atau konsultasi untuk kendaraan yang Anda minati.</p>
            <Link href="/booking" className="inline-flex items-center rounded-md bg-mazda-burgundy px-5 py-3 text-white font-semibold">
              Lanjut ke booking
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-mazda font-bold mb-2">Formulir konsultasi</h2>
          <p className="text-mazda-steel-gray mb-6">Isi kebutuhan Anda, dan kami akan menghubungi Anda dengan opsi terbaik.</p>
          <BookingForm cars={carsData} />
        </div>
      </div>
    </div>
  )
}
