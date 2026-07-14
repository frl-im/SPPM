# Design System Inspired by Mazda

## 1. Visual Theme & Atmosphere

The Mazda design system embodies a sophisticated, minimalist aesthetic rooted in Japanese craftsmanship philosophy. It emphasizes clarity, elegance, and timeless precision through restrained typography, generous whitespace, and a refined color vocabulary dominated by deep charcoals and strategic jewel-tone accents. The visual language conveys premium quality and human-centered innovation, balancing bold automotive imagery with serene negative space. Interactions feel intentional and purposeful, reflected in subtle transitions and measured use of visual hierarchy. The system prioritizes legibility and directional focus, guiding users through vehicle exploration and purchasing journeys with confidence and refinement.

**Key Characteristics**
- Minimalist, premium aesthetic with Japanese design principles
- Deep neutral base with burgundy accent for emotional resonance
- Generous whitespace and breathing room throughout layouts
- Refined typography using proprietary MazdaType family
- Restrained use of color accents for strategic emphasis
- Clean, purposeful interaction patterns without visual noise
- High-contrast text for accessibility and legibility
- Photography-forward design with minimal graphic ornamentation

## 2. Color Palette & Roles

### Primary
- **Deep Charcoal** (`#212529`): Primary text color for headings, body copy, and high-emphasis interface elements; conveys premium sophistication
- **Near Black** (`#0E0F10`): Deepest neutral for critical text and high-contrast backgrounds; used sparingly for maximum impact

### Accent Colors
- **Mazda Burgundy** (`#910A2D`): Signature brand color; primary call-to-action buttons, highlighted tabs, and brand-defining moments; evokes passion and precision
- **Steel Gray** (`#B5B6B6`): Secondary accent; tertiary text, subtle UI elements, and secondary navigation; bridges primary and neutral scales

### Interactive
- **Primary Blue** (`#0D6EFD`): Interactive elements, links, and focus states; signals actionability and navigation
- **Success Green** (`#198754`): Positive confirmations, success states, and completion messaging
- **Cyan Highlight** (`#0DCAF0`): Informational highlights, secondary interactive states, and active indicators
- **Error Red** (`#DC3545`): Error messages, validation failures, and destructive actions
- **Warning Amber** (`#FFC107`): Warning states, alerts, and cautionary messaging

### Neutral Scale
- **White** (`#FFFFFF`): Primary surface background; card backgrounds and contrast layers
- **Light Gray** (`#F8F9FA`): Subtle background tint for secondary surfaces and reduced-emphasis areas
- **Border Gray** (`#DEE2E6`): Dividers, subtle borders, and field separators
- **Medium Gray** (`#898989`): Disabled text, tertiary labels, and muted messaging
- **Faded Gray** (`#F2F2F2`): Very subtle background variation; section differentiation without visual strain

### Surface & Borders
- **Darker Charcoal** (`#343A40`): Secondary background tone; footer sections and inverted layouts
- **Very Dark Gray** (`#383839`): Deep container backgrounds; high-contrast photography overlays

## 3. Typography Rules

### Font Family
**Primary:** MazdaType (Bold, Medium, Regular weights)
Fallback stack: `MazdaType, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif`

**Secondary:** System UI for navigation and utility text
Fallback stack: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | MazdaType-Bold | 49.5px | 500 | 59.4px | Normal | Hero headlines; vehicle model intros |
| Heading 2 | MazdaType-Bold | 32px | 500 | 38.4px | Normal | Section titles; major content dividers |
| Heading 3 | MazdaType-Bold | 28px | 500 | 33.6px | Normal | Subsection headings; category labels |
| Heading 4 | MazdaType-Medium | 32px | 500 | 38.4px | Normal | Modal titles; prominent card headers |
| Heading 5 | MazdaType-Bold | 20px | 500 | 24px | Normal | Card titles; feature highlights |
| Body / Paragraph | MazdaType-Regular | 15.2px | 400 | 22.8px | Normal | Primary content text; descriptions |
| Body Emphasis | MazdaType-Regular | 20px | 400 | 20px | Normal | Featured text; call-out copy |
| Input / Form Text | MazdaType-Regular | 28.8px | 400 | 43.2px | Normal | Form field text input; search bars |
| List Item | MazdaType-Regular | 16px | 400 | 24px | Normal | Bulleted and numbered lists |
| Caption / Small | MazdaType-Bold | 15.2px | 400 | 22.8px | Normal | Metadata; secondary labels; pricing |
| Navigation Link | MazdaType-Regular | 20px | 400 | 30px | Normal | Primary nav items; hero links |
| Button Label | MazdaType-Bold | 15.2px | 400 | 22.8px | Normal | Button text; compact interactive labels |

### Principles
- **Clarity First:** All body text sized minimum 15.2px for comfortable reading at typical viewing distances
- **Hierarchy Through Weight:** Rely on MazdaType weight variations (500 bold, 400 regular) rather than size alone to define hierarchy
- **Generous Leading:** Line heights set 1.2–1.5x font size for breathing room and reduced cognitive load
- **Purposeful Contrast:** Dark charcoal on white creates premium, high-legibility baseline; neutral grays establish secondary importance
- **Optical Balance:** Larger display sizes (49.5px, 32px) receive proportionally tighter leading to maintain visual weight
- **Accessibility:** Color is never the only differentiator; weight and size support meaning across all interactive states

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#910A2D`
- Text Color: `#FFFFFF`
- Font: MazdaType-Bold, 15.2px, weight 500
- Padding: `12px 24px`
- Border Radius: `6px`
- Border: `2px solid #910A2D`
- Line Height: 22.8px
- Hover: Background `#6B0820`, Border `2px solid #6B0820`
- Active: Background `#5A0718`, Border `2px solid #5A0718`
- Focus: Outline `3px solid #0D6EFD`, outline-offset `2px`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: MazdaType-Bold, 15.2px, weight 500
- Padding: `12px 24px`
- Border Radius: `6px`
- Border: `2px solid #212529`
- Line Height: 22.8px
- Hover: Background `#F8F9FA`, Border `2px solid #212529`
- Active: Background `#E9ECEF`, Border `2px solid #212529`
- Focus: Outline `3px solid #0D6EFD`, outline-offset `2px`

**Ghost Button (Navigation)**
- Background: transparent
- Text Color: `#B5B6B6`
- Font: MazdaType-Regular, 20px, weight 400
- Padding: `4px 12px`
- Border Radius: `6px`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Line Height: 20px
- Hover: Text Color `#FFFFFF`, Border `1px solid rgba(255, 255, 255, 0.3)`
- Active: Text Color `#FFFFFF`, Border `1px solid rgba(255, 255, 255, 0.5)`

**Tertiary Text Button**
- Background: transparent
- Text Color: `#B5B6B6`
- Font: MazdaType-Bold, 15.2px, weight 400
- Padding: `8px 8px`
- Border Radius: `0px`
- Border: none
- Line Height: 22.8px
- Hover: Text Color `#212529`
- Active: Text Color `#910A2D`, Border-bottom `2px solid #910A2D`

### Cards & Containers

**Product Card**
- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: MazdaType-Regular, 16px, weight 400
- Padding: `0px`
- Border Radius: `0px`
- Border: none
- Box Shadow: none
- Line Height: 24px
- Image Container Height: 186.25px
- Title: MazdaType-Bold, 15.2px, weight 500, `#0E0F10`, Line Height 22.8px

**Feature Card**
- Background: `#FFFFFF`
- Text Color: `#B5B6B6`
- Font: MazdaType-Bold, 15.2px, weight 400
- Padding: `16px 16px 24px 24px`
- Border Radius: `5px`
- Border: `1px solid #DEE2E6`
- Box Shadow: none
- Line Height: 22.8px
- Hover: Box Shadow `0 2px 8px rgba(0, 0, 0, 0.08)`

**Pricing Card**
- Background: `#F8F9FA`
- Text Color: `#212529`
- Font: MazdaType-Regular, 15.2px, weight 400
- Padding: `24px`
- Border Radius: `5px`
- Border: `1px solid #DEE2E6`
- Price Text: MazdaType-Bold, 28px, weight 500, `#910A2D`
- Line Height: 22.8px

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: MazdaType-Regular, 28.8px, weight 400
- Padding: `6px 12px 6px 60px`
- Border Radius: `6px`
- Border: `1px solid #DEE2E6`
- Height: `55.1875px`
- Focus: Border `2px solid #0D6EFD`, Box Shadow `0 0 0 3px rgba(13, 110, 253, 0.1)`
- Placeholder Color: `#898989`
- Line Height: 43.2px

**Form Label**
- Font: MazdaType-Bold, 15.2px, weight 500
- Text Color: `#212529`
- Margin Bottom: `8px`
- Line Height: 22.8px

**Checkbox / Radio**
- Width: `20px`
- Height: `20px`
- Border: `2px solid #DEE2E6`
- Border Radius: `3px` (checkbox) / `50%` (radio)
- Background: `#FFFFFF`
- Checked: Background `#910A2D`, Border `2px solid #910A2D`
- Focus: Box Shadow `0 0 0 3px rgba(145, 10, 45, 0.1)`

### Navigation

**Header Navigation**
- Background: `#FFFFFF` (or semi-transparent overlay on hero images)
- Height: `90px`
- Padding: `16px 24px`
- Logo Width: `70px`
- Nav Links Font: MazdaType-Regular, 20px, weight 400, `#212529`
- Nav Link Hover: Text Color `#910A2D`, Border-bottom `3px solid #910A2D`

**Breadcrumb Navigation**
- Font: MazdaType-Regular, 15.2px, weight 400
- Text Color: `#898989`
- Separator: ` / ` in `#DEE2E6`
- Active Link: Text Color `#212529`, Font Weight 500
- Link Hover: Text Color `#0D6EFD`

**Tab Navigation**
- Font: MazdaType-Bold, 15.2px, weight 500
- Text Color: `#B5B6B6`
- Padding: `12px 16px`
- Border-bottom: `2px solid transparent`
- Active Tab: Text Color `#910A2D`, Border-bottom `2px solid #910A2D`
- Hover: Text Color `#212529`

### Badges & Labels

**Primary Badge**
- Background: `#910A2D`
- Text Color: `#FFFFFF`
- Font: MazdaType-Bold, 12px, weight 500
- Padding: `4px 8px`
- Border Radius: `3px`
- Line Height: 18px

**Secondary Badge**
- Background: `#F8F9FA`
- Text Color: `#212529`
- Font: MazdaType-Bold, 12px, weight 500
- Padding: `4px 8px`
- Border Radius: `3px`
- Border: `1px solid #DEE2E6`
- Line Height: 18px

**Status Badge (Success)**
- Background: `#D1E7DD`
- Text Color: `#0F5132`
- Font: MazdaType-Bold, 12px, weight 500
- Padding: `4px 8px`
- Border Radius: `3px`

**Status Badge (Warning)**
- Background: `#FFF3CD`
- Text Color: `#664D03`
- Font: MazdaType-Bold, 12px, weight 500
- Padding: `4px 8px`
- Border Radius: `3px`

## 5. Layout Principles

### Spacing System

**Base Unit:** 4px

**Spacing Scale:**
- `4px` – Tight internal padding within compact elements (buttons, small inputs)
- `8px` – Standard padding between text and icon/border; compact vertical spacing
- `12px` – Medium padding; spacing between inline elements
- `16px` – Primary padding for cards, sections, and most containers
- `24px` – Generous padding for main content areas; spacing between logical groups
- `32px` – Spacing between major content sections on desktop
- `48px` – Spacing between distinct page sections with strong visual separation
- `60px` – Vertical margin between hero sections and primary content
- `76px` – Padding for wide margin sections; maximum breathing room
- `80px` – Large vertical margin between major layout blocks
- `104px` – Extra-large spacing for hero sections and page transitions
- `128px` – Maximum spacing; hero to footer or major component separation

**Usage Context:**
- Compact UI (buttons, badges): `4px–12px`
- Standard components (cards, inputs): `16px–24px`
- Section spacing: `32px–48px`
- Hero and page-level separation: `60px–128px`

### Grid & Container

**Max Width:** 1440px (desktop), 100vw (mobile)

**Column Strategy:**
- **Desktop:** 12-column grid with 24px gutters
- **Tablet:** 8-column grid with 16px gutters
- **Mobile:** Single-column full-width with 16px side padding

**Section Patterns:**
- **Full Bleed:** Background color extends edge-to-edge; content padding 24px–48px
- **Contained:** Max 1200px centered content; 24px padding on sides
- **Asymmetric:** Hero image spans 60% width; text/CTA in remaining 40% with 32px padding
- **Card Grid:** 3–4 columns desktop, 2 columns tablet, 1 column mobile; 24px gap between cards

### Whitespace Philosophy

The design system emphasizes generous negative space as a core design principle, not secondary. Whitespace isolates elements, reduces cognitive load, and creates a sense of premium quality. Sections breathe with minimum 48px margin separation; cards float with visible background, never edge-to-edge. Within components, internal padding is balanced—never cramped—with consistent 16px–24px breathing room. Typography uses 1.2–1.5x line height to prevent text density. Background colors are used sparingly to create subtle zones rather than heavy visual division.

### Border Radius Scale

- `0px` – Card bases, large containers, and edge-to-edge sections (photography, hero zones)
- `3px` – Badges, small labels, and compact UI elements
- `5px` – Feature cards, smaller containers, and subtle rounded containers
- `6px` – Buttons, inputs, and primary interactive elements
- `12px` – Larger modals, elevated cards, and high-emphasis containers
- `50%` – Circular elements: avatars, radio buttons, accent dots

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow; flat background color | Card bases, buttons on light backgrounds, primary surfaces |
| Level 1 (Raised) | `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06)` | Subtle hover states on cards, secondary interactive elements |
| Level 2 (Elevated) | `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08)` | Card hover states, secondary buttons on dark backgrounds |
| Level 3 (High) | `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)` | Modals, dropdowns, tooltips above main content |
| Level 4 (Modal) | `box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15)` | Full-screen modals, drawers, high-priority overlays |

**Shadow Philosophy:**
Shadows are used sparingly to establish layering and draw focus, not create visual clutter. Most card-based layouts remain flat (`Level 0`) to maintain the premium, minimalist aesthetic. Shadows appear only on interactive hover states or when content must optically float above the background. Dark backgrounds reduce shadow opacity to 50–60% of light-background values to prevent overemphasis.

## 7. Do's and Don'ts

### Do
- **Prioritize readability:** Always maintain minimum 15.2px font size for body copy; use 1.2–1.5x line height for comfortable reading
- **Use burgundy strategically:** Reserve `#910A2D` for primary CTAs, active states, and brand-defining moments; don't overuse
- **Embrace whitespace:** Leave breathing room around elements; avoid cramped layouts or dense information clusters
- **Maintain high contrast:** All text must meet WCAG AA standards; test dark text on light backgrounds and vice versa
- **Support focus states:** Always provide visible 3px outline (typically `#0D6EFD`) for keyboard navigation and accessibility
- **Use MazdaType consistently:** Apply the proprietary font family across all headings; fallback to system fonts only for utility UI
- **Grid alignment:** Snap elements to 4px baseline grid for visual consistency and precise spacing
- **Leverage semantic colors:** Use `#198754` for success, `#DC3545` for error, `#FFC107` for warning without custom interpretations
- **Optimize images:** Showcase product photography at full resolution; use 16:9 or 4:3 aspect ratios for consistency
- **Test responsiveness:** Verify all breakpoint transitions; ensure touch targets remain ≥48px minimum on mobile

### Don't
- **Overuse shadows:** Avoid excessive drop shadows that clutter the interface; reserve shadows for clear layering hierarchy
- **Abuse color:** Don't use all accent colors in a single section; maintain visual restraint and color hierarchy
- **Create tiny type:** Never use font sizes below 14px for primary content; accessibility and legibility must never be compromised
- **Distort MazdaType:** Avoid stretching, skewing, or applying effects to the brand typeface; use it as designed
- **Mix neutral grays randomly:** Stick to the defined palette (`#212529`, `#898989`, `#B5B6B6`); don't introduce custom grays
- **Crowd layouts:** Never remove or reduce spacing below the defined scale (4px minimum) to fit more content; reflow or paginate instead
- **Ignore focus states:** Don't remove focus outlines or make them invisible; keyboard users depend on clear focus indication
- **Use placeholder text permanently:** Never ship placeholder or lorem ipsum content; all copy must be finalized
- **Create unnecessary layers:** Avoid stacking components (shadow on shadow) or overcomplicating component nesting
- **Skip mobile optimization:** Never design desktop-first without considering touch targets, readability, and screen real estate on smaller devices

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|------------|
| Mobile | 320px–479px | Single column, full-width content, 16px side padding, 12px–16px spacing, touch targets ≥48px |
| Tablet (Small) | 480px–767px | 2-column grid, 16px gutters, 20px padding, medium touch targets |
| Tablet (Large) | 768px–1023px | 8-column grid, 20px gutters, 24px padding, standard interactions |
| Desktop | 1024px–1439px | 12-column grid, 24px gutters, max 1200px content width, 32px–48px spacing |
| Desktop Large | 1440px+ | Max-width container 1440px centered, 48px+ section spacing, full component interactions |

**Specific Transitions:**
- **≤479px:** Stack navigation into hamburger menu; single-column card layouts; reduce heading sizes by 10–15%
- **480px–767px:** Introduce 2-column product grids; side-by-side CTAs where space permits; maintain readable font sizes
- **768px–1023px:** 3-column product grids; full navigation bar appears; section spacing increases to 32px
- **≥1024px:** Full 12-column grid active; asymmetric layouts with 60/40 splits; maximum spacing and component sizes

### Touch Targets

- **Minimum Size:** 48px × 48px for all primary interactive elements (buttons, links, form inputs)
- **Recommended Size:** 56px × 56px for prominent CTAs; 48px × 24px minimum for secondary actions
- **Spacing Between Targets:** Minimum 8px between adjacent touch targets to prevent accidental activation
- **Text Links:** Ensure minimum 44px line height for comfortable tapping; add 4px padding around inline links
- **Form Inputs:** Minimum 44px height on mobile; 48px recommended for large form fields
- **Checkbox / Radio:** 20px × 20px control + 8px padding = 36px effective touch target
- **Icon Buttons:** 48px × 48px minimum; center icon within that space with visual padding

### Collapsing Strategy

**Navigation:**
- Desktop (≥768px): Horizontal nav bar with 20px text, visible logo
- Tablet (480px–767px): Condensed horizontal nav; some items move to secondary menu
- Mobile (≤479px): Hamburger menu (three-line icon 24px × 24px); slide-out drawer 80% viewport width

**Content Columns:**
- Desktop (≥1024px): 3–4 column product grids; 60/40 text-image splits
- Tablet (768px–1023px): 2–3 column grids; adjust ratio to 50/50 or full-width stacked
- Mobile (≤767px): Single column; full-width cards; images stack above text

**Typography:**
- Desktop: H1 49.5px, H2 32px, Body 15.2px
- Tablet: H1 36px (–27%), H2 24px (–25%), Body 15.2px (unchanged)
- Mobile: H1 28px (–43%), H2 20px (–37%), Body 14px (–8%)

**Spacing:**
- Desktop: Section spacing 48px–80px, padding 24px–32px
- Tablet: Section spacing 32px–48px, padding 16px–24px
- Mobile: Section spacing 24px–32px, padding 16px

**Hero Sections:**
- Desktop (≥1024px): Full-width background image with 40% overlay text area on right
- Tablet (768px–1023px): Image 50% width, text 50% width, single stack if space tight
- Mobile (≤767px): Full-width image (70% height), text overlay centered at bottom with semi-transparent dark background

**Cards:**
- Desktop: 272–296px width, 3–4 per row, box-shadow hover states
- Tablet: 250–280px width, 2–3 per row, reduced shadows
- Mobile: 100% width with 16px margins, single-column stack

## 9. Agent Prompt Guide

### Quick Color Reference

Use this condensed mapping when implementing UI components:

- **Primary CTA / Active State:** Mazda Burgundy (`#910A2D`)
- **Secondary CTA / Button:** Deep Charcoal (`#212529`) with `#FFFFFF` background
- **Navigation Text (Light Overlay):** White (`#FFFFFF`) or Semi-transparent `rgba(255, 255, 255, 0.85)`
- **Navigation Text (Light Background):** Deep Charcoal (`#212529`)
- **Heading Text:** Near Black (`#0E0F10`) or Deep Charcoal (`#212529`)
- **Body Text:** Deep Charcoal (`#212529`)
- **Secondary Text / Metadata:** Steel Gray (`#B5B6B6`)
- **Disabled / Muted Text:** Medium Gray (`#898989`)
- **Primary Background:** White (`#FFFFFF`)
- **Secondary Background:** Light Gray (`#F8F9FA`)
- **Subtle Background Variation:** Faded Gray (`#F2F2F2`)
- **Borders / Dividers:** Border Gray (`#DEE2E6`)
- **Success Indicator:** Success Green (`#198754`)
- **Error Indicator:** Error Red (`#DC3545`)
- **Warning Indicator:** Warning Amber (`#FFC107`)
- **Focus Outline:** Primary Blue (`#0D6EFD`)
- **Inverted/Dark Section Background:** Darker Charcoal (`#343A40`)

### Iteration Guide

1. **Start with the spacing system:** All component sizing and layout spacing derives from the 4px base unit and defined scale (4px, 8px, 12px, 16px, 24px, 32px, 48px). Never invent intermediate values.

2. **Apply typography hierarchy rigorously:** Use MazdaType weights (500 bold, 400 regular) and the defined size scale. Map content to the hierarchy table—don't create custom sizes. Maintain line heights at 1.2–1.5x font size.

3. **Use burgundy as the accent keyword:** `#910A2D` is the brand's emotional anchor. Primary buttons, active tab indicators, and CTAs must use this color. Secondary elements use grays or neutral variants. Never substitute colors without clear rationale.

4. **Prioritize accessibility:** All text must meet WCAG AA contrast ratios. Interactive elements require visible focus outlines (`3px solid #0D6EFD`). Touch targets on mobile must be ≥48px × 48px.

5. **Embrace whitespace philosophy:** Minimum 16px internal padding in cards; 32px–48px between major sections. Layouts should never feel crowded. When unsure, add space.

6. **Match component CSS exactly:** Use the specified padding, border-radius, font, and shadow values from Section 4. Hover and focus states are mandatory—don't skip them.

7. **Respect border radius scale:** 0px for full-bleed sections, 5px for cards, 6px for buttons/inputs, 12px for modals. Be consistent; don't introduce intermediate radius values.

8. **Test breakpoint responsiveness:** Verify layouts at 320px, 480px, 768px, 1024px, and 1440px. Typography scales appropriately; touch targets remain ≥48px; grids reflow predictably.

9. **Shadow hierarchy is minimal:** Most cards and buttons are flat. Shadows appear only on hover (Level 1–2) or modal overlays (Level 3–4). Don't overuse; maintain the premium, restrained aesthetic.

10. **Validate with the brand voice:** Every color choice, font size, and spacing decision should align with premium craftsmanship, clarity, and human-centered design. If a decision feels uncertain, reference the visual theme and adjust until it feels intentional and refined.