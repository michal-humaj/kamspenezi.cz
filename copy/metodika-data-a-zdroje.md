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

**Poslední aktualizace dat: 4. dubna 2026**

---

### Ověřená tržní data

Tyto hodnoty jsou ověřitelná tržní data platná k datu poslední aktualizace. Čteme je z konkrétních zdrojů, neodhadujeme je.

#### Ceny nemovitostí

**Co to je:** vstupní kupní cena bytu pro danou dispozici a město, ze které kalkulačka vychází. Vypočítá se jako Kč/m² × průměrná plocha dané dispozice.

Zdroj cen za m²: [ČBA Monitor](https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta), transakční ceny starších bytů (sekundární trh), Q4 2025.

Proč ČBA Monitor, a ne ceny novostaveb? Novostavby jsou strukturálně dražší a tvoří menší část trhu. Většina kupujících pořizuje starší byt na sekundárním trhu. ČBA Monitor zachycuje právě tyto transakce.

| Město | Kč/m² (Q4 2025) |
|---|---|
| Praha | 145 000 |
| Brno | 114 300 |
| Hradec Králové | 86 100 |
| Pardubice | 84 000 |
| České Budějovice | 81 100 |
| Olomouc | 79 200 |
| Plzeň | 78 400 |
| Zlín | 75 700 |
| Liberec | 74 200 |
| Jihlava | 68 100 |
| Ostrava | 61 600 |
| Karlovy Vary | 51 700 |
| Ústí nad Labem | 46 400 |

Průměrné plochy dispozic (přibližné mediány z analýzy inzertní databáze Sreality.cz a ČBA Monitor, 2025):

| Dispozice | Průměrná plocha |
|---|---|
| 1+kk | 32 m² |
| 2+kk | 52 m² |
| 3+kk | 72 m² |
| 4+kk | 92 m² |

#### Výše nájemného

**Co to je:** průměrná výše měsíčního nájmu ve zvoleném městě, přepočtená na dispozici pomocí průměrné plochy.

Zdroj: [Deloitte Rent Index](https://www2.deloitte.com/cz/cs/pages/real-estate/articles/deloitte-rent-index.html) Q4 2025, vydáno leden 2026. Průměrná cena v Kč/m²/měsíc agregovaná přes více realitních portálů.

Proč Deloitte Rent Index, a ne data přímo ze Sreality nebo Bezrealitky? Data z jednoho portálu jsou zkreslena směrem k nabídkám, které ten portál přitahuje. Deloitte agreguje přes více zdrojů. Omezení: jde o inzerované ceny, ne o ceny skutečně sjednaných nájmů, které mohou být nižší.

| Město | Kč/m²/měsíc (Q4 2025) |
|---|---|
| Praha | 459 |
| Brno | 392 |
| Hradec Králové | 317 |
| Pardubice | 307 |
| Plzeň | 294 |
| Olomouc | 293 |
| Zlín | 290 |
| České Budějovice | 277 |
| Liberec | 271 |
| Jihlava | 256 |
| Karlovy Vary | 256 |
| Ostrava | 239 |
| Ústí nad Labem | 221 |

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

**Zdroj:** průměr pěti institucionálních výhledů pro rok 2026: Vanguard VCMM, BNY Investments, AQR, DMS/UBS, J.P. Morgan. Náklady fondu: přibližně 0,20 % p.a. pro nízkonákladový indexový fond.

**Proč ne historický průměr (~7 %):** Historický nominální výnos globálních akcií (DMS Yearbook) se pohybuje kolem 7 % ročně. My používáme 6,5 % jako konzervativní kotvu. Zkušení investoři s diverzifikovaným portfoliem mohou na dlouhém horizontu dosáhnout výnosů blízkých historickému průměru.

**Citlivost:** Výrazně ovlivňuje výsledek Scénáře B. Každý procentní bod navíc za 30 let výrazně mění konečnou hodnotu portfolia.

#### Úroková sazba hypotéky po refixaci (roky 6–30)

**Co to je:** předpokládaná sazba, na kterou se hypotéka přestaví po uplynutí první 5leté fixace. Platí pro zbývajících 25 let.

**Hodnota:** 4,5 % p.a.

**Zdroj:** odvozeno: reálná neutrální sazba ČNB + střednědobý inflační cíl + standardní bankovní marže. Data hypoték: [Hypoindex.cz](https://hypoindex.cz).

**Proč záleží víc než počáteční sazba (3,99 %):** Platí po dobu 25 z 30 let. Změna o 0,5 % v tomto parametru má větší vliv na celkové náklady Scénáře A než jakákoli změna počáteční sazby.

#### Růst hodnoty nemovitosti

**Co to je:** předpokládané průměrné roční zdražování nemovitosti ve zvoleném městě za 30letý horizont.

**Hodnoty:** 2,5–4,5 % p.a. dle města (viz tabulka níže).

**Jak jsme k číslům došli:**

Výchozím bodem je historická řada [Eurostat HPI (ei_hppi_q)](https://ec.europa.eu/eurostat/databrowser/view/ei_hppi_q) a [Hypostat 2023 (European Mortgage Federation)](https://hypo.org/emf-studies/hypostat/). Klíčové CAGR z historické řady pro Českou republiku:

| Období | CAGR | Poznámka |
|---|---|---|
| 2010–2015 | 1,0 % | Post-krizová stagnace |
| 2010–2019 | 4,5 % | Plný cyklus bez COVID anomálie |
| 2015–2019 | 9,2 % | Boom záporných reálných sazeb |
| 2010–Q3/2025 | 6,3 % | Zahrnuje COVID distorze |

Jako referenční strukturální tempo používáme CAGR 2010–2019 (4,5 %). Zahrnuje celý hospodářský cyklus: stagnaci po finanční krizi i nízkoúrokový boom. COVID anomálie (2021–2022: +19,7 % a +16,9 %) je z výpočtu vyloučena jako jednorázová a neopakovatelná.

Proč nepoužíváme vyšší číslo (6,3 % z delší řady): Boom 2015–2019 byl tažen zápornou reálnou sazbou ČNB. Tento tailwind je pryč. Navíc ČNB makroprudenčními limity (max LTV 80 %, DTI max 8,5×, DSTI max 45 %) systematicky omezuje leverage-driven cenový růst. A dostupnost bydlení: v Praze vzrostly ceny bytů 2,8× rychleji než příjmy (2015–2023), což vytváří přirozenou bariéru dalšího přehřívání.

Výsledek potvrzuje rovnovážný model: inflace (2,0 %) + reálný mzdový příspěvek (~1,5 %) + supply prémie (0–1,0 % dle města) = 3,5–4,5 % p.a.

Per-city hodnoty jsou zkalibrované dolů od pražské kotvy na základě relativní síly místní poptávky, demografického vývoje a historické konvergence cen.

**Citlivost:** Toto je nejcitlivější parametr celého modelu. Každý procentní bod navíc za 30 let výrazně posiluje Scénář A. Výchozí hodnoty jsou průměry za celé město. Lokalita uvnitř města může výsledek výrazně změnit.

| Město | Předpokládaný roční růst |
|---|---|
| Praha | 4,5 % p.a. |
| Brno | 4,0 % p.a. |
| Hradec Králové | 3,5 % p.a. |
| Pardubice | 3,5 % p.a. |
| České Budějovice | 3,5 % p.a. |
| Olomouc | 3,5 % p.a. |
| Plzeň | 3,5 % p.a. |
| Zlín | 3,5 % p.a. |
| Liberec | 3,5 % p.a. |
| Jihlava | 3,5 % p.a. |
| Ostrava | 3,0 % p.a. |
| Karlovy Vary | 3,0 % p.a. |
| Ústí nad Labem | 2,5 % p.a. |

#### Růst nájemného

**Co to je:** předpokládané průměrné roční zdražování nájmů. Ovlivňuje, jak rychle se zmenšuje měsíční investiční výhoda Scénáře B.

**Hodnota:** 2,5 % p.a.

**Zdroj:** [Deloitte Rent Index](https://www2.deloitte.com/cz/cs/pages/real-estate/articles/deloitte-rent-index.html), průměr 2015–2024.

#### Očekávaná inflace

**Co to je:** předpokládaná průměrná roční inflace za 30letý horizont. Slouží pro přibližný přepočet nominálního výsledku do reálné hodnoty. Pro orientační hodnotu v dnešních korunách vydel výsledek kalkulačky číslem 2,1.

**Hodnota:** 2,5 % p.a.

**Zdroj:** [ČNB, střednědobý inflační cíl](https://www.cnb.cz/cs/menova-politika/inflacni-cil/).

---

### Náklady vlastnictví

Tyto náklady snižují ekonomiku Scénáře A. Fond oprav, pojištění, daň z nemovitosti a náklady na údržbu jsou roční. Vybavení bytu je jednorázový výdaj při pořízení.

#### Fond oprav

**Co to je:** povinný měsíční příspěvek do fondu oprav budovy, který platí každý vlastník bytu. Nelze se mu vyhnout, ukládá ho zákon (NOZ § 1180) prostřednictvím SVJ (společenství vlastníků jednotek). Fond oprav hradí opravy a renovace společných částí budovy: střecha, výtah, fasáda, rozvody. Tento náklad nesouvisí s udržováním interiéru bytu, to je samostatná položka (viz Náklady na údržbu níže).

**Výchozí hodnota:** 20–50 Kč/m²/měsíc dle stáří domu. Konkrétní hodnoty dle dispozice a lokality jsou v Google Sheets.

**Zdroj:** NOZ § 1180, tržní průzkum výše příspěvků SVJ.

#### Pojištění nemovitosti

**Co to je:** pojištění konstrukce bytu: stěny, podlahy, rozvody v rámci bytu. Nevztahuje se na vybavení ani na obsah. Většina hypotečních bank ho vyžaduje jako podmínku úvěru.

**Výchozí hodnota:** přibližně 20 Kč/m²/rok.

**Zdroj:** [Srovnávač.cz](https://www.srovnavac.cz/pojisteni/nemovitosti/pojisteni-bytu/), průměr pojistného pro byt v ČR (2025).

#### Daň z nemovitosti

**Co to je:** roční daň z vlastnictví bytu, vypočítaná zákonným vzorcem. Platí každý vlastník nemovitosti v ČR bez výjimky.

**Výpočet:** plocha × sazba × koef. 1,22 × základní koeficient × místní koeficient. Zákon č. 338/1992 Sb. ve znění novely 2024.

#### Náklady na údržbu

**Co to je:** odhadované roční náklady na údržbu interiéru bytu: výměny, opravy, pravidelné renovace. Nezaměňovat s fondem oprav, který hradí společné části budovy. Do údržby patří: rekonstrukce koupelny (jednou za 20–25 let), výměna kuchyňské linky (jednou za 15–20 let), výměna podlah, spotřebiče, malování.

**Výchozí hodnota:** fixní základ + 73 Kč/m²/rok. Typický byt 2+kk v Praze vychází přibližně na 15 000–22 000 Kč ročně.

**Metodika:** výpočet zdola nahoru, amortizující konkrétní výdaje přes jejich reálné životnosti. Detailní kalkulace v Google Sheets.

#### Vybavení bytu

**Co to je:** jednorázový výdaj na vybavení bytu při pořízení. Kalkulačka rozlišuje dva standardy: obývací (vlastní bydlení) a investiční (pronájem).

Proč jiné hodnoty pro investiční byt? Investiční standard počítá s ekonomičtějším nábytkem a základními spotřebiči. Nájemník neklade na vybavení stejné nároky jako majitel, který byt obývá sám.

| Dispozice | Bydlení | Investice |
|---|---|---|
| 1+kk | 77 000 Kč | 48 000 Kč |
| 2+kk | 120 000 Kč | 75 000 Kč |
| 3+kk | 152 000 Kč | 88 000 Kč |
| 4+kk | 184 000 Kč | 105 000 Kč |

**Zdroj:** [IKEA.cz](https://www.ikea.com/cz/) ceník 2026, spotřebiče z [Alza.cz](https://www.alza.cz) a [Datart.cz](https://www.datart.cz). Výpočet zdola nahoru pro každou dispozici: nábytek + spotřebiče + doprava a montáž + osvětlení, závěsy, doplňky. Detailní kalkulace v Google Sheets.

---

### Obsazenost investičního bytu

Platí pouze pro kalkulačku Investice.

**Co to je:** podíl roku, po který je byt skutečně pronajat a generuje příjem. Hodnota nižší než 100 % odráží přirozenou mezeru mezi nájemníky (výběr nájemníka, předání bytu, drobné opravy) a občasné delší prázdné období.

**Zdroj:** hodnoty pro Prahu a Brno vychází z dat o vakanci institucionálního nájemního trhu (Knight Frank, BTR Consulting), upravených dolů pro soukromého pronajímatele, který má pomalejší proces výběru nájemníků. Pro ostatní města jsou hodnoty odvozeny na základě relativní síly místní poptávky po nájemním bydlení.

| Město | Obsazenost |
|---|---|
| Praha | 95 % |
| Brno | 94 % |
| Hradec Králové | 93 % |
| Pardubice | 93 % |
| České Budějovice | 92 % |
| Olomouc | 92 % |
| Plzeň | 92 % |
| Zlín | 91 % |
| Liberec | 91 % |
| Jihlava | 90 % |
| Ostrava | 90 % |
| Karlovy Vary | 88 % |
| Ústí nad Labem | 87 % |

---

### Daňová pravidla

Tato pravidla vstupují do výpočtu automaticky. Jsou pevně daná zákonem a není je třeba nastavovat. Poslední sloupec říká, které kalkulačky se pravidlo týká.

| Pravidlo | Hodnota | Zákonný základ | Kalkulačka |
|---|---|---|---|
| Odpočet hypotečních úroků od základu daně | Max. 150 000 Kč/rok | § 15 ZDP | Bydlení |
| Základní sazba daně z příjmů | 15 % | § 16 ZDP | obě |
| Vyšší sazba daně z příjmů | 23 % (nad 36násobek průměrné mzdy) | § 16 ZDP | obě |
| Osvobození zisku z cenných papírů od daně | Po 3 letech držení | § 4 odst. 1 písm. w) ZDP | obě |
| Odpisy nemovitosti, rok 1 | 1,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 | Investice |
| Odpisy nemovitosti, roky 2–30 | 3,4 % z odpisového základu | § 31 ZDP, odpisová skupina 5 | Investice |
| Odpisový základ | 90 % kupní ceny (bez pozemku) | § 29 ZDP | Investice |
| Přenos daňové ztráty z nájmu | Max. 5 let | § 34 ZDP | Investice |

---

### Jak a kdy data aktualizujeme

Ceny bytů a nájemné aktualizujeme čtvrtletně, v souladu s vydáváním ČBA Monitor a Deloitte Rent Index. Úrokové sazby hypoték sledujeme měsíčně přes [Hypoindex.cz](https://hypoindex.cz). Daňová pravidla kontrolujeme při každé legislativní změně.

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
