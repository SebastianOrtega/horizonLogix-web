// Captures Google Ads / UTM attribution from the landing URL and persists it
// in sessionStorage so first-touch attribution survives internal navigation.
// Mirror of the implementation used in moviltrack_web/ContactForm.tsx so the
// leads endpoint receives the same shape from both sites.

const STORAGE_KEY = "hlogix_lead_tracking";

const TRACKING_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
  "utm_network",
  "campaignid",
  "adgroupid",
  "keyword",
  "matchtype",
  "network",
  "device",
  "creative",
  "placement",
  "targetid",
  "loc_physical_ms",
  "loc_interest_ms",
];

const MESSAGE_FIELDS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_network",
  "network",
  "device",
  "campaignid",
  "adgroupid",
  "keyword",
  "first_landing_page",
  "current_page",
  "referrer",
  "form_location",
];

function readStored() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStored(tracking) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
  } catch {
    // Storage failures must never block lead submission.
  }
}

export function captureLeadTracking(formLocation) {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const stored = readStored();
  const fromUrl = TRACKING_PARAMS.reduce((acc, p) => {
    const v = params.get(p);
    if (v) acc[p] = v;
    return acc;
  }, {});

  const merged = {
    ...stored,
    ...fromUrl,
    first_landing_page: stored.first_landing_page || window.location.href,
    current_page: window.location.href,
    current_page_path: `${window.location.pathname}${window.location.search}`,
    referrer: stored.referrer || document.referrer,
    ...(formLocation && { form_location: formLocation }),
  };

  if (Object.keys(fromUrl).length > 0 || !stored.first_landing_page) {
    writeStored(merged);
  }

  return merged;
}

export function formatTrackingForMessage(tracking) {
  if (!tracking) return "";
  const lines = MESSAGE_FIELDS
    .filter((f) => tracking[f])
    .map((f) => `${f}: ${tracking[f]}`);
  return lines.length > 0 ? `\n\n--- Tracking ---\n${lines.join("\n")}` : "";
}
