import { education, jobs, languages, profile, projects, stack, ui, yearsOfExperience, type Lang } from "./content";

export const siteUrl = "https://huseyinsade.dev";

/** URL path of the page for each language. */
export const langPath: Record<Lang, string> = { en: "/", tr: "/tr/", de: "/de/" };

/** hreflang map shared by <head> links and the sitemap. */
export const hreflang = (base = "") => ({
  en: base + langPath.en,
  tr: base + langPath.tr,
  de: base + langPath.de,
});

export const pageMeta: Record<Lang, { title: string; description: string; locale: string }> = {
  en: {
    title: "Huseyin Sade — Frontend Developer (React, Next.js) · Istanbul",
    description:
      `Huseyin Sade is a frontend developer in Istanbul with ${yearsOfExperience}+ years of experience building streaming, e-commerce and telecom products with React, Next.js and TypeScript. Currently at Atmosware (Turkcell Group) working on fizy.`,
    locale: "en_US",
  },
  tr: {
    title: "Huseyin Sade — Frontend Developer (React, Next.js) · İstanbul",
    description:
      `Huseyin Sade, React, Next.js ve TypeScript ile yayın, e-ticaret ve telekom ürünleri geliştiren, ${yearsOfExperience}+ yıl deneyimli İstanbul'da bir frontend developer. Şu an Atmosware'de (Turkcell Grubu) fizy üzerinde çalışıyor.`,
    locale: "tr_TR",
  },
  de: {
    title: "Huseyin Sade — Frontend Developer (React, Next.js) · Istanbul",
    description:
      `Huseyin Sade ist Frontend Developer in Istanbul mit über ${yearsOfExperience} Jahren Erfahrung in Streaming-, E-Commerce- und Telekommunikationsprodukten mit React, Next.js und TypeScript. Derzeit bei Atmosware (Turkcell-Gruppe) an fizy tätig.`,
    locale: "de_DE",
  },
};

const current = jobs.find((j) => !j.end)!;

/**
 * schema.org ProfilePage + Person. This is what search engines and AI answer
 * engines read to understand who the page is about.
 */
export function profileJsonLd(lang: Lang) {
  const url = siteUrl + langPath[lang];
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: ["Hüseyin Sade", "Huseyin SADE"],
    url: siteUrl + "/",
    email: `mailto:${profile.email}`,
    telephone: profile.phone.replace(/ /g, ""),
    jobTitle: "Frontend Developer",
    description: pageMeta[lang].description,
    worksFor: {
      "@type": "Organization",
      name: current.company,
      parentOrganization: { "@type": "Organization", name: "Turkcell" },
    },
    homeLocation: {
      "@type": "Place",
      name: "Istanbul, Türkiye",
      address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
    },
    alumniOf: education.filter((e) => !e.ongoing).map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "B.Sc. Computer Engineering",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Sakarya University" },
    },
    knowsAbout: stack.flatMap((g) => g.items),
    knowsLanguage: languages.map((l) => l.name.en),
    sameAs: [profile.github, profile.linkedin],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: pageMeta[lang].title,
        inLanguage: lang,
        dateModified: new Date().toISOString().slice(0, 10),
        mainEntity: { "@id": person["@id"] },
      },
      person,
      {
        "@type": "ItemList",
        name: ui.sections.work[lang],
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.name,
            ...(p.url ? { url: p.url } : {}),
            description: p.description[lang],
            keywords: p.tags.join(", "),
            contributor: { "@id": person["@id"] },
          },
        })),
      },
    ],
  };
}
