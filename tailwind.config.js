/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calico: '#E3C096',
        pastelWhite: '#FAF8F6',
        matteBlack: '#171717',
        alligatorLeather: '#4D372A',
        grayCust: '#BEBEBE',
        lightBlack: '#2D2D2D',
      },
      fontFamily: {
        heading: ['"Century Gothic"', '"Playfair Display"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        body: ['Inter', '"Featheriest"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
