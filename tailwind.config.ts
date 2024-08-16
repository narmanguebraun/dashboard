import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#101010",
      light: "#E9E9E9",
      gray01: "#F0F0F5",
      gray02: "#D6D6E1",
      gray03: "#ACADC1",
      gray04: "#6F708B",
      gray05: "#454560",
      gray06: "#26273B",
      dark: "#181820",
      pink: "#c91248",
      green: "#5E7360",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
