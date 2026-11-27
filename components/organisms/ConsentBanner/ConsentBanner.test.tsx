import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONSENT_KEY } from "@/lib/analytics";
import { renderWithSite } from "@/test/render";
import { ConsentBanner, OPEN_CONSENT_EVENT } from "./ConsentBanner";

describe("ConsentBanner", () => {
  it("asks first-time visitors and remembers an accept", async () => {
    renderWithSite(<ConsentBanner />);
    const banner = screen.getByRole("region", { name: "Cookies" });
    expect(banner).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Allow" }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe("granted");
    expect(banner).not.toBeInTheDocument();
  });

  it("remembers a reject", async () => {
    renderWithSite(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: "Decline" }));
    expect(localStorage.getItem(CONSENT_KEY)).toBe("denied");
  });

  it("stays hidden for returning visitors until reopened from the footer", () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    renderWithSite(<ConsentBanner />, { lang: "tr" });
    expect(screen.queryByRole("region")).toBeNull();

    act(() => void window.dispatchEvent(new Event(OPEN_CONSENT_EVENT)));
    expect(screen.getByRole("region", { name: "Çerezler" })).toBeInTheDocument();
  });
});
