/**
 * Monte Carlo Simulation Configuration
 * 
 * Contains all volatility parameters, persistence factors, and clipping bounds
 * for the stochastic drivers used in Monte Carlo simulations.
 * 
 * These values are configurable for future tuning but have sensible defaults
 * based on historical market data and financial modeling best practices.
 */

/**
 * Configuration for a stochastic driver.
 */
export interface DriverConfig {
  /** Annual volatility (standard deviation) */
  sigma: number;
  /** Persistence/mean-reversion factor for AR(1) models (0 = iid, 1 = random walk) */
  phi: number;
  /** [lower, upper] bounds for winsorization */
  bounds: [number, number];
}

/**
 * Monte Carlo configuration object.
 * 
 * All volatility values (sigma) are in decimal form (0.18 = 18%).
 * All bounds are in decimal form (0.60 = 60%).
 */
export const MC_CONFIG = {
  /**
   * Investment returns configuration.
   * 
   * Model: i.i.d. Normal
   * Formula: r_inv[t] = mean + sigma * Z
   * 
   * Rationale:
   * - 18% annual volatility is reasonable for a diversified global equity portfolio
   * - Bounds: -60% to +60% covers extreme but possible annual returns
   */
  investment: {
    sigma: 0.18,       // 18% annual volatility
    phi: 0,            // i.i.d. (no persistence)
    bounds: [-0.60, 0.60] as [number, number],
  } satisfies DriverConfig,

  /**
   * Property value growth configuration.
   * 
   * Model: AR(1) - Autoregressive with mean reversion
   * Formula: g_prop[t] = mean + phi * (g_prop[t-1] - mean) + sigma * Z
   * 
   * Rationale:
   * - Property markets show cycles (persistence) hence AR(1)
   * - phi=0.4 means moderate persistence (shocks decay ~40% each year)
   * - 8% volatility is reasonable for residential property
   * - Bounds: -20% to +25% prevents extreme single-year swings
   */
  property: {
    sigma: 0.08,       // 8% annual volatility
    phi: 0.4,          // Moderate persistence
    bounds: [-0.20, 0.25] as [number, number],
  } satisfies DriverConfig,

  /**
   * Rent growth configuration.
   * 
   * Model: i.i.d. Normal
   * Formula: g_rent[t] = mean + sigma * Z
   * 
   * Rationale:
   * - Rents are sticky and less volatile than property prices
   * - 4% volatility captures normal year-to-year variation
   * - Bounds: -10% to +20% (rents rarely drop much in nominal terms)
   */
  rent: {
    sigma: 0.04,       // 4% annual volatility
    phi: 0,            // i.i.d. (no persistence)
    bounds: [-0.10, 0.20] as [number, number],
  } satisfies DriverConfig,

  /**
   * Mortgage rate configuration.
   * 
   * Model: AR(1) on refix periods (every 5 years)
   * Formula: r_fix[k] = mean + phi * (r_fix[k-1] - mean) + sigma * Z
   * 
   * Note: This generates rates at 5-year refix boundaries, not annually.
   * Years 1-5 always use the current fixed rate from user input.
   * 
   * Rationale:
   * - Interest rates are highly persistent
   * - phi=0.6 means strong persistence across refix periods
   * - 1.5% volatility at refix captures typical rate uncertainty
   * - Bounds: 0.5% to 12% covers historical Czech mortgage rate range
   */
  mortgageRate: {
    sigma: 0.015,      // 1.5% absolute volatility at refix
    phi: 0.6,          // Strong persistence
    bounds: [0.005, 0.12] as [number, number], // 0.5% to 12%
  } satisfies DriverConfig,
};

/**
 * Default Monte Carlo simulation parameters.
 */
export const MC_DEFAULTS = {
  /** Number of simulation runs */
  iterations: 10000,
  /** Default seed for reproducibility */
  seed: 12345,
  /** Simulation horizon in years */
  horizonYears: 30,
  /** Number of years in a mortgage refix period */
  refixPeriodYears: 5,
};

/**
 * Clamp a value to within bounds (winsorization).
 * 
 * @param value - The value to clamp
 * @param bounds - [lower, upper] bounds
 * @returns The clamped value
 */
export function clamp(value: number, bounds: [number, number]): number {
  return Math.max(bounds[0], Math.min(bounds[1], value));
}

