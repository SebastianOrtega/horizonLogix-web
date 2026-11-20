# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on http://localhost:5173
- `npm run build` — production build to `dist/`: client build (`vite build`), SSR build of `src/entry-server.jsx` to `dist-ssr/` (gitignored, never deployed), then `node scripts/prerender.mjs`, which writes one prerendered HTML file per route plus `spa-fallback.html` and `sitemap.xml`. Fails if a route in `App.jsx` is missing from `src/seo/route-table.js` (or vice versa), if a page lacks one `<main>`/a non-empty `<h1>`, or if the HTML points at a missing `/assets/` file.
- `npm run preview` — serve the built `dist/` locally; a small plugin in `vite.config.js` resolves `/warehouse` → `warehouse/index.html` and unknown paths → `spa-fallback.html`, like Azure.
- No test runner or linter is configured.

## Architecture

Single-page bilingual (ES default, EN fallback) marketing landing for **Horizon Logix**, an industrial RFID middleware. Vite + React 18 + Tailwind 3 (JS, not TS). Deployed as an Azure Static Web App.

### Rendering & data flow

- `src/main.jsx` mounts `<App />`. `src/App.jsx` is the only stateful container: it owns `lang`, `demoOpen`, and `cookies` state, plus side effects that sync `<html lang>` and the `--signal` CSS variable.
- Language resolution order on first paint: path-implied language (`ROUTE_LANG`, looked up with `normalizePath()` so `/containers/` = `/containers`) → `?lang=` query → `localStorage.hlogix.lang` → `navigator.language` → `es`. Browser-language detection is an explicit owner decision (2026-11-20); its SEO cost is accepted (see "SEO & prerender"). `setLang` writes back to both localStorage and the URL via `history.replaceState` (keeping `history.state`, which React Router needs for back/forward). `RouteSync` re-resolves the language on every location change, including back/forward. The same order is repeated in the inline script in `index.html` — keep the two in sync.
- All copy lives in `src/i18n.js` as a nested `I18N[lang]` object. There is no react-i18next — sections receive a `t` prop (the language slice) and render strings directly. When adding copy, update both `es` and `en` branches in lockstep.
- The accent color `#F39A2B` is exported from `src/App.jsx` as `ACCENT`, pushed into a CSS variable `--signal`, and also referenced as a Tailwind color (`signal`/`signal-deep`). `WorkflowDesigner` and `NetworkDiagram` paint SVG strokes/fills using the literal hex inline — when changing the accent, search for `F39A2B`/`D77A0F` across all components, not just the token.

### SEO & prerender

- `src/seo/route-table.js` is the single list of public routes (path, `lang: "query" | "es" | "en"`, `twin`, `aliasOf` for `/rtls`, sitemap fields). `src/lib/routes.js` (`ROUTE_TWINS`, `ROUTE_LANG`, `normalizePath`) derives from it. Adding a route = add it to `App.jsx` **and** to the table (the build checks both).
- `src/seo/routes.js` holds titles/descriptions per route and language (plugin pages build the title from `PLUGINS[slug][lang].title/tagline`; `/plugins` uses `HUB[lang].meta`), and builds the head tags (description, canonical, hreflang, Open Graph, Twitter, Organization JSON-LD — all marked `data-seo`) and `sitemap.xml`. `src/seo/useRouteHead.js` (`applyRouteHead`) replaces the `data-seo` set and `document.title` on every navigation and language switch; it is called only from `App.jsx` (`RouteSync`, and `Shell`'s `setLang` right before its pageview), never from pages. It reads `window.location` (not the router's location, which is stale after `setLang`'s `replaceState`).
- Canonical model for `lang: "query"` routes (`/`, `/plugins`, `/warehouse`, `/trace`): the bare URL is the language-neutral entry (`hreflang="x-default"`), `?lang=es`/`?lang=en` are the versions; the canonical is the requested URL with only a valid `lang` kept, never the painted language. One static file answers all three URLs, so the prerendered HTML has **no** canonical for these routes; the runtime hook adds it. Fixed-language routes have a static self-canonical. `/rtls` canonicalises to the matching `/trace` URL. Unknown paths get `robots: noindex`.
- Prerender: `src/entry-server.jsx` renders `<Shell initialLang>` inside a `StaticRouter`; `scripts/prerender.mjs` injects it into the client `dist/index.html` between `<!--seo:start-->`/`<!--seo:end-->` and into `#root`, writing `dist/<route>/index.html`. `lang: "query"` routes are prerendered in Spanish.
- Client takeover is `createRoot`, **not** `hydrateRoot` (`src/main.jsx`): the snapshot is Spanish and built without a viewport, while the first client render depends on `?lang=`/storage/navigator and `matchMedia` (grid vs. carousel on `/plugins`, 16:9 vs. 4:5 video). React clears the container on first commit, so nothing is duplicated.
- Inline script + `<style>` in `index.html` (before Consent Mode/GTM): adds `.js` (CSS shows every `.reveal` without it, so no-JS readers see the content); if the resolved language differs from the snapshot, sets `<html lang>`/`<title>` and adds `.lang-pending` (hides `#root` until the app mounts, so an English visitor never sees Spanish). Recovery: if one of our `/assets/` scripts fails to load or throws before mount, it removes both classes and restores the snapshot's lang/title; a slow load reveals the snapshot after 4 s only when it is already in the right language. `Shell` sets `window.__HLX_MOUNTED__` and removes `.lang-pending`.
- Code that renders during prerender must not touch `window`/`document`/storage in render or state initialisers without a `typeof window` guard (effects are fine). `useMedia(query, ssrDefault)` takes the value to use without a window. `Shell` never renders the cookie strip in the prerender.
- Analytics: one `spa_pageview` per page shown, always after updating the head so `page_title` is the new page's. `RouteSync` pushes it on every location change; a language switch in place (no route change, so the router sees nothing) pushes it from `Shell`'s `setLang`. When the switch navigates to a language twin, `LangSwitch` passes `{ navigating: true }` and only `RouteSync` fires.
- The inline script in `index.html` rewrites a `/…/index.html` URL (Azure serves the prerendered files by file name too) to its route with `history.replaceState` before the router reads it; otherwise the app would treat it as an unknown path, drop the content and add `noindex`.
- Design and the Codex review log: `marketing/propuesta-seo-prerender.md` in the middleware-docs repo.

### Component layout

- `src/components/Primitives.jsx` — shared building blocks: `Section` (alternating dark/light tones), `Eyebrow`, `Pill`, `Button`, `Reveal` (IntersectionObserver fade-up), `useScrollY`, `useReducedMotion`, and the `Icon` set (inline SVGs). Every other component imports from here.
- `src/components/Sections.jsx` — all page sections in order of appearance: `Nav`, `Hero`, `Problem`, `HowItWorks`, `Plugins`, `Industries`, `LiveDemo`, `Why`, `ArchIT`, `Testimonial`, `CTABand`, `Footer`, `CookieStrip`. `App.jsx` composes them in this exact sequence; reordering means editing `App.jsx`.
- `src/components/NetworkDiagram.jsx` — hero SVG with a 6-second 3-stage animation (reader → ingest → hub → plugin fan-out). Driven by a `requestAnimationFrame` loop that updates `tick` state every frame.
- `src/components/WorkflowDesigner.jsx` — node-based canvas illustration with bezier edges. Animation phase ticks every 60ms.
- `src/components/DemoModal.jsx` — demo-request form with inline validation and a stubbed `setTimeout(900)` "submit" — there is no real backend wired up.
- `HowItWorks` uses sticky scroll-driven activation: a `minHeight: 180vh` outer container with a `sticky top-24` inner — its `getBoundingClientRect` drives `active` stage. Don't shrink the outer height; it's what gives the scroll-snap effect room to breathe.
- All animations honor `prefers-reduced-motion` via `useReducedMotion()` — keep new motion behind that gate.

### Styling

- `src/index.css` declares Tailwind layers, design tokens (`--ink-*`, `--paper-*`, `--signal`, `--ease-out`), and custom CSS for things Tailwind can't express: `.display-h1`/`.display-h2` (Fraunces with optical-size variation), keyframes (`pulse-ring`, `flow`, `scroll-up`, `drift`), `.bg-grid-dark`/`.bg-grid-light` dot patterns, `.reveal` transitions, and `.u-grow` underline-on-hover. New section-level visual effects belong here, not in component classNames.
- `tailwind.config.js` extends with the brand palette (`ink`, `paper`, `graphite`, `signal`), `font-display`/`font-mono`, and `tightish`/`tighter2` letter-spacing.
- Section tone alternation (dark hero → light problem → ink how-it-works → light plugins → dark industries → ink live-demo → light why → dark arch → light testimonial → dark CTA) is intentional — preserve when adding sections.

### Deployment

- `staticwebapp.config.json` — navigation fallback to `/spa-fallback.html` (empty-root shell, home copy, `noindex`; excluding asset extensions) plus security headers and MIME types. With no `trailingSlash` setting, Azure serves `/warehouse` and `/warehouse/` from `warehouse/index.html` before the fallback applies, so every prerendered route is served as its own file.
- `.github/workflows/azure-static-web-apps-nice-sand-004d9530f.yml` — builds on push/PR to `main` (**every push to `main` deploys to production**). `Azure/static-web-apps-deploy@v1` runs Oryx, which detects Node (22.x in recent runs) and runs `npm install && npm run build`, then uploads `dist/` (`output_location`). No `skip_app_build`. Anything the build needs must work offline beyond npm (no browser downloads).
- `dist/sitemap.xml` is generated by the prerender step from the route table (there is no `public/sitemap.xml`). `public/robots.txt` is hand-maintained.
- `vite.config.js` pins `build.target` to Vite 5's browser floor (Safari 14+); Vite 7+ would otherwise default to Safari 16+.

## Notes from the design handoff

This codebase was implemented from a Claude Design (claude.ai/design) handoff bundle. The original prototype lived in HTML/CSS/JS via UMD React + Babel + Tailwind CDN, with a Tweaks panel for live editing. That tweaks panel and its `__edit_mode_*` postMessage protocol are intentionally **not** ported — the production defaults (amber accent, italic headline, regular density, all sections visible) are baked in. The chat transcripts in the design bundle (not in this repo) are the source of truth for product copy decisions: brand is "Horizon Logix" not "HLogix"; ERP names are "Oracle · NetSuite · Dynamics · SAP"; readers are referred to as "Lector RFID" generically (never "Zebra"); the workflow designer section is positioned as a no-code visual builder.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **horizonLogix-web** (436 symbols, 1033 relationships, 35 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/horizonLogix-web/context` | Codebase overview, check index freshness |
| `gitnexus://repo/horizonLogix-web/clusters` | All functional areas |
| `gitnexus://repo/horizonLogix-web/processes` | All execution flows |
| `gitnexus://repo/horizonLogix-web/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
