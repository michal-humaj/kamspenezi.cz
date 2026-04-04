/**
 * Očekávaná průměrná roční inflace — předpoklad pro 30letý horizont kalkulačky.
 *
 * ZVOLENÁ HODNOTA: 2,0 % p.a.
 *
 * PROČ 2,0 % JE NEJPŘESNĚJŠÍ PŘEDPOVĚĎ NA 30 LET:
 *
 *   (1) Inflační cíl ČNB = 2,0 %
 *       Česká národní banka má od roku 2010 explicitní inflační cíl 2 % s tolerančním
 *       pásmem ±1 p.b. ČNB aktivně nastavuje měnovou politiku, aby tento cíl dosahovala.
 *       Na 30letém horizontu dominuje cíl centrální banky nad krátkodobými odchylkami.
 *
 *   (2) ČNB prognóza konverguje k cíli:
 *       2026: 1,6 % (přechodně pod cílem — energie, slabá spotřeba)
 *       2027: 2,1 % (prakticky na cíli)
 *       → Prognóza ukazuje rychlý návrat k 2 %. Odchylka roku 2026 je cyklická, ne strukturální.
 *
 *   (3) Tržní inflační očekávání (únor 2026) = ~2,0 %
 *       ČNB průzkum inflačních očekávání finančního trhu (únor 2026): střednědobá
 *       očekávání ~2,0–2,1 %. Trh oceňuje budoucnost, ne historii.
 *
 *   (4) ECB cíl 2,0 % — silná kotva pro ČR
 *       Česká republika je otevřená ekonomika silně provázaná s eurozónou (80 % exportu).
 *       ECB má mandát 2 % inflace. Strukturální konvergence CZ → EU znamená,
 *       že CZ inflace se na dlouhém horizontu pohybuje blízko ECB cíle.
 *
 * EMPIRICKÁ VALIDACE — HISTORICKÁ ČESKÁ INFLACE (ČSÚ):
 *   Průměrná česká inflace 2010–2019 (normální dekáda, pod inflačním cílem 2 %):
 *     2010: 2,30 % | 2011: 2,35 % | 2012: 2,40 % | 2013: 1,43 % | 2014: 0,10 %
 *     2015: 0,00 % | 2016: 2,01 % | 2017: 2,36 % | 2018: 2,02 % | 2019: 3,21 %
 *     → Průměr 2010–2019: 1,82 % p.a. — NIŽŠÍ než cíl 2 %.
 *   Toto potvrzuje, že 2 % je konzervativní horní kotva, ne podhodnocení.
 *   Zdroj: ČSÚ, inflationtool.com/rates/czech-epublic/historical, přístup 2026-04-04.
 *
 * PROČ NE 2,5 % (starý default):
 *   Hodnota 2,5 % byla nastavena v prostředí post-covidové inflace (2024), kdy
 *   inflace teprve klesala z vrcholu. Meziroční maximum bylo ~17,5 % v září 2022;
 *   roční průměr za rok 2022 byl ~15 %. Tato epizoda je historicky výjimečná
 *   (energetická krize, supply chain disruption, covidové transfery).
 *   Pro 30letý výhled není opakování takového šoku strukturálním předpokladem.
 *
 * PROČ NE 1,6 % (ČNB forecast 2026):
 *   Krátkodobá prognóza zachycuje cyklickou pozici (pod cílem kvůli nízké
 *   spotřebě, klesajícím cenám energií). Pro 30letý horizont je irelevantní.
 *
 * STRUKTURÁLNÍ ARGUMENT PRO ČR:
 *   Konvergující ekonomiky (Balassa-Samuelson efekt, B-S) typicky vykazují inflaci
 *   mírně nad ECB cílem. Empirický odhad B-S efektu pro středoevropské ekonomiky:
 *   ~0,2–0,5 p.b. ročně (zdroj: ECB Working Paper Series, Égert & Halpern, "Equilibrium
 *   Exchange Rates in Central and Eastern Europe"). Nicméně:
 *   - Tento efekt slábne s konvergencí k EU úrovni HDP (ČR nyní ~91 % EU průměru)
 *   - Empiricky: česká inflace 2010–2019 průměrovala 1,82 % — tedy POD cílem 2 %, ne nad ním
 *   - ČNB cíluje CPI, ne HICP — metodické rozdíly jsou v ČR malé
 *   - Skutečná data vyvrací "B-S efekt vynucuje přirážku nad 2 %" pro ČR
 *   → 2,0 % je správná kotva i přes B-S efekt. Historická data to potvrzují.
 */

import type { AttributeDoc } from "./_types";

// =============================================================================
// HODNOTA
// =============================================================================

/**
 * Předpokládaná průměrná roční inflace v ČR na 30letém horizontu (% p.a.).
 * Kotva = inflační cíl ČNB (2,0 %), potvrzeno ČNB prognózou na 2027 (2,1 %).
 */
export const ocekavanaInflaceValue: number = 2.0;

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
      Dlouhodobá kotva = inflační cíl ČNB (2,0 %).
      Ověřena krátkodobou prognózou ČNB (2027: 2,1 %) a tržními inflačními očekáváními
      (únor 2026: ~2,0 %).
    `,
    procTatoMetoda: `
      Na 30letém horizontu je nejlepším prediktorem budoucí průměrné inflace explicitní
      cíl centrální banky. ČNB má mandát, nástroje a historii (2010–2024) cílování 2 %.
      Krátkodobé odchylky (2022–2023 energetická krize) jsou statisticky irelevantní
      pro 30letý průměr. Tržní inflační očekávání rovněž konvergují k 2 %, ne k 2,5 %.
    `,
    presnost: `
      Na 30letém horizontu je nejistota ±0,5–1,5 p.b. Obhajitelný rozsah: 1,5–3,5 %.
      Klíčové riziko: trvalé fiskální problémy v ČR nebo eurozóně. Riziko je symetrické —
      jsou scénáře s inflací pod 2 % (japonizace) i nad 3 % (fiskální dominance).
    `,
    kdyNeniPresna: [
      "Trvalý fiskální deficit ČR nad 3 % HDP — inflační prémie 0,3–0,5 p.b.",
      "Přijetí eura v ČR — inflace by se plně konvergovala k eurozónovému průměru (~2 %)",
      "Japonizace ekonomiky — inflace trvale pod cílem (0–1 %)",
      "Globální energetický šok nebo geopolitická dezintegrace — inflace přes 4 % na více let",
    ],
  },

  tooltipText:
    "Předpokládaná průměrná inflace na 30 let. Odpovídá inflačnímu cíli ČNB (2 %) a tržním očekáváním. Výrazná odchylka mění výsledky kalkulačky.",

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
      VÝBĚR HODNOTY:

        Primární kotva: inflační cíl ČNB = 2,0 %
          - ČNB má explicitní mandát a nástroje k dosažení 2 % inflace
          - Na 30letém horizontu přechodné odchylky průměrují se k cíli
          - Alternativní výhled (ČNB prognóza 2027: 2,1 %) potvrzuje 2 % jako střed

        Tržní validace:
          - Inflační očekávání finančního trhu (únor 2026): ~2,0 %
          - Trhy oceňují budoucí inflaci efektivněji než zpětné průměry

        Empirická validace (ČSÚ historická data 2010–2019):
          Průměr 2010–2019 = 1,82 % — NIŽŠÍ než cíl. 2 % je konzervativní, ne optimistická volba.
          Zdroj: ČSÚ / inflationtool.com/rates/czech-epublic/historical (přístup 2026-04-04).

        Proč ne 2,5 % (starý default):
          - Starý default nastaven post-covidově (2024) při inflaci klesající z vrcholu
          - Meziroční maximum v září 2022: ~17,5 %; roční průměr 2022: ~15 %
          - Energetická krize 2022 je statisticky výjimečný event (1× za 50+ let)
          - Pro 30letý výhled je ČNB cíl relevantnější než průměr se zahrnutou extrémní epizodou
          
        Strukturální argument pro ČR:
          - Balassa-Samuelson efekt (B-S): ~0,2–0,3 p.b. nad ECB průměrem
          - Ale: B-S slábne s konvergencí a je menší než nejistota odhadu
          - Přirážka 0,2 p.b. je metodicky nepodstatná pro kalkulačku
          → Výsledek: 2,0 % je správný centrální odhad

        ROZSAH NEJISTOTY:
          Konzervativní (japonizace):     1,5 %
          Centrální odhad (ČNB cíl):      2,0 %
          Mírně vyšší (B-S + fiskál):     2,3 %
          Pesimistický (fiskální dominance): 3,0 %+
    `,
  },

  hodnoty: ocekavanaInflaceValue,
};
