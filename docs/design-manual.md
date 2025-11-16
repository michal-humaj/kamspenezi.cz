# Design Manual — kamspenezi.cz

> Last updated: November 16, 2025  
> This document reflects the current production design system after surgical polish.  
> All changes to brand, UI, or components must update this file first.

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
- Large monetary values in result cards (exception for emphasis)

**Sans (Figtree)** — Use for EVERYTHING else:
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

**End of Design Manual**

This manual is the single source of truth for the kamspenezi.cz brand and UI after surgical polish. Any deviation requires explicit approval and must be documented here first.

The design system prioritizes:
1. **Clarity** - Clear visual hierarchy through size, weight, and spacing
2. **Consistency** - Shared tokens for colors, spacing, shadows, radii
3. **Restraint** - Color is earned, not default. Serif is rare and purposeful.
4. **Polish** - Wealthsimple-level attention to detail in every interaction
