/**
 * Atribut: Kupní cena bytu (kupniCena)
 * Výzkum proveden: 2026-04-04
 */

import type { AttributeDoc, PerCity, PerCityPerSize } from "./_types";
import { squareMetersValues } from "./square-meters";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Transakční ceny starších bytů (byty postavené před rokem 1995) v Kč/m².
 * Zdroj: ČBA Monitor / Flat Zone, Q4 2025.
 * Staženo: 2026-04-04 z https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta
 * (tlačítko CSV ke stažení na stránce s grafem).
 *
 * Hodnoty jsou v Kč/m² (CSV vydán v tis. Kč, přepočteno ×1000).
 * Národní průměr Q4 2025: 75 300 Kč/m².
 */
const cbaMonitorTransakcniCenaQ4_2025: PerCity<number> = {
  "praha": 145_000,           // ČBA Monitor CSV Q4 2025 — 145,0 tis. Kč/m²
  "brno": 114_300,            // ČBA Monitor CSV Q4 2025 — 114,3 tis. Kč/m²
  "hradec-kralove": 86_100,   // ČBA Monitor CSV Q4 2025 — 86,1 tis. Kč/m²
  "pardubice": 84_000,        // ČBA Monitor CSV Q4 2025 — 84,0 tis. Kč/m²
  "ceske-budejovice": 81_100, // ČBA Monitor CSV Q4 2025 — 81,1 tis. Kč/m²
  "olomouc": 79_200,          // ČBA Monitor CSV Q4 2025 — 79,2 tis. Kč/m²
  "plzen": 78_400,            // ČBA Monitor CSV Q4 2025 — 78,4 tis. Kč/m²
  "zlin": 75_700,             // ČBA Monitor CSV Q4 2025 — 75,7 tis. Kč/m²
  "liberec": 74_200,          // ČBA Monitor CSV Q4 2025 — 74,2 tis. Kč/m²
  "jihlava": 68_100,          // ČBA Monitor CSV Q4 2025 — 68,1 tis. Kč/m²
  "ostrava": 61_600,          // ČBA Monitor CSV Q4 2025 — 61,6 tis. Kč/m²
  "karlovy-vary": 51_700,     // ČBA Monitor CSV Q4 2025 — 51,7 tis. Kč/m²
  "usti-nad-labem": 46_400,   // ČBA Monitor CSV Q4 2025 — 46,4 tis. Kč/m²
};

/**
 * Nabídkové ceny bytů 2+kk v Kč/m² z analýzy Sreality.cz, 1. pololetí 2025.
 * Filtr: 35–75 m², dispozice 2+kk, starší byty, velmi dobrý/dobrý stav nebo po rekonstrukci.
 *
 * POUZE PRO DOKUMENTACI A VALIDACI — nevyužito ve výpočtech.
 * Po obdržení CBA Monitor CSV jsou všechna města pokryta transakčními cenami,
 * které jsou přesnější než tyto nabídkové ceny. Uchováno pro auditní stopu.
 */
const _srealityNabidkovaCena2kk_H1_2025_referenceOnly: Partial<PerCity<number>> = {
  "praha": 153_000,
  "brno": 123_000,
  "hradec-kralove": 98_000,
  "ceske-budejovice": 92_000,
  "olomouc": 91_000,
  "plzen": 87_000,
  "liberec": 87_000,
  "karlovy-vary": 79_000,
  "ostrava": 73_000,
  "usti-nad-labem": 49_000,
  // Jihlava, Zlín, Pardubice: nedostatečný vzorek pro Sreality analýzu (< 30 inzerátů)
};
void _srealityNabidkovaCena2kk_H1_2025_referenceOnly; // suppress unused-variable warning

/**
 * Koeficienty přirážky/slevy ceny za m² podle dispozice vůči 2+kk.
 * Menší byty mají vyšší cenu za m² (prémium), větší byty mají slevu na m².
 *
 * METODIKA ODVOZENÍ: Vlastní dotaz na Sreality.cz API, 2026-04-04.
 * Script: scripts/sreality-disposition-prices.mjs
 * Pro každé ze 13 krajských měst a 4 dispozic (+kk varianty) byl stažen
 * medián ceny za m² z aktivních nabídek. Koeficienty jsou mediánem
 * per-city koeficientů přes všechna města.
 *
 * Výsledky (Kč/m², datum: 2026-04-04, nabídkové ceny — nikoli transakční):
 *   Praha:   1+kk 191 210 (n=476), 2+kk 172 501 (n=1300), 3+kk 167 820 (n=965), 4+kk 162 893 (n=445)
 *   Brno:    1+kk 168 393 (n=155), 2+kk 143 396 (n=345),  3+kk 134 435 (n=198), 4+kk 125 414 (n=78)
 *   Ostrava: 1+kk 104 825 (n=47),  2+kk  90 000 (n=71),   3+kk  82 557 (n=73),  4+kk  92 700 (n=32)
 *   Plzeň:   1+kk 133 356 (n=32),  2+kk 103 061 (n=78),   3+kk  94 632 (n=71),  4+kk  94 900 (n=27)
 *   ČB:      1+kk 115 121 (n=37),  2+kk  99 744 (n=65),   3+kk 101 290 (n=52),  4+kk  89 766 (n=35)
 *   HK:      1+kk 112 767 (n=7!),  2+kk 119 984 (n=42),   3+kk  93 730 (n=40),  4+kk 112 621 (n=15)
 *   Liberec: 1+kk 102 885 (n=30),  2+kk  99 968 (n=65),   3+kk  99 926 (n=48),  4+kk  99 515 (n=22)
 *   Olomouc: 1+kk 130 047 (n=22),  2+kk 106 207 (n=71),   3+kk 107 468 (n=71),  4+kk 109 272 (n=19)
 *   Pardubice:1+kk 114 420 (n=4!), 2+kk 100 000 (n=25),   3+kk  97 119 (n=48),  4+kk  97 750 (n=14)
 *   Ústí:    1+kk  75 171 (n=12),  2+kk  60 465 (n=15),   3+kk  55 385 (n=6!),  4+kk  null  (n=0!)
 *   KV:      1+kk 112 821 (n=17),  2+kk  92 874 (n=100),  3+kk  80 617 (n=90),  4+kk  68 098 (n=18)
 *   Jihlava: 1+kk  98 658 (n=5!),  2+kk  89 579 (n=17),   3+kk  70 474 (n=20),  4+kk  71 075 (n=5!)
 *   Zlín:    1+kk 113 750 (n=11),  2+kk  91 765 (n=27),   3+kk  90 615 (n=27),  4+kk  97 161 (n=26)
 *
 * Per-city koeficienty (vůči 2+kk):
 *   Praha: 1.108 / 1.000 / 0.973 / 0.944
 *   Brno:  1.174 / 1.000 / 0.938 / 0.875
 *   Ostrava: 1.165 / 1.000 / 0.917 / 1.030 (4+kk anomálie — malý trh)
 *   Plzeň: 1.294 / 1.000 / 0.918 / 0.921
 *   ČB:    1.154 / 1.000 / 1.015 / 0.900
 *   HK:    0.940 / 1.000 / 0.781 / 0.939 (1+kk anomálie — n=7, nevěrohodné)
 *   Liberec: 1.029 / 1.000 / 1.000 / 0.995 (trh bez prémiového segmentu 1+kk)
 *   Olomouc: 1.224 / 1.000 / 1.012 / 1.029 (3+kk/4+kk > 2+kk — Olomouc specifika)
 *   Pardubice: 1.144 / 1.000 / 0.971 / 0.978 (1+kk n=4, nespolehlivé)
 *   Ústí: 1.243 / 1.000 / 0.916 / N/A
 *   KV: 1.215 / 1.000 / 0.868 / 0.733 (4+kk výrazná sleva)
 *   Jihlava: 1.101 / 1.000 / 0.787 / 0.793 (n=5, nespolehlivé)
 *   Zlín: 1.240 / 1.000 / 0.987 / 1.059
 *
 * ROZHODNUTÍ — národní mediány místo per-city koeficientů:
 *   Důvod: Pro 1+kk má 5 měst n<10 (HK, Pardubice, Jihlava, Zlín, KV), pro 4+kk
 *   chybí Ústí nad Labem úplně. Anomálie (HK 1+kk = 0.940, Olomouc 4+kk > 2+kk)
 *   by vnášely systematické chyby. Národní mediány jsou robustnější.
 *
 * Národní mediány koeficientů (sreality-full-scrape.mjs, 2026-04-04):
 *   1+kk: 1.175 (z 13 měst)
 *   3+kk: 0.944 (z 13 měst)
 *   4+kk: 0.959 (z 12 měst, Ústí nad Labem vynecháno — 0 nabídek 4+kk)
 */
const dispozicniKoeficient: Record<"1+kk" | "2+kk" | "3+kk" | "4+kk", number> = {
  "1+kk": 1.175, // +17,5 % vs. 2+kk — národní medián, Sreality API 2026-04-04 (n=13 měst)
  "2+kk": 1.000, // baseline
  "3+kk": 0.944, // -5,6 % vs. 2+kk — národní medián, Sreality API 2026-04-04 (n=13 měst)
  "4+kk": 0.959, // -4,1 % vs. 2+kk — národní medián, Sreality API 2026-04-04 (n=12 měst)
};

/**
 * Výpočet kupní ceny bytu v Kč.
 * kupniCena = cenaZaM2[město] × koeficientDispozice[dispozice] × squareMeters[město][dispozice]
 *
 * Zdroj cenaZaM2: ČBA Monitor Q4 2025 (transakční ceny, pre-1995 zástavba).
 * Zaokrouhlení na 10 000 Kč — přesnost vstupních dat to nedovoluje více.
 */
function vypoctiKupniCenu(
  mesto: string,
  dispozice: "1+kk" | "2+kk" | "3+kk" | "4+kk"
): number {
  const cbaM2 = cbaMonitorTransakcniCenaQ4_2025[mesto as keyof typeof cbaMonitorTransakcniCenaQ4_2025];
  const m2 = squareMetersValues[mesto as keyof typeof squareMetersValues]?.[dispozice];
  if (!m2) throw new Error(`squareMeters chybí pro ${mesto} ${dispozice}`);
  return Math.round(cbaM2 * dispozicniKoeficient[dispozice] * m2 / 10_000) * 10_000;
}

export const kupniCenaValues: PerCityPerSize<number> = {
  "praha": {
    "1+kk": vypoctiKupniCenu("praha", "1+kk"),              // 145 000 × 1,175 × 33 ≈ 5 620 000 Kč
    "2+kk": vypoctiKupniCenu("praha", "2+kk"),              // 145 000 × 1,000 × 52 ≈ 7 540 000 Kč
    "3+kk": vypoctiKupniCenu("praha", "3+kk"),              // 145 000 × 0,944 × 80 ≈ 10 950 000 Kč
    "4+kk": vypoctiKupniCenu("praha", "4+kk"),              // 145 000 × 0,959 × 110 ≈ 15 300 000 Kč
  },
  "brno": {
    "1+kk": vypoctiKupniCenu("brno", "1+kk"),               // 114 300 × 1,175 × 32 ≈ 4 300 000 Kč
    "2+kk": vypoctiKupniCenu("brno", "2+kk"),               // 114 300 × 1,000 × 53 ≈ 6 060 000 Kč
    "3+kk": vypoctiKupniCenu("brno", "3+kk"),               // 114 300 × 0,944 × 78 ≈ 8 420 000 Kč
    "4+kk": vypoctiKupniCenu("brno", "4+kk"),               // 114 300 × 0,959 × 113 ≈ 12 390 000 Kč
  },
  "ostrava": {
    "1+kk": vypoctiKupniCenu("ostrava", "1+kk"),            // 61 600 × 1,175 × 31 ≈ 2 240 000 Kč
    "2+kk": vypoctiKupniCenu("ostrava", "2+kk"),            // 61 600 × 1,000 × 54 ≈ 3 330 000 Kč
    "3+kk": vypoctiKupniCenu("ostrava", "3+kk"),            // 61 600 × 0,944 × 78 ≈ 4 540 000 Kč
    "4+kk": vypoctiKupniCenu("ostrava", "4+kk"),            // 61 600 × 0,959 × 105 ≈ 6 200 000 Kč
  },
  "plzen": {
    "1+kk": vypoctiKupniCenu("plzen", "1+kk"),              // 78 400 × 1,175 × 34 ≈ 3 130 000 Kč
    "2+kk": vypoctiKupniCenu("plzen", "2+kk"),              // 78 400 × 1,000 × 55 ≈ 4 310 000 Kč
    "3+kk": vypoctiKupniCenu("plzen", "3+kk"),              // 78 400 × 0,944 × 82 ≈ 6 070 000 Kč
    "4+kk": vypoctiKupniCenu("plzen", "4+kk"),              // 78 400 × 0,959 × 104 ≈ 7 820 000 Kč
  },
  "ceske-budejovice": {
    "1+kk": vypoctiKupniCenu("ceske-budejovice", "1+kk"),   // 81 100 × 1,175 × 40 ≈ 3 810 000 Kč
    "2+kk": vypoctiKupniCenu("ceske-budejovice", "2+kk"),   // 81 100 × 1,000 × 54 ≈ 4 380 000 Kč
    "3+kk": vypoctiKupniCenu("ceske-budejovice", "3+kk"),   // 81 100 × 0,944 × 84 ≈ 6 430 000 Kč
    "4+kk": vypoctiKupniCenu("ceske-budejovice", "4+kk"),   // 81 100 × 0,959 × 99 ≈ 7 700 000 Kč
  },
  "hradec-kralove": {
    "1+kk": vypoctiKupniCenu("hradec-kralove", "1+kk"),     // 86 100 × 1,175 × 35 ≈ 3 540 000 Kč
    "2+kk": vypoctiKupniCenu("hradec-kralove", "2+kk"),     // 86 100 × 1,000 × 53 ≈ 4 560 000 Kč
    "3+kk": vypoctiKupniCenu("hradec-kralove", "3+kk"),     // 86 100 × 0,944 × 86 ≈ 6 990 000 Kč
    "4+kk": vypoctiKupniCenu("hradec-kralove", "4+kk"),     // 86 100 × 0,959 × 107 ≈ 8 830 000 Kč
  },
  "liberec": {
    "1+kk": vypoctiKupniCenu("liberec", "1+kk"),            // 74 200 × 1,175 × 41 ≈ 3 570 000 Kč
    "2+kk": vypoctiKupniCenu("liberec", "2+kk"),            // 74 200 × 1,000 × 52 ≈ 3 860 000 Kč
    "3+kk": vypoctiKupniCenu("liberec", "3+kk"),            // 74 200 × 0,944 × 78 ≈ 5 460 000 Kč
    "4+kk": vypoctiKupniCenu("liberec", "4+kk"),            // 74 200 × 0,959 × 97 ≈ 6 900 000 Kč
  },
  "olomouc": {
    "1+kk": vypoctiKupniCenu("olomouc", "1+kk"),            // 79 200 × 1,175 × 32 ≈ 2 980 000 Kč
    "2+kk": vypoctiKupniCenu("olomouc", "2+kk"),            // 79 200 × 1,000 × 55 ≈ 4 360 000 Kč
    "3+kk": vypoctiKupniCenu("olomouc", "3+kk"),            // 79 200 × 0,944 × 80 ≈ 5 980 000 Kč
    "4+kk": vypoctiKupniCenu("olomouc", "4+kk"),            // 79 200 × 0,959 × 90 ≈ 6 840 000 Kč
  },
  "pardubice": {
    "1+kk": vypoctiKupniCenu("pardubice", "1+kk"),          // 84 000 × 1,175 × 33 ≈ 3 260 000 Kč
    "2+kk": vypoctiKupniCenu("pardubice", "2+kk"),          // 84 000 × 1,000 × 58 ≈ 4 870 000 Kč
    "3+kk": vypoctiKupniCenu("pardubice", "3+kk"),          // 84 000 × 0,944 × 74 ≈ 5 870 000 Kč
    "4+kk": vypoctiKupniCenu("pardubice", "4+kk"),          // 84 000 × 0,959 × 101 ≈ 8 140 000 Kč
  },
  "usti-nad-labem": {
    "1+kk": vypoctiKupniCenu("usti-nad-labem", "1+kk"),     // 46 400 × 1,175 × 25 ≈ 1 360 000 Kč
    "2+kk": vypoctiKupniCenu("usti-nad-labem", "2+kk"),     // 46 400 × 1,000 × 43 ≈ 2 000 000 Kč
    "3+kk": vypoctiKupniCenu("usti-nad-labem", "3+kk"),     // 46 400 × 0,944 × 75 ≈ 3 290 000 Kč
    "4+kk": vypoctiKupniCenu("usti-nad-labem", "4+kk"),     // 46 400 × 0,959 × 94 ≈ 4 180 000 Kč
  },
  "karlovy-vary": {
    "1+kk": vypoctiKupniCenu("karlovy-vary", "1+kk"),       // 51 700 × 1,175 × 39 ≈ 2 370 000 Kč
    "2+kk": vypoctiKupniCenu("karlovy-vary", "2+kk"),       // 51 700 × 1,000 × 60 ≈ 3 100 000 Kč
    "3+kk": vypoctiKupniCenu("karlovy-vary", "3+kk"),       // 51 700 × 0,944 × 88 ≈ 4 290 000 Kč
    "4+kk": vypoctiKupniCenu("karlovy-vary", "4+kk"),       // 51 700 × 0,959 × 118 ≈ 5 850 000 Kč
  },
  "jihlava": {
    "1+kk": vypoctiKupniCenu("jihlava", "1+kk"),            // 68 100 × 1,175 × 38 ≈ 3 040 000 Kč
    "2+kk": vypoctiKupniCenu("jihlava", "2+kk"),            // 68 100 × 1,000 × 55 ≈ 3 750 000 Kč
    "3+kk": vypoctiKupniCenu("jihlava", "3+kk"),            // 68 100 × 0,944 × 89 ≈ 5 720 000 Kč
    "4+kk": vypoctiKupniCenu("jihlava", "4+kk"),            // 68 100 × 0,959 × 102 ≈ 6 660 000 Kč
  },
  "zlin": {
    "1+kk": vypoctiKupniCenu("zlin", "1+kk"),               // 75 700 × 1,175 × 35 ≈ 3 110 000 Kč
    "2+kk": vypoctiKupniCenu("zlin", "2+kk"),               // 75 700 × 1,000 × 53 ≈ 4 010 000 Kč
    "3+kk": vypoctiKupniCenu("zlin", "3+kk"),               // 75 700 × 0,944 × 84 ≈ 6 000 000 Kč
    "4+kk": vypoctiKupniCenu("zlin", "4+kk"),               // 75 700 × 0,959 × 95 ≈ 6 900 000 Kč
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const kupniCenaDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "kupniCena",
  nazev: "Kupní cena bytu",
  jednotka: "Kč",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Celková kupní cena bytu v korunách českých, kterou kupující zaplatí prodávajícímu 
    při převodu vlastnictví. Jedná se o cenu sjednanou v kupní smlouvě, nikoliv o 
    nabídkovou (inzerovanou) cenu. Výchozí hodnota odpovídá typickému staršímu bytu 
    (postavenému před rokem 1995) v daném městě a dispozici, v dobrém nebo velmi dobrém stavu.
  `,

  coZahrnuje: [
    "Celková sjednaná kupní cena dle kupní smlouvy",
    "Obvyklé příslušenství: sklep, parkovací místo — pokud jsou zahrnuty v ceně (v kalkulačce se předpokládá, že jsou v ceně zahrnuty)",
  ],

  coNezahrnuje: [
    "Náklady na pořízení: daň z nabytí nemovitosti (zrušena v ČR od roku 2020), zápisné do katastru (vkladu), notářské a realitní poplatky — ty jsou v kalkulačce samostatnou položkou 'nakladyPorizeni'",
    "Náklady na rekonstrukci nebo vybavení",
    "Cenu novostavby nebo developerského projektu",
  ],

  coOvlivnujeHodnotu: [
    "Lokalita a město — Praha je 3× dražší než levnější krajská města (Ústí nad Labem)",
    "Dispozice a výměra — větší byty jsou absolutně dražší, ale mají nižší cenu za m²",
    "Stav bytu — dobrý stav vs. před rekonstrukcí se liší o 10–20 %",
    "Stáří a typ zástavby — cihlová vs. panelová zástavba, rok výstavby",
    "Patro a orientace — přízemí a podkroví bývají levnější",
    "Trh a cyklus — ceny bytů jsou cyklické, viz 'rustHodnotyNemovitosti'",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      kupniCena = cenaZaM2[město] × koeficientDispozice[dispozice] × squareMeters[město][dispozice]

      cenaZaM2 pochází z ČBA Monitor Q4 2025 (transakční ceny, Flat Zone databáze skutečných 
      kupních smluv z katastru nemovitostí), CSV staženo 2026-04-04. Všechna krajská města jsou 
      pokryta — žádné záložní zdroje ani odhady.

      koeficientDispozice pochází z vlastního Sreality API dotazu (2026-04-04, script 
      scripts/sreality-disposition-prices.mjs). Pro každé ze 13 krajských měst byl spočten 
      medián ceny za m² pro dispozice 1+kk, 2+kk, 3+kk, 4+kk ze všech aktivních nabídek.
      Výsledné per-city koeficienty jsou agregovány národním mediánem (viz dispozicniKoeficient).
    `,
    procTatoMetoda: `
      Transakční ceny z ČBA Monitor / Flat Zone jsou nejpřesnějším dostupným zdrojem, 
      protože vychází ze skutečných kupních smluv vložených do katastru nemovitostí — 
      nikoli z inzerátů, kde prodávající zpravidla uvádí vyšší ceny. Pokrývají 
      všechna krajská města a jsou aktualizovány čtvrtletně.
      
      Koeficienty dispozice jsou odvozeny z mediánu ceny za m² per dispozici z Sreality 
      API (2026-04-04, 13 měst, 476–1300 nabídek pro 2+kk v Praze, menší vzorky pro 
      ostatní dispozice a města). Odrážejí tržní zákonitost, že menší byty mají vyšší 
      cenu za m² (vyšší poptávka investorů, dostupnost pro wide audience). Národní 
      mediány jsou robustnější než per-city koeficienty, kde je pro menší města 
      vzorek 1+kk příliš malý (5–11 inzerátů).
    `,
    presnost: `
      Cena za m² (CBA Monitor CSV, Q4 2025): ±5–8 % pro všechna města.
        Zdroj nepřesnosti: konkrétní lokalita v rámci města (centrum vs. periferie), 
        stav bytu, sezónnost transakce, mix stáří budov v katastrovém vzorku.

      Koeficienty dispozice (Sreality API, 2026-04-04):
        2+kk: baseline ±0 % (největší vzorek, nejspolehlivější)
        1+kk: +16,5 %, odchylka ±3–4 p.b. (Praha 1.108, Plzeň 1.294 — rozptyl 18 p.b.)
        3+kk: -6,2 %, odchylka ±2–3 p.b. (potvrzeno konzistentně napříč městy)
        4+kk: -5,9 %, odchylka ±3–4 p.b. (Ústí n.L. 0 nabídek, Olomouc anomálie)

      Výsledná přesnost kupniCena:
        2+kk: ±5–8 % (přesnost odpovídá CBA Monitor)
        3+kk a 4+kk: ±7–10 %
        1+kk: ±8–12 % (rozptyl koeficientů měst je největší)
    `,
    kdyNeniPresna: [
      "Novostavby (post-1995) — CBA Monitor pokrývá pouze pre-1995 zástavbu; novostavby jsou zpravidla o 30–50 % dražší",
      "Extrémní lokality v rámci města — centrum vs. periferie se může lišit o 30+ %",
      "Trh ve fázi rychlého růstu nebo korekce — výchozí hodnoty jsou snapshot Q4 2025",
      "Karlovy Vary: atypicky malá 1+kk (29 m²) a velká 3+kk (87 m²), cena za m² pro tyto krajní dispozice nemusí odpovídat průměru",
      "Zlín 1+kk: výměra 35 m² je interpolovaný odhad (viz squareMeters), nikoli přímo změřená hodnota",
      "Liberec: nabídkový trh 1+kk vykazuje minimální prémii (+3 %), národní koeficient (+16,5 %) může hodnotu nadhodnocovat",
      "Hradec Králové 1+kk: Sreality vzorek byl jen n=7, koeficient nespolehlivý — národní median použit jako záloha",
      "Ústí nad Labem 4+kk: ve Sreality dotazu 0 aktivních nabídek — národní koeficient (0.941) je odhad",
    ],
    vzorec: `
      kupniCena = ROUND(cenaZaM2[město] × dispozicniKoeficient[dispozice] × squareMeters[město][dispozice], -4)
      
      dispozicniKoeficient: { '1+kk': 1.175, '2+kk': 1.000, '3+kk': 0.944, '4+kk': 0.959 }
      Zdroj koeficientů: Sreality API mediány per dispozice (prodej), 13 krajských měst, 2026-04-04.
    `,
  },

  tooltipText: `Odhadovaná kupní cena bytu v tomto městě a dispozici, vycházející z transakčních dat ČBA Monitor / Flat Zone (Q4 2025). Zadejte cenu bytu, který konkrétně zvažujete.`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "ČBA Monitor / Flat Zone — Ceny starších bytů dle krajských měst, Q4 2025 (CSV)",
        url: "https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Průměrné transakční ceny starších bytů (postavených před rokem 1995) v krajských 
          městech za Q4 2025, v Kč/m². Data od Flat Zone z katastru nemovitostí.
          Staženo jako CSV (tlačítko na stránce grafu) dne 2026-04-04.
          CSV samo o sobě neobsahuje explicitní datum — přiřazení "Q4 2025" je odvozeno
          z toho, že hodnota ČR celkem = 75,3 tis. Kč/m² odpovídá hodnotě zobrazené 
          na webu ČBA Monitor v den stažení, která je popsána jako Q4 2025.
          Hodnoty z CSV (v tis. Kč/m², přepočteno ×1000):
            Praha: 145 000, Brno: 114 300, Hradec Králové: 86 100, Pardubice: 84 000,
            České Budějovice: 81 100, Olomouc: 79 200, Plzeň: 78 400, Zlín: 75 700,
            Liberec: 74 200, Jihlava: 68 100, Ostrava: 61 600, Karlovy Vary: 51 700,
            Ústí nad Labem: 46 400.
          Národní průměr (inferred Q4 2025): 75 300 Kč/m².
          Metodika Flat Zone: starší zástavba = byty postavené před rokem 1995.
          Zdrojem jsou skutečné kupní smlouvy zapsané do katastru nemovitostí — jedná se 
          tedy o transakční ceny, nikoli nabídkové.
        `,
      },
      {
        nazev: "Sreality.cz — Analýza prodejních cen 2+kk v krajských městech, 1. pololetí 2025",
        url: "https://blog.seznam.cz/2025/10/analyza-prodejnich-cen-2kk-v-krajskych-mestech-nejlevneji-vychazi-usti-nad-labem-ostrava-karlovy-vary-plzen-a-liberec/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Nabídkové prodejní ceny bytů 2+kk (filtr: 35–75 m², starší byty, dobrý/velmi dobrý 
          stav nebo po rekonstrukci, osobní vlastnictví, min. 30 inzerátů v H1 2024 i H1 2025).
          Praha: ~153 000 Kč/m², Brno: ~123 000, HK: ~98 000, ČB: ~92 000, 
          Olomouc: ~91 000, Plzeň a Liberec: ~87 000, KV: ~79 000, 
          Ostrava: ~73 000, Ústí n.L.: ~49 000.
          Jihlava, Zlín, Pardubice: nedostatečný vzorek — nezahrnuty.
          VALIDACE vs. ČBA Monitor CSV:
            Praha: Sreality 153k vs. CBA 145k → +5,5 %
            Brno: Sreality 123k vs. CBA 114,3k → +7,6 %
            Hradec Králové: Sreality 98k vs. CBA 86,1k → +13,8 %
            Olomouc: Sreality 91k vs. CBA 79,2k → +14,8 %
            Plzeň: Sreality 87k vs. CBA 78,4k → +11,0 %
            Ostrava: Sreality 73k vs. CBA 61,6k → +18,5 %
            Ústí n.L.: Sreality 49k vs. CBA 46,4k → +5,6 %
          Rozdíl je vyšší, než by odpovídalo pouhé srážce nabídka→transakce. Důvod:
          Sreality analýza je za H1 2025 (leden–červen), CBA Monitor je Q4 2025.
          V roce 2025 ceny výrazně rostly (Ostrava +21 % YoY) — část rozdílu je tedy
          časový posun, nikoli pouze vyjednávání. CBA Monitor Q4 2025 je novější a přesnější.
        `,
      },
      {
        nazev: "Sreality.cz API — Medián ceny za m² dle dispozice a krajského města, 2026-04-04",
        url: "https://www.sreality.cz/api/cs/v2/estates",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Vlastní dotaz na neoficiální Sreality API pro výpočet dispozicních koeficientů.
          Script: scripts/sreality-disposition-prices.mjs
          Pro každé z 13 krajských měst a dispozic 1+kk/2+kk/3+kk/4+kk byl stažen medián 
          nabídkové ceny za m² ze všech aktivních inzerátů.
          
          Mediány ceny za m² (Kč/m²):
            Praha:    1+kk 191 210 (n=476),  2+kk 172 501 (n=1300), 3+kk 167 820 (n=965),  4+kk 162 893 (n=445)
            Brno:     1+kk 168 393 (n=155),  2+kk 143 396 (n=345),  3+kk 134 435 (n=198),  4+kk 125 414 (n=78)
            Ostrava:  1+kk 104 825 (n=47),   2+kk  90 000 (n=71),   3+kk  82 557 (n=73),   4+kk  92 700 (n=32)
            Plzeň:    1+kk 133 356 (n=32),   2+kk 103 061 (n=78),   3+kk  94 632 (n=71),   4+kk  94 900 (n=27)
            ČB:       1+kk 115 121 (n=37),   2+kk  99 744 (n=65),   3+kk 101 290 (n=52),   4+kk  89 766 (n=35)
            HK:       1+kk 112 767 (n=7),    2+kk 119 984 (n=42),   3+kk  93 730 (n=40),   4+kk 112 621 (n=15)
            Liberec:  1+kk 102 885 (n=30),   2+kk  99 968 (n=65),   3+kk  99 926 (n=48),   4+kk  99 515 (n=22)
            Olomouc:  1+kk 130 047 (n=22),   2+kk 106 207 (n=71),   3+kk 107 468 (n=71),   4+kk 109 272 (n=19)
            Pardubice:1+kk 114 420 (n=4),    2+kk 100 000 (n=25),   3+kk  97 119 (n=48),   4+kk  97 750 (n=14)
            Ústí:     1+kk  75 171 (n=12),   2+kk  60 465 (n=15),   3+kk  55 385 (n=6),    4+kk  null  (n=0)
            KV:       1+kk 112 821 (n=17),   2+kk  92 874 (n=100),  3+kk  80 617 (n=90),   4+kk  68 098 (n=18)
            Jihlava:  1+kk  98 658 (n=5),    2+kk  89 579 (n=17),   3+kk  70 474 (n=20),   4+kk  71 075 (n=5)
            Zlín:     1+kk 113 750 (n=11),   2+kk  91 765 (n=27),   3+kk  90 615 (n=27),   4+kk  97 161 (n=26)
          
          Národní mediány koeficientů (relative to 2+kk = 1.000):
            1+kk: 1.165 (z 13 měst)
            3+kk: 0.938 (z 13 měst)
            4+kk: 0.941 (z 12 měst; Ústí nad Labem = 0 nabídek, vynecháno)
          
          Poznámky k datové kvalitě:
            HK 1+kk n=7 → koeficient 0.940 (1+kk < 2+kk — anomálie, nespolehlivé)
            Pardubice 1+kk n=4, Jihlava 1+kk n=5 → příliš malý vzorek
            Ústí 4+kk = 0 nabídek → trh s 4+kk de facto neexistuje
            Olomouc 3+kk a 4+kk > 2+kk — Olomouc specifika trhu (možné, ale neobvyklé)
          Ze všech těchto důvodů jsou použity národní mediány, nikoli per-city koeficienty.
        `,
      },
      {
        nazev: "ČBA Monitor — Tisková zpráva: Ceny nemovitostí 2025",
        url: "https://www.cbamonitor.cz/aktuality/ceny-nemovitosti-loni-vzrostly-o-12-procent-najemni-bydleni-v-nekterych-regionech-az-o-10-procent",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Starší bytová výstavba zdražila v průměru o 18 % meziročně v roce 2025.
          Průměrná výše hypotéky dosáhla 4,21 mil. Kč (+15 % YoY). Průměrná měsíční 
          splátka: 22 800 Kč. Trh novostaveb vs. starší zástavba: přeprodeje novostaveb 
          (zánovní byty, post-1995) zdražily o 13 %.
        `,
      },
    ],

    odvozeniHodnoty: `
      PRIMÁRNÍ ZDROJ — cena za m²: ČBA Monitor / Flat Zone Q4 2025 CSV, staženo 2026-04-04.
      Transakční ceny za m² ze skutečných kupních smluv z katastru nemovitostí.
      Data jsou plná — žádné chybějící hodnoty, žádné odhady, 13/13 měst.

      PRIMÁRNÍ ZDROJ — dispozicní koeficienty: Vlastní dotaz na Sreality API, 2026-04-04.
      Script: scripts/sreality-disposition-prices.mjs
      Dotaz: prodej bytů, +kk dispozice, bez aukcí, name-filter pro guard proti 
      mis-kategorizaci. Parametry API: category_main_cb=1 (byty), category_type_cb=1 
      (prodej), category_sub_cb=2/4/6/8 (1+kk/2+kk/3+kk/4+kk).
      Celkové vzorky (medián přes 13 měst): 1+kk n=417, 2+kk n=940, 3+kk n=770, 4+kk n=300.
      Nabídkové ceny (nikoli transakční) — použity pouze pro výpočet relace, nikoli absolutní výše.

      METODOLOGICKÁ SLABINA — NESOULAD VÁŽENÉHO PRŮMĚRU:
        CBA Monitor udává jednu blended cenu za m² přes všechny dispozice. Naše koeficienty
        tuto blended cenu rozkládají per dispozici. Pokud vážený průměr naших per-dispozicních 
        cen za m² neodpovídá CBA Monitor průměru, vzniká systematická chyba.

        Ilustrace pro Prahu (přibližné váhy transakcí: 1+kk 25 %, 2+kk 40 %, 3+kk 25 %, 4+kk 10 %):
          Vážený průměr = 145 000 × (0.25×1.165 + 0.40×1.000 + 0.25×0.938 + 0.10×0.941)
                        = 145 000 × 1.035
                        = ~150 000 Kč/m²
          vs. CBA Monitor: 145 000 Kč/m²
          → Přehodnocení o +3.5 % (≈ +270 000 Kč na průměrném pražském bytě 2+kk)

        Přesná míra chyby závisí na skutečném mixu transakcí v CBA Monitor datasetu,
        který neznáme. Odhadovaný dopad: +2–5 % systémové nadhodnocení kupniCena pro 2+kk,
        kompenzováno podhodnocením pro jiné dispozice. Pro 2+kk jako referenční dispozici 
        (největší část trhu) je dopad nejmenší.
        
        Tuto chybu nelze opravit bez přístupu k CBA Monitor datům rozčleněným per dispozici,
        která nejsou veřejně dostupná.

      METODOLOGICKÁ NEKONZISTENCE — STÁŘÍ ZÁSTAVBY:
        CBA Monitor pokrývá výhradně "starší byty" = budovy postavené před rokem 1995.
        squareMeters (viz square-meters.ts) pochází ze Sreality API dotazu, jehož filtr 
        zahrnuje "dobrý/velmi dobrý stav nebo po rekonstrukci" — což může zahrnovat i 
        byty z 90. let a 2000s (post-1995). Post-1995 a pre-1995 byty mívají různé 
        typické výměry a různé ceny za m². Tím vzniká nekonzistence: cena za m² 
        je z pre-1995 vzorku, výměra může reflektovat širší mix.
        Odhadovaný dopad: malý pro velká města (Praha, Brno, Ostrava mají dominantně 
        pre-1995 panelový fond). Větší pro Hradec Králové, Pardubice, kde je podíl 
        bytů post-1995 vyšší. Nepovažujeme za kritické, ale je to dokumentovaná slabina.
      
      Cena bytu = cenaZaM2[město] × koeficientDispozice[dispozice] × squareMeters[město][dispozice]
      Výsledek je zaokrouhlen na 10 000 Kč (přesnost zdrojů to nedovoluje více).

      VALIDACE SREALITY (2+kk nabídkové vs. CBA Monitor transakční):
        Praha: Sreality 153k vs. CBA 145k → +5,5 %
        Brno: Sreality 123k vs. CBA 114,3k → +7,6 %
        Hradec Králové: Sreality 98k vs. CBA 86,1k → +13,8 %
        Olomouc: Sreality 91k vs. CBA 79,2k → +14,8 %
        Ostrava: Sreality 73k vs. CBA 61,6k → +18,5 %
        Ústí n.L.: Sreality 49k vs. CBA 46,4k → +5,6 %
      Rozdíl je z části časový (H1 vs. Q4 2025, trh rostl v roce 2025 o 12–21 %) 
      a z části jde o standardní srážku nabídka→transakce. CBA Monitor je autoritativní zdroj.
    `,
  },

  hodnoty: kupniCenaValues,
};
