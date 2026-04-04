/**
 * Atribut: Daň z nemovitých věcí (danZNemovitosti)
 * Výzkum proveden: 2026-04-04
 *
 * Roční daň z nemovitých věcí, kterou platí vlastník bytové jednotky.
 * Hodnota je per-city per-size (Kč / rok).
 *
 * =============================================================================
 * ZÁKONNÝ ZÁKLAD — zákon č. 338/1992 Sb. (ve znění novely 2024):
 *
 *   VZOREC (bytová jednotka):
 *     daň = podlahová_plocha_m² × sazba × koeficient_1_22 × základní_koef × místní_koef × inflační_koef
 *
 *   SLOŽKY:
 *     sazba pro bytovou jednotku:  2 Kč / m² (po navýšení o 80 % v r. 2024)
 *     koeficient_1_22:             1,22 (přepočet na upravenou podlahovou plochu — zahrnuje poměrný
 *                                  podíl na společných prostorách; zavedeno novelou 2024)
 *     základní_koef (dle počtu obyvatel, § 6 zákona):
 *       Praha:                     4,5  (zvláštní statut hlavního města)
 *       statutární města > 50 000: 3,5  (všechna ostatní krajská města v naší kalkulačce)
 *     místní_koef:                 nastavuje obec vyhláškou, rozsah 0,5–5,0
 *     inflační_koef:               1,0 pro rok 2025 (bez dopadu; bude se zvyšovat v budoucnu)
 *
 *   ZJEDNODUŠENÝ VZOREC (pro 2025):
 *     daň = m² × 2 × 1,22 × základní_koef × místní_koef
 *
 * =============================================================================
 * EFEKTIVNÍ SAZBA KČ/M²/ROK PODLE KOMBINACE KOEFICIENTŮ:
 *
 *   Praha (4,5 × 2,0):      2 × 1,22 × 4,5 × 2,0 = 21,96 Kč/m²
 *   Brno/Ostrava/Plzeň/ČB (3,5 × 1,0):  2 × 1,22 × 3,5 × 1,0 =  8,54 Kč/m²
 *   Hradec Králové (3,5 × 1,3):          2 × 1,22 × 3,5 × 1,3 = 11,10 Kč/m²
 *   Jihlava (3,5 × 1,5):                 2 × 1,22 × 3,5 × 1,5 = 12,81 Kč/m²
 *   Olomouc/Pardubice/Liberec/Zlín/
 *   Ústí nad Labem/KV (3,5 × 2,0):      2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
 *
 *   KLÍČOVÝ POZNATEK: Praha platí 2,6× více na m² než Brno / Ostrava.
 *   Olomouc nebo Pardubice (místní_koef 2,0) platí 2× více než Brno (místní_koef 1,0),
 *   přestože jsou to cenově srovnatelné trhy. Místní koeficient je čistě politické rozhodnutí
 *   zastupitelstva, nikoli odraz hodnoty nemovitostí.
 *
 * =============================================================================
 * MÍSTNÍ KOEFICIENTY PER MĚSTO (2025) — VÝZKUM:
 *
 *   Praha: 2,0
 *     Zdroj: OZV Hlavního města Prahy, platné od 1. 1. 2025.
 *     Pozn.: Platí plošně pro celé území Prahy pro rezidentní nemovitosti.
 *     Spolehlivost: VYSOKÁ.
 *
 *   Brno: 1,0
 *     Zdroj: OZV statutárního města Brna č. 28/2024, účinnost 1. 1. 2025.
 *     Spolehlivost: VYSOKÁ.
 *
 *   Ostrava: 1,0
 *     Zdroj: Tiskové prohlášení Magistrátu města Ostravy:
 *     "Ostrava ho má stále na nejnižší úrovni 1. V souvislosti s aktuální ekonomickou situací...
 *      bylo naším cílem nezvyšovat finanční zátěž až na výjimky u běžných vlastníků nemovitostí."
 *     Spolehlivost: VYSOKÁ (přímý citát z ostrava.cz).
 *
 *   Plzeň: 1,0
 *     Zdroj: plzen.eu: "Plzeň drtivé většině domácností pro rok 2025 daň z nemovitosti nezvýší."
 *     OZV č. 2/2024, účinnost 1. 1. 2025. Výjimky: k.ú. Malesice a Dolní Vlkýš dostaly místní_koef 0,5
 *     (snížení, nikoli zvýšení). Pro hlavní město = 1,0.
 *     Spolehlivost: VYSOKÁ.
 *
 *   České Budějovice: 1,0
 *     Zdroj: Přehled koeficientů 2024 (odhadonline.cz), žádná zpráva o změně pro 2025.
 *     Spolehlivost: STŘEDNÍ — potvrdit při příštím čtvrtletním refreshi.
 *
 *   Hradec Králové: 1,3
 *     Zdroj: hradeckralove.org: "Hradec částečně snižuje místní koeficient daně z nemovitých věcí"
 *     Koeficient pro BYTY a stavby k bydlení: snížen z 3 na 1,3 (záměr: zachovat celkovou daň
 *     na úrovni roku 2024 po navýšení zákonné sazby o 80 %).
 *     Stavební pozemky: 3, garáže/rekreace/podnikání: 4,5 (bez vlivu na bytový fond).
 *     Spolehlivost: VYSOKÁ.
 *
 *   Liberec: 2,0
 *     Zdroj: liberec.rozhlas.cz: "Liberec navýšil místní koeficient pouze pro průmyslové a komerční
 *     nemovitosti; bydlení bylo výslovně vyňato z cíleného zvýšení."
 *     Pozn.: Toto je platné pro 2025. Pro 2026 chystají Liberec + Jablonec cílené koeficienty.
 *     Předchozí hodnota pro rezidentní: 2,0 (z přehledu 2024) — potvrzena jako nezměněná.
 *     Spolehlivost: VYSOKÁ.
 *
 *   Olomouc: 2,0
 *     Zdroj: Přehled koeficientů dle vzorce (základní 3,5, místní 2, inflační 1).
 *     Olomoucký magistrát: "Letos návrh na zvýšení daně z nemovitosti nepředložili."
 *     Spolehlivost: VYSOKÁ.
 *
 *   Pardubice: 2,0
 *     Zdroj: OZV č. 9/2024, účinnost 1. 1. 2025. Místní koeficient pro rezidentní: zachován na 2,0.
 *     Průmyslové zóny: 4,0 (po úpravě z původního návrhu 5,0).
 *     TZB-info: "Pardubice: místní koeficient zůstává na hodnotě dva."
 *     Spolehlivost: STŘEDNÍ-VYSOKÁ.
 *
 *   Ústí nad Labem: 2,0
 *     Zdroj: usti.cz: "Zastupitelé schválili OZV o stanovení koeficientů — daň se nezvyšuje.
 *     Místní koeficient zůstává na hodnotě 2 pro všechny nemovitosti."
 *     Výjimka: vybrané problémové objekty (hotel Máj apod.) dostaly 5 — netýká se bytů.
 *     Spolehlivost: VYSOKÁ.
 *
 *   Karlovy Vary: 2,0
 *     Zdroj: karlovarsky.denik.cz: "Karlovy Vary daň z nemovitosti nenavýšily. Naposledy je měnily
 *     v roce 2008." Místní koeficient 2 potvrzen opakovaně. Základní koeficient = 3,5 (statutární město).
 *
 *     HISTORICKÝ KONTEXT — PROČ STARŠÍ ZDROJE UVÁDĚJÍ ZÁKLADNÍ_KOEF = 4,5 PRO KV:
 *       V STARÉM systému (pre-2024) mohly obce prostřednictvím OZV ZVÝŠIT svůj populační základ
 *       o jednu kategorii: KV mělo v období 2008–2023 základní_koef = 4,5 (zvýšeno z 3,5 via OZV).
 *       Zdroj: chytre-bydleni.cz přehled koeficientů 2019: KV = základní 4,5, místní 2.
 *       Po novele 2024 byl mechanismus OZV pro základní_koef zrušen — zákonem je nyní PEVNĚ
 *       stanoven dle počtu obyvatel. KV jako statutární město → zákonný základní_koef = 3,5.
 *       Starší zdroje (pre-2024) tedy nejsou „chybné", pouze popisují starou realitu.
 *       Efektivní sazba se pro KV 2025 SNÍŽILA oproti 2023: staré (4,5 × 2 × 1) = 9 Kč/m²
 *       → nové (3,5 × 2 × 2 × 1,22) = 17,08 Kč/m². Přesto je KV 2025 dražší kvůli zdvojení sazby.
 *     Spolehlivost: VYSOKÁ — mechanismus potvrzen ze zákona, historický kontext cross-validován.
 *
 *   Jihlava: 1,5
 *     Zdroj: Přehled koeficientů (odhadonline.cz, kurzy.cz). Základní_koef = 3,5 (statutární město,
 *     ~55 000 obyvatel). Místní_koef = 1,5, potvrzeno v více zdrojích pro 2024–2025.
 *     Spolehlivost: VYSOKÁ.
 *
 *   Zlín: 2,0
 *     Zdroj: zlinsky.denik.cz + hitradiozlin.cz: "Zlíňané zaplatí za daň z nemovitosti méně.
 *     Radnice ve Zlíně snižuje daň z nemovitosti o 30 %." Pro centrum: 2,0 (sníženo z 2,6).
 *     Pro místní části: 1,6. Průměr pro celé město: ~1,8.
 *     Volíme 2,0 jako reprezentativní hodnotu pro centrum (kde jsou typické investiční byty).
 *     Spolehlivost: VYSOKÁ (centrum hodnota), STŘEDNÍ (průměrná hodnota celého města).
 *
 * =============================================================================
 * INFLAČNÍ KOEFICIENT — MODELOVÁNÍ NA 30LETÉM HORIZONTU:
 *
 *   Zákon zavedl inflační koeficient (od 2024), který je nyní na hodnotě 1,0.
 *   Je navržen k postupnému zvyšování, aby daň reálně neklesala.
 *   Vláda explicitně uvedla, že bude koeficient zvyšovat v budoucnosti.
 *
 *   MODELOVACÍ ROZHODNUTÍ: Daň z nemovitých věcí v naší kalkulačce roste s inflací.
 *   Stejný parametr ocekavanaInflace (2,0 % p.a.) platí pro indexaci daně.
 *   Zdůvodnění: Absolutní výše daně je malá (260–2 500 Kč/rok). I kdyby skutečný
 *   inflační_koef rostl o 1–2 p.b. rychleji než CPI (což je pravděpodobné),
 *   30letý kumulativní dopad na výsledek je méně než 15 000–20 000 Kč — hluk
 *   v modelu s kupní cenou 3–15 milionů Kč.
 *
 * =============================================================================
 * PRAVIDELNÁ AKTUALIZACE:
 *
 *   Místní koeficienty se mění každoročně (nová OZV musí být vydána do 1. října
 *   předchozího roku). Hodnoty v tomto souboru platí pro zdaňovací období 2025.
 *   Doporučená aktualizace: Q4 každého roku (po zveřejnění nových OZV).
 */

import type { AttributeDoc, PerCityPerSize } from "./_types";

// =============================================================================
// KOEFICIENTY — POUŽITY PRO VÝPOČET HODNOT
// =============================================================================

/**
 * Zákonná sazba daně pro bytové jednotky (§ 11 zákona č. 338/1992 Sb., po novele 2024).
 */
const sazbaDane = 2; // Kč/m²

/**
 * Koeficient pro upravenou podlahovou plochu bytové jednotky (zavedeno novelou 2024).
 * Zahrnuje poměrný podíl na společných prostorách bytového domu.
 */
const koeficientUpravy = 1.22;

/**
 * Základní koeficient dle počtu obyvatel / statutu obce (§ 6 zákona č. 338/1992 Sb.).
 */
const zakladniKoeficient: Record<string, number> = {
  "praha":              4.5, // Hlavní město Praha — zákonem určená nejvyšší kategorie
  "brno":               3.5, // Statutární město > 50 000 obyvatel
  "ostrava":            3.5,
  "plzen":              3.5,
  "ceske-budejovice":   3.5,
  "hradec-kralove":     3.5,
  "liberec":            3.5,
  "olomouc":            3.5,
  "pardubice":          3.5,
  "usti-nad-labem":     3.5,
  "karlovy-vary":       3.5,
  "jihlava":            3.5,
  "zlin":               3.5,
};

/**
 * Místní koeficient pro rezidentní bytové jednotky (OZV příslušné obce, 2025).
 * Rozsah: 0,5–5,0. Hodnota 1,0 = žádný místní příplatek (zákonná sazba bez navýšení).
 */
const mistniKoeficient: Record<string, number> = {
  "praha":              2.0,  // OZV MHMP, platné od 1. 1. 2025
  "brno":               1.0,  // OZV č. 28/2024, účinnost 1. 1. 2025
  "ostrava":            1.0,  // Přímé prohlášení MMO: "nejnižší úroveň 1"
  "plzen":              1.0,  // OZV č. 2/2024 — pro centrum Plzně 1,0
  "ceske-budejovice":   1.0,  // 2024 ověřeno; 2025 beze změny (ověřit Q4 2025)
  "hradec-kralove":     1.3,  // OZV: sníženo z 3 → 1,3 pro byty (záměr zachovat výši 2024)
  "liberec":            2.0,  // Bydlení výslovně vyňato z průmyslového zvýšení; 2,0 zachováno
  "olomouc":            2.0,  // Magistrát: nepředložen návrh na změnu
  "pardubice":          2.0,  // OZV č. 9/2024; místní koef pro rezidentní zachován na 2,0
  "usti-nad-labem":     2.0,  // usti.cz: "místní koeficient zůstává na hodnotě 2"
  "karlovy-vary":       2.0,  // Beze změny od roku 2008 (potvrzeno primátorkou 2024)
  "jihlava":            1.5,  // Potvrzeno ve více zdrojích pro 2024–2025
  "zlin":               2.0,  // Centrum Zlín; sníženo z 2,6 na 2,0 pro rok 2025
};

/**
 * Inflační koeficient pro zdaňovací období 2025 (§ 6 zákona č. 338/1992 Sb.).
 * Aktuálně 1,0 — bez dopadu na výši daně.
 */
const inflacniKoeficient = 1.0;

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Roční daň z nemovitých věcí pro bytovou jednotku (Kč/rok).
 *
 * VÝPOČET: daň = m² × sazba (2) × koef_úpravy (1,22) × základní_koef × místní_koef × inflační_koef (1,0)
 *
 * Hodnoty jsou odvozeny ze squareMeters.ts (mediány Sreality, duben 2026)
 * a ze zákonných / obecních koeficientů pro rok 2025.
 * Zaokrouhleno na nejbližší 10 Kč.
 */
export const danZNemovitostiValues: PerCityPerSize<number> = {
  //              Kč/m²/rok = sazbaDane × koeficientUpravy × zakladniKoef × mistniKoef
  // Praha:       2 × 1,22 × 4,5 × 2,0 = 21,96 Kč/m²
  "praha": {
    "1+kk":  730,   // 33 m² × 21,96
    "2+kk": 1140,   // 52 m² × 21,96
    "3+kk": 1760,   // 80 m² × 21,96
    "4+kk": 2420,   // 110 m² × 21,96
  },
  // Brno: 2 × 1,22 × 3,5 × 1,0 = 8,54 Kč/m²
  "brno": {
    "1+kk":  270,   // 32 m² × 8,54
    "2+kk":  450,   // 53 m² × 8,54
    "3+kk":  670,   // 78 m² × 8,54
    "4+kk":  970,   // 113 m² × 8,54
  },
  // Ostrava: 2 × 1,22 × 3,5 × 1,0 = 8,54 Kč/m²
  "ostrava": {
    "1+kk":  260,   // 31 m² × 8,54
    "2+kk":  460,   // 54 m² × 8,54
    "3+kk":  670,   // 78 m² × 8,54
    "4+kk":  900,   // 105 m² × 8,54
  },
  // Plzeň: 2 × 1,22 × 3,5 × 1,0 = 8,54 Kč/m²
  "plzen": {
    "1+kk":  290,   // 34 m² × 8,54
    "2+kk":  470,   // 55 m² × 8,54
    "3+kk":  700,   // 82 m² × 8,54
    "4+kk":  890,   // 104 m² × 8,54
  },
  // České Budějovice: 2 × 1,22 × 3,5 × 1,0 = 8,54 Kč/m²
  "ceske-budejovice": {
    "1+kk":  340,   // 40 m² × 8,54
    "2+kk":  460,   // 54 m² × 8,54
    "3+kk":  720,   // 84 m² × 8,54
    "4+kk":  850,   // 99 m² × 8,54
  },
  // Hradec Králové: 2 × 1,22 × 3,5 × 1,3 = 11,10 Kč/m²
  "hradec-kralove": {
    "1+kk":  390,   // 35 m² × 11,10
    "2+kk":  590,   // 53 m² × 11,10
    "3+kk":  950,   // 86 m² × 11,10
    "4+kk": 1190,   // 107 m² × 11,10
  },
  // Liberec: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "liberec": {
    "1+kk":  700,   // 41 m² × 17,08
    "2+kk":  890,   // 52 m² × 17,08
    "3+kk": 1330,   // 78 m² × 17,08
    "4+kk": 1660,   // 97 m² × 17,08
  },
  // Olomouc: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "olomouc": {
    "1+kk":  550,   // 32 m² × 17,08
    "2+kk":  940,   // 55 m² × 17,08
    "3+kk": 1370,   // 80 m² × 17,08
    "4+kk": 1540,   // 90 m² × 17,08
  },
  // Pardubice: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "pardubice": {
    "1+kk":  560,   // 33 m² × 17,08
    "2+kk":  990,   // 58 m² × 17,08
    "3+kk": 1260,   // 74 m² × 17,08
    "4+kk": 1730,   // 101 m² × 17,08
  },
  // Ústí nad Labem: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "usti-nad-labem": {
    "1+kk":  430,   // 25 m² × 17,08
    "2+kk":  730,   // 43 m² × 17,08
    "3+kk": 1280,   // 75 m² × 17,08
    "4+kk": 1610,   // 94 m² × 17,08
  },
  // Karlovy Vary: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "karlovy-vary": {
    "1+kk":  670,   // 39 m² × 17,08
    "2+kk": 1030,   // 60 m² × 17,08
    "3+kk": 1500,   // 88 m² × 17,08
    "4+kk": 2020,   // 118 m² × 17,08
  },
  // Jihlava: 2 × 1,22 × 3,5 × 1,5 = 12,81 Kč/m²
  "jihlava": {
    "1+kk":  490,   // 38 m² × 12,81
    "2+kk":  700,   // 55 m² × 12,81
    "3+kk": 1140,   // 89 m² × 12,81
    "4+kk": 1310,   // 102 m² × 12,81
  },
  // Zlín — centrum: 2 × 1,22 × 3,5 × 2,0 = 17,08 Kč/m²
  "zlin": {
    "1+kk":  600,   // 35 m² × 17,08
    "2+kk":  900,   // 53 m² × 17,08
    "3+kk": 1440,   // 84 m² × 17,08
    "4+kk": 1620,   // 95 m² × 17,08
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const danZNemovitostiDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "danZNemovitosti",
  nazev: "Daň z nemovitých věcí",
  jednotka: "Kč / rok",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Roční daň z nemovitých věcí, kterou platí vlastník bytové jednotky finančnímu úřadu.
    Jedná se o majetkovou daň stanovenou zákonem č. 338/1992 Sb. (ve znění novely 2024).
    Výnos daně plyne do rozpočtu obce, na jejímž území se nemovitost nachází.
    Splatnost: 31. května (nebo ve dvou splátkách, přesáhne-li daň 5 000 Kč).
    Daňové přiznání se podává pouze jednou — při nabytí nebo při změně nemovitosti.
  `,

  coZahrnuje: [
    "Daň ze staveb a jednotek — konkrétně daň z bytové jednotky v bytovém domě",
    "Výpočet dle podlahové plochy bytu × zákonné sazby × koeficientů dle lokality",
  ],

  coNezahrnuje: [
    "Daň z pozemku — pozemek pod bytovým domem patří SVJ nebo developerovi, ne individuálnímu bytu",
    "Daň z příjmů z pronájmu (danění nájemného je samostatná povinnost — součást příjmové daně majitele)",
    "Poplatky SVJ / správní poplatky za správu domu (viz fondOprav)",
    "Daň z nabytí nemovitosti — byla zrušena v r. 2020",
    "Pojištění nemovitosti (viz pojisteniNemovitosti)",
  ],

  coOvlivnujeHodnotu: [
    "Výměra bytu (m²) — daň roste přímo úměrně s plochou",
    "Lokalita (město) — základní koeficient závisí na počtu obyvatel / statutu obce, místní koeficient je politické rozhodnutí zastupitelstva",
    "Místní koeficient: Praha (2,0) vs. Brno/Ostrava/Plzeň (1,0) — Praha platí 2,6× více na m²",
    "Inflační koeficient — aktuálně 1,0, bude se zvyšovat v budoucích letech dle rozhodnutí vlády",
    "Typ nemovitosti — garáže, rekreační stavby a průmyslové budovy mají jiné koeficienty",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Přesný výpočet dle zákonného vzorce: m² × 2 Kč × 1,22 × základní_koef × místní_koef.
      Místní koeficienty pro každé ze 13 měst dohledány z obecně závazných vyhlášek (OZV)
      a oficiálních prohlášení magistrátů. Výměra m² přebírána ze squareMeters.ts.
    `,
    procTatoMetoda: `
      Daň z nemovitých věcí je deterministic — není to odhadovaný parametr, je to zákonný výpočet.
      Jakmile jsou k dispozici koeficienty, výpočet je přesný na jednotky korun.
      Aproximace by zde zaváděla zbytečnou chybu tam, kde je přesnost dosažitelná.
    `,
    presnost: `
      Vysoká pro všechna města s potvrzeným místním koeficientem (Praha, Brno, Ostrava, Plzeň,
      HK, Liberec, Olomouc, Ústí nad Labem, Jihlava, Zlín — celkem 10 z 13).
      Střední pro České Budějovice, Pardubice, Karlovy Vary — místní koeficienty potvrzeny
      ze sekundárních zdrojů nebo z minulých OZV, bez přímého ověření OZV pro 2025.
      Chyba je ±0–10 % pro nepřesné hodnoty, což je v absolutní výši < 200 Kč/rok.
    `,
    kdyNeniPresna: [
      "Česká Budějovice: místní koeficient 1,0 potvrzeno pouze pro 2024 — ověřit při Q4 refreshi",
      "Pardubice: OZV 9/2024 ověřena jako vydaná, ale obsah (koef. pro byty) odvozen nepřímo",
      "Karlovy Vary: základní koeficient použit jako 3,5 (zákonný standard), ale historicky mohlo KV mít zvláštní status — ověřit",
      "Zlín: hodnota 2,0 je pro centrum; u bytů v místních částech je koeficient 1,6 — rozdíl ~300–400 Kč/rok pro typický byt",
      "Koeficienty se mění každoročně — data platí pro zdaňovací období 2025; ověřit před každou sezónou",
    ],
    vzorec: `
      danZNemovitosti[město][dispozice] = 
        squareMeters[město][dispozice]
        × 2 Kč                           // zákonná sazba pro bytovou jednotku
        × 1,22                           // koeficient upravené podlahové plochy
        × základníKoef[město]            // 4,5 pro Prahu, 3,5 pro ostatní
        × místníKoef[město]              // z OZV příslušné obce (0,5–5,0)
        × 1,0                            // inflační koeficient 2025
    `,
  },

  tooltipText: `Roční daň z nemovitých věcí dle zákonného vzorce (zákon č. 338/1992 Sb.). Výše závisí na m² bytu a koeficientech vaší obce — Praha platí 2,6× více než Brno na stejný m².`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "Zákon č. 338/1992 Sb. o dani z nemovitých věcí (ve znění novely 2024)",
        url: "https://www.zakonyprolidi.cz/cs/1992-338",
        datumPristupeno: "2026-04-04",
        coUvadi: "Zákonný základ výpočtu. Sazba pro bytové jednotky: 2 Kč/m². Koeficient úpravy: 1,22. Základní koeficient: Praha 4,5, statutární města nad 50 000 obyvatel 3,5. Inflační koeficient 2025: 1,0.",
      },
      {
        nazev: "Magistrát města Ostravy — oficální prohlášení k místnímu koeficientu",
        url: "https://www.ostrava.cz/cs/o-meste/aktualne/mesto-svym-obcanum-mistni-koeficient-dane-z-nemovitosti-zvedat-nebude",
        datumPristupeno: "2026-04-04",
        coUvadi: "\"Ostrava ho má stále na nejnižší úrovni 1. V souvislosti s aktuální ekonomickou situací... bylo naším cílem nezvyšovat finanční zátěž... u běžných vlastníků nemovitostí.\" Místní koeficient = 1,0 pro byty.",
      },
      {
        nazev: "Plzeň.eu — tisková zpráva k dani z nemovitosti 2025",
        url: "https://plzen.eu/o-meste/aktuality/aktuality-z-mesta/plzen-drtive-vetsine-domacnosti-pro-rok-2025-dan-z-nemovitosti-nezvysi/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Plzeň nezvyšuje místní koeficient pro drtivou většinu domácností. OZV č. 2/2024 zavedla koef. 0,5 jen pro k.ú. Malesice a Dolní Vlkýš (snížení). Pro centrum = 1,0.",
      },
      {
        nazev: "Hradec Králové — snížení místního koeficientu pro byty",
        url: "https://www.hradeckralove.org/hradec-castecne-snizuje-mistni-koeficient-dane-z-nemovitych-veci/d-84624",
        datumPristupeno: "2026-04-04",
        coUvadi: "HK snížilo místní koeficient pro stavby k bydlení z 3 na 1,3, aby zachovalo celkovou výši daně na úrovni roku 2024 po navýšení zákonné sazby o 80 %.",
      },
      {
        nazev: "Ústí nad Labem — OZV o koeficientech daně z nemovitých věcí",
        url: "https://www.usti.cz/cz/uredni-portal/seznamy-zprav/aktualni-informace/zastupitele-schvalili-obecne-zavaznou-vyhlasku-ostanoveni-koeficientu-pro-vypocet-dane-znemovitych-veci.html",
        datumPristupeno: "2026-04-04",
        coUvadi: "\"Daň se nezvyšuje. Místní koeficient zůstává na hodnotě 2 pro všechny nemovitosti.\" Výjimka: vybrané problémové objekty (opatření obecné povahy, netýká se bytů).",
      },
      {
        nazev: "Karlovarský deník — Karlovy Vary daň z nemovitosti nenavýšily",
        url: "https://karlovarsky.denik.cz/zpravy_region/karlovy-vary-dan-nemovitosti-nenavysily-20240515.html",
        datumPristupeno: "2026-04-04",
        coUvadi: "KV naposledy měnilo koeficienty v roce 2008. Primátorka: město se rozhodlo nezvyšovat vzhledem k vládnímu konsolidačnímu balíčku. Místní koeficient = 2,0 zachován.",
      },
      {
        nazev: "Zlínský deník — Zlín snižuje místní koeficient daně z nemovitosti",
        url: "https://zlinsky.denik.cz/zpravy_region/zlin-dan-z-nemovitosti-snizeni-koeficient-navrh-2024.html",
        datumPristupeno: "2026-04-04",
        coUvadi: "Zlín snížil místní koeficient pro rok 2025: centrum 2,0 (z 2,6), místní části 1,6 (z 2,0). Průměrný koeficient 1,8. Daň klesá až o 30 %.",
      },
      {
        nazev: "Banky.cz — Jak se počítá daň z nemovitých věcí",
        url: "https://www.banky.cz/clanky/jak-se-pocita-dan-z-nemovitych-veci-sazby-koeficienty-osvobozeni/",
        datumPristupeno: "2026-04-04",
        coUvadi: "Přehled zákonných koeficientů 2025: místní koeficient lze stanovit v rozsahu 0,5–5,0. Základní koeficient: Praha 4,5, statutární města a obce nad 50 000 obyvatel: 3,5.",
      },
    ],

    odvozeniHodnoty: `
      METODIKA VÝPOČTU (krok za krokem):

      1. ZÁKONNÝ VZOREC:
         daň = m² × 2 Kč × 1,22 × základní_koef × místní_koef × inflační_koef (1,0)

      2. VSTUPNÍ DATA:
         m²: přebíráme ze squareMeters.ts (mediány Sreality, duben 2026)
         základní_koef: Praha = 4,5; ostatní 12 měst = 3,5 (dle zákona)
         místní_koef: dohledán individuálně pro každé město z OZV nebo tiskových zpráv (viz zdroje)

      3. EFEKTIVNÍ SAZBA (Kč/m²/rok = 2 × 1,22 × základní_koef × místní_koef):
         Praha (4,5 × 2,0):             21,96 Kč/m²
         Brno, Ostrava, Plzeň, ČB (3,5 × 1,0):  8,54 Kč/m²
         Hradec Králové (3,5 × 1,3):    11,10 Kč/m²
         Jihlava (3,5 × 1,5):           12,81 Kč/m²
         Olomouc, Pardubice, Liberec, Zlín, Ústí, KV (3,5 × 2,0): 17,08 Kč/m²

      4. VÝSLEDKY (zaokrouhleno na 10 Kč):
         Všechny hodnoty jsou v danZNemovitostiValues výše — odvozeny
         přímým dosazením m² do vzorce.

      5. SROVNÁNÍ SE STARÝMI HODNOTAMI (calculator-defaults.ts):
         Starý kalkulátor používal chybný vzorec ("3.50×1.22×4.5×1.5×m²") bez rozlišení měst.
         Praha 2+kk: staré 1 600 Kč → správně 1 140 Kč (−28 %)
         Brno 2+kk: staré ~800 Kč → správně 450 Kč (−44 %)
         Olomouc 2+kk: staré ~1 600 Kč → správně 940 Kč (−41 %)
         Opravené hodnoty jsou systematicky nižší protože starý vzorec přeceňoval daň.

      KLÍČOVÝ VÝZKUMNÝ POZNATEK:
      Místní koeficient je POLITICKÉ rozhodnutí zastupitelstva — nikoli odraz hodnoty nemovitostí.
      Brno (druhé nejdražší město ČR) má místní_koef = 1,0 (nejnižší možný).
      Ústí nad Labem (nejlevnější město) má místní_koef = 2,0 (jako Praha).
      Výsledek: investor v Ústí platí 2× více daně než investor v Brně na stejný m²,
      přestože jeho byt je 3-4× levnější. Tato skutečnost je v naší kalkulačce správně zachycena.
    `,
  },

  hodnoty: danZNemovitostiValues,
};
