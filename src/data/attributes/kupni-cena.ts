/**
 * Atribut: Kupní cena bytu (kupniCena)
 * Výzkum proveden: 2026-04-04 (ČBA Monitor + Sreality disposition scrape)
 * Aktualizace:     2026-04-05 (Sreality starší zástavba price scrape + haircut kalibrace)
 */

import type { AttributeDoc, PerCity, PerCityPerSize } from "./_types";
import { squareMetersValues } from "./square-meters";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Odhadované transakční ceny Kč/m² pro 2+kk starší zástavby (cihlové + panelové domy).
 * Zdroj: Sreality.cz API, duben 2026 (nabídkové ceny) × haircut faktor 0.802.
 * Script: scripts/sreality-older-buildings-price.mjs, spuštěno 2026-04-05.
 *
 * Filtr: category_type_cb=1 (prodej), building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová).
 * Tato populace je shodná s najemne.ts (Sreality starší zástavba, stejný filtr) —
 * cena i nájemné tak popisují stejný typ bytu.
 *
 * Haircut faktor 0.802 (= nabídková cena → odhadovaná transakční cena):
 *   Kalibrován z Praha (0.828), Brno (0.802) a Ústí nad Labem (0.740).
 *   Medián kalibračních měst = 0.802.
 *   Zahrnuje standardní srážku nabídka→transakce (~10–15 %) + časový posun
 *   (ČBA Monitor Q4 2025 vs. Sreality duben 2026, trh rostl ~4–5 % za 6 měsíců).
 *
 * Výjimka — Zlín:
 *   Sreality starší zástavba Zlín 2+kk (n=29) vykazuje anomální koeficienty
 *   (3+kk a 4+kk dražší na m² než 2+kk), což naznačuje nevýběrový vzorek.
 *   Po haircutu by Zlín vyšlo 65 500 Kč/m² — o 13,5 % níže než ČBA Monitor (75 700).
 *   Pro Zlín proto používáme ČBA Monitor Q4 2025 jako spolehlivější zdroj.
 *   ČBA Monitor haircut pro Zlín = 7,3 % (81 660 ask → 75 700 CBA tx) — v normálním rozsahu.
 *
 * Nabídkové ceny Sreality starší zástavba 2+kk (duben 2026, před haircut):
 *   Praha: 175 045 (n=1350), Brno: 142 453 (n=331), Ostrava: 92 470 (n=64),
 *   Plzeň: 102 381 (n=81), ČB: 99 756 (n=64), HK: 119 984 (n=42),
 *   Liberec: 99 929 (n=66), Olomouc: 106 207 (n=73), Pardubice: 100 000 (n=25),
 *   Ústí: 62 720 (n=16), KV: 91 499 (n=104), Jihlava: 89 579 (n=17), Zlín: 81 660 (n=29).
 */
const srealityStarsiZastavba2kk_Apr2026: PerCity<number> = {
  "praha":            140_500, // ask 175 045 × 0.802 (n=1 350)
  "brno":             114_300, // ask 142 453 × 0.802 (n=331) — shoduje se s ČBA Monitor
  "ostrava":           74_200, // ask 92 470 × 0.802 (n=64) — +20 % vs. ČBA Monitor (61 600)
  "plzen":             82_100, // ask 102 381 × 0.802 (n=81)
  "ceske-budejovice":  80_000, // ask 99 756 × 0.802 (n=64)
  "hradec-kralove":    96_300, // ask 119 984 × 0.802 (n=42) — +11,8 % vs. ČBA Monitor (86 100)
  "liberec":           80_200, // ask 99 929 × 0.802 (n=66)
  "olomouc":           85_200, // ask 106 207 × 0.802 (n=73)
  "pardubice":         80_200, // ask 100 000 × 0.802 (n=25)
  "usti-nad-labem":    50_300, // ask 62 720 × 0.802 (n=16) — malý vzorek, viz dokumentace
  "karlovy-vary":      73_400, // ask 91 499 × 0.802 (n=104) — +42 % vs. ČBA Monitor (51 700)
  "jihlava":           71_900, // ask 89 579 × 0.802 (n=17) — malý vzorek
  "zlin":              75_700, // VÝJIMKA: ČBA Monitor Q4 2025 — Sreality vzorek anomální
};

/**
 * ČBA Monitor transakční ceny Q4 2025 — referenční hodnoty pro validaci a Zlín.
 * Zdroj: https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta (CSV, 2026-04-04).
 *
 * POUZE PRO DOKUMENTACI A VALIDACI — aktivně využito pouze pro Zlín (viz výjimka výše).
 */
const _cbaMonitorTransakcniCenaQ4_2025_referenceOnly: PerCity<number> = {
  "praha": 145_000,           // ČBA Monitor CSV Q4 2025 — 145,0 tis. Kč/m²
  "brno": 114_300,            // ČBA Monitor CSV Q4 2025 — 114,3 tis. Kč/m²
  "hradec-kralove": 86_100,   // ČBA Monitor CSV Q4 2025 — 86,1 tis. Kč/m²
  "pardubice": 84_000,        // ČBA Monitor CSV Q4 2025 — 84,0 tis. Kč/m²
  "ceske-budejovice": 81_100, // ČBA Monitor CSV Q4 2025 — 81,1 tis. Kč/m²
  "olomouc": 79_200,          // ČBA Monitor CSV Q4 2025 — 79,2 tis. Kč/m²
  "plzen": 78_400,            // ČBA Monitor CSV Q4 2025 — 78,4 tis. Kč/m²
  "zlin": 75_700,             // ČBA Monitor CSV Q4 2025 — 75,7 tis. Kč/m² (aktivně použito)
  "liberec": 74_200,          // ČBA Monitor CSV Q4 2025 — 74,2 tis. Kč/m²
  "jihlava": 68_100,          // ČBA Monitor CSV Q4 2025 — 68,1 tis. Kč/m²
  "ostrava": 61_600,          // ČBA Monitor CSV Q4 2025 — 61,6 tis. Kč/m²
  "karlovy-vary": 51_700,     // ČBA Monitor CSV Q4 2025 — 51,7 tis. Kč/m²
  "usti-nad-labem": 46_400,   // ČBA Monitor CSV Q4 2025 — 46,4 tis. Kč/m²
};
void _cbaMonitorTransakcniCenaQ4_2025_referenceOnly;

/**
 * Starší nabídkové ceny bytů 2+kk v Kč/m² z analýzy Sreality.cz, 1. pololetí 2025
 * (všechny typy bytů, bez filtru budov). Uchováno pro auditní stopu.
 * POUZE PRO DOKUMENTACI — nahrazeno srealityStarsiZastavba2kk_Apr2026.
 */
const _srealityNabidkovaCena2kk_H1_2025_referenceOnly: Partial<PerCity<number>> = {
  "praha": 153_000, "brno": 123_000, "hradec-kralove": 98_000,
  "ceske-budejovice": 92_000, "olomouc": 91_000, "plzen": 87_000,
  "liberec": 87_000, "karlovy-vary": 79_000, "ostrava": 73_000, "usti-nad-labem": 49_000,
};
void _srealityNabidkovaCena2kk_H1_2025_referenceOnly;

/**
 * Koeficienty přirážky/slevy ceny za m² podle dispozice vůči 2+kk.
 * Menší byty mají vyšší cenu za m² (prémium), větší byty mají slevu.
 *
 * METODIKA: Vlastní dotaz na Sreality API, 2026-04-05, filtr cihlová + panelová zástavba.
 * Script: scripts/sreality-older-buildings-price.mjs
 * Stejná populace bytů jako pro cenaZaM2 → interní konzistence koeficientů.
 *
 * Per-city koeficienty starší zástavba (vůči 2+kk = 1.000):
 *   Praha:   1.096 / 1.000 / 0.951 / 0.928 (n: 479/1350/963/407) — spolehlivé
 *   Brno:    1.170 / 1.000 / 0.946 / 0.874 (n: 147/331/195/78) — spolehlivé
 *   Ostrava: 1.124 / 1.000 / 0.893 / 0.998 (n: 48/64/72/33) — 4+kk anomálie
 *   Plzeň:   1.299 / 1.000 / 0.961 / 0.927 (n: 31/81/65/27) — OK
 *   ČB:      1.169 / 1.000 / 1.017 / 0.958 (n: 37/64/52/38) — 3+kk>2+kk neobvyklé
 *   HK:      0.940 / 1.000 / 0.795 / 0.925 (n: 7/42/45/17) — 1+kk n<15
 *   Liberec: 1.030 / 1.000 / 0.996 / 0.992 (n: 30/66/48/21) — min. prémie 1+kk
 *   Olomouc: 1.224 / 1.000 / 1.018 / 1.033 (n: 23/73/70/20) — 3+kk/4+kk>2+kk
 *   Pardubice:1.024 / 1.000 / 0.971 / 0.909 (n: 3/25/48/14) — 1+kk n<15
 *   Ústí:    1.219 / 1.000 / 0.883 / N/A (n: 9/16/6/0) — velmi malé vzorky
 *   KV:      1.163 / 1.000 / 0.873 / 0.824 (n: 16/104/91/17) — OK
 *   Jihlava: 1.101 / 1.000 / 0.787 / 0.776 (n: 5/17/20/7) — malé vzorky
 *   Zlín:    1.393 / 1.000 / 1.110 / 1.254 (n: 11/29/27/17) — ANOMÁLIE (3+kk, 4+kk > 2+kk)
 *
 * ROZHODNUTÍ — národní mediány místo per-city koeficientů:
 *   Malé vzorky (HK 1+kk n=7, Pardubice n=3, Jihlava n=5) a anomálie (Olomouc, Zlín)
 *   by při per-city koeficientech vnášely systematické chyby. Národní mediány jsou robustnější.
 *
 * Národní mediány koeficientů (starší zástavba, prodej, 2026-04-05):
 *   1+kk: 1.163 (z 13 měst) — vs. 1.175 z all-buildings scrape (méně mikrogarsonek)
 *   3+kk: 0.951 (z 13 měst) — vs. 0.944 z all-buildings scrape
 *   4+kk: 0.927 (z 12 měst, Ústí vynecháno — 0 nabídek 4+kk) — vs. 0.959
 */
const dispozicniKoeficient: Record<"1+kk" | "2+kk" | "3+kk" | "4+kk", number> = {
  "1+kk": 1.163, // +16,3 % vs. 2+kk — národní medián, Sreality starší zástavba 2026-04-05
  "2+kk": 1.000, // baseline
  "3+kk": 0.951, //  -4,9 % vs. 2+kk — národní medián, Sreality starší zástavba 2026-04-05
  "4+kk": 0.927, //  -7,3 % vs. 2+kk — národní medián, Sreality starší zástavba 2026-04-05
};

/**
 * Výpočet kupní ceny bytu v Kč.
 * kupniCena = cenaZaM2[město] × koeficientDispozice[dispozice] × squareMeters[město][dispozice]
 *
 * Zdroj cenaZaM2: Sreality starší zástavba (cihlová + panelová) × haircut 0.802, duben 2026.
 * Výjimka Zlín: ČBA Monitor Q4 2025 (Sreality vzorek anomální).
 * Zaokrouhlení na 10 000 Kč — přesnost vstupních dat to nedovoluje více.
 */
function vypoctiKupniCenu(
  mesto: string,
  dispozice: "1+kk" | "2+kk" | "3+kk" | "4+kk"
): number {
  const cenaM2 = srealityStarsiZastavba2kk_Apr2026[mesto as keyof typeof srealityStarsiZastavba2kk_Apr2026];
  const m2 = squareMetersValues[mesto as keyof typeof squareMetersValues]?.[dispozice];
  if (!m2) throw new Error(`squareMeters chybí pro ${mesto} ${dispozice}`);
  return Math.round(cenaM2 * dispozicniKoeficient[dispozice] * m2 / 10_000) * 10_000;
}

export const kupniCenaValues: PerCityPerSize<number> = {
  "praha": {
    "1+kk": vypoctiKupniCenu("praha", "1+kk"),              // 140 500 × 1,163 × 33 ≈ 5 390 000 Kč
    "2+kk": vypoctiKupniCenu("praha", "2+kk"),              // 140 500 × 1,000 × 52 ≈ 7 310 000 Kč
    "3+kk": vypoctiKupniCenu("praha", "3+kk"),              // 140 500 × 0,951 × 80 ≈ 10 690 000 Kč
    "4+kk": vypoctiKupniCenu("praha", "4+kk"),              // 140 500 × 0,927 × 110 ≈ 14 330 000 Kč
  },
  "brno": {
    "1+kk": vypoctiKupniCenu("brno", "1+kk"),               // 114 300 × 1,163 × 32 ≈ 4 250 000 Kč
    "2+kk": vypoctiKupniCenu("brno", "2+kk"),               // 114 300 × 1,000 × 53 ≈ 6 060 000 Kč
    "3+kk": vypoctiKupniCenu("brno", "3+kk"),               // 114 300 × 0,951 × 78 ≈ 8 480 000 Kč
    "4+kk": vypoctiKupniCenu("brno", "4+kk"),               // 114 300 × 0,927 × 113 ≈ 11 980 000 Kč
  },
  "ostrava": {
    "1+kk": vypoctiKupniCenu("ostrava", "1+kk"),            // 74 200 × 1,163 × 31 ≈ 2 670 000 Kč
    "2+kk": vypoctiKupniCenu("ostrava", "2+kk"),            // 74 200 × 1,000 × 54 ≈ 4 010 000 Kč
    "3+kk": vypoctiKupniCenu("ostrava", "3+kk"),            // 74 200 × 0,951 × 78 ≈ 5 500 000 Kč
    "4+kk": vypoctiKupniCenu("ostrava", "4+kk"),            // 74 200 × 0,927 × 105 ≈ 7 220 000 Kč
  },
  "plzen": {
    "1+kk": vypoctiKupniCenu("plzen", "1+kk"),              // 82 100 × 1,163 × 34 ≈ 3 240 000 Kč
    "2+kk": vypoctiKupniCenu("plzen", "2+kk"),              // 82 100 × 1,000 × 55 ≈ 4 520 000 Kč
    "3+kk": vypoctiKupniCenu("plzen", "3+kk"),              // 82 100 × 0,951 × 82 ≈ 6 400 000 Kč
    "4+kk": vypoctiKupniCenu("plzen", "4+kk"),              // 82 100 × 0,927 × 104 ≈ 7 910 000 Kč
  },
  "ceske-budejovice": {
    "1+kk": vypoctiKupniCenu("ceske-budejovice", "1+kk"),   // 80 000 × 1,163 × 40 ≈ 3 720 000 Kč
    "2+kk": vypoctiKupniCenu("ceske-budejovice", "2+kk"),   // 80 000 × 1,000 × 54 ≈ 4 320 000 Kč
    "3+kk": vypoctiKupniCenu("ceske-budejovice", "3+kk"),   // 80 000 × 0,951 × 84 ≈ 6 390 000 Kč
    "4+kk": vypoctiKupniCenu("ceske-budejovice", "4+kk"),   // 80 000 × 0,927 × 99 ≈ 7 340 000 Kč
  },
  "hradec-kralove": {
    "1+kk": vypoctiKupniCenu("hradec-kralove", "1+kk"),     // 96 300 × 1,163 × 35 ≈ 3 920 000 Kč
    "2+kk": vypoctiKupniCenu("hradec-kralove", "2+kk"),     // 96 300 × 1,000 × 53 ≈ 5 100 000 Kč
    "3+kk": vypoctiKupniCenu("hradec-kralove", "3+kk"),     // 96 300 × 0,951 × 86 ≈ 7 870 000 Kč
    "4+kk": vypoctiKupniCenu("hradec-kralove", "4+kk"),     // 96 300 × 0,927 × 107 ≈ 9 550 000 Kč
  },
  "liberec": {
    "1+kk": vypoctiKupniCenu("liberec", "1+kk"),            // 80 200 × 1,163 × 41 ≈ 3 830 000 Kč
    "2+kk": vypoctiKupniCenu("liberec", "2+kk"),            // 80 200 × 1,000 × 52 ≈ 4 170 000 Kč
    "3+kk": vypoctiKupniCenu("liberec", "3+kk"),            // 80 200 × 0,951 × 78 ≈ 5 950 000 Kč
    "4+kk": vypoctiKupniCenu("liberec", "4+kk"),            // 80 200 × 0,927 × 97 ≈ 7 210 000 Kč
  },
  "olomouc": {
    "1+kk": vypoctiKupniCenu("olomouc", "1+kk"),            // 85 200 × 1,163 × 32 ≈ 3 170 000 Kč
    "2+kk": vypoctiKupniCenu("olomouc", "2+kk"),            // 85 200 × 1,000 × 55 ≈ 4 690 000 Kč
    "3+kk": vypoctiKupniCenu("olomouc", "3+kk"),            // 85 200 × 0,951 × 80 ≈ 6 480 000 Kč
    "4+kk": vypoctiKupniCenu("olomouc", "4+kk"),            // 85 200 × 0,927 × 90 ≈ 7 100 000 Kč
  },
  "pardubice": {
    "1+kk": vypoctiKupniCenu("pardubice", "1+kk"),          // 80 200 × 1,163 × 33 ≈ 3 080 000 Kč
    "2+kk": vypoctiKupniCenu("pardubice", "2+kk"),          // 80 200 × 1,000 × 58 ≈ 4 650 000 Kč
    "3+kk": vypoctiKupniCenu("pardubice", "3+kk"),          // 80 200 × 0,951 × 74 ≈ 5 650 000 Kč
    "4+kk": vypoctiKupniCenu("pardubice", "4+kk"),          // 80 200 × 0,927 × 101 ≈ 7 510 000 Kč
  },
  "usti-nad-labem": {
    "1+kk": vypoctiKupniCenu("usti-nad-labem", "1+kk"),     // 50 300 × 1,163 × 25 ≈ 1 460 000 Kč
    "2+kk": vypoctiKupniCenu("usti-nad-labem", "2+kk"),     // 50 300 × 1,000 × 43 ≈ 2 160 000 Kč
    "3+kk": vypoctiKupniCenu("usti-nad-labem", "3+kk"),     // 50 300 × 0,951 × 75 ≈ 3 590 000 Kč
    "4+kk": vypoctiKupniCenu("usti-nad-labem", "4+kk"),     // 50 300 × 0,927 × 94 ≈ 4 380 000 Kč
  },
  "karlovy-vary": {
    "1+kk": vypoctiKupniCenu("karlovy-vary", "1+kk"),       // 73 400 × 1,163 × 39 ≈ 3 330 000 Kč
    "2+kk": vypoctiKupniCenu("karlovy-vary", "2+kk"),       // 73 400 × 1,000 × 60 ≈ 4 400 000 Kč
    "3+kk": vypoctiKupniCenu("karlovy-vary", "3+kk"),       // 73 400 × 0,951 × 88 ≈ 6 140 000 Kč
    "4+kk": vypoctiKupniCenu("karlovy-vary", "4+kk"),       // 73 400 × 0,927 × 118 ≈ 8 030 000 Kč
  },
  "jihlava": {
    "1+kk": vypoctiKupniCenu("jihlava", "1+kk"),            // 71 900 × 1,163 × 38 ≈ 3 180 000 Kč
    "2+kk": vypoctiKupniCenu("jihlava", "2+kk"),            // 71 900 × 1,000 × 55 ≈ 3 950 000 Kč
    "3+kk": vypoctiKupniCenu("jihlava", "3+kk"),            // 71 900 × 0,951 × 89 ≈ 6 090 000 Kč
    "4+kk": vypoctiKupniCenu("jihlava", "4+kk"),            // 71 900 × 0,927 × 102 ≈ 6 800 000 Kč
  },
  "zlin": {
    "1+kk": vypoctiKupniCenu("zlin", "1+kk"),               // 75 700 × 1,163 × 35 ≈ 3 080 000 Kč (ČBA Monitor)
    "2+kk": vypoctiKupniCenu("zlin", "2+kk"),               // 75 700 × 1,000 × 53 ≈ 4 010 000 Kč (ČBA Monitor)
    "3+kk": vypoctiKupniCenu("zlin", "3+kk"),               // 75 700 × 0,951 × 84 ≈ 6 050 000 Kč (ČBA Monitor)
    "4+kk": vypoctiKupniCenu("zlin", "4+kk"),               // 75 700 × 0,927 × 95 ≈ 6 670 000 Kč (ČBA Monitor)
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

      cenaZaM2 pochází z nabídkových cen Sreality.cz pro cihlové a panelové domy
      (starší zástavba), upravených haircut faktorem 0.802 (konverze nabídková → odhadovaná
      transakční cena). Data stažena 2026-04-05, script: scripts/sreality-older-buildings-price.mjs.
      Výjimka: Zlín — ČBA Monitor Q4 2025, neboť Sreality vzorek pro Zlín je anomální.

      koeficientDispozice pochází ze stejného Sreality dotazu filtrovaného na starší zástavbu
      (cihlová + panelová), 2026-04-05, script: scripts/sreality-older-buildings-price.mjs.
      Tím je zaručena interní konzistence: cena i koeficienty vycházejí ze stejné populace.

      Haircut faktor 0.802 byl kalibrován porovnáním Praha (0.828), Brno (0.802) a Ústí (0.740)
      vs. ČBA Monitor Q4 2025 — ta tři města jsou jedinou dostupnou ground truth pro transakční
      ceny ve stejném tržním segmentu. Medián kalibrace = 0.802.
    `,
    procTatoMetoda: `
      Klíčová motivace pro přechod z ČBA Monitor na Sreality starší zástavba:
      
      ČBA Monitor zaznamenává pouze hypotečně financované transakce pre-1995 zástavby.
      V některých městech (Ostrava, Karlovy Vary, Liberec) pokrývá ČBA Monitor zjevně
      pouze nejlevnější segment trhu — nabídkové ceny Sreality jsou o 15–43 % výše,
      přičemž část tohoto rozdílu nelze vysvětlit standardní srážkou nabídka→transakce.
      Výsledkem bylo systematické podhodnocení kupniCena a nadhodnocení výnosového procenta.

      Sreality starší zástavba (cihlová + panelová) je konzistentní s populací bytů
      v najemne.ts (stejný filtr). Kupní cena i nájemné tak popisují tentýž typ bytu.

      Přesnost výsledků (post-haircut):
        Praha: -3,1 % vs. ČBA Monitor (marginální)
        Brno: 0,0 % vs. ČBA Monitor (perfektní shoda — kalibrační bod)
        Ostrava: +20,5 % vs. ČBA Monitor (korekce prokázaného podhodnocení)
        KV: +42 % vs. ČBA Monitor (korekce extrémního podhodnocení — n=104 potvrzuje)
        HK: +11,8 % vs. ČBA Monitor (vyšší tržní ceny HK nebyly v CBA zachyceny)
    `,
    presnost: `
      Cena za m² (Sreality starší zástavba × haircut 0.802):
        Velká města (Praha n=1350, Brno n=331): ±5–8 % — vysoká spolehlivost vzorku.
        Střední města (Ostrava n=64, KV n=104, Olomouc n=73): ±8–12 %.
        Malá města (Ústí n=16, Jihlava n=17): ±12–18 % — malý vzorek.
        Haircut faktor 0.802 je mediánem 3 kalibračních měst. Skutečný haircut per město
        se liší — může být konzervativnější v likvidnějších trzích (Praha) nebo širší
        v méně likvidních (Ústí, Jihlava). Odhadovaná neurčitost haircutu: ±3–5 p.b.

      Koeficienty dispozice (Sreality starší zástavba, 2026-04-05):
        1+kk: 1.163, odchylka ±3–4 p.b. (rozptyl: Praha 1.096, Plzeň 1.299)
        3+kk: 0.951, odchylka ±2–3 p.b. (konzistentní napříč městy)
        4+kk: 0.927, odchylka ±3–4 p.b. (Ústí vynecháno — 0 nabídek)

      Výsledná přesnost kupniCena:
        2+kk (velká města): ±8–12 %
        2+kk (malá města): ±12–18 %
        1+kk a 4+kk: o 3–5 p.b. horší než 2+kk
    `,
    kdyNeniPresna: [
      "Novostavby (post-1995) — filtr starší zástavba je aplikován, ale okrajové případy post-1995 cihlových domů mohou projít",
      "Extrémní lokality — centrum vs. periferie se liší o 20–40 % uvnitř jednoho města",
      "Ústí nad Labem — 2+kk n=16 je nedostatečný vzorek; výsledek (50 300 Kč/m²) může mít odchylku ±15 %",
      "Jihlava — 2+kk n=17, podobná výhrada jako Ústí",
      "Zlín — použit ČBA Monitor (n/a Sreality), koeficienty Sreality pro Zlín anomální (3+kk > 2+kk na m²)",
      "Liberec — nabídkový trh 1+kk vykazuje minimální prémii (+3 %), národní koeficient (+16,3 %) může 1+kk mírně nadhodnotit",
      "Hradec Králové 1+kk: Sreality vzorek n=7, koeficient nespolehlivý — národní medián použit jako záloha",
      "Haircut faktor 0.802 zahrnuje i časový posun (ČBA Monitor Q4 2025 vs. Sreality duben 2026). V případě stagnace nebo poklesu cen by byl haircut nadhodnocen",
    ],
    vzorec: `
      kupniCena = ROUND(cenaZaM2[město] × dispozicniKoeficient[dispozice] × squareMeters[město][dispozice], -4)
      
      cenaZaM2 = srealityNabidkovaCena2kk × 0.802  (haircut faktor)
      dispozicniKoeficient: { '1+kk': 1.163, '2+kk': 1.000, '3+kk': 0.951, '4+kk': 0.927 }
      Zdroj dat: Sreality starší zástavba (cihlová + panelová), 2026-04-05.
      Výjimka Zlín: cenaZaM2 = ČBA Monitor Q4 2025 = 75 700 Kč/m².
    `,
  },

  tooltipText: `Odhadovaná kupní cena bytu ve starší zástavbě (cihlové nebo panelové) v tomto městě a dispozici, vycházející ze Sreality.cz (duben 2026, starší zástavba). Zadejte cenu bytu, který konkrétně zvažujete.`,

  vyzkum: {
    datumVyzkumu: "2026-04-05",

    zdroje: [
      {
        nazev: "Sreality.cz API — Prodejní ceny starší zástavby (cihlová + panelová), duben 2026",
        url: "https://www.sreality.cz/api/cs/v2/estates",
        datumPristupeno: "2026-04-05",
        coUvadi: `
          Vlastní dotaz na neoficiální Sreality API filtrovaný na cihlové (building_type_cb=1)
          a panelové (building_type_cb=2) domy — stejný filtr jako v najemne.ts.
          Script: scripts/sreality-older-buildings-price.mjs, spuštěno 2026-04-05.
          
          Nabídkové mediány ceny za m² (před haircut), 2+kk, starší zástavba:
            Praha:    175 045 (n=1 350) | Brno:     142 453 (n=331)
            Ostrava:   92 470 (n=64)    | Plzeň:    102 381 (n=81)
            ČB:        99 756 (n=64)    | HK:       119 984 (n=42)
            Liberec:   99 929 (n=66)    | Olomouc:  106 207 (n=73)
            Pardubice: 100 000 (n=25)   | Ústí:      62 720 (n=16)
            KV:        91 499 (n=104)   | Jihlava:   89 579 (n=17)
            Zlín:      81 660 (n=29) — ANOMÁLIE: Sreality nevyužito, viz výjimka.

          Dispozicní koeficienty ze starší zástavby (národní mediány):
            1+kk: 1.163, 3+kk: 0.951, 4+kk: 0.927 (12 měst, Ústí bez 4+kk).

          Haircut kalibrace (nabídková → transakční cena):
            Praha: 145 000 (ČBA) / 175 045 (Sreality ask) = 0.828 ← kalibrační bod
            Brno:  114 300 (ČBA) / 142 453 (Sreality ask) = 0.802 ← kalibrační bod
            Ústí:   46 400 (ČBA) /  62 720 (Sreality ask) = 0.740 ← kalibrační bod
            Medián kalibrace = 0.802.
          Haircut zahrnuje: standardní srážku nabídka→transakce (~10–15 %) +
          časový posun Q4 2025 → duben 2026 (~4–5 % tržního růstu).
        `,
      },
      {
        nazev: "ČBA Monitor / Flat Zone — Ceny starších bytů dle krajských měst, Q4 2025 (CSV)",
        url: "https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Průměrné transakční ceny starších bytů (postavených před rokem 1995) v krajských 
          městech za Q4 2025, v Kč/m². Staženo jako CSV 2026-04-04.
          Hodnoty: Praha 145 000, Brno 114 300, HK 86 100, Pardubice 84 000,
          ČB 81 100, Olomouc 79 200, Plzeň 78 400, Zlín 75 700, Liberec 74 200,
          Jihlava 68 100, Ostrava 61 600, KV 51 700, Ústí 46 400 (vše Kč/m²).
          Aktivně využito pouze pro: (a) kalibraci haircut faktoru (Praha, Brno, Ústí),
          (b) hodnotu Zlín (Sreality vzorek pro Zlín nevěrohodný).
          
          Dřívější problém: ČBA Monitor pro Ostrava (+21 %), KV (+42 %), Liberec (+17 %)
          zachycuje pouze nejlevnější segment trhu. Nabídkové ceny Sreality jsou výrazně
          výše, přičemž tento rozdíl nelze plně vysvětlit srážkou nabídka→transakce.
          Z tohoto důvodu je ČBA Monitor pro tyto města nahrazen Sreality (s haircut).
        `,
      },
      {
        nazev: "ČBA Monitor — Tisková zpráva: Ceny nemovitostí 2025",
        url: "https://www.cbamonitor.cz/aktuality/ceny-nemovitosti-loni-vzrostly-o-12-procent-najemni-bydleni-v-nekterych-regionech-az-o-10-procent",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Starší bytová výstavba zdražila v průměru o 18 % meziročně v roce 2025.
          Průměrná výše hypotéky dosáhla 4,21 mil. Kč (+15 % YoY). Průměrná měsíční 
          splátka: 22 800 Kč. Přeprodeje novostaveb (zánovní byty, post-1995) zdražily o 13 %.
        `,
      },
    ],

    odvozeniHodnoty: `
      PRIMÁRNÍ ZDROJ — cena za m² (12/13 měst): Sreality.cz API, starší zástavba 
      (cihlová + panelová), nabídkové ceny, duben 2026. Script: sreality-older-buildings-price.mjs.
      Haircut faktor 0.802 kalibrován z Praha/Brno/Ústí vs. ČBA Monitor Q4 2025.

      VÝJIMKA — Zlín (1/13 měst): ČBA Monitor Q4 2025 = 75 700 Kč/m².
      Důvod: Sreality vzorek Zlín (n=29) vykazuje anomální koeficienty (3+kk a 4+kk dražší
      na m² než 2+kk), po haircutu by cena byla 65 500 — o 13,5 % níže než ČBA Monitor.
      Pro Zlín je ČBA Monitor (haircut 7,3 %) pravděpodobnější odhad skutečné tržní ceny.

      KONZISTENCE S NAJEMNE.TS:
      Stejný filtr (cihlová + panelová) = stejná populace bytů pro cenu i nájemné.
      Výnosové procento je proto interně konzistentní a nepromíchává různé typy zástavby.

      SROVNÁNÍ NOVÉ A STARÉ METODIKY (2+kk, vybrané změny):
        Ostrava: 3 330 000 → 4 010 000 Kč (+20,5 %) — korekce podhodnocení ČBA Monitor
        KV:      3 100 000 → 4 400 000 Kč (+42 %) — korekce extrémního podhodnocení
        HK:      4 560 000 → 5 100 000 Kč (+11,8 %) — korekce podhodnocení
        Praha:   7 540 000 → 7 310 000 Kč (-3,1 %) — marginální změna (ČBA Monitor spolehlivý)
        Brno:    6 060 000 → 6 060 000 Kč (0 %) — beze změny (kalibrační bod)
    `,
  },

  hodnoty: kupniCenaValues,
};
