import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  afterEach(() => vi.useRealTimers());

  it("copies the value and confirms, then resets", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    render(<CopyButton value="hi@example.com" label="Copy" copiedLabel="Copied" />);

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("hi@example.com");
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(1800));
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("stays quiet when the clipboard is blocked", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("denied"));
    render(<CopyButton value="x" label="Copy" copiedLabel="Copied" />);
    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });
});
