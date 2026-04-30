import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

export function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      opts
    );
    io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

export function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, tone = "dark" }) {
  const cls = tone === "dark" ? "text-signal" : "text-graphite-600";
  return (
    <div className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] ${cls}`}>
      <span className="inline-block w-5 h-px bg-current opacity-60"></span>
      {children}
    </div>
  );
}

export function Pill({ children, tone = "dark" }) {
  const base =
    tone === "dark"
      ? "border-white/10 bg-white/5 text-paper-50"
      : "border-graphite-600/15 bg-paper-50 text-graphite-700";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border ${base} px-3.5 py-1.5 text-[13px] font-medium`}>
      <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
      {children}
    </span>
  );
}

export function Button({ children, variant = "primary", as = "button", href, onClick, className = "", ariaLabel }) {
  const styles = {
    primary: "bg-signal text-ink-950 hover:bg-signal-deep",
    ghost: "bg-transparent text-paper-50 border border-white/15 hover:border-signal hover:text-signal",
    ghostLight: "bg-transparent text-graphite-700 border border-graphite-600/20 hover:border-ink-900 hover:text-ink-900",
    filledLight: "bg-ink-900 text-paper-50 hover:bg-ink-800",
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 ${styles[variant]} ${className}`;
  if (as === "a" || href) {
    return (
      <a href={href} onClick={onClick} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export function Section({ id, tone = "dark", children, className = "" }) {
  const bg =
    tone === "dark"
      ? "bg-ink-950 text-paper-50"
      : tone === "ink"
      ? "bg-ink-900 text-paper-50"
      : "bg-paper-50 text-ink-900";
  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">{children}</div>
    </section>
  );
}

export const Icon = {
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowDown: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
      <path d="M5 12l4 4L19 6" />
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Dot: (p) => (
    <svg viewBox="0 0 24 24" width="8" height="8" fill="currentColor" {...p}>
      <circle cx="12" cy="12" r="6" />
    </svg>
  ),
  Warehouse: (p) => (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 20 24 10l18 10v22H6z" />
      <path d="M14 42V28h20v14" />
      <path d="M14 34h20" />
      <circle cx="38" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  Container: (p) => (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="6" y="14" width="36" height="22" rx="1.5" />
      <path d="M12 14v22M18 14v22M24 14v22M30 14v22M36 14v22" />
      <circle cx="14" cy="40" r="2.2" />
      <circle cx="34" cy="40" r="2.2" />
    </svg>
  ),
  RTLS: (p) => (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M24 42s-12-10.5-12-22a12 12 0 0 1 24 0c0 11.5-12 22-12 22z" />
      <circle cx="24" cy="20" r="4" />
      <path d="M8 28h6M34 28h6M14 36h4M30 36h4" />
    </svg>
  ),
  Mfg: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 26V14l8 4v-4l8 4v-4l8 4v12z" />
      <path d="M4 26h24" />
    </svg>
  ),
  Auto: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20l3-7h18l3 7v5H4z" />
      <circle cx="9" cy="24" r="2.2" />
      <circle cx="23" cy="24" r="2.2" />
    </svg>
  ),
  Logistics: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 10h14v12H3zM17 14h7l4 4v4H17z" />
      <circle cx="9" cy="24" r="2.2" />
      <circle cx="23" cy="24" r="2.2" />
    </svg>
  ),
  Retail: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 10h22l-2 16H7z" />
      <path d="M11 10a5 5 0 0 1 10 0" />
    </svg>
  ),
  Pharma: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="6" y="6" width="20" height="20" rx="10" />
      <path d="M11 11l10 10" />
    </svg>
  ),
  Food: (p) => (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 14h20l-2 12H8z" />
      <path d="M10 14V9a6 6 0 0 1 12 0v5" />
    </svg>
  ),
};
