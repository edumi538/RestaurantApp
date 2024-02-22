const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        defaultBrow: "#4F372F",
        "tertiary-dark": "#36231C",
        body: "#EEE",
        container: "#F8F9FA",
      },
      backgroundImage: {
        "banner-image-desktop":
          "linear-gradient(90deg, #36231C 18.92%, rgba(54, 35, 28, 0.2) 50.56%, #36231C 80.88%), url('/img/brands/bg-image.jpeg')",
        "banner-image-mobile": "url('/img/brands/bg-image.jpeg')",
        "banner-image-content": "url('/img/brands/bg-contain.png')",
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
