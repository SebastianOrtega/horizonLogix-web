import { useState } from "react";
import { Icon } from "./Primitives.jsx";

export default function DemoModal({ t, open, onClose }) {
  const [data, setData] = useState({ name: "", email: "", company: "", role: "", message: "" });
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle");

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
    setState("sending");
    await new Promise((r) => setTimeout(r, 900));
    setState("done");
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
            <h3 className="font-display text-[28px] tracking-tightish">{t.title}</h3>
            <p className="mt-1.5 text-[14px] text-graphite-600">{t.sub}</p>

            <form className="mt-6 grid grid-cols-2 gap-3.5" onSubmit={submit} noValidate>
              <Field label={t.name} value={data.name} onChange={set("name")} err={err.name} />
              <Field label={t.email} type="email" value={data.email} onChange={set("email")} err={err.email} />
              <Field label={t.company} value={data.company} onChange={set("company")} err={err.company} />
              <Field label={t.role} value={data.role} onChange={set("role")} />
              <Field label={t.message} value={data.message} onChange={set("message")} textarea full />
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
      <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-graphite-500">{label}</span>
      {textarea ? (
        <textarea rows="3" className={`${cls} mt-1.5`} value={value} onChange={onChange} />
      ) : (
        <input type={type} className={`${cls} mt-1.5`} value={value} onChange={onChange} />
      )}
      {err && <span className="mt-1 block text-[11px] text-red-500">{err}</span>}
    </label>
  );
}
