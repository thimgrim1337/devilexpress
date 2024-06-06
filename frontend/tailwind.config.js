/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '.5rem',
    },
    extend: {
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
        cities: ['"Cities"', 'sans-serif'],
      },
      colors: {
        'devil-dark': '#001524',
        'devil-red': '#ED1C24',
        'devil-blue': '#3DA5D9',
        'devil-yellow': '#FED766',
        'devil-white': '#F4F3EE',
      },
      backgroundImage: {
        'hero-bg': "url('/img/hero-bg.png')",
        'polygon-bg': "url('img/polygon-2.svg')",
        'testimonial-bg': "url('img/photo-2.png')",
        'map-bg': "url('img/map.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ED1C24',
          secondary: '#3DA5D9',
          accent: '#FED766',
          neutral: '#001524',
          'base-100': '#F4F3EE',
        },
      },
    ],
  },
};
