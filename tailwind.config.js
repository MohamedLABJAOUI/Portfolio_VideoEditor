/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#352A87',      
        secondary: '#9B4AFE',    
        dark: '#1A1A2E',         
        highlight: '#CFAEFF',    
        text: '#F5F5F7',         
        card: '#252540',         
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

