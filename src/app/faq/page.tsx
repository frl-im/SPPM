export default function FAQPage() {
  const faqs = [
    {
      question: 'Apakah saya bisa melakukan booking tanpa datang ke showroom?',
      answer: 'Ya, Anda bisa mengisi formulir reservasi secara online dan tim penasihat senior kami akan segera menghubungi via WhatsApp atau telepon untuk memandu setiap langkah berikutnya dengan kenyamanan maksimal.',
    },
    {
      question: 'Apakah tersedia opsi pembiayaan fleksibel dan bunga kompetitif?',
      answer: 'Kami bekerja sama secara eksklusif dengan lembaga pembiayaan premium terkemuka untuk menghadirkan skema cicilan fleksibel, bunga spesial yang sangat kompetitif, serta skema leasing balon yang disesuaikan dengan portofolio keuangan Anda.',
    },
    {
      question: 'Apakah mobil yang tampil di katalog tersedia langsung di showroom?',
      answer: 'Ketersediaan unit supercar dan luxury sedan bergerak sangat dinamis. Tim concierge kami selalu melakukan verifikasi ketersediaan dan kesiapan fisik unit sebelum sesi janji temu atau inspeksi privat Anda dimulai.',
    },
    {
      question: 'Bagaimana jika saya ingin melakukan komparasi beberapa kendaraan sekaligus?',
      answer: 'Dengan senang hati. Kami dapat mengatur sesi private inspection di lounge VIP kami, atau menghadirkan langsung beberapa unit kendaraan pilihan ke kediaman maupun kantor Anda untuk pengujian dan perbandingan menyeluruh.',
    },
  ]

  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Cinematic Dark */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
            Pusat Informasi
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
            Pertanyaan yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Sering Diajukan</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Semua informasi esensial seputar prosedur pembelian, transparansi inspeksi unit 150+ poin, opsi pembiayaan privat, serta layanan purna jual SPPM.
          </p>
        </div>
      </section>

      {/* Main FAQ List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-mazda-border-gray/80 bg-white p-7 sm:p-9 shadow-premium hover:border-mazda-burgundy/40 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-mazda-burgundy/10 text-mazda-burgundy font-mazda font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-mazda-burgundy group-hover:text-white transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-mazda font-bold text-mazda-charcoal mb-3 group-hover:text-mazda-burgundy transition-colors">
                  {item.question}
                </h2>
                <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Contact Concierge Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black p-8 sm:p-12 text-center text-white border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-mazda-burgundy/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-cyan font-mazda font-bold block mb-3">
              Masa Depan Otomotif
            </span>
            <h3 className="text-2xl sm:text-3xl font-mazda font-bold text-white mb-3">
              Punya Pertanyaan Lain atau Kebutuhan Khusus?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-8 leading-relaxed font-light">
              Tim penasihat otomotif senior kami siap berdiskusi secara privat mengenai spesifikasi langka maupun penyesuaian pesanan khusus Anda.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-mazda-burgundy px-7 py-4 text-xs font-mazda font-bold text-white shadow-glow hover:bg-mazda-red transition-all"
            >
              <span>Hubungi Concierge VIP SPPM</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
