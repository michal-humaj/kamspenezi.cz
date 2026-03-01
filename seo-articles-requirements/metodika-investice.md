# Stránka: /metodika/investice

**Meta title:** Jak funguje kalkulačka investice: metodika a zdroje | kamspenezi.cz
**Meta description:** Investiční byt vs. akciový fond: kompletní výpočet, daňový model s reálnými výdaji a odpisy, veřejný spreadsheet.
**URL slug:** /metodika/investice
**Jazyk:** cs-CZ

---

<!-- CURSOR: Stejný layout jako /metodika/bydleni — lineární, max šířka 720px, centrovaný. -->

---

## SEKCE 1 — Ověřte si výpočet

<!-- CURSOR: Hero sekce, stejný komponent jako na /metodika/bydleni. -->

**Nadpis (H1):**
Kompletní výpočet je veřejně dostupný

**Podnadpis (perex):**
Kalkulačka investice stojí na Google Sheetu s otevřenými vzorci. Celý daňový model — včetně odpisů, ztrát z pronájmu a jejich přenosu do dalších let — si můžete ověřit řádek po řádku.

<!-- CURSOR: CTA tlačítko, primární styl, ikona externího odkazu, nový tab. -->
**[CTA tlačítko]** Otevřít spreadsheet →
**Odkaz:** https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=275768974#gid=275768974

<!-- CURSOR: Hint text pod tlačítkem. -->
**Hint pod tlačítkem:**
Záložka „Investice" · Google Tabulky · pouze pro čtení

---

## SEKCE 2 — Proč ne výnosové procento?

<!-- CURSOR: H2 nadpis. Krátká, přímá sekce, cca 160 slov. -->

**Nadpis (H2):**
Proč kalkulačka neměří výnosové procento?

**Text:**
Výnosové procento (hrubý roční nájem ÷ kupní cena) je nejrozšířenější metrika pro hodnocení investičního bytu v Česku. Je to ale jednoroční snapshot, ne 30letý model.

Hrubé výnosové procento v Praze: 3,5–4,3 %. To zní přijatelně — dokud nezapočítáte neobsazenost, daň z příjmů, fond oprav, pojistné a údržbu. Po těchto nákladech je čisté výnosové procento výrazně nižší.

A ani čisté výnosové procento neodpovídá na klíčovou otázku: co by vynesl stejný kapitál investovaný do globálního akciového fondu? Tuto otázku žádná česká kalkulačka výnosového procenta neklade.

Tato kalkulačka měří čisté jmění po 30 letech — investiční byt včetně plného daňového modelu versus ETF portfolio se stejným kapitálem. To je fundamentálně jiná, a užitečnější, otázka.

---

## SEKCE 3 — Jak kalkulačka počítá

<!-- CURSOR: H2 nadpis, prose text cca 400 slov. Scénář A a B jako tučné perexové odstavce. -->

**Nadpis (H2):**
Jak kalkulačka počítá

**Text:**
Kalkulačka porovnává dva přístupy k investování stejné výchozí částky. Výsledek je čisté jmění po 30 letech.

**Scénář A: Investiční byt na hypotéku**

V roce nula zaplatíte zálohu (min. 20–30 % kupní ceny, nebo 0 % pokud zastavíte jinou nemovitost) a zařídíte byt k pronájmu. Hypotéka je na 30 let s 5letou fixací — po refinancování počítáme s dlouhodobě očekávanou průměrnou sazbou (roky 6–30).

Každý rok přijímáte nájem — ale jen za reálně obsazené měsíce. Obsazenost závisí na místě: Praha 95 %, Brno 94 %, Ústí nad Labem 87 %. Z příjmu odečítáte výdaje a platíte daň z příjmů.

Pokud je roční cashflow kladný, přebytek investujete do vedlejšího fondu (ETF). V prvních letech bývá cashflow záporný nebo nulový — viz Daňový model níže.

Po 30 letech: hodnota nemovitosti + vedlejší fond.

**Scénář B: Akciové ETF**

V roce nula investujete stejnou zálohu do globálního akciového ETF. V každém roce, kdy by investiční byt měl záporný cashflow (náklady převyšují příjem z nájmu), přidáte stejnou částku i do ETF portfolia. V letech s kladným cashflow nepřidáváte nic.

Symetrický přístup: oba scénáře pracují se stejnými peněžními toky ve stejných časech. Srovnání je fér.

Po 30 letech: hodnota ETF portfolia.

**Příspěvek od rodičů**

Stejně jako v kalkulačce bydlení: jednorázový příspěvek na koupi jde výhradně do scénáře A. Ve scénáři B (ETF) tuto částku nedostanete — asymetrie je záměrná a odpovídá realitě.

---

## SEKCE 4 — Daňový model podrobně

<!-- CURSOR: H2 nadpis. Nejdůležitější sekce pro finančně gramotné čtenáře. Obsahuje info box pro odpisy. Legislativní reference jako textové linky. -->

**Nadpis (H2):**
Daňový model podrobně

**Text:**
Kalkulačka používá model skutečných výdajů (§9 ZDP), ne paušální výdaj 30 %. Skutečné výdaje jsou ve většině případů výhodnější díky odpisům.

**Co vstupuje do daňových výdajů každý rok:**
- Zaplacené úroky z hypotéky (ne jistina — ta je splácení dluhu, ne výdaj)
- Fond oprav (SVJ)
- Pojistné nemovitosti
- Daň z nemovitosti
- Odpisy nemovitosti

Základ daně = příjem z nájmu (× obsazenost) − součet těchto výdajů

Daňová sazba: 15 % (nebo 23 % při ročních příjmech nad přibližně 2,23 mil. Kč).

<!-- CURSOR: Zvýrazněný info box — mírně odlišné pozadí, border-left accent. Titulek "Jak počítáme odpisy". -->

**Info box — Jak počítáme odpisy:**

Každý rok snižujeme základ daně o odpis nemovitosti. Odpisová základna je 90 % kupní ceny — zbývajících 10 % tvoří odhadovaná hodnota pozemku, který se odpisovat nedá. Zákonné sazby pro odpisovou skupinu 5 (bytové domy):

- Rok 1: **1,4 %** z odpisové základny
- Roky 2–30: **3,4 %** z odpisové základny

Příklad Praha 2+kk (kupní cena 8 100 000 Kč):
- Odpisová základna: 8 100 000 × 90 % = 7 290 000 Kč
- Odpis v roce 1: 7 290 000 × 1,4 % = **102 060 Kč**
- Odpis v rocích 2–30: 7 290 000 × 3,4 % = **247 860 Kč/rok**

Záporný základ daně v roce 1 je proto výraznější než v následujících letech — odpis je nižší, zatímco úroky z hypotéky jsou nejvyšší.

<!-- CURSOR: Konec info boxu. Pokračuje prose. -->

**Záporný základ daně a přenos do dalších let**

V prvních letech investičního bytu bývá základ daně záporný — příjem z nájmu je nižší než součet výdajů včetně odpisů a úroků. To je normální a žádoucí stav.

Záporný základ daně nevyprší. Kalkulačka ho přenáší do následujících až 5 zdaňovacích období (§34 ZDP). Jinými slovy: pokud máte v roce 1 daňovou ztrátu 150 000 Kč, snižuje váš základ daně v letech 2 až 6 (nebo do úplného vyčerpání). Toto je v kalkulačce plně zohledněno.

**Legislativní reference:**
- [§9 ZDP](https://www.zakonyprolidi.cz/cs/1992-586#p9) — příjmy z pronájmu, skutečné výdaje
- [§34 ZDP](https://www.zakonyprolidi.cz/cs/1992-586#p34) — uplatnění daňové ztráty do 5 let
- [Zákon 338/1992 Sb.](https://www.zakonyprolidi.cz/cs/1992-338) — daň z nemovitých věcí

---

## SEKCE 5 — Co kalkulačka zahrnuje

<!-- CURSOR: H2 nadpis. Parametry v tematických skupinách, ne náhodný seznam. -->

**Nadpis (H2):**
Co výpočet zahrnuje

**Text:**
Model investičního bytu je komplexnější než kalkulačka bydlení, protože zahrnuje celý daňový cyklus pronájmu. Parametry jsou rozděleny do čtyř skupin.

**Počáteční investice**
Záloha (vlastní zdroje v %, min. 20–30 % pro investiční byt), jednorázový příspěvek od rodičů, a vybavení bytu k pronájmu. Vybavení nájemního bytu je typicky nižší než u vlastního bydlení.

**Roční náklady a příjmy**
Příjem z nájmu (krácený o obsazenost dle města), splátka hypotéky, fond oprav, pojistné, daň z nemovitosti a náklady na údržbu. Všechny nákladové položky každý rok narůstají s inflací. Kladný cashflow jde do vedlejšího fondu.

**Daně**
Kompletní model skutečných výdajů (§9 ZDP) včetně odpisů (zákonné sazby: 1,4 % v roce 1, 3,4 % v rocích 2–30 z 90 % kupní ceny), 5letý carry-forward záporného základu daně (§34 ZDP), sazba 15 % nebo 23 %.

**Per-city obsazenost**
Obsazenost závisí na trhu: Praha 95 %, Brno 94 %, silné regionální trhy 93 %, průměrné trhy 91–92 %, slabé trhy (Ústí) 87 %. Aktuální trh je výrazně napjatější — tyto hodnoty jsou konzervativní pro 30letý horizont.

---

## SEKCE 6 — Co kalkulačka nezahrnuje

<!-- CURSOR: H2 nadpis, krátký seznam. -->

**Nadpis (H2):**
Co výpočet nezahrnuje

**Text:**
Realita pronajímání má stránky, které číselný model nezachytí.

- **Časové náklady na správu** — hledání nájemníků, komunikace, drobné opravy, účetnictví (odhadem 2–5 hodin měsíčně). ETF žádnou správu nevyžaduje.
- **Náklady na správcovskou firmu** (6–10 % měsíčního nájmu + 1 měsíční nájem za nalezení nájemníka), pokud správu outsourcujete.
- **Právní náklady** při problémech s nájemníkem.
- **Daň z příjmu z prodeje nemovitosti** po 30 letech (osvobozeno po 10 letech vlastnictví).
- **Transakční náklady** koupě a prodeje.

Nezahrnuté náklady — zejména časové — jdou k tíži investičního bytu. Pokud je výsledek těsný, vezměte to v potaz.

---

## SEKCE 7 — Předvyplněné hodnoty

<!-- CURSOR: H2 nadpis. Začíná vysvětlením logiky předvyplňování (stejný princip jako /metodika/bydleni), pak tabulka. -->

**Nadpis (H2):**
Předvyplněné hodnoty a jejich zdroje

**Jak předvyplňování funguje:**

Na začátku kalkulačky vyberete město a dispozici bytu. Kalkulačka automaticky předvyplní parametry, které byste jinak museli dohledávat: fond oprav, pojistné, daň z nemovitosti, náklady na údržbu a obsazenost bytu v daném městě.

Dvě hodnoty musíte zadat vždy sami: kupní cenu konkrétního bytu a výši nájemného. Ty závisí na konkrétní adrese, ne na průměru města.

Nejcitlivější parametry jsou výnos ETF a roční zhodnocení nemovitosti — posun o 1 % znamená po 30 letech rozdíl v řádu milionů. Upravte je podle svého přesvědčení a lokality.

**Sdílené parametry s kalkulačkou bydlení**

Fond oprav, pojistné, daň z nemovitosti a náklady na údržbu odhadujeme stejnou metodikou jako v kalkulačce bydlení. Podrobné vysvětlení každého parametru — včetně zdrojů, vzorců a věcných omezení — najdete v [Metodice bydlení](/metodika/bydleni) v sekci Předvyplněné hodnoty.

**Obsazenost bytu**

Obsazenost je jeden z nejkritičtějších parametrů celého modelu — přímý násobitel příjmu z nájmu. Nenašli jsme žádný veřejně dostupný český dataset, který by systematicky měřil míru neobsazenosti po jednotlivých krajských městech. Hodnoty jsou proto výsledkem triangulace tří zdrojů: Investropa 2026 (syntéza analýz Savills, Deloitte a CBRE pro český trh), Deloitte Rent Index Q3 2025 jako proxy pro poptávku, a ČSÚ Sčítání lidu 2021 jako proxy pro demografické trendy.

Praha má nejvyšší obsazenost (95 %) — poptávka dlouhodobě převyšuje nabídku a demografická migrace do metropole pokračuje. Ústí nad Labem má nejnižší obsazenost (87 %) — město ztrácí obyvatele tempem přibližně −0,68 % ročně, nájemní trh je strukturálně slabší. Aktuální napjatost trhu (2025–2026) je výrazně vyšší než naše konzervativní odhady; pro 30letý horizont je konzervativní přístup správný.

**Vybavení bytu k pronájmu**

Nájemní byt vyžaduje nižší vybavení než vlastní bydlení. Počítáme s ekonomickým tiérem — funkční, trvanlivé, bez prémiových prvků. Pro pražský 2+kk odhadujeme 90 000 Kč na základě IKEA CZ katalogu (kuchyně, obývací pokoj, ložnice, základní spotřebiče). Vybavení se do daňových výdajů zahrnuje v prvním roce jako jednorázový výdaj.

**Roční odpis**

Roční odpis není parametr, který uživatel zadává — kalkuluje se automaticky z kupní ceny. Odpisová základna je 90 % kupní ceny (pozemek, tvořící odhadovaných 10 %, se odpisovat nedá). Kalkulačka používá zákonné sazby pro odpisovou skupinu 5: v prvním roce 1,4 %, od druhého roku 3,4 %. Pro pražský 2+kk (8 100 000 Kč) to znamená odpis 102 060 Kč v roce 1 a 247 860 Kč ročně v letech 2–30.

<!-- CURSOR: Tabulka. Sloupce: Parametr | Praha 2+kk | Vzorec / logika | Zdroj | Kvalita. Badge VERIFIED/DERIVED. -->

| Parametr | Praha 2+kk | Vzorec / logika | Zdroj | Kvalita |
|-----------|-----------|-----------------|-------|---------|
| Kupní cena | 8 100 000 Kč | Viz Metodika Bydlení | CBA Monitor Q3 2025 | DERIVED |
| Výměra bytu | 54 m² | Medián, Sreality.cz API | Sreality.cz API | VERIFIED |
| Měsíční nájem | 25 500 Kč | GPG nájemné/m² × Sreality multiplier × m² | Global Property Guide + Sreality | DERIVED |
| Úroková sazba (fixace 5 let) | 4,9 % | Průměr hypoték, 5letá fixace, 12/2025 | Swiss Life Hypoindex 12/2025 | VERIFIED |
| Úroková sazba (roky 6–30) | 4,5 % | CNB equilibrium PRIBOR + spread | CNB Prognóza podzim 2025 | DERIVED |
| Obsazenost bytu | **95 %** (Praha) | Konzervativní odhad pro 30letý horizont | Investropa 2026, Deloitte Q3 2025, ČSÚ 2021 | VERIFIED |
| Růst nájemného | 3,5 % | Inflace + mzdový růst + poptávka | OECD Rent Price Index, Deloitte Q3 2025 | VERIFIED |
| Růst hodnoty nemovitosti | 4,0 % | Viz Metodika Bydlení | ČSÚ HPI, CBA Monitor, Jordà 2024 | VERIFIED |
| Výnos ETF | 7,0 % | Dlouhodobý průměr globálního akciového indexu (nominálně) | Goldman Sachs 2024, Vanguard CMAs | VERIFIED |
| Inflace | 2,5 % | CNB střednědobý cíl | CNB Prognóza podzim 2025 | VERIFIED |
| Fond oprav | 1 200 Kč/měs. | 22 Kč/m² × 54 m² | SVJ PŘEDSEDA, RE/MAX | DERIVED |
| Pojistné nemovitosti | 1 100 Kč/rok | 20 Kč/m²/rok × 54 m² | Srovnávač.cz | DERIVED |
| Daň z nemovitosti | 1 600 Kč/rok | Zákon 338/1992 Sb., koeficienty MFČR | MFČR | DERIVED |
| Náklady na údržbu | 20 000 Kč/rok | Základní fixní + 73 Kč/m² × reg. koef. | CeníkyŘemesel.cz + ČSÚ mzdy | DERIVED |
| Vybavení bytu k pronájmu | 90 000 Kč | Ekonomický tier, 2+kk | IKEA CZ katalog | DERIVED |
| Odpis rok 1 | 102 060 Kč | 7 290 000 × 1,4 % | Zákon o daních z příjmů | VERIFIED |
| Odpis roky 2–30 | 247 860 Kč/rok | 7 290 000 × 3,4 % | Zákon o daních z příjmů | VERIFIED |
| Sazba daně z příjmů | 15 % | 23 % nad 48× průměrná mzda (~2,23 mil. Kč/rok) | Zákon o daních z příjmů | — |

<!-- CURSOR: Per-city obsazenost jako expandovatelný detail nebo malá tabulka pod hlavní tabulkou. -->

**Per-city obsazenost:**
Praha 95 % · Brno 94 % · Plzeň 93 % · Liberec 93 % · Olomouc 92 % · Hradec Králové 92 % · České Budějovice 91 % · Jihlava 91 % · Zlín 91 % · Pardubice 91 % · Karlovy Vary 89 % · Ostrava 88 % · Ústí nad Labem 87 %

**Zdroje:** Investropa 2026, Deloitte Rent Index Q3 2025, ČSÚ Sčítání lidu 2021

**Pod tabulkou:**
28+ zdrojových datasetů · 13 krajských měst × 4 dispozice = 52 kompletních sad

---

## SEKCE 8 — Právní upozornění

<!-- CURSOR: Stejný styl jako /metodika/bydleni. -->

**Text:**
Kalkulačka slouží výhradně pro informační a vzdělávací účely. Nepředstavuje finanční poradenství ani investiční doporučení. Výsledky závisí na zadaných parametrech a předpokladech, které se mohou lišit od vaší konkrétní situace. Před jakýmkoli finančním rozhodnutím doporučujeme konzultaci s kvalifikovaným finančním nebo daňovým poradcem.

<!-- CURSOR: CTA tlačítko, sekundární styl. -->
**[CTA tlačítko]** Otevřít kalkulačku investice →
**Odkaz:** /investice

---

**Konec stránky /metodika/investice**
