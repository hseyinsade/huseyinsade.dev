/**
 * Google Tag Manager + Consent Mode v2.
 *
 * - GTM loads on every page, but analytics/ads storage stays "denied" until the
 *   visitor accepts in the consent banner (KVKK / GDPR).
 * - The site pushes named events into the dataLayer (see `track`), so GTM only
 *   needs one "Custom Event" trigger per event — no fragile CSS-selector triggers.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-WRSC5BBD";

export const CONSENT_KEY = "consent"; // localStorage: "granted" | "denied"

export type ConsentChoice = "granted" | "denied";

type DataLayerWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/**
 * Inline <head> snippet: consent defaults first, then the standard GTM loader.
 * A returning visitor's saved choice is applied before GTM starts.
 */
export function gtmHeadSnippet() {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;var c=null;try{c=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})}catch(e){}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='granted'?'granted':'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});`;
}

/** Pushes a named event to GTM's dataLayer. Safe to call before GTM has loaded. */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

export function updateConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {}
  const w = window as DataLayerWindow;
  w.gtag?.("consent", "update", { analytics_storage: choice });
  track("consent_update", { consent: choice });
}

export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
