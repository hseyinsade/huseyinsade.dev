import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { Lang } from "@/lib/content";
import { GTM_ID, gtmHeadSnippet } from "@/lib/analytics";
import { hreflang, langPath, pageMeta, profileJsonLd, siteUrl } from "@/lib/seo";
import { Providers } from "./providers";
import "@/styles/globals.scss";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono" });
const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export function metadataFor(lang: Lang): Metadata {
  const { title, description, locale } = pageMeta[lang];
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: langPath[lang],
      siteName: "huseyinsade.dev",
      type: "profile",
      locale,
      images: [{ url: `/og-${lang}.png`, width: 1200, height: 630, alt: title }],
    },
    icons: { apple: "/apple-touch-icon.png" },
    twitter: { card: "summary_large_image", title, description, images: [`/og-${lang}.png`] },
    authors: [{ name: "Huseyin Sade", url: siteUrl }],
    creator: "Huseyin Sade",
    alternates: {
      canonical: langPath[lang],
      languages: { ...hreflang(), "x-default": langPath.en },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0b" },
  ],
};

/**
 * Runs in <head>, before anything is painted:
 * - applies the saved / system theme so it never flashes;
 * - sends the visitor to their language's page. A saved choice always wins;
 *   with no saved choice, a Turkish or German browser landing on "/" goes to "/tr/" or "/de/".
 *   The language pages themselves are pre-rendered, so text never swaps after load.
 */
function headScript(lang: Lang) {
  return `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t}catch(e){d.dataset.theme='dark'}try{var cur=${JSON.stringify(lang)},paths=${JSON.stringify(langPath)},s=localStorage.getItem('lang'),b=(navigator.language||'').toLowerCase().slice(0,2),has=function(k){return Object.prototype.hasOwnProperty.call(paths,k)},want=has(s)?s:(cur==='en'&&b!=='en'&&has(b)?b:null);if(want&&want!==cur){window.__langRedirect=1;d.style.visibility='hidden';location.replace(paths[want]+location.hash)}}catch(e){}})()`;
}

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript(lang) }} />
        {/* Google Tag Manager (skipped while redirecting to the visitor's language, so a visit counts once) */}
        <script dangerouslySetInnerHTML={{ __html: `if(!window.__langRedirect){${gtmHeadSnippet()}}` }} />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          // `<` is escaped so content can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd(lang)).replace(/</g, "\\u003c") }}
        />
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
