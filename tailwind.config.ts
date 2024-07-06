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
        bloc: ["var(--font-bloc)"],
        extenda: ["var(--font-extenda)"],
        openSauceSans: ["var(--font-openSauceSans)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
