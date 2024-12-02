/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glassBg: "rgba(255, 255, 255, 0.2)",
        glassBorder: "rgba(255, 255, 255, 0.4)",
        glassShadow: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
