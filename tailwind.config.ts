import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EE",
        parchment: "#FAF8F4",
        linen: "#E8DED1",
        forest: "#2F4F3E",
        moss: "#53785F",
        clay: "#C46A2D",
        ember: "#E18A46",
        ink: "#1F261F",
        muted: "#7F7A70"
      },
      boxShadow: {
        travel: "0_10px_30px_rgba(0,0,0,0.06)",
        float: "0_18px_55px_rgba(47,79,62,0.16)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        script: ["Caveat", "Segoe Print", "cursive"]
      }
    }
  },
  plugins: []
} satisfies Config;
