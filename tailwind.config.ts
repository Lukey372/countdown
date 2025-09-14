import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        radr: {
          orange: "#FF6A00",
          black: "#0B0B0B",
          charcoal: "#171717",
          slate: "#9CA3AF",
          line: "#2A2A2A",
        },
      },
      boxShadow: {
        glass: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 30px rgba(0,0,0,0.35)",
      },
      keyframes: {
        radiate: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate(-50%, -50%) scale(1.08)", opacity: "0.9" },
        },
        drift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        pulseBadge: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,106,0,0.6)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(255,106,0,0.35)" },
        },
      },
      animation: {
        radiate: "radiate 14s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        pulseBadge: "pulseBadge 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
