/**
 * Bydlení Yearly Calculation Engine
 * 
 * This is the core annual calculation engine that accepts per-year arrays for stochastic drivers.
 * Both Fixed mode and Monte Carlo mode use this same engine to ensure identical formulas.
 * 
 * The engine computes year-by-year:
 * - Scenario A: Own housing with mortgage
 * - Scenario B: Rent + invest the difference
 */

import { PMT, FV, recalculateMortgagePayment } from "./mortgage-math";

// Re-export shared helpers so existing imports keep working
export { buildMortgageRateSeriesFixed, buildConstantSeries } from "./mortgage-math";

const YEARS = 30;

/**
 * Inputs for the yearly calculation engine.
 * Stochastic drivers are provided as arrays (length 31 for years 0-30).
 */
export type YearlyEngineInputs = {
  // Static inputs (unchanged across years)
  purchasePrice: number;          // Kupní cena nemovitosti
  parentsContribution: number;    // Příspěvek rodičů
  ownFundsRatio: number;          // Vlastní zdroje jako podíl (0.1 = 10%)
  furnishingOneOff: number;       // Jednorázové vybavení bytu
  repairFundMonthly: number;      // Fond oprav měsíčně
  insuranceAnnual: number;        // Pojištění ročně
  propertyTaxAnnual: number;      // Daň z nemovitosti ročně
  maintenanceBaseKc: number;      // Náklady na údržbu ročně (base)
  costInflationAnnual: number;    // Inflace nákladů (např. 0.02 = 2%)
  rentMonthly: number;            // Nájem měsíčně (base year 1)
  taxRate?: number;               // Sazba daně z příjmu (0.15 nebo 0.23), pro odpočet úroků

  // Per-year arrays (length 31: index 0 = year 0, index 30 = year 30)
  propertyGrowthSeries: number[];    // rustHodnotyNemovitosti[t] (např. 0.03 = 3%)
  rentGrowthSeries: number[];        // rustNajemneho[t] (např. 0.02 = 2%)
  investiceReturnSeries: number[];   // vynosInvestice[t] (např. 0.07 = 7%)
  mortgageRateSeries: number[];      // urokovaSazbaHypoteky[t] (např. 0.05 = 5%)
};

/**
 * Result from yearly calculation engine.
 * Contains full time series and final net worth values.
 */
export type YearlyEngineResult = {
  // Full time series (length 31: years 0-30)
  years: number[];
  rentAnnual: number[];
  savedVsOwnership: number[];
  investiceValue: number[];
  ownershipCosts: number[];
  propertyValue: number[];
  remainingDebt: number[];
  mortgagePaymentsAnnual: number[];
  taxAnnual: number[];
  repairFundAnnual: number[];
  insuranceAnnualSeries: number[];
  maintenanceAnnual: number[];

  // Key outputs
  netWorthRentPlusInvestice: number; // Scenario B final value
  netWorthOwnFlat: number;           // Scenario A final value
};

/**
 * Main yearly calculation engine.
 * Runs both Scenario A and Scenario B year-by-year using the provided time series.
 * 
 * Key difference from fixed mode: mortgage rate can change at any year boundary.
 * When rate changes, we recalculate the monthly payment based on:
 * - Remaining principal at that point
 * - Remaining term
 * - New rate
 */
export function calculateBydleniYearly(inputs: YearlyEngineInputs): YearlyEngineResult {
  // Extract static inputs
  const purchasePrice = inputs.purchasePrice;
  const parentsContribution = inputs.parentsContribution;
  const ownFundsRatio = inputs.ownFundsRatio;
  const furnishingOneOff = inputs.furnishingOneOff;
  const repairFundMonthly = inputs.repairFundMonthly;
  const insuranceAnnual = inputs.insuranceAnnual;
  const propertyTaxAnnual = inputs.propertyTaxAnnual;
  const maintenanceBaseKc = inputs.maintenanceBaseKc;
  const costInflationAnnual = inputs.costInflationAnnual;
  const rentMonthly = inputs.rentMonthly;
  const taxRate = inputs.taxRate ?? 0.15;

  // Extract series
  const propGrowth = inputs.propertyGrowthSeries;
  const rentGrowth = inputs.rentGrowthSeries;
  const investReturn = inputs.investiceReturnSeries;
  const mortgageRate = inputs.mortgageRateSeries;

  // Derived values
  const loanAmount = purchasePrice * (1 - ownFundsRatio);

  // Pre-allocate arrays
  const years: number[] = new Array(YEARS + 1);
  const rentAnnual: number[] = new Array(YEARS + 1);
  const savedVsOwnership: number[] = new Array(YEARS + 1);
  const investiceValue: number[] = new Array(YEARS + 1);
  const ownershipCosts: number[] = new Array(YEARS + 1);
  const propertyValue: number[] = new Array(YEARS + 1);
  const remainingDebt: number[] = new Array(YEARS + 1);
  const mortgagePaymentsAnnual: number[] = new Array(YEARS + 1);
  const taxAnnual: number[] = new Array(YEARS + 1);
  const repairFundAnnual: number[] = new Array(YEARS + 1);
  const insuranceAnnualSeries: number[] = new Array(YEARS + 1);
  const maintenanceAnnual: number[] = new Array(YEARS + 1);

  // Initialize years array
  for (let t = 0; t <= YEARS; t++) {
    years[t] = t;
  }

  // ============================================
  // PROPERTY VALUE (Scenario A asset)
  // ============================================
  // Property value compounds annually using per-year growth rates
  propertyValue[0] = purchasePrice;
  for (let t = 1; t <= YEARS; t++) {
    propertyValue[t] = propertyValue[t - 1] * (1 + propGrowth[t]);
  }

  // ============================================
  // MORTGAGE CALCULATION with dynamic refix
  // ============================================
  // Track current monthly payment and remaining principal
  let currentMonthlyPayment = 0;
  let currentRate = mortgageRate[1]; // Year 1 rate
  
  // Calculate initial monthly payment for year 1
  // Assuming 30-year amortization from start
  currentMonthlyPayment = recalculateMortgagePayment(loanAmount, currentRate, 30);
  
  // Year 0: Just the loan balance, no payments yet
  remainingDebt[0] = loanAmount;
  mortgagePaymentsAnnual[0] = 0;

  for (let t = 1; t <= YEARS; t++) {
    const yearRate = mortgageRate[t];
    
    // Check if rate changed from previous year (refix boundary)
    if (t > 1 && yearRate !== currentRate) {
      // Recalculate payment based on remaining principal and remaining term
      const remainingYears = YEARS - t + 1;
      currentMonthlyPayment = recalculateMortgagePayment(
        remainingDebt[t - 1],
        yearRate,
        remainingYears
      );
      currentRate = yearRate;
    }
    
    // Calculate remaining debt at end of year t
    // We paid 12 months at currentMonthlyPayment with currentRate
    const monthlyRate = currentRate / 12;
    const startingBalance = remainingDebt[t - 1];
    
    // Use FV to calculate balance after 12 monthly payments
    const pv = -startingBalance;
    remainingDebt[t] = FV(monthlyRate, 12, currentMonthlyPayment, pv);
    
    // Safety check for floating point errors near end of term
    if (remainingDebt[t] < 1) remainingDebt[t] = 0;
    
    mortgagePaymentsAnnual[t] = currentMonthlyPayment * 12;
  }

  // ============================================
  // OWNERSHIP COSTS (Tax, Repair Fund, Insurance, Maintenance)
  // ============================================
  // These grow with cost inflation, not stochastic
  
  // Tax
  taxAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      taxAnnual[t] = propertyTaxAnnual;
    } else {
      taxAnnual[t] = taxAnnual[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Repair fund
  repairFundAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      repairFundAnnual[t] = repairFundMonthly * 12;
    } else {
      repairFundAnnual[t] = repairFundAnnual[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Insurance
  insuranceAnnualSeries[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      insuranceAnnualSeries[t] = insuranceAnnual;
    } else {
      insuranceAnnualSeries[t] = insuranceAnnualSeries[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Maintenance
  maintenanceAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    maintenanceAnnual[t] = maintenanceBaseKc * Math.pow(1 + costInflationAnnual, t - 1);
  }

  // Total ownership costs
  // Year 0: Initial costs (down payment + furnishing - parents help)
  ownershipCosts[0] = purchasePrice - loanAmount + furnishingOneOff - parentsContribution;
  for (let t = 1; t <= YEARS; t++) {
    // Mortgage interest paid in year t = total payments minus principal reduction
    const annualInterestPaid = mortgagePaymentsAnnual[t] - (remainingDebt[t - 1] - remainingDebt[t]);
    // Tax deduction: interest up to 150 000 Kč/year × tax rate (§15 ZDP)
    const taxSaving = Math.min(Math.max(annualInterestPaid, 0), 150_000) * taxRate;

    ownershipCosts[t] =
      mortgagePaymentsAnnual[t] +
      taxAnnual[t] +
      repairFundAnnual[t] +
      insuranceAnnualSeries[t] +
      maintenanceAnnual[t] -
      taxSaving;
  }

  // ============================================
  // RENT CALCULATION (Scenario B costs)
  // ============================================
  // Rent grows using per-year growth rates
  rentAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      rentAnnual[t] = rentMonthly * 12;
    } else {
      rentAnnual[t] = rentAnnual[t - 1] * (1 + rentGrowth[t]);
    }
  }

  // ============================================
  // SAVINGS vs OWNERSHIP
  // ============================================
  // What the renter saves compared to the owner each year
  for (let t = 0; t <= YEARS; t++) {
    savedVsOwnership[t] = ownershipCosts[t] - rentAnnual[t];
  }

  // ============================================
  // INVESTMENT PORTFOLIO (Scenario B asset)
  // ============================================
  // Portfolio grows using per-year investment returns
  investiceValue[0] = savedVsOwnership[0]; // Initial investment of savings
  for (let t = 1; t <= YEARS; t++) {
    // Previous balance grows at this year's return rate, plus new savings added
    investiceValue[t] = investiceValue[t - 1] * (1 + investReturn[t]) + savedVsOwnership[t];
  }

  // ============================================
  // FINAL NET WORTH
  // ============================================
  const netWorthRentPlusInvestice = investiceValue[YEARS]; // Scenario B
  const netWorthOwnFlat = propertyValue[YEARS];             // Scenario A

  return {
    years,
    rentAnnual,
    savedVsOwnership,
    investiceValue,
    ownershipCosts,
    propertyValue,
    remainingDebt,
    mortgagePaymentsAnnual,
    taxAnnual,
    repairFundAnnual,
    insuranceAnnualSeries,
    maintenanceAnnual,
    netWorthRentPlusInvestice,
    netWorthOwnFlat,
  };
}


