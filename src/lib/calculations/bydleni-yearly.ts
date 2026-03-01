/**
 * Bydlení Yearly Calculation Engine
 *
 * Side-fund model (no withdrawals):
 *   Scenario A: when rent > ownership costs, surplus goes into a side fund (ETF rate).
 *   Scenario B: when ownership costs > rent, surplus goes into the ETF portfolio.
 *   Neither side ever withdraws from its fund.
 */

import { FV, recalculateMortgagePayment } from "./mortgage-math";

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
  propertyGrowthSeries: number[];    // rustHodnotyNemovitosti[t]
  rentGrowthSeries: number[];        // rustNajemneho[t]
  investiceReturnSeries: number[];   // vynosInvestice[t]
  mortgageRateSeries: number[];      // urokovaSazbaHypoteky[t]
};

/**
 * Result from yearly calculation engine.
 * Contains full time series and final net worth values.
 */
export type YearlyEngineResult = {
  // Full time series (length 31: years 0-30)
  years: number[];
  rentAnnual: number[];
  ownershipCosts: number[];
  propertyValue: number[];
  remainingDebt: number[];
  mortgagePaymentsAnnual: number[];
  taxAnnual: number[];
  repairFundAnnual: number[];
  insuranceAnnualSeries: number[];
  maintenanceAnnual: number[];
  taxSavingAnnual: number[];      // Annual mortgage interest tax deduction (§15 ZDP)

  // Side fund model arrays
  savingsA: number[];             // Annual surplus from Scenario A (rent > costs) → side fund
  sideFundA: number[];            // Accumulated Scenario A side fund (ETF compounding)
  savingsB: number[];             // Annual surplus from Scenario B (costs > rent) → ETF portfolio
  portfolioB: number[];           // Scenario B ETF portfolio value

  // Key outputs
  netWorthRentPlusInvestice: number; // Scenario B final value = portfolioB[30]
  netWorthOwnFlat: number;           // Scenario A final value = propertyValue[30] - debt[30] + sideFundA[30]
};

/**
 * Main yearly calculation engine.
 * Side-fund model: neither scenario ever withdraws from its investment portfolio.
 */
export function calculateBydleniYearly(inputs: YearlyEngineInputs): YearlyEngineResult {
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

  const propGrowth = inputs.propertyGrowthSeries;
  const rentGrowth = inputs.rentGrowthSeries;
  const investReturn = inputs.investiceReturnSeries;
  const mortgageRate = inputs.mortgageRateSeries;

  const loanAmount = purchasePrice * (1 - ownFundsRatio);

  // Pre-allocate arrays
  const years: number[] = new Array(YEARS + 1);
  const rentAnnual: number[] = new Array(YEARS + 1);
  const ownershipCosts: number[] = new Array(YEARS + 1);
  const propertyValue: number[] = new Array(YEARS + 1);
  const remainingDebt: number[] = new Array(YEARS + 1);
  const mortgagePaymentsAnnual: number[] = new Array(YEARS + 1);
  const taxAnnual: number[] = new Array(YEARS + 1);
  const repairFundAnnual: number[] = new Array(YEARS + 1);
  const insuranceAnnualSeries: number[] = new Array(YEARS + 1);
  const maintenanceAnnual: number[] = new Array(YEARS + 1);
  const taxSavingAnnual: number[] = new Array(YEARS + 1);
  const savingsA: number[] = new Array(YEARS + 1);
  const sideFundA: number[] = new Array(YEARS + 1);
  const savingsB: number[] = new Array(YEARS + 1);
  const portfolioB: number[] = new Array(YEARS + 1);

  for (let t = 0; t <= YEARS; t++) years[t] = t;

  // ============================================
  // PROPERTY VALUE (Scenario A asset)
  // ============================================
  propertyValue[0] = purchasePrice;
  for (let t = 1; t <= YEARS; t++) {
    propertyValue[t] = propertyValue[t - 1] * (1 + propGrowth[t]);
  }

  // ============================================
  // MORTGAGE with dynamic refix
  // ============================================
  let currentMonthlyPayment = recalculateMortgagePayment(loanAmount, mortgageRate[1], 30);
  let currentRate = mortgageRate[1];

  remainingDebt[0] = loanAmount;
  mortgagePaymentsAnnual[0] = 0;

  for (let t = 1; t <= YEARS; t++) {
    const yearRate = mortgageRate[t];
    if (t > 1 && yearRate !== currentRate) {
      currentMonthlyPayment = recalculateMortgagePayment(
        remainingDebt[t - 1],
        yearRate,
        YEARS - t + 1
      );
      currentRate = yearRate;
    }
    const monthlyRate = currentRate / 12;
    remainingDebt[t] = FV(monthlyRate, 12, currentMonthlyPayment, -remainingDebt[t - 1]);
    if (remainingDebt[t] < 1) remainingDebt[t] = 0;
    mortgagePaymentsAnnual[t] = currentMonthlyPayment * 12;
  }

  // ============================================
  // OWNERSHIP COSTS
  // ============================================
  taxAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    taxAnnual[t] = t === 1 ? propertyTaxAnnual : taxAnnual[t - 1] * (1 + costInflationAnnual);
  }

  repairFundAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    repairFundAnnual[t] = t === 1 ? repairFundMonthly * 12 : repairFundAnnual[t - 1] * (1 + costInflationAnnual);
  }

  insuranceAnnualSeries[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    insuranceAnnualSeries[t] = t === 1 ? insuranceAnnual : insuranceAnnualSeries[t - 1] * (1 + costInflationAnnual);
  }

  maintenanceAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    maintenanceAnnual[t] = maintenanceBaseKc * Math.pow(1 + costInflationAnnual, t - 1);
  }

  // Year 0: initial cash outlay (down payment + furnishing - parents contribution)
  taxSavingAnnual[0] = 0;
  ownershipCosts[0] = purchasePrice - loanAmount + furnishingOneOff - parentsContribution;

  for (let t = 1; t <= YEARS; t++) {
    const annualInterestPaid = mortgagePaymentsAnnual[t] - (remainingDebt[t - 1] - remainingDebt[t]);
    const taxSaving = Math.min(Math.max(annualInterestPaid, 0), 150_000) * taxRate;
    taxSavingAnnual[t] = taxSaving;

    ownershipCosts[t] =
      mortgagePaymentsAnnual[t] +
      taxAnnual[t] +
      repairFundAnnual[t] +
      insuranceAnnualSeries[t] +
      maintenanceAnnual[t] -
      taxSaving;
  }

  // ============================================
  // RENT (Scenario B cost)
  // ============================================
  rentAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    rentAnnual[t] = t === 1 ? rentMonthly * 12 : rentAnnual[t - 1] * (1 + rentGrowth[t]);
  }

  // ============================================
  // SIDE FUND MODEL (no withdrawals)
  // ============================================
  // Year 0: handle the initial cash outlay symmetrically.
  //   Normal case (outlay > 0): Scenario B mirrors the same outlay into ETF; Scenario A side fund starts empty.
  //   Parents cover everything (outlay <= 0): Scenario A has surplus → goes into side fund; Scenario B invests nothing.
  const initialOutlay = ownershipCosts[0];
  if (initialOutlay >= 0) {
    savingsA[0] = 0;
    sideFundA[0] = 0;
    savingsB[0] = initialOutlay;
    portfolioB[0] = savingsB[0];
  } else {
    // Parents contribution exceeds all year-0 costs → Scenario A pockets the surplus
    savingsA[0] = -initialOutlay;
    sideFundA[0] = savingsA[0];
    savingsB[0] = 0;
    portfolioB[0] = 0;
  }

  for (let t = 1; t <= YEARS; t++) {
    const surplus = ownershipCosts[t] - rentAnnual[t];
    // When costs > rent: Scenario B invests the difference
    savingsB[t] = Math.max(0, surplus);
    // When rent > costs: Scenario A invests the difference into side fund
    savingsA[t] = Math.max(0, -surplus);

    sideFundA[t] = sideFundA[t - 1] * (1 + investReturn[t]) + savingsA[t];
    portfolioB[t] = portfolioB[t - 1] * (1 + investReturn[t]) + savingsB[t];
  }

  // ============================================
  // FINAL NET WORTH
  // ============================================
  const netWorthOwnFlat =
    propertyValue[YEARS] - remainingDebt[YEARS] + sideFundA[YEARS]; // Scenario A
  const netWorthRentPlusInvestice = portfolioB[YEARS];               // Scenario B

  return {
    years,
    rentAnnual,
    ownershipCosts,
    propertyValue,
    remainingDebt,
    mortgagePaymentsAnnual,
    taxAnnual,
    repairFundAnnual,
    insuranceAnnualSeries,
    maintenanceAnnual,
    taxSavingAnnual,
    savingsA,
    sideFundA,
    savingsB,
    portfolioB,
    netWorthRentPlusInvestice,
    netWorthOwnFlat,
  };
}
