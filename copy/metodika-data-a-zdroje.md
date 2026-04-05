# Data a zdroje
**URL:** /metodika/data-a-zdroje
**Tón:** přímý, transparentní, tykání
**Délka:** ~800 slov + tabulky

---

## META

**Title:** Data a zdroje kalkulačky | kamspenezi.cz
**Description:** Přehled všech 28+ datasetů a zdrojů, ze kterých kalkulačka čerpá. Ceny bytů, výše nájmů, úrokové sazby, náklady vlastnictví — vše odkazované a datované.

---

## OBSAH STRÁNKY

### H1
Data a zdroje

### Perex
Kalkulačka pracuje s 28+ datasety. Všechny jsou veřejně dostupné. Níže najdeš přehled každého parametru — odkud pochází, jakou hodnotu používáme a kdy jsme data naposledy ověřili.

**Poslední aktualizace dat: 2026-04-04**

---

### Globální parametry

Tyto hodnoty platí pro všechna města a všechny dispozice.

| Parametr | Hodnota | Zdroj | Datum ověření |
|---|---|---|---|
| Výnos globálního akciového fondu | 6,5 % p.a. | Průměr 5 CMA: Vanguard VCMM, BNY Investments, AQR, DMS/UBS, J.P. Morgan — pro rok 2026 | 2026-04-04 |
| Úroková sazba hypotéky (1–5 let) | 3,99 % p.a. | Hypoindex.cz — nejnižší ověřená sazba na trhu (Moneta Money Bank) k 25. 3. 2026 | 2026-04-04 |
| Úroková sazba hypotéky (6–30 let) | 4,5 % p.a. | Rovnovážná stavebnicová metoda: reálná neutrální sazba ČNB + inflační cíl + bankovní marže | 2026-04-04 |
| Očekávaná inflace | 2,5 % p.a. | ČNB — střednědobý inflační cíl | 2026-04-04 |
| Vybavení bytu — bydlení (1+kk) | 180 000 Kč | IKEA.cz ceník 2026, spotřebiče z Alza.cz a Datart.cz | 2026-04-04 |
| Vybavení bytu — investice (1+kk) | 110 000 Kč | Economy pronajímatelský standard, stejné zdroje | 2026-04-04 |

---

### Ceny nemovitostí — per město

Zdroj: **ČBA Monitor** — transakční ceny starších bytů (před rokem 1995), Q4 2025.
Staženo 2026-04-04 z [cbamonitor.cz](https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta) (CSV ke stažení na stránce s grafem).
Hodnoty jsou v Kč/m². Kupní cena konkrétní dispozice = Kč/m² × průměrná plocha dané dispozice v daném městě.

| Město | Kč/m² (Q4 2025) |
|---|---|
| Praha | 145 000 |
| Brno | 114 300 |
| Hradec Králové | 86 100 |
| Pardubice | 84 000 |
| České Budějovice | 81 100 |
| Olomouc | 79 200 |
| Plzeň | 78 400 |
| Zlín | 75 700 |
| Liberec | 74 200 |
| Jihlava | 68 100 |
| Ostrava | 61 600 |
| Karlovy Vary | 51 700 |
| Ústí nad Labem | 46 400 |

---

### Výše nájemného — per město

Zdroj: **Deloitte Rent Index** Q4 2025 (vydáno leden 2026).
Metodika Deloitte: průměrná cena měsíčního nájmu v Kč/m² ze zrealizovaných nabídek z realitních portálů. Výše nájmu konkrétní dispozice = Kč/m² × průměrná plocha.

| Město | Kč/m²/měsíc (Q4 2025) |
|---|---|
| Praha | 459 |
| Brno | 392 |
| Hradec Králové | 317 |
| Pardubice | 307 |
| Plzeň | 294 |
| Zlín | 290 |
| České Budějovice | 277 |
| Liberec | 271 |
| Karlovy Vary | 256 |
| Jihlava | 256 |
| Olomouc | 293 |
| Ostrava | 239 |
| Ústí nad Labem | 221 |

---

### Růst hodnoty nemovitosti — per město

Zdroj: Historická data Eurostat (ei_hppi_q) a Hypostat 2023 (European Mortgage Federation), kalibrováno per-město na základě Jordà-Knoll-Kuvshinov-Schularick-Taylor (2019) a strukturálního modelu růstu.

| Město | Předpokládaný roční růst |
|---|---|
| Praha | 4,5 % p.a. |
| Brno | 4,0 % p.a. |
| Hradec Králové, Pardubice, České Budějovice, Olomouc, Plzeň, Zlín, Liberec, Jihlava | 3,5 % p.a. |
| Ostrava, Karlovy Vary | 3,0 % p.a. |
| Ústí nad Labem | 2,5 % p.a. |

---

### Náklady vlastnictví

| Náklad | Metodika | Zdroj |
|---|---|---|
| Fond oprav | Dle SVJ průzkumu, 20–50 Kč/m²/měsíc dle stáří domu | NOZ § 1180, tržní průzkum SVJ příspěvků |
| Pojistění nemovitosti | ~20 Kč/m²/rok | Srovnávač.cz — průměr pojistného pro byt v ČR (2025) |
| Daň z nemovitosti | Zákonný vzorec | Zákon č. 338/1992 Sb. ve znění novely 2024: plocha × sazba × koef. 1,22 × základní koef. × místní koef. |
| Náklady na údržbu | Fixní základ + 73 Kč/m²/rok | Bottom-up amortizace: koupelna, kuchyň, spotřebiče — nejremeslnici.cz, megastroj.cz (2026) |

---

### Daňová pravidla

| Pravidlo | Hodnota | Zákonný základ |
|---|---|---|
| Odpočet hypotečních úroků | Max. 150 000 Kč/rok | § 15 ZDP (zákon č. 586/1992 Sb.) |
| Sazba daně z příjmů — základní | 15 % | § 16 ZDP |
| Sazba daně z příjmů — vyšší | 23 % (nad 36násobek průměrné mzdy) | § 16 ZDP |
| Osvobození zisku z cenných papírů | Po 3 letech držení | § 4 odst. 1 písm. w) ZDP |
| Odpisy nemovitosti — rok 1 | 1,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 |
| Odpisy nemovitosti — roky 2–30 | 3,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 |
| Odpisový základ | 90 % kupní ceny (bez pozemku) | § 29 ZDP |
| Přenos daňové ztráty z nájmu | Max. 5 let | § 34 ZDP |

---

### Jak a kdy data aktualizujeme

Ceny bytů a nájemné aktualizujeme čtvrtletně — vychází z dostupnosti dat ČBA Monitor a Deloitte Rent Index (obě vydání jsou čtvrtletní). Úrokové sazby hypoték sledujeme měsíčně přes Hypoindex.cz. Daňová pravidla kontrolujeme při každé legislativní změně.

Datum poslední aktualizace je uvedeno v záhlaví této stránky a také v souboru `calculator-defaults.ts` jako pole `lastUpdated`.

Pokud najdeš chybu v datech nebo chceš upozornit na novější zdroj, napiš na michal@kamspenezi.cz.
