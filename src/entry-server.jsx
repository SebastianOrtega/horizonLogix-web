// Build-time entry (vite build --ssr): renders one route to static HTML for
// scripts/prerender.mjs, and re-exports the route metadata so the script can
// read it without resolving asset imports or import.meta.glob itself.
// Never shipped to the browser.

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Shell } from "./App.jsx";

export { SEO_ROUTES, headTags, headTagsToHtml, routeMeta, sitemapXml } from "./seo/routes.js";

export function render(path, lang) {
  return renderToString(
    <StaticRouter location={path}>
      <Shell initialLang={lang} />
    </StaticRouter>
  );
}
