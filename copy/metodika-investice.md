# Metodika: Investiční byt vs. akciový fond
**URL:** /metodika/investice
**Tón:** přímý, odborný, tykání
**Délka:** ~2 500 slov

## META

**Title:** Investiční byt vs. akciový fond: jak kalkulačka počítá | kamspenezi.cz
**Description:** Transparentní metodika kalkulačky investičního bytu. Počáteční kapitál, odpisy, daňová ztráta, obsazenost, vedlejší fond. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets.

## OBSAH STRÁNKY

### H1
Metodika: Investiční byt vs. akciový fond

### Perex
Výpočet si ověříš v Google Sheets. Tabulka počítá řádek po řádku úplně stejně jako kalkulačka.

[Otevřít Google Sheets →](https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing)

---

### Jak kalkulačka funguje

Představ si dvě osoby. Obě mají k dispozici stejnou hotovost a řeší stejnou otázku: co udělat s penězi, aby je zhodnotily?

Osoba A koupí investiční byt na hypotéku a pronajme ho. Každý měsíc přijímá nájemné a platí splátky. Po 30 letech má byt bez dluhů.

Osoba B nevkládá peníze do bytu. Hned první den vloží ekvivalentní kapitál do globálního akciového fondu. V prvních letech, kdy Osoba A doplácí na byt z vlastní kapsy (splátky a náklady převyšují nájemné), investuje Osoba B tento měsíční rozdíl navíc do fondu. Po 30 letech má investiční portfolio.

Kalkulačka sleduje, kdo z nich bude na tom po 30 letech lépe.

---

### Dva scénáře: co každý z nich obnáší

Kalkulačka porovnává dvě cesty k budování majetku. Obě začínají ve stejný den se stejnou hotovostí.

**Scénář A: Investiční byt na hypotéku**

Koupíš investiční byt. Vložíš vlastní zdroje (akontace, typicky 10–20 % kupní ceny) a byt vybavíš. Zbytek koupní ceny zaplatíš hypotékou. Byt pronajmeš. Nájemné ti každý měsíc pokrývá část nákladů, v prvních letech je nestačí pokrýt celé. Každý rok platíš hypotéku, fond oprav, pojištění, daň z nemovitosti a náklady na údržbu. Z příjmů z nájmu odvádíš daň z příjmů. Přebývající hotovost investuješ do vedlejšího fondu (viz níže). Po 30 letech vlastníš byt bez dluhů.

Čisté jmění Scénáře A = tržní hodnota bytu plus vedlejší fond.

**Scénář B: Globální akciový fond**

Nekupuješ nic. Hotovost, která by jinak šla do akontace a vybavení bytu, vložíš hned první den do globálního akciového fondu. Každý měsíc investuješ navíc i rozdíl v cash flow oproti Scénáři A. Příklad: pokud Scénář A v prvním roce doplácí 4 000 Kč měsíčně nad příjem z nájmu, Scénář B investuje těchto 4 000 Kč každý měsíc navíc. Tato výhoda se v průběhu let otočí: jakmile se cash flow bytu dostane do kladných čísel (typicky kolem 8.–15. roku), nové příspěvky přestane přidávat Scénář B a začne je přidávat Scénář A do vedlejšího fondu. Po 30 letech vlastníš investiční portfolio.

Čisté jmění Scénáře B = hodnota portfolia.

---

### Vedlejší fond: jak funguje při investičním bytu

Základní pravidlo modelu: v každém okamžiku musí obě strany investovat přesně stejnou částku ve stejný čas. Žádná koruna nesmí zmizet ani přibýt. Oba scénáře sledují, kam každá koruna putuje každý měsíc po celých 30 let.

**První roky: byt je ztrátový**

Investiční byt v prvních letech typicky generuje záporný cash flow. Splátka hypotéky a provozní náklady převyšují příjem z nájmu. Scénář A doplácí z vlastní kapsy. Scénář B má v tu dobu větší investovatelnou hotovost a tento rozdíl investuje do fondu každý měsíc.

**Pozdější roky: byt začne vydělávat**

Hypotéka se amortizuje, nájemné roste. V určitém bodě se cash flow Scénáře A otočí do kladných čísel. Od té chvíle:

- **Scénář B** zastaví nové příspěvky do fondu. Portfolio dál roste, ale nové peníze přestávají přitékat.
- **Scénář A** vytvoří vedlejší fond a investuje do něj přebývající cash flow. Vedlejší fond se zhodnocuje stejnou sazbou jako globální akciový fond (6,5 % p.a.).

Ani jedna strana z fondu nevybírá. Výběry v konkrétním čase zkreslují výsledek způsobem, který nesouvisí s výnosem investice. Závisel by na načasování, ne na reálné výkonnosti aktiva. Nulování příspěvků je spravedlivý přístup pro obě strany.

---

### Obsazenost: proč nepočítáme se 100 %

Mezi nájemníky vždy vzniká mezera: výběr nového nájemníka, předání bytu, drobné opravy. Na 30letém horizontu se stane i to, že byt stojí prázdný déle. Kalkulačka s tím počítá:

- **Praha:** 93 % (byt obsazen průměrně 11,2 měsíce ročně)
- **Brno:** 92 %
- **Ostrava:** 87 %
- **Ústí nad Labem:** 83 % (nejnižší v datasetu, výrazně slabší poptávka)

Hodnoty pro Prahu a Brno vychází z dat o vakanci institucionálního nájemního trhu, upravených dolů pro soukromého pronajímatele. Pro ostatní města jsou odvozeny podle síly místní poptávky. Obsazenost je jeden z nejcitlivějších parametrů kalkulačky. Změn si ji a sleduj, jak se výsledek mění. Hodnoty pro všechna města najdeš na [stránce Data a zdroje](/metodika/data-a-zdroje).

---

### Odpisy nemovitosti: jak fungují a proč záleží

Odpisy jsou čistě účetní nástroj. Nejde o skutečný výdaj peněz. Jde o fiktivní náklad, který ti zákon dovoluje odečíst od základu daně z příjmu z nájmu.

**Jak odpisy fungují:**

Zákon ti dovoluje odpisovat budovu, ne pozemek. Proto odpisový základ = 90 % kupní ceny (zbývajících 10 % je orientační hodnota pozemku, odpisovat ho nelze).

Výpočet:
- Rok 1: 1,4 % z odpisového základu
- Roky 2–30: 3,4 % z odpisového základu ročně

Příklad pro byt za 5,6 mil. Kč:
- Odpisový základ: 5 040 000 Kč (90 %)
- Rok 1: 5 040 000 × 1,4 % = **70 560 Kč** odečteno ze základu daně
- Roky 2–30: 5 040 000 × 3,4 % = **171 360 Kč** ročně odečteno ze základu daně

Praktický dopad: v prvních 8–12 letech odpisy spolu s ostatními náklady typicky převyšují příjmy z nájmu. Výsledkem je daňová ztráta a nulová daň z nájemného. Blíže viz sekce Daňová ztráta níže.

---

### Daňová ztráta a její přenos

V prvních letech hypotéky jsou odpisy plus ostatní náklady vyšší než příjmy z nájmu. Výsledkem je **daňová ztráta**, tedy záporný základ daně.

Tuto ztrátu nelze využít okamžitě, ale zákon ti ji nechá přenést do budoucna. Konkrétně: ztrátu z příjmů z nájmu (§ 9 ZDP) lze uplatnit v následujících **5 zdaňovacích obdobích** (§ 34 ZDP).

Kalkulačka tento přenos počítá přesně. Každý rok sleduje nevyčerpanou ztrátu, aplikuje ji na příjmy z nájmu v dalších letech a zdaňuje až skutečný kladný základ daně.

Výsledek: v prvních letech platíš nulovou nebo velmi nízkou daň, i když byt začíná generovat kladný příjem z nájmu. Tento efekt výrazně zlepšuje cash flow Scénáře A v přechodu z záporného do kladného.

---

### Reálné náklady vs. paušál: proč počítáme po položkách

Pronajímatel má při zdanění příjmů z nájmu dvě možnosti:

1. **Paušální výdaj 30 %**: jednoduché, bez dokladů, vždy 30 % příjmů jde jako výdaj
2. **Reálné náklady**: odečítáš skutečné výdaje: fond oprav, pojištění, daň z nemovitosti, náklady na údržbu a odpisy

Kalkulačka používá reálné náklady, protože umožňují uplatnit odpisy. Ty jsou v prvních letech výrazně vyšší než 30 % z příjmů. Paušál by byl výhodnější jen tehdy, kdybys neměl žádné dokladovatelné náklady a odpisy by byly nízké. Pro hypoteční investiční byt je to téměř vždy horší varianta.

---

### Daňové pásmo: 15 % nebo 23 %

Sazba daně z příjmů fyzických osob v ČR:
- **15 %** pro příjmy do přibližně 1 582 812 Kč ročně (zhruba 132 000 Kč hrubého měsíčně). Týká se naprosté většiny zaměstnanců.
- **23 %** pro příjmy nad tento limit (§ 16 ZDP). Pokud máš hrubý roční příjem výrazně přesahující 1,5 milionu Kč, pravděpodobně platíš tuto sazbu alespoň na část příjmů.

Výchozí hodnota v kalkulačce je 15 %. Daňová sazba ovlivňuje dvě věci zároveň: výši daně z příjmu z nájmu (vyšší sazba = větší daňové zatížení Scénáře A) a efekt odpisů (vyšší sazba = větší daňová úspora z odpisů). Tyto dva efekty se částečně kompenzují.

---

### Akciový fond: proč počítáme bez daně z výnosu

Zisky z prodeje cenných papírů jsou v Česku osvobozeny od daně, pokud je držíš déle než 3 roky (§ 4 odst. 1 písm. w) ZDP). Na 30letém horizontu předpokládáme dlouhodobé držení. Výnos globálního akciového fondu proto vstupuje do kalkulačky bez daně.

---

### Konzervativní předpoklady: co a proč

Kde jsme měli na výběr, volili jsme konzervativnější odhad.

**Výnos globálního akciového fondu (6,5 %):** Konsensuální průměr pěti institucionálních výhledů pro rok 2026 (Vanguard, BNY, AQR, DMS/UBS, Northern Trust) po nákladech fondu (přibližně 0,20 % p.a.). Historický nominální výnos globálních akcií (DMS Yearbook) se dlouhodobě pohybuje přibližně kolem 7 % ročně. 6,5 % je konzervativní kotva. Zkušení investoři s diverzifikovaným globálním portfoliem mohou na delším horizontu dosáhnout výnosů blízkých historickému průměru.

**Růst hodnoty nemovitosti (3–4,5 % dle města):** Strukturální odhad vychází z cyklu 2010–2019 bez pandemické anomálie, kalibrovaný pro každé město. Lokalita uvnitř města výsledek ovlivňuje výrazně. Praha 2 a Praha 14 nejsou stejná investice. Výchozí hodnoty jsou průměry za celé město, ne za konkrétní čtvrt.

**Úroková sazba hypotéky po refixaci (4,5 %):** Tato hodnota platí pro 25 z 30 let hypotéky. Je odvozena z neutrální sazby ČNB, střednědobého inflačního cíle a standardní bankovní marže. Jde o konzervativní odhad, sazba může být nižší i vyšší. Protože platí nejdéle, má na celkový výsledek větší vliv než počáteční fixovaná sazba 3,99 %.

Úplný přehled všech parametrů a jejich zdrojů najdeš na [stránce Data a zdroje](/metodika/data-a-zdroje).

---

### Časté otázky

**Co přesně vidím na výsledku?**
Kalkulačka ti ukáže čisté jmění obou scénářů po 30 letech v nominálních korunách. Scénář A = tržní hodnota bytu plus vedlejší fond. Scénář B = hodnota portfolia. Chceš přibližnou hodnotu v dnešních penězích? Vyděl výsledek číslem 2,1.

**Proč porovnáváš s akciovým fondem, a ne se spořicím účtem?**
Protože hypotéka je 30letý závazek a investiční byt je dlouhodobé aktivum. Spořicí účet je krátkodobý nástroj s proměnlivou sazbou, která se mění s každým rozhodnutím ČNB. Správný protějšek k 30letému reálnému aktivu je 30letá investice, ne nástroj se splatností do výpovědi.

**Co ovlivňuje výsledek nejvíc?**
Na straně Scénáře A: cena bytu, výše nájmu, obsazenost a růst hodnoty nemovitosti. Na straně Scénáře B: výnos akciového fondu. Právě tyto parametry si změn v kalkulačce a prozkoumej, kde je bod zlomu.

**Proč má Scénář A v prvních letech záporný cash flow?**
Protože splátka hypotéky plus provozní náklady v prvních letech převyšují příjem z nájmu. Investiční byt se stane cash flow pozitivním typicky v rozmezí 8. až 15. roku, záleží na parametrech. Do té doby Scénář A doplácí z vlastní kapsy a Scénář B investuje tento rozdíl.

**Počítáš se situací, kdy nájemník neplatí?**
Kalkulačka modeluje vakanci mezi nájemníky, nikoliv aktivní neplacení. Obsazenost pokrývá dobu, kdy je byt prázdný při střídání nájemníků. Scénář, kdy nájemník byt obsazuje a neplatí, do modelu nezahrnujeme. Jako praktické opatření doporučujeme sjednat nájemní smlouvu s notářským zápisem se svolením k vykonatelnosti: pokud nájemník přestane platit, lze pohledávku vymáhat přímo ze mzdy bez soudního řízení.

**Kalkulačka říká, že investiční byt vychází lépe. Mám si ho koupit?**
Kalkulačka počítá finanční výsledek za konkrétních předpokladů. To nestačí jako základ pro rozhodnutí. Investiční byt je koncentrovaná sázka: jeden konkrétní byt, na jedné ulici, v jednom městě. Pokud se lokalita zhorší, dojde k větší opravě nebo ho zasáhne nepříznivá legislativa, celá investice trpí. Globální akciový fond drží tisíce firem po celém světě. Diverzifikace je reálná výhoda, ne marketing. Navíc: investiční byt vyžaduje aktivní správu (komunikace s nájemníky, opravy, administrativa), zatímco akciový fond neklade žádné provozní nároky. Finanční výsledek je jen jeden vstup do rozhodování.

---

### CTA

[LAYOUT NOTE pro Cursor: závěrečný CTA blok, bez viditelného nadpisu]

Chceš si to spočítat? Jdi na kalkulačku.

→ Kalkulačka investičního bytu
