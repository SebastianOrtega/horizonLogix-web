// Thin helper around the GTM dataLayer. Every conversion event in the site
// goes through here so the firing surface is one file.
//
// GTM container: GTM-K2RR8SRZ (loaded in index.html). Consent Mode v2 is
// active before GTM, so events fire even with consent denied — they reach
// GTM as anonymous pings.

export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...params,
  });
}

// Pushes a virtual page_view for SPA navigations.
//
// IMPORTANT: GTM's default "Page View" trigger fires once on initial DOM
// ready. If you also fire `page_view` events on subsequent SPA navigations,
// configure the GA4 Page View tag in GTM to fire on the custom event
// `spa_pageview` instead of (or in addition to) "All Pages" — otherwise the
// first navigation will be double-counted.
export function trackPageview() {
  if (typeof window === "undefined") return;
  track("spa_pageview", {
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}
