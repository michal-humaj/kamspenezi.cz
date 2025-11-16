"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface ResultsPanelProps {
  state: CalculatorState;
  resultsMode: "realistic" | "fixed";
  setResultsMode: (mode: "realistic" | "fixed") => void;
  onEditSettings: () => void;
}

// Animated number component with simple fade transition
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue]);

  return (
    <span 
      className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] transition-opacity md:text-4xl"
      style={{
        opacity: isAnimating ? 0.5 : 1,
        transitionDuration: "150ms",
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
}: ResultsPanelProps) {
  // Simple placeholder calculation - will be replaced with actual logic
  const downPayment = state.kupniCena * (state.vlastniZdroje / 100);
  const mortgage = state.kupniCena - downPayment;
  
  // Scenario A: Buy apartment
  // Simplified: property value after 30 years - total mortgage paid + equity
  const propertyGrowth = Math.pow(1 + state.rustHodnotyNemovitosti / 100, 30);
  const futurePropertyValue = state.kupniCena * propertyGrowth;
  const totalMortgageCost = mortgage * 1.8; // Simplified interest estimate
  const scenarioAResult = futurePropertyValue - totalMortgageCost;
  
  // Scenario B: Rent + invest
  // Simplified: invested savings grow in ETF
  const etfGrowth = Math.pow(1 + state.etfVynos / 100, 30);
  const monthlySavings = 5000; // Simplified assumption
  const monthlyInvestment = downPayment + (monthlySavings * 12 * 30);
  const scenarioBResult = monthlyInvestment * etfGrowth;

  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  return (
    <div
      id="vysledek"
      className="space-y-6 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-5 md:p-6"
      style={{ 
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Mobile: Edit settings button */}
      <div className="md:hidden">
        <button
          onClick={onEditSettings}
          className="w-full rounded-[var(--radius-pill)] px-4 py-2 font-uiSans text-sm font-medium transition-all"
          style={{
            background: "var(--btn-secondary-bg)",
            color: "var(--btn-secondary-text)",
            border: "1px solid var(--btn-secondary-border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--btn-secondary-hover-bg)";
            e.currentTarget.style.borderColor = "var(--btn-secondary-border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--btn-secondary-bg)";
            e.currentTarget.style.borderColor = "var(--btn-secondary-border)";
          }}
        >
          Upravit vstupy
        </button>
      </div>

      {/* Mode tabs */}
      <div className="space-y-3">
        <h2 className="font-displaySerif text-xl font-bold text-[var(--color-primary)] md:text-2xl">
          Výsledek po 30 letech
        </h2>
        <div
          className="grid grid-cols-2 gap-2 rounded-lg p-1"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <button
            onClick={() => setResultsMode("realistic")}
            className="rounded-[var(--radius-pill)] px-3 py-2 font-uiSans text-sm font-medium transition-all"
            style={{
              background: resultsMode === "realistic" ? "var(--btn-primary-bg)" : "transparent",
              color: resultsMode === "realistic" ? "var(--btn-primary-text)" : "var(--color-primary)",
              boxShadow: resultsMode === "realistic" ? "var(--btn-primary-shadow)" : "none",
            }}
          >
            Realistický rozsah
          </button>
          <button
            onClick={() => setResultsMode("fixed")}
            className="rounded-[var(--radius-pill)] px-3 py-2 font-uiSans text-sm font-medium transition-all"
            style={{
              background: resultsMode === "fixed" ? "var(--btn-primary-bg)" : "transparent",
              color: resultsMode === "fixed" ? "var(--btn-primary-text)" : "var(--color-primary)",
              boxShadow: resultsMode === "fixed" ? "var(--btn-primary-shadow)" : "none",
            }}
          >
            Pevný výpočet
          </button>
        </div>
      </div>

      {/* Mode description */}
      <p className="font-uiSans text-sm text-[var(--color-secondary)]">
        {resultsMode === "realistic"
          ? "Ukazujeme, jak se výsledek může lišit podle tržních podmínek"
          : "Můžeš ověřit vzorce v našem Google Sheetu"}
      </p>

      {canViewResults ? (
        <>
          {/* Results summary */}
          <div className="space-y-6">
            {/* Scenario A */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--scenario-a-dot)" }}
                />
                <h3 className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">
                  Scénář A: Byt na hypotéku
                </h3>
              </div>
              <AnimatedNumber value={Math.round(scenarioAResult)} />
            </div>

            {/* Scenario B */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
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
            className="flex items-center justify-center rounded-lg"
            style={{
              height: resultsMode === "realistic" ? "300px" : "100px",
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
          className="rounded-lg p-4"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <p className="font-uiSans text-sm text-[var(--color-secondary)]">
            Vyber město a velikost bytu pro zobrazení výsledků
          </p>
        </div>
      )}
    </div>
  );
}
