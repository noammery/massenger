/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "39rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
