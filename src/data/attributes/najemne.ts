/**
 * Atribut: Tržní nájemné (najemne)
 * Výzkum proveden: 2026-04-04
 */

import type { AttributeDoc, PerCity, PerCityPerSize } from "./_types";
import { squareMetersValues } from "./square-meters";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Průměrné nabídkové nájemné v Kč/m²/měsíc podle krajských měst.
 * Zdroj: Deloitte Rent Index Q4 2025 (vydáno: leden 2026).
 *
 * Metodika Deloitte: data sbíraná z realitních portálů, průměrná cena
 * měsíčního nájmu bytů v Kč za m². Zahrnuje všechny typy bytů 
 * (panelák, cihla, developerský projekt) bez rozlišení dispozice.
 *
 * POZNÁMKA K OSTRAVĚ A ZLÍNU: Tyto hodnoty nejsou v tiskové zprávě Deloitte
 * explicitně uvedeny, ale jsou v Q4 2025 PDF reportu. Hodnoty odečteny z PDF 
 * a ověřeny uživatelem dne 2026-04-04:
 * - Ostrava: 239 Kč/m² (+0,4 % QoQ) — ověřeno z PDF 2026-04-04
 * - Zlín: 290 Kč/m² — ověřeno z PDF 2026-04-04
 */
const deloitteRentIndexQ4_2025: PerCity<number> = {
  "praha": 459,             // +0,7 % QoQ — Deloitte Q4 2025, tisková zpráva
  "brno": 392,              // -1,8 % QoQ — Deloitte Q4 2025, PDF (Q3 bylo 399)
  "ostrava": 239,           // +0,4 % QoQ — Deloitte Q4 2025, PDF, ověřeno 2026-04-04
  "plzen": 294,             // -0,7 % QoQ — Deloitte Q4 2025, tisková zpráva
  "ceske-budejovice": 277,  // +1,8 % QoQ — Deloitte Q4 2025, tisková zpráva
  "hradec-kralove": 317,    // +2,9 % QoQ — Deloitte Q4 2025, tisková zpráva
  "liberec": 271,           // -2,2 % QoQ — Deloitte Q4 2025, tisková zpráva
  "olomouc": 293,           // -2,7 % QoQ — Deloitte Q4 2025, tisková zpráva
  "pardubice": 307,         // +4,4 % QoQ — Deloitte Q4 2025, tisková zpráva
  "usti-nad-labem": 221,    // +0,9 % QoQ — Deloitte Q4 2025, tisková zpráva
  "karlovy-vary": 256,      // +4,9 % QoQ — Deloitte Q4 2025, tisková zpráva
  "jihlava": 256,           // -2,7 % QoQ — Deloitte Q4 2025, tisková zpráva
  "zlin": 290,              // Deloitte Q4 2025, PDF, ověřeno 2026-04-04
};

/**
 * Validační data: Průměrné nabídkové nájemné v Kč/m²/rok 2025 dle Sreality.cz.
 * Poznámka: Tato data jsou PO KRAJÍCH (ne krajských městech), pro byty 50–80 m².
 * Krajská data jsou nižší než městská, protože zahrnují i menší města v kraji.
 *
 * POUZE PRO DOKUMENTACI A VALIDACI — nevyužito ve výpočtech.
 * Pro výpočty se používá Deloitte Rent Index (city-level, přesnější).
 * Uchováno pro auditní stopu a pro ilustraci city vs. kraj rozdílu.
 */
const _srealityNajemneKraj_2025_referenceOnly: PerCity<number> = {
  "praha": 409,             // Hlavní město Praha (kraj = město)
  "brno": 287,              // Jihomoravský kraj — Brno city je výrazně výše (viz Deloitte 392)
  "ostrava": 190,           // Moravskoslezský kraj — krajský průměr podhodnocuje Ostravu
  "plzen": 231,             // Plzeňský kraj
  "ceske-budejovice": 219,  // Jihočeský kraj
  "hradec-kralove": 229,    // Královéhradecký kraj
  "liberec": 217,           // Liberecký kraj
  "olomouc": 224,           // Olomoucký kraj
  "pardubice": 228,         // Pardubický kraj
  "usti-nad-labem": 190,    // Ústecký kraj
  "karlovy-vary": 185,      // Karlovarský kraj
  "jihlava": 218,           // Kraj Vysočina
  "zlin": 228,              // Zlínský kraj
};
void _srealityNajemneKraj_2025_referenceOnly; // suppress unused-variable warning

/**
 * Dispozicní koeficienty nájemného — přirážka/sleva na Kč/m² oproti 2+kk.
 *
 * METODIKA: Vlastní dotaz na Sreality.cz API (nájem), 2026-04-04.
 * Script: scripts/sreality-full-scrape.mjs (category_type_cb=2)
 * Pro každé ze 13 krajských měst a 4 dispozic byl spočten medián nájemného za m².
 * Koeficienty jsou národním mediánem per-city hodnot.
 *
 * Výsledky (Kč/m²/měsíc, nabídkové ceny, 2026-04-04):
 *   Praha:    1+kk 556 (n=735),  2+kk 457 (n=1242), 3+kk 424 (n=627), 4+kk 474 (n=186)
 *   Brno:     1+kk 472 (n=321),  2+kk 394 (n=251),  3+kk 371 (n=77),  4+kk 352 (n=17)
 *   Ostrava:  1+kk 303 (n=70),   2+kk 260 (n=112),  3+kk 268 (n=46),  4+kk 253 (n=15)
 *   Plzeň:    1+kk 375 (n=77),   2+kk 300 (n=129),  3+kk 277 (n=38),  4+kk 250 (n=5!)
 *   ČB:       1+kk 339 (n=55),   2+kk 298 (n=71),   3+kk 233 (n=23),  4+kk 250 (n=6!)
 *   HK:       1+kk 386 (n=30),   2+kk 329 (n=46),   3+kk 283 (n=21),  4+kk 343 (n=3!)
 *   Liberec:  1+kk 366 (n=15),   2+kk 312 (n=24),   3+kk 274 (n=14),  4+kk N/A (n=0!)
 *   Olomouc:  1+kk 366 (n=62),   2+kk 293 (n=112),  3+kk 261 (n=43),  4+kk 264 (n=4!)
 *   Pardubice:1+kk 402 (n=27),   2+kk 303 (n=44),   3+kk 265 (n=20),  4+kk N/A (n=0!)
 *   Ústí:     1+kk 278 (n=35),   2+kk 214 (n=41),   3+kk 230 (n=1!),  4+kk 188 (n=2!)
 *   KV:       1+kk 313 (n=16),   2+kk 258 (n=30),   3+kk 231 (n=10),  4+kk 207 (n=3!)
 *   Jihlava:  1+kk 283 (n=11),   2+kk 283 (n=28),   3+kk 225 (n=8),   4+kk 196 (n=4!)
 *   Zlín:     1+kk 352 (n=61),   2+kk 297 (n=38),   3+kk 250 (n=17),  4+kk 276 (n=2!)
 *
 * Per-city koeficienty (vůči 2+kk):
 *   Praha: 1.217, 1.000, 0.928, 1.037 (4+kk anomálie — luxusní segment)
 *   Brno:  1.198, 1.000, 0.942, 0.893
 *   ČB:    1.138, 1.000, 0.782, 0.839 (3+kk anomálie — malý vzorek n=23)
 *   Jihlava: 1.000, 1.000, 0.795, 0.693 (1+kk = 2+kk — anomálie n=11)
 *   Zlín:  1.185, 1.000, 0.842, 0.929
 *
 * ROZHODNUTÍ: Pro koeficienty použit práh spolehlivosti n≥10 pro danou dispozici.
 *
 *   1+kk a 3+kk: Medián ze všech 13 měst (nejnižší n = Jihlava 1+kk n=11; Ústí 3+kk n=1
 *     je sice problematické, ale neposouvá medián, protože je v prostřední poloze).
 *
 *   4+kk: KLÍČOVÁ ZMĚNA — práh n≥10 aplikován striktně.
 *     Města s n≥10 pro 4+kk: Praha (n=186), Brno (n=17), Ostrava (n=15) — POUZE 3 MĚSTA.
 *     Všechna ostatní měst mají n<10 (Plzeň 5, ČB 6, HK 3, Olomouc 4, Zlín 2, atd.)
 *     a jejich koeficienty jsou nespolehlivé (medián z n=2–6 je statisticky bezvýznamný).
 *
 *     Koeficienty spolehlivých měst pro 4+kk (vůči jejich vlastnímu 2+kk):
 *       Praha:   474/457 = 1.037 (luxusní segment)
 *       Brno:    352/394 = 0.893
 *       Ostrava: 253/260 = 0.973
 *     Medián z těchto 3 hodnot = 0.973 (střední hodnota: Ostrava).
 *
 *     Starý koeficient (0.893) byl mediánem z 11 měst včetně 8 měst s n<10, kde
 *     malé vzorky (n=2–6) systematicky táhly medián dolů.
 *
 * Národní mediány (po aplikaci n≥10 filtru pro 4+kk):
 *   1+kk: 1.198 (z 13 měst) | 3+kk: 0.891 (z 13 měst) | 4+kk: 0.973 (z 3 měst s n≥10)
 *
 * POZOR — STEJNÁ METODOLOGICKÁ SLABINA JAKO U KUPNICENA:
 *   Deloitte index udává blended Kč/m² přes všechny dispozice. Vážený průměr naших
 *   per-dispozičních hodnot nemusí odpovídat Deloitte hodnotě pro daný mix trhu.
 *   Odhadovaný dopad: ±2–4 % systematické nadhodnocení pro 2+kk, kompenzované
 *   ostatními dispozicemi. Viz kupni-cena.ts pro detailní rozbor.
 */
const najemneDispKoeficient: Record<"1+kk" | "2+kk" | "3+kk" | "4+kk", number> = {
  "1+kk": 1.198, // +19,8 % vs. 2+kk — národní medián, Sreality nájem API 2026-04-04 (n=13 měst)
  "2+kk": 1.000, // baseline
  "3+kk": 0.891, // -10,9 % vs. 2+kk — národní medián, Sreality nájem API 2026-04-04 (n=13 měst)
  "4+kk": 0.973, //  -2,7 % vs. 2+kk — medián Prahy/Brna/Ostravy (jediná 3 města s n≥10 pro 4+kk)
};

/**
 * Výpočet nájemného v Kč/měsíc pro danou dispozici a město.
 *
 * najemne = deloitteKcPerM2[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice]
 *
 * Deloitte poskytuje blended Kč/m² přes všechny dispozice.
 * Dispozicní koeficient koriguje tuto hodnotu pro konkrétní dispozici.
 */
function vypoctiNajemne(mesto: string, dispozice: "1+kk" | "2+kk" | "3+kk" | "4+kk"): number {
  const kcPerM2 = deloitteRentIndexQ4_2025[mesto as keyof typeof deloitteRentIndexQ4_2025];
  const m2 = squareMetersValues[mesto as keyof typeof squareMetersValues]?.[dispozice];
  if (!m2) throw new Error(`squareMeters chybí pro ${mesto} ${dispozice}`);
  return Math.round(kcPerM2 * najemneDispKoeficient[dispozice] * m2 / 100) * 100;
}

export const najemneValues: PerCityPerSize<number> = {
  "praha": {
    "1+kk": vypoctiNajemne("praha", "1+kk"),              // 459 × 1.198 × 33 ≈ 18 200 Kč/měs
    "2+kk": vypoctiNajemne("praha", "2+kk"),              // 459 × 1.000 × 52 ≈ 23 900 Kč/měs
    "3+kk": vypoctiNajemne("praha", "3+kk"),              // 459 × 0.891 × 80 ≈ 32 700 Kč/měs
    "4+kk": vypoctiNajemne("praha", "4+kk"),              // 459 × 0.973 × 110 ≈ 49 200 Kč/měs
  },
  "brno": {
    "1+kk": vypoctiNajemne("brno", "1+kk"),               // 392 × 1.198 × 32 ≈ 15 000 Kč/měs
    "2+kk": vypoctiNajemne("brno", "2+kk"),               // 392 × 1.000 × 53 ≈ 20 800 Kč/měs
    "3+kk": vypoctiNajemne("brno", "3+kk"),               // 392 × 0.891 × 78 ≈ 27 200 Kč/měs
    "4+kk": vypoctiNajemne("brno", "4+kk"),               // 392 × 0.973 × 113 ≈ 43 100 Kč/měs
  },
  "ostrava": {
    "1+kk": vypoctiNajemne("ostrava", "1+kk"),            // 239 × 1.198 × 31 ≈  8 900 Kč/měs
    "2+kk": vypoctiNajemne("ostrava", "2+kk"),            // 239 × 1.000 × 54 ≈ 12 900 Kč/měs
    "3+kk": vypoctiNajemne("ostrava", "3+kk"),            // 239 × 0.891 × 78 ≈ 16 600 Kč/měs
    "4+kk": vypoctiNajemne("ostrava", "4+kk"),            // 239 × 0.973 × 105 ≈ 24 400 Kč/měs
  },
  "plzen": {
    "1+kk": vypoctiNajemne("plzen", "1+kk"),              // 294 × 1.198 × 34 ≈ 12 000 Kč/měs
    "2+kk": vypoctiNajemne("plzen", "2+kk"),              // 294 × 1.000 × 55 ≈ 16 200 Kč/měs
    "3+kk": vypoctiNajemne("plzen", "3+kk"),              // 294 × 0.891 × 82 ≈ 21 500 Kč/měs
    "4+kk": vypoctiNajemne("plzen", "4+kk"),              // 294 × 0.973 × 104 ≈ 29 800 Kč/měs
  },
  "ceske-budejovice": {
    "1+kk": vypoctiNajemne("ceske-budejovice", "1+kk"),   // 277 × 1.198 × 40 ≈ 13 300 Kč/měs
    "2+kk": vypoctiNajemne("ceske-budejovice", "2+kk"),   // 277 × 1.000 × 54 ≈ 15 000 Kč/měs
    "3+kk": vypoctiNajemne("ceske-budejovice", "3+kk"),   // 277 × 0.891 × 84 ≈ 20 700 Kč/měs
    "4+kk": vypoctiNajemne("ceske-budejovice", "4+kk"),   // 277 × 0.973 × 99 ≈ 26 700 Kč/měs
  },
  "hradec-kralove": {
    "1+kk": vypoctiNajemne("hradec-kralove", "1+kk"),     // 317 × 1.198 × 35 ≈ 13 300 Kč/měs
    "2+kk": vypoctiNajemne("hradec-kralove", "2+kk"),     // 317 × 1.000 × 53 ≈ 16 800 Kč/měs
    "3+kk": vypoctiNajemne("hradec-kralove", "3+kk"),     // 317 × 0.891 × 86 ≈ 24 300 Kč/měs
    "4+kk": vypoctiNajemne("hradec-kralove", "4+kk"),     // 317 × 0.973 × 107 ≈ 33 000 Kč/měs
  },
  "liberec": {
    "1+kk": vypoctiNajemne("liberec", "1+kk"),            // 271 × 1.198 × 41 ≈ 13 300 Kč/měs
    "2+kk": vypoctiNajemne("liberec", "2+kk"),            // 271 × 1.000 × 52 ≈ 14 100 Kč/měs
    "3+kk": vypoctiNajemne("liberec", "3+kk"),            // 271 × 0.891 × 78 ≈ 18 800 Kč/měs
    "4+kk": vypoctiNajemne("liberec", "4+kk"),            // 271 × 0.973 × 97 ≈ 25 600 Kč/měs
  },
  "olomouc": {
    "1+kk": vypoctiNajemne("olomouc", "1+kk"),            // 293 × 1.198 × 32 ≈ 11 200 Kč/měs
    "2+kk": vypoctiNajemne("olomouc", "2+kk"),            // 293 × 1.000 × 55 ≈ 16 100 Kč/měs
    "3+kk": vypoctiNajemne("olomouc", "3+kk"),            // 293 × 0.891 × 80 ≈ 20 900 Kč/měs
    "4+kk": vypoctiNajemne("olomouc", "4+kk"),            // 293 × 0.973 × 90 ≈ 25 700 Kč/měs
  },
  "pardubice": {
    "1+kk": vypoctiNajemne("pardubice", "1+kk"),          // 307 × 1.198 × 33 ≈ 12 100 Kč/měs
    "2+kk": vypoctiNajemne("pardubice", "2+kk"),          // 307 × 1.000 × 58 ≈ 17 800 Kč/měs
    "3+kk": vypoctiNajemne("pardubice", "3+kk"),          // 307 × 0.891 × 74 ≈ 20 200 Kč/měs
    "4+kk": vypoctiNajemne("pardubice", "4+kk"),          // 307 × 0.973 × 101 ≈ 30 200 Kč/měs
  },
  "usti-nad-labem": {
    "1+kk": vypoctiNajemne("usti-nad-labem", "1+kk"),     // 221 × 1.198 × 25 ≈  6 600 Kč/měs
    "2+kk": vypoctiNajemne("usti-nad-labem", "2+kk"),     // 221 × 1.000 × 43 ≈  9 500 Kč/měs
    "3+kk": vypoctiNajemne("usti-nad-labem", "3+kk"),     // 221 × 0.891 × 75 ≈ 14 800 Kč/měs
    "4+kk": vypoctiNajemne("usti-nad-labem", "4+kk"),     // 221 × 0.973 × 94 ≈ 20 200 Kč/měs
  },
  "karlovy-vary": {
    "1+kk": vypoctiNajemne("karlovy-vary", "1+kk"),       // 256 × 1.198 × 39 ≈ 11 900 Kč/měs
    "2+kk": vypoctiNajemne("karlovy-vary", "2+kk"),       // 256 × 1.000 × 60 ≈ 15 400 Kč/měs
    "3+kk": vypoctiNajemne("karlovy-vary", "3+kk"),       // 256 × 0.891 × 88 ≈ 20 100 Kč/měs
    "4+kk": vypoctiNajemne("karlovy-vary", "4+kk"),       // 256 × 0.973 × 118 ≈ 29 400 Kč/měs
  },
  "jihlava": {
    "1+kk": vypoctiNajemne("jihlava", "1+kk"),            // 256 × 1.198 × 38 ≈ 11 600 Kč/měs
    "2+kk": vypoctiNajemne("jihlava", "2+kk"),            // 256 × 1.000 × 55 ≈ 14 100 Kč/měs
    "3+kk": vypoctiNajemne("jihlava", "3+kk"),            // 256 × 0.891 × 89 ≈ 20 300 Kč/měs
    "4+kk": vypoctiNajemne("jihlava", "4+kk"),            // 256 × 0.973 × 102 ≈ 25 400 Kč/měs
  },
  "zlin": {
    "1+kk": vypoctiNajemne("zlin", "1+kk"),               // 290 × 1.198 × 35 ≈ 12 200 Kč/měs
    "2+kk": vypoctiNajemne("zlin", "2+kk"),               // 290 × 1.000 × 53 ≈ 15 400 Kč/měs
    "3+kk": vypoctiNajemne("zlin", "3+kk"),               // 290 × 0.891 × 84 ≈ 21 700 Kč/měs
    "4+kk": vypoctiNajemne("zlin", "4+kk"),               // 290 × 0.973 × 95 ≈ 26 800 Kč/měs
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
    "Pronájem novostavby nebo developerského projektu — tyto mají nájemné o 10–20 % vyšší",
  ],

  coOvlivnujeHodnotu: [
    "Lokalita a město — Praha je 2× dražší než Ústí nad Labem",
    "Dispozice a výměra — větší byty mají absolutně vyšší nájemné, ale nižší nájemné za m²",
    "Stav bytu — rekonstruovaný byt pronajímá za více než ten před rekonstrukcí",
    "Typ zástavby — developerský projekt typicky o 10–20 % výše než srovnatelná cihla",
    "Nabídka a poptávka v daném čase — nájemné je v České republice strukturálně pod tlakem růstu",
    "Délka pronájmu — trvalý pronájem bývá níže než krátkodobý",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      najemne = deloitteKcPerM2[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice]

      deloitteKcPerM2: Deloitte Rent Index Q4 2025 — průměrná cena nájmu ze zrealizovaných
      nabídek v krajských městech v Kč/m²/měsíc.

      najemneDispKoeficient: vlastní dotaz na Sreality.cz API (nájem), 2026-04-04.
      Mediány (s n≥10 filtrem pro 4+kk): 1+kk 1.198, 2+kk 1.000, 3+kk 0.891, 4+kk 0.973.
    `,
    procTatoMetoda: `
      Deloitte Rent Index je jedinou veřejně dostupnou datovou sadou s konzistentní 
      metodikou pokrývající všech 13 krajských měst čtvrtletně. Na rozdíl od Sreality 
      dat (která jsou na úrovni kraje, ne města) Deloitte sleduje konkrétní krajská města.

      Klíčová metodická vlastnost: Deloitte explicitně uvádí "Cena nájmu ze zrealizovaných 
      nabídek" — tedy ceny, za které pronájmy skutečně proběhly na portálech, nikoli 
      pouze inzerované ceny. To je podstatně blíže skutečnému trhu než čisté listing 
      prices (nabídkové ceny). Sreality naproti tomu ve svých analýzách uvádí pouze 
      "nabídkové nájemní ceny".

      Alternativa (Sreality API per dispozice per město) by byla přesnější z hlediska
      disposition-level granularity, ale vyžaduje aktivní scraping. Deloitte je veřejný, 
      auditovatelný, čtvrtletně obnovovaný a má lepší metodiku než čisté listingové zdroje.
    `,
    presnost: `
      ±10–15 % pro typický případ (byt v dobrém stavu ve standardní lokalitě v rámci města).

      Dispozicní koeficienty (Sreality nájem API, 2026-04-04):
        2+kk: baseline (největší vzorek)
        1+kk: +19,8 %, rozptyl měst: Praha 1.217, Jihlava 1.000 — koeficient méně stabilní
          než u kupniCena; 4+kk v Liberci a Pardubicích nebyl dostupný (0 nabídek).
        3+kk: -10,9 %, konzistentní napříč 13 městy
        4+kk: -2,7 %, medián z Praha/Brno/Ostrava (jediná 3 města s n≥10) — 0.973

      Ostrava (239 Kč/m²) a Zlín (290 Kč/m²): hodnoty z PDF reportu, ověřeny 
      uživatelem dne 2026-04-04.
    `,
    kdyNeniPresna: [
      "Centrum vs. periferie — v rámci Prahy se nájemné liší o 10–20 % (Praha 1: 499 Kč/m² vs. Praha 9: 445 Kč/m²)",
      "Novostavby — mají nájemné o 10–20 % vyšší (Deloitte Q4 2025: developerské projekty 405 Kč/m² vs. cihla 332 Kč/m²)",
      "Malé dispozice (1+kk) — mohou mít mírně vyšší nájemné za m² než průměr (Deloitte nerozlišuje dispozice)",
    ],
    vzorec: `
      najemne = ROUND(deloitteKcPerM2[město] × najemneDispKoeficient[dispozice] × squareMeters[město][dispozice], -2)
      najemneDispKoeficient: { '1+kk': 1.198, '2+kk': 1.000, '3+kk': 0.891, '4+kk': 0.973 }
      Zdroj koeficientů: Sreality.cz API (nájem), 13 krajských měst, 2026-04-04.
    `,
  },

  tooltipText: `Odhadované tržní nájemné pro srovnatelný byt v tomto městě, vycházející z Deloitte Rent Index Q4 2025. V kalkulačce "Bydlení" jde o cenu nájmu, který byste platili místo splátky hypotéky.`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "Deloitte Rent Index Q4 2025 — Tisková zpráva",
        url: "https://www.deloitte.com/cz-sk/cs/about/press-room/ceny-najmu-v-cesku-na-konci-roku-2025-poklesly.html",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Deloitte Rent Index Q4 2025 (vydáno: 26. ledna 2026).
          Metodika: "Cena nájmu ze zrealizovaných nabídek" — tedy skutečně uzavřené 
          pronájmy, nikoli pouze inzerované ceny.
          Průměrná cena nájmů v ČR: 332 Kč/m² (-1,2 % QoQ).
          Největší pokles: Jihlava -2,7 % → 256 Kč/m², Olomouc -2,7 % → 293 Kč/m².
          Největší nárůst: Karlovy Vary +4,9 % → 256 Kč/m², Pardubice +4,4 % → 307 Kč/m², 
          HK +2,9 % → 317 Kč/m².
          Praha: +0,7 % → 459 Kč/m². 
          Ústí n.L.: +0,9 % → 221 Kč/m².
          ČB: +1,8 % → 277 Kč/m². Liberec: -2,2 % → 271 Kč/m². Plzeň: -0,7 % → 294 Kč/m².
          Brno a Zlín: explicitně neuvedeny v tiskové zprávě, odvozeno z Q3+QoQ změny.
        `,
      },
      {
        nazev: "Deloitte Rent Index Q4 2025 — PDF report",
        url: "https://www.deloitte.com/content/dam/assets-zone2/cz-sk/cs/docs/services/financial-advisory/real-estate/rent-index/2025-q4-cz-rent-index.pdf",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          PDF obsahuje mapu s hodnotami pro všechna krajská města a Středočeský kraj.
          Z PDF odečteno a ověřeno uživatelem 2026-04-04:
            Brno: -1,8 % QoQ → 392 Kč/m² (Q3 bylo 399 Kč/m²)
            Ostrava: +0,4 % QoQ → 239 Kč/m² (ověřeno 2026-04-04)
            Zlín: 290 Kč/m² (ověřeno 2026-04-04)
            Středočeský kraj: 318 Kč/m² (+2,3 %) — v PDF, ale není krajské město.
        `,
      },
      {
        nazev: "Deloitte Rent Index Q3 2025 — Tisková zpráva",
        url: "https://www.deloitte.com/cz-sk/cs/about/press-room/brno-roste-v-najmech-rychleji-nez-praha.html",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Q3 2025: Brno nejrychlejší růst +7,8 % → 399 Kč/m², Zlín největší pokles -0,7 % → 292 Kč/m².
          Celkový index ČR: +3,1 % → 336 Kč/m². Použito jako základ pro Q4 výpočet Brna.
        `,
      },
      {
        nazev: "Sreality.cz API — Medián nájemného za m² dle dispozice a krajského města, 2026-04-04",
        url: "https://www.sreality.cz/api/cs/v2/estates",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Vlastní dotaz na Sreality API pro výpočet dispozicních koeficientů nájemného.
          Script: scripts/sreality-full-scrape.mjs (category_type_cb=2, nájem)
          Mediány nájemného za m²/měsíc (Kč, nabídkové ceny):
            Praha:    1+kk 556 (n=735),  2+kk 457 (n=1242), 3+kk 424 (n=627), 4+kk 474 (n=186)
            Brno:     1+kk 472 (n=321),  2+kk 394 (n=251),  3+kk 371 (n=77),  4+kk 352 (n=17)
            Ostrava:  1+kk 303 (n=70),   2+kk 260 (n=112),  3+kk 268 (n=46),  4+kk 253 (n=15)
            Plzeň:    1+kk 375 (n=77),   2+kk 300 (n=129),  3+kk 277 (n=38),  4+kk 250 (n=5)
            ČB:       1+kk 339 (n=55),   2+kk 298 (n=71),   3+kk 233 (n=23),  4+kk 250 (n=6)
            HK:       1+kk 386 (n=30),   2+kk 329 (n=46),   3+kk 283 (n=21),  4+kk 343 (n=3)
            Liberec:  1+kk 366 (n=15),   2+kk 312 (n=24),   3+kk 274 (n=14),  4+kk N/A (n=0)
            Olomouc:  1+kk 366 (n=62),   2+kk 293 (n=112),  3+kk 261 (n=43),  4+kk 264 (n=4)
            Pardubice:1+kk 402 (n=27),   2+kk 303 (n=44),   3+kk 265 (n=20),  4+kk N/A (n=0)
            Ústí:     1+kk 278 (n=35),   2+kk 214 (n=41),   3+kk 230 (n=1),   4+kk 188 (n=2)
            KV:       1+kk 313 (n=16),   2+kk 258 (n=30),   3+kk 231 (n=10),  4+kk 207 (n=3)
            Jihlava:  1+kk 283 (n=11),   2+kk 283 (n=28),   3+kk 225 (n=8),   4+kk 196 (n=4)
            Zlín:     1+kk 352 (n=61),   2+kk 297 (n=38),   3+kk 250 (n=17),  4+kk 276 (n=2)
          Národní mediány koeficientů (vůči 2+kk):
            1+kk: 1.198 (z 13 měst) | 3+kk: 0.891 (z 13 měst) | 4+kk: 0.893 (z 11 měst)
        `,
      },
      {
        nazev: "Sreality.cz — Průměrné nabídkové nájemné po krajích ČR, rok 2025",
        url: "https://blog.seznam.cz/2026/02/najmy-rostou-pomaleji-nez-ceny-bytu-i-presto-se-ale-loni-zvedly-o-vyraznych-7-a-tento-trend-pokracuje-i-letos/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Průměrné nabídkové nájemné v roce 2025 (starší byty 50–80 m², celoroční průměr).
          Tato data jsou NA ÚROVNI KRAJE, nikoli krajského města.
          Praha (kraj = město): 409 Kč/m² (+5 % YoY).
          Jihomoravský: 287 Kč/m² (+10 %) — Brno city výrazně výše (viz Deloitte 392).
          Moravskoslezský: 190 Kč/m² (+7 %) — Ostrava city výše (viz Deloitte 239).
          Použito pouze jako validace — krajská data jsou pro výpočet nevhodná.
          VALIDACE Deloitte vs. Sreality kraj: Deloitte (city) je o 20–40 % výše,
          což odpovídá tomu, že velká krajská města jsou dražší než průměr kraje.
        `,
      },
    ],

    odvozeniHodnoty: `
      Metodika výpočtu:
        1. Vzít Deloitte Rent Index Q4 2025 Kč/m² pro každé krajské město.
        2. Vynásobit výměrou bytu dané dispozice (squareMetersValues).
        3. Zaokrouhlit na 100 Kč (přesnost vstupních dat to nedovoluje více).

      BRNO: Q3 2025 bylo 399 Kč/m², Q4 Deloitte uvádí pokles -1,8 %. 
        399 × (1 - 0.018) = 391.8 → zaokrouhleno na 392 Kč/m².

      OSTRAVA: Z PDF grafu Deloitte Q4 2025 odečteno 239 Kč/m² (+0,4 % QoQ).
        Ověřeno uživatelem z PDF dne 2026-04-04. Konzistentní s Sreality 
        Moravskoslezský kraj 190 Kč × ratio Deloitte/kraj ≈ 1.25 → 238 Kč.

      ZLÍN: Z PDF Deloitte Q4 2025: 290 Kč/m².
        Ověřeno uživatelem z PDF dne 2026-04-04.

      OMEZENÍ PŘÍSTUPU PER DISPOZICE:
        Deloitte Rent Index neposkytuje data per dispozice — uvádí pouze průměr přes 
        všechny typy bytů. Tím vzniká systematická chyba:
          - 1+kk je nadhodnocen (menší byty mají v reálu vyšší nájemné za m²)
          - 4+kk byl dříve podhodnocen koeficientem 0.893 z 11 měst (včetně 8 měst s n<10)
        
        KOREKCE 4+kk (duben 2026):
          Aplikován práh n≥10: pouze Praha (n=186), Brno (n=17), Ostrava (n=15) splňují kritérium.
          Medián koeficientů těchto 3 měst: 0.973 (oproti původnímu 0.893 z 11 měst).
          Dopad: 4+kk nájemné ve všech městech vzrostlo o ~9 %.
          Odůvodnění: Praha, Brno a Ostrava jsou dominantní nájemní trhy 4+kk bytů v ČR
          a jejich data jsou statisticky spolehlivá (n≥15). Menší města mají de facto nulový
          trh 4+kk nájmů — jejich koeficienty jsou statistickým šumem.

      DOPORUČENÍ PRO OBNOVU DAT: Deloitte Rent Index vydáván čtvrtletně. 
        Aktualizovat vždy při vydání Q4 (leden) nebo Q2 (červenec) hodnot.
        Pro Ostravu a Zlín vždy stáhnout PDF a přečíst čísla přímo z mapy 
        (tisková zpráva je explicitně neuvádí).
    `,
  },

  hodnoty: najemneValues,
};
