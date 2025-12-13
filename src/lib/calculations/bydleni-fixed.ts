/**
 * Bydlení Fixed Calculation - matches Google Sheets exactly
 */

type InputsBydleniFixed = {
  purchasePrice: number;          // O3
  parentsContribution: number;    // O4
  mortgageRateAnnual: number;     // O5 (Rate 1: Years 1-5)
  mortgageRateFuture: number;     // NEW (Rate 2: Years 6-30)
  ownFundsRatio: number;          // O6  e.g. 0.2 = 20 %
  furnishingOneOff: number;       // O7

  propertyGrowthAnnual: number;   // O9
  repairFundMonthly: number;      // O11
  insuranceAnnual: number;        // O12
  propertyTaxAnnual: number;      // O13
  maintenanceBaseKc: number;      // O14 - now in Kč per year, not percentage
  costInflationAnnual: number;    // O15

  rentGrowthAnnual: number;       // O17
  rentMonthly: number;            // O18
  etfReturnAnnual: number;        // O19
};

type BydleniFixedResult = {
  // full time series if needed for charts etc.
  years: number[];        // A3..A33
  rentAnnual: number[];   // B3..B33
  savedVsOwnership: number[]; // C3..C33
  etfValue: number[];     // D3..D33
  ownershipCosts: number[];   // E3..E33
  propertyValue: number[];    // F3..F33
  remainingDebt: number[];    // G3..G33
  mortgagePaymentsAnnual: number[]; // H3..H33
  taxAnnual: number[];         // I3..I33
  repairFundAnnual: number[];  // J3..J33
  insuranceAnnualSeries: number[]; // K3..K33
  maintenanceAnnual: number[]; // L3..L33

  // key outputs (match Excel)
  netWorthRentPlusETF: number; // D33
  netWorthOwnFlat: number;     // F33
};

// Matches Excel =PMT(rate, nper, pv)
// rate: monthly interest rate (annual / 12)
// nper: number of months
// pv: present value (loan amount, usually negative)
function PMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return -(pv / nper);
  const pvif = Math.pow(1 + rate, nper);
  return (rate * pv * pvif) / (pvif - 1);
}

// Matches Excel =FV(rate, nper, pmt, pv)
// rate: monthly interest rate
// nper: number of months
// pmt: monthly payment
// pv: present value (initial balance, usually negative)
function FV(rate: number, nper: number, pmt: number, pv: number): number {
  if (rate === 0) return -(pv + pmt * nper);
  const pvif = Math.pow(1 + rate, nper);
  return -((pv * pvif) + (pmt * (pvif - 1) / rate));
}

export function calculateBydleniFixed(inputs: InputsBydleniFixed): BydleniFixedResult {
  const YEARS = 30;

  // Map inputs to shorter local variables (1:1 k Excelu)
  const O3  = inputs.purchasePrice;
  const O4  = inputs.parentsContribution;
  const O5  = inputs.mortgageRateAnnual; // Rate 1
  const Rate2 = inputs.mortgageRateFuture; // Rate 2
  const O6  = inputs.ownFundsRatio;
  const O7  = inputs.furnishingOneOff;

  const O9  = inputs.propertyGrowthAnnual;
  const O11 = inputs.repairFundMonthly;
  const O12 = inputs.insuranceAnnual;
  const O13 = inputs.propertyTaxAnnual;
  const O14 = inputs.maintenanceBaseKc;
  const O15 = inputs.costInflationAnnual;

  const O17 = inputs.rentGrowthAnnual;
  const O18 = inputs.rentMonthly;
  const O19 = inputs.etfReturnAnnual;

  // Derived inputs that exist in Excel

  // O21 = O3 * (1 - O6)  = Výše hypotéky
  const O21 = O3 * (1 - O6); // Loan Amount (positive)

  // Two-Stage Mortgage Logic
  // Stage 1: Years 1-5 (Months 1-60) using Rate 1
  const r1 = O5 / 12;
  const n1 = 30 * 12; // 360 months
  const pv1 = -O21; // Present Value is negative Loan Amount
  
  // Monthly Payment for Stage 1 (matches Excel PMT)
  // This will be negative (cash flow out), so we negate it to get positive payment magnitude
  const pmt1 = -PMT(r1, n1, pv1);
  
  // Balance after 5 years (Month 60)
  // This will be positive (remaining debt)
  const balanceAfter5Years = FV(r1, 60, pmt1, pv1);

  // Stage 2: Years 6-30 (Months 61-360) using Rate 2
  const r2 = Rate2 / 12;
  const n2 = 25 * 12; // 300 months remaining
  const pv2 = -balanceAfter5Years; // New PV is negative of remaining balance

  // Monthly Payment for Stage 2
  const pmt2 = -PMT(r2, n2, pv2);

  // Prepare arrays indexed by "year index" t
  // t = 0 corresponds to row 3 in Excel (A3)
  const years: number[] = new Array(YEARS + 1);
  const rentAnnual: number[] = new Array(YEARS + 1);          // B
  const savedVsOwnership: number[] = new Array(YEARS + 1);    // C
  const etfValue: number[] = new Array(YEARS + 1);            // D
  const ownershipCosts: number[] = new Array(YEARS + 1);      // E
  const propertyValue: number[] = new Array(YEARS + 1);       // F
  const remainingDebt: number[] = new Array(YEARS + 1);       // G
  const mortgagePaymentsAnnual: number[] = new Array(YEARS + 1);  // H
  const taxAnnual: number[] = new Array(YEARS + 1);           // I
  const repairFundAnnual: number[] = new Array(YEARS + 1);    // J
  const insuranceAnnualSeries: number[] = new Array(YEARS + 1);   // K
  const maintenanceAnnual: number[] = new Array(YEARS + 1);   // L

  // 1) Years (A3..A33)
  for (let t = 0; t <= YEARS; t++) {
    years[t] = t; // A3 = 0, A4 = 1, ..., A33 = 30
  }

  // 2) Property value F (nemovitost roste o O9 p.a.)
  // F3 = $O$3 * (1+$O$9)^A3
  // F4..F33 = $O$3 * (1+$O$9)^A[row]
  for (let t = 0; t <= YEARS; t++) {
    propertyValue[t] = O3 * Math.pow(1 + O9, years[t]);
  }

  // 3) Remaining mortgage debt G (FV function)
  // 4) Mortgage payments H (Annual Sum)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      remainingDebt[t] = O21;
      mortgagePaymentsAnnual[t] = 0;
    } else if (t <= 5) {
      // Phase 1
      // Balance at end of year t (month t*12) using Rate 1
      remainingDebt[t] = FV(r1, t * 12, pmt1, pv1);
      mortgagePaymentsAnnual[t] = pmt1 * 12; // Positive cost
    } else {
      // Phase 2
      // Balance at end of year t. 
      // We start from balanceAfter5Years at month 0 of Phase 2.
      // Months passed in Phase 2 = (t - 5) * 12.
      const monthsInPhase2 = (t - 5) * 12;
      remainingDebt[t] = FV(r2, monthsInPhase2, pmt2, pv2);
      mortgagePaymentsAnnual[t] = pmt2 * 12; // Positive cost
    }
    
    // Safety check for very small negative numbers (floating point errors) at end of term
    if (remainingDebt[t] < 1) remainingDebt[t] = 0;
  }

  // 5) Tax I (Daň z nemovitosti)
  // I3 = 0
  // I4 = O13
  // I5..I33 = I[row-1] * (1+O$15)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      taxAnnual[t] = 0;
    } else if (t === 1) {
      taxAnnual[t] = O13;
    } else {
      taxAnnual[t] = taxAnnual[t - 1] * (1 + O15);
    }
  }

  // 6) Repair fund J (Fond oprav)
  // J3 = 0
  // J4 = O11 * 12
  // J5..J33 = J[row-1] * (1+O$15)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      repairFundAnnual[t] = 0;
    } else if (t === 1) {
      repairFundAnnual[t] = O11 * 12;
    } else {
      repairFundAnnual[t] = repairFundAnnual[t - 1] * (1 + O15);
    }
  }

  // 7) Insurance K (Pojištění nemovitosti)
  // K3 = 0
  // K4 = O12
  // K5..K33 = K[row-1] * (1+O$15)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      insuranceAnnualSeries[t] = 0;
    } else if (t === 1) {
      insuranceAnnualSeries[t] = O12;
    } else {
      insuranceAnnualSeries[t] = insuranceAnnualSeries[t - 1] * (1 + O15);
    }
  }

  // 8) Maintenance L (Náklady na údržbu)
  // L3 = 0
  // L4 = O14 (base Kč per year)
  // L5..L33 = O14 * (1+O$15)^(t-1) - inflated from base year
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      maintenanceAnnual[t] = 0;
    } else {
      // Apply inflation to base maintenance cost
      maintenanceAnnual[t] = O14 * Math.pow(1 + O15, t - 1);
    }
  }

  // 9) Ownership costs E (celkové roční náklady vlastnictví)
  // E3 = O3 - O21 + O7 - O4
  // E4..E33 = H[row] + I[row] + J[row] + K[row] + L[row]
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      ownershipCosts[t] = O3 - O21 + O7 - O4;
    } else {
      ownershipCosts[t] =
        mortgagePaymentsAnnual[t]
        + taxAnnual[t]
        + repairFundAnnual[t]
        + insuranceAnnualSeries[t]
        + maintenanceAnnual[t];
    }
  }

  // 10) Rent B (Nájem, roční)
  // B3 = 0
  // B4 = O18 * 12
  // B5..B33 = B[row-1] * (1+O$17)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      rentAnnual[t] = 0;
    } else if (t === 1) {
      rentAnnual[t] = O18 * 12;
    } else {
      rentAnnual[t] = rentAnnual[t - 1] * (1 + O17);
    }
  }

  // 11) Saved vs ownership C (Ušetřeno oproti vlastnictví)
  // C[row] = E[row] - B[row] for all rows (včetně 0)
  for (let t = 0; t <= YEARS; t++) {
    savedVsOwnership[t] = ownershipCosts[t] - rentAnnual[t];
  }

  // 12) ETF D (hodnota ETF portfolia)
  // D3 = C3
  // D4..D33 = D[row-1] * (1+O$19) + C[row]
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      etfValue[t] = savedVsOwnership[0];
    } else {
      etfValue[t] = etfValue[t - 1] * (1 + O19) + savedVsOwnership[t];
    }
  }

  // Výsledky jako v Excelu
  const netWorthRentPlusETF = etfValue[YEARS];    // D33
  const netWorthOwnFlat = propertyValue[YEARS];   // F33

  return {
    years,
    rentAnnual,
    savedVsOwnership,
    etfValue,
    ownershipCosts,
    propertyValue,
    remainingDebt,
    mortgagePaymentsAnnual,
    taxAnnual,
    repairFundAnnual,
    insuranceAnnualSeries,
    maintenanceAnnual,
    netWorthRentPlusETF,
    netWorthOwnFlat,
  };
}
