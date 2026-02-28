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
      <span className="font-uiSans text-[13px] font-medium text-[var(--color-secondary)]">
        Nemovitost + vedlejší fond
      </span>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center focus:outline-none"
        aria-label="Zobrazit rozpad hodnoty"
      >
        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-[var(--color-primary)] transition-colors" />
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
  label, value, color, percentage, tooltipContent, assetLabel, irr,
}: {
  label: string; value: number; color: string; percentage: number;
  tooltipContent: string; assetLabel: string | React.ReactNode;
  irr?: number | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 relative">
        <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
        >
          <h3 className="font-uiSans text-base font-medium text-gray-700 group-hover:text-gray-900">{label}</h3>
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
      <div className="font-displaySerif text-3xl md:text-4xl font-semibold leading-none text-[var(--color-primary)]">
        <AnimatedNumber value={Math.round(value)} />
      </div>
      <p className="font-uiSans text-[13px] font-medium text-[var(--color-secondary)]">{assetLabel}</p>
      {typeof irr === "number" && (
        <p className="font-uiSans text-xs text-gray-400">
          Skutečný výnos: {(irr * 100).toFixed(1).replace(".", ",")} % ročně
        </p>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function InvesticeResultsPanel({
  state,
  calculationResults,
  copyShareUrl,
}: InvesticeResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthScenarioA;
    scenarioBResult = calculationResults.netWorthScenarioB;
  }

  const maxValue = Math.max(scenarioAResult, scenarioBResult) || 1;
  const percentageA = (scenarioAResult / maxValue) * 100;
  const percentageB = (scenarioBResult / maxValue) * 100;

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

  return (
    <div className="rounded-none border-t border-gray-100 md:border-0 px-4 py-6 shadow-none md:mx-0 md:rounded-[24px] md:bg-white md:p-8 md:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="mb-2">
        <h2 className="section-title mb-0">
          Čisté jmění za 30 let
        </h2>
      </div>

      {/* Winner statement */}
      {insight && (
        <p className={`font-uiSans text-base font-semibold mb-1 ${
          insight.winner === "A" ? "text-orange-700" :
          insight.winner === "B" ? "text-green-700"  :
          "text-gray-600"
        }`}>
          {insight.winnerStatement}
        </p>
      )}

      {insight && <div className="mb-4" />}

      <div className="flex flex-col">
        <ScenarioBlock
          label="Scénář A: Investiční byt"
          value={scenarioAResult}
          color="var(--scenario-a-dot)"
          percentage={percentageA}
          tooltipContent="Koupíte investiční byt na hypotéku a pronajímáte ho. Po 30 letech vlastníte nemovitost bez dluhů + vedlejší fond z čistého cashflow."
          assetLabel={
            <SplitTooltipLabel
              propertyVal={propertyVal30}
              sideFundVal={sideFundVal30}
            />
          }
          irr={irrA}
        />
        <div className="my-6" />
        <ScenarioBlock
          label="Scénář B: Akciový fond"
          value={scenarioBResult}
          color="var(--scenario-b-dot)"
          percentage={percentageB}
          tooltipContent="Místo nemovitosti investujete stejnou počáteční hotovost do globálního akciového ETF. Po 30 letech máte investiční portfolio."
          assetLabel="Hodnota akciového portfolia"
        />
      </div>

      {/* Tipping points */}
      {insight && insight.orderedTippingPoints.length > 0 && (
        <div className="mt-6">
          <hr className="border-gray-200 mb-4" />
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>
              {insight.winner === 'A'
                ? 'Akciový fond by vyhrál, kdyby nastalo alespoň jedno z toho:'
                : 'Investiční byt by vyhrál, kdyby nastalo alespoň jedno z toho:'}
            </p>
            {insight.orderedTippingPoints.map((tp) => (
              <p key={tp.key} className="font-uiSans text-sm text-gray-600">
                {tp.sentence}
                {tp.badge && (
                  <span style={{
                    fontSize: 11,
                    color: '#9CA3AF',
                    background: '#F3F4F6',
                    borderRadius: 4,
                    padding: '1px 6px',
                    marginLeft: 6,
                  }}>
                    mimo reálný rozsah
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Methodology */}
      <div className="mt-6">
        <div className="flex justify-center">
          <button
            onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-4 py-2 font-uiSans text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none"
          >
            <span>Metodika a vysvětlení pojmů</span>
            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
          </button>
        </div>
        {isMethodologyOpen && (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 space-y-2 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            <p><strong>Scénář A:</strong> Koupíte investiční byt na hypotéku. Příjem z nájmu snížený o provozní náklady, úroky a odpisy se daní. Čistý cashflow se investuje do ETF (vedlejší fond).</p>
            <p><strong>Scénář B:</strong> Stejnou hotovost investujete přímo do globálního akciového ETF.</p>
          </div>
        )}
      </div>

      {/* Share Button */}
      {copyShareUrl && (
        <div className="mt-4 flex justify-center">
          <ShareButton onCopy={copyShareUrl} variant="small" />
        </div>
      )}
    </div>
  );
}
