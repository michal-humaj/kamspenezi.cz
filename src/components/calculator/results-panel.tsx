"use client";

import { formatLargeCurrency, formatCzk } from "@/lib/format";
import { useState, useMemo, useEffect } from "react";
import { Info, ChevronRight } from "lucide-react";
import type { CalculatorState } from "@/app/page";
import { ShareButton } from "./ShareButton";
import { 
  runMonteCarlo, 
  registerDebugMonteCarlo,
  type MonteCarloResult,
  type MonteCarloInputs,
} from "@/lib/calculations/monte-carlo-engine";

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

import type { CalculationMode } from "@/app/page";

interface ResultsPanelProps {
  state: CalculatorState;
  onEditSettings: () => void;
  calculationResults: BydleniFixedResult | null;
  copyShareUrl?: () => Promise<boolean>;
  onModeChange?: (mode: CalculationMode) => void;
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


// Swimlane Block - Label above, Numbers + Local Labels, Bar, Min/Max + Labels
function SwimlaneBlock({
  label,
  color,
  p10,
  median,
  p90,
  globalMax,
}: {
  label: string;
  color: string;
  p10: number;
  median: number;
  p90: number;
  globalMax: number;
}) {
  // Calculate positions as percentages of globalMax
  const minPct = (p10 / globalMax) * 100;
  const maxPct = (p90 / globalMax) * 100;
  const medianPct = (median / globalMax) * 100;
  const barWidth = maxPct - minPct;

  return (
    <div>
      {/* Row Header - Scenario Label */}
      <div className="flex items-center gap-1.5 mb-3">
        <div 
          className="h-2 w-2 rounded-full shrink-0" 
          style={{ backgroundColor: color }} 
        />
        <span className="font-uiSans text-sm font-semibold text-slate-700">
          {label}
        </span>
      </div>

      {/* Data Block */}
      <div className="mt-2">
        {/* Top-Label Layout: Label -> Number -> Bar */}
        <div className="text-center">
          {/* 1. Label (Top) */}
          <div className="mb-0">
            <span className="font-uiSans text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              Očekávaný výsledek
            </span>
          </div>
          {/* 2. Big Number */}
          <div className="mb-1">
            <span 
              className="font-uiSans text-2xl font-bold tabular-nums"
              style={{ color: color }}
            >
              {formatMillions(median)} mil. Kč
            </span>
          </div>
        </div>

        {/* 3. Chart Bar */}
        <div className="relative h-4 w-full">
          <div
            className="absolute top-0 h-full rounded-full"
            style={{
              left: `${minPct}%`,
              width: `${barWidth}%`,
              backgroundColor: color,
            }}
          />
          {/* Median marker - white vertical line */}
          <div
            className="absolute top-0 h-full"
            style={{ 
              left: `${medianPct}%`, 
              transform: "translateX(-50%)",
            }}
          >
            <div 
              className="w-0.5 h-full bg-white rounded-full"
              style={{ boxShadow: "0 0 2px rgba(0,0,0,0.3)" }}
            />
          </div>
        </div>

        {/* Min/Max Numbers + Labels - Below bar */}
        <div className="flex justify-between mt-1.5">
          {/* Min with label */}
          <div className="text-left">
            <span className="font-uiSans text-xs text-slate-500 tabular-nums">
              {formatMillions(p10)} mil.
            </span>
            <div className="mt-0.5">
              <span className="font-uiSans text-xs font-medium text-slate-500 uppercase tracking-wider">
                Pesimistický
              </span>
            </div>
          </div>
          
          {/* Max with label */}
          <div className="text-right">
            <span className="font-uiSans text-xs text-slate-500 tabular-nums">
              {formatMillions(p90)} mil.
            </span>
            <div className="mt-0.5">
              <span className="font-uiSans text-xs font-medium text-slate-500 uppercase tracking-wider">
                Optimistický
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Monte Carlo Results Component
function MonteCarloResults({ data }: { data: MonteCarloResult }) {
  const probA = Math.round(data.winRateA * 100);
  const probB = 100 - probA;

  const winnerIsA = data.winRateA >= 0.5;
  const winnerProb = winnerIsA ? probA : probB;
  const winnerName = winnerIsA ? "Vlastní bydlení" : "Nájem a investování";

  // Global max for consistent scaling (highest p90 + 10% buffer)
  const globalMax = Math.max(data.scenarioA.p90, data.scenarioB.p90) * 1.1;

  return (
    <div>
      {/* Advisor Insight Section (No background - sits on white card) */}
      <div className="mb-8">
        {/* The Verdict Sentence */}
        <p className="font-uiSans text-base font-bold text-gray-900 mb-3 text-center leading-snug">
          V {winnerProb} % případů vychází lépe {winnerName}
        </p>

        {/* The Probability Bar with Grey Track */}
        <div className="h-3 rounded-full overflow-hidden bg-gray-100">
          <div className="h-full flex">
            <div 
              className="h-full rounded-l-full"
              style={{ width: `${probA}%`, backgroundColor: COLORS.A }} 
            />
            <div 
              className="h-full rounded-r-full"
              style={{ width: `${probB}%`, backgroundColor: COLORS.B }} 
            />
          </div>
        </div>

        {/* Labels with percentages */}
        <div className="flex justify-between mt-2">
          <span 
            className="font-uiSans text-xs font-bold tabular-nums"
            style={{ color: COLORS.A }}
          >
            A: {probA} %
          </span>
          <span 
            className="font-uiSans text-xs font-bold tabular-nums"
            style={{ color: COLORS.B }}
          >
            B: {probB} %
          </span>
        </div>

        {/* Context */}
        <p className="font-uiSans text-[11px] text-slate-500 mt-2 text-center uppercase tracking-wide">
          Na základě {data.iterations.toLocaleString("cs-CZ")} simulací trhu
        </p>
      </div>

      {/* Data Section */}
      <div>
        {/* Scenario A - Swimlane Block */}
        <SwimlaneBlock
          label="Scénář A: Vlastní bydlení na hypotéku"
          color={COLORS.A}
          p10={data.scenarioA.p10}
          median={data.scenarioA.p50}
          p90={data.scenarioA.p90}
          globalMax={globalMax}
        />

        {/* Dashed divider between blocks */}
        <div className="border-b border-dashed border-slate-200 my-5" />

        {/* Scenario B - Swimlane Block */}
        <SwimlaneBlock
          label="Scénář B: Bydlení v nájmu a investování"
          color={COLORS.B}
          p10={data.scenarioB.p10}
          median={data.scenarioB.p50}
          p90={data.scenarioB.p90}
          globalMax={globalMax}
        />

      </div>
    </div>
  );
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
          className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none group"
        >
          <h3 className="font-uiSans text-base font-medium text-gray-700 group-hover:text-gray-900">{label}</h3>
          <Info className="w-5 h-5 stroke-[2px] text-gray-700 group-hover:text-[var(--color-primary)] transition-colors" />
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
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

/**
 * Convert CalculatorState to MonteCarloInputs
 */
function stateToMonteCarloInputs(state: CalculatorState): MonteCarloInputs {
  return {
    purchasePrice: state.kupniCena,
    parentsContribution: state.prispevekRodicu,
    ownFundsRatio: state.vlastniZdroje / 100,
    furnishingOneOff: state.zarizeniNemovitosti,
    repairFundMonthly: state.fondOprav,
    insuranceAnnual: state.pojisteniNemovitosti,
    propertyTaxAnnual: state.danZNemovitosti,
    maintenanceBaseKc: state.nakladyUdrzba,
    costInflationAnnual: state.ocekavanaInflace / 100,
    rentMonthly: state.najemne,
    mortgageRateInitial: state.urokovaSazbaHypoteky / 100,
    investiceReturnExpected: state.vynosInvesticeExpected / 100,
    propertyGrowthExpected: state.rustHodnotyExpected / 100,
    rentGrowthExpected: state.rustNajemnehoExpected / 100,
    mortgageRateFutureExpected: state.urokovaSazbaHypotekyExpected / 100,
  };
}

export function ResultsPanel({
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditSettings,
  calculationResults,
  copyShareUrl,
  onModeChange,
}: ResultsPanelProps) {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  
  // Use calcMode from state (synced to URL), with callback to update
  const calcMode = state.calcMode;
  const setCalcMode = (mode: CalculationMode) => {
    onModeChange?.(mode);
  };

  // Check for zeroVol URL parameter (for QA testing)
  const [zeroVol] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("zeroVol") === "true";
    }
    return false;
  });

  // Register debug function on mount
  useEffect(() => {
    registerDebugMonteCarlo();
  }, []);

  // Convert state to Monte Carlo inputs
  const mcInputs = useMemo(() => {
    return stateToMonteCarloInputs(state);
  }, [state]);

  // Store inputs on window for debug access
  useEffect(() => {
    if (typeof window !== "undefined") {
      window._mcInputs = mcInputs;
    }
  }, [mcInputs]);

  // Run Monte Carlo simulation when in monteCarlo mode
  const monteCarloResults = useMemo(() => {
    if (calcMode !== "monteCarlo") return null;
    if (!state.selectedCity || !state.selectedApartmentSize) return null;
    
    // Run with options - zeroVol from URL parameter for QA testing
    return runMonteCarlo(mcInputs, { iterations: 10000, zeroVol });
  }, [calcMode, mcInputs, state.selectedCity, state.selectedApartmentSize, zeroVol]);

  let scenarioAResult = 0;
  let scenarioBResult = 0;

  if (calculationResults) {
    scenarioAResult = calculationResults.netWorthOwnFlat;
    scenarioBResult = calculationResults.netWorthRentPlusInvestice;
  }

  const maxValue = Math.max(scenarioAResult, scenarioBResult) || 1;
  const percentageA = (scenarioAResult / maxValue) * 100;
  const percentageB = (scenarioBResult / maxValue) * 100;

  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  return (
    <div className="rounded-none border-t border-gray-100 md:border-0 px-4 py-6 shadow-none md:mx-0 md:rounded-[24px] md:bg-white md:p-8 md:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)]">
      {/* Header Row: Title + Toggle */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="section-title mb-0">
          Čisté jmění za 30 let
        </h2>
        {canViewResults && (
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 shrink-0 h-9 items-center">
            <button
              onClick={() => setCalcMode("monteCarlo")}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                calcMode === "monteCarlo"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Realistický
            </button>
            <button
              onClick={() => setCalcMode("fixed")}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                calcMode === "fixed"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Fixní
            </button>
          </div>
        )}
      </div>

      {canViewResults ? (
        <div>
          {calcMode === "monteCarlo" && monteCarloResults && (
            <MonteCarloResults data={monteCarloResults} />
          )}
          {calcMode === "fixed" && (
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
          )}
        </div>
      ) : (
        <div className="rounded-lg p-6" style={{ background: "var(--bg-lilac-section)" }}>
          <p className="font-uiSans text-sm text-center leading-relaxed text-[var(--color-secondary)]">
            Vyber město a velikost bytu pro zobrazení výsledků
          </p>
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
            <p><strong>Realistický odhad:</strong> Simuluje 10 000 možných budoucností s různými kombinacemi výnosů a růstu cen.</p>
            <p><strong>Fixní scénář:</strong> Počítá s jednou sadou předpokladů.</p>
          </div>
        )}
      </div>

      {/* Share Button */}
      {canViewResults && copyShareUrl && (
        <div className="mt-4 flex justify-center">
          <ShareButton onCopy={copyShareUrl} variant="small" />
        </div>
      )}
    </div>
  );
}
