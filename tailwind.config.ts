import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: "#2ecc71",
        secondary: "#27ae60",
        accent: "#3498db",
        background: "#f8fafc",
        "text-primary": "#2c3e50",
        "text-secondary": "#4a5568",
      },
    },
  },
  plugins: [],
};

export default config;
