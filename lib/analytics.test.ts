import { CONSENT_KEY, gtmHeadSnippet, GTM_ID, readConsent, track, updateConsent } from "./analytics";

type W = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
const w = window as W;

beforeEach(() => {
  delete w.dataLayer;
  delete w.gtag;
});

describe("track", () => {
  it("pushes a named event to the dataLayer, creating it if needed", () => {
    track("cta_click", { label: "see_work" });
    expect(w.dataLayer).toEqual([{ event: "cta_click", label: "see_work" }]);
  });
});

describe("consent", () => {
  it("is unknown until the visitor chooses", () => {
    expect(readConsent()).toBeNull();
  });

  it("ignores unexpected stored values", () => {
    localStorage.setItem(CONSENT_KEY, "maybe");
    expect(readConsent()).toBeNull();
  });

  it("stores the choice, updates Consent Mode and records the event", () => {
    const gtag = vi.fn();
    w.gtag = gtag;
    updateConsent("granted");
    expect(readConsent()).toBe("granted");
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "granted" });
    expect(w.dataLayer).toContainEqual({ event: "consent_update", consent: "granted" });
  });
});

describe("gtmHeadSnippet", () => {
  it("denies analytics and ads by default and loads the container", () => {
    const js = gtmHeadSnippet();
    expect(js).toContain("ad_storage:'denied'");
    expect(js).toContain("analytics_storage:c==='granted'?'granted':'denied'");
    expect(js).toContain(JSON.stringify(GTM_ID));
    // consent defaults must be set before GTM starts
    expect(js.indexOf("'consent','default'")).toBeLessThan(js.indexOf("gtm.js"));
  });
});
