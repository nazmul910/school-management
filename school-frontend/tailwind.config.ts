import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#78A4CB",     // Brand Primary Blue
        secondary: "#95BDD7",   // Secondary Slate Blue
        lightSky: "#B4E1EB",    // Light Sky Blue
        accent: "#F9E8A2",      // Warm Gold / Cream Accent
        dark: "#1e3a5f",        // Deep Navy for crisp text
        darker: "#0f2038",      // Dark Slate Navy
        surface: "#FFFFFF",     // Clean White
        bgLight: "#F3F8FC",     // Soft Ice Blue Tinted BG
        button: "#78A4CB",      // Primary Button color
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
