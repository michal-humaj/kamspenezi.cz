"use client";

import { formatLargeCurrency, formatCzk } from "@/lib/format";
import { useState, useMemo } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { CalculatorState } from "@/app/page";
import { ShareButton } from "./ShareButton";
import { computeTippingPoints } from "@/lib/calculations/tipping-points";
import { ResultsSparkline } from "./ResultsSparkline";

interface BydleniFixedResult {
  netWorthRentPlusInvestice: number;
  netWorthOwnFlat: number;
  years: number[];
  rentAnnual: number[];
  ownershipCosts: number[];
  propertyValue: number[];
  remainingDebt: number[];
  mortgagePaymentsAnnual: number[];
  taxAnnual: number[];
  repairFundAnnual: number[];
  insuranceAnnualSeries: number[];
  maintenanceAnnual: number[];
  taxSavingAnnual: number[];
  savingsA: number[];
  sideFundA: number[];
  savingsB: number[];
  portfolioB: number[];
}

interface ResultsPanelProps {
  state: CalculatorState;
  onEditSettings: () => void;
  calculationResults: BydleniFixedResult | null;
  copyShareUrl?: () => Promise<boolean>;
  netWorthA?: number[];
  netWorthB?: number[];
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
  label, value, color, tooltipContent, assetLabel, isWinner,
}: {
  label: string; value: number; color: string;
  tooltipContent: string; assetLabel: string;
  isWinner: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const numberStyle: React.CSSProperties = isWinner
    ? { fontSize: 48, fontWeight: 700, color: "#111827", lineHeight: 1 }
    : { fontSize: 36, fontWeight: 400, color: "#9CA3AF", lineHeight: 1 };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 relative">
        <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
        >
          <h3 className="font-uiSans font-semibold text-gray-700 group-hover:text-gray-900" style={{ fontSize: 15 }}>{label}</h3>
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
      <div className="font-displaySerif" style={numberStyle}>
        <AnimatedNumber value={Math.round(value)} />
      </div>
      <p className="font-uiSans text-[13px] font-medium text-[#6B7280]">{assetLabel}</p>
    </div>
  );
}

export function ResultsPanel({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditSettings,
  calculationResults,
  copyShareUrl,
  netWorthA,
  netWorthB,
}: ResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthOwnFlat;
    scenarioBResult = calculationResults.netWorthRentPlusInvestice;
  }

  // Determine winner — null = no results (both render at full weight)
  const winnerScenario: "A" | "B" | "tie" | null = calculationResults
    ? scenarioAResult > scenarioBResult
      ? "A"
      : scenarioAResult < scenarioBResult
      ? "B"
      : "tie"
    : null;

  const insight = useMemo(() => {
    if (!calculationResults) return null;
    return computeTippingPoints(state);
  }, [state, calculationResults]);

  const hasSparkline =
    netWorthA && netWorthB && netWorthA.length === 31 && netWorthB.length === 31;

  return (
    <div
      className="result-card-shadow rounded-none border-t border-gray-100 md:border-0 px-4 py-6 md:mx-0 md:rounded-[24px] md:bg-white md:p-8"
    >
      {/* Heading */}
      <div className="mb-2">
        <h2 className="section-title mb-0">Čisté jmění za 30 let</h2>
      </div>

      {/* Winner sentence — 14px, regular, colored */}
      {insight && (
        <p
          className="font-uiSans mb-4"
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: insight.winner === "A"
              ? "var(--scenario-a-dot)"
              : insight.winner === "B"
              ? "var(--scenario-b-dot)"
              : "var(--color-secondary)",
          }}
        >
          {insight.winnerStatement}
        </p>
      )}

      {/* Scenario rows */}
      <div className="flex flex-col">
        <ScenarioBlock
          label="Vlastní bydlení na hypotéku"
          value={scenarioAResult}
          color="var(--scenario-a-dot)"
          tooltipContent="Koupíte byt. Vložíte vlastní zdroje a zbytek splácíte bance. Po 30 letech vlastníte nemovitost bez dluhů."
          assetLabel="Nemovitost + vedlejší fond"
          isWinner={winnerScenario !== "B"}
        />
        {/* 28px gap between scenario rows */}
        <div style={{ height: 28 }} />
        <ScenarioBlock
          label="Bydlení v nájmu a investování"
          value={scenarioBResult}
          color="var(--scenario-b-dot)"
          tooltipContent="Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio."
          assetLabel="Hodnota investičního portfolia"
          isWinner={winnerScenario !== "A"}
        />
      </div>

      {/* Sparkline — shared, no background or borders */}
      {hasSparkline && (
        <div className="mt-6">
          <ResultsSparkline
            netWorthA={netWorthA!}
            netWorthB={netWorthB!}
            legendA="Vlastní bydlení"
            legendB="Nájem a investice"
          />
        </div>
      )}

      {/* Tipping points — 24px gap from sparkline, 20px internal top padding */}
      {insight && insight.orderedTippingPoints.length > 0 && (
        <div style={{ marginTop: 24, paddingTop: 20 }}>
          <p
            className="font-uiSans mb-2"
            style={{ fontSize: 14, color: "#6B7280", fontWeight: 400 }}
          >
            {insight.winner === "A"
              ? "Nájem a investice by vyhrály, kdyby nastalo alespoň jedno z toho:"
              : "Vlastní bydlení by vyhrálo, kdyby nastalo alespoň jedno z toho:"}
          </p>
          <div className="flex flex-col gap-2">
            {insight.orderedTippingPoints.map((tp) => (
              <p key={tp.key} className="font-uiSans text-sm text-gray-500">
                {tp.sentence}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Metodika — plain text link */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
          className="group inline-flex items-center gap-1 focus:outline-none"
          style={{ fontSize: 13, color: "#6B7280", fontWeight: 400, background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <span className="group-hover:underline">Metodika a vysvětlení pojmů</span>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
      {isMethodologyOpen && (
        <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 space-y-2 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
          <p><strong>Scénář A:</strong> Koupíte byt na hypotéku. Po 30 letech vlastníte nemovitost bez dluhů.</p>
          <p><strong>Scénář B:</strong> Bydlíte v nájmu a investujete vlastní zdroje i měsíční úspory do ETF portfolia.</p>
        </div>
      )}

      {/* Share — black pill */}
      {copyShareUrl && (
        <div className="mt-4 flex justify-center">
          <ShareButton onCopy={copyShareUrl} variant="pill" />
        </div>
      )}
    </div>
  );
}
