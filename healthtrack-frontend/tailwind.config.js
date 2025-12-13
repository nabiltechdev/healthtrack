/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Custom colors for dark mode
        dark: {
          bg: '#1a202c',
          card: '#2d3748',
          border: '#4a5568',
        }
      }
    },
  },
  plugins: [],
}
