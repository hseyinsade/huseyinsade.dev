"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/content";
import { useSite } from "./providers";
import s from "./inspector.module.scss";

type Box = { x: number; y: number; w: number; h: number; label: string; pad: string };

function describe(el: Element) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  // CSS-module classes are hashed — e.g. "i8YaKq_title" (Turbopack build),
  // "hero-module-scss-module__YiQCz__title" (dev), "hero_title__YiQCz" (webpack). Show just "title".
  const readable = (c: string) => {
    if (c.includes("-module__")) return c.split("__").pop()!;
    return c.match(/^[a-z-]+_(.+)__[\w-]+$/i)?.[1] ?? c.match(/^[\w-]{5,8}_(.+)$/)?.[1] ?? c;
  };
  const cls = typeof el.className === "string" ? el.className.split(/\s+/).filter(Boolean).map(readable) : [];
  return `${tag}${id}${cls.length ? "." + cls.slice(0, 2).join(".") : ""}`;
}

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
        label: describe(el),
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

  const labelBelow = box ? box.y < 34 : false;

  return (
    <div data-inspector className={s.overlay}>
      {box && (
        <>
          <div
            className={s.box}
            style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
          />
          <div
            className={s.label}
            style={{
              left: Math.max(8, Math.min(box.x, window.innerWidth - 320)),
              top: labelBelow ? box.y + box.h + 6 : box.y - 28,
            }}
          >
            <span className={s.selector}>{box.label}</span>
            <span className={s.size}>
              {Math.round(box.w)} × {Math.round(box.h)}
            </span>
            {box.pad !== "0 0 0 0" && <span className={s.padding}>p {box.pad}</span>}
          </div>
        </>
      )}
      <div className={s.hint}>
        {t(ui.inspectHint)}
      </div>
    </div>
  );
}
