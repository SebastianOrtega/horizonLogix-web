# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server on http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- No test runner or linter is configured.

## Architecture

Single-page bilingual (ES default, EN fallback) marketing landing for **Horizon Logix**, an industrial RFID middleware. Vite + React 18 + Tailwind 3 (JS, not TS). Deployed as an Azure Static Web App.

### Rendering & data flow

- `src/main.jsx` mounts `<App />`. `src/App.jsx` is the only stateful container: it owns `lang`, `demoOpen`, and `cookies` state, plus side effects that sync `<html lang>` and the `--signal` CSS variable.
- Language resolution order on first paint: `?lang=` query → `localStorage.hlogix.lang` → `navigator.language` → `es`. `setLang` writes back to both localStorage and the URL via `history.replaceState` so deep-links survive reloads.
- All copy lives in `src/i18n.js` as a nested `I18N[lang]` object. There is no react-i18next — sections receive a `t` prop (the language slice) and render strings directly. When adding copy, update both `es` and `en` branches in lockstep.
- The accent color `#F39A2B` is exported from `src/App.jsx` as `ACCENT`, pushed into a CSS variable `--signal`, and also referenced as a Tailwind color (`signal`/`signal-deep`). `WorkflowDesigner` and `NetworkDiagram` paint SVG strokes/fills using the literal hex inline — when changing the accent, search for `F39A2B`/`D77A0F` across all components, not just the token.

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

- `staticwebapp.config.json` — SPA navigation fallback to `/index.html` (excluding asset extensions) plus security headers.
- `.github/workflows/azure-static-web-apps.yml` — builds on push/PR to `main`, deploys via `AZURE_STATIC_WEB_APPS_API_TOKEN` secret. The workflow runs `npm ci && npm run build` then uploads `dist/` with `skip_app_build: true` so Oryx doesn't re-run the build.

## Notes from the design handoff

This codebase was implemented from a Claude Design (claude.ai/design) handoff bundle. The original prototype lived in HTML/CSS/JS via UMD React + Babel + Tailwind CDN, with a Tweaks panel for live editing. That tweaks panel and its `__edit_mode_*` postMessage protocol are intentionally **not** ported — the production defaults (amber accent, italic headline, regular density, all sections visible) are baked in. The chat transcripts in the design bundle (not in this repo) are the source of truth for product copy decisions: brand is "Horizon Logix" not "HLogix"; ERP names are "Oracle · NetSuite · Dynamics · SAP"; readers are referred to as "Lector RFID" generically (never "Zebra"); the workflow designer section is positioned as a no-code visual builder.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **hlogix_web** (159 symbols, 188 relationships, 1 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/hlogix_web/context` | Codebase overview, check index freshness |
| `gitnexus://repo/hlogix_web/clusters` | All functional areas |
| `gitnexus://repo/hlogix_web/processes` | All execution flows |
| `gitnexus://repo/hlogix_web/process/{name}` | Step-by-step execution trace |

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
