import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitch } from "./LanguageSwitch";

describe("LanguageSwitch", () => {
  it("marks the current language as pressed", () => {
    render(<LanguageSwitch value="tr" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "tr" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "en" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("button", { name: "de" })).toHaveAttribute("aria-pressed", "false");
  });

  it("reports the chosen language", async () => {
    const onChange = vi.fn();
    render(<LanguageSwitch value="en" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "de" }));
    expect(onChange).toHaveBeenCalledWith("de");
  });
});
