import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4E2FD2",
        success: "#0AA288",
        strike: "#D8392B",
        surface: "#FFFFFF",
        panel: "#EDF4FF",
        ink: {
          obsidian: "#0B0D10",
          900: "#1F1F1F",
          700: "#484848",
          600: "#6F7882",
          500: "#A8B2BD",
        },
        border: {
          300: "#E6EBF0",
          200: "#F0F4F7",
          line: "#CED6DE",
        },
      },
      fontFamily: {
        sans: ["Gilroy", "system-ui", "sans-serif"],
        cta: ['"TT Norms Pro"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
        chip: "2px",
        stepper: "4px",
        pill: "10px",
        btn: "4px",
        "btn-outline": "7px",
      },
    },
  },
} satisfies Config;
