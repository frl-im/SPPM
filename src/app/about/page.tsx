'use client'

export default function About() {
  return (
    <div className="w-full bg-mazda-light-gray/50 min-h-screen pb-24">
      {/* Page Header - Cinematic Dark */}
      <section className="relative bg-gradient-to-r from-[#121417] via-[#1A1D20] to-[#0E0F10] text-white py-24 border-b border-mazda-burgundy/30 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mazda-burgundy/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-mazda-cyan text-xs font-mazda font-bold tracking-[0.25em] uppercase mb-4 border border-white/15">
            Tentang Perusahaan
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-mazda font-bold mb-6 tracking-tight text-white">
            SPPM <span className="text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-mazda-burgundy">Supercar & Luxury</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Kurator kedai otomotif premium terdepan di Indonesia. Melayani dengan integritas, kepresisian kelas dunia, dan fokus eksklusif pada kepuasan portofolio pelanggan sejak dekade pertama.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-16">
        {/* Who We Are */}
        <section className="rounded-3xl border border-mazda-border-gray/80 bg-white p-8 sm:p-12 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold block">
              Warisan & Dedikasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-mazda font-bold text-mazda-charcoal tracking-tight">
              Kurasi Eksklusif Koleksi Kendaraan Kelas Dunia
            </h2>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              SPPM adalah entitas penjualan mobil mewah terkemuka yang dipercaya oleh kolektor dan eksekutif papan atas. Kami berdedikasi menghadirkan unit-unit supercar, luxury sedan, dan high-performance SUV terbaik dengan standar inspeksi terlengkap.
            </p>
            <p className="text-mazda-medium-gray text-sm sm:text-base leading-relaxed font-light">
              Didukung oleh tim mekanik tersertifikasi, penasihat finansial berpengalaman, serta jaringan showroom eksklusif, setiap kendaraan yang melintas dari pintu SPPM adalah jaminan kesempurnaan.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-2xl border border-mazda-border-gray/70 bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black h-80 sm:h-96 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-mazda-burgundy/20 via-transparent to-transparent opacity-60" />
            <div className="relative z-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-mazda-burgundy/20 border border-mazda-burgundy text-mazda-cyan flex items-center justify-center mx-auto text-2xl shadow-glow">
                🏛️
              </div>
              <h3 className="text-xl font-mazda font-bold text-white">Showroom Flagship VIP</h3>
              <p className="text-xs text-gray-400 max-w-xs font-light">
                Fasilitas lounge privat dengan standar keramahan hotel bintang lima untuk kenyamanan inspeksi Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-gradient-to-br from-mazda-burgundy via-[#700822] to-[#4A0516] text-white p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-cyan/80 font-mazda font-bold block mb-3">
              Misi Perusahaan
            </span>
            <h3 className="text-2xl sm:text-3xl font-mazda font-bold mb-4">Standar Mutu Tanpa Kompromi</h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              Menyediakan unit kendaraan bersertifikasi resmi dengan transparansi riwayat mutlak, penawaran pembiayaan paling kompetitif, serta layanan purna jual paripurna demi kepuasan jangka panjang setiap klien.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#121417] via-[#1A1D20] to-mazda-black text-white p-8 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-mazda-burgundy/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-cyan/80 font-mazda font-bold block mb-3">
              Visi Masa Depan
            </span>
            <h3 className="text-2xl sm:text-3xl font-mazda font-bold mb-4">Destinasi Utama Otomotif Luxury</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Menjadi acuan standar emas platform perdagangan mobil mewah di Asia Tenggara, di mana kepercayaan, teknologi, dan gairah otomotif menyatu dalam harmoni sempurna.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="rounded-3xl border border-mazda-border-gray/80 bg-white p-8 sm:p-12 shadow-premium">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-mazda-burgundy font-mazda font-bold block mb-2">
              Pilar Kebanggaan
            </span>
            <h2 className="text-3xl sm:text-4xl font-mazda font-bold text-mazda-charcoal tracking-tight">
              Komitmen Kualitas kepada Anda
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-mazda-light-gray/40 p-8 hover:bg-white hover:border-mazda-burgundy/40 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-mazda-border-gray flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                💎
              </div>
              <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-2.5">Integritas Transparan</h3>
              <p className="text-xs sm:text-sm text-mazda-medium-gray leading-relaxed font-light">
                Kami beroperasi dengan keterbukaan penuh atas riwayat kepemilikan, kondisi dokumen, dan hasil inspeksi fisik tanpa pengecualian.
              </p>
            </div>
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-mazda-light-gray/40 p-8 hover:bg-white hover:border-mazda-burgundy/40 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-mazda-border-gray flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-2.5">Concierge Pribadi</h3>
              <p className="text-xs sm:text-sm text-mazda-medium-gray leading-relaxed font-light">
                Setiap pelanggan didampingi penasihat pribadi yang mengurus seluruh detail administrasi, asuransi, hingga pengiriman unit tepat waktu.
              </p>
            </div>
            <div className="rounded-2xl border border-mazda-border-gray/70 bg-mazda-light-gray/40 p-8 hover:bg-white hover:border-mazda-burgundy/40 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-mazda-border-gray flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-mazda font-bold text-mazda-charcoal mb-2.5">Kurasi Tingkat Tinggi</h3>
              <p className="text-xs sm:text-sm text-mazda-medium-gray leading-relaxed font-light">
                Hanya kendaraan yang lolos uji kelayakan mekanikal dan estetik 150+ poin yang berhak mendapatkan emblem sertifikasi resmi SPPM.
              </p>
            </div>
          </div>
        </section>

        {/* Highlight Stats Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-[#121417] via-[#1A1D20] to-mazda-black p-10 sm:p-14 border border-mazda-burgundy/40 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#910A2D_1px,transparent_1px),linear-gradient(to_bottom,#910A2D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            <div className="p-4">
              <p className="text-4xl sm:text-5xl font-mazda font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-mazda-cyan mb-2">
                1,000+
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold">Kolektor & Pelanggan VIP</p>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-white/10">
              <p className="text-4xl sm:text-5xl font-mazda font-bold text-transparent bg-clip-text bg-gradient-to-r from-mazda-cyan via-white to-gray-200 mb-2">
                10+ Tahun
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold">Reputasi Otomotif Premium</p>
            </div>
            <div className="p-4">
              <p className="text-4xl sm:text-5xl font-mazda font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-mazda-burgundy mb-2">
                100%
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold">Garansi Keaslian & Legalitas</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
