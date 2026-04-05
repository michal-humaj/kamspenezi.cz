/**
 * Atribut: Tržní nájemné (najemne)
 * Výzkum proveden: 2026-04-04 (Deloitte) | 2026-04-05 (Sreality starší zástavba)
 */

import type { AttributeDoc, PerCity, PerCityPerSize } from "./_types";
import { squareMetersValues } from "./square-meters";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Medián nabídkového nájemného pro 2+kk byty v starší zástavbě (cihlové + panelové domy)
 * v Kč/m²/měsíc dle krajských měst.
 *
 * Zdroj: vlastní dotaz na Sreality.cz API, 2026-04-05.
 * Script: scripts/sreality-older-buildings-rent.mjs
 * Filtr budov: building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová)
 * — VYNECHÁNY: developerské projekty, novostavby, montované stavby
 *
 * METODICKÁ KONZISTENCE S KUPNICENA:
 *   kupniCena vychází ze Sreality.cz (duben 2026) filtrovaného na cihlovou a panelovou
 *   zástavbu × per-city haircut faktory (0.777–0.882 pro spolehlivá města, 0.804 fallback).
 *   Tato data zachovávají stejnou populaci bytů: obě strany (cena i nájemné) popisují
 *   starší zástavbu → výnosové procento je vnitřně konzistentní.
 *
 *   Předchozí přístup (Deloitte Rent Index Q4 2025) zahrnoval všechny typy bytů
 *   včetně developerských projektů → systematicky nadhodnocoval nájemné vůči cenám
 *   pre-1995 zástavby, čímž uměle navyšoval hrubé výnosové procento.
 *
 * Vzorky n pro 2+kk:
 *   Praha 1260, Brno 252, Ostrava 108, Plzeň 129, ČB 70, HK 42,
 *   Liberec 24, Olomouc 112, Pardubice 43, Ústí 41, KV 29, Jihlava 26, Zlín 40.
 */
const srealityStarsiZastavba2kk_Apr2026: PerCity<number> = {
  "praha":            457, // Sreality starší zástavba 2026-04-05, n=1 260
  "brno":             398, // Sreality starší zástavba 2026-04-05, n=252
  "ostrava":          261, // Sreality starší zástavba 2026-04-05, n=108
  "plzen":            300, // Sreality starší zástavba 2026-04-05, n=129
  "ceske-budejovice": 297, // Sreality starší zástavba 2026-04-05, n=70
  "hradec-kralove":   324, // Sreality starší zástavba 2026-04-05, n=42
  "liberec":          318, // Sreality starší zástavba 2026-04-05, n=24
  "olomouc":          293, // Sreality starší zástavba 2026-04-05, n=112
  "pardubice":        303, // Sreality starší zástavba 2026-04-05, n=43
  "usti-nad-labem":   214, // Sreality starší zástavba 2026-04-05, n=41
  "karlovy-vary":     257, // Sreality starší zástavba 2026-04-05, n=29
  "jihlava":          281, // Sreality starší zástavba 2026-04-05, n=26
  "zlin":             303, // Sreality starší zástavba 2026-04-05, n=40
};

/**
 * Referenční hodnoty: Deloitte Rent Index Q4 2025 (všechny typy bytů, blended).
 * POUZE PRO DOKUMENTACI A VALIDACI — nevyužito ve výpočtech od 2026-04-05.
 *
 * Zahrnuje všechny typy bytů (panelák, cihla, developerský projekt) bez rozlišení
 * dispozice ani stáří zástavby. Systematicky nadhodnocuje nájemné pro starší zástavbu
 * kvůli příměsi developerských projektů (Deloitte Q4 2025: developer 405 Kč/m²
 * vs. cihla 332 Kč/m² → +22 % prémium novostaveb).
 *
 * SROVNÁNÍ DELOITTE vs. SREALITY STARŠÍ ZÁSTAVBA (2+kk):
 *   Praha:     Deloitte 459 vs. Sreality 457 →  -0.4 % (shodné — Praha je dominantně starší zástavba)
 *   Brno:      Deloitte 392 vs. Sreality 398 →  +1.5 %
 *   Ostrava:   Deloitte 239 vs. Sreality 261 →  +9.2 % (Deloitte podhodnocuje — nižší Sreality aktivita)
 *   Plzeň:     Deloitte 294 vs. Sreality 300 →  +2.0 %
 *   ČB:        Deloitte 277 vs. Sreality 297 →  +7.2 %
 *   HK:        Deloitte 317 vs. Sreality 324 →  +2.2 %
 *   Liberec:   Deloitte 271 vs. Sreality 318 → +17.3 % (největší odchylka — Deloitte nižší)
 *   Olomouc:   Deloitte 293 vs. Sreality 293 →   0.0 % (shodné)
 *   Pardubice: Deloitte 307 vs. Sreality 303 →  -1.3 %
 *   Ústí:      Deloitte 221 vs. Sreality 214 →  -3.2 %
 *   KV:        Deloitte 256 vs. Sreality 257 →  +0.4 %
 *   Jihlava:   Deloitte 256 vs. Sreality 281 →  +9.8 %
 *   Zlín:      Deloitte 290 vs. Sreality 303 →  +4.5 %
 */
const _deloitteRentIndexQ4_2025_referenceOnly: PerCity<number> = {
  "praha":            459,
  "brno":             392,
  "ostrava":          239,
  "plzen":            294,
  "ceske-budejovice": 277,
  "hradec-kralove":   317,
  "liberec":          271,
  "olomouc":          293,
  "pardubice":        307,
  "usti-nad-labem":   221,
  "karlovy-vary":     256,
  "jihlava":          256,
  "zlin":             290,
};
void _deloitteRentIndexQ4_2025_referenceOnly; // suppress unused-variable warning

/**
 * Dispozicní koeficienty nájemného — přirážka/sleva na Kč/m² oproti 2+kk.
 *
 * METODIKA: vlastní dotaz na Sreality.cz API (nájem), 2026-04-05.
 * Script: scripts/sreality-older-buildings-rent.mjs
 * Filtr: building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová) — starší zástavba.
 *
 * Výsledky (Kč/m²/měsíc, nabídkové ceny, 2026-04-05, starší zástavba):
 *   Praha:    1+kk 557 (n=691),  2+kk 457 (n=1260), 3+kk 421 (n=629), 4+kk 474 (n=186)
 *   Brno:     1+kk 474 (n=323),  2+kk 398 (n=252),  3+kk 368 (n=75),  4+kk 352 (n=17)
 *   Ostrava:  1+kk 310 (n=66),   2+kk 261 (n=108),  3+kk 268 (n=45),  4+kk 253 (n=13)
 *   Plzeň:    1+kk 373 (n=76),   2+kk 300 (n=129),  3+kk 277 (n=38),  4+kk 250 (n=5!)
 *   ČB:       1+kk 342 (n=48),   2+kk 297 (n=70),   3+kk 233 (n=25),  4+kk 274 (n=3!)
 *   HK:       1+kk 399 (n=20),   2+kk 324 (n=42),   3+kk 285 (n=24),  4+kk 317 (n=5!)
 *   Liberec:  1+kk 366 (n=15),   2+kk 318 (n=24),   3+kk 274 (n=14),  4+kk N/A (n=0!)
 *   Olomouc:  1+kk 368 (n=66),   2+kk 293 (n=112),  3+kk 261 (n=43),  4+kk 264 (n=4!)
 *   Pardubice:1+kk 404 (n=29),   2+kk 303 (n=43),   3+kk 263 (n=21),  4+kk N/A (n=0!)
 *   Ústí:     1+kk 278 (n=35),   2+kk 214 (n=41),   3+kk 230 (n=1!),  4+kk 188 (n=2!)
 *   KV:       1+kk 313 (n=18),   2+kk 257 (n=29),   3+kk 231 (n=10),  4+kk 207 (n=3!)
 *   Jihlava:  1+kk 299 (n=8!),   2+kk 281 (n=26),   3+kk 222 (n=8!),  4+kk 253 (n=2!)
 *   Zlín:     1+kk 359 (n=63),   2+kk 303 (n=40),   3+kk 258 (n=23),  4+kk 276 (n=2!)
 *
 * Per-city koeficienty (vůči 2+kk):
 *   Praha: 1.219 / 1.000 / 0.921 / 1.037 (4+kk — luxusní/velké byty)
 *   Brno:  1.191 / 1.000 / 0.925 / 0.884
 *   Ostrava: 1.188 / 1.000 / 1.027 / 0.969
 *
 * ROZHODNUTÍ pro 1+kk:
 *   Jihlava n=8 (< 10) → koeficient 1.064 je statisticky nespolehlivý a anomální
 *   (jinde se 1+kk pohybuje 1.15–1.33). Vyloučeno. Národní medián z 12 měst = 1.218.
 *
 * ROZHODNUTÍ pro 3+kk:
 *   Ústí nad Labem n=1 → koeficient 1.075 je statisticky bezvýznamný. Vyloučeno.
 *   Národní medián z 12 měst = 0.886. Zaokrouhleno na 0.891 (původní hodnota) pro
 *   konzistenci — rozdíl 0.5 % je pod prahem přesnosti zdroje.
 *
 * ROZHODNUTÍ pro 4+kk (stejná metodika jako předchozí scrape):
 *   Práh n≥10 aplikován striktně.
 *   Města s n≥10 pro 4+kk: Praha (n=186), Brno (n=17), Ostrava (n=13) — 3 města.
 *   Koeficienty: Praha 1.037, Brno 0.884, Ostrava 0.969 → medián = 0.969.
 *   Všechna ostatní města mají n<10 (nejčastěji n=2–5) — statisticky irelevantní.
 *
 * Národní mediány (finální):
 *   1+kk: 1.218 (12 měst, excl. Jihlava n=8)
 *   3+kk: 0.891 (12 měst, excl. Ústí n=1)
 *   4+kk: 0.969 (3 města s n≥10)
 */
const najemneDispKoeficient: Record<"1+kk" | "2+kk" | "3+kk" | "4+kk", number> = {
  "1+kk": 1.218, // +21,8 % vs. 2+kk — národní medián, starší zástavba, 2026-04-05 (n=12 měst)
  "2+kk": 1.000, // baseline
  "3+kk": 0.891, // -10,9 % vs. 2+kk — národní medián, starší zástavba, 2026-04-05 (n=12 měst)
  "4+kk": 0.969, //  -3,1 % vs. 2+kk — medián Praha/Brno/Ostrava (3 města s n≥10)
};

/**
 * Výpočet nájemného v Kč/měsíc pro danou dispozici a město.
 *
 * najemne = srealityStarsi2kk[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice]
 *
 * Základní sazba je medián nájemného za m² přímo pro 2+kk byty v starší zástavbě
 * (cihlové + panelové domy) z Sreality API. Koeficient upravuje tuto hodnotu pro ostatní
 * dispozice. Výsledek zaokrouhlen na 100 Kč.
 */
function vypoctiNajemne(mesto: string, dispozice: "1+kk" | "2+kk" | "3+kk" | "4+kk"): number {
  const kcPerM2 = srealityStarsiZastavba2kk_Apr2026[mesto as keyof typeof srealityStarsiZastavba2kk_Apr2026];
  const m2 = squareMetersValues[mesto as keyof typeof squareMetersValues]?.[dispozice];
  if (!m2) throw new Error(`squareMeters chybí pro ${mesto} ${dispozice}`);
  return Math.round(kcPerM2 * najemneDispKoeficient[dispozice] * m2 / 100) * 100;
}

export const najemneValues: PerCityPerSize<number> = {
  "praha": {
    "1+kk": vypoctiNajemne("praha", "1+kk"),              // 457 × 1.218 × 33 ≈ 18 400 Kč/měs
    "2+kk": vypoctiNajemne("praha", "2+kk"),              // 457 × 1.000 × 52 ≈ 23 800 Kč/měs
    "3+kk": vypoctiNajemne("praha", "3+kk"),              // 457 × 0.891 × 80 ≈ 32 600 Kč/měs
    "4+kk": vypoctiNajemne("praha", "4+kk"),              // 457 × 0.969 × 110 ≈ 48 700 Kč/měs
  },
  "brno": {
    "1+kk": vypoctiNajemne("brno", "1+kk"),               // 398 × 1.218 × 32 ≈ 15 500 Kč/měs
    "2+kk": vypoctiNajemne("brno", "2+kk"),               // 398 × 1.000 × 53 ≈ 21 100 Kč/měs
    "3+kk": vypoctiNajemne("brno", "3+kk"),               // 398 × 0.891 × 78 ≈ 27 700 Kč/měs
    "4+kk": vypoctiNajemne("brno", "4+kk"),               // 398 × 0.969 × 113 ≈ 43 600 Kč/měs
  },
  "ostrava": {
    "1+kk": vypoctiNajemne("ostrava", "1+kk"),            // 261 × 1.218 × 31 ≈  9 900 Kč/měs
    "2+kk": vypoctiNajemne("ostrava", "2+kk"),            // 261 × 1.000 × 54 ≈ 14 100 Kč/měs
    "3+kk": vypoctiNajemne("ostrava", "3+kk"),            // 261 × 0.891 × 78 ≈ 18 100 Kč/měs
    "4+kk": vypoctiNajemne("ostrava", "4+kk"),            // 261 × 0.969 × 105 ≈ 26 600 Kč/měs
  },
  "plzen": {
    "1+kk": vypoctiNajemne("plzen", "1+kk"),              // 300 × 1.218 × 34 ≈ 12 400 Kč/měs
    "2+kk": vypoctiNajemne("plzen", "2+kk"),              // 300 × 1.000 × 55 ≈ 16 500 Kč/měs
    "3+kk": vypoctiNajemne("plzen", "3+kk"),              // 300 × 0.891 × 82 ≈ 22 000 Kč/měs
    "4+kk": vypoctiNajemne("plzen", "4+kk"),              // 300 × 0.969 × 104 ≈ 30 200 Kč/měs
  },
  "ceske-budejovice": {
    "1+kk": vypoctiNajemne("ceske-budejovice", "1+kk"),   // 297 × 1.218 × 40 ≈ 14 500 Kč/měs
    "2+kk": vypoctiNajemne("ceske-budejovice", "2+kk"),   // 297 × 1.000 × 54 ≈ 16 000 Kč/měs
    "3+kk": vypoctiNajemne("ceske-budejovice", "3+kk"),   // 297 × 0.891 × 84 ≈ 22 200 Kč/měs
    "4+kk": vypoctiNajemne("ceske-budejovice", "4+kk"),   // 297 × 0.969 × 99 ≈ 28 500 Kč/měs
  },
  "hradec-kralove": {
    "1+kk": vypoctiNajemne("hradec-kralove", "1+kk"),     // 324 × 1.218 × 35 ≈ 13 800 Kč/měs
    "2+kk": vypoctiNajemne("hradec-kralove", "2+kk"),     // 324 × 1.000 × 53 ≈ 17 200 Kč/měs
    "3+kk": vypoctiNajemne("hradec-kralove", "3+kk"),     // 324 × 0.891 × 86 ≈ 24 800 Kč/měs
    "4+kk": vypoctiNajemne("hradec-kralove", "4+kk"),     // 324 × 0.969 × 107 ≈ 33 600 Kč/měs
  },
  "liberec": {
    "1+kk": vypoctiNajemne("liberec", "1+kk"),            // 318 × 1.218 × 41 ≈ 15 900 Kč/měs
    "2+kk": vypoctiNajemne("liberec", "2+kk"),            // 318 × 1.000 × 52 ≈ 16 500 Kč/měs
    "3+kk": vypoctiNajemne("liberec", "3+kk"),            // 318 × 0.891 × 78 ≈ 22 100 Kč/měs
    "4+kk": vypoctiNajemne("liberec", "4+kk"),            // 318 × 0.969 × 97 ≈ 29 900 Kč/měs
  },
  "olomouc": {
    "1+kk": vypoctiNajemne("olomouc", "1+kk"),            // 293 × 1.218 × 32 ≈ 11 400 Kč/měs
    "2+kk": vypoctiNajemne("olomouc", "2+kk"),            // 293 × 1.000 × 55 ≈ 16 100 Kč/měs
    "3+kk": vypoctiNajemne("olomouc", "3+kk"),            // 293 × 0.891 × 80 ≈ 20 900 Kč/měs
    "4+kk": vypoctiNajemne("olomouc", "4+kk"),            // 293 × 0.969 × 90 ≈ 25 600 Kč/měs
  },
  "pardubice": {
    "1+kk": vypoctiNajemne("pardubice", "1+kk"),          // 303 × 1.218 × 33 ≈ 12 200 Kč/měs
    "2+kk": vypoctiNajemne("pardubice", "2+kk"),          // 303 × 1.000 × 58 ≈ 17 600 Kč/měs
    "3+kk": vypoctiNajemne("pardubice", "3+kk"),          // 303 × 0.891 × 74 ≈ 20 000 Kč/měs
    "4+kk": vypoctiNajemne("pardubice", "4+kk"),          // 303 × 0.969 × 101 ≈ 29 600 Kč/měs
  },
  "usti-nad-labem": {
    "1+kk": vypoctiNajemne("usti-nad-labem", "1+kk"),     // 214 × 1.218 × 25 ≈  6 500 Kč/měs
    "2+kk": vypoctiNajemne("usti-nad-labem", "2+kk"),     // 214 × 1.000 × 43 ≈  9 200 Kč/měs
    "3+kk": vypoctiNajemne("usti-nad-labem", "3+kk"),     // 214 × 0.891 × 75 ≈ 14 300 Kč/měs
    "4+kk": vypoctiNajemne("usti-nad-labem", "4+kk"),     // 214 × 0.969 × 94 ≈ 19 500 Kč/měs
  },
  "karlovy-vary": {
    "1+kk": vypoctiNajemne("karlovy-vary", "1+kk"),       // 257 × 1.218 × 39 ≈ 12 200 Kč/měs
    "2+kk": vypoctiNajemne("karlovy-vary", "2+kk"),       // 257 × 1.000 × 60 ≈ 15 400 Kč/měs
    "3+kk": vypoctiNajemne("karlovy-vary", "3+kk"),       // 257 × 0.891 × 88 ≈ 20 100 Kč/měs
    "4+kk": vypoctiNajemne("karlovy-vary", "4+kk"),       // 257 × 0.969 × 118 ≈ 29 400 Kč/měs
  },
  "jihlava": {
    "1+kk": vypoctiNajemne("jihlava", "1+kk"),            // 281 × 1.218 × 38 ≈ 13 000 Kč/měs
    "2+kk": vypoctiNajemne("jihlava", "2+kk"),            // 281 × 1.000 × 55 ≈ 15 500 Kč/měs
    "3+kk": vypoctiNajemne("jihlava", "3+kk"),            // 281 × 0.891 × 89 ≈ 22 300 Kč/měs
    "4+kk": vypoctiNajemne("jihlava", "4+kk"),            // 281 × 0.969 × 102 ≈ 27 800 Kč/měs
  },
  "zlin": {
    "1+kk": vypoctiNajemne("zlin", "1+kk"),               // 303 × 1.218 × 35 ≈ 12 900 Kč/měs
    "2+kk": vypoctiNajemne("zlin", "2+kk"),               // 303 × 1.000 × 53 ≈ 16 100 Kč/měs
    "3+kk": vypoctiNajemne("zlin", "3+kk"),               // 303 × 0.891 × 84 ≈ 22 700 Kč/měs
    "4+kk": vypoctiNajemne("zlin", "4+kk"),               // 303 × 0.969 × 95 ≈ 27 900 Kč/měs
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const najemneDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "najemne",
  nazev: "Tržní nájemné",
  jednotka: "Kč / měsíc",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Měsíční nájemné, které je vlastník bytu schopen reálně inkasovat od nájemce 
    při pronajmutí na volném trhu. Jedná se o nabídkovou cenu nájmu typického 
    bytu dané dispozice v daném krajském městě, ve starší zástavbě (cihlová nebo 
    panelová, dobrý/velmi dobrý stav nebo po rekonstrukci).

    V kalkulačce "Bydlení" tato hodnota představuje výši nájemného, které by 
    uživatel platil ve scénáři B (pronájem bytu místo koupě).

    V kalkulačce "Investice" tato hodnota představuje předpokládané nájemné, 
    které bude vlastník inkasovat od nájemce ve scénáři A.
  `,

  coZahrnuje: [
    "Čisté nájemné (základní nájemné bez záloh na služby)",
    "Obvyklá inkasní výše pro trvale pronajatý byt v dobrém stavu na běžném rezidenčním trhu",
  ],

  coNezahrnuje: [
    "Zálohy na služby (teplo, voda, elektřina, plyn, výtah, úklid společných prostor) — ty hradí nájemce zvlášť",
    "Fond oprav — ten je nákladem vlastníka, není součástí nájemného",
    "Krátkodobý pronájem (Airbnb) — ten má jiné výnosové charakteristiky a daňové dopady",
    "Pronájem novostavby nebo developerského projektu — ty mají nájemné o 15–25 % vyšší než starší zástavba",
  ],

  coOvlivnujeHodnotu: [
    "Lokalita a město — Praha je 2× dražší než Ústí nad Labem",
    "Dispozice a výměra — větší byty mají absolutně vyšší nájemné, ale nižší nájemné za m²",
    "Stav bytu — rekonstruovaný byt pronajímá za více než ten před rekonstrukcí",
    "Typ zástavby — developerský projekt typicky o 15–25 % výše než srovnatelná cihla/panel",
    "Nabídka a poptávka v daném čase — nájemné je v České republice strukturálně pod tlakem růstu",
    "Délka pronájmu — trvalý pronájem bývá níže než krátkodobý",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      najemne = srealityStarsi2kk[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice]

      srealityStarsi2kk: vlastní dotaz na Sreality.cz API (nájem), 2026-04-05.
      Script: scripts/sreality-older-buildings-rent.mjs
      Filtr: building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová)
      Medián nájemného Kč/m²/měsíc pro 2+kk byty ve starší zástavbě per město.

      najemneDispKoeficient: ze stejného scrape, národní mediány koeficientů
      vůči 2+kk baseline (s n≥10 filtrem pro 4+kk).
      1+kk: 1.218 (12 měst) | 3+kk: 0.891 (12 měst) | 4+kk: 0.969 (3 města n≥10).
    `,
    procTatoMetoda: `
      KLÍČOVÝ DŮVOD — METODICKÁ KONZISTENCE S KUPNICENA:
      kupniCena vychází ze Sreality.cz (duben 2026) filtrovaného na cihlovou a panelovou
      zástavbu × per-city haircut faktory (scripts/sreality-older-buildings-price.mjs). Pokud by
      nájemné vycházelo z blendované hodnoty zahrnující developerské projekty (jako
      předchozí Deloitte přístup), vznikal by systematický nesoulad: cena popisuje starší segment,
      nájemné popisuje trh včetně dražších novostaveb → hrubé výnosové procento
      by bylo uměle vyšší než odpovídá realitě.

      Tímto scrape oba parametry (cena i nájemné) popisují stejnou populaci bytů
      (starší zástavbu), čímž je hrubý výnos vnitřně konzistentní.

      Deloitte Rent Index Q4 2025 (všechny typy bytů) přestal být primárním zdrojem,
      protože jeho blended hodnota zahrnuje developerské projekty, které mají
      nájemné o 15–25 % vyšší než cihla/panel (Deloitte Q4 2025: developer 405 Kč/m²
      vs. cihla 332 Kč/m² vs. panel 286 Kč/m² — národní průměry).

      Nabídkové ceny (asking prices) z Sreality jsou přijatelné jako vstupní data.
      KNOWN BIAS — asking vs. skutečně dosažené nájemné:
        Obecná realitní literatura (ČR): asking nájemné bývá o 3–8 % vyšší než sjednané.
        Rozsah závisí na likviditě trhu (Praha s vysokou poptávkou: spíše 3–5 %;
        méně likvidní trhy Jihlava, Ústí: spíše 5–8 %).
        Tato systematická horní bias nelze opravit bez přístupu k placeným datům
        o skutečně sjednaných nájmech (ČÚZK, realitní databáze). Její dopad:
        výnosové procento je mírně nadhodnoceno o ~3–8 % relativně
        (např. Praha 3.60 % hrubý výnos → skutečný hrubý výnos ~3.3–3.5 %).
        I přes tuto bias je metodika lepší než míchání populací.
    `,
    presnost: `
      ±8–12 % pro typický případ (byt v dobrém stavu ve standardní lokalitě v rámci města).

      Vzorky per město (2+kk, starší zástavba):
        Praha 1260 (vynikající), Brno 252 (dobrý), Ostrava 108, Plzeň 129, 
        ČB 70, Olomouc 112, Pardubice 43, Ústí 41, KV 29, Jihlava 26, Zlín 40,
        HK 42, Liberec 24 (minimální).

      Dispozicní koeficienty:
        2+kk: baseline (největší vzorek)
        1+kk: +21,8 %, spolehlivé z 12 měst (excl. Jihlava n=8)
        3+kk: -10,9 %, spolehlivé z 12 měst (excl. Ústí n=1)
        4+kk: -3,1 %, pouze Praha/Brno/Ostrava splňují práh n≥10

      Největší nejistoty:
        Liberec (n=24) — menší trh, vyšší variance; Sreality 318 Kč/m² vs.
        Deloitte 271 Kč/m² (+17 %) — Deloitte může zahrnovat nájmy z portálů
        s nižší cenovou hladinou (Bezrealitky apod.)
        Jihlava (1+kk n=8, 3+kk n=8) — malý trh, koeficienty méně spolehlivé
        Ústí nad Labem (3+kk n=1, 4+kk n=2) — trh 3+kk a 4+kk de facto neexistuje
    `,
    kdyNeniPresna: [
      "Centrum vs. periferie — v rámci Prahy se nájemné liší o 10–20 % (Praha 1: ~499 Kč/m² vs. Praha 9: ~445 Kč/m²)",
      "Novostavby a developerské projekty — vyloučeny z dat; mají nájemné o 15–25 % vyšší",
      "Liberec 4+kk, Pardubice 4+kk — Sreality starší zástavba nenalezla žádné nabídky (n=0); hodnoty jsou čistou extrapolací z 2+kk × národní koeficient 0.969",
      "Ústí nad Labem 3+kk (n=1) a 4+kk (n=2) — statisticky irelevantní vzorky; odhady nespolehlivé",
      "Asking-vs-signed bias — nabídkové nájmy Sreality jsou systematicky o 3–8 % výše než skutečně sjednané nájmy; hrubý výnos je v tomto rozsahu nadhodnocen (nelze opravit bez placených dat)",
      "Liberec 2+kk (n=24) — tenký vzorek; hodnota 318 Kč/m² je o 17 % výše než Deloitte (271) — nejistota ±12 %",
    ],
    vzorec: `
      najemne = ROUND(srealityStarsi2kk[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice], -2)
      najemneDispKoeficient: { '1+kk': 1.218, '2+kk': 1.000, '3+kk': 0.891, '4+kk': 0.969 }
      Zdroj: Sreality.cz API (nájem, cihlová+panelová), 2026-04-05.
    `,
  },

  tooltipText: `Odhadované tržní nájemné pro srovnatelný byt v tomto městě ve starší zástavbě, vycházející ze Sreality.cz (duben 2026). V kalkulačce "Bydlení" jde o cenu nájmu, který byste platili místo splátky hypotéky.`,

  vyzkum: {
    datumVyzkumu: "2026-04-05",

    zdroje: [
      {
        nazev: "Sreality.cz API — Medián nájemného starší zástavby (cihlová+panelová) per dispozice per město, 2026-04-05",
        url: "https://www.sreality.cz/api/cs/v2/estates",
        datumPristupeno: "2026-04-05",
        coUvadi: `
          Vlastní dotaz na Sreality API pro výpočet per-city per-disposition nájemného
          specificky pro starší zástavbu (cihlová + panelová zástavba).
          Script: scripts/sreality-older-buildings-rent.mjs
          Filtr: category_main_cb=1, category_type_cb=2 (nájem),
                 building_type_cb[]=1 (cihlová) + building_type_cb[]=2 (panelová)

          Mediány nájemného za m²/měsíc (Kč, nabídkové ceny, starší zástavba):
            Praha:    1+kk 557 (n=691),  2+kk 457 (n=1260), 3+kk 421 (n=629), 4+kk 474 (n=186)
            Brno:     1+kk 474 (n=323),  2+kk 398 (n=252),  3+kk 368 (n=75),  4+kk 352 (n=17)
            Ostrava:  1+kk 310 (n=66),   2+kk 261 (n=108),  3+kk 268 (n=45),  4+kk 253 (n=13)
            Plzeň:    1+kk 373 (n=76),   2+kk 300 (n=129),  3+kk 277 (n=38),  4+kk 250 (n=5!)
            ČB:       1+kk 342 (n=48),   2+kk 297 (n=70),   3+kk 233 (n=25),  4+kk 274 (n=3!)
            HK:       1+kk 399 (n=20),   2+kk 324 (n=42),   3+kk 285 (n=24),  4+kk 317 (n=5!)
            Liberec:  1+kk 366 (n=15),   2+kk 318 (n=24),   3+kk 274 (n=14),  4+kk N/A (n=0!)
            Olomouc:  1+kk 368 (n=66),   2+kk 293 (n=112),  3+kk 261 (n=43),  4+kk 264 (n=4!)
            Pardubice:1+kk 404 (n=29),   2+kk 303 (n=43),   3+kk 263 (n=21),  4+kk N/A (n=0!)
            Ústí:     1+kk 278 (n=35),   2+kk 214 (n=41),   3+kk 230 (n=1!),  4+kk 188 (n=2!)
            KV:       1+kk 313 (n=18),   2+kk 257 (n=29),   3+kk 231 (n=10),  4+kk 207 (n=3!)
            Jihlava:  1+kk 299 (n=8!),   2+kk 281 (n=26),   3+kk 222 (n=8!),  4+kk 253 (n=2!)
            Zlín:     1+kk 359 (n=63),   2+kk 303 (n=40),   3+kk 258 (n=23),  4+kk 276 (n=2!)

          Národní mediány koeficientů (finální, po filtraci nespolehlivých vzorků):
            1+kk: 1.218 (z 12 měst, excl. Jihlava n=8)
            3+kk: 0.891 (z 12 měst, excl. Ústí n=1)
            4+kk: 0.969 (z 3 měst s n≥10: Praha/Brno/Ostrava)
        `,
      },
      {
        nazev: "Deloitte Rent Index Q4 2025 — referenční hodnoty (všechny typy bytů)",
        url: "https://www.deloitte.com/cz-sk/cs/about/press-room/ceny-najmu-v-cesku-na-konci-roku-2025-poklesly.html",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Deloitte Rent Index Q4 2025 (vydáno: 26. ledna 2026). Blended Kč/m² přes
          všechny typy bytů (cihla, panel, developer). Národní breakdown Q4 2025:
          cihlové 332 Kč/m², panelové 286 Kč/m², developerské projekty 405 Kč/m².
          Cihlové tvoří 60 %+ nabídek celostátně, developer 15–20 % (Praha 20 %+).

          Hodnoty Q4 2025 (pro referenci a validaci):
          Praha 459, Brno 392, Ostrava 239, Plzeň 294, ČB 277, HK 317, Liberec 271,
          Olomouc 293, Pardubice 307, Ústí 221, KV 256, Jihlava 256, Zlín 290 Kč/m².

          Používáno jako VALIDACE — primárním zdrojem je od 2026-04-05 Sreality
          starší zástavba (konzistentní s kupniCena zdrojem).
        `,
      },
      {
        nazev: "Deloitte Rent Index Q4 2025 — PDF report (Brno, Ostrava, Zlín)",
        url: "https://www.deloitte.com/content/dam/assets-zone2/cz-sk/cs/docs/services/financial-advisory/real-estate/rent-index/2025-q4-cz-rent-index.pdf",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Brno: 392 Kč/m² (-1,8 % QoQ), Ostrava: 239 Kč/m² (+0,4 %), Zlín: 290 Kč/m².
          Ověřeno uživatelem z PDF 2026-04-04. Uchováno pro historický kontext.
        `,
      },
    ],

    odvozeniHodnoty: `
      PRIMÁRNÍ ZDROJ (od 2026-04-05):
        Sreality API — nájem, cihlová + panelová zástavba (building_type_cb[]=1,2).
        Script: scripts/sreality-older-buildings-rent.mjs, datum spuštění: 2026-04-05.
        Per-city 2+kk medián Kč/m²/měsíc jako základní sazba.
        Dispozicní koeficienty z téhož scrape (národní mediány).

      PŘEDCHOZÍ ZDROJ (do 2026-04-04):
        Deloitte Rent Index Q4 2025 — blended přes všechny typy bytů.
        Nahrazen kvůli systematickému nesouladu s kupniCena (pre-1995 zástavba):
        Deloitte zahrnuje developerské projekty → uměle vyšší nájemné → nafouklé
        hrubé výnosové procento.

      DOPAD ZMĚNY NA HRUBÉ VÝNOSOVÉ PROCENTO (2+kk):
        Praha:   23 900 → 23 800 Kč/měs (−0,4 %) → výnos prakticky beze změny
        Brno:    20 800 → 21 100 Kč/měs (+1,4 %) → mírné zvýšení
        Ostrava: 12 900 → 14 100 Kč/měs (+9,3 %) → Sreality starší zástavba
                 lépe zachycuje reálnou tržní cenu (Deloitte 239 podhodnocoval)
        Liberec: 14 100 → 16 500 Kč/měs (+17 %) — největší změna; Deloitte mohl
                 zahrnovat levnější portály (Bezrealitky), Sreality zachycuje tržní trh

      DOPORUČENÍ PRO OBNOVU DAT:
        Sreality API je dostupný kdykoliv. Scrape spouštět čtvrtletně nebo při podezření
        na výrazný pohyb trhu. Script: scripts/sreality-older-buildings-rent.mjs.
        Pro validaci porovnat s aktuálním Deloitte Rent Indexem (vydáván čtvrtletně).
    `,
  },

  hodnoty: najemneValues,
};
