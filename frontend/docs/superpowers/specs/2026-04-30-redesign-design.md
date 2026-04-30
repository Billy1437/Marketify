# Productify Frontend Redesign — Design Spec

**Date:** 2026-04-30
**Scope:** Frontend only (no backend changes). Full visual overhaul of layout, typography, color, and component styling.

---

## 1. Design Direction

**Approach: Warm Minimal**

Soft, welcoming, and modern. Warm off-white backgrounds, white cards with gentle shadows, amber/orange accent color, and the Plus Jakarta Sans typeface throughout. The feel is creator-friendly and approachable — like a polished indie marketplace.

Reference: Framer, early Gumroad, Notion's warmth with more color.

---

## 2. Color System

All colors applied as plain Tailwind utilities. DaisyUI theme system is removed entirely.

| Role | Value | Tailwind Class |
|---|---|---|
| Page background | `#fdf8f3` | custom, set on `<body>` |
| Surface (cards, forms) | `#ffffff` | `bg-white` |
| Surface alt (navbar, sections) | `#fef3e2` | `bg-amber-50` |
| Border | `#f0e6d3` | `border-orange-100` |
| Text primary | `#1c1917` | `text-stone-950` |
| Text secondary | `#78716c` | `text-stone-500` |
| Text muted | `#a8a29e` | `text-stone-400` |
| Accent | `#f97316` | `text-orange-500` / `bg-orange-500` |
| Accent gradient | `#fb923c → #f97316` | `bg-gradient-to-r from-orange-400 to-orange-500` |
| Danger | `#ef4444` | `text-red-500` / `bg-red-500` |

---

## 3. Typography

**Font:** Plus Jakarta Sans (Google Fonts)
- Loaded via `@import` in `index.css`
- Applied as `font-family: 'Plus Jakarta Sans', sans-serif` on `body`
- Weights used: 400, 500, 600, 700, 800

| Usage | Weight | Size |
|---|---|---|
| Hero heading | 800 | `text-4xl` / `text-5xl` |
| Page headings | 700 | `text-2xl` |
| Section headings | 700 | `text-xl` |
| Card titles | 700 | `text-base` |
| Body text | 400–500 | `text-sm` / `text-base` |
| Logo | 800 | `text-lg`, slight letter-spacing |

---

## 4. Global Layout

- Remove `ThemeSelector` component entirely (no more DaisyUI theme switching)
- Page root: `min-h-screen` with `bg-[#fdf8f3]` (warm off-white)
- Content wrapper: `max-w-7xl mx-auto px-6 py-10` (widened from `max-w-5xl`)
- All DaisyUI utility classes (`bg-base-*`, `btn-*`, `card`, `badge`, etc.) replaced with plain Tailwind

---

## 5. Navbar

- Background: `bg-amber-50` with `border-b border-orange-100`
- Sticky: `sticky top-0 z-50`
- Max-width: `max-w-7xl mx-auto px-6`
- **Logo:** ShoppingBagIcon in orange + "Productify" in 800-weight Plus Jakarta Sans
- **Right side (signed out):** "Sign In" (ghost/text style) + "Get Started" (orange pill button)
- **Right side (signed in):** "New Product" (orange pill) + "Profile" (ghost) + Clerk `UserButton`
- Remove `ThemeSelector` from navbar

---

## 6. ProductCard

- Container: `bg-white rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-all hover:-translate-y-0.5`
- Image: `rounded-xl h-44 w-full object-cover` (slightly taller than current)
- "NEW" badge: `bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full`
- Title: `text-stone-900 font-bold text-base`
- Description: `text-stone-500 text-sm line-clamp-2`
- Divider: replaced with `py-1` spacing (no visible line)
- Creator row: avatar (ring in orange-200) + name in `text-stone-400 text-xs`
- Comment count: `text-stone-400 text-xs`

---

## 7. HomePage

**Hero section:**
- Background: `bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl`
- Two-column layout (image right, text left) on large screens, stacked on mobile
- Headline: `text-5xl font-extrabold text-stone-900` with "Products" in `text-orange-500`
- Subtext: `text-stone-500`
- CTA button: orange gradient pill with SparklesIcon, "Start Selling"
- Image: product icon with orange glow backdrop (existing `/image_icon.png`)

**Products section:**
- Section label: `text-xl font-bold text-stone-900` with `PackageIcon` in orange
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Empty state: centered card in warm off-white, PackageIcon muted, orange "Create Product" button

---

## 8. ProductPage

- Back button: text style with ArrowLeftIcon
- Two-column grid: image card (white, `rounded-2xl`, `shadow-sm`) left, details card right
- Image: `rounded-xl w-full h-80 object-cover`
- Product title: `text-2xl font-bold text-stone-900`
- Meta (date, creator): `text-stone-400 text-sm` with icon
- Description: `text-stone-600 leading-relaxed`
- Creator info: avatar with orange ring, name in bold
- Edit/Delete buttons: ghost style for Edit, red-tinted ghost for Delete
- Comments section: white card below the two-column grid

---

## 9. CreatePage / EditProductPage

- Centered: `max-w-lg mx-auto`
- Card: `bg-white rounded-2xl shadow-sm border border-orange-100 p-8`
- Inputs: `border border-stone-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400`
- Input icons: `text-stone-400`
- Submit button: full-width orange gradient pill
- Image preview: `rounded-xl` with overflow hidden

---

## 10. ProfilePage

- Page header: title + "New Product" orange pill button
- Stats card: `bg-amber-50 border border-orange-100 rounded-2xl` with orange stat value
- Product list items: horizontal cards — `bg-white rounded-2xl shadow-sm border border-orange-100`
  - Image: `w-28 h-full object-cover rounded-l-2xl`
  - Actions: View / Edit / Delete as small text buttons

---

## 11. Components to Remove / Modify

| Component | Action |
|---|---|
| `ThemeSelector.jsx` | Delete entirely |
| `LoadingSpinner.jsx` | Restyle to orange spinner on `bg-[#fdf8f3]` |
| `CommentsSection.jsx` | Restyle inputs and buttons to match warm system |
| `EditProductForm.jsx` | Restyle to match CreatePage inputs |

---

## 12. Files Changed

- `src/index.css` — add Google Font import, set body font + background color
- `src/App.jsx` — update root div classes, widen max-w, remove ThemeSelector
- `src/components/Navbar.jsx` — full restyle, remove ThemeSelector
- `src/components/ProductCard.jsx` — full restyle
- `src/components/LoadingSpinner.jsx` — restyle
- `src/components/ThemeSelector.jsx` — delete
- `src/components/CommentsSection.jsx` — restyle
- `src/components/EditProductForm.jsx` — restyle
- `src/pages/HomePage.jsx` — full restyle
- `src/pages/ProductPage.jsx` — full restyle
- `src/pages/CreatePage.jsx` — full restyle
- `src/pages/ProfilePage.jsx` — full restyle
- `src/components/CommentsSection.jsx` — restyle inputs, buttons, and layout to warm system
- `src/pages/EditProductPage.jsx` — restyle (uses EditProductForm)
