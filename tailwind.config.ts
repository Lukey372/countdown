import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        radr: {
          orange: "#FF6A00",
          black: "#000000",
          grey: "#222222",
          charcoal: "#171717",
          slate: "#9CA3AF",
          line: "#2A2A2A",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glass: "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.5)",
        glow: "0 0 20px rgba(255,106,0,0.4), 0 0 40px rgba(255,106,0,0.2)",
      },
      keyframes: {
        radiate: {
          "0%, 100%": { 
            transform: "translate(-50%, -50%) scale(1)", 
            opacity: "0.6" 
          },
          "50%": { 
            transform: "translate(-50%, -50%) scale(1.1)", 
            opacity: "0.8" 
          },
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
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        particleDrift: {
          "0%": { 
            transform: "translateY(0px) translateX(0px)", 
            opacity: "0" 
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateY(-100px) translateX(50px)", 
            opacity: "0" 
          },
        },
      },
      animation: {
        radiate: "radiate 12s ease-in-out infinite",
        drift: "drift 25s ease-in-out infinite",
        pulseBadge: "pulseBadge 2s ease-in-out infinite",
        radarSweep: "radarSweep 8s linear infinite",
        particleDrift: "particleDrift 15s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;