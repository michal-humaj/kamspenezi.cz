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
  assetLabel,
}: {
  label: string;
  value: number;
  color: string;
  percentage: number;
  tooltipContent: string;
  assetLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      {/* Header Row - Entire row is clickable */}
      <div className="flex items-center gap-2 relative">
        <div 
          className="h-2 w-2 shrink-0 rounded-full" 
          style={{ background: color }} 
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
          aria-label={`Info about ${label}`}
        >
          <h3 className="font-uiSans text-base font-semibold text-[var(--color-primary)] group-hover:text-gray-700">
            {label}
          </h3>
          <Info className="w-5 h-5 stroke-[2px] text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
        </button>
        
        {/* Tooltip Popover */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <div className="absolute left-0 top-full mt-2 w-64 z-20 rounded-xl border border-slate-100 bg-white p-4 shadow-lg text-sm text-slate-700 leading-relaxed animate-in fade-in zoom-in-95 duration-200">
              {tooltipContent}
            </div>
          </>
        )}
      </div>

      {/* Big Number */}
      <div className="pl-0 mb-1.5">
        <div className="font-displaySerif text-3xl font-semibold leading-none text-[var(--color-primary)]">
          <AnimatedNumber value={Math.round(value)} />
        </div>
      </div>

      {/* Asset Source Sub-Label */}
      <div className="pl-0 mb-3">
        <p className="font-uiSans text-[13px] font-medium text-[var(--color-secondary)]">
          {assetLabel}
        </p>
      </div>

      {/* Visual Bar (Unified) */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
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
        <h2 className="calc-section-title text-xl text-balance md:text-2xl">
          Porovnání čistého jmění za 30&nbsp;let
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
                assetLabel="Hodnota nemovitosti"
              />

              {/* Spacer - 24px gap between blocks */}
              <div className="my-6" />

              {/* Scenario B Block */}
              <ScenarioBlock 
                label="Scénář B: Bydlení v nájmu a investování"
                value={scenarioBResult}
                color="var(--scenario-b-dot)"
                percentage={percentageB}
                tooltipContent="Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio."
                assetLabel="Hodnota investičního portfolia"
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
        <div className="flex justify-center">
          <button
            onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
            className="group inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-4 py-1.5 font-uiSans text-xs font-medium text-[var(--color-secondary)] transition-colors hover:bg-gray-100"
          >
            <span>Metodika výpočtu</span>
            <ChevronRight className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-600" />
          </button>
        </div>
        
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
