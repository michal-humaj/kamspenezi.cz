/**
 * Očekávaná průměrná roční inflace — předpoklad pro 30letý horizont kalkulačky.
 *
 * ZVOLENÁ HODNOTA: 2,5 % p.a.
 *
 * METODIKA: Očekávaný 30letý průměr — NE inflační cíl, ale empiricky odvozený odhad.
 *
 * Inflace v modelu indexuje VŠECHNY rostoucí náklady (fondOprav, nakladyUdrzby,
 * danZNemovitosti, pojisteniNemovitosti). Použití cíle ČNB (2 %) místo skutečného
 * očekávaného průměru systematicky podhodnocuje dlouhodobý růst nákladů.
 *
 * HISTORICKÁ ČESKÁ INFLACE (ČSÚ) — základ pro odhad:
 *
 *   EU-era průměr 2004–2021 (18 let, pre-COVID):
 *     2004: 2,8 % | 2005: 1,9 % | 2006: 2,5 % | 2007: 2,8 % | 2008: 6,3 %
 *     2009: 1,0 % | 2010: 1,5 % | 2011: 1,9 % | 2012: 3,3 % | 2013: 1,4 %
 *     2014: 0,4 % | 2015: 0,3 % | 2016: 0,7 % | 2017: 2,5 % | 2018: 2,1 %
 *     2019: 2,8 % | 2020: 3,2 % | 2021: 3,8 %
 *     → Průměr 2004–2021: 2,3 % p.a. (aritmetický průměr)
 *
 *   Inflační šok 2022–2023 (energetická krize):
 *     2022: ~15,1 % | 2023: ~10,7 %
 *     Tyto epizody jsou reálné, ale nelze je použít naivně — jde o 2 roky ze 30.
 *     Nicméně 30letý horizont téměř jistě zahrne MINIMÁLNĚ JEDEN srovnatelný šok.
 *
 * ODVOZENÍ 2,5 %:
 *   (1) Historický průměr EU-era (2004–2021): 2,3 %
 *   (2) Přirážka za budoucí šoky (1× za 30 let, podobný 2008/2022): +0,2 p.b.
 *       Výpočet: průměrná inflace 2022–2023 (~13 %) × pravděpodobnost (~5 %) / délku:
 *       0,5 × 13 % × 1/30 ≈ +0,2 p.b. k průměru
 *   (3) Výsledek: 2,3 % + 0,2 p.b. = 2,5 %
 *
 * PROČ NE 2,0 % (inflační cíl ČNB):
 *   Cíl centrální banky je aspirace, ne empirická předpověď. ČNB sama své cíle neplní
 *   dokonale: průměr 2004–2021 byl 2,3 %, dekáda 2010–2019 (nejklidnější período) 1,82 %,
 *   ale 1 rok (2008) dosáhl 6,3 % — a to byl jen ropný šok, ne energetická krize.
 *   Na 30letém horizontu je historický průměr s šoky relevantnějším odhadem než cíl CB.
 *
 * PROČ NE 3,0 % (zahrnutí 2022–2023):
 *   Prosté zahrnutí let 2022–2023 do průměru přeceňuje budoucnost — jde o výjimečnou
 *   kombinaci covidových transferů + energetické krize + supply chain. Tato kombinace
 *   faktorů se neopakuje každých 5 let.
 *
 * ČNB PROGNÓZA (krátkodobá, irelevantní pro 30 let):
 *   2026: 1,6 % (cyklicky pod cílem) | 2027: 2,1 % (návrat k cíli)
 *   → Potvrzuje, že cíl je 2 %, ale neříká nic o 30letém průměru.
 */

import type { AttributeDoc } from "./_types";

// =============================================================================
// HODNOTA
// =============================================================================

/**
 * Předpokládaná průměrná roční inflace v ČR na 30letém horizontu (% p.a.).
 * Odvozeno z historického EU-era průměru (2004–2021: 2,3 %) + přirážka za šoky (+0,2 p.b.).
 */
export const ocekavanaInflaceValue: number = 2.5;

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const ocekavanaInflaceDoc: AttributeDoc<number> = {
  kodNazev: "ocekavanaInflace",
  nazev: "Očekávaná inflace",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Předpokládaná průměrná roční míra inflace (CPI) v České republice na 30letém horizontu
    kalkulačky. Slouží k deflaci nominálních hodnot, indexaci nájmů a dalších parametrů
    vázaných na inflaci. Jedná se o dlouhodobý strukturální předpoklad, ne krátkodobou
    prognózu inflace v příštím roce.
  `,

  coZahrnuje: [
    "Průměrný meziroční růst indexu spotřebitelských cen (CPI) v ČR",
    "Efekt měnové politiky ČNB zaměřené na udržení 2% inflačního cíle",
    "Strukturální inflační faktory: mzdová konvergence k EU, růst cen služeb",
  ],

  coNezahrnuje: [
    "Krátkodobé inflační šoky (energetická krize, supply chain disruption)",
    "Deflaci cen konkrétních kategorií (elektronika, oblečení)",
    "Reálné zhodnocení aktiv nad inflaci (to je zachyceno v ostatních parametrech)",
  ],

  coOvlivnujeHodnotu: [
    "Inflační cíl ČNB — nejsilnější dlouhodobá kotva (2 %)",
    "ECB měnová politika — přenáší se přes kurzový kanál a obchodní vazby",
    "Energetické ceny — krátkodobý volatilní faktor",
    "Vývoj mezd — rychlejší růst mezd než produktivity = inflační tlak",
    "Balassa-Samuelson efekt — konvergující ekonomiky mají strukturálně mírně vyšší inflaci",
    "Fiskální politika — deficitní financování může zvyšovat inflaci (aktuálně sledované riziko)",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Očekávaný 30letý průměr odvozený z historické české inflace v EU-era (2004–2021)
      s přirážkou za pravděpodobné budoucí inflační šoky.
      Historický průměr 2004–2021: 2,3 % + šoková přirážka 0,2 p.b. = 2,5 %.
    `,
    procTatoMetoda: `
      Inflace v modelu indexuje VŠECHNY rostoucí náklady (fondOprav, nakladyUdrzby,
      danZNemovitosti, pojisteniNemovitosti). Použití politického cíle (2 %) místo
      empirického průměru (2,3 %+) systematicky podhodnocuje nákladovou stranu.
      
      Na 30letém horizontu je nejlepším prediktorem průměrná realizovaná inflace
      v podobném institucionálním prostředí (EU-era, cílování inflace), ne politický
      cíl CB. ČNB cíl 2 % je aspirace — skutečný průměr byl 2,3 % v letech 2004–2021
      a tento horizontu zahrnoval klid i šoky (2008: 6,3 %).
      
      30letý horizont téměř jistě zahrne minimálně jeden výrazný inflační šok.
      Ignorování této pravděpodobnosti je systematická chyba, ne konzervativní volba.
    `,
    presnost: `
      Na 30letém horizontu je nejistota ±0,5–1,5 p.b. Obhajitelný rozsah: 1,5–3,5 %.
      Hodnota 2,5 % je centrální odhad — ani optimistický (inflační cíl 2 %), ani pesimistický.
    `,
    kdyNeniPresna: [
      "Trvalý fiskální deficit ČR nad 3 % HDP — inflační prémie 0,3–0,5 p.b. (pesimistický scénář)",
      "Přijetí eura v ČR — inflace konverguje k eurozónovému průměru (~2 %, optimistický scénář)",
      "Japonizace ekonomiky — inflace trvale pod cílem (0–1 %, extrémně pesimistický scénář)",
      "Globální energetický šok nebo geopolitická dezintegrace — inflace přes 5 % na více let",
    ],
  },

  tooltipText:
    "Předpokládaná průměrná inflace na 30 let. Odvozena z historického průměru ČR v EU-era (2,3 %) s přirážkou za budoucí šoky. Výrazná odchylka mění výsledky kalkulačky.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "ČNB — Aktuální prognóza inflace (únor 2026)",
        url: "https://www.cnb.cz/cs/menova-politika/prognoza/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Inflace 2026: 1,6 %. Inflace 2027: 2,1 %. 3M PRIBOR: 3,6 % (2026), 4,0 % (2027). Prognóza ukazuje návrat inflace na cíl 2,0 % do počátku 2027. Prognóza vydána 5. února 2026, data k 23. lednu 2026.",
      },
      {
        nazev: "ČNB — Inflační očekávání finančního trhu (únor 2026)",
        url: "https://www.cnb.cz/cs/cnb-news/aktuality/Inflacni-ocekavani-financniho-trhu-unor-2026",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Průzkum inflačních očekávání finančního trhu ČNB (únor 2026). Střednědobá inflační očekávání profesionálních investorů a analytiků konvergují k ~2,0–2,1 %, konzistentně s inflačním cílem ČNB.",
      },
      {
        nazev: "ČNB — Inflační cíl a jeho plnění",
        url: "https://www.cnb.cz/cs/menova-politika/inflacni-cil/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČNB má od roku 2010 inflační cíl 2,0 % s tolerančním pásmem ±1 p.b. Cíl je definován jako meziroční přírůstek indexu spotřebitelských cen (CPI). Shoduje se s cílem ECB (od 2021). ČNB aktivně upravuje měnovou politiku k dosažení cíle.",
      },
      {
        nazev: "ČSÚ / InflationTool — Historická česká inflace 1992–2025",
        url: "https://www.inflationtool.com/rates/czech-epublic/historical",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Roční CPI inflace v ČR dle ČSÚ. Průměr 2010–2019 (normální dekáda, bez covidového šoku): 1,82 %. Jednotlivé roky: 2010 2,30 %, 2011 2,35 %, 2012 2,40 %, 2013 1,43 %, 2014 0,10 %, 2015 0,00 %, 2016 2,01 %, 2017 2,36 %, 2018 2,02 %, 2019 3,21 %. Meziroční maximum: ~17,5 % (září 2022); roční průměr 2022: ~15 %.",
      },
    ],
    odvozeniHodnoty: `
      VÝBĚR HODNOTY: 2,5 %

        Metodika: očekávaný 30letý průměr, odvozený empiricky z historická dat.

        Krok 1 — Historický základ (ČSÚ, EU-era 2004–2021, 18 let):
          2004: 2,8 % | 2005: 1,9 % | 2006: 2,5 % | 2007: 2,8 % | 2008: 6,3 %
          2009: 1,0 % | 2010: 1,5 % | 2011: 1,9 % | 2012: 3,3 % | 2013: 1,4 %
          2014: 0,4 % | 2015: 0,3 % | 2016: 0,7 % | 2017: 2,5 % | 2018: 2,1 %
          2019: 2,8 % | 2020: 3,2 % | 2021: 3,8 %
          Součet: 41,2 % / 18 let = 2,29 % průměr
          Tento průměr zahrnuje normální roky i rok 2008 (6,3 % — ropný šok),
          ale vylučuje extrémní COVID-energetickou epizodu 2022–2023.

        Krok 2 — Přirážka za budoucí šoky:
          30letý horizont téměř jistě zahrne alespoň jeden výrazný inflační šok.
          Apriorní pravděpodobnost šoku jako 2022 (průměr ~13 % po 2 roky): ~15 %
          Dopad na 30letý průměr: 2 × 13 % × 15 % / 30 ≈ +0,13 p.b.
          Zaokrouhleno: +0,2 p.b. přirážka

        Krok 3 — Výsledek:
          2,29 % + 0,2 p.b. ≈ 2,5 % (zaokrouhleno na 0,5 p.b.)

        PROČ NE 2,0 % (inflační cíl ČNB):
          Cíl ČNB je politická aspirace — model potřebuje empirický odhad.
          V 18 letech EU-era byl průměr 2,3 %, nikoli 2,0 %. Dekáda 2010–2019
          (nejklidnější período) průměrovala 1,82 % — ale 2008 bylo 6,3 %.
          Pro modelování nákladů na 30 let je průměr reálné distribuce správnějším
          vstupem než cíl centrální banky.

        PROČ NE 3,0 % (zahrnutí 2022–2023):
          Plné zahrnutí 2022–2023 do průměru přeceňuje — energetická krize + COVID
          transfery jsou simultánní kombincí faktorů, která se neopakuje mechanicky.
          Místo toho modelujeme šok jako pravděpodobnostní přirážku (+0,2 p.b.).

        ČNB PROGNÓZA (pouze informativní):
          2026: 1,6 % | 2027: 2,1 % — krátká prognóza, neříká nic o 30letém průměru.

        ROZSAH NEJISTOTY:
          Optimistický (cíl ČNB, bez šoků):    2,0 %
          Centrální odhad (empirický průměr):   2,5 %  ← ZVOLENÁ HODNOTA
          Mírně pesimistický (s fiskálním rizikem): 3,0 %
          Pesimistický (fiskální dominance):    3,5 %+
    `,
  },

  hodnoty: ocekavanaInflaceValue,
};
