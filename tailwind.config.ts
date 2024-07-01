import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        ttNormsPro: ["var(--font-ttNormsPro)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
