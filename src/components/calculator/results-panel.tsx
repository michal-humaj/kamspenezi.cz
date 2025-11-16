"use client";

import { useEffect, useState } from "react";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

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
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      // Start number count animation
      const start = displayValue;
      const end = value;
      const duration = 300;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        const current = Math.round(start + (end - start) * easedProgress);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animate();
    }
  }, [value, displayValue]);

  return (
    <span 
      className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] md:text-4xl"
      style={{
        opacity: isAnimating ? 0.8 : 1,
        transition: "opacity 150ms ease-out",
      }}
    >
      {displayValue.toLocaleString("cs-CZ")} Kč
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
      className="space-y-5 rounded-none border-none bg-transparent p-4 shadow-none md:space-y-6 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-6 md:shadow-[var(--shadow-card)]"
    >
      {/* Mobile: Edit settings button */}
      <div className="md:hidden">
        <button
          onClick={onEditSettings}
          className="w-full rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none"
          style={{
            background: "var(--bg-card)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
            transitionDuration: "var(--transition-duration)",
            transitionTimingFunction: "var(--transition-easing)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(15,23,42,0.02)";
            e.currentTarget.style.borderColor = "var(--color-border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#9F7AEA";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(159, 122, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Upravit vstupy
        </button>
      </div>

      {/* Heading and Mode tabs */}
      <div className="space-y-3 md:space-y-4">
        <h2 className="font-displaySerif text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
          Výsledek po 30 letech
        </h2>
        
        {/* Segmented control */}
        <div
          className="grid grid-cols-2 gap-1 rounded-lg p-1"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <button
            onClick={() => setResultsMode("realistic")}
            className="rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none"
            style={{
              background: resultsMode === "realistic" ? "var(--color-primary)" : "transparent",
              color: resultsMode === "realistic" ? "#FFFFFF" : "var(--color-primary)",
              boxShadow: resultsMode === "realistic" ? "var(--shadow-card)" : "none",
              transitionDuration: "var(--transition-duration)",
              transitionTimingFunction: "var(--transition-easing)",
            }}
          >
            Realistický rozsah
          </button>
          <button
            onClick={() => setResultsMode("fixed")}
            className="rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none"
            style={{
              background: resultsMode === "fixed" ? "var(--color-primary)" : "transparent",
              color: resultsMode === "fixed" ? "#FFFFFF" : "var(--color-primary)",
              boxShadow: resultsMode === "fixed" ? "var(--shadow-card)" : "none",
              transitionDuration: "var(--transition-duration)",
              transitionTimingFunction: "var(--transition-easing)",
            }}
          >
            Pevný výpočet
          </button>
        </div>
      </div>

      {/* Mode description */}
      <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
        {resultsMode === "realistic"
          ? "Ukazujeme, jak se výsledek může lišit podle tržních podmínek"
          : "Můžeš ověřit vzorce v našem Google Sheetu"}
      </p>

      {canViewResults ? (
        <>
          {/* Results summary */}
          <div className="space-y-5 md:space-y-6">
            {/* Scenario A */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--scenario-a-dot)" }}
                />
                <h3 className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">
                  Scénář A: Byt na hypotéku
                </h3>
              </div>
              <AnimatedNumber value={Math.round(scenarioAResult)} />
            </div>

            {/* Scenario B */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--scenario-b-dot)" }}
                />
                <h3 className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">
                  Scénář B: Nájem + ETF
                </h3>
              </div>
              <AnimatedNumber value={Math.round(scenarioBResult)} />
            </div>
          </div>

          {/* Chart placeholder */}
          <div
            className="flex items-center justify-center rounded-[var(--radius-card)]"
            style={{
              minHeight: resultsMode === "realistic" ? "300px" : "120px",
              background: "var(--bg-lilac-section)",
              border: "1px dashed var(--color-border)",
            }}
          >
            <p className="font-uiSans text-sm text-[var(--color-secondary)]">
              {resultsMode === "realistic"
                ? "Box plot chart placeholder"
                : "Comparison bar placeholder"}
            </p>
          </div>
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
