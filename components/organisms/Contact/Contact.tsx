"use client";

import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { ContactForm } from "@/components/molecules/ContactForm";
import { CopyButton } from "@/components/molecules/CopyButton";
import { useSite } from "@/components/providers";
import { sendContact } from "@/lib/contact";
import { profile, text, ui } from "@/lib/content";
import s from "./Contact.module.scss";

const links = [
  { id: "github", label: "GitHub", handle: `@${profile.githubHandle}`, href: profile.github, external: true },
  { id: "linkedin", label: "LinkedIn", handle: `in/${profile.linkedinHandle}`, href: profile.linkedin, external: true },
  { id: "phone", label: ui.phone, handle: profile.phone, href: `tel:${profile.phone.replace(/ /g, "")}`, external: false },
];

export function Contact() {
  const { t, lang } = useSite();

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

          <div className={s.form}>
            <ContactForm
              onSend={(msg) => sendContact(msg, { to: profile.email, subject: t(ui.form.subject), lang })}
              labels={{
                name: t(ui.form.name),
                email: t(ui.form.email),
                message: t(ui.form.message),
                send: t(ui.form.send),
                sending: t(ui.form.sending),
                sent: t(ui.form.sent),
                error: t(ui.form.error),
              }}
            />
          </div>

          <ul className={s.links}>
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  {...(l.external
                    ? { target: "_blank", rel: "noreferrer", "data-track": "outbound_click", "data-track-label": l.label }
                    : { "data-track": "phone_click" })}
                >
                  <span>
                    <span className={s.linkLabel}>{text(l.label, lang)}</span>
                    <span className={s.linkHandle}>{l.handle}</span>
                  </span>
                  {l.external && <Icon name="arrow-up-right" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
