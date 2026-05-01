import { Link } from "react-router-dom";
import { Button, Eyebrow, Icon, Reveal, Section } from "../components/Primitives.jsx";
import { ACCENT_RGB } from "../theme.js";
import { PLUGINS, getPluginShared } from "../plugin-content.js";

export default function PluginPage({ slug, lang, onDemo, onSales }) {
  const plugin = PLUGINS[slug];
  if (!plugin) return null;
  const data = plugin[lang] || plugin.es;
  const shared = getPluginShared(lang);

  return (
    <main>
      <PluginHero plugin={plugin} data={data} shared={shared} onDemo={onDemo} />
      <Metrics data={data} shared={shared} />
      <Capabilities data={data} shared={shared} />
      <Screenshots data={data} shared={shared} />
      <UseCases data={data} shared={shared} />
      <Integrations data={data} shared={shared} />
      <ClosingCta plugin={plugin} shared={shared} onDemo={onDemo} onSales={onSales} />
    </main>
  );
}

function Metrics({ data, shared }) {
  if (!data.metrics?.length) return null;
  return (
    <Section tone="ink" className="py-16 border-b border-white/5">
      <div className="max-w-[1180px] grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {data.metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 60}>
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-paper-50/55">
                {m.label}
              </div>
              <div className="mt-2 font-display text-[clamp(28px,3vw,44px)] text-paper-50 leading-[1.05] tracking-tightish">
                {m.value}
              </div>
              {m.note && (
                <div className="mt-1 text-[12px] text-paper-50/55">{m.note}</div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <span className="sr-only">{shared.sections.metrics}</span>
    </Section>
  );
}

function Screenshots({ data, shared }) {
  if (!data.screenshots?.length) return null;
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{shared.sections.inProduct}</Eyebrow>
        </Reveal>
      </div>
      <div className="mt-12 max-w-[1180px] grid md:grid-cols-2 gap-x-8 gap-y-14">
        {data.screenshots.map((s, i) => (
          <Reveal key={s.src} delay={(i % 2) * 60}>
            <figure className="space-y-4">
              <img
                src={s.src}
                alt={s.caption}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl border border-ink-950/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)]"
              />
              <figcaption className="flex gap-3 text-[14px] text-graphite-700 leading-relaxed">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite-700/55 tnum mt-0.5 whitespace-nowrap">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function PluginHero({ plugin, data, shared, onDemo }) {
  return (
    <Section tone="dark" className="bg-grid-dark pt-32 pb-20">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, rgba(${ACCENT_RGB},0.08), transparent 60%)` }}
      ></div>

      <div className="relative max-w-[860px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-paper-50/55 whitespace-nowrap">
              {plugin.nameplate}
            </span>
            <span className="h-px flex-1 bg-paper-50/15 max-w-[120px]"></span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-paper-50/55">
              {shared.eyebrow}
            </span>
            {data.ribbon && (
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-signal-deep border border-signal-deep/40 bg-signal/10 rounded-full px-2.5 py-1">
                {data.ribbon}
              </span>
            )}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display-h1 mt-7 text-[clamp(44px,5.8vw,80px)] text-paper-50">{data.title}</h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 text-[22px] leading-tight text-paper-50/80 max-w-[640px]">{data.tagline}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-7 text-[18px] leading-relaxed text-paper-50/65 max-w-[640px]">{data.lead}</p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button onClick={() => onDemo("plugin_" + plugin.slug)}>
              {shared.closingCtaPrimary} <Icon.Arrow />
            </Button>
            <Link
              to="/#plugins"
              className="inline-flex items-center gap-1.5 px-3 py-3 text-[14px] text-paper-50/75 hover:text-paper-50 u-grow"
            >
              {shared.backToPlugins}
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Capabilities({ data, shared }) {
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{shared.sections.capabilities}</Eyebrow>
        </Reveal>
      </div>
      <div className="mt-12 max-w-[1080px] grid md:grid-cols-2 gap-x-12 gap-y-10">
        {data.capabilities.map((c, i) => (
          <Reveal key={c.h} delay={i * 40}>
            <article className="flex gap-5 pt-7 border-t border-ink-950/12">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite-700/55 tnum mt-1.5 whitespace-nowrap">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-[22px] tracking-tightish text-ink-900 leading-[1.2]">{c.h}</h3>
                <p className="mt-2 text-[14px] text-graphite-600 leading-relaxed">{c.d}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function UseCases({ data, shared }) {
  return (
    <Section tone="ink" className="bg-grid-dark py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow>{shared.sections.useCases}</Eyebrow>
        </Reveal>
      </div>
      <div className="mt-12 max-w-[1080px] grid md:grid-cols-3 gap-5">
        {data.useCases.map((u, i) => (
          <Reveal key={u.h} delay={i * 80}>
            <div className="rounded-2xl border border-white/10 bg-ink-900 p-7 h-full flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-paper-50/45 tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[22px] tracking-tightish text-paper-50 leading-[1.2]">{u.h}</h3>
              <p className="mt-3 text-[14px] text-paper-50/65 leading-relaxed">{u.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Integrations({ data, shared }) {
  const labels = shared.integrationLabels;
  const rows = Object.entries(data.integrations).map(([k, v]) => ({
    label: labels[k] || k,
    value: v,
  }));
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{shared.sections.integrations}</Eyebrow>
        </Reveal>
      </div>
      <div className="mt-12 max-w-[960px]">
        {rows.map((r, i) => (
          <Reveal key={r.label} delay={i * 40}>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-2 py-6 border-t border-ink-950/12 last:border-b last:border-b-ink-950/12">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite-700/55 mt-1.5">
                {r.label}
              </div>
              <div className="text-[18px] leading-relaxed text-ink-900">{r.value}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ClosingCta({ plugin, shared, onDemo, onSales }) {
  return (
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
            <Button onClick={() => onDemo("plugin_" + plugin.slug)}>
              {shared.closingCtaPrimary} <Icon.Arrow />
            </Button>
            <Button variant="ghost" onClick={() => onSales("plugin_" + plugin.slug)}>
              {shared.closingCtaSecondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
