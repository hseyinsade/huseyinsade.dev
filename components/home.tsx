import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent";
import { Contact, Footer } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Inspector } from "@/components/inspector";
import { Nav } from "@/components/nav";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { ui, type Lang } from "@/lib/content";

export function Home({ lang }: { lang: Lang }) {
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
