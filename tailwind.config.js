/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        moodHappy: "#FFD166",
        moodCalm: "#A8DADC",
        moodSad: "#6C757D",
        moodEnergetic: "#90EE90",
      },
    },
  },
  plugins: [],
};
