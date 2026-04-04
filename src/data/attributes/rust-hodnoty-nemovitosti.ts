/**
 * Roční růst hodnoty nemovitosti — předpokládaný průměrný roční nominální růst
 * kupní ceny bytu na 30letém horizontu. Hodnota je per-city.
 *
 * ZVOLENÁ METODIKA: Rovnovážná stavebnicová metoda kalibrovaná per-city koeficienty,
 * potvrzená multi-source konsensem (6 zdrojů).
 *
 * =============================================================================
 * HISTORICKÁ DATA — KOMPLETNÍ ČASOVÁ ŘADA (Eurostat / Hypostat, 2015=100):
 *
 *   Rok     HPI     YoY
 *   2010    95,2    —
 *   2011    95,3    +0,1 %
 *   2012    93,9    −1,5 %
 *   2013    93,9    +0,0 %
 *   2014    96,2    +2,4 %
 *   2015   100,0    +3,9 %
 *   2016   107,2    +7,2 %
 *   2017   119,7   +11,7 %
 *   2018   130,0    +8,6 %
 *   2019   141,9    +9,2 %
 *   2020   153,9    +8,5 %
 *   2021   184,2   +19,7 %
 *   2022   215,3   +16,9 %
 *   2023   211,7    −1,7 %
 *   2024   230,2    +8,7 %  (Q4 2024)
 *   2025   249,0   +10,8 %  (Q3 2025 YoY)
 *
 *   Zdroj: Eurostat ei_hppi_q, Hypostat 2023 (European Mortgage Federation)
 *
 * =============================================================================
 * KLÍČOVÉ CAGR Z HISTORICKÉ ŘADY (ČESKÁ REPUBLIKA, NÁRODNÍ):
 *
 *   Perioda            CAGR    Hodnocení
 *   2010–2015 (5 let)   1,0 %  Post-GFC stagnace, korekce přehřátého trhu 2008
 *   2010–2019 (9 let)   4,5 %  Plný cyklus před COVID (stagnace + nízkoúrokový boom)
 *   2015–2019 (4 roky)  9,2 %  Čistý nízkoúrokový boom — NEOPAKOVATELNÉ
 *   2010–2023 (13 let)  6,2 %  Plný cyklus vč. COVID boomu a korekce
 *   2010–Q3/2025 (15,75 let) 6,3 %  Nejdelší dostupná série
 *
 *   KLÍČOVÝ ZÁVĚR: CAGR 2010-2019 (4,5 %) je nejreprezentativnější strukturální číslo —
 *   zahrnuje plný cyklus (stagnaci i boom), ale vylučuje COVID anomálii (2021-2022).
 *   Kriticky: jde o průměr DVOU PROTICHŮDNÝCH sub-režimů:
 *     Režim 1 (2010–2015): 1,0 % CAGR — post-GFC korekce, přehřátý trh roku 2008 se čistí
 *     Režim 2 (2015–2019): 9,2 % CAGR — boom nízkoúrokového prostředí (záporné reálné sazby)
 *   Průměr 4,5 % je tedy reprezentativní PRÁVĚ PROTO, že obsahuje oba extrémy.
 *   To je přesně to, co hledáme: číslo přes plný cyklus (boom + bust), nikoliv výběr
 *   jednoho příznivého sub-období.
 *   CAGR 2010-Q3/2025 (6,3 %) je distorzován neopakovatelnými podmínkami:
 *     (a) záporné reálné sazby 2016–2021 → P/E expanze bytů daleko nad fundamenty
 *     (b) COVID pandemická poptávka 2021–2022 (+19,7 %, +16,9 %)
 *     (c) Následná post-korekční revitalizace 2024–2025 (mortgage bounce)
 *   Na 30letém horizontu tyto cyklické efekty průměrují k strukturálnímu tempu ~4–5 %.
 *
 * =============================================================================
 * PROČ NE VÍCE? — STRUKTURÁLNÍ ARGUMENTY PROTI FORWARD CAGR 6–7 %:
 *
 *   ARGUMENT 1 — Dvouregimová povaha historické série (výše):
 *     Boom 2015-2019 (9,2 %) byl tažen zápornou reálnou sazbou ČNB — repo na 0,05 %.
 *     Tento tailwind je pryč. Neutrální reálná sazba ČNB: ~0,5–1,0 %.
 *     Bez tohoto tailwindu = bez opakování 9 % sub-režimu.
 *
 *   ARGUMENT 2 — Makroprudenční bariéra (ČNB limity):
 *     ČNB aktivně omezuje leverage-driven cenový růst:
 *       LTV: max 80 % (výjimečně 90 % pro kupující do 36 let)
 *       DTI: max 8,5× hrubý roční příjem (9,5× pro mladé do 36 let)
 *       DSTI: max 45 % měsíčního příjmu
 *     Důsledek: hypoteční trh nemůže generovat spekulativní leverage bublinu
 *     ve stylu USA/Irsko/Španělsko 2004–2008. Instititucionální bariéra
 *     systematicky tlumí nadhodnocení nad fundamenty.
 *     Automatická zpětná vazba: čím vyšší ceny → tím méně domácností splňuje DTI/DSTI
 *     → tím méně poptávky → zpomalení růstu. Tato kotva snižuje horní strop CAGR.
 *     Zdroj: ČNB makroprudenční zpráva 2025; Zákon č. 257/2016 Sb. (zákon o spotřebitelském úvěru)
 *
 *   ARGUMENT 3 — Affordability ceiling:
 *     MMR Zpráva o dostupnosti bydlení 2024: ceny bytů vzrostly 2,8× rychleji než příjmy
 *     (2015–2023: ceny +112 %, mzdy +40 %). Ratio kupní ceny k ročnímu příjmu v Praze
 *     dosáhlo ~15× (evropský průměr ~7–10×). Tato affordability bariéra tvoří strop:
 *     pokud ceny rostou rychleji než příjmy dlouhodobě, kupující jednoduše nemohou kupovat
 *     → poptávka se přesouvá do nájmu → kupní ceny zpomalují, nájmy zrychlují.
 *     Na 30letém horizontu je udržitelné tempo: příjmový CAGR + malá reálná prémie.
 *
 * =============================================================================
 * PER-CITY HISTORICKÁ CAGR (RealityMIX listing prices, 60m² byt):
 *
 *   Město         Mar 2010      Jan 2025       CAGR (14,8 let)
 *   Praha       4 196 223 Kč  8 335 338 Kč    ~4,7 %
 *   Brno        2 678 537 Kč  6 748 647 Kč    ~6,4 %
 *   Ostrava      (odhad)       3 596 825 Kč   ~5,5–6,0 %
 *
 *   INTERPRETACE PER-CITY DIVERGENCE:
 *   Praha 4,7 % vs. Brno 6,4 % odráží konvergenční dynamiku:
 *   - Praha/Brno cenový poměr (60m²): 2010 = 1,57× (Praha 57 % dražší)
 *   - Praha/Brno cenový poměr: Jan 2025 = 1,24× (Praha 24 % dražší)
 *   - Brno catching-up: z 57 % pod Prahou na 24 % pod Prahou za 15 let
 *   - Tato konvergence zbývá dokončit (~10–15 p.p.) → Brno má stále mírný catch-up potenciál
 *   - Ale hlavní fáze konvergence JE ZA NÁMI → forward Brno CAGR by měl klesnout k úrovni Prahy
 *   Zdroj: RETREND/RealityMIX.cz (září 2020) a Reallocate.cz/RealityMIX (leden 2025)
 *
 * =============================================================================
 * ROVNOVÁŽNÝ MODEL (NÁRODNÍ BASELINE):
 *
 *   Nominální rovnovážný růst = inflace + reálný mzdový příspěvek + supply prémie
 *
 *   Složka 1 — Inflace: 2,0 %
 *     ČNB inflační cíl, potvrzeno tržními očekáváními (viz ocekavana-inflace.ts)
 *
 *   Složka 2 — Reálný mzdový příspěvek: ~1,5–2,0 %
 *     Empirická validace:
 *       Reálný růst mezd ČR 2010–2019: ~2–3 % p.a. (ČNB data)
 *       Reálný růst cen nemovitostí 2010–2019: (4,5 % − 1,7 % avg inflace) = 2,8 %
 *       → Reálný cenový růst ≈ reálný mzdový růst: vztah ~1:1 (income elasticita ≈ 1)
 *       → Mzdová složka v nominálním cenovém růstu: ~1,5–2,0 % (konzervativní odhad)
 *     MMR kontext: 2015–2023 mzdy +40 %, ceny bytů +112 % — výrazný over-run,
 *     ale v rámci plného cyklu (zahrnuje neudržitelný boom 2021-2022)
 *
 *   Složka 3 — Supply prémie: 0–1,5 % (per-city)
 *     ČNB Summer 2025: "Poptávka roste, nabídka je rigidní."
 *     Stavební povolení 2025: pouze 61 613 celorepublikově — NEJNIŽŠÍ za 25 LET
 *     ConBiz 2026: Praha potřebuje 10 000 nových bytů ročně pro stabilizaci cen;
 *       v praxi tato kapacita není dosahována = strukturální deficit je zaručen
 *     Euroconstruct (duben 2025): "Housing under pressure — structural imbalance remains"
 *
 *   Výsledek: národní rovnováha ≈ 2,0 % + 1,5 % + 0,5 % = 4,0 % p.a.
 *   Praha/Brno: 2,0 % + 1,5 % + 1,0 % = 4,5 % p.a.
 *
 * =============================================================================
 * MULTI-SOURCE KONSENSUS (6 zdrojů):
 *
 *   Zdroj 1 — Eurostat HPI historická řada (2010–2024):
 *     CAGR 2010–2019 = 4,5 % (nejčistší strukturální período)
 *     CAGR 2010–Q3/2025 = 6,3 % (plný cyklus vč. COVID distorzí)
 *     → Strukturální kotva forward odhadu: 4,0–5,0 %
 *
 *   Zdroj 2 — AEW Europe 2026 European Outlook:
 *     Prime residential 2026–2030: +3,2 % p.a. průměr eurozóny.
 *     ČR historicky outperformuje eurozónový průměr o 0,5–1,0 p.b. → 3,7–4,2 % forward.
 *     AEW: nejpřímější institucionální benchmark pro forward-looking odhad.
 *
 *   Zdroj 3 — ČNB Monetary Policy Report, Summer 2025 (box Jakub Grossmann et al.):
 *     "Ceny rezidenčních nemovitostí jsou VIDITELNĚ NAD DLOUHODOBÝM TRENDEM."
 *     "Poptávka dále roste, nabídka je rigidní — supply-demand imbalance přetrvává."
 *     Q1 2025 YoY: starší byty +9,3 %, novostavby +13 %.
 *     Výhled: ceny dále porostou, ale z přehřáté základny — mean reversion mírní long-run CAGR.
 *
 *   Zdroj 4 — MMR "Zpráva o dostupnosti bydlení" (2024):
 *     "2015–Q3/2023: ceny bytů +112 % národně, +140 % v Praze a Brně."
 *     "Mzdy vzrostly o 40 % (2015–2023) — ceny bytů 2,8× rychleji než příjmy."
 *     Implikace: přehřátí trhu je reálné; FUTURE CAGR bude nižší než historická 9–11 %
 *     (affordability ceiling neumožňuje příjmovou odchylku opakovat donekonečna)
 *
 *   Zdroj 5 — ConBiz 2026 (analýza rezidenčního trhu ČR 2025–2026):
 *     Krátkodobý odhad 2026: +5–10 % (12-měsíční výhled).
 *     "Stavební povolení 2025: 61 613 — nejnižší za 25 let."
 *     "Praha potřebuje 10 000 bytů ročně ke stabilizaci cen."
 *     Centrální Group zmrazil spuštění 1 000 bytů kvůli stavebním nákladům.
 *
 *   Zdroj 6 — RealityMIX.cz (přes RETREND.cz, Reallocate.cz):
 *     Praha CAGR 2010–2025 (listing prices): ~4,7 %
 *     Brno CAGR 2010–2025 (listing prices): ~6,4 %
 *     Praha/Brno poměr: 2010 = 1,57×; 2025 = 1,24× (Brno konverguje k Praze)
 *     Ostatní ciudad: Olomouc -8,5 % YoY (RealityMIX) vs +13 % YoY (CBA Monitor) —
 *       UPOZORNĚNÍ: listing price data Olomouce je statisticky šumová (malý trh).
 *       Pro per-city kalibraci preferujeme CBA Monitor (transakční ceny).
 *
 * =============================================================================
 * KONSENSNÍ SOUHRN A VÝSLEDNÉ HODNOTY:
 *
 *   Národní forward CAGR (konvergence 6 zdrojů):
 *     Strukturální model:          4,0 %
 *     AEW Europe (ČR premium):     3,7–4,2 %
 *     Eurostat 2010–2019 CAGR:     4,5 % (před COVID)
 *     RealityMIX Praha 2010–2025:  4,7 % (listing, mírně nad trans. CAGR)
 *     Konsensní rozsah:            3,7–4,7 %
 *     Zvolená hodnota (střed):     4,0 % pro průměrná krajská města
 *
 *   Výjimky:
 *     Praha/Brno: 4,5 % — chronický supply deficit, strukturálně dokumentováno ČNB + ConBiz
 *     Ústí n.L./KV: 3,0 % — structural slabost, demografický odliv
 *
 * =============================================================================
 * POZN. K OVERVALUATION:
 *
 *   ČNB explicitně konstatuje, že ceny jsou "nad dlouhodobým trendem" (Summer 2025).
 *   Zdánlivá kontradikce: proč prognostikovat 4–4,5 % forward CAGR z přehřáté základny?
 *   Odpověď:
 *   (a) Přehřátí v ČR je supply-constraint driven, ne čistě spekulativní
 *       (stavební povolení nejnižší za 25 let → fundamentální nedostatek bytů)
 *   (b) Přehřátí naznačuje, že v prvních 3–7 letech 30letého horizontu bude CAGR
 *       nižší (mean reversion), v pozdějších letech zpět na strukturální tempo
 *   (c) Na 30letém průměru se reverzní fáze a growth fáze vyruší →
 *       30Y průměr konverguje ke strukturálnímu rovnovážnému tempu
 *   (d) Náš model zachycuje 30Y průměr, ne okamžitý výhled → 4–4,5 % je správné
 */

import type { AttributeDoc, PerCity } from "./_types";

// =============================================================================
// HODNOTY
// =============================================================================

/**
 * Předpokládaný průměrný roční nominální růst hodnoty bytu na 30letém horizontu (% p.a.).
 *
 * Metodika: Rovnovážná stavebnicová metoda potvrzená 6 zdroji.
 * Národní baseline: 4,0 % = inflace (2,0 %) + mzdový příspěvek (1,5 %) + supply prémie (0,5 %)
 * Praha/Brno premium: +0,5 p.b. = chronický supply deficit (stavební povolení na minimu)
 * Weak trhy: −0,5 p.b. až −1,0 p.b. = demografický odliv + nižší příjmová dynamika
 */
export const rustHodnotyNemovitostiValues: PerCity<number> = {
  "praha":            4.5, // Nejsilnější supply constraint v ČR; mezinárodní poptávka; nejvyšší příjmy
  "brno":             4.5, // Konvergence k Praze (zbývá ~10pp), tech/uni hub; strukturální deficit
  "plzen":            4.0, // Průmyslový hub (BMW, Bosch); moderní poptávka; bez strukturálního deficitu
  "olomouc":          4.0, // Universitní město; stabilní poptávka; Morava center
  "hradec-kralove":   4.0, // Rozvíjející se V. Čechy; blízkost Prahy; solidní fundamenty
  "pardubice":        4.0, // Průmysl + logistika; dynamický trh; podobné H.K.
  "ceske-budejovice": 3.5, // J. Čechy; solidní ale bez výrazného strukturálního growth driveru
  "liberec":          3.5, // S. Čechy; smíšená ekonomika; blízkost Německa
  "zlin":             3.5, // Průmyslová základna (Baťa dědictví); střední dynamika
  "jihlava":          3.5, // Nejmenší krajské město; omezená dynamika; mírně slabší než průměr
  "ostrava":          3.5, // Post-industriální; odliv populace kompenzován nízkými cenami + investicemi
  "usti-nad-labem":   3.0, // Strukturální slabost; demografický odliv; nejnižší ceny + nejpomalejší růst
  "karlovy-vary":     3.0, // Turistická závislost; stárnoucí populace; CS-DE hraniční dynamika
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const rustHodnotyNemovitostiDoc: AttributeDoc<PerCity<number>> = {
  kodNazev: "rustHodnotyNemovitosti",
  nazev: "Roční růst hodnoty nemovitosti",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Předpokládaný průměrný roční nominální růst tržní kupní ceny bytu (% p.a.) na 30letém
    horizontu kalkulačky. Vyjadřuje, o kolik procent ročně se v průměru zvyšuje hodnota
    nemovitosti. Jedná se o dlouhodobý strukturální předpoklad, ne prognózu pro příští rok.
    Hodnota je per-city (liší se podle krajského města).
  `,

  coZahrnuje: [
    "Nominální (nezočištěný o inflaci) průměrný roční nárůst tržní ceny bytu",
    "Inflační složku (cca 2 % p.a. = ČNB cíl)",
    "Reálný nárůst hodnoty nemovitosti nad inflaci (mzdový příspěvek + supply prémie)",
    "Průměrný výsledek přes ekonomické cykly (boom i stagnace/korekce) na 30 letech",
  ],

  coNezahrnuje: [
    "Investice do oprav nebo rekonstrukcí zvyšující hodnotu (double-counting)",
    "Transakční náklady při prodeji (daně, poplatky, provize realitní kanceláře)",
    "Krátkodobé cyklické výkyvy — hodnota je 30Y průměr, ne current-market predikce",
    "Rozdíly v rámci jednoho města (poloha, patro, stav bytu)",
  ],

  coOvlivnujeHodnotu: [
    "Stavební povolení a rychlost výstavby — v Česku na 25letém minimu (2025: 61 613 ks)",
    "Příjmový růst domácností — hlavní strukturální kotva (rent/income vztah)",
    "Demografická poptávka: urbanizace, migrace do krajských měst, počet domácností",
    "Dostupnost hypotečního financování — sazby ovlivňují cykličnost, ne strukturu",
    "Makroekonomické prostředí (inflace 2 %, HDP růst 2,6–2,9 %, nezaměstnanost 2,8 %)",
    "Regulatorní prostředí: nový stavební zákon (záměr: zrychlit povolování; efekt zatím nenastoupil)",
    "Zahraniční poptávka: ~25 % transakcí jsou cizinci (Central Group, Svoboda & Williams)",
    "Post-industriální restrukturalizace v Ostravě a severočeských městech",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Rovnovážná stavebnicová metoda s per-city kalibrací, potvrzená 6 nezávislými zdroji:
      Nominální rovnovážný růst = inflace (2,0 %) + reálný mzdový příspěvek (1,5 %) + supply prémie (0–1,0 %)
      Kalibrováno: Eurostat HPI 2010–2025, AEW Europe 2026 Outlook, ČNB Summer 2025 analýza,
      MMR Zpráva o dostupnosti bydlení 2024, ConBiz 2026, RealityMIX per-city CAGR 2010–2025.
    `,
    procTatoMetoda: `
      Tři důvody pro tuto metodu:
      (1) HISTORICKÉ CAGR JSOU SILNĚ DISTORZOVÁNY. Národní CAGR 2015–2025 (8,5 %) zahrnuje
          záporné reálné sazby 2016–2021 (P/E expanze bytů), COVID boom (+19,7 % v 2021,
          +16,9 % v 2022) a post-korekční bounce 2024–2025. Tyto faktory jsou cyklické.
          Čistší strukturální číslo: CAGR 2010–2019 = 4,5 % (plný cyklus bez COVID).
      (2) ROVNOVÁŽNÝ MODEL JE EMPIRICKY POTVRZEN. Reálný cenový růst 2010–2019 ≈ 2,8 %
          a reálný mzdový růst 2010–2019 ≈ 2–3 % → income elasticita ≈ 1,0
          (ceny rostou v reálu stejně rychle jako příjmy). Toto validuje mzdovou složku modelu.
      (3) KONSENSUS 6 ZDROJŮ. Eurostat strukturální CAGR (4,5 %), AEW Europe (3,7–4,2 %),
          ČNB cyklická analýza (supply-demand imbalance potvrzena), MMR (overrun je reálný,
          ale affordability ceiling existuje), ConBiz (5–10 % krátkodobě), RealityMIX
          Praha CAGR (4,7 %). Všechny zdroje jsou konzistentní s rozsahem 4,0–4,5 % pro Praha.
    `,
    presnost: `
      Přesnost ±1,0–1,5 p.b. na 30letém horizontu. Zdrojem nejistoty jsou:
      (1) Délka a hloubka ekonomických cyklů v rámci 30 let
      (2) Rychlost uvolnění stavebního povolování (nový stavební zákon)
      (3) Demografické trendy (rychlost přílivu/odlivu obyvatel do krajských měst)
      Pořadí měst (Praha > průměr > Ústí n.L.) je robustní; absolutní hodnoty mají ±1 p.b.
    `,
    kdyNeniPresna: [
      "Masivní zrychlení stavební výroby (nový zákon účinný 2024 zatím bez efektu) → snížilo by Praha/Brno hodnotu",
      "Demografický obrat v Praze nebo Brně (emigrace převýší imigraci)",
      "Zavedení daně z prázdných bytů nebo rent-control (politicky diskutováno)",
      "Globální finanční krize s dlouhou dobou zotavení (>5 let, jako GFC 2008–2013)",
      "Přijetí eura v ČR — odstraní CZK/EUR premium, ale podpoří zahraniční poptávku (nejasný čistý efekt)",
    ],
  },

  tooltipText:
    "Průměrný roční nárůst hodnoty bytu na 30 let. Praha a Brno mají vyšší hodnotu díky chronickému nedostatku bytů — stavební povolení jsou na 25letém minimu.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "Eurostat / EMF Hypostat 2023 — House Price Index ČR (2015=100), 2010–2024",
        url: "https://ec.europa.eu/eurostat/databrowser/product/page/ei_hppi_q",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Kompletní roční HPI řada (2015=100): 2010=95,2; 2011=95,3; 2012=93,9; 2013=93,9; 2014=96,2; 2015=100; 2016=107,2; 2017=119,7; 2018=130,0; 2019=141,9; 2020=153,9; 2021=184,2; 2022=215,3; 2023=211,7; Q4 2024=230,2; Q3 2025=249,0. Vypočítané CAGR: 2010–2015: 1,0 %; 2010–2019: 4,5 %; 2015–2019: 9,2 %; 2010–2023: 6,2 %; 2010–Q3/2025: 6,3 %. Zdroj primárních dat: Hypostat, European Mortgage Federation.",
      },
      {
        nazev: "ČNB — The Czech housing market in the upward phase of the cycle (Summer 2025)",
        url: "https://cnb.cz/en/monetary-policy/monetary-policy-reports/boxes-and-articles/The-Czech-housing-market-in-the-upward-phase-of-the-cycle",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Autoři: Grossmann, Pašaličová, Pikhart. Q1 2025 YoY: starší byty +9,3 %, novostavby +13 %, celkový index +10 %. 'Ceny jsou viditelně nad dlouhodobými trendy.' Ceny bytů vedou hospodářský cyklus s předstihem 3 čtvrtletí (korelace >0,7). Poptávka roste (příjmy, hypotéky), nabídka je rigidní (completions pod průměrem, stavební povolení nízká). Demografický přírůstek 2020–2025 výrazně převýšil dokončené byty. ~25 % transakcí v Praze jsou cizinci (Central Group, Svoboda & Williams). Supply-demand imbalance strukturálně přetrvává.",
      },
      {
        nazev: "AEW Europe — 2026 European Outlook: Navigating the Winds of Change",
        url: "https://www.aew.com/research/2026-european-outlook-navigating-the-winds-of-change",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "AEW prognóza prime residential 2026–2030: +3,2 % p.a. průměr Evropy. Česká republika historicky outperformuje EU průměr o 0,5–1,0 p.b. díky strukturálnímu supply-demand deficitu a konvergenci k EU příjmové úrovni → forward CZ odhad: 3,7–4,2 % p.a. Konzistentní s naším rovnovážným modelem.",
      },
      {
        nazev: "MMR — Zpráva o dostupnosti bydlení v ČR (2024)",
        url: "https://mmr.gov.cz/cs/ministerstvo/bytova-politika/data-anylyzy-indikatory/zprava-o-dostupnosti-bydleni",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "2015–Q3/2023: ceny bytů národně +112 %, Praha a Brno +140 %. Mzdy ve stejném období +40 % → ceny rostly 2,8× rychleji než příjmy. Poměr cena/příjem v ČR: 13násobek ročních platů pro 70 m² byt — jeden z nejhorších v Evropě. Affordability ceiling existuje: ceny nemohou trvale outrunovat příjmy na 30letém horizontu.",
      },
      {
        nazev: "Euroconstruct — Czech residential market 2025: Strong recovery, structural imbalance remains",
        url: "https://www.euroconstruct.org/news/czech-residential-market-2025-strong-recovery-structural-imbalance-remains/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Strukturální nerovnováha nabídky a poptávky na českém rezidenčním trhu přetrvává. Zpráva potvrzuje trvalý supply deficit jako hlavní growth driver cen. Neposkytuje přesné forward % odhady — slouží jako kvalitativní potvrzení supply prémie v modelu.",
      },
      {
        nazev: "ConBiz — Summary of the Residential Real Estate Market in Czech Republic and Prague 2025 & Outlook 2026",
        url: "https://conbiz.eu/summary-of-the-residential-real-estate-market-in-the-czech-republic-and-prague-in-2025-and-outlook-for-2026/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "2026 forecast (12-měsíční): +5–10 % pro Praha. Stavební povolení 2025: 61 613 ks — nejnižší za 25 let. Praha potřebuje 10 000 nových bytů ročně ke stabilizaci cen — tato kapacita není dosahována. Central Group zmrazil spuštění ~1 000 bytů (únor 2026) kvůli stavebním nákladům. New apartment Praha Q4 2025: průměrně 175 200 Kč/m² (+13 % YoY). Mortgage volume 2025: 321 mld. Kč nových hypoték (+41 % YoY) — 2. nejlepší rok v historii.",
      },
      {
        nazev: "RealityMIX.cz — Historická data cen bytů (přes RETREND.cz a Reallocate.cz)",
        url: "https://reallocate.cz/en/blog/vvoj-cen-bytu-v-krajskch-mestech-cr-leden-2026/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Březnová 2010 data (listing prices, 60m²): Praha 4 196 223 Kč, Brno 2 678 537 Kč; Ostrava +60 % do 2020 (zdroj: RETREND, září 2020). Leden 2025 data: Praha 8 335 338 Kč, Brno 6 748 647 Kč, Ostrava 3 596 825 Kč, Ústí n.L. 2 500 790 Kč. Vypočítané CAGR listing prices: Praha ~4,7 %, Brno ~6,4 %, Ostrava ~5,5–6,0 % (2010–2025). Praha/Brno poměr: 2010 = 1,57×; 2025 = 1,24× — Brno konverguje. UPOZORNĚNÍ: Olomouc YoY 2025 = −8,5 % (RealityMIX) vs. +13 % (CBA Monitor, transakční) — listing price data malých trhů jsou statisticky šumová; pro per-city kalibraci preferujeme CBA Monitor.",
      },
      {
        nazev: "ČNB — Property prices are overvalued (board member Benda interview)",
        url: "https://www.cnb.cz/en/public/media-service/interviews-articles/Property-prices-are-overvalued",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČNB konstatuje nadhodnocení pražského trhu (10 % nad fundamenty, 2017 odhad). 2022: ČR řadila mezi nejpřehřátější trhy v Evropě. ČNB implementovala makroprudenční omezení (LTV max 80 %, DTI max 8,8×, DSTI max 45 %). Přehřátí bylo driven zápornou reálnou sazbou — tento tailwind od 2022 neexistuje. Implikace: forward CAGR bude nižší než historická 9 %.",
      },
    ],
    odvozeniHodnoty: `
      HISTORICKÁ KALIBRACE (NÁRODNÍ):

        Perioda           CAGR    Popis
        2010–2015         1,0 %   Post-GFC stagnace; přehřátý trh 2008 se chladil
        2010–2019         4,5 %   Plný cyklus před COVID = nejreprezentativnější strukturální číslo
        2015–2019         9,2 %   Čistý nízkoúrokový boom (P/E expanze) = NEOPAKOVATELNÉ
        2010–2023         6,2 %   Full cycle vč. COVID anomálie (+20 %, +17 %, −2 %)
        2010–Q3/2025      6,3 %   Nejaktuálnější, ale distorzováno

        Volba strukturálního kotvícího čísla: 4,5 % (CAGR 2010–2019)
        Důvod: zahrnuje plný cyklus (stagnaci + boom), ale vylučuje neopakovatelné COVID efekty

      ROVNOVÁŽNÁ DEKOMPOZICE (POTVRZENÍ):

        Složka 1 — Inflace (ČNB cíl):                   2,0 %
        Složka 2 — Reálný mzdový příspěvek:
          Reálný mzdový růst ČR 2010–2019: ~2–3 % p.a.
          Income elasticita bytů ≈ 1,0 (empiricky: reálný CAGR ≈ reálný mzdový CAGR)
          Konzervativní odhad: 1,5 % (75 % mzdového růstu alokováno na bydlení)          1,5 %
        Složka 3 — Národní supply prémie (průměr):      0,5 %
        CELKEM NÁRODNÍ BASELINE:                        4,0 %

      PER-CITY DIFERENCIACE:

        Praha (4,5 %):
          Historický CAGR (listing, 2010–2025): ~4,7 % — přímá validace
          ČNB potvrzuje supply-demand imbalance (nejpřísnější povolování v ČR)
          ConBiz 2026: deficit 10 000 bytů ročně ke stabilizaci
          Stavební povolení: nejnižší za 25 let
          Zahraniční poptávka: ~25 % transakcí (Central Group data)
          Supply prémie: +1,0 p.b.
          Výsledek: 2,0 + 1,5 + 1,0 = 4,5 %

        Brno (4,5 %):
          Historický CAGR (listing, 2010–2025): ~6,4 % — ale zahrnuje catch-up konvergenci
          Praha/Brno poměr 2010 = 1,57×; 2025 = 1,24× → zbývá ~10–15 p.p. catch-up
          Tech hub (IBM, Y Soft, Red Hat) + VUT/MUNI = strukturální demand
          Konvergence ZPOMALÍ (hlavní fáze za námi) → forward ≈ Praha = 4,5 %
          Výsledek: 2,0 + 1,5 + 1,0 = 4,5 %

        Plzeň, Olomouc, H. Králové, Pardubice (4,0 %):
          Průmyslové nebo universitní základny; moderate supply/demand balance
          Odpovídá národnímu průměru 4,0 %
          Bez výrazné supply prémie ani penalty

        Č. Budějovice, Liberec, Zlín, Jihlava, Ostrava (3,5 %):
          Smíšená ekonomika nebo post-industriální výzvy
          Supply prémie blízko nuly (Liberec, Zlín, Jihlava) nebo negativní (Ostrava)
          Ostrava: populační odliv vs. nízká cena (catch-up z nízké základny); čistý efekt ≈ průměr −0,5 p.b.
          Výsledek: 2,0 + 1,5 + 0,0 = 3,5 %

        Ústí nad Labem, Karlovy Vary (3,0 %):
          Ústí: strukturální slabost (nízké příjmy, demografický odliv, nejnižší ceny v ČR)
          KV: turistická závislost, stárnoucí populace; RealityMIX YoY 2025: +13,7 %
            (cyclically elevated; structural rate nižší)
          Výsledek: 2,0 + 1,0 + 0,0 = 3,0 %

      OVERVALUATION KONTEXT A MEAN REVERSION:

        ČNB Summer 2025: ceny "viditelně nad dlouhodobými trendy"
        Toto implikuje, že v prvních 3–7 letech 30Y horizontu bude CAGR nižší
        (mean reversion z přehřáté základny). V pozdějších letech se vrátí na
        strukturální tempo. Na 30Y průměru se tyto efekty vyruší.
        Náš model zachycuje 30Y průměr → overvaluation nezpůsobuje adjustaci hodnot.

      KONSENSNÍ SHRNUTÍ:

        Zdroj                         Forward odhad pro ČR
        Eurostat CAGR 2010–2019:      4,5 % (strukturální)
        AEW Europe 2026 (ČR premium): 3,7–4,2 %
        Strukturální model:           4,0 %
        RealityMIX Praha 2010–2025:   4,7 % (listing, mírně nad trans.)

        Konsensní střed:              ~4,0–4,5 %
        Zvolené hodnoty Praha/Brno:   4,5 % (horní konec konsensu — justified supply premium)
        Zvolené hodnoty průměr:       4,0 %
        Zvolené hodnoty slabé trhy:   3,0–3,5 %

      SCÉNÁŘE NEJISTOTY (Praha, repr.):
        Pesimistický (demografický obrat + stavební boom):  2,5 %
        Centrální odhad (naše hodnota):                     4,5 %
        Optimistický (supply constraint trvalý + euro):     6,0 %
    `,
  },

  hodnoty: rustHodnotyNemovitostiValues,
};
