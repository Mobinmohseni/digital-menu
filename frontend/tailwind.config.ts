import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { fontFamily: { sans: ["var(--font-vazirmatn)", "ui-sans-serif", "system-ui"] }, boxShadow: { soft: "0 18px 55px rgba(0,0,0,.08)" } } },
  plugins: [],
};
export default config;
