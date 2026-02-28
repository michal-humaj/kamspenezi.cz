/**
 * IRR (Internal Rate of Return) — bisection solver.
 * Searches for the discount rate r such that NPV(cashflows, r) = 0.
 * Returns null if no sign change is detected in the search range [-0.5, 5.0].
 */
export function calculateIRR(cashflows: number[]): number | null {
  const npv = (r: number) =>
    cashflows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + r, t), 0);

  let lo = -0.5;
  let hi = 5.0;

  const npvLo = npv(lo);
  const npvHi = npv(hi);

  if (npvLo * npvHi > 0) return null;

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (Math.abs(hi - lo) < 1e-7) return mid;
    if (npv(lo) * npv(mid) <= 0) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return (lo + hi) / 2;
}
