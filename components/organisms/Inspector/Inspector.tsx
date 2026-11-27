"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers";
import { ui } from "@/lib/content";
import { describeElement } from "@/lib/selector";
import s from "./Inspector.module.scss";

export type Box = { x: number; y: number; w: number; h: number; label: string; pad: string };

/** A tiny DevTools-style element inspector. Toggle with the nav button or the I key. */
export function Inspector() {
  const { inspect, setInspect, t } = useSite();
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "i" || e.key === "I") setInspect((v) => !v);
      if (e.key === "Escape") setInspect(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setInspect]);

  useEffect(() => {
    if (!inspect) {
      setBox(null);
      return;
    }
    let raf = 0;
    let last: Element | null = null;

    const measure = (el: Element) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      setBox({
        x: r.left,
        y: r.top,
        w: r.width,
        h: r.height,
        label: describeElement(el),
        pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map((v) => parseFloat(v)).join(" "),
      });
    };

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el || el.closest("[data-inspector]")) return;
        last = el;
        measure(el);
      });
    };
    const onScroll = () => last && measure(last);
    const onClick = (e: MouseEvent) => {
      // Let the toggle button itself work; swallow every other click while inspecting.
      if ((e.target as Element).closest("[aria-pressed]")) return;
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick, true);
    };
  }, [inspect]);

  if (!inspect) return null;

  return (
    <div data-inspector className={s.overlay}>
      {box && <Highlight box={box} />}
      <div className={s.hint}>{t(ui.inspectHint)}</div>
    </div>
  );
}

/**
 * The outline and its label follow the mouse, so their position can only be known at runtime.
 * It is handed to the stylesheet as CSS variables (--x, --y, --w, --h, --label-x, --label-y);
 * all styling lives in Inspector.module.scss.
 */
function Highlight({ box }: { box: Box }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const labelBelow = box.y < 34;
    const vars = {
      "--x": box.x,
      "--y": box.y,
      "--w": box.w,
      "--h": box.h,
      "--label-x": Math.max(8, Math.min(box.x, window.innerWidth - 320)),
      "--label-y": labelBelow ? box.y + box.h + 6 : box.y - 28,
    };
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, `${v}px`);
  }, [box]);

  return (
    <div ref={ref} className={s.highlight}>
      <div className={s.box} />
      <div className={s.label}>
        <span className={s.selector}>{box.label}</span>
        <span className={s.size}>
          {Math.round(box.w)} × {Math.round(box.h)}
        </span>
        {box.pad !== "0 0 0 0" && <span className={s.padding}>p {box.pad}</span>}
      </div>
    </div>
  );
}
