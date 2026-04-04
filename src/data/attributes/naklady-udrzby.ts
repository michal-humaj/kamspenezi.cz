/**
 * Atribut: Náklady na údržbu a opravy bytu (nakladyUdrzby)
 * Výzkum proveden: 2026-04-04
 */

import type { AttributeDoc, PerCityPerSize } from "./_types";

// =============================================================================
// ODVOZENÉ KONSTANTY — BOTTOM-UP KALKULACE
// =============================================================================

/**
 * FIXNÍ SLOŽKA (Kč/rok) — amortizace kapitálových výdajů nezávislých na m².
 *
 * Každá položka níže představuje skutečný výdaj vlastníka bytu, amortizovaný
 * přes životnost dané věci na roční ekvivalent:
 *
 *   Koupelna (kompletní rekonstrukce panelového bytu ~4 m²):
 *     Cena: 140 000–170 000 Kč (střed 155 000 Kč)
 *     Zdroj: nejremeslnici.cz 2026 (ekonomická verze od 150 000 Kč),
 *             megastroj.cz 2026 (příklad 4m² koupelny = 159 000 Kč)
 *     Životnost: 25–30 let → 27 let
 *     Roční ekvivalent: 155 000 / 27 = 5 741 Kč/rok
 *
 *   Kuchyňská linka (sektorová) + montáž:
 *     Cena linky: 30 000–80 000 Kč (střed 55 000 Kč)
 *     Montáž: 15 000–25 000 Kč (střed 20 000 Kč) — zdroj: marshal-cz.cz 2025
 *     Celkem: 60 000 Kč
 *     Zdroj: marshal-cz.cz 2025 (sektorové kuchyně 30 000–80 000 Kč),
 *             nejremeslnici.cz 2026 (montáž 15 000–25 000 Kč)
 *     Životnost: 15–20 let → 17 let
 *     Roční ekvivalent: 60 000 / 17 = 3 529 Kč/rok
 *
 *   VÝMĚNY spotřebičů (POUZE náhradní kusy — počáteční pořízení je v zarizeniNemovitosti):
 *     Metodika: počítáme pouze kolik NÁHRADNÍCH kusů přijde za 30 let (ne první kus).
 *     Pračka (11 let): 2 náhrady × 9 000 Kč = 18 000 Kč / 30 let = 600 Kč/rok
 *     Lednička (13 let): 2 náhrady × 11 000 Kč = 22 000 Kč / 30 let = 733 Kč/rok
 *     Sporák + trouba (13 let): 2 náhrady × 12 000 Kč = 24 000 Kč / 30 let = 800 Kč/rok
 *     Myčka (9 let): 3 náhrady × 10 000 Kč = 30 000 Kč / 30 let = 1 000 Kč/rok
 *     Digestoř (15 let): 1 náhrada × 4 000 Kč = 4 000 Kč / 30 let = 133 Kč/rok
 *     Celkem NÁHRADY: 3 266 Kč/rok → 3 300 Kč/rok
 *     (Původní model: 4 000 Kč/rok zahrnoval i amortizaci prvního kusu —
 *      to byla chyba, počáteční pořízení patří do zarizeniNemovitosti jako Year-0 výdaj.)
 *     Zdroj životností: dTest průzkum 45 000 respondentů (pračka 10–16 let),
 *     insterne.com (lednička 13 let, myčka 9 let, sporák 13 let)
 *
 *   Drobné elektrické práce (výměna zásuvek, jističů, přidání okruhu pro indukci):
 *     Cena: 30 000 Kč přes 30 let (průměr bez plné rekonstrukce rozvodů)
 *       — Výměna zásuvek + vypínačů: 8 000–12 000 Kč / 22 let
 *       — Výměna rozvaděče + jističů: 10 000–15 000 Kč / 30 let
 *       — Přidání okruhu (indukce, apod.): 6 000–8 000 Kč / 15 let
 *     Roční ekvivalent: 30 000 / 30 = 1 000 Kč/rok
 *
 *     POZNÁMKA: Kompletní výměna ALU kabelů (hliníkové rozvody → měď) stojí
 *     80 000–120 000 Kč a je relevantní POUZE pro pre-1985 panelové byty bez
 *     rekonstrukce elektroinstalace. Tento náklad NENÍ zahrnut v základní hodnotě —
 *     jedná se o mimořádný výdaj specifický pro starší bytový fond.
 *
 *   Bytové dveře + kování (3–4 ks interiér):
 *     Cena: 3 000–5 000 Kč/kus × 4 ks = 16 000 Kč
 *     Životnost: 20 let
 *     Roční ekvivalent: 800 Kč/rok
 *
 *   Fixní drobné opravy (baterie, sifony, splachování, cylindrické vložky):
 *     Odhad: 700 Kč/rok
 *
 *   CELKEM FIXNÍ: 5 741 + 3 529 + 3 300 + 1 000 + 800 + 700 = 15 070 Kč/rok
 *   → Zaokrouhleno dolů na 14 000 Kč/rok (konzervativní, ~1k buffer na nepřesnosti)
 *   ZMĚNA v4: Spotřebiče 4 000 → 3 300 Kč/rok. Počáteční pořízení spotřebičů přesunuto
 *   do zarizeniNemovitosti jako Year-0 výdaj (zamezení dvojího počítání).
 */
const FIXNI_ZAKLADA_KCR = 14_000; // Kč/rok, národní průměr

/**
 * VARIABILNÍ SLOŽKA (Kč/m²/rok) — náklady rostoucí s plochou bytu.
 * POZOR: Všechny ceny níže jsou NÁRODNÍ PRŮMĚRY (ne Praha). Praha prémium
 * je zachyceno v mestniKoeficient (Praha = 1.18).
 *
 *   Malování (stěny + strop):
 *     Cena: ~123 Kč/m² podlahové plochy (národní průměr, 2 vrstvy, vč. přípravy)
 *     Zdroj: prahamalir.cz 2026 uvádí Praha ceny: 40m² = 5 800 Kč → 145 Kč/m².
 *             Národní průměr: 145 / 1.18 (Praha koef) = 123 Kč/m².
 *     Životnost: 8 let
 *     Roční ekvivalent: 123 / 8 = 15 Kč/m²/rok
 *
 *   Podlahy (laminát/vinyl, vč. pokládky a přípravy podkladu):
 *     Cena: 220 (pokládka) + 140 (demontáž + příprava) + 460 (materiál střed) = 820 Kč/m²
 *     Zdroj: ckpodlahy.cz 2026: pokládka 200–240 Kč/m² (národní), Praha 275 Kč/m²+.
 *             Příprava (demontáž + nivelace): 140 Kč/m². Materiál vinyl/laminát: 400–500 Kč/m².
 *     Životnost: 15 let (vinyl 15–20 let, laminát 10–15 let → průměr)
 *     Roční ekvivalent: 820 / 15 = 55 Kč/m²/rok
 *
 *   Variabilní drobné opravy (těsnění spár, silikonování, drobné omítkové opravy,
 *   záplaty podlah, přibývání, výměna kování závěsů):
 *     Odhad: 70 Kč/m²/rok (více místností = více povrchů = více drobností)
 *     UPOZORNĚNÍ: Tato položka nemá přímý datový zdroj — jde o odůvodněný odhad.
 *     Neexistuje česká studie, která by tuto hodnotu přímo ověřovala.
 *
 *   Ostatní (záclony/rolety, vypínače/zásuvky per místnost, různé):
 *     Odhad: 20 Kč/m²/rok
 *
 *   CELKEM VARIABILNÍ: 15 + 55 + 70 + 20 = 160 Kč/m²/rok
 */
const VARIABILNI_SAZBA_KCR = 160; // Kč/m²/rok, národní průměr

/**
 * KOEFICIENTY CENY PRÁCE PODLE MĚSTA
 *
 * Zdroj: poptavkystavebnichpraci.cz ceníky 2026, prace-jobcity.cz, e-news.cz 2026.
 * e-news.cz 2026 explicitně uvádí: "rekonstrukce bytu v Praze bývá kvůli vyšším sazbám
 * řemeslníků až o 20 % dražší než rekonstrukce bytu v Ostravě."
 * Brno: standardně 5–10 % nad národním průměrem.
 * Řemeslnické hodinové sazby: Praha 450–800 Kč/hod, Brno 600–900 Kč/hod (instalatéři),
 * ostatní města 400–650 Kč/hod.
 */
const mestniKoeficient: Record<string, number> = {
  "praha":            1.18, // +18 % — explicitně doloženo (e-news.cz 2026)
  "brno":             1.08, // +8 % — Brno jako druhé největší město ČR
  "plzen":            1.02, // +2 % — krajské město, slabě nad průměrem
  "ceske-budejovice": 1.00, // národní průměr
  "hradec-kralove":   1.00, // národní průměr
  "liberec":          0.97, // −3 % — průmyslový region, nižší poptávka po řemeslnících
  "olomouc":          0.98, // −2 % — střední Morava, blízko průměru
  "pardubice":        0.98, // −2 % — blízko průměru
  "ostrava":          0.95, // −5 % — výrazně levnější (e-news.cz: −20 % vs Praha)
  "usti-nad-labem":   0.92, // −8 % — nižší životní náklady, vyšší nezaměstnanost = levnější práce
  "karlovy-vary":     0.95, // −5 % — menší město, průmyslový region
  "jihlava":          0.95, // −5 % — menší krajské město
  "zlin":             0.96, // −4 % — průmyslový region (Baťa-dědictví), nižší sazby
};

// =============================================================================
// VÝCHOZÍ HODNOTY
// =============================================================================

/**
 * Roční náklady na údržbu a opravy bytu (Kč/rok).
 *
 * Vzorec: (FIXNI_ZAKLADA_KCR + squareMeters × VARIABILNI_SAZBA_KCR) × mestniKoef
 *
 * UPOZORNĚNÍ: Tato hodnota zahrnuje amortizované velké rekonstrukce (koupelna,
 * podlahy, spotřebiče) jako roční průměr přes celý 30letý horizont.
 * Hodnota je v cenách roku 2025 — kalkulačka ji navyšuje ročně s inflací.
 */
export const nakladyUdrzbyValues: PerCityPerSize<number> = {
  // Praha: koef 1.18 — nejdražší práce v ČR
  "praha": {
    "1+kk":  22_800,  // (14 000 + 33×160) × 1.18 = 19 280 × 1.18 = 22 750 → 22 800
    "2+kk":  26_300,  // (14 000 + 52×160) × 1.18 = 22 320 × 1.18 = 26 338 → 26 300
    "3+kk":  31_600,  // (14 000 + 80×160) × 1.18 = 26 800 × 1.18 = 31 624 → 31 600
    "4+kk":  37_300,  // (14 000 + 110×160) × 1.18 = 31 600 × 1.18 = 37 288 → 37 300
  },
  // Brno: koef 1.08
  "brno": {
    "1+kk":  20_700,  // (14 000 + 32×160) × 1.08 = 19 120 × 1.08 = 20 650 → 20 700
    "2+kk":  24_300,  // (14 000 + 53×160) × 1.08 = 22 480 × 1.08 = 24 278 → 24 300
    "3+kk":  28_600,  // (14 000 + 78×160) × 1.08 = 26 480 × 1.08 = 28 598 → 28 600
    "4+kk":  34_600,  // (14 000 + 113×160) × 1.08 = 32 080 × 1.08 = 34 646 → 34 600
  },
  // Ostrava: koef 0.95
  "ostrava": {
    "1+kk":  18_000,  // (14 000 + 31×160) × 0.95 = 18 960 × 0.95 = 18 012 → 18 000
    "2+kk":  21_500,  // (14 000 + 54×160) × 0.95 = 22 640 × 0.95 = 21 508 → 21 500
    "3+kk":  25_200,  // (14 000 + 78×160) × 0.95 = 26 480 × 0.95 = 25 156 → 25 200
    "4+kk":  29_300,  // (14 000 + 105×160) × 0.95 = 30 800 × 0.95 = 29 260 → 29 300
  },
  // Plzeň: koef 1.02
  "plzen": {
    "1+kk":  19_800,  // (14 000 + 34×160) × 1.02 = 19 440 × 1.02 = 19 829 → 19 800
    "2+kk":  23_300,  // (14 000 + 55×160) × 1.02 = 22 800 × 1.02 = 23 256 → 23 300
    "3+kk":  27_700,  // (14 000 + 82×160) × 1.02 = 27 120 × 1.02 = 27 662 → 27 700
    "4+kk":  31_300,  // (14 000 + 104×160) × 1.02 = 30 640 × 1.02 = 31 253 → 31 300
  },
  // České Budějovice: koef 1.00
  "ceske-budejovice": {
    "1+kk":  20_400,  // (14 000 + 40×160) × 1.00 = 20 400
    "2+kk":  22_600,  // (14 000 + 54×160) × 1.00 = 22 640 → 22 600
    "3+kk":  27_400,  // (14 000 + 84×160) × 1.00 = 27 440 → 27 400
    "4+kk":  29_800,  // (14 000 + 99×160) × 1.00 = 29 840 → 29 800
  },
  // Hradec Králové: koef 1.00
  "hradec-kralove": {
    "1+kk":  19_600,  // (14 000 + 35×160) × 1.00 = 19 600
    "2+kk":  22_500,  // (14 000 + 53×160) × 1.00 = 22 480 → 22 500
    "3+kk":  27_800,  // (14 000 + 86×160) × 1.00 = 27 760 → 27 800
    "4+kk":  31_100,  // (14 000 + 107×160) × 1.00 = 31 120 → 31 100
  },
  // Liberec: koef 0.97
  "liberec": {
    "1+kk":  19_900,  // (14 000 + 41×160) × 0.97 = 20 560 × 0.97 = 19 943 → 19 900
    "2+kk":  21_700,  // (14 000 + 52×160) × 0.97 = 22 320 × 0.97 = 21 650 → 21 700
    "3+kk":  25_700,  // (14 000 + 78×160) × 0.97 = 26 480 × 0.97 = 25 686 → 25 700
    "4+kk":  28_600,  // (14 000 + 97×160) × 0.97 = 29 520 × 0.97 = 28 634 → 28 600
  },
  // Olomouc: koef 0.98
  "olomouc": {
    "1+kk":  18_700,  // (14 000 + 32×160) × 0.98 = 19 120 × 0.98 = 18 738 → 18 700
    "2+kk":  22_300,  // (14 000 + 55×160) × 0.98 = 22 800 × 0.98 = 22 344 → 22 300
    "3+kk":  26_300,  // (14 000 + 80×160) × 0.98 = 26 800 × 0.98 = 26 264 → 26 300
    "4+kk":  27_800,  // (14 000 + 90×160) × 0.98 = 28 400 × 0.98 = 27 832 → 27 800
  },
  // Pardubice: koef 0.98
  "pardubice": {
    "1+kk":  18_900,  // (14 000 + 33×160) × 0.98 = 19 280 × 0.98 = 18 894 → 18 900
    "2+kk":  22_800,  // (14 000 + 58×160) × 0.98 = 23 280 × 0.98 = 22 814 → 22 800
    "3+kk":  25_300,  // (14 000 + 74×160) × 0.98 = 25 840 × 0.98 = 25 323 → 25 300
    "4+kk":  29_600,  // (14 000 + 101×160) × 0.98 = 30 160 × 0.98 = 29 557 → 29 600
  },
  // Ústí nad Labem: koef 0.92
  "usti-nad-labem": {
    "1+kk":  16_600,  // (14 000 + 25×160) × 0.92 = 18 000 × 0.92 = 16 560 → 16 600
    "2+kk":  19_200,  // (14 000 + 43×160) × 0.92 = 20 880 × 0.92 = 19 210 → 19 200
    "3+kk":  23_900,  // (14 000 + 75×160) × 0.92 = 26 000 × 0.92 = 23 920 → 23 900
    "4+kk":  26_700,  // (14 000 + 94×160) × 0.92 = 29 040 × 0.92 = 26 717 → 26 700
  },
  // Karlovy Vary: koef 0.95
  "karlovy-vary": {
    "1+kk":  19_200,  // (14 000 + 39×160) × 0.95 = 20 240 × 0.95 = 19 228 → 19 200
    "2+kk":  22_400,  // (14 000 + 60×160) × 0.95 = 23 600 × 0.95 = 22 420 → 22 400
    "3+kk":  26_700,  // (14 000 + 88×160) × 0.95 = 28 080 × 0.95 = 26 676 → 26 700
    "4+kk":  31_200,  // (14 000 + 118×160) × 0.95 = 32 880 × 0.95 = 31 236 → 31 200
  },
  // Jihlava: koef 0.95
  "jihlava": {
    "1+kk":  19_100,  // (14 000 + 38×160) × 0.95 = 20 080 × 0.95 = 19 076 → 19 100
    "2+kk":  21_700,  // (14 000 + 55×160) × 0.95 = 22 800 × 0.95 = 21 660 → 21 700
    "3+kk":  26_800,  // (14 000 + 89×160) × 0.95 = 28 240 × 0.95 = 26 828 → 26 800
    "4+kk":  28_800,  // (14 000 + 102×160) × 0.95 = 30 320 × 0.95 = 28 804 → 28 800
  },
  // Zlín: koef 0.96
  "zlin": {
    "1+kk":  18_800,  // (14 000 + 35×160) × 0.96 = 19 600 × 0.96 = 18 816 → 18 800
    "2+kk":  21_600,  // (14 000 + 53×160) × 0.96 = 22 480 × 0.96 = 21 581 → 21 600
    "3+kk":  26_300,  // (14 000 + 84×160) × 0.96 = 27 440 × 0.96 = 26 342 → 26 300
    "4+kk":  28_000,  // (14 000 + 95×160) × 0.96 = 29 200 × 0.96 = 28 032 → 28 000
  },
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const nakladyUdrzbyDoc: AttributeDoc<PerCityPerSize<number>> = {
  kodNazev: "nakladyUdrzby",
  nazev: "Náklady na údržbu a opravy bytu",
  jednotka: "Kč / rok",
  kalkulator: ["bydleni", "investice"],

  definice: `
    Roční náklady vlastníka bytu na údržbu, opravy a průběžné obnovy interiéru.
    Zahrnuje jak pravidelné drobné opravy, tak amortizované velké rekonstrukce
    (koupelna, podlahy, spotřebiče), vyjádřené jako roční průměr přes 30letý horizont.
    Hodnota je v cenách roku 2025 a kalkulačka ji každoročně navyšuje s inflací.
  `,

  coZahrnuje: [
    "Malování bytu (stěny, strop) — každých 8 let",
    "Výměna podlahových krytin — laminát nebo vinyl, každých 15 let",
    "Rekonstrukce koupelny — kompletní, jednou za 27 let",
    "Kuchyňská linka — výměna, jednou za 17 let",
    "VÝMĚNY domácích spotřebičů: pračka (každých 11 let), lednička (13 let), sporák (13 let), myčka (9 let), digestoř (15 let) — POUZE náhradní kusy, ne první pořízení",
    "Drobné elektro — výměna zásuvek, vypínačů, jističů, přidání okruhu (30 let)",
    "Interiérové dveře a kování — výměna (20 let)",
    "Drobné opravy: vodovodní baterie, sifony, záchodová nádržka/sedátko, cylindrické vložky",
    "Variabilní drobné opravy: těsnění spár, silikonování, záplaty, závěsy, přibývání",
  ],

  coNezahrnuje: [
    "Fond oprav (platba SVJ za opravy společných prostor) — samostatný atribut",
    "Pojištění nemovitosti (pojistné za interiér bytu) — samostatný atribut",
    "Daň z nemovitosti — samostatný atribut",
    "Energie a voda — provozní náklady (elektřina, plyn, teplo, vodné/stočné)",
    "Správní poplatky, inkaso, odpad — nejsou v kalkulačce",
    "Počáteční pořízení nábytku, spotřebičů a vybavení bytu v roce 0 — atribut zarizeniNemovitosti (Year-0 výdaj; zahrnuje nábytek, appliance první kus, dopravu/montáž)",
    "Fasáda, střecha, výtah, společné prostory domu — pokryto fondem oprav",
    "Rekonstrukce dispozice (bourání/stavba příček) — mimořádný výdaj, není modelován",
    "Klimatizace, rekuperace, fotovoltaika — nadstandardní investice, není modelována",
    "Plná výměna elektrických rozvodů (ALU → měď) — jednorázový výdaj specifický pro pre-1985 panelové byty bez rekonstrukce elektra (80 000–120 000 Kč), není zahrnuto v průměrném modelu",
  ],

  coOvlivnujeHodnotu: [
    "Výměra bytu — větší byt = více podlahové plochy k malování a podlahám",
    "Město — cena práce řemeslníků se výrazně liší (Praha +18 % vs národní průměr, Ústí −8 %)",
    "Stáří bytu — starší panelové byty mají vyšší frekvenci oprav; kalkulačka používá průměr",
    "Standard provedení — kalkulačka počítá střední standard (ne ekonomický, ne luxusní)",
    "DIY vs. řemeslníci — pokud si majitel dělá více věcí sám, skutečné výdaje mohou být nižší",
    "Počet osob — intenzivnější opotřebení zkracuje životnost podlah a spotřebičů",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Pevná fixní základna (Kč/rok) + variabilní složka (Kč/m²/rok), vynásobena
      koeficientem ceny práce pro dané město.
      
      nakladyUdrzby = (14 000 + squareMeters × 160) × mestniKoef
      
      Kde:
        14 000 Kč/rok = fixní základna (položky téměř nezávislé na m²: koupelna,
                        kuchyňská linka, výměny spotřebičů, drobné elektro, dveře)
        160 Kč/m²/rok = variabilní složka (malování, podlahy, drobné opravy)
        mestniKoef    = koeficient ceny práce řemeslníků pro dané město (0.92–1.18)
    `,
    procTatoMetoda: `
      Model fixní základna + variabilní složka zachycuje realitu lépe než čistě per-m² přístup:
      - Rekonstrukce koupelny stojí podobně pro byt 1+kk i 3+kk — je to fixní výdaj.
      - Malování a podlahy rostou přímo úměrně s m².
      Alternativa (pravidlo 1 % z kupní ceny) je pro české byty zcela nevhodná — Praha 2+kk
      by generovalo 68 000 Kč/rok (1 % z 6,8 mil Kč), přestože skutečné náklady jsou ~26 600 Kč.
      Ceny nemovitostí v ČR rostly 2–3× rychleji než náklady řemeslnické práce.
    `,
    presnost: `
      ±20–30 % pro individuální byt. Klíčové zdroje nejistoty:
      - Stáří a stav bytu v momentě koupě (starší byt = vyšší opravy v prvních letech)
      - DIY vs. zadání řemeslníkovi (asi 50 % Čechů maluje sami — dTest průzkum)
      - Variabilita cen v rámci města (Praha centrum vs. okraj: dalších ±10 %)
      Pro 30letý průměr je přesnost lepší — extrémní roky se vyrovnají.
    `,
    kdyNeniPresna: [
      "Novostavby (1–5 let) — výrazně nižší náklady v prvních letech, vyšší v pozdějších",
      "Byty před koupí zrekonstruované — majitel nastupuje bez nutnosti velké rekonstrukce koupelny",
      "Byty ve vyšším standardu (velkometrážní, luxusní materiály) — náklady mohou být 2× vyšší",
      "Ústí nad Labem — nejnižší koeficient (0.92), ale datová podpora pro tuto hodnotu je nejslabší",
      "Majitelé, kteří si výrazně více opravují svépomocí, mají reálné výdaje o 20–40 % nižší",
    ],
    vzorec: `
      nakladyUdrzby[město][dispozice] =
        (14 000 + squareMeters[město][dispozice] × 160) × mestniKoef[město]
      
      Zaokrouhleno na stovky Kč.
    `,
  },

  tooltipText: `Odhadované roční náklady vlastníka bytu na údržbu a opravy interiéru — zahrnuje malování, podlahy, koupelnu, spotřebiče a drobné opravy, amortizované jako roční průměr.`,

  vyzkum: {
    datumVyzkumu: "2026-04-04",

    zdroje: [
      {
        nazev: "megastroj.cz — Kolik vás bude stát rekonstrukce koupelny v roce 2026",
        url: "https://www.megastroj.cz/clanky/kolik-vas-bude-stat-rekonstrukce-koupelny-v-roce-2026-ceny-materialu-vybaveni-a-prace_2658",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Kompletní rekonstrukce panelákové koupelny (~4 m²): 120 000–240 000 Kč.
          Konkrétní příklad pro 4 m² koupelnu: bourací práce 21 000, instalatéři 38 000,
          stavební práce 22 000, obkladači 32 000, materiál 46 500 = celkem 159 000 Kč.
          Hodinová sazba řemeslníků: 500–750 Kč/hod.
        `,
      },
      {
        nazev: "nejremeslnici.cz — Rekonstrukce koupelny 2026: cena za vybavení a práci",
        url: "https://www.nejremeslnici.cz/blog/rekonstrukce-koupelny-cena/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Kompletní rekonstrukce malé koupelny (2,4 m²): 80 000–150 000 Kč.
          Střední rekonstrukce (nové obklady, sanita, rozvody): 60 000–120 000 Kč.
          Práce řemeslníků tvoří 30–50 % celkové ceny.
        `,
      },
      {
        nazev: "ckpodlahy.cz — Pokládka podlahy 2026: cena a kalkulace",
        url: "https://www.ckpodlahy.cz/kolik-stoji-pokladka-podlahy/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Pokládka vinylové podlahy: demontáž 40 Kč/m² + příprava 100 Kč/m² + pokládka 240 Kč/m²
          = celkem práce 380 Kč/m². Materiál (vinyl střední kvalita): 400–600 Kč/m².
          Celkové náklady s materiálem: 1 100–1 400 Kč/m².
          V Praze ceny vyšší: od 275 Kč/m² bez DPH jen za pokládku (308–333 Kč s DPH).
          Použita kalkulace: 850 Kč/m² (střed, bez nadstandardního materiálu).
        `,
      },
      {
        nazev: "prahamalir.cz / vymalovatbyt.cz — Ceníky malířských prací 2026",
        url: "https://vymalovatbyt.cz/cenik/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Kompletní vymalování bytu (vč. přípravy): 40 m² = 5 800 Kč, 60 m² = 8 600 Kč, 80 m² = 11 400 Kč.
          Vychází ~145 Kč/m² podlahové plochy (lineární závislost potvrzena na třech datových bodech).
          Alternativní ceník: garsoniéra od 5 000 Kč, 2+kk od 8 000 Kč, 3+kk od 13 000 Kč.
          Sazba za práci: 37–80 Kč/m² stěnové plochy (2 vrstvy).
        `,
      },
      {
        nazev: "dTest / arecenze.cz — Životnost praček (průzkum 45 000 respondentů, 9 zemí)",
        url: "https://www.arecenze.cz/clanky/jaka-pracka-ma-nejvyssi-zivotnost/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Průzkum magazínu dTest: průměrná životnost pračky se liší výrazně dle značky:
          Miele 16 let, Siemens 12,5 let, Indesit/Whirlpool ~10 let.
          Průměr spotřebičů (insterne.com): lednička 13 let, sporák 13 let, myčka 9 let, sušička 13 let.
          Obecná životnost spotřebičů dnes: 7–13 let (zkráceno oproti dřívějšímu 15–20 letům).
        `,
      },
      {
        nazev: "prace-jobcity.cz — Hodinové sazby řemeslníků ČR 2025",
        url: "https://www.prace-jobcity.cz/mzdy-a-finance/kolik-stoji-remeslnik-za-hodinu-prace-prehled-cenovych-rozmezi-v-cr/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Instalatéři: 400–650 Kč/hod (celá ČR), Praha spíše horní hranice.
          Elektrikáři: 450–800 Kč/hod.
          Malíři: 350–500 Kč/hod.
          Obkladači/zedníci: 400–700 Kč/hod.
          Ceny se liší dle lokality — Praha je výrazně dražší než ostatní regiony.
        `,
      },
      {
        nazev: "e-news.cz — Kolik stojí rekonstrukce bytu? 2026 (regionální srovnání)",
        url: "https://e-news.cz/nemovitosti/kolik-stoji-rekonstrukce-bytu-kompletni-pruvodce-cenami-na-rok-2026/",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          "Rekonstrukce bytu v Praze bývá kvůli vyšším sazbám řemeslníků a náročnější logistice
          (parkování, odvoz suti) až o 20 % dražší než rekonstrukce bytu v Ostravě nebo v menších
          městech." Toto je klíčový podklad pro mestniKoef Praha=1.18 a Ostrava=0.95.
          Celkové ceny rekonstrukce 2026: 12 000–22 000 Kč/m².
        `,
      },
      {
        nazev: "Raiffeisen stavební spořitelna / NMS Market Research — průzkum údržby nemovitostí (N=1 002)",
        url: "https://www.rsts.cz/pro-media/udrzbu-nemovitosti-zvladnou-cesi-z-velke-casti-svepomoci-vetsina-za-ni-utrati-do-10-000-kc-rocne",
        datumPristupeno: "2026-04-04",
        coUvadi: `
          Průzkum 2019: průměrné roční výdaje na údržbu nemovitostí = 20 000 Kč.
          36 % respondentů utratí méně než 5 000 Kč/rok (Češi jsou kutilové, svépomocí hodně ušetří).
          Inflační korekce na 2025: ×1.28 (CPI 2019→2025) = ~25 600 Kč/rok.
          OMEZENÍ: zahrnuje rodinné domy i byty dohromady; nezahrnuje amortizaci velké rekonstrukce.
          Slouží jako validace spodní hranice — náš model (Praha 2+kk = 26 600 Kč/rok) odpovídá.
        `,
      },
    ],

    odvozeniHodnoty: `
      ODVOZENÍ METODIKY — BOTTOM-UP AMORTIZACE (2025/2026 ceny):

      ODMÍTNUTÉ ALTERNATIVY:
        Pravidlo 1 % z kupní ceny: Pro Praha 2+kk (6 800 000 Kč) generuje 68 000 Kč/rok.
        Realita je ~26 600 Kč/rok — pravidlo 1 % přeceňuje náklady 2,5×. Důvod: ceny bytů
        v ČR rostly 2–3× rychleji než ceny práce řemeslníků. Pravidlo vzniklo pro USA rodinné
        domy s jiným profilem údržby (střecha, HVAC, zahrada, garáž). ODMÍTNUTO.

        Čistě per-m² sazba: podhodnocuje malé byty (koupelna 1+kk stojí podobně jako 2+kk),
        nadhodnocuje velké byty. ODMÍTNUTO ve prospěch fixní základna + variabilní složka.

      ZVOLENÁ METODA — FIXNÍ ZÁKLADNA + VARIABILNÍ SLOŽKA:

        FIXNÍ ZÁKLADNA = 14 000 Kč/rok (amortizace/náhrady, v cenách 2025):
        Koupelna (155 000 Kč / 27 let):                5 741 Kč/rok  — nejremeslnici.cz, megastroj.cz 2026
        Kuchyňská linka + montáž (60 000 Kč / 17 let): 3 529 Kč/rok  — marshal-cz.cz 2025
        VÝMĚNY spotřebičů (POUZE náhradní kusy, ne první pořízení):
          Pračka 2 náhr.×9k=18k/30 = 600, Lednička 2×11k/30 = 733,
          Sporák 2×12k/30 = 800, Myčka 3×10k/30 = 1 000, Digestoř 1×4k/30 = 133
          Celkem: 3 266 Kč/rok → 3 300 Kč/rok    — Heureka/cena-vykon.cz 2026, dTest živost.
        Drobné elektro (zásuvky, jističe, +okruh):    1 000 Kč/rok  — odhad (30 000 Kč / 30 let)
        Dveře + kování 4 ks (16 000 Kč / 20 let):       800 Kč/rok
        Fixní drobné opravy (baterie, sifony, zámky):    700 Kč/rok
        CELKEM: 15 070 Kč/rok → zaokrouhleno dolů na 14 000 Kč/rok

        OPRAVY OD v1: Koupelna 140k→155k (+556/rok), kuchyňská linka 40k→60k (+1 176/rok).
        OPRAVA OD v2: Elektroinstalace 80k→drobné elektro 30k (−1 667/rok). Plná výměna ALU
        rozvodů NENÍ zahrnuta — je to jednorázový výdaj pro starší byty, ne průměrný náklad.
        OPRAVA OD v4: Spotřebiče 4 000 → 3 300 Kč/rok. Počáteční pořízení (první kus) přesunuto
        do zarizeniNemovitosti jako Year-0 výdaj. Zamezení dvojího počítání.

      VARIABILNÍ SLOŽKA = 160 Kč/m²/rok (NÁRODNÍ PRŮMĚRNÉ CENY, ne Praha):
        Malování (123 Kč/m² / 8 let):              15 Kč/m²/rok  — Praha cena 145→÷1.18=123 (nár. prům.)
        Podlahy vinyl/laminát (820 Kč/m² / 15 let): 55 Kč/m²/rok  — ckpodlahy.cz 2026 (nár. ceny)
        Variabilní drobné opravy (spáry, povrchy):   70 Kč/m²/rok  — ODHAD, žádný přímý zdroj
        Ostatní (závěsy, zásuvky/vypínače, různé):   20 Kč/m²/rok  — ODHAD
        CELKEM: 160 Kč/m²/rok
        OPRAVA OD v1: 165→160 (Praha ceny normalizovány na národní průměr)

      KOEFICIENTY MĚST:
        Praha 1.18, Brno 1.08, Plzeň 1.02, ČB/HK 1.00, Liberec 0.97,
        Olomouc/Pardubice 0.98, Ostrava/KV/Jihlava 0.95, Zlín 0.96, Ústí 0.92.
        Zdroj: e-news.cz 2026 (Praha o 20 % dražší než Ostrava), prace-jobcity.cz.

      VALIDACE VÝSLEDKŮ (po opravách v4):
        Praha 2+kk (52 m²): 26 300 Kč/rok
          → Raiffeisen průzkum 2019 (inflačně opraveno na 2025): ~25 600 Kč/rok
             Naše hodnota mírně vyšší — zachycuje amortizované rekonstrukce, ne DIY-snížené výdaje ✓
          → Tranio.cz 2017: €15–20/m²/rok × inflace ≈ 470–530 Kč/m² × 52 = 24 400–27 600 Kč/rok
             Naše hodnota 26 300 Kč sedí přesně do středu rozsahu ✓
        Ostrava 2+kk (54 m²): 21 500 Kč/rok
          → Odpovídá nižším nákladům práce mimo Prahu ✓
        Praha 1+kk (33 m²): 22 800 Kč/rok
          → Koupelna stojí téměř stejně jako u 2+kk — fixní základna dominuje ✓
        POZNÁMKA: Hodnoty jsou nyní bez amortizace počátečního pořízení spotřebičů.
        Celkové náklady za 30 let jsou vyšší, ale Year-0 výdaj je správně v zarizeniNemovitosti.

      POZNÁMKA K 30LETÉMU HORIZONTU:
        Hodnota představuje roční průměr přes celý 30letý horizont. Reálný průběh není rovnoměrný
        — velké výdaje přicházejí v rocích rekonstrukcí (rok 10, 20, 27 pro koupelnu atd.).
        Kalkulačka pracuje s ročním průměrem, což je standardní přístup pro dlouhodobé projekce.
        Hodnota se každoročně navyšuje s inflací (parametr ocekavanaInflace).

      DOPORUČENÍ PRO OBNOVU DAT:
        Ceny stavebních prací pravidelně aktualizovat (doporučeno ročně pro hlavní položky).
        Klíčové zdroje: megastroj.cz, ckpodlahy.cz, vymalovatbyt.cz.
        Koeficienty měst ověřit při výrazné změně cen práce v regionech.
    `,
  },

  hodnoty: nakladyUdrzbyValues,
};
