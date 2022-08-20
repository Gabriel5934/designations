/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#70A7FF",
        },
        surface: "#121212",
        background: "#000000",
        white: "#ffffff",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
      },
      fontSize: {
        title: "2rem",
        subtitle: "1rem",
        body: "1rem",
      },
    },
  },
  plugins: [],
};
