/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1",
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235",
        },
        blue: {
          500: "#2b77e7",
        },
        purple: {
          100: "rgb(164,156,196, 0.7)",
        },
      },
      height: {
        '100': '28rem',
      },
      width: {
        '100': '28rem',
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
