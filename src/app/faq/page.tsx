export default function FAQPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <section className="bg-gradient-to-r from-mazda-black to-mazda-burgundy/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-mazda-cyan mb-4">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-mazda font-bold mb-4">Pertanyaan yang sering diajukan</h1>
          <p className="max-w-3xl text-lg text-mazda-light-gray leading-relaxed">Semua informasi umum terkait proses booking, pemilihan kendaraan, dan layanan pelanggan kami.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
        {[
          {
            question: 'Apakah saya bisa melakukan booking tanpa datang ke showroom?',
            answer: 'Ya, Anda bisa mengisi formulir booking secara online dan tim kami akan menghubungi Anda untuk langkah berikutnya.',
          },
          {
            question: 'Apakah tersedia opsi pembiayaan?',
            answer: 'Kami dapat membantu Anda mendapatkan opsi pembiayaan yang sesuai dengan kebutuhan dan budget Anda.',
          },
          {
            question: 'Apakah mobil yang tampil di katalog tersedia langsung?',
            answer: 'Ketersediaan unit bisa berubah, tetapi tim kami akan memastikan informasi terbaru sebelum Anda memutuskan.',
          },
          {
            question: 'Bagaimana jika saya ingin melihat beberapa kendaraan sebelum memutuskan?',
            answer: 'Kami dapat mengatur jadwal kunjungan showroom atau test drive berdasarkan preferensi Anda.',
          },
        ].map((item, index) => (
          <div key={index} className="rounded-2xl border border-mazda-border-gray bg-white p-8 shadow-sm">
            <h2 className="text-xl font-mazda font-bold text-mazda-black mb-2">{item.question}</h2>
            <p className="text-mazda-steel-gray leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
