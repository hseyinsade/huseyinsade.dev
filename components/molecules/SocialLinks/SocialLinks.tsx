import { Icon } from "@/components/atoms/Icon";
import { profile } from "@/lib/content";
import { cx } from "@/lib/cx";
import s from "./SocialLinks.module.scss";

const links = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cx(s.list, className)}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            className={s.link}
            data-track="outbound_click"
            data-track-label={l.label}
          >
            <Icon name={l.icon} size="lg" />
          </a>
        </li>
      ))}
    </ul>
  );
}
