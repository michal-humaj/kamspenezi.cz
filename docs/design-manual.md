# Design Manual — kamspenezi.cz

> Last updated: February 8, 2026
> This document reflects the actual production implementation of the design system.
> All changes to brand, UI, or components must update this file.
> 
> **Implementation Status**:
> - Primary design system uses CSS custom properties defined in `globals.css`
> - Tailwind config provides backwards compatibility but CSS vars are preferred
> - Scenario colors: A = Copper/Terracotta (#C2410C), B = Forest Green (#2F5C45)
> - All components use inline styles with `var(--token)` or utility classes
> - Two calculator pages: **Bydlení** (`/`) and **Investice** (`/investice`)

───────────────────────────────

## 1. Brand Positioning

**Vision**: Wealthsimple-level polish — minimal, analytical, premium, trustworthy.

**Design Philosophy**:
- Calm and neutral with controlled use of color
- Data-driven and editorial (not playful or startup-cute)
- Serif for major headings only, sans for everything else
- Generous whitespace and breathing room
- Color is earned, not default
- Clear visual hierarchy through size, weight, and spacing (not color inversions)

**References**: Wealthsimple, Wispr Flow (visual restraint and analytical tone)

───────────────────────────────

## 2. Typography

### 2.1 Typefaces

```css
--font-display-serif: "Newsreader", "Times New Roman", serif;
--font-ui-sans: "Figtree", system-ui, -apple-system, sans-serif;
```

### 2.2 Typography Rules

**Serif (Newsreader)** — Use ONLY for:
- H1 on landing pages
- H2, H3 section headings (e.g., "Začni podle svého města", "Jak vypadá výsledek", "Transparentní výpočet")
- Large monetary values in **Fixed Mode** result cards only (exception for emphasis)

**Sans (Figtree)** — Use for EVERYTHING else, INCLUDING:
- **Monte Carlo / Realistic Mode** result values (Sans-Serif for modern data visualization feel)
- All card titles (city preset cards, scenario cards, author card)
- Scenario labels ("Scénář A – vlastní bydlení na hypotéku")
- FAQ questions and answers
- Body text, bullets, captions
- All buttons, inputs, pills, badges
- All UI elements

### 2.3 Type Scale

**Headings**:
- H1: `clamp(36px, 5vw, 52px)`, line-height 1.1, tracking-tight
- H2: `text-2xl` (24px) to `md:text-3xl` (30px)
- H3 (card titles, scenario titles): `text-xl` (20px) to `md:text-[22px]`

**Body & UI**:
- Body: `text-base` (16px) to `md:text-lg` (18px), line-height 1.6
- Buttons: 
  - Primary: 16px desktop, 15px mobile
  - Secondary: 15px desktop, 14px mobile
  - Tertiary: 14px
- Scenario pills: `13px` (between xs and sm for readability)
- Small/meta: `text-xs` (12px) to `text-sm` (14px)

───────────────────────────────

## 3. Color System

### 3.1 Surface Colors

```css
--bg-base: #F5F6F8;            /* Base light background - slightly darker for contrast */
--bg-lilac-section: #F4F5FB;   /* Soft analytic sections */
--bg-card: #ffffff;            /* Card surface - pure white */
--bg-hover: rgba(15, 23, 42, 0.02);       /* Subtle hover background */
--bg-hover-strong: rgba(15, 23, 42, 0.04); /* Stronger hover background */
--bg-highlight: rgba(15, 23, 42, 0.03);   /* Subtle highlight for animations */
```

**Usage**:
- `--bg-base`: Hero, Transparency section, What calculator doesn't solve, Footer
- `--bg-lilac-section`: City Presets, Results, Myths+Scenarios (grouped), FAQ
- `--bg-card`: All cards (city cards, result card, scenario cards, author card, FAQ items)

**Alternation Pattern** (Calculator pages — `/` and `/investice`):
1. Hero + Inputs: base (desktop), inputs use lilac-section on mobile
2. Yearly Overview Table: base
3. FAQ: lilac-section
4. Footer: base

> **Note**: The original 9-section landing page pattern (Hero → City Presets → Results → Myths → Scenarios → Transparency → What doesn't solve → FAQ → Footer) was the initial design, but the current production site is a calculator-first layout. The `--bg-base` / `--bg-lilac-section` alternation principle still applies to any future content sections.

### 3.2 Text Colors

```css
--color-primary: #0F172A;       /* Main navy/ink */
--color-primary-hover: #1A2433; /* Primary navy hover (8% lighter) */
--color-secondary: #6B7280;     /* Secondary text */
--color-bullet: #9CA3AF;        /* Generic bullets */
```

**Usage**:
- `--color-primary`: Headings, primary body text, dark text on light backgrounds
- `--color-primary-hover`: Button hover states (never for text)
- `--color-secondary`: Body text, descriptions, secondary information
- `--color-bullet`: Generic bullets (hero, "Co kalkulačka neřeší") - NEVER orange

### 3.3 Borders

```css
--color-border: #EDEEF3;        /* Card borders, default borders */
--color-border-hover: #D8DBE5;  /* Border hover state for interactive elements */
```

### 3.4 Scenario Colors (ONLY for pills and accents)

```css
/* Scenario A: Own Housing / Mortgage - Warm Copper tones */
--scenario-a-bg: #FFF7ED;       /* Light warm beige/orange background */
--scenario-a-dot: #C2410C;      /* Architectural copper/terracotta */

/* Scenario B: Rent + Invest - Cool Forest Green tones */
--scenario-b-bg: #E3EBE6;       /* Soft sage/mint background */
--scenario-b-dot: #2F5C45;      /* Deep forest green */
```

**Color Philosophy**: Warm vs Cool contrast
- **Scenario A** = Warm (Copper/Terracotta) - represents stability, ownership, home
- **Scenario B** = Cool (Forest Green) - represents growth, wealth, the brand aesthetic

**Strict Rules**:
- Use ONLY in: Scenario pills/badges, dots inside pills, chart series colors
- NEVER use in: Section backgrounds, generic bullets, large background areas
- Always pair with explicit labels ("Byt na hypotéku", "Nájem a investování")
- **Purple is deprecated** - do NOT use lilac/purple for scenario colors

───────────────────────────────

## 4. Button System

### 4.1 Button Hierarchy

**Three distinct button variants:**
1. **Primary** - Main actions (e.g., "Spočítat moje bydlení")
2. **Secondary** - Supporting actions (e.g., "Zjistit, jak výpočet funguje")
3. **Tertiary** - Subtle actions (e.g., "Otevřít metodiku v Google Sheets")

### 4.2 PrimaryButton

**Desktop**:
```
Height: 52px
Font size: 16px
Font weight: 600 (semibold)
Horizontal padding: 24px (px-6)
```

**Mobile**:
```
Height: 52px
Font size: 15px
Font weight: 600 (semibold)
```

**Styling**:
```css
--btn-primary-bg: #0F172A;
--btn-primary-hover-bg: #1A2433;  /* 8% lighter */
--btn-primary-text: #ffffff;
--btn-primary-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
--btn-primary-shadow-hover: 0 6px 20px rgba(15, 23, 42, 0.22);
--btn-focus-ring: #9F7AEA;  /* Lilac focus ring - neutral, works with all colors */
```

**States**:
- Default: Dark navy background, white text, soft wide shadow
- Hover: Slightly lighter navy (8%), stronger shadow
- Focus: 2px lilac ring, outside button, respects border radius
- Border radius: `var(--radius-pill)` (999px)

### 4.3 SecondaryButton

**Desktop**:
```
Height: 48px
Font size: 15px
Font weight: 500 (medium)
Horizontal padding: 20px (px-5)
```

**Mobile**:
```
Height: 48px
Font size: 14px
Font weight: 500 (medium)
```

**Styling**:
```css
--btn-secondary-bg: #ffffff;
--btn-secondary-border: #EDEEF3;
--btn-secondary-border-hover: #CBD0E5;
--btn-secondary-hover-bg: rgba(15, 23, 42, 0.02);  /* Very subtle tint */
--btn-secondary-text: #0F172A;
```

**States**:
- Default: White background, 1px subtle grey border, primary navy text
- Hover: Very light tint, slightly darker border, text stays navy
- **NEVER** turns solid dark on hover
- Focus: Same lilac ring as primary
- Shadow: Very soft (--shadow-card) or none

### 4.4 TertiaryButton

**Size**:
```
Height: 44px
Font size: 14px
Font weight: 500 (medium)
Horizontal padding: 20px (px-5)
```

**Styling**:
- Same tokens as SecondaryButton
- Even more subtle presence
- Used for less prominent actions (e.g., external links)
- Must NEVER visually compete with primary CTA

**Critical Rule**: Secondary and tertiary buttons share styling to maintain simplicity. Hierarchy comes from context and placement, not visual weight.

### 4.5 Button Sizing Hierarchy

```
Primary:    52px height, 16px text (desktop) / 15px (mobile)
Secondary:  48px height, 15px text (desktop) / 14px (mobile)
Tertiary:   44px height, 14px text
```

**Visual Result**: Primary button is clearly the strongest element without being oversized. Button text is deliberately smaller than body text (16px base) to maintain hierarchy.

───────────────────────────────

## 5. Unified Card System

### 5.1 Card Styling

```css
--shadow-card: 0 8px 28px rgba(15, 23, 42, 0.06);  /* Soft vertical shadow */
--shadow-card-hover: 0 12px 32px rgba(15, 23, 42, 0.10);  /* Hover state */
--radius-card: 24px;  /* rounded-3xl - all standard cards */
--radius-pill: 999px;  /* rounded-full - buttons and pills */
```

**Apply to ALL standard cards**:
- Hero illustration card
- City preset cards
- Sample result card ("30 let dopředu, dva scénáře")
- Scenario explanation cards ("Scénář A/B – Co přesně...")
- Author card ("Kdo za kalkulačkou stojí")
- "Co kalkulačka neřeší" card wrapper

**FAQ Exception**: FAQ items use `rounded-2xl` (16px) for slightly tighter radius, appropriate for accordion items.

**Rules**:
- Every card uses `--radius-card` (24px) or `rounded-2xl` (FAQ only)
- Every card uses `--shadow-card` (same soft shadow)
- Every card uses `--bg-card` (#ffffff)
- Every card uses `--color-border` (1px solid)
- No mixing of radii or shadows
- Hover: Subtle background tint (`--btn-secondary-hover-bg`) for interactive cards

### 5.2 Scenario Pills

**Typography**:
```
Font size: 13px (between xs and sm)
Font weight: 500 (medium)
Font family: Figtree (--font-ui-sans)
```

**Sizing**:
```
Padding: 3px 8px
Gap: 1.5 (6px between dot and text)
Border radius: var(--radius-pill)
```

**Colors**:
```css
/* Scenario A (Property/Own) - Warm Copper */
background: var(--scenario-a-bg)   /* #FFF7ED - light warm beige */
color: var(--scenario-a-dot)       /* #C2410C - architectural copper */
dot: var(--scenario-a-dot)

/* Scenario B (Rent + Invest) - Cool Forest Green */
background: var(--scenario-b-bg)   /* #E3EBE6 - soft sage/mint */
color: var(--scenario-b-dot)       /* #2F5C45 - forest green */
dot: var(--scenario-b-dot)
```

**Usage**: Results card, scenario explanation cards. Always accompanied by clear labels ("Nájem a investování", not "ETF").

───────────────────────────────

## 6. Section Spacing System

### 6.1 Spacing Tokens

```css
--section-padding-y-desktop: 96px;
--section-padding-y-mobile: 64px;
```

**Application**:
```jsx
py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]
```

**Sections using these tokens**:
- Hero section
- Calculator input area
- Yearly Overview Table section
- FAQ section ("Nejčastější otázky")
- Content pages (`/jak-to-funguje`, `/metodika-a-zdroje`, `/o-projektu`, `/kontakt`)

**Result**: Consistent vertical rhythm throughout the page. Adjacent sections with the same background color maintain clear visual separation through this spacing.

### 6.2 Internal Spacing

**Hero section**:
- Space between elements: 24px (mt-6)
- Space between CTAs and "Zdarma, bez registrace": 8px (mt-2)
- Space between meta text and bullets: 24px (mt-6)
- Bullet spacing: 10px (space-y-2.5)

**Card internal padding**:
- Standard cards: p-6 md:p-8
- FAQ items: p-5 md:p-6
- "Co kalkulačka neřeší" card: p-8 md:p-10 (more generous)

**Line height**:
- Headings: 1.1 (tight)
- Body text: 1.6 (relaxed / leading-relaxed)
- Bullets: 1.6 (same as body for consistency)

───────────────────────────────

## 7. Site Navigation

### 7.1 Route Structure

```
/                    → Bydlení calculator (main page)
/investice           → Investice calculator
/jak-to-funguje      → How it works
/metodika-a-zdroje   → Methodology and sources
/o-projektu          → About the project
/kontakt             → Contact
```

### 7.2 Desktop Navigation

**Layout**: Horizontal nav bar, full width, border-bottom `#EDEEF3`, background `--bg-base`.

**Nav Links**: `Bydlení` | `Investice` | `Jak to funguje` | `Metodika`

**Active State**:
- Font weight: 600 (semibold)
- Color: `var(--color-primary)`
- 2px bottom underline in `var(--color-primary)`

**Inactive State**:
- Color: `var(--color-secondary)`
- Hover: `var(--color-primary)`

### 7.3 Mobile Navigation

**Trigger**: Hamburger menu icon (pill-shaped border button)

**Sheet Panel** (Radix UI Sheet, slides from right):
- Background: `var(--bg-card)`
- Primary links: `Bydlení`, `Investice` — separated by divider from secondary links
- Secondary links: `Jak to funguje`, `Metodika a zdroje`, `O projektu`, `Kontakt`
- No CTA buttons in the mobile menu
- Active state: 3px left border in `var(--color-primary)`

**Close Button** (top-right):
```css
/* 44x44px circular tap target for accessibility */
position: absolute;
right: 8px (right-2);
top: 8px (top-2);
width: 44px (w-11);
height: 44px (h-11);
border-radius: 50% (rounded-full);
/* Icon: 20x20 (h-5 w-5) centered inside */
/* Active state: bg-slate-100 + scale(0.95) for tap feedback */
```

**Auto-Close on Navigate**: Every link inside the mobile menu is wrapped with `<SheetClose asChild>` (Radix primitive). Tapping any link triggers the sheet close animation (300ms slide-out) before navigation completes.

───────────────────────────────

## 8. Hero Section Specifics

### 8.1 Hero Structure

Both calculators use the same hero layout — only the copy and image differ.

**Desktop**: Two-column grid (`md:grid-cols-2 gap-12`)
```
┌─────────────────────────────────────────────┐
│ Left Column (text)      Right Column (image)│
│ - Eyebrow (uppercase)   - Hero photo        │
│ - H1 (Newsreader)         rounded-[32px]    │
│ - Subtitle (Figtree)      aspect-[4/3]      │
│ - Scenario pills           scale-105        │
│                             rotate-[1.5deg]  │
└─────────────────────────────────────────────┘
```

**Mobile**: Single column, image appears as full-bleed band below pills
```
┌─────────────────────────────┐
│ - Eyebrow                   │
│ - H1                        │
│ - Subtitle                  │
│ - Scenario pills            │
│ - Full-bleed hero image     │
│   (h-44, no radius, -mx-4) │
└─────────────────────────────┘
```

### 8.2 Hero Images

**Bydleni** (`/`):
- Desktop: `/hero-couch.webp`
- Mobile: `/hero-couch-mobile.webp`

**Investice** (`/investice`):
- Desktop + Mobile: `/bars.png`

### 8.3 Hero Eyebrow

```css
font-size: 12px (text-xs);
font-weight: 600 (semibold);
letter-spacing: widest;
color: text-slate-700;
text-transform: uppercase;
margin-bottom: 8px (mb-2);
```

Content: "Online kalkulačka" (both pages)

───────────────────────────────

## 9. FAQ Section

**Structure**:
- Background: `--bg-lilac-section`
- Width: `max-w-3xl mx-auto`
- Accordion items: Slightly smaller radius than standard cards

**Card Styling**:
```css
Border radius: rounded-2xl (16px)
Background: var(--bg-card)
Border: 1px solid var(--color-border)
Shadow: var(--shadow-card)
Padding: p-5 md:p-6
```

**Typography**:
- Questions: `text-base font-medium` (Figtree, weight 500)
- Answers: `text-base leading-relaxed` (Figtree)
- Colors: `--color-primary` (questions), `--color-secondary` (answers)

**Interactive States**:
- Hover: Very subtle background tint (`--btn-secondary-hover-bg`)
- Cursor: pointer
- Focus: 2px ring in lilac (`--btn-focus-ring`), no blue
- Chevron: Rotates 180° on open with smooth transition (200ms ease-out)

**Critical Rule**: FAQ questions use font-weight 500 (medium) to clearly signal interactivity. Never use bold or heavy weights.

───────────────────────────────

## 10. Motion and Transitions

### 10.1 Tokens

```css
--transition-duration: 200ms;
--transition-easing: ease-out;
```

**Application**:
```css
transition: all var(--transition-duration) var(--transition-easing);
```

### 10.2 Framer Motion Animations

**Page sections**:
```jsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: "easeOut" }}
viewport={{ once: true, margin: "-50px" }}
```

**Cards**:
```jsx
whileHover={{ 
  y: -2,
  transition: { duration: 0.2, ease: "easeOut" }
}}
```

**Buttons**:
- Hover: background change, shadow intensification
- Duration: `var(--transition-duration)` (200ms)
- Easing: `ease-out`
- Primary button: Slightly lift on hover (already in place through shadow increase)

**General Principle**: Transitions should be fast (200ms) and use ease-out for responsiveness. Animations should be subtle and purposeful, never distracting.

───────────────────────────────

## 11. Forbidden Elements

**Never use**:
- Pills as section headings (small label pills above H2) ← Already removed
- Orange bullets for generic lists (use `--color-bullet`)
- Scenario colors in section backgrounds or for generic elements
- Multiple card radii (always 24px for standard cards, 16px for FAQ only)
- Different shadows for different cards (always `--shadow-card`)
- Oversized button text (primary: 16px desktop, secondary: 15px desktop, tertiary: 14px)
- Serif for card titles, scenario labels, or FAQ questions
- Solid dark hover fills for secondary/tertiary buttons
- Blue focus rings (use lilac `--btn-focus-ring`)
- Tailwind gradients
- Default shadcn shadows
- Emoji or playful elements

───────────────────────────────

## 12. Implementation Guidelines

### 12.1 Architecture Decision: CSS Custom Properties Over Tailwind

**Why we use CSS custom properties (CSS vars) as the primary design token system:**

1. **Single Source of Truth**: All design tokens defined once in `globals.css`
2. **Dynamic Theming**: Can be changed at runtime if needed
3. **Better TypeScript Support**: No Tailwind JIT compilation issues with dynamic values
4. **Consistent Across Technologies**: CSS vars work everywhere (React, vanilla JS, etc.)
5. **Easier Maintenance**: Change one value, updates everywhere

**Implementation Pattern**:
```tsx
// ✅ PREFERRED: CSS custom properties with inline styles
<div style={{ 
  background: 'var(--bg-card)', 
  color: 'var(--color-primary)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-card)'
}} />

// ✅ ALTERNATIVE: CSS vars with Tailwind arbitrary values
<div className="bg-[var(--bg-card)] text-[var(--color-primary)] rounded-[var(--radius-card)]" />

// ⚠️ ACCEPTABLE: Standard Tailwind utilities when they match design tokens
<div className="bg-white text-slate-900 rounded-3xl" />
// Note: rounded-3xl = 24px = var(--radius-card)

// ❌ AVOID: Hardcoded values
<div className="bg-[#FFFFFF] text-[#0F172A]" />
```

### 12.2 Tailwind Configuration

**Current Implementation in `tailwind.config.ts`**:

```ts
theme: {
  fontFamily: {
    displaySerif: ['var(--font-display-serif)', 'serif'],
    uiSans: ['var(--font-ui-sans)', 'sans-serif'],
  },
  extend: {
    colors: {
      // Note: These are legacy. Use CSS custom properties instead.
      // Example: Use var(--color-primary) instead of text-kp-text-main
      kp: {
        'text-main': '#0F172A',   // Kept for backwards compatibility
        'text-muted': '#6B7280',  // Kept for backwards compatibility
      },
    },
    borderRadius: {
      card: "24px",      // Standard cards (same as rounded-3xl)
      'faq': "16px",     // FAQ items (same as rounded-2xl)
      pill: "9999px",    // Buttons/pills (same as rounded-full)
    },
    boxShadow: {
      // Matches CSS custom properties in globals.css
      card: "0 8px 28px rgba(15, 23, 42, 0.06)",
      'card-hover': "0 12px 32px rgba(15, 23, 42, 0.10)",
    },
    // Custom font sizes for typography (optional, standard Tailwind classes work too)
    fontSize: {
      "display-landing": ["3rem", { lineHeight: "1.1", fontWeight: "600" }],
      "h1-app": ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
      h2: ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
      h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
      body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
      "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      label: ["0.75rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.04em" }],
    },
    // Transition utilities
    transitionTimingFunction: {
      'premium': 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
    transitionDuration: {
      '180': '180ms',
      '220': '220ms',
    },
  }
}
```

**Tailwind Class Equivalents** (when CSS vars not needed):
```tsx
// Border radius
rounded-3xl        = var(--radius-card)    = 24px
rounded-2xl        = var(--radius-faq)     = 16px  
rounded-full       = var(--radius-pill)    = 9999px

// Shadows (use sparingly, prefer CSS vars for consistency)
shadow-card        ≈ var(--shadow-card)
shadow-card-hover  ≈ var(--shadow-card-hover)

// Common colors that match our palette
bg-white           = var(--bg-card)        = #FFFFFF
text-slate-900     ≈ var(--color-primary)  = #0F172A
text-slate-600     ≈ var(--color-secondary) = #6B7280
```

### 12.3 Global CSS Variables

**In `globals.css`**:

```css
:root {
  /* Fonts */
  --font-ui-sans: "Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display-serif: "Newsreader", "Times New Roman", serif;

  /* Section Backgrounds */
  --bg-base: #F5F6F8;           /* Base light background - slightly darker for contrast */
  --bg-lilac-section: #F4F5FB;  /* Soft analytic sections */
  --bg-card: #FFFFFF;           /* Pure white for all cards */
  --bg-hover: rgba(15, 23, 42, 0.02);       /* Subtle hover background */
  --bg-hover-strong: rgba(15, 23, 42, 0.04); /* Stronger hover background */
  --bg-highlight: rgba(15, 23, 42, 0.03);   /* Subtle highlight for animations */

  /* Text Colors */
  --color-primary: #0F172A;     /* Main navy/ink */
  --color-primary-hover: #1A2433; /* Primary navy hover (8% lighter) */
  --color-secondary: #6B7280;   /* Secondary text */
  --color-on-primary: #FFFFFF;  /* Text on primary color */
  --color-border: #EDEEF3;      /* Card borders */
  --color-border-hover: #D8DBE5; /* Border hover state */
  --color-bullet: #9CA3AF;      /* Generic bullets */

  /* Scenario Colors - Warm vs Cool contrast */
  --scenario-a-bg: #FFF7ED;     /* Light warm beige/orange */
  --scenario-a-dot: #C2410C;    /* Architectural copper/terracotta */
  --scenario-b-bg: #E3EBE6;     /* Soft sage/mint background */
  --scenario-b-dot: #2F5C45;    /* Forest green */

  /* Selection/Active States (Navy/Primary) */
  --selection-border: var(--color-primary);
  --selection-bg: rgba(15, 23, 42, 0.02);
  --selection-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  --selection-shadow-inner: inset 0 1px 4px rgba(15, 23, 42, 0.04);
  --toggle-bg-inactive: rgba(244, 245, 251, 0.5);

  /* Button System */
  --btn-primary-bg: #0F172A;
  --btn-primary-hover-bg: #1A2433;
  --btn-primary-text: #ffffff;
  --btn-primary-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
  --btn-primary-shadow-hover: 0 6px 20px rgba(15, 23, 42, 0.22);
  
  --btn-secondary-bg: #ffffff;
  --btn-secondary-border: #EDEEF3;
  --btn-secondary-border-hover: #CBD0E5;
  --btn-secondary-hover-bg: rgba(15, 23, 42, 0.02);
  --btn-secondary-text: #0F172A;
  
  --btn-focus-ring: #9F7AEA;    /* Lilac focus ring */

  /* Card System */
  --shadow-card: 0 8px 28px rgba(15, 23, 42, 0.06);
  --shadow-card-soft: 0 8px 24px rgba(15, 23, 42, 0.05);
  --shadow-card-hover: 0 12px 32px rgba(15, 23, 42, 0.10);
  --radius-card: 24px;          /* All cards */
  --radius-pill: 999px;         /* Buttons and pills */

  /* Section Spacing */
  --section-padding-y-desktop: 96px;
  --section-padding-y-mobile: 64px;

  /* Motion */
  --transition-duration: 200ms;
  --transition-easing: ease-out;
}
```

### 12.4 Component Standards

**Real Component Patterns from Production Code**:

**Button Component Pattern** (Inline styles approach):

```tsx
// Primary Button - As used in basic-inputs.tsx (line 175)
<button
  type="button"
  className="w-full rounded-full bg-gray-900 hover:bg-gray-800 py-4 font-uiSans text-base font-bold text-white shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all"
>
  Zobrazit výsledek →
</button>

// City Button - As used in city-selector.tsx (line 59-91)
<button
  className="shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-3 font-uiSans text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
  style={{
    background: isSelected ? "var(--color-primary)" : "#FFFFFF",
    color: isSelected ? "var(--color-on-primary)" : "var(--color-primary)",
    border: `1.5px solid ${isSelected ? "var(--color-primary)" : "rgb(229, 231, 235)"}`,
    boxShadow: isSelected 
      ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
      : "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
  }}
>
  Praha
</button>
```

**Scenario Pill Pattern** (Actual Implementation):

```tsx
// Using ScenarioBadge component (src/components/ui/scenario-badge.tsx)
import { ScenarioBadge } from "@/components/ui/scenario-badge";

<ScenarioBadge scenario="A" label="Scénář A: Koupě" />
<ScenarioBadge scenario="B" label="Scénář B: Nájem + investice" />

// Or inline implementation (as used in hero-section.tsx, line 36):
<span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-800">
  Scénář A: Koupě
</span>

<span 
  className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
  style={{ 
    background: 'var(--scenario-b-bg)', 
    color: 'var(--scenario-b-dot)' 
  }}
>
  Scénář B: Nájem + investice
</span>

// With dot (as used in basic-inputs.tsx, line 69-71):
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-orange-700" />
  <span className="text-base font-semibold text-slate-900">
    Scénář A: Vlastní bydlení na hypotéku
  </span>
</div>

<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--scenario-b-dot)' }} />
  <span className="text-base font-semibold text-slate-900">
    Scénář B: Bydlení v nájmu a investování
  </span>
</div>
```

**Card Pattern** (As used in hero-section.tsx, line 84-92):

```tsx
<div 
  className="flex flex-col items-center border text-center" 
  style={{
    background: 'var(--bg-card)',
    borderColor: 'var(--color-border)',
    borderRadius: 'var(--radius-card)',
    boxShadow: 'var(--shadow-card)',
    padding: '28px 24px'
  }}
>
  Card content
</div>

// Alternative: Using Tailwind classes
<div className="rounded-3xl bg-white border border-[var(--color-border)] p-6 md:p-8 shadow-[var(--shadow-card)]">
  Card content
</div>
```

───────────────────────────────

## 13. Visual QA Checklist

Before shipping any page, verify:

**Layout & Structure**:
- [ ] Strict alternation between `--bg-base` and `--bg-lilac-section`
- [ ] All sections use consistent padding tokens (64px mobile, 96px desktop)
- [ ] Hero CTAs side-by-side on desktop, stacked on mobile
- [ ] "Zdarma, bez registrace" positioned 8px below CTAs (mt-2)

**Typography**:
- [ ] Serif only in H1, H2, H3 section headings
- [ ] All card titles are sans-serif
- [ ] All scenario labels ("Scénář A – ...") are sans-serif
- [ ] FAQ questions are sans-serif, font-medium (weight 500)
- [ ] Button text is smaller than body text (button: 14-16px, body: 16px)

**Button System**:
- [ ] Primary button is visually strongest (52px height, 16px text, semibold)
- [ ] Secondary button is clearly subordinate (48px height, 15px text, medium weight)
- [ ] Tertiary button most subtle (44px height, 14px text)
- [ ] Secondary/tertiary buttons never turn solid dark on hover
- [ ] All buttons use lilac focus ring, not blue

**Colors & Accents**:
- [ ] Generic bullets are neutral grey (`--color-bullet`), not orange
- [ ] Scenario colors only in pills/badges, never in section backgrounds
- [ ] All cards share 24px radius (except FAQ: 16px)
- [ ] All cards use same soft shadow (`--shadow-card`)

**Interactive States**:
- [ ] Primary button hover: lighter navy, stronger shadow
- [ ] Secondary/tertiary hover: subtle tint, darker border, text stays navy
- [ ] FAQ hover: very subtle background tint
- [ ] All focus states: lilac ring, no blue

**Consistency**:
- [ ] No pills as section labels
- [ ] Consistent spacing across similar sections
- [ ] All section backgrounds use semantic tokens
- [ ] Line height 1.6 (leading-relaxed) for all body text and bullets

───────────────────────────────

## 14. Quick Reference: Do's and Don'ts

### Implementation Approach

✅ **Do**: Use CSS custom properties with inline styles as primary pattern
```tsx
style={{ background: 'var(--bg-card)', color: 'var(--color-primary)' }}
```

✅ **Do**: Use Tailwind utility classes when they match design tokens exactly
```tsx
className="rounded-3xl bg-white"  // rounded-3xl = 24px = var(--radius-card)
```

✅ **Do**: Mix inline styles and Tailwind classes pragmatically
```tsx
className="flex items-center gap-2 px-4 py-3"
style={{ background: 'var(--bg-card)', borderColor: 'var(--color-border)' }}
```

❌ **Don't**: Use deprecated Tailwind color classes (bg-kp-*)
```tsx
className="bg-kp-bg-page text-kp-text-main"  // These don't match our palette
```

❌ **Don't**: Hardcode color values when CSS vars exist  
```tsx
className="bg-[#FFFFFF]"  // Use var(--bg-card) or bg-white instead
```

### Typography

✅ **Do**: Use serif for H1, H2, H3 section headings  
❌ **Don't**: Use serif for card titles, scenario labels, FAQ questions, or body text

✅ **Do**: Use sans (Figtree) for all UI, buttons, cards, pills  
❌ **Don't**: Mix serif into card content or labels

✅ **Do**: Keep button text smaller than body text for hierarchy  
❌ **Don't**: Make buttons oversized (primary max: 16px text)

### Colors

✅ **Do**: Alternate `--bg-base` and `--bg-lilac-section` strictly  
❌ **Don't**: Add new background shades or break alternation

✅ **Do**: Use neutral grey bullets (`--color-bullet`) for generic lists  
❌ **Don't**: Use orange or scenario colors for generic bullets

✅ **Do**: Use scenario colors only in pills and dots  
❌ **Don't**: Use scenario colors in section backgrounds or large areas

### Button System

✅ **Do**: Maintain clear 3-tier hierarchy (primary 52px > secondary 48px > tertiary 44px)  
❌ **Don't**: Create additional button variants or sizes

✅ **Do**: Use subtle hover for secondary/tertiary (light tint, darker border)  
❌ **Don't**: Make secondary/tertiary turn solid dark on hover

✅ **Do**: Use lilac focus ring (`--btn-focus-ring`) for all interactive elements  
❌ **Don't**: Use blue focus rings

### Components

✅ **Do**: Use 24px radius for all standard cards, 16px for FAQ  
❌ **Don't**: Mix card radii or create custom sizes

✅ **Do**: Use same soft shadow (`--shadow-card`) for all cards  
❌ **Don't**: Create custom shadows or vary shadow intensity

✅ **Do**: Use scenario pills at 13px font size  
❌ **Don't**: Make pills too large (competing with body text) or too small (unreadable)

### Spacing

✅ **Do**: Use section padding tokens (64px mobile, 96px desktop)  
❌ **Don't**: Create ad-hoc spacing values

✅ **Do**: Maintain 8px gap between CTAs and "Zdarma, bez registrace" (mt-2)  
❌ **Don't**: Let meta text drift away from CTA block

───────────────────────────────

## 15. Calculator Page Design System

The site has two calculator pages that share the same design system and component patterns:
- **Bydlení** (`/`) — Housing buy-vs-rent calculator (Scenario A: buy, B: rent + invest)
- **Investice** (`/investice`) — Investment property calculator (Scenario A: investment flat, B: ETF portfolio)

Both pages reuse the same UI components (sliders, accordions, cards, result panels, yearly tables) with different labels and calculation engines.

**Default State**: Both calculators initialize with **Praha + 1+kk** preselected. Results are always visible on page load — there is no empty state gating results behind city/apartment selection.

### 15.1 Page Structure

**Layout Pattern** (shared by both `/` and `/investice`):
```
Desktop: Two-column grid
├─ Left Column (8/12): Inputs, stacked vertically
│  ├─ City + Apartment selection
│  ├─ Basic inputs (Základní nastavení / vstupy)
│  ├─ Uncertainty inputs (Nejistota vývoje / Klíčové tržní předpoklady)
│  └─ Advanced inputs (Rozšířené předpoklady / Poplatky a náklady)
│
└─ Right Column (4/12): Results panel (sticky)
   └─ Sticky positioning (top-24)

Below grid: Yearly Overview Table ("Vývoj v čase")
Below table: FAQ section (lilac background)

Mobile: Single column, stacked
├─ City + Apartment selection
├─ All inputs
├─ Results panel (below inputs, not sticky)
├─ Yearly Overview (mobile accordion)
└─ FAQ section
```

**Background**: Uses `--bg-base` (#F5F6F8) throughout. Inputs use `--bg-lilac-section` on mobile for visual grouping. FAQ section uses `--bg-lilac-section`.

### 15.2 Calculator Typography

**Section Titles** (`.calc-section-title`):
```css
font-family: var(--font-ui-sans);  /* Figtree, NOT serif */
font-size: 20px (text-xl) → 24px (md:text-2xl);
font-weight: 600 (semibold);
color: var(--color-primary);
letter-spacing: -0.01em;
margin-bottom: 24px (mb-6);
```

**Usage**: 
- Bydlení: "Základní nastavení", "Nejistota vývoje v čase", "Rozšířené předpoklady", "Výsledek po 30 letech"
- Investice: "Základní vstupy", "Klíčové tržní předpoklady", "Poplatky a náklady", "Výsledek po 30 letech"

**Input Scenario Headers**:
```css
font-family: var(--font-ui-sans);
font-size: 16px (text-base);
font-weight: 600 (semibold);
color: var(--color-primary);
/* Subtitle below: text-sm (14px), text-slate-500, mt-1 */
```

**Usage**: "Scénář A: Vlastní bydlení...", "Scénář B: Nájem..." within input sections.

**Result Values** (`.calc-result-value`):
```css
font-family: var(--font-display-serif);  /* Newsreader - exception for emphasis */
font-size: 24px (mobile) → 28px (desktop);
font-weight: 600 (semibold);
color: var(--color-primary);
line-height: 1.25;
```

**Usage**: Large monetary values in results panel only (e.g., "76 122 550 Kč")

**Scenario Labels** (`.calc-scenario-label`):
```css
font-family: var(--font-ui-sans);
font-size: 12px (text-xs);
font-weight: 400 (regular);
color: var(--color-secondary);
text-transform: uppercase;
letter-spacing: 0.02em;
```

**Usage**: "SCÉNÁŘ A – BYT NA HYPOTÉKU", "SCÉNÁŘ B – NÁJEM A INVESTOVÁNÍ" above result values

### 15.3 Input System

**Labeled Slider Input** (Primary input pattern):

**Layout**:
```
Desktop & Mobile:
┌────────────────────────────────────────┐
│ [Label]                    [Input+Unit]│
│ [Helper text]                          │
│ [━━━━━━━━━○━━━━━━━━━━━] (slider)      │
└────────────────────────────────────────┘

Grid: grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] (mobile)
      grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] (desktop)
```

**Input Field Styling** (`.calc-input`):
```css
font-family: var(--font-ui-sans);
font-size: 16px;  /* CRITICAL: Must be ≥16px to prevent iOS Safari zoom */
padding: 10px 14px;
border: 1px solid var(--color-border);
border-radius: var(--radius-pill);  /* 999px */
background: white;
text-align: right;  /* Values align right, close to unit */
font-variant-numeric: tabular-nums;  /* Monospace numbers */

/* Focus state */
border-color: var(--color-primary);
box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.15),
            0 8px 20px rgba(15, 23, 42, 0.08);
```

**Unit Display** (`.calc-input-unit`):
```css
position: absolute;
right: 16px;  /* Inside input on right */
font-size: 14px (text-sm);
color: var(--color-secondary);
pointer-events: none;  /* Click-through to input */
```

**Units**: "Kč", "Kč / rok", "Kč / měsíc", "%", "% p.a.", "mil. Kč"

**Label Styling**:
```css
font-family: var(--font-ui-sans);
font-size: 16px (text-base);
font-weight: 500 (medium);
color: var(--color-primary);
```

**Helper Text** (under label):
```css
font-size: 14px (text-sm);
color: var(--color-secondary);
line-height: 1.5 (leading-relaxed);
margin-top: 4px (mt-1);
```

**Slider Styling** (`.slider-input`):
```css
/* Hit area: 32px height (transparent background) */
/* Visible track: 6px height, subtle guide-rail feel */
track-height: 6px;
border-radius: var(--radius-pill);
background: linear-gradient(
  to right,
  var(--color-primary) 0%,
  var(--color-primary) var(--slider-progress),
  #E5E7EB var(--slider-progress),
  #E5E7EB 100%
);

/* Thumb: 28px, navy with white border */
width: 28px;
height: 28px;
border-radius: 50%;
background: var(--color-primary);
border: 2px solid white;
box-shadow: 0 4px 8px rgba(15, 23, 42, 0.25), 0 0 0 2px #ffffff;

/* Hover: scale(1.05), stronger shadow */
/* Active: scale(1.1), cursor: grabbing */
```

### 15.4 Number Formatting

**Millions Format** (Purchase price only):
- **Display**: "7,8 mil. Kč" (one decimal place, Czech locale)
- **Internal**: Value stored in full Kč (7 800 000)
- **Usage**: "Kupní cena nemovitosti" field and apartment size cards
- **Formatter**: `formatMillionsCzk()` from `/lib/format.ts`

**Standard Kč Format**:
- **Display**: "24 000 Kč" (no decimals, space as thousands separator)
- **Locale**: cs-CZ (`Intl.NumberFormat`)
- **Usage**: All other monetary inputs and displays
- **Formatter**: `formatCzk()`

**Percentage Format**:
- **Display**: "4,5 %" (comma as decimal, one decimal place)
- **Locale**: cs-CZ
- **Usage**: All percentage inputs
- **Formatter**: `formatPercent()`

**Input Sanitization**:
- Numeric fields: Only digits and spaces allowed
- Decimal fields: Only digits, comma, and spaces allowed
- Automatic comma/period normalization (. → ,)
- Debounced updates (300ms) while typing

### 15.5 Collapsible Sections

**Header Styling** (`.calc-collapse-header`):
```css
padding: 12px 16px;
background: #F3F4F6;  /* Light grey pill */
border-radius: var(--radius-pill);
font-family: var(--font-ui-sans);
font-weight: 500 (medium);
color: var(--color-primary);
cursor: pointer;

/* Hover */
box-shadow: var(--shadow-card);
```

**Structure**:
```jsx
[Title + Badge] ────────── [ChevronDown Icon]
  ↓ (collapsed)
[Section content hidden]
  ↓ (expanded)
[Section content visible, chevron rotated 180°]
```

**Usage**: 
- "Nejistota vývoje v čase" (with "Pro pokročilé" badge)
- "Rozšířené předpoklady"

**Badge Styling** (Optional "Pro pokročilé"):
```css
background: rgba(15, 23, 42, 0.05);
padding: 2px 8px;
border-radius: 999px;
font-size: 11px;
color: var(--color-secondary);
```

### 15.6 Results Panel

**Visibility**: Results are always shown — no empty/placeholder state. Both calculators initialize with Praha + 1+kk, so results are computed and visible on first render.

**Card Styling**:
```css
background: white;
border: 1px solid var(--color-border);
border-radius: var(--radius-card);  /* 24px */
box-shadow: var(--shadow-card);
padding: 24px (p-6) desktop, 16px (p-4) mobile;
```

**Desktop Behavior**:
```css
position: sticky;
top: 96px (top-24);  /* Stays visible while scrolling */
align-self: start;
```

**Mobile Behavior**:
- NOT sticky
- Appears below all inputs
- Full width with horizontal padding
- Simplified border styling: `border-t border-gray-100` only

**Header Row**:
- **Layout**: Flex row, `items-center`, `justify-between`, `gap-4`
- **Title**: `text-xl font-bold text-slate-900`
- **Spacing**: `mb-4` below header row

**Toggle Buttons** (Realistický / Fixní):
```css
container: inline-flex rounded-lg bg-slate-100 p-0.5 h-9 items-center;

/* Individual buttons */
padding: px-3 py-1.5;
border-radius: rounded-md;
font-size: text-[13px];
font-weight: font-medium;

/* Active button */
background: white;
color: text-slate-900;
box-shadow: shadow-sm;

/* Inactive button */
color: text-slate-500;
hover: text-slate-700;
```

**Comparison Bar (Fixed Mode)**:
- **Style**: Bullet chart comparison
- **Structure**: Two rows (Scenario A vs Scenario B)
- **Visuals**:
  - Track: `h-2 bg-slate-100 rounded-full`
  - Fill: Animated width `transition-all duration-1000 ease-out`
  - Colors: `var(--scenario-a-dot)` / `var(--scenario-b-dot)`
- **Typography**: 
  - Scenario labels: `text-base font-medium text-gray-700`
  - Result values: `font-displaySerif text-3xl md:text-4xl font-semibold` (SERIF)
  - Asset labels: `text-[13px] font-medium text-slate-500`

### 15.6.1 Monte Carlo Results (Realistic Mode)

**Structure** (Top to Bottom):
1. Advisor Insight Box (Verdict)
2. Data Section (Swimlane Blocks)
3. Methodology Button

**Advisor Insight Box**:
```css
container: rounded-xl p-4 mb-6;
background: none (sits on white card background);
/* Dynamic backgrounds removed - clean white design */
```

- **Verdict Sentence**: 
  - Style: `text-base font-semibold text-slate-900 mb-2 text-center leading-snug`
  - Content: "V {X} % případů vychází lépe {WinnerName}"

- **Probability Bar**:
  - Style: `h-2.5 rounded-full overflow-hidden flex`
  - Segments: Two divs with scenario colors, widths = percentages

- **Probability Labels**:
  - Style: `text-xs font-bold tabular-nums`
  - Color: Match scenario colors (A: `#C2410C`, B: `#2F5C45`)
  - Layout: `flex justify-between mt-2`

- **Context Line**:
  - Style: `text-[10px] text-slate-400 mt-2 text-center uppercase tracking-wide`
  - Content: "Na základě 10 000 simulací trhu"

**Swimlane Block (Per Scenario)**:
```
┌─────────────────────────────────────────┐
│ ● Scénář A: Vlastní bydlení na hypotéku │ ← Scenario Label
├─────────────────────────────────────────┤
│            45 mil. Kč                   │ ← Median (HERO)
│        OČEKÁVANÝ VÝSLEDEK               │ ← Median Label
├─────────────────────────────────────────┤
│    [████████████|███████]               │ ← Range Bar
├─────────────────────────────────────────┤
│ 28 mil.                      62 mil.    │ ← Min/Max Values
│ PESIMISTICKÝ               OPTIMISTICKÝ │ ← Min/Max Labels
└─────────────────────────────────────────┘
```

- **Scenario Label Row**:
  - Layout: `flex items-center gap-1.5 mb-3`
  - Dot: `h-2 w-2 rounded-full` with scenario color
  - Text: `text-sm font-semibold text-slate-700`

- **Median Number** (CRITICAL: Sans-Serif, not Serif!):
  - Style: `font-uiSans text-3xl font-semibold tabular-nums text-slate-900`
  - Layout: Centered, `text-center mb-2`
  - Format: "{value} mil. Kč"

- **Median Label**:
  - Style: `text-[10px] font-medium text-slate-400 uppercase tracking-wide`
  - Content: "Očekávaný výsledek"
  - Layout: `mt-1`, centered

- **Range Bar (Floating Chart)**:
  - Container: `relative h-4 w-full`
  - Bar: Rounded-full, positioned absolutely using percentages
  - **NO grey track** - bar floats on whitespace
  - Median marker: `w-0.5 bg-white rounded-full` with subtle shadow
  - Global scaling: All bars scaled to `globalMax = max(scenarioA.p90, scenarioB.p90) * 1.1`

- **Min/Max Values**:
  - Style: `text-xs text-slate-500 tabular-nums`
  - Layout: `flex justify-between mt-1.5`
  - Format: "{value} mil."

- **Min/Max Labels**:
  - Style: `text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-wide`
  - Content: "Pesimistický" / "Optimistický"
  - Layout: `mt-0.5`, left/right aligned

**Scenario Divider**:
- Style: `border-b border-dashed border-slate-200 my-5`

**Methodology Button**:
- Style: `rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500`
- Hover: `hover:bg-slate-100`
- Layout: Centered, `mt-6`
- Content: "Metodika a vysvětlení pojmů" with ChevronRight icon

### 15.7 City and Apartment Selection

**City Buttons**:
```css
padding: 12px 16px (py-3 px-4);
border: 1.5px solid rgb(229, 231, 235);
border-radius: var(--radius-pill);
background: white;
box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06);
font-size: 14px (text-sm);
font-weight: 500;
transition: all 200ms ease-out;

/* Hover: lift + shadow + border darken */
transform: translateY(-2px);
border-color: rgb(209, 213, 219);
box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1);

/* Selected state — navy solid fill */
background: var(--color-primary);
color: var(--color-on-primary);
border-color: var(--color-primary);
box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.15);
```

**Apartment Size Cards**:
```css
padding: 20px (p-5);
border: 2px solid;
border-radius: var(--radius-card);  /* 24px */
background: white;

/* Content */
┌─────────────────────────┐
│ 2+kk (text-2xl, bold)   │
│ 8,1 mil · 54 m²         │
│ (text-sm, price medium + area muted)│
└─────────────────────────┘

/* Default state */
border-color: gray-200;
box-shadow: shadow-sm;
hover: border-gray-300 shadow-md -translate-y-0.5;

/* Selected state */
border-color: #0F172A (navy);
box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.15);
```

**Formatting**: 
- Purchase price: millions format ("8,1 mil")
- Area: square meters ("54 m²")

### 15.8 Mobile Optimization

**Viewport Meta Tag** (CRITICAL):
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
**DO NOT** set `maximum-scale=1` or `user-scalable=no`

**iOS Safari Zoom Prevention**:
- All input fields: minimum 16px font size
- Labels: 16px or larger
- Helper text: 14px (non-interactive, acceptable)
- Slider not affected (not a text input)

**Touch Targets**:
- Minimum height: 44px
- Buttons: 48-52px height
- Adequate spacing between interactive elements

### 15.9 Animation and Transitions

**Input Highlight Animation** (when preset applied):
```css
@keyframes highlightInput {
  0% { background-color: rgba(125, 90, 226, 0.1); }
  100% { background-color: white; }
}

animation: highlightInput 1.5s ease-out;
```

**Number Tween** (result values):
- Duration: 1 second
- Easing: ease-out
- Implemented via CSS animation on `key` change
- Tabular nums prevent layout shift during animation

**Debounced Recalculation**:
- Delay: 300ms after last keystroke
- Prevents excessive calculations while typing
- Visual feedback: none (silent, seamless)

### 15.10 Calculator Color Extensions

In addition to landing page colors, calculator page uses:

```css
/* Hover and interaction states */
--bg-hover: rgba(15, 23, 42, 0.02);  /* Subtle hover backgrounds */
--bg-hover-strong: rgba(15, 23, 42, 0.04);
--bg-highlight: rgba(15, 23, 42, 0.03);  /* Animation highlights */

/* Selection states (city/apartment cards) */
--selection-border: var(--color-primary);  /* Navy border */
--selection-bg: rgba(15, 23, 42, 0.02);  /* Light navy tint */
--selection-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
```

### 15.11 Calculator Button Variants

**"Upravit vstupy" Button** (Edit inputs):
```css
width: 100%;
padding: 12px 24px;
background: white;
border: 1px solid var(--color-border);
border-radius: var(--radius-pill);
font-size: 15px;
font-weight: 500;
color: var(--color-primary);
margin-bottom: 24px (mb-6);

/* Hover */
border-color: var(--color-border-hover);
box-shadow: var(--shadow-card);
```

**"Zobrazit výsledek" Button** (Mobile CTA):
```css
/* Same as PrimaryButton from landing page */
height: 52px;
font-size: 15px;
font-weight: 600;
width: 100%;
/* ... (standard primary button styling) */
```

### 15.12 Data Entry Patterns

**Input Behavior Rules**:
1. **Never reset to zero**: If user clicks in/out without typing, value remains unchanged
2. **Right cursor position**: Cursor always starts on right side of number (near unit)
3. **Character validation**: Only valid characters allowed (digits, comma for decimals, spaces)
4. **Debounced updates**: Calculations update 300ms after typing stops
5. **Blur validation**: On blur, invalid input falls back to last valid value
6. **Slider sync**: Moving slider updates input immediately (no debounce)
7. **Input sync**: Typing in input updates slider after validation

**NaN Prevention**:
- Parser functions return `null` for invalid input
- Null values fall back to current valid value
- Never allow empty or NaN state in calculator state

### 15.13 Spacing in Calculator

**Section Vertical Spacing**:
```css
/* Between major sections (City → Basic → Uncertainty → Advanced) */
margin-top: 48px (mt-12);

/* Between input groups within a section */
space-y: 16px (space-y-4);

/* Between label and input in LabeledSliderInput */
gap-x: 16px (gap-x-4);  /* Mobile */
gap-x: 16px (gap-x-4);  /* Desktop - same */

/* Between input and slider */
margin-top: 8px (mt-2);
```

**Card Padding**:
```css
/* Standard calculator cards */
padding: 24px (p-6);

/* Results panel */
padding: 24px (p-6);

/* Collapsible section content */
padding: 24px 0 (py-6);
```

### 15.14 Calculator Typography Scale

```
Section titles:    18px → 20px (.calc-section-title)
Input labels:      16px (base)
Input values:      16px (MUST be ≥16px for mobile)
Helper text:       14px (sm)
Units:             14px (sm)
Result labels:     12px (xs, uppercase)
Slider labels:     13px (between xs and sm)

FIXED MODE:
Result values:     24px → 28px (serif, font-displaySerif)

MONTE CARLO MODE:
Median values:     30px (text-3xl, SANS-SERIF, font-uiSans)
Range values:      12px (text-xs, sans-serif)
Micro-labels:      10px (text-[10px], uppercase)
Verdict text:      16px (text-base, semibold)
Context text:      10px (text-[10px], uppercase)
```

**Font Weight Usage**:
- Section titles: 600 (semibold)
- Input labels: 500 (medium)
- Input values: 400 (regular) + tabular-nums
- Fixed mode result values: 600 (semibold)
- Monte Carlo median values: 600 (semibold)
- Monte Carlo range values: 400 (regular)
- Helper text: 400 (regular)

### 15.15 Yearly Overview Table System

**Desktop Table (Wealthsimple/Stripe Polish)**:
- **Density**: Ultra-compact (`py-1` padding, `text-xs` font, `leading-tight`).
- **Structure**:
  - **Super-Headers**: "SCÉNÁŘ A..." / "SCÉNÁŘ B..." (`text-xs font-semibold uppercase tracking-normal text-slate-500`).
  - **Column Headers**: Full descriptive names, wrapping enabled, bottom-aligned (`align-bottom`).
  - **Sticky Column**: "Rok" column stays visible on scroll.
- **Visual Style**:
  - **No-Border Policy**: No internal vertical borders. Only one strong vertical divider (`border-l-2 border-slate-300`) separating Scenario A and B.
  - **Scenario B Tint**: `bg-[#FBFBFF]` (Very subtle neutral tint) applied to entire Scenario B column group.
  - **Typography**: Navy (`#0F172A`) for key metrics, Grey (`#6B7280`) for breakdown details.
  - **Values**: `tabular-nums`, "—" for zero (grey), Red text for negative values.
  - **Row Hover**: Highlights entire row across all columns (`hover:bg-slate-50`).
  - **Final Row**: Year 30 summary uses `bg-slate-100` background for visual anchor.

**Mobile List (Ledger Style)**:
- **Container**: Single `rounded-3xl border bg-white` card. No negative margins.
- **Collapsed Row**:
  - Grid Layout: `grid-cols-[1fr_auto_auto_16px]` for perfect alignment.
  - Columns: Year (Left), Scenario A Value (Fixed width, Right), Scenario B Value (Fixed width, Right), Chevron.
- **Expanded Content**:
  - Background: `bg-slate-50`.
  - Blocks: Two "paper strip" blocks (`bg-white`, `shadow-sm`, `border-l-2` with scenario color).
  - **Visual Grouping**: Dashed border (`border-t border-dashed border-slate-200`) separating expenses from final asset value.
  - **Typography**: Labels `text-xs text-slate-500`, Values `text-sm font-medium text-slate-900`. "Náklady celkem" promoted to `font-medium`.

### 15.16 Investice Page Specifics

The Investice page (`/investice`) follows the same design system as Bydlení — same background (`#F5F6F8`), same card styles, same slider/input components, no special theming or accent overrides. Differences are limited to:

**Results Panel**: Fixed mode only (no Realistický/Fixní toggle). No Monte Carlo simulation on this page.

**Scenario Labels**:
- Scenario A: "Investiční byt" (investment flat) — uses `--scenario-a-dot` (Copper)
- Scenario B: "ETF portfolio" — uses `--scenario-b-dot` (Forest Green)

**Investice-Specific Input Fields** (not present on Bydlení):
- `Obsazenost bytu` — Occupancy rate as percentage (default: 90%)
- `Sazba daně z příjmu` — Income tax rate toggle (15% or 23%)

**Investice-Specific Components**:
```
src/components/calculator/
├─ investice-basic-inputs.tsx            # Basic inputs with occupancy
├─ investice-uncertainty-inputs.tsx      # Market assumptions
├─ investice-advanced-inputs.tsx         # Fees, costs, tax rate
├─ investice-results-panel.tsx           # Net worth comparison
├─ InvesticeYearlyTable.tsx              # Desktop yearly table (21 columns)
└─ investice-yearly-breakdown-mobile.tsx # Mobile accordion view
```

**Investice Yearly Table Columns** (21 total):
```
Scenario A (Investment Property):
  Rok | Hodnota nemovitosti | Příjem z nájmu | Provozní náklady |
  Splátka hypotéky | Jistina | Úroky | Dlužná částka | Odpisy |
  Základ daně | Daň z příjmu | Čistý cashflow | Vedlejší fond |
  Čisté jmění (A)

Scenario B (ETF):
  ETF portfolio (B)
```

**Calculation Engine Files**:
```
src/lib/calculations/
├─ investice-yearly.ts    # Core year-by-year simulation
├─ investice-fixed.ts     # Fixed-rate wrapper (scalar → array)
└─ mortgage-math.ts       # Shared PMT/FV utilities
```

**Key Calculation Rules** (per Excel model):
1. Side fund can never be negative — only positive cashflow is deposited
2. ETF (Scenario B) receives matching out-of-pocket costs for fair comparison
3. Maintenance costs affect cashflow but are NOT tax-deductible
4. Straight-line depreciation: purchasePrice / 30
5. Tax only applies when tax base is positive

**URL State**: Uses `useInvesticeUrlState` hook with `i_` prefixed params (e.g., `i_kc`, `i_vz`) to avoid conflicts with Bydlení URL params.

───────────────────────────────

**End of Design Manual**

This manual is the single source of truth for the kamspenezi.cz brand and UI after surgical polish. Any deviation requires explicit approval and must be documented here first.

The design system prioritizes:
1. **Clarity** - Clear visual hierarchy through size, weight, and spacing
2. **Consistency** - Shared tokens for colors, spacing, shadows, radii
3. **Restraint** - Color is earned, not default. Serif is rare and purposeful.
4. **Polish** - Wealthsimple-level attention to detail in every interaction
