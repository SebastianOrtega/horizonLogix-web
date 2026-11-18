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
      <Problem data={data} shared={shared} />
      <Metrics data={data} shared={shared} />
      <Tour plugin={plugin} data={data} shared={shared} onDemo={onDemo} />
      <Steps data={data} shared={shared} />
      <Capabilities data={data} shared={shared} />
      <Screenshots data={data} shared={shared} />
      <UseCases data={data} shared={shared} />
      <Integrations data={data} shared={shared} />
      <Faq data={data} shared={shared} />
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
    <Section tone="dark" className="bg-grid-dark pt-32 pb-20 overflow-hidden">
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

      {data.heroImage && (
        <Reveal delay={360}>
          <figure className="relative mt-16 max-w-[1180px]">
            <BrowserFrame url={data.heroImage.url} tone="dark">
              <img
                src={data.heroImage.src}
                alt={data.heroImage.alt}
                width={data.heroImage.width}
                height={data.heroImage.height}
                decoding="async"
                className="block w-full h-auto"
              />
            </BrowserFrame>
            {data.heroImage.caption && (
              <figcaption className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-paper-50/45">
                {data.heroImage.caption}
              </figcaption>
            )}
          </figure>
        </Reveal>
      )}
    </Section>
  );
}

// Window chrome around a product capture, so a screenshot reads as "the
// product" and not as a pasted image.
function BrowserFrame({ url, tone = "light", children }) {
  const dark = tone === "dark";
  return (
    <div
      className={
        "overflow-hidden rounded-xl border " +
        (dark
          ? "border-white/12 bg-ink-900 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          : "border-ink-950/12 bg-paper-50 shadow-[0_30px_70px_-30px_rgba(11,15,26,0.35)]")
      }
    >
      <div
        className={
          "flex items-center gap-3 px-4 h-9 border-b " +
          (dark ? "border-white/10 bg-ink-900" : "border-ink-950/10 bg-ink-950/[0.03]")
        }
      >
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className={"w-2 h-2 rounded-full " + (dark ? "bg-paper-50/20" : "bg-ink-950/15")}></span>
          ))}
        </span>
        {url && (
          <span className={"font-mono text-[11px] truncate " + (dark ? "text-paper-50/45" : "text-graphite-700/60")}>
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Problem({ data, shared }) {
  if (!data.problem) return null;
  const { title, body, points } = data.problem;
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[1080px] grid md:grid-cols-12 gap-x-12 gap-y-12">
        <div className="md:col-span-6">
          <Reveal>
            <Eyebrow tone="light">{shared.sections.problem}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h2 mt-6 text-[clamp(30px,3.1vw,44px)] text-ink-900">{title}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-[18px] leading-relaxed text-graphite-600 max-w-[46ch]">{body}</p>
          </Reveal>
        </div>
        <ul className="md:col-span-6 md:pt-12">
          {points.map((pt, i) => (
            <Reveal as="li" key={pt.h} delay={i * 60}>
              <div className="py-6 border-t border-ink-950/12">
                <h3 className="font-display text-[22px] tracking-tightish text-ink-900 leading-[1.2]">{pt.h}</h3>
                <p className="mt-2 text-[15px] text-graphite-600 leading-relaxed">{pt.d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// The product told as the questions the buyer already asks, one screen each.
function Tour({ plugin, data, shared, onDemo }) {
  if (!data.tour?.length) return null;
  return (
    <Section tone="light" className="py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow tone="light">{shared.sections.tour}</Eyebrow>
        </Reveal>
        {data.tourTitle && (
          <Reveal delay={80}>
            <h2 className="display-h2 mt-6 text-[clamp(32px,3.6vw,50px)] text-ink-900">{data.tourTitle}</h2>
          </Reveal>
        )}
      </div>

      <div className="mt-20 max-w-[1180px] space-y-24 md:space-y-32">
        {data.tour.map((row, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={row.h} className="grid md:grid-cols-12 gap-x-12 gap-y-8 items-center">
              <Reveal className={"md:col-span-4 " + (flip ? "md:order-2" : "")}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-graphite-700/55 tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-signal-deep">{row.q}</span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(26px,2.4vw,34px)] tracking-tightish text-ink-900 leading-[1.12]">
                  {row.h}
                </h3>
                <p className="mt-4 text-[16px] text-graphite-600 leading-relaxed">{row.d}</p>
                <ul className="mt-6 space-y-3">
                  {row.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[14px] text-ink-900 leading-relaxed">
                      <span className="mt-[3px] text-signal-deep shrink-0">
                        <Icon.Check />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80} className={"md:col-span-8 min-w-0 " + (flip ? "md:order-1" : "")}>
                <BrowserFrame url={row.url}>
                  <img
                    src={row.src}
                    alt={row.alt}
                    width={row.width}
                    height={row.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                  />
                </BrowserFrame>
              </Reveal>
            </article>
          );
        })}
      </div>

      {data.tourCta && (
        <Reveal>
          <div className="mt-24 max-w-[1180px] flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-ink-950/12">
            <p className="font-display text-[clamp(22px,2vw,28px)] tracking-tightish text-ink-900 max-w-[28ch] leading-[1.2]">
              {data.tourCta}
            </p>
            <Button onClick={() => onDemo("plugin_" + plugin.slug + "_tour")}>
              {shared.closingCtaPrimary} <Icon.Arrow />
            </Button>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

function Steps({ data, shared }) {
  if (!data.steps?.length) return null;
  return (
    <Section tone="ink" className="bg-grid-dark py-28">
      <div className="max-w-[760px]">
        <Reveal>
          <Eyebrow>{shared.sections.steps}</Eyebrow>
        </Reveal>
        {data.stepsTitle && (
          <Reveal delay={80}>
            <h2 className="display-h2 mt-6 text-[clamp(32px,3.6vw,50px)] text-paper-50">{data.stepsTitle}</h2>
          </Reveal>
        )}
      </div>
      <ol className="mt-14 max-w-[1080px] grid md:grid-cols-3 gap-x-10 gap-y-10">
        {data.steps.map((st, i) => (
          <Reveal as="li" key={st.h} delay={i * 80}>
            <div className="pt-6 border-t border-paper-50/20">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-signal tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-[24px] tracking-tightish text-paper-50 leading-[1.2]">{st.h}</h3>
              <p className="mt-3 text-[15px] text-paper-50/65 leading-relaxed">{st.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Faq({ data, shared }) {
  if (!data.faq?.length) return null;
  return (
    <Section tone="ink" className="py-28">
      <div className="max-w-[1080px] grid md:grid-cols-12 gap-x-12 gap-y-10">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow>{shared.sections.faq}</Eyebrow>
          </Reveal>
        </div>
        <dl className="md:col-span-8">
          {data.faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div className="py-7 border-t border-paper-50/15">
                <dt className="font-display text-[22px] tracking-tightish text-paper-50 leading-[1.25]">{f.q}</dt>
                <dd className="mt-3 text-[15px] text-paper-50/65 leading-relaxed max-w-[60ch]">{f.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
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
