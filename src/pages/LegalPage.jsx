import { Link } from "react-router-dom";
import { Eyebrow, Icon, Reveal, Section } from "../components/Sections.jsx";
import { LEGAL } from "../legal-content.js";

function Body({ text }) {
  // Split paragraphs on blank lines; bullets are rendered as a list when a
  // paragraph is a run of lines starting with "• ".
  const blocks = text.split(/\n\n+/);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        const isBulletList = lines.every((l) => l.startsWith("• "));
        if (isBulletList) {
          return (
            <ul key={i} className="mt-4 space-y-2 list-none pl-0">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-3 text-[18px] leading-relaxed text-graphite-700">
                  <span className="mt-2.5 w-1 h-1 rounded-full bg-ink-900/40 flex-shrink-0"></span>
                  <span>{l.slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-4 text-[18px] leading-relaxed text-graphite-700 first:mt-0">
            {b}
          </p>
        );
      })}
    </>
  );
}

export default function LegalPage({ t, lang, kind }) {
  const data = LEGAL[lang];
  const doc = data[kind];

  return (
    <main>
      <Section tone="light" className="pt-32 pb-20">
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow tone="light">{data.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-h1 mt-5 text-[clamp(40px,5vw,68px)] text-ink-900">{doc.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-graphite-500">
              {doc.lastUpdated}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 text-[18px] leading-relaxed text-graphite-700 max-w-[65ch]">{doc.lead}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" className="pb-28">
        <div className="max-w-[760px] grid gap-12">
          {doc.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 40}>
              <article className="border-t border-ink-950/12 pt-8">
                <h2 className="font-display text-[22px] tracking-tightish text-ink-900 leading-[1.2]">{s.h}</h2>
                <div className="mt-3">
                  <Body text={s.body} />
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={(doc.sections.length + 1) * 40}>
            <div className="border-t border-ink-950/12 pt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-900 u-grow"
              >
                <Icon.Arrow style={{ transform: "rotate(180deg)" }} /> {data.backToHome}
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
