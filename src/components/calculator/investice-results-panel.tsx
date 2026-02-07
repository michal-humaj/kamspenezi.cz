"use client";

import { formatLargeCurrency, formatCzk } from "@/lib/format";
import { useState } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { InvesticeCalculatorState } from "@/app/investice/page";
import { ShareButton } from "./ShareButton";

interface InvesticeFixedResult {
  netWorthScenarioA: number;
  netWorthScenarioB: number;
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

// Scenario block
function ScenarioBlock({
  label, value, color, percentage, tooltipContent, assetLabel,
}: {
  label: string; value: number; color: string; percentage: number;
  tooltipContent: string; assetLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 relative">
        <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
        >
          <h3 className="font-uiSans text-base font-medium text-gray-700 group-hover:text-gray-900">{label}</h3>
          <Info className="w-5 h-5 stroke-[2px] text-gray-700 group-hover:text-[var(--color-primary)] transition-colors" />
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
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

  return (
    <div className="rounded-none border-t border-gray-100 md:border-0 px-4 py-6 shadow-none md:mx-0 md:rounded-[24px] md:bg-white md:p-8 md:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="section-title mb-0">
          Čisté jmění za 30 let
        </h2>
      </div>

      <div className="flex flex-col">
        <ScenarioBlock
          label="Scénář A: Investiční byt"
          value={scenarioAResult}
          color="var(--scenario-a-dot)"
          percentage={percentageA}
          tooltipContent="Koupíte investiční byt na hypotéku a pronajímáte ho. Po 30 letech vlastníte nemovitost bez dluhů + vedlejší fond z čistého cashflow."
          assetLabel="Nemovitost + vedlejší fond"
        />
        <div className="my-6" />
        <ScenarioBlock
          label="Scénář B: ETF portfolio"
          value={scenarioBResult}
          color="var(--scenario-b-dot)"
          percentage={percentageB}
          tooltipContent="Místo nemovitosti investujete stejnou počáteční hotovost do globálního akciového ETF. Po 30 letech máte investiční portfolio."
          assetLabel="Hodnota ETF portfolia"
        />
      </div>

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
            <p><strong>Odpisy:</strong> Rovnoměrné, kupní cena / 30 let.</p>
            <p><strong>Fixní scénář:</strong> Počítá s jednou sadou předpokladů bez náhodnosti.</p>
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
