import { render, screen } from "@testing-library/react";
import { profile } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";

it("links to GitHub and LinkedIn in a new tab", () => {
  render(<SocialLinks />);
  for (const [name, href] of [
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
  ]) {
    const link = screen.getByRole("link", { name });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  }
});
