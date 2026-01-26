# Tigre Tigre - Project Implementation Plan

## Project Overview

A sleek, animated marketing website for **Tigre Tigre** chili crunch brand.

**Website:** tigre-tigre.com
**Stack:** React + Vite + shadcn/ui + GSAP + Stripe Payment Links
**Languages:** Bulgarian (bg), English (en)
**Colors:** Black (#000000), White (#FFFFFF)
**Font:** Arial

---

## Implementation Phases

### Phase 1: Foundation (Simple) ✅ Complete

- [x] Create project folder
- [x] Initialize git repository
- [x] Create PLAN.md and CLAUDE.md
- [x] Initialize Vite + React + TypeScript project
- [x] Configure project structure (folders, aliases)
- [x] Install and configure Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Set up basic ESLint + Prettier

### Phase 2: Internationalization Setup (Simple) ✅ Complete

- [x] Install i18next and react-i18next
- [x] Create translation file structure (`/locales/en/`, `/locales/bg/`)
- [x] Set up language detection and switching
- [x] Create initial translation keys for common UI elements
- [x] Add language toggle component

### Phase 3: Core Layout & Components (Medium) ✅ Complete

- [x] Create base layout component
- [x] Build responsive navigation (mobile hamburger, desktop)
- [x] Create footer component
- [x] Set up typography system (Arial, sizes, weights)
- [x] Create reusable button components (shadcn variants)
- [x] Build section container components

### Phase 4: Homepage Sections (Medium) ✅ Complete

- [x] Hero section with product showcase area
- [x] About/Story section
- [x] Product features/benefits section
- [x] Testimonials section (placeholder)
- [x] Call-to-action section
- [x] Contact/Footer section

### Phase 5: Animations with GSAP (Medium-Hard) ✅ Complete

- [x] Install GSAP and ScrollTrigger
- [x] Hero entrance animations
- [x] Scroll-triggered section reveals
- [x] Smooth parallax effects (hook ready)
- [x] Micro-interactions (buttons, hovers) - via Tailwind transitions
- [ ] Page transition effects (optional - skipped)

### Phase 6: Stripe Integration (Medium) ✅ In Progress

- [ ] Create Stripe account and get API keys
- [ ] Set up environment variables
- [ ] Create payment link buttons/components
- [ ] Build product pricing section
- [ ] Add "Buy Now" CTAs with Stripe links
- [ ] Test payment flow

### Phase 7: Polish & Optimization (Hard) ✅ Complete

- [x] Performance optimization (lazy loading, code splitting)
- [x] SEO meta tags and Open Graph
- [x] Accessibility audit (ARIA, keyboard nav)
- [x] Mobile responsiveness fine-tuning
- [x] Cross-browser testing
- [x] Loading states and error handling

### Phase 8: Deployment (Medium)

- [ ] Choose hosting (Vercel, Netlify, etc.)
- [ ] Configure build scripts
- [ ] Set up domain (tigre-tigre.com)
- [ ] Configure SSL
- [ ] Set up analytics (optional)

---

## Future Considerations (Backend Phase)

- Node.js/Express or similar backend
- Stripe webhooks for order processing
- Customer database
- Order management
- Email notifications
- Inventory tracking

---

## Technical Decisions Log

| Date       | Decision                  | Reasoning                                       |
| ---------- | ------------------------- | ----------------------------------------------- |
| 2026-01-26 | React + Vite over Next.js | No SSR needed for marketing site, simpler setup |
| 2026-01-26 | GSAP for animations       | Industry standard, powerful ScrollTrigger       |
| 2026-01-26 | Stripe Payment Links      | Simple integration, no backend needed initially |
| 2026-01-26 | i18next for translations  | Most popular React i18n solution                |

---

## Notes

- Keep components modular for future backend integration
- Use environment variables for all API keys
- Maintain translation parity between BG and EN
- Design with potential color additions in mind
