import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        border: "0 0 3px 0 rgba(0, 0, 0, 0.3)",
      },
      backgroundColor: {
        cusyellow: "#F6E54D",
        cusbanana: "#FFFEF7",
        cuspink: "#FFE3C9",
        cusorange: "#FFB800",
        cusgray: "#E6E6E6",
        dcusgray: "#5A5A5A",
      },
    },
  },
  plugins: [],
};
export default config;
