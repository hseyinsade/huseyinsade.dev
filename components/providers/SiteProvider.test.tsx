import { act, render, renderHook } from "@testing-library/react";
import { Providers, useSite } from "./SiteProvider";

const wrapper =
  (lang: "en" | "tr" | "de") =>
  ({ children }: { children: React.ReactNode }) => <Providers lang={lang}>{children}</Providers>;

describe("SiteProvider", () => {
  it("translates with the page language", () => {
    const { result } = renderHook(() => useSite(), { wrapper: wrapper("de") });
    expect(result.current.t({ en: "Hello", tr: "Merhaba", de: "Hallo" })).toBe("Hallo");
  });

  it("starts from the theme the head script applied", () => {
    document.documentElement.dataset.theme = "light";
    const { result } = renderHook(() => useSite(), { wrapper: wrapper("en") });
    expect(result.current.theme).toBe("light");
  });

  it("saves the language choice (no reload when it is already the page language)", () => {
    const { result } = renderHook(() => useSite(), { wrapper: wrapper("tr") });
    act(() => result.current.setLang("tr"));
    expect(localStorage.getItem("lang")).toBe("tr");
  });

  it("throws a clear error outside the provider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function Orphan() {
      useSite();
      return null;
    }
    expect(() => render(<Orphan />)).toThrow("useSite must be used inside <Providers>");
  });
});
