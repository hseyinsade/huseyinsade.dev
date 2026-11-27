import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

it("renders its label", () => {
  render(<Tag>TypeScript</Tag>);
  expect(screen.getByText("TypeScript")).toHaveClass("tag");
});
