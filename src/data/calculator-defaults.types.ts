/**
 * TypeScript types for calculator-defaults.ts
 * 
 * FIELD DEFINITIONS & UNITS:
 * 
 * === GLOBAL ===
 * vynosInvestice: Expected annual return on investment portfolio (% p.a.)
 * urokovaSazbaHypoteky: Initial mortgage interest rate for years 1-5 (% p.a.)
 * urokovaSazbaHypotekyFuture: Expected mortgage rate after refinancing, years 6-30 (% p.a.)
 * ocekavanaInflace: Expected annual inflation rate (% p.a.)
 * 
 * === PER CITY ===
 * displayName: Human-readable city name with diacritics (e.g., "České Budějovice")
 * rustNajemneho: Expected annual rent growth rate (% p.a.)
 * rustHodnotyNemovitosti: Expected annual property value growth (% p.a.)
 * 
 * === PER APARTMENT ===
 * kupniCena: Purchase price (Kč, total)
 * najemne: Monthly rent for comparable apartment (Kč/month)
 * squareMeters: Typical apartment size (m²)
 * fondOprav: Monthly SVJ repair fund contribution (Kč/month, total for unit)
 *   - Note: SVJ typically charges 20-50 Kč/m²/month, we store total
 * zarizeniNemovitosti: One-time furnishing cost (Kč, furniture + appliances)
 * danZNemovitosti: Annual property tax (Kč/year)
 *   - Depends on municipality coefficient (1.0-5.0) and property category
 *   - Values assume typical residential category in city center
 * pojisteniNemovitosti: Annual building insurance (Kč/year)
 *   - Covers: building structure (pojištění nemovitosti)
 *   - Does NOT cover: household contents (pojištění domácnosti)
 * nakladyUdrzba: Annual routine maintenance budget (Kč/year)
 *   - Includes: minor repairs, appliance servicing, cosmetic fixes
 *   - Excludes: major capex (roof, facade, windows) - assumed covered by fondOprav
 */

export interface ApartmentDefaults {
  kupniCena: number;
  najemne: number;
  squareMeters: number;
  fondOprav: number;
  zarizeniNemovitosti: number;
  danZNemovitosti: number;
  pojisteniNemovitosti: number;
  nakladyUdrzba: number;
}

export interface CityDefaults {
  displayName: string;
  rustNajemneho: number;
  rustHodnotyNemovitosti: number;
  apartments: {
    "1+kk": ApartmentDefaults;
    "2+kk": ApartmentDefaults;
    "3+kk": ApartmentDefaults;
    "4+kk": ApartmentDefaults;
  };
}

export interface GlobalDefaults {
  vynosInvestice: number;
  urokovaSazbaHypoteky: number;
  urokovaSazbaHypotekyFuture: number;
  ocekavanaInflace: number;
}

export interface CalculatorDefaults {
  lastUpdated: string;
  global: GlobalDefaults;
  cities: Record<string, CityDefaults>;
}

export type ApartmentSize = "1+kk" | "2+kk" | "3+kk" | "4+kk";

export const APARTMENT_SIZES: ApartmentSize[] = ["1+kk", "2+kk", "3+kk", "4+kk"];

