import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="max-w-xl rounded-3xl border border-mazda-border-gray bg-white p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-mazda-burgundy font-semibold">404</p>
        <h1 className="text-4xl font-mazda font-bold text-mazda-black mt-4">Halaman tidak ditemukan</h1>
        <p className="text-mazda-steel-gray mt-4">Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia lagi.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-mazda-burgundy px-5 py-3 text-white font-semibold">Kembali ke beranda</Link>
          <Link href="/catalog" className="rounded-md border border-mazda-border-gray px-5 py-3 font-semibold text-mazda-charcoal">Lihat katalog</Link>
        </div>
      </div>
    </div>
  )
}
