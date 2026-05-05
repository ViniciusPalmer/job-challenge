/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      gray: {
        50: '#F2F2F2',
        100: '#dfe1e5',
        150: '#ebebeb',
        300: '#5f5f5f',
      },
      blue: {
        300: '#1A0DAB',
      },
      white: '#FFFFFF',
      black: '#000000',
      'search-bar-shadow': 'rgba(64,60,67,.16)',
      'translucid-black': 'rgba(0,0,0,0.75)',
    },
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F2F2F2',
        },
        text: {
          primary: '#000000',
          secondary: '#5f5f5f',
        },
        border: {
          DEFAULT: '#ebebeb',
          hover: '#dfe1e5',
        },
      },
      boxShadow: {
        'search-bar': '0 2px 5px 1px rgba(64,60,67,.16)',
      },
    },
  },
  plugins: [],
}