/**
 * Calculator Defaults Metadata
 * 
 * Hierarchical audit metadata for calculator-defaults.ts values.
 * Organized by parameter (not by city) to reduce repetition.
 * 
 * Structure:
 * - sources: Reusable source definitions with URLs, dates, methodology
 * - cityMapping: Sreality API IDs + ČSÚ okres/kraj names for data joining
 * - parameters: Per-parameter metadata with optional city overrides
 */

// =============================================================================
// Types
// =============================================================================

export type DataQuality = "PLACEHOLDER" | "VERIFIED" | "DERIVED";

export type SourceMeta = {
  name: string;
  url?: string;
  retrievedAt: string; // ISO date
  methodology?: string;
  coverage?: string;
  notes?: string;
};

export type ParameterMeta = {
  quality: DataQuality;
  sourceIds: string[];
  methodology: string;
  retrievedAt: string;
  sampleSizes?: Record<string, Record<string, number>>; // city -> layout -> N
  derivedFrom?: string[];
  formula?: string;
  notes?: string;
  cityOverrides?: Record<string, Partial<ParameterMeta>>;
  // fondOprav-specific fields
  ratePerM2?: number;
  benchmarkRanges?: Record<string, { min: number; max: number }>;
  // kupniCena/najemne-specific fields
  cbaBaseline?: Record<string, number>;
  gpgBaseline?: Record<string, number>;
  sizeMultipliers?: Record<string, number>;
  rentMultipliers?: Record<string, number>;
};

export type CityMappingEntry = {
  displayName: string;
  srealityRegionId: number;
  srealityDistrictId: number;
  srealityMunicipalityId: number;
  okres: string;
  kraj: string;
  nuts: string;
};

// =============================================================================
// Metadata Export
// =============================================================================

export const calculatorDefaultsMeta = {
  dataset: {
    lastUpdated: "2025-01-15",
    version: "2.0",
    maintainerNotes: "Hierarchical metadata structure. Parameters documented once, city overrides only when needed.",
  },

  // =========================================================================
  // Reusable Source Definitions
  // =========================================================================
  sources: {
    "sreality-suggest-api-2025-01": {
      name: "Sreality.cz Suggest API",
      url: "https://www.sreality.cz/api/cs/v2/suggest",
      retrievedAt: "2025-01-15",
      methodology: "Query suggest endpoint with city name, extract municipality_cz category data",
      coverage: "All 13 krajská města",
    },
    "sreality-listings-sale-2025-01": {
      name: "Sreality.cz Sale Listings API",
      url: "https://www.sreality.cz/api/cs/v2/estates",
      retrievedAt: "2025-01-15",
      methodology: "Query estates endpoint filtered by category_main_cb=1 (byty), category_type_cb=1 (prodej), locality_region_id (city), category_sub_cb (layout). Extract area from listing name field. Compute median after filtering 15-250 m² range.",
      coverage: "All 13 krajská města, 4 layouts each (1+kk, 2+kk, 3+kk, 4+kk)",
      notes: "Area extracted from 'm²' in listing name. Non-breaking space (\\xa0) handled in parsing.",
    },
    "sreality-listings-rent-2025-01": {
      name: "Sreality.cz Rental Listings API",
      url: "https://www.sreality.cz/api/cs/v2/estates",
      retrievedAt: "2025-01-15",
      methodology: "Query estates endpoint filtered by category_main_cb=1 (byty), category_type_cb=2 (pronájem), locality_region_id (city), category_sub_cb (layout). Compute median of monthly rent prices (3k-100k Kč range).",
      coverage: "All 13 krajská města, 4 layouts each. 7 cities have low 4+kk sample sizes.",
      notes: "For 4+kk with N<10, values derived using 3+kk * 1.35 ratio (avg from cities with good data).",
    },
    "cba-monitor-q3-2025": {
      name: "CBA Monitor Q3 2025 - Ceny starších bytů dle krajských měst",
      url: "https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta",
      retrievedAt: "2025-12-27",
      methodology: "Transaction-based average price per m² for older apartments (built before 1995) by krajská města. Data from Flat Zone (cadastral registrations).",
      coverage: "All 13 krajská města",
      notes: "Q3 2025 data. Official transaction prices, not listing prices. National average: 74,800 Kč/m². Praha highest at 140,900 Kč/m², Ústí nad Labem lowest at 44,000 Kč/m².",
    },
    "global-property-guide-q1-2025": {
      name: "Global Property Guide Q1 2025 (ČSÚ-referenced)",
      url: "https://www.globalpropertyguide.com/Europe/Czech-Republic/Price-History",
      retrievedAt: "2025-12-27",
      methodology: "City-level rent per m²/month. Data references Czech Statistical Office (ČSÚ) figures.",
      coverage: "All 13 krajská města",
      notes: "Q1 2025 data. Used as rent baseline. Applied layout multipliers (1.15/1.07/1.00/0.95) × squareMeters to derive total monthly rent.",
    },
    "placeholder": {
      name: "Placeholder (needs research)",
      retrievedAt: "2025-01-15",
      methodology: "AI estimate; replace with audited sources",
      coverage: "all",
    },
    "svj-predseda-2025": {
      name: "SVJ PŘEDSEDA - Kolik se má platit do fondu oprav",
      url: "https://svjpredseda.cz/kolik-se-ma-platit-fondu-oprav/",
      retrievedAt: "2025-12-27",
      methodology: "Property management company benchmark: average ~17 Kč/m², range 10-45 Kč/m² depending on building condition and repair plan.",
      coverage: "National benchmark",
      notes: "Primary source for SVJ fee benchmarks. Used to establish baseline rate.",
    },
    "remax-brno-fond-oprav": {
      name: "RE/MAX Brno - Fond oprav",
      url: "https://www.realitni-maklerka.cz/realitni-slovnik/fond-oprav/",
      retrievedAt: "2025-12-27",
      methodology: "Real estate agency benchmark: 20-40 Kč/m² standard, up to 50-60 Kč/m² for older buildings.",
      coverage: "National benchmark",
    },
    "roomify-fond-oprav": {
      name: "Roomify - Fond oprav v SVJ",
      url: "https://www.roomify.cz/slovnik-pojmu/fond-oprav-v-svj/",
      retrievedAt: "2025-12-27",
      methodology: "Real-world examples: 15 Kč/m² (well-maintained) to 40 Kč/m² (older buildings).",
      coverage: "National examples",
    },
    "narizeni-vlady-366-2013": {
      name: "Nařízení vlády 366/2013 Sb.",
      url: "https://www.zakonyprolidi.cz/cs/2013-366",
      retrievedAt: "2025-12-27",
      methodology: "Legal framework defining SVJ contributions: distinguishes between 'příspěvky na správu domu' (fond oprav) and 'platby za služby' (utilities).",
      coverage: "Legal definition",
      notes: "Used for definition clarity, not quantification.",
    },
    "zakon-338-1992-sb": {
      name: "Zákon č. 338/1992 Sb. o dani z nemovitých věcí",
      url: "https://www.zakonyprolidi.cz/cs/1992-338",
      retrievedAt: "2025-12-27",
      methodology: "Official Czech property tax law. Base rate for residential units (§11): 3.50 Kč/m². Unit coefficient for apartments with shared land (§10 odst. 3 písm. a): 1.22. Population-based size coefficient (§11 odst. 4): 3.5 for statutory cities, 4.5 for Prague.",
      coverage: "National (Czech Republic)",
      notes: "2024 consolidation package introduced inflation coefficient (1.0 for 2025). Floor surcharge simplified into unit coefficient.",
    },
    "mfcr-koeficienty-dan": {
      name: "Ministerstvo financí ČR - Koeficienty daně z nemovitých věcí",
      url: "https://adisspr.mfcr.cz/pmd/vyhledani-koeficientu",
      retrievedAt: "2025-12-27",
      methodology: "Official search tool for municipality-specific local coefficients (místní koeficient). Most krajská města use default 1.0 unless modified by local vyhláška.",
      coverage: "All Czech municipalities",
      notes: "Verified that all 13 krajská města use default local coefficient of 1.0 for residential property tax.",
    },
  } as Record<string, SourceMeta>,

  // =========================================================================
  // City Mapping (Step 0)
  // For joining with Sreality API and ČSÚ datasets
  // =========================================================================
  cityMapping: {
    "praha": {
      displayName: "Praha",
      srealityRegionId: 10,
      srealityDistrictId: 47,
      srealityMunicipalityId: 3468,
      okres: "Hlavní město Praha",
      kraj: "Hlavní město Praha",
      nuts: "CZ0100",
    },
    "brno": {
      displayName: "Brno",
      srealityRegionId: 14,
      srealityDistrictId: 72,
      srealityMunicipalityId: 5740,
      okres: "Brno-město",
      kraj: "Jihomoravský kraj",
      nuts: "CZ0642",
    },
    "ostrava": {
      displayName: "Ostrava",
      srealityRegionId: 12,
      srealityDistrictId: 65,
      srealityMunicipalityId: 4730,
      okres: "Ostrava-město",
      kraj: "Moravskoslezský kraj",
      nuts: "CZ0806",
    },
    "plzen": {
      displayName: "Plzeň",
      srealityRegionId: 2,
      srealityDistrictId: 12,
      srealityMunicipalityId: 1243,
      okres: "Plzeň-město",
      kraj: "Plzeňský kraj",
      nuts: "CZ0323",
    },
    "ceske-budejovice": {
      displayName: "České Budějovice",
      srealityRegionId: 1,
      srealityDistrictId: 1,
      srealityMunicipalityId: 537,
      okres: "České Budějovice",
      kraj: "Jihočeský kraj",
      nuts: "CZ0311",
    },
    "hradec-kralove": {
      displayName: "Hradec Králové",
      srealityRegionId: 6,
      srealityDistrictId: 28,
      srealityMunicipalityId: 2149,
      okres: "Hradec Králové",
      kraj: "Královéhradecký kraj",
      nuts: "CZ0521",
    },
    "liberec": {
      displayName: "Liberec",
      srealityRegionId: 5,
      srealityDistrictId: 22,
      srealityMunicipalityId: 1818,
      okres: "Liberec",
      kraj: "Liberecký kraj",
      nuts: "CZ0513",
    },
    "olomouc": {
      displayName: "Olomouc",
      srealityRegionId: 8,
      srealityDistrictId: 42,
      srealityMunicipalityId: 1,
      okres: "Olomouc",
      kraj: "Olomoucký kraj",
      nuts: "CZ0712",
    },
    "pardubice": {
      displayName: "Pardubice",
      srealityRegionId: 7,
      srealityDistrictId: 32,
      srealityMunicipalityId: 1258,
      okres: "Pardubice",
      kraj: "Pardubický kraj",
      nuts: "CZ0532",
    },
    "usti-nad-labem": {
      displayName: "Ústí nad Labem",
      srealityRegionId: 4,
      srealityDistrictId: 27,
      srealityMunicipalityId: 1244,
      okres: "Ústí nad Labem",
      kraj: "Ústecký kraj",
      nuts: "CZ0427",
    },
    "karlovy-vary": {
      displayName: "Karlovy Vary",
      srealityRegionId: 3,
      srealityDistrictId: 10,
      srealityMunicipalityId: 1253,
      okres: "Karlovy Vary",
      kraj: "Karlovarský kraj",
      nuts: "CZ0412",
    },
    "jihlava": {
      displayName: "Jihlava",
      srealityRegionId: 13,
      srealityDistrictId: 67,
      srealityMunicipalityId: 5097,
      okres: "Jihlava",
      kraj: "Kraj Vysočina",
      nuts: "CZ0632",
    },
    "zlin": {
      displayName: "Zlín",
      srealityRegionId: 9,
      srealityDistrictId: 38,
      srealityMunicipalityId: 3045,
      okres: "Zlín",
      kraj: "Zlínský kraj",
      nuts: "CZ0724",
    },
  } as Record<string, CityMappingEntry>,

  // =========================================================================
  // Parameter-Level Metadata
  // Each parameter documented ONCE, with optional cityOverrides
  // =========================================================================
  parameters: {
    squareMeters: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: ["sreality-listings-sale-2025-01"],
      methodology: "Median m² from Sreality sale listings, filtered by city (locality_region_id) and layout (category_sub_cb). Area extracted from listing name field.",
      retrievedAt: "2025-01-15",
      notes: "Model apartment area (interior only, no balcony/cellar/parking). Area parsed from listing title format 'Prodej bytu X+kk YY m²'.",
      sampleSizes: {
        "praha": { "1+kk": 420, "2+kk": 481, "3+kk": 486, "4+kk": 407 },
        "brno": { "1+kk": 233, "2+kk": 479, "3+kk": 395, "4+kk": 179 },
        "ostrava": { "1+kk": 80, "2+kk": 126, "3+kk": 152, "4+kk": 59 },
        "plzen": { "1+kk": 44, "2+kk": 136, "3+kk": 156, "4+kk": 43 },
        "ceske-budejovice": { "1+kk": 81, "2+kk": 157, "3+kk": 190, "4+kk": 75 },
        "hradec-kralove": { "1+kk": 45, "2+kk": 159, "3+kk": 141, "4+kk": 40 },
        "liberec": { "1+kk": 85, "2+kk": 145, "3+kk": 131, "4+kk": 37 },
        "olomouc": { "1+kk": 72, "2+kk": 139, "3+kk": 143, "4+kk": 51 },
        "pardubice": { "1+kk": 15, "2+kk": 65, "3+kk": 86, "4+kk": 22 },
        "usti-nad-labem": { "1+kk": 38, "2+kk": 120, "3+kk": 81, "4+kk": 16 },
        "karlovy-vary": { "1+kk": 39, "2+kk": 133, "3+kk": 107, "4+kk": 30 },
        "jihlava": { "1+kk": 19, "2+kk": 51, "3+kk": 74, "4+kk": 18 },
        "zlin": { "1+kk": 25, "2+kk": 60, "3+kk": 65, "4+kk": 37 },
      },
    },
    kupniCena: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["cba-monitor-q3-2025", "sreality-listings-sale-2025-01"],
      methodology: "kupniCena = CBA_baseline × sizeMultiplier × squareMeters. CBA Monitor provides Q3 2025 transaction-based price/m² baseline (older apartments from Flat Zone). Size multipliers (1.15 for 1+kk, 1.07 for 2+kk, 1.00 for 3+kk, 0.98 for 4+kk) derived from Sreality listing price/m² patterns. squareMeters from Sreality listings.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters", "cba-monitor-q3-2025"],
      formula: "kupniCena = CBA_pricePerM2(city) × sizeMultiplier(layout) × squareMeters(city, layout)",
      notes: "Q3 2025 transaction data from CBA Monitor (Flat Zone source). Size multipliers reflect small-unit premium pattern observed across all cities.",
      cbaBaseline: {
        "praha": 140900,
        "brno": 111400,
        "hradec-kralove": 83100,
        "pardubice": 81100,
        "ceske-budejovice": 80600,
        "plzen": 77600,
        "olomouc": 76300,
        "liberec": 74300,
        "zlin": 72400,
        "jihlava": 66800,
        "ostrava": 58000,
        "karlovy-vary": 51800,
        "usti-nad-labem": 44000,
      },
      sizeMultipliers: {
        "1+kk": 1.15,
        "2+kk": 1.07,
        "3+kk": 1.00,
        "4+kk": 0.98,
      },
    },
    najemne: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["global-property-guide-q1-2025", "sreality-listings-sale-2025-01"],
      methodology: "najemne = GPG_rentPerM2(city) × rentMultiplier(layout) × squareMeters(city, layout). GPG provides Q1 2025 rent/m² baseline (ČSÚ-referenced). Rent multipliers (1.15 for 1+kk, 1.07 for 2+kk, 1.00 for 3+kk, 0.95 for 4+kk) applied to account for size efficiency. squareMeters from Sreality listings.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters", "global-property-guide-q1-2025"],
      formula: "najemne = GPG_rentPerM2(city) × rentMultiplier(layout) × squareMeters(city, layout)",
      notes: "Q1 2025 rent baseline from Global Property Guide (ČSÚ-referenced). Rounded to nearest 500 Kč.",
      gpgBaseline: {
        "praha": 438,
        "brno": 363,
        "ostrava": 228,
        "usti-nad-labem": 208,
        "plzen": 282,
        "liberec": 283,
        "olomouc": 281,
        "hradec-kralove": 291,
        "ceske-budejovice": 269,
        "pardubice": 283,
        "karlovy-vary": 238,
        "jihlava": 257,
        "zlin": 290,
      },
      rentMultipliers: {
        "1+kk": 1.15,
        "2+kk": 1.07,
        "3+kk": 1.00,
        "4+kk": 0.95,
      },
    },
    fondOprav: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["svj-predseda-2025", "remax-brno-fond-oprav", "roomify-fond-oprav", "narizeni-vlady-366-2013"],
      methodology: "fondOprav = 22 Kč/m² × squareMeters, rounded to nearest 50 Kč. Rate based on property manager benchmarks (SVJ PŘEDSEDA avg ~17 Kč/m², RE/MAX 20-40 Kč/m²). 22 Kč/m² chosen as conservative mid-range for typical older apartments.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters"],
      formula: "fondOprav = round(22 × squareMeters, nearest 50)",
      notes: "Příspěvek vlastníka na správu domu a pozemku (včetně dlouhodobé zálohy). NEZAHRNUJE služby jako voda, teplo, odpad. Rate varies by building: novostavby 10-20 Kč/m², středně staré 20-30 Kč/m², starší 30-45 Kč/m².",
      ratePerM2: 22,
      benchmarkRanges: {
        "novostavba_0-5_let": { min: 10, max: 20 },
        "stredne_stary_5-20_let": { min: 20, max: 30 },
        "starsi_20+_let": { min: 30, max: 45 },
      },
    },
    danZNemovitosti: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["zakon-338-1992-sb", "mfcr-koeficienty-dan"],
      methodology: "danZNemovitosti = squareMeters × 1.22 × 3.50 × sizeCoef × localCoef, rounded to nearest 100 Kč. Based on Zákon 338/1992 Sb.: base rate 3.50 Kč/m² (§11), unit coefficient 1.22 (§10 odst. 3 písm. a), size coefficient (§11 odst. 4): Praha=4.5, others=3.5. Local coefficients from city vyhlášky: Praha=1.5, Brno/Ostrava/Plzeň/ČB=1.0, HK=1.3, Jihlava=1.8, Liberec/Olomouc/Pardubice/ÚL/KV/Zlín=2.0.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters"],
      formula: "round(squareMeters × 1.22 × 3.50 × sizeCoef × localCoef, nearest 100)",
      notes: "Annual property tax in CZK. Local coefficients vary significantly by city (range 1.0-2.0). Praha uses 1.5 (range 1.5-2.0 across městské části). Some cities have different coefficients for specific k.ú. (Plzeň: some k.ú. use 0.5; Zlín: some k.ú. use 1.4-1.6).",
    },
    pojisteniNemovitosti: {
      quality: "PLACEHOLDER" as DataQuality,
      sourceIds: ["placeholder"],
      methodology: "Placeholder - owner-paid household + liability insurance",
      retrievedAt: "2025-01-15",
      notes: "Annual CZK. Excludes SVJ building insurance.",
    },
    nakladyUdrzba: {
      quality: "PLACEHOLDER" as DataQuality,
      sourceIds: ["placeholder"],
      methodology: "Placeholder - will be lifecycle cost model (paint, floors, kitchen, bathroom)",
      retrievedAt: "2025-01-15",
      notes: "Annual interior-only maintenance/capex. Excludes building envelope (SVJ domain).",
    },
    zarizeniNemovitosti: {
      quality: "PLACEHOLDER" as DataQuality,
      sourceIds: ["placeholder"],
      methodology: "Placeholder - one-time furnishing cost",
      retrievedAt: "2025-01-15",
      notes: "One-time CZK. Furnishing standard TBD.",
    },
  } as Record<string, ParameterMeta>,
};

export default calculatorDefaultsMeta;

