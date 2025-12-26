# Design Manual — kamspenezi.cz

> Last updated: December 26, 2025
> This document reflects the current production design system including calculator page.  
> All changes to brand, UI, or components must update this file first.
> 
> **Recent Updates**: Monte Carlo "Realistic Mode" UI documented (Section 14.6.1)

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
--bg-base: #F9FAFB;            /* Base light background */
--bg-lilac-section: #F4F5FB;   /* Soft analytic lilac sections */
--bg-card: #ffffff;            /* Card surface - pure white */
```

**Usage**:
- `--bg-base`: Hero, Transparency section, What calculator doesn't solve, Footer
- `--bg-lilac-section`: City Presets, Results, Myths+Scenarios (grouped), FAQ
- `--bg-card`: All cards (city cards, result card, scenario cards, author card, FAQ items)

**Alternation Pattern**:
1. Hero: base
2. City Presets: lilac-section
3. Results: base
4. Myths: lilac-section
5. Scenarios: base
6. Transparency: lilac-section
7. What doesn't solve: base
8. FAQ: lilac-section
9. Footer: base

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
--scenario-a-bg: #F7EAD9;       /* Soft terracotta background */
--scenario-a-dot: #C98D4E;      /* Terracotta dot */
--scenario-b-bg: #EAE7FF;       /* Soft lilac background */
--scenario-b-dot: #7D5AE2;      /* Purple dot */
```

**Strict Rules**:
- Use ONLY in: Scenario pills/badges, dots inside pills, chart series colors
- NEVER use in: Section backgrounds, generic bullets, large background areas
- Always pair with explicit labels ("Byt na hypotéku", "Nájem + ETF")

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
--btn-focus-ring: #7D5AE2;  /* Lilac */
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
/* Scenario A (Property/Own) */
background: var(--scenario-a-bg)
color: var(--scenario-a-dot)
dot: var(--scenario-a-dot)

/* Scenario B (Rent/ETF) */
background: var(--scenario-b-bg)
color: var(--scenario-b-dot)
dot: var(--scenario-b-dot)
```

**Usage**: Results card, scenario explanation cards. Always accompanied by clear labels.

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
- Hero
- City Presets ("Začni podle svého města a velikosti bytu")
- Results ("Jak vypadá výsledek")
- Myths ("Mýty o nájmu")
- Scenarios ("Co přesně kalkulačka porovnává")
- Transparency ("Transparentní výpočet, žádná tajemství")
- What calculator doesn't solve ("Co kalkulačka neřeší")
- FAQ ("Nejčastější otázky")

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

## 7. Hero Section Specifics

### 7.1 Hero Structure (Desktop)

```
┌─────────────────────────────────────────────┐
│ Left Column (text)      Right Column (card) │
│ - Badge (lilac pill)    - Illustration card │
│ - H1 (Newsreader)       - Icon              │
│ - Subtitle (Figtree)    - Title (sans)      │
│ - Italic line           - Description       │
│ - Primary CTA (52px)    │                    │
│ - Secondary CTA (48px)  │                    │
│ - "Zdarma, bez..." (mt-2) │                  │
│ - Bullet list (mt-6)    │                    │
└─────────────────────────────────────────────┘
```

**Desktop CTAs**:
- Side by side: `gap-6`
- Primary: 52px height, 16px text, semibold
- Secondary: 48px height, 15px text, medium
- Visual hierarchy clear through size and weight

### 7.2 Hero Structure (Mobile)

```
┌─────────────────────────────┐
│ - Badge                     │
│ - H1                        │
│ - Subtitle                  │
│ - Italic line               │
│ - Primary CTA (full width,  │
│   52px height)              │
│ - mt-4 gap                  │
│ - Secondary CTA (full width,│
│   48px height, ghost)       │
│ - "Zdarma, bez..." (mt-2)   │
│ - mt-6 gap                  │
│ - Bullet list               │
│ - Illustration card         │
└─────────────────────────────┘
```

**Mobile CTAs**:
- Stacked, full width
- `mt-4` between primary and secondary
- "Zdarma, bez registrace": `text-sm`, `mt-2` (closer to CTAs than before)
- Bullet list: `mt-6` after meta text

### 7.3 Hero Bullets

- Neutral grey bullets (`--color-bullet`), NOT orange
- Small dot: `h-1.5 w-1.5 rounded-full mt-1.5`
- Text: `text-base text-[#4B5563] font-uiSans leading-relaxed`
- Spacing: `space-y-2.5`
- Same line height as body text (1.6) for visual consistency

───────────────────────────────

## 8. FAQ Section

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

## 9. Motion and Transitions

### 9.1 Tokens

```css
--transition-duration: 200ms;
--transition-easing: ease-out;
```

**Application**:
```css
transition: all var(--transition-duration) var(--transition-easing);
```

### 9.2 Framer Motion Animations

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

## 10. Forbidden Elements

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

## 11. Implementation Guidelines

### 11.1 Tailwind Configuration

**In `tailwind.config.ts`**, extend theme with:

```ts
theme: {
  extend: {
    fontFamily: {
      displaySerif: ['var(--font-display-serif)'],
      uiSans: ['var(--font-ui-sans)'],
    },
    // Colors and other tokens pulled from globals.css variables
  }
}
```

### 11.2 Global CSS Variables

**In `globals.css`**:

```css
:root {
  /* Fonts */
  --font-ui-sans: "Figtree", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display-serif: "Newsreader", "Times New Roman", serif;

  /* Section Backgrounds */
  --bg-base: #F9FAFB;
  --bg-lilac-section: #F4F5FB;
  --bg-card: #ffffff;

  /* Text Colors */
  --color-primary: #0F172A;
  --color-primary-hover: #1A2433;
  --color-secondary: #6B7280;
  --color-border: #EDEEF3;
  --color-border-hover: #D8DBE5;
  --color-bullet: #9CA3AF;

  /* Scenario Colors */
  --scenario-a-bg: #F7EAD9;
  --scenario-a-dot: #C98D4E;
  --scenario-b-bg: #EAE7FF;
  --scenario-b-dot: #7D5AE2;

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
  
  --btn-focus-ring: #7D5AE2;

  /* Card System */
  --shadow-card: 0 8px 28px rgba(15, 23, 42, 0.06);
  --shadow-card-hover: 0 12px 32px rgba(15, 23, 42, 0.10);
  --radius-card: 24px;
  --radius-pill: 999px;

  /* Section Spacing */
  --section-padding-y-desktop: 96px;
  --section-padding-y-mobile: 64px;

  /* Motion */
  --transition-duration: 200ms;
  --transition-easing: ease-out;
}
```

### 11.3 Component Standards

**Button Component Pattern**:

```jsx
// Primary Button (Desktop)
<Button 
  className="h-[52px] rounded-full text-white text-[16px] font-semibold px-6"
  style={{
    background: 'var(--btn-primary-bg)',
    boxShadow: 'var(--btn-primary-shadow)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'var(--btn-primary-hover-bg)';
    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow-hover)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'var(--btn-primary-bg)';
    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow)';
  }}
>
  CTA Text
</Button>

// Secondary/Tertiary Button
<Button 
  className="h-[48px] rounded-full text-[15px] font-medium px-5"
  style={{
    background: 'var(--btn-secondary-bg)',
    border: '1px solid var(--btn-secondary-border)',
    color: 'var(--btn-secondary-text)',
    boxShadow: 'var(--shadow-card)'
  }}
>
  Action Text
</Button>
```

**Scenario Pill Pattern**:

```jsx
<span 
  className="inline-flex items-center gap-1.5 font-medium text-[13px] font-uiSans"
  style={{
    background: 'var(--scenario-a-bg)',  // or scenario-b-bg
    color: 'var(--scenario-a-dot)',      // or scenario-b-dot
    borderRadius: 'var(--radius-pill)',
    padding: '3px 8px'
  }}
>
  <span 
    className="h-1.5 w-1.5 rounded-full"
    style={{ background: 'var(--scenario-a-dot)' }}
  />
  Label text
</span>
```

**Card Pattern**:

```jsx
<div 
  className="rounded-3xl bg-white border p-6 md:p-8"
  style={{
    borderColor: 'var(--color-border)',
    boxShadow: 'var(--shadow-card)'
  }}
>
  Card content
</div>
```

───────────────────────────────

## 12. Visual QA Checklist

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

## 13. Quick Reference: Do's and Don'ts

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

## 14. Calculator Page Design System

The calculator page (`/bydleni-kalkulacka`) extends the landing page design system with interactive components optimized for data entry and comparison.

### 14.1 Page Structure

**Layout Pattern**:
```
Desktop: Two-column grid
├─ Left Column (8/12): Inputs, stacked vertically
│  ├─ City + Apartment selection
│  ├─ Basic inputs (Základní nastavení)
│  ├─ Uncertainty inputs (Nejistota vývoje v čase)
│  └─ Advanced inputs (Rozšířené předpoklady)
│
└─ Right Column (4/12): Results panel (sticky)
   └─ Sticky positioning (top-24)

Mobile: Single column, stacked
├─ City + Apartment selection
├─ All inputs
└─ Results panel (below inputs, not sticky)
```

**Background**: Uses `--bg-base` (#F5F6F8) throughout. No lilac sections on calculator page.

### 14.2 Calculator Typography

**Section Titles** (`.calc-section-title`):
```css
font-family: var(--font-ui-sans);  /* Figtree, NOT serif */
font-size: 20px (text-xl) → 24px (md:text-2xl);
font-weight: 600 (semibold);
color: var(--color-primary);
letter-spacing: -0.01em;
margin-bottom: 24px (mb-6);
```

**Usage**: "Základní nastavení", "Nejistota vývoje v čase", "Rozšířené předpoklady", "Výsledek po 30 letech"

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

**Usage**: "SCÉNÁŘ A – BYT NA HYPOTÉKU", "SCÉNÁŘ B – NÁJEM + ETF" above result values

### 14.3 Input System

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
box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.04),
            0 8px 20px rgba(15, 23, 42, 0.06);
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

**Slider Styling**:
```css
height: 8px (h-2);
border-radius: var(--radius-pill);
background: var(--bg-hover);  /* Track */

/* Progress fill */
background: linear-gradient(
  to right,
  var(--color-primary) 0%,
  var(--color-primary) var(--value),
  var(--bg-hover) var(--value)
);

/* Thumb */
width: 16px;
height: 16px;
border-radius: 50%;
background: var(--color-primary);
border: 2px solid white;
box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
```

### 14.4 Number Formatting

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

### 14.5 Collapsible Sections

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

### 14.6 Results Panel

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

### 14.6.1 Monte Carlo Results (Realistic Mode)

**Structure** (Top to Bottom):
1. Advisor Insight Box (Verdict)
2. Data Section (Swimlane Blocks)
3. Methodology Button

**Advisor Insight Box**:
```css
container: rounded-xl p-4 mb-6;
background: dynamic based on winner;
  - If A wins: #FEF7F0 (light terracotta)
  - If B wins: #F5F3FF (light purple)
```

- **Verdict Sentence**: 
  - Style: `text-base font-semibold text-slate-900 mb-2 text-center leading-snug`
  - Content: "V {X} % případů vychází lépe {WinnerName}"

- **Probability Bar**:
  - Style: `h-2.5 rounded-full overflow-hidden flex`
  - Segments: Two divs with scenario colors, widths = percentages

- **Probability Labels**:
  - Style: `text-xs font-semibold tabular-nums`
  - Color: Match scenario colors (A: `#C98D4E`, B: `#7D5AE2`)
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

### 14.7 City and Apartment Selection

**City Buttons**:
```css
padding: 12px 20px;
border: 2px solid transparent;
border-radius: var(--radius-pill);
background: white;
box-shadow: var(--shadow-card);
font-size: 15px;
font-weight: 500;
transition: all var(--transition-duration) var(--transition-easing);

/* Selected state */
border-color: var(--selection-border);  /* Navy */
background: var(--selection-bg);  /* Very light navy tint */
box-shadow: var(--selection-shadow);
```

**Apartment Size Cards**:
```css
padding: 16px 20px;
border: 2px solid transparent;
border-radius: 16px (rounded-2xl);
background: white;
box-shadow: var(--shadow-card);

/* Content */
┌─────────────────────────┐
│ 2+kk (large, bold)      │
│ 7,8 mil · 24 tis / měsíc│
│ (small, grey)           │
└─────────────────────────┘

/* Selected state */
border-color: var(--selection-border);
background: var(--selection-bg);
transform: translateY(-2px);
```

**Formatting**: 
- Purchase price: millions format ("7,8 mil")
- Rent: thousands format ("24 tis")

### 14.8 Mobile Optimization

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

### 14.9 Animation and Transitions

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

### 14.10 Calculator Color Extensions

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

### 14.11 Calculator Button Variants

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

### 14.12 Data Entry Patterns

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

### 14.13 Spacing in Calculator

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

### 14.14 Calculator Typography Scale

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

### 14.15 Yearly Overview Table System

**Desktop Table (Wealthsimple/Stripe Polish)**:
- **Density**: Ultra-compact (`py-1` padding, `text-xs` font, `leading-tight`).
- **Structure**:
  - **Super-Headers**: "SCÉNÁŘ A..." / "SCÉNÁŘ B..." (`text-xs font-semibold uppercase tracking-normal text-slate-500`).
  - **Column Headers**: Full descriptive names, wrapping enabled, bottom-aligned (`align-bottom`).
  - **Sticky Column**: "Rok" column stays visible on scroll.
- **Visual Style**:
  - **No-Border Policy**: No internal vertical borders. Only one strong vertical divider (`border-l-2 border-slate-300`) separating Scenario A and B.
  - **Scenario B Tint**: `bg-[#FBFBFF]` (Lilac tint) applied to entire Scenario B column group.
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

───────────────────────────────

**End of Design Manual**

This manual is the single source of truth for the kamspenezi.cz brand and UI after surgical polish. Any deviation requires explicit approval and must be documented here first.

The design system prioritizes:
1. **Clarity** - Clear visual hierarchy through size, weight, and spacing
2. **Consistency** - Shared tokens for colors, spacing, shadows, radii
3. **Restraint** - Color is earned, not default. Serif is rare and purposeful.
4. **Polish** - Wealthsimple-level attention to detail in every interaction
