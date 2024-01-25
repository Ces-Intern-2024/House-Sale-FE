/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '576px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        mobile: '300px',
      },
      colors: {
        transparent: 'transparent',
        primary: '#396652',
        blur: '#c9d5cf',
        label: 'rgb(4 120 87 / var(--tw-bg-opacity))',
        banner: '#f8fafc',
        second: 'rgb(241 245 249)',
      },
      fontFamily: {
        lobster: ['Lobster', 'sans-serif'],
        greatVibes: ['Great Vibes', 'cursive'],
        kanit: ['Kanit','sans-serif'],
        archivo: ['Archivo','sans-serif']
      },
      
    },
  },
  plugins: [],
}
