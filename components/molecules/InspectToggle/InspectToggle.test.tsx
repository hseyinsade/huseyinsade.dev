import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InspectToggle } from "./InspectToggle";

it("reflects its state and toggles", async () => {
  const onToggle = vi.fn();
  const { rerender } = render(<InspectToggle on={false} label="Inspect" onToggle={onToggle} />);
  const button = screen.getByRole("button", { name: /Inspect/ });
  expect(button).toHaveAttribute("aria-pressed", "false");

  await userEvent.click(button);
  expect(onToggle).toHaveBeenCalledOnce();

  rerender(<InspectToggle on label="Inspect" onToggle={onToggle} />);
  expect(button).toHaveAttribute("aria-pressed", "true");
  expect(button).toHaveClass("on");
});
