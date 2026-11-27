import { act, render, screen } from "@testing-library/react";
import { Clock } from "./Clock";

describe("Clock", () => {
  beforeEach(() => vi.useFakeTimers({ now: new Date("2026-01-15T09:30:05Z") }));
  afterEach(() => vi.useRealTimers());

  it("shows Istanbul time (UTC+3) and ticks every second", () => {
    render(<Clock />);
    expect(screen.getByText("12:30:05")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("12:30:06")).toBeInTheDocument();
  });
});
