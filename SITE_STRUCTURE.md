# kamspenezi.cz — Full Site Structure
Goals: SEO organic traffic + User trust
Last updated: 2026-04-05

---

## Overview

```
/                                        → Bydlení kalkulačka (homepage)
/investice                               → Investice kalkulačka
/koupit-nebo-pronajmout                  → SEO landing page (informational)
/vyplati-se-investicni-byt              → SEO landing page (informational)
/investicni-byt-nizky-vynos-myt         → Debunking article (HIGH PRIORITY)
/metodika/bydleni                        → How Bydlení calculator works
/metodika/investice                      → How Investice calculator works
/metodika/data-a-zdroje                  → All data sources
/mesta/[city]                            → 13 city pages
/o-projektu                              → About
/pruvodce/[slug]                         → Articles (ongoing)
```

---

## Layer 1 — Calculators

### `/` — Bydlení kalkulačka
**Purpose:** Primary tool, homepage.
**SEO target:** "kalkulačka hypotéka vs nájem", "vlastní bydlení nebo nájem kalkulačka"

Content:
- Hero: headline + one-sentence description of what it does
- City + apartment size selector (presets)
- Full calculator with inline `?` tooltips on every non-obvious input field (not a separate page — right there in the UI)
- Results card: verdict, 30-year numbers, link to Google Spreadsheet ("Ověřte výpočet v Google Sheets")
- Below results: "Jak kalkulačka počítá?" → `/metodika/bydleni`
- Bottom CTA: "Zvažuješ investiční byt? Zkus kalkulačku Investice →"

---

### `/investice` — Investice kalkulačka
**Purpose:** Primary tool for investors.
**SEO target:** "kalkulačka investiční byt", "investiční byt vs etf kalkulačka"

Content:
- Same structure as above
- Results card: verdict, 30-year numbers, Google Spreadsheet link
- Below results: "Jak kalkulačka počítá?" → `/metodika/investice`
- Bottom CTA: "Řešíš vlastní bydlení? Zkus kalkulačku Bydlení →"

---

## Layer 2 — SEO Informational Landing Pages

Capture people in the research phase before they use a calculator. Rank for informational queries, explain the decision, convert to the calculator.

### `/koupit-nebo-pronajmout`
**Purpose:** Top-of-funnel for people deciding whether to buy their own home.
**SEO target:** "koupit nebo pronajímat byt", "vlastní bydlení vs nájem", "vyplatí se koupit byt v čr"

Content:
1. H1: "Koupit, nebo zůstat v nájmu? Průvodce rozhodnutím v 2026"
2. Intro: The question isn't purely financial — but the financial part is where most people have blind spots.
3. "Co rozhoduje o výsledku" — 4–5 key variables: city, time horizon, price-to-rent ratio, starting capital, assumed return. Show how changing one variable flips the verdict.
4. "Praha vs. Ostrava — dva různé příběhy" — concrete numbers from real calculator data. Praha 145,000 Kč/m² vs. Ostrava 61,600 Kč/m², different story entirely.
5. "Co kalkulačka počítá a co ne" — honest scope limitations (doesn't model divorce, job loss, emotional value of ownership).
6. CTA: "Spočítej si svou situaci →" → homepage calculator
7. FAQ (5–6 questions)

---

### `/vyplati-se-investicni-byt`
**Purpose:** Top-of-funnel for investors evaluating rental property.
**SEO target:** "vyplatí se investiční byt", "investiční byt výnos 2026", "investovat do nemovitosti nebo akcií"

Content:
1. H1: "Vyplatí se investiční byt v 2026? Analýza čísel"
2. Intro: Investiční byt je v Česku oblíbený — ale málokdo počítá skutečný čistý výnos.
3. "Hrubý výnos vs. čistý výnos" — gross yield (roční nájem / kupní cena) vs. what actually matters: net return after mortgage, fond oprav, pojistění, daně, obsazenost, odpisy.
4. "Jak se srovnává s akciovým fondem" — core comparison with real Praha 1+kk numbers.
5. "Daňová výhoda investičního bytu" — odpisy in plain language. Real and significant, rarely discussed.
6. "Kdy investiční byt vychází lépe" — honest conditions: long horizon, leverage + appreciation, gross yield > ~4.5%.
7. CTA: "Spočítej si svůj investiční byt →" → `/investice`
8. FAQ

---

### `/investicni-byt-nizky-vynos-myt` ⚡ HIGH PRIORITY
**Purpose:** Debunk the "investiční byty vydělávají méně než spořicí účet" narrative that has been published in Hrot24, HN, Finance.cz, and Banky.cz. This page ranks against those articles, corrects the methodology, and drives directly to the Investice calculator.
**SEO target:** "investiční byt výnos spořicí účet", "investiční byt se nevyplatí", "výnos investičního bytu"

Why this article matters: The mainstream Czech press calculates gross rental yield (~3.7% nationally, ~3% in Praha) and compares it to savings account rates (4%+). Every single article makes the same four errors simultaneously:
1. Uses gross yield, not net return
2. Ignores property value appreciation entirely
3. Ignores the leverage effect of mortgage financing
4. Ignores the odpisy tax advantage

Content:
1. H1: "Proč noviny píší, že investiční byty nevydělávají — a kde se mýlí"
2. Cite the specific articles (Hrot24: "Byt jako investice? Zapomeňte", HN: "Výnosy investičních bytů padají"). Link to them. Show the claim.
3. "Kde se výpočet rozbíjí" — walk through each of the four errors with numbers:
   - Gross yield 3.7% vs. real net return calculation
   - What happens to total return when property value grows 3% p.a. over 30 years — the leverage effect on equity
   - Odpisy reducing taxable rental income by hundreds of thousands Kč over 30 years
   - The comparison baseline: savings account rate is short-term and variable; 30-year property return is a different asset class
4. "Správná kalkulace — Praha 1+kk, 30 let" — show the actual numbers from the Investice calculator with default settings. Full transparency: here is what we assume, here is the result.
5. "Kdy noviny mají pravdu" — intellectual honesty section. Short-term gross yield IS compressed in Praha right now. If your horizon is 5 years, the article's concern is valid. This is a 30-year instrument.
6. CTA: "Spočítej si svůj scénář →" → `/investice`

Note: This article is not defensive or aggressive. It is a methodological correction written from a position of transparency. The credibility comes from showing the exact calculation, not from attacking journalists.

---

## Layer 3 — Methodology / Trust Pages

### Design principle for all metodika pages
Two-layer structure on every page:
- **TL;DR box at the top** (5–6 bullet points): what the calculator does, key assumptions, where to verify. For the 98% of users who won't read the full page.
- **Full depth below**: complete methodology for skeptics, journalists, and financial professionals. This is the content that builds long-term credibility.

---

### `/metodika/bydleni`
**Purpose:** Full transparency on Bydlení calculator. Kills "I don't trust this" objections.
**SEO target:** "jak funguje kalkulačka bydlení", "metodika výpočtu hypotéka vs nájem"

Content:
1. H1: "Jak kalkulačka bydlení počítá"
2. Subheadline: "Každý předpoklad je zdrojovaný. Výpočet si ověříte v Google Sheets."
3. **TL;DR box** — 5-bullet summary of key assumptions and methodology
4. Google Sheets link (prominent, early)
5. **Dva scénáře** — what Scenario A starts with, what costs it bears, what it owns at year 30. Same for Scenario B. Plain language.
6. **Vedlejší fond** — the side fund mechanic explained clearly. "Proč neodčerpáváme z fondu scénáře B?" Explain that withdrawals would create an unfair sequence-of-returns penalty. Zeroing contributions is the fair approach. This is the most likely objection — address it directly.
7. **Hypotéka** — 5-year fix then long-term predicted rate. What the predicted rate is and why.
8. **Příspěvek od rodičů** — only Scenario A receives this. Scenario B's starting capital is not adjusted upward.
9. **Daňová úspora z úroků** — mortgage interest deduction. 15%/23% effect. Max 150,000 Kč/year (§15 ZDP).
10. **ETF — proč bez daně** — time test: 3+ year hold = zero capital gains tax in Czech Republic (§4 ZDP).
11. **Náklady na údržbu — proč ne 1% pravidlo** — why the US rule overstates costs for Czech panel apartments. Our bottom-up methodology.
12. **Konzervativní předpoklady** — what we assumed conservatively and why. What would change with more optimistic assumptions.
13. **Parametry a jejich hodnoty** — full table: all parameters, default values, sources, VERIFIED/DERIVED badges.
14. FAQ

---

### `/metodika/investice`
**Purpose:** Full transparency for Investice calculator.
**SEO target:** "jak funguje kalkulačka investiční byt", "výpočet výnosu investičního bytu metodika"

Content:
1. H1: "Jak kalkulačka investičního bytu počítá"
2. **TL;DR box**
3. Google Sheets link
4. **Dva scénáře** — Scenario A: buy investment apartment, mortgage, rent it out, invest surplus. Scenario B: invest equivalent starting capital in ETF from day one.
5. **Počáteční kapitál scénáře B** — Scenario B immediately invests: `akontace + vybavení bytu − příspěvek od rodičů`. This is the capital Scenario B has available precisely because it didn't buy the property.
6. **Vedlejší fond** — same mechanic as Bydlení but in the context of investment property cash flows. Once property turns cash-flow positive, Scenario B contributions go to zero, Scenario A surplus goes to side fund.
7. **Obsazenost** — why 100% is not assumed. City-specific conservative estimates. What the data says about realistic vacancy over 30 years.
8. **Odpisy nemovitosti** — plain language:
   - What odpisy are: a tax accounting tool, not actual cash
   - Depreciable base = 90% of purchase price (land cannot be depreciated)
   - Year 1: 1.4% of depreciable base; years 2–30: 3.4%
   - Effect: reduces taxable rental income every year
9. **Daňová ztráta a přenos** — when odpisy + costs exceed rental income = tax loss. Carried forward up to 5 years (§34 ZDP). How this works in the early years when the investment is cash-flow negative.
10. **Reálné náklady vs. paušál** — why we use itemized actual costs rather than the 30% flat-rate deduction, and when paušál would be better.
11. **Daňové pásmo (15 % vs. 23 %)** — effect on rental income taxation.
12. **ETF — proč bez daně** — same time test as Bydlení.
13. **Parametry a jejich hodnoty** — full table.
14. FAQ

---

### `/metodika/data-a-zdroje`
**Purpose:** Every dataset, source, and last-updated date in one place. The "show your work" page.
**SEO target:** "ceny bytů krajská města 2026", "průměrné nájemné česká republika 2026"

Content:
1. H1: "Data a zdroje"
2. Intro: "Kalkulačka pracuje s 28+ datasety. Všechny jsou veřejně dostupné a odkazované níže. Poslední aktualizace: 2026-04-04."
3. **Globální parametry** — investment return (MSCI World), mortgage rates (Hypoindex), inflation (ČNB). Per row: parameter, value used, source with link, date accessed.
4. **Ceny nemovitostí** — ČBA Monitor Q4 2025 table for all 13 cities with values and source link.
5. **Nájemné** — Deloitte Rent Index Q4 2025 for all 13 cities.
6. **Náklady vlastnictví** — fond oprav, pojistění, daň z nemovitostí, náklady na údržbu. Source per line item.
7. **Daňová pravidla** — ZDP §4, §9, §15, §34 with links to zakonyprolidi.cz.
8. **Kdy data aktualizujeme** — ČBA Monitor quarterly, Deloitte quarterly, mortgage rates monthly. Update process.

---

## Layer 4 — City Pages (13 pages)

### `/mesta/[city]`
Cities: praha, brno, ostrava, plzen, ceske-budejovice, hradec-kralove, liberec, olomouc, pardubice, usti-nad-labem, karlovy-vary, jihlava, zlin

**Purpose:** City-specific SEO + pre-filled calculator entry point.
**SEO target:** "nájem vs koupě bytu v [Město]", "investiční byt [Město] výnos", "ceny bytů [Město] 2026"

Content (same template, city-specific data):
1. H1: "Koupit, nebo pronajímat byt v [Město]? Čísla za 2026"
2. **Klíčová čísla** — price/m² (ČBA Monitor), rent/m² (Deloitte), gross yield, property growth assumption. 4 data callouts.
3. **Verdikt — Bydlení** — pre-computed for 1+kk, 30 years, default assumptions. With explicit disclaimer: *"Výsledek platí pro výchozí předpoklady 1+kk. Vaše čísla se mohou lišit — použijte kalkulačku."*
4. **Verdikt — Investice** — same, same disclaimer.
5. **Co dělá [Město] specifickým** — 2–3 sentences of city context. Each city needs a handwritten paragraph, not templated. Examples:
   - Praha: compressed yield, highest appreciation expectations, strong rental demand
   - Ostrava: highest gross yield in dataset, weakest appreciation assumptions, higher vacancy risk
   - Ústí nad Labem: cheapest entry price, highest yield on paper, but obsazenost assumption is lowest (87%) — the market that looks best on gross yield looks worst on risk-adjusted net return
   - Karlovy Vary: tourist market dynamics, seasonal vacancy patterns
6. **CTA Bydlení**: "Spočítej si přesně svou situaci v [Město] →" (links to `/` with city pre-selected via URL param)
7. **CTA Investice**: "Spočítej si investiční byt v [Město] →" (links to `/investice` with city pre-selected)
8. Links to 2–3 comparable or neighboring cities

**Implementation note:** Statically generated from `calculator-defaults.ts`. Verdict numbers pre-computed at build time. City-specific paragraph written manually — this is what differentiates these pages from pure programmatic SEO and prevents thin content penalties.

---

## Layer 5 — About

### `/o-projektu`
**Purpose:** Trust, personal story, independence statement.

Content:
1. H1: "Michal Humaj"
2. **Osobní příběh** — "Řešil jsem stejnou otázku jako vy. Nenašel jsem kalkulačku, která by to počítala poctivě. Tak jsem ji postavil."
3. **Proč věřit tomuto webu** — explicit independence statement: no bank commissions, no ads, no mortgage referral fees, no financial product promotions. Personal project funded by personal time.
4. **Rozsah výzkumu** — 28+ datasets, 52 parameter sets, 23,000+ words of documented methodology.
5. **Transparentnost** — everything verifiable: Google Sheets, documented sources, open methodology pages.
6. **Kontakt** — LinkedIn, email.

---

## Layer 6 — Articles (ongoing, one at a time)

URL pattern: `/pruvodce/[slug]`

Priority order:
1. `/pruvodce/jak-funguje-hypoteka` — "Jak funguje hypotéka: průvodce pro první kupující" — high volume, Bydlení audience
2. `/pruvodce/dane-z-pronajmu-nemovitosti` — "Jak se daní příjmy z pronájmu v ČR" — high intent, Investice audience
3. `/pruvodce/etf-pro-zacatecniky` — "Globální akciový fond ETF: co to je a proč ho kalkulačka předpokládá"
4. `/pruvodce/fond-oprav` — "Fond oprav: co to je, kolik platíte a na co to jde"
5. `/pruvodce/ceny-bytu-krajska-mesta-2026` — Data roundup, links to all 13 city pages naturally

---

## Internal linking — PageRank flow

The homepage (`/`) is the most authoritative page. Every page should ultimately push authority back toward the two calculators.

```
Articles → City pages → Calculators (homepage + /investice)
                     ↓
           Metodika pages → Data a zdroje
                     ↓
               O projektu
```

Specific rules:
- City pages link UP to calculators (with city pre-filled) and DOWN to metodika pages
- SEO landing pages link to calculators AND to relevant city pages as examples
- Metodika pages link to Google Sheets and data-a-zdroje, NOT back to calculators (avoid circular authority loops)
- Articles link to city pages and calculators, not to other articles
- O projektu links to both metodika pages (credibility chain)
- Debunking article links directly to `/investice` — it's a pure conversion page

---

## Sitemap priority

| URL | Priority | Frequency |
|---|---|---|
| `/` | 1.0 | weekly |
| `/investice` | 0.9 | weekly |
| `/mesta/[city]` × 13 | 0.8 | quarterly |
| `/koupit-nebo-pronajmout` | 0.8 | monthly |
| `/vyplati-se-investicni-byt` | 0.8 | monthly |
| `/investicni-byt-nizky-vynos-myt` | 0.8 | monthly |
| `/metodika/bydleni` | 0.7 | monthly |
| `/metodika/investice` | 0.7 | monthly |
| `/metodika/data-a-zdroje` | 0.6 | quarterly |
| `/o-projektu` | 0.5 | yearly |
| Articles | 0.6 | yearly |

---

## Build priority

**Phase 1 — Foundation (do now):**
1. Add Google Sheets link to both results cards
2. Add inline `?` tooltips to non-obvious input fields in both calculators
3. `/metodika/bydleni` — rewrite with TL;DR + full depth
4. `/metodika/investice` — rewrite with TL;DR + full depth
5. `/metodika/data-a-zdroje` — new page

**Phase 2 — City pages (template once, ship 13):**
6. Build `/mesta/[city]` template with static generation from `calculator-defaults.ts`
7. Write city-specific paragraph for each of the 13 cities
8. Ship all 13

**Phase 3 — SEO landing pages + debunking:**
9. `/investicni-byt-nizky-vynos-myt` — debunking article (write this first, highest topical authority gain)
10. `/koupit-nebo-pronajmout` — full article
11. `/vyplati-se-investicni-byt` — full article

**Phase 4 — Articles (ongoing):**
12. One article at a time, priority order above
