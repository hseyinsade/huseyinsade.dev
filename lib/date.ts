import type { Lang } from "./content";

const locales: Record<Lang, string> = { en: "en-US", tr: "tr-TR", de: "de-DE" };

/** "2023-04" → "Apr 2023" / "Nis 2023" / "Apr. 2023" */
export function formatMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split("-").map(Number);
  return new Intl.DateTimeFormat(locales[lang], { month: "short", year: "numeric" }).format(new Date(y, m - 1, 1));
}

/** Length of a job, both months inclusive. A missing end means "until now". */
export function formatDuration(start: string, end: string | undefined, lang: Lang, now = new Date()) {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12);
  const mo = months % 12;
  if (lang === "tr") return [y && `${y} yıl`, mo && `${mo} ay`].filter(Boolean).join(" ");
  if (lang === "de")
    return [y && `${y} ${y > 1 ? "Jahre" : "Jahr"}`, mo && `${mo} ${mo > 1 ? "Monate" : "Monat"}`].filter(Boolean).join(" ");
  return [y && `${y} yr${y > 1 ? "s" : ""}`, mo && `${mo} mo`].filter(Boolean).join(" ");
}
