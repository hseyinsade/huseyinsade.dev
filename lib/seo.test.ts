import { education, langs } from "./content";
import { hreflang, langPath, pageMeta, profileJsonLd, siteUrl } from "./seo";

describe("seo", () => {
  it("maps every language to its page", () => {
    expect(langPath).toEqual({ en: "/", tr: "/tr/", de: "/de/" });
    expect(hreflang(siteUrl)).toEqual({ en: `${siteUrl}/`, tr: `${siteUrl}/tr/`, de: `${siteUrl}/de/` });
  });

  it.each(langs)("keeps %s title and description within search-snippet length", (lang) => {
    expect(pageMeta[lang].title.length).toBeLessThanOrEqual(70);
    expect(pageMeta[lang].description.length).toBeLessThanOrEqual(300);
  });

  it.each(langs)("builds a ProfilePage JSON-LD for %s", (lang) => {
    const ld = profileJsonLd(lang) as Record<string, unknown>;
    expect(ld["@context"]).toBe("https://schema.org");
    const json = JSON.stringify(ld);
    expect(json).toContain('"ProfilePage"');
    expect(json).toContain('"Person"');
    expect(json).toContain("Huseyin Sade");
  });

  it("lists only finished degrees as alumniOf", () => {
    const find = (v: unknown): { name: string }[] | undefined => {
      if (!v || typeof v !== "object") return;
      const o = v as Record<string, unknown>;
      if (Array.isArray(o.alumniOf)) return o.alumniOf as { name: string }[];
      for (const x of Object.values(o)) {
        const r = find(x);
        if (r) return r;
      }
    };
    const alumni = find(profileJsonLd("en"))!.map((a) => a.name);
    expect(alumni).toEqual(education.filter((e) => !e.ongoing).map((e) => e.school));
    expect(alumni).not.toContain("Sakarya University of Applied Sciences");
  });
});
