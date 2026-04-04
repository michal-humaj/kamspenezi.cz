/**
 * Obsazenost nájemního bytu — předpokládaná průměrná roční obsazenost investičního bytu
 * soukromého pronajímatele na 30letém horizontu. Hodnota je per-city (%).
 *
 * Definice: obsazenost = procento roku, kdy byt generuje příjem z nájmu.
 * Např. 92 % = byt je obsazen průměrně 11,0 měsíců ročně (0,92 × 12).
 *
 * =============================================================================
 * ZDROJE A METODIKA:
 *
 *   Přímá data o obsazenosti soukromých nájemních bytů v ČR jsou omezená.
 *   Veřejné statistiky (ČSÚ, MMR) sledují "neobydlené byty" (zahrnují prázdné domy,
 *   rekreační objekty, byty čekající na renovaci) — netransferovatelné na obsazenost
 *   funkčního investičního bytu na trhu.
 *
 *   Dostupné primární datové body:
 *
 *   (1) BTR Consulting / FlatService (únor 2025, Praha):
 *       Praha BTR (Build to Rent) segment:
 *       - H1 2024: 15 % neobsazenost = 85 % obsazenost (extrémně nízký start)
 *       - H2 2024:  6 % neobsazenost = 94 % obsazenost
 *       Interpretace: BTR projekty dokončené v roce 2023 jsou z 98–99 % obsazeny
 *       (pouze přirozeně prázdné byty při přechodu nájemníků).
 *       UPOZORNĚNÍ: BTR je profesionálně spravovaný segment — výsledky jsou lepší
 *       než u průměrného soukromého pronajímatele.
 *
 *   (2) Knight Frank Praha Q4 2024–Q1 2025:
 *       "Trh BTR je velmi koncentrovaný; 5 největších investorů spravuje > 50 % bytů."
 *       "Průměrné nájemné vzrostlo meziročně o 8,5 %."
 *       Silná poptávka = nízká vakance. Ale: profesionální management, prémiový produkt.
 *
 *   (3) ASB Portal / BTR Consulting (únor 2025):
 *       "Neobsazenost 6 % se blíží tzv. přirozené neobsazenosti" (analogie s 4%
 *       přirozenou nezaměstnaností). Přirozená neobsazenost = čas potřebný pro
 *       přechod mezi nájemníky, opravy, vybírání kandidátů.
 *
 *   (4) Akademický základ — Rosen a Smith (1983), "The Price-Adjustment Process for
 *       Rental Housing and the Natural Vacancy Rate", American Economic Review 73(4):
 *       Formalizovali koncept "přirozené míry neobsazenosti" (natural vacancy rate, NVR)
 *       pro nájemní bydlení — analogicky k NAIRU (přirozené nezaměstnanosti).
 *       NVR = rovnovážná vakance, při které jsou nájmy stabilní; pod NVR nájmy rostou,
 *       nad NVR nájmy klesají. Pro silné tržní trhy odhadují NVR na 3–6 %.
 *       Praha BTR 6 % vakance (H2 2024) odpovídá horní hranici NVR — trh je v rovnováze.
 *       Pro soukromého pronajímatele s pomalejším re-let procesem: NVR ≈ 7–10 %
 *       = obsazenost 90–93 % jako dlouhodobý rovnovážný průměr.
 *
 * =============================================================================
 * KLÍČOVÝ ROZDÍL: BTR vs. SOUKROMÝ PRONAJÍMATEL:
 *
 *   BTR (institucionální):
 *   - Profesionální správa: rychlý re-let, online platforma, profi marketing
 *   - Standardizované smlouvy, rychlé předávací protokoly
 *   - Praha H2 2024: 6 % vakance = 94 % obsazenost
 *
 *   Soukromý pronajímatel (= náš model):
 *   - Správa vlastní nebo přes agenturu — dle MMR Data Brief 2023: 63 % všech nájmů
 *     spravují fyzické osoby (jednotlivci-pronajímatelé), pouze ~6 % institucionální
 *     správci (Heimstaden, CPI). Agenturní správa roste, ale z velmi nízké základny.
 *     Odhad: ~15–25 % soukromých pronajímatelů využívá správcovskou agenturu.
 *     Zdroj: MMR Data Brief "Nájemní bydlení v České republice" (2023)
 *   - Průměrná doba mezipronájmu: 2–6 týdnů (inzerce, výběr, podpis)
 *   - Příčiny vakance: odchod nájemníka, opravy, sezónní výpadky, holdout
 *   - Realistická průměrná vakance: 7–15 % (tj. 1–2 měsíce ročně)
 *
 *   → Soukromý pronajímatel: obsazenost ≈ 85–93 % (vs. BTR 94–99 %)
 *
 * =============================================================================
 * MEZINÁRODNÍ BENCHMARK (NĚMECKO):
 *
 *   Německý trh je relevantní analogií: vyspělý soukromý nájemní sektor,
 *   silná právní ochrana nájemníků, profesionálně spravované multi-family domy.
 *
 *   Destatis (Census 2022, Německo): celková vakance bytů = 4,3 % = 96 % obsazenost.
 *     Toto zahrnuje všechny byty (i prázdné domy k renovaci, rekreační objekty).
 *   empirica regio / CBRE (2024): market-active vakance v multi-family = 2,2 % = 97,8 %.
 *     Toto je čistá tržní vakance v aktivně pronajímaných bytových domech.
 *
 *   Implikace pro ČR:
 *   - Německo je VYSPĚLEJŠÍ trh (silnější regulace, vyšší nájem-na-příjem ratio).
 *   - Naše Praha 93 % (= 7 % vakance) je KONZERVATIVNĚJŠÍ než Německo 97,8 % (2,2 % vakance).
 *   - Tato konzervativnost je záměrná: soukromý pronajímatel ≠ profesionální BTR/MF správce.
 *   - Reálná Praha obsazenost 2024–2025 je pravděpodobně blíže 95–97 % (trh je přehřátý).
 *   - 30Y průměr na 93 % je správný konzervativní předpoklad.
 *   Zdroj: Destatis PM_census2022_46 (2022); empirica regio / CBRE Vacancy Index 2025
 *
 * =============================================================================
 * PER-CITY DIFERENCIACE:
 *
 *   Faktor 1 — Síla poptávky po nájemním bydlení:
 *     Vysoká poptávka → kratší mezipronájmy → vyšší obsazenost
 *     Praha, Brno: nejvyšší poptávka (urbanizace, expats, studenti, pracovní migrace)
 *     Ostrava, Ústí, KV: slabší poptávka, delší mezipronájmy
 *
 *   Faktor 2 — Podíl nájemního bydlení v místním trhu (ČSÚ SLDB 2021):
 *     Brno: 35 % nájemního (nejvyšší v ČR) → silná nájemní kultura
 *     Praha: 32 % nájemního
 *     Průměr ČR: ~22 %
 *
 *   Faktor 3 — Demografické trendy:
 *     Urbanizační magnetismus (Praha, Brno, H.K.): přísun nájemníků
 *     Post-industriální odliv (Ostrava, Ústí): méně potenciálních nájemníků
 *
 *   Faktor 4 — Turistická poptávka (Karlovy Vary):
 *     Krátkodobé turistické pronájmy vs. dlouhodobé — KV má vyšší sezónní výkyvy
 *
 * =============================================================================
 * KONZERVATIVNÍ PŘÍSTUP (30Y PRŮMĚR):
 *
 *   Kalkulačka modeluje 30letý investiční horizont. Zahrnuje:
 *   - Období silné poptávky (nájmy vzrostly 2022–2025)
 *   - Období slabší poptávky (COVID 2020, budoucí cykly)
 *   - Nutné opravy a rekonstrukce (každých 10–15 let = 1–3 měsíce vakance)
 *   → Hodnoty jsou záměrně konzervativnější než aktuální tržní obsazenost.
 */

import type { AttributeDoc, PerCity } from "./_types";

// =============================================================================
// HODNOTY
// =============================================================================

/**
 * Předpokládaná průměrná roční obsazenost investičního bytu soukromého pronajímatele
 * na 30letém horizontu (%). Zahrnuje přirozené mezipronájmy, opravy a cyklické výkyvy.
 */
export const obsazenostValues: PerCity<number> = {
  "praha":            93, // Velmi silná poptávka, nejnižší vakance; −7% přirozená přechod. vakance
  "brno":             92, // Silná poptávka (35 % nájemní podíl), tech/uni hub
  "plzen":            90, // Stabilní průmyslový trh, moderní poptávka
  "olomouc":          90, // Universitní základna (UP, VFU), stálý přísun studentů
  "hradec-kralove":   90, // Rozvíjející se hub, solidní trh
  "pardubice":        90, // Průmysl + logistika, stabilní pracovní trh
  "ceske-budejovice": 88, // J. Čechy, průměrná dynamika
  "liberec":          88, // S. Čechy, smíšená ekonomika
  "zlin":             88, // Průmysl (Zlínský kraj), střední poptávka
  "jihlava":          87, // Nejmenší krajské město, omezenější trh
  "ostrava":          87, // Post-industriální odliv populace, vyšší vakance
  "usti-nad-labem":   83, // Strukturálně slabý trh, demografický odliv, nejdelší mezipronájmy
  "karlovy-vary":     83, // Turistická závislost = sezónní výkyvy, stárnoucí populace
};

// =============================================================================
// DOKUMENTACE ATRIBUTU
// =============================================================================

export const obsazenostDoc: AttributeDoc<PerCity<number>> = {
  kodNazev: "obsazenost",
  nazev: "Obsazenost nájemního bytu",
  jednotka: "%",
  kalkulator: ["investice"],

  definice: `
    Předpokládaná průměrná roční obsazenost investičního bytu (%) na 30letém horizontu.
    Vyjadřuje, jaký podíl roku byt generuje příjem z nájmu. Obsazenost 92 % = byt je
    obsazen průměrně 11,0 měsíců ročně. Hodnota zahrnuje přirozené mezipronájmy
    (přechod mezi nájemníky), plánované i neplánované opravy a cyklické výkyvy poptávky.
    Jedná se o 30letý průměr, ne aktuální tržní situaci. Hodnota je per-city.
  `,

  coZahrnuje: [
    "Přirozenou vakanci při přechodu mezi nájemníky (inzerce, výběr, podpis smlouvy)",
    "Čas na nutné opravy, renovace a malování mezi nájemníky",
    "Cyklické výkyvy poptávky (recese, demografické změny v průběhu 30 let)",
    "Průměrnou výkonnost soukromého pronajímatele (ne profesionálního BTR správce)",
  ],

  coNezahrnuje: [
    "Krátkodobé turistické pronájmy (Airbnb) — kalkulačka počítá s dlouhodobým nájmem",
    "Dluhové vakance (nájemník neplácí nájemné) — to je kreditní riziko, jiný parametr",
    "Nucené výpadky z důvodu stavební havárie nebo přírodní katastrofy",
  ],

  coOvlivnujeHodnotu: [
    "Síla místní poptávky po nájemním bydlení (urbanizace, příjmy, expats)",
    "Podíl nájemního bydlení v trhu — vyšší podíl = vyvinutější nájemní kultura",
    "Kvalita a poloha bytu (lokálně specifické — v kalkulačce abstrahováno průměrem)",
    "Způsob správy: vlastní správa vs. agentura (agentura = kratší vakance, ale poplatek)",
    "Délka nájemních smluv (kratší smlouvy = více přechodů = více vakance)",
    "Demografické trendy (příjmy, odlivy/příliv populace per-city)",
    "Regulatorní prostředí (právní náklady na vyklizení neplatiče)",
  ],

  metodaAproximace: {
    zvolenaMetoda: `
      Strukturální inference z BTR dat + per-city adjustace (Option C):
      Praha BTR H2 2024: 6 % vakance = 94 % obsazenost jako horní referenční bod.
      Soukromý pronajímatel: −1 až −3 p.b. pod BTR (méně profesionální správa).
      Per-city adjustace podle síly poptávky, demografiky a podílu nájemního trhu.
    `,
    procTatoMetoda: `
      Přímá data o obsazenosti soukromých bytů v ČR nejsou systematicky publikována.
      Jsou dostupná pouze data o BTR segmentu (Knight Frank, BTR Consulting).
      Inference z BTR dat je metodologicky nejkorrektnější dostupný přístup:
      (1) BTR data jsou primárním zdrojem s jasnou metodikou (% volných bytů)
      (2) Adjustace −1 až −3 p.b. odpovídá rozdílu v managementu (mezinárodní praxe)
      (3) Per-city diferenciace je konzistentní s rent-demand daty (Deloitte Rent Index)
          — vyšší nájemné = silnější poptávka = vyšší obsazenost
      Alternativní metoda (analýza inzertní doby na Sreality) by dala krátkodobá data,
      ne 30Y průměr, a trpí výběrovým zkreslením (pouze aktivní inzeráty).
    `,
    presnost: `
      Přesnost ±2–5 p.b. na 30letém horizontu. Hlavní nejistota:
      (1) Délka recesí/boom cyklů v 30Y okně
      (2) Rychlost rozvoje BTR (zvyšuje nabídku → mírně zvyšuje vakanci soukromých bytů)
      (3) Demografické trendy v slabších trhách (Ostrava, Ústí — nejistota vyšší)
      Pořadí měst je robustní; absolutní hodnoty jsou konzervativní 30Y průměry.
    `,
    kdyNeniPresna: [
      "Masivní rozvoj BTR segmentu (plánováno 1 500 bytů ročně v Praze) — zvýší vakanci",
      "Globální recese nebo pandemie — dramaticky zvýší vakanci na 1–3 roky",
      "Demografický obrat v Praze (Brexit-style odliv expats) — sníží obsazenost",
      "Regulace krátkodobých pronájmů (Airbnb zákon) — přesune část nabídky do trhu",
      "Strukturálně slabé trhy (Ústí, KV): odliv populace může hodnotu snížit na 75–80 %",
    ],
  },

  tooltipText:
    "Procento roku, kdy byt skutečně generuje nájemní příjem. Zahrnuje čas na přechod mezi nájemníky a opravy. Praha a Brno mají vyšší hodnotu díky silné poptávce.",

  vyzkum: {
    datumVyzkumu: "2026-04-04",
    zdroje: [
      {
        nazev: "BTR Consulting / FlatService — Kolik investičních bytů v Praze zůstává prázdných?",
        url: "https://flatservice.cz/clanky/kolik-investicnich-bytu-v-praze-zustava-prazdnych/",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Praha BTR segment: H1 2024 neobsazenost 15 % (= 85 % obsazenost), H2 2024 neobsazenost 6 % (= 94 % obsazenost). Projekty dokončené v roce 2023 jsou z 98–99 % obsazeny. Celkem 12 000 BTR bytů v Praze evidováno nebo připravováno. Citát: 'Neobsazenost 6 % se blíží přirozené neobsazenosti.' Zdroj dat: BTR Consulting, publikováno únor 2025.",
      },
      {
        nazev: "Knight Frank CZ — Institucionální nájemní bydlení Praha Q4 2024 – Q1 2025",
        url: "https://knightfrankprostory.cz/blog/institucionalni-najemni-bydleni-q4-2024-q1-2025",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Praha BTR: celkem ~3 200 bytů v provozu, 2 300 ve výstavbě. 5 největších investorů spravuje > 50 % bytů. Průměrné nájemné vzrostlo meziročně o 8,5 %. 'Trh BTR je velmi koncentrovaný.' Silná poptávka = nízká vakance v profesionálně spravovaném segmentu.",
      },
      {
        nazev: "ČSÚ — Sčítání lidu, domů a bytů 2021: Nájemní bydlení",
        url: "https://www.czso.cz/csu/czso/scitani-lidu-domu-a-bytu",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "V ČR bylo v roce 2021 pronajato necelých 900 000 bytů. Podíl nájemního bydlení: Brno 35 % (nejvyšší v ČR), Praha 32 %, průměr ČR ~22 %. Nejvyšší absolutní počty nájemních bytů: Praha, Brno, Ostrava, Plzeň. Data z SLDB 2021.",
      },
      {
        nazev: "ASB Portal — Vybavené nájemní byty v Praze zažívají boom, neobsazenost klesá",
        url: "https://www.asb-portal.cz/byznys/realitni-trh/vybavene-najemni-byty-v-praze-zazivaji-boom-neobsazenost-klesa",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Praha H2 2024: BTR neobsazenost poklesla na 6 %. Nájemné v BTR segmentu: 534 Kč/m²/měsíc (+9 Kč/m² oproti H1 2024), tj. ~20 % nad průměrným tržním nájmem (412 Kč/m²). Menší byty (1+kk, 2+kk) jsou nejpoptávanější.",
      },
      {
        nazev: "MMR — Data Brief: Nájemní bydlení v České republice (2023)",
        url: "https://mmr.gov.cz/getmedia/5e7971a2-73ba-415a-81c2-9498eeed8cb1/Najemni-bydleni_Data-Brief.pdf.aspx",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "ČR 2021: ~900 000 pronajatých bytů. Vlastnická struktura: 80 % soukromý trh (720k), 20 % obecní (175k). Ze soukromých: 63 % fyzické osoby (jednotlivci), 16 % právnické osoby, 6 % Heimstaden+CPI, 7 % ostatní firmy. Institucionální správa (BTR/MF) je menšinová — drtivá většina nájmů je u soukromých pronajímatelů bez profesionální správy.",
      },
      {
        nazev: "Rosen, K.T. & Smith, L.B. (1983) — The Price-Adjustment Process for Rental Housing and the Natural Vacancy Rate",
        url: "https://www.jstor.org/stable/1816567",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Akademická studie z American Economic Review 73(4), str. 779–786. Formalizuje koncept 'přirozené míry neobsazenosti' (Natural Vacancy Rate, NVR) pro nájemní bydlení — analogie k NAIRU. NVR je rovnovážná vakance, při níž jsou reálné nájmy stabilní. Pod NVR nájmy rostou (trh je přehřátý), nad NVR nájmy klesají. Pro silné nájemní trhy odhadují NVR na 3–6 %. Praha BTR 6 % (H2 2024) odpovídá horní hranici NVR — trh je v rovnováze. Pro soukromého pronajímatele s pomalejším re-let: NVR ≈ 7–10 % → obsazenost 90–93 % jako rovnovážný 30Y průměr.",
      },
      {
        nazev: "Destatis — Census 2022: 4.3% of all dwellings are vacant (Germany)",
        url: "https://www.destatis.de/EN/Press/Census2022_press_releases/PM_cenus2022_46.html",
        datumPristupeno: "2026-04-04",
        coUvadi:
          "Německo Census 2022: celková vakance bytů 4,3 % (= 96 % obsazenost). empirica regio/CBRE 2024: market-active vakance v multi-family housing 2,2 % (= 97,8 % obsazenost). Mezinárodní benchmark pro kalibraci: náš Praha 93 % je konzervativnější než německý profesionálně spravovaný sektor (97,8 %), což odpovídá rozdílu soukromý pronajímatel vs. profesionální správce.",
      },
    ],
    odvozeniHodnoty: `
      REFERENČNÍ BODY Z DAT:

        (1) Praha BTR H2 2024: 94 % obsazenost (6 % vakance)
            → Horní referenční bod pro profesionální správu v nejsilnějším trhu

        (2) Praha BTR H1 2024: 85 % (15 % vakance)
            → Náběhová fáze nových BTR projektů — netransferovatelné na 30Y průměr

        (3) "Přirozená neobsazenost" citovaná BTR Consulting: ~4–6 %
            → Dolní mez pro plně funkční nájemní trh (analogie s přirozenou nezaměstnaností)

      PER-CITY VÝPOČET (soukromý pronajímatel, 30Y průměr):

        Praha (93 %):
          Výchozí bod: BTR 94 % (H2 2024)
          Adjustace soukromý vs. BTR: −1 p.b. (Praha má i silnou agenturu síť, nízký gap)
          30Y průměr (cykly, opravy): bez dalšího snížení — Praha má nejrychlejší re-let
          Výsledek: 93 %

        Brno (92 %):
          Výchozí bod: BTR Praha 94 % − 2 p.b. (Brno < Praha poptávka)
          Podíl nájemního bydlení 35 % (nejvyšší v ČR) = silná nájemní kultura
          Výsledek: 92 %

        Plzeň, Olomouc, H. Králové, Pardubice (90 %):
          Průmyslové/universitní základny, stabilní trhy
          Průměrná adjustace: −3 p.b. pod Praha BTR
          Výsledek: 90 %

        Č. Budějovice, Liberec, Zlín (88 %):
          Menší krajská města, mírně slabší poptávka
          Adjustace: −5 p.b. pod Praha BTR
          Výsledek: 88 %

        Jihlava, Ostrava (87 %):
          Jihlava: nejmenší krajské město, omezenější pool nájemníků
          Ostrava: post-industriální odliv populace; ale Ostrava má stále ~280 000 obyvatel
          a historicky silnou nájemní kulturu — proto ne výrazně pod 88 %
          Výsledek: 87 %

        Ústí nad Labem, Karlovy Vary (83 %):
          Ústí: kombinace slabé ekonomiky, nižších příjmů, demografického odlivu
                a delší průměrné doby mezipronájmu
          KV: sezónní výkyvy (turistický trh), stárnoucí populace, smíšená CS-DE poptávka
          Adjustace: −10 p.b. pod Praha BTR
          Výsledek: 83 %

      INTERPRETACE HODNOT:
          93 % = průměrně 0,84 měsíce vakance ročně
          90 % = průměrně 1,2 měsíce vakance ročně
          87 % = průměrně 1,6 měsíce vakance ročně
          83 % = průměrně 2,0 měsíce vakance ročně

      KONZERVATIVNÍ BIAS:
          Aktuální (2024–2025) tržní obsazenost je pravděpodobně vyšší (90–95 % v Praze).
          Hodnoty jsou záměrně konzervativní, aby zachytily 30Y průměr přes celý cyklus
          zahrnující recese, demografické posuny a nutné mezipronájmové opravy.

      SCÉNÁŘE CITLIVOSTI (Praha, representativní):
        Pesimistický (recese, BTR zvýšení nabídky, demografický odliv expats): 82 %
        Centrální odhad (naše hodnota):                                          93 %
        Optimistický (silný trh, krátké mezipronájmy, agenturní správa):        96 %

        Národní průměr (reprezentativní krajské město):
        Pesimistický:  77 %
        Centrální:     90 %
        Optimistický:  94 %

        Ústí n.L. / KV (strukturálně slabé trhy):
        Pesimistický:  70 %
        Centrální:     83 %
        Optimistický:  88 %

      DOPAD NA VÝPOČET (citlivostní analýza Praha):
        Při nájemném 459 Kč/m², bytě 52 m², roční nájemné = 286 452 Kč:
          93 % obsazenost: příjem = 266 400 Kč/rok
          83 % obsazenost: příjem = 237 800 Kč/rok
          Rozdíl 10 p.b. obsazenosti = −28 600 Kč/rok = −858 000 Kč za 30 let
        → Obsazenost je citlivostně velmi významný parametr — ±5 p.b. = ±14 000 Kč/rok.
    `,
  },

  hodnoty: obsazenostValues,
};
