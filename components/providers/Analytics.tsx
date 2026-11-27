"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { useSite } from "./SiteProvider";

/**
 * Sends site events to GTM's dataLayer:
 * - clicks on any element with `data-track="event_name"` (+ optional `data-track-label`);
 * - `section_view` the first time each section reaches the middle of the screen, to see how far people read.
 */
export function Analytics() {
  const { lang } = useSite();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const href = el.getAttribute("href") ?? undefined;
      track(el.dataset.track!, {
        label: el.dataset.trackLabel,
        link_url: href && !href.startsWith("#") ? href : undefined,
        page_language: lang,
      });
    };
    document.addEventListener("click", onClick);

    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section_view", { section: id, page_language: lang });
          }
        }
      },
      // A section counts once it reaches the middle of the screen — works for sections taller than the viewport too.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));

    return () => {
      document.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, [lang]);

  return null;
}
