/**
 * Investice Yearly Calculation Engine
 *
 * Core annual calculation engine for the Investment Property calculator.
 * Computes year-by-year (0-30):
 *   Scenario A: Buy investment property with mortgage, rent it out
 *   Scenario B: Invest the same initial capital into ETF portfolio
 *
 * Key differences from Bydlení:
 * - Rental INCOME (not cost) — the property earns money
 * - Occupancy rate applied to rental income
 * - Straight-line depreciation (purchasePrice / 30) for tax deduction
 * - Income tax on net rental profit (15% or 23%)
 * - Side fund: net cashflow from the property invested into ETFs
 * - No "poplatek při prodeji" (sale fee)
 */

import { PMT, FV, recalculateMortgagePayment } from "./mortgage-math";

const YEARS = 30;

// ============================================================================
// Types
// ============================================================================

export type InvesticeYearlyInputs = {
  // Static inputs
  purchasePrice: number;          // Kupní cena nemovitosti
  parentsContribution: number;    // Příspěvek rodičů (snižuje vlastní hotovost)
  ownFundsRatio: number;          // Vlastní zdroje jako podíl (0.1 = 10%)
  furnishingOneOff: number;       // Jednorázové vybavení bytu

  // Rental
  rentMonthly: number;            // Měsíční nájemné (base, year 1)
  occupancyRate: number;          // Obsazenost (0.0 – 1.0, e.g. 0.90 = 90%)

  // Operating costs
  repairFundMonthly: number;      // Fond oprav měsíčně
  insuranceAnnual: number;        // Pojištění ročně
  propertyTaxAnnual: number;      // Daň z nemovitosti ročně
  maintenanceBaseKc: number;      // Náklady na údržbu ročně (base)
  costInflationAnnual: number;    // Inflace nákladů (0.025 = 2.5%)

  // Tax
  taxRate: number;                // Sazba daně z příjmu (0.15 or 0.23)

  // Per-year arrays (length 31: index 0 = year 0, index 30 = year 30)
  propertyGrowthSeries: number[];   // Růst hodnoty nemovitosti [t]
  rentGrowthSeries: number[];       // Růst nájemného [t]
  investiceReturnSeries: number[];  // Výnos investic (ETF) [t]
  mortgageRateSeries: number[];     // Úroková sazba hypotéky [t]
};

export type InvesticeYearlyResult = {
  // Full time series (length 31: years 0-30)
  years: number[];

  // Scenario A arrays
  propertyValue: number[];
  rentIncomeAnnual: number[];       // Gross rental income (before occupancy is already applied)
  operatingCostsAnnual: number[];   // Sum of repair+insurance+tax+maintenance
  mortgagePaymentAnnual: number[];
  mortgagePrincipalPaid: number[];  // How much principal was paid off each year
  interestPaidAnnual: number[];     // Interest portion of mortgage payments
  remainingDebt: number[];
  depreciationAnnual: number[];     // Straight-line: purchasePrice / 30
  taxBaseAnnual: number[];          // rentIncome - opCosts - interest - depreciation
  incomeTaxAnnual: number[];        // max(0, taxBase) * taxRate
  netCashflowAnnual: number[];     // rentIncome - opCosts - mortgagePayment - incomeTax
  sideFundValue: number[];          // Accumulated side fund (cashflow invested in ETF)

  // Scenario A sub-costs for table
  repairFundAnnual: number[];
  insuranceAnnualSeries: number[];
  taxPropertyAnnual: number[];      // Property tax (daň z nemovitosti)
  maintenanceAnnual: number[];

  // Scenario B arrays
  etfPortfolioValue: number[];      // ETF-only portfolio

  // Key outputs
  netWorthScenarioA: number;        // Property value - debt + side fund
  netWorthScenarioB: number;        // ETF portfolio value
};

// ============================================================================
// Engine
// ============================================================================

export function calculateInvesticeYearly(inputs: InvesticeYearlyInputs): InvesticeYearlyResult {
  const {
    purchasePrice,
    parentsContribution,
    ownFundsRatio,
    furnishingOneOff,
    rentMonthly,
    occupancyRate,
    repairFundMonthly,
    insuranceAnnual,
    propertyTaxAnnual,
    maintenanceBaseKc,
    costInflationAnnual,
    taxRate,
  } = inputs;

  const propGrowth = inputs.propertyGrowthSeries;
  const rentGrowth = inputs.rentGrowthSeries;
  const investReturn = inputs.investiceReturnSeries;
  const mortgageRate = inputs.mortgageRateSeries;

  // Derived
  const loanAmount = purchasePrice * (1 - ownFundsRatio);
  const initialCashOutlay = purchasePrice * ownFundsRatio + furnishingOneOff - parentsContribution;
  const annualDepreciation = purchasePrice / YEARS; // straight-line over 30 years

  // Pre-allocate arrays
  const years = Array.from({ length: YEARS + 1 }, (_, i) => i);
  const propertyValue = new Array<number>(YEARS + 1);
  const rentIncomeAnnual = new Array<number>(YEARS + 1);
  const repairFundArr = new Array<number>(YEARS + 1);
  const insuranceArr = new Array<number>(YEARS + 1);
  const taxPropertyArr = new Array<number>(YEARS + 1);
  const maintenanceArr = new Array<number>(YEARS + 1);
  const operatingCostsAnnual = new Array<number>(YEARS + 1);
  const mortgagePaymentAnnual = new Array<number>(YEARS + 1);
  const mortgagePrincipalPaid = new Array<number>(YEARS + 1);
  const interestPaidAnnual = new Array<number>(YEARS + 1);
  const remainingDebt = new Array<number>(YEARS + 1);
  const depreciationAnnual = new Array<number>(YEARS + 1);
  const taxBaseAnnual = new Array<number>(YEARS + 1);
  const incomeTaxAnnual = new Array<number>(YEARS + 1);
  const netCashflowAnnual = new Array<number>(YEARS + 1);
  const sideFundValue = new Array<number>(YEARS + 1);
  const etfPortfolioValue = new Array<number>(YEARS + 1);

  // ============================
  // PROPERTY VALUE
  // ============================
  propertyValue[0] = purchasePrice;
  for (let t = 1; t <= YEARS; t++) {
    propertyValue[t] = propertyValue[t - 1] * (1 + propGrowth[t]);
  }

  // ============================
  // RENTAL INCOME (with occupancy)
  // ============================
  rentIncomeAnnual[0] = 0; // No income at year 0 (purchase year)
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      rentIncomeAnnual[t] = rentMonthly * 12 * occupancyRate;
    } else {
      // Base rent grows, then apply occupancy
      rentIncomeAnnual[t] = (rentIncomeAnnual[t - 1] / occupancyRate) * (1 + rentGrowth[t]) * occupancyRate;
    }
  }

  // ============================
  // OPERATING COSTS (grow with inflation)
  // ============================
  // Repair fund
  repairFundArr[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      repairFundArr[t] = repairFundMonthly * 12;
    } else {
      repairFundArr[t] = repairFundArr[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Insurance
  insuranceArr[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      insuranceArr[t] = insuranceAnnual;
    } else {
      insuranceArr[t] = insuranceArr[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Property tax
  taxPropertyArr[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    if (t === 1) {
      taxPropertyArr[t] = propertyTaxAnnual;
    } else {
      taxPropertyArr[t] = taxPropertyArr[t - 1] * (1 + costInflationAnnual);
    }
  }

  // Maintenance
  maintenanceArr[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    maintenanceArr[t] = maintenanceBaseKc * Math.pow(1 + costInflationAnnual, t - 1);
  }

  // Total operating costs
  operatingCostsAnnual[0] = 0;
  for (let t = 1; t <= YEARS; t++) {
    operatingCostsAnnual[t] =
      repairFundArr[t] +
      insuranceArr[t] +
      taxPropertyArr[t] +
      maintenanceArr[t];
  }

  // ============================
  // MORTGAGE
  // ============================
  let currentMonthlyPayment = 0;
  let currentRate = mortgageRate[1];

  if (loanAmount > 0) {
    currentMonthlyPayment = recalculateMortgagePayment(loanAmount, currentRate, YEARS);
  }

  remainingDebt[0] = loanAmount;
  mortgagePaymentAnnual[0] = 0;
  mortgagePrincipalPaid[0] = 0;
  interestPaidAnnual[0] = 0;

  for (let t = 1; t <= YEARS; t++) {
    const yearRate = mortgageRate[t];

    // Refix check
    if (t > 1 && yearRate !== currentRate && remainingDebt[t - 1] > 0) {
      const remainingYears = YEARS - t + 1;
      currentMonthlyPayment = recalculateMortgagePayment(
        remainingDebt[t - 1],
        yearRate,
        remainingYears
      );
      currentRate = yearRate;
    }

    if (remainingDebt[t - 1] <= 0) {
      remainingDebt[t] = 0;
      mortgagePaymentAnnual[t] = 0;
      mortgagePrincipalPaid[t] = 0;
      interestPaidAnnual[t] = 0;
      continue;
    }

    const monthlyRate = currentRate / 12;
    const startBalance = remainingDebt[t - 1];

    // Calculate remaining debt after 12 payments using FV
    const endBalance = FV(monthlyRate, 12, currentMonthlyPayment, -startBalance);
    remainingDebt[t] = endBalance < 1 ? 0 : endBalance;

    const totalPaid = currentMonthlyPayment * 12;
    mortgagePaymentAnnual[t] = totalPaid;

    // Principal paid = starting balance - ending balance
    const principalThisYear = startBalance - remainingDebt[t];
    mortgagePrincipalPaid[t] = principalThisYear;

    // Interest = total payments - principal
    interestPaidAnnual[t] = totalPaid - principalThisYear;
  }

  // ============================
  // DEPRECIATION & TAX
  // ============================
  // Tax-deductible costs: repair fund + insurance + property tax + interest + depreciation.
  // Maintenance (náklady na údržbu) is NOT included in the tax base per the Excel model,
  // but it IS included in cashflow as a real expense.
  depreciationAnnual[0] = 0;
  taxBaseAnnual[0] = 0;
  incomeTaxAnnual[0] = 0;

  for (let t = 1; t <= YEARS; t++) {
    depreciationAnnual[t] = annualDepreciation;

    // Tax-deductible operating costs (excludes maintenance)
    const deductibleOpCosts =
      repairFundArr[t] +
      insuranceArr[t] +
      taxPropertyArr[t];

    // Tax base = rental income - deductible operating costs - interest - depreciation
    const base =
      rentIncomeAnnual[t] -
      deductibleOpCosts -
      interestPaidAnnual[t] -
      depreciationAnnual[t];
    taxBaseAnnual[t] = base;

    // Tax only if base positive
    incomeTaxAnnual[t] = base > 0 ? base * taxRate : 0;
  }

  // ============================
  // NET CASHFLOW & SIDE FUND
  // ============================
  // Net cashflow = rental income - operating costs - mortgage payment - income tax
  // Side fund rule: ONLY positive cashflow goes into the side fund.
  // When cashflow is negative, the investor pays out of pocket — the side fund is never drawn down.
  netCashflowAnnual[0] = 0;
  sideFundValue[0] = 0;

  for (let t = 1; t <= YEARS; t++) {
    netCashflowAnnual[t] =
      rentIncomeAnnual[t] -
      operatingCostsAnnual[t] -
      mortgagePaymentAnnual[t] -
      incomeTaxAnnual[t];

    // Side fund grows at ETF rate; only positive cashflow is deposited
    sideFundValue[t] =
      sideFundValue[t - 1] * (1 + investReturn[t]) +
      Math.max(0, netCashflowAnnual[t]);
  }

  // ============================
  // SCENARIO B: ETF-ONLY PORTFOLIO
  // ============================
  // Fair comparison: the ETF investor starts with the same initial cash outlay.
  // Additionally, whenever the property investor pays out of pocket (negative cashflow),
  // the ETF investor invests that same amount into ETF. This ensures both scenarios
  // use the exact same total cash over 30 years.
  // When cashflow is positive (property earns money), no extra ETF investment is made.
  etfPortfolioValue[0] = initialCashOutlay;
  for (let t = 1; t <= YEARS; t++) {
    const outOfPocket = Math.max(0, -netCashflowAnnual[t]);
    etfPortfolioValue[t] =
      etfPortfolioValue[t - 1] * (1 + investReturn[t]) + outOfPocket;
  }

  // ============================
  // FINAL NET WORTH
  // ============================
  const netWorthScenarioA =
    propertyValue[YEARS] - remainingDebt[YEARS] + sideFundValue[YEARS];
  const netWorthScenarioB = etfPortfolioValue[YEARS];

  return {
    years,
    propertyValue,
    rentIncomeAnnual,
    operatingCostsAnnual,
    mortgagePaymentAnnual,
    mortgagePrincipalPaid,
    interestPaidAnnual,
    remainingDebt,
    depreciationAnnual,
    taxBaseAnnual,
    incomeTaxAnnual,
    netCashflowAnnual,
    sideFundValue,
    repairFundAnnual: repairFundArr,
    insuranceAnnualSeries: insuranceArr,
    taxPropertyAnnual: taxPropertyArr,
    maintenanceAnnual: maintenanceArr,
    etfPortfolioValue,
    netWorthScenarioA,
    netWorthScenarioB,
  };
}
