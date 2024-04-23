/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        josefin:['"Josefin Sans"', 'sans-serif']
      }
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        '.line-through-light': {
          textDecoration: 'line-through',
          'text-decoration-color': '#d2d3db',
        },
        '.line-through-dark': {
          textDecoration: 'line-through',
          'text-decoration-color': '#4d5066',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

