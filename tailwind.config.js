/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0B0F1A", 900: "#0E1424", 800: "#141B2E", 700: "#1B2438" },
        paper: { 50: "#F7F7F5", 100: "#EFEFEC", 200: "#E3E3DF" },
        graphite: { 400: "#7B8395", 500: "#5C6478", 600: "#3D4458", 700: "#2A2F40" },
        signal: { DEFAULT: "#F39A2B", soft: "#F39A2B33", deep: "#D77A0F" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Fraunces", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: { tightish: "-0.02em", tighter2: "-0.035em" },
    },
  },
  plugins: [],
};
