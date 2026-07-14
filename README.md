# 🚗 SPPM - Penjualan Mobil Premium

Website penjualan mobil premium terinspirasi dari design system Mazda yang elegan dan modern.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Struktur Proyek](#struktur-proyek)
- [Cara Menambahkan Data Mobil](#cara-menambahkan-data-mobil)
- [Customisasi](#customisasi)

## ✨ Fitur

- ✅ Desain premium terinspirasi dari Mazda
- ✅ Responsive dan mobile-friendly
- ✅ Katalog mobil dengan filter pencarian
- ✅ Halaman detail mobil
- ✅ Formulir kontak
- ✅ Tentang perusahaan
- ✅ TypeScript untuk type safety
- ✅ Tailwind CSS untuk styling

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **Font:** MazdaType (fallback: System fonts)
- **Color Palette:** Mazda Design System

## 📦 Instalasi

### Prerequisites

- Node.js 18+ (https://nodejs.org/)
- npm atau yarn

### Steps

1. **Clone atau buka project di VS Code**

```bash
# Buka folder c:\SPPM di VS Code
```

2. **Instalasi dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup font MazdaType (opsional)**

Jika Anda memiliki file font MazdaType:
- Letakkan file font di folder `public/fonts/`
- Update reference di `tailwind.config.js` jika diperlukan

## 🚀 Cara Menjalankan

### Development Mode

```bash
npm run dev
# atau
yarn dev
```

Buka browser dan akses: http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## 📁 Struktur Proyek

```
SPPM/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout utama
│   │   ├── page.tsx             # Halaman beranda
│   │   ├── globals.css          # CSS global
│   │   ├── catalog/
│   │   │   └── page.tsx         # Halaman katalog
│   │   ├── about/
│   │   │   └── page.tsx         # Halaman tentang
│   │   └── contact/
│   │       └── page.tsx         # Halaman kontak
│   ├── components/
│   │   ├── Button.tsx           # Komponen button
│   │   ├── Header.tsx           # Header/navbar
│   │   ├── Footer.tsx           # Footer
│   │   └── CarCard.tsx          # Card mobil
│   ├── types/
│   │   └── car.ts               # Type definitions
│   ├── data/
│   │   └── cars.ts              # Data mobil
│   └── constants/
│       └── (placeholder)
├── public/
│   ├── fonts/                   # Font files
│   └── images/                  # Gambar mobil
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── package.json
```

## 📝 Cara Menambahkan Data Mobil

Data mobil disimpan di file `src/data/cars.ts`. Ikuti format berikut:

```typescript
import { Car } from '@/types/car'

export const carsData: Car[] = [
  {
    id: '1',
    name: 'Mazda 3',
    model: '2024',
    year: 2024,
    price: 350000000,
    image: '/images/mazda3.jpg',
    description: 'Compact sedan dengan premium features',
    category: 'Sedan',
    color: 'Black Pearl',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 0,
    features: ['Leather Seats', 'Navigation System', 'Sunroof'],
    rating: 4.5,
    reviews: 128
  },
  // Tambahkan lebih banyak mobil di sini
]
```

### Tipe Data Car

```typescript
interface Car {
  id: string
  name: string
  model: string
  year: number
  price: number
  image: string
  description: string
  category: string
  color: string
  transmission: 'Manual' | 'Automatic'
  fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
  mileage: number
  features: string[]
  rating: number
  reviews: number
}
```

## 🎨 Customisasi

### Warna Mazda Design System

Edit `tailwind.config.js` untuk mengubah warna:

```javascript
colors: {
  'mazda-charcoal': '#212529',      // Primary text
  'mazda-black': '#0E0F10',         // Deep black
  'mazda-burgundy': '#910A2D',      // Accent
  'mazda-steel-gray': '#B5B6B6',    // Secondary
  'mazda-blue': '#0D6EFD',          // Interactive
  'mazda-success': '#198754',
  'mazda-error': '#DC3545',
  'mazda-warning': '#FFC107',
  // ... lebih banyak warna
}
```

### Typography

Ukuran font dan line-height sudah dikonfigurasi sesuai design system:

```javascript
fontSize: {
  'display-lg': ['49.5px', { lineHeight: '59.4px' }],
  'h2': ['32px', { lineHeight: '38.4px' }],
  'h3': ['28px', { lineHeight: '33.6px' }],
  'body': ['15.2px', { lineHeight: '22.8px' }],
  // ...
}
```

### Font Fallback

Jika font MazdaType tidak tersedia, sistem akan menggunakan fallback fonts:

```css
font-mazda: 'MazdaType', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue'
```

## 📚 Halaman Tersedia

- **Beranda** (`/`) - Landing page dengan featured cars
- **Katalog** (`/catalog`) - Daftar lengkap mobil dengan filter
- **Tentang** (`/about`) - Informasi tentang perusahaan
- **Kontak** (`/contact`) - Form hubungi kami
- **Detail Mobil** (`/car/:id`) - Detail spesifik mobil (akan ditambahkan)

## 🔧 Konfigurasi Lingkungan

Buat file `.env.local` di root project jika diperlukan API calls:

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📞 Support

Untuk bantuan atau pertanyaan, silakan hubungi tim development.

## 📄 License

© 2024 SPPM. All rights reserved.

---

**Catatan:** Website ini terinspirasi dari Mazda Design System dan menggunakan filosofi desain minimalis Jepang yang elegan.
