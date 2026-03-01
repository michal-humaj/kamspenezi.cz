/**
 * Tipping Points — Investice Results Card
 *
 * Computes:
 *  1. Winner statement (which scenario wins and by how much)
 *  2. Three tipping-point sentences (what input change would flip the result)
 *
 * Shares binary search and margin helpers with the Bydlení engine via
 * tipping-points-shared.ts. Only the model adapter, realistic thresholds,
 * and copy strings differ.
 */

import type { InvesticeCalculatorState } from "@/app/investice/page";
import {
  calculateInvesticeFixed,
  type InputsInvesticeFixed,
} from "./investice-fixed";
import {
  fmtCzk,
  fmtPct,
  fmtMillions,
  formatMargin,
  roundTippingPointValue,
  findFlipValue,
  type InsightResult,
  type TippingPoint,
  type MarginTier,
} from "./tipping-points-shared";

// ---------------------------------------------------------------------------
// State → model inputs adapter
// ---------------------------------------------------------------------------

function stateToBaseInputs(state: InvesticeCalculatorState): InputsInvesticeFixed {
  return {
    purchasePrice: state.kupniCena,
    parentsContribution: state.prispevekRodicu,
    ownFundsRatio: state.vlastniZdroje / 100,
    furnishingOneOff: state.zarizeniNemovitosti,
    rentMonthly: state.najemne,
    occupancyRate: state.obsazenost / 100,
    repairFundMonthly: state.fondOprav,
    insuranceAnnual: state.pojisteniNemovitosti,
    propertyTaxAnnual: state.danZNemovitosti,
    maintenanceBaseKc: state.nakladyUdrzba,
    costInflationAnnual: state.ocekavanaInflace / 100,
    taxRate: state.pasmoDane / 100,
    propertyGrowthAnnual: state.rustHodnotyExpected / 100,
    rentGrowthAnnual: state.rustNajemnehoExpected / 100,
    investiceReturnAnnual: state.vynosInvesticeExpected / 100,
    mortgageRateAnnual: state.urokovaSazbaHypoteky / 100,
    mortgageRateFuture: state.urokovaSazbaHypotekyExpected / 100,
  };
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function computeInvesticeTippingPoints(
  state: InvesticeCalculatorState
): InsightResult | null {
  const baseInputs = stateToBaseInputs(state);

  const runModel = (overrides: Partial<InputsInvesticeFixed>) => {
    const r = calculateInvesticeFixed({ ...baseInputs, ...overrides });
    return { valueA: r.netWorthScenarioA, valueB: r.netWorthScenarioB };
  };

  const { valueA, valueB } = runModel({});

  if (valueA === valueB) return null;

  // ── Margin ────────────────────────────────────────────────────────────────
  const winner: "A" | "B" = valueA >= valueB ? "A" : "B";
  const winnerValue = winner === "A" ? valueA : valueB;
  const loserValue = winner === "A" ? valueB : valueA;
  const marginPct = Math.round(((winnerValue - loserValue) / loserValue) * 100);

  // Near-equal by headline margin — skip binary searches entirely
  if (marginPct < 10) {
    return {
      winner,
      marginPct,
      marginTier: "near-equal",
      winnerStatement: "Obě investice vedou na srovnatelný výsledek.",
      toneSetter: "",
      orderedTippingPoints: [],
    };
  }

  const currentRent = baseInputs.rentMonthly;
  const currentEtf = baseInputs.investiceReturnAnnual;
  const currentAppr = baseInputs.propertyGrowthAnnual;
  const currentPrice = baseInputs.purchasePrice;

  // ── Tipping points (always computed when margin >= 10 %) ──────────────────
  let rawTps: TippingPoint[];

  if (winner === "A") {
    // TP1 — Rent: lower rent hurts A (less income), gives B more ETF contributions
    const { flipValue: flipRent, converged: rentConv } = findFlipValue(
      (rent) => runModel({ rentMonthly: rent }),
      0,
      currentRent
    );
    const flipRentR = roundTippingPointValue(flipRent, "czk_monthly");
    const rentRealistic = rentConv && flipRentR >= currentRent * 0.6;

    // TP2 — ETF return: higher return helps B
    const { flipValue: flipEtf, converged: etfConv } = findFlipValue(
      (etf) => runModel({ investiceReturnAnnual: etf }),
      currentEtf,
      0.2
    );
    const flipEtfR = roundTippingPointValue(flipEtf, "pct");
    const etfRealistic = etfConv && flipEtfR <= 0.105;

    // TP3 — Property appreciation: lower appreciation hurts A
    const { flipValue: flipAppr, converged: apprConv } = findFlipValue(
      (appr) => runModel({ propertyGrowthAnnual: appr }),
      -0.1,
      currentAppr
    );
    const flipApprR = roundTippingPointValue(flipAppr, "pct");
    const apprRealistic = apprConv && flipApprR >= 0;

    const rawTpsA: TippingPoint[] = [];
    if (rentRealistic) {
      rawTpsA.push({
        key: "rent",
        relDist: Math.abs(flipRent - currentRent) / (currentRent || 1),
        sentence: `– nájem z bytu byl jen ${fmtCzk(flipRentR)}/měsíc`,
      });
    }
    rawTpsA.push({
      key: "etf",
      relDist: Math.abs(flipEtf - currentEtf) / (currentEtf || 0.001),
      sentence: `– akciový fond vynášel přes ${fmtPct(flipEtfR)} ročně`,
      badge: !etfRealistic,
    });
    if (apprRealistic) {
      rawTpsA.push({
        key: "appr",
        relDist: Math.abs(flipAppr - currentAppr) / Math.abs(currentAppr || 0.001),
        sentence: `– nemovitosti rostly méně než ${fmtPct(flipApprR)} ročně`,
      });
    }
    rawTps = rawTpsA;
  } else {
    // TP1 — Purchase price: lower price helps A (smaller mortgage)
    const { flipValue: flipPrice, converged: priceConv } = findFlipValue(
      (price) => runModel({ purchasePrice: price }),
      0,
      currentPrice
    );
    const flipPriceR = roundTippingPointValue(flipPrice, "czk_millions");
    const priceRealistic = priceConv && flipPriceR >= currentPrice * 0.8;

    // TP2 — ETF return: lower return hurts B
    const { flipValue: flipEtf, converged: etfConv } = findFlipValue(
      (etf) => runModel({ investiceReturnAnnual: etf }),
      0,
      currentEtf
    );
    const flipEtfR = roundTippingPointValue(flipEtf, "pct");
    const etfRealistic = etfConv && flipEtfR >= 0.04;

    // TP3 — Property appreciation: higher appreciation helps A
    const { flipValue: flipAppr, converged: apprConv } = findFlipValue(
      (appr) => runModel({ propertyGrowthAnnual: appr }),
      currentAppr,
      0.2
    );
    const flipApprR = roundTippingPointValue(flipAppr, "pct");
    const apprRealistic = apprConv && flipApprR <= 0.08;

    const rawTpsB: TippingPoint[] = [];
    if (priceRealistic) {
      rawTpsB.push({
        key: "price",
        relDist: Math.abs(flipPrice - currentPrice) / (currentPrice || 1),
        sentence: `– cena bytu byla pod ${fmtMillions(flipPriceR)}`,
      });
    }
    rawTpsB.push({
      key: "etf",
      relDist: Math.abs(flipEtf - currentEtf) / (currentEtf || 0.001),
      sentence: `– akciový fond vynášel méně než ${fmtPct(flipEtfR)} ročně`,
      badge: !etfRealistic,
    });
    rawTpsB.push({
      key: "appr",
      relDist: Math.abs(flipAppr - currentAppr) / Math.abs(currentAppr || 0.001),
      sentence: `– nemovitosti rostly přes ${fmtPct(flipApprR)} ročně`,
      badge: !apprRealistic,
    });
    rawTps = rawTpsB;
  }

  // ── Sort all tipping points by relative distance (closest flip first) ──
  const orderedTps = rawTps.slice().sort((a, b) => a.relDist - b.relDist);

  // ── Fragility check ────────────────────────────────────────────────────────
  const closestRelDist = rawTps.reduce(
    (min, tp) => Math.min(min, tp.relDist),
    Infinity
  );
  const isFragile = closestRelDist < 0.05;

  if (isFragile) {
    return {
      winner,
      marginPct,
      marginTier: "near-equal",
      winnerStatement: "Obě investice vedou na srovnatelný výsledek.",
      toneSetter: "",
      orderedTippingPoints: [],
    };
  }

  // ── Final tier and copy ────────────────────────────────────────────────────
  const marginTier: MarginTier = marginPct <= 40 ? "moderate" : "strong";

  const winnerStatement =
    winner === "A"
      ? `Investiční byt vychází ${formatMargin(marginPct)} než akciový fond.`
      : `Akciový fond vychází ${formatMargin(marginPct)} než investiční byt.`;

  const toneSetter =
    marginTier === "moderate"
      ? "Co by výsledek změnilo:"
      : "Změnit by ji mohlo jen toto:";

  return {
    winner,
    marginPct,
    marginTier,
    winnerStatement,
    toneSetter,
    orderedTippingPoints: orderedTps,
  };
}
