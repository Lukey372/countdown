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
        glass: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)",
        glow: "0 0 20px rgba(255,106,0,0.4), 0 0 40px rgba(255,106,0,0.2)",
        'glow-lg': "0 0 30px rgba(255,106,0,0.5), 0 0 60px rgba(255,106,0,0.3)",
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        radiate: {
          "0%, 100%": { 
            transform: "translate(-50%, -50%) scale(1)", 
            opacity: "0.4" 
          },
          "50%": { 
            transform: "translate(-50%, -50%) scale(1.15)", 
            opacity: "0.6" 
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
            transform: "translateY(0px) translateX(0px) scale(0)", 
            opacity: "0" 
          },
          "10%": { opacity: "1", transform: "scale(1)" },
          "90%": { opacity: "1" },
          "100%": { 
            transform: "translateY(-120px) translateX(60px) scale(0)", 
            opacity: "0" 
          },
        },
        backgroundPulse: {
          "0%, 100%": { 
            filter: "brightness(1) contrast(1)" 
          },
          "50%": { 
            filter: "brightness(1.05) contrast(1.02)" 
          },
        },
        backgroundDrift: {
          "0%, 100%": { 
            backgroundPosition: "0% 0%, center center, center center, 0% 50%" 
          },
          "33%": { 
            backgroundPosition: "33% 33%, center center, center center, 33% 50%" 
          },
          "66%": { 
            backgroundPosition: "66% 66%, center center, center center, 66% 50%" 
          },
        },
      },
      animation: {
        radiate: "radiate 10s ease-in-out infinite",
        drift: "drift 25s ease-in-out infinite",
        pulseBadge: "pulseBadge 2s ease-in-out infinite",
        radarSweep: "radarSweep 12s linear infinite",
        particleDrift: "particleDrift 20s linear infinite",
        backgroundPulse: "backgroundPulse 8s ease-in-out infinite",
        backgroundDrift: "backgroundDrift 25s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;