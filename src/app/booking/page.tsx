import { BookingForm } from '@/components/BookingForm'
import { getStoredCars } from '@/lib/storage'

export default function BookingPage() {
  const carsData = getStoredCars()

  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Dark Cinematic */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mazda-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
              Layanan Concierge VIP
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
              Jadwalkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Konsultasi Eksklusif</span>
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              Isi formulir reservasi untuk meminta konsultasi privat, mengatur jadwal test drive supercar, atau mendapatkan penawaran finansial terbaik dari penasihat otomotif senior kami.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 grid gap-8 lg:grid-cols-[1.05fr_1.15fr] items-start">
        {/* Left Column: Benefits & Services */}
        <div className="space-y-6 sticky top-24">
          {/* Why Choose Card */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold block mb-2">
              Keunggulan Reservasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mb-6">
              Mengapa Memilih Layanan SPPM?
            </h2>
            <ul className="space-y-4 text-sm text-mazda-medium-gray">
              <li className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>
                  <strong className="text-mazda-black block font-semibold">Pendampingan Eksklusif 1-on-1</strong>
                  Tim konsultasi premium siap menemani proses kurasi dan perbandingan spesifikasi kendaraan sesuai portofolio Anda.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>
                  <strong className="text-mazda-black block font-semibold">Transparansi Penawaran & Kondisi</strong>
                  Dapatkan akses dokumen spesifikasi riil, riwayat servis resmi, serta skema pembiayaan leasing termurah tanpa biaya tersembunyi.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-mazda-burgundy/10 text-mazda-burgundy flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>
                  <strong className="text-mazda-black block font-semibold">Fleksibilitas Lokasi Test Drive</strong>
                  Kami dapat menghadirkan unit kendaraan pilihan langsung ke kediaman atau kantor Anda, maupun kunjungan privat ke showroom VIP.
                </span>
              </li>
            </ul>
          </div>

          {/* Available Services */}
          <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold block mb-2">
              Concierge Service
            </span>
            <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mb-6">
              Opsi Layanan Tersedia
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-mazda-light-gray/60 p-5 border border-mazda-border-gray/60 hover:border-mazda-burgundy/30 transition-all">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="font-mazda font-bold text-mazda-charcoal text-base mb-1">Konsultasi Privat</h3>
                <p className="text-xs text-mazda-steel-gray leading-relaxed">
                  Diskusi mendalam mengenai spesifikasi teknis dan pertimbangan finansial bersama expert kami.
                </p>
              </div>
              <div className="rounded-2xl bg-mazda-light-gray/60 p-5 border border-mazda-border-gray/60 hover:border-mazda-burgundy/30 transition-all">
                <div className="text-2xl mb-2">🏁</div>
                <h3 className="font-mazda font-bold text-mazda-charcoal text-base mb-1">VIP Test Drive</h3>
                <p className="text-xs text-mazda-steel-gray leading-relaxed">
                  Rasakan performa mesin, handling, serta kenyamanan kabin supercar pilihan secara langsung.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-10 shadow-premium">
          <div className="border-b border-mazda-border-gray/60 pb-5 mb-7">
            <span className="text-xs font-mazda font-bold text-mazda-cyan uppercase tracking-widest bg-mazda-black px-3 py-1 rounded-full text-white">
              Formulir Reservasi Resmi
            </span>
            <h2 className="text-2xl sm:text-3xl font-mazda font-bold text-mazda-charcoal mt-3">
              Jadwalkan Sesi Anda
            </h2>
            <p className="text-sm text-mazda-steel-gray mt-1">
              Lengkapi informasi di bawah ini. Tim concierge kami akan merespons dalam waktu kurang dari 30 menit.
            </p>
          </div>
          
          <BookingForm cars={carsData} />
        </div>
      </div>
    </div>
  )
}
