import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { I18N } from "./i18n.js";
import { ACCENT, ACCENT_DEEP, ACCENT_RGB } from "./theme.js";
import { ROUTE_LANG } from "./legal-content.js";
import { CookieStrip, Footer, Nav } from "./components/Sections.jsx";
import DemoModal from "./components/DemoModal.jsx";
import CookiePreferences from "./components/CookiePreferences.jsx";
import Landing from "./pages/Landing.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import { applyConsent, readConsent, writeConsent } from "./lib/consent.js";
import { trackPageview } from "./lib/track.js";

function detectLang() {
  if (typeof window === "undefined") return "es";
  const path = window.location.pathname;
  if (ROUTE_LANG[path]) return ROUTE_LANG[path];
  const url = new URL(window.location.href);
  const q = url.searchParams.get("lang");
  if (q === "en" || q === "es") return q;
  const stored = localStorage.getItem("hlogix.lang");
  if (stored === "en" || stored === "es") return stored;
  const nav = (navigator.language || "es").slice(0, 2);
  return nav === "en" ? "en" : "es";
}

// Keeps lang state in sync with the URL on legal-page routes (where the path
// itself implies the language), scrolls back to top on route change, and
// fires a virtual pageview to GTM on every navigation after the first load.
function RouteSync({ lang, setLangState }) {
  const location = useLocation();
  const isFirstNav = useRef(true);
  useEffect(() => {
    const forced = ROUTE_LANG[location.pathname];
    if (forced && forced !== lang) {
      setLangState(forced);
      try { localStorage.setItem("hlogix.lang", forced); } catch (e) {}
    }
    // Scroll to top on plain navigations; preserve hash-driven anchor scrolls.
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    // GTM auto-fires the first pageview on DOM ready — only push for SPA navs.
    if (isFirstNav.current) {
      isFirstNav.current = false;
    } else {
      trackPageview();
    }
  }, [location.pathname, location.search, location.hash, lang, setLangState]);
  return null;
}

function Shell() {
  const [lang, setLangState] = useState(detectLang);
  const [demoOpen, setDemoOpen] = useState(false);
  const [cookies, setCookies] = useState(() => !readConsent());
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--signal", ACCENT);
    s.setProperty("--signal-deep", ACCENT_DEEP);
    s.setProperty("--signal-rgb", ACCENT_RGB);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("hlogix.lang", l);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState({}, "", url.toString());
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
  const onDemo = () => setDemoOpen(true);

  return (
    <>
      <RouteSync lang={lang} setLangState={setLangState} />
      <Nav t={t} lang={lang} setLang={setLang} onDemo={onDemo} />
      <Routes>
        <Route path="/" element={<Landing t={t} lang={lang} onDemo={onDemo} />} />
        <Route path="/privacidad" element={<LegalPage t={t} lang="es" kind="privacy" />} />
        <Route path="/privacy" element={<LegalPage t={t} lang="en" kind="privacy" />} />
        <Route path="/terminos" element={<LegalPage t={t} lang="es" kind="terms" />} />
        <Route path="/terms" element={<LegalPage t={t} lang="en" kind="terms" />} />
      </Routes>
      <Footer t={t} lang={lang} setLang={setLang} />
      <DemoModal t={t.form} open={demoOpen} onClose={() => setDemoOpen(false)} />
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
