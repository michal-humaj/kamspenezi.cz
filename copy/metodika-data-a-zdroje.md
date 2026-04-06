# Data a zdroje
**URL:** /metodika/data-a-zdroje
**Tón:** přímý, transparentní, tykání
**Délka:** ~1 500 slov + tabulky

## META

**Title:** Data a zdroje kalkulačky | kamspenezi.cz
**Description:** Přehled všech parametrů kalkulačky: co každý z nich znamená, jakou hodnotu používáme, odkud pochází a co kalkulačka záměrně nezahrnuje.

## OBSAH STRÁNKY

### H1
Odkud bereme data

### Perex
Tato stránka vysvětluje každé číslo, se kterým kalkulačka pracuje. Pro každý parametr najdeš: co přesně měří, jakou hodnotu používáme a odkud pochází. Důležité rozlišení: některé hodnoty jsou ověřitelná tržní data platná dnes. Jiné jsou kalibrované odhady pro 30letý horizont. Víš-li, které je které, lépe pochopíš, kde výsledku věřit a kde si nastavit vlastní hodnoty.

**Poslední aktualizace dat: 5. dubna 2026**

---

### Ověřená tržní data

Tyto hodnoty jsou ověřitelná tržní data platná k datu poslední aktualizace. Čteme je z konkrétních zdrojů, neodhadujeme je.

#### Ceny nemovitostí

**Co to je:** vstupní kupní cena bytu pro danou dispozici a město, ze které kalkulačka vychází. Vypočítá se jako Kč/m² × průměrná plocha dané dispozice.

Zdroj cen za m²: vlastní dotaz na [Sreality.cz](https://www.sreality.cz) API, duben 2026 (filtr: starší zástavba, cihlové a panelové domy). Nabídkové ceny bytů jsou vyšší než ceny, za které byty ve skutečnosti mění majitele. Pro každé město jsme vypočítali vlastní převodní koeficient: vzali jsme ověřené transakční ceny (ČBA Monitor Q4 2025), upravili je o mezičasový posun (+5 %, odpovídá tržnímu růstu od Q4 2025 do dubna 2026) a vydělili nabídkovou cenou Sreality. Koeficienty dle města: 0,870 (Praha), 0,843 (Brno), 0,882 (Pardubice), 0,854 (ČB), 0,804 (Plzeň, Ostrava, HK: záložní medián), 0,780 (Liberec), 0,783 (Olomouc), 0,777 (Ústí), 0,798 (Jihlava), 0,804 (KV: záložní). Záložní koeficient 0,804 platí pro města, kde transakční data ČBA Monitoru nejsou reprezentativní nebo je Sreality vzorek příliš malý.

Výjimka: Zlín používá [ČBA Monitor](https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta) Q4 2025, protože Sreality vzorek pro Zlín vykazoval anomální koeficienty (3+kk a 4+kk > 2+kk).

Proč Sreality API, a ne přímo transakční databáze? V ČR jsou transakční ceny nemovitostí dostupné ze dvou zdrojů: katastr nemovitostí (Finanční správa) a ČBA Monitor, který vychází z bankovních odhadů při poskytnutí hypotéky. Katastr nemá veřejné strojově čitelné API s kompletním pokrytím všech 13 krajských měst. ČBA Monitor poskytuje spolehlivá data pro velká města, ale pro menší trhy zachycuje jen hypotečně financované transakce staré zástavby, a v některých z nich (Ostrava, Karlovy Vary) pokrývá zjevně pouze nejlevnější segment trhu: rozdíl oproti Sreality nabídkám přesahuje i po standardní srážce 30 %. Sreality nabízí konzistentní pokrytí všech 13 měst stejnou metodikou. A klíčové: nájemné v kalkulačce vychází také ze Sreality. Kupní cena i nájemné tak popisují tentýž typ bytů (starší zástavbu, cihla a panel) ze stejného zdroje.

| Město | Kč/m² po přepočtu na transakční cenu (duben 2026) |
|---|---|
| Praha | 152 300 |
| Brno | 120 100 |
| Hradec Králové | 96 500 |
| Pardubice | 88 200 |
| České Budějovice | 85 200 |
| Olomouc | 83 200 |
| Plzeň | 82 300 |
| Zlín | 75 700 |
| Liberec | 77 900 |
| Jihlava | 71 500 |
| Ostrava | 74 300 |
| Karlovy Vary | 73 600 |
| Ústí nad Labem | 48 700 |

Průměrné plochy dispozic vychází z analýzy inzertní databáze [Sreality.cz](https://www.sreality.cz) (duben 2026). Plochy se liší podle města. Níže jsou orientační národní mediány; kalkulačka používá per-city hodnoty. Konkrétní plochy pro každé město najdeš v Google Sheets.

| Dispozice | Průměrná plocha |
|---|---|
| 1+kk | 34 m² |
| 2+kk | 54 m² |
| 3+kk | 80 m² |
| 4+kk | 102 m² |

#### Výše nájemného

**Co to je:** průměrná výše měsíčního nájmu ve zvoleném městě, přepočtená na dispozici pomocí průměrné plochy.

Zdroj: vlastní dotaz na [Sreality.cz](https://www.sreality.cz) API, duben 2026. Medián nabídkového nájemného pro starší zástavbu (cihlové a panelové domy). Novostavby a developerské projekty jsou záměrně vynechány.

Proč Sreality.cz filtrované na starší zástavbu? Metodická konzistence s cenami nemovitostí: obě strany výpočtu (cena bytu i nájemné) vycházejí ze stejné populace bytů (starší zástavba). Deloitte Rent Index zahrnuje všechny typy bytů včetně developerských projektů, což systematicky nadhodnocuje nájemné ve srovnání se starší zástavbou (+2–17 % dle města). Výnosové procento je smysluplné pouze tehdy, jsou-li obě hodnoty odvozeny ze stejného segmentu trhu.

Deloitte Rent Index Q4 2025 je použit jako křížová validace. Shoda je těsná pro Prahu (–0,4 %), Brno (+1,5 %), Olomouc (0 %). Výraznější odchylka u Liberce (Deloitte o 17 % níže) a Jihlavy (o 10 % níže): menší vzorky, větší nejistota.

| Město | Kč/m²/měsíc (Sreality, duben 2026) |
|---|---|
| Praha | 457 |
| Brno | 398 |
| Hradec Králové | 324 |
| Pardubice | 303 |
| Plzeň | 300 |
| Olomouc | 293 |
| Zlín | 303 |
| České Budějovice | 297 |
| Liberec | 318 |
| Jihlava | 281 |
| Karlovy Vary | 257 |
| Ostrava | 261 |
| Ústí nad Labem | 214 |

#### Vlastní zdroje (akontace)

**Co to je:** podíl kupní ceny, který zaplatíš z vlastních prostředků. Zbytek kryje hypotéka. Jde o regulatorní minimum stanovené ČNB, ne o tržně odvozenou hodnotu.

**Výchozí hodnota:** 20 % kupní ceny.

**Zdroj:** ČNB regulace stanovuje maximální LTV 80 % pro investiční nemovitosti. Pro vlastní bydlení do 36 let lze za určitých podmínek jít níže, ale 20 % je konzervativní výchozí hodnota platná pro většinu kupujících. V kalkulačce si hodnotu změníš.

---

### Dlouhodobé odhady

Tyto hodnoty nejsou tržní fakta platná dnes. Jsou to kalibrované odhady pro 30letý horizont. Každý z nich může být špatně. Proto jsou v kalkulačce nastavitelné a proto záleží, jestli si je změníš.

#### Výnos globálního akciového fondu

**Co to je:** předpokládaný průměrný roční výnos globálně diverzifikovaného akciového fondu po odečtení nákladů fondu.

**Hodnota:** 6,5 % p.a.

**Zdroj:** průměr pěti institucionálních výhledů pro rok 2026: [Vanguard VCMM](https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/vemo-return-forecasts.html), [BNY Investments](https://www.bny.com/wealth/global/en/insights/2026-capital-market-assumptions.html), [AQR](https://www.aqr.com/Insights/Research/Alternative-Thinking/2026-Capital-Market-Assumptions-for-Major-Asset-Classes), [DMS (Global Investment Returns Yearbook/UBS)](https://www.ubs.com/global/en/wealthmanagement/insights/2025/global-investment-returns-yearbook.html), [Northern Trust](https://ntam.northerntrust.com/content/dam/northerntrust/investment-management/global/en/documents/thought-leadership/2026/cma/2026-capital-market-assumptions-report.pdf). Náklady fondu: přibližně 0,20 % p.a. pro nízkonákladový indexový fond.

**Proč ne historický průměr (~7 %):** Historický nominální výnos globálních akcií (DMS Yearbook) se pohybuje kolem 7 % ročně. My používáme 6,5 % jako konzervativní kotvu. Zkušení investoři s diverzifikovaným portfoliem mohou na dlouhém horizontu dosáhnout výnosů blízkých historickému průměru.

**Citlivost:** Výrazně ovlivňuje výsledek Scénáře B. Každý procentní bod navíc za 30 let výrazně mění konečnou hodnotu portfolia.

#### Úroková sazba hypotéky po refixaci (roky 6–30)

**Co to je:** předpokládaná sazba, na kterou se hypotéka přestaví po uplynutí první 5leté fixace. Platí pro zbývajících 25 let.

**Hodnota:** 4,5 % p.a.

**Zdroj:** odvozeno: reálná neutrální sazba ČNB + střednědobý inflační cíl + standardní bankovní marže. Data hypoték: [Hypoindex.cz](https://www.hypoindex.cz/hypoindex-vyvoj/).

**Proč záleží víc než počáteční sazba (3,99 %):** Platí po dobu 25 z 30 let. Změna o 0,5 % v tomto parametru má větší vliv na celkové náklady Scénáře A než jakákoli změna počáteční sazby.

#### Růst hodnoty nemovitosti

**Co to je:** předpokládané průměrné roční zdražování nemovitosti ve zvoleném městě za 30letý horizont.

**Hodnoty:** 3,0–4,5 % p.a. dle města (viz tabulka níže).

**Jak jsme k číslům došli:**

Výchozím bodem je historická řada [Eurostat HPI (ei_hppi_q)](https://ec.europa.eu/eurostat/databrowser/product/page/ei_hppi_q) (zdrojem primárních dat je Hypostat, European Mortgage Federation). Klíčové CAGR z historické řady pro Českou republiku:

| Období | CAGR | Poznámka |
|---|---|---|
| 2010–2015 | 1,0 % | Post-krizová stagnace |
| 2010–2019 | 4,5 % | Plný cyklus bez COVID anomálie |
| 2015–2019 | 9,2 % | Boom záporných reálných sazeb |
| 2010–Q3/2025 | 6,3 % | Zahrnuje COVID distorze |

Jako referenční strukturální tempo používáme CAGR 2010–2019 (4,5 %). Zahrnuje celý hospodářský cyklus: stagnaci po finanční krizi i nízkoúrokový boom. COVID anomálie (2021–2022: +19,7 % a +16,9 %) je z výpočtu vyloučena jako jednorázová a neopakovatelná.

Proč nepoužíváme vyšší číslo (6,3 % z delší řady): Boom 2015–2019 byl tažen zápornou reálnou sazbou ČNB. Tento tailwind je pryč. Navíc ČNB makroprudenčními limity (max LTV 80 %, DTI max 8,5×, DSTI max 45 %) systematicky omezuje leverage-driven cenový růst. A dostupnost bydlení: v Praze vzrostly ceny bytů 2,8× rychleji než příjmy (2015–2023), což vytváří přirozenou bariéru dalšího přehřívání.

Výsledek potvrzuje rovnovážný model: inflace (2,0 %) + reálný mzdový příspěvek (~1,5 %) + supply prémie (–0,5 až +1,0 % dle města) = 3,0–4,5 % p.a.

Per-city hodnoty jsou zkalibrované dolů od pražské kotvy na základě relativní síly místní poptávky, demografického vývoje a historické konvergence cen.

**Citlivost:** Toto je nejcitlivější parametr celého modelu. Každý procentní bod navíc za 30 let výrazně posiluje Scénář A. Výchozí hodnoty jsou průměry za celé město. Lokalita uvnitř města může výsledek výrazně změnit.

| Město | Předpokládaný roční růst |
|---|---|
| Praha | 4,5 % p.a. |
| Brno | 4,5 % p.a. |
| Hradec Králové | 4,0 % p.a. |
| Pardubice | 4,0 % p.a. |
| České Budějovice | 3,5 % p.a. |
| Olomouc | 4,0 % p.a. |
| Plzeň | 4,0 % p.a. |
| Zlín | 3,5 % p.a. |
| Liberec | 3,5 % p.a. |
| Jihlava | 3,5 % p.a. |
| Ostrava | 3,5 % p.a. |
| Karlovy Vary | 3,0 % p.a. |
| Ústí nad Labem | 3,0 % p.a. |

#### Růst nájemného

**Co to je:** předpokládané průměrné roční zdražování nájmů. Ovlivňuje, jak rychle se zmenšuje měsíční investiční výhoda Scénáře B.

**Hodnoty:** 2,5–3,5 % p.a. dle města (Praha a Brno 3,5 %; Plzeň, Olomouc, HK, Pardubice, ČB, Liberec, Zlín, Jihlava 3,0 %; Ostrava, Ústí, KV 2,5 %).

**Metodika:** Na 30letém horizontu existují dva různé ukazatele. New-to-market nájemné (nové smlouvy, zachycuje Deloitte Rent Index, CAGR 2014–2025 = 7,2 % p.a.) a in-situ nájemné (průběžně platí všichni nájemníci, zachycuje [Eurostat HICP CP041](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_aind?geo=CZ&coicop=CP041&unit=INX_A_AVG), CAGR 2015–2025 = 4,0 % p.a.). Efektivní 30Y průměr je vážená kombinace: 25 % new-to-market + 75 % in-situ (odhad průměrné doby nájemní smlouvy v ČR). Historický out-turn: 0,25 × 7,2 % + 0,75 × 4,0 % ≈ 4,8 %. Forward 30Y odhad je konzervativnější: boom 2022–2025 (tažen nízkými zásobami a post-COVID catch-up) není strukturálně udržitelný. Výsledné hodnoty 2,5–3,5 % dle dynamiky lokálního trhu jsou kotevní strukturální tempo. Silnější trhy (Praha, Brno) mají supply deficit, který udržuje tlak na nájmy výše.

#### Očekávaná inflace

**Co to je:** předpokládaná průměrná roční inflace za 30letý horizont. Slouží pro přibližný přepočet nominálního výsledku do reálné hodnoty. Pro orientační hodnotu v dnešních korunách vydel výsledek kalkulačky číslem 2,1.

**Hodnota:** 2,5 % p.a.

**Zdroj:** empiricky odvozený odhad z historické české inflace ([ČSÚ via InflationTool](https://www.inflationtool.com/rates/czech-epublic/historical)). Průměr EU-éry 2004–2021 = 2,3 % p.a. Zahrnuje výkyvy mimo ČNB cíl (2008: 6,3 %; 2020: 3,2 %; 2021: 3,8 %). ČNB cíl (2 %) záměrně nepoužíváme: historická průměrná inflace v ČR leží konzistentně nad ním. 2,5 % je konzervativní 30Y průměr zohledňující inflační cykly. Inflační cíl ČNB: [cnb.cz](https://www.cnb.cz/cs/menova-politika/inflacni-cil/).

---

### Náklady vlastnictví

Tyto náklady snižují ekonomiku Scénáře A. Fond oprav, pojištění, daň z nemovitosti a náklady na údržbu jsou roční. Vybavení bytu je jednorázový výdaj při pořízení.

#### Fond oprav

**Co to je:** povinný měsíční příspěvek do fondu oprav budovy, který platí každý vlastník bytu. Nelze se mu vyhnout, ukládá ho zákon ([NOZ § 1180](https://www.zakonyprolidi.cz/cs/2012-89#p1180)) prostřednictvím SVJ (společenství vlastníků jednotek). Fond oprav hradí opravy a renovace společných částí budovy: střecha, výtah, fasáda, rozvody. Tento náklad nesouvisí s udržováním interiéru bytu, to je samostatná položka (viz Náklady na údržbu níže).

**Výchozí hodnota:** 23–30 Kč/m²/měsíc dle města. Konkrétní hodnoty dle lokality jsou v Google Sheets.

**Zdroj:** NOZ § 1180, tržní průzkum výše příspěvků SVJ: [portalsvj.cz](https://www.portalsvj.cz/anketa/vysledky.php).

#### Pojištění nemovitosti

**Co to je:** pojištění konstrukce bytu: stěny, podlahy, rozvody v rámci bytu. Nevztahuje se na vybavení ani na obsah. Většina hypotečních bank ho vyžaduje jako podmínku úvěru.

**Výchozí hodnota:** Praha 28 Kč/m²/rok, ostatní města 20 Kč/m²/rok.

**Zdroj:** [Skrblik.cz](https://www.skrblik.cz/finance/pojisteni/majetku/nemovitost/), [kalkulackapojisteni.com](https://kalkulackapojisteni.com/pojisteni-majetku/jak-pojistit-byt/) a [Kooperativa](https://www.koop.cz/pojisteni/pojisteni-majetku/pruvodce-majitele-nemovitosti/ceny-nemovitosti-v-roce-2025) (tržní přehledy pojistného pro bytové jednotky, 2025–2026). Hodnoty validovány proti reprodukční hodnotě interiéru × tržní pojistná sazba ~0,10 % ročně.

#### Daň z nemovitosti

**Co to je:** roční daň z vlastnictví bytu, vypočítaná zákonným vzorcem. Platí každý vlastník nemovitosti v ČR bez výjimky.

**Výpočet:** plocha × sazba × koef. 1,22 × základní koeficient × místní koeficient. [Zákon č. 338/1992 Sb.](https://www.zakonyprolidi.cz/cs/1992-338) ve znění novely 2024.

#### Náklady na údržbu

**Co to je:** odhadované roční náklady na údržbu interiéru bytu: výměny, opravy, pravidelné renovace. Nezaměňovat s fondem oprav, který hradí společné části budovy. Do údržby patří: rekonstrukce koupelny (jednou za 20–25 let), výměna kuchyňské linky (jednou za 15–20 let), výměna podlah, spotřebiče, malování.

**Výchozí hodnota:** fixní základ 14 000 Kč + 160 Kč/m²/rok, celé vynásobeno místním koeficientem. Typický byt 2+kk v Praze (koeficient 1,18) vychází přibližně na 26 000 Kč ročně, v ostatních městech 19 000–23 000 Kč.

**Metodika:** výpočet zdola nahoru, amortizující konkrétní výdaje přes jejich reálné životnosti. Detailní kalkulace v Google Sheets.

#### Vybavení bytu

**Co to je:** jednorázový výdaj na vybavení bytu při pořízení. Kalkulačka bydlení a kalkulačka investice pracují s touto hodnotou odlišně.

**Kalkulačka bydlení (diferenciál):** Kupující (Scénář A) vybavuje byt na střední IKEA standard včetně všech spotřebičů. Nájemník (Scénář B) nakoupí jen economy IKEA nábytek a s 50% pravděpodobností pračku (lednička, sporák a digestoř jsou v nezařízeném českém pronájmu zpravidla součástí kuchyňské linky). Hodnota v tabulce je rozdíl: o kolik více zaplatí kupující oproti nájemníkovi v roce 0.

**Kalkulačka investice (plné náklady):** Celkové náklady pronajímatele na economy standard nutný pro pronájem (economy IKEA + základní spotřebiče).

| Dispozice | Bydlení (diferenciál) | Investice (plné náklady) |
|---|---|---|
| 1+kk | 50 000 Kč | 48 000 Kč |
| 2+kk | 75 000 Kč | 75 000 Kč |
| 3+kk | 95 000 Kč | 88 000 Kč |
| 4+kk | 110 000 Kč | 105 000 Kč |

**Zdroj:** [IKEA.cz](https://www.ikea.com/cz/) ceník 2026, spotřebiče z [Heureka.cz](https://www.heureka.cz). Výpočet zdola nahoru pro každou dispozici: nábytek + spotřebiče + doprava a montáž + osvětlení, závěsy, doplňky. Detailní kalkulace v Google Sheets.

---

### Obsazenost investičního bytu

Platí pouze pro kalkulačku Investice.

**Co to je:** podíl roku, po který je byt skutečně pronajat a generuje příjem. Hodnota nižší než 100 % odráží přirozenou mezeru mezi nájemníky (výběr nájemníka, předání bytu, drobné opravy) a občasné delší prázdné období.

**Zdroj:** hodnoty pro Prahu a Brno vychází z dat o vakanci institucionálního nájemního trhu ([Knight Frank](https://knightfrankprostory.cz/blog/institucionalni-najemni-bydleni-q4-2024-q1-2025), [BTR Consulting via flatservice.cz](https://flatservice.cz/clanky/kolik-investicnich-bytu-v-praze-zustava-prazdnych/)), upravených dolů pro soukromého pronajímatele, který má pomalejší proces výběru nájemníků. Pro ostatní města jsou hodnoty odvozeny na základě relativní síly místní poptávky po nájemním bydlení.

| Město | Obsazenost |
|---|---|
| Praha | 93 % |
| Brno | 92 % |
| Hradec Králové | 90 % |
| Pardubice | 90 % |
| České Budějovice | 88 % |
| Olomouc | 90 % |
| Plzeň | 90 % |
| Zlín | 88 % |
| Liberec | 88 % |
| Jihlava | 87 % |
| Ostrava | 87 % |
| Karlovy Vary | 83 % |
| Ústí nad Labem | 83 % |

---

### Daňová pravidla

Tato pravidla vstupují do výpočtu automaticky. Jsou pevně daná zákonem a není je třeba nastavovat. Poslední sloupec říká, které kalkulačky se pravidlo týká.

| Pravidlo | Hodnota | Zákonný základ | Kalkulačka |
|---|---|---|---|
| Odpočet hypotečních úroků od základu daně | Max. 150 000 Kč/rok | § 15 ZDP | Bydlení |
| Základní sazba daně z příjmů | 15 % | § 16 ZDP | obě |
| Vyšší sazba daně z příjmů | 23 % (nad cca 132 000 Kč hrubého měsíčně) | § 16 ZDP | obě |
| Osvobození zisku z cenných papírů od daně | Po 3 letech držení | § 4 odst. 1 písm. w) ZDP | obě |
| Odpisy nemovitosti, rok 1 | 1,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 | Investice |
| Odpisy nemovitosti, roky 2–30 | 3,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 | Investice |
| Odpisový základ | 90 % kupní ceny (bez pozemku) | § 29 ZDP | Investice |
| Přenos daňové ztráty z nájmu | Max. 5 let | § 34 ZDP | Investice |

---

### Jak a kdy data aktualizujeme

Ceny bytů, nájemné i úrokové sazby hypoték aktualizujeme čtvrtletně. Zdrojem sazeb je [Hypoindex.cz](https://www.hypoindex.cz/hypoindex-vyvoj/). Daňová pravidla kontrolujeme při každé legislativní změně.

Datum poslední aktualizace je uvedeno v úvodu této stránky.

Máš otázku k některému zdroji nebo chceš upozornit na novější data? Napiš na michal.humaj@gmail.com.

---

### Co kalkulačka nezahrnuje

Každý model zjednodušuje. Zde jsou věci, které kalkulačka záměrně nebo z praktických důvodů nezahrnuje.

**Náklady na pořízení nemovitosti:** Právní služby, odhad nemovitosti pro banku, zástavní právo a poplatek za vklad do katastru. Celkem typicky 30 000–60 000 Kč jednorázově. Pokud bys tyto náklady zahrnul, mírně by zhoršily výsledek Scénáře A.

**Provize realitní kanceláři při prodeji:** Typicky 3–5 % z prodejní ceny. Kalkulačka modeluje 30leté držení, ne prodej. Pokud bys byt po 30 letech prodával přes realitku, zhorší to výsledek Scénáře A.

**Pojištění schopnosti splácet:** Produkt, který banky k hypotéce nabízejí. Zahrnout ho nebo ne závisí na individuálním rozhodnutí. Kalkulačka ho nezahrnuje.

**Správcovský poplatek:** Pokud místo vlastní správy využiješ správcovskou firmu, počítej typicky s 8–12 % z měsíčního nájmu jako extra nákladem. Kalkulačka předpokládá vlastní správu.

**Mimořádné opravné události:** Velká pojistná událost (zatopení od souseda, požár) není běžný provozní náklad. Kalkulačka ji nemodeluje jako pravděpodobnostní scénář.
