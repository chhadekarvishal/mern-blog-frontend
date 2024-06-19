// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust this if using app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
