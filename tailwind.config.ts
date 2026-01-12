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
        // Dreamy Boutique Palette - Lunar New Year 2026
        primary: {
          DEFAULT: "#004d40",
          50: "#e0f2f1",
          100: "#b2dfdb",
          200: "#80cbc4",
          300: "#4db6ac",
          400: "#26a69a",
          500: "#009688",
          600: "#00897b",
          700: "#00796b",
          800: "#00695c",
          900: "#004d40",
        },
        secondary: {
          DEFAULT: "#d4af37",
          50: "#fdf8e7",
          100: "#faefc4",
          200: "#f5e29d",
          300: "#efd576",
          400: "#e9c854",
          500: "#d4af37",
          600: "#c9a02e",
          700: "#b88c24",
          800: "#a6781b",
          900: "#8c5f10",
        },
        accent: {
          DEFAULT: "#fffdd0",
          50: "#fffef5",
          100: "#fffdd0",
          200: "#fff9a8",
          300: "#fff580",
          400: "#fff058",
          500: "#ffe930",
          600: "#e6d000",
          700: "#b3a200",
          800: "#807400",
          900: "#4d4600",
        },
        // Additional semantic colors
        jade: {
          deep: "#004d40",
          forest: "#00695c",
          mist: "#e0f2f1",
        },
        gold: {
          soft: "#d4af37",
          shimmer: "#f5e29d",
          antique: "#b88c24",
        },
        silk: {
          cream: "#fffdd0",
          ivory: "#fffff0",
          pearl: "#faf8f5",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dreamy": "linear-gradient(135deg, #004d40 0%, #00695c 50%, #004d40 100%)",
        "gradient-gold": "linear-gradient(135deg, #d4af37 0%, #f5e29d 50%, #d4af37 100%)",
        "shimmer": "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "reveal": "reveal 0.8s ease-out forwards",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.6)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      boxShadow: {
        "gold": "0 4px 20px rgba(212, 175, 55, 0.25)",
        "jade": "0 4px 20px rgba(0, 77, 64, 0.25)",
        "dreamy": "0 8px 32px rgba(0, 77, 64, 0.15), 0 0 0 1px rgba(212, 175, 55, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;






