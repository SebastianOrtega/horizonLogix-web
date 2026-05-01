// Single source of truth for the brand accent.
// Change ACCENT/ACCENT_DEEP/ACCENT_RGB here and the rest of the app follows:
// - tailwind.config.js consumes these for the `signal` color tokens
// - src/App.jsx pushes them into CSS vars (--signal, --signal-deep, --signal-rgb)
// - SVG components import ACCENT directly (SVG attrs can't read CSS vars)
// ACCENT_RGB must match ACCENT — kept as a tuple string for use inside rgba(...)

export const ACCENT = "#f6891a";
export const ACCENT_DEEP = "#c5680b";
export const ACCENT_RGB = "246, 137, 26";
