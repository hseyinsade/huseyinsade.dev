import { render } from "@testing-library/react";
import { Icon } from "./Icon";
import { icons, type IconName } from "./icons";

describe("Icon", () => {
  it.each(Object.keys(icons) as IconName[])("renders %s as a hidden decorative svg", (name) => {
    const { container } = render(<Icon name={name} />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("viewBox", icons[name].viewBox);
    expect(svg).toHaveAttribute("data-icon", name);
  });

  it("applies the size class", () => {
    const { container } = render(<Icon name="github" size="lg" />);
    expect(container.querySelector("svg")).toHaveClass("lg");
  });
});
