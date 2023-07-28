/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      minWidth: {
        'half': '35%',
       }
    },
  },
  plugins: [],
}
