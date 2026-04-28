# GitHub Project Board — AALKC Website
## Amanat Al-Kalima Company | aalkc.com

---

## 🗂️ MILESTONE 1 — Project Bootstrap

### Issue #1 — Initialize Next.js 15 project
**Label:** `setup` `priority: high`
**Milestone:** Bootstrap
**Assignee:** @copilot

**Description:**
Initialize the production-ready Next.js 15 project with App Router.

**Tasks:**
- [ ] `npx create-next-app@latest aalkc-website --typescript --tailwind --app --eslint`
- [ ] Set up `.prettierrc` and `.eslintrc`
- [ ] Configure `tsconfig.json` for strict mode
- [ ] Add `next.config.ts` with static export settings
- [ ] Create base folder structure: `app/`, `components/`, `lib/`, `public/`, `styles/`
- [ ] Add `.gitignore`, `README.md`
- [ ] Push initial commit to GitHub

**Acceptance Criteria:**
`npm run dev` runs without errors. Folder structure matches the architecture spec.

---

### Issue #2 — Configure Tailwind design tokens
**Label:** `setup` `design`
**Milestone:** Bootstrap

**Description:**
Extend Tailwind config with company-specific design tokens.

**Tasks:**
- [ ] Add custom color palette (accent: deep teal/steel dark)
- [ ] Add custom font family tokens (display + body)
- [ ] Configure spacing scale extensions
- [ ] Add `tailwind.config.ts` with `content` paths
- [ ] Add `globals.css` with CSS variables for light/dark mode
- [ ] Verify dark mode class-based toggle works

---

### Issue #3 — Set up font loading
**Label:** `setup` `design`
**Milestone:** Bootstrap

**Description:**
Load professional fonts via `next/font` for English and Arabic.

**Tasks:**
- [ ] Choose English display + body fonts (e.g. Inter + Instrument Serif or Work Sans)
- [ ] Choose Arabic-compatible body font (e.g. IBM Plex Arabic or Noto Kufi Arabic)
- [ ] Load fonts using `next/font/google`
- [ ] Set `--font-display` and `--font-body` CSS variables
- [ ] Verify Arabic font renders correctly with `dir="rtl"`

---

## 🗂️ MILESTONE 2 — Content & Data Layer

### Issue #4 — Create structured content model `lib/content.ts`
**Label:** `content` `priority: high`
**Milestone:** Content Layer

**Description:**
Create a single strongly typed TypeScript content source for the entire site.

**Tasks:**
- [ ] Define TypeScript interfaces: `HeroContent`, `ServiceCard`, `WhyChooseItem`, `ProcessStep`, `ContactInfo`, `FooterContent`, `SeoMeta`
- [ ] Add `company` identity block (name EN/AR, founding date, license)
- [ ] Add `hero` section content (H1, sub, CTA labels) in `en` and `ar`
- [ ] Add `trustBar` stats array (8+ years, 5.0 rating, 483+ interactions, etc.)
- [ ] Add `about` content in `en` and `ar`
- [ ] Add all 8 services with title, description, keywords in `en` and `ar`
- [ ] Add `serviceAreas` cities array with English + Arabic names
- [ ] Add `whyChooseUs` features array (icon, title, description)
- [ ] Add `processSteps` array (5 steps)
- [ ] Add `contact` block (phone, WhatsApp, email, address, coordinates)
- [ ] Add `seo` metadata for EN and AR homepage and contact page
- [ ] Add `footer` content block

**Acceptance Criteria:**
All content imported from `lib/content.ts` — zero hardcoded strings in components.

---

### Issue #5 — Create SEO utility `lib/seo.ts`
**Label:** `content` `seo`
**Milestone:** Content Layer

**Description:**
Utility functions to generate metadata objects for Next.js `generateMetadata`.

**Tasks:**
- [ ] Create `generateSeoMeta(page, lang)` function
- [ ] Add Open Graph tag generator
- [ ] Add Twitter card generator
- [ ] Add canonical URL builder per route
- [ ] Export reusable defaults for all pages

---

### Issue #6 — Create constants `lib/constants.ts`
**Label:** `content`
**Milestone:** Content Layer

**Tasks:**
- [ ] Add phone number constants
- [ ] Add WhatsApp deep link builder
- [ ] Add Google Maps URL with coordinates
- [ ] Add social links if any
- [ ] Add company registration year, founding date

---

## 🗂️ MILESTONE 3 — Layout & Shell

### Issue #7 — Build root layout `app/layout.tsx`
**Label:** `component` `priority: high`
**Milestone:** Layout Shell

**Tasks:**
- [ ] Set up HTML shell with `lang` and `dir` defaults
- [ ] Add font class injection
- [ ] Add global metadata defaults
- [ ] Import `globals.css`
- [ ] Add skip-to-content link for accessibility
- [ ] Wrap children in `<main>`

---

### Issue #8 — Build responsive header with navigation
**Label:** `component`
**Milestone:** Layout Shell

**Tasks:**
- [ ] Create `components/header.tsx`
- [ ] Add company logo (text or SVG)
- [ ] Add navigation links (Home, Services, Areas, Contact)
- [ ] Add `Call Now` button with `tel:` link
- [ ] Add `WhatsApp` button with deep link
- [ ] Add language switcher toggle (EN / AR)
- [ ] Add mobile hamburger menu
- [ ] Sticky header on scroll
- [ ] Arabic: switch all labels to Arabic, `dir="rtl"`

---

### Issue #9 — Build language switcher component
**Label:** `component` `i18n`
**Milestone:** Layout Shell

**Tasks:**
- [ ] Create `components/language-switcher.tsx`
- [ ] Toggle between `/en` and `/ar` routes
- [ ] Preserve current page path when switching
- [ ] Highlight active language
- [ ] Accessible with `aria-label`

---

### Issue #10 — Build footer `components/footer.tsx`
**Label:** `component`
**Milestone:** Layout Shell

**Tasks:**
- [ ] Company name (EN + AR)
- [ ] Full address block
- [ ] Phone, WhatsApp, email with clickable links
- [ ] Services list
- [ ] Service areas list
- [ ] Copyright line: `© 2026 Amanat Al-Kalima Company. All Rights Reserved.`
- [ ] Google rating mention
- [ ] Social links if applicable
- [ ] Mobile responsive: single column stack

---

## 🗂️ MILESTONE 4 — Homepage Sections (English)

### Issue #11 — Build Hero section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/hero.tsx`
- [ ] H1 heading with SEO-targeted text
- [ ] Arabic H1 line below
- [ ] Sub-headline paragraph
- [ ] CTA buttons: Get Free Quote, Call Now, WhatsApp Us
- [ ] Background: industrial dark or neutral hero
- [ ] Responsive: full-viewport height on desktop, compact on mobile
- [ ] Accessible: correct heading level, button labels

---

### Issue #12 — Build Trust Bar
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/trust-bar.tsx`
- [ ] Render 6 stat items from `trustBar` content
- [ ] Large number + label layout
- [ ] Dividers between items
- [ ] Full-width band below hero
- [ ] Mobile: 2-column or scroll wrap

---

### Issue #13 — Build About section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/about.tsx`
- [ ] English paragraph content
- [ ] Arabic paragraph below or side-by-side
- [ ] Section heading
- [ ] Optional icon or image accent
- [ ] Readable max-width prose container

---

### Issue #14 — Build reusable ServiceCard component
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/service-card.tsx`
- [ ] Accept: icon, title, description, keywords
- [ ] Card with subtle border and shadow
- [ ] Bilingual label support
- [ ] Hover state
- [ ] Accessible card structure

---

### Issue #15 — Build Services section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/services.tsx`
- [ ] Render all 8 service cards from content
- [ ] Responsive grid: 1-col mobile, 2-col tablet, 4-col desktop
- [ ] Section heading: Services / خدماتنا
- [ ] Optional service category icons

---

### Issue #16 — Build Service Areas section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/service-areas.tsx`
- [ ] Section heading: We Cover the Entire Eastern Province
- [ ] Grid of city name cards (EN + AR)
- [ ] Optional map image or visual accent
- [ ] Mobile responsive

---

### Issue #17 — Build Why Choose Us section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/why-choose-us.tsx`
- [ ] Render 10 feature items from content
- [ ] Icon + title + description layout
- [ ] Grid or two-column layout
- [ ] Alternating visual rhythm

---

### Issue #18 — Build Process Steps section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/process-steps.tsx`
- [ ] 5 steps with step number, title, description
- [ ] Horizontal timeline on desktop
- [ ] Vertical stacked on mobile
- [ ] Step connector lines or arrows

---

### Issue #19 — Build CTA Band section
**Label:** `component` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Create `components/cta-band.tsx`
- [ ] Strong headline: "Ready to sell your scrap metal?"
- [ ] Sub-text
- [ ] Two primary CTA buttons: Call + WhatsApp
- [ ] Dark/accent background

---

### Issue #20 — Assemble English Homepage `app/en/page.tsx`
**Label:** `page` `homepage`
**Milestone:** Homepage EN

**Tasks:**
- [ ] Import and compose all homepage sections
- [ ] Correct section order
- [ ] Apply EN SEO metadata via `generateMetadata`
- [ ] Test full page scroll on desktop and mobile

---

## 🗂️ MILESTONE 5 — Arabic Route (RTL)

### Issue #21 — Set up Arabic route `app/ar/page.tsx`
**Label:** `page` `i18n` `priority: high`
**Milestone:** Arabic Route

**Tasks:**
- [ ] Create `/ar` route
- [ ] Set `lang="ar"` and `dir="rtl"` on HTML element
- [ ] Load Arabic font
- [ ] Apply AR SEO metadata
- [ ] Compose same sections with Arabic content

---

### Issue #22 — RTL layout adjustments
**Label:** `i18n` `design`
**Milestone:** Arabic Route

**Tasks:**
- [ ] Audit all components for RTL compatibility
- [ ] Fix text alignment: default `text-right` where needed
- [ ] Mirror flex directions where required
- [ ] Fix icon and arrow directions
- [ ] Fix header navigation alignment
- [ ] Test on mobile at 375px RTL layout

---

## 🗂️ MILESTONE 6 — Contact Page

### Issue #23 — Build Contact Info Card
**Label:** `component` `contact`
**Milestone:** Contact Page

**Tasks:**
- [ ] Create `components/contact-card.tsx`
- [ ] Address block
- [ ] Clickable phone link `tel:`
- [ ] Clickable WhatsApp deep link
- [ ] Clickable email `mailto:`
- [ ] Google Maps link using coordinates
- [ ] Business license note

---

### Issue #24 — Build Contact Inquiry Form
**Label:** `component` `contact`
**Milestone:** Contact Page

**Tasks:**
- [ ] Create `components/contact-form.tsx`
- [ ] Fields: Full Name, Company Name, Phone, Metal Type, Quantity, City, Message
- [ ] Required field validation with inline errors
- [ ] Metal Type dropdown
- [ ] Submit button with loading state
- [ ] Success message after submission
- [ ] Error fallback message
- [ ] Accessible labels and error roles
- [ ] Phase A: static UI only
- [ ] Phase B: connect to Formspree or API route

---

### Issue #25 — Assemble Contact Page `app/contact/page.tsx`
**Label:** `page` `contact`
**Milestone:** Contact Page

**Tasks:**
- [ ] Page heading: Contact Us / تواصل معنا
- [ ] Two-column layout: form left, contact card right
- [ ] Mobile: stacked single column
- [ ] Contact page SEO metadata
- [ ] Add breadcrumb if applicable

---

## 🗂️ MILESTONE 7 — SEO & Structured Data

### Issue #26 — Implement page-level SEO metadata
**Label:** `seo`
**Milestone:** SEO

**Tasks:**
- [ ] Add `generateMetadata` to homepage EN
- [ ] Add `generateMetadata` to homepage AR
- [ ] Add `generateMetadata` to contact page
- [ ] Add Open Graph image (`og-image.jpg` 1200×630)
- [ ] Add Twitter card tags
- [ ] Add canonical URLs

---

### Issue #27 — Implement JSON-LD structured data
**Label:** `seo`
**Milestone:** SEO

**Tasks:**
- [ ] Create `components/seo-schema.tsx`
- [ ] `Organization` schema
- [ ] `LocalBusiness` schema
- [ ] `PostalAddress` schema
- [ ] `ContactPoint` schema
- [ ] `GeoCoordinates` schema
- [ ] `WebSite` schema
- [ ] Inject into homepage via `<Script>` with `application/ld+json`
- [ ] Validate using Google Rich Results Test

---

### Issue #28 — Add XML sitemap
**Label:** `seo`
**Milestone:** SEO

**Tasks:**
- [ ] Create `app/sitemap.ts`
- [ ] Include EN and AR routes
- [ ] Include contact page
- [ ] Set `lastModified` and `priority` values
- [ ] Verify sitemap accessible at `/sitemap.xml`

---

### Issue #29 — Add robots.txt
**Label:** `seo`
**Milestone:** SEO

**Tasks:**
- [ ] Create `app/robots.ts`
- [ ] Allow all crawlers
- [ ] Point to sitemap

---

## 🗂️ MILESTONE 8 — Mobile & Accessibility QA

### Issue #30 — Mobile sticky CTA bar
**Label:** `component` `mobile`
**Milestone:** QA

**Tasks:**
- [ ] Create `components/mobile-cta-bar.tsx`
- [ ] Fixed bottom bar on mobile only
- [ ] Call and WhatsApp buttons full width
- [ ] Hidden on desktop (`hidden md:hidden`)
- [ ] Proper z-index so it doesn't block content

---

### Issue #31 — Accessibility audit
**Label:** `qa` `a11y`
**Milestone:** QA

**Tasks:**
- [ ] Check all headings hierarchy (one H1 per page)
- [ ] All images have `alt` text
- [ ] All form fields have labels
- [ ] Keyboard navigation works through all interactive elements
- [ ] Focus states visible
- [ ] `aria-label` on icon-only buttons
- [ ] Skip to content link works
- [ ] Color contrast passes WCAG AA

---

### Issue #32 — Responsive QA
**Label:** `qa` `responsive`
**Milestone:** QA

**Tasks:**
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 390px (iPhone 14)
- [ ] Test at 768px (iPad)
- [ ] Test at 1024px (laptop)
- [ ] Test at 1440px (desktop)
- [ ] Fix any overflow issues
- [ ] Fix any text truncation issues
- [ ] Fix any spacing inconsistencies

---

### Issue #33 — Performance audit
**Label:** `qa` `performance`
**Milestone:** QA

**Tasks:**
- [ ] Run Lighthouse report
- [ ] Optimize images: add `width`, `height`, `loading="lazy"`
- [ ] Verify fonts preloaded
- [ ] Check JS bundle size
- [ ] Fix any CLS issues
- [ ] Target Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO

---

### Issue #34 — Cross-browser QA
**Label:** `qa`
**Milestone:** QA

**Tasks:**
- [ ] Test in Chrome
- [ ] Test in Safari
- [ ] Test in Firefox
- [ ] Test on iOS Safari (real device or simulator)
- [ ] Test on Android Chrome
- [ ] Fix any browser-specific issues

---

## 🗂️ MILESTONE 9 — Deployment

### Issue #35 — Configure Vercel deployment
**Label:** `devops`
**Milestone:** Deployment

**Tasks:**
- [ ] Push final code to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Set environment variables if any
- [ ] Configure build command: `next build`
- [ ] Configure output directory
- [ ] Verify preview deployment works

---

### Issue #36 — Connect custom domain `aalkc.com`
**Label:** `devops`
**Milestone:** Deployment

**Tasks:**
- [ ] Add `aalkc.com` in Vercel project settings
- [ ] Update DNS A records or CNAME at domain registrar
- [ ] Verify HTTPS and SSL active
- [ ] Test all routes on live domain

---

### Issue #37 — Post-launch setup
**Label:** `devops` `seo`
**Milestone:** Deployment

**Tasks:**
- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data in Rich Results Test
- [ ] Add Google Analytics or GA4 snippet
- [ ] Test contact form on live site
- [ ] Test all CTA buttons on mobile
- [ ] Screenshot homepage for records

---

## 📋 PROJECT BOARD COLUMNS

| Column | Issues |
|---|---|
| **📥 Backlog** | All issues above initially |
| **📋 To Do** | Current milestone issues |
| **🔧 In Progress** | Actively worked issues |
| **👀 In Review** | PR open, awaiting review |
| **✅ Done** | Merged and verified |

---

## 🏷️ LABELS LIST

| Label | Color | Description |
|---|---|---|
| `setup` | Gray | Project initialization |
| `design` | Purple | Visual / UI decisions |
| `content` | Blue | Content model and data |
| `component` | Green | Reusable UI components |
| `page` | Teal | Full page assemblies |
| `i18n` | Orange | Language / translation |
| `seo` | Yellow | SEO and metadata |
| `qa` | Red | Quality assurance |
| `a11y` | Pink | Accessibility |
| `responsive` | Lime | Mobile responsiveness |
| `performance` | Cyan | Speed optimization |
| `devops` | Dark | Deployment and hosting |
| `priority: high` | Dark Red | Must complete first |
| `mobile` | Indigo | Mobile-specific work |
| `contact` | Brown | Contact page features |
| `homepage` | Emerald | Homepage sections |

---

## 📅 MILESTONE SUMMARY

| Milestone | Issues | Estimated Effort |
|---|---|---|
| 1 — Bootstrap | #1–3 | 1 day |
| 2 — Content Layer | #4–6 | 1 day |
| 3 — Layout Shell | #7–10 | 1 day |
| 4 — Homepage EN | #11–20 | 2–3 days |
| 5 — Arabic Route | #21–22 | 1 day |
| 6 — Contact Page | #23–25 | 1 day |
| 7 — SEO | #26–29 | 1 day |
| 8 — QA | #30–34 | 1–2 days |
| 9 — Deployment | #35–37 | 0.5 day |
| **Total** | **37 issues** | **~10–12 days** |

