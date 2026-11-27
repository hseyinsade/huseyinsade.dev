import type { MetadataRoute } from "next";
import { langs } from "@/lib/content";
import { hreflang, langPath, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = hreflang(siteUrl);
  const lastModified = new Date();
  return langs.map((lang) => ({
    url: siteUrl + langPath[lang],
    lastModified,
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
