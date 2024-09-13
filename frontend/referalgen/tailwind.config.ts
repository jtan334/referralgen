import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans': 'Helvetica, Arial, sans-serif',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "ymblue" : "#3a506b",
        "gray" : "#7d7c7a" ,
        "saffron" : "#E8C547",
        "mpink" : "#A27E8E",
        "customwhite" : "#e6eaef",
        "cerulean" : "#007EA7"
      }
    },
  },
  plugins: [require('daisyui'),],
};
export default config;
