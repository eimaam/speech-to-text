import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      maxsm: { max: "960px" },
      sm: { max: "960px" },
      md: { min: "960px" },
      lg: "1512px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "rgb(245 234 220/1)",
      default: "#E2DDDD",
      text: "rgb(13 60 38/1)",
      grey: "rgb(214, 209, 209)",
      lightBackground: "#1e252a",
      background: "#141B1F",
    },
  },
  plugins: [],
};
export default config;
