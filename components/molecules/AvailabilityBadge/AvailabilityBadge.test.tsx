import { render, screen } from "@testing-library/react";
import { AvailabilityBadge } from "./AvailabilityBadge";

describe("AvailabilityBadge", () => {
  it("shows the open state", () => {
    render(<AvailabilityBadge available label="Open to new projects" />);
    const badge = screen.getByText("Open to new projects");
    expect(badge).toHaveAttribute("data-available", "true");
    expect(badge).toHaveClass("open");
  });

  it("shows the busy state", () => {
    render(<AvailabilityBadge available={false} label="Currently booked" />);
    expect(screen.getByText("Currently booked")).toHaveClass("busy");
  });
});
