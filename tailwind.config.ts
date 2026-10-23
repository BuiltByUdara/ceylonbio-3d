import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#101b28",
        foreground: "#e9eef3",
        muted: { DEFAULT: "#23303c", foreground: "#a6b3c2" },
        border: "#334454",
        ring: "#75ddbe",
      },
    },
  },
  plugins: [],
} satisfies Config;
