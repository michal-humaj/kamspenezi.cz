// TypeScript types for calculator-defaults.ts

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
  urokovaSazbaHypoteky: number; // Initial mortgage rate (years 1-5)
  urokovaSazbaHypotekyFuture: number; // Future mortgage rate (years 6-30, after refinancing)
  ocekavanaInflace: number;
}

export interface CalculatorDefaults {
  lastUpdated: string;
  global: GlobalDefaults;
  cities: Record<string, CityDefaults>;
}

export type ApartmentSize = "1+kk" | "2+kk" | "3+kk" | "4+kk";

export const APARTMENT_SIZES: ApartmentSize[] = ["1+kk", "2+kk", "3+kk", "4+kk"];

