import { useEffect, useState } from "react";
import { ACCENT } from "../theme.js";

export default function NetworkDiagram({ t, reduced }) {
  const W = 720,
    H = 520;
  const reader = { x: 90, y: 260 };
  const mqtt = { x: 270, y: 260 };
  const hub = { x: 430, y: 260 };
  const plugins = [
    { x: 620, y: 120, label: t.diagramPlugins[0] },
    { x: 620, y: 260, label: t.diagramPlugins[1] },
    { x: 620, y: 400, label: t.diagramPlugins[2] },
  ];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf;
    const start = performance.now();
    const loop = (now) => {
      setTick((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const phase = (tick % 6) / 6;
  const stage = phase < 0.33 ? 0 : phase < 0.55 ? 1 : 2;
  const sub =
    phase < 0.33 ? phase / 0.33 : phase < 0.55 ? (phase - 0.33) / 0.22 : (phase - 0.55) / 0.45;

  const tagPos = (() => {
    if (reduced) return null;
    if (stage === 0) return { x: reader.x + (mqtt.x - reader.x) * sub, y: reader.y };
    if (stage === 1) return { x: mqtt.x + (hub.x - mqtt.x) * sub, y: mqtt.y };
    return null;
  })();

  return (
    <div className="relative w-full" role="img" aria-label={t.srDiagram}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.55" />
            <stop offset="60%" stopColor={ACCENT} stopOpacity="0.08" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="50%" stopColor={ACCENT} stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>
          <pattern id="dotgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#dotgrid)" />

        <circle cx={hub.x} cy={hub.y} r="120" fill="url(#hubGlow)" />

        <line
          x1={reader.x + 30}
          y1={reader.y}
          x2={mqtt.x - 26}
          y2={mqtt.y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <line
          x1={mqtt.x + 26}
          y1={mqtt.y}
          x2={hub.x - 38}
          y2={hub.y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />

        {!reduced && stage <= 1 && (
          <line
            x1={stage === 0 ? reader.x + 30 : mqtt.x + 26}
            y1={stage === 0 ? reader.y : mqtt.y}
            x2={stage === 0 ? mqtt.x - 26 : hub.x - 38}
            y2={stage === 0 ? mqtt.y : hub.y}
            stroke={ACCENT}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="flow"
          />
        )}

        {plugins.map((p, i) => (
          <line
            key={i}
            x1={hub.x + 38}
            y1={hub.y}
            x2={p.x - 60}
            y2={p.y}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
        ))}
        {!reduced &&
          stage === 2 &&
          plugins.map((p, i) => (
            <line
              key={`f${i}`}
              x1={hub.x + 38}
              y1={hub.y}
              x2={hub.x + 38 + (p.x - 60 - (hub.x + 38)) * sub}
              y2={hub.y + (p.y - hub.y) * sub}
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.85}
            />
          ))}

        <g transform={`translate(${reader.x}, ${reader.y})`}>
          {!reduced &&
            [0, 0.9, 1.8].map((d, i) => (
              <circle
                key={i}
                r="22"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1"
                className="pulse-ring"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          <rect x="-26" y="-18" width="52" height="36" rx="6" fill="#0E1424" stroke="rgba(255,255,255,0.25)" />
          <circle cx="0" cy="0" r="5" fill={ACCENT} />
          <circle cx="0" cy="0" r="9" fill="none" stroke={ACCENT} strokeOpacity="0.5" />
        </g>
        <text
          x={reader.x}
          y={reader.y + 46}
          textAnchor="middle"
          fontSize="11"
          fill="rgba(247,247,245,0.7)"
          fontFamily="JetBrains Mono"
        >
          {t.diagramReader}
        </text>

        <g transform={`translate(${mqtt.x}, ${mqtt.y})`}>
          <circle r="22" fill="#0E1424" stroke="rgba(255,255,255,0.18)" />
          <text textAnchor="middle" y="4" fontSize="9" fill="rgba(247,247,245,0.85)" fontFamily="JetBrains Mono">
            INGEST
          </text>
        </g>

        <g transform={`translate(${hub.x}, ${hub.y})`}>
          <circle r="62" fill="#0E1424" stroke={ACCENT} strokeOpacity="0.4" />
          <circle r="48" fill="none" stroke="rgba(255,255,255,0.08)" />
          {!reduced && (
            <circle r="62" fill="none" stroke={ACCENT} strokeOpacity="0.35" strokeWidth="1.5" className="pulse-ring" />
          )}
          <text textAnchor="middle" y="-4" fontSize="11" fontWeight="600" fill="#F7F7F5">
            Horizon
          </text>
          <text textAnchor="middle" y="12" fontSize="10" fill="rgba(247,247,245,0.6)" fontFamily="JetBrains Mono">
            middleware
          </text>
        </g>

        {plugins.map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y})`}>
            <rect x="-58" y="-22" width="116" height="44" rx="22" fill="#0E1424" stroke="rgba(255,255,255,0.18)" />
            <circle cx="-40" cy="0" r="4" fill={ACCENT} opacity={stage === 2 && sub > 0.7 ? 1 : 0.35} />
            <text x="-26" y="4" fontSize="11" fill="#F7F7F5" fontFamily="Schibsted Grotesk">
              {p.label}
            </text>
          </g>
        ))}

        {tagPos && (
          <g transform={`translate(${tagPos.x}, ${tagPos.y})`}>
            <circle r="6" fill={ACCENT} />
            <circle r="12" fill="none" stroke={ACCENT} strokeOpacity="0.5" />
          </g>
        )}

        <text
          x={mqtt.x}
          y={mqtt.y + 46}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(247,247,245,0.5)"
          fontFamily="JetBrains Mono"
        >
          stream · realtime
        </text>
      </svg>

      <p className="sr-only">{t.srDiagram}</p>
    </div>
  );
}
