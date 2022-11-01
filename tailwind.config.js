/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        100: "29rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
