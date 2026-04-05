# Metodika: Jak kalkulačka bydlení počítá
**URL:** /metodika/bydleni
**Tón:** přímý, odborný, tykání
**Délka:** ~2 500 slov

## META

**Title:** Jak kalkulačka bydlení počítá | kamspenezi.cz
**Description:** Transparentní metodika kalkulačky bydlení. Dva scénáře, vedlejší fond, daňová úspora z úroků, akciový fond bez daně. Každý předpoklad je zdrojovaný a ověřitelný v Google Sheets.

## OBSAH STRÁNKY

### H1
Metodika: Kalkulačka vlastního bydlení

### Perex
Každý předpoklad je zdrojovaný. Výpočet si ověříš v Google Sheets. Tabulka počítá řádek po řádku úplně stejně jako kalkulačka.

[Otevřít Google Sheets →](https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing)

---

### TL;DR — O čem kalkulačka je

Představ si dvě osoby. Obě mají k dispozici stejnou hotovost a řeší stejnou otázku: jak bydlet a zároveň zhodnotit peníze?

Osoba A koupí byt na hypotéku. Každý měsíc splácí úvěr a platí náklady vlastnictví. Po 30 letech má byt bez dluhů.

Osoba B bydlí v nájmu a rozdíl oproti nákladům vlastnictví investuje do globálního akciového fondu. Po 30 letech má investiční portfolio.

Kalkulačka sleduje, kdo z nich bude na tom po 30 letech lépe. Obě osoby začínají ve stejný den, se stejnou hotovostí, ve stejném městě.

Nejdůležitější předpoklady:

- Předvyplněné ceny bytů a výše nájmů vychází z reálných dat: ČBA Monitor Q4 2025 a Deloitte Rent Index Q4 2025.
- Výnos globálního akciového fondu: **6,5 % p.a.** po nákladech fondu (průměr 5 institucionálních Capital Market Assumptions pro rok 2026).
- Úroková sazba hypotéky: **3,99 % p.a.** prvních 5 let, poté **4,5 % p.a.** Druhá hodnota má na výsledek větší vliv než první.
- Kalkulačka zahrnuje fond oprav, pojistění, daň z nemovitosti, náklady na údržbu a daňovou úsporu z hypotečních úroků.

---

### Dva scénáře — co se do výsledku počítá

**Scénář A — Vlastní bydlení na hypotéku**

Koupíš byt. Vložíš vlastní zdroje (akontace), zbytek koupní ceny zaplatíš hypotékou. Každý měsíc splácíš hypotéku a hradíš náklady vlastnictví: fond oprav, pojistění nemovitosti, daň z nemovitosti a náklady na údržbu. Po 30 letech vlastníš byt bez dluhů.

Čisté jmění Scénáře A = tržní hodnota bytu plus případný vedlejší fond (viz níže).

**Scénář B — Nájem a investice do globálního akciového fondu**

Bydlíš v nájmu. Každý měsíc platíš nájem. Hotovost, kterou jsi nevložil do akontace ani do nákladů vlastnictví, investuješ do globálního akciového fondu.

Čisté jmění Scénáře B = hodnota portfolia po 30 letech.

Oba scénáře platí za bydlení, jen jinak. Scénář A platí hypotéku a náklady vlastnictví, Scénář B platí nájem. Kalkulačka sleduje, kdo na tom bude lépe po 30 letech.

---

### Vedlejší fond — proč ho kalkulačka vytváří

Tady se skrývá nejvíc otázek, takže si to zaslouží pořádné vysvětlení.

V prvních letech je vlastní bydlení dražší než nájem. Splátka hypotéky plus náklady vlastnictví překročí výši nájmu. V tu dobu Scénář B investuje rozdíl do akciového fondu a portfolio roste.

V pozdějších letech se situace otočí. Hypotéka se amortizuje, reálná hodnota splátky klesá díky inflaci. Vlastnit byt se stane levnějším než platit nájem, který meziročně roste. Od chvíle, kdy je vlastnictví levnější než nájem:

- **Scénář B** přestane přidávat nové příspěvky do fondu. Existující portfolio dál roste, ale nové peníze tam neplynou.
- **Scénář A** vytvoří vedlejší fond a začne do něj investovat měsíční úsporu oproti nájmu. Vedlejší fond se zhodnocuje stejnou sazbou jako globální akciový fond (6,5 % p.a.).

**Proč nevybíráme z fondu Scénáře B?**

Intuitivní řešení by bylo: jakmile je nájem dražší než vlastnictví, Scénář B z fondu vybere rozdíl. Jenže výběry v konkrétních časových okamžicích zkreslují výsledek způsobem, který nesouvisí s výnosem investice. Pokud vybíráš, když je trh nahoře, penalizuješ Scénář B čistě na základě načasování, ne na základě reálné výkonnosti aktiva. Výsledek by závisel na tom, kdy přesně se rovnováha obrátila, ne na tom, jak investice skutečně vydělávala.

Správné řešení je nulovat nové příspěvky a začít vedlejší fond na straně Scénáře A. Obě strany jsou tak porovnatelné: ani jedna nevybírá, obě kapitál dál zhodnocují.

---

### Hypoteční sazby — jak kalkulačka pracuje s refixací

Česká hypotéka funguje na fixační periody. Po uplynutí fixace si banka (nebo nová banka) nastaví novou sazbu.

Kalkulačka to modeluje takto:

- **Roky 1–5:** sazba z pole *Úroková sazba hypotéky po dobu 5 let fixace*. Výchozí hodnota: **3,99 % p.a.** (Moneta Money Bank, nejnižší ověřená sazba na trhu k 25. 3. 2026, zdroj: Hypoindex.cz).
- **Roky 6–30:** sazba z pole *Úrok hypotéky po 5leté fixaci*. Výchozí hodnota: **4,5 % p.a.** Jde o konzervativní odhad dlouhodobé průměrné sazby na zbývajících přibližně 25 let. Tato hodnota má na výsledek větší vliv než počáteční sazba, protože platí po dobu 25 z 30 let.

Obě hodnoty si v kalkulačce můžeš změnit. Výsledek je citlivý především na ten druhý parametr.

---

### Příspěvek od rodičů

Česká realita je taková, že část kupujících dostává od rodičů nebo prarodičů jednorázový příspěvek na akontaci. Nemají ho všichni, ale pro ty, kteří ho mají, jde o příspěvek vázaný na samotný akt koupě.

Proto platí, že tato částka přísluší **jen Scénáři A**. Dostaneš ji pouze v případě, že byt koupíš. Scénář B tento příspěvek nedostane a kalkulačka mu ho nepřičítá. Kdybychom ho přičítali oběma stranám, zkreslili bychom porovnání. Scénář B by najednou začínal s větším kapitálem, aniž by to odpovídalo realitě.

---

### Daňová úspora z hypotečních úroků

Pokud si bereš hypotéku na vlastní bydlení, můžeš si zaplacené úroky odečíst od základu daně z příjmů. Zákonný limit je 150 000 Kč ročně (§ 15 zákona č. 586/1992 Sb., účinné od roku 2021).

Jak to funguje v kalkulačce:

- Každý rok vypočítáme zaplacené úroky z hypotéky.
- Pokud jsou nižší než 150 000 Kč, odečteme plnou výši.
- Daňová úspora = odečtené úroky krát tvoje sazba daně z příjmů.
- Úspora snižuje efektivní náklady Scénáře A.

Sazba daně závisí na výši příjmů. V kalkulačce nastavuješ sám:

- **15 %** platí na příjmy do přibližně 1 582 812 Kč ročně (36násobek průměrné mzdy pro rok 2026). Týká se naprosté většiny zaměstnanců.
- **23 %** platí na část příjmů nad tuto hranici. Pokud máš hrubý roční příjem výrazně přesahující 1,5 milionu Kč, pravděpodobně platíš tuto sazbu alespoň na část příjmů.

V prvních letech hypotéky jsou úroky vysoké, úspora je tak největší právě tehdy, kdy je vlastnit byt nejdražší.

---

### Akciový fond — proč počítáme bez daně z výnosu

Zisky z prodeje cenných papírů jsou v České republice osvobozeny od daně z příjmů, pokud:

1. Držíš papíry déle než 3 roky (časový test, § 4 odst. 1 písm. w) ZDP).
2. Nebo tvůj celkový příjem z prodeje cenných papírů nepřekročí 100 000 Kč ročně.

Na 30letém horizontu předpokládáme, že podmínku č. 1 splníš. Investuješ dlouhodobě a papíry nedržíš krátce. Výnos globálního akciového fondu proto vstupuje do kalkulačky bez daně.

Pokud bys vybíral peníze z fondu dříve než 3 roky po jejich vložení, daň by se uplatnila a výsledek Scénáře B by byl nižší. Tuto variantu kalkulačka v základním zobrazení neřeší.

---

### Náklady na údržbu — proč ne americké 1% pravidlo

V americké literatuře se běžně uvádí pravidlo 1 % z hodnoty nemovitosti ročně na údržbu. Pro česká panelová a cihlová města je to číslo mimo realitu.

Americké 1 % vzniklo na trhu, kde jsou běžné rodinné domy s vlastní střechou, zahradou a soukromým systémem vytápění. Přesun nákladů na svépomocnou údržbu je tam výrazně větší. Český byt v panelovém nebo cihlovém domě sdílí střechu, nosné konstrukce a rozvody s ostatními vlastníky. Ty jsou kryté z fondu oprav SVJ, nikoliv z kapsy jednotlivce.

Naše hodnoty jsou sestaveny zdola nahoru. Amortizujeme konkrétní výdaje přes jejich reálné životnosti:

- **Rekonstrukce koupelny** (jednou za 20–25 let): 90 000–150 000 Kč
- **Výměna kuchyňské linky** (jednou za 15–20 let): 40 000–80 000 Kč
- **Výměna podlah** (jednou za 20–30 let): 30 000–70 000 Kč dle plochy
- **Spotřebiče** (pračka, myčka, trouba): průměrně 5 000–12 000 Kč/kus, životnost 10–15 let
- **Malování** (jednou za 7–10 let): 15 000–30 000 Kč dle dispozice

Roční průměr těchto výdajů na typický byt 2+kk v Praze vychází přibližně na 15 000–22 000 Kč ročně, nikoliv na 1 % z kupní ceny, což by u pražského bytu za 7 milionů Kč bylo 70 000 Kč ročně. Detailní výpočet si ověříš v Google Sheets.

---

### Konzervativní předpoklady — co a proč

Kde jsme měli na výběr, volili jsme konzervativnější odhad.

**Výnos globálního akciového fondu (6,5 %):** Historický CAGR globálních akcií za 125 let (DMS Yearbook) je přibližně 7,2 % nominálně. My používáme 6,5 %, což je konsensuální průměr pěti institucionálních výhledů pro rok 2026 (Vanguard, BNY, AQR, DMS, J.P. Morgan). Jde o výnos po nákladech fondu (přibližně 0,20 % p.a.). Zkušení investoři s diverzifikovaným globálním portfoliem mohou na delším horizontu dosáhnout výnosů blízkých historickému průměru. 6,5 % je rozumná, konzervativní kotva pro plánování.

**Růst hodnoty nemovitosti (3–4,5 % dle města):** Historický CAGR českých nemovitostí za 2010–2025 byl přibližně 6,3 %. Ten zahrnoval záporné reálné sazby (2016–2021) a COVID boom (+19,7 % v roce 2021), podmínky, které se na 30letém horizontu neopakují každý cyklus. Náš strukturální odhad vychází z cyklu 2010–2019 (4,5 % CAGR) bez pandemické anomálie.

Navíc platí, že růst nemovitostí není rovnoměrný uvnitř města. Byt na Vinohradech a byt na Černém Mostě mohou mít výrazně odlišný cenový vývoj. Výchozí hodnoty jsou kalibrovány pro každé město jako průměr, nikoliv pro konkrétní čtvrt. Pokud kupuješ v lokalitě, která historicky roste rychleji nebo pomaleji, nastav si parametr ručně.

---

### Úplný přehled parametrů

| Parametr | Výchozí hodnota | Zdroj | Typ |
|---|---|---|---|
| Kupní cena nemovitosti | Dle města a dispozice | ČBA Monitor Q4 2025 | VERIFIED |
| Vlastní zdroje (akontace) | 20 % kupní ceny | ČNB, min. LTV 80 % | VERIFIED |
| Úroková sazba hypotéky (1–5 let) | 3,99 % p.a. | Hypoindex.cz, 25. 3. 2026 | VERIFIED |
| Úroková sazba hypotéky (6–30 let) | 4,5 % p.a. | Konzervativní dlouhodobý odhad | DERIVED |
| Nájemné | Dle města a dispozice | Deloitte Rent Index Q4 2025 | VERIFIED |
| Výnos globálního akciového fondu | 6,5 % p.a. | Průměr 5 CMA institucí, 2026 | VERIFIED |
| Fond oprav | Dle dispozice a města | NOZ § 1180, tržní průzkum | DERIVED |
| Pojistění nemovitosti | Dle dispozice | Srovnávač.cz, průměr 2025 | VERIFIED |
| Daň z nemovitosti | Dle zákonného vzorce | Zákon č. 338/1992 Sb. | VERIFIED |
| Náklady na údržbu | Fixní základ + 73 Kč/m²/rok | Bottom-up kalkulace, viz metodika | DERIVED |
| Odpočet úroků z hypotéky | Max. 150 000 Kč/rok | § 15 ZDP | VERIFIED |
| Sazba daně z příjmů | 15 % (výchozí) | § 16 ZDP | VERIFIED |
| Růst hodnoty nemovitosti | 3–4,5 % p.a. dle města | Eurostat HPI, multi-source konsensus | DERIVED |
| Růst nájemného | 2,5 % p.a. | Deloitte, průměr 2015–2024 | VERIFIED |
| Očekávaná inflace | 2,5 % p.a. | ČNB, střednědobý inflační cíl | VERIFIED |
| Délka horizontu | 30 let | Standard délky hypotéky | DERIVED |

---

### Časté otázky

**Co přesně vidím na výsledku?**
Kalkulačka ti ukáže čisté jmění obou osob po 30 letech v nominálních korunách. Scénář A = tržní hodnota bytu plus vedlejší fond. Scénář B = hodnota investičního portfolia. Výsledek je v korunách za 30 let, ne v dnešní hodnotě peněz. Chceš přibližnou hodnotu v dnešních penězích? Vydel výsledek číslem 2,1.

**Proč model pracuje s 30 lety?**
Protože standardní česká hypotéka má splatnost 25–30 let a porovnání má smysl na celou dobu trvání závazku. Kratší horizont znevýhodňuje Scénář A, protože hypotéka je v prvních letech nejdražší a nemovitost ještě neamortizovala plnou hodnotu.

**Proč porovnáváte s akciovým fondem a ne s dluhopisy nebo spořicím účtem?**
Protože hypotéka je 30letý závazek a srovnávat ji s krátkodobými nástroji by nebylo férové. Spořicí účty mají proměnlivou sazbu závislou na aktuální repo sazbě ČNB. Globální diverzifikovaný akciový fond je standardní nástroj pro 30letý investiční horizont s odbornou shodou na pozitivním reálném výnosu.

**Proč má Scénář B větší čisté jmění v prvních letech?**
V prvních letech hypotéky je vlastní bydlení dražší než nájem. Scénář B v tu dobu investuje rozdíl, zatímco Scénář A splácí vysoké úroky a vedlejší fond ještě nevytváří. Bod zlomu se typicky pohybuje mezi 10. a 20. rokem v závislosti na parametrech.

**Co když ceny nemovitostí porostou rychleji, než předpokládáte?**
Změň si parametr *Růst hodnoty nemovitosti* v kalkulačce. Každé zvýšení o 1 procentní bod výrazně posiluje Scénář A. Je to jeden z nejcitlivějších parametrů celého modelu.

**Kalkulačka říká, že vlastní bydlení vychází lépe. Mám si koupit byt?**
Kalkulačka počítá finanční výsledek. Rozhodnutí o bydlení má emocionální, rodinnou a životní složku, kterou čísla nezachytí. Výsledek kalkulačky je jeden vstup do rozhodování, ne odpověď na celou otázku.
