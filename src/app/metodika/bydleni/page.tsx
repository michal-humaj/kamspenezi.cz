import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Jak kalkulačka bydlení počítá | kamspenezi.cz",
  description:
    "Transparentní metodika kalkulačky bydlení. Dva scénáře, vedlejší fond, daňová úspora z úroků, akciový fond bez daně. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets.",
  alternates: {
    canonical: "https://kamspenezi.cz/metodika/bydleni",
  },
  openGraph: {
    title: "Jak kalkulačka bydlení počítá | kamspenezi.cz",
    description:
      "Transparentní metodika kalkulačky bydlení. Dva scénáře, vedlejší fond, daňová úspora z úroků, akciový fond bez daně. Každý předpoklad má uvedený zdroj a je ověřitelný v Google Sheets.",
    type: "website",
    url: "https://kamspenezi.cz/metodika/bydleni",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
  },
};

const CONTENT_WIDTH = "max-w-[760px]";
const PROSE_COLOR = "#4B5563";
const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=1260855363#gid=1260855363";

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

function ScenarioLabel({ label }: { label: string }) {
  return (
    <p
      className="font-uiSans text-base font-semibold mb-2 mt-6 first:mt-0"
      style={{ color: "var(--color-primary)" }}
    >
      {label}
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

export default function MetodikaBydleniPage() {
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
            Koupit byt, nebo bydlet v nájmu?
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
              Představ si dvě osoby. Obě mají k dispozici stejnou hotovost a řeší stejnou otázku: je koupě bytu při dnešních cenách finančně rozumné rozhodnutí, nebo se víc vyplatí bydlet v nájmu a investovat?
            </Prose>
            <Prose className="mt-4">
              Osoba A koupí byt na hypotéku. Každý měsíc splácí úvěr a platí náklady vlastnictví. Po 30 letech má byt bez dluhů.
            </Prose>
            <Prose className="mt-4">
              Osoba B bydlí v nájmu a rozdíl oproti nákladům vlastnictví investuje do globálního akciového fondu. Po 30 letech má investiční portfolio.
            </Prose>
            <Prose className="mt-4">
              Kalkulačka sleduje, kdo z nich bude na tom po 30 letech lépe. Obě osoby začínají ve stejný den se stejnou hotovostí.
            </Prose>
          </div>

          <Divider />

          {/* Dva scénáře */}
          <div>
            <SectionHeading>Dva scénáře: co se do výsledku počítá</SectionHeading>
            <ScenarioLabel label="Scénář A: Vlastní bydlení na hypotéku" />
            <Prose>
              Koupíš byt na hypotéku. Každý měsíc splácíš úvěr a hradíš náklady vlastnictví. Po 30 letech vlastníš byt bez dluhů.
            </Prose>
            <Prose className="mt-3">
              Čisté jmění Scénáře A = tržní hodnota bytu plus vedlejší fond (viz níže).
            </Prose>
            <ScenarioLabel label="Scénář B: Nájem a investice do globálního akciového fondu" />
            <Prose>
              Bydlíš v nájmu. V prvních letech, kdy jsou náklady vlastnictví vyšší než nájem, investuješ tento měsíční rozdíl do globálního akciového fondu. Typicky jde o tisíce korun měsíčně. V pozdějších letech se situace otočí: vlastnictví se stane levnějším než rostoucí nájem a nové příspěvky do fondu přestávají přitékat. Portfolio ale dál roste.
            </Prose>
            <Prose className="mt-3">
              Čisté jmění Scénáře B = hodnota portfolia po 30 letech.
            </Prose>
          </div>

          <Divider />

          {/* Vedlejší fond */}
          <div>
            <SectionHeading>Vedlejší fond: proč ho kalkulačka vytváří</SectionHeading>
            <Prose>
              Základní pravidlo modelu: v každém okamžiku musí obě strany investovat přesně stejnou částku ve stejný čas. Žádná koruna nesmí zmizet ani přibýt. Model sleduje, kam každá koruna putuje každý měsíc po celých 30 let.
            </Prose>
            <Prose className="mt-4">
              V prvních letech je vlastní bydlení dražší než nájem. Splátka hypotéky plus náklady vlastnictví překročí výši nájmu. V tu dobu Scénář B investuje rozdíl do akciového fondu a portfolio roste.
            </Prose>
            <Prose className="mt-4">
              V pozdějších letech se situace otočí. Hypotéka se amortizuje, reálná hodnota splátky klesá díky inflaci. Vlastnit byt se stane levnějším než platit nájem, který meziročně roste. Od chvíle, kdy je vlastnictví levnější než nájem:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Scénář B</strong> přestane přidávat nové příspěvky do fondu. Existující portfolio dál roste, ale nové peníze tam neplynou.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Scénář A</strong> vytvoří vedlejší fond a začne do něj investovat měsíční úsporu oproti nájmu. Vedlejší fond se zhodnocuje stejnou sazbou jako globální akciový fond (6,5 % p.a.).</>,
              ]}
            />
            <p
              className="font-uiSans text-base font-semibold mt-6 mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Proč nevybíráme z fondu Scénáře B?
            </p>
            <Prose>
              Intuitivní řešení by bylo: jakmile je nájem dražší než vlastnictví, Scénář B z fondu vybere rozdíl. Jenže výběry v konkrétních časových okamžicích zkreslují výsledek způsobem, který nesouvisí s výnosem investice. Pokud vybíráš, když je trh nahoře, penalizuješ Scénář B čistě na základě načasování, ne na základě reálné výkonnosti aktiva. Výsledek by závisel na tom, kdy přesně se rovnováha obrátila, ne na tom, jak investice skutečně vydělávala.
            </Prose>
            <Prose className="mt-4">
              Správné řešení je nulovat nové příspěvky a začít vedlejší fond na straně Scénáře A. Obě strany jsou tak porovnatelné: ani jedna nevybírá, obě kapitál dál zhodnocují.
            </Prose>
          </div>

          <Divider />

          {/* Hypoteční sazby */}
          <div>
            <SectionHeading>Hypoteční sazby: jak kalkulačka pracuje s refixací</SectionHeading>
            <Prose>
              Česká hypotéka funguje na fixační periody. Po uplynutí fixace si banka (nebo nová banka) nastaví novou sazbu.
            </Prose>
            <Prose className="mt-4">
              Kalkulačka to modeluje takto:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Roky 1–5:</strong> sazba z pole <em>Úroková sazba hypotéky po dobu 5 let fixace</em>. Výchozí hodnota: <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>3,99 % p.a.</strong> (Moneta Money Bank, nejnižší ověřená sazba na trhu k 25. 3. 2026, zdroj: <a href="https://www.hypoindex.cz/clanky/prehled-aktualnich-sazeb-hypotek-po-ctvrt-roce-je-na-trhu-opet-hypoteka-pod-4/" target="_blank" rel="noopener noreferrer" className="underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150" style={{ color: "var(--color-primary)" }}>Hypoindex.cz</a>).</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Roky 6–30:</strong> sazba z pole <em>Úrok hypotéky po 5leté fixaci</em>. Výchozí hodnota: <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>4,5 % p.a.</strong> Jde o konzervativní odhad dlouhodobé průměrné sazby na zbývajících přibližně 25 let. Tato hodnota má na výsledek větší vliv než počáteční sazba, protože platí po dobu 25 z 30 let.</>,
              ]}
            />
            <Prose className="mt-4">
              Obě hodnoty si v kalkulačce můžeš změnit. Výsledek je citlivý především na ten druhý parametr.
            </Prose>
          </div>

          <Divider />

          {/* Příspěvek od rodičů */}
          <div>
            <SectionHeading>Příspěvek od rodičů</SectionHeading>
            <Prose>
              Část kupujících dostane od rodičů nebo prarodičů peníze na akontaci. Jenže tyto peníze dostaneš jen tehdy, když byt opravdu koupíš. Do fondu by ti je rodiče neposílali.
            </Prose>
            <Prose className="mt-4">
              Proto tato částka přísluší <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>jen Scénáři A</strong>. Scénář B ji nedostane. Kdybychom ji přičítali oběma stranám, Scénář B by začínal s větším kapitálem, aniž by to odpovídalo realitě.
            </Prose>
          </div>

          <Divider />

          {/* Daňová úspora */}
          <div>
            <SectionHeading>Daňová úspora z hypotečních úroků</SectionHeading>
            <Prose>
              Pokud si bereš hypotéku na vlastní bydlení, můžeš si zaplacené úroky odečíst od základu daně z příjmů. Zákonný limit je 150 000 Kč ročně (§ 15 zákona č. 586/1992 Sb., účinné od roku 2021).
            </Prose>
            <Prose className="mt-4">
              Jak to funguje v kalkulačce:
            </Prose>
            <BulletList
              items={[
                "Každý rok vypočítáme zaplacené úroky z hypotéky.",
                "Pokud jsou nižší než 150 000 Kč, odečteme plnou výši.",
                "Daňová úspora = odečtené úroky × tvoje sazba daně z příjmů.",
                "Úspora snižuje efektivní náklady Scénáře A.",
              ]}
            />
            <Prose className="mt-4">
              Sazba daně závisí na výši příjmů. V kalkulačce si nastavíš:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>15 %</strong> platí na příjmy do přibližně 1 582 812 Kč ročně (zhruba 132 000 Kč hrubého měsíčně). Týká se naprosté většiny zaměstnanců.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>23 %</strong> platí na část příjmů nad tuto hranici. Pokud máš hrubý roční příjem výrazně přesahující 1,5 milionu Kč, pravděpodobně platíš tuto sazbu alespoň na část příjmů.</>,
              ]}
            />
            <Prose className="mt-4">
              V prvních letech hypotéky jsou úroky vysoké, úspora je tak největší právě tehdy, kdy je vlastnit byt nejdražší.
            </Prose>
          </div>

          <Divider />

          {/* Akciový fond */}
          <div>
            <SectionHeading>Akciový fond: proč počítáme bez daně z výnosu</SectionHeading>
            <Prose>
              Zisky z prodeje cenných papírů jsou v České republice osvobozeny od daně z příjmů, pokud:
            </Prose>
            <BulletList
              items={[
                "Držíš papíry déle než 3 roky (časový test, § 4 odst. 1 písm. w) ZDP).",
                "Nebo tvůj celkový příjem z prodeje cenných papírů nepřekročí 100 000 Kč ročně.",
              ]}
            />
            <Prose className="mt-4">
              Na 30letém horizontu předpokládáme, že podmínku č. 1 splníš. Investuješ dlouhodobě a papíry nedržíš krátce. Výnos globálního akciového fondu proto vstupuje do kalkulačky bez daně.
            </Prose>
            <Prose className="mt-4">
              Pokud bys vybíral peníze z fondu dříve než 3 roky po jejich vložení, daň by se uplatnila a výsledek Scénáře B by byl nižší. Tuto variantu kalkulačka v základním zobrazení neřeší.
            </Prose>
          </div>

          <Divider />

          {/* Náklady na údržbu */}
          <div>
            <SectionHeading>Náklady na údržbu: proč ne americké 1% pravidlo</SectionHeading>
            <Prose>
              V americké literatuře se běžně uvádí pravidlo 1 % z hodnoty nemovitosti ročně na údržbu. Pro česká panelová a cihlová města je to číslo mimo realitu.
            </Prose>
            <Prose className="mt-4">
              Americké 1 % vzniklo na trhu, kde jsou běžné rodinné domy s vlastní střechou, zahradou a soukromým systémem vytápění. Přesun nákladů na svépomocnou údržbu je tam výrazně větší. Český byt v panelovém nebo cihlovém domě sdílí střechu, nosné konstrukce a rozvody s ostatními vlastníky. Ty jsou kryté z fondu oprav SVJ, nikoliv z kapsy jednotlivce.
            </Prose>
            <Prose className="mt-4">
              Naše hodnoty jsou sestaveny zdola nahoru. Amortizujeme konkrétní výdaje přes jejich reálné životnosti:
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Rekonstrukce koupelny</strong> (jednou za 20–25 let): 90 000–150 000 Kč</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Výměna kuchyňské linky</strong> (jednou za 15–20 let): 40 000–80 000 Kč</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Výměna podlah</strong> (jednou za 20–30 let): 30 000–70 000 Kč dle plochy</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Spotřebiče</strong> (pračka, myčka, trouba): průměrně 5 000–12 000 Kč/kus, životnost 10–15 let</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Malování</strong> (jednou za 7–10 let): 15 000–30 000 Kč dle dispozice</>,
              ]}
            />
            <Prose className="mt-4">
              Roční průměr těchto výdajů na typický byt 2+kk vychází přibližně na 26 000 Kč ročně v Praze a 19 000–23 000 Kč v ostatních městech, nikoliv na 1 % z kupní ceny, což by u pražského bytu za 7 milionů Kč bylo 70 000 Kč ročně. Detailní výpočet si ověříš v Google Sheets.
            </Prose>
          </div>

          <Divider />

          {/* Konzervativní předpoklady */}
          <div>
            <SectionHeading>Konzervativní předpoklady: co a proč</SectionHeading>
            <Prose>
              Kde jsme měli na výběr, volili jsme konzervativnější odhad.
            </Prose>
            <p
              className="font-uiSans text-base font-semibold mt-5 mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Výnos globálního akciového fondu (6,5 %)
            </p>
            <Prose>
              Historický nominální výnos globálních akcií (DMS Yearbook) se dlouhodobě pohybuje přibližně kolem 7 % ročně. My používáme 6,5 %, což je konsensuální průměr pěti institucionálních výhledů pro rok 2026 (Vanguard, BNY, AQR, DMS/UBS, Northern Trust). Jde o výnos po nákladech fondu (přibližně 0,20 % p.a.). 6,5 % je rozumná, konzervativní kotva pro plánování. Zkušení investoři s diverzifikovaným globálním portfoliem mohou na delším horizontu dosáhnout výnosů blízkých historickému průměru.
            </Prose>
            <p
              className="font-uiSans text-base font-semibold mt-5 mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Růst hodnoty nemovitosti (3–4,5 % dle města)
            </p>
            <Prose>
              České nemovitosti v posledních 15 letech výrazně zdražily, ale část toho růstu šla na vrub mimořádných podmínek: záporné reálné sazby v letech 2016–2021 a COVID boom 2021. Tyto podmínky se na 30letém horizontu nemusí opakovat. Strukturální odhad vychází z dat Eurostat (ei_hppi_q) pro cyklus 2010–2019 bez pandemické anomálie a je kalibrován pro každé město zvlášť.
            </Prose>
            <Prose className="mt-4">
              Navíc platí, že růst nemovitostí není rovnoměrný uvnitř města. Byt na Vinohradech a byt na Černém Mostě mohou mít výrazně odlišný cenový vývoj. Výchozí hodnoty jsou kalibrovány pro každé město jako průměr, nikoliv pro konkrétní čtvrt. Pokud kupuješ v lokalitě, která historicky roste rychleji nebo pomaleji, nastav si parametr ručně.
            </Prose>
          </div>

          <Divider />

          {/* Odkaz na data a zdroje */}
          <div>
            <Prose>
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
                Kalkulačka ti ukáže čisté jmění obou osob po 30 letech v nominálních korunách. Scénář A = tržní hodnota bytu plus vedlejší fond. Scénář B = hodnota investičního portfolia. Výsledek je v korunách za 30 let, ne v dnešní hodnotě peněz. Chceš přibližnou hodnotu v dnešních penězích? Vyděl výsledek číslem 2,1.
              </FaqItem>
              <FaqItem question="Proč model pracuje s 30 lety?">
                Protože standardní česká hypotéka má splatnost 25–30 let a porovnání má smysl na celou dobu trvání závazku. Kratší horizont znevýhodňuje Scénář A, protože hypotéka je v prvních letech nejdražší a nemovitost ještě neamortizovala plnou hodnotu.
              </FaqItem>
              <FaqItem question="Proč porovnáváš s akciovým fondem a ne s dluhopisy nebo spořicím účtem?">
                Protože hypotéka je 30letý závazek a srovnávat ji s krátkodobými nástroji by nebylo správné. Spořicí účty mají proměnlivou sazbu závislou na aktuální repo sazbě ČNB. Globální diverzifikovaný akciový fond je standardní nástroj pro 30letý investiční horizont s odbornou shodou na pozitivním reálném výnosu.
              </FaqItem>
              <FaqItem question="Proč má Scénář B větší čisté jmění v prvních letech?">
                V prvních letech hypotéky je vlastní bydlení dražší než nájem. Scénář B v tu dobu investuje rozdíl, zatímco Scénář A splácí vysoké úroky a vedlejší fond ještě nevytváří. Bod zlomu se typicky pohybuje mezi 10. a 20. rokem v závislosti na parametrech.
              </FaqItem>
              <FaqItem question="Co když ceny nemovitostí porostou rychleji, než předpokládáš?">
                Změň si parametr <em>Růst hodnoty nemovitosti</em> v kalkulačce. Každé zvýšení o 1 procentní bod výrazně posiluje Scénář A. Je to jeden z nejcitlivějších parametrů celého modelu.
              </FaqItem>
              <FaqItem question="Kalkulačka říká, že vlastní bydlení vychází lépe. Mám si koupit byt?">
                Kalkulačka počítá finanční výsledek za konkrétních předpokladů. To nestačí jako základ pro rozhodnutí. Hypotéka je pákový nástroj: kupuješ aktivum za 5–7 milionů Kč s vlastními prostředky okolo milionu. Páka zesiluje zisky i ztráty. Nemovitost je koncentrovaná sázka na jedno konkrétní místo a jeden typ aktiva. Globální akciový fond drží tisíce firem po celém světě. A na rozdíl od fondu, který prodáš za sekundu, nemovitost nelze rychle prodat bez výrazné slevy. Rozhodnutí o bydlení má navíc rodinnou a životní složku, kterou čísla nezachytí. Výsledek kalkulačky je jeden vstup do rozhodování, ne odpověď na celou otázku.
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
          </div>
        </div>
      </section>

    </div>
  );
}
