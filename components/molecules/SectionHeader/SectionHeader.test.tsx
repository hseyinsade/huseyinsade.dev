import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./SectionHeader";

it("renders the title as a level-2 heading with its index and subtitle", () => {
  render(<SectionHeader index="02" title="Experience" sub="Where I've worked" />);
  expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toBeInTheDocument();
  expect(screen.getByText("02")).toBeInTheDocument();
  expect(screen.getByText("Where I've worked")).toBeInTheDocument();
});
