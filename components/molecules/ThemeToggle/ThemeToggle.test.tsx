import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("offers the opposite theme and shows the matching icon", () => {
    const { rerender, container } = render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
    expect(container.querySelector("[data-icon=sun]")).toBeInTheDocument();

    rerender(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
    expect(container.querySelector("[data-icon=moon]")).toBeInTheDocument();
  });

  it("calls onToggle", async () => {
    const onToggle = vi.fn();
    render(<ThemeToggle theme="dark" onToggle={onToggle} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
