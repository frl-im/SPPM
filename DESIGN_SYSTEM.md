# 🎨 Design System - Implementasi Mazda

Dokumen ini menjelaskan implementasi design system Mazda di website SPPM.

## 📐 Struktur Design System

### 1. Warna Utama (Primary Colors)

**Deep Charcoal** - `#212529`
- Warna teks utama
- Heading dan body copy
- High-emphasis interface elements
- **Usage:** Teks di halaman putih

**Near Black** - `#0E0F10`
- Teks paling gelap
- Critical text
- High-contrast backgrounds
- **Usage:** Heading paling penting

**Mazda Burgundy** - `#910A2D`
- Warna brand signature
- Primary CTA buttons
- Accent highlights
- Brand-defining moments
- **Usage:** Tombol utama, highlight penting

### 2. Warna Interaktif (Interactive Colors)

| Warna | Kode | Penggunaan |
|-------|------|-----------|
| Primary Blue | `#0D6EFD` | Links, focus states, actionable elements |
| Success Green | `#198754` | Success messages, completion |
| Cyan Highlight | `#0DCAF0` | Info highlights, active indicators |
| Error Red | `#DC3545` | Error messages, destructive actions |
| Warning Amber | `#FFC107` | Warnings, alerts |

### 3. Warna Netral (Neutral Scale)

| Warna | Kode | Penggunaan |
|-------|------|-----------|
| White | `#FFFFFF` | Background utama |
| Light Gray | `#F8F9FA` | Secondary surfaces |
| Border Gray | `#DEE2E6` | Dividers, borders |
| Medium Gray | `#898989` | Disabled text, tertiary labels |
| Steel Gray | `#B5B6B6` | Secondary accent, muted messaging |

## 🔤 Tipografi

### Font Families

**Primary (Mazda Display):**
```css
font-family: 'MazdaType', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
```

**Fallback (System UI):**
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Hierarchy (dari besar ke kecil)

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display/H1 | 49.5px | Bold (500) | 59.4px | Hero headlines, vehicle intros |
| Heading 2 | 32px | Bold (500) | 38.4px | Section titles, major dividers |
| Heading 3 | 28px | Bold (500) | 33.6px | Subsection headings, category labels |
| Heading 4 | 32px | Medium (500) | 38.4px | Modal titles, card headers |
| Heading 5 | 20px | Bold (500) | 24px | Card titles, feature highlights |
| Body | 15.2px | Regular (400) | 22.8px | Primary content, descriptions |
| Caption | 15.2px | Bold (400) | 22.8px | Metadata, secondary labels |
| Navigation | 20px | Regular (400) | 30px | Primary nav items |
| Button | 15.2px | Bold (400) | 22.8px | Button text, compact labels |

### Typography di Tailwind

Semua ukuran font sudah dikonfigurasi di `tailwind.config.js`:

```typescript
// Gunakan:
<h1 className="text-display-lg">Besar</h1>
<h2 className="text-h2">Sedang</h2>
<p className="text-body">Normal</p>
<span className="text-caption">Kecil</span>
```

## 🎛️ Komponen

### Button

#### Primary Button
- Background: `#910A2D` (Mazda Burgundy)
- Text: White
- Padding: `12px 24px`
- Border radius: `6px`
- **Hover:** `#6B0820`
- **Active:** `#5A0718`
- **Focus:** Blue outline `3px solid #0D6EFD`

```tsx
<Button variant="primary" size="md">
  Beli Sekarang
</Button>
```

#### Secondary Button
- Background: White
- Text: `#212529` (Deep Charcoal)
- Border: `2px solid #212529`
- **Hover:** Light gray background
- **Active:** Lighter gray background

```tsx
<Button variant="secondary" size="md">
  Detail
</Button>
```

#### Ghost Button (Navigation)
- Background: Transparent
- Text: `#B5B6B6` (Steel Gray)
- Border: `1px solid rgba(255,255,255,0.1)`
- **Hover:** White text, border opacity 0.3

```tsx
<Button variant="ghost" size="md">
  Menu Item
</Button>
```

#### Tertiary Button (Text Only)
- Background: Transparent
- Text: `#B5B6B6` (Steel Gray)
- No border
- **Active:** Burgundy text + bottom border

```tsx
<Button variant="tertiary" size="md">
  Link Text
</Button>
```

### Cards

#### Product Card
- Background: White
- Image height: 186.25px
- No border
- No shadow
- **Hover:** Subtle shadow

#### Feature Card
- Background: White
- Border: `1px solid #DEE2E6`
- Padding: `16px 16px 24px 24px`
- Border radius: `5px`
- **Hover:** Shadow `0 2px 8px rgba(0,0,0,0.08)`

#### Pricing Card
- Background: `#F8F9FA`
- Border: `1px solid #DEE2E6`
- Padding: `24px`
- Price text: Mazda Burgundy, 28px, bold

### Forms

#### Text Input
- Background: White
- Border: `1px solid #DEE2E6`
- Height: `55.1875px`
- Padding: `6px 12px`
- Border radius: `6px`
- **Focus:** Blue border + blue shadow

```tsx
<input className="input-field" placeholder="Cari..." />
```

#### Form Label
- Font: MazdaType, 15.2px, bold
- Color: Deep Charcoal
- Margin bottom: `8px`

#### Checkbox/Radio
- Size: `20px`
- Border: `2px solid #DEE2E6`
- Border radius: `3px` (checkbox) / `50%` (radio)
- **Checked:** Burgundy background & border
- **Focus:** Burgundy shadow outline

### Navigation

#### Header
- Background: White
- Height: `90px`
- Padding: `16px 24px`
- Logo width: `70px`
- Links: MazdaType, 20px, regular

#### Footer
- Background: `#343A40` (Darker Charcoal)
- Text: Mazda Steel Gray

## 🌐 Layout & Spacing

### Container Width
- Mobile: Full width - 32px padding
- Tablet: Max 768px
- Desktop: Max 1200px (max-w-7xl)

### Spacing Scale (via Tailwind)
```
Gap / Padding: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
```

### Breakpoints
- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## 🎯 Prinsip Desain

### 1. Minimalism
- Generous whitespace
- Clean layouts
- Avoid visual noise
- Focus on content

### 2. Clarity
- High contrast text
- Clear hierarchy
- Purposeful use of color
- Accessible everywhere

### 3. Premium Quality
- Sophisticated aesthetic
- Refined typography
- Strategic accents
- Quality photography

### 4. Human-Centered
- Clear navigation
- Purposeful interactions
- Subtle transitions
- Measured visual hierarchy

## 🔄 Responsive Design

### Mobile-First Approach
```tsx
// Start mobile, then add styles for larger screens
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Auto stacks on mobile */}
</div>
```

### Common Patterns

**Hero Section**
- Full width on mobile
- Centered content
- Larger padding

**Card Grid**
- 1 column on mobile (sm)
- 2 columns on tablet (md)
- 3 columns on desktop (lg)

**Navigation**
- Hidden on mobile
- Visible on md and above

## 🛠️ Menggunakan Design System

### Di React Components

```tsx
// Warna
className="bg-mazda-burgundy text-white"
className="border border-mazda-border-gray"

// Typography
className="text-h2 text-mazda-black"
className="text-body text-mazda-steel-gray"

// Components
<Button variant="primary" size="md">CTA</Button>
<CarCard car={carData} />

// Spacing
className="p-6 mb-8 gap-4"
```

### CSS Classes (Global)

```css
/* Buttons */
.btn-primary        /* Tombol utama */
.btn-secondary      /* Tombol sekunder */

/* Cards */
.card               /* Card dasar */

/* Forms */
.input-field        /* Text input */

/* Container */
.container-max      /* Max-width container */
```

## 📊 Accessibility

### Color Contrast
- Dark text on light background: 4.5:1+ ratio ✓
- All interactive elements: High contrast ✓

### Typography
- Minimum font size: 15.2px ✓
- Line height: 1.2-1.5x untuk readability ✓

### Interactive Elements
- Focus states: Jelas dan visible ✓
- Keyboard navigation: Supported ✓
- Screen reader friendly: Semantic HTML ✓

## 🔗 Resources

- Tailwind Config: `tailwind.config.js`
- Global CSS: `src/app/globals.css`
- Components: `src/components/`
- Design Document: `DESIGN.md`

---

**Last Updated:** June 2, 2024
