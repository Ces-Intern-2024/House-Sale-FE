/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
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
        orangeBtn: '#ff9f43',
        darkBlue: '#1b2850',
        subText: '#555',
        paleOliveGreen: '#c7d48c',
        drawerBackground: '#396652',
        darkSlateBlue: '#212b36',
        turquoiseLoginHover: '#50dfb6',
        springGreenLogin: '#55efc4',
        red: '#FF0000',
        orangeHeart: '#FF6347',
        feedbackBackground: '#f3f3fe',
        'green-available': '#37d159',
        'purle-unavailable': '#3b4cb8',
        lightBlue: '#4dc7ec',
        login: '#328971',
        hoverLogin: '#35947a',
        clearFilters: '#5625d0',
        grey: '#7e7e7e',
        labelBlue: '#20448D',
        lightBlue: '#3662BA',
        postingBtn: '#FFFDD0',
      },
      fontFamily: {
        lobster: ['Lobster', 'sans-serif'],
        greatVibes: ['Great Vibes', 'cursive'],
        kanit: ['Kanit', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
        alice: ['Alice', 'sans-serif'],
      },
      width: {
        7.5: '30px',
        12.5: '50px',
        25: '100px',
        30: '120px',
        50: '200px',
        57.5: '230px',
        75: '300px',
        80: '320px',
        90: '360px',
        95: '380px',
        100: '400px',
        125: '500px',
        150: '600px',
        '1/0': '10%',
        '9/0': '90%',
      },
      minWidth: {
        25: '100px',
        30: '120px',
        50: '200px',
        125: '500px',
      },
      maxWidth: {
        25: '100px',
        30: '120px',
        50: '200px',
        125: '500px',
      },
      height: {
        7.5: '30px',
        12.5: '50px',
        25: '100px',
        30: '120px',
        50: '200px',
        57.5: '230px',
        62.5: '250px',
        75: '300px',
        80: '320px',
        90: '360px',
        95: '380px',
        100: '400px',
        125: '500px',
        150: '600px',
      },
      minHeight: {
        25: '100px',
        50: '200px',
        125: '500px',
      },
      maxHeight: {
        25: '100px',
        125: '500px',
        50: '200px',
      },
      fontSize: {
        24: '24px',
        30: '30px',
      },
      padding: {
        7.5: '30px',
        15: '60px',
        30: '120px',
        25: '100px',
        45: '180px',
      },
      margin: {
        7.5: '30px',
      },
    },
  },
  plugins: [],
}
