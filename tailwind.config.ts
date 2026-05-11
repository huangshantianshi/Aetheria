import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aetheria custom dark palette
        aether: {
          void: "#0a0a0f",        // deepest background
          deep: "#0f0f1a",        // card backgrounds
          night: "#141422",       // secondary background
          dusk: "#1a1a2e",        // elevated surfaces
          mist: "#2a2a4a",        // borders & dividers
          glow: "#6366f1",        // primary accent (indigo)
          ember: "#a78bfa",       // secondary accent (violet)
          spirit: "#c4b5fd",      // text highlights
          ghost: "#e0e0ff",       // primary text
          whisper: "#9898b8",     // muted text
          petal: "#f0abfc",       // flower/tribute accent (fuchsia)
          candle: "#fbbf24",      // candle warm glow
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
        "flicker": "flicker 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(-100px) translateY(-50px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
