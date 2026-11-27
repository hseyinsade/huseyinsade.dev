# huseyinsade.dev

Personal site of Huseyin Sade — Frontend Developer.

Built with **Next.js 16.4.6 (App Router)**, **TypeScript** and **SCSS Modules**, exported as a fully static site.

## Features

- EN at `/`, TR at `/tr/`, DE at `/de/` — all pre-rendered, so text never swaps after load. A tiny head script sends visitors to their saved (or browser) language before first paint
- Light / dark theme with no flash on load
- **Inspect mode** — press `I` for a DevTools-style element inspector
- Scroll reveal animations that respect `prefers-reduced-motion`
- SEO / AEO: per-language titles and descriptions, hreflang, JSON-LD `ProfilePage` + `Person` (`lib/seo.ts`), generated `robots.txt`, `sitemap.xml`, `llms.txt`, and Open Graph images (`/og-en.png`, `/og-tr.png`, `/og-de.png`, rendered at build time from `lib/og.tsx`)
- Analytics: Google Tag Manager with Consent Mode v2 and a consent banner; named `dataLayer` events for clicks and section views — setup guide in [`docs/analytics.md`](docs/analytics.md)
- All content lives in [`lib/content.ts`](lib/content.ts)
- Styles: global tokens and reset in `styles/globals.scss`, shared mixins in `styles/_mixins.scss`, one `*.module.scss` per component

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs a static site to ./out
```

Deploy `out/` to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).
