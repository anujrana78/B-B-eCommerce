/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fasthand: ["Fasthand", "cursive"],
        merriweather: ['Merriweather', 'serif'],
        montserrat: ["Montserrat", " sans-serif"],
      },
    },
  },
  plugins: [],
};
