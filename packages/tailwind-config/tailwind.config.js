const colors = require("tailwindcss/colors");
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    `pages/**/*.{js,ts,jsx,tsx}`,
    `app/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
    },
    extend: {
      fontFamily: {
        //sans: ['Merriweather Sans', 'sans-serif']
        sans: ['var(--font-merriweathersans)', ...fontFamily.sans],
      },
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        gray: colors.gray,
        slate: colors.slate,
        neutral: colors.neutral,
        red: colors.red,
        orange: colors.orange,
        blue: colors.blue,
        yellow: colors.yellow,
        green: colors.green,
      },
    },
  },
  plugins: [],
};
