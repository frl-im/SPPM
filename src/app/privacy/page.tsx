export default function PrivacyPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-mazda-cyan mb-4">Kebijakan Privasi</p>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mb-4">Kami menjaga keamanan data pelanggan</h1>
          <p className="max-w-3xl text-lg text-mazda-light-gray leading-relaxed">Informasi yang Anda kirimkan akan digunakan hanya untuk keperluan layanan, konsultasi, dan komunikasi terkait kendaraan yang Anda minati.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
          <p className="text-mazda-steel-gray leading-relaxed">SPPM menghormati privasi Anda. Kami hanya mengumpulkan informasi yang diperlukan untuk memberikan layanan terbaik, seperti nama, email, nomor telepon, serta kebutuhan konsultasi Anda. Informasi ini tidak akan dibagikan ke pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.</p>
        </div>
      </div>
    </div>
  )
}
