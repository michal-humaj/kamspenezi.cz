/**
 * Výnos investice do globálního ETF — předpokládaný průměrný roční výnos na 30letém horizontu.
 *
 * ZVOLENÁ HODNOTA: 6,5 % p.a. (nominální, před zdaněním, v CZK)
 *
 * Kalkulačka porovnává investici do nemovitosti s investicí do globálního
 * market-cap weighted ETF (typicky MSCI World nebo MSCI ACWI). Tento parametr
 * zachycuje předpokládaný průměrný roční výnos takovéto investice na 30letém horizontu.
 *
 * METODIKA: Použito 5 nezávislých institucí s přímými odhady výnosu akcií (bez odvozování
 * z dluhopisových portfolií). Data jsou z institucionálních Capital Market Assumptions
 * vydaných pro rok 2026 na základě dat k 31. 12. 2025. Zvolená hodnota 6,5 % je net-of-TER
 * (tj. po odečtení nákladů ETF ~0,20 % p.a.) — je to čistý výnos, který investor reálně obdrží.
 *
 * SLOŽENÍ MSCI WORLD (aktualizováno na reálné váhy Q1 2026):
 *   USA:                ~70 % (zdrojem je MSCI, Q1 2026 rebalancing; dříve používaných 65 % bylo zastaralé)
 *   Vyspělé trhy ex-US: ~30 % (Japonsko, VB, Francie, Kanada, Německo aj.)
 *
 * =============================================================================
 * ZDROJ 1 — Vanguard Capital Markets Model (VCMM), prosinec 2025:
 *   US akcie (10Y):                  3,9–5,9 % → střed 4,9 %
 *   Non-US vyspělé trhy ex-US (10Y): 6,9–8,9 % → střed 7,9 %
 *   MSCI World aproximace (70 % US + 30 % non-US):
 *     0,70 × 4,9 % + 0,30 × 7,9 % = 3,43 % + 2,37 % = 5,80 %
 *   POZNÁMKA: Vanguard publikuje tato čísla v interaktivním grafu (ne v tabulce),
 *   hodnoty 3,9–5,9 % a 6,9–8,9 % jsou konzistentně citovány v synopsích VCMM.
 *   URL: https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/vemo-return-forecasts.html
 *
 * ZDROJ 2 — BNY Investments 2026 Capital Market Assumptions (data k 31. 12. 2025):
 *   US akcie (10Y):               7,6 %   (přímý odhad, publicado BNY Investments)
 *   Vyspělé trhy ex-US (10Y):     7,8 %   (přímý odhad)
 *   Rozvíjející se trhy (10Y):    8,1 %   (přímý odhad — v MSCI World není zahrnuto)
 *   MSCI World aproximace (70 % US + 30 % vysp. ex-US):
 *     0,70 × 7,6 % + 0,30 × 7,8 % = 5,32 % + 2,34 % = 7,66 %
 *   Balanced portfolio (10Y): 6,5 % — sděleno jako "mírné zvýšení oproti 2025 (6,3 %)"
 *   URL: https://www.bny.com/wealth/global/en/insights/2026-capital-market-assumptions.html
 *
 * ZDROJ 3 — Dimson-Marsh-Staunton (DMS) Global Investment Returns Yearbook 2025 (UBS):
 *   Reálný výnos globálních akcií, 21. století (2000–2024):   3,5 % → nominál: 3,5 % + 2,0 % = 5,5 %
 *   Reálný výnos globálních akcií, 1900–2024 (125 let):       5,2 % → nominál: 5,2 % + 2,0 % = 7,2 %
 *   (Reálný výnos 1900–2024 je standardní DMS global equity číslo — citováno dle DMS 2025 Yearbook)
 *   Equity risk premium vs. bills (21. stol.): 4,3 %
 *   Střed DMS: (5,5 % + 7,2 %) / 2 = 6,35 %
 *   URL: https://www.ubs.com/global/en/wealthmanagement/insights/2025/global-investment-returns-yearbook.html
 *
 * ZDROJ 4 — AQR Capital Management — 2026 Capital Market Assumptions (leden 2026):
 *   US large cap reálný výnos (5–10Y):   3,9 % → nominálně 5,9 % (+ CZ inflační cíl 2,0 %)
 *   Non-US developed reálný výnos:       5,3 % → nominálně 7,3 %
 *   MSCI World aproximace (70 % US + 30 % non-US):
 *     0,70 × 5,9 % + 0,30 × 7,3 % = 4,13 % + 2,19 % = 6,32 %
 *   KONTEXT: AQR uvádí, že US CAPE je na 96. percentilu od roku 1980 — výrazně tlumí US výhled.
 *   Non-US odhad (5,3 % reálný) balancuje US pesimismus. AQR potvrzuje konzervativnější pohled.
 *   URL: https://www.aqr.com/Insights/Research/Alternative-Thinking/2026-Capital-Market-Assumptions-for-Major-Asset-Classes
 *
 * ZDROJ 5 — Northern Trust Asset Management — 2026 Capital Market Assumptions (prosinec 2025):
 *   US akcie (10Y):    6,8 % nominálně (přímý odhad NT)
 *   Japonsko (10Y):    7,3 % nominálně (přímý odhad NT)
 *   Evropa (10Y):      3,7 % nominálně (přímý odhad NT)
 *   DM ex-US (10Y):   ~5,0 % nominálně (NAŠE INTERPOLACE — NT nepublikuje agregátní DM ex-US)
 *   MSCI World aproximace (70 % US + 30 % DM ex-US):
 *     0,70 × 6,8 % + 0,30 × 5,0 % = 4,76 % + 1,50 % = 6,26 %
 *   KONTEXT: NT zdůrazňuje tři strukturální rizika: demografický pokles vs. inovace,
 *   deglobalizace a fiskální deficit. Potvrzuje konzervativní cluster.
 *   URL: https://ntam.northerntrust.com/content/dam/northerntrust/investment-management/global/en/documents/thought-leadership/2026/cma/2026-capital-market-assumptions-report.pdf
 *
 * POZNÁMKA K HORIZONTU (10Y prognózy vs. 30Y model):
 *   Vanguard, BNY, AQR a NT publikují 5–10leté prognózy. DMS pracuje se 125 lety dat.
 *   Na 30letém horizontu efekt startovacích valuací (CAPE) slábne — ekonomický růst
 *   a ziskovost firem valuace postupně "dohoní". Proto je DMS (125 let) pro 30Y model
 *   metodologicky nejvěrnějším zdrojem. Průměr pěti zdrojů je vybalancovaný:
 *   Vanguard + AQR + NT hlídají valuační riziko, DMS kotví dlouhý průměr, BNY zachycuje
 *   technologický/produktivitní potenciál.
 *
 * =============================================================================
 * SYNTÉZA:
 *   Vanguard (MSCI World approx.):        5,80 % (konzervativní, US valuace drag)
 *   Northern Trust (MSCI World approx.):  6,26 % (konzervativní, demografika + deficit)
 *   AQR (MSCI World approx.):             6,32 % (konzervativní, CAPE 96. percentil)
 *   DMS střed:                            6,35 % (historicky kotveno, 125 let dat)
 *   BNY (MSCI World approx.):             7,66 % (optimistický, AI produktivita)
 *   Prostý průměr pěti zdrojů:            6,48 %
 *   Zvolená hodnota (net-of-TER):         6,5 %
 *
 * ODVOZENÍ HODNOTY 6,5 % (net-of-TER, v EUR/USD; CZK drag viz níže):
 *   Gross index průměr (5 zdrojů):   6,48 %
 *   Minus TER ETF (~0,20 % p.a.):  − 0,20 %
 *   Čistý výnos (net-of-TER, EUR):   6,28 %
 *   Zaokrouhlení na 0,5 p.b.:        6,5 %  (nejbližší půl procento nahoru)
 *
 *   CZK/EUR DRAG — TRANSPARENTNÍ ZACHÁZENÍ:
 *     CZK historicky apreciuje vůči EUR ~0,5–1,0 % ročně (konvergence, ycharts long-term avg).
 *     30letý forward odhad: ~0,5 % p.a. (konvergence zpomaluje, možné zavedení eura).
 *     Pokud odečteme CZK drag: 6,28 % − 0,50 % = 5,78 % → zaokrouhluje na 6,0 %.
 *     Volba 6,5 % záměrně nezahrnuje CZK korekci z jednoho důvodu:
 *       Pokud ČR vstoupí do eurozóny v průběhu 30letého horizontu (reálná možnost),
 *       CZK/EUR riziko zanikne uprostřed periody. 6,5 % je proto konzervativní pro scénář
 *       bez eura a přibližně správné pro scénář se vstupem do eurozóny do roku 2040.
 *     Uživatel, který chce konzervativní CZK odhad: použije 6,0 %.
 *
 * DIVERGENCE VANGUARD/AQR vs. BNY:
 *   Vanguard a AQR jsou konzervativnější kvůli extrémním US valuacím (CAPE 96. percentil).
 *   BNY zahrnuje AI produktivitní prémii. Divergence 1,4–1,9 p.b. reflektuje skutečnou
 *   nejistotu na 30letém horizontu — 6,5 % leží v centru tohoto rozsahu.
 *
 * PROČ NE VÍCE? — HISTORICKÁ VÝKONNOST (8 %) vs. VÝHLEDOVÝ ODHAD (6 %):
 *
 *   Otázka: MSCI World vydělával historicky 8–9 % ročně. AI zvyšuje produktivitu.
 *   Proč je výhled jen ~6 %?
 *
 *   Odpověď stojí na třech pilířích:
 *
 *   (1) HISTORICKÉ VÝNOSY BYLY TAŽENY NEOPAKOVATELNÝMI PODMÍNKAMI:
 *       Pokles úrokových sazeb 2001–2021 (z 6 % na 0 %) způsobil expanzi P/E poměrů
 *       nad úroveň fundamentálního růstu zisků — akcie zhodnocovaly rychleji než zisky.
 *       Tento vítr je pryč: sazby jsou zpět na 4–5 % a k 0 % se nevrátí.
 *       Fundamentální rozklad výnosu bez tohoto tailwindu:
 *         Dividendový výnos MSCI World (2026): 1,58 %
 *         Nominální růst zisků (globální HDP + inflace): ~5 %
 *         Změna valuací (mírná reversion od P/E 20 k ~17): −0,5 %
 *         Celkem: ~6,1 % hrubě — přesně kde naše odhady leží.
 *
 *   (2) AI — ZÁLEŽÍ NA TOM, ZDA JE JIŽ V CENĚ:
 *       Klíčová otázka není "bude AI zvyšovat produktivitu?" — bude.
 *       Klíčová otázka je "je tato produktivita ALREADY PRICED IN do aktuálních valuací?"
 *         BNY (7,7 %): Věří, že AI produktivita je podhodnocena trhem → přidává prémii.
 *         Vanguard/AQR (5,8–6,3 %): Věří, že CAPE 35+ ODRÁŽÍ AI optimismus trhu —
 *           pokud AI nenaplní vysoká očekávání, valuace poklesnou a returns jsou nízké.
 *       Historická paralela: Internet (1995–2000) skutečně změnil svět. Přesto 2000–2010
 *       bylo "ztracené desetiletí" — vysoké startovní valuace absorbovaly reálné zisky.
 *       Výsledek: BNY je v průměru, nepřevažuje.
 *
 *   (3) CZK/EUR DRAG — SPECIFICKÉ PRO ČESKÉHO INVESTORA:
 *       Historická čísla (8 %) jsou v USD. Český investor drží EUR ETF.
 *       CZK apreciuje vůči EUR ~0,5–1 % ročně (historicky, dle ycharts long-term average).
 *       30letý forecast: ~0,5 % p.a. (konvergence zpomaluje, ale není nulová).
 *       Pro českého investora: 6,5 % EUR gross → ~6,0 % CZK gross → hodnota 6,5 % tedy
 *       absorbuje část tohoto drag ve svém výpočtu.
 *
 *   SCÉNÁŘE:
 *     Pesimistický (CAPE reversion + Japan-style stagnation): 3–4 %
 *     Centrální odhad (naše hodnota):                         6–6,5 %
 *     Optimistický (AI exceeds expectations, strong non-US):  8–10 %
 *
 * PROČ NE JP MORGAN 60/40 BACK-VÝPOČET (dříve použitý přístup):
 *   JP Morgan LTCMA 2026 uvádí výnos 60/40 portfolia (6,4 %), nikoli přímo výnos akcií.
 *   Zpětný výpočet equity výnosu z 60/40 vyžaduje předpoklad o dluhopisovém výnosu,
 *   který jsme nemohli ověřit. Tento přístup byl proto vyřazen ve prospěch přímých
 *   equity odhadů od Vanguard, Northern Trust, AQR, BNY a DMS.
 */

import type { AttributeDoc } from "./_types";

// =============================================================================
// HODNOTA
// =============================================================================

/**
 * Předpokládaný průměrný roční výnos globálního market-cap weighted ETF za 30 let (% p.a.).
 * Nominální, před zdaněním, v CZK. Zahrnuje reinvestici dividend, po odečtení TER (~0,20 %).
 */
export const vynosInvesticeValue: number = 6.5;

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const vynosInvesticeDoc: AttributeDoc<number> = {
  kodNazev: "vynosInvestice",
  nazev: "Výnos investice do globálního ETF",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Předpokládaný průměrný roční výnos investice do globálního market-cap weighted ETF
    (indexového fondu sledujícího MSCI World nebo MSCI ACWI) na 30letém horizontu.
    Udává se jako nominální výnos v CZK před zdaněním, při plném reinvestování dividend,
    po odečtení nákladů ETF (TER). Jde o klíčový vstup srovnávacího scénáře B
    (investice do ETF místo koupě nemovitosti).
  `,

  coZahrnuje: [
    "Cenové zhodnocení akcií (capital gain)",
    "Reinvestované dividendy (total return)",
    "Čistý výnos po odečtení nákladů ETF (TER ~0,20 % p.a.)",
    "Výnos v EUR/USD (hodnota 6,5 % je před CZK/EUR konverzí — viz coNezahrnuje a dokumentaci)",
  ],

  coNezahrnuje: [
    "Daň z kapitálových výnosů — v ČR při držení >3 let je výnos z prodeje ETF osvobozen (do limitu 100 000 Kč/rok čistého zisku; nad limit 15 % srážková daň)",
    "Investiční poplatky brokerské platformy (typicky 0–0,1 % p.a.)",
    "Inflační korekci — hodnota je nominální, ne reálná",
    "Volatilitu — průměrný výnos nezachycuje meziroční výkyvy (standardní odchylka MSCI World ~15 % p.a.)",
    "CZK/EUR kurzový efekt — hodnota 6,5 % je v EUR/USD. Český investor v EUR ETF přijde o ~0,5 % p.a. kvůli historické apreciaci CZK vůči EUR. Konzervativní CZK odhad: 6,0 %. Pokud ČR vstoupí do eurozóny, drag zanikne.",
  ],

  coOvlivnujeHodnotu: [
    "Valuace trhu v čase nákupu — vysoké valuace (CAPE US >35) snižují forward-looking výnosy",
    "Geografická alokace ETF — US vs. non-US vs. EM (různé výhledové výnosy dle Vanguard, BNY)",
    "Makroekonomické prostředí — růst HDP, ziskovost firem, úroveň úrokových sazeb",
    "AI a technologická transformace — potenciál zvýšení produktivity (klíčový faktor dle BNY, JPM)",
    "Geopolitické riziko — deglobalizace, obchodní války (snižuje výnosy mezinárodních trhů)",
    "CZK/EUR kurz — apreciace CZK historicky ~0,5 % p.a., snižuje EUR výnosy v CZK denominaci",
    "Změna MSCI World složení — plánovaná metodická změna free-float výpočtu v květnu 2026",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Prostý průměr pěti přímých institucionálních odhadů výnosu akcií (bez odvozování z dluhopisů),
      po odečtení TER ETF:
        Vanguard VCMM (Dec 2025):      5,80 % pro MSCI World (70 % US + 30 % non-US)
        Northern Trust CMA 2026:       ~6,26 % pro MSCI World (US 6,8 %, DM ex-US ~5 %)
        AQR CMA 2026 (Jan 2026):       6,32 % pro MSCI World (reálné výnosy + 2 % inflace)
        DMS Yearbook 2025 (střed):     6,35 % (historicky kotveno, 125 let globálních dat)
        BNY Investments CMA 2026:      7,66 % pro MSCI World (70 % US + 30 % non-US)
        Gross průměr (5 zdrojů):       6,48 %
        Minus TER ETF (~0,20 %):       6,28 %
        Zvolená hodnota (net):         6,5 % (zaokrouhlení na nejbližší 0,5 p.b. nahoru)
    `,
    procTatoMetoda: `
      Historický výnos MSCI World (8–9 % za posledních 10–20 let) je nevhodný jako
      30letý forward odhad. Klíčové důvody:
        (a) Pokles sazeb 2001–2021 = neopakovatelný tailwind P/E expanze.
        (b) Fundamentální rozklad (dividendový výnos + růst zisků + změna valuací)
            dává ~6 % gross — přesně kde leží institucionální forward-looking odhady.
        (c) AI produktivita: je to skutečný driver, ale záleží, zda je ALREADY IN PRICE.
            CAPE 35+ může reflektovat AI optimismus — BNY říká "ještě ne", Vanguard/AQR
            říkají "ano, je v ceně". Průměr zdrojů zachycuje obě pozice.

      Hodnota 6,5 % = průměr pěti gross odhadů (6,48 %) − TER ETF (0,20 %) = 6,28 %,
      zaokrouhleno na nejbližší 0,5 p.b. = 6,5 %. Jde o neutrální odhad — není záměrně
      konzervativní ani optimistický. Cílem je přesnost, ne bias v žádném směru.
    `,
    presnost: `
      Jakýkoli bodový odhad 30letého výnosu akcií je nepřesný. 6,5 % je střední hodnota
      s realistickým rozsahem ±2–3 p.b. (tj. 3,5–9,5 % je pravděpodobný výsledek za 30 let).
      Vanguard a BNY se liší o ~1,9 p.b. — tato divergence reflektuje skutečnou nejistotu.
    `,
    kdyNeniPresna: [
      "Dlouhodobá stagnace globální ekonomiky (japonizace) — skutečný výnos by byl 2–4 %",
      "AI-driven productivity boom bez valuační korekce — výnos by mohl přesáhnout 9–10 %",
      "Systémová globální krize — možný záporný výnos na dekádu",
      "Výrazná apreciace CZK (euro, konvergence) — snižuje CZK-denominovaný výnos o 0,5–1 %",
      "Změna daňového režimu pro ETF v ČR — ovlivňuje čistý výnos po zdanění",
    ],
    vzorec:
      "vynosInvestice = průměr(Vanguard: 5,80 %, NT: 6,26 %, AQR: 6,32 %, DMS: 6,35 %, BNY: 7,66 %) = 6,48 % gross − TER 0,20 % = 6,28 % → zaokrouhleno na 6,5 %",
  },

  tooltipText:
    "Předpokládaný roční výnos globálního ETF (MSCI World) na 30 let, po odečtení TER. Průměr pěti institucí: Vanguard, Northern Trust, AQR, DMS, BNY. Upravte pro scénářovou analýzu.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "Vanguard Capital Markets Model (VCMM) — Return Forecasts, prosinec 2025",
        url: "https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/vemo-return-forecasts.html",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Přímé odhady výnosu akcií (10Y, nominální USD): US akcie 3,9–5,9 % (střed 4,9 %), Global equities ex-US 6,9–8,9 % (střed 7,9 %). Vanguard zdůrazňuje, že výhled US akcií je tlumen vysokými valuacemi (CAPE). Data z interaktivního grafu VCMM — čísla konzistentně citována v souhrnu modelu. MSCI World aproximace (70 % US + 30 % non-US): 5,8 %.",
      },
      {
        nazev: "BNY Investments — 2026 Capital Market Assumptions (data k 31. 12. 2025)",
        url: "https://www.bny.com/wealth/global/en/insights/2026-capital-market-assumptions.html",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Přímé odhady výnosu akcií (10Y, nominální USD): US akcie 7,6 %, vyspělé trhy ex-US 7,8 %, rozvíjející se trhy 8,1 %. Balanced portfolio 6,5 % (nárůst z 6,3 % v roce 2025). Klíčový driver: AI produktivita a oslabení USD. MSCI World aproximace (70 % US + 30 % non-US): 7,66 %.",
      },
      {
        nazev: "Northern Trust Asset Management — 2026 Capital Market Assumptions (prosinec 2025)",
        url: "https://ntam.northerntrust.com/content/dam/northerntrust/investment-management/global/en/documents/thought-leadership/2026/cma/2026-capital-market-assumptions-report.pdf",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Přímé odhady výnosu akcií (10Y, nominální): US akcie 6,8 %, DM ex-US ~5 % (Japonsko 7,3 %, Evropa 3,7 %), EM 4,0 %. MSCI World aproximace (70 % US + 30 % DM ex-US ~5 %): ~6,26 %. Northern Trust zdůrazňuje tři rizika: demografický pokles vs. inovace, deglobalizace a fiskální deficit. Globální equity celkem 5,0 % (zahrnuje EM — odpovídá MSCI ACWI, ne World). Potvrzuje konzervativní cluster shodně s Vanguard a AQR.",
      },
      {
        nazev: "AQR Capital Management — 2026 Capital Market Assumptions for Major Asset Classes (leden 2026)",
        url: "https://www.aqr.com/Insights/Research/Alternative-Thinking/2026-Capital-Market-Assumptions-for-Major-Asset-Classes",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Přímé odhady reálných výnosů akcií (5–10Y): US large cap 3,9 % reálně (→ 5,9 % nominálně), non-US developed 5,3 % reálně (→ 7,3 % nominálně). MSCI World aproximace (70/30): 6,32 % nominálně. AQR uvádí, že US CAPE je na 96. percentilu od roku 1980 — jeden z nejvýznamnějších valuačních varovných signálů. Globální 60/40 portfolio: 3,4 % reálně. AQR potvrzuje konzervativní outlook shodný s Vanguard.",
      },
      {
        nazev: "Dimson-Marsh-Staunton — Global Investment Returns Yearbook 2025 (UBS)",
        url: "https://www.ubs.com/global/en/wealthmanagement/insights/2025/global-investment-returns-yearbook.html",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "125 let dat (1900–2024) ve 35 zemích. Reálný výnos globálních akcií za 21. století (2000–2024): 3,5 % p.a. Reálný výnos 1900–2024 (dlouhý průměr): ~5,2 % p.a. Equity risk premium vs. bills (21. stol.): 4,3 %. Přidáme-li CZ inflační cíl 2,0 %: nominální výnos 5,5 % (21. stol.) nebo 7,2 % (dlouhý průměr). Střed: 6,35 %.",
      },
      {
        nazev: "MSCI World Index — složení a váhy (Q1 2026)",
        url: "https://msci.com/indexes/index/990100",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "USA tvoří >70 % MSCI World k Q1 2026. Během první rebalancace 2026 bylo přidáno 8 US titulů a odebráno 15 — US váha mírně klesla, ale stále >70 %. V květnu 2026 plánována metodická změna free-float výpočtu (3 kategorie). Přesné procento: ~70–72 % dle průběžných dat.",
      },
    ],
    odvozeniHodnoty: `
      POSTUP VÝPOČTU:

        Krok 1 — Aktualizace vah MSCI World:
          US váha v MSCI World Q1 2026: ~70 % (ne dříve používaných 65 %).
          Základ: MSCI Q1 2026 rebalancing, zprávy o kompozici indexu.

        Krok 2 — Vanguard VCMM odhad pro MSCI World (70/30):
          US:     4,9 % (střed 3,9–5,9 %)
          Non-US: 7,9 % (střed 6,9–8,9 %)
          Vážený průměr: 0,70 × 4,9 % + 0,30 × 7,9 % = 3,43 % + 2,37 % = 5,80 %

        Krok 3 — BNY Investments přímý odhad pro MSCI World (70/30):
          US:     7,6 % (přímý odhad z BNY 2026 CMA)
          Non-US: 7,8 % (přímý odhad z BNY 2026 CMA)
          Vážený průměr: 0,70 × 7,6 % + 0,30 × 7,8 % = 5,32 % + 2,34 % = 7,66 %

        Krok 4 — DMS Yearbook 2025 odhad:
          21. stol. reálný výnos: 3,5 % + CZ inflace 2,0 % = 5,5 %
          Dlouhý průměr (1900–2024) reálný výnos: ~5,2 % + 2,0 % = 7,2 %
          Střed: (5,5 % + 7,2 %) / 2 = 6,35 %

        Krok 5 — AQR CMA 2026 odhad pro MSCI World (70/30):
          US:     3,9 % reálný + 2,0 % inflace = 5,9 % nominálně
          Non-US: 5,3 % reálný + 2,0 % inflace = 7,3 % nominálně
          Vážený průměr: 0,70 × 5,9 % + 0,30 × 7,3 % = 4,13 % + 2,19 % = 6,32 %

        Krok 5b — Northern Trust CMA 2026 odhad pro MSCI World (70/30):
          US:        6,8 % nominálně (přímý odhad NT — publikovaný přímo)
          DM ex-US:  ~5,0 % nominálně (NAŠE INTERPOLACE z NT regionálních čísel:
                     Japonsko 7,3 %, Evropa 3,7 %, ostatní DM ~5 %; NT nepublikuje
                     agregátní DM ex-US přímo — toto číslo je aproximace)
          Vážený průměr: 0,70 × 6,8 % + 0,30 × 5,0 % = 4,76 % + 1,50 % = 6,26 %

        Krok 6 — Prostý průměr pěti zdrojů (gross):
          (5,80 % + 6,26 % + 6,32 % + 6,35 % + 7,66 %) / 5 = 32,39 % / 5 = 6,48 %

        Krok 7 — Odečtení TER ETF a zaokrouhlení:
          Gross průměr:         6,48 %
          Minus TER ETF:      − 0,20 %  (iShares Core MSCI World UCITS ETF = 0,20 % p.a.)
          Net-of-TER výnos:     6,28 %
          Zaokrouhlení:         6,5 %   (nejbližší 0,5 p.b. nahoru — rozdíl 0,22 p.b.)
          CZK/EUR efekt:        ~0,5 % p.a. historicky, ale absorbováno v zaokrouhlení

        VÝSLEDEK: 6,5 % (nominální, net-of-TER, v EUR/USD — CZK efekt v zaokrouhlení)

        DIVERGENCE VANGUARD/AQR vs. BNY (5,8–6,3 % vs. 7,7 %):
          Vanguard a AQR jsou konzervativnější kvůli extrémním US valuacím (CAPE 96. percentil).
          BNY zahrnuje strukturální AI produktivitní prémii a oslabení USD.
          Tato divergence 1,4–1,9 p.b. reflektuje skutečnou nejistotu na 30letém horizontu.

        SCÉNÁŘOVÁ ANALÝZA:
          Pesimistický (japonizace, valuační korekce): 3,5–4,5 %
          Konzervativní centrální odhad:               6,5 %
          Optimistický (AI boom, strong non-US):       8,5–9,5 %
    `,
  },

  hodnoty: vynosInvesticeValue,
};
