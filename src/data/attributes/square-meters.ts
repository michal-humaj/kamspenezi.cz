/**
 * Atribut: Výměra bytu (squareMeters)
 * Výzkum proveden: 2026-04-04
 */

import type { AttributeDoc, PerCityPerSize } from "./_types";

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Průměrná výměra bytu v m² podle dispozice a krajského města.
 *
 * ZDROJ DAT: Sreality.cz API, duben 2026 (nabídky k prodeji).
 * Script: scripts/sreality-full-scrape.mjs (spuštěno 2026-04-04).
 * Výměra je parsována z názvu inzerátu ("Prodej bytu 2+kk 44 m²") —
 * list endpoint Sreality API nevrací pole usable_area přímo.
 *
 * CHYBĚJÍCÍ DATA: Žádný veřejně dostupný zdroj nepublikuje průměrné výměry
 * per dispozici per město. Jedinou cestou jsou přímé dotazy na realitní portály.
 */
export const squareMetersValues: PerCityPerSize<number> = {
  "praha": {
    "1+kk": 33,   // Sreality median, N=478, duben 2026
    "2+kk": 52,   // Sreality median, N=1356, duben 2026
    "3+kk": 80,   // Sreality median, N=972, duben 2026
    "4+kk": 110,  // Sreality median, N=445, duben 2026
  },
  "brno": {
    "1+kk": 32,   // Sreality median, N=155, duben 2026
    "2+kk": 53,   // Sreality median, N=346, duben 2026
    "3+kk": 78,   // Sreality median, N=196, duben 2026
    "4+kk": 113,  // Sreality median, N=78, duben 2026
  },
  "ostrava": {
    "1+kk": 31,   // Sreality median, N=47, duben 2026
    "2+kk": 54,   // Sreality median, N=71, duben 2026
    "3+kk": 78,   // Sreality median, N=73, duben 2026
    "4+kk": 105,  // Sreality median, N=34, duben 2026
  },
  "plzen": {
    "1+kk": 34,   // Sreality median, N=32, duben 2026
    "2+kk": 55,   // Sreality median, N=78, duben 2026
    "3+kk": 82,   // Sreality median, N=64, duben 2026
    "4+kk": 104,  // Sreality median, N=27, duben 2026
  },
  "ceske-budejovice": {
    "1+kk": 40,   // Sreality median, N=38, duben 2026
    "2+kk": 54,   // Sreality median, N=65, duben 2026
    "3+kk": 84,   // Sreality median, N=52, duben 2026
    "4+kk": 99,   // Sreality median, N=39, duben 2026
  },
  "hradec-kralove": {
    "1+kk": 35,   // Sreality median, N=7, duben 2026 — POZOR: malý vzorek
    "2+kk": 53,   // Sreality median, N=40, duben 2026
    "3+kk": 86,   // Sreality median, N=45, duben 2026
    "4+kk": 107,  // Sreality median, N=15, duben 2026 — POZOR: malý vzorek
  },
  "liberec": {
    "1+kk": 41,   // Sreality median, N=30, duben 2026
    "2+kk": 52,   // Sreality median, N=65, duben 2026
    "3+kk": 78,   // Sreality median, N=48, duben 2026
    "4+kk": 97,   // Sreality median, N=22, duben 2026
  },
  "olomouc": {
    "1+kk": 32,   // Sreality median, N=22, duben 2026
    "2+kk": 55,   // Sreality median, N=71, duben 2026
    "3+kk": 80,   // Sreality median, N=71, duben 2026
    "4+kk": 90,   // Sreality median, N=19, duben 2026
  },
  "pardubice": {
    "1+kk": 33,   // Sreality median, N=10, duben 2026 — POZOR: malý vzorek
    "2+kk": 58,   // Sreality median, N=25, duben 2026
    "3+kk": 74,   // Sreality median, N=48, duben 2026
    "4+kk": 101,  // Sreality median, N=14, duben 2026
  },
  "usti-nad-labem": {
    "1+kk": 25,   // Sreality median, N=12, duben 2026
    "2+kk": 43,   // Sreality median, N=12, duben 2026 — POZOR: malý vzorek
    "3+kk": 75,   // Sreality median, N=6, duben 2026 — POZOR: velmi malý vzorek
    // 4+kk: duben 2026 scrape vrátil 0 nabídek — trh 4+kk v Ústí neexistuje.
    // Ponecháváme hodnotu z dubna 2026 ze staršího datasetu jako zálohu.
    "4+kk": 94,   // ZÁLOHA z leden 2025, N=16 — 0 nabídek v dubnu 2026
  },
  "karlovy-vary": {
    // POZOR: KV 1+kk se výrazně změnilo: leden 2025 = 29 m² (N=39), duben 2026 = 39 m² (N=17).
    // Nová hodnota 39 m² je více v souladu s ostatními menšími krajskými městy (37–41 m²).
    // Stará hodnota 29 m² mohla být artefaktem atypicky malých KV bytů z té doby nebo výběrem vzorku.
    // Používáme novou hodnotu, ale N=17 je malý — doporučujeme ověřit příštím scrape.
    "1+kk": 39,   // Sreality median, N=17, duben 2026 (POZOR: změna o +10 m² vs. leden 2025)
    "2+kk": 60,   // Sreality median, N=100, duben 2026 — potvrzena stabilní hodnota
    "3+kk": 88,   // Sreality median, N=90, duben 2026
    "4+kk": 118,  // Sreality median, N=18, duben 2026
  },
  "jihlava": {
    "1+kk": 38,   // Sreality median, N=5, duben 2026 — POZOR: velmi malý vzorek
    "2+kk": 55,   // Sreality median, N=13, duben 2026 — POZOR: malý vzorek
    "3+kk": 89,   // Sreality median, N=20, duben 2026
    "4+kk": 102,  // Sreality median, N=7, duben 2026 — POZOR: malý vzorek
  },
  "zlin": {
    // Zlín 1+kk: původní API hodnota (leden 2025) = 46 m² (N=25) odmítnuta jako outlier.
    // Interpolace na 35 m² byla provedena v lednu 2026. Duben 2026 scrape potvrzuje 35 m² (N=11).
    "1+kk": 35,   // Sreality median, N=11, duben 2026 — potvrzuje dřívější interpolaci
    "2+kk": 53,   // Sreality median, N=28, duben 2026
    "3+kk": 84,   // Sreality median, N=25, duben 2026
    "4+kk": 95,   // Sreality median, N=26, duben 2026
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const squareMetersDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "squareMeters",
  nazev: "Výměra bytu",
  jednotka: "m²",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Užitná plocha bytu v metrech čtverečních (m²) dle inzerce na realitním portálu.
    Odpovídá hodnotě, kterou prodávající nebo pronajímatel uvádí v inzerátu. 
    Ve starší zástavbě bývá tato hodnota totožná s plochou dle listu vlastnictví (LV),
    avšak způsob výpočtu se liší — viz "Co nezahrnuje".
  `,

  coZahrnuje: [
    "Obývací pokoj, ložnice, kuchyně/kuchyňský kout, předsíň, koupelna, záchod",
    "Komora uvnitř bytu (pokud je zahrnuta v inzerované výměře)",
    "U starší zástavby: plocha dle listu vlastnictví zapsaná v katastru nemovitostí",
  ],

  coNezahrnuje: [
    "Sklep, kolárna, parkovací místo — ty jsou vždy v ceně samostatně nebo jako příslušenství",
    "Balkon, lodžia, terasa — ve starší zástavbě standardně nejsou do výměry zahrnuty; u novostaveb závisí na metodice developera",
    "Společné prostory domu (schodiště, chodby, výtah)",
    "Konstrukce stěn — výměra je čistá podlahová plocha, ne zastavěná plocha",
  ],

  coOvlivnujeHodnotu: [
    "Dispozice bytu (1+kk vs. 4+kk) — dispozice silně koreluje s výměrou",
    "Lokalita a zástavba — panelové byty mají stanovenou typizovanou výměru, cihlové jsou variabilnější",
    "Stáří budovy — bytový fond z 60.–80. let má specifické výměry dle tehdejších norem",
    "Přestavby a rekonstrukce — příčkové úpravy mohou výměru formálně nezměnit, ale dispozičně ano",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Medián výměry ze skutečných prodejních nabídek na Sreality.cz, filtrovaných podle 
      dispozice a krajského města. Filtr: starší byty (bez novostaveb), osobní vlastnictví, 
      velmi dobrý/dobrý stav nebo po rekonstrukci.
    `,
    procTatoMetoda: `
      Výměra bytu je faktem, nikoli odhadem — inzerenti uvádí skutečná čísla z katastru 
      nebo z listu vlastnictví. Mediánová hodnota ze stovek nabídek reflektuje typický byt,
      který uživatel naší kalkulačky zvažuje koupit. Jedná se o přímé pozorování trhu.
    `,
    presnost: `
      Vysoká pro dispozice s dostatečným vzorkem (N > 50). Chyba mediánu je obvykle ±2–3 m².
      Pro malé vzorky (N < 30, zejména 1+kk a 4+kk v menších městech) je chyba vyšší — ±5–10 m².
    `,
    kdyNeniPresna: [
      "Malá krajská města s nízkým počtem inzerátů (N < 15): HK 1+kk (N=7), Pardubice 1+kk (N=10), Jihlava 1+kk (N=5), Ústí n.L. 3+kk (N=6)",
      "Ústí nad Labem 4+kk: 0 aktivních nabídek v dubnu 2026 — záložní hodnota 94 m² ze staršího datasetu",
      "Karlovy Vary: atypicky velké byty ve všech dispozicích (specifický lázeňský bytový fond) — hodnoty jsou pravděpodobně správné, ale kupniCena a najemne pro KV bude výrazně nadprůměrná",
      "Karlovy Vary 1+kk: velká změna mezi scrapes (29→39 m²) — doporučeno ověřit příštím scrape",
    ],
    vzorec: `
      squareMeters[město][dispozice] = medián(výměra_m² ze všech inzerátů na Sreality.cz 
        kde město = daný slug 
        AND dispozice = daná dispozice 
        AND typ = 'prodej' 
        AND stav ∈ {'velmi dobrý', 'dobrý', 'po rekonstrukci'} 
        AND vlastnictví = 'osobní'
        AND novostavba = false)
    `,
  },

  tooltipText: `Průměrná výměra bytu dané dispozice v tomto městě, vypočtená z reálných nabídek na Sreality.cz. Můžete zadat vlastní hodnotu.`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "Sreality.cz API — prodejní inzeráty, duben 2026",
        url: "https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&per_page=200&...",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Sreality.cz API (neoficiální). List endpoint nevrací pole usable_area přímo —
          výměra je parsována z textového názvu inzerátu, např. "Prodej bytu 2+kk 44 m²"
          (regex: číslo před "m²"). Tato hodnota odpovídá inzerované výměře, nikoli
          katastrální výměře (v praxi téměř vždy shodné pro starší zástavbu).
          Script: scripts/sreality-full-scrape.mjs
          Filtr: category_main_cb=1 (byty), category_type_cb=1 (prodej),
          category_sub_cb=2/4/6/8 (1+kk/2+kk/3+kk/4+kk), bez aukcí,
          name-guard (název musí obsahovat string dispozice).
          Vzorky viz komentáře u jednotlivých hodnot (N = počet inzerátů).
        `,
      },
      {
        nazev: "Sreality.cz — analýza prodejních cen 2+kk v krajských městech, 1. pololetí 2025",
        url: "https://blog.seznam.cz/2025/10/analyza-prodejnich-cen-2kk-v-krajskych-mestech-nejlevneji-vychazi-usti-nad-labem-ostrava-karlovy-vary-plzen-a-liberec/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Sreality.cz publikovala analýzu pro byty 2+kk s výměrou 35–75 m². 
          Tím implikují, že typická 2+kk v analýze je mezi 35–75 m² — konzistentní s naší API hodnotou.
          Analýza nepublikuje průměrné výměry, pouze cenové závěry.
        `,
      },
    ],

    odvozeniHodnoty: `
      Hodnoty pochází z přímého dotazu na Sreality.cz API dne 2026-04-04.
      Script: scripts/sreality-full-scrape.mjs
      Pro každé krajské město a každou dispozici byl vypočten medián výměry ze všech nabídek
      k prodeji. Výměra je parsována z názvu inzerátu (regex na "číslo m²") — Sreality list 
      endpoint neposkytuje pole usable_area přímo.

      Jiný veřejně dostupný zdroj pro tato data neexistuje. ČSÚ ani Flat Zone nepublikují 
      průměrné výměry per dispozici per město. Deloitte Rent Index a CBA Monitor pracují 
      s cenami za m², nikoli s průměrnými výměrami.

      DOPORUČENÍ PRO OBNOVU DAT: Spustit scripts/sreality-full-scrape.mjs.
      Obnova dat doporučena jednou za 2 roky nebo při výrazné změně bytového fondu.

      UPOZORNĚNÍ NA MALÉ VZORKY (duben 2026):
        HK 1+kk (N=7), Pardubice 1+kk (N=10), Jihlava 1+kk (N=5), Jihlava 2+kk (N=13),
        Ústí 3+kk (N=6) — medián u N<15 je nestabilní, ale hodnoty jsou v normálním rozsahu.
        Ústí n.L. 4+kk — 0 nabídek v dubnu 2026; ponecháno 94 m² ze záložního datasetu.
        KV 1+kk (N=17) — hodnota se výrazně změnila (29→39 m²); doporučeno ověřit příštím scrape.

      KARLOVY VARY — ATYPICKY VELKÉ BYTY (potvrzeno stabilní):
        KV 2+kk = 60 m² je konzistentní v obou datacollections (leden 2025 i duben 2026).
        KV 3+kk = 87–88 m², 4+kk = 113–118 m² — výrazně nad průměrem ostatních měst.
        Důvod: KV má specifický bytový fond s větším podílem velkých bytů z lázeňské éry
        (villové domy, přestavby vil na byty). Tato hodnota je pravděpodobně správná,
        ale ovlivňuje kupniCena a najemne — KV 3+kk a 4+kk vychází výrazně dražší.

      ZLÍN 1+kk — INTERPOLACE POTVRZENA:
        Původní API hodnota z ledna 2025: 46 m² (N=25) odmítnuta jako outlier.
        Interpolace: medián z podobných měst → 35 m².
        Duben 2026 scrape: 35 m² (N=11). Interpolovaná hodnota potvrzena.
    `,
  },

  hodnoty: squareMetersValues,
};
