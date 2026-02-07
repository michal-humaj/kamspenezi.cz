/**
 * Shared mortgage math utilities.
 * Used by both Bydlení and Investice calculation engines.
 */

/**
 * Excel PMT function equivalent.
 * Calculates the payment for a loan based on constant payments and a constant interest rate.
 * 
 * @param rate - Monthly interest rate (annual / 12)
 * @param nper - Number of periods (months)
 * @param pv - Present value (loan amount, negative)
 * @returns Monthly payment (positive for outflow)
 */
export function PMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return -(pv / nper);
  const pvif = Math.pow(1 + rate, nper);
  return (rate * pv * pvif) / (pvif - 1);
}

/**
 * Excel FV function equivalent.
 * Calculates the future value of an investment/loan.
 * 
 * @param rate - Monthly interest rate
 * @param nper - Number of periods (months)
 * @param pmt - Monthly payment
 * @param pv - Present value (initial balance, negative for loan)
 * @returns Future value (remaining balance for loan)
 */
export function FV(rate: number, nper: number, pmt: number, pv: number): number {
  if (rate === 0) return -(pv + pmt * nper);
  const pvif = Math.pow(1 + rate, nper);
  return -((pv * pvif) + (pmt * (pvif - 1) / rate));
}

/**
 * Recalculates mortgage payment when rate changes at refix boundary.
 * 
 * @param remainingPrincipal - Balance at start of refix period (positive)
 * @param newRate - New annual interest rate (decimal, e.g., 0.05)
 * @param remainingYears - Years left until mortgage end
 * @returns New monthly payment (positive)
 */
export function recalculateMortgagePayment(
  remainingPrincipal: number,
  newRate: number,
  remainingYears: number
): number {
  const monthlyRate = newRate / 12;
  const remainingMonths = remainingYears * 12;
  const pv = -remainingPrincipal; // PMT expects negative PV for loan
  return -PMT(monthlyRate, remainingMonths, pv);
}

/**
 * Helper to build a mortgage rate series from fixed mode inputs.
 * Creates a 31-element array with rate1 for years 0-5 and rate2 for years 6-30.
 */
export function buildMortgageRateSeriesFixed(rate1: number, rate2: number): number[] {
  const series = new Array(31);
  for (let t = 0; t <= 30; t++) {
    series[t] = t <= 5 ? rate1 : rate2;
  }
  return series;
}

/**
 * Helper to build a constant series (for fixed mode).
 */
export function buildConstantSeries(value: number): number[] {
  return new Array(31).fill(value);
}
