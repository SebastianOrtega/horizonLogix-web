// Single source of truth for cross-language route mappings.
//
// ROUTE_TWINS: paths that have a different URL in the other language.
//   Used by LangSwitch to navigate between language-twin URLs.
// ROUTE_LANG:  paths that force a specific language (URL implies lang).
//   Used by App's RouteSync to keep lang state aligned with the URL.

export const ROUTE_TWINS = {
  "/privacidad": "/privacy",
  "/privacy": "/privacidad",
  "/terminos": "/terms",
  "/terms": "/terminos",
  "/contenedores": "/containers",
  "/containers": "/contenedores",
};

export const ROUTE_LANG = {
  "/privacidad": "es",
  "/privacy": "en",
  "/terminos": "es",
  "/terms": "en",
  "/contenedores": "es",
  "/containers": "en",
};
