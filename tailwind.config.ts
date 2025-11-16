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
        kp: {
          'bg-page': '#F7F9FC',
          'bg-hero': '#FCFDFE',
          'bg-band': '#EEF2FF',
          'surface': '#FFFFFF',
          'border-subtle': '#E2E8F0',
          'text-main': '#0F172A',
          'text-muted': '#6B7280',
          'text-soft': '#9CA3AF',
          'primary': '#020617',
          'primary-hover': '#02051A',
          'scenario-a': '#F8B686',
          'scenario-a-soft': '#FFF3E8',
          'scenario-b': '#9C88FF',
          'scenario-b-soft': '#F2EFFF',
        },
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "18px",
        card: "24px",
        'card-mobile': "18px",
        'faq': "16px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 18px 45px rgba(15, 23, 42, 0.08)",
        'card-hover': "0 22px 55px rgba(15, 23, 42, 0.12)",
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        '180': '180ms',
        '220': '220ms',
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

