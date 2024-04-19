/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Nunito", "sans-serif"],
      body: ["Nunito", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        "note-bg": "hsla(240, 64%, 27%, 0.65)",
        "table-bg": "#fff",
      },
      textColor: {
        error: "firebrick",
        inactive: "lightgray",
        "link-color": "whitesmoke",
        "link-hover": "rgba(245, 245, 245, 0.9)",
        "status-complete": "limegreen",
        "status-open": "firebrick",
      },
      borderColor: {
        light: "#fff",
        dark: "#444",
      },
    },
  },
  plugins: [],
};
