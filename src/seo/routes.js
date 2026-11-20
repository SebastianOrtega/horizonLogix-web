// Per-route head metadata: one source for the runtime hook (useRouteHead),
// the build-time prerender (scripts/prerender.mjs via src/entry-server.jsx)
// and the generated sitemap.xml. Design and the canonical/hreflang model:
// marketing/propuesta-seo-prerender.md in the middleware-docs repo.
//
// Canonical model for lang:"query" routes (owner decision 2026-11-20: the
// bare URL auto-selects language from the browser):
//   bare URL = language-neutral entry point (hreflang x-default)
//   ?lang=es / ?lang=en = the language versions
//   canonical = the requested URL with only a valid `lang` kept, never the
//   painted language. The static file answers all three URLs, so its HTML
//   carries no canonical; the runtime hook adds it from window.location.

import { HUB } from "../plugins-hub.js";
import { PLUGINS } from "../plugin-content.js";
import { LEGAL } from "../legal-content.js";
import { ROUTE_TABLE, findRoute } from "./route-table.js";

export const SITE = "https://hlogix.app";
const LANGS = ["es", "en"];
const OG_LOCALE = { es: "es_MX", en: "en_US" };
const OG_IMAGE = {
  es: { url: `${SITE}/og-image-es.png`, alt: "Horizon Logix — Middleware RFID industrial" },
  en: { url: `${SITE}/og-image-en.png`, alt: "Horizon Logix — Industrial RFID Middleware" },
};

const HOME = {
  es: {
    title: "Horizon Logix — Middleware RFID industrial",
    description:
      "Plataforma RFID industrial: middleware para integradores y aplicaciones listas para embarques, contenedores retornables y ubicación de activos.",
  },
  en: {
    title: "Horizon Logix — Industrial RFID Middleware",
    description:
      "Industrial RFID platform: middleware for integrators and ready-to-use apps for shipping, returnable containers and asset location.",
  },
};

// Written from each plugin's `lead` (plugin-content.js / plugin-containers.js),
// kept under ~160 characters for search snippets.
const PLUGIN_DESCRIPTIONS = {
  warehouse: {
    es: "Cada caja, tarima o pieza se lee al pasar por el andén y se compara contra la orden de tu ERP. Si algo falta o sobra, el operador lo ve antes de que salga el camión.",
    en: "Every tagged case, pallet or part is read at the dock and checked against your ERP order, so the operator sees what is missing or extra before the truck leaves.",
  },
  containers: {
    es: "Cuántos contenedores retornables tienes, dónde está cada uno y cuáles llevan demasiado tiempo fuera. Sin hojas de cálculo ni conteos a mano.",
    en: "How many returnable containers you have, where each one is and which have been out too long. No spreadsheets, no manual counts.",
  },
  rtls: {
    es: "Ubicación por zonas y tiempo por etapa sobre el plano de tu instalación. Lectores RFID fijos detectan cada activo al entrar a una zona, sin que nadie escanee.",
    en: "Zone-level location and time per stage on your facility's floor plan. Fixed RFID readers detect each asset as it enters a zone, with nobody scanning.",
  },
};

const LEGAL_DESCRIPTIONS = {
  privacy: {
    es: "Cómo Horizon Logix trata los datos personales que recibe por este sitio: qué datos recaba, para qué, cookies, transferencias y cómo ejercer tus derechos ARCO.",
    en: "How Horizon Logix handles the personal data it receives through this site: what it collects and why, cookies, transfers and how to exercise your rights.",
  },
  terms: {
    es: "Condiciones de uso del sitio de Horizon Logix: uso aceptable, propiedad intelectual, limitación de responsabilidad y ley aplicable.",
    en: "Terms of use for the Horizon Logix website: acceptable use, intellectual property, limitation of liability and governing law.",
  },
};

function pluginMeta(slug, lang) {
  const data = PLUGINS[slug][lang] || PLUGINS[slug].es;
  return { title: `${data.title} — ${data.tagline}`, description: PLUGIN_DESCRIPTIONS[slug][lang] };
}

function legalMeta(kind, lang) {
  return { title: `${LEGAL[lang][kind].title} — Horizon Logix`, description: LEGAL_DESCRIPTIONS[kind][lang] };
}

const META = {
  "/": (lang) => HOME[lang],
  "/plugins": (lang) => HUB[lang].meta,
  "/warehouse": (lang) => pluginMeta("warehouse", lang),
  "/contenedores": () => pluginMeta("containers", "es"),
  "/containers": () => pluginMeta("containers", "en"),
  "/trace": (lang) => pluginMeta("rtls", lang),
  "/rtls": (lang) => pluginMeta("rtls", lang),
  "/privacidad": () => legalMeta("privacy", "es"),
  "/privacy": () => legalMeta("privacy", "en"),
  "/terminos": () => legalMeta("terms", "es"),
  "/terms": () => legalMeta("terms", "en"),
};

export { ROUTE_TABLE as SEO_ROUTES, findRoute };

// The language a route is painted in: its own for fixed-language paths.
export function effectiveLang(route, lang) {
  return route && route.lang !== "query" ? route.lang : lang === "en" ? "en" : "es";
}

export function routeMeta(pathname, lang) {
  const route = findRoute(pathname);
  const l = effectiveLang(route, lang);
  if (!route) return { ...HOME[l], lang: l, route: null };
  return { ...META[route.path](l), lang: l, route };
}

function url(path, query) {
  return `${SITE}${path}${query ? `?${query}` : ""}`;
}

function queryLang(search) {
  const q = new URLSearchParams(search || "").get("lang");
  return q === "es" || q === "en" ? q : null;
}

// Canonical URL for the requested location, or null when it cannot be known
// from the path alone (static HTML of a lang:"query" route: one file answers
// the bare URL, ?lang=es and ?lang=en).
export function canonicalUrl(route, search, { isStatic = false } = {}) {
  if (!route) return null;
  const target = route.aliasOf || route.path;
  if (route.lang !== "query") return url(target);
  if (isStatic) return null;
  const q = queryLang(search);
  return url(target, q ? `lang=${q}` : "");
}

export function alternates(route) {
  if (!route) return [];
  const target = route.aliasOf || route.path;
  if (route.lang === "query") {
    return [
      { hreflang: "es", href: url(target, "lang=es") },
      { hreflang: "en", href: url(target, "lang=en") },
      { hreflang: "x-default", href: url(target) },
    ];
  }
  const es = route.lang === "es" ? route.path : route.twin;
  const en = route.lang === "en" ? route.path : route.twin;
  return [
    { hreflang: "es", href: url(es) },
    { hreflang: "en", href: url(en) },
    { hreflang: "x-default", href: url(es) },
  ];
}

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Horizon Logix",
  alternateName: "HLogix",
  url: `${SITE}/`,
  logo: `${SITE}/favicon.svg`,
  description: HOME.es.description,
  sameAs: [],
  contactPoint: { "@type": "ContactPoint", email: "hola@hlogix.app", contactType: "sales" },
};

// Head tags (besides <title>) as plain descriptors, rendered to a string by
// the prerender step and to DOM nodes by the runtime hook. Every one carries
// data-seo so the hook can replace the whole set.
export function headTags({ pathname, search = "", lang, isStatic = false }) {
  const meta = routeMeta(pathname, lang);
  const { route } = meta;
  const l = meta.lang;
  const other = l === "es" ? "en" : "es";
  const canonical = canonicalUrl(route, search, { isStatic });
  const ogUrl = canonical || (route ? url(route.aliasOf || route.path) : null);
  const img = OG_IMAGE[l];
  const tags = [{ tag: "meta", attrs: { name: "description", content: meta.description } }];
  if (!route) tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex" } });
  if (canonical) tags.push({ tag: "link", attrs: { rel: "canonical", href: canonical } });
  for (const a of alternates(route)) tags.push({ tag: "link", attrs: { rel: "alternate", hreflang: a.hreflang, href: a.href } });
  const og = [
    ["og:type", "website"],
    ["og:site_name", "Horizon Logix"],
    ["og:title", meta.title],
    ["og:description", meta.description],
    ...(ogUrl ? [["og:url", ogUrl]] : []),
    ["og:image", img.url],
    ["og:image:width", "1200"],
    ["og:image:height", "630"],
    ["og:image:alt", img.alt],
    ["og:locale", OG_LOCALE[l]],
    ["og:locale:alternate", OG_LOCALE[other]],
  ];
  for (const [property, content] of og) tags.push({ tag: "meta", attrs: { property, content } });
  const tw = [
    ["twitter:card", "summary_large_image"],
    ["twitter:title", meta.title],
    ["twitter:description", meta.description],
    ["twitter:image", img.url],
  ];
  for (const [name, content] of tw) tags.push({ tag: "meta", attrs: { name, content } });
  tags.push({ tag: "script", attrs: { type: "application/ld+json" }, text: JSON.stringify(ORGANIZATION) });
  return { title: meta.title, lang: l, tags };
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function headTagsToHtml({ title, tags }) {
  const lines = [`<title>${esc(title)}</title>`];
  for (const t of tags) {
    const attrs = Object.entries(t.attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join("");
    if (t.tag === "script") lines.push(`<script data-seo${attrs}>${t.text.replace(/</g, "\\u003c")}</script>`);
    else lines.push(`<${t.tag} data-seo${attrs} />`);
  }
  return lines.join("\n    ");
}

// One <url> per indexable URL. lang:"query" routes list the bare URL and both
// ?lang= versions, each with the full alternate set (sitemap hreflang format).
export function sitemapXml() {
  const out = [];
  for (const r of ROUTE_TABLE) {
    if (r.sitemap === false) continue;
    const alts = alternates(r)
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}"/>`)
      .join("\n");
    const locs = r.lang === "query" ? [url(r.path), url(r.path, "lang=es"), url(r.path, "lang=en")] : [url(r.path)];
    for (const loc of locs) {
      out.push(
        `  <url>\n    <loc>${esc(loc)}</loc>\n${alts}\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
      );
    }
  }
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    out.join("\n") +
    `\n</urlset>\n`
  );
}

export { LANGS };
