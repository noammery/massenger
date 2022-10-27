/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        85: "23rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
