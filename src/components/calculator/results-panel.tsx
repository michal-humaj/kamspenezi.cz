"use client";

import { useState } from "react";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

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

export function ResultsPanel({
  state,
  resultsMode,
  setResultsMode,
  onEditSettings,
  calculationResults,
}: ResultsPanelProps) {
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  // Both modes use the same calculation results from the fixed calculation
  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthOwnFlat;
    scenarioBResult = calculationResults.netWorthRentPlusETF;
  }

  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  return (
    <div
      id="vysledek"
      className="space-y-5 -mx-4 rounded-none border-none bg-[var(--bg-lilac-section)] p-4 py-8 shadow-none md:mx-0 md:space-y-6 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-6 md:py-6 md:shadow-[var(--shadow-card)]"
    >
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="calc-section-title text-xl md:text-2xl">
          Čisté jmění za 30 let
        </h2>
      </div>

      {/* Mode description & Explainer & Switcher */}
      <div className="space-y-2">
        <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
          Porovnání vašeho předpokládaného majetku (po odečtení dluhů) ve dvou životních situacích.
        </p>
        
        <div>
          <button
            onClick={() => setIsExplainerOpen(!isExplainerOpen)}
            className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            ℹ️ Jak tento výpočet funguje?
          </button>
          
          {isExplainerOpen && (
            <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 space-y-2 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
              <p>
                <span className="font-semibold text-slate-700">Scénář A:</span> Koupíte byt. Vložíte vlastní zdroje a zbytek splácíte bance. Po 30 letech vlastníte nemovitost bez dluhů.
              </p>
              <p>
                <span className="font-semibold text-slate-700">Scénář B:</span> Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio.
              </p>
            </div>
          )}
        </div>

        {/* Compact Mode Switcher */}
        <div className="pt-2">
           <div className="inline-flex w-full md:w-auto bg-slate-100 p-1 rounded-lg h-9">
             <button
               onClick={() => setResultsMode("realistic")}
               className={`flex-1 md:flex-none px-3 py-1 rounded-md text-xs font-medium transition-all ${
                 resultsMode === "realistic" 
                   ? "bg-white text-slate-900 shadow-sm" 
                   : "text-slate-500 hover:text-slate-700"
               }`}
             >
               Realistický rozsah
             </button>
             <button
               onClick={() => setResultsMode("fixed")}
               className={`flex-1 md:flex-none px-3 py-1 rounded-md text-xs font-medium transition-all ${
                 resultsMode === "fixed" 
                   ? "bg-white text-slate-900 shadow-sm" 
                   : "text-slate-500 hover:text-slate-700"
               }`}
             >
               Pevný výpočet
             </button>
           </div>
        </div>
      </div>

      {canViewResults ? (
        <>
          {/* Results summary - Only for fixed mode */}
          {resultsMode === "fixed" && (
            <div className="space-y-5 md:space-y-6">
              {/* Scenario A */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "var(--scenario-a-dot)" }}
                  />
                  <h3 className="calc-scenario-label">
                    Scénář A: Vlastní bydlení na hypotéku
                  </h3>
                </div>
                <AnimatedNumber value={Math.round(scenarioAResult)} />
              </div>

              {/* Scenario B */}
              <div className="space-y-1 mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: "var(--scenario-b-dot)" }}
                  />
                  <h3 className="calc-scenario-label">
                    Scénář B: Bydlení v nájmu a investování
                  </h3>
                </div>
                <AnimatedNumber value={Math.round(scenarioBResult)} />
              </div>
            </div>
          )}

          {/* Visual Comparison */}
          {resultsMode === "realistic" ? (
            <div className="mt-6">
              <RangeBarVisualization />
            </div>
          ) : (
            <div className="mt-6">
              <ComparisonBar 
                scenarioAValue={scenarioAResult} 
                scenarioBValue={scenarioBResult} 
              />
            </div>
          )}
        </>
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
    </div>
  );
}
