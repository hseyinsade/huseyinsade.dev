import { render, screen, within } from "@testing-library/react";
import type { Project } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

const project: Project = {
  name: "fizy",
  url: "https://fizy.com",
  domain: "fizy.com",
  company: "Atmosware",
  category: { en: "Music streaming", tr: "Müzik yayını", de: "Musik-Streaming" },
  description: { en: "Desc EN", tr: "Açıklama TR", de: "Beschreibung DE" },
  tags: ["Next.js", "React"],
  featured: true,
};

describe("ProjectCard", () => {
  it("renders the project in the page language", () => {
    render(<ProjectCard project={project} number={1} lang="tr" visual={<i data-testid="art" />} />);
    const card = screen.getByRole("article");
    expect(within(card).getByRole("heading", { level: 3, name: "fizy" })).toBeInTheDocument();
    expect(within(card).getByText("01 · Atmosware")).toBeInTheDocument();
    expect(within(card).getByText("Müzik yayını")).toBeInTheDocument();
    expect(within(card).getByText("Açıklama TR")).toBeInTheDocument();
    expect(within(card).getByTestId("art")).toBeInTheDocument();
  });

  it("links to the live site with tracking", () => {
    render(<ProjectCard project={project} number={1} lang="en" visual={null} />);
    const link = screen.getByRole("link", { name: /fizy\.com/ });
    expect(link).toHaveAttribute("href", "https://fizy.com");
    expect(link).toHaveAttribute("data-track", "project_click");
    expect(link).toHaveAttribute("data-track-label", "fizy");
  });

  it("has no link when the project has no URL", () => {
    render(<ProjectCard project={{ ...project, url: undefined }} number={2} lang="en" visual={null} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
