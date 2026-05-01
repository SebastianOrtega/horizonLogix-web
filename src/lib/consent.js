// Cookie consent state — Consent Mode v2 driver.
//
// localStorage shape (KEY):
//   { v: 1, ts: <epoch_ms>, analytics: bool, marketing: bool }
// `essential` is always implicitly granted (functionality + security storage).
//
// LEGACY_KEY (`hlogix.cookies` = "1") was the original "accepted all" flag.
// We mirror the new state into it so the inline replay script in index.html
// keeps working, and we treat its presence (without the new key) as
// "user previously accepted everything" during migration.

const KEY = "hlogix.consent";
const LEGACY_KEY = "hlogix.cookies";

export function readConsent() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object" && obj.v === 1) {
        return { analytics: !!obj.analytics, marketing: !!obj.marketing };
      }
    }
    if (localStorage.getItem(LEGACY_KEY) === "1") {
      return { analytics: true, marketing: true };
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export function writeConsent(prefs) {
  const obj = {
    v: 1,
    ts: Date.now(),
    analytics: !!prefs.analytics,
    marketing: !!prefs.marketing,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
    localStorage.setItem(LEGACY_KEY, "1");
  } catch (e) {
    // ignore
  }
  return obj;
}

export function applyConsent(prefs) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}
