"use client";

import { Button } from "@/components/ui/button";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface ResultsPanelProps {
  state: CalculatorState;
  resultsMode: "realistic" | "fixed";
  setResultsMode: (mode: "realistic" | "fixed") => void;
  onEditSettings: () => void;
}

// Placeholder component for animated numbers (to be implemented later)
function AnimatedNumberPlaceholder({ value }: { value: number }) {
  // Format with spaces as thousand separators
  const formatted = value.toLocaleString("cs-CZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/,/g, " ");
  
  return (
    <span className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
      {formatted} Kč
    </span>
  );
}

export function ResultsPanel({
  state,
  resultsMode,
  setResultsMode,
  onEditSettings,
}: ResultsPanelProps) {
  // Simple placeholder calculation based on inputs
  // Scenario A: Mortgage - value grows with property appreciation
  const propertyValue = state.kupniCena * (1 + state.rustHodnotyNemovitosti / 100) ** 30;
  const downPayment = state.kupniCena * (state.vlastniZdroje / 100);
  const scenarioAResult = propertyValue - (state.kupniCena - downPayment) * 0.7; // Rough approximation
  
  // Scenario B: Rent + ETF - savings grow with ETF returns
  const monthlyDifference = (state.kupniCena * (1 - state.vlastniZdroje / 100) * (state.urokovaSazba / 100) / 12) - state.najemne;
  const monthlySavings = Math.max(0, monthlyDifference);
  const scenarioBResult = downPayment * (1 + state.etfVynos / 100) ** 30 + monthlySavings * 12 * 30 * (1 + state.etfVynos / 100) ** 15;

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
            border: "1px solid var(--btn-secondary-border)",
            color: "var(--btn-secondary-text)",
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

      {/* Heading and Mode tabs */}
      <div className="space-y-3">
        <h2 className="font-uiSans text-lg font-semibold text-[var(--color-primary)] md:text-xl">
          Výsledek po 30 letech
        </h2>
        <div
          className="grid grid-cols-2 gap-1 rounded-[var(--radius-pill)] p-1"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <button
            onClick={() => setResultsMode("realistic")}
            className="rounded-[var(--radius-pill)] px-3 py-2 font-uiSans text-sm font-medium transition-all"
            style={{
              background: resultsMode === "realistic" ? "var(--btn-primary-bg)" : "transparent",
              color: resultsMode === "realistic" ? "var(--btn-primary-text)" : "var(--color-primary)",
              boxShadow: resultsMode === "realistic" ? "var(--btn-primary-shadow)" : "none",
              transitionDuration: "var(--transition-duration)",
              transitionTimingFunction: "var(--transition-easing)",
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
              transitionDuration: "var(--transition-duration)",
              transitionTimingFunction: "var(--transition-easing)",
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
          <AnimatedNumberPlaceholder value={scenarioAResult} />
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
          <AnimatedNumberPlaceholder value={scenarioBResult} />
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
    </div>
  );
}
