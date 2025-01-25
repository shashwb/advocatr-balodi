import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", //class based dark mode
  theme: {
    extend: {
      colors: {
        solaceBlue: {
          light: "#E0F2FE",
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
        solaceGreen: {
          light: "#DCFCE7",
          DEFAULT: "#22C55E",
          dark: "#16A34A",
        },
        solaceGray: {
          light: "#F3F4F6",
          DEFAULT: "#6B7280",
          dark: "#374151",
        },
      },
      // Add custom fonts
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      backgroundImage: {
        "gradient-solace": "linear-gradient(90deg, #3B82F6, #22C55E)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
