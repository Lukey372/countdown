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
    },
  },
  plugins: [],
};
export default config;