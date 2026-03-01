# Kamspenezi.cz: Kompletni architektura webu

**Verze:** 3.0 (Brezen 2026)
**Stav:** Strategicky plan pred kontaktovanim medii
**Poznamka:** Toto je plan sekci a struktury. Finalni copy bude vytvorena oddelene v MD souborech per stranka.

---

## Mapa stranek

```
kamspenezi.cz
├── /                                 ← Kalkulacka bydleni [EXISTUJE]
├── /investice                        ← Kalkulacka investice [EXISTUJE]
├── /metodika/bydleni                 ← Metodika + zdroje bydleni [NOVA]
├── /metodika/investice               ← Metodika + zdroje investice [NOVA]
├── /o-projektu                       ← O projektu + nezavislost + kontakt [NOVA]
├── /koupit-nebo-pronajmout           ← SEO clanek: koupit vs pronajmout [NOVA]
└── /vyplati-se-investicni-byt        ← SEO clanek: investicni byt vs ETF [NOVA]
```

---

## NAVIGACE A DISCOVERY

### Hlavni navigace (desktop)

```
┌──────────────────────────────────────────────────────────────────┐
│  kamspenezi.cz    Bydlení    Investice    O projektu            │
└──────────────────────────────────────────────────────────────────┘
```

- 3 polozky v hlavnim menu: Bydleni ( / ) | Investice ( /investice ) | O projektu ( /o-projektu )
- Logo/nazev "kamspenezi.cz" v levo, kliknutim zpet na /
- Zadny dropdown, zadne submenu. Metodika a SEO clanky se do hlavniho menu NEDOSTAVAJI.

### Hlavni navigace (mobile)

```
┌──────────────────────────────────┐
│  kamspenezi.cz           [☰]    │
└──────────────────────────────────┘

Hamburger menu otevira:
┌──────────────────────────────────┐
│  Bydlení                         │
│  Investice                       │
│  O projektu                      │
│  ─────────────────               │
│  Metodika: Bydlení               │
│  Metodika: Investice             │
└──────────────────────────────────┘
```

- Hamburger menu s 3 primarnich + 2 sekundarnich polozek (oddelene dividerem)
- Metodika polozky jsou sekundarni protoze se na ne uzivatel dostane i z kalkulacky
- Touch targets min 44x44px, padding 16px

### Paticka (desktop i mobile)

```
┌──────────────────────────────────────────────────────────────────┐
│  kamspenezi.cz                                                    │
│                                                                    │
│  Kalkulačky           Metodika              Projekt                │
│  Bydlení              Metodika: Bydlení     O projektu             │
│  Investice            Metodika: Investice   Kontakt                │
│                                                                    │
│  Články                                                            │
│  Koupit, nebo pronajmout?                                         │
│  Vyplatí se investiční byt?                                       │
│                                                                    │
│  © 2026 kamspenezi.cz | Právní upozornění                        │
└──────────────────────────────────────────────────────────────────┘
```

- 4 sloupce na desktopu (Kalkulacky, Metodika, Projekt, Clanky)
- Na mobile: 1 sloupec, sbalitelny (accordion) nebo plny seznam
- Paticka je JEDINE misto kde se SEO clanky linkuji z globalni navigace
- SEO clanky se NIKDY nedostavaji do hlavniho menu ani hamburger menu

### Jak se uzivatel dostane na jednotlive stranky

| Stranka | Primarni discovery | Sekundarni discovery |
|---------|-------------------|---------------------|
| / | Hlavni menu "Bydleni", logo click | Google organic |
| /investice | Hlavni menu "Investice" | Google organic, crosslink z / |
| /metodika/bydleni | Link z vysledkove karty na /, tooltip (i) ikony | Hamburger menu (mobile), paticka |
| /metodika/investice | Link z vysledkove karty na /investice, tooltip (i) | Hamburger menu (mobile), paticka |
| /o-projektu | Hlavni menu "O projektu" | Paticka |
| /koupit-nebo-pronajmout | Google organic (SEO), paticka | Nikdy z hlavniho menu |
| /vyplati-se-investicni-byt | Google organic (SEO), paticka | Nikdy z hlavniho menu |

### Navigace z kalkulacek (kriticke user flows)

Na obou kalkulackach existuji tyto navigacni body:

1. **Vysledkova karta** -- link "Metodika a zdroje" dole pod vysledky --> /metodika/bydleni resp. /metodika/investice
2. **Tooltip (i) ikony** na klicovych parametrech --> /metodika/bydleni#anchor resp. /metodika/investice#anchor (deep link na konkretni parametr)
3. **Paticka** -- standardni (viz vyse)

Uzivatel z kalkulacky NIKDY neodchazi na SEO clanky. SEO clanky odkazuji DO kalkulacek, ne naopak.

---

## PRIORITA IMPLEMENTACE

**Pred kontaktovanim novinaru (MUST HAVE):**
1. `/metodika/bydleni` -- novinar chce overit, ze kalkulacka neni bullshit
2. `/metodika/investice` -- ditto pro druhou kalkulacku
3. `/o-projektu` -- novinar chce vedet, kdo za tim stoji a proc

**Druha vlna (1 tyden po spusteni):**
4. `/koupit-nebo-pronajmout` -- SEO kotva, zachyti organicky provoz
5. `/vyplati-se-investicni-byt` -- SEO kotva pro druhou kalkulacku

**Treti vlna (prubezne):**
6. OG obrazky (typograficke karty, ne stock fotky)
7. FAQ schema markup na SEO clancich
8. Video explainer (45s per kalkulacka)

---
---

## STRANKA 1: Kalkulacka bydleni (`/`)

**Stav:** EXISTUJE. Zadne strukturalni zmeny v ramci tohoto planu.

**Meta title:** `Být ve vlastním, nebo v nájmu? Kalkulačka čistého jmění | kamspenezi.cz`
**Meta description:** `Nestačí porovnat splátku s nájmem. Spočítejte čisté jmění po 30 letech — s hypotékou i bez ní. Předvyplněné hodnoty pro 13 českých měst.`

---

## STRANKA 2: Kalkulacka investice (`/investice`)

**Stav:** EXISTUJE. Zadne strukturalni zmeny v ramci tohoto planu.

**Meta title:** `Investiční byt vs. akciový fond: kalkulačka čistého jmění | kamspenezi.cz`
**Meta description:** `Výnosové procento neřekne vše. Porovnejte investiční byt s ETF alternativou — s daňovým modelem, odpisy a vedlejším fondem. Pro 13 českých měst.`

---
---

## STRANKA 3: Metodika bydleni (`/metodika/bydleni`)

**Stav:** NOVA STRANKA. Klicova pro duveryhodnost.

**Meta title:** `Jak funguje kalkulačka bydlení: metodika a zdroje | kamspenezi.cz`
**Meta description:** `28 zdrojů, veřejný spreadsheet, kompletní výpočet. Ověřte si kalkulačku sami.`

### Proc tato stranka existuje

Novinar nebo financne gramotny uzivatel klikne na "Metodika" proto, ze chce overit, jestli je kalkulacka duveryhodna. Tato stranka musi tuto otazku zodpovedet behem prvnich 10 sekund.

### Jak se sem uzivatel dostane

- Z vysledkove karty na / (link "Metodika a zdroje")
- Z tooltip (i) ikon na parametrech v kalkulacce (deep link na #anchor)
- Z hamburger menu na mobile
- Z paticky

### Sekce a jejich ucel

**SEKCE 1: Overte si vypocet** (hero pozice, uplne nahore)

Ucel: Okamzity dukaz transparentnosti. Zadny text pred timhle.
Obsah:
- 1-2 vety: "Kompletni vypocet je verejne dostupny v Google Sheet. Muzete overit jakykoliv vysledek."
- [CTA tlacitko: Otevrit spreadsheet] --> link na Google Sheet, zalozka Bydleni
- URL sheetu: https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=1260855363#gid=1260855363

Toto je jedina vec, kterou novinar potrebuje videt. Vsechno ostatni je kontext.


**SEKCE 2: Jak kalkulacka pocita** (~300 slov)

Ucel: Vysvetlit model v proste cestine. Zadne vzorce, zadny kod.
Obsah:
- Pruchod konkretnim prikladem Praha 2+kk
- Scenar A (Vlastni bydleni): krok za krokem
  - Rok 0: zalozite vlastni zdroje (10-20 % kupni ceny) + zarizeni nemovitosti
  - Kazdy rok: splatka hypoteky + fond oprav + pojisteni + dan z nemovitosti + udrzba
  - Danova uleva: odecet zaplacenych uroku z hypoteky od zakladu dane (§15 ZDP, max 150 000 Kc/rok)
  - Pokud je najem levnejsi nez celkove naklady bydleni --> rozdil investujete do vedlejsiho fondu (ETF)
  - Po 30 letech: hodnota nemovitosti + vedlejsi fond
- Scenar B (Najem + investovani): krok za krokem
  - Rok 0: castku rovnou vlastnim zdrojum + zarizeni investujete do ETF
  - Kazdy rok: platite najem. Pokud je najem levnejsi nez celkove naklady bydleni, uz investujete od zacatku. Pokud je najem drazsi, rozdil musi jit z portfolia.
  - KLICOVE: Pokud jsou celkove naklady bydleni nizsi nez najem, scenar B investuje rozdil. Pokud jsou vyssi, scenar A investuje rozdil. Nikdy se nevybira z investicniho portfolia.
  - Po 30 letech: hodnota ETF portfolia
- Vysvetleni vedlejsiho fondu: "Oba scenare investuji prebytkove penize. Kalkulacka nikdy nenechava penize lezet."

Dulezite: Zduraznit symetricky pristup (oba scenare investuji prebytek). Toto je hlavni diferenciator od ostatnich kalkulacek.


**SEKCE 3: Co kalkulacka zahrnuje**

Ucel: Ukazat rozsah modelu. Toto je competitive advantage, protoze vetsina ceskych kalkulacek to nema.
Format: Kratky odstavec s bullety, ne tabulka.
Obsah:
- Hypoteka na 30 let s 5letou fixaci a naslednym refinancovanim
- Prijem od rodicu na koupi nemovitosti (zvyhodnuje pouze scenar kupe)
- Danovy odpocet uroku z hypoteky (§15 ZDP, max 150 000 Kc/rok, sazba 15 % nebo 23 %)
- Fond oprav (SVJ), pojisteni nemovitosti, dan z nemovitosti, naklady na udrzbu
- Inflacni naruseni nakladu (dan z nemovitosti, fond oprav, pojisteni, udrzba rostou s inflaci)
- Rust najemneho a zhodnoceni nemovitosti (per-city defaults na zaklade vyzkumu)
- Vedlejsi fond (prebytkove penize z obou scenaru se investuji do ETF)
- Vsechny vypocty na rocni bazi, nominalni hodnoty


**SEKCE 4: Co kalkulacka nezahrnuje**

Ucel: Cesta uprimnost buduje duveru. Ukazat, ze vite, co model nevychytava.
Obsah:
- Transakcni naklady koupe (pravni sluzby, provize, posudek)
- Transakcni naklady prodeje po 30 letech
- Riziko nesplaceni hypoteky
- Dan z prijmu z prodeje nemovitosti (pozn.: po 10 letech vlastnictvi osvobozeno)
- Naklady na stehovani a hledani nemovitosti
- Psychologicka hodnota vlastnictvi vs. flexibilita najmu
- Naklady na rekonstrukci pred nastehovanim (nad ramec zarizeni)


**SEKCE 5: Predvyplnene hodnoty a jejich zdroje**

Ucel: Toto je jadro duveryhodnosti. Ukazat, ze kazda predvyplnena hodnota ma zdroj.
Format: Interaktivni tabulka nebo accordion per parametr.

Obsah -- kazdy parametr ma:
- Nazev parametru
- Defaultni hodnota (priklad pro Praha 2+kk)
- Vzorec / logika
- Zdroj(e) s URL a datem
- Poznamka / kontext

Parametry k zobrazeni:

| # | Parametr | Default Praha 2+kk | Zdroj | Stav |
|---|----------|---------------------|-------|------|
| 1 | Kupni cena | 8 100 000 Kc | CBA Monitor Q3 2025 (transakcni ceny, ne nabidkove) | DERIVED |
| 2 | Vymera bytu | 54 m2 | Sreality.cz API, median z 481 inzeratu | VERIFIED |
| 3 | Mesicni najemne | 25 500 Kc | Global Property Guide (CSU-referenced) + Sreality rent multipliers | DERIVED |
| 4 | Urokova sazba hypoteky (fixace) | 4,9 % | Swiss Life Hypoindex, prosinec 2025 | VERIFIED |
| 5 | Urokova sazba po fixaci | 4,5 % | CNB Prognoza Podzim 2025, equilibrium PRIBOR + spread | DERIVED |
| 6 | Rust hodnoty nemovitosti | 4,0 % | CSU HPI 2015-2025, CBA Monitor, CNB analyza, akademicky vyzkum (Jorda 2024) | VERIFIED |
| 7 | Rust najemneho | 3,5 % | OECD Rent Price Index 10yr CAGR 3,8 %, Deloitte Rent Index Q3 2025 | VERIFIED |
| 8 | Ocekavany vynos ETF | 7,0 % | Goldman Sachs Global Outlook 2024, Vanguard Capital Market Assumptions | VERIFIED |
| 9 | Inflace | 2,5 % | CNB Prognoza Podzim 2025 | VERIFIED |
| 10 | Fond oprav | 1 200 Kc/mesic | 22 Kc/m2, SVJ PREDSEDA + RE/MAX benchmark | DERIVED |
| 11 | Pojisteni nemovitosti | 1 100 Kc/rok | 20 Kc/m2/rok, Srovnavac.cz | DERIVED |
| 12 | Dan z nemovitosti | 1 600 Kc/rok | Zakon 338/1992 Sb., koeficienty MFCR | DERIVED |
| 13 | Naklady na udrzbu | 20 000 Kc/rok | CenikyRemesel.cz + CSU mzdy v krajich | DERIVED |
| 14 | Zarizeni nemovitosti | 120 000 Kc | IKEA CZ katalog, standard tier, per dispozice | DERIVED |
| 15 | Sazba dane z prijmu | 15 % | Zakon o dani z prijmu (23 % nad 48x prumerna mzda ~2,23 mil. Kc/rok) | -- |

Pod tabulkou:
- Celkem 28+ zdrojovych datasetu
- Data za 13 krajskych mest x 4 dispozice = 52 kompletnich sad
- Kazda hodnota ma kvalitativni flag: VERIFIED (primo ze zdroje), DERIVED (dopocitana ze zdroju), PLACEHOLDER (odhad)
- Zdroje: CNB, CSU, CBA Monitor, Swiss Life Hypoindex, OECD, Deloitte, Goldman Sachs, Vanguard, akademicky vyzkum

Dulezite: Tato sekce NENI nudny seznam. Je to vizualni dukaz, ze za kalkulackou stoji stovky hodin vyzkumu. Kazdy radek tabulky krica "toto neni nahodne cislo, toto ma zdroj."


**SEKCE 6: Predpoklady rustu (proc konzervativni?)**

Ucel: Vysvetlit proc jsou defaultni procenta rustu nizsi nez nedavna historie. Toto je otazka, kterou si polozi kazdy financne gramotny clovek.
Obsah (~200 slov):
- Nedavny 10lety CAGR cen nemovitosti: 9,2 % (CSU HPI). Nas default: 4 % pro Prahu. Proc?
- 30lety horizont vyzaduje konzervativni odhad: boom 2020-2022 se neopakuje kazdych 10 let
- CNB v roce 2018 varovalo o 10-15 % nadhodnoceni, od te doby ceny vzrostly o dalsich 50 %
- Akademicky vyzkum (Jorda 2024): dlouhodobe realne vynosy nemovitosti 0-1 % nad inflaci
- Europsky benchmark (AEW 2025): 3,5 % rocni zhodnoceni rezidencnich nemovitosti
- Vzorec: inflace (2,5 %) + realne zhodnoceni (0-1,5 %) + mestska premie (0-0,5 %)
- Riziko podhodnoty: Monte Carlo mod v kalkulacce modeluje nejistotu (P10 az P90 scenare)
- "Radeji podcenime rust a prijemne vas prekvapime, nez abychom nadhodnotili a vy udelali spatne rozhodnuti."


**SEKCE 7: Pravni upozorneni**

Ucel: Standardni disclaimer.
Obsah: "Kalkulacka slouzi pouze pro informacni a vzdelavaci ucely. Nepredstavuje financni poradenstvi. Pred jakymkoli financnim rozhodnutim doporucujeme konzultaci s kvalifikovanym financnim poradcem."

CTA: [Otevrit kalkulacku bydleni --> /]

---
---

## STRANKA 4: Metodika investice (`/metodika/investice`)

**Stav:** NOVA STRANKA.

**Meta title:** `Jak funguje kalkulačka investice: metodika a zdroje | kamspenezi.cz`
**Meta description:** `Investiční byt vs. akciový fond: kompletní výpočet, daňový model s reálnými výdaji a odpisy, veřejný spreadsheet.`

### Jak se sem uzivatel dostane

- Z vysledkove karty na /investice (link "Metodika a zdroje")
- Z tooltip (i) ikon na parametrech v kalkulacce (deep link na #anchor)
- Z hamburger menu na mobile
- Z paticky

### Sekce a jejich ucel

**SEKCE 1: Overte si vypocet** (hero pozice)

Obsah:
- 1-2 vety + CTA na Google Sheet
- URL sheetu: https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=275768974#gid=275768974


**SEKCE 2: Proc ne vynosove procento?** (~150 slov)

Ucel: Okamzite vysvetlit, proc kalkulacka nemerí vynosove procento, ale ciste jmeni po 30 letech. Toto je otazka, kterou si polozi kazdy, kdo zna termin "vynosove procento."
Obsah:
- Vynosove procento (rocni najem / kupni cena) je jednorocni metrika. Neporovnava s alternativou.
- Hrube vynosove procento v Praze: 3,5-4,3 %. Ale to ignoruje: neobsazenost, dane, odpisy, udrzbu, pojisteni, fond oprav.
- I ciste vynosove procento ignoruje alternativni naklad: co kdybyste ten kapital investovali jinam?
- Tato kalkulacka meri ciste jmeni po 30 letech: hodnota nemovitosti + vedlejsi fond vs. ETF portfolio.
- To je fundamentalne jina (a uzitecnejsi) otazka nez "jake je moje vynosove procento."


**SEKCE 3: Jak kalkulacka pocita** (~400 slov)

Ucel: Vysvetlit model investicniho bytu vs. ETF. Slozitejsi nez Bydleni, protoze zahrnuje danovy model.
Obsah:
- Pruchod prikladem Praha 2+kk investicni byt
- Scenar A (Investicni byt):
  - Rok 0: vlastni zdroje (min 20-30 %) + zarizeni bytu k pronajmu
  - Kazdy rok: prijem z najmu (x obsazenost) minus vsechny naklady
  - Naklady: splatka hypoteky, fond oprav, pojisteni, dan z nemovitosti, udrzba
  - Daneni prijmu z najmu: skutecne vydaje (§9 ZDP)
    - Do vydaju se pocitaji: dan z nemovitosti, fond oprav, pojisteni, zaplacene uroky hypoteky, odpisy
    - Odpisy nemovitosti: skupina 5, 30 let (1,4 % prvni rok, 3,4 % dalsi roky), 90 % hodnoty (pozemek 10 % se neodpisuje)
    - Pokud je zaklad dane zaporny: uplatneni ztraty do nasledujicich 5 let (§34 ZDP)
  - Kladny cashflow --> vedlejsi fond (ETF)
  - Po 30 letech: hodnota nemovitosti + vedlejsi fond
- Scenar B (ETF portfolio):
  - Rok 0: investujete castku rovnou pocatecni investici ze scenare A
  - SYMETRICKE zachazeni: v letech, kdy by scenar A mel zaporny cashflow (naklady > najem), scenar B pridava stejnou castku do portfolia. V letech, kdy scenar A generuje kladny cashflow, scenar B nepridava nic.
  - Po 30 letech: hodnota ETF portfolia
- Vysvetleni vedlejsiho fondu: "Nikdy se nevybira z investicniho portfolia. Oba scenare investuji prebytek."


**SEKCE 4: Danovy model podrobne**

Ucel: Toto je sekce, kterou financne gramotni lide budou zkoumat pod lupou. Musi byt presna.
Obsah:
- Skutecne vydaje (ne pausalni): dan z nemovitosti + fond oprav + pojisteni + uroky hypoteky + odpisy
- Odpisy: Zakon o danich z prijmu, skupina 5, 30 let
  - Prvni rok: 1,4 % z 90 % kupni ceny
  - Roky 2-30: 3,4 % z 90 % kupni ceny
  - Pozemek (10 % odhad z kupni ceny) se neodpisuje
- Zaporny zaklad dane: uplatneni do nasledujicich 5 let (§34 ZDP)
- Sazba dane: 15 % default (23 % pro vysoke prijmy nad 48x prumerne mesicni mzdy)
- Priklad: Praha 2+kk, prvni rok: prijem z najmu X Kc, skutecne vydaje Y Kc, odpis Z Kc --> zaklad dane, dan

Dulezite: Vsechny odkazy na zakony (§9, §15, §34 ZDP, Zakon 338/1992 Sb.)


**SEKCE 5: Co kalkulacka zahrnuje**

Obsah (v cem je model kompletni):
- Kompletni danovy model s realnymi vydaji a odpisy
- 5lety carry-forward danovych ztrat
- Per-city obsazenost bytu (87-95 % podle mesta, ne plostina 90 %)
- Vedlejsi fond pro oba scenare
- Inflacni naruseni nakladu
- 5leta fixace + refinancovani hypoteky
- Prijem od rodicu na koupi nemovitosti


**SEKCE 6: Co kalkulacka nezahrnuje**

Obsah:
- Casove naklady na spravu najemnika (hledani, komunikace, reseni problemu)
- Pravni naklady pri problemech s najmenikem
- Mimoradne opravy (nova strecha, vytah -- toto je SVJ, ne vlastnik)
- Dan z prodeje nemovitosti (po 10 letech osvobozeno)
- Naklady na spravcovskou firmu
- Regulace najemneho (pokud by byla zavedena)
- Transakcni naklady koupe/prodeje


**SEKCE 7: Predvyplnene hodnoty**

Stejna struktura jako Bydleni (sekce 5), PLUS:
- Obsazenost bytu: per-city (Praha 95 %, Brno 94 %, az Usti 87 %)
  - Zdroje: Investropa 2026, Deloitte Rent Index Q3 2025, CSU Scitani 2021
  - Poznamka: aktualni trh je mimoradne napjaty (2-4 % neobsazenost Praha). Nase hodnoty jsou konzervativni pro 30lety horizont.
- Danova sazba: 15 % (23 % volitelne)


**SEKCE 8: Pravni upozorneni**

Stejny text jako Bydleni metodika.
CTA: [Otevrit kalkulacku investice --> /investice]

---
---

## STRANKA 5: O projektu (`/o-projektu`)

**Stav:** NOVA STRANKA. Klicova pro novinarskou duveryhodnost.

**Meta title:** `O projektu | kamspenezi.cz`
**Meta description:** `Kdo stojí za kamspenezi.cz, proč projekt vznikl a proč je nezávislý.`

### Proc tato stranka existuje

Novinar si otevre kalkulacku, rekne "zajimave" a pak hned hleda: kdo to udelal, proc, a jestli za tim stoji nejaka banka nebo realitka. Tato stranka musi odpovedet na vsechny tri otazky behem 15 sekund.

### Jak se sem uzivatel dostane

- Hlavni menu "O projektu" (desktop i mobile)
- Paticka

### Sekce

**SEKCE 1: Fotka + bio** (hero pozice)

Ucel: Okamzite ukazat realnou osobu.
Obsah:
- Headshot fotka (ne korporatni, ne stock)
- Jmeno: Michal Humaj
- LinkedIn: https://www.linkedin.com/in/michal-humaj/
- 2-3 vety: proc jsem to vytvoril (osobni pribeh = duveryhodnost)
- Ton: "Resil jsem stejnou otazku jako vy. Nenasel jsem nezavisly nastroj. Tak jsem ho vytvoril."


**SEKCE 2: Proc projekt existuje** (~150 slov)

Ucel: Artikulovat mezeru na trhu.
Obsah:
- Kazda ceska kalkulacka porovna splatku hypoteky s najemem. To je chybne.
- Kamspenezi.cz pocita s tim, co byste vydelali, kdybyste zalohu a mesicni prebytek investovali.
- Obe kalkulacky pocitaji s vedlejsim fondem: prebytkove penize se vzdy investuji.
- Toto neni "najem je lepsi" ani "kupte si byt" kalkulacka. Je to fer srovnani.
- DULEZITE: Zduraznit, ze kalkulacka pouziva konzervativni odhady (viz metodika).


**SEKCE 3: Nezavislost** (~100 slov)

Ucel: Toto je odstavec, ktery novinari budou citovat. Kazde slovo se pocita.
Obsah:
- Neni spojen s zadnou bankou, realitni kancelari, investicni platformou ani poradenskou firmou
- Zadne provize za zprostredkovani hypotek
- Zadne leady
- Zadne financni produkty
- Zdarma, bez reklam
- Zdrojovy kod kalkulacky a kompletni spreadsheet jsou verejne dostupne


**SEKCE 4: Data a zdroje (summary)** (~100 slov)

Ucel: Impresivni cisla ktera komunikuji "toto je seriozni projekt, ne vikendovy hackathon."
Obsah:
- 28+ zdrojovych datasetu (CNB, CSU, CBA Monitor, OECD, Deloitte, Goldman Sachs, Vanguard, akademicky vyzkum)
- 13 krajskych mest x 4 dispozice = 52 kompletnich sad predvyplnenych hodnot
- Kazda hodnota ma kvalitativni flag (VERIFIED / DERIVED / PLACEHOLDER)
- 23 000+ slov vyzkumne dokumentace k rustovym sazbam
- Kompletni vypocet verejne dostupny v Google Sheet
- [Odkaz: Metodika Bydleni] | [Odkaz: Metodika Investice]


**SEKCE 5: Psali o nas** (pripravena sekce)

Ucel: Social proof. Zacina prazdna, postupne se plni.
Obsah:
- Zacina prazdna nebo s textem "Kalkulacka byla spustena v [mesic] 2026."
- Po prvni zminke: logo media + kratky citat + odkaz
- Po 3+ zminkach: tato sekce se stava klicovym social proof elementem
- Format: Logo | "Citat z clanku" | Odkaz


**SEKCE 6: Kontakt**

Obsah:
- Email: michal.humaj@gmail.com
- LinkedIn: https://www.linkedin.com/in/michal-humaj/
- "Mate dotaz, zpetnou vazbu, nebo chcete o kalkulacce napsat? Napiste mi na michal.humaj@gmail.com."
- Ton: pristupny, ne korporatni
- Zadny kontaktni formular. Prosty email.


**SEKCE 7: Pravni upozorneni**

Obsah:
- Standardni disclaimer (slouzi pro informacni a vzdelavaci ucely, neni financni poradenstvi)
- Toto pravni upozorneni se zobrazuje take:
  - Na spodku vysledkove karty obou kalkulacek (kratsi verze)
  - Na obou strankach Metodiky

---
---

## STRANKA 6: Koupit, nebo pronajmout? (`/koupit-nebo-pronajmout`)

**Stav:** NOVA STRANKA. SEO clanek. Neni v hlavni navigaci.

**Meta title:** `Být ve vlastním, nebo v nájmu? Co se vyplatí v roce 2026`
**Meta description:** `Proč porovnání splátky hypotéky a nájmu nestačí. Kalkulačka, která počítá i s investováním ušetřených peněz do akciového fondu.`

**Cilova klicova slova:** koupit nebo pronajmout byt, hypoteka vs najem, vyplati se koupit byt 2026, koupit byt Praha kalkulacka, najem vs hypoteka kalkulacka

### Ucel stranky

Zachytit organicky provoz od lidi, kteri googli "koupit nebo pronajmout byt". Clanek musi:
1. Okamzite ukazat, ze zna odpoved ("zavisi to na...")
2. Vysvetlit proc je tento pristup lepsi nez "splatka vs. najem"
3. Presvedcit ctenare, ze si musi spocitat SVOJI situaci
4. Dostat ho do kalkulacky

### Jak se sem uzivatel dostane

- Google organic (primarni kanal -- toto je SEO stranka)
- Paticka (sekce "Clanky")
- NIKDY z hlavniho menu nebo hamburger menu

### Mytus framework

Clanek je postaven kolem demontaze 4 ceskych mytu o bydleni. Kazdy mytus je pojmenovany subsekce ktera Google muze indexovat samostatne.

### Sekce

**SEKCE 1: Proc vetsina srovnani nefunguje** (~200 slov)

Ucel: Otevrit utokem na konvencni moudrost. Hook.
Obsah:
- Vetsina kalkulacek a clanku porovnava mesicni splatku s najemem. To je chybne.
- Ignoruji: alternativni naklad zalohy, mesicni prebytek, slozene uroceni pres 30 let
- Priklad: "Pokud je vas najem 20 000 a hypoteka 35 000, mate 15 000 mesicne navic. Za 30 let pri 7% vynosu je to X milionu."
- Diferenciator: kamspenezi.cz pocita s obema cestami fer


**SEKCE 2: Ctyri myty, ktere ovlivnuji vase rozhodnuti** (~600 slov)

Ucel: SEO magnet + edukacni jadro clanku. Kazdy mytus = samostatny H3 anchor.

**Mytus 1: "Najem je vyhazovani penez"** (#mytus-najem-vyhazovani)
- 86 % Cechu veri, ze nemovitost je nejlepsi investice (Air Bank/Ipsos pruzkum)
- Ale: pokud investujete rozdil mezi najemem a splatkou, po 30 letech mate portfolio
- Otazka neni "platis najem?" ale "co delas s penezi, ktere ti zbydou?"
- Kalkulacka to pocita: oba scenare investuji prebytek
- [UPDATE: pruzkum, frekvence rocni]

**Mytus 2: "Splatka hypoteky = naklady na bydleni"** (#mytus-splatka-naklady)
- David Eim (citovany v Seznam Zpravy, Srovnejto): "Nelze porovnavat splatku s najemem. Splatka obsahuje jistinu, ktera je sporeni."
- Skutecne naklady bydleni: uroky hypoteky + fond oprav + pojisteni + dan z nemovitosti + udrzba + alternativni naklad zalohy
- V Praze 2+kk: splatka 38 700 Kc, ale skutecne naklady nad najem jsou jine cislo
- Kalkulacka toto rozlisuje automaticky
- [UPDATE: priklad splatka, frekvence pri zmene Hypoindex]

**Mytus 3: "Ceny nemovitosti nikdy neklesnou"** (#mytus-ceny-neklesnou)
- 2008-2009: pokles 18,1 % u bytu (Finance.cz)
- 2022-2023: pokles 5,8 % YoY (CSU HPI)
- CNB 2018: 10-15 % nadhodnoceni. Od te doby ceny +50 %, prijmy +20 %.
- Nase kalkulacka pouziva konzervativni 3-4 % rocni rust (ne 9,2 % z posledni dekady)
- Monte Carlo mod ukazuje i scenare s poklesem
- [UPDATE: CSU HPI data, frekvence ctvrtletne]

**Mytus 4: "Nemovitost je bezpecna investice, akcie jsou hazard"** (#mytus-nemovitost-bezpecna)
- 77 % Cechu se boji ztraty pri investovani (Air Bank pruzkum)
- Ale: globalni diverzifikovane akciove portfolio nikdy neztratilo hodnotu za jakykoliv 20+ lety obdobi historicky
- Nemovitost neni diverzifikovana: je to jeden byt v jednom meste. To je koncentrovane riziko.
- Kalkulacka porovnava oba scenare transparentne, bez predsudzeni
- [UPDATE: pruzkum, frekvence rocni]


**SEKCE 3: Co skutecne rozhoduje** (~200 slov)

Ucel: Edukace. Ukazat ze odpoved neni univerzalni.
Obsah:
- 4 klicove promenne:
  1. Pomer kupni ceny a najmu ve vasem meste (price-to-rent ratio)
  2. Urokova sazba hypoteky
  3. Ocekavany vynos akcioveho fondu
  4. Ocekavane zhodnoceni nemovitosti
- Strucne, bez matematiky
- Cil: uzivatel pochopi, ze musi zadat SVE cisla, ne obecne prumery


**SEKCE 4: Cesky trh v roce 2026** (~200 slov)

Ucel: Aktualni data ktera Google odmeni (fresh content signal). Aktualizovat ctvrtletne.
Obsah:
- Prumerna urokova sazba hypotek: 4,9 % (Hypoindex, prosinec 2025) [UPDATE: Hypoindex, ctvrtletne]
- Rust cen nemovitosti v 2025: +10-19 % YoY podle mesta (CBA Monitor Q3 2025) [UPDATE: CBA Monitor, ctvrtletne]
- Rust najmu: +3,1 % YoY celonarodne (Deloitte Q3 2025), Brno +7,8 % [UPDATE: Deloitte Rent Index, ctvrtletne]
- Co to znamena: vyssi ceny = horsi pomer price-to-rent = vetsi prostor pro najem + investovani
- KAZDY UDAJ MUSI MIT ZDROJ


**SEKCE 5: Spoctete si to sami** (~100 slov)

Ucel: CTA do kalkulacky.
Obsah:
- "Zadejte parametry bytu, ktery zvazujete."
- Zduraznit: kalkulacka ma predvyplnene hodnoty pro 13 mest a 4 dispozice
- [CTA tlacitko: Otevrit kalkulacku bydleni --> /]


**SEKCE 6: Caste otazky** (~300 slov, FAQ schema markup)

Ucel: SEO (FAQ rich snippets) + zachyceni "People Also Ask" dotazu.
Otazky:
- Kdy se vyplati koupit byt? (2-3 vety + CTA)
- Je lepsi hypoteka, nebo najem? (2-3 vety, odkaz na Mytus 2)
- Proc kalkulacka pocita s investovanim do akcioveho fondu? (obhajoba metodiky)
- Je pravda, ze najem je vyhazovani penez? (odkaz na Mytus 1)
- Kolik procent lidi v Cesku bydli ve vlastnim? (data + kontext)
- Jak se pocita ciste jmeni v kalkulacce? (odkaz na /metodika/bydleni)

Kazda odpoved: 2-3 vety + odkaz na kalkulacku nebo metodiku.

---
---

## STRANKA 7: Vyplati se investicni byt? (`/vyplati-se-investicni-byt`)

**Stav:** NOVA STRANKA. SEO clanek. Neni v hlavni navigaci.

**Meta title:** `Investiční byt v roce 2026: Vyplatí se víc než akciový fond?`
**Meta description:** `Výnosové procento 4 % zní dobře, dokud nepočítáte s neobsazeností, opravami a daněmi. Kalkulačka, která porovná investiční byt s alternativou.`

**Cilova klicova slova:** investicni byt 2026, vynosove procento investicni byt, investicni byt vs ETF, vyplati se investicni byt na hypoteku, investice do nemovitosti kalkulacka

### Ucel stranky

Zachytit organicky provoz od lidi, kteri googli "vyplati se investicni byt". Tito lide jsou financne gramotnejsi nez publikum stranky bydleni. Clanek musi byt ostrejsi a technictejsi.

### Jak se sem uzivatel dostane

- Google organic (primarni kanal)
- Paticka (sekce "Clanky")
- NIKDY z hlavniho menu nebo hamburger menu

### Mytus framework

Clanek je postaven kolem demontaze 3 investicnich mytu. Technictejsi nez clanek o bydleni.

### Sekce

**SEKCE 1: Tri duvody, proc vynosove procento nestaci** (~250 slov)

Ucel: Kontroverzni otevirak ktery zastavi scrollovani. Systematicka demontaz vynosoveho procenta.

**Problem 1: Hrube vynosove procento ignoruje polovinu nakladu**
- Hrube vynosove procento v Praze: 3,5-4,3 % (rocni najem / kupni cena)
- Nezahrnuje: neobsazenost (5-13 % podle mesta), dan z prijmu, odpisy, udrzbu, pojisteni, fond oprav
- Po odecteni nakladu: skutecne ciste vynosove procento je vyrazne nizsi

**Problem 2: I ciste vynosove procento ignoruje alternativni naklad**
- 4 % cisteho vynosu z nemovitosti za 5 mil. Kc
- Stejnych 1 mil. Kc (zaloha) v globalnim akciovem fondu pri 7 % = X Kc za 30 let
- Zadna ceska kalkulacka vynosoveho procenta tuto otazku nepolozila

**Problem 3: Je to jednorocni snapshot, ne 30lety model**
- Vynosove procento v roce 1 nerika nic o cistem jmeni v roce 30
- Nezohlednuje: amortizaci hypoteky, rust najmu, zhodnoceni nemovitosti, danove ztraty, vedlejsi fond
- "Vynosove procento je jako merit teplotu v pondeli a tvrdit, ze vite jake bude pocasi cely rok"


**SEKCE 2: Co vetsina investoru neporovnava** (~200 slov)

Ucel: Vysvetlit alternativu a vedlejsi fond.
Obsah:
- Alternativa: stejny kapital do globalniho akcioveho fondu
- Vysvetleni konceptu vedlejsiho fondu
- "Kalkulacka porovnava celkovy vysledek: nemovitost + vedlejsi fond vs. ciste ETF portfolio"
- Proc je toto fer srovnani: oba scenare pracuji se stejnym pocatecnim kapitalem a stejnymi casovymi investicemi


**SEKCE 3: Tri investicni myty, kterym Cesi veri** (~500 slov)

Ucel: SEO magnet. Kazdy mytus = samostatny H3 anchor.

**Mytus 5: "Nemovitost je nejlepsi investice"** (#mytus-nemovitost-nejlepsi)
- 86 % Cechu veri, ze nemovitost je nejlepsi investice (Air Bank/Ipsos)
- Hrube vynosove procento v premiovych lokalitach: 3,5 %. Inflace: 2,1 %. Realny vynos: ~1,4 %.
- Akademicky vyzkum (Jorda 2024): dlouhodobe realne vynosy nemovitosti 0-1 % nad inflaci
- Globalni akcie (MSCI World) historicky: 7-9 % nominalne
- "Nemovitost muze byt dobra investice. Ale 'nejlepsi' je empiricky nepodlozene tvrzeni."
- [UPDATE: pruzkum, frekvence rocni]

**Mytus 6: "Nemovitost je ochrana proti inflaci"** (#mytus-inflace)
- Casto opakovany argument: "nemovitost je nejlepsi ochrana proti inflaci"
- IPF Research (2024, UK): nemovitost je "reasonably good" inflacni hedge, ale ne "perfect"
- Jorda 2024: realne vynosy 0-1 %, coz je cela ochrana
- Problem: koncentrovane riziko (jeden byt, jedno mesto) vs. diverzifikovany akciovy fond
- Kalkulacka ukazuje oba scenare v nominalních hodnotach, takze inflacni efekt je videt primo
- [UPDATE: inflacni data, frekvence rocni]

**Mytus 7: "Investicni byt = pasivni prijem"** (#mytus-pasivni-prijem)
- Realita: spravu bytu budete resit 2-5 hodin mesicne (hledani najemniku, opravy, komunikace, ucetnictvi)
- Naklady na spravcovskou firmu: 6-10 % mesicniho najmu + 1 mesicni najem za nalezeni najemnika
- Problemovi najemnici, pravni spory, neplaceni najmu: rizika ktera ETF nema
- Kalkulacka toto nezahrnuje (casove naklady), coz znamena ze investicni byt je v realite jeste mene vyhodny nez kalkulacka ukazuje
- [UPDATE: spravcovske poplatky, frekvence rocni]


**SEKCE 4: Danovy model investicniho bytu** (~200 slov)

Ucel: Technicka sekce pro financne gramotne ctenare. Diferenciator.
Obsah:
- Kalkulacka pouziva skutecne vydaje (ne pausalni)
- Vydaje: dan z nemovitosti + fond oprav + pojisteni + uroky hypoteky + odpisy
- Odpisy: skupina 5, 30 let, 90 % kupni ceny (pozemek 10 %)
- Zaporny zaklad dane --> uplatneni do 5 let (§34 ZDP)
- "Zadna jina ceska kalkulacka toto nepocita. Zadna jina ceska kalkulacka porovnava celkove ciste jmeni investicniho bytu s alternativni investici do akcii."


**SEKCE 5: Co se meni pro investory v roce 2026** (~200 slov)

Ucel: Aktualni, citovatelny obsah. Fresh content pro Google + material pro novináře.
Obsah:
- Pozadavek 20-30 % vlastniho kapitalu na investicni nemovitost (CNB doporuceni/regulace) [UPDATE: CNB, rocni]
- DSTI limity [UPDATE: CNB, rocni]
- Vyssi urokove sazby nez v obdobi 2020-2022 [UPDATE: Hypoindex, ctvrtletne]
- Prakticky dopad: vyssi vstupni bariera, nizsi pakovy efekt
- Zdroje ke kazdemu bodu


**SEKCE 6: Spoctete si to sami** (~100 slov)

CTA: [Spocitat investici --> /investice]


**SEKCE 7: Caste otazky** (~300 slov, FAQ schema markup)

Otazky:
- Jake je realne vynosove procento investicniho bytu v Praze? (odkaz na Sekce 1)
- Vyplati se investicni byt na hypoteku? (zavisi na parametrech + CTA)
- Kolik vlastniho kapitalu potrebuji na investicni byt v roce 2026? (aktualni regulace)
- Co je lepsi: investicni byt, nebo akciovy fond? (zavisi + CTA)
- Co je vedlejsi fond v kalkulacce? (vysvetleni + odkaz na /metodika/investice)
- Jak se dani prijem z najmu investicniho bytu? (skutecne vydaje + odpisy + odkaz na /metodika/investice#dane)
- Je nemovitost ochrana proti inflaci? (odkaz na Mytus 6)

---
---

## MYTUS FRAMEWORK -- SOUHRN

7 pojmenovanych mytu rozlozenych pres 2 SEO clanky. Kazdy mytus ma vlastni HTML anchor pro deep linking a potencialni indexovani Googlem.

### /koupit-nebo-pronajmout (4 myty o bydleni)

| # | Mytus | Anchor | Zdroj pro debunk |
|---|-------|--------|-----------------|
| 1 | "Najem je vyhazovani penez" | #mytus-najem-vyhazovani | Air Bank/Ipsos (86 % Cechu), kalkulacka |
| 2 | "Splatka hypoteky = naklady na bydleni" | #mytus-splatka-naklady | David Eim (Seznam Zpravy), kalkulacka |
| 3 | "Ceny nemovitosti nikdy neklesnou" | #mytus-ceny-neklesnou | CSU HPI 2008-2009 (-18,1 %), 2022-2023 (-5,8 %) |
| 4 | "Nemovitost bezpecna, akcie hazard" | #mytus-nemovitost-bezpecna | Air Bank (77 % strach), historicka data akcii |

### /vyplati-se-investicni-byt (3 investicni myty)

| # | Mytus | Anchor | Zdroj pro debunk |
|---|-------|--------|-----------------|
| 5 | "Nemovitost je nejlepsi investice" | #mytus-nemovitost-nejlepsi | Air Bank/Ipsos, Jorda 2024, vynosove procento |
| 6 | "Nemovitost je ochrana proti inflaci" | #mytus-inflace | IPF Research, Jorda 2024 |
| 7 | "Investicni byt = pasivni prijem" | #mytus-pasivni-prijem | Spravcovske poplatky, casova narocnost |

### Proc mytus framework funguje

1. **SEO:** Kazdy mytus odpovida na realny "People Also Ask" dotaz
2. **Shareability:** "Najem je vyhazovani penez? Neni." je sdilitelny nadpis
3. **Novinarska hodnota:** "86 % Cechu veri ze nemovitost je nejlepsi investice, ale data ukazuji neco jineho" je pouzitelny citat
4. **Diferenciace:** Zadny cesky web systematicky demontuje vsech 7 mytu s daty a kalkulackou

---
---

## PROVAZANOST STRANEK (interni odkazy)

```
/ (Bydleni kalkulacka)
  --> z vysledkove karty: /metodika/bydleni
  --> z tooltipu (i): /metodika/bydleni#anchor
  --> z paticky: /metodika/bydleni, /metodika/investice, /o-projektu, SEO clanky

/investice (Investice kalkulacka)
  --> z vysledkove karty: /metodika/investice
  --> z tooltipu (i): /metodika/investice#anchor
  --> z paticky: stejne jako vyse

/metodika/bydleni
  --> Sekce 1: Google Sheet (zalozka Bydleni)
  --> Sekce 2: / (priklad Praha 2+kk)
  --> Sekce 6: odkaz na vyzkumny dokument
  --> CTA: /

/metodika/investice
  --> Sekce 1: Google Sheet (zalozka Investice)
  --> Sekce 2: odkaz na /vyplati-se-investicni-byt (vysvetleni proc ne vynosove procento)
  --> Sekce 4: odkazy na zakony (zakonyprolidi.cz)
  --> CTA: /investice

/o-projektu
  --> Sekce 4: /metodika/bydleni, /metodika/investice
  --> Sekce 4: Google Sheet
  --> Sekce 1: LinkedIn (Michal Humaj)
  --> Sekce 6: email michal.humaj@gmail.com

/koupit-nebo-pronajmout (SEO)
  --> Sekce 5 CTA: /
  --> V textu: /metodika/bydleni (pro duveryhodnost)
  --> Ve FAQ: / a /investice (kde relevantni)
  --> Mytusy linkovany z FAQ
  --> NENI v hlavni navigaci, JE v paticce

/vyplati-se-investicni-byt (SEO)
  --> Sekce 6 CTA: /investice
  --> V textu: /metodika/investice
  --> Ve FAQ: /investice a /metodika/investice#dane
  --> Mytusy linkovany z FAQ
  --> NENI v hlavni navigaci, JE v paticce
```

---

## UMISTENI KLICOVYCH PRVKU

| Prvek | Kde |
|-------|-----|
| Odkaz na Google Sheet (Bydleni) | /metodika/bydleni S1, /o-projektu S4 |
| Odkaz na Google Sheet (Investice) | /metodika/investice S1, /o-projektu S4 |
| Fotka Michal Humaj | /o-projektu S1 |
| LinkedIn (linkedin.com/in/michal-humaj) | /o-projektu S1, /o-projektu S6 |
| Email (michal.humaj@gmail.com) | /o-projektu S6 |
| Pravni upozorneni | /o-projektu S7, obe kalkulacky (spodek karty), obe metodiky |
| Psali o nas | /o-projektu S5 (zacina prazdna) |
| FAQ schema markup | /koupit-nebo-pronajmout S6, /vyplati-se-investicni-byt S7 |
| Tabulka predvyplnenych hodnot | /metodika/bydleni S5, /metodika/investice S7 |
| Danovy model detail | /metodika/investice S4 |
| Vynosove procento debunk | /metodika/investice S2, /vyplati-se-investicni-byt S1 |
| Konzervativni bias vysvetleni | /metodika/bydleni S6 |
| Mytus anchors | /koupit-nebo-pronajmout S2 (4 myty), /vyplati-se-investicni-byt S3 (3 myty) |
| [UPDATE] slots | /koupit-nebo-pronajmout S2+S4, /vyplati-se-investicni-byt S3+S5 |

---

## KRITICKE OPRAVY OPROTI VERZI 1.0

Predchozi verze architektury obsahovala fakticky nespravne informace o tom, co kalkulacka nezahrnuje. Nasledujici polozky JSOU v kalkulacce, ale verze 1.0 je chybne uvadela jako chybejici:

| Polozka | Verze 1.0 rikala | Realita |
|---------|-----------------|---------|
| Danovy odpocet uroku (§15 ZDP) | "nezahrnuje" | ZAHRNUJE (max 150k Kc/rok, 15/23 %) |
| Pojisteni nemovitosti | "nezahrnuje" | ZAHRNUJE (20 Kc/m2/rok) |
| Rust poplatku SVJ v case | "nezahrnuje" | ZAHRNUJE (inflacni naruseni) |
| Naklady na udrzbu | "nezahrnuje" | ZAHRNUJE (baseFixed + 73 Kc/m2 x regionalCoef) |
| Daneni prijmu z najmu | neuvedeno | ZAHRNUJE (skutecne vydaje + odpisy + 5yr carry-forward) |
| Per-city obsazenost | 90 % flat | 87-95 % per city |
| Per-city rust nemovitosti | neuvedeno | 3,0-4,0 % VERIFIED per city |
| Per-city rust najmu | neuvedeno | 3,0-3,5 % VERIFIED per city |

Tato verze (3.0) vsechny tyto chyby opravuje.

---

## ZMENY V VERZI 3.0 OPROTI 2.0

| Zmena | Duvod |
|-------|-------|
| Pridana kompletni sekce NAVIGACE A DISCOVERY | Chybelo jak se uzivatel dostane na jednotlive stranky (desktop/mobile) |
| Pridano "Jak se sem uzivatel dostane" ke kazde strance | Jasna navigacni mapa per stranka |
| Paticka nyni obsahuje SEO clanky | Jediny globalni discovery point pro SEO clanky |
| Hamburger menu ma Metodiku jako sekundarni polozky | Mobile users potrebuji pristup k metodice |
| NOVA sekce "Proc ne vynosove procento?" na /metodika/investice (S2) | Vysvetleni proc kalkulacka meri ciste jmeni, ne yield |
| SEO clanek /koupit-nebo-pronajmout prepsany kolem 4 mytu | Mytus framework pro SEO + novinare |
| SEO clanek /vyplati-se-investicni-byt prepsany kolem 3 mytu + vynosove procento | Systematicka demontaz vynosoveho procenta |
| Pridana tabulka MYTUS FRAMEWORK SOUHRN | Prehled vsech 7 mytu, anchoru a zdroju |
| [UPDATE] sloty na casove citlivych datech | Oznaceni dat ktera se musi ctvrtletne aktualizovat |
| Kontaktni udaje vyplneny | michal.humaj@gmail.com, LinkedIn |
| Fotka a bio prirazeny Michalu Humajovi | Konkretni osoba |

---

## ZDROJE POUZITE V KALKULACCE (quick reference)

### Oficilni ceske instituce
- CNB (Ceska narodni banka) -- inflace, urokove sazby, analyza bydleni
- CSU (Cesky statisticky urad) -- HPI, mzdy v krajich, scitani 2021
- Ministerstvo financi CR -- koeficienty dane z nemovitosti
- Zakon 338/1992 Sb. -- dan z nemovitosti
- Zakon o danich z prijmu -- §9, §15, §34 ZDP

### Realitni trh
- CBA Monitor (Flat Zone) -- transakcni ceny nemovitosti (ne nabidkove!)
- Sreality.cz API -- nabidkove ceny, najmy, vymery
- Global Property Guide -- najemne za m2 (CSU-referenced)
- Deloitte Rent Index -- ctvrtletni data o najmech
- Investropa -- obsazenost, vacancy rates

### Financni instituce a vyzkum
- Swiss Life Hypoindex -- urokove sazby hypotek
- Goldman Sachs Global Outlook 2024 -- vynosy akcii
- Vanguard Capital Market Assumptions -- vynosy akcii
- OECD Rent Price Index -- 10lety trend najmu

### Akademicky vyzkum
- Jorda et al. (2024) -- globalni vynosy nemovitosti 1465-2024
- CEPR DP15657 -- realne vynosy nemovitosti 1901-1983
- AEW Research (2025) -- europsky rezidencni forecast
- IPF Research (2024) -- nemovitosti a inflace

### Pruzkumy a media (pro SEO clanky)
- Air Bank / Ipsos -- 86 % Cechu veri ze nemovitost nejlepsi investice, 77 % strach z investovani
- David Eim (Seznam Zpravy, Srovnejto) -- chyba porovnani splatky s najemem
- Finance.cz -- historicky pokles cen 2008-2009

### Ostatni
- SVJ PREDSEDA, RE/MAX -- fond oprav benchmarks
- Srovnavac.cz -- pojisteni
- CenikyRemesel.cz -- naklady udrzby
- IKEA CZ -- naklady zarizeni

**Celkem: 28+ nezavislych zdrojovych datasetu pro kalkulacku + 6 medialnich zdroju pro SEO clanky**

---

**Konec dokumentu**
