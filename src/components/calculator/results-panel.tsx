"use client";

import { formatLargeCurrency, formatCzk } from "@/lib/format";
import { useState, useMemo } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { CalculatorState } from "@/app/page";
import { ShareButton } from "./ShareButton";
import { computeTippingPoints } from "@/lib/calculations/tipping-points";

interface BydleniFixedResult {
  netWorthRentPlusInvestice: number;
  netWorthOwnFlat: number;
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
}

interface ResultsPanelProps {
  state: CalculatorState;
  onEditSettings: () => void;
  calculationResults: BydleniFixedResult | null;
  copyShareUrl?: () => Promise<boolean>;
}

// Format millions - no trailing ,0 for integers
function formatMillions(value: number): string {
  const millions = value / 1_000_000;
  const isInteger = millions % 1 === 0;
  
  if (isInteger) {
    return new Intl.NumberFormat('cs-CZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(millions);
  }
  
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(millions);
}

// Scenario colors - use CSS custom properties for consistency
// These are defined in globals.css as --scenario-a-dot and --scenario-b-dot
const COLORS = {
  A: "var(--scenario-a-dot)", // Architectural Copper/Terracotta (#C2410C)
  B: "var(--scenario-b-dot)", // Forest Green (#2F5C45)
};


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

// Fixed mode scenario block
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
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export function ResultsPanel({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditSettings,
  calculationResults,
  copyShareUrl,
}: ResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthOwnFlat;
    scenarioBResult = calculationResults.netWorthRentPlusInvestice;
  }

  const maxValue = Math.max(scenarioAResult, scenarioBResult) || 1;
  const percentageA = (scenarioAResult / maxValue) * 100;
  const percentageB = (scenarioBResult / maxValue) * 100;

  const insight = useMemo(() => {
    if (!calculationResults) return null;
    return computeTippingPoints(state);
  }, [state, calculationResults]);

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

      <div className="mb-4" />

      <div className="flex flex-col">
        <ScenarioBlock 
          label="Scénář A: Vlastní bydlení na hypotéku"
          value={scenarioAResult}
          color="var(--scenario-a-dot)"
          percentage={percentageA}
          tooltipContent="Koupíte byt. Vložíte vlastní zdroje a zbytek splácíte bance. Po 30 letech vlastníte nemovitost bez dluhů."
          assetLabel="Hodnota nemovitosti"
        />
        <div className="my-6" />
        <ScenarioBlock 
          label="Scénář B: Bydlení v nájmu a investování"
          value={scenarioBResult}
          color="var(--scenario-b-dot)"
          percentage={percentageB}
          tooltipContent="Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio."
          assetLabel="Hodnota investičního portfolia"
        />
      </div>

      {/* Tipping points */}
      {insight && insight.orderedTippingPoints.length > 0 && (
        <div className="mt-6">
          <hr className="border-gray-200 mb-4" />
          <div className="flex flex-col gap-2">
            <p style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>
              {insight.winner === 'A'
                ? 'Nájem a investice by vyhrály, kdyby nastalo alespoň jedno z toho:'
                : 'Vlastní bydlení by vyhrálo, kdyby nastalo alespoň jedno z toho:'}
            </p>
            {insight.orderedTippingPoints.map((tp) => (
              <p key={tp.key} className="font-uiSans text-sm text-gray-600">
                {tp.sentence}
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
            <p><strong>Scénář A:</strong> Koupíte byt na hypotéku. Po 30 letech vlastníte nemovitost bez dluhů.</p>
            <p><strong>Scénář B:</strong> Bydlíte v nájmu a investujete vlastní zdroje i měsíční úspory do ETF portfolia.</p>
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
