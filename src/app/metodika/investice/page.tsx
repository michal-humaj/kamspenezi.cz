import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ArticleSchema } from "@/components/seo/article-schema";

export const metadata: Metadata = {
  title: "Investiční byt vs. akciový fond: jak kalkulačka počítá | kamspenezi.cz",
  description:
    "Transparentní metodika kalkulačky investičního bytu. Počáteční kapitál, odpisy, daňová ztráta, obsazenost, vedlejší fond. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets.",
  alternates: {
    canonical: "https://kamspenezi.cz/metodika/investice",
  },
  openGraph: {
    title: "Investiční byt vs. akciový fond: jak kalkulačka počítá | kamspenezi.cz",
    description:
      "Transparentní metodika kalkulačky investičního bytu. Počáteční kapitál, odpisy, daňová ztráta, obsazenost, vedlejší fond. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets.",
    type: "website",
    url: "https://kamspenezi.cz/metodika/investice",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
  },
};

const CONTENT_WIDTH = "max-w-[760px]";
const PROSE_COLOR = "#4B5563";
const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=275768974#gid=275768974";

function Divider() {
  return (
    <hr
      className="my-10 md:my-12"
      style={{ borderColor: "var(--color-border)" }}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-uiSans text-xl font-semibold tracking-[-0.01em] mb-4"
      style={{ color: "var(--color-primary)" }}
    >
      {children}
    </h2>
  );
}

function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-uiSans text-base md:text-lg leading-relaxed ${className}`}
      style={{ color: PROSE_COLOR }}
    >
      {children}
    </p>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ background: "var(--color-bullet)" }}
          />
          <span
            className="font-uiSans text-base md:text-lg leading-relaxed"
            style={{ color: PROSE_COLOR }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-uiSans text-base font-semibold mb-2 mt-6 first:mt-0"
      style={{ color: "var(--color-primary)" }}
    >
      {children}
    </p>
  );
}

function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pt-6 first:pt-0 border-t first:border-t-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h3
        className="font-uiSans text-base font-semibold mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        {question}
      </h3>
      <Prose>{children}</Prose>
    </div>
  );
}

function SheetsCard() {
  return (
    <a
      href={SHEETS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4 shadow-[var(--shadow-card)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
    >
      <div>
        <p
          className="font-uiSans text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          Otevřít výpočet v Google Sheets
        </p>
        <p
          className="font-uiSans text-xs mt-0.5"
          style={{ color: "var(--color-secondary)" }}
        >
          Stejný výpočet, řádek po řádku. Otevírá novou záložku.
        </p>
      </div>
      <ExternalLink
        className="h-4 w-4 flex-shrink-0"
        style={{ color: "var(--color-secondary)" }}
      />
    </a>
  );
}

export default function MetodikaInvesticePage() {
  return (
    <div style={{ background: "var(--bg-base)" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="pt-[var(--section-padding-y-mobile)] pb-12 md:pt-[var(--section-padding-y-desktop)] md:pb-16"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <p
            className="font-uiSans text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-secondary)" }}
          >
            Metodika
          </p>
          <h1
            className="font-displaySerif text-[clamp(30px,4.5vw,48px)] leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--color-primary)" }}
          >
            Investiční byt vs. akciový fond
          </h1>
          <Prose>
            Výpočet si ověříš v Google Sheets. Tabulka počítá řádek po řádku úplně stejně jako kalkulačka.
          </Prose>
          <SheetsCard />
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section
        className="pb-[var(--section-padding-y-mobile)] md:pb-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>

          {/* Jak kalkulačka funguje */}
          <div>
            <SectionHeading>Jak kalkulačka funguje</SectionHeading>
            <Prose>
              Představ si dvě osoby. Obě mají k dispozici stejnou hotovost a řeší stejnou otázku: co udělat s penězi, aby je zhodnotily?
            </Prose>
            <Prose className="mt-4">
              Osoba A koupí investiční byt na hypotéku a pronajme ho. Každý měsíc přijímá nájemné a platí splátky. Po 30 letech má byt bez dluhů.
            </Prose>
            <Prose className="mt-4">
              Osoba B nevkládá peníze do bytu. Hned první den vloží ekvivalentní kapitál do globálního akciového fondu. V prvních letech, kdy Osoba A doplácí na byt z vlastní kapsy (splátky a náklady převyšují nájemné), investuje Osoba B tento měsíční rozdíl navíc do fondu. Po 30 letech má investiční portfolio.
            </Prose>
            <Prose className="mt-4">
              Kalkulačka sleduje, kdo z nich bude na tom po 30 letech lépe.
            </Prose>
          </div>

          <Divider />

          {/* Dva scénáře */}
          <div>
            <SectionHeading>Dva scénáře: co každý z nich obnáší</SectionHeading>
            <Prose>
              Kalkulačka porovnává dvě cesty k budování majetku. Obě začínají ve stejný den se stejnou hotovostí.
            </Prose>
            <SubHeading>Scénář A: Investiční byt na hypotéku</SubHeading>
            <Prose>
              Koupíš investiční byt. Vložíš vlastní zdroje (akontace, typicky 10–20 % kupní ceny) a byt vybavíš. Zbytek koupní ceny zaplatíš hypotékou. Byt pronajmeš. Nájemné ti každý měsíc pokrývá část nákladů, v prvních letech je nestačí pokrýt celé. Každý rok platíš hypotéku, fond oprav, pojištění, daň z nemovitosti a náklady na údržbu. Z příjmů z nájmu odvádíš daň z příjmů. Přebývající hotovost investuješ do vedlejšího fondu (viz níže). Po 30 letech vlastníš byt bez dluhů.
            </Prose>
            <Prose className="mt-3">
              Čisté jmění Scénáře A = tržní hodnota bytu plus vedlejší fond.
            </Prose>
            <SubHeading>Scénář B: Globální akciový fond</SubHeading>
            <Prose>
              Nekupuješ nic. Hotovost, která by jinak šla do akontace a vybavení bytu, vložíš hned první den do globálního akciového fondu. Každý měsíc investuješ navíc i rozdíl v cash flow oproti Scénáři A. Příklad: pokud Scénář A v prvním roce doplácí 4 000 Kč měsíčně nad příjem z nájmu, Scénář B investuje těchto 4 000 Kč každý měsíc navíc. Tato výhoda se v průběhu let otočí: jakmile se cash flow bytu dostane do kladných čísel (typicky kolem 8.–15. roku), nové příspěvky přestane přidávat Scénář B a začne je přidávat Scénář A do vedlejšího fondu. Po 30 letech vlastníš investiční portfolio.
            </Prose>
            <Prose className="mt-3">
              Čisté jmění Scénáře B = hodnota portfolia.
            </Prose>
          </div>

          <Divider />

          {/* Vedlejší fond */}
          <div>
            <SectionHeading>Vedlejší fond: jak funguje při investičním bytu</SectionHeading>
            <Prose>
              Základní pravidlo modelu: v každém okamžiku musí obě strany investovat přesně stejnou částku ve stejný čas. Žádná koruna nesmí zmizet ani přibýt. Oba scénáře sledují, kam každá koruna putuje každý měsíc po celých 30 let.
            </Prose>
            <SubHeading>První roky: byt je ztrátový</SubHeading>
            <Prose>
              Investiční byt v prvních letech typicky generuje záporný cash flow. Splátka hypotéky a provozní náklady převyšují příjem z nájmu. Scénář A doplácí z vlastní kapsy. Scénář B má v tu dobu větší investovatelnou hotovost a tento rozdíl investuje do fondu každý měsíc.
            </Prose>
            <SubHeading>Pozdější roky: byt začne vydělávat</SubHeading>
            <Prose>
              Hypotéka se amortizuje, nájemné roste. V určitém bodě se cash flow Scénáře A otočí do kladných čísel. Od té chvíle:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Scénář B</strong> zastaví nové příspěvky do fondu. Portfolio dál roste, ale nové peníze přestávají přitékat.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Scénář A</strong> vytvoří vedlejší fond a investuje do něj přebývající cash flow. Vedlejší fond se zhodnocuje stejnou sazbou jako globální akciový fond (6,5 % p.a.).</>,
              ]}
            />
            <Prose className="mt-4">
              Ani jedna strana z fondu nevybírá. Výběry v konkrétním čase zkreslují výsledek způsobem, který nesouvisí s výnosem investice. Závisel by na načasování, ne na reálné výkonnosti aktiva. Nulování příspěvků je spravedlivý přístup pro obě strany.
            </Prose>
          </div>

          <Divider />

          {/* Obsazenost */}
          <div>
            <SectionHeading>Obsazenost: proč nepočítáme se 100 %</SectionHeading>
            <Prose>
              Mezi nájemníky vždy vzniká mezera: výběr nového nájemníka, předání bytu, drobné opravy. Na 30letém horizontu se stane i to, že byt stojí prázdný déle. Kalkulačka s tím počítá:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Praha:</strong> 93 % (byt obsazen průměrně 11,2 měsíce ročně)</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Brno:</strong> 92 %</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Ostrava:</strong> 87 %</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Ústí nad Labem:</strong> 83 % (nejnižší v datasetu, výrazně slabší poptávka)</>,
              ]}
            />
            <Prose className="mt-4">
              Hodnoty pro Prahu a Brno vychází z dat o vakanci institucionálního nájemního trhu, upravených dolů pro soukromého pronajímatele. Pro ostatní města jsou odvozeny podle síly místní poptávky. Obsazenost je jeden z nejcitlivějších parametrů kalkulačky. Změň si ji a sleduj, jak se výsledek mění. Hodnoty pro všechna města najdeš na{" "}
              <Link
                href="/metodika/data-a-zdroje"
                className="font-medium underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                stránce Data a zdroje
              </Link>
              .
            </Prose>
          </div>

          <Divider />

          {/* Odpisy */}
          <div>
            <SectionHeading>Odpisy nemovitosti: jak fungují a proč záleží</SectionHeading>
            <Prose>
              Odpisy jsou čistě účetní nástroj. Nejde o skutečný výdaj peněz. Jde o fiktivní náklad, který ti zákon dovoluje odečíst od základu daně z příjmu z nájmu.
            </Prose>
            <SubHeading>Jak odpisy fungují</SubHeading>
            <Prose>
              Zákon ti dovoluje odpisovat budovu, ne pozemek. Proto odpisový základ = 90 % kupní ceny (zbývajících 10 % je orientační hodnota pozemku, odpisovat ho nelze).
            </Prose>
            <Prose className="mt-3">
              Výpočet:
            </Prose>
            <BulletList
              items={[
                "Rok 1: 1,4 % z odpisového základu",
                "Roky 2–30: 3,4 % z odpisového základu ročně",
              ]}
            />
            <Prose className="mt-4">
              Příklad pro byt za 5,6 mil. Kč:
            </Prose>
            <BulletList
              items={[
                "Odpisový základ: 5 040 000 Kč (90 %)",
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Rok 1:</strong> 5 040 000 × 1,4 % = 70 560 Kč odečteno ze základu daně</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Roky 2–30:</strong> 5 040 000 × 3,4 % = 171 360 Kč ročně odečteno ze základu daně</>,
              ]}
            />
            <Prose className="mt-4">
              Praktický dopad: v prvních 8–12 letech odpisy spolu s ostatními náklady typicky převyšují příjmy z nájmu. Výsledkem je daňová ztráta a nulová daň z nájemného. Blíže viz sekce Daňová ztráta níže.
            </Prose>
          </div>

          <Divider />

          {/* Daňová ztráta */}
          <div>
            <SectionHeading>Daňová ztráta a její přenos</SectionHeading>
            <Prose>
              V prvních letech hypotéky jsou odpisy plus ostatní náklady vyšší než příjmy z nájmu. Výsledkem je{" "}
              <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>daňová ztráta</strong>
              , tedy záporný základ daně.
            </Prose>
            <Prose className="mt-4">
              Tuto ztrátu nelze využít okamžitě, ale zákon ti ji nechá přenést do budoucna. Konkrétně: ztrátu z příjmů z nájmu (§ 9 ZDP) lze uplatnit v následujících{" "}
              <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>5 zdaňovacích obdobích</strong>{" "}
              (§ 34 ZDP).
            </Prose>
            <Prose className="mt-4">
              Kalkulačka tento přenos počítá přesně. Každý rok sleduje nevyčerpanou ztrátu, aplikuje ji na příjmy z nájmu v dalších letech a zdaňuje až skutečný kladný základ daně.
            </Prose>
            <Prose className="mt-4">
              Výsledek: v prvních letech platíš nulovou nebo velmi nízkou daň, i když byt začíná generovat kladný příjem z nájmu. Tento efekt výrazně zlepšuje cash flow Scénáře A v přechodu z záporného do kladného.
            </Prose>
          </div>

          <Divider />

          {/* Reálné náklady vs. paušál */}
          <div>
            <SectionHeading>Reálné náklady vs. paušál: proč počítáme po položkách</SectionHeading>
            <Prose>
              Pronajímatel má při zdanění příjmů z nájmu dvě možnosti:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Paušální výdaj 30 %:</strong> jednoduché, bez dokladů, vždy 30 % příjmů jde jako výdaj</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Reálné náklady:</strong> odečítáš skutečné výdaje: fond oprav, pojištění, daň z nemovitosti, náklady na údržbu a odpisy</>,
              ]}
            />
            <Prose className="mt-4">
              Kalkulačka používá reálné náklady, protože umožňují uplatnit odpisy. Ty jsou v prvních letech výrazně vyšší než 30 % z příjmů. Paušál by byl výhodnější jen tehdy, kdybys neměl žádné dokladovatelné náklady a odpisy by byly nízké. Pro hypoteční investiční byt je to téměř vždy horší varianta.
            </Prose>
          </div>

          <Divider />

          {/* Daňové pásmo */}
          <div>
            <SectionHeading>Daňové pásmo: 15 % nebo 23 %</SectionHeading>
            <Prose>
              Sazba daně z příjmů fyzických osob v ČR:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>15 %</strong> pro příjmy do přibližně 1 582 812 Kč ročně (zhruba 132 000 Kč hrubého měsíčně). Týká se naprosté většiny zaměstnanců.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>23 %</strong> pro příjmy nad tento limit (§ 16 ZDP). Pokud máš hrubý roční příjem výrazně přesahující 1,5 milionu Kč, pravděpodobně platíš tuto sazbu alespoň na část příjmů.</>,
              ]}
            />
            <Prose className="mt-4">
              Výchozí hodnota v kalkulačce je 15 %. Daňová sazba ovlivňuje dvě věci zároveň: výši daně z příjmu z nájmu (vyšší sazba = větší daňové zatížení Scénáře A) a efekt odpisů (vyšší sazba = větší daňová úspora z odpisů). Tyto dva efekty se částečně kompenzují.
            </Prose>
          </div>

          <Divider />

          {/* Akciový fond */}
          <div>
            <SectionHeading>Akciový fond: proč počítáme bez daně z výnosu</SectionHeading>
            <Prose>
              Zisky z prodeje cenných papírů jsou v Česku osvobozeny od daně, pokud je držíš déle než 3 roky (§ 4 odst. 1 písm. w) ZDP). Na 30letém horizontu předpokládáme dlouhodobé držení. Výnos globálního akciového fondu proto vstupuje do kalkulačky bez daně.
            </Prose>
          </div>

          <Divider />

          {/* Konzervativní předpoklady */}
          <div>
            <SectionHeading>Konzervativní předpoklady: co a proč</SectionHeading>
            <Prose>
              Kde jsme měli na výběr, volili jsme konzervativnější odhad.
            </Prose>
            <SubHeading>Výnos globálního akciového fondu (6,5 %)</SubHeading>
            <Prose>
              Konsensuální průměr pěti institucionálních výhledů pro rok 2026 (Vanguard, BNY, AQR, DMS/UBS, Northern Trust) po nákladech fondu (přibližně 0,20 % p.a.). Historický nominální výnos globálních akcií (DMS Yearbook) se dlouhodobě pohybuje přibližně kolem 7 % ročně. 6,5 % je konzervativní kotva. Zkušení investoři s diverzifikovaným globálním portfoliem mohou na delším horizontu dosáhnout výnosů blízkých historickému průměru.
            </Prose>
            <SubHeading>Růst hodnoty nemovitosti (3–4,5 % dle města)</SubHeading>
            <Prose>
              Strukturální odhad vychází z cyklu 2010–2019 bez pandemické anomálie, kalibrovaný pro každé město. Lokalita uvnitř města výsledek ovlivňuje výrazně. Praha 2 a Praha 14 nejsou stejná investice. Výchozí hodnoty jsou průměry za celé město, ne za konkrétní čtvrt.
            </Prose>
            <SubHeading>Úroková sazba hypotéky po refixaci (4,5 %)</SubHeading>
            <Prose>
              Tato hodnota platí pro 25 z 30 let hypotéky. Je odvozena z neutrální sazby ČNB, střednědobého inflačního cíle a standardní bankovní marže. Jde o konzervativní odhad, sazba může být nižší i vyšší. Protože platí nejdéle, má na celkový výsledek větší vliv než počáteční fixovaná sazba 3,99 %.
            </Prose>
            <Prose className="mt-4">
              Úplný přehled všech parametrů a jejich zdrojů najdeš na{" "}
              <Link
                href="/metodika/data-a-zdroje"
                className="font-medium underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                stránce Data a zdroje
              </Link>
              .
            </Prose>
          </div>

          <Divider />

          {/* FAQ */}
          <div>
            <SectionHeading>Časté otázky</SectionHeading>
            <div>
              <FaqItem question="Co přesně vidím na výsledku?">
                Kalkulačka ti ukáže čisté jmění obou scénářů po 30 letech v nominálních korunách. Scénář A = tržní hodnota bytu plus vedlejší fond. Scénář B = hodnota portfolia. Chceš přibližnou hodnotu v dnešních penězích? Vyděl výsledek číslem 2,1.
              </FaqItem>
              <FaqItem question="Proč porovnáváš s akciovým fondem, a ne se spořicím účtem?">
                Protože hypotéka je 30letý závazek a investiční byt je dlouhodobé aktivum. Spořicí účet je krátkodobý nástroj s proměnlivou sazbou, která se mění s každým rozhodnutím ČNB. Správný protějšek k 30letému reálnému aktivu je 30letá investice, ne nástroj se splatností do výpovědi.
              </FaqItem>
              <FaqItem question="Co ovlivňuje výsledek nejvíc?">
                Na straně Scénáře A: cena bytu, výše nájmu, obsazenost a růst hodnoty nemovitosti. Na straně Scénáře B: výnos akciového fondu. Právě tyto parametry si změň v kalkulačce a prozkoumej, kde je bod zlomu.
              </FaqItem>
              <FaqItem question="Proč má Scénář A v prvních letech záporný cash flow?">
                Protože splátka hypotéky plus provozní náklady v prvních letech převyšují příjem z nájmu. Investiční byt se stane cash flow pozitivním typicky v rozmezí 8. až 15. roku, záleží na parametrech. Do té doby Scénář A doplácí z vlastní kapsy a Scénář B investuje tento rozdíl.
              </FaqItem>
              <FaqItem question="Počítáš se situací, kdy nájemník neplatí?">
                Kalkulačka modeluje vakanci mezi nájemníky, nikoliv aktivní neplacení. Obsazenost pokrývá dobu, kdy je byt prázdný při střídání nájemníků. Scénář, kdy nájemník byt obsazuje a neplatí, do modelu nezahrnujeme. Jako praktické opatření doporučujeme sjednat nájemní smlouvu s notářským zápisem se svolením k vykonatelnosti: pokud nájemník přestane platit, lze pohledávku vymáhat přímo ze mzdy bez soudního řízení.
              </FaqItem>
              <FaqItem question="Kalkulačka říká, že investiční byt vychází lépe. Mám si ho koupit?">
                Kalkulačka počítá finanční výsledek za konkrétních předpokladů. To nestačí jako základ pro rozhodnutí. Investiční byt je koncentrovaná sázka: jeden konkrétní byt, na jedné ulici, v jednom městě. Pokud se lokalita zhorší, dojde k větší opravě nebo ho zasáhne nepříznivá legislativa, celá investice trpí. Globální akciový fond drží tisíce firem po celém světě. Diverzifikace je reálná výhoda, ne marketing. Navíc: investiční byt vyžaduje aktivní správu (komunikace s nájemníky, opravy, administrativa), zatímco akciový fond neklade žádné provozní nároky. Finanční výsledek je jen jeden vstup do rozhodování.
              </FaqItem>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-lilac-section)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <p
            className="font-uiSans text-base leading-relaxed mb-6"
            style={{ color: PROSE_COLOR }}
          >
            Chceš si to spočítat? Jdi na kalkulačku.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/investice"
              className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
            >
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-uiSans text-xs font-medium mb-3"
                  style={{
                    background: "var(--scenario-b-bg)",
                    color: "var(--scenario-b-dot)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--scenario-b-dot)" }}
                  />
                  Investiční byt
                </span>
                <p
                  className="font-uiSans text-base font-semibold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  Kalkulačka investičního bytu
                </p>
                <p
                  className="font-uiSans text-sm leading-relaxed"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Investiční byt vs. akciový fond ETF. 30letý horizont.
                </p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--color-secondary)" }}
                />
              </div>
            </Link>

            <Link
              href="/"
              className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
            >
              <div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-uiSans text-xs font-medium mb-3"
                  style={{
                    background: "var(--scenario-a-bg)",
                    color: "var(--scenario-a-dot)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--scenario-a-dot)" }}
                  />
                  Vlastní bydlení
                </span>
                <p
                  className="font-uiSans text-base font-semibold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  Kalkulačka vlastního bydlení
                </p>
                <p
                  className="font-uiSans text-sm leading-relaxed"
                  style={{ color: "var(--color-secondary)" }}
                >
                  Koupě bytu vs. nájem a investice. 30letý horizont.
                </p>
              </div>
              <div className="flex items-center justify-end mt-4">
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--color-secondary)" }}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Domů", url: "https://kamspenezi.cz" },
          { name: "Metodika", url: "https://kamspenezi.cz/metodika/investice" },
          { name: "Metodika investice", url: "https://kamspenezi.cz/metodika/investice" },
        ]}
      />
      <ArticleSchema
        headline="Investiční byt vs. akciový fond: jak kalkulačka počítá"
        description="Transparentní metodika kalkulačky investičního bytu. Počáteční kapitál, odpisy, daňová ztráta, obsazenost, vedlejší fond. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets."
        url="https://kamspenezi.cz/metodika/investice"
        datePublished="2026-01-15"
        dateModified="2026-04-04"
      />
    </div>
  );
}
