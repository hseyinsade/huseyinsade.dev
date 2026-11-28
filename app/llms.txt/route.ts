import { education, jobs, languages, profile, projects, stack, text } from "@/lib/content";
import { langPath, pageMeta, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the same content as the site.
 */
export function GET() {
  const period = (start: string, end?: string) => `${start} – ${end ?? "present"}`;

  const body = `# ${profile.name}

> ${pageMeta.en.description}

- Website (English): ${siteUrl}${langPath.en}
- Website (Turkish): ${siteUrl}${langPath.tr}
- Website (German): ${siteUrl}${langPath.de}
- Email: ${profile.email}
- Phone: ${profile.phone}
- CV: ${siteUrl}${profile.cv}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Location: Istanbul, Türkiye

## Experience

${jobs
  .map(
    (j) =>
      `- **${j.company}**${j.note ? ` (${j.note.en})` : ""} — ${j.role.en}, ${period(j.start, j.end)}${
        j.location ? `, ${j.location}` : ""
      }. ${j.summary.en}${j.highlights ? "\n" + j.highlights.en.map((h) => `  - ${h}`).join("\n") : ""}\n  - Stack: ${j.tags.join(", ")}`,
  )
  .join("\n")}

## Projects

${projects
  .map((p) => `- [${p.name}](${p.url ?? siteUrl + "/#work"}) — ${p.category.en}, ${text(p.company, "en")}. ${p.description.en} (${p.tags.join(", ")})`)
  .join("\n")}

## Skills

${stack.map((g) => `- ${g.group.en}: ${g.items.join(", ")}`).join("\n")}

## Education

${education.map((e) => `- ${e.school} — ${e.degree.en} (${text(e.years, "en")})`).join("\n")}

## Languages

${languages.map((l) => `- ${l.name.en}: ${l.level.en}`).join("\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
