import { useEffect, useState } from "react";
import { Icon } from "./Primitives.jsx";
import { readConsent } from "../lib/consent.js";

function ToggleRow({ label, desc, value, locked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-5 py-4 border-b border-graphite-600/15 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium text-ink-900">{label}</div>
        <div className="mt-1 text-[12.5px] text-graphite-600 leading-relaxed">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        disabled={locked}
        onClick={() => !locked && onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-1 ${
          value ? "bg-signal" : "bg-graphite-400/40"
        } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookiePreferences({ t, open, onClose, onSave, closeLabel }) {
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    if (!open) return;
    const cur = readConsent();
    if (cur) setPrefs({ analytics: !!cur.analytics, marketing: !!cur.marketing });
    else setPrefs({ analytics: false, marketing: false });
  }, [open]);

  if (!open) return null;
  const cp = t.preferences;

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full md:max-w-[560px] m-0 md:m-6 rounded-t-2xl md:rounded-2xl bg-paper-50 text-ink-900 p-7 md:p-8 border border-graphite-600/15 shadow-2xl">
        <button
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-paper-100 flex items-center justify-center text-graphite-600"
        >
          <Icon.X />
        </button>

        <h3 className="font-display text-[28px] tracking-tightish">{cp.title}</h3>
        <p className="mt-1.5 text-[14px] text-graphite-600">{cp.sub}</p>

        <div className="mt-5">
          <ToggleRow label={cp.essential.label} desc={cp.essential.desc} value={true} locked />
          <ToggleRow
            label={cp.analytics.label}
            desc={cp.analytics.desc}
            value={prefs.analytics}
            onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
          />
          <ToggleRow
            label={cp.marketing.label}
            desc={cp.marketing.desc}
            value={prefs.marketing}
            onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2.5">
          <button
            onClick={() => onSave({ analytics: false, marketing: false })}
            className="rounded-full px-4 py-2.5 text-[13.5px] font-medium border border-graphite-600/25 text-graphite-700 hover:border-ink-900 hover:text-ink-900 transition-colors"
          >
            {cp.rejectAll}
          </button>
          <button
            onClick={() => onSave(prefs)}
            className="rounded-full px-4 py-2.5 text-[13.5px] font-medium border border-graphite-600/25 text-ink-900 hover:bg-paper-200 transition-colors"
          >
            {cp.save}
          </button>
          <button
            onClick={() => onSave({ analytics: true, marketing: true })}
            className="rounded-full px-5 py-2.5 text-[13.5px] font-medium bg-ink-900 text-paper-50 hover:bg-ink-800 transition-colors"
          >
            {cp.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
