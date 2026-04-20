/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#fff5eb",
          100: "#ffe7c7",
          200: "#ffd49a",
          300: "#ffb866",
          400: "#ff9636",
          500: "#f77716",
          600: "#d95c0d",
          700: "#b4450d",
          800: "#903713",
          900: "#752f13",
        },
      },
      boxShadow: {
        halo: "0 20px 60px rgba(247, 119, 22, 0.22)",
      },
      fontFamily: {
        display: ["Avenir Next", "Trebuchet MS", "Segoe UI", "sans-serif"],
        body: ["Avenir", "Gill Sans", "Trebuchet MS", "sans-serif"],
      },
    },
  },
  plugins: [],
};
