"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";
import s from "./Reveal.module.scss";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger step for items revealed together (0 = no delay). Each step adds 70ms. */
  delay?: 0 | 1 | 2 | 3;
  as?: "div" | "li" | "article" | "section";
};

/** Fades its content in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(s.visible);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={cx(s.reveal, delay > 0 && s[`delay${delay}`], className)}>
      {children}
    </Tag>
  );
}
