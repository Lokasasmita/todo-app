/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // match any javascript or typescript file in the src directory
  theme: {
    extend: {
      colors: {
        primary: "#0E0E0E", // Accent color for buttons and text
        "primary-foreground": "#FFFFFF", // Text color for buttons
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
