/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#6B48F2',

      },
      boxShadow: {
        'button': '4px 4px 0px rgba(0,0,0,1)',
        'buyButton': '3px 3px 0px #fff, 4px 2px 0px .5px #000, 2px 4px 0px .5px #000, 4px 4px 0px .5px #000',
      },
    },
  },
  plugins: [],
}