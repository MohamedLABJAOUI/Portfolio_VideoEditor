/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#352A87',      // Strong cinematic purple (Adobe Premiere main)
        secondary: '#9B4AFE',    // Bright neon purple for accents & buttons
        dark: '#1A1A2E',         // Dark UI background (Premiere interface)
        highlight: '#CFAEFF',    // Soft glow for borders, cards, hover
        text: '#F5F5F7',         // Clean white text
        card: '#252540',         // Cards (slightly lighter than background)
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

