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
  lastUpdated: "2025-01-15",
  
  global: {
    vynosInvestice: 8.0,                  // PLACEHOLDER - historical S&P 500 average
    urokovaSazbaHypoteky: 4.7,            // PLACEHOLDER - current average mortgage rate
    urokovaSazbaHypotekyFuture: 4.3,      // PLACEHOLDER - expected future rate after fixation
    ocekavanaInflace: 3.0,                // PLACEHOLDER - ČNB inflation target
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
          fondOprav: 300,                 // PLACEHOLDER
          zarizeniNemovitosti: 250000,    // PLACEHOLDER
          danZNemovitosti: 2000,          // PLACEHOLDER
          pojisteniNemovitosti: 1900,     // PLACEHOLDER
          nakladyUdrzba: 30000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 8100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=481
          fondOprav: 450,                 // PLACEHOLDER
          zarizeniNemovitosti: 350000,    // PLACEHOLDER
          danZNemovitosti: 3000,          // PLACEHOLDER
          pojisteniNemovitosti: 2500,     // PLACEHOLDER
          nakladyUdrzba: 40000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 11700000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 36500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 83,               // VERIFIED - Sreality median, N=486
          fondOprav: 600,                 // PLACEHOLDER
          zarizeniNemovitosti: 450000,    // PLACEHOLDER
          danZNemovitosti: 4000,          // PLACEHOLDER
          pojisteniNemovitosti: 3200,     // PLACEHOLDER
          nakladyUdrzba: 50000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 15500000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 46500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 112,              // VERIFIED - Sreality median, N=407
          fondOprav: 750,                 // PLACEHOLDER
          zarizeniNemovitosti: 550000,    // PLACEHOLDER
          danZNemovitosti: 5000,          // PLACEHOLDER
          pojisteniNemovitosti: 4000,     // PLACEHOLDER
          nakladyUdrzba: 60000,           // PLACEHOLDER
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
          fondOprav: 250,                 // PLACEHOLDER
          zarizeniNemovitosti: 200000,    // PLACEHOLDER
          danZNemovitosti: 1500,          // PLACEHOLDER
          pojisteniNemovitosti: 1500,     // PLACEHOLDER
          nakladyUdrzba: 25000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 6300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=479
          fondOprav: 380,                 // PLACEHOLDER
          zarizeniNemovitosti: 280000,    // PLACEHOLDER
          danZNemovitosti: 2200,          // PLACEHOLDER
          pojisteniNemovitosti: 2000,     // PLACEHOLDER
          nakladyUdrzba: 32000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 8800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 79,               // VERIFIED - Sreality median, N=395
          fondOprav: 500,                 // PLACEHOLDER
          zarizeniNemovitosti: 360000,    // PLACEHOLDER
          danZNemovitosti: 3000,          // PLACEHOLDER
          pojisteniNemovitosti: 2600,     // PLACEHOLDER
          nakladyUdrzba: 40000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 11700000,            // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 37000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 107,              // VERIFIED - Sreality median, N=179
          fondOprav: 650,                 // PLACEHOLDER
          zarizeniNemovitosti: 450000,    // PLACEHOLDER
          danZNemovitosti: 3800,          // PLACEHOLDER
          pojisteniNemovitosti: 3200,     // PLACEHOLDER
          nakladyUdrzba: 48000,           // PLACEHOLDER
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
          fondOprav: 200,                 // PLACEHOLDER
          zarizeniNemovitosti: 150000,    // PLACEHOLDER
          danZNemovitosti: 1000,          // PLACEHOLDER
          pojisteniNemovitosti: 1200,     // PLACEHOLDER
          nakladyUdrzba: 20000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 3400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 13000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=126
          fondOprav: 300,                 // PLACEHOLDER
          zarizeniNemovitosti: 220000,    // PLACEHOLDER
          danZNemovitosti: 1500,          // PLACEHOLDER
          pojisteniNemovitosti: 1600,     // PLACEHOLDER
          nakladyUdrzba: 26000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 4400000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 76,               // VERIFIED - Sreality median, N=152
          fondOprav: 400,                 // PLACEHOLDER
          zarizeniNemovitosti: 280000,    // PLACEHOLDER
          danZNemovitosti: 2000,          // PLACEHOLDER
          pojisteniNemovitosti: 2000,     // PLACEHOLDER
          nakladyUdrzba: 32000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 5900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 103,              // VERIFIED - Sreality median, N=59
          fondOprav: 500,                 // PLACEHOLDER
          zarizeniNemovitosti: 350000,    // PLACEHOLDER
          danZNemovitosti: 2500,          // PLACEHOLDER
          pojisteniNemovitosti: 2500,     // PLACEHOLDER
          nakladyUdrzba: 38000,           // PLACEHOLDER
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
          fondOprav: 230,                 // PLACEHOLDER
          zarizeniNemovitosti: 180000,    // PLACEHOLDER
          danZNemovitosti: 1300,          // PLACEHOLDER
          pojisteniNemovitosti: 1400,     // PLACEHOLDER
          nakladyUdrzba: 22000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 56,               // VERIFIED - Sreality median, N=136
          fondOprav: 350,                 // PLACEHOLDER
          zarizeniNemovitosti: 260000,    // PLACEHOLDER
          danZNemovitosti: 1900,          // PLACEHOLDER
          pojisteniNemovitosti: 1800,     // PLACEHOLDER
          nakladyUdrzba: 30000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 78,               // VERIFIED - Sreality median, N=156
          fondOprav: 460,                 // PLACEHOLDER
          zarizeniNemovitosti: 330000,    // PLACEHOLDER
          danZNemovitosti: 2600,          // PLACEHOLDER
          pojisteniNemovitosti: 2300,     // PLACEHOLDER
          nakladyUdrzba: 36000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 103,              // VERIFIED - Sreality median, N=43
          fondOprav: 580,                 // PLACEHOLDER
          zarizeniNemovitosti: 420000,    // PLACEHOLDER
          danZNemovitosti: 3200,          // PLACEHOLDER
          pojisteniNemovitosti: 2900,     // PLACEHOLDER
          nakladyUdrzba: 44000,           // PLACEHOLDER
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
          fondOprav: 240,                 // PLACEHOLDER
          zarizeniNemovitosti: 180000,    // PLACEHOLDER
          danZNemovitosti: 1400,          // PLACEHOLDER
          pojisteniNemovitosti: 1500,     // PLACEHOLDER
          nakladyUdrzba: 23000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4800000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 56,               // VERIFIED - Sreality median, N=157
          fondOprav: 360,                 // PLACEHOLDER
          zarizeniNemovitosti: 260000,    // PLACEHOLDER
          danZNemovitosti: 2000,          // PLACEHOLDER
          pojisteniNemovitosti: 1900,     // PLACEHOLDER
          nakladyUdrzba: 30000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 81,               // VERIFIED - Sreality median, N=190
          fondOprav: 480,                 // PLACEHOLDER
          zarizeniNemovitosti: 340000,    // PLACEHOLDER
          danZNemovitosti: 2800,          // PLACEHOLDER
          pojisteniNemovitosti: 2500,     // PLACEHOLDER
          nakladyUdrzba: 38000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 100,              // VERIFIED - Sreality median, N=75
          fondOprav: 600,                 // PLACEHOLDER
          zarizeniNemovitosti: 430000,    // PLACEHOLDER
          danZNemovitosti: 3500,          // PLACEHOLDER
          pojisteniNemovitosti: 3100,     // PLACEHOLDER
          nakladyUdrzba: 46000,           // PLACEHOLDER
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
          fondOprav: 240,                 // PLACEHOLDER
          zarizeniNemovitosti: 180000,    // PLACEHOLDER
          danZNemovitosti: 1400,          // PLACEHOLDER
          pojisteniNemovitosti: 1500,     // PLACEHOLDER
          nakladyUdrzba: 23000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 52,               // VERIFIED - Sreality median, N=159
          fondOprav: 370,                 // PLACEHOLDER
          zarizeniNemovitosti: 260000,    // PLACEHOLDER
          danZNemovitosti: 2100,          // PLACEHOLDER
          pojisteniNemovitosti: 2000,     // PLACEHOLDER
          nakladyUdrzba: 31000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 23000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 79,               // VERIFIED - Sreality median, N=141
          fondOprav: 490,                 // PLACEHOLDER
          zarizeniNemovitosti: 350000,    // PLACEHOLDER
          danZNemovitosti: 2900,          // PLACEHOLDER
          pojisteniNemovitosti: 2600,     // PLACEHOLDER
          nakladyUdrzba: 39000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 97,               // VERIFIED - Sreality median, N=40
          fondOprav: 620,                 // PLACEHOLDER
          zarizeniNemovitosti: 440000,    // PLACEHOLDER
          danZNemovitosti: 3600,          // PLACEHOLDER
          pojisteniNemovitosti: 3200,     // PLACEHOLDER
          nakladyUdrzba: 47000,           // PLACEHOLDER
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
          fondOprav: 220,                 // PLACEHOLDER
          zarizeniNemovitosti: 170000,    // PLACEHOLDER
          danZNemovitosti: 1200,          // PLACEHOLDER
          pojisteniNemovitosti: 1300,     // PLACEHOLDER
          nakladyUdrzba: 21000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=145
          fondOprav: 330,                 // PLACEHOLDER
          zarizeniNemovitosti: 240000,    // PLACEHOLDER
          danZNemovitosti: 1800,          // PLACEHOLDER
          pojisteniNemovitosti: 1700,     // PLACEHOLDER
          nakladyUdrzba: 28000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 23000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 82,               // VERIFIED - Sreality median, N=131
          fondOprav: 440,                 // PLACEHOLDER
          zarizeniNemovitosti: 320000,    // PLACEHOLDER
          danZNemovitosti: 2400,          // PLACEHOLDER
          pojisteniNemovitosti: 2200,     // PLACEHOLDER
          nakladyUdrzba: 35000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 105,              // VERIFIED - Sreality median, N=37
          fondOprav: 560,                 // PLACEHOLDER
          zarizeniNemovitosti: 400000,    // PLACEHOLDER
          danZNemovitosti: 3000,          // PLACEHOLDER
          pojisteniNemovitosti: 2700,     // PLACEHOLDER
          nakladyUdrzba: 42000,           // PLACEHOLDER
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
          fondOprav: 230,                 // PLACEHOLDER
          zarizeniNemovitosti: 170000,    // PLACEHOLDER
          danZNemovitosti: 1300,          // PLACEHOLDER
          pojisteniNemovitosti: 1400,     // PLACEHOLDER
          nakladyUdrzba: 22000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 53,               // VERIFIED - Sreality median, N=139
          fondOprav: 340,                 // PLACEHOLDER
          zarizeniNemovitosti: 250000,    // PLACEHOLDER
          danZNemovitosti: 1900,          // PLACEHOLDER
          pojisteniNemovitosti: 1800,     // PLACEHOLDER
          nakladyUdrzba: 29000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 80,               // VERIFIED - Sreality median, N=143
          fondOprav: 460,                 // PLACEHOLDER
          zarizeniNemovitosti: 330000,    // PLACEHOLDER
          danZNemovitosti: 2500,          // PLACEHOLDER
          pojisteniNemovitosti: 2300,     // PLACEHOLDER
          nakladyUdrzba: 36000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 26000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 98,               // VERIFIED - Sreality median, N=51
          fondOprav: 580,                 // PLACEHOLDER
          zarizeniNemovitosti: 410000,    // PLACEHOLDER
          danZNemovitosti: 3100,          // PLACEHOLDER
          pojisteniNemovitosti: 2900,     // PLACEHOLDER
          nakladyUdrzba: 44000,           // PLACEHOLDER
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
          fondOprav: 230,                 // PLACEHOLDER
          zarizeniNemovitosti: 175000,    // PLACEHOLDER
          danZNemovitosti: 1300,          // PLACEHOLDER
          pojisteniNemovitosti: 1400,     // PLACEHOLDER
          nakladyUdrzba: 22000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=65
          fondOprav: 350,                 // PLACEHOLDER
          zarizeniNemovitosti: 255000,    // PLACEHOLDER
          danZNemovitosti: 1950,          // PLACEHOLDER
          pojisteniNemovitosti: 1850,     // PLACEHOLDER
          nakladyUdrzba: 29000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 6100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 21000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 75,               // VERIFIED - Sreality median, N=86
          fondOprav: 470,                 // PLACEHOLDER
          zarizeniNemovitosti: 335000,    // PLACEHOLDER
          danZNemovitosti: 2600,          // PLACEHOLDER
          pojisteniNemovitosti: 2350,     // PLACEHOLDER
          nakladyUdrzba: 37000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 8100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 27500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 102,              // VERIFIED - Sreality median, N=22
          fondOprav: 590,                 // PLACEHOLDER
          zarizeniNemovitosti: 420000,    // PLACEHOLDER
          danZNemovitosti: 3250,          // PLACEHOLDER
          pojisteniNemovitosti: 2950,     // PLACEHOLDER
          nakladyUdrzba: 45000,           // PLACEHOLDER
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
          fondOprav: 180,                 // PLACEHOLDER
          zarizeniNemovitosti: 140000,    // PLACEHOLDER
          danZNemovitosti: 900,           // PLACEHOLDER
          pojisteniNemovitosti: 1100,     // PLACEHOLDER
          nakladyUdrzba: 18000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 2300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 10500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 48,               // VERIFIED - Sreality median, N=120
          fondOprav: 270,                 // PLACEHOLDER
          zarizeniNemovitosti: 200000,    // PLACEHOLDER
          danZNemovitosti: 1300,          // PLACEHOLDER
          pojisteniNemovitosti: 1400,     // PLACEHOLDER
          nakladyUdrzba: 24000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 3300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 16000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 76,               // VERIFIED - Sreality median, N=81
          fondOprav: 360,                 // PLACEHOLDER
          zarizeniNemovitosti: 260000,    // PLACEHOLDER
          danZNemovitosti: 1700,          // PLACEHOLDER
          pojisteniNemovitosti: 1800,     // PLACEHOLDER
          nakladyUdrzba: 30000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 4100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 18500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 94,               // VERIFIED - Sreality median, N=16
          fondOprav: 450,                 // PLACEHOLDER
          zarizeniNemovitosti: 320000,    // PLACEHOLDER
          danZNemovitosti: 2100,          // PLACEHOLDER
          pojisteniNemovitosti: 2200,     // PLACEHOLDER
          nakladyUdrzba: 36000,           // PLACEHOLDER
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
          fondOprav: 210,                 // PLACEHOLDER
          zarizeniNemovitosti: 160000,    // PLACEHOLDER
          danZNemovitosti: 1100,          // PLACEHOLDER
          pojisteniNemovitosti: 1300,     // PLACEHOLDER
          nakladyUdrzba: 20000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 3300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 15500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 60,               // VERIFIED - Sreality median, N=133
          fondOprav: 320,                 // PLACEHOLDER
          zarizeniNemovitosti: 230000,    // PLACEHOLDER
          danZNemovitosti: 1650,          // PLACEHOLDER
          pojisteniNemovitosti: 1650,     // PLACEHOLDER
          nakladyUdrzba: 27000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 4500000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 87,               // VERIFIED - Sreality median, N=107
          fondOprav: 420,                 // PLACEHOLDER
          zarizeniNemovitosti: 300000,    // PLACEHOLDER
          danZNemovitosti: 2200,          // PLACEHOLDER
          pojisteniNemovitosti: 2100,     // PLACEHOLDER
          nakladyUdrzba: 34000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 5700000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 25500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 113,              // VERIFIED - Sreality median, N=30
          fondOprav: 530,                 // PLACEHOLDER
          zarizeniNemovitosti: 380000,    // PLACEHOLDER
          danZNemovitosti: 2750,          // PLACEHOLDER
          pojisteniNemovitosti: 2600,     // PLACEHOLDER
          nakladyUdrzba: 41000,           // PLACEHOLDER
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
          fondOprav: 200,                 // PLACEHOLDER
          zarizeniNemovitosti: 155000,    // PLACEHOLDER
          danZNemovitosti: 1050,          // PLACEHOLDER
          pojisteniNemovitosti: 1250,     // PLACEHOLDER
          nakladyUdrzba: 19000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4100000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 15500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 57,               // VERIFIED - Sreality median, N=51
          fondOprav: 310,                 // PLACEHOLDER
          zarizeniNemovitosti: 225000,    // PLACEHOLDER
          danZNemovitosti: 1600,          // PLACEHOLDER
          pojisteniNemovitosti: 1600,     // PLACEHOLDER
          nakladyUdrzba: 26000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 5300000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 20500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 80,               // VERIFIED - Sreality median, N=74
          fondOprav: 410,                 // PLACEHOLDER
          zarizeniNemovitosti: 295000,    // PLACEHOLDER
          danZNemovitosti: 2100,          // PLACEHOLDER
          pojisteniNemovitosti: 2050,     // PLACEHOLDER
          nakladyUdrzba: 33000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 6900000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 26000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 106,              // VERIFIED - Sreality median, N=18
          fondOprav: 520,                 // PLACEHOLDER
          zarizeniNemovitosti: 370000,    // PLACEHOLDER
          danZNemovitosti: 2650,          // PLACEHOLDER
          pojisteniNemovitosti: 2550,     // PLACEHOLDER
          nakladyUdrzba: 40000,           // PLACEHOLDER
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
          fondOprav: 210,                 // PLACEHOLDER
          zarizeniNemovitosti: 165000,    // PLACEHOLDER
          danZNemovitosti: 1150,          // PLACEHOLDER
          pojisteniNemovitosti: 1300,     // PLACEHOLDER
          nakladyUdrzba: 20000,           // PLACEHOLDER
        },
        "2+kk": {
          kupniCena: 4200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 17000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 54,               // VERIFIED - Sreality median, N=60
          fondOprav: 330,                 // PLACEHOLDER
          zarizeniNemovitosti: 240000,    // PLACEHOLDER
          danZNemovitosti: 1750,          // PLACEHOLDER
          pojisteniNemovitosti: 1700,     // PLACEHOLDER
          nakladyUdrzba: 27000,           // PLACEHOLDER
        },
        "3+kk": {
          kupniCena: 5600000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 22500,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 77,               // VERIFIED - Sreality median, N=65
          fondOprav: 440,                 // PLACEHOLDER
          zarizeniNemovitosti: 315000,    // PLACEHOLDER
          danZNemovitosti: 2300,          // PLACEHOLDER
          pojisteniNemovitosti: 2150,     // PLACEHOLDER
          nakladyUdrzba: 34000,           // PLACEHOLDER
        },
        "4+kk": {
          kupniCena: 7200000,             // DERIVED - CBA Monitor Q3 2025 × size multiplier × m²
          najemne: 28000,                 // DERIVED - GPG Q1 2025 × rent multiplier × m²
          squareMeters: 102,              // VERIFIED - Sreality median, N=37
          fondOprav: 550,                 // PLACEHOLDER
          zarizeniNemovitosti: 395000,    // PLACEHOLDER
          danZNemovitosti: 2900,          // PLACEHOLDER
          pojisteniNemovitosti: 2700,     // PLACEHOLDER
          nakladyUdrzba: 42000,           // PLACEHOLDER
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
