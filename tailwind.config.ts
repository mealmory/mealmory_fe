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
        carbs: "#6CFD8C",
        protein: "#2FB4FF",
        fat: "#FBD925",
        etc: "#D3D3D3",
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
      keyframes: {
        float: {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
        "float-1": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "15%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
        "float-2": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "30%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
        "float-3": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "45%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
        "float-4": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "60%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
        "float-5": {
          from: {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "75%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          to: {
            transform: "none",
            opacity: "1",
          },
        },
      },
      animation: {
        float: "float 0.5s ease-in-out",
        "float-1": "float-1 0.5s ease-in-out",
        "float-2": "float-2 0.5s ease-in-out",
        "float-3": "float-3 0.5s ease-in-out",
        "float-4": "float-4 0.5s ease-in-out",
        "float-5": "float-5 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
