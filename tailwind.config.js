/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#fbdcea",
        accent: "#88566C",
        white: "#ffffff",
      },
      fontFamily: {
        heading: ["AmaticSC_700Bold"],
        body: ["PatrickHand_400Regular"],
      },
    },
  },
  plugins: [],
};
