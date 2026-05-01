import { useEffect, useMemo, useRef, useState } from "react";
import logoUrl from "../assets/logo-horizonlogix.svg";
import { ACCENT, ACCENT_RGB } from "../theme.js";
import {
  Button,
  Eyebrow,
  Icon,
  Pill,
  Reveal,
  Section,
  useReducedMotion,
  useScrollY,
} from "./Primitives.jsx";
import NetworkDiagram from "./NetworkDiagram.jsx";

export function Logo({ size = 28 }) {
  return (
    <img
      src={logoUrl}
      alt="Horizon Logix"
      width={size}
      height={size}
      style={{ width: size, height: "auto", display: "block" }}
    />
  );
}

function LangSwitch({ lang, setLang }) {
  return (
    <div className="hidden md:flex items-center gap-0.5 text-[12px] font-medium border border-white/10 rounded-full p-0.5 mr-1">
      {["es", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-full transition-colors ${lang === l ? "bg-signal text-ink-950" : "text-paper-50/70 hover:text-paper-50"
            }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Nav({ t, lang, setLang, onDemo }) {
  const y = useScrollY();
  const scrolled = y > 80;
  const items = [
    { k: "platform", id: "how" },
    { k: "plugins", id: "plugins" },
    { k: "industries", id: "industries" },
    { k: "cases", id: "cases" },
    { k: "docs", id: "arch" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${scrolled ? "bg-ink-950/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-paper-50">
          <Logo size={80} />

        </a>
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] text-paper-50/75">
          {items.map((i) => (
            <a key={i.k} href={`#${i.id}`} className="u-grow hover:text-paper-50 transition-colors">
              {t.nav[i.k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <a
            href="#cta"
            className="hidden md:inline-flex text-[13.5px] text-paper-50/75 hover:text-paper-50 px-3 py-2"
          >
            {t.nav.contact}
          </a>
          <Button onClick={onDemo}>{t.nav.demo}</Button>
        </div>
      </div>
    </header>
  );
}

export function Hero({ t, onDemo }) {
  const reduced = useReducedMotion();
  return (
    <Section id="top" tone="dark" className="bg-grid-dark pt-32 pb-20 md:pb-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, rgba(${ACCENT_RGB},0.10), transparent 60%)` }}
      ></div>

      <div className="relative grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-h1 mt-6 text-[clamp(56px,7.4vw,104px)] text-paper-50">
              {t.hero.h1a}
              <br />
              {t.hero.h1b}
              <br />
              <span className="italic text-signal/90">{t.hero.h1c}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[520px] text-[18px] leading-relaxed text-paper-50/70">{t.hero.sub}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button onClick={onDemo}>
                {t.hero.ctaPrimary} <Icon.Arrow />
              </Button>
              <Button variant="ghost" href="#how">
                {t.hero.ctaSecondary} <Icon.ArrowDown />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-14">
              {/*<div className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-50/45">
                {t.hero.trust}
              </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-9 gap-y-3 opacity-60">
                {["NORDEX", "ALMACENA", "CFE-LOG", "GRUPO MV", "TRAZA·MX", "PHARMALINK"].map((b) => (
                  <span key={b} className="font-mono text-[13px] tracking-widest text-paper-50/65">
                    {b}
                  </span>
                ))}
              </div> */}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={120}>
            <div className="relative rounded-2xl border border-white/10 bg-ink-900/60 p-3 md:p-5">
              <div className="flex items-center justify-between px-2 pb-3 text-[11px] font-mono text-paper-50/45">
                <span>topology.live</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse"></span>STREAMING
                </span>
              </div>
              <NetworkDiagram t={t.hero} reduced={reduced} />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Problem({ t }) {
  const [count, setCount] = useState(t.problem.events.length);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const i = setInterval(() => setCount((c) => c + 1), 1800);
    return () => clearInterval(i);
  }, [reduced]);
  const events = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(t.problem.events[i % t.problem.events.length]);
    }
    return list.slice(-4);
  }, [count, t]);

  return (
    <Section tone="light" className="bg-grid-light py-28">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="light">{t.problem.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-ink-900">
              {t.problem.title}
              <br />
              <span className="text-graphite-500">{t.problem.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-graphite-600">{t.problem.body}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
          <Reveal delay={120}>
            <div className="rounded-xl bg-ink-950 text-paper-50 p-5 h-[360px] overflow-hidden relative border border-ink-700/40">
              <div className="flex items-center justify-between text-[11px] font-mono text-paper-50/45">
                <span>{t.problem.rawLabel}</span>
                <span className="text-red-400">noise · dupes · errors</span>
              </div>
              <div className="mt-4 h-[300px] overflow-hidden font-mono text-[13px] leading-7 text-paper-50/70 relative">
                <div className={reduced ? "" : "scroll-up"}>
                  {[...t.problem.raw, ...t.problem.raw].map((s, i) => (
                    <div key={i} className={`tnum ${s.startsWith("ERR") ? "text-red-400/85" : ""}`}>
                      <span className="text-paper-50/30 mr-3">{String(i + 1).padStart(3, "0")}</span>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink-950 to-transparent pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-xl bg-paper-50 border border-graphite-600/15 p-5 h-[360px] relative">
              <div className="flex items-center justify-between text-[11px] font-mono text-graphite-500">
                <span>{t.problem.cleanLabel}</span>
                <span className="flex items-center gap-1.5 text-signal-deep">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-deep animate-pulse"></span>
                  routed
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                {events.map((e, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-graphite-600/12 bg-white px-3.5 py-3 flex items-center justify-between text-[13px]"
                    style={{
                      animation: reduced ? "none" : "drift 4s var(--ease-out) infinite",
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <div>
                      <div className="font-mono text-ink-900 tnum">{e.sku}</div>
                      <div className="text-[11px] text-graphite-500 mt-0.5">{e.op}</div>
                    </div>
                    <div className="font-mono text-[12px] text-graphite-500 tnum">{e.ts}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function wrapLine(s, n) {
  const out = [];
  let cur = "";
  s.split(" ").forEach((w) => {
    if ((cur + " " + w).trim().length > n) {
      out.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  });
  if (cur.trim()) out.push(cur.trim());
  return out.slice(0, 2);
}

function NodeIcon({ kind, active }) {
  const c = active ? ACCENT : "rgba(247,247,245,0.5)";
  const props = { stroke: c, fill: "none", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "readers":
      return (
        <g {...props}>
          <rect x="-8" y="-6" width="16" height="12" rx="2" />
          <circle cx="0" cy="0" r="2" fill={c} stroke="none" />
        </g>
      );
    case "mqtt":
      return (
        <g stroke={c} fill="none" strokeWidth="1.4" strokeLinecap="round">
          <path d="M-7 3 Q-3 -3 0 3 T7 3" />
        </g>
      );
    case "plugins":
      return (
        <g {...props}>
          <rect x="-9" y="-7" width="7" height="6" />
          <rect x="2" y="-7" width="7" height="6" />
          <rect x="-9" y="1" width="7" height="6" />
          <rect x="2" y="1" width="7" height="6" />
        </g>
      );
    case "erp":
      return (
        <g {...props}>
          <path d="M-9 -6 L9 -6 L9 6 L-9 6 Z M-9 0 L9 0 M-3 -6 L-3 6 M3 -6 L3 6" />
        </g>
      );
    default:
      return null;
  }
}

function FlowDiagram({ stages, active, reduced }) {
  const W = 1180,
    H = 360;
  const positions = stages.map((_, i) => ({
    x: 90 + (i * (W - 180)) / (stages.length - 1),
    y: H / 2,
  }));

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 md:p-10">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        <line
          x1={positions[0].x}
          y1={H / 2}
          x2={positions.at(-1).x}
          y2={H / 2}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <line
          x1={positions[0].x}
          y1={H / 2}
          x2={positions[Math.min(active, positions.length - 1)].x}
          y2={H / 2}
          stroke={ACCENT}
          strokeWidth="2"
          style={{ transition: "all 600ms var(--ease-out)" }}
        />

        {stages.map((s, i) => {
          const isActive = i <= active;
          const isCenter = s.k === "core";
          return (
            <g key={s.k} transform={`translate(${positions[i].x}, ${positions[i].y})`}>
              {isCenter && isActive && !reduced && <circle r="74" fill="url(#nodeGlow)" />}
              <circle
                r={isCenter ? 38 : 22}
                fill="#0E1424"
                stroke={isActive ? ACCENT : "rgba(255,255,255,0.18)"}
                strokeWidth={isActive ? 1.5 : 1}
                style={{ transition: "all 500ms var(--ease-out)" }}
              />
              {isCenter ? (
                <>
                  <text textAnchor="middle" y="-3" fontSize="11" fontWeight="600" fill="#F7F7F5">
                    Horizon
                  </text>
                  <text textAnchor="middle" y="11" fontSize="9" fill="rgba(247,247,245,0.6)" fontFamily="JetBrains Mono">
                    core
                  </text>
                </>
              ) : (
                <NodeIcon kind={s.k} active={isActive} />
              )}
              <text textAnchor="middle" y={isCenter ? 64 : 50} fontSize="12" fontWeight="500" fill="#F7F7F5">
                {s.t}
              </text>
              <text textAnchor="middle" y={isCenter ? 82 : 68} fontSize="11" fill="rgba(247,247,245,0.55)">
                {wrapLine(s.d, 28).map((line, li) => (
                  <tspan key={li} x="0" dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function HowItWorks({ t }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const onScroll = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh;
      const scrolled = Math.min(Math.max(-r.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.min(t.arch.stages.length - 1, Math.floor(p * t.arch.stages.length * 1.05));
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [t.arch.stages.length]);

  return (
    <Section id="how" tone="ink" className="bg-grid-dark py-28">
      <div className="text-center max-w-[760px] mx-auto">
        <Reveal>
          <Eyebrow>{t.arch.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-paper-50">
            {t.arch.title1} <span className="text-paper-50/50">{t.arch.title2}</span>
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-16" style={{ minHeight: "180vh" }}>
        <div className="sticky top-24">
          <FlowDiagram stages={t.arch.stages} active={active} reduced={reduced} />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {t.arch.pills.map((p) => (
              <Pill key={p}>{p}</Pill>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PluginMockup({ kind }) {
  if (kind === 0)
    return (
      <div className="rounded-md border border-graphite-600/12 bg-white p-3 font-mono text-[10.5px] text-graphite-600">
        <div className="flex justify-between">
          <span>SO-44812</span>
          <span className="text-signal-deep">VALID ✓</span>
        </div>
        <div className="mt-1 flex justify-between">
          <span>SKU-77103</span>
          <span>3 / 3</span>
        </div>
        <div className="mt-1 flex justify-between text-graphite-400">
          <span>SKU-90021</span>
          <span>1 / 4</span>
        </div>
        <div className="mt-2 h-1 bg-paper-200 rounded">
          <div className="h-1 bg-signal rounded" style={{ width: "72%" }} />
        </div>
      </div>
    );
  if (kind === 1)
    return (
      <div className="rounded-md border border-graphite-600/12 bg-white p-3 text-[10.5px] text-graphite-600 font-mono">
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-sm ${i % 5 === 0 ? "bg-signal/70" : "bg-paper-200"}`} />
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <span>IN: 124</span>
          <span>OUT: 88</span>
        </div>
      </div>
    );
  return (
    <div className="rounded-md border border-graphite-600/12 bg-white p-3 text-[10.5px] text-graphite-600 font-mono relative h-[68px] overflow-hidden">
      <div className="absolute inset-2 grid grid-cols-8 grid-rows-3 gap-0.5">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="rounded-[1px]" style={{ background: `rgba(${ACCENT_RGB},${(i % 7) / 9})` }} />
        ))}
      </div>
      <div className="absolute bottom-1.5 right-2 text-graphite-500">station-04</div>
    </div>
  );
}

export function Plugins({ t }) {
  const icons = [Icon.Warehouse, Icon.Container, Icon.RTLS];
  return (
    <Section id="plugins" tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{t.plugins.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-ink-900">{t.plugins.title}</h2>
        </Reveal>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {t.plugins.cards.map((c, i) => {
          const I = icons[i];
          return (
            <Reveal key={c.name} delay={i * 100}>
              <article className="card-lift group relative overflow-hidden rounded-2xl border border-graphite-600/12 bg-white p-7 h-full flex flex-col">
                {c.ribbon && (
                  <span className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-[0.15em] text-signal-deep border border-signal-deep/30 bg-signal/10 rounded-full px-2.5 py-1">
                    {c.ribbon}
                  </span>
                )}
                <div className="text-ink-900">
                  <I />
                </div>
                <h3 className="mt-6 font-display text-[26px] tracking-tightish text-ink-900">{c.name}</h3>
                <p className="mt-2 text-[14.5px] text-graphite-600 leading-relaxed">{c.tag}</p>

                <ul className="mt-6 space-y-2.5 text-[13.5px] text-ink-900/85 flex-1">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal flex-shrink-0"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 -mx-7 -mb-7 px-7 pt-5 pb-7 bg-paper-100 border-t border-graphite-600/10 transition-colors group-hover:bg-paper-50">
                  <PluginMockup kind={i} />
                  <a className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-900 u-grow">
                    {c.link} <Icon.Arrow />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function Industries({ t }) {
  const icons = [Icon.Mfg, Icon.Auto, Icon.Logistics, Icon.Retail, Icon.Pharma, Icon.Food];
  return (
    <Section id="industries" tone="dark" className="py-28">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="max-w-[680px]">
          <Reveal>
            <Eyebrow>{t.industries.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-paper-50">{t.industries.title}</h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 -mx-6 md:-mx-10 px-6 md:px-10">
        <div className="snap-row no-bar overflow-x-auto flex gap-4 pb-2">
          {t.industries.cards.map((c, i) => {
            const I = icons[i];
            return (
              <Reveal key={c.name} delay={i * 60}>
                <div className="card-lift min-w-[300px] md:min-w-[340px] rounded-2xl border border-white/10 bg-ink-900 p-7 h-[280px] flex flex-col justify-between">
                  <div className="text-paper-50/85">
                    <I />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-paper-50/45">{c.name}</div>
                    <div className="mt-2 font-display text-[22px] leading-tight tracking-tightish text-paper-50">
                      {c.use}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-signal font-mono tnum">
                      {c.metric}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function Partners({ t }) {
  const reduced = useReducedMotion();
  const accent = ACCENT;
  return (
    <Section id="partners" tone="light" className="py-28 bg-paper-100 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,15,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,15,26,0.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 75%)",
        }}
      />

      <div className="relative grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="light">{t.partners.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h1 mt-5 text-[clamp(44px,5.4vw,76px)] text-ink-950 tracking-tight leading-[0.96]">
              {t.partners.title1}
              <br />
              <span className="italic font-display-italic" style={{ color: accent }}>
                {t.partners.title2}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 text-[17px] leading-[1.55] text-graphite-700 max-w-[440px]">{t.partners.body}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="filledLight" href="#cta">
                {t.partners.ctaPrimary} <Icon.Arrow />
              </Button>
              <a
                href="#cta"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[13.5px] text-graphite-700 hover:text-ink-950"
              >
                {t.partners.ctaSecondary} <Icon.Arrow />
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-[440px]">
              {t.partners.stats.map((s, i) => (
                <div key={i} className="border-l border-ink-950/15 pl-3">
                  <div className="font-display text-[28px] leading-none text-ink-950 tracking-tight tnum">{s.n}</div>
                  <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.12em] text-graphite-700/70 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="relative rounded-2xl border border-ink-950/10 bg-white p-7 md:p-8 shadow-[0_30px_80px_-40px_rgba(11,15,26,0.25)]">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-graphite-700/60 pb-5 border-b border-ink-950/10">
                <span>{t.partners.tableTitle}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }}></span>
                  {t.partners.programLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-7">
                {t.partners.tiers.map((tier, i) => (
                  <div key={i} className="group">
                    <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-graphite-700/60">{tier.label}</div>
                    <div className="mt-1.5 font-display text-[26px] leading-tight tracking-tightish text-ink-950">{tier.name}</div>
                    <ul className="mt-3 space-y-1.5">
                      {tier.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-[14px] text-graphite-700 leading-snug">
                          <span className="mt-2 w-1 h-1 rounded-full flex-none" style={{ background: accent }}></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-9 pt-7 border-t border-ink-950/10">
                <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-graphite-700/60 mb-5">
                  {t.partners.timelineTitle}
                </div>
                <div className="relative">
                  <div className="absolute left-0 right-0 top-[14px] h-px bg-ink-950/12"></div>
                  <div className="absolute left-0 top-[14px] h-px" style={{ width: "82%", background: accent }}></div>
                  <div className="grid grid-cols-4 gap-3 relative">
                    {t.partners.timeline.map((step, i) => (
                      <div key={i} className="flex flex-col items-start">
                        <div
                          className="relative w-7 h-7 rounded-full bg-white border-[1.5px] flex items-center justify-center font-mono text-[11px] tnum"
                          style={{
                            borderColor: i < 3 ? accent : "rgba(11,15,26,0.2)",
                            color: i < 3 ? accent : "rgba(11,15,26,0.5)",
                          }}
                        >
                          {i + 1}
                          {!reduced && i === 2 && (
                            <span
                              className="absolute inset-0 rounded-full pulse-ring"
                              style={{ border: `1px solid ${accent}` }}
                            ></span>
                          )}
                        </div>
                        <div className="mt-3 text-[13px] font-medium text-ink-950 leading-tight">{step.t}</div>
                        <div className="mt-1 text-[11.5px] text-graphite-700/65 font-mono tnum">{step.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {t.partners.brands.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-ink-950/10 bg-white px-6 py-5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-700/55">{b.label}</div>
                    <div className="mt-1.5 font-display text-[20px] tracking-tightish text-ink-950">{b.name}</div>
                  </div>
                  <div className="text-[11.5px] font-mono text-graphite-700/55 tracking-wide">{b.note}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function LiveDemo({ t }) {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const i = setInterval(() => setTick((x) => x + 1), 100);
    return () => clearInterval(i);
  }, [reduced]);

  const phase = (tick / 100) % 1;
  const stops = [0, 0.18, 0.4, 0.65, 0.88];
  const activeIdx = stops.findLastIndex((s) => phase >= s);

  return (
    <Section id="cases" tone="ink" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow>{t.livedemo.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-paper-50">{t.livedemo.title}</h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 text-[17px] text-paper-50/65 max-w-[520px]">{t.livedemo.sub}</p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mt-12 rounded-2xl border border-white/10 bg-ink-950 p-6 md:p-10 relative overflow-hidden">
          <svg viewBox="0 0 1200 280" className="w-full h-auto">
            <defs>
              <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0.7" />
              </linearGradient>
            </defs>

            <line x1="80" y1="140" x2="1120" y2="140" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line
              x1="80"
              y1="140"
              x2={80 + 1040 * (reduced ? 0.5 : phase)}
              y2="140"
              stroke="url(#trackGrad)"
              strokeWidth="2"
            />

            {stops.map((s, i) => {
              const cx = 80 + 1040 * s;
              const isActive = i <= activeIdx;
              return (
                <g key={i} transform={`translate(${cx}, 140)`}>
                  {isActive && !reduced && (
                    <circle r="22" fill="none" stroke={ACCENT} strokeOpacity="0.4" className="pulse-ring" />
                  )}
                  <circle r="9" fill="#0B0F1A" stroke={isActive ? ACCENT : "rgba(255,255,255,0.25)"} strokeWidth="1.5" />
                  {isActive && <circle r="3.5" fill={ACCENT} />}
                  <text y="-22" textAnchor="middle" fontSize="11" fill="rgba(247,247,245,0.55)" fontFamily="JetBrains Mono">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  <text
                    y="42"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="500"
                    fill={isActive ? "#F7F7F5" : "rgba(247,247,245,0.5)"}
                  >
                    {t.livedemo.callouts[i]}
                  </text>
                </g>
              );
            })}

            {!reduced && (
              <g transform={`translate(${80 + 1040 * phase}, 140)`}>
                <circle r="6" fill={ACCENT} />
                <circle r="14" fill="none" stroke={ACCENT} strokeOpacity="0.45" />
              </g>
            )}
          </svg>

          <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-paper-50/50">
            <span>loop · 10.0s</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse"></span>LIVE
            </span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Why({ t }) {
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{t.why.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-h2 mt-5 text-[clamp(40px,5vw,68px)] text-ink-900">{t.why.title}</h2>
        </Reveal>
      </div>
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.why.items.map((it, i) => (
          <Reveal key={it.t} delay={i * 80}>
            <div className="card-lift rounded-2xl border border-graphite-600/12 bg-white p-7 h-full">
              <div className="w-9 h-9 rounded-lg bg-ink-900 text-signal flex items-center justify-center font-mono text-[12px] tnum">
                0{i + 1}
              </div>
              <h3 className="mt-6 font-display text-[22px] tracking-tightish text-ink-900">{it.t}</h3>
              <p className="mt-2 text-[14px] text-graphite-600 leading-relaxed">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function ArchIT({ t }) {
  return (
    <Section id="arch" tone="dark" className="bg-grid-dark py-28">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.arch2.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h2 mt-5 text-[clamp(34px,4vw,54px)] text-paper-50">{t.arch2.title}</h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap gap-2">
              {t.arch2.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[12px] tracking-wide rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-paper-50/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <a href="#" className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-signal u-grow">
              {t.arch2.docs} <Icon.Arrow />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3">
          {t.arch2.security.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="card-lift rounded-xl border border-white/10 bg-ink-900 p-6 h-full">
                <div className="font-mono text-[10.5px] tracking-[0.15em] uppercase text-signal">SEC · 0{i + 1}</div>
                <h4 className="mt-4 font-display text-[19px] tracking-tightish text-paper-50">{s.t}</h4>
                <p className="mt-2 text-[13px] text-paper-50/60 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <div className="sm:col-span-3 rounded-xl border border-white/10 bg-ink-950 p-5 font-mono text-[12px] text-paper-50/75 leading-6">
              <div className="text-paper-50/35"># workflow · shipping_dock_a</div>
              <div>
                <span className="text-signal">read</span>:{" "}
                <span className="text-paper-50/55">rfid.dock_a → validate(sku, serial)</span>
              </div>
              <div>
                <span className="text-signal">enrich</span>:{" "}
                <span className="text-paper-50/55">lookup(order) from netsuite</span>
              </div>
              <div>
                <span className="text-signal">route</span>:{" "}
                <span className="text-paper-50/55">"shipment.closed" → sap.s4hana</span>
              </div>
              <div>
                <span className="text-signal">tenant</span>: <span className="text-paper-50/55">isolation: collection</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Testimonial({ t }) {
  return (
    <Section tone="light" className="py-28">
      <Reveal>
        <figure className="mx-auto max-w-[920px] text-center">
          <Eyebrow tone="light">Customers</Eyebrow>
          <blockquote className="mt-8 font-display text-[clamp(28px,3.4vw,44px)] leading-[1.18] tracking-tightish text-ink-900 text-balance">
            “{t.quote.text}”
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-4 text-[13.5px]">
            <div className="w-10 h-10 rounded-full bg-ink-900 text-signal flex items-center justify-center font-mono">
              MG
            </div>
            <div className="text-left">
              <div className="font-medium text-ink-900">{t.quote.name}</div>
              <div className="text-graphite-500">{t.quote.role}</div>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

export function CTABand({ t, onDemo }) {
  return (
    <Section id="cta" tone="dark" className="bg-grid-dark py-28 text-center relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${ACCENT_RGB},0.15), transparent 55%)` }}
      />
      <div className="relative">
        <Reveal>
          <h2 className="display-h2 text-[clamp(44px,6vw,84px)] mx-auto max-w-[16ch] text-paper-50">{t.cta.title}</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button onClick={onDemo}>
              {t.cta.primary} <Icon.Arrow />
            </Button>
            <Button variant="ghost" href="mailto:hola@horizonlogix.com">
              {t.cta.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer({ t, lang, setLang }) {
  const year = new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", { year: "numeric" }).format(new Date());
  return (
    <footer className="bg-ink-950 border-t border-white/5 text-paper-50/70">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 text-paper-50">
            <Logo size={80} />

          </div>
          <p className="mt-4 text-[14px] max-w-[300px] leading-relaxed">{t.footer.tagline}</p>
          <div className="mt-6 flex items-center gap-2">
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
        </div>
        {t.footer.cols.map((c) => (
          <div key={c.h} className="md:col-span-2">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper-50/40">{c.h}</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {c.links.map((l) => (
                <li key={l}>
                  <a className="hover:text-paper-50 u-grow" href="#">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 text-[12px] text-paper-50/45 font-mono">
          <span>
            © {year} Horizon Logix · {t.footer.rights}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-signal"></span>
            {t.footer.made}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function CookieStrip({ t, onClose }) {
  return (
    <div
      role="dialog"
      aria-label="cookies"
      className="fixed bottom-4 inset-x-4 md:left-auto md:right-6 md:bottom-6 z-30 max-w-[520px] rounded-xl border border-white/10 bg-ink-900/90 backdrop-blur px-5 py-4 text-[13px] text-paper-50/80 flex flex-wrap items-center gap-3"
    >
      <span className="flex-1 min-w-[200px]">{t.cookies.body}</span>
      <a href="#" className="underline underline-offset-2 hover:text-paper-50">
        {t.cookies.manage}
      </a>
      <button onClick={onClose} className="rounded-full bg-signal text-ink-950 px-3 py-1.5 text-[12px] font-medium">
        {t.cookies.ok}
      </button>
    </div>
  );
}
