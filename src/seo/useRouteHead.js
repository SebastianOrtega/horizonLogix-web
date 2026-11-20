// Runtime side of src/seo/routes.js: keeps <title> and the data-seo head tags
// in step with client-side navigation and language switches. Called once,
// from App's RouteSync.
//
// The canonical comes from window.location, not from React Router's
// location: setLang rewrites ?lang= with history.replaceState, which the
// router does not observe, so its location.search can be stale.

import { headTags } from "./routes.js";

export function applyRouteHead(lang) {
  if (typeof document === "undefined") return null;
  const { title, tags } = headTags({
    pathname: window.location.pathname,
    search: window.location.search,
    lang,
  });
  document.title = title;
  const head = document.head;
  head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  const frag = document.createDocumentFragment();
  for (const t of tags) {
    const el = document.createElement(t.tag);
    el.setAttribute("data-seo", "");
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    if (t.text) el.textContent = t.text;
    frag.appendChild(el);
  }
  head.appendChild(frag);
  return title;
}
