/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — Ksemya Estates premium dark identity
        forest: {
          DEFAULT: "#0E1310", // primary near-black background
          light: "#1A231C", // hover / raised state
          dark: "#080B07", // deepest shadow
        },
        bark: {
          DEFAULT: "#161D18", // secondary section background (alternates with forest)
          light: "#1E2620",
        },
        mist: {
          DEFAULT: "#1B2420", // card / glass panel background
          dark: "#141A16",
        },
        cream: {
          DEFAULT: "#F3EFE5", // primary text on dark
          dim: "#AEB6AB", // muted / secondary text on dark
        },
        gold: {
          DEFAULT: "#C9A86A", // warm brass accent
          light: "#DCC08C",
          dark: "#A3854F",
        },
        ink: "#12140F", // dark text used on gold / cream surfaces
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "22px",
        xl: "30px",
        pill: "999px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
