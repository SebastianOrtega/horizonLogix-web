import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    // Caption tracks stay real files: a data: URI <track> is not reliable
    // across browsers. Everything else keeps Vite's default 4 KB inline limit.
    assetsInlineLimit: (file) => (file.endsWith(".vtt") ? false : undefined),
  },
});
