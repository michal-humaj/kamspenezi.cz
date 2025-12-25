"use client";

import { formatLargeCurrency, formatCzk } from "@/lib/format";
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

type CalculationMode = "monteCarlo" | "fixed";

// Dummy Monte Carlo data
const DUMMY_MONTE_CARLO = {
  simulations: 10000,
  horizonYears: 30,
  winProbA: 0.62,
  scenarioA: { p10: 28e6, median: 45e6, p90: 62e6 },
  scenarioB: { p10: 26e6, median: 36e6, p90: 55e6 },
  diff: { p10: -6e6, median: 8e6, p90: 20e6 },
};

// Format number with Czech locale (tabular)
function formatMillions(value: number): string {
  const millions = value / 1_000_000;
  return new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(millions);
}

// Format with sign
function formatMillionsWithSign(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatMillions(value)}`;
}

// Mode Switcher Component
function ModeSwitcher({
  mode,
  onChange,
}: {
  mode: CalculationMode;
  onChange: (mode: CalculationMode) => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 relative">
        <span className="font-uiSans text-xs font-medium text-slate-500">
          Režim výpočtu
        </span>
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Info o režimech výpočtu"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
        {showTooltip && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowTooltip(false)} 
            />
            <div className="absolute left-0 top-full mt-1.5 w-64 z-20 rounded-lg border border-slate-100 bg-white p-3 shadow-lg text-xs text-slate-600 leading-relaxed animate-in fade-in zoom-in-95 duration-150">
              Realistický odhad simuluje tisíce možných budoucností. Výsledek je odhad, ne předpověď.
            </div>
          </>
        )}
      </div>
      <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
        <button
          onClick={() => onChange("monteCarlo")}
          className={`px-3 py-1.5 rounded-md font-uiSans text-xs font-medium transition-all ${
            mode === "monteCarlo"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Realistický odhad
        </button>
        <button
          onClick={() => onChange("fixed")}
          className={`px-3 py-1.5 rounded-md font-uiSans text-xs font-medium transition-all ${
            mode === "fixed"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Fixní scénář
        </button>
      </div>
    </div>
  );
}

// Range Bar Component - pure data visualization
function RangeBar({
  p10,
  median,
  p90,
  color,
  domainMin,
  domainMax,
}: {
  p10: number;
  median: number;
  p90: number;
  color: string;
  domainMin: number;
  domainMax: number;
}) {
  const range = domainMax - domainMin;
  const p10Percent = ((p10 - domainMin) / range) * 100;
  const p90Percent = ((p90 - domainMin) / range) * 100;
  const medianPercent = ((median - domainMin) / range) * 100;
  const barWidth = p90Percent - p10Percent;

  return (
    <div className="relative h-2 rounded-full bg-slate-100">
      {/* Range fill (P10 to P90) */}
      <div
        className="absolute top-0 h-full rounded-full"
        style={{
          left: `${p10Percent}%`,
          width: `${barWidth}%`,
          backgroundColor: color,
          opacity: 0.35,
        }}
      />
      
      {/* Median tick (thin vertical line) */}
      <div
        className="absolute top-0 h-full w-0.5 rounded-full"
        style={{ 
          left: `${medianPercent}%`,
          transform: "translateX(-50%)",
          backgroundColor: color,
        }}
      />
    </div>
  );
}

// Scenario Range Row Component
function ScenarioRangeRow({
  label,
  dotColor,
  p10,
  median,
  p90,
  domainMin,
  domainMax,
}: {
  label: string;
  dotColor: string;
  p10: number;
  median: number;
  p90: number;
  domainMin: number;
  domainMax: number;
}) {
  return (
    <div className="space-y-2">
      {/* Scenario label */}
      <div className="flex items-center gap-2">
        <div 
          className="h-2 w-2 rounded-full shrink-0" 
          style={{ backgroundColor: dotColor }} 
        />
        <span className="font-uiSans text-sm font-medium text-slate-700">
          {label}
        </span>
      </div>
      
      {/* Labels row */}
      <div className="flex justify-between text-xs font-uiSans tabular-nums">
        <span className="text-slate-500">
          <span className="text-slate-400">P10:</span> {formatMillions(p10)}
        </span>
        <span className="text-slate-700 font-medium">
          <span className="text-slate-400 font-normal">Medián:</span> {formatMillions(median)}
        </span>
        <span className="text-slate-500">
          <span className="text-slate-400">P90:</span> {formatMillions(p90)}
        </span>
      </div>

      {/* Range bar */}
      <RangeBar
        p10={p10}
        median={median}
        p90={p90}
        color={dotColor}
        domainMin={domainMin}
        domainMax={domainMax}
      />
    </div>
  );
}

// Monte Carlo Results Component
function MonteCarloResults() {
  const data = DUMMY_MONTE_CARLO;
  const winProbAPercent = Math.round(data.winProbA * 100);
  const winProbBPercent = 100 - winProbAPercent;
  const [showP10P90Info, setShowP10P90Info] = useState(false);

  // Shared domain for A/B scenarios
  const abMin = 0;
  const abMax = Math.max(data.scenarioA.p90, data.scenarioB.p90) * 1.1;

  return (
    <div className="space-y-6">
      {/* Probability hero */}
      <div className="text-center space-y-1">
        <div className="font-displaySerif text-5xl md:text-6xl font-bold text-slate-900 leading-none tabular-nums">
          {winProbAPercent} %
        </div>
        <p className="font-uiSans text-sm text-slate-600">
          Scénář A vychází lépe v {winProbAPercent} % simulací.
        </p>
        <p className="font-uiSans text-xs text-slate-400">
          Scénář B vychází lépe ve {winProbBPercent} % simulací.
        </p>
      </div>

      {/* Key takeaways card */}
      <div className="bg-slate-50/80 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="font-uiSans text-xs text-slate-500 mb-1">
              Medián rozdílu (A − B)
            </div>
            <div className="font-uiSans text-lg font-semibold text-slate-800 tabular-nums">
              {formatMillionsWithSign(data.diff.median)} mil. Kč
            </div>
          </div>
          <div>
            <div className="font-uiSans text-xs text-slate-500 mb-1">
              Typický rozdíl (P10–P90)
            </div>
            <div className="font-uiSans text-lg font-semibold text-slate-800 tabular-nums">
              {formatMillionsWithSign(data.diff.p10)} až {formatMillionsWithSign(data.diff.p90)} mil. Kč
            </div>
          </div>
        </div>
        
        {/* Meta caption */}
        <div className="font-uiSans text-[11px] text-slate-400">
          Simulací: {data.simulations.toLocaleString("cs-CZ")} · Horizont: {data.horizonYears} let
        </div>
      </div>

      {/* Range visualization */}
      <div className="space-y-4">
        {/* Section header with info */}
        <div className="flex items-center gap-1.5 relative">
          <h3 className="font-uiSans text-sm font-semibold text-slate-700">
            Typický rozsah výsledků
          </h3>
          <button
            onClick={() => setShowP10P90Info(!showP10P90Info)}
            className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
            aria-label="Co znamená P10/P90"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {showP10P90Info && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowP10P90Info(false)} 
              />
              <div className="absolute left-0 top-full mt-1.5 w-64 z-20 rounded-lg border border-slate-100 bg-white p-3 shadow-lg text-xs text-slate-600 leading-relaxed animate-in fade-in zoom-in-95 duration-150">
                P10 = hodnota, kterou překonáte v 90 % případů. P90 = hodnota, kterou dosáhnete jen v 10 % případů. Medián = střední hodnota.
              </div>
            </>
          )}
        </div>

        {/* Scenario A */}
        <ScenarioRangeRow
          label="Scénář A: Vlastní bydlení"
          dotColor="var(--scenario-a-dot)"
          p10={data.scenarioA.p10}
          median={data.scenarioA.median}
          p90={data.scenarioA.p90}
          domainMin={abMin}
          domainMax={abMax}
        />

        {/* Scenario B */}
        <ScenarioRangeRow
          label="Scénář B: Nájem + investice"
          dotColor="var(--scenario-b-dot)"
          p10={data.scenarioB.p10}
          median={data.scenarioB.median}
          p90={data.scenarioB.p90}
          domainMin={abMin}
          domainMax={abMax}
        />

        {/* Shared axis */}
        <div className="flex justify-between px-0 pt-1">
          {[0, 20, 40, 60, 80].map((tick) => (
            <span 
              key={tick} 
              className="font-uiSans text-[10px] text-slate-400 tabular-nums"
            >
              {tick}
            </span>
          ))}
        </div>
        <div className="font-uiSans text-[10px] text-slate-400 text-center -mt-3">
          mil. Kč
        </div>
      </div>
    </div>
  );
}

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  const roundedValue = Math.round(value);
  const displayValue = formatLargeCurrency(roundedValue);
  const fullValue = formatCzk(roundedValue);
  
  return (
    <span 
      key={roundedValue}
      title={`Přesná hodnota: ${fullValue} Kč`}
      style={{
        animation: "result-fade 1000ms ease-out",
      }}
    >
      {displayValue}
    </span>
  );
}

// Scenario Block for fixed mode
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
          <h3 className="font-uiSans text-base font-medium text-gray-700 group-hover:text-gray-900">
            {label}
          </h3>
          <Info className="w-5 h-5 stroke-[2px] text-gray-700 group-hover:text-[var(--color-primary)] transition-colors translate-y-[1px]" />
        </button>
        
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

      <div className="pl-0 mb-1.5">
        <div className="font-displaySerif text-3xl md:text-4xl font-semibold leading-none text-[var(--color-primary)]">
          <AnimatedNumber value={Math.round(value)} />
        </div>
      </div>

      <div className="pl-0 mb-2">
        <p className="font-uiSans text-[13px] font-medium text-[var(--color-secondary)]">
          {assetLabel}
        </p>
      </div>

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
  const [calcMode, setCalcMode] = useState<CalculationMode>("monteCarlo");

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
      className="space-y-6 rounded-none border-t border-gray-100 md:border-0 px-4 py-8 shadow-none md:mx-0 md:space-y-6 md:rounded-[24px] md:bg-white md:p-8 md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]"
    >
      {/* Header */}
      <div className="space-y-3">
        <h2 className="section-title text-balance">
          Porovnání čistého jmění za 30&nbsp;let
        </h2>
        <p className="font-uiSans text-sm leading-relaxed text-slate-500">
          Porovnání vašeho předpokládaného majetku po 30 letech.
        </p>
        
        {canViewResults && (
          <ModeSwitcher mode={calcMode} onChange={setCalcMode} />
        )}
      </div>

      {canViewResults ? (
        <div>
          {calcMode === "monteCarlo" && <MonteCarloResults />}

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
      <div className="pt-2">
        <div className="flex justify-center">
          <button
            onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
            className="group inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-4 py-1.5 font-uiSans text-xs font-medium text-[var(--color-secondary)] transition-all hover:bg-gray-100 active:scale-[0.97] active:bg-gray-200 focus:outline-none"
          >
            <span>Metodika výpočtu</span>
            <ChevronRight className="h-3 w-3 text-gray-400 transition-colors group-hover:text-gray-600" />
          </button>
        </div>
        
        {isMethodologyOpen && (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500 space-y-2 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            <p>
              <strong>Realistický odhad:</strong> Simuluje 10 000 možných budoucností s různými kombinacemi výnosů a růstu cen.
            </p>
            <p>
              <strong>Fixní scénář:</strong> Počítá s jednou sadou předpokladů.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
