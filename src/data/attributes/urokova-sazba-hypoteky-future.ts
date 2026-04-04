/**
 * Budoucí (rovnovážná) úroková sazba hypotéky — předpoklad pro refixace v průběhu 30 let.
 *
 * ZVOLENÁ HODNOTA: 4,5 % p.a. (nominální)
 *
 * Kalkulačka modeluje 30letý horizont. Počáteční sazba (urokovaSazbaHypoteky = 3,99 %)
 * platí jen pro první fixační období. Po uplynutí první fixace platí tento parametr
 * pro všechna zbývající fixační období (tj. přibližně roky 2–30). Tento parametr tedy
 * dominuje výsledku kalkulačky — má vliv na ~29 z 30 let splácení.
 *
 * SPRÁVNÁ METODIKA PRO 30LETOU NOMINÁLNÍ PROGNÓZU ÚROKOVÉ SAZBY:
 *
 *   Možnosti přístupu a jejich hodnocení:
 *
 *   (A) Extrapolace aktuální sazby: "sazba zůstane jako dnes (3,99 % nebo 4,89 %)"
 *       ŠPATNĚ — ignoruje cykličnost, nikdy neplatí na 30letém horizontu.
 *
 *   (B) Průměr historické řady (Hypoindex 2015–2026): ~3,8–4,4 %
 *       SLABĚ — období 2016–2021 bylo historicky extrémní (záporné reálné sazby),
 *       průměr je silně distorzován a nepředstavuje "normál".
 *
 *   (C) ZVOLENO: Rovnovážná stavebnicová metoda (strukturální dekompozice):
 *       Nominální sazba = reálná neutrální sazba + inflační cíl + bankovní marže
 *       Tato metoda vychází ze strukturálních veličin, které jsou:
 *         (1) stabilní na desetiletích (neutrální reálná sazba, inflační cíl)
 *         (2) publikovány a pravidelně aktualizovány ČNB
 *         (3) robustní vůči krátkodobým cyklickým výkyvům
 *       Je to standardní přístup pro dlouhodobé finanční modely (IMF, ECB, ČNB)
 *       a přesně odpovídá tomu, co chceme — nominální rovnovážnou úrokovou sazbu.
 *
 *   PROČ JINOU METODU NEŽ PRO vynosInvestice?
 *     vynosInvestice: odhadujeme 30letý výnos aktiva → použijeme institucionální
 *       forward-looking modely (Vanguard, AQR, BNY, DMS).
 *     urokovaSazbaHypotekyFuture: odhadujeme 30letou průměrnou cenu dluhu → použijeme
 *       strukturální dekompozici nominální sazby. Tyto přístupy jsou metodologicky
 *       odlišné a oba jsou správné pro svůj účel.
 *
 * ODVOZENÍ HODNOTY 4,5 % (nominální):
 *
 *   Stavebnicová metoda (rovnovážná sazba):
 *     (1) Neutrální reálná sazba ČNB:      ~0,75 % (střed odhadu ČNB 0,5–1,0 %)
 *     (2) Cílová inflace ČNB:              +2,00 %
 *     (3) Rovnovážná nominální repo sazba: = 2,75 %
 *     (4) Bankovní marže (5Y mortgage):    +1,75 % (viz níže — odvozeno z Swiss Life Hypoindex)
 *     (5) Rovnovážná hypoteční sazba:      ≈ 4,50 %
 *
 *   Ověření tržními daty (březen 2026):
 *     Aktuální nejlepší sazba na trhu: 3,99 % (Moneta 1Y, outlier)
 *     Aktuální průměr trhu (Swiss Life Hypoindex): 4,89 %
 *     Rovnovážný odhad: 4,5 %
 *     → Nejlepší sazba (3,99 %) je pod rovnováhou o 0,5 p.b. — potvrzuje, že jsme stále
 *       blízko dna úrokového cyklu, odkud sazby porostou k rovnováze.
 *     → Průměr trhu (4,89 %) je 0,4 p.b. nad rovnovážným odhadem — tržní průměr je mírně
 *       nad rovnováhou z důvodu marží a aktuálního cyklu.
 *     → 4,5 % jako centrum je konzistentní: leží mezi best-in-market (3,99 %) a průměrem (4,89 %).
 *
 *   PRŮMĚRNÁ SAZBA, NE NEJLEPŠÍ — ZÁMĚRNÁ VOLBA:
 *     Počáteční sazba (urokovaSazbaHypoteky = 3,99 %) je nejlepší dostupná sazba —
 *     logika: kupující aktivně srovnává banky. Tento parametr (4,5 %) záměrně
 *     používá průměrnou rovnovážnou sazbu, ne nejlepší. Důvody:
 *       (1) Refixace jsou behaviorálně jiné: většina klientů v ČR přijme sazbu
 *           stávající banky bez aktivního srovnávání (switching costs: poplatky,
 *           nová smlouva, katastrální změna zástavy, časová náročnost).
 *       (2) Banky neakviziční refixace aktivně nesubvencují — výhodnější sazby
 *           jsou strategií pro přilákání NOVÝCH klientů.
 *       (3) Rovnovážná nejlepší sazba (~repo + 0,75 % = ~3,5 %) by systematicky
 *           podhodnocovala skutečné náklady refixace pro průměrného klienta.
 *     Hodnota 4,5 % = rovnovážná průměrná tržní sazba = realistický 30letý průměr
 *     pro klienta, který nerefixuje s extrémní agresivitou (= většina klientů).
 *
 *   POZNÁMKA K METODICE SPREADU:
 *     Banky neceníují fixní hypotéky nad 3M PRIBOR, nýbrž nad CZK IRS (Interest Rate Swap)
 *     pro příslušnou fixační dobu (5Y IRS ≠ 3M PRIBOR při obrácené výnosové křivce).
 *     Rovnovážný výpočet proto vychází ze základní sazby ČNB (repo), nikoli z PRIBOR.
 *     Bankovní marže 1,75 % nad repo sazbou = průměr trhu nad IRS při rovnovážné výnosové
 *     křivce (kde 5Y IRS ≈ repo). Marže nejlepších bank nad IRS: ~0,5–0,75 %.
 *
 *   Historický kontext:
 *     2015–2019 (nízké sazby):   ~2,0–3,0 % — pod rovnováhou
 *     2022–2023 (peak):          ~5,0–6,5 % — nad rovnováhou
 *     2026 (sestupná fáze):      ~4,0–5,0 %
 *     Průměr 2015–2026:          ~3,8 % — podhodnocený kvůli extrémně nízkým 2016–2021
 *     Průměr 2019–2026:          ~4,4 % — lepší aproximace normálu
 *     → Centrální odhad 30letého průměru: 4,5 %
 *
 * PROČ NE NIŽŠÍ (4,0 %):
 *   ČNB gouvernér Aleš Michl explicitně signalizoval "higher for longer" a nelze vyloučit
 *   další zvýšení kvůli fiskálnímu deficitu. Výhled PRIBOR 4,0 % (2027) a strukturální
 *   faktor vyšší inflace v konvergující ekonomice brání pádu pod 4 %.
 *
 * PROČ NE VYŠŠÍ (5,0 %):
 *   Rovnovážný rámec ČNB jasně ukazuje na konvergenci pod 3 % pro krátkodobé sazby
 *   při 2% inflaci. Mortgage spread 1,75 % dává 4,75 % jako horní mez rovnováhy.
 *   5 % by předpokládalo trvalou nadrovnovážnou politiku — nepravděpodobné na 30letém
 *   horizontu.
 */

import type { AttributeDoc } from "./_types";

// =============================================================================
// HODNOTA
// =============================================================================

/**
 * Předpokládaná průměrná úroková sazba hypotéky pro refixace v průběhu 30 let (% p.a.).
 * Odvozena z rovnovážné sazby ČNB + historické bankovní marže.
 */
export const urokovaSazbaHypotekyFutureValue: number = 4.5;

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const urokovaSazbaHypotekyFutureDoc: AttributeDoc<number> = {
  kodNazev: "urokovaSazbaHypotekyFuture",
  nazev: "Budoucí úroková sazba hypotéky (refixace)",
  jednotka: "% p.a.",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Předpokládaná průměrná nominální úroková sazba hypotéky platná při refixacích
    v průběhu 30letého horizontu kalkulačky. Jde o dlouhodobý rovnovážný odhad odvozený
    ze strukturálních veličin (neutrální reálná sazba + inflační cíl + bankovní marže) —
    ne aktuální tržní sazbu (tu zachycuje urokovaSazbaHypoteky), ne krátkodobou prognózu.
    Tento parametr platí přibližně pro roky 2–30 hypotéky a dominuje výsledku kalkulačky.
  `,

  coZahrnuje: [
    "Odhadovaná nominální sazba pro všechna budoucí fixační období (průměr přes 30 let)",
    "Rovnovážná repo sazba ČNB + historicky standardní bankovní marže",
  ],

  coNezahrnuje: [
    "Počáteční sazbu první fixace — tu modeluje urokovaSazbaHypoteky",
    "Krátkodobé výkyvy sazeb (aktuálně jsou sazby přechodně nad rovnováhou)",
    "Individuální přirážky za bonitu nebo LTV (předpokládáme standardní klienta)",
    "Výhody aktivního srovnávání při každé refixaci — model předpokládá průměrné chování, ne extremisticky aktivní shopping (to by dalo ~3,5 %)",
  ],

  coOvlivnujeHodnotu: [
    "Úroveň neutrální reálné sazby ČNB (dlouhodobý faktor)",
    "Inflační cíl ČNB (2 %) — kotva pro nominální sazby",
    "Fiskální politika — trvalý deficit zvyšuje prémii za riziko v sazbách",
    "Globální úroveň úrokových sazeb (ECB, Fed) — přenáší se do CZ přes kapitálové toky",
    "Konkurence na hypotečním trhu — ovlivňuje bankovní marže",
    "Konvergence české ekonomiky k EU — může strukturálně snižovat prémii za riziko",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Rovnovážná stavebnicová metoda:
        urokovaSazbaHypotekyFuture = neutrálníReálnáSazba + inflačníCíl + bankovníMarže
        = 0,75 % + 2,00 % + 1,75 % = 4,50 %
    `,
    procTatoMetoda: `
      Pro 30letou nominální prognózu úrokové sazby jsou k dispozici tři přístupy:
      (A) Extrapolace aktuální sazby — špatně, ignoruje cykličnost.
      (B) Průměr historické řady — slabě, 2016–2021 byla historicky extrémní dekáda
          záporných reálných sazeb, která distorzuje průměr.
      (C) Strukturální dekompozice (zvoleno): nominální sazba = reálná neutrální sazba
          + inflační cíl + bankovní marže. Vychází ze stabilních strukturálních veličin
          publikovaných ČNB. Je to standardní přístup IMF, ECB a ČNB pro dlouhodobé modely.
          Přesně odpovídá hledané veličině: nominální rovnovážná úroková sazba.

      Proč 4,5 % (průměrná sazba) a ne ~3,5 % (nejlepší sazba při rovnováze):
        urokovaSazbaHypoteky používá nejlepší sazbu pro PRVNÍ fixaci (aktivní kupující).
        Pro refixace je relevantní průměrná tržní sazba, protože >70 % klientů nerefixuje
        s plnou aktivitou srovnávání bank. Behaviorální asymetrie je záměrná a realistická.
    `,
    presnost: `
      Rovnovážná sazba je středním odhadem s nejistotou ±1–1,5 p.b. Na 30letém horizontu
      je každý bodový odhad nepřesný — klíčové je, že 4,5 % je obhajitelný centrální bod
      konsistentní s ČNB komunikací a historickými daty. Uživatel může hodnotu změnit pro
      scénářovou analýzu (pessimisticky 5,5 %, optimisticky 3,5 %).
    `,
    kdyNeniPresna: [
      "Trvalá fiskální krize v ČR — sazby by mohly zůstat trvale nad 5 %",
      "Zavedení eura v ČR — hypoteční sazby by se přiblížily eurozóně (~3–3,5 %)",
      "Deflační scénář (japonizace) — sazby by mohly klesnout pod 3 %",
      "Výrazná změna bankovní regulace (LTV limity, DSTI) — ovlivňuje kreditní marže",
    ],
    vzorec:
      "urokovaSazbaHypotekyFuture = neutrálníReálnáSazba(0,75 %) + inflačníCíl(2,0 %) + bankovníMarže(1,75 %) = 4,50 %",
  },

  tooltipText:
    "Předpokládaná sazba při refixacích hypotéky v průběhu 30 let. Vychází z rovnovážné sazby ČNB. Upravte pro pesimistický/optimistický scénář.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "ČNB — Aktuální prognóza (únor 2026): PRIBOR a inflace",
        url: "https://www.cnb.cz/cs/menova-politika/prognoza/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "3M PRIBOR forecast: 3,6 % (2026), 4,0 % (2027). Inflace: 1,6 % (2026), 2,1 % (2027). HDP: 2,9 % (2026 i 2027). ČNB předpokládá přibližnou stabilitu krátkodobých sazeb v 1H 2026 a mírné zvýšení v 2H 2026.",
      },
      {
        nazev: "ČNB — Zpráva o měnové politice (podzim 2025): neutrální reálná sazba",
        url: "https://www.cnb.cz/cs/menova-politika/zpravy-o-menove-politice/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČNB odhaduje neutrální reálnou úrokovou sazbu v ČR v rozmezí 0,5–1,0 %. Při inflačním cíli 2 % implikuje rovnovážnou nominální repo sazbu ~2,5–3,0 %.",
      },
      {
        nazev: "Hypoindex.cz — vývoj Swiss Life Hypoindexu (2015–2026)",
        url: "https://www.hypoindex.cz/hypoindex-vyvoj/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Historická průměrná sazba hypoték v ČR: minimum ~1,9 % (2021), maximum ~6,3 % (2023), aktuálně 4,89 % (únor 2026). Spread 5Y mortgage vs. 3M PRIBOR se historicky pohyboval v rozmezí 1,5–2,0 p.b.",
      },
      {
        nazev: "CBA Monitor — komentář k prognóze ČNB (2026)",
        url: "https://www.cbamonitor.cz/aktuality/prisnejsi-menove-podminky-ponechaly-pro-cnb-otevrene-moznosti-nova-predikce-cnb-otevira-cestu-k-opatrnejsi-komunikaci-ve-zbytku-roku",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Komentář k únorové prognóze ČNB: přísnější měnové podmínky ponechávají ČNB otevřené možnosti. Guverenér Michl signalizoval 'higher for longer'. Nová prognóza otevírá cestu k opatrnější komunikaci.",
      },
    ],
    odvozeniHodnoty: `
      STAVEBNICOVÁ KONSTRUKCE:

        Složka 1 — Neutrální reálná sazba:
          ČNB odhaduje neutrální reálnou sazbu na 0,5–1,0 %. Střed = 0,75 %.
          Tato veličina je relativně stabilní a odráží strukturální faktory ekonomiky
          (produktivita, demografika, globální úspory). Konsistentní s ECB odhadem ~0,5–1,0 %.

        Složka 2 — Inflační cíl ČNB:
          2,0 % (od roku 2010, shoduje se s cílem ECB od 2021).
          Neutrální nominální repo sazba = 0,75 % + 2,0 % = 2,75 %.

        Složka 3 — Bankovní marže nad repo sazbou ČNB:
          Swiss Life Hypoindex reportuje průměrný spread 5Y hypotéky vs. 3M PRIBOR
          na úrovni 1,5–2,0 p.b. (historicky). Střed = 1,75 p.b. (naše volba).
          POZNÁMKA O ZÁKLADNĚ: spread je citován nad PRIBOR, ale pro rovnovážný výpočet
          používáme marži nad repo sazbou. Při rovnovážné výnosové křivce (flat)
          platí: 3M PRIBOR ≈ repo ≈ 2,75 %, takže marže 1,75 % nad repo = 1,75 % nad IRS.
          Tato marže zahrnuje: bankovní náklady financování, kreditní riziko, operativní
          marži, likviditní prémii a prémii za úrokové riziko fixace.
          Marže nejlepších bank nad IRS při rovnováze: ~0,5–0,75 % (ne 1,75 %) — viz sekce
          "PRŮMĚRNÁ SAZBA, NE NEJLEPŠÍ".

        Výsledek: 0,75 % + 2,0 % + 1,75 % = 4,50 %

      OVĚŘENÍ TRŽNÍMI DATY (březen 2026):
        Nejlepší sazba trhu:     3,99 % (Moneta 1Y) — pod rovnováhou o 0,5 p.b.
        Průměr trhu (Hypoindex): 4,89 % — nad rovnováhou o 0,4 p.b.
        Rovnovážný odhad:        4,50 % — leží mezi oběma krajními hodnotami trhu.

        Interpretace: Jsme v blízkosti dna cyklu (nejlepší sazba 3,99 %), ale průměr trhu
        (4,89 %) již naznačuje tlak výše. 4,5 % jako dlouhodobá střední hodnota je
        konzistentní s touto distribucí.

        Tržní trend (březen 2026): Banky začínají zdražovat (+0,5 p.b. u Partners, Raiffeisenbank).
        Analytici očekávají pokračování — trh konverguje od dna cyklu k průměru.

        POZNÁMKA K METODICE: Banky ceníují fixní hypotéky primárně nad CZK IRS (Interest Rate
        Swap) pro příslušný tenor, nikoli nad 3M PRIBOR. Při obrácené výnosové křivce (2023–2026)
        je 5Y IRS nižší než 3M PRIBOR — proto nejnižší sazba (3,99 %) může být pod PRIBOR (3,6 %).
        Rovnovážný výpočet v tomto souboru proto vychází ze základní sazby ČNB (repo/neutrální),
        nikoli z PRIBOR. Tato metodika je robustnější pro dlouhodobý odhad.

      SCÉNÁŘOVÁ ANALÝZA:
        Pesimistický scénář (fiskální krize, ECB utahuje): 5,5 %
        Centrální odhad (rovnováha): 4,5 %
        Optimistický scénář (euro, japonizace): 3,5 %
    `,
  },

  hodnoty: urokovaSazbaHypotekyFutureValue,
};
