# Default Values Research Documentation

## Overview

The kamspenezi.cz calculator uses **extensively researched default values** based on real Czech market data. All defaults are documented in the codebase with full source attribution and methodology.

**Last Updated:** January 15, 2025 (data collection)  
**Documentation Updated:** February 7, 2026

---

## Documentation Structure

### Primary Files

1. **`src/data/calculator-defaults.ts`** (46,674 bytes)
   - Contains all default values for 13 cities × 4 apartment sizes
   - Values include: purchase price, rent, square meters, taxes, insurance, maintenance, etc.
   - Organized by city slug (praha, brno, ostrava, etc.)

2. **`src/data/calculator-defaults.meta.ts`** (29,820 bytes)
   - **Hierarchical audit metadata** for every parameter
   - Source URLs, retrieval dates, methodology, sample sizes
   - Quality flags: `VERIFIED`, `DERIVED`, or `PLACEHOLDER`
   - Full audit trail for transparency

3. **`src/data/sources-data.ts`** (10,971 bytes)
   - Formatted source data for `/metodika-a-zdroje` page
   - User-facing explanations of each parameter
   - Categorized by: nemovitost, hypotéka, nájem, investice, dane-poplatky

---

## Research Methodology

### Data Quality Levels

The project uses three quality flags:

```typescript
type DataQuality = "PLACEHOLDER" | "VERIFIED" | "DERIVED";
```

- **VERIFIED**: Direct from authoritative source (e.g., ČNB, CBA Monitor, Hypoindex)
- **DERIVED**: Calculated using formulas from verified sources
- **PLACEHOLDER**: AI estimate requiring research (clearly marked)

### Data Sources Used (28 sources)

#### Official Czech Institutions
1. **ČNB (Czech National Bank)** - Inflation forecasts, monetary policy
2. **ČSÚ (Czech Statistical Office)** - Regional wages
3. **Ministry of Finance** - Property tax coefficients
4. **Flat Zone (via CBA Monitor)** - Transaction-based property prices

#### Real Estate Marketplaces
5. **Sreality.cz API** - Purchase prices, rental prices, square meters (largest Czech real estate portal)
6. **CBA Monitor** - Transaction prices per m² by city
7. **Global Property Guide** - Rent per m² (ČSÚ-referenced)

#### Financial Institutions
8. **Swiss Life Hypoindex** - Mortgage interest rates
9. **Goldman Sachs** - Global equity return forecasts (7.7% p.a.)
10. **Vanguard** - Capital market assumptions (7-9% ex-US equities)

#### Czech Property Services
11. **SVJ PŘEDSEDA** - Repair fund benchmarks (17 Kč/m² avg)
12. **RE/MAX Brno** - Repair fund ranges (20-40 Kč/m²)
13. **Roomify** - Real-world SVJ examples
14. **Srovnávač.cz** - Insurance premiums
15. **CeníkyŘemesel.cz** - Construction/renovation labor costs

#### Retail/Market Data
16. **IKEA Czech Republic** - Furnishing costs (national pricing)

#### Legal Sources
17. **Zákon 338/1992 Sb.** - Property tax law
18. **Nařízení vlády 366/2013 Sb.** - SVJ contribution framework

---

## Key Parameters & Research

### 1. Purchase Price (kupniCena) ✅ DERIVED

**Formula:**
```
kupniCena = CBA_baseline × sizeMultiplier × squareMeters
```

**Sources:**
- **CBA Monitor Q3 2025** - Transaction-based price/m² by city
  - Praha: 140,900 Kč/m²
  - Brno: 111,400 Kč/m²
  - Ostrava: 58,000 Kč/m²
  - [11 more cities]

- **Sreality.cz API** - Size multipliers
  - 1+kk: 1.15× (15% premium)
  - 2+kk: 1.07× (7% premium)
  - 3+kk: 1.00× (baseline)
  - 4+kk: 0.98× (2% discount)

**Sample Data:**
- Praha 2+kk: 140,900 × 1.07 × 56 m² = 8,440,000 Kč
- Sample sizes: 420-486 listings per layout in Praha

**Retrieved:** December 27, 2025 (Q3 2025 transaction data)

---

### 2. Square Meters (squareMeters) ✅ VERIFIED

**Source:** Sreality.cz Sale Listings API

**Methodology:**
- Query estates endpoint with filters:
  - `category_main_cb=1` (apartments)
  - `category_type_cb=1` (sale)
  - `locality_region_id` (city ID)
  - `category_sub_cb` (layout: 2=1+kk, 3=2+kk, etc.)
- Extract area from listing name field (format: "Prodej bytu X+kk YY m²")
- Filter 15-250 m² range
- Compute median

**Sample Sizes (Praha):**
- 1+kk: 420 listings
- 2+kk: 481 listings
- 3+kk: 486 listings
- 4+kk: 407 listings

**Example Values:**
- Praha 2+kk: 56 m² (median)
- Brno 3+kk: 81 m² (median)

**Retrieved:** January 15, 2025

---

### 3. Monthly Rent (najemne) ✅ DERIVED

**Formula:**
```
najemne = GPG_rentPerM2 × rentMultiplier × squareMeters
```

**Sources:**
- **Global Property Guide Q1 2025** (ČSÚ-referenced)
  - Praha: 438 Kč/m²/month
  - Brno: 363 Kč/m²/month
  - [11 more cities]

- **Rent multipliers** (size efficiency):
  - 1+kk: 1.15× (higher per-m² cost)
  - 2+kk: 1.07×
  - 3+kk: 1.00× (baseline)
  - 4+kk: 0.95× (economy of scale)

**Example:**
- Praha 2+kk: 438 × 1.07 × 56 = 26,230 Kč/month (rounded to 26,500)

**Retrieved:** December 27, 2025 (Q1 2025 data)

---

### 4. Repair Fund (fondOprav) ✅ DERIVED

**Formula:**
```
fondOprav = 22 Kč/m² × squareMeters (rounded to nearest 50 Kč)
```

**Sources:**
1. **SVJ PŘEDSEDA** - Average ~17 Kč/m², range 10-45 Kč/m²
2. **RE/MAX Brno** - Standard 20-40 Kč/m², old buildings 50-60 Kč/m²
3. **Roomify** - Real examples 15-40 Kč/m²

**Rate Selection:**
- 22 Kč/m² chosen as conservative mid-range for typical older apartments
- Benchmark ranges:
  - New buildings (0-5 years): 10-20 Kč/m²
  - Medium age (5-20 years): 20-30 Kč/m²
  - Older (20+ years): 30-45 Kč/m²

**Legal Basis:** Nařízení vlády 366/2013 Sb. (defines SVJ contributions)

**Example:**
- 56 m² apartment: 22 × 56 = 1,232 → 1,250 Kč/month

**Retrieved:** December 27, 2025

---

### 5. Property Tax (danZNemovitosti) ✅ DERIVED

**Formula:**
```
danZNemovitosti = squareMeters × 1.22 × 3.50 × sizeCoef × localCoef
```

**Legal Basis:** Zákon č. 338/1992 Sb. o dani z nemovitých věcí

**Components:**
- **Base rate:** 3.50 Kč/m² (§11)
- **Unit coefficient:** 1.22 for apartments (§10 odst. 3 písm. a)
- **Size coefficient:** 
  - Praha: 4.5
  - Other statutory cities: 3.5
- **Local coefficient:** (varies by municipality)
  - Praha: 1.5
  - Brno, Ostrava, Plzeň, České Budějovice: 1.0
  - Hradec Králové: 1.3
  - Jihlava: 1.8
  - Others: 2.0

**Source:** Ministerstvo financí ČR - Official coefficient search tool

**Example:**
- Praha 56 m²: 56 × 1.22 × 3.50 × 4.5 × 1.5 = 1,627 → 1,600 Kč/year
- Brno 81 m²: 81 × 1.22 × 3.50 × 3.5 × 1.0 = 1,209 → 1,200 Kč/year

**Retrieved:** December 27, 2025

---

### 6. Property Insurance (pojisteniNemovitosti) ✅ DERIVED

**Formula:**
```
pojisteniNemovitosti = 20 Kč/m²/year × squareMeters
```

**Source:** Srovnávač.cz Insurance Calculator

**Methodology:**
- Sample quote: 50 m² Prague apartment with 300k Kč coverage
- Standard tier (household + liability)
- Market range: 949-2,464 Kč/year across 5 insurers
- Median: ~1,400 Kč/year = ~28 Kč/m²/year
- Conservative estimate: 20 Kč/m²/year for basic-standard coverage

**Coverage Includes:**
- Pojištění domácnosti (household contents)
- Pojištění odpovědnosti (liability)
- Does NOT include SVJ building insurance (in fondOprav)

**Example:**
- 56 m² apartment: 20 × 56 = 1,120 → 1,100 Kč/year

**Retrieved:** December 27, 2025

---

### 7. Maintenance Costs (nakladyUdrzba) ✅ DERIVED

**Formula:**
```
nakladyUdrzba = (baseFixed + 73 × m²) × regionalCoef
```

**Components:**

**A. Variable Costs (73 Kč/m²/year):**
- **Painting:** 34.5 Kč/m²/year
  - Formula: (58 labor + 35 material) / 7-year lifespan = 93 Kč/m²/7yr
  - Wall area ≈ 2.6 × floor area
  - Per m² floor: 93 × 2.6 / 7 = 34.5 Kč/m²/year

- **Flooring:** 38.8 Kč/m²/year
  - Formula: (200 labor + 460 material) / 17-year lifespan

**B. Fixed Costs (by layout):**
- 1+kk: 10,000 Kč/year (bathroom + kitchen + minor repairs)
- 2+kk: 13,000 Kč/year
- 3+kk: 16,000 Kč/year
- 4+kk: 22,000 Kč/year (2 bathrooms)

**C. Regional Coefficient:**
```
regionalCoef = 0.4 (materials) + 0.6 × (city_wage / national_wage)
```

- Praha: 1.16 (wages +27% above national avg)
- Other cities: 0.91-0.99

**Sources:**
1. **CeníkyŘemesel.cz** - Labor costs (13-200 Kč/m² depending on work type)
2. **ČSÚ Q3 2025** - Regional wages
3. **Market research** - Material costs

**Example:**
- Praha 2+kk (56 m²): (13,000 + 73×56) × 1.16 = 19,838 → 20,000 Kč/year
- Brno 2+kk (56 m²): (13,000 + 73×56) × 0.96 = 16,352 → 16,000 Kč/year

**Retrieved:** December 27, 2025

**Important Notes:**
- Interior-only costs (owner responsibility)
- Excludes appliances (tenant also needs to buy those)
- Excludes furniture, SVJ common areas
- For newly renovated apartments (<10 years), reduce to 30-35% of default

---

### 8. Furnishing (zarizeniNemovitosti) ✅ DERIVED

**Formula:** Fixed amounts by layout

**Source:** IKEA Czech Republic product catalog (December 2025)

**Methodology:**
- Standard-tier products (not cheapest LACK-only, not premium)
- Complete furnishing baskets by room type
- National pricing (same across all cities)

**Amounts:**
- 1+kk: 90,000 Kč
- 2+kk: 120,000 Kč
- 3+kk: 170,000 Kč
- 4+kk: 200,000 Kč

**Includes:**
- **Living room:** Sofa, coffee table, TV stand, bookshelf, rug, curtains
- **Bedroom(s):** Bed frame, mattress, wardrobe, nightstands, dresser
- **Kitchen:** Dining table/chairs, cookware, dinnerware
- **Bathroom:** Textiles, storage, accessories
- **Appliances:** Fridge, washer, microwave, vacuum
- **Home office:** Desk, chair, shelving (for 3+kk, 4+kk)

**Assumes:** Kitchen cabinets included in apartment purchase

**Retrieved:** December 27, 2025

---

### 9. Investment Return (vynosInvestice) ✅ VERIFIED

**Value:** 7.0% per annum (nominal)

**Sources:**

1. **Goldman Sachs Global Stock Outlook 2024**
   - 10-year forecast: 7.7% p.a. for global equities (MSCI AC World)
   - Historical since 1985: 9.3%
   - Historical since 2000: 7.7%
   - Note: S&P 500 only forecast is ~3% (high US valuations)

2. **Vanguard Capital Market Assumptions 2024**
   - US equities: 4.2-6.2%
   - Developed ex-US: 7.0-9.0%
   - Emerging markets: 6.6-8.6%
   - Non-US expected to outperform due to lower valuations

3. **Historical Data:**
   - MSCI World (1985-2024): 9.3% p.a.
   - MSCI World (2000-2024): 7.7% p.a.

**Methodology:**
- 7.0% balances current valuations vs. long-term mean reversion
- Represents globally diversified equity portfolio (not just US)
- 30-year horizon appropriate for this rate

**Conservative/Optimistic Ranges:**
- Conservative: 6.0%
- Base case: 7.0%
- Optimistic: 8.0%

**Retrieved:** December 27, 2025

---

### 10. Mortgage Interest Rate (urokovaSazbaHypoteky) ✅ VERIFIED

**Current Rate:** 4.9% per annum

**Source:** Swiss Life Hypoindex (December 2025)

**Methodology:**
- Weighted average of new mortgage rates
- Across major Czech banks
- All fixation periods

**Context:**
- ČNB REPO rate: 3.5%
- Spread over REPO: ~1.4%
- This rate applies to new mortgages at purchase time

**Retrieved:** December 27, 2025

---

### 11. Future Mortgage Rate (urokovaSazbaHypotekyFuture) ✅ DERIVED

**Value:** 4.5% per annum

**Formula:**
```
Equilibrium PRIBOR (~3.5%) + mortgage spread (~1.5%) ≈ 4.5%
```

**Sources:**
1. **ČNB Forecast (Autumn 2025)**
   - 3M PRIBOR: 3.5%/3.5%/3.8% (2025/2026/2027)
   - Inflation: 2.5%/2.2%/2.5%
   - REPO rate: 3.5% (stable)

2. **Historical Spreads:**
   - Typical mortgage spread over PRIBOR: ~1.5%

**Methodology:**
- Represents expected rate when refinancing after 5-year fixation (~2030)
- Conservative estimate assuming stable macroeconomic conditions
- Actual rate depends on: ČNB policy, banking competition, creditworthiness

**Retrieved:** December 27, 2025

---

### 12. Expected Inflation (ocekavanaInflace) ✅ VERIFIED

**Value:** 2.5% per annum

**Source:** ČNB Monetary Policy Forecast (Autumn 2025)

**ČNB Forecasts:**
- 2025: 2.5%
- 2026: 2.2%
- 2027: 2.5%

**Methodology:**
- ČNB target: 2.0%
- Forecasts consistently show 2.2-2.5%
- Using 2.5% for 10-30 year horizon
- Conservative estimate (higher inflation generally favors buying)

**Current Inflation:** 2.1% (November 2025)

**Retrieved:** December 27, 2025

---

### 13. Property Growth Rate (rustHodnotyNemovitosti) ⚠️ PLACEHOLDER

**Status:** Currently PLACEHOLDER - needs research

**Current Values (by city):**
- Praha: 6.0% p.a.
- Brno: 5.5% p.a.
- Larger cities: 5.0% p.a.
- Smaller cities: 3.5-4.5% p.a.

**Planned Sources:**
- ČNB reports on housing market
- CBA Monitor historical trends
- CZSO housing price indices
- International research (Case-Shiller, etc.)

**Notes:**
- These are AI estimates
- Need to verify with historical Czech data
- Long-term real estate returns typically: inflation + 0-2%
- Will be researched and updated in future version

---

### 14. Rent Growth Rate (rustNajemneho) ⚠️ PLACEHOLDER

**Status:** Currently PLACEHOLDER - needs research

**Current Values (by city):**
- Praha: 5.0% p.a.
- Brno: 4.5% p.a.
- Other cities: 3.0-4.0% p.a.

**Planned Sources:**
- Historical rent data from Sreality/Bezrealitky
- ČSU rental market statistics
- City-specific rent indices

**Notes:**
- These are AI estimates
- Typically tracks inflation + local demand
- Will be researched and updated in future version

---

## City Coverage

**13 Regional Capital Cities (krajská města):**

1. **Praha** - Hlavní město Praha
2. **Brno** - Jihomoravský kraj
3. **Ostrava** - Moravskoslezský kraj
4. **Plzeň** - Plzeňský kraj
5. **České Budějovice** - Jihočeský kraj
6. **Hradec Králové** - Královéhradecký kraj
7. **Liberec** - Liberecký kraj
8. **Olomouc** - Olomoucký kraj
9. **Pardubice** - Pardubický kraj
10. **Ústí nad Labem** - Ústecký kraj
11. **Karlovy Vary** - Karlovarský kraj
12. **Jihlava** - Kraj Vysočina
13. **Zlín** - Zlínský kraj

**Apartment Layouts:** 4 per city (1+kk, 2+kk, 3+kk, 4+kk)

**Total Configurations:** 13 cities × 4 layouts = **52 complete datasets**

---

## Transparency Features

### 1. Methodology Page (`/metodika-a-zdroje`)
- User-facing explanations of all parameters
- Source links and dates
- Formulas shown in plain language
- Categorized by topic

### 2. Metadata Tracking
Every parameter includes:
- Quality flag (VERIFIED/DERIVED/PLACEHOLDER)
- Source IDs with URLs
- Retrieval dates
- Methodology description
- Sample sizes (where applicable)
- Derivation formulas
- Notes and caveats

### 3. Sreality API Integration
- City mapping with API IDs
- District and municipality codes
- NUTS region codes for ČSÚ data joining

---

## Data Update Process

### Current Status
- **Data collection:** January 15, 2025 (Sreality listings)
- **Secondary sources:** December 27, 2025 (official statistics)
- **Version:** 2.0

### Planned Updates
1. **Property growth rates** - Research Czech historical data
2. **Rent growth rates** - Compile historical rental trends
3. **Quarterly updates** - CBA Monitor, Hypoindex
4. **Annual review** - All sources refreshed

### Update Frequency Recommendations
- **Quarterly:** Purchase prices, rent, mortgage rates
- **Annually:** Taxes, insurance, maintenance benchmarks
- **As needed:** Legal parameters (when laws change)

---

## Research Quality Notes

### Strengths ✅
1. **Real transaction data** - CBA Monitor uses actual cadastral registrations, not listing prices
2. **Large sample sizes** - Sreality data has hundreds of listings per city/layout
3. **Official sources** - ČNB, ČSÚ, Ministry of Finance
4. **Triangulation** - Multiple sources for key parameters (e.g., investment returns)
5. **Full audit trail** - Every value traceable to source
6. **Transparency** - Placeholder values clearly marked

### Limitations ⚠️
1. **Property/rent growth** - Currently placeholders, need historical Czech data
2. **30-year horizon** - Forecasts beyond 10 years inherently uncertain
3. **City variations** - Some smaller cities have lower sample sizes (4+kk apartments)
4. **Market timing** - Data from specific time period (Q3-Q4 2025)

### Mitigation Strategies
1. **Monte Carlo mode** - Models uncertainty in growth rates
2. **User adjustability** - All parameters can be customized
3. **Range recommendations** - Conservative/optimistic scenarios provided
4. **Documentation** - Clear notes about limitations

---

## Technical Implementation

### File Structure
```
src/data/
├── calculator-defaults.ts         # Actual values (46KB)
├── calculator-defaults.meta.ts    # Audit metadata (30KB)
├── calculator-defaults.types.ts   # TypeScript types (3KB)
└── sources-data.ts               # User-facing explanations (11KB)
```

### Type Safety
All values and metadata are fully typed:
```typescript
type DataQuality = "PLACEHOLDER" | "VERIFIED" | "DERIVED";

interface ParameterMeta {
  quality: DataQuality;
  sourceIds: string[];
  methodology: string;
  retrievedAt: string;
  sampleSizes?: Record<string, Record<string, number>>;
  // ... more fields
}
```

### API Integration
Sreality city mapping includes:
- `srealityRegionId` - For API queries
- `srealityDistrictId` - For filtering
- `srealityMunicipalityId` - For precise location
- `okres`, `kraj`, `nuts` - For ČSÚ data joining

---

## Comparison with Competition

### Typical Real Estate Calculators
- **Most calculators:** Use arbitrary defaults without sources
- **kamspenezi.cz:** Every value has documented source and methodology

### Key Differentiators
1. ✅ **28 documented sources** (vs. none for most competitors)
2. ✅ **Full audit trail** with URLs and dates
3. ✅ **Quality flags** (VERIFIED/DERIVED/PLACEHOLDER)
4. ✅ **Regional specificity** (13 cities, not just national averages)
5. ✅ **Sample size transparency** (e.g., "based on 481 listings")
6. ✅ **Monte Carlo uncertainty modeling** (addresses 30-year forecast limitations)
7. ✅ **Public methodology page** (`/metodika-a-zdroje`)

---

## Future Research Plans

### Phase 1: Complete Placeholders (Q1 2026)
- [ ] Property growth rates - Historical Czech data (10+ years)
- [ ] Rent growth rates - Historical rental market trends
- [ ] Regional variation analysis

### Phase 2: Enhanced Accuracy (Q2 2026)
- [ ] Transaction vs. listing price gaps
- [ ] Seasonal adjustment factors
- [ ] Neighborhood-level data (Prague districts, etc.)

### Phase 3: Advanced Features (H2 2026)
- [ ] Renovation cost modeling
- [ ] Energy efficiency impact
- [ ] Property type variations (panel vs. brick)

---

## Contact & Maintenance

**Maintainer:** Project team (kamspenezi.cz)  
**Last Updated:** February 7, 2026  
**Dataset Version:** 2.0  

For questions about methodology or to suggest improvements, see `/metodika-a-zdroje` page or contact via website.

---

**End of Documentation**
