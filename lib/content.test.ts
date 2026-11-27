import { education, jobs, langs, projects, stack, text, ui, yearsOfExperience } from "./content";

/** Walks any value and returns every { en, tr, de } object inside it. */
function translations(value: unknown, path = "content", out: [string, Record<string, unknown>][] = []) {
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if ("en" in obj && "tr" in obj) out.push([path, obj]);
    else for (const [k, v] of Object.entries(obj)) translations(v, `${path}.${k}`, out);
  }
  return out;
}

describe("content", () => {
  it.each(translations({ ui, projects, jobs, stack, education }))("%s is translated into every language", (_, t) => {
    for (const lang of langs) {
      const v = t[lang];
      expect(v, lang).toBeTruthy();
      if (Array.isArray(v)) expect(v.length, lang).toBe((t.en as unknown[]).length);
    }
  });

  it("lists jobs newest first, with only the latest one ongoing", () => {
    const starts = jobs.map((j) => j.start);
    expect(starts).toEqual([...starts].sort().reverse());
    expect(jobs.filter((j) => !j.end)).toHaveLength(1);
    expect(jobs[0].end).toBeUndefined();
  });

  it("uses valid YYYY-MM dates that never end before they start", () => {
    for (const j of jobs) {
      expect(j.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      if (j.end) {
        expect(j.end).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
        expect(j.end >= j.start).toBe(true);
      }
    }
  });

  it("gives every linked project a matching https domain", () => {
    for (const p of projects.filter((p) => p.url)) {
      expect(p.url).toMatch(/^https:\/\//);
      if (p.domain) expect(new URL(p.url!).hostname.replace(/^www\./, "")).toBe(p.domain.replace(/^www\./, ""));
    }
  });

  it("has unique project names (used as React keys and analytics labels)", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("derives years of experience from the build year", () => {
    expect(yearsOfExperience).toBe(2026 - 2018);
  });

  it("text() returns plain strings as-is and picks the language otherwise", () => {
    expect(text("Atmosware", "tr")).toBe("Atmosware");
    expect(text({ en: "a", tr: "b", de: "c" }, "de")).toBe("c");
  });
});
