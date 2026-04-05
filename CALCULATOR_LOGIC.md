# Calculator Logic — kamspenezi.cz

Full verification available in the public Google Spreadsheet linked from each results card.

---

## Two calculators, same structure

Both calculators compare **Scenario A vs. Scenario B** over a **30-year horizon**.

| | Scenario A | Scenario B |
|---|---|---|
| **Bydlení** | Buy apartment on mortgage (own residence) | Rent + invest savings in ETF |
| **Investice** | Buy investment apartment on mortgage, rent it out | Invest equivalent capital in ETF |

---

## Shared mechanics

### Mortgage rates
- Years 1–5: rate from field *Úroková sazba hypotéky po dobu 5 let fixace*
- Years 6–30: rate from field *Úrok hypotéky po 5 leté fixaci (p.a.)* — predicted long-term average

### Income tax (15 % or 23 %)
- **Bydlení / Scenario A**: mortgage interest is tax-deductible (reduces tax base). Max deduction 150,000 Kč/year (§15 ZDP).
- **Investice / Scenario A**: tax rate applied to net rental income (after odpisy and reálné náklady).
- **ETF (both calculators)**: zero tax. We assume the investor holds for 3+ years, which triggers the Czech time-test exemption — no capital gains tax owed.

### Příspěvek od rodičů
A one-time gift that only applies if buying a property (Scenario A). In Bydlení it reduces the required down payment. In Investice it reduces the initial capital available to Scenario B (because that money only exists in the buying scenario — Scenario B does not receive it).

### Náklady na údržbu
We do **not** use the US 1% rule (1% of property value per year). That rule was calibrated for the American market and systematically overstates costs for Czech panel apartments in regional cities. Our values are built bottom-up: itemized amortization of bathroom renovation, kitchen, appliances, flooring, and similar capital expenditures over realistic Czech replacement cycles. Methodology and sources are in `src/data/attributes/naklady-udrzby.ts`.

---

## Side fund mechanics

This is the most important and least obvious part of the model. The purpose is to keep both scenarios **financially equivalent at every point in time** — neither scenario gets to "bank" an advantage.

### Bydlení

- **Early years**: owning (mortgage + costs) is more expensive than renting. The difference in monthly cash flow is invested by **Scenario B** into the ETF fund.
- **Later years**: once the mortgage amortizes enough that owning becomes cheaper than renting, the tables turn. From that point:
  - Scenario B stops adding to the ETF (new contribution = 0). The existing portfolio keeps compounding.
  - Scenario A creates a **side fund** and invests the monthly surplus there at the same ETF return rate.
- We do NOT withdraw from Scenario B's ETF when tables turn. Withdrawals would create an unfair sequence-of-returns penalty against Scenario B. Instead we zero the new contributions and start the Scenario A side fund.

**Čisté jmění at year 30:**
- Scenario A = property value − remaining debt + side fund value
- Scenario B = ETF portfolio value

### Investice

- **Starting capital for Scenario B**: on day 1, Scenario B invests: `down payment + furnishing costs − příspěvek od rodičů`. This is the capital that Scenario B has available precisely because it did not buy the property.
- **Early years**: investment property cash flow is negative (mortgage + costs > rental income). Scenario B has more investable cash. The monthly difference is invested into the ETF.
- **Later years**: once the property generates positive cash flow, the same logic as Bydlení applies — Scenario B contributions go to zero, Scenario A surplus goes into a side fund at the ETF return rate.

**Čisté jmění at year 30:**
- Scenario A = property value − remaining debt + side fund value
- Scenario B = ETF portfolio value

---

## Investice — tax and depreciation detail

Rental income is taxed using **reálné náklady** (actual costs), not the flat-rate 30% deduction.

**Odpisy nemovitosti (depreciation):**
- Depreciable base = 90% of purchase price (land cannot be depreciated)
- Year 1: 1.4% of depreciable base
- Years 2–30: 3.4% of depreciable base per year
- Odpisy are deducted from the tax base for rental income

**Ztráta (tax loss):**
- When odpisy + other costs exceed rental income, the result is a tax loss
- Losses are carried forward and set off against future rental income
- Carryforward period: **5 years** (§34 ZDP)
- We apply the loss exactly as Czech law requires

---

## Data and defaults

- 13 Czech regional cities, 4 apartment sizes (1+kk to 4+kk) = 52 parameter sets
- Last updated: 2026-04-04
- Sources: ČBA Monitor, Deloitte Rent Index, Hypoindex, ČNB, Czech law (ZDP, NOZ)
- Full source documentation: `src/data/attributes/` — one file per parameter
