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
        // Note: Primary colors are defined in globals.css as CSS custom properties
        // Use var(--color-primary), var(--scenario-a-dot), etc. instead of these utility classes
        // These are kept for backwards compatibility but should not be used in new code
        kp: {
          'text-main': '#0F172A',      // Use var(--color-primary) instead
          'text-muted': '#6B7280',     // Use var(--color-secondary) instead
        },
      },
      borderRadius: {
        // Standard radii - align with design manual
        // For cards, use: rounded-[var(--radius-card)] or rounded-3xl (24px)
        // For buttons/pills, use: rounded-full or rounded-[var(--radius-pill)]
        card: "24px",          // Standard cards (same as rounded-3xl)
        'faq': "16px",         // FAQ accordion items (same as rounded-2xl)
        pill: "9999px",        // Buttons and pills (same as rounded-full)
      },
      boxShadow: {
        // Note: Use var(--shadow-card) and var(--shadow-card-hover) from globals.css instead
        // These are kept for backwards compatibility with existing Tailwind classes
        card: "0 8px 28px rgba(15, 23, 42, 0.06)",      // Matches --shadow-card
        'card-hover': "0 12px 32px rgba(15, 23, 42, 0.10)", // Matches --shadow-card-hover
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
          },
        ],
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;

