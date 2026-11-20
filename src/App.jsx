import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { I18N } from "./i18n.js";
import { ACCENT, ACCENT_DEEP, ACCENT_RGB } from "./theme.js";
import { ROUTE_LANG, normalizePath } from "./lib/routes.js";
import { applyRouteHead } from "./seo/useRouteHead.js";
import { CookieStrip, Footer, Nav } from "./components/Sections.jsx";
import DemoModal from "./components/DemoModal.jsx";
import CookiePreferences from "./components/CookiePreferences.jsx";
import Landing from "./pages/Landing.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import PluginPage from "./pages/PluginPage.jsx";
import PluginsHub from "./pages/PluginsHub.jsx";
import { applyConsent, readConsent, writeConsent } from "./lib/consent.js";
import { track, trackPageview } from "./lib/track.js";

// Keep in sync with the inline language script in index.html, which repeats
// this order before first paint so a prerendered page never flashes the
// wrong language.
function detectLang() {
  if (typeof window === "undefined") return "es";
  const path = normalizePath(window.location.pathname);
  if (ROUTE_LANG[path]) return ROUTE_LANG[path];
  const url = new URL(window.location.href);
  const q = url.searchParams.get("lang");
  if (q === "en" || q === "es") return q;
  try {
    const stored = localStorage.getItem("hlogix.lang");
    if (stored === "en" || stored === "es") return stored;
  } catch (e) {}
  const nav = (navigator.language || "es").slice(0, 2);
  return nav === "en" ? "en" : "es";
}

// On every location change (push, replace, back/forward): resolve one
// language from the URL (path-implied, else ?lang=, else the current one),
// apply it to state and head tags, scroll to top, and fire a virtual
// pageview after the first load. A language switch without navigation
// refreshes the head tags here; its pageview is fired by Shell's setLang.
function RouteSync({ lang, setLangState }) {
  const location = useLocation();
  const isFirstNav = useRef(true);
  const isFirstLang = useRef(true);
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    const forced = ROUTE_LANG[normalizePath(location.pathname)];
    const q = new URLSearchParams(location.search).get("lang");
    const target = forced || (q === "en" || q === "es" ? q : langRef.current);
    if (target !== langRef.current) {
      langRef.current = target;
      setLangState(target);
      if (forced) {
        try { localStorage.setItem("hlogix.lang", forced); } catch (e) {}
      }
    }
    // Head first, so the pageview below carries the new page's title.
    applyRouteHead(target);
    // Scroll to top on plain navigations; preserve hash-driven anchor scrolls.
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    // GTM auto-fires the first pageview on DOM ready — only push for SPA navs.
    if (isFirstNav.current) {
      isFirstNav.current = false;
    } else {
      trackPageview();
    }
  }, [location.pathname, location.search, location.hash, setLangState]);

  useEffect(() => {
    if (isFirstLang.current) {
      isFirstLang.current = false;
      return;
    }
    applyRouteHead(lang);
    // Same as before this hook was split: a language switch returns to top.
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [lang]);
  return null;
}

// initialLang is only passed by the prerender (src/entry-server.jsx); in the
// browser the language is always resolved from the URL and the visitor.
export function Shell({ initialLang } = {}) {
  const [lang, setLangState] = useState(() => initialLang || detectLang());
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoKind, setDemoKind] = useState("demo");
  // Never in the prerendered HTML: a returning visitor who already chose
  // would otherwise see the strip flash until the app takes over.
  const [cookies, setCookies] = useState(() => typeof window !== "undefined" && !readConsent());
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // The app has taken over the prerendered DOM: lift the pre-paint hiding set
  // by the inline language script in index.html (and stop its recovery).
  useEffect(() => {
    window.__HLX_MOUNTED__ = true;
    document.documentElement.classList.remove("lang-pending");
  }, []);

  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--signal", ACCENT);
    s.setProperty("--signal-deep", ACCENT_DEEP);
    s.setProperty("--signal-rgb", ACCENT_RGB);
  }, []);

  // navigating: the caller follows up with a route navigation (language
  // twin), so RouteSync fires the single pageview for that switch.
  const setLang = (l, { navigating = false } = {}) => {
    const changed = l !== lang;
    setLangState(l);
    try { localStorage.setItem("hlogix.lang", l); } catch (e) {}
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    // Keep React Router's history.state (idx/key) so back/forward still work.
    window.history.replaceState(window.history.state, "", url.toString());
    // A switch in place shows another language version of the page: one
    // pageview, with the head already updated so it carries the new title.
    // The router does not see replaceState, so RouteSync will not fire it.
    if (changed && !navigating) {
      applyRouteHead(l);
      trackPageview();
    }
  };

  const savePrefs = (prefs) => {
    writeConsent(prefs);
    applyConsent(prefs);
    setCookies(false);
    setPrefsOpen(false);
  };

  // "Aceptar" en el strip = aceptar todo.
  const dismissCookies = () => savePrefs({ analytics: true, marketing: true });

  const t = I18N[lang];
  const openContact = (kind, source) => {
    setDemoKind(kind);
    setDemoOpen(true);
    track("demo_request_open", { form_type: kind, source });
  };
  const onDemo = (source) => openContact("demo", source);
  const onSales = (source) => openContact("sales", source);
  const onPartner = (source) => openContact("partner", source);

  return (
    <>
      <RouteSync lang={lang} setLangState={setLangState} />
      <Nav t={t} lang={lang} setLang={setLang} onDemo={onDemo} onPartner={onPartner} />
      <Routes>
        <Route path="/" element={<Landing t={t} lang={lang} onPartner={onPartner} onSales={onSales} />} />
        <Route path="/privacidad" element={<LegalPage t={t} lang="es" kind="privacy" />} />
        <Route path="/privacy" element={<LegalPage t={t} lang="en" kind="privacy" />} />
        <Route path="/terminos" element={<LegalPage t={t} lang="es" kind="terms" />} />
        <Route path="/terms" element={<LegalPage t={t} lang="en" kind="terms" />} />
        <Route path="/plugins" element={<PluginsHub lang={lang} onDemo={onDemo} onSales={onSales} />} />
        <Route path="/warehouse" element={<PluginPage slug="warehouse" lang={lang} onDemo={onDemo} onSales={onSales} />} />
        <Route path="/contenedores" element={<PluginPage slug="containers" lang="es" onDemo={onDemo} onSales={onSales} />} />
        <Route path="/containers" element={<PluginPage slug="containers" lang="en" onDemo={onDemo} onSales={onSales} />} />
        <Route path="/trace" element={<PluginPage slug="rtls" lang={lang} onDemo={onDemo} onSales={onSales} />} />
        {/* /rtls was the original route; kept so existing links keep working. */}
        <Route path="/rtls" element={<PluginPage slug="rtls" lang={lang} onDemo={onDemo} onSales={onSales} />} />
      </Routes>
      <Footer t={t} lang={lang} setLang={setLang} />
      <DemoModal t={t.form} open={demoOpen} onClose={() => setDemoOpen(false)} kind={demoKind} />
      {cookies && <CookieStrip t={t} onClose={dismissCookies} onManage={() => setPrefsOpen(true)} />}
      <CookiePreferences
        t={t.cookies}
        open={prefsOpen}
        onClose={() => setPrefsOpen(false)}
        onSave={savePrefs}
        closeLabel={t.form.close}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
