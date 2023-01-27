/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/preline/dist/*.js",
    "./*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-vite-range-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
