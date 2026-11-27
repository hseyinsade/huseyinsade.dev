"use client";

import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { CopyButton } from "@/components/molecules/CopyButton";
import { useSite } from "@/components/providers";
import { profile, ui } from "@/lib/content";
import s from "./Contact.module.scss";

const links = [
  { label: "GitHub", handle: `@${profile.githubHandle}`, href: profile.github },
  { label: "LinkedIn", handle: `in/${profile.linkedinHandle}`, href: profile.linkedin },
];

export function Contact() {
  const { t } = useSite();

  return (
    <section id="contact" className={s.section}>
      <Reveal className={s.panel}>
        <div className="bg-grid" aria-hidden />
        <div className={s.glow} aria-hidden />
        <div className={s.inner}>
          <p className={s.index}>
            <span>04</span> / {t(ui.nav.contact)}
          </p>
          <h2 className={s.title}>
            {t(ui.sections.contact)}
            <span>.</span>
          </h2>
          <p className={s.sub}>{t(ui.sections.contactSub)}</p>

          <div className={s.actions}>
            <a href={`mailto:${profile.email}`} className={s.email} data-track="email_click">
              {profile.email}
            </a>
            <CopyButton value={profile.email} label={t(ui.copy)} copiedLabel={t(ui.copied)} track="email_copy" />
          </div>

          <ul className={s.links}>
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" data-track="outbound_click" data-track-label={l.label}>
                  <span>
                    <span className={s.linkLabel}>{l.label}</span>
                    <span className={s.linkHandle}>{l.handle}</span>
                  </span>
                  <Icon name="arrow-up-right" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
