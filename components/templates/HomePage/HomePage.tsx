import { ConsentBanner } from "@/components/organisms/ConsentBanner";
import { Contact } from "@/components/organisms/Contact";
import { Experience } from "@/components/organisms/Experience";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Inspector } from "@/components/organisms/Inspector";
import { Nav } from "@/components/organisms/Nav";
import { Stack } from "@/components/organisms/Stack";
import { Work } from "@/components/organisms/Work";
import { Analytics } from "@/components/providers";
import { ui, type Lang } from "@/lib/content";

/** The one-page portfolio. Rendered once per language ("/", "/tr/", "/de/"). */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <a href="#work" className="skip-link">
        {ui.skip[lang]}
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Inspector />
      <ConsentBanner />
      <Analytics />
    </>
  );
}
