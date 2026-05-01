import { useEffect, useState } from "react";
import { I18N } from "./i18n.js";
import { ACCENT, ACCENT_DEEP, ACCENT_RGB } from "./theme.js";
import {
  ArchIT,
  CookieStrip,
  CTABand,
  Footer,
  Hero,
  HowItWorks,
  Industries,
  Partners,
  LiveDemo,
  Nav,
  Plugins,
  Problem,
  Testimonial,
  Why,
} from "./components/Sections.jsx";
import WorkflowDesigner from "./components/WorkflowDesigner.jsx";
import DemoModal from "./components/DemoModal.jsx";
import CookiePreferences from "./components/CookiePreferences.jsx";
import { applyConsent, readConsent, writeConsent } from "./lib/consent.js";

function detectLang() {
  const url = new URL(window.location.href);
  const q = url.searchParams.get("lang");
  if (q === "en" || q === "es") return q;
  const stored = localStorage.getItem("hlogix.lang");
  if (stored === "en" || stored === "es") return stored;
  const nav = (navigator.language || "es").slice(0, 2);
  return nav === "en" ? "en" : "es";
}

export default function App() {
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

  return (
    <div>
      <Nav t={t} lang={lang} setLang={setLang} onDemo={() => setDemoOpen(true)} />
      <main>
        <Hero t={t} onDemo={() => setDemoOpen(true)} />
        <Problem t={t} />
        <HowItWorks t={t} />
        <WorkflowDesigner lang={lang} accent={ACCENT} />
        <Plugins t={t} />
        <Industries t={t} />
        <Partners t={t} />
        <LiveDemo t={t} />
        <Why t={t} />
        <ArchIT t={t} />
        <Testimonial t={t} />
        <CTABand t={t} onDemo={() => setDemoOpen(true)} />
      </main>
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
    </div>
  );
}
