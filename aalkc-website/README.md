# Amanat Al-Kalima Company — Website

**aalkc.com** | Scrap Metal Buyers | Eastern Province, Saudi Arabia

Built with [Next.js 16](https://nextjs.org) + Tailwind CSS v4. Bilingual (English / Arabic, RTL).

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/en`.

### Routes

| Route | Description |
|-------|-------------|
| `/en` | English homepage |
| `/ar` | Arabic homepage (RTL) |
| `/contact` | Contact page with inquiry form |
| `/sitemap.xml` | XML sitemap |
| `/robots.txt` | Robots file |

---

## Project Structure

```
aalkc-website/
├── app/
│   ├── en/page.tsx        # English homepage
│   ├── ar/
│   │   ├── layout.tsx     # Arabic RTL layout wrapper
│   │   └── page.tsx       # Arabic homepage
│   ├── contact/page.tsx   # Contact page
│   ├── sitemap.ts         # XML sitemap generator
│   ├── robots.ts          # robots.txt generator
│   ├── layout.tsx         # Root layout (fonts, metadata)
│   └── globals.css        # Design tokens + base styles
├── components/
│   ├── header.tsx         # Sticky bilingual header
│   ├── footer.tsx         # Full bilingual footer
│   ├── language-switcher.tsx
│   ├── hero.tsx
│   ├── trust-bar.tsx
│   ├── about.tsx
│   ├── service-card.tsx
│   ├── services.tsx
│   ├── service-areas.tsx
│   ├── why-choose-us.tsx
│   ├── process-steps.tsx
│   ├── cta-band.tsx
│   ├── mobile-cta-bar.tsx # Fixed bottom bar (mobile only)
│   ├── contact-card.tsx
│   ├── contact-form.tsx
│   └── seo-schema.tsx     # JSON-LD structured data
├── lib/
│   ├── content.ts         # ALL site content — single source of truth
│   ├── seo.ts             # generateSeoMeta() utility
│   └── constants.ts       # Phone, WhatsApp, Maps constants
└── public/
    └── images/
        └── og-image.jpg   # OG image 1200×630 (replace with real asset)
```

---

## Content Management

All text content lives in `lib/content.ts`. Zero hardcoded strings in components.

To update text, phone numbers, or service descriptions — edit `lib/content.ts` only.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com) — set **Root Directory** to `aalkc-website`
3. Build command: `next build`
4. No environment variables required for production
5. Connect custom domain `aalkc.com` in Vercel project settings

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Brand Primary | `#0f4c6b` | Deep teal |
| Brand Secondary | `#1a6a96` | Mid teal |
| Brand Accent | `#e8a317` | Amber |
| Brand Dark | `#0a1f2e` | Steel dark |

Fonts: **Work Sans** (EN) + **Noto Sans Arabic** (AR) via `@fontsource`.
