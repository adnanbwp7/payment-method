/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'md-lg': '1025px',
      'mdlg': '800px',
    },
    extend: {},
  },
  plugins: [],
});