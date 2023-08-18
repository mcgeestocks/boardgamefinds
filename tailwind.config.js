/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  variants: {
    width: ["responsive", "hover", "focus"]
  },
  plugins: [require("@tailwindcss/typography")],
}
