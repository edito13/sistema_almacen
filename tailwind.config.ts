// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#FF6347",
        },
        blue: {
          500: "#3498DB",
          600: "#2980B9",
        }
      },
    },
  },
  plugins: [],
};
