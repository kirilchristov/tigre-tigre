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

### Phase 1: Foundation (Simple) ✅ In Progress
- [x] Create project folder
- [x] Initialize git repository
- [x] Create PLAN.md and CLAUDE.md
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure project structure (folders, aliases)
- [ ] Install and configure Tailwind CSS
- [ ] Install and configure shadcn/ui
- [ ] Set up basic ESLint + Prettier

### Phase 2: Internationalization Setup (Simple)
- [ ] Install i18next and react-i18next
- [ ] Create translation file structure (`/locales/en/`, `/locales/bg/`)
- [ ] Set up language detection and switching
- [ ] Create initial translation keys for common UI elements
- [ ] Add language toggle component

### Phase 3: Core Layout & Components (Medium)
- [ ] Create base layout component
- [ ] Build responsive navigation (mobile hamburger, desktop)
- [ ] Create footer component
- [ ] Set up typography system (Arial, sizes, weights)
- [ ] Create reusable button components (shadcn variants)
- [ ] Build section container components

### Phase 4: Homepage Sections (Medium)
- [ ] Hero section with product showcase area
- [ ] About/Story section
- [ ] Product features/benefits section
- [ ] Testimonials section (placeholder)
- [ ] Call-to-action section
- [ ] Contact/Footer section

### Phase 5: Animations with GSAP (Medium-Hard)
- [ ] Install GSAP and ScrollTrigger
- [ ] Hero entrance animations
- [ ] Scroll-triggered section reveals
- [ ] Smooth parallax effects
- [ ] Micro-interactions (buttons, hovers)
- [ ] Page transition effects (optional)

### Phase 6: Stripe Integration (Medium)
- [ ] Create Stripe account and get API keys
- [ ] Set up environment variables
- [ ] Create payment link buttons/components
- [ ] Build product pricing section
- [ ] Add "Buy Now" CTAs with Stripe links
- [ ] Test payment flow

### Phase 7: Polish & Optimization (Hard)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] SEO meta tags and Open Graph
- [ ] Accessibility audit (ARIA, keyboard nav)
- [ ] Mobile responsiveness fine-tuning
- [ ] Cross-browser testing
- [ ] Loading states and error handling

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

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-01-26 | React + Vite over Next.js | No SSR needed for marketing site, simpler setup |
| 2026-01-26 | GSAP for animations | Industry standard, powerful ScrollTrigger |
| 2026-01-26 | Stripe Payment Links | Simple integration, no backend needed initially |
| 2026-01-26 | i18next for translations | Most popular React i18n solution |

---

## Notes
- Keep components modular for future backend integration
- Use environment variables for all API keys
- Maintain translation parity between BG and EN
- Design with potential color additions in mind
