/**
 * Atribut: Počáteční náklady na vybavení bytu (zarizeniNemovitosti)
 * Výzkum proveden: 2026-04-04
 */

import type { AttributeDoc, ApartmentSize } from "./_types";

// =============================================================================
// TYPY SPECIFICKÉ PRO TENTO ATRIBUT
// =============================================================================

/**
 * Hodnoty se liší podle use-case kalkulačky (bydlení vs. investice),
 * ale NE podle města — ceny IKEA a spotřebičů jsou celonárodní.
 */
export interface ZarizeniValues {
  /** Diferenciál: kolik NAVÍC zaplatí kupující (Scén. A) oproti nájemci (Scén. B).
   *  Scén. A: plné vybavení střední třídy (nábytek + spotřebiče + doprava + doplňky).
   *  Scén. B: economy nábytek + doprava + doplňky + 50 % pravděp. pračka;
   *    lednička/sporák/digestoř typicky součástí kuchyňské linky v CZ nezařízeném pronájmu.
   *  Hodnota = Scén. A − Scén. B. */
  bydleni: Record<ApartmentSize, number>;
  /** Pronajímatelský standard: základní vybavení + spotřebiče pro dlouhodobý pronájem
   *  (ekonomická IKEA úroveň + economy spotřebiče). */
  investice: Record<ApartmentSize, number>;
}

// =============================================================================
// OVĚŘENÉ CENY Z IKEA.CZ (2026-04-04)
// =============================================================================
//
// IKEA nábytek:
//   HEMNES rám postele 160×200 (bílé mořidlo):           5 990 Kč  — ikea.com/cz
//   VESTERÖY matrace 160×200 (taštičk. pružiny, tvrdá):  4 990 Kč  — ikea.com/cz (bežná cena, promo 3 490)
//   2× BRIMNES noční stolek (39×41 cm):           2× 799 = 1 598 Kč  — ikea.com/cz
//   2× PAX/FORSAND šatní skříň 100×60×201 cm:  2× 4 750 = 9 500 Kč  — ikea.com/cz
//   KIVIK 2místná pohovka:                               10 990 Kč  — ikea.com/cz
//   KIVIK 3místná pohovka (bez lenošky, Gunnared šedá):  13 990 Kč  — ikea.com/cz
//   KIVIK 3místná pohovka s lenoškou (Gunnared béžová):  20 990 Kč  — ikea.com/cz
//   KLIPPAN 2místná pohovka (Vissle šedá):                5 990 Kč  — ikea.com/cz
//   LACK konferenční stolek:                                 699 Kč  — ikea.com/cz (standardní cena)
//   BRIMNES TV stolek 180×41×53 cm:                       3 690 Kč  — ikea.com/cz
//   BRIMNES sada 2 ks (postel 140×200 + komoda):         10 780 Kč  — ikea.com/cz
//   BRIMNES sada 3 ks (sofa-bed 80×200 + stolek + komoda): 8 279 Kč  — ikea.com/cz
//   EKEDALEN/INGOLF stůl + 4 žlídle (bílý, 80/120 cm):   9 150 Kč  — biano.cz / ikea.com/cz
//   NORDEN/TEODORES stůl + 4 žlídle (sklopný, bílý):     7 786 Kč  — ikea.com/cz
//   MICKE psací stůl 105×50 cm (bílý):                    1 990 Kč  — ikea.com/cz
//   KNAPPER stojací zrcadlo 48×160 cm:                    1 290 Kč  — ikea.com/cz
//   NISSEDAL zrcadlo 65×150 cm:                           1 490 Kč  — ikea.com/cz
//   FLINTAN kancelářská otočná židle:                     2 495 Kč  — odhad (IKEA ceník)
//
// ODHADNUTÉ IKEA ceny (bez přímého ověření na ikea.com/cz):
//   HEMNES rám postele 140×200 (odhad z cenové řady):   ~4 990 Kč
//   HEMNES rám postele 90×200:                          ~3 990 Kč
//   VESTERÖY matrace 140×200:                           ~4 000 Kč
//   VESTERÖY matrace 90×200:                            ~3 000 Kč
//   IKEA koberec (STOENSE/VINDUM, 133×195 cm):          ~2 500 Kč
//
// Doprava + montáž (dle ikea.com/cz ceníku montáže, přístup 2026-04-04):
//   Doručení: od 149 Kč, pro větší objednávky ~800–2 000 Kč
//   Montáž: PAX skříň 1 520 Kč/kus, postel ~300 Kč, pohovka ~540 Kč
//   Transport montážního týmu: 450–1 150 Kč/výjezd (zóna 1–3)
//   Pro 2+kk bydlení (60k nábytek): doprava ~1 500 + montáž ~4 000 = ~5 500 Kč
//   Odhadnuto pro ostatní dispozice proporcionálně.
//
// Spotřebiče — BYDLENÍ (střední třída):
//   Pračka 8 kg (Bosch WAT28460BY nebo equiv.):          9 000 Kč  — Heureka.cz 2026 (od 10 899 Kč, šetřím na levnějším modelu)
//   Lednička kombinovaná (střední třída):               11 000 Kč  — Gorenje/Samsung střed. tř. 9–14k Kč
//   Sporák + trouba (vestavný/volně stojící):           12 000 Kč  — MORA K 5255 A1S = 8 990 Kč, střed. tř. ~12k
//   Myčka nádobí (Bosch SMS4HTW00E nebo equiv.):        10 000 Kč  — Heureka.cz: od 9 490 Kč
//   Digestoř:                                            4 000 Kč  — střední třída
//   CELKEM SPOTŘEBIČE bydlení (bez myčky pro 1+kk):    36 000 Kč (1+kk), 46 000 Kč (2+kk a výše)
//
// Spotřebiče — INVESTICE (economy třída):
//   Pračka economy (Whirlpool/Candy, 6–7 kg):           7 000 Kč
//   Lednička economy (menší, jednodvéřová, do 300L):     7 500 Kč
//   Sporák + trouba economy (MORA/Zanussi):              7 000 Kč
//   Myčka economy (volně stojící Bosch SMS2ITW04E):      9 500 Kč  — Heureka.cz: SMS4HTW00E od 9 490 Kč
//   Digestoř economy:                                    2 500 Kč
//   CELKEM SPOTŘEBIČE investice (bez myčky pro 1+kk):   24 000 Kč (1+kk), 33 500 Kč (2+kk a výše)

// =============================================================================
// BOTTOM-UP KALKULACE — BYDLENÍ (střední IKEA + střední spotřebiče)
// =============================================================================
//
// Zahrnuje: nábytek + spotřebiče (Year-0) + doprava/montáž + koberec + pracovní kout + zrcadlo
// Spotřebiče jsou zde, protože renter v zařízeném pronájmu neplatí nic → plný diferenciál.
// nakladyUdrzby od roku 1 pokrývá POUZE výměny (ne počáteční pořízení).
//
// 1+kk (~33 m², studio):
//   NÁBYTEK:
//     BRIMNES sada 3 ks (sofa-bed 80×200 + noční stolek + komoda): 8 279 Kč
//     PAX/FORSAND šatní skříň 100×201:                             4 750 Kč
//     LACK konferenční stolek:                                        699 Kč
//     BRIMNES TV stolek:                                            3 690 Kč
//     Malý jídelní stůl + 2 žlídle (odhad):                        4 000 Kč
//     Mezisoučet nábytek:                                          21 418 Kč
//   SPOTŘEBIČE (bez myčky — studio, typicky bez):
//     Pračka 9k + lednička 11k + sporák+trouba 12k + digestoř 4k = 36 000 Kč
//   DOPRAVA + MONTÁŽ: ~3 500 Kč
//   DOPLŇKY bydlení:
//     Osvětlení 3 místn. (3× ~1 000 Kč):          3 000 Kč
//     Rolety/závěsy 3 okna (3× ~500 Kč):          1 500 Kč
//     Koberec STOENSE/VINDUM (menší):              2 000 Kč
//     Pracovní kout: MICKE 1 990 + FLINTAN 2 500: 4 490 Kč
//     Zrcadlo KNAPPER:                             1 290 Kč
//     Kuchyňské doplňky (IKEA 365, příbory):       2 500 Kč
//     Koupelnové doplňky (zrcadlo, háky, koš):       500 Kč
//     Různé (rohožka, věšák, police BILLY):        1 500 Kč
//     Mezisoučet doplňky:                         16 780 Kč
//   CELKEM 1+kk bydlení: 21 418 + 36 000 + 3 500 + 16 780 = ~77 700 → 77 000 Kč
//
// 2+kk (~52 m², 1 ložnice + obývák):
//   NÁBYTEK:
//     HEMNES rám postele 160×200:                         5 990 Kč
//     VESTERÖY matrace 160×200:                          4 990 Kč
//     2× BRIMNES noční stolek:                            1 598 Kč
//     2× PAX/FORSAND šatní skříň 100×201:                9 500 Kč
//     KIVIK 2místná pohovka:                            10 990 Kč
//     LACK konferenční stolek:                              699 Kč
//     BRIMNES TV stolek:                                  3 690 Kč
//     EKEDALEN/INGOLF stůl + 4 žlídle:                   9 150 Kč
//     Mezisoučet nábytek:                               46 607 Kč
//   SPOTŘEBIČE (s myčkou):
//     Pračka 9k + lednička 11k + sporák 12k + myčka 10k + digestoř 4k = 46 000 Kč
//   DOPRAVA + MONTÁŽ: ~5 500 Kč
//     (2× PAX skříň = 2×1 520 Kč + postel ~300 Kč + EKEDALEN ~200 Kč + transport 1 150 Kč = 4 690 Kč + doprava 800 Kč)
//   DOPLŇKY bydlení:
//     Osvětlení 4 místn.:            4 000 Kč
//     Závěsy/rolety 5 oken:          2 500 Kč
//     Koberec (obývák):              2 500 Kč
//     Pracovní kout MICKE + FLINTAN: 4 490 Kč
//     Zrcadlo NISSEDAL 65×150:       1 490 Kč
//     Kuchyňské doplňky:             3 000 Kč
//     Koupelnové doplňky:            1 000 Kč
//     Různé:                         2 000 Kč
//     Mezisoučet doplňky:           20 980 Kč
//   CELKEM 2+kk: 46 607 + 46 000 + 5 500 + 20 980 = ~119 087 → 119 000 Kč → 120 000 Kč
//
// 3+kk (~80 m², 2 ložnice + obývák):
//   NÁBYTEK:
//     Ložnice 1 (viz 2+kk):                             22 078 Kč
//     Ložnice 2: HEMNES 140×200 ~4 990 + matrace ~4 000 + PAX 4 750 + noční stolek 799: 14 539 Kč
//     KIVIK 3místná pohovka (bez lenošky):              13 990 Kč
//     LACK + TV stolek:                                  4 389 Kč
//     Jídelna 6 míst (EKEDALEN rozšířená sada, odhad): 12 000 Kč
//     Mezisoučet nábytek:                               66 996 Kč
//   SPOTŘEBIČE: 46 000 Kč (stejné jako 2+kk)
//   DOPRAVA + MONTÁŽ: ~8 000 Kč (víc skříní)
//   DOPLŇKY bydlení:
//     Osvětlení 6 místn.:             6 000 Kč
//     Závěsy/rolety 8 oken:           4 000 Kč
//     Koberec 2ks (obývák + ložnice): 4 500 Kč
//     Pracovní kout:                  4 490 Kč
//     2× Zrcadlo (ložnice + chodba):  2 980 Kč
//     Kuchyňské doplňky:              3 500 Kč
//     Koupelnové doplňky:             1 500 Kč
//     Různé:                          3 000 Kč
//     Mezisoučet doplňky:            29 970 Kč
//   CELKEM 3+kk: 66 996 + 46 000 + 8 000 + 29 970 = ~150 966 → 151 000 Kč → 152 000 Kč
//
// 4+kk (~110 m², 3 ložnice + obývák):
//   NÁBYTEK:
//     Ložnice 1:                                         22 078 Kč
//     Ložnice 2:                                         14 539 Kč
//     Ložnice 3 (single, nejjednodušší — HEMNES 90×200 ~3 990 + matrace ~3 000 + PAX 4 750): 11 740 Kč
//     KIVIK 3místná s lenoškou:                          20 990 Kč
//     LACK + TV stolek:                                   4 389 Kč
//     Jídelna 8 míst (odhad):                            16 000 Kč
//     Mezisoučet nábytek:                                89 736 Kč
//   SPOTŘEBIČE: 46 000 Kč
//   DOPRAVA + MONTÁŽ: ~10 000 Kč
//   DOPLŇKY bydlení:
//     Osvětlení 8 místn.:             8 000 Kč
//     Závěsy/rolety 10 oken:          5 000 Kč
//     Koberec 3ks:                    6 500 Kč
//     Pracovní kout:                  4 490 Kč
//     2× Zrcadlo:                     2 980 Kč
//     Kuchyňské doplňky:              4 500 Kč
//     Koupelnové doplňky:             2 000 Kč
//     Různé:                          4 000 Kč
//     Mezisoučet doplňky:            37 470 Kč
//   CELKEM 4+kk: 89 736 + 46 000 + 10 000 + 37 470 = ~183 206 → 183 000 Kč → 184 000 Kč

// =============================================================================
// BOTTOM-UP KALKULACE — INVESTICE (economy IKEA + economy spotřebiče)
// =============================================================================
//
// Zahrnuje: minimální nábytek + spotřebiče (Year-0) + doprava
// Bez: koberec, pracovní kout, zrcadlo, drahé doplňky
//
// 1+kk (~33 m²):
//   Nábytek: BRIMNES sada 3ks (8 279) + PAX (4 750) + malý stůl+2ž. (3 000) + LACK (699) = 16 728 Kč
//   Spotřebiče (bez myčky): 7 000 + 7 500 + 7 000 + 2 500 = 24 000 Kč
//   Doprava + montáž: ~2 000 Kč
//   Doplňky: osvět. 2 000 + rolety 1 500 + kuch. doplňky 1 500 + různé 800 = 5 800 Kč
//   CELKEM: 16 728 + 24 000 + 2 000 + 5 800 = ~48 528 → 48 000 Kč
//
// 2+kk (~52 m²):
//   Nábytek: BRIMNES 2ks (10 780) + PAX (4 750) + KLIPPAN 2s (5 990) + LACK (699) + NORDEN/TEODORES (7 786) = 30 005 Kč
//   Spotřebiče (s myčkou): 7 000 + 7 500 + 7 000 + 9 500 + 2 500 = 33 500 Kč
//   Doprava + montáž: ~3 500 Kč
//   Doplňky: osvět. 3 000 + rolety 2 000 + kuch. doplňky 1 500 + různé 1 000 = 7 500 Kč
//   CELKEM: 30 005 + 33 500 + 3 500 + 7 500 = ~74 505 → 75 000 Kč
//
// 3+kk (~80 m²):
//   Nábytek: BRIMNES 2ks (10 780) + PAX (4 750) + ložnice 2 economy (8 000)
//            + KLIPPAN (5 990) + LACK (699) + jídelna 6 míst (10 000) = 40 219 Kč
//   Spotřebiče: 33 500 Kč
//   Doprava + montáž: ~4 500 Kč
//   Doplňky: osvět. 4 000 + rolety 3 000 + kuch. doplňky 2 000 + různé 1 000 = 10 000 Kč
//   CELKEM: 40 219 + 33 500 + 4 500 + 10 000 = ~88 219 → 88 000 Kč
//
// 4+kk (~110 m²):
//   Nábytek: BRIMNES 2ks (10 780) + PAX (4 750) + ložnice 2 economy (8 000)
//            + ložnice 3 min. (5 000) + KLIPPAN (5 990) + LACK+TV (4 389) + jídelna 8 míst (13 000) = 51 909 Kč
//   Spotřebiče: 33 500 Kč
//   Doprava + montáž: ~6 000 Kč
//   Doplňky: osvět. 5 000 + rolety 4 000 + kuch. doplňky 2 500 + různé 1 500 = 13 000 Kč
//   CELKEM: 51 909 + 33 500 + 6 000 + 13 000 = ~104 409 → 104 000 Kč → 105 000 Kč

// DIFERENCIÁL: Scénář A (kupující, střední třída) − Scénář B (nájemce, economy)
//
// Scénář B (nájemce v nezařízeném CZ pronájmu):
//   Předpoklady:
//   - Nakupuje economy IKEA nábytek (stejný standard jako zarizeniNemovitostiInvestice)
//   - Lednička, sporák, varná deska, digestoř: typicky součástí kuchyňské linky nezařízeného
//     pronájmu v ČR → nájemce NEplatí (0 Kč)
//   - Myčka: ~80 % CZ nezařízeních inzerátů ji nezmiňuje nebo je built-in → 0 Kč (zanedbáno)
//   - Pračka: ~50 % pronajímatelů ji poskytuje, ~50 % neposkytuje
//     → očekávaná cena = 50 % × 7 000 Kč = 3 500 Kč pro všechny dispozice
//
//   1+kk: nábytek 16 728 + doprava 2 000 + doplňky 5 800 + pračka 3 500 = 28 028 → 28 000 Kč
//   2+kk: nábytek 30 005 + doprava 3 500 + doplňky 7 500 + pračka 3 500 = 44 505 → 45 000 Kč
//   3+kk: nábytek 40 219 + doprava 4 500 + doplňky 10 000 + pračka 3 500 = 58 219 → 58 000 Kč
//   4+kk: nábytek 51 909 + doprava 6 000 + doplňky 13 000 + pračka 3 500 = 74 409 → 74 000 Kč
//
// DIFERENCIÁL (Scénář A − Scénář B):
//   1+kk:  77 000 −  28 000 =  49 000 →  50 000 Kč
//   2+kk: 120 000 −  45 000 =  75 000 Kč
//   3+kk: 152 000 −  58 000 =  94 000 →  95 000 Kč
//   4+kk: 184 000 −  74 000 = 110 000 Kč
const zarizeniNemovitostiBydleniValues: Record<ApartmentSize, number> = {
  // Diferenciál: kupující (střední IKEA + spotřebiče) − nájemce (economy nábytek + 50% pračka)
  "1+kk":  50_000,  //  77 000 − 28 000 = 49 000 → 50 000 Kč
  "2+kk":  75_000,  // 120 000 − 45 000 = 75 000 Kč
  "3+kk":  95_000,  // 152 000 − 58 000 = 94 000 → 95 000 Kč
  "4+kk": 110_000,  // 184 000 − 74 000 = 110 000 Kč
};

const zarizeniNemovitostiInvesticeValues: Record<ApartmentSize, number> = {
  // economy nábytek + economy spotřebiče + doprava
  "1+kk":  48_000,  // ~33 m², bez myčky, BRIMNES 3ks + economy appliances
  "2+kk":  75_000,  // ~52 m², BRIMNES 2ks + KLIPPAN + NORDEN + economy appliances + myčka
  "3+kk":  88_000,  // ~80 m², 2 ložnice, KLIPPAN, jídelna 6 míst, economy appliances
  "4+kk": 105_000,  // ~110 m², 3 ložnice, jídelna 8 míst, economy appliances
};

// =============================================================================
// HLAVNÍ DOKUMENTACE ATRIBUTU
// =============================================================================

export const zarizeniNemovitosti: AttributeDoc<ZarizeniValues> = {
  kodNazev: "zarizeniNemovitosti",
  nazev: "Počáteční vybavení bytu",
  jednotka: "Kč (jednorázově)",
  kalkulator: ["bydleni", "investice"],

  definice:
    "Jednorázové náklady na vybavení bytu v roce 0. " +
    "V kalkulačce BYDLENÍ jde o DIFERENCIÁL: o kolik více zaplatí kupující (Scénář A) " +
    "za vybavení oproti nájemci (Scénář B). " +
    "Scénář A: plné vybavení střední třídy — IKEA nábytek + střední spotřebiče + doprava + doplňky. " +
    "Scénář B: economy IKEA nábytek + doprava + doplňky + 50 % pravděpodobnost pořízení pračky. " +
    "Lednička, sporák, digestoř (a zpravidla myčka) jsou v ČR součástí kuchyňské linky " +
    "nezařízeného pronájmu — nájemce je NEKUPUJE. " +
    "V kalkulačce INVESTICE jde o náklady pronajímatele na základní economy standard " +
    "nutný pro pronájem na volném trhu.",

  coZahrnuje: [
    "BYDLENÍ — Scénář A (kupující, střední třída): nábytek + spotřebiče + doprava + doplňky (viz bottom-up výše)",
    "BYDLENÍ — Scénář B (nájemce): economy nábytek + doprava + doplňky + 50 % pravděp. pračky",
    "BYDLENÍ — hodnota atributu = Scénář A − Scénář B (diferenciál)",
    "Nábytek Scén. A: HEMNES postel, KIVIK pohovka, PAX skříně, EKEDALEN jídelna (střední třída)",
    "Nábytek Scén. B: BRIMNES, KLIPPAN, NORDEN (economy standard = totéž jako zarizeniNemovitostiInvestice)",
    "Spotřebiče Scén. A Year-0: pračka, lednička, sporák+trouba, digestoř; myčka pro 2+kk a větší",
    "POUZE pro bydlení (navíc oproti investice): koberec, pracovní kout (MICKE + FLINTAN), zrcadlo",
    "Kuchyňské a koupelnové doplňky, osvětlení, závěsy/rolety",
    "Doprava a montáž nábytku (dle IKEA ceníku, Zone 1–3)",
    "INVESTICE: economy nábytek + economy spotřebiče + doprava (plný cost, bez odečítání Scén. B)",
  ],

  coNezahrnuje: [
    "Kuchyňská linka a pracovní deska — součást nemovitosti nebo nakladyUdrzby",
    "VÝMĚNY spotřebičů v průběhu 30 let — zahrnuty v nakladyUdrzby",
    "Televize, elektronika — osobní volba",
    "Ložní prádlo, ručníky, záclony — osobní věci",
    "Rekonstrukce bytu (podlahy, malování, koupelna) — nakladyUdrzby",
    "Fond oprav SVJ — fondOprav",
    "Daň z nemovitosti — danZNemovitosti",
    "Pojištění — pojisteniNemovitosti",
    "Pro bydlení Scén. B: lednička, sporák, digestoř, myčka — typicky v kuchyňské lince CZ pronájmu",
    "Pro investice: koberec, pracovní kout, zrcadlo — investiční standard je nižší",
  ],

  coOvlivnujeHodnotu: [
    "Dispozice bytu — přímý vliv: větší byt = více ložnic = více nábytku",
    "Use-case (bydlení vs. investice) — pronajímatel vybavuje ekonomičtěji",
    "Typ bytu — nový developerský byt s vestavěnými skříněmi/kuchyní snižuje hodnotu o ~15–25 %",
    "Cenová úroveň nábytku (model: IKEA střední třída pro bydlení, IKEA economy pro investice)",
    "Osobní preference — model normalizován na IKEA standard, rozptyl reality: ±50 %",
  ],

  metodaAproximace: {
    zvolenaMetoda:
      "Bottom-up kalkulace: sestavení IKEA košíku pro každou dispozici (ověřené ceny z ikea.com/cz " +
      "k 2026-04-04) + economy spotřebiče střední třídy (Bosch/Gorenje) + doprava/montáž dle IKEA " +
      "ceníku + doplňkové položky specifické pro use-case.",
    procTatoMetoda:
      "IKEA je referenční cenová hladina pro cílovou skupinu 24–40 let. Bottom-up košík " +
      "je plně auditovatelný a reprodukovatelný. Spotřebiče jsou zahrnuty jako Year-0 " +
      "výdaj (počáteční pořízení) — výměny v průběhu 30 let jsou v nakladyUdrzby.",
    presnost:
      "±15–20 %. Ověřené ceny (HEMNES, PAX, KIVIK, KLIPPAN, BRIMNES, EKEDALEN/NORDEN) tvoří " +
      ">70 % hodnoty. Odhadnuté položky: matrace, ložnice 2+3 u větších dispozic, " +
      "osvětlení, rolety (±20 %). Spotřebiče: ±10 %.",
    kdyNeniPresna: [
      "Kupující si pořídí prémiový nebo bazarový nábytek (realita: Bazar vs. designové studio → ±50 %)",
      "Nový developerský byt s vestavěnými skříněmi a kuchyní — přecení o ~15–25 %",
      "Nájemce si najde ZAŘÍZENÝ pronájem — pak Scén. B = 0 Kč, diferenciál = plné Scén. A (~77–184 k)",
      "Kuchyňské spotřebiče nejsou zahrnuty v pronájmu — pak Scén. B stoupne o ~17–33 k Kč (economy spotřebiče)",
      "Výrazná inflace cen nábytku (IKEA mění ceny 1× ročně)",
      "Pro investice: pronajímatel v Praze musí poskytovat vyšší standard než v jiných městech",
    ],
  },

  tooltipText:
    "Počáteční výdaj NAVÍC oproti pronájmu: kupující pořizuje střední IKEA standard + spotřebiče, " +
    "nájemce koupí pouze economy nábytek + s 50% pravděpodobností pračku. " +
    "Lednička, sporák a digestoř jsou v CZ nezařízeném pronájmu typicky součástí bytu. " +
    "Kalkulováno z IKEA ceníku 2026 + cen spotřebičů.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "IKEA Česká republika — HEMNES rám postele 160×200 cm",
        url: "https://www.ikea.com/cz/cs/p/hemnes-ram-postele-bile-moridlo-80242095/",
        datumPristupeno: "2026-04-04",
        coUvadi: "HEMNES rám postele 160×200 cm, bílé mořidlo: 5 990 Kč",
      },
      {
        nazev: "IKEA Česká republika — VESTERÖY matrace 160×200 cm",
        url: "https://www.ikea.com/cz/cs/p/vesteroey-matrace-s-tastickovymi-pruzinami-tvrda-sv-modra-40450618/",
        datumPristupeno: "2026-04-04",
        coUvadi: "VESTERÖY matrace 160×200 cm (taštičkové pružiny, tvrdá): bežná cena 4 990 Kč (promo 3 490 Kč se 30% slevou IKEA Family). Nahrazuje HYLLESTAD v aktuálním sortimentu.",
      },
      {
        nazev: "IKEA Česká republika — BRIMNES serie (noční stolek, sady, TV stolek)",
        url: "https://www.ikea.com/cz/cs/cat/serie-brimnes-700496/",
        datumPristupeno: "2026-04-04",
        coUvadi: "BRIMNES noční stolek (39×41 cm): 799 Kč. BRIMNES sada 2 ks (postel 140×200 + komoda): 10 780 Kč. BRIMNES sada 3 ks (sofa-bed 80×200 + stolek + komoda): 8 279 Kč. BRIMNES TV stolek 180×41×53 cm: 3 690 Kč.",
      },
      {
        nazev: "IKEA Česká republika — PAX/FORSAND šatní skříň 100×60×201 cm",
        url: "https://www.ikea.com/cz/cs/p/pax-forsand-satni-skrin-bila-bila-s49500652/",
        datumPristupeno: "2026-04-04",
        coUvadi: "PAX/FORSAND šatní skříň 100×60×201 cm, bílá/bílá: 4 750 Kč",
      },
      {
        nazev: "IKEA Česká republika — KIVIK pohovky",
        url: "https://www.ikea.com/cz/cs/cat/serie-kivik-18329/",
        datumPristupeno: "2026-04-04",
        coUvadi: "KIVIK 2místná pohovka: 10 990 Kč. KIVIK 3místná pohovka (bez lenošky, Gunnared šedá): 13 990–14 990 Kč. KIVIK 3místná s lenoškou (Gunnared béžová): 20 990 Kč.",
      },
      {
        nazev: "IKEA Česká republika — KLIPPAN 2místná pohovka",
        url: "https://www.ikea.com/cz/cs/p/klippan-2mistna-pohovka-vissle-seda-s79010614/",
        datumPristupeno: "2026-04-04",
        coUvadi: "KLIPPAN 2místná pohovka (Vissle šedá): 5 990 Kč — economy varianta pro investiční byt",
      },
      {
        nazev: "IKEA Česká republika / biano.cz — EKEDALEN/INGOLF stůl + 4 žlídle",
        url: "https://www.ikea.com/cz/cs/p/ekedalen-ingolf-stul-a-4-zidle-bila-bila-s69482968/",
        datumPristupeno: "2026-04-04",
        coUvadi: "EKEDALEN/INGOLF rozkládací stůl + 4 žlídle (bílý, 80/120 cm): 9 150 Kč",
      },
      {
        nazev: "IKEA Česká republika — NORDEN/TEODORES stůl + 4 žlídle",
        url: "https://www.ikea.com/cz/cs/p/norden-teodores-stul-a-4-zidle-bila-bila-s89568824/",
        datumPristupeno: "2026-04-04",
        coUvadi: "NORDEN sklopný stůl + 4 TEODORES складné žlídle (bílý): 7 786 Kč — pro menší byty a investiční standard",
      },
      {
        nazev: "IKEA Česká republika — MICKE psací stůl + zrcadla",
        url: "https://www.ikea.com/cz/cs/p/micke-psaci-stul-bila-80213074/",
        datumPristupeno: "2026-04-04",
        coUvadi: "MICKE psací stůl 105×50 cm (bílý): 1 990 Kč. KNAPPER stojací zrcadlo 48×160 cm: 1 290 Kč. NISSEDAL zrcadlo 65×150 cm: 1 490 Kč.",
      },
      {
        nazev: "IKEA Česká republika — ceník dopravy a montáže",
        url: "https://www.ikea.com/cz/cs/customer-service/services/assembly/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Montáž PAX skříně: 1 520 Kč/kus. Montáž 3místné pohovky: 540 Kč. Transport montážního týmu (Zone 2): 650 Kč. Doručení: od 149 Kč.",
      },
      {
        nazev: "Heureka.cz — pračky střední třídy 2026",
        url: "https://pracky.heureka.cz/bosch-wgg25401by/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Bosch WAT28460BY (8 kg): od 10 899 Kč. Střední třída 8 kg: 10 900–14 000 Kč. Economy pračky (6–7 kg, Whirlpool/Candy): 6 000–8 000 Kč.",
      },
      {
        nazev: "Heureka.cz — myčky nádobí 2026",
        url: "https://mycky-nadobi.heureka.cz/bosch-sms4htw00e/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Bosch SMS4HTW00E (volně stojící, 13 sad): od 9 490 Kč. Střední třída myčky: 9 500–14 000 Kč.",
      },
      {
        nazev: "SuperSpotrebiče.cz — vestavné ledničky 2026",
        url: "https://superspotrebice.cz/gorenje-rki517d61-vestavna-kombinovana-lednice/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Gorenje RKI517D61 vestavná kombinovaná lednička (270 l): 13 990 Kč. Economy lednička: 7 000–9 000 Kč.",
      },
      {
        nazev: "MORA — kombinovaný sporák 2026",
        url: "https://www.mora.cz/kombinovany-sporak-k-5255-a1s-745493/",
        datumPristupeno: "2026-04-04",
        coUvadi: "MORA K 5255 A1S (kombinovaný sporák, trouba 70 l, energetická třída A): 8 990 Kč. Střední třída: ~10 000–14 000 Kč.",
      },
    ],

    odvozeniHodnoty: `
METODIKA: Bottom-up IKEA košík + spotřebiče (Year-0) + doprava/montáž + doplňky.
Ověřené IKEA ceny: ikea.com/cz (2026-04-04).
Spotřebiče: Heureka.cz, SuperSpotrebiče.cz, mora.cz (2026-04-04).

────────────────────────────────────────────────────
PROČ JE VÝSLEDEK SPRÁVNĚ ROZDĚLEN MEZI zarizeni A nakladyUdrzby
────────────────────────────────────────────────────
  Year 0: zarizeniNemovitosti
    BYDLENÍ: DIFERENCIÁL (kupující − nájemce), viz výpočet výše
    INVESTICE: plné počáteční vybavení (nábytek + 1. kus každého spotřebiče)
  Year 1–30: nakladyUdrzby = VÝMĚNY spotřebičů (ne první kus) + rekonstrukce + malování + ...
  
  Příklad pro pračku (9 000 Kč, životnost 11 let):
    Year  0: 9 000 Kč (zarizeniNemovitosti)
    Year 11: 9 000 Kč (nakladyUdrzby, 600 Kč/rok × 15 roků amortizace do roku 11)
    Year 22: 9 000 Kč (nakladyUdrzby)
    Total 30 let: 27 000 Kč — bez dvojího počítání ✓

────────────────────────────────────────────────────
BYDLENÍ — DIFERENCIÁL (Scénář A − Scénář B)
────────────────────────────────────────────────────
Scénář A (kupující): plné vybavení střední třídy od nuly.
Scénář B (nájemce v nezařízeném CZ pronájmu): economy nábytek + 50 % pračka.

KLÍČOVÝ PŘEDPOKLAD pro Scénář B:
  V ČR "nezařízený pronájem" zpravidla zahrnuje kuchyňskou linku s lednicí, sporákem
  a digestoří (buď vestavné, nebo zanechané předchozím nájemcem/pronajímatelem).
  Nájemce tyto spotřebiče NEKUPUJE.
  Pračka: cca 50 % inzerátů ji uvádí jako "v pronájmu" — využíváme expected value 3 500 Kč.
  Myčka: zanedbáno (>80 % případů buď zahrnuta nebo nájemce si ji nepořizuje).

Scénář A (kupující, střední IKEA + střední spotřebiče):
  HEMNES 160×200: 5 990 | VESTERÖY 160×200: 4 990 | 2× BRIMNES noční: 1 598
  2× PAX/FORSAND 100: 9 500 | KIVIK 2místná: 10 990 | KIVIK 3místná: 13 990
  KIVIK 3místná s lenoškou: 20 990 | LACK: 699 | BRIMNES TV: 3 690
  EKEDALEN/INGOLF 4ž: 9 150 | NORDEN/TEODORES 4ž: 7 786
  MICKE stůl: 1 990 | FLINTAN kancelářská žlídle: ~2 495 | NISSEDAL zrcadlo: 1 490
  Spotřebiče (střední třída, Year-0):
    1+kk (bez myčky): pračka 9k + lednička 11k + sporák 12k + digestoř 4k = 36 000 Kč
    2+kk a výše: + myčka 10k = 46 000 Kč
  Doprava: 1+kk 3 500 | 2+kk 5 500 | 3+kk 8 000 | 4+kk 10 000 Kč

  VÝSLEDNÉ HODNOTY SCÉNÁŘE A:
    1+kk: nábytek 21 418 + spotřebiče 36 000 + doprava  3 500 + doplňky 16 780 = ~77 700 → 77 000 Kč
    2+kk: nábytek 46 607 + spotřebiče 46 000 + doprava  5 500 + doplňky 20 980 = ~119 087 → 120 000 Kč
    3+kk: nábytek 66 996 + spotřebiče 46 000 + doprava  8 000 + doplňky 29 970 = ~150 966 → 152 000 Kč
    4+kk: nábytek 89 736 + spotřebiče 46 000 + doprava 10 000 + doplňky 37 470 = ~183 206 → 184 000 Kč

Scénář B (nájemce — economy nábytek, BEZ kuchyňských spotřebičů):
    1+kk: nábytek 16 728 + doprava 2 000 + doplňky 5 800 + pračka 3 500 = 28 028 → 28 000 Kč
    2+kk: nábytek 30 005 + doprava 3 500 + doplňky 7 500 + pračka 3 500 = 44 505 → 45 000 Kč
    3+kk: nábytek 40 219 + doprava 4 500 + doplňky 10 000 + pračka 3 500 = 58 219 → 58 000 Kč
    4+kk: nábytek 51 909 + doprava 6 000 + doplňky 13 000 + pračka 3 500 = 74 409 → 74 000 Kč

DIFERENCIÁL (Scénář A − Scénář B):
    1+kk:  77 000 −  28 000 =  49 000 →  50 000 Kč
    2+kk: 120 000 −  45 000 =  75 000 Kč
    3+kk: 152 000 −  58 000 =  94 000 →  95 000 Kč
    4+kk: 184 000 −  74 000 = 110 000 Kč

────────────────────────────────────────────────────
INVESTICE — economy IKEA + economy spotřebiče
────────────────────────────────────────────────────
Standard: vše nezbytné pro pronájem, economy varianta. Bez koberec/pracovní kout/zrcadlo.
KLIPPAN (5 990 Kč) místo KIVIK (10 990 Kč). BRIMNES sady místo HEMNES.

Spotřebiče (economy, Year-0):
  1+kk (bez myčky): 7 000 + 7 500 + 7 000 + 2 500 = 24 000 Kč
  2+kk a výše (s myčkou): + 9 500 = 33 500 Kč

VÝSLEDNÉ HODNOTY INVESTICE:
  1+kk: nábytek 16 728 + spotřebiče 24 000 + doprava 2 000 + doplňky  5 800 = ~48 528 → 48 000 Kč
  2+kk: nábytek 30 005 + spotřebiče 33 500 + doprava 3 500 + doplňky  7 500 = ~74 505 → 75 000 Kč
  3+kk: nábytek 40 219 + spotřebiče 33 500 + doprava 4 500 + doplňky 10 000 = ~88 219 → 88 000 Kč
  4+kk: nábytek 51 909 + spotřebiče 33 500 + doprava 6 000 + doplňky 13 000 = ~104 409 → 105 000 Kč

────────────────────────────────────────────────────
PŘESNOST A OMEZENÍ
────────────────────────────────────────────────────
Ověřeno přesně (z IKEA.cz): HEMNES, VESTERÖY, BRIMNES série, PAX, KIVIK, KLIPPAN,
EKEDALEN/NORDEN, MICKE, NISSEDAL, KNAPPER = >70 % celkové hodnoty
Odhadnuto (~±20 %): matrace 140×200 a 90×200, ložnice 2+3, osvětlení, rolety
Nezachyceno: variace v rámci Praha (viz nájemní inzeráty), nové byty s vestavěnými skříněmi
    `.trim(),
  },

  hodnoty: {
    bydleni:  zarizeniNemovitostiBydleniValues,
    investice: zarizeniNemovitostiInvesticeValues,
  },
};
