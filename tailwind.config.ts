import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        portal: {
          navy: "#0a1628",
          sidebar: "#0e1e38",
          card: "#ffffff",
          accent: "#2563eb",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
        }
      },
    },
  },
  plugins: [],
};
export default config;

