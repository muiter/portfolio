/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yale-blue': '#134074',
        'berkeley-blue': '#13315c',
        'oxford-blue': '#0b2545',
        'powder-blue': '#8da9c4',
        'mint-cream': '#eef4ed',
        primary: {
          50: '#134074',
          100: '#13315c',
          200: '#c1d1bf',
          300: '#a2ba9f',
          400: '#83a37f',
          500: '#648c5f',
          600: '#4d6b47',
          700: '#364a2f',
          800: '#1f2917',
          900: '#080800',
        }
      },
      fontFamily: {
        'abril': ['Abril Fatface', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 