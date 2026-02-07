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
    lastUpdated: "2026-02-07",
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
    "goldman-sachs-global-outlook-2024": {
      name: "Goldman Sachs Global Stock Outlook",
      url: "https://www.goldmansachs.com/insights/articles/global-stocks-are-forecast-to-return-7-point-7-percent-annually-in-coming-decade",
      retrievedAt: "2025-12-27",
      methodology: "10-year forward equity return forecast based on nominal GDP growth, corporate profitability, and shareholder distributions.",
      coverage: "Global equities (MSCI AC World)",
      notes: "Forecasts 7.7% annual return for global stocks (USD). Historical since 1985: 9.3%, since 2000: 7.7%. S&P 500 only forecast is ~3% due to high US valuations.",
    },
    "vanguard-cma-2024": {
      name: "Vanguard Capital Market Assumptions 2024",
      url: "https://investor.vanguard.com/investor-resources-education/news/vanguard-economic-market-outlook-2024-global-summary",
      retrievedAt: "2025-12-27",
      methodology: "10-year expected returns from Vanguard Capital Markets Model (VCMM).",
      coverage: "Global equities by region",
      notes: "US equities: 4.2-6.2%, Developed ex-US: 7.0-9.0%, Emerging markets: 6.6-8.6%. Non-US expected to outperform due to lower valuations.",
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
    "srovnavac-pojisteni-2025": {
      name: "Srovnávač.cz - Pojištění domácnosti kalkulačka",
      url: "https://www.srovnavac.cz/pojisteni-domacnosti/kalkulacka-a-srovnani",
      retrievedAt: "2025-12-27",
      methodology: "Insurance comparison calculator. Sample quote: 50m² apartment in Prague with 300k Kč coverage = 949-2,464 Kč/year (Slavia to ČSOB). Standard tier includes household contents + liability.",
      coverage: "National (Czech insurers: Maxima, Slavia, Direct, ČPP, ČSOB)",
      notes: "Market median for standard coverage (household + liability): ~1,400 Kč/year for 50m² with 300k Kč pojistná částka. Derived rate: ~20 Kč/m²/year for basic-standard coverage.",
    },
    "cenikyremesel-2025-12": {
      name: "CeníkyŘemesel.cz - Ceníky stavebních prací",
      url: "https://www.cenikyremesel.cz/ceniky",
      retrievedAt: "2025-12-27",
      methodology: "Czech construction labor cost benchmarks (bez DPH, bez materiálu). Source categories: /ceniky/maliri (painting), /ceniky/podlahari (flooring). Key prices: Penetrace stěny válečkem 13 Kč/m² wall, Malba stěny válečkem 15 Kč/m² wall/layer, Pokládka laminátové/vinylové podlahy 189 Kč/m². Material costs added from market research.",
      coverage: "National (Czech Republic)",
      notes: "Labor prices represent 'ceny pro koncové řemeslníky' (retail prices to end craftsmen). Components extracted: A) Malování: 58 Kč/m² wall labor + 35 Kč material = 93 Kč/m² wall total. B) Podlahy: 200 Kč/m² labor + 460 Kč material = 660 Kč/m² total. Lifespans: painting 7 yrs, flooring 17 yrs, bathroom 22 yrs, kitchen 18 yrs.",
    },
    "ikea-cz-2025-12": {
      name: "IKEA Czech Republic - Standard Tier Products",
      url: "https://www.ikea.com/cz/cs/",
      retrievedAt: "2025-12-27",
      methodology: "Furnishing baskets built from IKEA Czech product catalog (December 2025). Standard tier products selected (not cheapest LACK-only, not premium). Components priced individually and aggregated by room type. National pricing - same cost across all cities.",
      coverage: "National (Czech Republic)",
      notes: "Includes: Living (sofa, coffee table, TV stand, bookshelf, rug, curtains), Bedroom (bed frame, mattress, wardrobe, nightstands, dresser), Kitchen (dining table/chairs, cookware, dinnerware), Bathroom (textiles, storage, accessories), Appliances (fridge, washer, microwave, vacuum), Home Office (desk, chair, shelving).",
    },
    "hypoindex-2025-12": {
      name: "Swiss Life Hypoindex - Průměrná úroková sazba hypotéky",
      url: "https://www.hypoindex.cz/",
      retrievedAt: "2025-12-27",
      methodology: "Monthly index tracking average mortgage interest rates from major Czech banks. Calculated as weighted average of new mortgage rates across all fixation periods.",
      coverage: "National (Czech Republic)",
      notes: "December 2025 value: 4.91%. Industry-standard benchmark for Czech mortgage market. Published by Swiss Life Select.",
    },
    "cnb-forecast-autumn-2025": {
      name: "ČNB Prognóza - Podzim 2025",
      url: "https://www.cnb.cz/cs/menova-politika/prognoza/",
      retrievedAt: "2025-12-27",
      methodology: "Official Czech National Bank macroeconomic forecast. Published November 6, 2025, based on data to October 24, 2025. Includes inflation, GDP, 3M PRIBOR, and CZK/EUR projections.",
      coverage: "National (Czech Republic), 2025-2027 horizon",
      notes: "Key forecasts: Inflation 2.5%/2.2%/2.5% (2025/2026/2027), 3M PRIBOR 3.5%/3.5%/3.8% (2025/2026/2027). REPO rate stable at 3.5%.",
    },
    "csu-mzdy-kraje-q3-2025": {
      name: "ČSÚ - Průměrné mzdy v krajích Q3 2025",
      url: "https://www.kurzy.cz/mzda/prumerne-mzdy-regiony-podrobne/",
      retrievedAt: "2025-12-27",
      methodology: "Regional average wages from Czech Statistical Office (ČSÚ) Strukturální mzdová statistika. Data for Q3 2025 via Kurzy.cz aggregator. Used to derive regional cost coefficients for labor-intensive services (renovation, maintenance).",
      coverage: "14 Czech regions (kraje)",
      notes: "Key wages: ČR average 48,936 Kč, Praha 62,022 Kč (+27%), Karlovarský 41,597 Kč (-15%). Used hybrid formula: regionalCoef = 0.4 (material) + 0.6 × (city_wage/national_wage) to adjust maintenance costs. Praha coef=1.16, others 0.91-0.99.",
    },
    "csu-hpi-2015-2025": {
      name: "ČSÚ House Price Index 2015-2025",
      url: "https://csu.gov.cz/prices-of-real-estate",
      retrievedAt: "2026-02-07",
      methodology: "Official Czech house price index (2015=100) tracking residential property prices Q1 2015 to Q2 2025. CAGR calculation: (243/98.3)^(1/10.25) = 9.2% annually. Includes 2021-2022 boom period.",
      coverage: "National (Czech Republic)",
      notes: "Q1 2015: 98.3, Q2 2025: 243. Recent values: Q1 2022: 210 (boom peak), Q1 2024: 213 (plateau), Q2 2025: 243 (recovery). 10-year CAGR of 9.2% unsustainable for 30-year forecast; adjusted to 3.5-4.0% based on long-term equilibrium.",
    },
    "cba-monitor-property-growth": {
      name: "CBA Monitor - Transaction Price Growth Trends",
      url: "https://www.cbamonitor.cz/statistics/older-apartment-prices-transaction-costs",
      retrievedAt: "2026-02-07",
      methodology: "Quarterly transaction data for older flats (pre-1995). Q3 2025: 74,800 Kč/m² national average, +18.9% YoY. Current prices at 118% vs 2022 baseline, indicating strong but unsustainable growth.",
      coverage: "National Czech Republic, regional cities breakdown available",
      notes: "Recent volatility: 2024 saw 98% of 2022 prices (correction), Q3 2025 reached 118% (recovery). 3-year CAGR 2022-2025: ~5.7%. Used for recent trend validation but not directly as 30-year forecast.",
    },
    "oecd-rent-index-2015-2025": {
      name: "OECD Rent Price Index Czech Republic",
      url: "https://www.oecd.org/en/data/indicators/housing-prices.html",
      retrievedAt: "2026-02-07",
      methodology: "Seasonally adjusted rent price index (2015=100) from OECD Statistics. March 2025: 145.078, up from 100 in 2015. CAGR: (145.078/100)^(1/10) = 3.8% annually.",
      coverage: "National (Czech Republic)",
      notes: "10-year CAGR of 3.8% used as primary anchor for rent growth forecasts. More stable than property prices, closely tracks wage growth and inflation.",
    },
    "deloitte-rent-index-2025": {
      name: "Deloitte Rent Index Q1-Q3 2025",
      url: "https://www.deloitte.com/cz-sk/en/Industries/real-estate/collections/rent-index.html",
      retrievedAt: "2026-02-07",
      methodology: "Quarterly Czech rental market analysis. Q3 2025: +3.1% YoY (336 Kč/m² national), Q2 2025: +3.2% YoY, Q1 2025: +2.3% YoY. 2024 exceptional at +17% YoY (post-COVID catch-up).",
      coverage: "All krajská města quarterly",
      notes: "City-specific Q3 2025: Praha 456 Kč/m² (highest), Brno 399 Kč/m² (+7.8% YoY fastest), Ústí nad Labem 219 Kč/m² (lowest), Zlín 292 Kč/m² (-0.7% YoY declining). Normalization to 2-3% range in 2025 after 2024 spike.",
    },
    "aew-european-residential-2025": {
      name: "AEW Research - European Residential Returns 2025-2029",
      url: "https://www.aew.com/research/european-residential-returns-to-focus-on-current-income-and-rental-growth",
      retrievedAt: "2026-02-07",
      methodology: "Institutional forecast for European residential real estate. Total returns 7.7% p.a. (2025-2029): current income 4.0%, rental growth 3.1%, yield compression 0.6%. Prime rents forecast +3.2% p.a.",
      coverage: "Europe (Eurozone + UK)",
      notes: "Professional institutional baseline. Czech expected to track European average over 30-year horizon. Used as validation benchmark.",
    },
    "cnb-housing-analysis-2025": {
      name: "ČNB Housing Market Analysis & Overvaluation Assessment",
      url: "https://www.cnb.cz/en/monetary-policy/monetary-policy-reports/boxes-and-articles/The-Czech-housing-market-in-the-upward-phase-of-the-cycle",
      retrievedAt: "2026-02-07",
      methodology: "Czech National Bank housing market analysis. 2018 finding: 10-15% overvaluation. 2025 described as 'upward phase of cycle' with price-to-income divergence (prices +16% vs incomes +3.4%).",
      coverage: "National (Czech Republic)",
      notes: "Overvaluation concerns inform conservative 30-year growth estimates. Current elevated prices expected to revert to long-term fundamentals (inflation + modest real appreciation).",
    },
    "jorda-global-housing-2024": {
      name: "Jordà et al. - Global Housing Returns 1465-2024",
      url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5269749",
      retrievedAt: "2026-02-07",
      methodology: "Comprehensive academic study of global house prices 1870-2024. Finding: real house prices flat 19th-mid 20th century, rose strongly post-WWII driven by land prices. Returns trend stationary with fast mean reversion.",
      coverage: "Global (16+ advanced economies)",
      notes: "Long-term real appreciation 0-1% above inflation. Current boom periods (like Czech 2021-2022) revert to equilibrium. Used to justify conservative 30-year forecasts.",
    },
    "cepr-dp15657-real-estate-returns": {
      name: "CEPR DP15657 - Long-Run Real Estate Returns 1901-1983",
      url: "https://cepr.org/publications/dp15657",
      retrievedAt: "2026-02-07",
      methodology: "Institutional portfolio analysis of real estate returns over 82 years. Finding: long-term real income growth rates close to zero for residential properties.",
      coverage: "Institutional portfolios (US/Europe)",
      notes: "Residential real estate less profitable long-term than commonly believed. Real returns near zero over multiple decades. Supports conservative growth assumptions.",
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
      quality: "DERIVED" as DataQuality,
      sourceIds: ["srovnavac-pojisteni-2025"],
      methodology: "pojisteniNemovitosti = 20 Kč/m²/year × squareMeters, rounded to nearest 100 Kč. Rate derived from Srovnávač.cz market data: 50m² apartment with 300k Kč coverage (standard tier with household + liability) = ~1,400 Kč/year median across 5 insurers (Slavia, Maxima, Direct, ČPP, ČSOB).",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters"],
      formula: "pojisteniNemovitosti = round(20 × squareMeters, nearest 100)",
      notes: "Annual owner-paid insurance: pojištění domácnosti (household contents) + pojištění odpovědnosti (liability). Excludes SVJ building insurance (typically in fondOprav). Coverage profile: basic-standard tier (~5,000 Kč/m² insured value), standard deductible (1,000 Kč). Actual premium varies by insurer, location, and security features.",
    },
    nakladyUdrzba: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["cenikyremesel-2025-12", "csu-mzdy-kraje-q3-2025"],
      methodology: "Annual interior maintenance cost using fixed+variable lifecycle model with regional wage adjustment: nakladyUdrzba = (baseFixed(layout) + 73 × m²) × regionalCoef, rounded to nearest 1000 Kč. Variable: Painting (34.5 Kč/m²/yr) + Flooring (38.8 Kč/m²/yr) = 73 Kč/m²/yr. Fixed: Bathroom + Kitchen + Minor repairs. Regional coefficient = 0.4 (material, no diff) + 0.6 × (city_wage / national_wage). Praha=1.16, others=0.91-0.99.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["squareMeters"],
      formula: "(baseFixed(layout) + 73 × m²) × regionalCoef; baseFixed: 1+kk=10k, 2+kk=13k, 3+kk=16k, 4+kk=22k Kč/year",
      notes: "Annual CZK. Interior-only owner costs: malování, podlahy, koupelna, kuchyň, drobné opravy. EXCLUDES spotřebiče (ty musí kupovat i nájemník). Excludes nábytek and SVJ/společné části. Regional coefficients from ČSÚ Q3 2025 wages (Praha +16%, Karlovarský kraj -9%). Pro nový/zrekonstruovaný byt (do 10 let od rekonstrukce) snižte na 30-35% defaultu.",
    },
    zarizeniNemovitosti: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["ikea-cz-2025-12"],
      methodology: "One-time furnishing cost using IKEA Czech standard-tier products (December 2025). Layout-based baskets: 1+kk (studio/combined living-sleeping), 2+kk (1 bedroom + living), 3+kk (2 bedrooms + living + small office), 4+kk (3 bedrooms + living + office + 2 baths). Includes furniture, appliances, bedding, cookware, decor. IKEA has national pricing - same cost across all cities.",
      retrievedAt: "2025-12-27",
      formula: "Layout-based basket: 1+kk=90k, 2+kk=120k, 3+kk=170k, 4+kk=200k Kč",
      notes: "One-time CZK. IKEA standard tier (not cheapest, not premium). Includes: living room furniture, bedroom(s), kitchen essentials, bathroom accessories, appliances (fridge, washer, microwave, vacuum), decor. Assumes kitchen cabinets included in apartment. City-independent (IKEA national pricing).",
    },
    // =========================================================================
    // Global Rate Parameters
    // =========================================================================
    vynosInvestice: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: ["goldman-sachs-global-outlook-2024", "vanguard-cma-2024"],
      methodology: "Expected nominal annual return for globally diversified equity portfolio over 30-year horizon. Triangulated from: (1) Goldman Sachs global stocks forecast 7.7% (10yr), (2) Vanguard developed ex-US 7-9%, (3) MSCI World since 2000: 7.7%, (4) Historical MSCI World since 1985: 9.3%. For 30yr horizon, 7% balances current valuations vs. long-term mean reversion.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["historical-returns", "institutional-forecasts"],
      formula: "Weighted consideration: GS global 7.7% + Vanguard non-US midpoint 8% + valuation drag → 7.0%",
      notes: "Annual percentage rate (%), nominal (before inflation). Represents global diversified equity portfolio (MSCI World / All-Country World style). NOT just US stocks (S&P 500 forecast is only 3-5% due to high valuations). For conservative planning, user can lower to 6%. For optimistic scenario, 8%.",
    },
    urokovaSazbaHypoteky: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: ["hypoindex-2025-12"],
      methodology: "Current average mortgage interest rate from Swiss Life Hypoindex (December 2025). Represents weighted average of new mortgage rates across major Czech banks and all fixation periods.",
      retrievedAt: "2025-12-27",
      notes: "Annual percentage rate (%). December 2025 value: 4.91%, rounded to 4.9%. ČNB REPO rate at time of measurement: 3.5%. Spread over REPO: ~1.4%. This rate applies to new mortgages at time of purchase.",
    },
    urokovaSazbaHypotekyFuture: {
      quality: "DERIVED" as DataQuality,
      sourceIds: ["cnb-forecast-autumn-2025", "hypoindex-2025-12"],
      methodology: "Estimated mortgage rate after fixation period ends (~5 years). Based on ČNB PRIBOR forecast (3.5-3.8% through 2027) plus typical mortgage spread (~1.5%). Assumes gradual normalization to long-term equilibrium.",
      retrievedAt: "2025-12-27",
      derivedFrom: ["cnb-forecast-autumn-2025"],
      formula: "Equilibrium PRIBOR (~3.5%) + mortgage spread (~1.5%) ≈ 4.5%",
      notes: "Annual percentage rate (%). Represents expected rate when refinancing after 5-year fixation (~2030). Conservative estimate assuming stable macroeconomic conditions. Actual rate will depend on ČNB monetary policy, banking competition, and individual creditworthiness.",
    },
    ocekavanaInflace: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: ["cnb-forecast-autumn-2025"],
      methodology: "Long-term inflation expectation from ČNB Monetary Policy Forecast (Autumn 2025). ČNB forecasts: 2.5% (2025), 2.2% (2026), 2.5% (2027). For rent-vs-buy calculator with 10-30 year horizon, using 2.5% as realistic long-term average.",
      retrievedAt: "2025-12-27",
      notes: "Annual percentage rate (%). ČNB inflation target is 2.0%, but forecasts consistently show 2.2-2.5%. Using 2.5% provides conservative estimate (higher inflation generally favors buying over renting). Current inflation (Nov 2025): 2.1%.",
    },
    rustHodnotyNemovitosti: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: [
        "csu-hpi-2015-2025",
        "cba-monitor-property-growth",
        "cnb-housing-analysis-2025",
        "jorda-global-housing-2024",
        "cepr-dp15657-real-estate-returns",
        "aew-european-residential-2025"
      ],
      methodology: "Conservative 30-year property appreciation forecast. Formula: Inflation (2.5%) + Real appreciation (0-1.5%) + City premium (0-1.5%). ČSÚ HPI 2015-2025 CAGR of 9.2% includes 2021-2022 boom (unsustainable). Academic research (Jordà, CEPR) shows long-term real returns near zero. ČNB warns of overvaluation. European forecast: 3.5% p.a. Conservative estimates: Praha/Brno 4.0%, large regional cities 3.5%, smaller cities 3.0%.",
      retrievedAt: "2026-02-07",
      notes: "Annual percentage rate (%). Conservative bias appropriate for 30-year horizon given: (1) Current overvaluation (ČNB: 10-15% in 2018, worse now), (2) Mean reversion principle (boom periods revert to equilibrium), (3) International benchmarks (European 3.5%, long-term real returns 0-1%), (4) User protection (better to underestimate than overestimate). Monte Carlo mode captures uncertainty (sigma 2.5%, bounds -10% to +15%).",
      cityOverrides: {
        "praha": {
          notes: "4.0% p.a.: Inflation (2.5%) + real appreciation (1.0%) + Prague premium (0.5%). Factors: land scarcity, wage growth, EU convergence. But already high valuations limit upside. Recent: 9-13% YoY unsustainable.",
        },
        "brno": {
          notes: "4.0% p.a.: Same as Praha. Strong regional economy, catching up to capital (price gap narrowing). Deloitte Q3 2025 rent: +7.8% YoY but normalizing.",
        },
        "ostrava": {
          notes: "3.5% p.a.: Inflation (2.5%) + real appreciation (0.5%) + regional premium (0.5%). Large regional city but weaker fundamentals than Praha/Brno. CBA Monitor: 58,000 Kč/m² (78% of national avg).",
        },
        "plzen": {
          notes: "3.5% p.a.: Same as Ostrava tier. CBA Monitor: 77,600 Kč/m² (104% of national). Strong industrial base.",
        },
        "hradec-kralove": {
          notes: "3.5% p.a.: Large regional city tier. CBA Monitor: 83,100 Kč/m² (111% of national). Growing regional center.",
        },
        "liberec": {
          notes: "3.5% p.a.: Large regional city tier. CBA Monitor: 74,300 Kč/m² (99% of national). Deloitte Q1 2025: +7.6% YoY but unsustainable.",
        },
        "pardubice": {
          notes: "3.5% p.a.: Large regional city tier. CBA Monitor: 81,100 Kč/m² (108% of national).",
        },
        "ceske-budejovice": {
          notes: "3.0% p.a.: Inflation (2.5%) + minimal premium (0.5%). Smaller city with limited economic drivers. CBA Monitor: 80,600 Kč/m².",
        },
        "olomouc": {
          notes: "3.0% p.a.: Smaller city tier. CBA Monitor: 76,300 Kč/m². Demographics and economic fundamentals weaker than large regional cities.",
        },
        "usti-nad-labem": {
          notes: "3.0% p.a.: Weak market fundamentals. CBA Monitor: 44,000 Kč/m² (59% of national, lowest). Deloitte: 219 Kč/m² rent (lowest). Conservative estimate given economic challenges.",
        },
        "karlovy-vary": {
          notes: "3.0% p.a.: Tourist-dependent market. CBA Monitor: 51,800 Kč/m² (69% of national). Volatility risk from tourism sector exposure.",
        },
        "jihlava": {
          notes: "3.0% p.a.: Smaller city tier. CBA Monitor: 66,800 Kč/m² (89% of national).",
        },
        "zlin": {
          notes: "3.0% p.a.: Declining market. Deloitte Q3 2025: -0.7% YoY rent growth. CBA Monitor: 72,400 Kč/m². Conservative estimate despite recent weakness.",
        },
      },
    },
    rustNajemneho: {
      quality: "VERIFIED" as DataQuality,
      sourceIds: [
        "oecd-rent-index-2015-2025",
        "deloitte-rent-index-2025",
        "aew-european-residential-2025",
        "cnb-forecast-autumn-2025"
      ],
      methodology: "Conservative 30-year rent growth forecast. Formula: Inflation (2.5%) + Real wage growth (0-0.5%) + Demand factor (0-0.5%). OECD 10-year CAGR: 3.8% (2015-2025). Deloitte normalization: Q1-Q3 2025 averaging 2.3-3.2% YoY after 2024 spike (+17%). European forecast: 3.2% p.a. (2025-2029). Conservative estimates: Praha/Brno 3.5%, other cities 3.0%.",
      retrievedAt: "2026-02-07",
      notes: "Annual percentage rate (%). Rent growth more stable than property prices, closely tracks inflation + wage growth. Conservative bias: (1) Rent constrained by tenant incomes (can't sustainably exceed wage growth), (2) 2024 spike (+17%) was anomaly (post-COVID catch-up), (3) European average 3.1-3.2% p.a. provides validation. Monte Carlo mode captures uncertainty (sigma 1.5%, bounds -5% to +10%).",
      cityOverrides: {
        "praha": {
          notes: "3.5% p.a.: Inflation (2.5%) + wage growth (0.5%) + demand premium (0.5%). Deloitte Q3 2025: 456 Kč/m² (highest nationally). Tight market: universities, business hub. But normalizing after 2024 spike.",
        },
        "brno": {
          notes: "3.5% p.a.: Same as Praha. Deloitte Q3 2025: 399 Kč/m², +7.8% YoY (fastest growth) but unsustainable. Strong student/professional demand. 60 applicants per apartment in 2024.",
        },
        "ostrava": {
          notes: "3.0% p.a.: Regional city, wage-constrained. Deloitte data shows lower demand/prices than Praha/Brno. Conservative given weaker economic fundamentals.",
        },
        "plzen": {
          notes: "3.0% p.a.: Regional city tier. Balanced market without Praha/Brno premium.",
        },
        "hradec-kralove": {
          notes: "3.0% p.a.: Regional city. Deloitte Q2 2025: +6.2% YoY (309 Kč/m²) but normalizing.",
        },
        "liberec": {
          notes: "3.0% p.a.: Regional city. Deloitte Q1 2025: +7.6% YoY (283 Kč/m²) spike unsustainable.",
        },
        "pardubice": {
          notes: "3.0% p.a.: Regional city tier.",
        },
        "ceske-budejovice": {
          notes: "3.0% p.a.: Smaller city, limited wage growth. Conservative estimate.",
        },
        "olomouc": {
          notes: "3.0% p.a.: Smaller city tier. Student population provides some demand stability.",
        },
        "usti-nad-labem": {
          notes: "3.0% p.a.: Deloitte Q3 2025: 219 Kč/m² (lowest nationally). Weak market. Conservative estimate (was 2.5% placeholder, upgraded to 3.0% matching national baseline).",
        },
        "karlovy-vary": {
          notes: "3.0% p.a.: Tourist-dependent. Deloitte Q4 2024: -0.9% YoY decline. Volatile market. Conservative estimate.",
        },
        "jihlava": {
          notes: "3.0% p.a.: Smaller city tier. Limited rent growth drivers.",
        },
        "zlin": {
          notes: "3.0% p.a.: Deloitte Q3 2025: 292 Kč/m², -0.7% YoY (declining). Conservative estimate despite current weakness - 30-year horizon assumes reversion to inflation.",
        },
      },
    },
  } as Record<string, ParameterMeta>,
};

export default calculatorDefaultsMeta;

