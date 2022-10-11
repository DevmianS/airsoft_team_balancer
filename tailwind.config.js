/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: '#3e2f1c',
        lightbrown: '#51473c',
        sand: '#c2b176',
        darkblue: '#1e2c35',
        grayblue: '#36454e',
        lightblue: '#8d9ca5',
      },
      animation: {
        slidedown: 'slidedown 300ms forwards ease-out',
        slideright: 'slideright 300ms forwards ease-out',
        slideleft: 'slideleft 300ms forwards ease-out',
        pop: 'pop 150ms forwards ease-out',
      },
    },
  },
  plugins: [],
};
