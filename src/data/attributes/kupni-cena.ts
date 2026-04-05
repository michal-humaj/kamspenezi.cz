/**
 * Atribut: Kupní cena bytu (kupniCena)
 * Výzkum proveden: 2026-04-04 (ČBA Monitor + Sreality disposition scrape)
 * Aktualizace:     2026-04-05 (Sreality starší zástavba price scrape + per-city haircut kalibrace)
 */

import type { AttributeDoc, PerCity, PerCityPerSize } from "./_types";
import { squareMetersValues } from "./square-meters";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Nabídkové ceny Kč/m² pro 2+kk starší zástavby (cihlová + panelová) — PŘED haircut.
 * Zdroj: Sreality.cz API, duben 2026. Script: scripts/sreality-older-buildings-price.mjs.
 * Filtr: category_type_cb=1 (prodej), building_type_cb[]=1 + building_type_cb[]=2.
 *
 * POUZE NABÍDKOVÉ CENY — transakční ceny viz srealityStarsiZastavba2kk_Apr2026 níže.
 */
const _srealityNabidkovaCena2kk_Asking_Apr2026: PerCity<number> = {
  "praha":            175_045, // n=1 350 — velmi spolehlivý vzorek
  "brno":             142_453, // n=331 — spolehlivý vzorek
  "ostrava":           92_470, // n=64 — ČBA Monitor biased (61 600 → 34 % pod asking)
  "plzen":            102_381, // n=81 — spolehlivý
  "ceske-budejovice":  99_756, // n=64 — spolehlivý
  "hradec-kralove":   119_984, // n=42 — suspektně vysoké vs. srovnatelná města → fallback haircut
  "liberec":           99_929, // n=66 — spolehlivý
  "olomouc":          106_207, // n=73 — spolehlivý
  "pardubice":        100_000, // n=25 — marginálně spolehlivý
  "usti-nad-labem":    62_720, // n=16 — malý vzorek
  "karlovy-vary":      91_499, // n=104 — ČBA Monitor biased (51 700 → 44 % pod asking)
  "jihlava":           89_579, // n=17 — malý vzorek
  "zlin":              81_660, // n=29 — ANOMÁLIE: koeficienty 3+kk, 4+kk > 2+kk → ČBA Monitor použit
};
void _srealityNabidkovaCena2kk_Asking_Apr2026;

/**
 * Per-city haircut faktory (nabídková cena → odhadovaná transakční cena).
 *
 * METODIKA ODVOZENÍ:
 *   haircut[město] = (ČBA Monitor Q4 2025 × 1.05) / Sreality asking duben 2026
 *
 *   Faktor 1.05 = tržní zhodnocení ~5 % za 4–5 měsíců (Q4 2025 → duben 2026).
 *   Zdroj: ČBA Monitor tiskový report 2025 (starší zástavba +18 % YoY za rok 2025,
 *   předpokládáme ~12–14 % anualizovaný růst pro 2026 → ~5 % za 4,5 měsíce).
 *
 *   Výsledný haircut zahrnuje pouze čistou srážku nabídka→transakce (10–25 %),
 *   nikoli časový posun (ten je eliminován faktorem 1.05).
 *
 * ODVOZENÉ PER-CITY HODNOTY:
 *   Praha:    145 000 × 1.05 / 175 045 = 0.870 ← čistá srážka ~13 %, likvid. trh
 *   Brno:     114 300 × 1.05 / 142 453 = 0.843 ← čistá srážka ~16 %
 *   Plzeň:     78 400 × 1.05 / 102 381 = 0.804 ← čistá srážka ~20 %
 *   ČB:        81 100 × 1.05 /  99 756 = 0.854 ← čistá srážka ~15 %
 *   Liberec:   74 200 × 1.05 /  99 929 = 0.780 ← čistá srážka ~22 %
 *   Olomouc:   79 200 × 1.05 / 106 207 = 0.783 ← čistá srážka ~22 %
 *   Pardubice: 84 000 × 1.05 / 100 000 = 0.882 ← čistá srážka ~12 %
 *   Ústí:      46 400 × 1.05 /  62 720 = 0.777 ← čistá srážka ~22 %
 *   Jihlava:   68 100 × 1.05 /  89 579 = 0.798 ← čistá srážka ~20 %
 *
 * FALLBACK — použit pro 3 problematická města (hodnota = medián spolehlivých měst):
 *   Medián {0.870, 0.843, 0.804, 0.854, 0.780, 0.783, 0.882, 0.777, 0.798} = 0.804
 *
 *   Ostrava [FALLBACK 0.804]: ČBA Monitor 61 600 je prokazatelně biased (zaznamenává
 *     pouze nejlevnější panelové bloky). Odvozený haircut 0.700 není realitní srážka —
 *     je to artefakt selekčního zkreslení ČBA Monitoru.
 *
 *   Karlovy Vary [FALLBACK 0.804]: Totéž — ČBA Monitor KV 51 700 je extrémně nízký
 *     (odvozený haircut 0.594 = 41% srážka, fyzicky nemožná pro aktivní trh).
 *
 *   Hradec Králové [FALLBACK 0.804]: Sreality asking 119 984 je suspektně vysoké
 *     vs. srovnatelná města (Olomouc 106 207, Liberec 99 929). Odvozený haircut
 *     0.754 je pod rozsahem spolehlivých měst (0.777–0.882). Fallback je konzervativnější.
 */
const perCityHaircutFaktor: PerCity<number> = {
  "praha":            0.870, // odvozeno: 145 000 × 1.05 / 175 045
  "brno":             0.843, // odvozeno: 114 300 × 1.05 / 142 453
  "ostrava":          0.804, // FALLBACK medián — ČBA Monitor biased
  "plzen":            0.804, // odvozeno: 78 400 × 1.05 / 102 381
  "ceske-budejovice": 0.854, // odvozeno: 81 100 × 1.05 / 99 756
  "hradec-kralove":   0.804, // FALLBACK medián — Sreality asking suspektně vysoké
  "liberec":          0.780, // odvozeno: 74 200 × 1.05 / 99 929
  "olomouc":          0.783, // odvozeno: 79 200 × 1.05 / 106 207
  "pardubice":        0.882, // odvozeno: 84 000 × 1.05 / 100 000
  "usti-nad-labem":   0.777, // odvozeno: 46 400 × 1.05 / 62 720
  "karlovy-vary":     0.804, // FALLBACK medián — ČBA Monitor biased
  "jihlava":          0.798, // odvozeno: 68 100 × 1.05 / 89 579
  "zlin":             1.000, // VÝJIMKA: Zlín používá ČBA Monitor přímo (cena níže)
};

/**
 * Odhadované transakční ceny Kč/m² pro 2+kk starší zástavby (cihlová + panelová).
 * = Sreality nabídková cena × per-city haircut faktor (viz výše).
 * Výjimka Zlín: ČBA Monitor Q4 2025 přímo (Sreality vzorek anomální).
 *
 * SROVNÁNÍ S PŘEDCHOZÍ METODIKOU (flat haircut 0.802):
 *   Praha:     140 500 → 152 300  (+8,4 %) — přesnější haircut pro likvidní trh
 *   Brno:      114 300 → 120 100  (+5,1 %)
 *   Pardubice:  80 200 →  88 200 (+10,0 %) — Pardubice nízká srážka (dynamický trh)
 *   ČB:         80 000 →  85 200  (+6,5 %)
 *   Liberec:    80 200 →  77 900  (-2,9 %) — vyšší srážka v méně likvidním trhu
 *   Olomouc:    85 200 →  83 200  (-2,3 %)
 *   Ústí:       50 300 →  48 700  (-3,2 %)
 *   Ostrava, KV, HK, Plzeň, Jihlava, Zlín: beze změny nebo marginální (<1 %)
 */
const srealityStarsiZastavba2kk_Apr2026: PerCity<number> = {
  "praha":            152_300, // 175 045 × 0.870 (n=1 350)
  "brno":             120_100, // 142 453 × 0.843 (n=331)
  "ostrava":           74_300, // 92 470 × 0.804 fallback (n=64) — +20,6 % vs. ČBA Monitor
  "plzen":             82_300, // 102 381 × 0.804 (n=81)
  "ceske-budejovice":  85_200, // 99 756 × 0.854 (n=64)
  "hradec-kralove":    96_500, // 119 984 × 0.804 fallback (n=42)
  "liberec":           77_900, // 99 929 × 0.780 (n=66)
  "olomouc":           83_200, // 106 207 × 0.783 (n=73)
  "pardubice":         88_200, // 100 000 × 0.882 (n=25)
  "usti-nad-labem":    48_700, // 62 720 × 0.777 (n=16) — malý vzorek
  "karlovy-vary":      73_600, // 91 499 × 0.804 fallback (n=104) — +42 % vs. ČBA Monitor
  "jihlava":           71_500, // 89 579 × 0.798 (n=17) — malý vzorek
  "zlin":              75_700, // VÝJIMKA: ČBA Monitor Q4 2025 (Sreality vzorek anomální)
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
 * Zdroj cenaZaM2: Sreality nabídková cena (starší zástavba) × per-city haircut faktor, duben 2026.
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
    "1+kk": vypoctiKupniCenu("praha", "1+kk"),              // 152 300 × 1,163 × 33 ≈ 5 840 000 Kč
    "2+kk": vypoctiKupniCenu("praha", "2+kk"),              // 152 300 × 1,000 × 52 ≈ 7 920 000 Kč
    "3+kk": vypoctiKupniCenu("praha", "3+kk"),              // 152 300 × 0,951 × 80 ≈ 11 590 000 Kč
    "4+kk": vypoctiKupniCenu("praha", "4+kk"),              // 152 300 × 0,927 × 110 ≈ 15 530 000 Kč
  },
  "brno": {
    "1+kk": vypoctiKupniCenu("brno", "1+kk"),               // 120 100 × 1,163 × 32 ≈ 4 470 000 Kč
    "2+kk": vypoctiKupniCenu("brno", "2+kk"),               // 120 100 × 1,000 × 53 ≈ 6 370 000 Kč
    "3+kk": vypoctiKupniCenu("brno", "3+kk"),               // 120 100 × 0,951 × 78 ≈ 8 910 000 Kč
    "4+kk": vypoctiKupniCenu("brno", "4+kk"),               // 120 100 × 0,927 × 113 ≈ 12 580 000 Kč
  },
  "ostrava": {
    "1+kk": vypoctiKupniCenu("ostrava", "1+kk"),            // 74 300 × 1,163 × 31 ≈ 2 680 000 Kč
    "2+kk": vypoctiKupniCenu("ostrava", "2+kk"),            // 74 300 × 1,000 × 54 ≈ 4 010 000 Kč
    "3+kk": vypoctiKupniCenu("ostrava", "3+kk"),            // 74 300 × 0,951 × 78 ≈ 5 510 000 Kč
    "4+kk": vypoctiKupniCenu("ostrava", "4+kk"),            // 74 300 × 0,927 × 105 ≈ 7 230 000 Kč
  },
  "plzen": {
    "1+kk": vypoctiKupniCenu("plzen", "1+kk"),              // 82 300 × 1,163 × 34 ≈ 3 250 000 Kč
    "2+kk": vypoctiKupniCenu("plzen", "2+kk"),              // 82 300 × 1,000 × 55 ≈ 4 530 000 Kč
    "3+kk": vypoctiKupniCenu("plzen", "3+kk"),              // 82 300 × 0,951 × 82 ≈ 6 420 000 Kč
    "4+kk": vypoctiKupniCenu("plzen", "4+kk"),              // 82 300 × 0,927 × 104 ≈ 7 930 000 Kč
  },
  "ceske-budejovice": {
    "1+kk": vypoctiKupniCenu("ceske-budejovice", "1+kk"),   // 85 200 × 1,163 × 40 ≈ 3 960 000 Kč
    "2+kk": vypoctiKupniCenu("ceske-budejovice", "2+kk"),   // 85 200 × 1,000 × 54 ≈ 4 600 000 Kč
    "3+kk": vypoctiKupniCenu("ceske-budejovice", "3+kk"),   // 85 200 × 0,951 × 84 ≈ 6 810 000 Kč
    "4+kk": vypoctiKupniCenu("ceske-budejovice", "4+kk"),   // 85 200 × 0,927 × 99 ≈ 7 820 000 Kč
  },
  "hradec-kralove": {
    "1+kk": vypoctiKupniCenu("hradec-kralove", "1+kk"),     // 96 500 × 1,163 × 35 ≈ 3 930 000 Kč
    "2+kk": vypoctiKupniCenu("hradec-kralove", "2+kk"),     // 96 500 × 1,000 × 53 ≈ 5 110 000 Kč
    "3+kk": vypoctiKupniCenu("hradec-kralove", "3+kk"),     // 96 500 × 0,951 × 86 ≈ 7 890 000 Kč
    "4+kk": vypoctiKupniCenu("hradec-kralove", "4+kk"),     // 96 500 × 0,927 × 107 ≈ 9 570 000 Kč
  },
  "liberec": {
    "1+kk": vypoctiKupniCenu("liberec", "1+kk"),            // 77 900 × 1,163 × 41 ≈ 3 720 000 Kč
    "2+kk": vypoctiKupniCenu("liberec", "2+kk"),            // 77 900 × 1,000 × 52 ≈ 4 050 000 Kč
    "3+kk": vypoctiKupniCenu("liberec", "3+kk"),            // 77 900 × 0,951 × 78 ≈ 5 780 000 Kč
    "4+kk": vypoctiKupniCenu("liberec", "4+kk"),            // 77 900 × 0,927 × 97 ≈ 7 010 000 Kč
  },
  "olomouc": {
    "1+kk": vypoctiKupniCenu("olomouc", "1+kk"),            // 83 200 × 1,163 × 32 ≈ 3 090 000 Kč
    "2+kk": vypoctiKupniCenu("olomouc", "2+kk"),            // 83 200 × 1,000 × 55 ≈ 4 580 000 Kč
    "3+kk": vypoctiKupniCenu("olomouc", "3+kk"),            // 83 200 × 0,951 × 80 ≈ 6 330 000 Kč
    "4+kk": vypoctiKupniCenu("olomouc", "4+kk"),            // 83 200 × 0,927 × 90 ≈ 6 930 000 Kč
  },
  "pardubice": {
    "1+kk": vypoctiKupniCenu("pardubice", "1+kk"),          // 88 200 × 1,163 × 33 ≈ 3 380 000 Kč
    "2+kk": vypoctiKupniCenu("pardubice", "2+kk"),          // 88 200 × 1,000 × 58 ≈ 5 120 000 Kč
    "3+kk": vypoctiKupniCenu("pardubice", "3+kk"),          // 88 200 × 0,951 × 74 ≈ 6 200 000 Kč
    "4+kk": vypoctiKupniCenu("pardubice", "4+kk"),          // 88 200 × 0,927 × 101 ≈ 8 250 000 Kč
  },
  "usti-nad-labem": {
    "1+kk": vypoctiKupniCenu("usti-nad-labem", "1+kk"),     // 48 700 × 1,163 × 25 ≈ 1 420 000 Kč
    "2+kk": vypoctiKupniCenu("usti-nad-labem", "2+kk"),     // 48 700 × 1,000 × 43 ≈ 2 090 000 Kč
    "3+kk": vypoctiKupniCenu("usti-nad-labem", "3+kk"),     // 48 700 × 0,951 × 75 ≈ 3 480 000 Kč
    "4+kk": vypoctiKupniCenu("usti-nad-labem", "4+kk"),     // 48 700 × 0,927 × 94 ≈ 4 240 000 Kč
  },
  "karlovy-vary": {
    "1+kk": vypoctiKupniCenu("karlovy-vary", "1+kk"),       // 73 600 × 1,163 × 39 ≈ 3 340 000 Kč
    "2+kk": vypoctiKupniCenu("karlovy-vary", "2+kk"),       // 73 600 × 1,000 × 60 ≈ 4 420 000 Kč
    "3+kk": vypoctiKupniCenu("karlovy-vary", "3+kk"),       // 73 600 × 0,951 × 88 ≈ 6 160 000 Kč
    "4+kk": vypoctiKupniCenu("karlovy-vary", "4+kk"),       // 73 600 × 0,927 × 118 ≈ 8 060 000 Kč
  },
  "jihlava": {
    "1+kk": vypoctiKupniCenu("jihlava", "1+kk"),            // 71 500 × 1,163 × 38 ≈ 3 160 000 Kč
    "2+kk": vypoctiKupniCenu("jihlava", "2+kk"),            // 71 500 × 1,000 × 55 ≈ 3 930 000 Kč
    "3+kk": vypoctiKupniCenu("jihlava", "3+kk"),            // 71 500 × 0,951 × 89 ≈ 6 060 000 Kč
    "4+kk": vypoctiKupniCenu("jihlava", "4+kk"),            // 71 500 × 0,927 × 102 ≈ 6 760 000 Kč
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

      cenaZaM2 = srealityNabidkovaCena2kk[město] × perCityHaircutFaktor[město]

      Nabídkové ceny Sreality.cz pro cihlové a panelové domy (starší zástavba), staženy 2026-04-05,
      script: scripts/sreality-older-buildings-price.mjs. Každé město má vlastní haircut faktor.

      Per-city haircut metodika (2026-04-05):
        haircut[město] = (ČBA Monitor Q4 2025 × 1.05) / Sreality asking[město]
        Faktor 1.05 eliminuje časový posun (~5 % za 4,5 měsíce, při anualizovaném růstu ~12–14 %).
        Spolehlivé výsledky: Praha 0.870, Brno 0.843, Plzeň 0.804, ČB 0.854,
          Liberec 0.780, Olomouc 0.783, Pardubice 0.882, Ústí 0.777, Jihlava 0.798.
        Fallback (0.804 = medián spolehlivých měst): Ostrava, KV (ČBA Monitor biased),
          Hradec Králové (Sreality asking suspektně vysoké).
        Výjimka: Zlín — ČBA Monitor Q4 2025 přímo (Sreality vzorek anomální).

      Výhoda per-city haircut vs. flat 0.802:
        Plně odstraňuje systematické chyby plynoucí z různé likvidity trhů.
        Likvidní trhy (Praha, Brno, Pardubice) mají nižší čistou srážku (~12–13 %).
        Méně likvidní trhy (Ústí, Liberec, Olomouc) mají vyšší srážku (~22 %).
        Zbývající nejistota: kvalita časové korekce (+5 %) — citlivost ±3 p.b.

      koeficientDispozice pochází ze stejného Sreality dotazu, 2026-04-05.
    `,
    procTatoMetoda: `
      Klíčová motivace pro přechod z ČBA Monitor na Sreality starší zástavba:
      
      ČBA Monitor zaznamenává pouze hypotečně financované transakce pre-1995 zástavby.
      V některých městech (Ostrava, Karlovy Vary) pokrývá ČBA Monitor zjevně
      pouze nejlevnější segment trhu — nabídkové ceny Sreality jsou o 34–77 % výše
      i po odečtení standardní srážky nabídka→transakce.
      Výsledkem bylo systematické podhodnocení kupniCena a nadhodnocení výnosového procenta.

      Sreality starší zástavba (cihlová + panelová) je konzistentní s populací bytů
      v najemne.ts (stejný filtr). Kupní cena i nájemné tak popisují tentýž typ bytu.

      Per-city haircut vs. flat haircut:
        Praha: 0.870 (flat 0.802 → systematicky podhodnocoval ceny o ~8 %)
        Brno: 0.843 (flat 0.802 → systematicky podhodnocoval ceny o ~5 %)
        Pardubice: 0.882 (flat 0.802 → podhodnocoval o ~10 %; dynamický trh)
        Ústí: 0.777 (flat 0.802 → mírně nadhodnocoval; méně likvidní trh)
        Liberec: 0.780 (flat 0.802 → mírně nadhodnocoval; méně likvidní trh)
    `,
    presnost: `
      Cena za m² (Sreality starší zástavba × per-city haircut):
        Velká města (Praha n=1350 haircut 0.870, Brno n=331 haircut 0.843): ±6–9 %.
          Haircut odvozeno z ČBA Monitor — nejspolehlivější kalibrační bod.
        Střední města (Plzeň n=81, ČB n=64, KV n=104, Olomouc n=73): ±8–12 %.
          KV a Ostrava: fallback haircut 0.804, neurčitost haircutu vyšší (±5 p.b.).
        Malá města (Ústí n=16, Jihlava n=17): ±12–18 % — malý vzorek.
        Časová korekce (+5 %): citlivost na ±2 p.b. chyby v odhadu růstu = ±2–3 % na ceně.

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
      "Ústí nad Labem — 2+kk n=16 je nedostatečný vzorek; výsledek (48 700 Kč/m²) může mít odchylku ±15 %",
      "Jihlava — 2+kk n=17, podobná výhrada jako Ústí",
      "Zlín — použit ČBA Monitor (n/a Sreality), koeficienty Sreality pro Zlín anomální (3+kk > 2+kk na m²)",
      "Liberec — nabídkový trh 1+kk vykazuje minimální prémii (+3 %), národní koeficient (+16,3 %) může 1+kk mírně nadhodnotit",
      "Hradec Králové 1+kk: Sreality vzorek n=7, koeficient nespolehlivý — národní medián použit; haircut fallback 0.804",
      "Časová korekce +5 %: pokud skutečný růst Q4 2025→duben 2026 byl jiný, ovlivní per-city haircuty rovnoměrně (~±0.02 u všech měst). Relativní pořadí cen měst se nemění",
    ],
    vzorec: `
      kupniCena = ROUND(cenaZaM2[město] × dispozicniKoeficient[dispozice] × squareMeters[město][dispozice], -4)
      
      cenaZaM2 = srealityNabidkovaCena2kk[město] × perCityHaircutFaktor[město]
      perCityHaircutFaktor: { Praha: 0.870, Brno: 0.843, Plzeň: 0.804, ČB: 0.854,
        Liberec: 0.780, Olomouc: 0.783, Pardubice: 0.882, Ústí: 0.777, Jihlava: 0.798,
        Ostrava/KV/HK: 0.804 (fallback), Zlín: n/a (ČBA Monitor přímo) }
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

          Per-city haircut kalibrace (nabídková → transakční cena):
          Metoda: (ČBA Monitor Q4 2025 × 1.05) / Sreality asking = čistá srážka
          Faktor 1.05 eliminuje ~5 % tržního růstu Q4 2025→duben 2026 (anualizovaně 12–14 %).
            Praha:     145 000 × 1.05 / 175 045 = 0.870 ← čistá srážka 13 % (likvidní trh)
            Brno:      114 300 × 1.05 / 142 453 = 0.843 ← čistá srážka 16 %
            Plzeň:      78 400 × 1.05 / 102 381 = 0.804 ← čistá srážka 20 %
            ČB:         81 100 × 1.05 /  99 756 = 0.854 ← čistá srážka 15 %
            Liberec:    74 200 × 1.05 /  99 929 = 0.780 ← čistá srážka 22 %
            Olomouc:    79 200 × 1.05 / 106 207 = 0.783 ← čistá srážka 22 %
            Pardubice:  84 000 × 1.05 / 100 000 = 0.882 ← čistá srážka 12 % (dynamický trh)
            Ústí:       46 400 × 1.05 /  62 720 = 0.777 ← čistá srážka 22 %
            Jihlava:    68 100 × 1.05 /  89 579 = 0.798 ← čistá srážka 20 %
            Ostrava: ČBA Monitor biased → fallback 0.804 (medián spolehlivých měst)
            KV:      ČBA Monitor biased → fallback 0.804
            HK:      Sreality asking suspektně vysoké → fallback 0.804
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
      Per-city haircut kalibrován: (ČBA Monitor Q4 2025 × 1.05) / Sreality asking.
      Fallback 0.804 (medián spolehlivých měst) pro Ostrava, KV (ČBA Monitor biased), HK (suspektní asking).

      VÝJIMKA — Zlín (1/13 měst): ČBA Monitor Q4 2025 = 75 700 Kč/m².
      Důvod: Sreality vzorek Zlín (n=29) vykazuje anomální koeficienty (3+kk a 4+kk dražší
      na m² než 2+kk), po haircutu by cena byla 65 500 — o 13,5 % níže než ČBA Monitor.
      Pro Zlín je ČBA Monitor (haircut 7,3 %) pravděpodobnější odhad skutečné tržní ceny.

      KONZISTENCE S NAJEMNE.TS:
      Stejný filtr (cihlová + panelová) = stejná populace bytů pro cenu i nájemné.
      Výnosové procento je proto interně konzistentní a nepromíchává různé typy zástavby.

      SROVNÁNÍ S PŘEDCHOZÍ METODIKOU — flat haircut 0.802 (2+kk, vybrané změny):
        Praha:     7 310 000 → 7 920 000 Kč (+8,4 %) — flat haircut podhodnocoval Prahu
        Brno:      6 060 000 → 6 370 000 Kč (+5,1 %)
        Pardubice: 4 650 000 → 5 120 000 Kč (+10,0 %) — dynamický trh, nízká srážka
        ČB:        4 320 000 → 4 600 000 Kč (+6,5 %)
        Liberec:   4 170 000 → 4 050 000 Kč (-2,9 %) — méně likvidní, vyšší srážka
        Olomouc:   4 690 000 → 4 580 000 Kč (-2,3 %)
        Ústí:      2 160 000 → 2 090 000 Kč (-3,2 %)
        Ostrava/KV/HK/Plzeň/Jihlava/Zlín: beze změny nebo marginální (<1 %)
    `,
  },

  hodnoty: kupniCenaValues,
};
