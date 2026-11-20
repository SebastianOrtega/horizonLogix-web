import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// createRoot, not hydrateRoot: the prerendered HTML (scripts/prerender.mjs)
// is always Spanish and built without a viewport, while the first client
// render depends on ?lang=/localStorage/navigator and matchMedia. React
// clears the container on the first commit, so the snapshot is replaced,
// never duplicated. Rationale: marketing/propuesta-seo-prerender.md (3.5).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
