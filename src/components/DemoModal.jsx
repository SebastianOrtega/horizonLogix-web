import { useState } from "react";
import { Icon } from "./Primitives.jsx";

const LEADS_ENDPOINT =
  import.meta.env.VITE_LEADS_ENDPOINT ||
  "https://us-central1-sistemamoviltrack.cloudfunctions.net/leads";
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LcE1r8rAAAAAKlCtWiyLHmfeMTorxSgmK_uzBJT";
const SOURCE = "hlogix-web";
const RECAPTCHA_ACTION = "contact_form_submit";

// Intent marker prepended to the message body sent to the leads endpoint.
// Always Spanish — sales reads these regardless of the visitor's UI language.
const INTENT_TEXT = {
  demo: "Quiere un demo.",
  sales: "Quiere hablar con ventas.",
};

let recaptchaLoader = null;
const loadRecaptcha = () => {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (window.grecaptcha?.enterprise) return Promise.resolve(window.grecaptcha.enterprise);
  if (recaptchaLoader) return recaptchaLoader;
  recaptchaLoader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      if (!window.grecaptcha?.enterprise) {
        reject(new Error("recaptcha-missing"));
        return;
      }
      window.grecaptcha.enterprise.ready(() => resolve(window.grecaptcha.enterprise));
    };
    s.onerror = () => reject(new Error("recaptcha-load"));
    document.head.appendChild(s);
  });
  return recaptchaLoader;
};

export default function DemoModal({ t, open, onClose, kind = "demo" }) {
  const [data, setData] = useState({ name: "", email: "", company: "", role: "", phone: "", message: "" });
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle");
  const [submitErr, setSubmitErr] = useState(null);

  if (!open) return null;

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = t.errReq;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t.errEmail;
    if (!data.company.trim()) e.company = t.errReq;
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitErr(null);
    setState("sending");

    let recaptchaToken;
    try {
      const enterprise = await loadRecaptcha();
      recaptchaToken = await enterprise.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION });
    } catch (e) {
      setState("idle");
      setSubmitErr(t.errCaptcha);
      return;
    }

    const trimmedRole = data.role.trim();
    const trimmedMessage = data.message.trim();
    const intent = INTENT_TEXT[kind] || INTENT_TEXT.demo;
    const tail = trimmedRole
      ? `Cargo: ${trimmedRole}${trimmedMessage ? `\n\n${trimmedMessage}` : ""}`
      : trimmedMessage;
    const message = tail ? `${intent}\n\n${tail}` : intent;

    const payload = {
      recaptchaToken,
      source: SOURCE,
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company.trim(),
      ...(data.phone.trim() && { phone: data.phone.trim() }),
      ...(message && { message }),
    };

    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("done");
    } catch (e) {
      setState("idle");
      setSubmitErr(t.errSubmit);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full md:max-w-[520px] m-0 md:m-6 rounded-t-2xl md:rounded-2xl bg-paper-50 text-ink-900 p-7 md:p-8 border border-graphite-600/15 shadow-2xl">
        <button
          onClick={onClose}
          aria-label={t.close}
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-paper-100 flex items-center justify-center text-graphite-600"
        >
          <Icon.X />
        </button>

        {state === "done" ? (
          <div className="py-6">
            <div className="w-12 h-12 rounded-full bg-signal/20 text-signal-deep flex items-center justify-center">
              <Icon.Check />
            </div>
            <h3 className="mt-5 font-display text-[28px] tracking-tightish">{t.success}</h3>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium u-grow"
            >
              {t.close} <Icon.Arrow />
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-[28px] tracking-tightish">{kind === "sales" ? (t.salesTitle || t.title) : t.title}</h3>
            <p className="mt-1.5 text-[14px] text-graphite-600">{t.sub}</p>

            <form className="mt-6 grid grid-cols-2 gap-3.5" onSubmit={submit} noValidate>
              <Field label={t.name} value={data.name} onChange={set("name")} err={err.name} />
              <Field label={t.email} type="email" value={data.email} onChange={set("email")} err={err.email} />
              <Field label={t.company} value={data.company} onChange={set("company")} err={err.company} />
              <Field label={t.role} value={data.role} onChange={set("role")} />
              <Field label={t.phone} type="tel" value={data.phone} onChange={set("phone")} full />
              <Field label={t.message} value={data.message} onChange={set("message")} textarea full />
              {submitErr && (
                <div className="col-span-2 text-[13px] text-red-500" role="alert">
                  {submitErr}
                </div>
              )}
              <div className="col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium bg-ink-900 text-paper-50 hover:bg-ink-800 disabled:opacity-60"
                >
                  {state === "sending" ? t.submitting : t.submit}
                  {state === "sending" ? null : <Icon.Arrow />}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, err, type = "text", textarea, full }) {
  const cls = `w-full rounded-lg border px-3.5 py-3 text-[14px] bg-white outline-none transition-colors ${
    err ? "border-red-400" : "border-graphite-600/20 focus:border-ink-900"
  }`;
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-graphite-500">{label}</span>
      {textarea ? (
        <textarea rows="3" className={`${cls} mt-1.5`} value={value} onChange={onChange} />
      ) : (
        <input type={type} className={`${cls} mt-1.5`} value={value} onChange={onChange} />
      )}
      {err && <span className="mt-1 block text-[11px] text-red-500">{err}</span>}
    </label>
  );
}
