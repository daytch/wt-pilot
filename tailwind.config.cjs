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
    extend: {},
  },
  plugins: [require("preline/plugin")],
};
