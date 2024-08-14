import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      boxShadow: {
        border: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
      },
      backgroundColor: {
        cusyellow: "#F6E54D",
        cusbanana: "#FFFEF7",
        cuspoint: "#FFFBD3",
        cuspink: "#FFE3C9",
        cusgray: "#E6E6E6",
        dcusgray: "#5A5A5A",
        cusdark: "rgb(90,90,90)",
        cusdarkbanana: "#6C6C6C",
        dcusyellow: "#E3D342",
        dcuspink: "#E6CDB6",
      },
      colors: {
        cusorange: "#FFB800",
        cusyellow: "#F6E54D",
        bmiLess: "#58AAE6",
        bmiSafe: "#85BD1A",
        bmiWarning: "#F67E2F",
        bmiDanger: "#E1210B",
        dbmiLess: "#56A8E2",
        dbmiSafe: "#98D71F",
        dbmiWarning: "#F79250",
        dbmiDanger: "#F67162",
      },
      gridTemplateColumns: {
        80: "repeat(4, minmax(80px, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
