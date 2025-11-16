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
  return (
    <span className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
      {value.toLocaleString("cs-CZ")} Kč
    </span>
  );
}

export function ResultsPanel({
  state,
  resultsMode,
  setResultsMode,
  onEditSettings,
}: ResultsPanelProps) {
  // Placeholder calculation - will be replaced with actual logic
  const scenarioAResult = state.kupniCena * 1.5;
  const scenarioBResult = state.kupniCena * 1.7;

  return (
    <div
      id="vysledek"
      className="space-y-6 rounded-2xl bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] md:p-6"
      style={{ border: "1px solid var(--color-border)" }}
    >
      {/* Mobile: Edit settings button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={onEditSettings}
          className="w-full font-uiSans text-sm"
        >
          Upravit nastavení
        </Button>
      </div>

      {/* Mode tabs */}
      <div className="space-y-2">
        <h2 className="font-uiSans text-lg font-semibold text-[var(--color-primary)] md:text-xl">
          Výsledek po 30 letech
        </h2>
        <div
          className="grid grid-cols-2 gap-2 rounded-lg p-1"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <button
            onClick={() => setResultsMode("realistic")}
            className="rounded-md px-3 py-2 font-uiSans text-sm font-medium transition-colors"
            style={{
              background: resultsMode === "realistic" ? "var(--bg-card)" : "transparent",
              color: "var(--color-primary)",
              boxShadow: resultsMode === "realistic" ? "var(--shadow-card)" : "none",
            }}
          >
            Realistický rozsah
          </button>
          <button
            onClick={() => setResultsMode("fixed")}
            className="rounded-md px-3 py-2 font-uiSans text-sm font-medium transition-colors"
            style={{
              background: resultsMode === "fixed" ? "var(--bg-card)" : "transparent",
              color: "var(--color-primary)",
              boxShadow: resultsMode === "fixed" ? "var(--shadow-card)" : "none",
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
              style={{ background: "var(--kp-scenario-a)" }}
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
              style={{ background: "var(--kp-scenario-b)" }}
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

      {/* Additional info */}
      {!state.selectedCity || !state.selectedApartmentSize ? (
        <div
          className="rounded-lg p-4"
          style={{ background: "var(--bg-lilac-section)" }}
        >
          <p className="font-uiSans text-sm text-[var(--color-secondary)]">
            Vyber město a velikost bytu pro zobrazení výsledků
          </p>
        </div>
      ) : null}
    </div>
  );
}

