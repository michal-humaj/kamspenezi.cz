/**
 * Monte Carlo Simulation Engine
 * 
 * Implements a seeded, reproducible Monte Carlo simulation that:
 * 1. Generates stochastic time series for 4 market drivers
 * 2. Runs the same yearly calculation engine used by Fixed mode
 * 3. Aggregates results into percentiles, win rates, and representative runs
 * 
 * Key features:
 * - Seedable PRNG for reproducibility
 * - Zero-volatility QA mode that collapses to Fixed mode exactly
 * - Debug CSV export for Excel replay and verification
 */

import { createPRNG, type PRNG } from "./prng";
import { calculateBydleniYearly, type YearlyEngineResult } from "./bydleni-yearly";
import { MC_CONFIG, MC_DEFAULTS, clamp } from "./monte-carlo-config";

const YEARS = 30;

// ============================================
// TYPES
// ============================================

/**
 * Inputs for Monte Carlo simulation.
 * Contains all values needed for the yearly engine plus expected values for stochastic drivers.
 */
export interface MonteCarloInputs {
  // Static inputs (unchanged across simulations)
  purchasePrice: number;
  parentsContribution: number;
  ownFundsRatio: number;
  furnishingOneOff: number;
  repairFundMonthly: number;
  insuranceAnnual: number;
  propertyTaxAnnual: number;
  maintenanceBaseKc: number;
  costInflationAnnual: number;
  rentMonthly: number;
  
  // Current mortgage rate (years 1-5, from user input)
  mortgageRateInitial: number;
  
  // Expected (mean) values for stochastic drivers
  investiceReturnExpected: number;      // Mean investment return (e.g., 0.07 = 7%)
  propertyGrowthExpected: number;       // Mean property growth (e.g., 0.03 = 3%)
  rentGrowthExpected: number;           // Mean rent growth (e.g., 0.02 = 2%)
  mortgageRateFutureExpected: number;   // Mean future mortgage rate (e.g., 0.05 = 5%)
}

/**
 * Options for Monte Carlo simulation.
 */
export interface MonteCarloOptions {
  /** Number of simulation iterations (default: 10000) */
  iterations?: number;
  /** Random seed for reproducibility (default: 12345) */
  seed?: number;
  /** Zero-volatility mode for QA - all sigmas become 0 (default: false) */
  zeroVol?: boolean;
  /** Whether to store debug data for all runs (default: false, expensive) */
  storeDebugRuns?: boolean;
}

/**
 * Percentile statistics for a scenario.
 */
export interface PercentileStats {
  p10: number;  // 10th percentile (pessimistic)
  p50: number;  // 50th percentile (median)
  p90: number;  // 90th percentile (optimistic)
}

/**
 * Data for a single simulation run (used for debug export).
 */
export interface SimulationRun {
  runId: number;
  // Stochastic series used
  investiceReturnSeries: number[];
  propertyGrowthSeries: number[];
  rentGrowthSeries: number[];
  mortgageRateSeries: number[];
  // Results
  timeline: YearlyEngineResult;
  netWorthA: number;
  netWorthB: number;
}

/**
 * Result from Monte Carlo simulation.
 */
export interface MonteCarloResult {
  /** Percentile statistics for Scenario A (own housing) */
  scenarioA: PercentileStats;
  /** Percentile statistics for Scenario B (rent + invest) */
  scenarioB: PercentileStats;
  /** Win rate for Scenario A (0-1, fraction where A > B) */
  winRateA: number;
  /** Number of simulations run */
  iterations: number;
  /** ID of the representative run (closest to median difference) */
  representativeRunId: number;
  /** Full timeline of the representative run */
  representativeTimeline: YearlyEngineResult;
  /** Debug data for all runs (only if storeDebugRuns was true) */
  debugRuns?: SimulationRun[];
}

// ============================================
// SERIES GENERATORS
// ============================================

/**
 * Generate investment return series (i.i.d. Normal).
 * 
 * Formula: r_inv[t] = mean + sigma * Z
 * 
 * @param rng - PRNG instance
 * @param mean - Expected annual return
 * @param sigma - Annual volatility (0 for zero-vol mode)
 * @returns Array of length 31 (years 0-30)
 */
function generateInvestmentSeries(rng: PRNG, mean: number, sigma: number): number[] {
  const series = new Array(YEARS + 1);
  series[0] = 0; // Year 0 has no return
  
  for (let t = 1; t <= YEARS; t++) {
    const raw = mean + sigma * rng.nextGaussian();
    series[t] = clamp(raw, MC_CONFIG.investment.bounds);
  }
  
  return series;
}

/**
 * Generate property growth series (AR(1) with mean reversion).
 * 
 * Formula: g_prop[t] = mean + phi * (g_prop[t-1] - mean) + sigma * Z
 * 
 * @param rng - PRNG instance
 * @param mean - Expected annual growth rate
 * @param sigma - Annual volatility (0 for zero-vol mode)
 * @returns Array of length 31 (years 0-30)
 */
function generatePropertyGrowthSeries(rng: PRNG, mean: number, sigma: number): number[] {
  const series = new Array(YEARS + 1);
  const phi = MC_CONFIG.property.phi;
  
  // Year 0: initialize at mean (deterministic for QA consistency)
  series[0] = mean;
  
  // Year 1: start at mean
  series[1] = clamp(mean + sigma * rng.nextGaussian(), MC_CONFIG.property.bounds);
  
  for (let t = 2; t <= YEARS; t++) {
    const deviation = series[t - 1] - mean;
    const raw = mean + phi * deviation + sigma * rng.nextGaussian();
    series[t] = clamp(raw, MC_CONFIG.property.bounds);
  }
  
  return series;
}

/**
 * Generate rent growth series (i.i.d. Normal).
 * 
 * Formula: g_rent[t] = mean + sigma * Z
 * 
 * @param rng - PRNG instance
 * @param mean - Expected annual rent growth
 * @param sigma - Annual volatility (0 for zero-vol mode)
 * @returns Array of length 31 (years 0-30)
 */
function generateRentGrowthSeries(rng: PRNG, mean: number, sigma: number): number[] {
  const series = new Array(YEARS + 1);
  series[0] = 0; // Year 0 has no growth
  
  for (let t = 1; t <= YEARS; t++) {
    const raw = mean + sigma * rng.nextGaussian();
    series[t] = clamp(raw, MC_CONFIG.rent.bounds);
  }
  
  return series;
}

/**
 * Generate mortgage rate series with 5-year refix blocks.
 * 
 * Years 1-5: Use initial rate (from user input)
 * Years 6-30: Generate refix rates using AR(1) model
 * 
 * Model for refix rates:
 * r_fix[k] = mean + phi * (r_fix[k-1] - mean) + sigma * Z
 * 
 * @param rng - PRNG instance
 * @param initialRate - Fixed rate for years 1-5
 * @param meanFuture - Expected future rate (for years 6+)
 * @param sigma - Rate volatility at refix (0 for zero-vol mode)
 * @returns Array of length 31 (years 0-30)
 */
function generateMortgageRateSeries(
  rng: PRNG,
  initialRate: number,
  meanFuture: number,
  sigma: number
): number[] {
  const series = new Array(YEARS + 1);
  const phi = MC_CONFIG.mortgageRate.phi;
  
  // Years 0-5: Use initial rate
  for (let t = 0; t <= 5; t++) {
    series[t] = initialRate;
  }
  
  // Generate refix rates for periods k=1..5 (years 6-10, 11-15, 16-20, 21-25, 26-30)
  // Initialize r_fix[0] at meanFuture for AR(1) starting point
  let prevRefixRate = meanFuture;
  
  for (let k = 1; k <= 5; k++) {
    // Generate new refix rate
    const deviation = prevRefixRate - meanFuture;
    const raw = meanFuture + phi * deviation + sigma * rng.nextGaussian();
    const refixRate = clamp(raw, MC_CONFIG.mortgageRate.bounds);
    
    // Apply this rate to the 5-year block
    const startYear = 5 * k + 1; // k=1 -> years 6-10, k=2 -> years 11-15, etc.
    for (let offset = 0; offset < 5; offset++) {
      const year = startYear + offset;
      if (year <= YEARS) {
        series[year] = refixRate;
      }
    }
    
    prevRefixRate = refixRate;
  }
  
  return series;
}

// ============================================
// AGGREGATION HELPERS
// ============================================

/**
 * Calculate percentiles from an array of values.
 * 
 * @param values - Array of numeric values
 * @param percentile - Percentile to calculate (0-100)
 * @returns The value at the given percentile
 */
function calculatePercentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * (sorted.length - 1));
  return sorted[index];
}

/**
 * Find the run ID closest to the median difference between A and B.
 * This gives a "representative" run that shows typical outcomes.
 * 
 * @param netWorthA - Array of Scenario A final values
 * @param netWorthB - Array of Scenario B final values
 * @returns Index of the representative run
 */
function findRepresentativeRun(netWorthA: number[], netWorthB: number[]): number {
  const n = netWorthA.length;
  const diffs = new Array(n);
  
  for (let i = 0; i < n; i++) {
    diffs[i] = netWorthA[i] - netWorthB[i];
  }
  
  // Find median of differences
  const sortedDiffs = [...diffs].sort((a, b) => a - b);
  const medianDiff = sortedDiffs[Math.floor(n / 2)];
  
  // Find run closest to median difference
  let minDistance = Infinity;
  let bestIndex = 0;
  
  for (let i = 0; i < n; i++) {
    const distance = Math.abs(diffs[i] - medianDiff);
    if (distance < minDistance) {
      minDistance = distance;
      bestIndex = i;
    }
  }
  
  return bestIndex;
}

// ============================================
// MAIN MONTE CARLO FUNCTION
// ============================================

/**
 * Run Monte Carlo simulation.
 * 
 * @param inputs - All calculation inputs including expected values for stochastic drivers
 * @param options - Simulation options (iterations, seed, zeroVol)
 * @returns Monte Carlo results including percentiles, win rate, and representative run
 */
export function runMonteCarlo(
  inputs: MonteCarloInputs,
  options: MonteCarloOptions = {}
): MonteCarloResult {
  const {
    iterations = MC_DEFAULTS.iterations,
    seed = MC_DEFAULTS.seed,
    zeroVol = false,
    storeDebugRuns = false,
  } = options;

  // Create seeded PRNG
  const rng = createPRNG(seed);

  // Determine sigmas (0 in zero-vol mode)
  const sigmaInv = zeroVol ? 0 : MC_CONFIG.investment.sigma;
  const sigmaProp = zeroVol ? 0 : MC_CONFIG.property.sigma;
  const sigmaRent = zeroVol ? 0 : MC_CONFIG.rent.sigma;
  const sigmaRate = zeroVol ? 0 : MC_CONFIG.mortgageRate.sigma;

  // Pre-allocate result arrays
  const netWorthA = new Array(iterations);
  const netWorthB = new Array(iterations);
  const debugRuns: SimulationRun[] = storeDebugRuns ? [] : [];
  
  // Store all timelines for representative run selection
  const allTimelines: YearlyEngineResult[] = new Array(iterations);
  const allSeries: {
    investice: number[];
    property: number[];
    rent: number[];
    mortgage: number[];
  }[] = storeDebugRuns ? [] : new Array(iterations);

  // Run simulations
  for (let i = 0; i < iterations; i++) {
    // Generate stochastic series for this run
    const investiceReturnSeries = generateInvestmentSeries(
      rng,
      inputs.investiceReturnExpected,
      sigmaInv
    );
    const propertyGrowthSeries = generatePropertyGrowthSeries(
      rng,
      inputs.propertyGrowthExpected,
      sigmaProp
    );
    const rentGrowthSeries = generateRentGrowthSeries(
      rng,
      inputs.rentGrowthExpected,
      sigmaRent
    );
    const mortgageRateSeries = generateMortgageRateSeries(
      rng,
      inputs.mortgageRateInitial,
      inputs.mortgageRateFutureExpected,
      sigmaRate
    );

    // Run yearly calculation
    const timeline = calculateBydleniYearly({
      purchasePrice: inputs.purchasePrice,
      parentsContribution: inputs.parentsContribution,
      ownFundsRatio: inputs.ownFundsRatio,
      furnishingOneOff: inputs.furnishingOneOff,
      repairFundMonthly: inputs.repairFundMonthly,
      insuranceAnnual: inputs.insuranceAnnual,
      propertyTaxAnnual: inputs.propertyTaxAnnual,
      maintenanceBaseKc: inputs.maintenanceBaseKc,
      costInflationAnnual: inputs.costInflationAnnual,
      rentMonthly: inputs.rentMonthly,
      propertyGrowthSeries,
      rentGrowthSeries,
      investiceReturnSeries,
      mortgageRateSeries,
    });

    // Store results
    netWorthA[i] = timeline.netWorthOwnFlat;
    netWorthB[i] = timeline.netWorthRentPlusInvestice;
    allTimelines[i] = timeline;

    // Store debug data if requested
    if (storeDebugRuns) {
      debugRuns.push({
        runId: i,
        investiceReturnSeries,
        propertyGrowthSeries,
        rentGrowthSeries,
        mortgageRateSeries,
        timeline,
        netWorthA: timeline.netWorthOwnFlat,
        netWorthB: timeline.netWorthRentPlusInvestice,
      });
      allSeries.push({
        investice: investiceReturnSeries,
        property: propertyGrowthSeries,
        rent: rentGrowthSeries,
        mortgage: mortgageRateSeries,
      });
    } else {
      // Store minimal series data for representative run
      allSeries[i] = {
        investice: investiceReturnSeries,
        property: propertyGrowthSeries,
        rent: rentGrowthSeries,
        mortgage: mortgageRateSeries,
      };
    }
  }

  // Calculate percentiles
  const scenarioA: PercentileStats = {
    p10: calculatePercentile(netWorthA, 10),
    p50: calculatePercentile(netWorthA, 50),
    p90: calculatePercentile(netWorthA, 90),
  };

  const scenarioB: PercentileStats = {
    p10: calculatePercentile(netWorthB, 10),
    p50: calculatePercentile(netWorthB, 50),
    p90: calculatePercentile(netWorthB, 90),
  };

  // Calculate win rate for Scenario A
  let winsA = 0;
  for (let i = 0; i < iterations; i++) {
    if (netWorthA[i] > netWorthB[i]) winsA++;
  }
  const winRateA = winsA / iterations;

  // Find representative run
  const representativeRunId = findRepresentativeRun(netWorthA, netWorthB);
  const representativeTimeline = allTimelines[representativeRunId];

  return {
    scenarioA,
    scenarioB,
    winRateA,
    iterations,
    representativeRunId,
    representativeTimeline,
    debugRuns: storeDebugRuns ? debugRuns : undefined,
  };
}

// ============================================
// DEBUG CSV EXPORT
// ============================================

/**
 * Generate CSV content for Monte Carlo debug export.
 * 
 * Columns:
 * Run_ID, Year, vynosInvestice, rustHodnotyNemovitosti, rustNajemneho,
 * urokovaSazbaHypoteky, netWorthA_endOfYear, netWorthB_endOfYear,
 * mortgageBalance_endOfYear, mortgagePayment_annual, portfolioValue_endOfYear
 */
function generateDebugCSV(runs: SimulationRun[]): string {
  const headers = [
    "Run_ID",
    "Year",
    "vynosInvestice",
    "rustHodnotyNemovitosti",
    "rustNajemneho",
    "urokovaSazbaHypoteky",
    "netWorthA_endOfYear",
    "netWorthB_endOfYear",
    "mortgageBalance_endOfYear",
    "mortgagePayment_annual",
    "portfolioValue_endOfYear",
  ];

  const lines: string[] = [headers.join(",")];

  for (const run of runs) {
    for (let t = 0; t <= YEARS; t++) {
      const row = [
        run.runId,
        t,
        run.investiceReturnSeries[t].toFixed(6),
        run.propertyGrowthSeries[t].toFixed(6),
        run.rentGrowthSeries[t].toFixed(6),
        run.mortgageRateSeries[t].toFixed(6),
        run.timeline.propertyValue[t].toFixed(2),
        run.timeline.portfolioB[t].toFixed(2),
        run.timeline.remainingDebt[t].toFixed(2),
        run.timeline.mortgagePaymentsAnnual[t].toFixed(2),
        run.timeline.portfolioB[t].toFixed(2),
      ];
      lines.push(row.join(","));
    }
  }

  return lines.join("\n");
}

/**
 * Download a string as a file.
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Debug function exposed on window for QA testing.
 * 
 * Usage: window.debugMonteCarlo({ iterations: 100, seed: 12345, zeroVol: false })
 * 
 * This will run the Monte Carlo simulation with the given options and download
 * a CSV file with full debug data for Excel replay.
 */
export interface DebugMonteCarloOptions {
  iterations?: number;
  seed?: number;
  zeroVol?: boolean;
}

/**
 * Run Monte Carlo with debug export.
 * Must be called with current calculator inputs from the UI.
 */
export function debugMonteCarlo(
  inputs: MonteCarloInputs,
  options: DebugMonteCarloOptions = {}
): MonteCarloResult {
  const { iterations = 100, seed = 12345, zeroVol = false } = options;

  console.log(`Running Monte Carlo debug: ${iterations} iterations, seed=${seed}, zeroVol=${zeroVol}`);

  const result = runMonteCarlo(inputs, {
    iterations,
    seed,
    zeroVol,
    storeDebugRuns: true,
  });

  if (result.debugRuns) {
    const csv = generateDebugCSV(result.debugRuns);
    downloadFile(csv, "monte_carlo_debug_master.csv", "text/csv");
    console.log(`Downloaded monte_carlo_debug_master.csv with ${result.debugRuns.length} runs`);
  }

  console.log("Monte Carlo results:", {
    scenarioA: result.scenarioA,
    scenarioB: result.scenarioB,
    winRateA: result.winRateA,
    representativeRunId: result.representativeRunId,
  });

  return result;
}

// ============================================
// WINDOW EXPORT FOR QA
// ============================================

// Type declaration for window augmentation
declare global {
  interface Window {
    debugMonteCarlo?: typeof debugMonteCarloFromWindow;
    _mcInputs?: MonteCarloInputs;
  }
}

/**
 * Window-exposed debug function that uses stored inputs.
 * The UI should set window._mcInputs when calculator state changes.
 */
function debugMonteCarloFromWindow(options: DebugMonteCarloOptions = {}): MonteCarloResult | null {
  if (typeof window === "undefined") {
    console.error("debugMonteCarlo can only be called in browser context");
    return null;
  }

  const inputs = window._mcInputs;
  if (!inputs) {
    console.error("No Monte Carlo inputs available. Make sure calculator has been initialized.");
    console.log("Usage: First ensure the calculator is loaded, then call window.debugMonteCarlo({ iterations: 100, seed: 12345, zeroVol: false })");
    return null;
  }

  return debugMonteCarlo(inputs, options);
}

// Export for UI to register
export function registerDebugMonteCarlo(): void {
  if (typeof window !== "undefined") {
    window.debugMonteCarlo = debugMonteCarloFromWindow;
    console.log("Monte Carlo debug function registered. Usage: window.debugMonteCarlo({ iterations: 100, seed: 12345, zeroVol: false })");
  }
}

