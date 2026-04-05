/**
 * Úroková sazba hypotéky — aktuální nejlepší nabídková sazba na trhu.
 *
 * ZDROJ DAT: Hypoindex.cz — přehled aktuálních sazeb bank.
 * - Únor 2026 (24. 2. 2026): https://www.hypoindex.cz/clanky/prehled-aktualnich-sazeb-hypotek-po-ctvrt-roce-je-na-trhu-opet-hypoteka-pod-4/
 * - Březen 2026 (25. 3. 2026): https://www.hypoindex.cz/clanky/prehled-aktualnich-sazeb-hypotek-hypoteky-zdrazuji-prvni-banky-zvedly-sazby-o-pul-procenta/
 * Datum přístupu: 2026-04-04.
 *
 * ZVOLENÁ HODNOTA: 3,99 % — Moneta Money Bank, fixace 3 roky, LTV do 80 %.
 * Tato sazba je nejnižší nabídkovou sazbou na českém hypotečním trhu ověřenou k 25. 3. 2026.
 * Podmínky: minimální měsíční obrat na účtu MMB 15 000 Kč, čerpání do 3 měsíců od podpisu.
 *
 * PROČ FIXACE 3 ROKY (ne 1 rok):
 *   3letá fixace je optimální volba pro aktivního kupujícího, protože:
 *   (a) Moneta nabízí stejnou sazbu 3,99 % pro 1Y i 3Y — žádná prémie za delší fixaci.
 *   (b) 3letá fixace eliminuje refinancovací riziko na kratší horizont a je nejčastěji
 *       doporučovanou délkou při aktuálním tržním prostředí.
 *   (c) 1letá fixace je nestabilní — roční refixace vytváří administrativní zátěž.
 *   Fio banka: 3Y/5Y = 4,18 % (o 0,19 p.b. výše než Moneta 3Y).
 *
 * TRHOVÝ KONTEXT (březen 2026 — nejaktuálnější dostupná data):
 *   Moneta 1Y/3Y:   3,99 % — nejnižší na trhu (potvrzeno i v březnu navzdory zdražení jiných)
 *   Fio 3Y/5Y:      4,18 % — druhá nejnižší
 *   UniCredit:      4,29 % (3Y)
 *   Raiffeisenbank: 4,84 % (3Y) — zdražila o 0,5 p.b. od února
 *   Partners Banka: 5,09 % (3Y) — zdražila o 0,5 p.b. od února, první banka nad 5 % od 11/2024
 *   ČSOB:           4,99–5,19 % — zdražila
 *   Swiss Life Hypoindex (průměr trhu): 4,89 %
 *
 * TRŽNÍ TREND (březen 2026): Trh zdražuje. První banky zvýšily sazby o 0,5 p.b. kvůli
 * růstu výnosů státních dluhopisů a IRS swapových sazeb. Moneta sazbu drží jako outlier.
 * Analytici očekávají pokračující mírné zdražování napříč trhem.
 *
 * ROZSAH PLATNOSTI V KALKULAČCE:
 *   Tento parametr platí POUZE pro první fixační období hypotéky (např. první 1–5 let).
 *   Po uplynutí první fixace kalkulačka přechází na urokovaSazbaHypotekyFuture (4,5 %)
 *   a tu používá pro všechny zbývající roky do splacení hypotéky (tj. rok 2 až rok 30).
 *   Hodnota 3,99 % proto NEMÁ přímý vliv na 30letý výsledek — ovlivňuje pouze splátky
 *   v prvním fixačním období. Parametr zachycuje startovní podmínky, ne dlouhodobý odhad.
 *
 *   Nejnižší dostupná sazba (3,99 %) je správnou výchozí hodnotou, protože:
 *   (1) Uživatel kalkulačky aktivně srovnává banky a hledá nejlepší nabídku.
 *   (2) Výsledek kalkulačky je citlivý především na urokovaSazbaHypotekyFuture
 *       (platí ~29 z 30 let), nikoliv na tuto počáteční sazbu.
 */

import type { AttributeDoc } from "./_types";

// =============================================================================
// HODNOTA
// =============================================================================

/**
 * Nejlepší aktuální nabídková úroková sazba hypotéky v %.
 * Zdroj: Moneta Money Bank, fixace 3 roky, LTV do 80 %, únor 2026.
 */
export const urokovaSazbaHypotekyValue: number = 3.99;

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const urokovaSazbaHypotekyDoc: AttributeDoc<number> = {
  kodNazev: "urokovaSazbaHypoteky",
  nazev: "Úroková sazba hypotéky",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Roční úroková sazba hypotečního úvěru sjednaná s bankou pro první fixační období.
    Udává se v procentech per annum (p.a.) a určuje výši měsíční splátky hypotéky
    POUZE po dobu platnosti první fixace. Po uplynutí fixace kalkulačka přechází
    automaticky na parametr urokovaSazbaHypotekyFuture (dlouhodobý rovnovážný odhad),
    který platí pro všechna další fixační období do konce splatnosti hypotéky.
    Tento parametr tedy ovlivňuje výsledek kalkulačky jen minimálně — dominantní vliv
    má urokovaSazbaHypotekyFuture, která platí zbývajících ~29 let.
  `,

  coZahrnuje: [
    "Nominální roční úroková sazba (p.a.) pro první fixační období",
    "Kompletní bankovní marže a rizikové přirážky zahrnuté v nabídkové sazbě",
  ],

  coNezahrnuje: [
    "Poplatky za zpracování úvěru, odhad nemovitosti, pojistné (jsou samostatné náklady)",
    "RPSN — reálné roční procentní sazby nákladů (vyšší než nominální sazba o poplatky)",
    "Sazbu po refixaci — tu modeluje parametr urokovaSazbaHypotekyFuture",
  ],

  coOvlivnujeHodnotu: [
    "Základní sazba ČNB (2T Repo rate) — přímý vliv na bankovní náklady financování",
    "3M PRIBOR — klíčová referenční sazba pro mezibankovní trh v ČR",
    "Délka fixace — kratší fixace zpravidla levnější (nižší prémie za úrokové riziko)",
    "LTV (Loan-to-Value) — nižší LTV = nižší riziko pro banku = nižší sazba",
    "Bonita žadatele (příjem, zaměstnanost, kreditní historie)",
    "Aktivní využití bankovních produktů (účet, pojištění, karta) — slevy 0,1–0,5 p.b.",
    "Konkurence na trhu — přítomnost agresivních hráčů (Moneta, Fio) tlačí sazby dolů",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Výchozí hodnota = nejnižší nabídková sazba publikovaná na Hypoindex.cz
      pro všechny banky k datu výzkumu, pro fixaci 3 roky.
      Zvolená sazba: Moneta Money Bank, fixace 3 roky, LTV do 80 %, únor 2026 → 3,99 %.
      Fixace 3Y je zvolena jako nejdelší fixace bez cenové prémie u Monety
      (1Y a 3Y mají stejnou sazbu 3,99 %).
    `,
    procTatoMetoda: `
      Kalkulačka slouží lidem, kteří aktivně zvažují koupi nemovitosti — tedy lidem, kteří
      budou banky srovnávat a snažit se získat co nejlepší podmínky. Průměrná sazba trhu
      (4,89 %) by systematicky nadhodnocovala náklady hypotéky oproti tomu, co motivovaný
      kupující reálně dosáhne. Nejnižší nabídková sazba je proto relevantnějším výchozím
      bodem. Uživatel může hodnotu libovolně upravit.
    `,
    presnost: `
      Hypoindex.cz publikuje minimální nabídkové sazby jednotlivých bank měsíčně na základě
      veřejně dostupných sazebníků. Data jsou přesná ke dni zveřejnění. Skutečná sazba pro
      konkrétního žadatele závisí na individuálním posouzení banky a splnění podmínek slevy.
    `,
    kdyNeniPresna: [
      "LTV nad 80 % — banky přičítají přirážku 0,5–1,0 p.b.",
      "Nízká bonita nebo nestabilní příjem — individuální riziková přirážka",
      "Nesplnění podmínek slevy (bez aktivního účtu, bez pojištění) — sazba vyšší o 0,1–0,5 p.b.",
      "Výrazná změna 2T Repo sazby ČNB — sazby na trhu reagují s odstupem týdnů až měsíců",
      "Délka fixace: tato hodnota platí pro 3letou fixaci — druhá nejnižší 3Y sazba je Fio 4,18 %",
    ],
  },

  tooltipText:
    "Nejlepší aktuálně dostupná úroková sazba hypotéky pro 3letou fixaci (Moneta 3Y, únor 2026). Upravte podle vaší konkrétní nabídky od banky.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "Hypoindex.cz — Přehled aktuálních sazeb hypoték (únor 2026)",
        url: "https://www.hypoindex.cz/clanky/prehled-aktualnich-sazeb-hypotek-po-ctvrt-roce-je-na-trhu-opet-hypoteka-pod-4/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Tabulka minimálních nabídkových sazeb 10 bank k 24. 2. 2026. Moneta Money Bank: 1Y = 3,99 %, 3Y = 3,99 %. Fio banka: 3Y = 4,18 %, 5Y = 4,18 %. Swiss Life Hypoindex průměr trhu: 4,89 %.",
      },
      {
        nazev: "Hypoindex.cz — Přehled aktuálních sazeb hypoték (březen 2026)",
        url: "https://www.hypoindex.cz/clanky/prehled-aktualnich-sazeb-hypotek-hypoteky-zdrazuji-prvni-banky-zvedly-sazby-o-pul-procenta/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Tabulka minimálních nabídkových sazeb 10 bank k 25. 3. 2026. Moneta: 1Y = 3,99 %, 3Y = 3,99 % (nezměněno). Partners Banka a Raiffeisenbank zdražily o 0,5 p.b. Analytici: další zdražování nevyhnutelné kvůli růstu IRS swapových sazeb. Moneta jako jediná drží sazbu pod 4 %.",
      },
      {
        nazev: "Swiss Life Hypoindex — vývoj průměrné sazby hypoték",
        url: "https://www.hypoindex.cz/hypoindex-vyvoj/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Průměrná sazba nových hypoték v ČR k únoru 2026: 4,89 %. Průměr zachycuje celý trh včetně méně konkurenčních bank — není vhodný jako výchozí hodnota pro kalkulačku orientovanou na nejlepší dostupnou nabídku.",
      },
      {
        nazev: "ČNB — Měnová statistika, úrokové sazby z nových úvěrů na bydlení",
        url: "https://www.cnb.cz/cnb/STAT.ARADY_PKG.PARAMETRY_SESTAVY?p_sestuid=21729&p_strid=AABBAA&p_lang=CS",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČNB publikuje průměrné úrokové sazby z nových úvěrů na bydlení. Tato data jsou vhodná pro porovnání s nabídkovými sazbami a pro sledování trendu. Leden 2026: průměrná sazba nových hypotéčních úvěrů cca 4,53 %.",
      },
    ],
    odvozeniHodnoty: `
      VÝBĚR HODNOTY:
        Nejnižší nabídková sazba na trhu k únoru 2026 je 3,99 % (Moneta Money Bank,
        fixace 1 rok I 3 roky, LTV do 80 %). Tato sazba byla jako první pod psychologickou
        hranicí 4 % za poslední tři měsíce a Moneta ji drží díky agresivní tržní strategii.

      PODMÍNKY SAZBY 3,99 %:
        - Minimální měsíční obrat na účtu Moneta: 15 000 Kč
        - Čerpání úvěru do 3 měsíců od podpisu smlouvy
        - LTV do 80 % (standardní pro kupující s 20% zálohou)
        Podmínky jsou splnitelné pro typického kupce — měsíční příjem pro hypotéku na
        průměrný byt v ČR obvykle přesahuje 15 000 Kč obratem na účtu.

      AKTUÁLNOST DAT (březen 2026):
        Data ověřena k 25. 3. 2026 — Moneta drží 3,99 % i navzdory tomu, že ostatní banky
        zdražují (Partners, Raiffeisenbank +0,5 p.b., ČSOB zdražila). Sazba 3,99 % je
        nadále platná, ale Moneta je na trhu výjimkou. Průměr trhu (4,89 %) ani neklesl.
        Tržní trend je vzestupný — Moneta se bude pravděpodobně přizpůsobovat v Q2 2026.

      TRHOVÝ KONTEXT (březen 2026):
        Druhá nejnižší sazba je Fio 4,18 % (3Y a 5Y fixace). Rozdíl 0,19 p.b. mezi
        nejlepší (3,99 %) a druhou nejlepší sazbou (4,18 %) je malý. Průměr trhu (4,89 %)
        je o 0,90 p.b. výše — odráží zdražující banky (KB, ČSOB, Partners, Raiffeisenbank).

      PROČ NE PRŮMĚR (4,89 %):
        Průměrná sazba je průměrem všech nových hypoték včetně bank, které nesoutěží
        primárně cenou (ČSOB, KB) a klientů s horší bonitou nebo LTV. Uživatel kalkulačky
        aktivně srovnává — výchozí hodnota průměru by zkreslovala výsledky směrem k
        nadhodnoceným nákladům hypotéky.
    `,
  },

  hodnoty: urokovaSazbaHypotekyValue,
};
