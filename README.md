# huseyinsade.dev

Personal site of Huseyin Sade — Frontend Developer.

Built with **Next.js 16.4.6 (App Router)**, **React 19**, **TypeScript** and **SCSS Modules**, exported as a fully static site. Tested with **Vitest** and **Testing Library**.

## Features

- EN at `/`, TR at `/tr/`, DE at `/de/` — all pre-rendered, so text never swaps after load. A tiny head script sends visitors to their saved (or browser) language before first paint
- Light / dark theme with no flash on load
- **Inspect mode** — press `I` for a DevTools-style element inspector
- Scroll reveal animations that respect `prefers-reduced-motion`
- SEO / AEO: per-language titles and descriptions, hreflang, JSON-LD `ProfilePage` + `Person` (`lib/seo.ts`), generated `robots.txt`, `sitemap.xml`, `llms.txt`, and Open Graph images (`/og-en.png`, `/og-tr.png`, `/og-de.png`, rendered at build time from `lib/og.tsx`)
- Analytics: Google Tag Manager with Consent Mode v2 and a consent banner; named `dataLayer` events for clicks and section views — setup guide in [`docs/analytics.md`](docs/analytics.md)
- Contact: email, phone, and a form that saves each message in **Supabase** and emails it through [FormSubmit](https://formsubmit.co) (the first message sends a one-time activation email to the inbox)
- **Supabase** (browser-only, publishable key + Row Level Security): contact messages and an "open to new projects" badge in the hero that changes without a rebuild — setup in [`docs/supabase.md`](docs/supabase.md), schema in `supabase/schema.sql`
- CV download in the header, served from `public/huseyinsade-cv.pdf`
- All content lives in [`lib/content.ts`](lib/content.ts)
- Styles: global tokens and reset in `styles/globals.scss`, shared mixins in `styles/_mixins.scss`, one `*.module.scss` per component — no inline styles (a test checks every page)

## Structure

Components follow [atomic design](https://atomicdesign.bradfrost.com/). Each lives in its own folder with its styles, tests and an `index.ts`:

```
components/
  atoms/        Icon, Tag, Reveal
  molecules/    TagList, SectionHeader, CopyButton, Clock, LanguageSwitch, ThemeToggle,
                InspectToggle, SocialLinks, ContactForm, AvailabilityBadge, Waveform, VideoPlayer, ProjectCard, ProjectRow,
                JobItem, StackGroup
  organisms/    Nav, Hero, CodeCard, Work, Experience, Stack, Contact, Footer,
                Inspector, ConsentBanner
  templates/    HomePage, RootShell
  providers/    SiteProvider (language, theme, inspect mode), Analytics
lib/            content, SEO, analytics, Supabase + contact senders, small helpers (date, cx, selector)
supabase/       schema.sql (tables + RLS)
test/           Vitest setup and render helpers
```

```
components/molecules/CopyButton/
  CopyButton.tsx
  CopyButton.module.scss
  CopyButton.test.tsx
  index.ts
```

Molecules take data through props; organisms read the site context (`useSite`) and pass it down.

## Develop

Requires Node 22.12+ or 24 (see `.nvmrc`).

```bash
npm install
npm run dev
```

## Test

```bash
npm test             # run once
npm run test:watch   # re-run on change
npm run typecheck
```

## Build

```bash
npm run build   # outputs a static site to ./out
```

Deploy `out/` to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).
