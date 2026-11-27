import { ImageResponse } from "next/og";
import { profile, ui, type Lang } from "./content";

// Rendered once at build time (static export) into a PNG.
export const ogSize = { width: 1200, height: 630 };

const c = {
  bg: "#0c0c0b",
  fg: "#edece6",
  muted: "#918f87",
  line: "#252420",
  accent: "#d2ff45",
};

/** Fetches a TTF from Google Fonts (satori can't read woff2). Runs only at build time. */
async function googleFont(family: string, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
  ).text();
  const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1];
  if (!url) throw new Error(`Could not load font ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export async function renderOgImage(lang: Lang) {
  const title = profile.name;
  const role = "Frontend Developer.";
  const tagline = [ui.hero.title1[lang], ui.hero.title2[lang], ui.hero.title3[lang]].join(" ");
  const location = lang === "tr" ? "İstanbul, TR" : "Istanbul, TR";
  const stack = "React · Next.js · TypeScript";
  const shipped = "fizy · TV+ · LC Waikiki";
  const domain = "huseyinsade.dev";

  const [sans, serif, mono] = await Promise.all([
    googleFont("Geist:wght@500", title + tagline),
    googleFont("Instrument+Serif:ital@1", role),
    googleFont("Geist+Mono:wght@400", "hs" + location + stack + shipped + domain),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: c.bg,
          backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          color: c.fg,
          fontFamily: "Geist",
        }}
      >
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Geist Mono" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                background: c.fg,
                color: c.bg,
                fontSize: 22,
              }}
            >
              hs
            </div>
            <div style={{ fontSize: 26, color: c.fg }}>{domain}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: c.muted }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: c.accent }} />
            {location}
          </div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 1, letterSpacing: -5 }}>{title}</div>
          <div style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 118, lineHeight: 1.1, color: c.accent }}>
            {role}
          </div>
          <div style={{ marginTop: 20, fontSize: tagline.length > 64 ? 26 : 30, color: c.muted }}>{tagline}</div>
        </div>

        {/* chips */}
        <div style={{ display: "flex", gap: 14, fontFamily: "Geist Mono", fontSize: 22, color: c.muted }}>
          {[stack, shipped].map((t) => (
            <div key={t} style={{ display: "flex", padding: "8px 20px", border: `1px solid ${c.line}`, borderRadius: 999, background: c.bg }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
