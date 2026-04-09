/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // Slate 900
        surface: 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity for glassmorphism
        primary: '#3b82f6', // Blue 500
        secondary: '#8b5cf6', // Violet 500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
