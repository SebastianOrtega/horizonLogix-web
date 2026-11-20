import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `npm run preview` resolves routes like Azure Static Web Apps does:
// /warehouse and /warehouse/ -> warehouse/index.html (prerendered), unknown
// extension-less paths -> spa-fallback.html (navigationFallback).
function previewLikeSwa() {
  return {
    name: "preview-like-swa",
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, _res, next) => {
        const [p, q] = req.url.split("?");
        const clean = decodeURIComponent(p).replace(/\/+$/, "");
        if (!clean || path.extname(clean)) return next();
        const file = path.join(dist, clean, "index.html");
        const target = file.startsWith(dist) && fs.existsSync(file) ? `${clean}/index.html` : "/spa-fallback.html";
        req.url = target + (q ? `?${q}` : "");
        next();
      });
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), previewLikeSwa()],
  build: {
    outDir: "dist",
    // The SSR build (src/entry-server.jsx -> dist-ssr) only feeds
    // scripts/prerender.mjs; public/ belongs to the client build alone.
    copyPublicDir: !isSsrBuild,
    sourcemap: false,
    // Vite 5's default browser floor. Vite 7+ defaults to
    // "baseline-widely-available" (Safari 16+), which would silently drop
    // CSS/JS lowering for older iOS devices that the site supports today.
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    // Caption tracks stay real files: a data: URI <track> is not reliable
    // across browsers. Everything else keeps Vite's default 4 KB inline limit.
    assetsInlineLimit: (file) => (file.endsWith(".vtt") ? false : undefined),
  },
}));
