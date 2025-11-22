/**
 * Bydlení Fixed Calculation - matches Google Sheets exactly
 */

type InputsBydleniFixed = {
  purchasePrice: number;          // O3
  parentsContribution: number;    // O4
  mortgageRateAnnual: number;     // O5
  ownFundsRatio: number;          // O6  e.g. 0.2 = 20 %
  furnishingOneOff: number;       // O7

  propertyGrowthAnnual: number;   // O9
  repairFundMonthly: number;      // O11
  insuranceAnnual: number;        // O12
  propertyTaxAnnual: number;      // O13
  maintenancePctAnnual: number;   // O14 - NOW IN CZK (renamed but keeping param name for compatibility)
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

// Helper functions to mirror Excel PMT and PV logic as used in this sheet
// Excel: O22 = PMT(O5/12, 30*12, -O21)
function computeMonthlyMortgagePayment(
  mortgageAmount: number,
  mortgageRateAnnual: number,
  years: number
): number {
  const r = mortgageRateAnnual / 12.0;
  const n = years * 12;
  // Equivalent to Excel: PMT(r, n, -mortgageAmount)
  // Returns positive monthly payment
  return mortgageAmount * r / (1 - Math.pow(1 + r, -n));
}

// Excel: G4 = PV($O$5/12, (30-$A4)*12, -$O$22)
function computeRemainingDebt(
  mortgageRateAnnual: number,
  monthlyPayment: number,
  yearsElapsed: number,
  totalYears: number
): number {
  const r = mortgageRateAnnual / 12.0;
  const remainingYears = totalYears - yearsElapsed;
  const n = remainingYears * 12;

  if (n === 0) {
    return 0; // at 30 years remaining debt is zero
  }

  // Equivalent to Excel PV(r, n, -monthlyPayment)
  // positive present value of remaining annuity
  return monthlyPayment * (1 - Math.pow(1 + r, -n)) / r;
}

export function calculateBydleniFixed(inputs: InputsBydleniFixed): BydleniFixedResult {
  const YEARS = 30;

  // Map inputs to shorter local variables (1:1 k Excelu)
  const O3  = inputs.purchasePrice;
  const O4  = inputs.parentsContribution;
  const O5  = inputs.mortgageRateAnnual;
  const O6  = inputs.ownFundsRatio;
  const O7  = inputs.furnishingOneOff;

  const O9  = inputs.propertyGrowthAnnual;
  const O11 = inputs.repairFundMonthly;
  const O12 = inputs.insuranceAnnual;
  const O13 = inputs.propertyTaxAnnual;
  const O14 = inputs.maintenancePctAnnual;
  const O15 = inputs.costInflationAnnual;

  const O17 = inputs.rentGrowthAnnual;
  const O18 = inputs.rentMonthly;
  const O19 = inputs.etfReturnAnnual;

  // Derived inputs that exist in Excel

  // O21 = O3 * (1 - O6)  = Výše hypotéky
  const O21 = O3 * (1 - O6);

  // O22 = PMT(O5/12, 30*12, -O21)  = Splátka hypotéky (měsíčně)
  const O22 = computeMonthlyMortgagePayment(O21, O5, YEARS);

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

  // 3) Remaining mortgage debt G (PV funkce v Excelu)
  // G3 = $O$21
  // G4..G33 = PV($O$5/12, (30-$A[row])*12, -$O$22)
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      remainingDebt[t] = O21;
    } else {
      remainingDebt[t] = computeRemainingDebt(O5, O22, years[t], YEARS);
    }
  }

  // 4) Mortgage payments H (roční součet)
  // H3 = 0
  // H4..H33 = 12 * $O$22
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      mortgagePaymentsAnnual[t] = 0;
    } else {
      mortgagePaymentsAnnual[t] = 12 * O22;
    }
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
  // NOW IN CZK: base amount indexed by cost inflation
  // L3 = 0
  // L4 = O14 (base CZK amount)
  // L5..L33 = O14 * (1+O15)^(t-1)
  const maintenanceBase = O14; // Base CZK amount
  for (let t = 0; t <= YEARS; t++) {
    if (t === 0) {
      maintenanceAnnual[t] = 0;
    } else {
      // Compound from base with cost inflation
      maintenanceAnnual[t] = maintenanceBase * Math.pow(1 + O15, t - 1);
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

