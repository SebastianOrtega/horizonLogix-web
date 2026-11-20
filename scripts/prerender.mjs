// Build step after `vite build` (client) and `vite build --ssr` (dist-ssr):
// writes one static HTML file per public route with its own <html lang>,
// head tags and the page already rendered inside #root; a no-content,
// noindex shell for Azure's navigationFallback; and sitemap.xml.
//
// Azure Static Web Apps serves /warehouse and /warehouse/ from
// warehouse/index.html before navigationFallback applies, so no URL changes.
// Design: marketing/propuesta-seo-prerender.md (middleware-docs repo).
//
// Fails the build (exit 1) when routes in App.jsx and src/seo/route-table.js
// differ, when a page renders without exactly one <main> and a non-empty
// <h1>, or when the HTML references an /assets/ file that does not exist.

process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");
const FALLBACK = "spa-fallback.html";

const { render, SEO_ROUTES, headTags, headTagsToHtml, routeMeta, sitemapXml } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const errors = [];
const fail = (msg) => errors.push(msg);

// 1. App.jsx routes and the route table must list the same paths.
const appSrc = fs.readFileSync(path.join(ROOT, "src", "App.jsx"), "utf8");
const appPaths = new Set([...appSrc.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]));
const tablePaths = new Set(SEO_ROUTES.map((r) => r.path));
for (const p of appPaths) if (!tablePaths.has(p)) fail(`App.jsx route ${p} is missing from src/seo/route-table.js`);
for (const p of tablePaths) if (!appPaths.has(p)) fail(`src/seo/route-table.js route ${p} has no <Route> in App.jsx`);

// 2. Template: the client build's index.html (hashed script/style tags).
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) fail("dist/index.html has no <!--seo:start-->…<!--seo:end--> block");
if (!template.includes('<div id="root"></div>')) fail('dist/index.html has no empty <div id="root"></div>');
if (!/<html lang="es">/.test(template)) fail('dist/index.html has no <html lang="es">');

const jsonForScript = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

function page({ lang, head, config, body }) {
  let html = template.replace('<html lang="es">', `<html lang="${lang}">`);
  const block = `<!--seo:start-->\n    ${headTagsToHtml(head)}\n    <!--seo:end-->`;
  const cfg = config ? `\n    <script>window.__HLX_PRERENDER__=${jsonForScript(config)};</script>` : "";
  html = html.replace(SEO_BLOCK, () => block + cfg);
  return html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

function checkAssets(html, where) {
  for (const m of html.matchAll(/["'(](\/assets\/[^"'()\s?#]+)/g)) {
    if (!fs.existsSync(path.join(DIST, m[1]))) fail(`${where}: references missing ${m[1]}`);
  }
}

if (errors.length) finish();

// 3. One file per route. lang:"query" routes are prerendered in Spanish; the
// inline script in index.html hides them until the app paints when the
// visitor resolves to English.
const written = [];
for (const route of SEO_ROUTES) {
  const lang = route.lang === "query" ? "es" : route.lang;
  const body = render(route.path, lang);
  const head = headTags({ pathname: route.path, lang, isStatic: true });
  const config =
    route.lang === "query"
      ? { lang, mode: "query", titles: { es: routeMeta(route.path, "es").title, en: routeMeta(route.path, "en").title } }
      : { lang, mode: "fixed" };
  const html = page({ lang, head, config, body });

  const mains = (body.match(/<main[\s>]/g) || []).length;
  const h1 = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Text = h1 ? h1[1].replace(/<[^>]+>/g, "").trim() : "";
  if (mains !== 1) fail(`${route.path}: expected 1 <main>, found ${mains}`);
  if (!h1Text) fail(`${route.path}: empty or missing <h1>`);
  checkAssets(html, route.path);

  const file = route.path === "/" ? "index.html" : path.join(route.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(path.join(DIST, file)), { recursive: true });
  fs.writeFileSync(path.join(DIST, file), html);
  written.push(`${file.padEnd(26)} lang=${lang} h1="${h1Text.replace(/\s+/g, " ").slice(0, 48)}"`);
}

// 4. Fallback shell for unknown paths: no content (same as before the
// prerender), home copy, noindex, no canonical. The app still renders Nav
// and Footer there.
{
  const head = headTags({ pathname: "/__not-a-route__", lang: "es", isStatic: true });
  fs.writeFileSync(path.join(DIST, FALLBACK), page({ lang: "es", head, config: null, body: "" }));
  written.push(`${FALLBACK.padEnd(26)} (navigationFallback, noindex)`);
}

// 5. Sitemap (replaces the copy Vite took from public/).
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapXml());
written.push("sitemap.xml");

finish();

function finish() {
  if (errors.length) {
    console.error(`prerender: ${errors.length} error(s)`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`prerender: wrote ${written.length} files to dist/`);
  for (const w of written) console.log(`  ${w}`);
}
