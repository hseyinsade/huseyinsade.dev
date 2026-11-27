"use client";

import { useEffect, useRef } from "react";
import s from "./ui.module.scss";

/** Joins class names, skipping falsy values. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <Reveal className={s.sectionHeader}>
      <p className={s.sectionIndex}>
        <span>{index}</span> / {title}
      </p>
      <div>
        <h2 className={s.sectionTitle}>{title}</h2>
        <p className={s.sectionSub}>{sub}</p>
      </div>
    </Reveal>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className={s.tag}>{children}</span>;
}

export function Tags({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cx(s.tags, className)}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cx(s.arrow, className)}>
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
