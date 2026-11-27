import { render, screen } from "@testing-library/react";
import { Providers } from "@/components/providers";
import { langs, type Lang } from "@/lib/content";
import { HomePage } from "./HomePage";

const renderPage = (lang: Lang) =>
  render(
    <Providers lang={lang}>
      <HomePage lang={lang} />
    </Providers>,
  );

describe.each(langs)("HomePage (%s)", (lang) => {
  it("renders every section with a single h1", () => {
    const { container } = renderPage(lang);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const ids = [...container.querySelectorAll("main > section")].map((s) => s.id);
    expect(ids).toEqual(["top", "work", "experience", "stack", "contact"]);
  });

  it("has no inline styles — all styling lives in SCSS modules", () => {
    const { container } = renderPage(lang);
    const inline = [...container.querySelectorAll("[style]")].map((el) => el.outerHTML.slice(0, 80));
    expect(inline).toEqual([]);
  });

  it("opens external links safely", () => {
    renderPage(lang);
    for (const a of screen.getAllByRole("link")) {
      if (a.getAttribute("target") === "_blank") expect(a).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });

  it("gives every button and link an accessible name", () => {
    renderPage(lang);
    for (const el of [...screen.getAllByRole("link"), ...screen.getAllByRole("button")]) {
      expect(el.getAttribute("aria-label") || el.textContent?.trim(), el.outerHTML.slice(0, 80)).toBeTruthy();
    }
  });

  it("starts with a skip link to the content", () => {
    renderPage(lang);
    expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "#work");
  });
});
