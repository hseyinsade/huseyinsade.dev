import { render, screen } from "@testing-library/react";
import { StackGroup } from "./StackGroup";

const group = { group: { en: "Testing", tr: "Test", de: "Testen" }, items: ["Vitest", "Jest"] };

it("lists the group's tools under its localized name", () => {
  render(<StackGroup group={group} lang="de" />);
  expect(screen.getByText(/Testen/)).toBeInTheDocument();
  expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Vitest", "Jest"]);
});

it("spans the full row when wide", () => {
  const { container } = render(<StackGroup group={{ ...group, wide: true }} lang="en" />);
  expect(container.firstElementChild).toHaveClass("wide");
});
