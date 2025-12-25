/**
 * Formatting and parsing utilities for the calculator
 * All functions handle Czech locale (comma as decimal separator, space as thousands separator)
 */

/**
 * Format a value in Kč as millions with one decimal place
 * @param valueKc - Value in Kč (e.g. 7_800_000)
 * @returns Formatted string (e.g. "7,8")
 */
export function formatMillionsCzk(valueKc: number): string {
  if (isNaN(valueKc) || valueKc === null || valueKc === undefined) return "0";
  
  const millions = valueKc / 1_000_000;
  // Round to 1 decimal place
  const rounded = Math.round(millions * 10) / 10;
  
  const formatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: rounded % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
  
  return formatter.format(rounded);
}

/**
 * Format value in short form (e.g. "2,1 mil. Kč" or "800 tis. Kč")
 * @param value - Value in Kč
 * @returns Formatted string
 */
export function formatCashShort(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0 Kč";
  
  if (value >= 1_000_000) {
    return `${formatMillionsCzk(value)} mil. Kč`;
  } else if (value >= 1000) {
    return `${Math.round(value / 1000)} tis. Kč`;
  } else {
    return `${value} Kč`;
  }
}

/**
 * Parse a millions string back to Kč
 * @param input - Input string (e.g. "7,8" or "7.8")
 * @returns Value in Kč (e.g. 7_800_000), or null if invalid
 */
export function parseMillionsCzk(input: string): number | null {
  if (!input || input.trim() === "") return null;
  
  // Accept both comma and dot as decimal separator, strip spaces
  const normalized = input.replace(/\s/g, "").replace(",", ".");
  const numeric = Number(normalized);
  
  if (Number.isNaN(numeric)) return null;
  
  return Math.round(numeric * 1_000_000);
}

/**
 * Format a value in Kč with space as thousands separator
 * @param value - Value in Kč (e.g. 24000)
 * @returns Formatted string (e.g. "24 000")
 */
export function formatCzk(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  
  return new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Parse a Kč string back to a number
 * @param input - Input string (e.g. "24 000" or "24000")
 * @returns Numeric value (e.g. 24000), or null if invalid
 */
export function parseCzk(input: string): number | null {
  if (!input || input.trim() === "") return null;
  
  // Remove spaces (thousands separators)
  const normalized = input.replace(/\s/g, "");
  const numeric = Number(normalized);
  
  return Number.isNaN(numeric) ? null : numeric;
}

/**
 * Format a percentage value with Czech decimal comma
 * @param value - Percentage value (e.g. 4.5)
 * @returns Formatted string (e.g. "4,5")
 */
export function formatPercent(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  
  const formatter = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
  
  return formatter.format(value);
}

/**
 * Parse a percentage string back to a number
 * @param input - Input string (e.g. "4,5" or "4.5")
 * @returns Numeric value (e.g. 4.5), or null if invalid
 */
export function parsePercent(input: string): number | null {
  if (!input || input.trim() === "") return null;
  
  // Replace comma with dot for parsing, strip spaces
  const normalized = input.replace(/\s/g, "").replace(",", ".");
  const numeric = Number(normalized);
  
  return Number.isNaN(numeric) ? null : numeric;
}

/**
 * Format large currency values with abbreviation for display
 * @param value - Value in Kč
 * @returns Formatted string (e.g. "60,3 mil. Kč" or "450 000 Kč")
 */
export function formatLargeCurrency(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0 Kč";
  
  if (value >= 1_000_000) {
    return `${formatMillionsCzk(value)} mil. Kč`;
  } else {
    return `${formatCzk(value)} Kč`;
  }
}

/**
 * Sanitize numeric input (integers only, allows spaces)
 * @param value - Raw input string
 * @returns Sanitized string with only digits and spaces
 */
export function sanitizeNumericInput(value: string): string {
  return value.replace(/[^\d\s]/g, "");
}

/**
 * Sanitize decimal input (allows comma or dot as decimal separator)
 * @param value - Raw input string
 * @returns Sanitized string with only digits and one comma
 */
export function sanitizeDecimalInput(value: string): string {
  // Allow only digits, comma, and dot
  let sanitized = value.replace(/[^\d,\.]/g, "");
  
  // Replace dot with comma for Czech locale consistency
  sanitized = sanitized.replace(/\./g, ",");
  
  // Allow only one comma
  const parts = sanitized.split(",");
  if (parts.length > 2) {
    sanitized = parts[0] + "," + parts.slice(1).join("");
  }
  
  return sanitized;
}
