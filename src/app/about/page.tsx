'use client'

export default function About() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-mazda-light-gray py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-display-lg text-mazda-black mb-2 font-mazda font-bold">
            Tentang SPPM
          </h1>
          <p className="text-body text-mazda-steel-gray">
            Penjualan mobil premium dengan standar kualitas tertinggi
          </p>
        </div>
      </section>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-h2 text-mazda-black mb-4 font-mazda font-bold">
                Siapa Kami?
              </h2>
              <p className="text-body text-mazda-steel-gray mb-4">
                SPPM adalah platform penjualan mobil premium terpercaya yang telah melayani ribuan pelanggan puas. Kami berkomitmen untuk menyediakan kendaraan berkualitas tinggi dengan layanan profesional dan transparan.
              </p>
              <p className="text-body text-mazda-steel-gray">
                Dengan pengalaman lebih dari satu dekade, kami memahami kebutuhan pelanggan dan berkomitmen untuk memberikan yang terbaik.
              </p>
            </div>
            <div className="bg-mazda-light-gray rounded-lg h-64 flex items-center justify-center">
              <p className="text-mazda-steel-gray">Gambar Tentang Kami</p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-mazda-burgundy text-white p-8 rounded-lg">
              <h3 className="text-h4 mb-4 font-mazda font-bold">Misi Kami</h3>
              <p className="text-body">
                Menyediakan kendaraan berkualitas premium dengan harga kompetitif dan layanan pelanggan yang luar biasa untuk memastikan kepuasan setiap pembeli.
              </p>
            </div>
            <div className="bg-mazda-dark-charcoal text-white p-8 rounded-lg">
              <h3 className="text-h4 mb-4 font-mazda font-bold">Visi Kami</h3>
              <p className="text-body">
                Menjadi platform penjualan mobil terdepan di Indonesia dengan reputasi tinggi dalam kualitas, layanan, dan kepercayaan pelanggan.
              </p>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-h2 text-mazda-black mb-8 font-mazda font-bold text-center">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-mazda-border-gray p-8 rounded-lg">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-h5 text-mazda-black mb-3 font-mazda font-bold">
                  Integritas
                </h3>
                <p className="text-body text-mazda-steel-gray">
                  Kami beroperasi dengan transparansi penuh dan integritas tinggi dalam setiap transaksi bisnis.
                </p>
              </div>
              <div className="bg-white border border-mazda-border-gray p-8 rounded-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-h5 text-mazda-black mb-3 font-mazda font-bold">
                  Fokus Pelanggan
                </h3>
                <p className="text-body text-mazda-steel-gray">
                  Kepuasan pelanggan adalah prioritas utama kami dalam setiap aspek bisnis.
                </p>
              </div>
              <div className="bg-white border border-mazda-border-gray p-8 rounded-lg">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-h5 text-mazda-black mb-3 font-mazda font-bold">
                  Inovasi
                </h3>
                <p className="text-body text-mazda-steel-gray">
                  Kami terus berinovasi untuk memberikan pengalaman terbaik dalam industri.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
