const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#6B48F2",
        "dark-purple": "#150C7C",
        "light-white": "rgba(255,255,255,0.17)",
      },
      boxShadow: {
        button: "4px 4px 0px rgba(0,0,0,1)",
        buyButton:
          "3px 3px 0px #fff, 4px 2px 0px .5px #000, 2px 4px 0px .5px #000, 4px 4px 0px .5px #000",
      },
    },
  },
  plugins: [],
});
