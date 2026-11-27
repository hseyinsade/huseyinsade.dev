import { render, screen } from "@testing-library/react";
import { TagList } from "./TagList";

it("renders every tag as a list item", () => {
  render(<TagList items={["React", "Next.js", "SCSS"]} />);
  expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["React", "Next.js", "SCSS"]);
});
