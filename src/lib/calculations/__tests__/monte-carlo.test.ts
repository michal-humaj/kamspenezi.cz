/**
 * Monte Carlo Engine Tests
 * 
 * These tests verify:
 * 1. Zero-volatility mode produces identical results to Fixed mode
 * 2. Reproducibility with same seed
 * 3. Monotonicity sanity checks
 */

import { runMonteCarlo, type MonteCarloInputs } from "../monte-carlo-engine";
import { calculateBydleniFixed } from "../bydleni-fixed";

// Standard test inputs based on typical Prague 2+kk scenario
const TEST_INPUTS: MonteCarloInputs = {
  purchasePrice: 6_000_000,
  parentsContribution: 0,
  ownFundsRatio: 0.10,
  furnishingOneOff: 200_000,
  repairFundMonthly: 3_000,
  insuranceAnnual: 3_000,
  propertyTaxAnnual: 2_000,
  maintenanceBaseKc: 15_000,
  costInflationAnnual: 0.02,
  rentMonthly: 22_000,
  mortgageRateInitial: 0.05,
  investiceReturnExpected: 0.07,
  propertyGrowthExpected: 0.03,
  rentGrowthExpected: 0.02,
  mortgageRateFutureExpected: 0.05,
};

/**
 * Test 1: Zero-Volatility Mode
 * 
 * When all sigmas are 0, the Monte Carlo result should exactly match
 * the Fixed calculation result.
 */
export function testZeroVolatilityMode(): { passed: boolean; message: string } {
  // Run Monte Carlo with zero volatility
  const mcResult = runMonteCarlo(TEST_INPUTS, {
    iterations: 1,
    seed: 12345,
    zeroVol: true,
  });

  // Run Fixed calculation with equivalent inputs
  const fixedResult = calculateBydleniFixed({
    purchasePrice: TEST_INPUTS.purchasePrice,
    parentsContribution: TEST_INPUTS.parentsContribution,
    mortgageRateAnnual: TEST_INPUTS.mortgageRateInitial,
    mortgageRateFuture: TEST_INPUTS.mortgageRateFutureExpected,
    ownFundsRatio: TEST_INPUTS.ownFundsRatio,
    furnishingOneOff: TEST_INPUTS.furnishingOneOff,
    propertyGrowthAnnual: TEST_INPUTS.propertyGrowthExpected,
    repairFundMonthly: TEST_INPUTS.repairFundMonthly,
    insuranceAnnual: TEST_INPUTS.insuranceAnnual,
    propertyTaxAnnual: TEST_INPUTS.propertyTaxAnnual,
    maintenanceBaseKc: TEST_INPUTS.maintenanceBaseKc,
    costInflationAnnual: TEST_INPUTS.costInflationAnnual,
    rentGrowthAnnual: TEST_INPUTS.rentGrowthExpected,
    rentMonthly: TEST_INPUTS.rentMonthly,
    investiceReturnAnnual: TEST_INPUTS.investiceReturnExpected,
  });

  // Compare results (allow small floating point tolerance)
  const tolerance = 1; // 1 Kč tolerance
  const diffA = Math.abs(mcResult.scenarioA.p50 - fixedResult.netWorthOwnFlat);
  const diffB = Math.abs(mcResult.scenarioB.p50 - fixedResult.netWorthRentPlusInvestice);

  if (diffA > tolerance || diffB > tolerance) {
    return {
      passed: false,
      message: `Zero-vol mismatch: MC_A=${mcResult.scenarioA.p50}, Fixed_A=${fixedResult.netWorthOwnFlat}, diff_A=${diffA}, MC_B=${mcResult.scenarioB.p50}, Fixed_B=${fixedResult.netWorthRentPlusInvestice}, diff_B=${diffB}`,
    };
  }

  return {
    passed: true,
    message: `Zero-vol mode matches Fixed: A=${fixedResult.netWorthOwnFlat.toFixed(0)}, B=${fixedResult.netWorthRentPlusInvestice.toFixed(0)}`,
  };
}

/**
 * Test 2: Reproducibility
 * 
 * Same seed should produce identical results.
 */
export function testReproducibility(): { passed: boolean; message: string } {
  const seed = 42;
  
  const result1 = runMonteCarlo(TEST_INPUTS, { iterations: 100, seed });
  const result2 = runMonteCarlo(TEST_INPUTS, { iterations: 100, seed });

  if (
    result1.scenarioA.p50 !== result2.scenarioA.p50 ||
    result1.scenarioB.p50 !== result2.scenarioB.p50 ||
    result1.winRateA !== result2.winRateA
  ) {
    return {
      passed: false,
      message: `Results differ with same seed: run1_A=${result1.scenarioA.p50}, run2_A=${result2.scenarioA.p50}`,
    };
  }

  return {
    passed: true,
    message: `Reproducibility confirmed: same seed produces identical results`,
  };
}

/**
 * Test 3: Different seeds produce different results
 */
export function testDifferentSeeds(): { passed: boolean; message: string } {
  const result1 = runMonteCarlo(TEST_INPUTS, { iterations: 100, seed: 1 });
  const result2 = runMonteCarlo(TEST_INPUTS, { iterations: 100, seed: 2 });

  // Results should differ (with very high probability)
  if (
    result1.scenarioA.p50 === result2.scenarioA.p50 &&
    result1.scenarioB.p50 === result2.scenarioB.p50
  ) {
    return {
      passed: false,
      message: `Same results with different seeds (very unlikely to be correct)`,
    };
  }

  return {
    passed: true,
    message: `Different seeds produce different results`,
  };
}

/**
 * Test 4: Monotonicity - Higher investment returns should increase Scenario B median
 */
export function testMonotonicityInvestment(): { passed: boolean; message: string } {
  const lowReturn = { ...TEST_INPUTS, investiceReturnExpected: 0.05 };
  const highReturn = { ...TEST_INPUTS, investiceReturnExpected: 0.10 };

  const resultLow = runMonteCarlo(lowReturn, { iterations: 1000, seed: 12345 });
  const resultHigh = runMonteCarlo(highReturn, { iterations: 1000, seed: 12345 });

  if (resultHigh.scenarioB.p50 <= resultLow.scenarioB.p50) {
    return {
      passed: false,
      message: `Higher investment return should increase B: low=${resultLow.scenarioB.p50}, high=${resultHigh.scenarioB.p50}`,
    };
  }

  return {
    passed: true,
    message: `Monotonicity confirmed: higher investment return increases Scenario B (${resultLow.scenarioB.p50.toFixed(0)} -> ${resultHigh.scenarioB.p50.toFixed(0)})`,
  };
}

/**
 * Test 5: Monotonicity - Higher mortgage rates should decrease Scenario A relative value
 * (More of owner's money goes to interest rather than equity)
 */
export function testMonotonicityMortgageRate(): { passed: boolean; message: string } {
  const lowRate = { ...TEST_INPUTS, mortgageRateFutureExpected: 0.03 };
  const highRate = { ...TEST_INPUTS, mortgageRateFutureExpected: 0.08 };

  const resultLow = runMonteCarlo(lowRate, { iterations: 1000, seed: 12345 });
  const resultHigh = runMonteCarlo(highRate, { iterations: 1000, seed: 12345 });

  // Note: Property value (Scenario A) stays the same, but higher rates mean
  // the opportunity cost is higher (renter saves more), so Scenario B should
  // benefit relatively, meaning A's win rate should decrease
  if (resultHigh.winRateA >= resultLow.winRateA) {
    return {
      passed: false,
      message: `Higher mortgage rate should decrease A's win rate: low=${resultLow.winRateA}, high=${resultHigh.winRateA}`,
    };
  }

  return {
    passed: true,
    message: `Monotonicity confirmed: higher mortgage rate decreases Scenario A win rate (${(resultLow.winRateA * 100).toFixed(1)}% -> ${(resultHigh.winRateA * 100).toFixed(1)}%)`,
  };
}

/**
 * Run all tests and report results
 */
export function runAllTests(): void {
  console.log("=== Monte Carlo Engine Tests ===\n");

  const tests = [
    { name: "Zero-Volatility Mode", fn: testZeroVolatilityMode },
    { name: "Reproducibility", fn: testReproducibility },
    { name: "Different Seeds", fn: testDifferentSeeds },
    { name: "Monotonicity: Investment", fn: testMonotonicityInvestment },
    { name: "Monotonicity: Mortgage Rate", fn: testMonotonicityMortgageRate },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = test.fn();
      if (result.passed) {
        console.log(`✅ ${test.name}: ${result.message}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: ${result.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Error - ${error}`);
      failed++;
    }
  }

  console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
}

// Export for browser console access
if (typeof window !== "undefined") {
  (window as unknown as { runMonteCarloTests: typeof runAllTests }).runMonteCarloTests = runAllTests;
}

