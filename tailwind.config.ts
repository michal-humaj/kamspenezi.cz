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
        brand: {
          bgMain: "#FAF6F0",
          bgAlt: "#F4EEE6",
          cardBg: "#FFFCF8",
          textPrimary: "#1F130C",
          textSecondary: "#5C5145",
          accentOwn: "#F3B980",
          accentEtf: "#C7D1FF",
          accentNeutralPill: "#E6D9C7",
          cta: "#111111",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 18px 45px rgba(15,7,1,0.12)",
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

