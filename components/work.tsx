"use client";

import { projects, text, ui, type Project } from "@/lib/content";
import { useSite } from "./providers";
import { ArrowUpRight, Reveal, SectionHeader, Tags } from "./ui";
import s from "./work.module.scss";

function Waveform() {
  // Rounded so server and client render the exact same style string.
  const bars = Array.from({ length: 48 }, (_, i) =>
    Math.round((0.25 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 0.75) * 100),
  );
  return (
    <div className={s.wave} aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%`, animationDelay: `${(i % 12) * 90}ms`, opacity: i < 30 ? 1 : 0.25 }}
        />
      ))}
    </div>
  );
}

function Player() {
  return (
    <div className={s.player} aria-hidden>
      <div className={s.playerTop}>
        <span className={s.live}>LIVE</span>
        <span>1080p · DRM</span>
      </div>
      <div className={s.track}>
        <div className={s.buffered} />
        <div className={s.progress} />
      </div>
      <div className={s.controls}>
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 2.5v11l9-5.5-9-5.5Z" />
        </svg>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 6v4h3l4 3V3L5 6H2Z" strokeLinejoin="round" />
          <path d="M11.5 5.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
        </svg>
        <span>42:17 / 58:00</span>
      </div>
    </div>
  );
}

function FeaturedCard({ p, index }: { p: Project; index: number }) {
  const { t, lang } = useSite();
  return (
    <Reveal as="article" delay={index * 80} className={s.card}>
      <div className={s.visual}>
        <div className="bg-grid" aria-hidden />
        <div className={s.visualInner}>{p.name === "fizy" ? <Waveform /> : <Player />}</div>
      </div>
      <div className={s.body}>
        <div className={s.head}>
          <div>
            <p className={s.meta}>
              {String(index + 1).padStart(2, "0")} · {text(p.company, lang)}
            </p>
            <h3 className={s.name}>{p.name}</h3>
            <p className={s.category}>{t(p.category)}</p>
          </div>
          {p.url && (
            <a href={p.url} target="_blank" rel="noreferrer" className={s.visit} data-track="project_click" data-track-label={p.name}>
              {p.domain}
              <ArrowUpRight />
            </a>
          )}
        </div>
        <p className={s.description}>{t(p.description)}</p>
        <Tags items={p.tags} className={s.cardTags} />
      </div>
    </Reveal>
  );
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  const { t, lang } = useSite();
  const Wrapper = p.url ? "a" : "div";
  return (
    <Reveal as="li" delay={(index % 3) * 60}>
      <Wrapper
        {...(p.url ? { href: p.url, target: "_blank", rel: "noreferrer", "data-track": "project_click", "data-track-label": p.name } : {})}
        className={s.row}
      >
        <span className={s.index}>{String(index + 3).padStart(2, "0")}</span>
        <div>
          <h3 className={s.rowName}>
            <span>{p.name}</span>
            {p.url && <ArrowUpRight />}
          </h3>
          <p className={s.rowMeta}>
            {t(p.category)} · {text(p.company, lang)}
          </p>
        </div>
        <p className={s.rowDescription}>{t(p.description)}</p>
        <Tags items={p.tags.slice(0, 4)} className={s.rowTags} />
      </Wrapper>
    </Reveal>
  );
}

export function Work() {
  const { t } = useSite();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className={s.section}>
      <SectionHeader index="01" title={t(ui.sections.work)} sub={t(ui.sections.workSub)} />
      <div className={s.featured}>
        {featured.map((p, i) => (
          <FeaturedCard key={p.name} p={p} index={i} />
        ))}
      </div>
      <ul className={s.list}>
        {rest.map((p, i) => (
          <ProjectRow key={p.name} p={p} index={i} />
        ))}
      </ul>
    </section>
  );
}
