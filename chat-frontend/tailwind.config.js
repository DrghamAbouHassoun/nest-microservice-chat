const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": '#2b9bf0',
        "primary-200": '#54a6f2',
        "primary-300": '#70b0f4',
        "primary-400": '#88bbf6',
        "primary-500": '#9ec6f8',
        "primary-600": '#b3d1f9',
        "dark-100": "#00081a",
        "dark-200": "#1c222f",
        "dark-300": "#343945",
        "dark-400": "#4e525d",
        "dark-500": "#696c76",
        "dark-600": "#858890",
        "mixed-100": "#0f253e",
        "mixed-200": "#293951",
        "mixed-300": "#414f65",
        "mixed-400": "#5a6679",
        "mixed-500": "#747d8e",
        "mixed-600": "#8e96a4",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '12': '3rem',
      },
      maxWidth: {
        '7xl': '1200px',
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}
