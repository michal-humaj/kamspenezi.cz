"use client";

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
      {/* Heading and Mode tabs */}
      <div className="space-y-3 md:space-y-4">
        <h2 className="calc-section-title text-xl md:text-2xl">
          Výsledek po 30 letech
        </h2>
        
        {/* Segmented control */}
        <div
          className="grid grid-cols-2 gap-0 rounded-[var(--radius-pill)] border p-[2px]"
          style={{ 
            background: "var(--toggle-bg-inactive)",
            borderColor: "var(--color-border)"
          }}
        >
          <button
            onClick={() => setResultsMode("realistic")}
            className="rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none"
            style={{
              background: resultsMode === "realistic" ? "var(--btn-primary-bg)" : "transparent",
              color: resultsMode === "realistic" ? "var(--btn-primary-text)" : "var(--color-secondary)",
              boxShadow: resultsMode === "realistic" ? "0 1px 3px rgba(15, 23, 42, 0.1)" : "none",
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
              background: resultsMode === "fixed" ? "var(--btn-primary-bg)" : "transparent",
              color: resultsMode === "fixed" ? "var(--btn-primary-text)" : "var(--color-secondary)",
              boxShadow: resultsMode === "fixed" ? "0 1px 3px rgba(15, 23, 42, 0.1)" : "none",
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
          : (
            <>
              Můžeš ověřit vzorce v našem{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=1260855363#gid=1260855363"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--color-primary)] underline decoration-1 underline-offset-2 transition-colors hover:text-[var(--color-primary-hover)]"
              >
                Google Sheetu
              </a>
            </>
          )}
      </p>

      {canViewResults ? (
        <>
          {/* Results summary */}
          <div className="space-y-5 md:space-y-6">
            {/* Scenario A */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--scenario-a-dot)" }}
                />
                <h3 className="calc-scenario-label">
                  Scénář A – Byt na hypotéku
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
                  Scénář B – Nájem + ETF
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
