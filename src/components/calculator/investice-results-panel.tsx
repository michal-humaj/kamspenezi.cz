"use client";

import React from "react";
import { formatLargeCurrency, formatCzk } from "@/lib/format";
import { useState, useMemo } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { InvesticeCalculatorState } from "@/app/investice/page";
import { ShareButton } from "./ShareButton";
import { computeInvesticeTippingPoints } from "@/lib/calculations/investice-tipping-points";
import { fmt } from "@/lib/calculations/tipping-points-shared";
import { calculateIRR } from "@/lib/calculations/irr";
import { ResultsSparkline } from "./ResultsSparkline";

interface InvesticeFixedResult {
  netWorthScenarioA: number;
  netWorthScenarioB: number;
  propertyValue: number[];
  sideFundValue: number[];
  remainingDebt: number[];
  etfPortfolioValue: number[];
  netCashflowAnnual: number[];
}

interface InvesticeResultsPanelProps {
  state: InvesticeCalculatorState;
  calculationResults: InvesticeFixedResult | null;
  copyShareUrl?: () => Promise<boolean>;
  netWorthA?: number[];
  netWorthB?: number[];
}

// Animated number
function AnimatedNumber({ value }: { value: number }) {
  const roundedValue = Math.round(value);
  const displayValue = formatLargeCurrency(roundedValue);
  const fullValue = formatCzk(roundedValue);

  return (
    <span
      key={roundedValue}
      title={`Přesná hodnota: ${fullValue} Kč`}
      style={{ animation: "result-fade 1000ms ease-out" }}
    >
      {displayValue}
    </span>
  );
}

// Inline split tooltip for the "Nemovitost + vedlejší fond" asset label
function SplitTooltipLabel({
  propertyVal,
  sideFundVal,
}: {
  propertyVal: number;
  sideFundVal: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center gap-1">
      <button
        onClick={() => setOpen(!open)}
        className="font-uiSans text-[13px] font-medium text-[#6B7280] hover:text-gray-900 transition-colors focus:outline-none"
        aria-label="Zobrazit rozpad hodnoty"
      >
        Nemovitost + vedlejší fond
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 z-20 w-max rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-lg text-xs text-slate-700 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
            Nemovitost: {fmt(Math.round(propertyVal), "czk")}
            <span className="mx-1.5 text-slate-300">·</span>
            Vedlejší fond: {fmt(Math.round(sideFundVal), "czk")}
          </div>
        </>
      )}
    </span>
  );
}

// Scenario block
function ScenarioBlock({
  label, value, color, tooltipContent, assetLabel, irr, grossYield, isWinner,
}: {
  label: string; value: number; color: string;
  tooltipContent: string; assetLabel: string | React.ReactNode;
  irr?: number | null;
  grossYield?: number | null;
  isWinner: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIrrOpen, setIsIrrOpen] = useState(false);
  const [isYieldOpen, setIsYieldOpen] = useState(false);

  const numberStyle: React.CSSProperties = isWinner
    ? { fontSize: 48, fontWeight: 700, color: "#111827", lineHeight: 1 }
    : { fontSize: 36, fontWeight: 400, color: "#9CA3AF", lineHeight: 1 };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 relative">
        <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
        >
          <h3 className="font-uiSans font-semibold text-gray-700 group-hover:text-gray-900" style={{ fontSize: 15 }}>{label}</h3>
          <Info className="w-5 h-5 stroke-[2px] text-gray-700 group-hover:text-[var(--color-primary)] transition-colors" />
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10 md:hidden" onClick={() => setIsOpen(false)} />
            <div className="absolute left-0 top-full mt-2 w-64 z-20 rounded-xl border border-slate-100 bg-white p-4 shadow-lg text-sm text-slate-700 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
              {tooltipContent}
            </div>
          </>
        )}
      </div>
      <div className="font-displaySerif" style={numberStyle}>
        <AnimatedNumber value={Math.round(value)} />
      </div>
      <p className="font-uiSans text-[13px] font-medium text-[#6B7280]">{assetLabel}</p>
      {(typeof irr === "number" || typeof grossYield === "number") && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {typeof irr === "number" && (
            <div className="relative inline-flex items-center gap-1">
              <span className="font-uiSans text-[13px] text-[#6B7280]">
                Skutečný výnos: {(irr * 100).toFixed(1).replace(".", ",")} % ročně
              </span>
              <button
                onClick={() => setIsIrrOpen(!isIrrOpen)}
                onMouseEnter={() => setIsIrrOpen(true)}
                onMouseLeave={() => setIsIrrOpen(false)}
                className="inline-flex items-center focus:outline-none"
                aria-label="Více informací o skutečném výnosu"
              >
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-[var(--color-primary)] transition-colors" />
              </button>
              {isIrrOpen && (
                <>
                  <div className="fixed inset-0 z-10 md:hidden" onClick={() => setIsIrrOpen(false)} />
                  <div className="absolute left-0 top-full mt-1 z-20 w-72 rounded-xl border border-slate-100 bg-white p-4 shadow-lg text-sm text-slate-700 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
                    Skutečný roční výnos investičního bytu včetně zhodnocení nemovitosti, příjmů z nájmu a daňového efektu. Počítáno jako IRR za 30 let.
                  </div>
                </>
              )}
            </div>
          )}
          {typeof irr === "number" && typeof grossYield === "number" && (
            <span className="font-uiSans text-[13px] text-[#D1D5DB] select-none">·</span>
          )}
          {typeof grossYield === "number" && (
            <div className="relative inline-flex items-center gap-1">
              <span className="font-uiSans text-[13px] text-[#6B7280]">
                Výnosové procento: {grossYield.toFixed(1).replace(".", ",")} %
              </span>
              <button
                onClick={() => setIsYieldOpen(!isYieldOpen)}
                onMouseEnter={() => setIsYieldOpen(true)}
                onMouseLeave={() => setIsYieldOpen(false)}
                className="inline-flex items-center focus:outline-none"
                aria-label="Více informací o výnosovém procentu"
              >
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-[var(--color-primary)] transition-colors" />
              </button>
              {isYieldOpen && (
                <>
                  <div className="fixed inset-0 z-10 md:hidden" onClick={() => setIsYieldOpen(false)} />
                  <div className="absolute left-0 top-full mt-1 z-20 w-72 rounded-xl border border-slate-100 bg-white p-4 shadow-lg text-sm text-slate-700 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
                    Hrubé výnosové procento — roční nájemné v roce 0 děleno kupní cenou. Nezohledňuje náklady, daně ani zhodnocení nemovitosti.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function InvesticeResultsPanel({
  state,
  calculationResults,
  copyShareUrl,
  netWorthA,
  netWorthB,
}: InvesticeResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthScenarioA;
    scenarioBResult = calculationResults.netWorthScenarioB;
  }

  // Determine winner — null = no results (both render at full weight)
  const winnerScenario: "A" | "B" | "tie" | null = calculationResults
    ? scenarioAResult > scenarioBResult
      ? "A"
      : scenarioAResult < scenarioBResult
      ? "B"
      : "tie"
    : null;

  const insight = useMemo(() => {
    if (!calculationResults) return null;
    return computeInvesticeTippingPoints(state);
  }, [state, calculationResults]);

  const irrA = useMemo(() => {
    if (!calculationResults) return null;
    const { netCashflowAnnual, propertyValue, remainingDebt, sideFundValue, etfPortfolioValue } = calculationResults;
    const n = 30;
    const initial = etfPortfolioValue[0];
    const cf = netCashflowAnnual.map((ncf, t) => {
      const outflow = Math.min(0, ncf);
      if (t === 0) return -initial;
      if (t === n) return outflow + (propertyValue[n] - remainingDebt[n]) + sideFundValue[n];
      return outflow;
    });
    return calculateIRR(cf);
  }, [calculationResults]);

  const propertyVal30 = calculationResults?.propertyValue[30] ?? 0;
  const sideFundVal30 = calculationResults?.sideFundValue[30] ?? 0;

  // Gross yield: annual rent (year 0) / purchase price × 100
  const grossYieldPercent = useMemo(() => {
    if (!calculationResults || !state.kupniCena) return null;
    return (state.najemne * 12) / state.kupniCena * 100;
  }, [state.najemne, state.kupniCena, calculationResults]);

  const hasSparkline =
    netWorthA && netWorthB && netWorthA.length === 31 && netWorthB.length === 31;

  return (
    <div
      className="result-card-shadow rounded-none border-t border-gray-100 md:border-0 px-4 py-6 md:mx-0 md:rounded-[24px] md:bg-white md:p-8"
    >
      {/* Heading */}
      <div className="mb-2">
        <h2 className="section-title mb-0">Čisté jmění za 30 let</h2>
      </div>

      {/* Winner sentence — 14px, regular, colored */}
      {insight && (
        <p
          className="font-uiSans mb-4"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: insight.winner === "A"
              ? "var(--scenario-a-dot)"
              : insight.winner === "B"
              ? "var(--scenario-b-dot)"
              : "var(--color-secondary)",
          }}
        >
          {insight.winnerStatement}
        </p>
      )}

      {/* Scenario rows */}
      <div className="flex flex-col">
        <ScenarioBlock
          label="Investiční byt"
          value={scenarioAResult}
          color="var(--scenario-a-dot)"
          tooltipContent="Koupíte investiční byt na hypotéku a pronajímáte ho. Po 30 letech vlastníte nemovitost bez dluhů + vedlejší fond z čistého cashflow."
          assetLabel={
            <SplitTooltipLabel
              propertyVal={propertyVal30}
              sideFundVal={sideFundVal30}
            />
          }
          irr={irrA}
          grossYield={grossYieldPercent}
          isWinner={winnerScenario !== "B"}
        />
        {/* 28px gap between scenario rows */}
        <div style={{ height: 28 }} />
        <ScenarioBlock
          label="Akciový fond"
          value={scenarioBResult}
          color="var(--scenario-b-dot)"
          tooltipContent="Místo nemovitosti investujete stejnou počáteční hotovost do globálního akciového ETF. Po 30 letech máte investiční portfolio."
          assetLabel="Hodnota akciového portfolia"
          isWinner={winnerScenario !== "A"}
        />
      </div>

      {/* Sparkline — shared, no background or borders */}
      {hasSparkline && (
        <div className="mt-6">
          <ResultsSparkline
            netWorthA={netWorthA!}
            netWorthB={netWorthB!}
            legendA="Investiční byt"
            legendB="Akciový fond"
          />
        </div>
      )}

      {/* Tipping points — 24px gap from sparkline, 20px internal top padding */}
      {insight && insight.orderedTippingPoints.length > 0 && (
        <div style={{ marginTop: 24, paddingTop: 20 }}>
          <p
            className="font-uiSans mb-2"
            style={{ fontSize: 14, color: "#6B7280", fontWeight: 400 }}
          >
            {insight.winner === "A"
              ? "Akciový fond by vyhrál, kdyby nastalo alespoň jedno z toho:"
              : "Investiční byt by vyhrál, kdyby nastalo alespoň jedno z toho:"}
          </p>
          <div className="flex flex-col gap-2">
            {insight.orderedTippingPoints.map((tp) => (
              <p key={tp.key} className="font-uiSans text-sm text-gray-500">
                {tp.sentence}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Metodika — plain text link */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="group inline-flex items-center gap-1 focus:outline-none"
          style={{ fontSize: 13, color: "#6B7280", fontWeight: 400, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span className="group-hover:underline">Metodika a vysvětlení pojmů</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
      {isMethodologyOpen && (
        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 space-y-2 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
          <p><strong>Scénář A:</strong> Koupíte investiční byt na hypotéku. Příjem z nájmu snížený o provozní náklady, úroky a odpisy se daní. Čistý cashflow se investuje do ETF (vedlejší fond).</p>
          <p><strong>Scénář B:</strong> Stejnou hotovost investujete přímo do globálního akciového ETF.</p>
        </div>
      )}

      {/* Share — black pill */}
      {copyShareUrl && (
        <div className="mt-4 flex justify-center">
          <ShareButton onCopy={copyShareUrl} variant="pill" />
        </div>
      )}
    </div>
  );
}
