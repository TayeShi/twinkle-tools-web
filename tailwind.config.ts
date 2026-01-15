import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
          light: "#60A5FA",
        },
        secondary: {
          DEFAULT: "#1E293B",
          light: "#334155",
        },
        cta: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
        },
        background: "#F8FAFC",
        text: {
          DEFAULT: "#1E293B",
          muted: "#64748B",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
        sans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
