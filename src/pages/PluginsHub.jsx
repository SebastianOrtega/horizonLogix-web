// /plugins — the end-customer page that lists the three plugins. Plugin pages'
// "See all plugins" lands here, never on "/" (which talks to integrators).
//
// Layout: a three-column grid from lg up; below lg, tabs over one full card at
// a time (swipe, arrows over the media, dots), never a cropped card.
// Spec: marketing/propuesta-pagina-plugins.md (middleware-docs repo).

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Eyebrow, Icon, Reveal, Section, useReducedMotion } from "../components/Primitives.jsx";
import { ACCENT_RGB } from "../theme.js";
import { PLUGINS, getPluginShared } from "../plugin-content.js";
import { HUB_ORDER, getHub } from "../plugins-hub.js";
import { track } from "../lib/track.js";
import PluginVideo, { useMedia } from "../components/PluginVideo.jsx";

const DESKTOP = "(min-width: 1024px)";
const HINT_KEY = "hlogix.hubSwipeHint";
const SITE = "https://hlogix.app";

export default function PluginsHub({ lang, onDemo, onSales }) {
  const hub = getHub(lang);
  const shared = getPluginShared(lang);
  usePageMeta(hub.meta, `${SITE}/plugins`);
  // One structure mounted at a time, so there is never a second <video>.
  const desktop = useMedia(DESKTOP);

  const plugins = HUB_ORDER.map((slug) => {
    const p = PLUGINS[slug];
    const data = p[lang] || p.es;
    return {
      slug,
      title: data.title,
      tagline: data.tagline,
      route: p.routes[lang] || p.routes.es,
      card: hub.cards[slug],
    };
  });

  return (
    <main>
      <Section tone="dark" className="bg-grid-dark pt-32 pb-24 overflow-hidden">
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>{hub.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-h1 mt-6 text-[clamp(40px,5vw,68px)] max-w-[18ch] text-paper-50">{hub.title}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[18px] leading-relaxed text-paper-50/65 max-w-[600px]">{hub.lede}</p>
          </Reveal>
        </div>
        <Reveal delay={240} className="mt-14">
          {desktop ? <Grid plugins={plugins} hub={hub} /> : <Gallery plugins={plugins} hub={hub} />}
        </Reveal>
      </Section>

      <Chooser hub={hub} plugins={plugins} />

      <Section tone="dark" className="bg-grid-dark py-28 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${ACCENT_RGB},0.12), transparent 55%)` }}
        />
        <div className="relative">
          <Reveal>
            <h2 className="display-h2 text-[clamp(40px,5vw,68px)] mx-auto max-w-[18ch] text-paper-50">
              {shared.closingCtaTitle}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[18px] text-paper-50/65 max-w-[480px] mx-auto">{shared.closingCtaSub}</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button onClick={() => onDemo("plugins_hub")}>
                {shared.closingCtaPrimary} <Icon.Arrow />
              </Button>
              <Button variant="ghost" onClick={() => onSales("plugins_hub")}>
                {shared.closingCtaSecondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

// Title, description and canonical for this route. index.html carries the
// landing's values for every route (SPA fallback), so without this the hub
// would declare "/" as its canonical. Restored on leave.
function usePageMeta(meta, canonical) {
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const link = document.querySelector('link[rel="canonical"]');
    const prevDesc = desc?.getAttribute("content");
    const prevCanonical = link?.getAttribute("href");
    document.title = meta.title;
    desc?.setAttribute("content", meta.description);
    link?.setAttribute("href", canonical);
    return () => {
      document.title = prevTitle;
      if (desc && prevDesc != null) desc.setAttribute("content", prevDesc);
      if (link && prevCanonical != null) link.setAttribute("href", prevCanonical);
    };
  }, [meta.title, meta.description, canonical]);
}


// Desktop (lg+): the three cards side by side; nothing to discover.
function Grid({ plugins, hub }) {
  const total = plugins.length;
  return (
    <div role="list" aria-label={hub.carousel.label} className="grid grid-cols-3 gap-5">
      {plugins.map((p, i) => (
        <div role="listitem" key={p.slug} className="flex">
          <PluginCard plugin={p} i={i} total={total} hub={hub} />
        </div>
      ))}
    </div>
  );
}

function readHintSeen() {
  try {
    return sessionStorage.getItem(HINT_KEY) === "1";
  } catch (e) {
    return false;
  }
}
function writeHintSeen() {
  try {
    sessionStorage.setItem(HINT_KEY, "1");
  } catch (e) {}
}

// Below lg: tabs with the three names, then ONE full card. The cards live in a
// flex track inside an overflow-hidden viewport and slide with translateX, so
// tabs, arrows, dots and a finger drag all move the same track. ARIA tabs
// pattern; inactive panels are inert.
function Gallery({ plugins, hub }) {
  const total = plugins.length;
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0); // px offset while a finger is down
  const [dragging, setDragging] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [hint, setHint] = useState(false);
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const tabRefs = useRef([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const ids = plugins.map((p) => `hub-${p.slug}`);

  // Swipe hint: once per session, the first time the gallery shows up.
  useEffect(() => {
    if (reduced || readHintSeen()) return;
    const el = rootRef.current;
    if (!el) return;
    let timer;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || e.intersectionRatio < 0.4) return;
        io.disconnect();
        writeHintSeen();
        setHint(true);
        timer = setTimeout(() => setHint(false), 2600);
      },
      { threshold: [0, 0.4, 0.6] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [reduced]);

  const go = (i, method, { focusTab = false } = {}) => {
    const to = Math.max(0, Math.min(total - 1, i));
    setHint(false);
    if (to === index) return;
    setIndex(to);
    if (method !== "tab" && method !== "key") setAnnounce(`${to + 1} ${hub.of} ${total}: ${plugins[to].title}`);
    if (focusTab) tabRefs.current[to]?.focus();
    // The arrow that disappears at an end hands focus to the other one.
    if (method === "arrow") {
      if (to === 0 && document.activeElement === prevRef.current) nextRef.current?.focus();
      if (to === total - 1 && document.activeElement === nextRef.current) prevRef.current?.focus();
    }
    track("plugins_carousel_nav", { method, to: to + 1 });
  };

  const onTabKey = (e) => {
    const map = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: total - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    go(map[e.key], "key", { focusTab: true });
    tabRefs.current[Math.max(0, Math.min(total - 1, map[e.key]))]?.focus();
  };

  // Finger drag. touch-action: pan-y leaves vertical scrolling to the browser;
  // we only take over once the gesture is clearly horizontal.
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    gesture.current = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId, axis: null };
    suppressClick.current = false;
  };
  const onPointerMove = (e) => {
    const g = gesture.current;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!g.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      g.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (g.axis === "x") {
        setDragging(true);
        setHint(false);
        viewportRef.current?.setPointerCapture?.(e.pointerId);
      }
    }
    if (g.axis !== "x") return;
    const atEdge = (index === 0 && dx > 0) || (index === total - 1 && dx < 0);
    setDrag(atEdge ? dx * 0.3 : dx);
  };
  const endGesture = (e) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || g.axis !== "x") return;
    const width = viewportRef.current?.clientWidth || 1;
    const dx = e.clientX - g.x;
    const fast = Math.abs(dx) / Math.max(1, performance.now() - g.t) > 0.5 && Math.abs(dx) > 30;
    suppressClick.current = Math.abs(dx) > 8;
    setDragging(false);
    setDrag(0);
    if (Math.abs(dx) > width * 0.2 || fast) go(index + (dx < 0 ? 1 : -1), "swipe");
  };

  const arrowCls =
    "pointer-events-auto absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-ink-950/80 backdrop-blur border border-white/20 text-paper-50 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)] transition-colors hover:border-signal hover:text-signal";

  return (
    <div ref={rootRef}>
      <div role="tablist" aria-label={hub.carousel.label} className="flex border-b border-white/10">
        {plugins.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`${ids[i]}-tab`}
            aria-selected={i === index}
            aria-controls={`${ids[i]}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => go(i, "tab")}
            onKeyDown={onTabKey}
            className={`relative min-h-[44px] ${i === 0 ? "pl-0 pr-3 sm:pr-4" : "px-3 sm:px-4"} text-[15px] font-medium whitespace-nowrap transition-colors ${
              i === index ? "text-paper-50" : "text-paper-50/60 hover:text-paper-50"
            }`}
          >
            {p.title.replace(/^Horizon /, "")}
            <span
              aria-hidden="true"
              className={`absolute ${i === 0 ? "left-0" : "left-3 sm:left-4"} right-3 sm:right-4 -bottom-px h-0.5 transition-colors ${
                i === index ? "bg-signal" : "bg-transparent"
              }`}
            ></span>
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <div
          ref={viewportRef}
          className="overflow-hidden rounded-2xl"
          style={{ touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endGesture}
          onPointerCancel={endGesture}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
              transition: dragging || reduced ? "none" : "transform 320ms var(--ease-out, cubic-bezier(0.2, 0.8, 0.2, 1))",
            }}
          >
            {plugins.map((p, i) => (
              <div
                key={p.slug}
                role="tabpanel"
                id={`${ids[i]}-panel`}
                aria-labelledby={`${ids[i]}-tab`}
                aria-hidden={i === index ? undefined : "true"}
                {...(i === index ? {} : { inert: "" })}
                className="w-full shrink-0 flex"
              >
                <PluginCard plugin={p} i={i} total={total} hub={hub} active={i === index} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows over the media, at its vertical centre. Hidden at the ends:
            no "next" on the third card is what says "that's all three". */}
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5] md:aspect-video">
          {index > 0 && (
            <button
              ref={prevRef}
              type="button"
              aria-label={hub.carousel.prev}
              onClick={() => go(index - 1, "arrow")}
              className={`${arrowCls} left-2`}
            >
              <Icon.Arrow className="rotate-180" aria-hidden="true" />
            </button>
          )}
          {index < total - 1 && (
            <button
              ref={nextRef}
              type="button"
              aria-label={hub.carousel.next}
              onClick={() => go(index + 1, "arrow")}
              className={`${arrowCls} right-2`}
            >
              <Icon.Arrow aria-hidden="true" />
            </button>
          )}
          {hint && <SwipeHint />}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        <div className="flex items-center" aria-hidden="true">
          {plugins.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              tabIndex={-1}
              className="w-6 h-8 inline-flex items-center justify-center"
              onClick={() => go(i, "dot")}
            >
              <span
                className={`block w-2 h-2 rounded-full transition-colors ${i === index ? "bg-signal" : "bg-paper-50/30"}`}
              ></span>
            </button>
          ))}
        </div>
        {reduced && <p className="text-[13px] text-paper-50/60">{hub.carousel.swipe}</p>}
      </div>
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}

// A hand that slides left and right once over the media: "this moves".
function SwipeHint() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="hub-swipe-hint flex items-center justify-center w-16 h-16 rounded-full bg-ink-950/75 border border-white/20 text-paper-50">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 17V8.5a2 2 0 0 1 4 0V15" />
          <path d="M17 14.5v-1.5a2 2 0 0 1 4 0V16" />
          <path d="M21 15a2 2 0 0 1 4 0v4.5c0 4.4-3 7.5-7.2 7.5h-1.3c-2.4 0-4.1-1-5.5-2.9L7.6 20a2 2 0 0 1 3.2-2.4L13 20" />
          <path d="M4 7h5M4 7l2-2M4 7l2 2M28 7h-5M28 7l-2-2M28 7l-2 2" />
        </svg>
      </div>
    </div>
  );
}

function PluginCard({ plugin, i, total, hub, active = true }) {
  const { card } = plugin;
  return (
    <article
      aria-label={`${i + 1} ${hub.of} ${total}: ${plugin.title}`}
      className="w-full rounded-2xl border border-white/10 bg-ink-900 overflow-hidden flex flex-col"
    >
      {card.media.kind === "video" ? (
        <PluginVideo media={card.media} labels={hub.video} plugin={plugin.slug} active={active} />
      ) : (
        <div className="aspect-[4/5] md:aspect-video bg-paper-50 border-b border-white/10 overflow-hidden">
          <img
            src={card.media.src}
            alt={card.media.alt}
            width={card.media.width}
            height={card.media.height}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="block w-full h-full object-cover select-none"
            style={{ objectPosition: card.media.position }}
          />
        </div>
      )}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-50/55">
          <span className="tnum whitespace-nowrap">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-paper-50/20 shrink-0"></span>
          <span>{card.area}</span>
        </div>
        <h2 className="mt-5 font-display text-[clamp(24px,2.2vw,28px)] tracking-tightish leading-[1.1] text-paper-50">
          {plugin.title}
        </h2>
        <p className="mt-3 text-[17px] leading-snug text-paper-50/80">{plugin.tagline}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-paper-50/65">{card.summary}</p>
        <div className="mt-auto pt-6">
          <Link
            to={plugin.route}
            draggable="false"
            onClick={() => track("plugin_card_click", { plugin: plugin.slug, source: "plugins_hub" })}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-paper-50 hover:text-signal u-grow"
          >
            {card.cta} <Icon.Arrow aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Chooser({ hub, plugins }) {
  const bySlug = Object.fromEntries(plugins.map((p) => [p.slug, p]));
  return (
    <Section tone="light" className="py-24 md:py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{hub.chooser.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="display-h2 mt-6 text-[clamp(30px,3.4vw,48px)] text-ink-900">{hub.chooser.title}</h2>
        </Reveal>
      </div>
      <ul className="mt-14 max-w-[1080px]">
        {hub.chooser.rows.map((r, i) => {
          const p = bySlug[r.slug];
          return (
            <Reveal as="li" key={r.slug} delay={i * 60}>
              <Link
                to={p.route}
                onClick={() => track("plugin_card_click", { plugin: r.slug, source: "plugins_hub_chooser" })}
                className="group grid md:grid-cols-12 gap-x-10 gap-y-3 items-baseline py-7 border-t border-ink-950/12"
              >
                <span className="md:col-span-8 font-display text-[clamp(22px,2.2vw,28px)] tracking-tightish leading-[1.2] text-ink-900">
                  {r.q}
                </span>
                <span className="md:col-span-4 md:justify-self-end inline-flex items-center gap-2 text-[15px] font-medium text-graphite-700 group-hover:text-ink-900 transition-colors">
                  {p.title}
                  <Icon.Arrow aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
