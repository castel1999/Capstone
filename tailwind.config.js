/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue':'#1E0680',
        'theme':'#6B48F2',
        
      },
      boxShadow:{
        'button': '4px 4px 0px rgba(0,0,0,1)'
      },
    },
  },
  plugins: [],
}