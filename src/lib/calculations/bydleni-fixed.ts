/**
 * Bydlení Fixed Calculation
 * 
 * This is now a thin wrapper around the yearly engine.
 * It converts scalar inputs to constant arrays and calls the shared yearly calculation.
 * This ensures Fixed mode and Monte Carlo mode use identical formulas.
 */

import {
  calculateBydleniYearly,
  buildMortgageRateSeriesFixed,
  buildConstantSeries,
  type YearlyEngineResult,
} from "./bydleni-yearly";

/**
 * Input type for Fixed mode calculation.
 * All rates are scalar values (constant for all 30 years, except mortgage which has 2 stages).
 */
export type InputsBydleniFixed = {
  purchasePrice: number;          // Kupní cena nemovitosti
  parentsContribution: number;    // Příspěvek rodičů
  mortgageRateAnnual: number;     // Úroková sazba hypotéky (roky 1-5)
  mortgageRateFuture: number;     // Budoucí sazba hypotéky (roky 6-30)
  ownFundsRatio: number;          // Vlastní zdroje jako podíl (např. 0.1 = 10%)
  furnishingOneOff: number;       // Jednorázové vybavení bytu

  propertyGrowthAnnual: number;   // Roční zhodnocení nemovitosti
  repairFundMonthly: number;      // Fond oprav měsíčně
  insuranceAnnual: number;        // Pojištění ročně
  propertyTaxAnnual: number;      // Daň z nemovitosti ročně
  maintenanceBaseKc: number;      // Náklady na údržbu ročně
  costInflationAnnual: number;    // Inflace nákladů

  rentGrowthAnnual: number;       // Roční růst nájemného
  rentMonthly: number;            // Měsíční nájem
  investiceReturnAnnual: number;  // Roční výnos investic
  taxRate?: number;               // Sazba daně z příjmu (0.15 nebo 0.23)
};

/**
 * Result type for Fixed mode calculation.
 * This is an alias of YearlyEngineResult for backwards compatibility.
 */
export type BydleniFixedResult = YearlyEngineResult;

/**
 * Calculate Fixed mode scenario comparison.
 * 
 * Converts all scalar inputs to constant arrays and delegates to the yearly engine.
 * The mortgage rate uses the 2-stage pattern: rate1 for years 1-5, rate2 for years 6-30.
 */
export function calculateBydleniFixed(inputs: InputsBydleniFixed): BydleniFixedResult {
  // Build constant series from scalar inputs
  const propertyGrowthSeries = buildConstantSeries(inputs.propertyGrowthAnnual);
  const rentGrowthSeries = buildConstantSeries(inputs.rentGrowthAnnual);
  const investiceReturnSeries = buildConstantSeries(inputs.investiceReturnAnnual);
  
  // Build mortgage rate series with 2-stage pattern
  const mortgageRateSeries = buildMortgageRateSeriesFixed(
    inputs.mortgageRateAnnual,   // Years 1-5
    inputs.mortgageRateFuture    // Years 6-30
  );

  // Call the shared yearly engine
  return calculateBydleniYearly({
    purchasePrice: inputs.purchasePrice,
    parentsContribution: inputs.parentsContribution,
    ownFundsRatio: inputs.ownFundsRatio,
    furnishingOneOff: inputs.furnishingOneOff,
    repairFundMonthly: inputs.repairFundMonthly,
    insuranceAnnual: inputs.insuranceAnnual,
    propertyTaxAnnual: inputs.propertyTaxAnnual,
    maintenanceBaseKc: inputs.maintenanceBaseKc,
    costInflationAnnual: inputs.costInflationAnnual,
    rentMonthly: inputs.rentMonthly,
    taxRate: inputs.taxRate,
    propertyGrowthSeries,
    rentGrowthSeries,
    investiceReturnSeries,
    mortgageRateSeries,
  });
}
