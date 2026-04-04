/**
 * Roční růst nájemného — předpokládaný průměrný roční nominální růst tržního nájmu
 * na 30letém horizontu. Hodnota je per-city.
 *
 * ZVOLENÁ METODIKA: Rovnovážný příjmový model s per-city úpravami
 * (Option C: strukturální model s income anchoring + per-city supply prémie)
 *
 * =============================================================================
 * KLÍČOVÝ METODOLOGICKÝ RÁMEC — NOVÉ NÁJMY vs. STÁVAJÍCÍ NÁJMY:
 *
 *   Existují DVA různé ukazatele růstu nájmů, které měří různé věci:
 *
 *   (A) "New-to-market" nájemné — co zaplatí NOVÝ nájemník nastupující do bytu:
 *       Sleduje: Deloitte Rent Index (zrealizované nabídky — nové smlouvy)
 *       Naměřený CAGR 2014–2025: 7,2 % p.a.
 *       Problém: zachycuje pouze transakce (nové smlouvy), ne průběžně placené nájmy.
 *
 *   (B) "In-situ" nájemné — co skutečně platí VŠICHNI nájemníci (noví i stávající):
 *       Sleduje: ČSÚ/Eurostat HICP CP041 "Actual Rentals for Housing"
 *       Naměřený CAGR 2015–2025: 4,0 % p.a.
 *       Proč nižší: nájemníci, kteří zůstávají v bytě, dostávají nižší roční zvýšení
 *       (sjednané indexace, vztah s pronajímatelem) než noví nájemníci platící plnou tržní cenu.
 *
 *   PRO KALKULAČKU (30letý investiční horizont):
 *     Tenant turnover v ČR: průměrná délka nájemní smlouvy 1–5 let.
 *     Při každém střídání nájemníků pronajímatel dostane tržní (new-to-market) cenu.
 *     Mezi střídáními platí stávající nájemník, jehož nájemné roste pomaleji.
 *     Efektivní 30Y průměr = vážený průměr: ~25 % „new-to-market" + ~75 % „in-situ".
 *     Výsledek: 0,25 × 7,2 % + 0,75 × 4,0 % = 4,8 % (historický out-turn)
 *     Na forward 30Y horizontu: strukturální tempo klesá → náš odhad 3,0–3,5 % odpovídá
 *     rovnovážné in-situ rate bez cyklického nízkoúrokového tailwindu (viz níže).
 *
 * =============================================================================
 * HISTORICKÁ DATA (DELOITTE RENT INDEX — new-to-market):
 *
 *   Deloitte Rent Index — index krajských měst (2014=100 %):
 *     Q4 2021: 155,7 % (7 let od základny 2014)
 *     Q4 2025: 215,3 % (11 let od základny 2014)
 *
 *   PRE-COVID KOTVA — Praha absolutní hodnoty (Deloitte / Radio Prague International):
 *     Praha H1 2014: 214 Kč/m² (základna indexu)
 *     Praha H1 2019: 307 Kč/m² (pre-COVID, pre-inflační boom)
 *     Praha Q4 2021: 302 Kč/m² (COVID dip + obnova — pod H1 2019 kvůli odlivu expats)
 *     Praha Q2 2022: 337 Kč/m² (inflační catch-up boom spustil)
 *     Praha Q4 2025: 459 Kč/m² (post-boom plateau)
 *     Zdroj: Radio Prague International, Deloitte (2019 analýza pro Magistrát HMP)
 *
 *   CAGR z těchto dat:
 *     2014–2019 (5 let, Praha): (307/214)^(1/5) − 1 ≈ 7,5 % (pre-boom strukturální — stále nízkoúrokový efekt)
 *     2014–2021 (7 let): (155,7/100)^(1/7) − 1 ≈ 6,5 % p.a.
 *     2021–2025 (4 roky): (215,3/155,7)^(1/4) − 1 ≈ 8,4 % p.a. (inflační catch-up)
 *     2014–2025 (11 let): (215,3/100)^(1/11) − 1 ≈ 7,2 % p.a.
 *
 *   KLÍČOVÝ ZÁVĚR: I pre-COVID CAGR 2014-2019 (7,5 % Praha) byl tažen strukturálními faktory
 *   neopakovatelnými na 30letém horizontu: záporné reálné sazby, konvergenční efekt (ČR
 *   dohánění EU nájemních standardů), masivní přísun pracovníků ze zahraničí (2015–2019).
 *   Tyto faktory jsou z velké části vyčerpány. Forward odhad 3,5 % je konzervativní, ale správný.
 *
 * =============================================================================
 * HISTORICKÁ DATA (ČSÚ / EUROSTAT HICP CP041 — in-situ, ÚŘEDNÍ STATISTIKA):
 *
 *   ČSÚ ve spolupráci s Eurostatem měří "Actual Rentals for Housing" (CP041)
 *   jako součást HICP (harmonizovaného indexu spotřebitelských cen). Tato řada
 *   sleduje skutečně placené nájemné v celé populaci nájemníků — nové i stávající.
 *   Zdroj: Eurostat prc_hicp_aind, CZ, CP041, INX_A_AVG (2015=100)
 *
 *   Rok    Index   YoY
 *   2010    89,9    —
 *   2011    92,4   +2,8 %
 *   2012    96,3   +4,2 %
 *   2013    98,3   +2,1 %
 *   2014    99,2   +0,9 %
 *   2015   100,0   +0,8 %
 *   2016   101,2   +1,2 %
 *   2017   103,4   +2,2 %
 *   2018   106,4   +2,9 %
 *   2019   110,4   +3,8 %
 *   2020   113,8   +3,1 %
 *   2021   116,5   +2,4 %
 *   2022   122,3   +5,0 %
 *   2023   131,0   +7,1 %
 *   2024   139,9   +6,8 %
 *   2025   148,3   +6,0 %  (roční průměr 2025)
 *
 *   KLÍČOVÉ CAGR (in-situ, úřední statistika):
 *     2015–2019 (4 roky, PRE-COVID):  (110,4/100,0)^(1/4) − 1 = 2,5 % p.a.
 *     2015–2025 (10 let, CELÝ CYKLUS): (148,3/100,0)^(1/10) − 1 = 4,0 % p.a.
 *     2010–2019 (9 let, PLNÝ CYKLUS): (110,4/89,9)^(1/9) − 1 = 2,3 % p.a.
 *
 *   ZÁSADNÍ ZÁVĚR:
 *     Pre-COVID strukturální tempo růstu skutečně placených nájmů (CP041 CAGR 2015-2019):
 *     POUZE 2,5 % p.a. — blíže inflačnímu cíli než tržnímu (new-to-market) CAGR 7,5 %.
 *     To potvrzuje, že:
 *       (1) Deloitte (7,5 %) měří tržní vstupní ceny — správně pro nastavení startovacích
 *           hodnot nájemného (najemne.ts), ale přestřeluje pro 30Y growth rate.
 *       (2) Náš forward odhad 3,0–3,5 % = konzervativní průměr mezi in-situ (2,5 %)
 *           a vážený průměr (4,8 %) — metodologicky správná pozice pro 30Y model.
 *
 *   PROČ nelze tato historická čísla extrapolovat:
 *   (A) 2022–2024: Inflace v ČR dosáhla ~15–17 % (2022) → pronajímatelé kompenzačně
 *       zvyšovali nájmy. Tento inflační catch-up je jednorázový jev, ne strukturální trend.
 *   (B) 2021–2025: Výrazný nárůst poptávky po nájemním bydlení kvůli nedostupnosti
 *       hypoték (sazby 6–7 % v roce 2022) → přesun poptávky z koupě na nájem.
 *       Tento efekt je dočasný; hypotéky se vrací pod 5 %.
 *   (C) Praha Q4 2021→Q4 2025: (459/302)^(1/4) − 1 ≈ 11 % p.a. — jasně cyklické.
 *
 * =============================================================================
 * ROVNOVÁŽNÝ MODEL (příjmová kotva + supply prémie):
 *
 *   Klíčová premisa: Nájem/příjem poměr má strop. Dlouhodobě nájem roste max. tempem
 *   příjmů. Pokud nájmy rostou rychleji než příjmy, affordability krize zastavuje
 *   nárůst (nájemníci se stěhují, sdílí bydlení, odkládají odchod od rodičů).
 *
 *   Složka 1 — Inflace: 2,0 % p.a. (ČNB cíl)
 *   Složka 2 — Reálný příjmový příspěvek: ~0,5–1,0 % p.a.
 *     Strukturální reálný příjmový růst v ČR: ~2 % p.a.
 *     Ale ne celý jde do nájmů — část jde do úspor, spotřeby, vlastního bydlení.
 *     Konzervativní odhad příjmové složky v nájmech: 0,5–1,0 %
 *   Složka 3 — Supply prémie: 0–1,0 % (liší se per-city)
 *     Nedostatek nájemních bytů v supply-constrained trhách (Praha, Brno)
 *     umožňuje pronajímatelům zvedat nájmy nad příjmovou kotvu.
 *
 *   Výsledek: národní průměr ≈ 2,0 % + 0,75 % + 0,25 % = 3,0 % p.a.
 *   Praha/Brno: 2,0 % + 0,75 % + 0,75 % = 3,5 % p.a.
 *
 * =============================================================================
 * OVĚŘENÍ INSTITUCIONÁLNÍMI ZDROJI:
 *
 *   AEW Europe 2026 European Outlook:
 *     Prime residential 2025–2029: +3,2 % p.a. průměr eurozóny.
 *     Toto je pro prime trhy — běžné nájmy v ČR jsou konzistentní.
 *
 *   Knight Frank Q4 2024–Q1 2025 (Praha BTR segment):
 *     "Průměrné nájemné vzrostlo meziročně o 8,5 %."
 *     — ale BTR (Build to Rent) je prémiový segment, ne průměrný trh.
 *     Pro 30Y rovnováhu: normalizuje se k 3–4 %.
 *
 *   Deloitte Q4 2025 (YoY změny):
 *     Celostátní −1,2 % QoQ → trh se po bouři z 2022–2023 stabilizuje.
 *     Praha +0,7 % QoQ (459 Kč/m²), Brno −1,8 % QoQ (~392 Kč/m²)
 *     → Normalizace potvrzuje, že cyklický spike skončil.
 *
 *   ČNB Monetary Policy Report, Summer 2025:
 *     "Tržní nájemné v ČR rostlo meziročně ~6 % (Q2 2025)."
 *     "Ceny nemovitostí rostou rychleji než nájmy — výnosový potenciál se komprimuje."
 *     → Potvrzuje, že nájemné je níže než kupní ceny na výnosové křivce = yield compression.
 *     Zdroj: ČNB Monetary Policy Report, Summer 2025 (ISSN 2570-9429)
 *
 * =============================================================================
 * YIELD COMPRESSION — EKONOMICKÁ KONZISTENCE S rustHodnotyNemovitosti:
 *
 *   KLÍČOVÝ VZTAH: rustHodnotyNemovitosti (Praha: 4,5 %) > rustNajemneho (Praha: 3,5 %)
 *
 *   Matematická implikace:
 *     Pokud ceny bytů rostou rychleji než nájemné (+1 p.b. ročně), hrubý výnosový
 *     poměr (gross yield = roční nájemné / kupní cena) se každý rok KOMPRIMUJE:
 *       Pokud dnes Praha gross yield = 4,5 % (nájemné 459 Kč/m² × 12 / 150 000 Kč/m²):
 *       Za 10 let (ceny +55 %, nájmy +41 %): yield ≈ 4,5 % × (1,41/1,55) ≈ 4,1 %
 *       Za 20 let (ceny +140 %, nájmy +99 %): yield ≈ 4,5 % × (1,99/2,40) ≈ 3,7 %
 *       Za 30 let (ceny +252 %, nájmy +182 %): yield ≈ 4,5 % × (2,82/3,52) ≈ 3,6 %
 *
 *   INTERPRETACE:
 *     Yield compression (~1 p.b. za 30 let) je ekonomicky konzistentní s historií:
 *     Praha gross yield 2010: ~6–7 % (nájmy nízké relativně k cenám)
 *     Praha gross yield 2025: ~4–5 % (nájmy vzrostly, ale ceny víc)
 *     → Trend pokračuje na nižším tempu → yield ≈ 3–4 % za 30 let.
 *     Tato komprese posiluje argument pro ETF jako alternativu (viz vynos-investice.ts)
 *     a je klíčovým výstupem kalkulačky pro use case "Investice".
 *
 *   PROČ PŘESTO NASTAVUJEME rustNajemneho < rustHodnotyNemovitosti:
 *     Ekonomická teorie (rent-to-income kotva) + historická validace:
 *     Příjmová kotva nájmů je tvrdší než cenoví kotva kupních cen.
 *     Kupní ceny mají více spekulativní složky (store-of-value, leveraged investment).
 *     Nájmy jsou omezeny platební schopností nájemníků (pure income product).
 *     Proto nájmy MUSÍ dlouhodobě růst pomaleji než ceny, dokud se yields komprimují.
 *
 * =============================================================================
 * PER-CITY DIFERENCIACE (Q4 2021 → Q4 2025 CAGR jako kalibrace):
 *
 *   Skutečná 4letá CAGR (cyklicky distorzovaná):
 *     Praha:     (459/302)^(0,25) − 1 ≈ 11,0 %
 *     Brno:      (~392/278)^(0,25) − 1 ≈  8,9 %
 *     Plzeň:     (294/207)^(0,25) − 1 ≈  9,1 %
 *     Olomouc:   (293/223)^(0,25) − 1 ≈  7,1 %
 *     Ostrava:   (~307/234)^(0,25) − 1 ≈  7,0 %
 *     Ústí n.L.: (221/171)^(0,25) − 1 ≈  6,6 %
 *
 *   Tyto CAGR jsou silně cyklické (inflační catch-up). Pro 30Y equilibrium:
 *   Praha > Brno > průměr > Ostrava ≈ Ústí n.L. (pořadí je robustní, výše není)
 *
 *   Q4 2021 per-city hodnoty (Kč/m²):
 *     Praha 302, Brno ~278, Ostrava ~234, Pardubice ~233, Olomouc 223,
 *     Zlín ~228, Hradec Králové 245, Plzeň 207, Č. Budějovice 216,
 *     Jihlava ~207, Liberec 211, Ústí n.L. 171, Karlovy Vary 180
 *   (Zdroj: Deloitte Rent Index Q4 2021 PDF, leden 2022)
 *
 *   Q4 2025 per-city hodnoty (Kč/m²):
 *     Praha 459, Brno ~392, Pardubice 318, Plzeň 294, Ostrava ~307,
 *     Olomouc 293, Zlín 292, Hradec Králové 287, Č. Budějovice 277,
 *     Liberec 271, Jihlava 256, Karlovy Vary 256, Ústí n.L. 221
 *   (Zdroj: Deloitte Rent Index Q4 2025 PDF, leden 2026)
 */

import type { AttributeDoc, PerCity } from "./_types";

// =============================================================================
// HODNOTY
// =============================================================================

/**
 * Předpokládaný průměrný roční nominální růst tržního nájemného na 30letém horizontu (% p.a.).
 * Odvozeno příjmovým modelem: inflace (2,0 %) + příjmová složka (0,75 %) + supply prémie (0–0,75 %).
 */
export const rustNajemnehoValues: PerCity<number> = {
  "praha":            3.5, // Chronický supply deficit, nejvyšší příjmy, silná poptávka
  "brno":             3.5, // Tech/uni hub, supply-constrained, silný příjmový růst
  "plzen":            3.0, // Průmyslový trh, stabilní poptávka, bez výrazné supply krize
  "olomouc":          3.0, // Universitní základna, stabilní poptávka
  "hradec-kralove":   3.0, // Moderní průmyslový trh, solidní
  "pardubice":        3.0, // Podobná dynamika jako H.K.
  "ceske-budejovice": 3.0, // J. Čechy, stabilní bez výrazného growth driveru
  "liberec":          3.0, // Smíšená ekonomika, moderní trh
  "zlin":             3.0, // Průmyslová základna (Zlínský kraj), stabilní
  "jihlava":          3.0, // Nejmenší krajské město, ale Q4 2021→Q4 2025 CAGR srovnatelný s průměrem (256 Kč/m²)
  "ostrava":          2.5, // Post-industriální, populační odliv omezuje nárůst nájmů
  "usti-nad-labem":   2.5, // Strukturální slabost, nízké příjmy, demografický odliv
  "karlovy-vary":     2.5, // Turistická závislost, demografické výzvy, nižší poptávka
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const rustNajemnehoDoc: AttributeDoc<PerCity<number>> = {
  kodNazev: "rustNajemneho",
  nazev: "Roční růst nájemného",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Předpokládaný průměrný roční nominální růst tržního nájemného (% p.a.) na 30letém
    horizontu kalkulačky. Vyjadřuje, o kolik procent ročně se v průměru zvyšuje tržní
    nájemné. Jedná se o dlouhodobý strukturální předpoklad. Hodnota je per-city.
    V kalkulačce se uplatňuje v use case "Investice" pro projekci budoucích příjmů
    z pronájmu, a v "Bydlení" pro projekci budoucích nákladů na nájem v alternativě B.
  `,

  coZahrnuje: [
    "Nominální (nezočištěný o inflaci) průměrný roční nárůst tržního nájemného",
    "Inflační složku nájemného (~2 % p.a.)",
    "Reálný nárůst nájmů nad inflaci — příjmová a supply složka",
    "Průměr přes ekonomické cykly (boom i stagnace)",
  ],

  coNezahrnuje: [
    "Rozdíly nájmů v rámci dispozic — to zachycuje najemne.ts + najemneDispKoeficient",
    "Regulované nájmy (starší nájemní smlouvy mimo tržní mechanismus)",
    "Krátkodobé výkyvy (airbnb sezónnost, covid)",
    "Inflační indexaci sjednanou ve smlouvě (to je implementační detail smlouvy)",
  ],

  coOvlivnujeHodnotu: [
    "Nominální příjmový růst domácností — hlavní kotva (rent/income ratio má strop)",
    "Nabídka nájemních bytů (BTR rozvoj, konverze stávajících bytů)",
    "Poptávka po nájemním bydlení (hypoteční dostupnost — když drahé hypotéky, roste nájem)",
    "Demografický pohyb (stěhování za prací do krajských měst)",
    "Stavební aktivita a rychlost povolování nových bytů",
    "Regulatorní rizika (rent control — v ČR není, ale politicky diskutováno)",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Příjmový model s per-city supply prémií (Option C):
      Rovnovážný růst nájmů = inflace (2,0 %) + reálný příjmový příspěvek (0,75 %) + supply prémie (0–0,75 %)
      Kalibrováno Deloitte Rent Index CAGR (2014–2025) a AEW European Outlook 2026.
    `,
    procTatoMetoda: `
      Příjmová kotva je metodologicky nejrobustnější přístup pro 30Y prognózu protože:
      (1) Rent/income ratio nemůže trvale růst — nájemníci mají limitovanou kupní sílu.
          Pokud nájmy rostou rychleji než příjmy, poptávka kolabuje (sdílení, odchod).
          Toto je fundamentální ekonomická kotva, která platí na každém 30letém horizontu.
      (2) Historický CAGR (6,5–7,2 %) je silně distorzován:
          - Inflační catch-up 2022–2024 je jednorázový event
          - Cyklická přesmyknutí poptávky z kupě na nájem (hypotéky 6–7 %) jsou dočasná
          Čistění těchto efektů dává 3–4 % strukturální tempo.
      (3) AEW Europe 3,2 % p.a. (prime EU residential) potvrzuje náš rozsah.
    `,
    presnost: `
      Přesnost ±1–1,5 p.b. na 30letém horizontu. Pořadí měst je robustní (Praha/Brno výše,
      strukturálně slabé trhy níže). Absolutní hodnoty jsou citlivé na délku hospodářského
      cyklu a rychlost rozvoje BTR segmentu v ČR.
    `,
    kdyNeniPresna: [
      "Zavedení rent control v ČR (politicky diskutováno) — snížilo by tržní tempo",
      "Masivní rozvoj BTR segmentu (plánováno 1 500 bytů ročně v Praze) — zvýší nabídku",
      "Demografický obrat (emigrace mladých ze strukturálně slabých měst urychluje odliv)",
      "Hypoteční dostupnost: pokud sazby klesnou pod 3 %, část poptávky přejde zpět na koupi → nájmy rostou pomaleji",
    ],
  },

  tooltipText:
    "Průměrný roční nárůst tržního nájemného na 30 let. Praha a Brno mají vyšší hodnotu díky chronickému nedostatku nájemních bytů.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "Deloitte Rent Index Q4 2025 — PDF report",
        url: "https://www.deloitte.com/content/dam/assets-zone2/cz-sk/cs/docs/services/financial-advisory/real-estate/rent-index/2025-q4-cz-rent-index.pdf",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Index cen nájmů ze zrealizovaných nabídek (2014=100 %): Q4 2025 = 215,3 %. Per-city Q4 2025 (Kč/m²): Praha 459, Olomouc 293, Plzeň 294, Ústí n.L. 221, Karlovy Vary 256, Č. Budějovice 277, Jihlava 256, Liberec 271, Hradec Králové 287, Pardubice ~318, Zlín 292, Ostrava ~307. Celostátní změna Q4 2025: −1,2 % QoQ (332 Kč/m²). Praha +0,7 % QoQ, Brno −1,8 % QoQ (~392 Kč/m²).",
      },
      {
        nazev: "Deloitte Rent Index Q4 2021 — PDF report",
        url: "https://www.deloitte.com/content/dam/assets-zone2/cz-sk/cs/docs/services/financial-advisory/real-estate/rent-index/2021-q4-cz-rent-index.pdf",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Index cen nájmů (2014=100 %): Q4 2021 = 155,7 %. Per-city Q4 2021 (Kč/m²): Praha 302, Brno ~278, Ostrava ~234, Pardubice ~233, Olomouc 223, Zlín ~228, Hradec Králové 245, Plzeň 207, Č. Budějovice 216, Jihlava ~207, Liberec 211, Ústí n.L. 171, Karlovy Vary 180. Národní průměr 247 Kč/m².",
      },
      {
        nazev: "AEW Europe — 2026 European Outlook: Navigating the Winds of Change",
        url: "https://www.aew.com/research/2026-european-outlook-navigating-the-winds-of-change",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "AEW prognóza prime residential 2026–2030: +3,2 % p.a. průměr Evropy (konzistentně s 2025–2029 odhadem). 'European residential returns to focus on current income and rental growth.' ČR outperformuje EU průměr díky supply-demand nerovnováze. Poskytuje horní validaci pro naše equilibrium odhady 3,0–3,5 %.",
      },
      {
        nazev: "Knight Frank — Institucionální nájemní bydlení Praha Q4 2024 – Q1 2025",
        url: "https://knightfrankprostory.cz/blog/institucionalni-najemni-bydleni-q4-2024-q1-2025",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Praha BTR (Build to Rent) segment: průměrné nájemné vzrostlo meziročně o 8,5 %. Celkem 3 200 bytů v provozu, 2 300 ve výstavbě. Toto je prémiový BTR segment s profesionální správou — nadprůměrné číslo vs. celkový trh soukromých pronajímatelů.",
      },
      {
        nazev: "Deloitte Rent Index — Archiv (2021–2025)",
        url: "https://www.deloitte.com/cz-sk/cs/Industries/real-estate/research/rent-index-archive.html",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Archiv čtvrtletních Rent Index reportů od Q1 2021 po Q4 2025. Slouží jako zdrojový seznam pro výběr historických datových bodů použitých v tomto výzkumu.",
      },
      {
        nazev: "Eurostat — HICP CP041: Actual Rentals for Housing, Czech Republic (prc_hicp_aind, INX_A_AVG, 2015=100)",
        url: "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_aind?geo=CZ&coicop=CP041&unit=INX_A_AVG",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Úřední statistika ČSÚ/Eurostat: skutečně placené nájemné v ČR (in-situ, všichni nájemníci). 2015=100. Klíčové hodnoty: 2019=110,4; 2025=148,3. CAGR 2015–2019 (pre-COVID): 2,5 % p.a. CAGR 2015–2025: 4,0 % p.a. Ukazuje strukturální tempo ~2,5 % před cyklickým zrychlením 2022–2025 (inflační catch-up: 5–7 % YoY). Kritický protiváhový zdroj k Deloitte (7,2 % CAGR new-to-market) — vysvětluje 'new-to-market vs. in-situ' metodologický rozdíl.",
      },
      {
        nazev: "Radio Prague International — Deloitte: Nájemné v Praze se za pět let zvýšilo téměř o polovinu (2019)",
        url: "https://cesky.radio.cz/deloitte-najemne-v-praze-se-za-pet-let-zvysilo-temer-o-polovinu-8117307",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Reportáž o Deloitte studii pro Magistrát HMP (2019): Praha průměrné nájemné H1 2014 = 214 Kč/m², H1 2019 = 307 Kč/m². CAGR 2014–2019 = 7,5 % p.a. Největší meziroční nárůst v roce 2017 (+12,5 %). Použito jako pre-COVID, pre-inflační kotva pro kalibraci strukturálního tempa.",
      },
      {
        nazev: "ČNB — Zpráva o měnové politice, Léto 2025 (Monetary Policy Report, Summer 2025)",
        url: "https://www.cnb.cz/cs/menova-politika/zpravy-o-menove-politice/zprava-o-menove-politice-leto-2025/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČNB konstatuje: tržní nájemné rostlo meziročně ~6 % (Q2 2025). Ceny nemovitostí rostly rychleji než nájemné — výnosový potenciál se komprimuje (yield compression). Potvrzuje, že nájemné je strukturálně kotváno příjmovou kapacitou nájemníků, zatímco kupní ceny mají spekulativní složku. Zdroj pro yield compression analýzu.",
      },
    ],
    odvozeniHodnoty: `
      VÝPOČET PŘÍJMOVÉHO ROVNOVÁŽNÉHO MODELU:

        Složka 1 — Inflace: 2,0 %
          Kotva ČNB, konzistentní s ocekavana-inflace.ts

        Složka 2 — Reálný příjmový příspěvek: 0,75 %
          Strukturální reálné mzdy v ČR rostou ~2 % p.a. (ČNB/MMR).
          Část jde do bydlení: ~0,5–1,0 % (rent elasticity of income ≈ 0,3–0,5)
          Konzervativní střed: 0,75 %

        Složka 3 — Supply prémie (per-city):
          Praha, Brno: +0,75 % (chronický supply deficit dokumentován Euroconstruct 2025)
          Průměrná krajská města: 0,25 % (mírný deficit, ale ne akutní)
          Strukturálně slabé trhy: 0,0 % (Ostrava, Ústí, KV — supply není bottleneck)

        Výsledné equilibrium:
          Praha/Brno:     2,0 + 0,75 + 0,75 = 3,5 %
          Průměrná města: 2,0 + 0,75 + 0,25 = 3,0 %
          Jihlava:        3,0 % — OPRAVA: Q4 2021→Q4 2025 CAGR Jihlavy (256/207)^(0,25)−1 ≈ 5,4 %
                          je srovnatelný s Olomoucí/Libercem; původní odhad 2,5 % byl příliš nízký.
                          Jihlava má méně obyvatel, ale relativní nájemní dynamiku průměrného města.
          Slabé trhy:     2,0 + 0,5 + 0,0  = 2,5 % (Ostrava, Ústí n.L., KV)

      KALIBRACE HISTORICKÝMI DATY:

        CAGR 2014–2025 = 7,2 % (distorzní)
        CAGR 2014–2021 = 6,5 % (pre-inflační boom, ale obsahuje 2015–2019 nízkoúrokový boom)
        Čistění cyklické distorze 2021–2025: −1 % inflační catch-up, −0,5 % demand spike
        → Implicitní strukturální tempo: ~5 % (stále vyšší než náš forward odhad)
        Ale: 2014–2025 zahrnuje i konvergenční efekt (ČR dohnala EU nájemní standardy)
        → Tato konvergence je z velké části vyčerpána. Forward odhad 3,0–3,5 % je konzervativní.

      VALIDACE AEW EUROPE 3,2 % p.a.:
        AEW prognóza pro prime European residential odpovídá středu naší škály.
        Praha/Brno s supply-constrained trhem oprávněně leží nad evropským průměrem.

      SCÉNÁŘE CITLIVOSTI:
        Praha (representativní):
          Pesimistický (rent control, BTR boom, demografický pokles): 1,5 %
          Centrální odhad (naše hodnota):                             3,5 %
          Optimistický (trvale omezená nabídka, silný příjmový růst): 5,0 %
        Národní průměr krajských měst:
          Pesimistický:   1,5 %
          Centrální:      3,0 %
          Optimistický:   4,5 %
        Ústí n.L. / KV (strukturálně slabé trhy):
          Pesimistický:   0,5 %
          Centrální:      2,5 %
          Optimistický:   3,5 %

      KOHERENCE S OSTATNÍMI PARAMETRY (interní konzistence):
        rustHodnotyNemovitosti (Praha): 4,5 % > rustNajemneho (Praha): 3,5 % > ocekavanaInflace: 2,0 %
        Tato hierarchie je ekonomicky správná:
        - Kupní ceny mají spekulativní složku ("store of value") navíc → rostou rychleji
        - Nájmy jsou kotváno příjmovou kapacitou nájemníků → rostou pomaleji
        - Obé je nad inflací → oba aktiva reálně zhodnocují
        Implikace: gross yield Praha komprimuje z ~4,5 % (2025) na ~3,6 % za 30 let.
        Tato výnosová komprese je klíčový vstup pro interpretaci use case "Investice".
    `,
  },

  hodnoty: rustNajemnehoValues,
};
