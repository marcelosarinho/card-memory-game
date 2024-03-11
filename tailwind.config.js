/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-purple-gray-800",
    "items-center",
    {
      pattern: /size-(10|14)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        "dark-100": "#121212",
        "dark-200": "#282828",
        "dark-300": "#3F3F3F",
        "aqua-green-200": "#01D2C7",
        "aqua-green-300": "#00C5BB",
        "purple-gray-800": "#4F4350",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
