import { render, screen } from "@testing-library/react";
import type { Project } from "@/lib/content";
import { ProjectRow } from "./ProjectRow";

const base: Project = {
  name: "Sculpturehead",
  company: "Side project",
  category: { en: "E-commerce", tr: "E-ticaret", de: "E-Commerce" },
  description: { en: "Shop", tr: "Mağaza", de: "Shop" },
  tags: ["Vue", "Django", "SCSS", "Docker", "Nginx"],
};

describe("ProjectRow", () => {
  it("is a link when the project has a URL", () => {
    render(<ul><ProjectRow project={{ ...base, url: "https://example.com" }} number={5} lang="en" /></ul>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
    expect(screen.getByText("05")).toBeInTheDocument();
  });

  it("is plain text without a URL and shows at most four tags", () => {
    render(<ul><ProjectRow project={base} number={6} lang="tr" /></ul>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("E-ticaret · Side project")).toBeInTheDocument();
    expect(screen.queryByText("Nginx")).toBeNull();
    expect(screen.getByText("Docker")).toBeInTheDocument();
  });
});
