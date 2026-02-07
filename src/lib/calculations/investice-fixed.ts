/**
 * Investice Fixed Calculation
 *
 * Thin wrapper around the yearly engine.
 * Converts scalar inputs to constant arrays and calls the shared yearly calculation.
 * Same pattern as bydleni-fixed.ts.
 */

import {
  calculateInvesticeYearly,
  type InvesticeYearlyResult,
} from "./investice-yearly";
import { buildMortgageRateSeriesFixed, buildConstantSeries } from "./mortgage-math";

/**
 * Input type for Investice Fixed mode.
 * All rates are scalar values (constant for all 30 years, except mortgage which has 2 stages).
 */
export type InputsInvesticeFixed = {
  purchasePrice: number;
  parentsContribution: number;
  ownFundsRatio: number;
  furnishingOneOff: number;
  rentMonthly: number;
  occupancyRate: number;
  repairFundMonthly: number;
  insuranceAnnual: number;
  propertyTaxAnnual: number;
  maintenanceBaseKc: number;
  costInflationAnnual: number;
  taxRate: number;
  propertyGrowthAnnual: number;
  rentGrowthAnnual: number;
  investiceReturnAnnual: number;
  mortgageRateAnnual: number;    // Years 1-5
  mortgageRateFuture: number;    // Years 6-30
};

export type InvesticeFixedResult = InvesticeYearlyResult;

export function calculateInvesticeFixed(inputs: InputsInvesticeFixed): InvesticeFixedResult {
  const propertyGrowthSeries = buildConstantSeries(inputs.propertyGrowthAnnual);
  const rentGrowthSeries = buildConstantSeries(inputs.rentGrowthAnnual);
  const investiceReturnSeries = buildConstantSeries(inputs.investiceReturnAnnual);
  const mortgageRateSeries = buildMortgageRateSeriesFixed(
    inputs.mortgageRateAnnual,
    inputs.mortgageRateFuture
  );

  return calculateInvesticeYearly({
    purchasePrice: inputs.purchasePrice,
    parentsContribution: inputs.parentsContribution,
    ownFundsRatio: inputs.ownFundsRatio,
    furnishingOneOff: inputs.furnishingOneOff,
    rentMonthly: inputs.rentMonthly,
    occupancyRate: inputs.occupancyRate,
    repairFundMonthly: inputs.repairFundMonthly,
    insuranceAnnual: inputs.insuranceAnnual,
    propertyTaxAnnual: inputs.propertyTaxAnnual,
    maintenanceBaseKc: inputs.maintenanceBaseKc,
    costInflationAnnual: inputs.costInflationAnnual,
    taxRate: inputs.taxRate,
    propertyGrowthSeries,
    rentGrowthSeries,
    investiceReturnSeries,
    mortgageRateSeries,
  });
}
