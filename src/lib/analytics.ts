/**
 * Google Tag Manager + Consent Mode v2.
 *
 * GTM only loads when NEXT_PUBLIC_GTM_ID is set (Vercel → Settings →
 * Environment Variables). Until then no Google tags run, no cookies are set
 * and the consent banner stays hidden.
 */

export const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const CONSENT_STORAGE_KEY = "jss-consent-v1";
export const OPEN_CONSENT_EVENT = "jss:open-consent";
export const CONSENT_CHANGE_EVENT = "jss:consent-change";

export type ConsentChoice = { analytics: boolean; marketing: boolean };

export function consentState({ analytics, marketing }: ConsentChoice) {
  const ads = marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

/**
 * Runs inline in <head>, before GTM: every storage type starts denied and a
 * previously saved choice is restored so returning visitors are not asked
 * again.
 */
export const consentDefaultScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied', ad_storage: 'denied',
  ad_user_data: 'denied', ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}'));
  if (c) {
    var ads = c.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: ads, ad_user_data: ads, ad_personalization: ads
    });
  }
} catch (e) {}
`;

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Push an event to the GTM dataLayer (queued safely if GTM is absent). */
export function trackEvent(
  event: string,
  params: Record<string, string | number | undefined> = {},
) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

/** Raw stored choice, or null when the visitor has not decided yet. */
export function readConsentRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function readConsent(): ConsentChoice | null {
  const raw = readConsentRaw();
  try {
    return raw ? (JSON.parse(raw) as ConsentChoice) : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Storage blocked (private mode): the choice applies to this visit only.
  }
  (window as DataLayerWindow).gtag?.("consent", "update", consentState(choice));
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}
