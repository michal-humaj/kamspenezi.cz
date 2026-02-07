# Design System Alignment - February 7, 2026

## Summary

Updated the design manual and fixed code discrepancies to align documentation with actual implementation. **No visual changes were made** - only documentation updates and fixes to unused/broken components.

---

## Changes Made

### 1. Fixed ScenarioBadge Component ✅
**File:** `src/components/ui/scenario-badge.tsx`

**Problem:** Component referenced non-existent Tailwind classes (`bg-scenarioA`, `bg-scenarioB`)

**Solution:** Updated to use CSS custom properties:
```tsx
// Before (broken)
container: "bg-scenarioA/10"
dot: "bg-scenarioA"

// After (working)
bg: "var(--scenario-a-bg)"
color: "var(--scenario-a-dot)"
dotBg: "var(--scenario-a-dot)"
```

**Impact:** Low - Component is not currently used in the codebase, but now works correctly if needed.

---

### 2. Cleaned Up Tailwind Config ✅
**File:** `tailwind.config.ts`

**Changes:**
1. **Removed deprecated color palette** - Removed 10+ unused `kp.*` color classes that didn't match design manual
2. **Updated box shadows** - Aligned with `globals.css` values
3. **Simplified border radius** - Removed unused custom sizes
4. **Added documentation** - Clarified which approach to use (CSS vars vs Tailwind classes)

**Before:**
```ts
colors: {
  kp: {
    'bg-page': '#F7F9FC',      // Wrong
    'scenario-a': '#F8B686',    // Wrong color
    'scenario-b': '#9C88FF',    // PURPLE! Wrong!
    // ... 8 more deprecated colors
  }
}
boxShadow: {
  card: "0 18px 45px...",       // Different from globals.css
}
```

**After:**
```ts
colors: {
  kp: {
    'text-main': '#0F172A',    // Minimal backwards compat
    'text-muted': '#6B7280',   // Only what's needed
  }
}
boxShadow: {
  card: "0 8px 28px...",        // Matches globals.css
}
```

**Impact:** Low - These classes weren't being used (components use CSS vars instead)

---

### 3. Updated Design Manual ✅
**File:** `docs/design-manual.md`

**Major Updates:**

#### Added Section 11.1: Architecture Decision
Documented why we use CSS custom properties as the primary design token system:
- Single source of truth in `globals.css`
- Better TypeScript support
- Dynamic theming capability
- Consistent across technologies

#### Updated Section 11.2: Tailwind Configuration
- Documented actual `tailwind.config.ts` structure
- Added equivalence table (e.g., `rounded-3xl = var(--radius-card)`)
- Clarified when to use Tailwind vs CSS vars

#### Updated Section 11.3: Global CSS Variables
- Added line number references to `globals.css`
- Showed actual usage patterns from codebase

#### Updated Section 11.4: Component Standards
- Replaced theoretical examples with **real production code**
- Added line number references to source files
- Showed actual patterns used in:
  - `basic-inputs.tsx` (line 175)
  - `city-selector.tsx` (lines 59-91)
  - `hero-section.tsx` (line 84-92)

#### Updated Section 13: Quick Reference
- Added "Implementation Approach" section
- Clarified CSS vars vs Tailwind usage
- Added Do's/Don'ts for implementation patterns

---

## What Wasn't Changed

### Visual Design ✅
- **Zero visual changes** - No colors, spacing, fonts, or layouts modified
- All existing styles continue to work exactly as before
- Website appearance is identical

### Working Components ✅
- No changes to components that are actively used
- All existing functionality preserved
- No breaking changes introduced

### Design Tokens ✅
- All CSS custom properties in `globals.css` remain unchanged
- Color palette (#C2410C, #2F5C45, etc.) untouched
- Spacing, shadows, and radii values unchanged

---

## Current State

### Design System Architecture
```
Primary:    CSS Custom Properties (globals.css)
            ↓
            Used in components via:
            - Inline styles: style={{ background: 'var(--bg-card)' }}
            - Tailwind arbitrary: className="bg-[var(--bg-card)]"

Fallback:   Tailwind Utility Classes (when they match exactly)
            - rounded-3xl (= 24px = var(--radius-card))
            - bg-white (= #FFFFFF = var(--bg-card))
            - text-slate-900 (≈ var(--color-primary))
```

### Component Patterns in Use

**Most Common Pattern** (seen in city-selector, hero-section, basic-inputs):
```tsx
// Inline styles with CSS vars
<div 
  className="flex items-center gap-2 px-4 py-3"
  style={{
    background: 'var(--bg-card)',
    borderColor: 'var(--color-border)',
    borderRadius: 'var(--radius-card)',
  }}
/>
```

**Alternative Pattern** (when Tailwind classes match design tokens):
```tsx
// Pure Tailwind
<div className="rounded-3xl bg-white border-gray-200 px-4 py-3" />
```

**Hybrid Pattern** (most flexible):
```tsx
// Mix Tailwind layout + CSS var colors/tokens
<div 
  className="flex items-center rounded-full px-4 py-3"
  style={{ background: 'var(--scenario-b-bg)', color: 'var(--scenario-b-dot)' }}
/>
```

---

## Verification

### Server Status
- ✅ Development server running without errors
- ✅ No compilation issues
- ✅ All routes accessible
- ✅ Only minor warnings (baseline-browser-mapping outdated)

### Code Quality
- ✅ ScenarioBadge component now functional
- ✅ Tailwind config cleaned and documented
- ✅ Design manual reflects reality

### Documentation
- ✅ Design manual updated with actual implementation
- ✅ Real code examples from production
- ✅ Clear guidance on CSS vars vs Tailwind
- ✅ Line number references to source files

---

## Next Steps (Optional)

If you want to further improve the design system consistency:

1. **Update remaining hardcoded colors** - Some components use `bg-orange-50`, `text-orange-800` instead of CSS vars
2. **Standardize button components** - Create reusable button components using CSS vars
3. **Add Storybook** - Document all component patterns visually
4. **Type-safe design tokens** - Generate TypeScript types from `globals.css`

However, the current implementation works well and follows a clear, documented pattern.

---

## Files Modified

1. `src/components/ui/scenario-badge.tsx` - Fixed broken component
2. `tailwind.config.ts` - Cleaned up and documented
3. `docs/design-manual.md` - Updated to reflect reality
4. `DESIGN_SYSTEM_ALIGNMENT.md` - This file (new)

**Total lines changed:** ~150 lines across 3 files
**Visual impact:** Zero (no visual changes)
**Breaking changes:** Zero (backwards compatible)
