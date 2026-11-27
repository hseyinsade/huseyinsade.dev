import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithSite } from "@/test/render";
import { OPEN_CONSENT_EVENT } from "@/components/organisms/ConsentBanner";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the build year", () => {
    renderWithSite(<Footer />);
    expect(screen.getByText(/© 2026 Huseyin Sade/)).toBeInTheDocument();
  });

  it("reopens the cookie settings", async () => {
    const onOpen = vi.fn();
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    renderWithSite(<Footer />, { lang: "de" });
    await userEvent.click(screen.getByRole("button"));
    expect(onOpen).toHaveBeenCalledOnce();
    window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  });
});
