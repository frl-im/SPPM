import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-[#121417] via-[#1A1D20] to-[#0E0F10] flex items-center justify-center px-4 py-20 relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mazda-burgundy/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10 sm:p-14 text-center shadow-2xl relative z-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-mazda-burgundy/20 border border-mazda-burgundy text-mazda-cyan text-xs font-mazda font-bold uppercase tracking-[0.3em]">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-mazda font-bold text-white mt-5">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-300 text-sm sm:text-base mt-3 font-light leading-relaxed">
          Halaman atau spesifikasi unit yang Anda cari mungkin telah dipindahkan, diperbarui, atau sudah tidak tersedia dalam katalog aktif showroom kami.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
          <Link
            href="/"
            className="rounded-xl bg-mazda-burgundy px-6 py-3.5 text-xs sm:text-sm font-mazda font-bold text-white shadow-glow hover:bg-mazda-red transition-all"
          >
            Kembali ke Beranda VIP
          </Link>
          <Link
            href="/catalog"
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-mazda font-bold text-white hover:bg-white/10 transition-all"
          >
            Jelajahi Katalog Supercar
          </Link>
        </div>
      </div>
    </div>
  )
}
