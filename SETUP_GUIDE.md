# 📋 Panduan Setup & Penambahan Data Mobil

Dokumen ini menjelaskan cara melengkapi website SPPM dengan data mobil Anda.

## 🚀 Quick Start

### 1. Instalasi Project

```bash
# Navigasi ke folder project
cd c:\SPPM

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka http://localhost:3000 di browser
```

### 2. Tambahkan Data Mobil

Edit file: `src/data/cars.ts`

Ganti array kosong dengan data mobil Anda:

```typescript
import { Car } from '@/types/car'

export const carsData: Car[] = [
  {
    id: '1',
    name: 'Toyota Fortuner',
    model: 'TRD 4.0',
    year: 2024,
    price: 495000000,
    image: '/images/toyota-fortuner.jpg',
    description: 'SUV 7 seater dengan performa powerful dan interior premium',
    category: 'SUV',
    color: 'Pearl White',
    transmission: 'Automatic',
    fuel: 'Diesel',
    mileage: 0,
    features: [
      'Leather Seats',
      'Navigation System',
      '360 Camera',
      'Sunroof',
      'Power Seats',
      'Climate Control'
    ],
    rating: 4.8,
    reviews: 245
  },
  // Tambahkan data mobil lain di sini
]
```

## 📸 Tambahkan Gambar Mobil

1. **Buat folder untuk gambar:**
   - Buat folder `public/images/` jika belum ada

2. **Letakkan gambar mobil:**
   - Format: JPG atau PNG
   - Resolusi minimal: 400x300px
   - Nama file: gunakan lowercase tanpa spasi, contoh: `mazda-cx5.jpg`

3. **Update path di data:**
   ```typescript
   image: '/images/mazda-cx5.jpg'
   ```

## 📝 Contoh Data Lengkap

### Contoh 1: Sedan Luxury

```typescript
{
  id: '2',
  name: 'BMW 320i',
  model: 'F30',
  year: 2023,
  price: 580000000,
  image: '/images/bmw-320i.jpg',
  description: 'Sedan premium Eropa dengan teknologi terkini dan keselamatan maksimal',
  category: 'Sedan',
  color: 'Midnight Black',
  transmission: 'Automatic',
  fuel: 'Petrol',
  mileage: 5000,
  features: [
    'M Sport Package',
    'Leather Interior',
    'iDrive System',
    'Keyless Entry',
    'Adaptive Headlights',
    'Park Assist'
  ],
  rating: 4.7,
  reviews: 189
}
```

### Contoh 2: Hatchback Ekonomis

```typescript
{
  id: '3',
  name: 'Honda Jazz',
  model: 'RS',
  year: 2024,
  price: 265000000,
  image: '/images/honda-jazz.jpg',
  description: 'Hatchback reliable dengan desain modern dan fuel efficiency tinggi',
  category: 'Hatchback',
  color: 'Radiant Red',
  transmission: 'Automatic',
  fuel: 'Petrol',
  mileage: 0,
  features: [
    'Honda Sensing',
    'Touchscreen Display',
    'Bluetooth',
    'Rear Camera',
    'Smart Entry'
  ],
  rating: 4.5,
  reviews: 312
}
```

### Contoh 3: SUV Modern

```typescript
{
  id: '4',
  name: 'Mazda CX-5',
  model: 'Turbo',
  year: 2024,
  price: 420000000,
  image: '/images/mazda-cx5.jpg',
  description: 'SUV bertenaga dengan desain elegan dan teknologi Mazda terdepan',
  category: 'SUV',
  color: 'Soul Red',
  transmission: 'Automatic',
  fuel: 'Petrol',
  mileage: 0,
  features: [
    'i-Activsense Safety Suite',
    'Power Liftgate',
    'Leather Seats',
    'Panoramic Sunroof',
    'Bose Audio System',
    'Electronic Brake Force Distribution'
  ],
  rating: 4.9,
  reviews: 428
}
```

## 🔑 Penjelasan Field

| Field | Tipe | Keterangan | Contoh |
|-------|------|-----------|--------|
| `id` | string | ID unik mobil | `'1'` |
| `name` | string | Nama/Brand mobil | `'Toyota Fortuner'` |
| `model` | string | Model mobil | `'TRD 4.0'` |
| `year` | number | Tahun produksi | `2024` |
| `price` | number | Harga dalam IDR | `495000000` |
| `image` | string | Path ke gambar | `'/images/toyota-fortuner.jpg'` |
| `description` | string | Deskripsi singkat | `'SUV 7 seater...'` |
| `category` | string | Kategori mobil | `'SUV'`, `'Sedan'`, `'Hatchback'` |
| `color` | string | Warna standar | `'Pearl White'` |
| `transmission` | string | Jenis transmisi | `'Automatic'` atau `'Manual'` |
| `fuel` | string | Jenis bahan bakar | `'Petrol'`, `'Diesel'`, `'Hybrid'`, `'Electric'` |
| `mileage` | number | Jarak tempuh (km) | `0` (baru), `5000` (bekas) |
| `features` | string[] | Array fitur/spesifikasi | `['Sunroof', 'Leather Seats']` |
| `rating` | number | Rating 0-5 | `4.8` |
| `reviews` | number | Jumlah review | `245` |

## 💰 Format Harga

Harga diinput dalam rupiah (IDR) tanpa pemisah:

```typescript
// Contoh:
price: 495000000    // Rp 495.000.000
price: 265000000    // Rp 265.000.000
price: 580000000    // Rp 580.000.000
```

Format akan otomatis dikonversi ke rupiah di tampilan.

## 🏷️ Kategori Mobil

Gunakan kategori yang konsisten:

- `'Sedan'` - Mobil sedan
- `'SUV'` - Sport Utility Vehicle
- `'Hatchback'` - Mobil hatchback
- `'MPV'` - Multi Purpose Vehicle
- `'Pickup'` - Pickup truck
- `'Coupe'` - Coupe/Sports car
- `'Van'` - Van/Minibus
- `'Convertible'` - Convertible
- `'Wagon'` - Station wagon

## ⛽ Jenis Bahan Bakar

Pilih dari opsi berikut:

- `'Petrol'` - Bensin
- `'Diesel'` - Diesel
- `'Hybrid'` - Hybrid
- `'Electric'` - Listrik

## 🔧 Transmisi

- `'Manual'` - Transmisi manual
- `'Automatic'` - Transmisi otomatis

## 💡 Tips

### Warna yang Populer

Gunakan warna standar industri:
- Pearl White, Midnight Black, Soul Red
- Silver, Gray, Midnight Blue
- Pearl Brown, Chestnut, Gun Metallic

### Fitur Umum

Daftar fitur yang sering dicari:
- Leather Seats
- Sunroof / Panoramic Sunroof
- Navigation System / GPS
- Rear Camera
- Bluetooth
- Climate Control
- Cruise Control
- Power Seats
- LED Headlights
- Safety Features (ABS, Airbags, etc)

### Rating & Reviews

- Gunakan rating 3.5 - 5.0 (realistic)
- Reviews: 50-500+ untuk kredibilitas

## 📋 Checklist Sebelum Deploy

- ✅ Semua data mobil sudah ditambahkan
- ✅ Gambar mobil sudah di-upload ke `public/images/`
- ✅ Semua gambar path valid (tidak ada typo)
- ✅ Harga sudah dalam IDR
- ✅ ID mobil unik (tidak ada duplikasi)
- ✅ Kategori mobil konsisten
- ✅ Fitur dan deskripsi sudah lengkap
- ✅ Rating antara 3.5 - 5.0
- ✅ Website sudah ditest di localhost

## 🧪 Testing

### Test Katalog

1. Jalankan: `npm run dev`
2. Buka: `http://localhost:3000/catalog`
3. Cek apakah semua mobil muncul
4. Test filter kategori, bahan bakar, transmisi
5. Test search mobil

### Test Responsif

1. Buka DevTools (F12)
2. Test di berbagai ukuran layar
3. Cek mobile view (320px), tablet (768px), desktop (1920px)

## 🚨 Troubleshooting

### Gambar tidak muncul

- Pastikan path dimulai dengan `/images/`
- Cek nama file (case-sensitive)
- Verifikasi format gambar (JPG/PNG)

### Filter tidak bekerja

- Pastikan kategori mobil cocok dengan pilihan kategori
- Gunakan nama kategori yang sama persis

### Harga tidak tampil

- Pastikan harga adalah number (bukan string)
- Gunakan format: `price: 495000000` (tanpa petik)

## 📞 Dukungan

Jika ada pertanyaan atau masalah, silakan buat issue atau hubungi tim development.

---

Selamat menggunakan SPPM! 🚗
