import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ['"Rubik"'],
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
