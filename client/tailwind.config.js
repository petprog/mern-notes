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
        inactive: "lightgray",
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
        "input-incomplete": "#foo",
      },
      outlineColor: {
        "input-incomplete": "#foo",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        mini: "1fr,2fr,1fr",

        // Complex site-specific column configuration
        maxi: "1fr,1fr,1fr,2fr,1fr,1fr",
      },
    },
  },
  plugins: [],
};
