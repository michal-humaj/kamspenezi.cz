import Link from "next/link";
import { Info } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScenarioBadge } from "@/components/ui/scenario-badge";
import { cn } from "@/lib/utils";

const STEP_CONTENT = [
  {
    step: 1,
    title: "Zadáš základní parametry",
    body: "Vybereš město, velikost bytu a upravíš pár čísel. Kupní cena, výše hypotéky, nájem, vlastní zdroje, odhadovaný výnos ETF a další parametry.",
  },
  {
    step: 2,
    title: "Dopočítáme zbytek za tebe",
    body: "Spočítáme splátku hypotéky, průběh dluhu, všechny náklady na vlastnictví bytu a průběžné investování do ETF při nájemním bydlení.",
  },
  {
    step: 3,
    title: "Ukážeme výsledek po třiceti letech",
    body: "Výstupem je srovnání čistého majetku ve scénáři A a B v korunách, včetně rozptylu výsledků podle Monte Carlo simulace.",
  },
];

const PRESET_SCENARIOS = [
  {
    title: "Praha – byt 2 plus kk pro mladý pár",
    desc: "Vyrovnaný rozpočet s vyšší pořizovací cenou a nižším nájmem díky sdílení nákladů.",
  },
  {
    title: "Brno – byt 2 plus kk první vlastní bydlení",
    desc: "Standardní měsíční rozpočet pro první hypotéku s kombinací vlastních zdrojů a podpory od rodičů.",
  },
  {
    title: "Ostrava – byt 2 plus kk startovní byt",
    desc: "Nižší pořizovací cena, ale vyšší relativní fond oprav a údržba.",
  },
  {
    title: "Plzeň – byt 3 plus kk pro rodinu",
    desc: "Větší dispozice se započtením vyšších nákladů na vybavení a pojištění.",
  },
  {
    title: "Olomouc – byt 1 plus kk pro single",
    desc: "Nižší nájem i hypotéka, důraz na flexibilitu a rychlejší změnu životní situace.",
  },
];

const FAQS = [
  {
    question: "Jak moc jsou tyhle výpočty přesné",
    answer:
      "Sto procent jistoty ti nedá žádný model. Pracujeme s realistickými odhady a simulací mnoha možných budoucností. Cílem není trefit přesné číslo, ale ukázat, jaký je rozdíl mezi scénáři při rozumných předpokladech.",
  },
  {
    question: "Počítáte s inflací",
    answer:
      "Ano. Náklady na bydlení i některé další položky rostou v čase podle inflace. Ve výsledku ukazujeme hodnotu majetku v nominálních korunách, aby se ti to lépe četlo. V metodice najdeš i možnost pracovat s hodnotami očištěnými o inflaci.",
  },
  {
    question: "Jaké ETF předpokládáte",
    answer:
      "Model předpokládá dlouhodobé investování do široce diverzifikovaných globálních akciových ETF podle tržní kapitalizace. Nekopíruje konkrétní produkt žádného poskytovatele, jde o obecný model výnosu globálního akciového trhu.",
  },
  {
    question: "Zohledňujete daně",
    answer:
      "Zohledňujeme daně tam, kde dávají při typickém použití smysl. U investic počítáme s dlouhodobým horizontem, kde v Česku často platí daňové osvobození po splnění časového testu. U nemovitostí zohledňujeme poplatky při prodeji. Detail najdeš v metodice.",
  },
  {
    question: "Můžu změnit horizont z třiceti let",
    answer:
      "V online verzi pracujeme primárně s třicetiletým horizontem, protože odpovídá běžné době splatnosti hypotéky a dlouhodobému investování. V Google Sheets verzi si můžeš horizont přizpůsobit podle sebe.",
  },
];

const SCENARIO_LIST = [
  {
    id: "A" as const,
    badge: "Byt na hypotéku",
    label: "Scénář A – vlastní bydlení na hypotéku",
    bullets: [
      "Koupíš byt v Česku financovaný hypotékou s horizontem třiceti let",
      "Platíš splátku hypotéky a všechny náklady spojené s vlastnictvím",
      "Po třiceti letech ti zůstává byt po odečtení poplatků a případného zůstatku dluhu",
    ],
  },
  {
    id: "B" as const,
    badge: "Nájem + ETF",
    label: "Scénář B – nájem plus ETF",
    bullets: [
      "Bydlíš v nájemním bytě",
      "Rozdíl mezi splátkou hypotéky a nájmem investuješ do globálních ETF",
      "Počáteční vlastní zdroje, které by šly do bytu, investuješ také",
      "Po třiceti letech ti zůstává investiční portfolio a žádná hypotéka",
    ],
  },
];
const HERO_TRUST_POINTS = [
  "Výsledek vidíš v korunách jako srovnání majetku po třiceti letech",
  "Počítáme s realistickými předpoklady výnosů globálních ETF",
  "Vzorce jsou transparentní a můžeš si je projít v Google Sheets krok za krokem",
];

const WHAT_YOU_GET = [
  "srovnání čistého majetku po třiceti letech ve scénáři vlastního bydlení a nájmu plus ETF",
  "rozpad výsledku na složky – hodnota bytu po odečtení poplatků a dluhu, hodnota investičního portfolia",
  "přehled všech pravidelných nákladů, které často zůstávají „mimo oči“ – fond oprav, údržba, pojištění, daň z nemovitosti",
  "citlivost na klíčové parametry – co se stane, když se výnosy ETF nebo růst cen nemovitostí odchýlí od předpokladů",
];

const UNCERTAINTY_POINTS = [
  "růst hodnoty nemovitosti",
  "růst nájmů",
  "výnos ETF",
  "inflaci nákladů",
];

const TARGET_USERS = {
  yes: [
    "řešíš první vlastní bydlení v Česku",
    "máš horizont minimálně dvacet až třicet let",
    "zajímá tě, jak nejlépe využít svůj měsíční rozpočet na bydlení",
    "jsi ochotný uvažovat i o investicích do ETF, nejen o „cihlách“",
  ],
  no: [
    "kupuješ byt čistě jako investiční nemovitost k pronájmu",
    "chceš spekulovat krátkodobě na růst cen bytů",
    "hledáš nástroj na výběr konkrétního ETF nebo obchodování na páku",
  ],
};

const FAQ_SECTION_ID = "faq";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <SectionWrapper variant="alt">
        <SectionHeading title="Nájem není vyhazování peněz z okna. Pokud peníze navíc pracují" />
        <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-text-muted">
          <p>Celý život slýcháme větu, že nájem je vyhazování peněz.</p>
          <p>Realita je složitější.</p>
          <p>Nájem dává smysl hlavně tehdy:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">když potřebuješ flexibilitu a nechceš se vázat na jedno místo</li>
            <li className="list-disc">když rozdíl mezi nájmem a hypotékou nenecháš ležet na účtu, ale pravidelně investuješ</li>
          </ul>
          <p className="text-text-main">Naše kalkulačka proto neporovnává hypotéku s prázdným vzduchem.</p>
          <p>Porovnává:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">vlastní bydlení na hypotéku</li>
            <li className="list-disc">nájem, kde rozdíl v platbách posíláš do ETF</li>
          </ul>
          <p>
            Díky tomu uvidíš, jestli ti víc majetku za třicet let přinese byt v osobním vlastnictví, nebo investiční portfolio
            při nájemním bydlení.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          title="Co přesně kalkulačka porovnává"
          subtitle="Dvě konkrétní cesty. Stejný měsíční rozpočet. Jiný výsledek po třiceti letech."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SCENARIO_LIST.map((scenario) => (
            <div key={scenario.label} className="rounded-[32px] border border-border-subtle bg-surface-default p-6 shadow-card md:p-7">
              <ScenarioBadge scenario={scenario.id} label={scenario.badge} />
              <p className="mt-4 font-displaySerif text-[26px] leading-tight text-text-main">{scenario.label}</p>
              <ul className="mt-4 space-y-2 pl-5 text-[16px] leading-[1.6] text-text-muted">
                {scenario.bullets.map((point) => (
                  <li key={point} className="list-disc">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[620px] text-[16px] leading-[1.6] text-text-muted">
          Kalkulačka spočítá, jaký čistý majetek budeš mít v každém scénáři, pokud se budeš držet stejného měsíčního rozpočtu na
          bydlení.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <SectionHeading title="Jak kalkulačka funguje" subtitle="Tři kroky. Žádné tabulky, žádná raketová věda." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEP_CONTENT.map((step) => (
            <Card key={step.title} className="h-full rounded-[20px] border-border-subtle bg-surface-default p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                Krok {String(step.step).padStart(2, "0")}
              </span>
              <p className="mt-3 font-displaySerif text-[22px] leading-snug text-text-main">{step.title}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-text-muted">{step.body}</p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading title="Jak vypadá výsledek" />
        <div className="mt-6 space-y-6">
          <div className="space-y-3 text-[16px] leading-[1.6] text-text-muted">
            <p>Výsledek není jen jedno číslo. Uvidíš:</p>
            <ul className="space-y-2 pl-5">
              <li className="list-disc">dva sloupce nebo box ploty pro scénář vlastního bydlení a scénář nájem plus ETF</li>
              <li className="list-disc">střední odhad hodnoty majetku po třiceti letech</li>
              <li className="list-disc">pásmo, ve kterém se výsledky typicky pohybují, pokud se trh vyvíjí lépe nebo hůř</li>
            </ul>
            <p className="text-text-main">
              Neukážeme ti jednu jistou budoucnost. Ukážeme ti realistický rozsah možných výsledků a to, jak si proti sobě
              scénáře stojí.
            </p>
          </div>
          <div className="rounded-[20px] border border-border-subtle bg-surface-default p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">Ukázkové srovnání</p>
            <p className="mt-2 font-displaySerif text-[28px] leading-snug text-text-main">30 let dopředu, dva scénáře</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:divide-x lg:divide-border-subtle">
              <div className="space-y-3 lg:pr-6">
                <ScenarioBadge scenario="A" label="Byt na hypotéku" />
                <p className="text-sm uppercase tracking-wide text-text-muted">Medián čistého majetku</p>
                <p className="text-[32px] font-semibold leading-tight text-text-main">8,4 mil. Kč</p>
                <p className="text-sm text-text-muted">Hodnota bytu po odečtení poplatků a zůstatku hypotéky.</p>
              </div>
              <div className="space-y-3 lg:pl-6">
                <ScenarioBadge scenario="B" label="Nájem + ETF" />
                <p className="text-sm uppercase tracking-wide text-text-muted">Medián čistého majetku</p>
                <p className="text-[32px] font-semibold leading-tight text-text-main">7,1 mil. Kč</p>
                <p className="text-sm text-text-muted">Hodnota investičního portfolia z rozdílu mezi nájmem a hypotékou.</p>
              </div>
            </div>
            <p className="mt-6 text-[16px] leading-[1.6] text-text-muted">
              Ve scénáři A ti zůstává byt po odečtení poplatků a zůstatku hypotéky. Ve scénáři B portfolia z pravidelných
              investic.
            </p>
          </div>
          <p className="text-sm text-text-muted">
            Čísla jsou ilustrativní. Přesný výsledek uvidíš po zadání svých parametrů. Monte Carlo je simulace, ne záruka.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <SectionHeading title="Začni podle svého města a velikosti bytu" />
        <p className="mt-6 max-w-[620px] text-[16px] leading-[1.6] text-text-muted">
          Nemusíš znát přesná čísla z hlavy. Stačí orientační představa. Předvyplníme kupní ceny a nájmy podle typických hodnot v
          daném městě.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PRESET_SCENARIOS.map((scenario) => (
            <Card key={scenario.title} className="h-full rounded-[20px] border-border-subtle bg-surface-default p-8">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <p className="font-displaySerif text-[22px] leading-snug text-text-main">{scenario.title}</p>
                  <p className="mt-2 text-[16px] leading-[1.6] text-text-muted">{scenario.desc}</p>
                </div>
                <Button asChild>
                  <Link href="/bydleni-kalkulacka">Spočítat tenhle scénář</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading title="Co přesně z kalkulačky dostaneš" />
        <div className="mt-6 space-y-6 text-[16px] leading-[1.6] text-text-muted">
          <ul className="space-y-2 pl-5">
            {WHAT_YOU_GET.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-[32px] border border-border-subtle bg-surface-soft p-6">
            <p className="font-semibold text-text-main">Cíl kalkulačky</p>
            <p className="mt-2">
              Neříká ti, co máš dělat. Dává ti čísla, aby tvoje rozhodnutí nestálo jen na pocitech nebo na větě „tak to dělali
              rodiče“.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <SectionHeading title="Budoucnost nezná nikdo. Proto používáme Monte Carlo simulaci" />
        <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-text-muted">
          <p>Nikdo neumí přesně říct, jaké budou úrokové sazby, ceny bytů ani výnosy ETF za třicet let.</p>
          <p>Místo jednoho odhadu proto počítáme tisíce možných budoucností.</p>
          <p>V každém scénáři náhodně variujeme:</p>
          <ul className="space-y-2 pl-5">
            {UNCERTAINTY_POINTS.map((point) => (
              <li key={point} className="list-disc">
                {point}
              </li>
            ))}
          </ul>
          <p>Získáme tak tisíce kombinací a u každé spočítáme, jak dopadne tvůj majetek ve scénáři A a B.</p>
          <p>Výsledek:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">uvidíš nejen průměr, ale i to, jak si scénáře vedou v lepších a horších letech</li>
            <li className="list-disc">snáze pochopíš, který scénář je robustnější vůči nepříznivému vývoji</li>
          </ul>
          <p>Pro zájemce bude k dispozici podrobná metodika výpočtu na samostatné stránce.</p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading title="Pro koho tahle kalkulačka je a pro koho není" subtitle="Ať ji používají ti, kterým může reálně pomoct." />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-[20px] border border-border-subtle bg-surface-default p-8">
            <p className="font-displaySerif text-[22px] leading-snug text-text-main">Je pro tebe, pokud:</p>
            <ul className="mt-4 space-y-2 pl-5 text-[16px] leading-[1.6] text-text-muted">
              {TARGET_USERS.yes.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-border-subtle bg-surface-default p-8">
            <p className="font-displaySerif text-[22px] leading-snug text-text-main">Není pro tebe, pokud:</p>
            <ul className="mt-4 space-y-2 pl-5 text-[16px] leading-[1.6] text-text-muted">
              {TARGET_USERS.no.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">Pokud řešíš investiční byt k pronájmu, použij kalkulačku Investice.</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt" contentClassName="lg:pb-[80px]">
        <SectionHeading title="Kdo stojí za kamspenezi.cz a jak počítáme" />
        <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-text-muted">
          <p>
            Kalkulačku vyvíjíme jako nezávislý nástroj pro lidi, kteří chtějí dělat lepší finanční rozhodnutí v oblasti
            bydlení a investic.
          </p>
          <div>
            <p className="font-semibold text-text-main">Co je pro nás důležité:</p>
            <ul className="mt-3 space-y-2 pl-5">
              <li className="list-disc">Neprodáváme hypotéky ani investiční produkty</li>
              <li className="list-disc">Nejsme banka ani realitka</li>
              <li className="list-disc">Výpočty stojí na principech, které můžeš dohledat v seriózní finanční literatuře</li>
            </ul>
          </div>
          <div className="rounded-[20px] border border-border-strong bg-bg-subtle p-8">
            <div className="flex items-center gap-3 text-text-main">
              <Info className="h-5 w-5 text-text-muted" aria-hidden />
              <p className="font-displaySerif text-[22px] leading-snug">Chceš vidět pod kapotu</p>
            </div>
            <ul className="mt-4 space-y-2 pl-5">
              <li className="list-disc">kompletní metodika výpočtu</li>
              <li className="list-disc">veřejný Google Sheet se všemi vzorci</li>
              <li className="list-disc">popis vstupních dat a předpokladů</li>
            </ul>
            <p className="mt-4">Můžeš si tak celý model zkontrolovat, upravit nebo zkopírovat k sobě.</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id={FAQ_SECTION_ID} contentClassName="flex justify-center">
        <div className="w-full max-w-[760px]">
          <SectionHeading title="Nejčastější otázky" />
          <p className="mt-4 text-[16px] leading-[1.6] text-text-muted">
            Shrnuje odpovědi na dotazy, které slyšíme nejčastěji. Pokud hledáš detailnější metodiku, otevři veřejné Google
            Sheets.
          </p>
          <Accordion type="single" collapsible className="mt-6 space-y-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-[18px] border border-border-subtle/70 bg-surface-default px-4"
              >
                <AccordionTrigger className="py-4 text-left text-[16px] font-medium text-text-main">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-[1.6] text-text-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading title="Řešíš spíš investiční byt než vlastní bydlení" />
        <div className="mt-6 space-y-4 text-[16px] leading-[1.6] text-text-muted">
          <p>Tahle kalkulačka řeší otázku, kde budeš bydlet ty nebo tvoje rodina.</p>
          <p>
            Pokud už byt máš a zvažuješ další nemovitost jako investici k pronájmu, je pro tebe vhodnější kalkulačka Investice.
          </p>
          <p>Ta porovnává:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              koupi bytu na hypotéku s dlouhodobým pronájmem plus reinvestováním příjmů do ETF
            </li>
            <li className="list-disc">čisté investování stejného objemu peněz pouze do ETF bez nemovitosti</li>
          </ul>
          <Button asChild>
            <Link href="/investice">Chci spočítat investiční byt</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <div className="rounded-[20px] border border-border-subtle bg-surface-default p-8">
          <p className="font-displaySerif text-[28px] leading-tight text-text-main">
            Zajímá tě i růst investic
          </p>
          <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-text-muted">
            Vyzkoušej kalkulačku Investice. Porovná dlouhodobé ETF investice se scénářem nákupu investičního bytu a ukáže, kde může
            tvůj rozpočet pracovat lépe.
          </p>
          <div className="mt-4">
            <Button asChild className="text-action-primaryText">
              <Link href="/investice">Otevřít kalkulačku investic</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          title="Než se uvážeš k hypotéce na třicet let, spočítej si, jestli je to pro tebe opravdu nejlepší volba"
          subtitle="Zabere ti to jen pár minut a může ti to ušetřit roky špatného rozhodnutí."
        />
        <div className="mt-8 space-y-4">
          <Button size="lg" asChild className="bg-accent-dark text-white">
            <Link href="/bydleni-kalkulacka">Spočítat moje bydlení</Link>
          </Button>
          <p className="text-sm text-text-muted">Bez registrace, zdarma, postavené na reálných datech z českého trhu</p>
        </div>
      </SectionWrapper>
    </>
  );
}

function SectionWrapper({
  children,
  id,
  variant = "default",
  divider = false,
  contentClassName,
}: {
  children: React.ReactNode;
  id?: string;
  variant?: "default" | "alt" | "narrow";
  divider?: boolean;
  contentClassName?: string;
}) {
  const background =
    variant === "alt"
      ? "bg-bg-subtle"
      : variant === "narrow"
        ? "bg-transparent"
        : "bg-bg-default";
  const padding =
    variant === "narrow" ? "py-12" : "py-[64px] lg:pt-[96px] lg:pb-[96px]";

  return (
    <section id={id} className={cn(background, divider && "border-t border-border-subtle")}>
      <div className={cn("mx-auto w-full max-w-[1120px] px-6", padding, contentClassName)}>{children}</div>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="font-displaySerif text-[clamp(32px,4vw,40px)] leading-[1.2] text-text-main">{title}</h2>
      {subtitle ? (
        <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-bg-default">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-8 pb-12 md:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8 lg:pt-16 lg:pb-16">
        <div className="max-w-[560px]">
          <span className="inline-flex items-center rounded-full bg-surface-soft px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-text-muted">
            Online kalkulačka bydlení
          </span>
          <h1 className="mt-5 font-displaySerif text-[clamp(40px,5vw,60px)] leading-[1.1] text-text-main">
            Bydlet ve vlastním, nebo v nájmu
          </h1>
          <p className="mt-3 text-[clamp(18px,3vw,20px)] font-medium leading-[1.6] text-text-muted">
            Kalkulačka porovná dvě cesty. Koupi bytu na hypotéku a nájem, kdy rozdíl v platbách investuješ do ETF. Výsledek
            uvidíš jako srovnání majetku po třiceti letech.
          </p>
          <div className="mt-5 space-y-2">
            <Button size="lg" asChild className="bg-accent-dark px-8 py-3 text-lg text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.18)]">
              <Link href="/bydleni-kalkulacka">Spočítat moje bydlení</Link>
            </Button>
            <p className="text-sm text-text-soft">Zdarma, bez registrace</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-soft px-4 py-2 text-sm text-text-muted">
              <span role="img" aria-hidden>
                🇨🇿
              </span>
              <span>Pracujeme s daty pro Prahu, Brno, Ostravu, Plzeň a další města.</span>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-sm md:text-base text-text-muted">
            {HERO_TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-text-soft" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <div className="rounded-[32px] border border-border-subtle bg-surface-default px-6 py-6 shadow-hero md:px-8 md:py-7 lg:ml-auto lg:max-w-md lg:px-10 lg:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Ukázkové srovnání</p>
            <p className="mt-2 font-displaySerif text-[22px] md:text-[26px] leading-snug text-text-main">30 let dopředu, dva scénáře</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-accent-peachSoft px-3.5 py-1.5 text-xs font-medium text-text-main">
                <span className="h-2 w-2 rounded-full bg-accent-peach" aria-hidden />
                <span>Byt na hypotéku</span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-accent-lilacSoft px-3.5 py-1.5 text-xs font-medium text-text-main">
                <span className="h-2 w-2 rounded-full bg-accent-lilac" aria-hidden />
                <span>Nájem + ETF</span>
              </button>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:divide-x md:divide-border-subtle">
              <div className="space-y-3 lg:pr-6">
                <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Medián čistého majetku</p>
                <p className="font-displaySerif text-[28px] md:text-[32px] font-semibold leading-tight text-text-main">8,4 mil. Kč</p>
                <p className="text-sm text-text-muted">Hodnota bytu po odečtení poplatků a zůstatku hypotéky.</p>
              </div>
              <div className="space-y-3 md:pl-6">
                <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Medián čistého majetku</p>
                <p className="font-displaySerif text-[28px] md:text-[32px] font-semibold leading-tight text-text-main">7,1 mil. Kč</p>
                <p className="text-sm text-text-muted">Hodnota investičního portfolia z rozdílu mezi nájmem a hypotékou.</p>
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-[1.6] text-text-muted">
              Scénáře porovnávají stejné měsíční výdaje na bydlení – rozdíl je v tom, jestli peníze končí v hypotéce, nebo v ETF.
            </p>
            <p className="mt-3 text-xs text-text-soft">Čísla jsou ilustrativní. Přesný výsledek uvidíš po zadání svých parametrů.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
