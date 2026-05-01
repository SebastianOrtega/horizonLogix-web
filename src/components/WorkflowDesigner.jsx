import { useEffect, useState } from "react";
import { Eyebrow, Reveal, Section, useReducedMotion } from "./Primitives.jsx";

export default function WorkflowDesigner({ lang, accent }) {
  const reduced = useReducedMotion();
  const nodes = [
    { id: "read", x: 60, y: 90, w: 150, kind: "trigger", title: lang === "es" ? "Lectura RFID" : "RFID read", sub: "dock_a · gate_3" },
    { id: "filter", x: 250, y: 40, w: 150, kind: "step", title: lang === "es" ? "Filtrar duplicados" : "Drop dupes", sub: "window: 2s" },
    { id: "decode", x: 250, y: 150, w: 150, kind: "step", title: lang === "es" ? "Decodificar SKU" : "Decode SKU", sub: "EPC → SKU" },
    { id: "lookup", x: 440, y: 90, w: 160, kind: "step", title: lang === "es" ? "Buscar orden" : "Lookup order", sub: "NetSuite · SAP" },
    { id: "route1", x: 640, y: 30, w: 160, kind: "out", title: "Oracle / NetSuite", sub: "ship.closed" },
    { id: "route2", x: 640, y: 110, w: 160, kind: "out", title: "SAP S/4HANA", sub: "goods.movement" },
    { id: "route3", x: 640, y: 190, w: 160, kind: "out", title: "Microsoft Dynamics", sub: lang === "es" ? "alerta operador" : "operator alert" },
  ];
  const edges = [
    ["read", "filter"],
    ["read", "decode"],
    ["filter", "lookup"],
    ["decode", "lookup"],
    ["lookup", "route1"],
    ["lookup", "route2"],
    ["lookup", "route3"],
  ];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const i = setInterval(() => setTick((x) => x + 1), 60);
    return () => clearInterval(i);
  }, [reduced]);
  const phase = (tick / 60) % 1;

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const port = (n, side) => ({ x: side === "r" ? n.x + n.w : n.x, y: n.y + 30 });

  return (
    <Section id="workflow" tone="ink" className="bg-grid-dark py-28">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{lang === "es" ? "Diseñador de flujos" : "Workflow designer"}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-h2 mt-5 text-[clamp(36px,4.4vw,60px)] text-paper-50">
              {lang === "es" ? (
                <>
                  Diseña tus flujos.
                  <br />
                  <span className="text-paper-50/55">Sin escribir código.</span>
                </>
              ) : (
                <>
                  Design your flows.
                  <br />
                  <span className="text-paper-50/55">No code required.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-[16px] leading-relaxed text-paper-50/70 max-w-[440px]">
              {lang === "es"
                ? "Arrastra nodos, conecta pasos y publica. Cada flujo es un workflow versionado, auditable y desplegable por planta."
                : "Drag nodes, connect steps, publish. Every flow is a versioned, auditable workflow you can deploy per site."}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-7 space-y-3 text-[14px] text-paper-50/80">
              {[
                lang === "es" ? "Lectura · filtrado · enriquecimiento · ruteo" : "Read · filter · enrich · route",
                lang === "es" ? "Conectores Oracle, NetSuite, Dynamics, SAP" : "Oracle, NetSuite, Dynamics, SAP connectors",
                lang === "es" ? "Pruebas en simulador con datos reales" : "Test in a simulator with real data",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: accent }}></span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/8 bg-ink-950 p-3 md:p-4 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-paper-50/45 px-2 py-2">
                <span>workflow · shipping_dock_a · v3</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }}></span>
                  {lang === "es" ? "PUBLICADO" : "PUBLISHED"}
                </span>
              </div>
              <div className="relative bg-ink-900 rounded-lg overflow-hidden" style={{ aspectRatio: "860/260" }}>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <svg viewBox="0 0 860 260" className="absolute inset-0 w-full h-full">
                  {edges.map(([a, b], i) => {
                    const A = port(byId[a], "r");
                    const B = port(byId[b], "l");
                    const cx1 = A.x + 40,
                      cx2 = B.x - 40;
                    const d = `M ${A.x} ${A.y} C ${cx1} ${A.y}, ${cx2} ${B.y}, ${B.x} ${B.y}`;
                    const active =
                      !reduced && phase * edges.length >= i && phase * edges.length < i + 1.4;
                    return (
                      <g key={i}>
                        <path d={d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                        {active && (
                          <path
                            d={d}
                            fill="none"
                            stroke={accent}
                            strokeWidth="1.8"
                            strokeDasharray="6 8"
                            style={{ animation: "flow 1.4s linear infinite" }}
                          />
                        )}
                      </g>
                    );
                  })}
                  {nodes.map((n) => (
                    <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                      <rect
                        width={n.w}
                        height="60"
                        rx="8"
                        fill="#0E1424"
                        stroke={n.kind === "trigger" ? accent : "rgba(255,255,255,0.18)"}
                        strokeWidth={n.kind === "trigger" ? 1.5 : 1}
                      />
                      <circle cx="0" cy="30" r="3.5" fill={accent} />
                      <circle cx={n.w} cy="30" r="3.5" fill="rgba(255,255,255,0.45)" />
                      <text x="14" y="24" fontSize="12" fontWeight="600" fill="#F7F7F5" fontFamily="Schibsted Grotesk">
                        {n.title}
                      </text>
                      <text x="14" y="42" fontSize="10.5" fill="rgba(247,247,245,0.55)" fontFamily="JetBrains Mono">
                        {n.sub}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="flex flex-wrap items-center gap-2 px-2 py-3 text-[11px] font-mono text-paper-50/55">
                <span className="rounded border border-white/10 px-2 py-1">⌘ + drag</span>
                <span className="rounded border border-white/10 px-2 py-1">↩ run test</span>
                <span className="rounded border border-white/10 px-2 py-1">⇧⌘P publish</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
