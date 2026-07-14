'use client'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-mazda-dark-charcoal to-mazda-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h4 className="text-h4 font-mazda font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-mazda-burgundy to-mazda-cyan">
              SPPM
            </h4>
            <p className="text-body text-mazda-steel-gray leading-relaxed">
              Platform premium penjualan kendaraan mewah dengan standar internasional dan layanan excellence.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-mazda-steel-gray hover:text-mazda-burgundy transition-colors text-sm font-bold">
                Facebook
              </a>
              <a href="#" className="text-mazda-steel-gray hover:text-mazda-burgundy transition-colors text-sm font-bold">
                Instagram
              </a>
              <a href="#" className="text-mazda-steel-gray hover:text-mazda-burgundy transition-colors text-sm font-bold">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-h5 font-mazda font-bold mb-6">Navigasi</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Beranda</a></li>
              <li><a href="/catalog" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Katalog</a></li>
              <li><a href="/booking" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Booking & Konsultasi</a></li>
              <li><a href="/about" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Tentang Kami</a></li>
              <li><a href="/admin" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Panel Admin</a></li>
              <li><a href="/contact" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-h5 font-mazda font-bold mb-6">Informasi</h4>
            <ul className="space-y-3">
              <li><a href="/faq" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">FAQ</a></li>
              <li><a href="/privacy" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Kebijakan Privasi</a></li>
              <li><a href="/terms" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Syarat & Ketentuan</a></li>
              <li><a href="/contact" className="text-mazda-steel-gray hover:text-white transition-colors font-medium">Garansi & Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-h5 font-mazda font-bold mb-6">Hubungi Kami</h4>
            <div className="space-y-4">
              <div>
                <p className="text-mazda-steel-gray text-sm mb-1">Telepon</p>
                <a href="tel:+628001234567" className="text-white font-bold hover:text-mazda-burgundy transition-colors">
                  +62 800 1234 567
                </a>
              </div>
              <div>
                <p className="text-mazda-steel-gray text-sm mb-1">Email</p>
                <a href="mailto:info@sppm.com" className="text-white font-bold hover:text-mazda-burgundy transition-colors">
                  info@sppm.com
                </a>
              </div>
              <div>
                <p className="text-mazda-steel-gray text-sm mb-1">Alamat</p>
                <p className="text-white font-bold">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-mazda-charcoal pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body text-mazda-steel-gray text-center md:text-left">
              &copy; 2024 SPPM. Semua hak dilindungi. Diinspirasi oleh filosofi desain Mazda yang elegan.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-mazda-steel-gray hover:text-mazda-burgundy text-sm transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-mazda-steel-gray hover:text-mazda-burgundy text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
