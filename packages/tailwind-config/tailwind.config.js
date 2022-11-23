const colors = require("tailwindcss/colors");
const { fontFamily } = require('tailwindcss/defaultTheme')

const makePrimaryColor =
  l =>
    ({ opacityValue }) => {
      if (opacityValue === undefined) {
        return `hsl(var(--nextra-primary-hue) 100% ${l}%)`
      }
      return `hsl(var(--nextra-primary-hue) 100% ${l}% / ${opacityValue})`
    }

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
        primary: {
          50: makePrimaryColor(97),
          100: makePrimaryColor(94),
          200: makePrimaryColor(86),
          300: makePrimaryColor(77),
          400: makePrimaryColor(66),
          500: makePrimaryColor(50),
          600: makePrimaryColor(45),
          700: makePrimaryColor(39),
          750: makePrimaryColor(35),
          800: makePrimaryColor(32),
          900: makePrimaryColor(24),
          1000: makePrimaryColor(12)
        }
      },
    },
  },
  plugins: [],
};
