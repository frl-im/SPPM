# ⚡ Quick Reference

Panduan cepat untuk menggunakan SPPM website.

## 🚀 Start Development (2 menit)

```bash
cd c:\SPPM
npm install
npm run dev
```

Buka: http://localhost:3000

## 📝 Tambah Data Mobil (3 menit)

Edit: `src/data/cars.ts`

```typescript
export const carsData: Car[] = [
  {
    id: '1',
    name: 'Mazda CX-5',
    model: 'Turbo',
    year: 2024,
    price: 420000000,
    image: '/images/mazda-cx5.jpg',
    description: 'SUV elegan dengan teknologi terdepan',
    category: 'SUV',
    color: 'Soul Red',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 0,
    features: ['Sunroof', 'Leather Seats', 'Navigation'],
    rating: 4.9,
    reviews: 428
  }
]
```

## 📸 Upload Gambar (1 menit)

1. Buat folder: `public/images/`
2. Copy gambar mobil ke sana
3. Update path di data

## 🎨 Color Codes

```
Burgundy (CTA):    #910A2D
Charcoal (Text):   #212529
Black (Heading):   #0E0F10
Steel Gray (Mute): #B5B6B6
Light Gray (BG):   #F8F9FA
```

## 🔘 Gunakan Button

```tsx
<Button variant="primary">Beli</Button>
<Button variant="secondary">Detail</Button>
<Button variant="ghost">Menu</Button>
<Button variant="tertiary">Link</Button>
```

## 📱 Font Sizes

```
Display: 49.5px  (h1)
H2:      32px    (heading)
H3:      28px    (subheading)
H5:      20px    (card title)
Body:    15.2px  (paragraph)
Caption: 15.2px  (small text)
```

## 🏷️ Kategori Mobil

`'Sedan'` `'SUV'` `'Hatchback'` `'MPV'` `'Pickup'`

## ⛽ Bahan Bakar

`'Petrol'` `'Diesel'` `'Hybrid'` `'Electric'`

## 🔧 Transmisi

`'Manual'` `'Automatic'`

## 📊 Build & Deploy

```bash
npm run build     # Build production
npm start         # Run production
npm run lint      # Check errors
```

## 📁 File Penting

| File | Fungsi |
|------|--------|
| `src/data/cars.ts` | Data mobil |
| `src/components/` | Reusable components |
| `tailwind.config.js` | Styling config |
| `SETUP_GUIDE.md` | Panduan lengkap |

## 🎯 Common Tasks

### Ubah Warna Brand

`tailwind.config.js`:
```javascript
'mazda-burgundy': '#910A2D',  // Edit ini
```

### Tambah Halaman Baru

Buat file: `src/app/nama/page.tsx`

### Tambah Component

Buat file: `src/components/NamaComponent.tsx`

## 🧪 Test

```bash
npm run dev
# Buka http://localhost:3000
# Test filter, search, responsive
```

## 📖 Dokumentasi

- `README.md` - Overview
- `SETUP_GUIDE.md` - Setup detail
- `DESIGN_SYSTEM.md` - Design specs
- `PROJECT_SUMMARY.md` - Project info

## 🆘 Help

- Check `SETUP_GUIDE.md` troubleshooting
- Read error messages carefully
- Verify file paths (case-sensitive!)

---

**Selamat menggunakan SPPM!** 🚗
