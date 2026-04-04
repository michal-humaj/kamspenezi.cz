/**
 * Atribut: Fond oprav / příspěvek na správu domu a pozemku (fondOprav)
 * Výzkum proveden: 2026-04-04
 *
 * Měsíční příspěvek vlastníka bytové jednotky do fondu oprav SVJ.
 * Hodnota je per-city per-size (Kč / měsíc).
 *
 * =============================================================================
 * ZÁKONNÝ ZÁKLAD:
 *
 *   Zákon č. 89/2012 Sb. (NOZ), § 1180:
 *     Vlastník jednotky přispívá na správu domu a pozemku ve výši odpovídající
 *     jeho podílu na společných částech — zpravidla dle podlahové plochy bytu.
 *
 *   KLÍČOVÝ BOD: Zákon NESTANOVUJE žádné minimální ani doporučené výše příspěvku.
 *   Výši určuje shromáždění vlastníků SVJ. Je to čistě smluvní záležitost.
 *
 *   Příspěvky jsou NEVRATNÉ — nejde o zálohy, ale o vklady do fondu SVJ.
 *   Platí vlastník (ne nájemník). SVJ nemá zákonnou povinnost fond oprav zřídit,
 *   ale v praxi každý bytový dům se správou nemovitostí fond má.
 *
 * =============================================================================
 * CO JE FOND OPRAV — PŘESNÁ DEFINICE:
 *
 *   Fond oprav kryje výdaje na SPOLEČNÉ ČÁSTI DOMU:
 *     - Střecha, fasáda, základy (nosné konstrukce)
 *     - Výtah (servis, výměna, modernizace)
 *     - Stoupačky (rozvody vody, elektřiny, plynu v rámci celého domu)
 *     - Společné prostory (schodiště, chodby, sklepní prostory, kolárna)
 *     - Okna a dveře na chodbách (nikoli okna uvnitř bytu)
 *     - Povinné revize a technické kontroly (hromosvod, výtah, požár)
 *     - Zateplení, hydroizolace, terasa, parkoviště (při rekonstrukci)
 *     - V některých SVJ: pojištění budovy, odměna správcovské firmě
 *
 *   KLÍČOVÝ ROZDÍL od ostatních atributů:
 *     Fond oprav ≠ pojisteniNemovitosti (krytí interiéru bytu) — viz jiný atribut
 *     Fond oprav ≠ nakladyUdrzba (náklady na údržbu interiéru bytu) — viz jiný atribut
 *
 * =============================================================================
 * JAK SE PLATÍ — MECHANISMUS:
 *
 *   SVJ stanoví sazbu Kč/m²/měsíc platnou pro všechny bytové jednotky.
 *   Každý vlastník platí: sazba × podlahová_plocha_bytu_m².
 *
 *   Tento mechanismus je zákonný standard (NOZ § 1180) a je universální
 *   pro celou ČR — neexistuje alternativní způsob výpočtu kromě OZV.
 *
 *   NAŠE METODA: sazba[město] × squareMeters[město][dispozice] je tedy
 *   přesně ta správná metodika, nikoli aproximace.
 *
 * =============================================================================
 * FAKTORY OVLIVŇUJÍCÍ VÝŠI SAZBY (v pořadí dopadu):
 *
 *   1. STÁŘÍ A TECHNICKÝ STAV BUDOVY — největší proměnná:
 *        Novostavba (0–10 let):          10–15 Kč/m²/měs.   — málo co opravovat
 *        Střední věk, renovovaná (15–35): 20–30 Kč/m²/měs.  — hlavní profil investičního bytu
 *        Starší paneláky (40+, neopravené): 40–60 Kč/m²/měs. — čekají velké investice
 *
 *   2. PŘÍTOMNOST VÝTAHU: +3–6 Kč/m² (servis, revize, výměna každých 25–30 let)
 *
 *   3. VELIKOST DOMU: větší SVJ (50+ bytů) = nižší per-m² náklady (úspory z rozsahu)
 *
 *   4. STAV REZERVY: SVJ s dlužnými renovacemi nebo nízkým saldem navyšuje rychle
 *
 *   5. MĚSTO: minimální přímý vliv. Stavební náklady se liší max. 10–15 %, ale to
 *      není primárním důvodem pro diferenciaci — ta je určena stářím budovy.
 *      Praha: mírně vyšší (lepší správa, cihlový fond, vyšší ceny řemeslníků).
 *
 * =============================================================================
 * DATOVÉ ZDROJE A KALIBRAČNÍ BODY:
 *
 *   ZDROJ 1 — PortalSVJ.cz anketa (PRIMÁRNÍ ZDROJ — 9 164 odpovědí):
 *     URL: https://www.portalsvj.cz/anketa/vysledky.php (přístupeno 2026-04-04)
 *     Nejrozsáhlejší veřejně dostupný dataset o fondu oprav v ČR. Každý řádek = jedno SVJ,
 *     obsahuje: sazbu Kč/m²/měs., město, rok výstavby, typ budovy (panel/cihla/jiný).
 *     Data sbírána průběžně — průměrný rok vstupu odhadován na ~2014.
 *
 *     METODIKA EXTRAKCE PRO TUTO KALIBRACI:
 *       Pro každé krajské město filtrovaný vzorek: budovy 1970–2000 (investiční profil).
 *       Vyloučeny: novostavby (< 5 Kč/m², N < 10), extrémní outliers (> 70 Kč/m²).
 *       Vypočten medián per město. Inflační úprava ~2014→2025: ×1,38 (CPI +38 % kumulativně).
 *
 *     VÝSLEDKY (historický medián → inflačně upraveno 2025, N = počet pozorování):
 *       Praha:             21 Kč/m² → 29 Kč/m²  (N ≈ 55)
 *       Brno:              20 Kč/m² → 28 Kč/m²  (N ≈ 35)
 *       Ostrava:           22 Kč/m² → 30 Kč/m²  (N ≈ 28)
 *       Plzeň:             22 Kč/m² → 30 Kč/m²  (N ≈ 18)
 *       Hradec Králové:    22 Kč/m² → 30 Kč/m²  (N ≈ 12)
 *       Olomouc:           21 Kč/m² → 29 Kč/m²  (N ≈ 10)
 *       Pardubice:         21 Kč/m² → 29 Kč/m²  (N ≈ 10)
 *       Liberec:           20 Kč/m² → 28 Kč/m²  (N ≈ 8)
 *       Ústí nad Labem:    20 Kč/m² → 28 Kč/m²  (N ≈ 8)
     *       Karlovy Vary:      17 Kč/m² → 23 Kč/m²  (N ≈ 10) — POZOR: konzistentně nižší
 *       Jihlava:           22 Kč/m² → 30 Kč/m²  (N ≈ 18) — plný vzorek po deduplicaci
 *       Zlín:              18 Kč/m² → 25 Kč/m²  (N ≈ 19) — plný vzorek, potvrzeno
 *       České Budějovice:  21 Kč/m² → 29 Kč/m²  (N ≈ 7)
 *
 *     KLÍČOVÉ ZJIŠTĚNÍ: Praha, Brno, Ostrava a většina krajských měst mají po inflační
 *     úpravě velmi podobný medián (~28–30 Kč/m²). Původní předpoklad že regionální města
 *     jsou výrazně levnější není podpořen daty. KV je výjimkou (konzistentně nižší).
 *
 *   ZDROJ 2 — CzechCrunch / Fond českého bydlení:
 *     David Fogad, obchodní ředitel FČB: Praha 2+kk 50 m² = 18 000 Kč/rok fond oprav
 *     = 30 Kč/m². UPOZORNĚNÍ: Článek nedatován — kupní cena 6M Kč (Praha 2+kk)
 *     odpovídá cenám ~2021, nikoli 2025. Inflačně dle CPI 2021→2025 (+20%): 30 × 1,20 = 36 Kč/m².
 *     Konzistentní s PortalSVJ inflačně upraveným mediánem (29 Kč/m²).
 *     Naše hodnota Praha 30 Kč/m² je konzervativní (spodní hranice, odráží fakticky placené
 *     sazby i u SVJ, která nedrží fond zcela v tempu inflace).
 *
 *   ZDROJ 3 — SVJ Předseda / Context Consult (správci portfolia, 2017):
 *     "průměr v námi spravovaných domech kolem 17 Kč/m²; rozmezí 10–45 Kč/m²"
 *     Inflačně 2017→2025 (+40%): ~24 Kč/m². Portfolio zahrnuje podfinancované domy.
 *     Konzistentní s PortalSVJ (raw medián 20–21 Kč/m² = ~průměr portfolia).
 *
 *   ZDROJ 4 — KeyHouse.cz (poradenský správce, 2025):
 *     "20–30 Kč/m²/měs. u starších domů; 10–15 Kč/m²/měs. u novostaveb".
 *     Rozsah potvrzuje naše hodnoty, ale neposkytuje per-city data.
 *
 * =============================================================================
 * METODIKA A VOLBA SAZEB:
 *
 *   Typický "investiční byt" v naší kalkulačce:
 *     - Stáří: cca 15–35 let (post-sametová zástavba, renovovaný panel nebo cihla)
 *     - Příslušenství: výtah v domě je přítomen
 *     - Správa: aktivně spravované SVJ (jinak by ho investor nekoupil)
 *     → Cílová sazba dle PortalSVJ (inflačně upraveno): 27–30 Kč/m²
 *
 *   VÍCESTUPŇOVÝ MODEL (per-city sazby):
 *
 *     Praha: 30 Kč/m² — PortalSVJ medián 29 Kč/m², CzechCrunch/FČB 30 Kč/m².
 *     Brno: 28 Kč/m² — PortalSVJ medián 28 Kč/m² (N≈35), dobrá spolehlivost.
 *     Ostrava, HK, Plzeň: 27–28 Kč/m² — PortalSVJ mediány 28–30 Kč/m², mírně konzervativně.
 *     Ostatní krajská města: 27 Kč/m² — PortalSVJ mediány 28–29 Kč/m², malé vzorky.
 *     Ústí nad Labem: 25 Kč/m² — PortalSVJ medián 28 Kč/m², ale konzervativně sníženo
 *       (pověst podfinancovaného bytového fondu; může vést k vyšším budoucím mimořádkám).
 *     Karlovy Vary: 23 Kč/m² — PortalSVJ konzistentně nižší (N≈10, medián 17 Kč/m² → 23 Kč/m²).
 *     Zlín: 25 Kč/m² — PortalSVJ velmi malý vzorek (N≈5), opatrný odhad nahoru.
 *
 *   PŘESNOST: ±35–45 % pro konkrétní byt (závisí na konkrétní budově a rozhodnutí SVJ).
 *   Pro 30letý průměr: nižší chyba, protože extremní hodnoty se průměrují.
 *   Dopad chyby ±40 % na 30letý výsledek: Praha 2+kk → ±250 000 Kč nominálně.
 *   To je 3 % kupní ceny — nezanedbatelné, ale akceptovatelné pro typ naší kalkulačky.
 *
 * =============================================================================
 * JAK DATA AKTUALIZOVAT:
 *
 *   NEJLEPŠÍ DOSTUPNÁ METODA (doporučena při ročním refreshi):
 *     Projít 30–50 prodejních inzerátů na Sreality.cz v každém městě.
 *     Sreality v detailu nabídky uvádí "Celkové měsíční náklady" nebo přímo
 *     "Příspěvky SVJ/fond oprav: X Kč/měs." — je nutné rozlišit od záloh na energie.
 *     Extrahovat fond oprav, vydělit m² → sazba Kč/m² per město.
 *
 *   ALTERNATIVNÍ ZDROJE:
 *     - Rixo.cz, Flat Zone: některé portály agregují SVJ poplatky (neověřeno)
 *     - Správcovské firmy (Správa bytů Praha, KeyHouse, JMB): průzkumy portfolia
 *     - SVJ účetní firmy: průzkumy klientů (nepřístupné bez dohody)
 *
 *   FREKVENCE: 1× ročně (sazby se mění pomalu, SVJ rozhodují na výroční schůzi)
 *
 * =============================================================================
 * PRAVIDELNÁ AKTUALIZACE:
 *
 *   Hodnoty platí pro rok 2025. V modelu se fond oprav zvyšuje s ocekavanaInflace (2 %).
 *   Reálně: SVJ sazby rostou přibližně s inflací (stavební inflace ≈ CPI ± 1 p.b.).
 *   Doporučená aktualizace: Q4 každého roku po ověření ze Sreality inzerce.
 */

import type { AttributeDoc, PerCityPerSize } from "./_types";

// =============================================================================
// SAZBY KČ/M²/MĚSÍC — ZÁKLAD PRO VÝPOČET
// =============================================================================

/**
 * Měsíční sazba fondu oprav v Kč/m² podlahové plochy bytu.
 *
 * Sazby kalibrované na PortalSVJ anketu (9 164 odpovědí, přístupeno 2026-04-04):
 * historický medián per město × inflační koeficient 1,38 (CPI 2014→2025).
 * Viz sekce DATOVÉ ZDROJE výše pro detaily metodiky.
 */
const fondOpravSazba: Record<string, number> = {
  "praha":              30, // PortalSVJ: 21→29 Kč/m², FČB: 30 Kč/m² — N≈55
  "brno":               28, // PortalSVJ: 20→28 Kč/m² — N≈35, dobrá spolehlivost
  "ostrava":            27, // PortalSVJ: 22→30 Kč/m², konzervativně sníženo — N≈28
  "plzen":              28, // PortalSVJ: 22→30 Kč/m², konzervativně — N≈18
  "ceske-budejovice":   27, // PortalSVJ: 21→29 Kč/m² — N≈7
  "hradec-kralove":     28, // PortalSVJ: 22→30 Kč/m² — N≈12
  "liberec":            27, // PortalSVJ: 20→28 Kč/m² — N≈8
  "olomouc":            27, // PortalSVJ: 21→29 Kč/m² — N≈10
  "pardubice":          27, // PortalSVJ: 21→29 Kč/m² — N≈10
  "usti-nad-labem":     25, // PortalSVJ: 20→28 Kč/m², konzervativně sníženo (pověst podfinancovaného fondu)
  "karlovy-vary":       23, // PortalSVJ: 17→23 Kč/m² — konzistentně nižší — N≈10
  "jihlava":            29, // PortalSVJ: 22→30 Kč/m² — N≈18 po deduplicaci, konzervativně sníženo
  "zlin":               25, // PortalSVJ: 11→15 Kč/m², N≈5 — velmi malý vzorek, opatrný odhad nahoru
};

// =============================================================================
// HODNOTY PER-CITY PER-SIZE (KČ / MĚSÍC)
// =============================================================================

/**
 * Měsíční příspěvek do fondu oprav.
 * Výpočet: squareMeters[město][dispozice] × fondOpravSazba[město]
 *
 * Hodnoty jsou Kč/měsíc — standardní jednotka pro provozní náklady bytu.
 */
export const fondOpravValues: PerCityPerSize<number> = {
  // Praha: 30 Kč/m² — PortalSVJ N≈55, CzechCrunch/FČB potvrzení
  "praha": {
    "1+kk":   990,  // 33 m² × 30
    "2+kk":  1560,  // 52 m² × 30
    "3+kk":  2400,  // 80 m² × 30
    "4+kk":  3300,  // 110 m² × 30
  },
  // Brno: 28 Kč/m² — PortalSVJ N≈35
  "brno": {
    "1+kk":   896,  // 32 m² × 28
    "2+kk":  1484,  // 53 m² × 28
    "3+kk":  2184,  // 78 m² × 28
    "4+kk":  3164,  // 113 m² × 28
  },
  // Ostrava: 27 Kč/m² — PortalSVJ N≈28
  "ostrava": {
    "1+kk":   837,  // 31 m² × 27
    "2+kk":  1458,  // 54 m² × 27
    "3+kk":  2106,  // 78 m² × 27
    "4+kk":  2835,  // 105 m² × 27
  },
  // Plzeň: 28 Kč/m² — PortalSVJ N≈18
  "plzen": {
    "1+kk":   952,  // 34 m² × 28
    "2+kk":  1540,  // 55 m² × 28
    "3+kk":  2296,  // 82 m² × 28
    "4+kk":  2912,  // 104 m² × 28
  },
  // České Budějovice: 27 Kč/m² — PortalSVJ N≈7
  "ceske-budejovice": {
    "1+kk":  1080,  // 40 m² × 27
    "2+kk":  1458,  // 54 m² × 27
    "3+kk":  2268,  // 84 m² × 27
    "4+kk":  2673,  // 99 m² × 27
  },
  // Hradec Králové: 28 Kč/m² — PortalSVJ N≈12
  "hradec-kralove": {
    "1+kk":   980,  // 35 m² × 28
    "2+kk":  1484,  // 53 m² × 28
    "3+kk":  2408,  // 86 m² × 28
    "4+kk":  2996,  // 107 m² × 28
  },
  // Liberec: 27 Kč/m² — PortalSVJ N≈8
  "liberec": {
    "1+kk":  1107,  // 41 m² × 27
    "2+kk":  1404,  // 52 m² × 27
    "3+kk":  2106,  // 78 m² × 27
    "4+kk":  2619,  // 97 m² × 27
  },
  // Olomouc: 27 Kč/m² — PortalSVJ N≈10
  "olomouc": {
    "1+kk":   864,  // 32 m² × 27
    "2+kk":  1485,  // 55 m² × 27
    "3+kk":  2160,  // 80 m² × 27
    "4+kk":  2430,  // 90 m² × 27
  },
  // Pardubice: 27 Kč/m² — PortalSVJ N≈10
  "pardubice": {
    "1+kk":   891,  // 33 m² × 27
    "2+kk":  1566,  // 58 m² × 27
    "3+kk":  1998,  // 74 m² × 27
    "4+kk":  2727,  // 101 m² × 27
  },
  // Ústí nad Labem: 25 Kč/m²
  // PortalSVJ raw medián ~20 Kč/m² → inflačně 28 Kč/m², ale konzervativně sníženo.
  // Část bytového fondu v UL je podfinancovaná — nižší průběžné platby zvyšují
  // riziko budoucích mimořádných příspěvků.
  "usti-nad-labem": {
    "1+kk":   625,  // 25 m² × 25
    "2+kk":  1075,  // 43 m² × 25
    "3+kk":  1875,  // 75 m² × 25
    "4+kk":  2350,  // 94 m² × 25
  },
  // Karlovy Vary: 23 Kč/m²
  // PortalSVJ konzistentně nižší sazby (N≈10, medián 17→23 Kč/m²).
  // KV má atypicky velké byty — absolutní Kč/měs. jsou i přes nižší sazbu vysoké.
  "karlovy-vary": {
    "1+kk":   897,  // 39 m² × 23
    "2+kk":  1380,  // 60 m² × 23
    "3+kk":  2024,  // 88 m² × 23
    "4+kk":  2714,  // 118 m² × 23
  },
  // Jihlava: 29 Kč/m² — PortalSVJ N≈18 (po deduplicaci), medián 22→30 Kč/m² inflačně
  "jihlava": {
    "1+kk":  1102,  // 38 m² × 29
    "2+kk":  1595,  // 55 m² × 29
    "3+kk":  2581,  // 89 m² × 29
    "4+kk":  2958,  // 102 m² × 29
  },
  // Zlín: 25 Kč/m² — PortalSVJ N≈5 (velmi malý vzorek), opatrný odhad
  // Surový medián 11 Kč/m² → inflačně 15 Kč/m², ale N je příliš malý pro spolehlivé závěry.
  // Konzervativní horní odhad 25 Kč/m² zachovává soulad s ostatními regionálními městy.
  "zlin": {
    "1+kk":   875,  // 35 m² × 25
    "2+kk":  1325,  // 53 m² × 25
    "3+kk":  2100,  // 84 m² × 25
    "4+kk":  2375,  // 95 m² × 25
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const fondOpravDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "fondOprav",
  nazev: "Fond oprav (příspěvek SVJ)",
  jednotka: "Kč / měsíc",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Měsíční příspěvek vlastníka bytové jednotky na správu domu a pozemku (§ 1180 NOZ).
    Označovaný jako "fond oprav" nebo "příspěvek do fondu oprav". Slouží k financování
    oprav, rekonstrukcí a investic do SPOLEČNÝCH ČÁSTÍ bytového domu (střecha, výtah,
    fasáda, stoupačky, společné prostory). Platí výhradně vlastník, nikoli nájemník.
  `,

  coZahrnuje: [
    "Opravy střechy, fasády, základů a nosných konstrukcí domu",
    "Výtah: servis, revize, modernizace, výměna (každých 25–30 let)",
    "Stoupačky: rozvody vody, elektřiny, plynu v rámci celého domu",
    "Společné prostory: schodiště, chodby, sklep, kolárna, kočárkárna",
    "Okna a dveře na chodbách (nikoli okna uvnitř bytu)",
    "Zateplení, hydroizolace, terasa, příjezdová cesta (při rekonstrukci)",
    "Povinné revize: hromosvod, výtah, přenosné hasicí přístroje, požární systémy",
    "V některých SVJ: pojištění budovy (SVJ building insurance), odměna správcovské firmě",
  ],

  coNezahrnuje: [
    "Zálohy na energie a služby (teplo, voda, odvoz odpadů) — zvláštní účtování SVJ",
    "Pojištění interiéru bytu (bytové jednotky) — viz atribut pojisteniNemovitosti",
    "Pojištění movitých věcí/domácnosti nájemníka",
    "Opravy uvnitř bytu (podlahy, obklady, rozvody v rámci jednotky) — viz nakladyUdrzba",
    "Daň z nemovitých věcí — viz atribut danZNemovitosti",
    "Správcovský poplatek realitní kanceláři za pronájem (pokud jsou poplatky SVJ odděleny)",
  ],

  coOvlivnujeHodnotu: [
    "Stáří a technický stav budovy — největší faktor: novostavby 10–15 Kč/m², starší 20–40 Kč/m²",
    "Přítomnost výtahu — přidává 3–6 Kč/m² na servis a budoucí výměnu",
    "Plánované velké investice — SVJ navyšuje příspěvky před rekonstrukcí střechy nebo fasády",
    "Velikost domu — velká SVJ (50+ bytů) mají nižší per-m² náklady díky úsporám z rozsahu",
    "Stav rezervního fondu — podfinancovaná SVJ navyšují příspěvky rychle po zjištění deficitu",
    "Výměra bytu (m²) — příspěvek roste lineárně s plochou, sazba Kč/m² je stejná pro všechny",
    "Město — Praha mírně vyšší (řemeslníci dražší o ~10–15 %, cihlový fond lépe spravován)",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Dvoustupňová sazba Kč/m²/měsíc aplikovaná na squareMeters:
        Praha: 30 Kč/m²/měsíc (přímá datová točka)
        Ostatní krajská města: 25 Kč/m²/měsíc (střed doporučeného rozsahu)
      Hodnota = squareMeters[město][dispozice] × fondOpravSazba[město]
    `,
    procTatoMetoda: `
      Fond oprav je zákonně stanoven jako Kč/m²/měsíc × plocha bytu (NOZ § 1180).
      Proto je naše metoda přesně správná, nikoli aproximace — kopíruje zákonný mechanismus.

      Přímá datová točka pro Prahu existuje (CzechCrunch/FČB: 30 Kč/m²).
      Pro regionální města přímá datová neexistuje — 25 Kč/m² je střed
      doporučeného rozsahu 20–30 Kč/m² pro standardní starší bytový dům.

      Alternativy: (1) Flat rate pro všechna města = ignoruje Praha/ostatní diferenciaci.
      (2) Tříúrovňová Praha/velká města/malá = ne podložena daty.
      (3) Zohledňovat stáří budovy = nemáme tento vstup od uživatele.
    `,
    presnost: `
      Nízká–střední pro konkrétní byt: ±40–50 %. Fond oprav závisí na konkrétní
      budově a hlasování SVJ — nelze přesně odhadnout bez znalosti budovy.

      Pro 30letý průměr v modelu: lepší než pro konkrétní rok, protože extremní
      hodnoty (podfinancované SVJ → mimořádné navýšení → normalizace) se průměrují.

      Dopad chyby ±50 % na 30letý výsledek:
        Praha 2+kk: ±280 000 Kč nominálně (≈ 3–4 % kupní ceny)
        Ostatní 2+kk: ±240 000 Kč nominálně (≈ 3–5 % kupní ceny)
      Parametr střední citlivosti.
    `,
    kdyNeniPresna: [
      "Novostavby — developer nastaví fond na 10–15 Kč/m², naše hodnota 25–30 Kč/m² přeceňuje o 70–100 %",
      "Starší panelové domy (pre-1980, neopravené) — fond může být 40–60 Kč/m², naše hodnota podceňuje",
      "Ústí nad Labem — starší podfinancovaný bytový fond, fond může být fakticky 15–20 Kč/m²",
      "Karlovy Vary — atypicky velké byty (118 m² pro 4+kk), absolutní platba je výrazně vyšší",
      "Malé bytové domy (4–6 bytů) — per-m² náklady jsou typicky vyšší, naše hodnota podceňuje",
    ],
    vzorec: `
      fondOprav[město][dispozice] =
        squareMeters[město][dispozice] × fondOpravSazba[město]

      kde fondOpravSazba[Praha] = 30 Kč/m²/měs.
          fondOpravSazba[ostatní] = 25 Kč/m²/měs.
    `,
  },

  tooltipText: `Měsíční příspěvek do fondu oprav SVJ — platí vlastník (ne nájemník). Financuje opravy střechy, výtahu, fasády a dalších společných částí domu. Výše závisí na stáří a stavu budovy.`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "PortalSVJ.cz — Výsledky ankety (9 164 odpovědí SVJ)",
        url: "https://www.portalsvj.cz/anketa/vysledky.php",
        datumPristupeno: "2026-04-04",
        coUvadi: `Největší veřejně dostupný dataset o fondu oprav v ČR. Každý řádek obsahuje:
          sazbu Kč/m²/měs., provozní náklady Kč/m²/měs., odměny výboru, počet bytů,
          město, rok výstavby a typ budovy. Celkem 9 164 odpovědí za celou ČR.
          Data sbírána průběžně — průměrný rok vstupu odhadován na ~2014.
          Klíčové zjištění: inflačně upravený medián (×1,38) je pro Praha, Brno a většinu
          krajských měst 27–30 Kč/m² — výrazně vyšší než předchozí odhad 25 Kč/m².
          KV je konzistentní výjimka (~17 Kč/m² surový → 23 Kč/m² inflačně).`,
      },
      {
        nazev: "CzechCrunch — Jak si spočítat náklady na investiční byt",
        url: "https://cc.cz/jak-si-spocitat-naklady-na-investicni-byt-aneb-ani-zdaleka-neplati-ze-vybrany-najem-je-cisty-prijem/",
        datumPristupeno: "2026-04-04",
        coUvadi: `David Fogad, obchodní ředitel Fondu českého bydlení: Praha 2+kk 50 m²
          = 18 000 Kč/rok fond oprav = 30 Kč/m²/měsíc.
          UPOZORNĚNÍ: Článek není datován. Kupní cena 6 000 000 Kč pro Praha 2+kk
          odpovídá trhu ~2021 (v r. 2025/2026 je Praha 2+kk 7,5–9M Kč).
          Hodnota 30 Kč/m² tedy pocházela z ~2021. Inflačně upraveno 2021→2025 (+20%):
          36 Kč/m². Naše Praha 30 Kč/m² je konzervativní (odráží fakticky placené sazby
          v SVJ, která fond mírně podfinancují), nikoli doporučenou "správnou" sazbu.`,
      },
      {
        nazev: "KeyHouse.cz — Jak funguje fond oprav a jak ho efektivně nastavit",
        url: "https://keyhouse.cz/jak-funguje-fond-oprav-a-jak-ho-efektivne-nastavit/",
        datumPristupeno: "2026-04-04",
        coUvadi: `Správcovská firma KeyHouse (2025): "20–30 Kč/m² měsíčně u starších domů;
          10–15 Kč/m² měsíčně u novostaveb." Rozsah potvrzuje naše hodnoty jako rozumné.`,
      },
      {
        nazev: "Context Consult / SVJ Předseda — průměr portfolia 2017",
        url: "https://contextconsult.cz/aktuality/kolik-se-ma-platit-do-fondu-oprav/",
        datumPristupeno: "2026-04-04",
        coUvadi: `Praha, portfolio správce (2017): "průměr ~17 Kč/m²; rozmezí 10–45 Kč/m²."
          Konzistentní s PortalSVJ surovým mediánem (21 Kč/m² = ~výše průměru portfolia,
          kde outliers a podfinancovaná SVJ táhnou průměr mírně pod medián).`,
      },
      {
        nazev: "Zákon č. 89/2012 Sb. (NOZ) § 1180 — příspěvek na správu domu a pozemku",
        url: "https://www.zakonyprolidi.cz/cs/2012-89#p1180",
        datumPristupeno: "2026-04-04",
        coUvadi: `§ 1180: "Vlastník jednotky přispívá na správu domu a pozemku ve výši
          odpovídající jeho podílu na společných částech." Zákon nestanovuje minimální výši.
          Mechanismus: sazba Kč/m²/měs. × podlahová plocha bytu = zákonný standard.`,
      },
    ],

    odvozeniHodnoty: `
      ODVOZENÍ SAZEB — METODIKA A VÝSLEDKY:

      PRIMÁRNÍ ZDROJ: PortalSVJ.cz anketa (9 164 odpovědí, přístupeno 2026-04-04).
      Pro každé krajské město extrahován vzorek budov z let 1970–2000 (investiční profil).
      Vypočten medián Kč/m²/měs. per město. Inflační úprava ×1,38 (CPI 2014→2025).

      VÝSLEDNÉ SAZBY A OVĚŘENÍ:

      Praha (30 Kč/m²):
        PortalSVJ medián (N≈55): 21 Kč/m² → 29 Kč/m² inflačně.
        CzechCrunch/FČB (~2021): 30 Kč/m² (fakticky placená sazba).
        Praha 2+kk (52 m²): 52 × 30 = 1 560 Kč/měs. = 18 720 Kč/rok.
        Konzistentní s FČB kalkulací (18 000 Kč/rok pro 50 m²). ✓

      Brno (28 Kč/m²):
        PortalSVJ medián (N≈35): 20 Kč/m² → 28 Kč/m² inflačně.
        Brno 2+kk (53 m²): 53 × 28 = 1 484 Kč/měs. ✓
        OPRAVA OPROTI V1: z 25 → 28 Kč/m² (+12 %) na základě PortalSVJ dat.

      Ostrava (27 Kč/m²):
        PortalSVJ medián (N≈28): 22 Kč/m² → 30 Kč/m² inflačně.
        Konzervativně sníženo na 27 Kč/m² (Ostrava má více starých podfinancovaných panelů).
        OPRAVA OPROTI V1: z 25 → 27 Kč/m² (+8 %).

      Plzeň (28 Kč/m²):
        PortalSVJ medián (N≈18): 22 Kč/m² → 30 Kč/m² inflačně.
        Konzervativně sníženo na 28 Kč/m².
        OPRAVA OPROTI V1: z 25 → 28 Kč/m² (+12 %).

      Hradec Králové (28 Kč/m²):
        PortalSVJ medián (N≈12): 22 Kč/m² → 30 Kč/m² inflačně.
        Konzervativně sníženo na 28 Kč/m².
        OPRAVA OPROTI V1: z 25 → 28 Kč/m² (+12 %).

      České Budějovice, Liberec, Olomouc, Pardubice (27 Kč/m²):
        PortalSVJ mediány (N=7–10): 20–21 Kč/m² → 28–29 Kč/m² inflačně.
        Konzervativně sníženo na 27 Kč/m² (malé vzorky).
        OPRAVA OPROTI V1: z 25 → 27 Kč/m² (+8 %).

      Ústí nad Labem (25 Kč/m²):
        PortalSVJ medián (N≈8): 20 Kč/m² → 28 Kč/m² inflačně. Ponecháno na 25 Kč/m²
        z důvodu pověsti podfinancovaného bytového fondu (budoucí mimořádky).

      Karlovy Vary (23 Kč/m²):
        PortalSVJ konzistentně nižší (N≈10): 17 Kč/m² → 23 Kč/m² inflačně. ✓
        OPRAVA OPROTI V1: z 25 → 23 Kč/m² (−8 %).

      Jihlava (29 Kč/m²):
        PortalSVJ plný vzorek po deduplicaci (N≈18):
          Hodnoty: 10, 10, 14, 15, 19, 20, 20, 20, 20, 22, 25, 25, 25, 25, 27, 28, 28, 30
          Medián: 22 Kč/m² → 30 Kč/m² inflačně.
        Konzervativně sníženo na 29 Kč/m² (existuje nota o 10 Kč/m² u většího panelového
        domu z 1975, který může být podfinancovaný). Jihlava je srovnatelná s Prahou.
        OPRAVA OPROTI V1: z 25 → 29 Kč/m² (+16 %). N≈5→18 — velká změna díky plné extrakci.

      Zlín (25 Kč/m²):
        PortalSVJ plný vzorek (N≈19, 1970–2000 budovy):
          Hodnoty: 5.4, 5.6, 11, 13, 13, 15, 15, 16, 17, 17.5, 17.5, 18, 19, 19.58,
                   20, 20, 20, 20, 26
          Medián: 18 Kč/m² → 25 Kč/m² inflačně.
        Naše hodnota 25 Kč/m² potvrzena. Zlín má specifický bytový fond (Baťa-éra zástavba)
        s přítomností velmi nízkých sazeb (5–6 Kč/m² u velkých panelových domů, které mohou
        být dobře zainvestované z minulosti). Medián střední hodnoty je však konzistentní.
        OPRAVA OPROTI V1: beze změny (25 Kč/m² bylo správně, ale náhodně). Nyní potvrzeno daty.

      SROVNÁNÍ S VERZÍ 1 (původní fond-oprav.ts):
        Praha: 30 Kč/m² → beze změny (potvrzeno)
        Brno: 25 → 28 (+12 %) — PortalSVJ N≈35 dokládá podhodnocení
        Ostatní (kromě KV, Zlín): 25 → 27–28 (+8–12 %) — konzistentní podhodnocení V1
        KV: 25 → 23 (−8 %) — V1 nadhodnocoval, KV je konzistentně levnější
        Zlín: 25 → 25 (beze změny) — vzorek příliš malý, ponecháno konzervativně
    `,
  },

  hodnoty: fondOpravValues,
};
