const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      heading: {
        light: colors.coolGray['700'],
        DEFAULT: colors.coolGray['800'],
        dark: colors.coolGray['900'],
      },
      dark: {
        light: colors.coolGray['700'],
        DEFAULT: colors.coolGray['800'],
        dark: colors.coolGray['900'],
      },
      body: {
        light: colors.trueGray['100'],
        DEFAULT: colors.trueGray['400'],
        dark: colors.trueGray['500'],
      },
      primary: {
        light: '#6d62d0',
        DEFAULT: '#5448C8',
        dark: '#4135b1',
      },
      secondary: {
        light: '#f2f2f2',
        DEFAULT: '#E9E9E9',
        dark: '#e6e6e6',
      },
      success: {
        light: '#56f000',
        DEFAULT: '#47cc00',
        dark: '#369900',
      },
      error: {
        light: '#ff6666',
        DEFAULT: '#ff3333',
        dark: '#e60000',
      },
      warning: {
        light: '#ffc233',
        DEFAULT: '#ffb302',
        dark: '#cc8f00',
      },
      info: {
        light: '#00bfff',
        DEFAULT: '#0099cc',
        dark: '#007399',
      },
      question: {
        light: '#4f6996',
        DEFAULT: '#40557a',
        dark: '#354664',
      },
      ...colors,
    },
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
