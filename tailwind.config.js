const lineClampPlugin = require('@tailwindcss/line-clamp');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff7700',
        secondary: '#0080ff',
      },
      fontFamily: {
        merriweather: ['Merriweather', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [
    lineClampPlugin,
  ],
};
