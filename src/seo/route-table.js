// Public routes: the one list every route consumer reads (App's language
// sync, LangSwitch, the head tags, the prerender step and the sitemap).
// Pure data, no copy and no asset imports, so src/lib/routes.js can derive
// from it without pulling page content into its importers.
//
//   lang: "query"  language comes from ?lang= / localStorage / navigator
//                  (App.jsx detectLang); the bare URL is the language-neutral
//                  entry point and ?lang=es / ?lang=en are the versions.
//   lang: "es"|"en" the path itself implies the language; `twin` is the
//                  same page in the other language.
//   aliasOf        legacy path that renders another route (canonical there).
//
// A route added to App.jsx must be added here too: the prerender step fails
// the build when the two lists differ.

export const ROUTE_TABLE = [
  { path: "/", lang: "query", changefreq: "weekly", priority: "1.0" },
  { path: "/plugins", lang: "query", changefreq: "monthly", priority: "0.9" },
  { path: "/warehouse", lang: "query", changefreq: "monthly", priority: "0.9" },
  { path: "/contenedores", lang: "es", twin: "/containers", changefreq: "monthly", priority: "0.9" },
  { path: "/containers", lang: "en", twin: "/contenedores", changefreq: "monthly", priority: "0.9" },
  { path: "/trace", lang: "query", changefreq: "monthly", priority: "0.7" },
  { path: "/rtls", lang: "query", aliasOf: "/trace", sitemap: false },
  { path: "/privacidad", lang: "es", twin: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", lang: "en", twin: "/privacidad", changefreq: "yearly", priority: "0.3" },
  { path: "/terminos", lang: "es", twin: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", lang: "en", twin: "/terminos", changefreq: "yearly", priority: "0.3" },
];

// "/warehouse/" and "/warehouse" are the same page (Azure serves both from
// warehouse/index.html). Every lookup by path goes through this.
export function normalizePath(pathname) {
  if (!pathname) return "/";
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

const BY_PATH = Object.fromEntries(ROUTE_TABLE.map((r) => [r.path, r]));

export function findRoute(pathname) {
  return BY_PATH[normalizePath(pathname)] || null;
}
