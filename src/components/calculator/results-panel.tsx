"use client";

import { useState } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { CalculatorState } from "@/app/page";

import { ComparisonBar } from "./ComparisonBar";
import { RangeBarVisualization } from "./RangeBarVisualization";

interface BydleniFixedResult {
  netWorthRentPlusETF: number;
  netWorthOwnFlat: number;
  years: number[];
  rentAnnual: number[];
  savedVsOwnership: number[];
  etfValue: number[];
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
  resultsMode: "realistic" | "fixed";
  setResultsMode: (mode: "realistic" | "fixed") => void;
  onEditSettings: () => void;
  calculationResults: BydleniFixedResult | null;
}

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  return (
    <span 
      key={value}
      className="calc-result-value"
      style={{
        animation: "result-fade 1000ms ease-out",
      }}
    >
      {value.toLocaleString("cs-CZ")} Kč
    </span>
  );
}

// Internal component for Unified Scenario Block
function ScenarioBlock({
  label,
  value,
  color,
  percentage,
  tooltipContent,
}: {
  label: string;
  value: number;
  color: string;
  percentage: number;
  tooltipContent: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      {/* Header Row */}
      <div className="flex items-center gap-2 relative">
        <div 
          className="h-2 w-2 shrink-0 rounded-full" 
          style={{ background: color }} 
        />
        <h3 className="text-sm font-medium text-slate-700 font-uiSans">
          {label}
        </h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200/60 text-slate-500 transition-colors hover:bg-slate-300 hover:text-slate-700 focus:outline-none"
          aria-label={`Info about ${label}`}
        >
          <Info className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
        
        {/* Tooltip Popover */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <div className="absolute left-0 top-full mt-2 w-64 z-20 rounded-xl border border-slate-100 bg-white p-3 shadow-lg text-xs text-slate-600 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
              {tooltipContent}
            </div>
          </>
        )}
      </div>

      {/* Number */}
      <div className="pl-0">
        <AnimatedNumber value={Math.round(value)} />
      </div>

      {/* Visual Bar (Unified) */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 mt-1">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
}

export function ResultsPanel({
  state,
  resultsMode,
  setResultsMode,
  onEditSettings,
  calculationResults,
}: ResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Both modes use the same calculation results from the fixed calculation
  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthOwnFlat;
    scenarioBResult = calculationResults.netWorthRentPlusETF;
  }

  const maxValue = Math.max(scenarioAResult, scenarioBResult) || 1;
  const percentageA = (scenarioAResult / maxValue) * 100;
  const percentageB = (scenarioBResult / maxValue) * 100;

  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  return (
    <div
      id="vysledek"
      className="space-y-6 -mx-4 rounded-none border-none bg-[var(--bg-lilac-section)] p-4 py-8 shadow-none md:mx-0 md:space-y-8 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-6 md:py-8 md:shadow-[var(--shadow-card)]"
    >
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="calc-section-title text-xl md:text-2xl">
          Porovnání čistého jmění za 30 let
        </h2>
        <p className="font-uiSans text-sm leading-relaxed text-slate-500">
          Porovnání vašeho předpokládaného majetku (po odečtení dluhů) ve dvou životních situacích.
        </p>
      </div>

      {canViewResults ? (
        <div className="space-y-8">
          {/* Results summary - Only for fixed mode */}
          {resultsMode === "fixed" && (
            <div className="flex flex-col">
              {/* Scenario A Block */}
              <ScenarioBlock 
                label="Scénář A: Vlastní bydlení na hypotéku"
                value={scenarioAResult}
                color="var(--scenario-a-dot)"
                percentage={percentageA}
                tooltipContent="Koupíte byt. Vložíte vlastní zdroje a zbytek splácíte bance. Po 30 letech vlastníte nemovitost bez dluhů."
              />

              {/* Spacer - reduced from mb-6 to mb-5 */}
              <div className="mb-5" />

              {/* Scenario B Block */}
              <ScenarioBlock 
                label="Scénář B: Bydlení v nájmu a investování"
                value={scenarioBResult}
                color="var(--scenario-b-dot)"
                percentage={percentageB}
                tooltipContent="Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio."
              />
            </div>
          )}

          {/* Visual Comparison (Realistic Mode) */}
          {resultsMode === "realistic" && (
            <div>
              <RangeBarVisualization />
            </div>
          )}
        </div>
      ) : (
        <div
          className="rounded-lg p-6"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <p className="font-uiSans text-sm text-center leading-relaxed text-[var(--color-secondary)]">
            Vyber město a velikost bytu pro zobrazení výsledků
          </p>
        </div>
      )}

      {/* Methodology Footer */}
      <div className="pt-4 mt-auto">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="group flex w-full items-center justify-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900 font-uiSans"
        >
          <span className="underline decoration-slate-400 decoration-1 underline-offset-4 transition-colors group-hover:decoration-slate-900">
            Metodika výpočtu
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover:text-slate-900" />
        </button>
        
        {isMethodologyOpen && (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 space-y-3 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            <p>
              Výpočet porovnává čisté jmění po 30 letech. Zohledňuje růst cen nemovitostí, inflaci, růst nájmů a výnosy z investic (ETF).
            </p>
            <p>
              Scénář A předpokládá splacení hypotéky. Scénář B předpokládá investování rozdílu mezi náklady na bydlení a hypotékou.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
