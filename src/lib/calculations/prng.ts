/**
 * Seedable Pseudo-Random Number Generator
 * 
 * Uses Mulberry32 algorithm - fast, seedable 32-bit PRNG with good statistical properties.
 * Includes Box-Muller transform for Gaussian (normal) distribution sampling.
 */

export interface PRNG {
  /** Returns a random number in [0, 1) */
  next(): number;
  /** Returns a random number from standard normal distribution N(0,1) */
  nextGaussian(): number;
}

/**
 * Creates a seedable PRNG using Mulberry32 algorithm.
 * 
 * @param seed - Initial seed value (default: 12345)
 * @returns PRNG instance with next() and nextGaussian() methods
 */
export function createPRNG(seed: number = 12345): PRNG {
  let state = seed >>> 0; // Ensure unsigned 32-bit integer

  // Mulberry32 algorithm
  function next(): number {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Box-Muller transform for Gaussian distribution
  // Generates two independent standard normal values, returns one at a time
  let hasSpare = false;
  let spare = 0;

  function nextGaussian(): number {
    if (hasSpare) {
      hasSpare = false;
      return spare;
    }

    // Generate two uniform random numbers in (0, 1)
    let u: number, v: number, s: number;
    do {
      u = next() * 2 - 1; // [-1, 1)
      v = next() * 2 - 1; // [-1, 1)
      s = u * u + v * v;
    } while (s >= 1 || s === 0);

    const mul = Math.sqrt(-2 * Math.log(s) / s);
    spare = v * mul;
    hasSpare = true;
    return u * mul;
  }

  return { next, nextGaussian };
}

/**
 * Default seed for reproducible Monte Carlo simulations
 */
export const DEFAULT_SEED = 12345;

