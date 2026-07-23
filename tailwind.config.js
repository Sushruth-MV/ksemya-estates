/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — Ksemya Estates brand identity (slate/charcoal, not green)
        forest: {
          DEFAULT: "#1C262B", // primary dark slate background
          light: "#2F3E46", // hover / raised state — brand charcoal
          dark: "#11181C", // deepest shadow
        },
        bark: {
          DEFAULT: "#222C31", // secondary section background (alternates with forest)
          light: "#2A353B",
        },
        mist: {
          DEFAULT: "#263137", // card / glass panel background
          dark: "#1B2429",
        },
        cream: {
          DEFAULT: "#F4EFE6", // primary text on dark
          dim: "#AEB6AB", // muted / secondary text on dark
        },
        gold: {
          DEFAULT: "#C49A4A", // brand accent
          light: "#D6B36C",
          dark: "#9C7935",
        },
        sage: "#7A8F6A", // brand secondary — used sparingly as a nature accent
        evergreen: "#2E5A43", // brand secondary — used sparingly as a nature accent
        ink: "#20292E", // dark text used on gold / cream surfaces
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "system-ui", "sans-serif"],
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
