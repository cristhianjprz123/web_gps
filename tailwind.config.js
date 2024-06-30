/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode:'class', // or 'media' or 'class
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      zIndex: {
        '1': '1',
      },
      fontSize: {
        14: '14px',
        "2xl": '1.35rem',
        "sm": '0.76rem',
        "base": '0.85rem',
      },
      backgroundColor: {
        'main-bg': '#fff',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'color2': '#fdfdfd',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        15: '60px',
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        
        1200: '1200px',
        1700: '1700px',
        
      },
      height: {
        80: '80px',
        13: '53px',
        850: '850px',
        1100: '1100px',
        
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: []
}

