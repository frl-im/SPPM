export default function TermsPage() {
  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Cinematic Dark */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
            Legalitas & Aturan
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
            Syarat & <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Ketentuan Layanan</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Panduan hukum dan ketentuan resmi penggunaan platform, reservasi unit kendaraan, serta interaksi layanan dalam ekosistem SPPM.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-3xl border border-mazda-border-gray/80 bg-white p-8 sm:p-12 shadow-premium space-y-8">
          <div>
            <h2 className="text-2xl font-mazda font-bold text-mazda-charcoal mb-4">Ketentuan Umum Penggunaan Platform</h2>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Dengan mengakses dan berinteraksi di portal SPPM Supercars, Anda menyatakan setuju untuk tunduk pada seluruh ketentuan yang berlaku. Semua informasi spesifikasi teknis, kisaran harga OTR (On-The-Road), serta simulasi cicilan yang disajikan bersifat informatif dan dapat mengalami penyesuaian seiring kebijakan tarif pajak, fluktuasi mata uang, serta ketersediaan stok unit di showroom fisik kami.
            </p>
          </div>

          <div className="pt-6 border-t border-mazda-border-gray/60">
            <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-3">Reservasi & Booking Kendaraan</h3>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Pengisian formulir reservasi online maupun permintaan jadwal test drive tidak serta merta mengunci unit kendaraan sebelum dilakukan penandatanganan kesepakatan pemesanan resmi (Vehicle Order Agreement) dan pembayaran tanda jadi di showroom atau melalui rekening bank resmi SPPM.
            </p>
          </div>

          <div className="pt-6 border-t border-mazda-border-gray/60">
            <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-3">Intelektual & Hak Cipta</h3>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Seluruh materi visual, foto unit kurasi khusus, tipografi, dan aset branding yang terdapat dalam platform ini adalah hak milik intelektual SPPM. Penggunaan komersial maupun duplikasi tanpa izin tertulis dari manajemen SPPM adalah pelanggaran hukum.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
