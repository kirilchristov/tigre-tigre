# tigre tigre - Premium Chili Crunch Website

A sleek, animated marketing website for tigre tigre chili crunch brand built with React, Vite, and GSAP.

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** GSAP + ScrollTrigger
- **Internationalization:** i18next (English & Bulgarian)
- **Icons:** Lucide React

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🏗️ Build

```bash
npm run build
```

The build output will be in the `dist` folder.

## 👀 Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment to Vercel

### Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))

### Branch/Environment Policy

- `main` branch -> production environment
- `preview` branch -> staging environment (`staging.tigre-tigre.com`)
- Keep staging non-indexable by bots/search engines

### Steps

1. **Push your code to GitHub** (if not already done):

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tigre-tigre.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Configure Custom Domain (staging.tigre-tigre.com):**
   - In your Vercel project settings, go to "Domains"
   - Add `staging.tigre-tigre.com`
   - Follow the instructions to configure your DNS settings

### Environment Variables

If you need to add environment variables (e.g., for Stripe):

1. Copy `.env.example` to `.env.local` for local development
2. Add variables to Vercel project settings under "Environment Variables"

## 📁 Project Structure

```
tigre-tigre/
├── public/
│   ├── images/          # Optimized product & hero images
│   └── locales/         # Translation files (en, bg)
├── src/
│   ├── components/
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── sections/    # Hero, About, Features, etc.
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom GSAP animation hooks
│   ├── lib/             # Utilities & i18n config
│   └── styles/          # Global CSS
├── vercel.json          # Vercel configuration
└── vite.config.ts       # Vite configuration
```

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth GSAP animations
- ✅ Scroll-triggered reveals
- ✅ Bilingual support (EN/BG)
- ✅ SEO optimized
- ✅ Accessibility compliant (WCAG)
- ✅ Performance optimized (lazy loading, code splitting)
- ✅ Loading states & error handling

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 License

Private - All rights reserved
