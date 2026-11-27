import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeCard, snippets } from "./CodeCard";

const tabs = () => screen.getAllByRole("tab");
const selected = () => screen.getByRole("tab", { selected: true });

describe("CodeCard", () => {
  it("shows the TSX snippet first, wired as an ARIA tab panel", () => {
    render(<CodeCard />);
    expect(tabs().map((t) => t.textContent)).toEqual(["sade.tsx", "sade.js", "Sade.vue", "sade.ts"]);
    expect(selected()).toHaveTextContent("sade.tsx");
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("aria-labelledby", selected().id);
    expect(panel).toHaveTextContent("export const Sade");
  });

  it("switches snippets on click and records the event", async () => {
    const push = vi.fn();
    (window as Window & { dataLayer?: unknown }).dataLayer = { push };
    render(<CodeCard />);
    await userEvent.click(screen.getByRole("tab", { name: "Sade.vue" }));
    expect(selected()).toHaveTextContent("Sade.vue");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("<template>");
    expect(push).toHaveBeenCalledWith({ event: "code_tab", label: "vue" });
  });

  it("supports arrow keys, Home and End with roving tabindex", async () => {
    const user = userEvent.setup();
    render(<CodeCard />);
    await user.click(tabs()[0]);

    await user.keyboard("{ArrowRight}");
    expect(selected()).toHaveTextContent("sade.js");
    expect(selected()).toHaveFocus();
    expect(tabs().filter((t) => t.tabIndex === 0)).toEqual([selected()]);

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(selected()).toHaveTextContent("sade.ts"); // wraps around

    await user.keyboard("{Home}");
    expect(selected()).toHaveTextContent("sade.tsx");
    await user.keyboard("{End}");
    expect(selected()).toHaveTextContent("sade.ts");
  });

  it("never has a snippet taller than the space reserved in the stylesheet", () => {
    const scss = readFileSync(join(__dirname, "CodeCard.module.scss"), "utf8");
    const reserved = Number(scss.match(/\$max-lines:\s*(\d+)/)?.[1]);
    expect(reserved).toBeGreaterThan(0);
    for (const sn of snippets) expect(sn.lines.length, sn.file).toBeLessThanOrEqual(reserved);
    expect(Math.max(...snippets.map((sn) => sn.lines.length))).toBe(reserved);
  });

  it("shows years of experience from the build year", () => {
    render(<CodeCard />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("experience={8} // years");
  });
});
