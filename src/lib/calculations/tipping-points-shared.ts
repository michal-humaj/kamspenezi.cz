/**
 * Tipping Points — Shared Utilities
 *
 * Pure helpers used by both the Bydlení and Investice tipping-point engines.
 * No calculator-specific logic lives here.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MarginTier = "near-equal" | "moderate" | "strong";

export interface TippingPoint {
  key: string;
  sentence: string;
  relDist: number;
  badge?: boolean;
}

export interface InsightResult {
  winner: "A" | "B" | "tie";
  marginPct: number;
  marginTier: MarginTier;
  winnerStatement: string;
  /** Only populated when marginTier !== 'near-equal' */
  toneSetter: string;
  /** Sorted ascending by relative distance. Empty when near-equal. */
  orderedTippingPoints: TippingPoint[];
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** CZK integer with Czech thousands separator. */
export function fmtCzk(value: number): string {
  return Math.round(value).toLocaleString("cs-CZ") + " Kč";
}

/** Percentage with one decimal place and Czech comma separator. */
export function fmtPct(value: number): string {
  return (value * 100).toFixed(1).replace(".", ",") + " %";
}

/** Millions with one decimal place, Czech locale, mil. Kč suffix. */
export function fmtMillions(value: number): string {
  return (value / 1_000_000).toLocaleString("cs-CZ", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + " mil. Kč";
}

/**
 * Legacy combined formatter — kept for callers that pass type explicitly.
 * New code should call fmtCzk / fmtPct / fmtMillions directly.
 */
export function fmt(value: number, type: "czk" | "pct"): string {
  if (type === "czk") return fmtCzk(value);
  if (type === "pct") return fmtPct(value);
  return "";
}

// ---------------------------------------------------------------------------
// Rounding helpers
// ---------------------------------------------------------------------------

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function roundTippingPointValue(
  value: number,
  type: "czk_monthly" | "czk_millions" | "pct"
): number {
  if (type === "czk_monthly") return roundToNearest(value, 500);
  if (type === "czk_millions") return roundToNearest(value, 100_000);
  if (type === "pct") return roundToNearest(value, 0.001); // nearest 0.1 %
  return value;
}

// ---------------------------------------------------------------------------
// Margin framing
// ---------------------------------------------------------------------------

/**
 * Returns a Czech phrase describing how much better the winner is.
 * Below 60 %: "o X % lépe"
 * 60–119 %:   "přibližně N× lépe"
 * 120 %+:     "více než N× lépe"
 */
export function formatMargin(marginPct: number): string {
  if (marginPct < 60) return `o ${marginPct}\u00a0% lépe`;
  const multiplier = 1 + marginPct / 100;
  if (marginPct < 120) return `přibližně ${multiplier.toFixed(0)}×\u00a0lépe`;
  return `více než ${Math.floor(multiplier)}×\u00a0lépe`;
}

// ---------------------------------------------------------------------------
// Binary search for flip value
//
// Finds the input value at which valueA ≈ valueB (within `tolerance` CZK).
// Works for parameters that either help A or B as they increase — direction
// is detected automatically from the outcomes at the bounds.
// ---------------------------------------------------------------------------

export function findFlipValue(
  computeOutcomes: (input: number) => { valueA: number; valueB: number },
  low: number,
  high: number,
  tolerance = 1000
): { flipValue: number; converged: boolean } {
  const atLow = computeOutcomes(low);
  const atHigh = computeOutcomes(high);
  const bMarginAtLow = atLow.valueB - atLow.valueA;
  const bMarginAtHigh = atHigh.valueB - atHigh.valueA;
  const higherHelpsB = bMarginAtHigh > bMarginAtLow;

  let mid = (low + high) / 2;

  for (let i = 0; i < 60; i++) {
    mid = (low + high) / 2;
    const { valueA, valueB } = computeOutcomes(mid);
    if (Math.abs(valueA - valueB) < tolerance) {
      return { flipValue: mid, converged: true };
    }

    if (valueA > valueB) {
      if (higherHelpsB) {
        if (low === mid) break;
        low = mid;
      } else {
        if (high === mid) break;
        high = mid;
      }
    } else {
      if (higherHelpsB) {
        if (high === mid) break;
        high = mid;
      } else {
        if (low === mid) break;
        low = mid;
      }
    }
  }

  const finalOutcomes = computeOutcomes(mid);
  const converged = Math.abs(finalOutcomes.valueA - finalOutcomes.valueB) < tolerance;
  return { flipValue: mid, converged };
}
