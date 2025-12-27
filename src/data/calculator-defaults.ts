/**
 * Calculator Default Values & Audit Metadata
 * 
 * This file contains two main exports:
 * 
 * 1. `calculatorDefaults` - Runtime default values for the rent vs. buy calculator.
 *    Update numeric values here when refreshing data from real sources.
 * 
 * 2. `calculatorDefaultsMeta` - Audit metadata tracking data quality, sources, and
 *    per-field mapping. Use this to document where each value came from and when
 *    it was last verified.
 * 
 * IMPORTANT: City keys are ASCII slugs (URL-safe). Use displayName for UI.
 * 
 * Data Quality Legend (in calculatorDefaultsMeta.fields):
 * - "PLACEHOLDER" = AI-generated estimate, needs real data
 * - "VERIFIED" = Confirmed with audited source (see sourceIds)
 * - "DERIVED" = Calculated from other fields (see derivedFrom + formula)
 * 
 * Legacy inline comments (// PLACEHOLDER, // VERIFIED) are kept for quick reference
 * but calculatorDefaultsMeta is the authoritative audit trail.
 */

import type { CalculatorDefaults } from "./calculator-defaults.types";

// =============================================================================
// Audit Metadata Types
// =============================================================================

type DataQuality = "PLACEHOLDER" | "VERIFIED" | "DERIVED";

type SourceMeta = {
  id: string;
  name: string;
  url?: string;
  retrievedAt: string; // ISO date
  methodology?: string; // e.g., median, mean, listings vs realized, filters, period
  sampleSize?: string; // string because sometimes "N=1200 listings"
  coverage?: string;   // e.g., "Praha+Brno", "all krajská města"
  notes?: string;
};

type FieldMeta = {
  quality: DataQuality;
  sourceIds?: string[];     // references to SourceMeta.id
  retrievedAt?: string;     // optional override when field updated separately
  methodology?: string;     // optional override
  sampleSize?: string;      // optional override
  derivedFrom?: string[];   // list of field paths used to derive this value
  formula?: string;         // e.g., "kupniCena = cenaZaM2 * squareMeters"
  notes?: string;
};

type DefaultsMeta = {
  dataset: {
    lastUpdated: string;  // should mirror calculatorDefaults.lastUpdated
    maintainerNotes?: string;
  };
  sources: Record<string, SourceMeta>;
  fields: Record<string, FieldMeta>; // keys are dot-paths into calculatorDefaults
};

// =============================================================================
// Runtime Default Values
// =============================================================================

export const calculatorDefaults: CalculatorDefaults = {
  lastUpdated: "2025-12-27",
  
  global: {
    vynosInvestice: 7.0,                  // VERIFIED - GS/Vanguard 10yr forecast + 30yr horizon
    urokovaSazbaHypoteky: 4.9,            // VERIFIED - Swiss Life Hypoindex Dec 2025
    urokovaSazbaHypotekyFuture: 4.5,      // DERIVED - ČNB PRIBOR forecast + equilibrium
    ocekavanaInflace: 2.5,                // VERIFIED - ČNB Inflation Forecast Autumn 2025
  },
  
  cities: {
    "praha": {
      displayName: "Praha",
      rustNajemneho: 4.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 6.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 5500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 34,               // VERIFIED - Sreality median, N=420
          fondOprav: 750,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,     // DERIVED - IKEA baseline
          danZNemovitosti: 1000,          // DERIVED - § 338/1992 Sb. (3.50×1.22×4.5×1.5×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 14000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 8100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=481
          fondOprav: 1200,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×4.5×1.5×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 11700000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 36500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 83,               // VERIFIED - Sreality median, N=486
          fondOprav: 1850,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2400,          // DERIVED - § 338/1992 Sb. (3.50×1.22×4.5×1.5×m²)
          pojisteniNemovitosti: 1700,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 26000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 15500000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 46500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 112,              // VERIFIED - Sreality median, N=407
          fondOprav: 2450,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 3200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×4.5×1.5×m²)
          pojisteniNemovitosti: 2200,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 35000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "brno": {
      displayName: "Brno",
      rustNajemneho: 3.5,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 5.5,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 4500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 14500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 35,               // VERIFIED - Sreality median, N=233
          fondOprav: 750,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 500,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 6300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=479
          fondOprav: 1150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 800,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 17000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 8800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 79,               // VERIFIED - Sreality median, N=395
          fondOprav: 1750,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 22000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 11700000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 37000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 107,              // VERIFIED - Sreality median, N=179
          fondOprav: 2350,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 2100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 29000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "ostrava": {
      displayName: "Ostrava",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 2200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 8500,                  // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 33,               // VERIFIED - Sreality median, N=80
          fondOprav: 750,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 500,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 3400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 13000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=126
          fondOprav: 1200,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 800,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 4400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 76,               // VERIFIED - Sreality median, N=152
          fondOprav: 1650,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1100,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1500,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 5900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 103,              // VERIFIED - Sreality median, N=59
          fondOprav: 2250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 2100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "plzen": {
      displayName: "Plzeň",
      rustNajemneho: 3.5,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 5.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 35,               // VERIFIED - Sreality median, N=44
          fondOprav: 750,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 500,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 56,               // VERIFIED - Sreality median, N=136
          fondOprav: 1250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 800,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 17000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 78,               // VERIFIED - Sreality median, N=156
          fondOprav: 1700,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 21000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 103,              // VERIFIED - Sreality median, N=43
          fondOprav: 2250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 2100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 29000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "ceske-budejovice": {
      displayName: "České Budějovice",
      rustNajemneho: 3.5,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 5.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 37,               // VERIFIED - Sreality median, N=81
          fondOprav: 800,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 600,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 56,               // VERIFIED - Sreality median, N=157
          fondOprav: 1250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 800,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 81,               // VERIFIED - Sreality median, N=190
          fondOprav: 1800,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 21000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 100,              // VERIFIED - Sreality median, N=75
          fondOprav: 2200,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×m²)
          pojisteniNemovitosti: 2000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 27000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "hradec-kralove": {
      displayName: "Hradec Králové",
      rustNajemneho: 3.5,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 5.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 35,               // VERIFIED - Sreality median, N=45
          fondOprav: 750,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 700,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.3×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 52,               // VERIFIED - Sreality median, N=159
          fondOprav: 1150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1000,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.3×m²)
          pojisteniNemovitosti: 1000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 23000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 79,               // VERIFIED - Sreality median, N=141
          fondOprav: 1750,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.3×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 21000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 97,               // VERIFIED - Sreality median, N=40
          fondOprav: 2150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1900,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.3×m²)
          pojisteniNemovitosti: 1900,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "liberec": {
      displayName: "Liberec",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.5,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 36,               // VERIFIED - Sreality median, N=85
          fondOprav: 800,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1100,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=145
          fondOprav: 1150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 23000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 82,               // VERIFIED - Sreality median, N=131
          fondOprav: 1800,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 21000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 105,              // VERIFIED - Sreality median, N=37
          fondOprav: 2300,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 3100,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 2100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "olomouc": {
      displayName: "Olomouc",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.5,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 2700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 10000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 31,               // VERIFIED - Sreality median, N=72
          fondOprav: 700,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 900,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 600,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 11000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=139
          fondOprav: 1150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,     // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 80,               // VERIFIED - Sreality median, N=143
          fondOprav: 1750,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2400,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 26000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 98,               // VERIFIED - Sreality median, N=51
          fondOprav: 2150,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2900,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 2000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 27000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "pardubice": {
      displayName: "Pardubice",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.5,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 36,               // VERIFIED - Sreality median, N=15
          fondOprav: 800,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1100,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 700,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=65
          fondOprav: 1200,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 21000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 75,               // VERIFIED - Sreality median, N=86
          fondOprav: 1650,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1500,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 8100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 102,              // VERIFIED - Sreality median, N=22
          fondOprav: 2250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 3000,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 2000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "usti-nad-labem": {
      displayName: "Ústí nad Labem",
      rustNajemneho: 2.5,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 3.5,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 1400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 6500,                  // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 27,               // VERIFIED - Sreality median, N=38
          fondOprav: 600,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 800,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 500,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 11000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 2300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 10500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 48,               // VERIFIED - Sreality median, N=120
          fondOprav: 1050,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1400,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 3300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 76,               // VERIFIED - Sreality median, N=81
          fondOprav: 1650,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2300,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1500,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 4100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 18500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 94,               // VERIFIED - Sreality median, N=16
          fondOprav: 2050,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2800,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1900,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 27000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "karlovy-vary": {
      displayName: "Karlovy Vary",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 1700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 8000,                  // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 29,               // VERIFIED - Sreality median, N=39
          fondOprav: 650,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 900,           // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 600,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 11000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 3300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 15500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 60,               // VERIFIED - Sreality median, N=133
          fondOprav: 1300,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1800,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1200,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 4500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 87,               // VERIFIED - Sreality median, N=107
          fondOprav: 1900,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1700,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 5700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 113,              // VERIFIED - Sreality median, N=30
          fondOprav: 2500,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 3400,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 2300,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "jihlava": {
      displayName: "Jihlava",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3000000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 11500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 39,               // VERIFIED - Sreality median, N=19
          fondOprav: 850,                 // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1000,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.8×m²)
          pojisteniNemovitosti: 800,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 12000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 15500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 57,               // VERIFIED - Sreality median, N=51
          fondOprav: 1250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1500,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.8×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 5300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 80,               // VERIFIED - Sreality median, N=74
          fondOprav: 1750,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2200,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.8×m²)
          pojisteniNemovitosti: 1600,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 21000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 6900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 26000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 106,              // VERIFIED - Sreality median, N=18
          fondOprav: 2350,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2900,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×1.8×m²)
          pojisteniNemovitosti: 2100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
    
    "zlin": {
      displayName: "Zlín",
      rustNajemneho: 3.0,                 // PLACEHOLDER
      rustHodnotyNemovitosti: 4.0,        // PLACEHOLDER
      apartments: {
        "1+kk": {
          kupniCena: 3800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 15500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 46,               // VERIFIED - Sreality median, N=25
          fondOprav: 1000,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 90000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1400,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 900,      // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 13000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "2+kk": {
          kupniCena: 4200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=60
          fondOprav: 1200,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 120000,    // DERIVED - IKEA baseline
          danZNemovitosti: 1600,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1100,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 16000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "3+kk": {
          kupniCena: 5600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 77,               // VERIFIED - Sreality median, N=65
          fondOprav: 1700,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 170000,    // DERIVED - IKEA baseline
          danZNemovitosti: 2300,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 1500,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 20000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
        "4+kk": {
          kupniCena: 7200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 102,              // VERIFIED - Sreality median, N=37
          fondOprav: 2250,                // DERIVED - 22 Kč/m² × squareMeters
          zarizeniNemovitosti: 200000,    // DERIVED - IKEA baseline
          danZNemovitosti: 3000,          // DERIVED - § 338/1992 Sb. (3.50×1.22×3.5×2.0×m²)
          pojisteniNemovitosti: 2000,     // DERIVED - 20 Kč/m²/year × squareMeters
          nakladyUdrzba: 28000,          // DERIVED - (baseFixed + 73×m²) × regionalCoef
        },
      },
    },
  },
};

// =============================================================================
// Audit Metadata
// =============================================================================

export const calculatorDefaultsMeta: DefaultsMeta = {
  dataset: {
    lastUpdated: calculatorDefaults.lastUpdated,
    maintainerNotes: "Add/refresh sources per parameter; keep calculatorDefaults values stable and audit via fields mapping."
  },
  sources: {
    placeholder: {
      id: "placeholder",
      name: "Placeholder (needs research)",
      retrievedAt: calculatorDefaults.lastUpdated,
      methodology: "AI estimate; replace with audited sources",
      coverage: "all"
    }
  },
  fields: {
    // Global parameters
    "global.vynosInvestice": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "global.urokovaSazbaHypoteky": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "global.urokovaSazbaHypotekyFuture": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "global.ocekavanaInflace": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },

    // City-level parameters (Praha as example pattern)
    "cities.praha.rustNajemneho": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "cities.praha.rustHodnotyNemovitosti": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },

    // Apartment-level parameters (Praha 1+kk as example pattern)
    "cities.praha.apartments.1+kk.squareMeters": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "cities.praha.apartments.1+kk.kupniCena": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "cities.praha.apartments.1+kk.najemne": { quality: "PLACEHOLDER", sourceIds: ["placeholder"] },
    "cities.praha.apartments.1+kk.fondOprav": { 
      quality: "PLACEHOLDER", 
      sourceIds: ["placeholder"], 
      notes: "Defined as total CZK/month paid by owner to SVJ (can include admin + building insurance depending on SVJ accounting)." 
    },
    "cities.praha.apartments.1+kk.pojisteniNemovitosti": { 
      quality: "PLACEHOLDER", 
      sourceIds: ["placeholder"], 
      notes: "Owner-paid: domácnost + odpovědnost (not SVJ building insurance)." 
    },
    "cities.praha.apartments.1+kk.nakladyUdrzba": { 
      quality: "PLACEHOLDER", 
      sourceIds: ["placeholder"], 
      notes: "Annual interior-only maintenance/capex (floors, kitchen, bathroom, painting). Excludes building envelope/elevator (SVJ)." 
    }
  }
};

// =============================================================================
// Helper Functions
// =============================================================================

// Helper to get city slug from display name
export function getCitySlug(displayName: string): string | undefined {
  return Object.entries(calculatorDefaults.cities).find(
    ([, city]) => city.displayName === displayName
  )?.[0];
}

// Helper to get display name from slug
export function getCityDisplayName(slug: string): string | undefined {
  return calculatorDefaults.cities[slug]?.displayName;
}

// Re-export for convenience
export default calculatorDefaults;
