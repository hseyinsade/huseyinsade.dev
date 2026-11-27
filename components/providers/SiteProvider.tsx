"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/content";
import { langPath } from "@/lib/seo";

type Theme = "light" | "dark";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (v: Record<Lang, string>) => string;
  theme: Theme;
  toggleTheme: () => void;
  inspect: boolean;
  setInspect: (v: boolean | ((p: boolean) => boolean)) => void;
};

const SiteContext = createContext<Ctx | null>(null);

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

/** `lang` is fixed per page ("/", "/tr/", "/de/"), each pre-rendered. */
export function Providers({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [inspect, setInspect] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.inspect = inspect ? "on" : "off";
  }, [inspect]);

  const setLang = useCallback(
    (l: Lang) => {
      store("lang", l);
      if (l !== lang) window.location.assign(langPath[l] + window.location.hash);
    },
    [lang],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      store("theme", next);
      return next;
    });
  }, []);

  const t = useCallback((v: Record<Lang, string>) => v[lang], [lang]);

  return (
    <SiteContext.Provider value={{ lang, setLang, t, theme, toggleTheme, inspect, setInspect }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
}
