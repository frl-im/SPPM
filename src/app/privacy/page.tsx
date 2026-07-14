export default function PrivacyPage() {
  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Cinematic Dark */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
            Perlindungan Data
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
            Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Privasi VIP</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Kami menjaga kerahasiaan dan keamanan data pribadi serta portofolio kepemilikan kendaraan Anda dengan standar proteksi enkripsi tertinggi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-8 sm:p-12 shadow-premium space-y-8">
          <div>
            <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mb-4">Komitmen Kerahasiaan Klien</h2>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              SPPM menghormati penuh privasi dan eksklusivitas setiap klien kami. Kami hanya mengumpulkan informasi yang esensial untuk memproses konsultasi, mengatur jadwal test drive privat, verifikasi kelayakan pembiayaan, serta pengurusan dokumen kepemilikan resmi kendaraan.
            </p>
          </div>

          <div className="pt-6 border-t border-mazda-border-gray/60">
            <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-3">Penggunaan dan Proteksi Informasi</h3>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Seluruh data identitas, kontak, dan riwayat ketertarikan unit yang Anda kirimkan dikelola dalam sistem database aman berlapis. Informasi Anda tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga non-otoritas tanpa persetujuan tertulis eksplisit dari Anda, kecuali diwajibkan oleh ketentuan perundang-undangan yang berlaku di Republik Indonesia.
            </p>
          </div>

          <div className="pt-6 border-t border-mazda-border-gray/60">
            <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-3">Hak Klien atas Data</h3>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Anda berhak penuh untuk meminta peninjauan, pembaruan, maupun penghapusan riwayat data reservasi atau pertanyaan konsultasi Anda dari sistem kami kapan saja dengan menghubungi tim Concierge VIP SPPM.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
