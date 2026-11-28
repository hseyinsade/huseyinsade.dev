import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { observers } from "@/test/setup";
import { renderWithSite } from "@/test/render";
import { Nav, navLinks } from "./Nav";

describe("Nav", () => {
  it("links to every section in the page language", () => {
    renderWithSite(<Nav />, { lang: "tr" });
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["#top", ...navLinks.map((l) => `#${l.id}`), "/huseyinsade-cv.pdf"]);
    expect(screen.getByRole("link", { name: "Deneyim" })).toBeInTheDocument();
  });

  it("shows the hs. wordmark", () => {
    renderWithSite(<Nav />);
    expect(screen.getByRole("link", { name: "Huseyin Sade — home" })).toHaveTextContent(/^hs\.$/);
  });

  it("offers the CV as a download", () => {
    renderWithSite(<Nav />, { lang: "de" });
    const cv = screen.getByRole("link", { name: "Lebenslauf herunterladen" });
    expect(cv).toHaveAttribute("href", "/huseyinsade-cv.pdf");
    expect(cv).toHaveAttribute("download");
  });

  it("marks the section in view as current", () => {
    document.body.innerHTML = '<section id="work"></section><section id="stack"></section>';
    renderWithSite(<Nav />);
    const stack = document.getElementById("stack")!;
    act(() => observers.find((o) => o.elements.has(stack))!.trigger(stack, true));
    expect(screen.getByRole("link", { name: "Stack" })).toHaveAttribute("aria-current", "true");
  });

  it("switches theme and remembers it", async () => {
    document.documentElement.dataset.theme = "dark";
    renderWithSite(<Nav />);
    await userEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles the inspector", async () => {
    renderWithSite(<Nav />);
    const button = screen.getByRole("button", { name: /Inspect/ });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.inspect).toBe("on");
  });
});
