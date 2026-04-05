# Data a zdroje
**URL:** /metodika/data-a-zdroje
**Tón:** přímý, transparentní, tykání
**Délka:** ~800 slov + tabulky

## META

**Title:** Data a zdroje kalkulačky | kamspenezi.cz
**Description:** Přehled všech zdrojů, ze kterých kalkulačka čerpá. Ceny bytů, výše nájmů, úrokové sazby, náklady vlastnictví. Vše odkazované a datované.

## OBSAH STRÁNKY

### H1
Odkud bereme data

### Perex
Kalkulačka pracuje s daty z více než 28 veřejně dostupných zdrojů. Níže najdeš přehled každého parametru: odkud pochází, jakou hodnotu používáme a kdy jsme data naposledy ověřili.

**Poslední aktualizace dat: 2026-04-04**

---

### Globální parametry

Tyto hodnoty platí pro všechna města a všechny dispozice.

| Parametr | Hodnota | Zdroj | Datum ověření |
|---|---|---|---|
| Výnos globálního akciového fondu | 6,5 % p.a. | Průměr 5 CMA: Vanguard VCMM, BNY Investments, AQR, DMS/UBS, J.P. Morgan pro rok 2026 | 2026-04-04 |
| Úroková sazba hypotéky (1–5 let) | 3,99 % p.a. | Hypoindex.cz, nejnižší ověřená sazba na trhu (Moneta Money Bank) k 25. 3. 2026 | 2026-04-04 |
| Úroková sazba hypotéky (6–30 let) | 4,5 % p.a. | Odvozeno: reálná neutrální sazba ČNB + inflační cíl + bankovní marže | 2026-04-04 |
| Očekávaná inflace | 2,5 % p.a. | ČNB, střednědobý inflační cíl | 2026-04-04 |
| Růst nájemného | 2,5 % p.a. | Deloitte Rent Index, průměr 2015–2024 | 2026-04-04 |

---

### Vybavení bytu — výchozí hodnoty

Platí pro kalkulačku Bydlení (standard pro vlastní bydlení) i Investice (úspornější pronajímatelský standard).

| Dispozice | Bydlení | Investice |
|---|---|---|
| 1+kk | 180 000 Kč | 110 000 Kč |
| 2+kk | 220 000 Kč | 140 000 Kč |
| 3+kk | 280 000 Kč | 180 000 Kč |
| 4+kk | 350 000 Kč | 230 000 Kč |

Zdroj: IKEA.cz ceník 2026, spotřebiče z Alza.cz a Datart.cz. Investiční standard počítá s economy nábytkem a základními spotřebiči bez zbytečné nadstavby.

---

### Ceny nemovitostí podle města

Zdroj: [ČBA Monitor](https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta), transakční ceny starších bytů (před rokem 1995), Q4 2025. Staženo 2026-04-04.

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

### Výše nájemného podle města

Zdroj: [Deloitte Rent Index](https://www2.deloitte.com/cz/cs/pages/real-estate/articles/deloitte-rent-index.html) Q4 2025, vydáno leden 2026. Průměrná cena měsíčního nájmu v Kč/m² ze zrealizovaných nabídek z realitních portálů. Výše nájmu konkrétní dispozice = Kč/m² × průměrná plocha.

| Město | Kč/m²/měsíc (Q4 2025) |
|---|---|
| Praha | 459 |
| Brno | 392 |
| Hradec Králové | 317 |
| Pardubice | 307 |
| Plzeň | 294 |
| Olomouc | 293 |
| Zlín | 290 |
| České Budějovice | 277 |
| Liberec | 271 |
| Jihlava | 256 |
| Karlovy Vary | 256 |
| Ostrava | 239 |
| Ústí nad Labem | 221 |

---

### Obsazenost investičního bytu podle města

Platí pouze pro kalkulačku Investice. Vychází z dat o vakanci institucionálního nájemního trhu (Knight Frank, BTR Consulting) upravených dolů pro soukromého pronajímatele, který má pomalejší proces nalezení nového nájemníka.

| Město | Obsazenost |
|---|---|
| Praha | 95 % |
| Brno | 94 % |
| Hradec Králové | 93 % |
| Pardubice | 93 % |
| České Budějovice | 92 % |
| Olomouc | 92 % |
| Plzeň | 92 % |
| Zlín | 91 % |
| Liberec | 91 % |
| Jihlava | 90 % |
| Ostrava | 90 % |
| Karlovy Vary | 88 % |
| Ústí nad Labem | 87 % |

---

### Růst hodnoty nemovitosti podle města

Strukturální odhad vychází z historických dat Eurostat (ei_hppi_q) a Hypostat 2023 (European Mortgage Federation). Kalibrováno pro každé město na základě cyklu 2010–2019 bez pandemické anomálie.

| Město | Předpokládaný roční růst |
|---|---|
| Praha | 4,5 % p.a. |
| Brno | 4,0 % p.a. |
| Hradec Králové | 3,5 % p.a. |
| Pardubice | 3,5 % p.a. |
| České Budějovice | 3,5 % p.a. |
| Olomouc | 3,5 % p.a. |
| Plzeň | 3,5 % p.a. |
| Zlín | 3,5 % p.a. |
| Liberec | 3,5 % p.a. |
| Jihlava | 3,5 % p.a. |
| Ostrava | 3,0 % p.a. |
| Karlovy Vary | 3,0 % p.a. |
| Ústí nad Labem | 2,5 % p.a. |

---

### Náklady vlastnictví

| Náklad | Metodika | Zdroj |
|---|---|---|
| Fond oprav | 20–50 Kč/m²/měsíc dle stáří domu | NOZ § 1180, tržní průzkum SVJ příspěvků |
| Pojistění nemovitosti | přibližně 20 Kč/m²/rok | Srovnávač.cz, průměr pojistného pro byt v ČR (2025) |
| Daň z nemovitosti | Zákonný vzorec | Zákon č. 338/1992 Sb. ve znění novely 2024: plocha × sazba × koef. 1,22 × základní koef. × místní koef. |
| Náklady na údržbu | Fixní základ + 73 Kč/m²/rok | Bottom-up amortizace: koupelna, kuchyň, spotřebiče, podlahy, malování. Zdroje: nejremeslnici.cz, megastroj.cz (2026) |

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

Ceny bytů a nájemné aktualizujeme čtvrtletně, vychází z dostupnosti dat ČBA Monitor a Deloitte Rent Index. Úrokové sazby hypoték sledujeme měsíčně přes Hypoindex.cz. Daňová pravidla kontrolujeme při každé legislativní změně.

Datum poslední aktualizace je uvedeno v záhlaví této stránky.

Máš otázku k některému zdroji nebo chceš upozornit na novější data? Napiš na michal@kamspenezi.cz.
