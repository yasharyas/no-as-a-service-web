# 🚫 No-as-a-Service — Web Platform

> **Say No. Creatively.** Generate creative rejection reasons instantly. Copy, share, and customize witty ways to say no.

## ✨ Features

- **Random No Generator** — Get creative rejection reasons from the NaaS API
- **Category Filtering** — Professional, Personal, Student, Developer, Savage, Polite, Dramatic
- **Copy & Share** — One-click copy, share to Twitter/X, WhatsApp, LinkedIn, or via native Web Share API
- **Shareable URLs** — Share specific rejections via `/?reason=...`
- **Dark/Light Mode** — System preference detection + manual toggle with `localStorage` persistence
- **Responsive** — Mobile-first design with breakpoints at 640px and 1024px
- **Edge Proxy** — Cached API proxy via Next.js Edge Runtime for low latency
- **Accessible** — WCAG 2.1 AA compliant with focus indicators, ARIA labels, skip links, and reduced-motion support

## 🛠 Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Framework    | Next.js 16 (App Router)            |
| Language     | TypeScript (strict mode)           |
| Styling      | TailwindCSS v4                     |
| Animations   | Framer Motion                      |
| Icons        | Lucide React                       |
| API          | Edge Runtime proxy → NaaS API      |
| CI/CD        | GitHub Actions                     |
| Hosting      | Vercel (free tier)                  |

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ and npm
- Git

### Local Development

```bash
# Clone the repo
git clone https://github.com/yasharyas/no-as-a-service-web.git
cd no-as-a-service-web

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/no/route.ts      # Edge proxy to NaaS API
│   ├── layout.tsx            # Root layout with SEO & dark mode
│   ├── page.tsx              # Main page composing all components
│   ├── globals.css           # Theme & Tailwind config
│   ├── sitemap.ts            # Dynamic sitemap generation
│   └── robots.ts             # Robots.txt generation
├── components/
│   ├── Header.tsx            # Sticky header with logo, GitHub link, theme toggle
│   ├── HeroSection.tsx       # Hero with animated title
│   ├── GeneratorCard.tsx     # Main card displaying rejection reasons
│   ├── ActionButtons.tsx     # Generate, Copy, Share buttons
│   ├── CategorySelector.tsx  # Category pill selector
│   ├── HowItWorks.tsx        # 3-step explainer section
│   ├── ApiDocsPreview.tsx    # Developer API preview with code block
│   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   ├── ErrorBoundary.tsx     # React error boundary
│   └── Footer.tsx            # Site footer
├── hooks/
│   ├── useNoGenerator.ts     # Core hook: fetch, cache, fallback pool
│   ├── useClipboard.ts       # Copy-to-clipboard with fallback
│   └── useTheme.ts           # Theme state management
├── lib/
│   ├── api.ts                # API fetch functions
│   ├── constants.ts          # App-wide constants & config
│   └── utils.ts              # Utility functions (cn, sanitize, debounce)
└── types/
    └── index.ts              # TypeScript type definitions
```

## 🔌 API

The app proxies requests through an Edge API route at `/api/no`:

```bash
# Random rejection
curl http://localhost:3000/api/no

# By category
curl http://localhost:3000/api/no?category=professional
```

Upstream API: `https://naas.isalman.dev/no` (120 req/min/IP)

## 📄 License

MIT

---

Built with ❤️ by [yasharyas](https://github.com/yasharyas)
