import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1120px",
      },
    },
    fontFamily: {
      displaySerif: ["var(--font-display-serif)", "serif"],
      uiSans: ["var(--font-ui-sans)", "sans-serif"],
    },
    extend: {
      colors: {
        bg: {
          default: "#F7F2EC",
          subtle: "#F3E9E0",
        },
        surface: {
          default: "#FFFFFF",
          soft: "#FBF5F0",
        },
        text: {
          main: "#201A17",
          muted: "#6E6259",
          soft: "#9A8F86",
        },
        accent: {
          dark: "#141414",
          peach: "#F4D2B7",
          peachSoft: "#F9E3CF",
          lilac: "#DCD8FF",
          lilacSoft: "#EAE7FF",
        },
        border: {
          subtle: "#E3D7CC",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
        pill: "9999px",
      },
      boxShadow: {
        hero: "0 24px 60px rgba(0,0,0,0.12)",
        card: "0 18px 50px rgba(0,0,0,0.08)",
        step: "0 14px 40px rgba(0,0,0,0.06)",
      },
      fontSize: {
        "display-landing": [
          "3rem",
          {
            lineHeight: "1.1",
            fontWeight: "600",
          },
        ],
        "h1-app": [
          "2.25rem",
          {
            lineHeight: "1.2",
            fontWeight: "600",
          },
        ],
        h2: [
          "1.75rem",
          {
            lineHeight: "1.3",
            fontWeight: "600",
          },
        ],
        h3: [
          "1.375rem",
          {
            lineHeight: "1.3",
            fontWeight: "500",
          },
        ],
        body: [
          "1rem",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "0.875rem",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        label: [
          "0.75rem",
          {
            lineHeight: "1.4",
            fontWeight: "500",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          },
        ],
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;

