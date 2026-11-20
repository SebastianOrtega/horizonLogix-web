// Cross-language route mappings, derived from src/seo/route-table.js.
//
// ROUTE_TWINS: paths that have a different URL in the other language.
//   Used by LangSwitch to navigate between language-twin URLs.
// ROUTE_LANG:  paths that force a specific language (URL implies lang).
//   Used by App's RouteSync to keep lang state aligned with the URL.
//
// Both are keyed by normalized path: look up with normalizePath(pathname)
// so "/containers/" behaves like "/containers".

import { ROUTE_TABLE, normalizePath } from "../seo/route-table.js";

export { normalizePath };

export const ROUTE_TWINS = Object.fromEntries(
  ROUTE_TABLE.filter((r) => r.twin).map((r) => [r.path, r.twin])
);

export const ROUTE_LANG = Object.fromEntries(
  ROUTE_TABLE.filter((r) => r.lang !== "query").map((r) => [r.path, r.lang])
);
