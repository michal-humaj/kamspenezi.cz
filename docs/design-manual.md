# Design Manual — kamspenezi.cz

> Last updated: November 16, 2025  
> This document reflects the current production design system.  
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

**Sans (Figtree)** — Use for EVERYTHING else:
- All card titles (city preset cards, scenario cards, author card)
- Scenario labels ("Scénář A – vlastní bydlení na hypotéku")
- FAQ questions and answers
- Body text, bullets, captions
- All buttons, inputs, pills, badges
- All UI elements

### 2.3 Type Scale

**Desktop**:
- H1: `clamp(36px, 5vw, 52px)`, line-height 1.1, tracking-tight
- H2: `text-2xl` (24px) to `md:text-3xl` (30px)
- H3 (card titles, scenario titles): `text-xl` (20px) to `md:text-[22px]`
- Body: `text-base` (16px) to `md:text-lg` (18px), line-height 1.6
- Buttons: `text-base` (16px), font-medium
- Small/meta: `text-xs` (12px) to `text-sm` (14px)

**Mobile**: Same scale, responsive with `clamp` or responsive Tailwind classes.

───────────────────────────────

## 3. Color System

### 3.1 Surface Colors

```css
--bg-page: #F9FAFB;            /* Main page background - near white */
--bg-section-soft: #F6F7FB;    /* Soft lilac sections - ultra-subtle */
--bg-card: #ffffff;            /* Card surface - pure white */
```

**Usage**:
- `bg-page`: Hero, Transparency section, What calculator doesn't solve, FAQ, Footer
- `bg-section-soft`: Only 3 lilac bands:
  1. City Presets ("Začni podle svého města")
  2. Results ("Jak vypadá výsledek")
  3. Myths + Scenarios (grouped together)
- `bg-card`: All cards (city cards, result card, scenario cards, author card, FAQ items)

### 3.2 Text Colors

```css
--text-primary: #0b1120;
--text-secondary: #4b5563;
--text-muted: #9ca3af;
```

**Usage**:
- `text-primary`: Headings, primary body text, dark text on light backgrounds
- `text-secondary`: Body text, descriptions, secondary information
- `text-muted`: Meta text, labels, "Zdarma, bez registrace", small captions

### 3.3 Borders

```css
--border-subtle: #e2e8f0;
--border-soft: #e5e7eb;
```

**Usage**:
- `border-subtle`: All card borders, dividers, default borders
- `border-soft`: Scenario dividers in result card

### 3.4 Scenario Colors (ONLY for pills and accents)

```css
--scenario-a-bg: #fde7ce;      /* Soft orange background */
--scenario-a-text: #92400e;    /* Dark orange text */
--scenario-b-bg: #e5e4ff;      /* Soft lilac background */
--scenario-b-text: #4338ca;    /* Dark purple text */
```

**Strict Rules**:
- Use ONLY in: Scenario pills/badges, dots inside pills, chart series colors
- NEVER use in: Section backgrounds, generic bullets, large background areas
- Always pair with explicit labels ("Byt na hypotéku", "Nájem + ETF")

### 3.5 Accent and CTAs

```css
--accent-bullet: #9ca3af;      /* Neutral grey bullets */
--accent-neutral: #9ca3af;     /* Neutral accents */
--cta-primary-bg: #0b1120;     /* Dark charcoal */
--cta-primary-text: #ffffff;   /* White */
```

**Usage**:
- `accent-bullet`: Generic bullets (hero, "Co kalkulačka neřeší") - NEVER orange
- `cta-primary-bg/text`: Primary CTA buttons, solid dark with white text

───────────────────────────────

## 4. Unified Card System

### 4.1 Card Styling

```css
--shadow-card: 0 18px 40px rgba(0, 0, 0, 0.06);  /* Soft vertical shadow */
--radius-card: 24px;                             /* Unified radius for all cards */
--card-padding: 20px 20px;                       /* Mobile: 20px all around */
                                                 /* Desktop: 24px 28px (via media query) */
```

**Apply to ALL cards**:
- Hero illustration card
- City preset cards
- Sample result card ("30 let dopředu, dva scénáře")
- Scenario explanation cards ("Scénář A/B – Co přesně...")
- Author card ("Kdo za kalkulačkou stojí")
- FAQ accordion items

**Rules**:
- Every card uses `radius-card` (24px)
- Every card uses `shadow-card` (same soft shadow)
- Every card uses `bg-card` (#ffffff)
- Every card uses `border-subtle` (1px solid)
- No mixing of radii or shadows

### 4.2 Buttons

**Primary**:
```jsx
background: 'var(--cta-primary-bg)'
color: 'var(--cta-primary-text)'
borderRadius: 'var(--radius-pill)'  // 999px
text-base font-medium
```

**Secondary** (Desktop):
- Text link with underline on hover
- `text-base font-medium`
- `text-primary` color

**Secondary** (Mobile):
- Ghost button: transparent background
- 1px `border-subtle` border
- `radius-pill` shape
- Full width, stacked below primary

**Button Sizing**:
- Desktop and mobile CTAs use SAME text size (`text-base`)
- Do not make buttons oversized
- Hierarchy through fill/border/weight, not giant text

───────────────────────────────

## 5. Section Backgrounds and Rhythm

### 5.1 Background Pattern

**3 Lilac Bands Only**:
1. **Hero**: `bg-page` (white)
2. **City Presets**: `bg-section-soft` (lilac)
3. **Results**: `bg-section-soft` (lilac)
4. **Myths + Scenarios**: `bg-section-soft` (lilac) — treated as one continuous band
5. **Transparency**: `bg-page` (white)
6. **What calculator doesn't solve**: `bg-page` (white)
7. **FAQ**: `bg-page` (white)
8. **Footer**: `bg-page` (white)

When scrolling, you see clear alternation: White → Lilac (3 sections grouped) → White (rest of page).

### 5.2 Section Spacing

**Desktop**:
- `py-10 md:py-18 lg:py-20` (standard for most sections)
- Hero: `py-10 md:py-18` (slightly less on top)

**Mobile**:
- Consistent `py-10` across sections
- Adjust with responsive classes as needed

**Consistent siblings**: Sections on the same background (e.g., City Presets and Results on lilac) should use identical padding values.

───────────────────────────────

## 6. Hero Section Specifics

### 6.1 Hero Structure (Desktop)

```
┌─────────────────────────────────────────────┐
│ Left Column (text)      Right Column (card) │
│ - Badge                 - Illustration card │
│ - H1 (Newsreader)       - Icon              │
│ - Subtitle (Figtree)    - Title (sans)      │
│ - Italic line           - Description       │
│ - Primary CTA           │                    │
│ - Secondary CTA (link)  │                    │
│ - "Zdarma, bez..."      │                    │
│ - Bullet list           │                    │
└─────────────────────────────────────────────┘
```

**Desktop CTAs**:
- Side by side: `gap-6` (breathes nicely)
- Primary: solid dark button
- Secondary: text link with underline on hover
- Same text size: `text-base font-medium`

### 6.2 Hero Structure (Mobile)

```
┌─────────────────────────────┐
│ - Badge                     │
│ - H1                        │
│ - Subtitle                  │
│ - Italic line               │
│ - Primary CTA (full width)  │
│ - mt-4 gap                  │
│ - Secondary CTA (full width │
│   ghost button)             │
│ - "Zdarma, bez..." (small,  │
│   under secondary CTA)      │
│ - mt-5 gap                  │
│ - Bullet list               │
│ - Illustration card         │
└─────────────────────────────┘
```

**Mobile CTAs**:
- Stacked, full width
- `mt-4` between primary and secondary for clear separation
- "Zdarma, bez registrace": `text-xs text-muted`, `mt-2` under secondary CTA
- Bullet list: `mt-5` after meta text (clear separation from CTA block)

### 6.3 Hero Bullets

- Neutral grey bullets (`accent-bullet`), NOT orange
- Small dot: `h-1.5 w-1.5 rounded-full mt-1.5`
- Text: `text-sm md:text-[15px] text-secondary`
- Spacing: `space-y-2.5`

───────────────────────────────

## 7. Result Card Specifics

### 7.1 Structure

```
┌──────────────────────────────────────┐
│ "Ukázkové srovnání" (small label)   │
│ "30 let dopředu, dva scénáře" (h3)  │ ← sans-serif!
│                                      │
│ ┌─────────────────┬────────────────┐│
│ │ Scenario A pill │ Scenario B pill││
│ │ Number (serif)  │ Number (serif) ││
│ │ Description     │ Description    ││
│ └─────────────────┴────────────────┘│
└──────────────────────────────────────┘
```

**Mobile spacing**: 
- `mt-3` (not `mt-4`) between card header and first scenario
- This keeps header and scenarios visually connected on mobile

**Scenario Pills**:
- `text-[13px] md:text-[14px] font-medium font-uiSans`
- Background: `scenario-a-bg` / `scenario-b-bg`
- Text: `scenario-a-text` / `scenario-b-text`
- Dot: same as text color, `h-1.5 w-1.5 rounded-full`
- Padding: `padding: '4px 10px'`
- Border radius: `radius-pill`

**Numbers in result card**:
- Use `font-displaySerif` (Newsreader) for the large monetary values
- This is an exception to the "sans for card content" rule

───────────────────────────────

## 8. FAQ Section

**Structure**:
- Background: `bg-page` (white)
- Width: `max-w-3xl mx-auto`
- Accordion items use card system:
  - `bg-card` (#ffffff)
  - `border-subtle` (1px solid)
  - Radius: 16px (FAQ has its own slightly smaller radius)
  - Padding: `16px 20px` (mobile), `20px 24px` (desktop)

**Typography**:
- Questions: `font-uiSans text-[15px] md:text-base font-medium text-primary`
- Answers: `font-uiSans text-sm md:text-[15px] text-secondary`

**Focus state**:
- No blue focus ring
- `focus-visible:ring-2 focus-visible:ring-offset-0` with neutral ring color
- Chevron rotates 180° on open with smooth transition

───────────────────────────────

## 9. Motion and Transitions

### 9.1 Tokens

```css
--transition-duration: 200ms;
--transition-easing: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--radius-pill: 999px;
```

### 9.2 Framer Motion Animations

**Page sections**:
- `initial={{ opacity: 0, y: 24 }}`
- `whileInView={{ opacity: 1, y: 0 }}`
- `transition={{ duration: 0.4, ease: "easeOut" }}`
- `viewport={{ once: true, margin: "-50px" }}`

**Cards**:
- Hover: `whileHover={{ scale: 1.01 }}`
- Use same transition easing

**Buttons**:
- Hover: background change, slight translate-y
- Duration: `var(--transition-duration)`
- Easing: `var(--transition-easing)`

───────────────────────────────

## 10. Forbidden Elements

**Never use**:
- Pills as section headings (small label pills above H2)
- Orange bullets for generic lists (use neutral grey)
- Scenario colors in section backgrounds
- Multiple card radii (always 24px except FAQ at 16px)
- Different shadows for different cards (always `shadow-card`)
- Oversized button text (stick to `text-base`)
- Serif for card titles or scenario labels
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
    // Use tokens from globals.css
  }
}
```

### 11.2 Global CSS Variables

**In `globals.css`**:

```css
:root {
  /* Fonts */
  --font-ui-sans: "Figtree", system-ui, sans-serif;
  --font-display-serif: "Newsreader", "Times New Roman", serif;

  /* Surface */
  --bg-page: #F9FAFB;
  --bg-section-soft: #F6F7FB;
  --bg-card: #ffffff;

  /* Text */
  --text-primary: #0b1120;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;

  /* Borders */
  --border-subtle: #e2e8f0;
  --border-soft: #e5e7eb;

  /* Scenario colors */
  --scenario-a-bg: #fde7ce;
  --scenario-a-text: #92400e;
  --scenario-b-bg: #e5e4ff;
  --scenario-b-text: #4338ca;

  /* Accents */
  --accent-bullet: #9ca3af;
  --accent-neutral: #9ca3af;

  /* CTA */
  --cta-primary-bg: #0b1120;
  --cta-primary-text: #ffffff;

  /* Card system */
  --shadow-card: 0 18px 40px rgba(0, 0, 0, 0.06);
  --radius-card: 24px;
  --radius-pill: 999px;
  --card-padding: 20px 20px;

  /* Motion */
  --transition-duration: 200ms;
  --transition-easing: cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

@media (min-width: 768px) {
  :root {
    --card-padding: 24px 28px;
  }
}
```

### 11.3 Component Standards

**Always**:
- Use CSS variables, never hardcoded hex
- All cards use `border`, `borderRadius: 'var(--radius-card)'`, `boxShadow: 'var(--shadow-card)'`
- All scenario pills use reusable pattern with `scenario-a-bg` / `scenario-b-bg`
- Sans-serif (`font-uiSans`) for all UI elements except H1, H2, H3 section headings

**Scenario Badge Component Pattern**:

```jsx
<span 
  className="inline-flex items-center gap-2 font-medium text-[13px] md:text-[14px] font-uiSans"
  style={{
    background: 'var(--scenario-a-bg)',  // or scenario-b-bg
    color: 'var(--scenario-a-text)',     // or scenario-b-text
    borderRadius: 'var(--radius-pill)',
    padding: '4px 10px'
  }}
>
  <span 
    className="h-1.5 w-1.5 rounded-full"
    style={{ background: 'var(--scenario-a-text)' }}  // matches text color
  />
  Label text
</span>
```

───────────────────────────────

## 12. Visual QA Checklist

Before shipping any page, verify:

- [ ] Only 3 lilac bands visible (City Presets + Results + Myths/Scenarios)
- [ ] Serif only in H1, H2, H3 section headings
- [ ] All card titles are sans-serif
- [ ] All scenario labels ("Scénář A – ...") are sans-serif
- [ ] FAQ questions are sans-serif
- [ ] Hero CTAs have same text size
- [ ] "Zdarma, bez registrace" is small (`text-xs`), positioned correctly
- [ ] Generic bullets are neutral grey, not orange
- [ ] All cards share 24px radius and same soft shadow
- [ ] Scenario colors only in pills/badges, never in section backgrounds
- [ ] On mobile, result card header and first scenario are tightly connected (`mt-3`)
- [ ] No pills as section labels
- [ ] Consistent spacing across similar sections

───────────────────────────────

## 13. Quick Reference: Do's and Don'ts

### Typography

✅ **Do**: Use serif for H1, H2, H3 section headings  
❌ **Don't**: Use serif for card titles, scenario labels, FAQ questions, or body text

✅ **Do**: Use sans (Figtree) for all UI, buttons, cards  
❌ **Don't**: Mix serif into card content or labels

### Colors

✅ **Do**: Use 3 lilac bands (City Presets, Results, Myths+Scenarios)  
❌ **Don't**: Add lilac to other sections or create more than 3 bands

✅ **Do**: Use neutral grey bullets for generic lists  
❌ **Don't**: Use orange or scenario colors for generic bullets

✅ **Do**: Use scenario colors only in pills and dots  
❌ **Don't**: Use scenario colors in section backgrounds or large areas

### Components

✅ **Do**: Use 24px radius for all cards  
❌ **Don't**: Mix card radii (16px, 20px, 24px)

✅ **Do**: Use same soft shadow for all cards  
❌ **Don't**: Create custom shadows or vary shadow intensity

✅ **Do**: Keep CTA text size at `text-base`  
❌ **Don't**: Make buttons oversized with larger text

───────────────────────────────

**End of Design Manual**

This manual is the single source of truth for the kamspenezi.cz brand and UI. Any deviation requires explicit approval and must be documented here first.
