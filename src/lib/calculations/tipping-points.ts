/**
 * Tipping Points — Bydlení Results Card
 *
 * Computes:
 *  1. Winner statement (which scenario wins and by how much)
 *  2. Three tipping-point sentences (what input change would flip the result)
 *
 * All logic is pure / synchronous. At 180 model calls × <1ms each the total
 * cost is well within a single useMemo tick.
 */

import type { CalculatorState } from "@/app/page";
import {
  calculateBydleniFixed,
  type InputsBydleniFixed,
} from "./bydleni-fixed";
import {
  fmtCzk,
  fmtPct,
  fmtMillions,
  formatMargin,
  roundTippingPointValue,
  findFlipValue,
  type MarginTier,
  type TippingPoint,
  type InsightResult,
} from "./tipping-points-shared";

export type { MarginTier, TippingPoint, InsightResult };

// ---------------------------------------------------------------------------
// Build base inputs from CalculatorState
// ---------------------------------------------------------------------------

function stateToBaseInputs(state: CalculatorState): InputsBydleniFixed {
  return {
    purchasePrice: state.kupniCena,
    parentsContribution: state.prispevekRodicu,
    mortgageRateAnnual: state.urokovaSazbaHypoteky / 100,
    mortgageRateFuture: state.urokovaSazbaHypotekyExpected / 100,
    ownFundsRatio: state.vlastniZdroje / 100,
    furnishingOneOff: state.zarizeniNemovitosti,
    propertyGrowthAnnual: state.rustHodnotyExpected / 100,
    repairFundMonthly: state.fondOprav,
    insuranceAnnual: state.pojisteniNemovitosti,
    propertyTaxAnnual: state.danZNemovitosti,
    maintenanceBaseKc: state.nakladyUdrzba,
    costInflationAnnual: state.ocekavanaInflace / 100,
    rentGrowthAnnual: state.rustNajemnehoExpected / 100,
    rentMonthly: state.najemne,
    investiceReturnAnnual: state.vynosInvesticeExpected / 100,
  };
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function computeTippingPoints(state: CalculatorState): InsightResult | null {
  const baseInputs = stateToBaseInputs(state);

  const runModel = (overrides: Partial<InputsBydleniFixed>) => {
    const r = calculateBydleniFixed({ ...baseInputs, ...overrides });
    return { valueA: r.netWorthOwnFlat, valueB: r.netWorthRentPlusInvestice };
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
      winnerStatement: "Oba scénáře vedou na srovnatelný výsledek.",
      toneSetter: "",
      orderedTippingPoints: [],
    };
  }

  // Current values (as decimals where applicable)
  const currentRent = baseInputs.rentMonthly;
  const currentEtf = baseInputs.investiceReturnAnnual;
  const currentAppr = baseInputs.propertyGrowthAnnual;
  const currentPrice = baseInputs.purchasePrice;

  // ── Tipping points (always computed when margin >= 10 %) ──────────────────
  let rawTps: TippingPoint[];

  if (winner === "A") {
    const { flipValue: flipRent, converged: rentConv } = findFlipValue(
      (rent) => runModel({ rentMonthly: rent }),
      0,
      currentRent
    );
    const flipRentR = roundTippingPointValue(flipRent, "czk_monthly");
    const rentRealistic = rentConv && flipRentR >= currentRent * 0.6;

    const { flipValue: flipEtf, converged: etfConv } = findFlipValue(
      (etf) => runModel({ investiceReturnAnnual: etf }),
      currentEtf,
      0.2
    );
    const flipEtfR = roundTippingPointValue(flipEtf, "pct");
    const etfRealistic = etfConv && flipEtfR <= 0.105;

    const { flipValue: flipAppr, converged: apprConv } = findFlipValue(
      (appr) => runModel({ propertyGrowthAnnual: appr }),
      -0.1,
      currentAppr
    );
    const flipApprR = roundTippingPointValue(flipAppr, "pct");
    const apprRealistic = apprConv && flipApprR >= 0;

    rawTps = [
      {
        key: "rent",
        relDist: Math.abs(flipRent - currentRent) / (currentRent || 1),
        sentence: rentRealistic
          ? `– nájem pod ${fmtCzk(flipRentR)}/měsíc (teď: ${fmtCzk(currentRent)})`
          : "– ani výrazně nižší nájem by výsledek neobrátil",
      },
      {
        key: "etf",
        relDist: Math.abs(flipEtf - currentEtf) / (currentEtf || 0.001),
        sentence: etfRealistic
          ? `– akciový fond vynášející přes ${fmtPct(flipEtfR)} ročně`
          : `– akciový fond by musel vynášet ${fmtPct(flipEtfR)} ročně, mimo reálný rozsah`,
      },
      {
        key: "appr",
        relDist: Math.abs(flipAppr - currentAppr) / Math.abs(currentAppr || 0.001),
        sentence: apprRealistic
          ? `– zhodnocení nemovitosti pod ${fmtPct(flipApprR)} ročně`
          : "– ani nulový růst cen nemovitostí výsledek neobrátí",
      },
    ].sort((a, b) => a.relDist - b.relDist);
  } else {
    const { flipValue: flipPrice, converged: priceConv } = findFlipValue(
      (price) => runModel({ purchasePrice: price }),
      0,
      currentPrice
    );
    const flipPriceR = roundTippingPointValue(flipPrice, "czk_millions");
    const priceRealistic = priceConv && flipPriceR >= currentPrice * 0.8;

    const { flipValue: flipEtf, converged: etfConv } = findFlipValue(
      (etf) => runModel({ investiceReturnAnnual: etf }),
      0,
      currentEtf
    );
    const flipEtfR = roundTippingPointValue(flipEtf, "pct");
    const etfRealistic = etfConv && flipEtfR >= 0.04;

    const { flipValue: flipAppr, converged: apprConv } = findFlipValue(
      (appr) => runModel({ propertyGrowthAnnual: appr }),
      currentAppr,
      0.2
    );
    const flipApprR = roundTippingPointValue(flipAppr, "pct");
    const apprRealistic = apprConv && flipApprR <= 0.08;

    rawTps = [
      {
        key: "price",
        relDist: Math.abs(flipPrice - currentPrice) / (currentPrice || 1),
        sentence: priceRealistic
          ? `– byt do ${fmtMillions(flipPriceR)}`
          : "– ani výrazně levnější byt by výsledek neobrátil",
      },
      {
        key: "etf",
        relDist: Math.abs(flipEtf - currentEtf) / (currentEtf || 0.001),
        sentence: etfRealistic
          ? `– akciový fond s výnosem pod ${fmtPct(flipEtfR)} ročně`
          : "– portfolio vede i při velmi pesimistickém výnosu akciového fondu",
      },
      {
        key: "appr",
        relDist: Math.abs(flipAppr - currentAppr) / Math.abs(currentAppr || 0.001),
        sentence: apprRealistic
          ? `– zhodnocení nemovitosti přes ${fmtPct(flipApprR)} ročně`
          : `– výsledek by obrátilo jen výjimečné zhodnocení: ${fmtPct(flipApprR)} ročně`,
      },
    ].sort((a, b) => a.relDist - b.relDist);
  }

  // ── Fragility check ────────────────────────────────────────────────────────
  // If the closest flip requires < 5 % relative change, treat as near-equal.
  const closestRelDist = rawTps[0]?.relDist ?? Infinity;
  const isFragile = closestRelDist < 0.05;

  if (isFragile) {
    return {
      winner,
      marginPct,
      marginTier: "near-equal",
      winnerStatement: "Oba scénáře vedou na srovnatelný výsledek.",
      toneSetter: "",
      orderedTippingPoints: [],
    };
  }

  // ── Final tier and copy ────────────────────────────────────────────────────
  const marginTier: MarginTier = marginPct <= 40 ? "moderate" : "strong";

  const winnerStatement =
    winner === "A"
      ? `Vlastní bydlení vychází ${formatMargin(marginPct)}.`
      : `Nájem a investice vychází ${formatMargin(marginPct)}.`;

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
    orderedTippingPoints: rawTps,
  };
}
