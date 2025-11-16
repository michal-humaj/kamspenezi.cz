"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_BULLETS = [
  "Výsledek vidíš v korunách jako srovnání majetku po třiceti letech",
  "Počítáme s realistickými předpoklady výnosů globálních ETF",
  "Vzorce jsou transparentní a můžeš si je projít v Google Sheets krok za krokem",
];

const STEP_CONTENT = [
  {
    step: 1,
    title: "Zadáš základní parametry",
    body: "Vybereš město, velikost bytu a upravíš pár čísel. Kupní cena, výše hypotéky, nájem, vlastní zdroje a odhadovaný výnos ETF.",
  },
  {
    step: 2,
    title: "Dopočítáme zbytek za tebe",
    body: "Spočítáme splátku hypotéky, průběh dluhu, všechny náklady na vlastnictví bytu a průběžné investování do ETF.",
  },
  {
    step: 3,
    title: "Ukážeme výsledek po třiceti letech",
    body: "Výstupem je srovnání čistého majetku ve scénáři A a B v korunách, včetně rozptylu výsledků podle Monte Carlo simulace.",
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

const MYTH_LIST = [
  "Nájem znamená posílat každý měsíc peníze pryč a nic z nich nemít",
  "Hypotéka je vždy lepší, protože \"buduješ vlastní majetek\"",
  "Když splácíš byt, na konci ti zůstane byt, u nájmu ne",
];

const REALITY_LIST = [
  "Když rozdíl mezi nájmem a hypotékou investuješ, peníze pracují",
  "Vlastnictví bytu má náklady, které nájem nemá (údržba, daně, pojištění)",
  "Po třiceti letech může mít investiční portfolio hodnotu srovnatelnou s bytem",
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

export default function HomePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--bg-main)] pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Copy and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-[var(--accent-neutral-pill)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                Online kalkulačka bydlení
              </span>
              
              <h1 className="mt-5 text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-tight">
                Bydlet ve vlastním, nebo v nájmu
              </h1>

              <div className="mt-5 max-w-xl space-y-2">
                <p className="text-[17px] leading-[1.55] text-[var(--text-primary)]">
                  Kalkulačka porovná koupi bytu na hypotéku a nájem s investicemi do ETF. Výsledek uvidíš jako srovnání majetku po třiceti letech.
                </p>
                <p className="text-[15px] italic leading-[1.6] text-[var(--text-secondary)]">
                  Rozhodnutí o bydlení ti ovlivní celý život. Udělej ho na datech, ne na pocitu.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-brand-cta text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#1a1a1a]"
                >
                  <Link href="/bydleni-kalkulacka">Spočítat moje bydlení</Link>
                </Button>
                
                <button
                  onClick={() => scrollToSection("jak-kalkulacka-funguje")}
                  className="text-[15px] font-medium text-[var(--text-primary)] underline underline-offset-4 transition-colors hover:text-[var(--text-secondary)]"
                >
                  Zjistit, jak výpočet funguje
                </button>
              </div>

              {/* Meta info */}
              <div className="mt-4 space-y-2">
                <p className="text-sm text-[var(--text-secondary)]">Zdarma, bez registrace</p>
                
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] shadow-sm">
                  <span>🇨🇿</span>
                  <span>Pracujeme s daty pro Prahu, Brno, Ostravu, Plzeň a další města</span>
                </div>
              </div>

              {/* Hero bullets */}
              <ul className="mt-6 space-y-3">
                {HERO_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[15px] leading-[1.6] text-[var(--text-secondary)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-own)]" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="w-full max-w-md rounded-3xl bg-[radial-gradient(circle_at_top,_#FFFFFF,_#F1E7DB)] p-12 text-center shadow-card">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--card-bg)]">
                  <BarChart3 className="h-12 w-12 text-[var(--accent-own)]" strokeWidth={1.5} />
                </div>
                <p className="mt-6 font-displaySerif text-xl font-semibold text-[var(--text-primary)]">
                  Vizualizace výsledků tvého bydlení
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Později sem doplníme prémiovou ilustraci.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview strip */}
      <section 
        className="cursor-pointer bg-[var(--bg-alt)] py-8 transition-colors hover:bg-[#EFE7DD]"
        onClick={() => scrollToSection("jak-kalkulacka-funguje")}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Jednoduchý proces
          </p>
          <h2 className="mt-2 text-center text-2xl">
            Jak kalkulačka funguje ve třech krocích
          </h2>
          
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEP_CONTENT.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-own)] text-white">
                  <span className="font-displaySerif text-lg font-semibold">{step.step}</span>
                </div>
                <p className="mt-3 text-[15px] font-medium text-[var(--text-primary)]">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed steps section */}
      <section id="jak-kalkulacka-funguje" className="scroll-mt-20 bg-[var(--bg-main)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Jednoduchý proces
          </p>
          <h2 className="mt-2 text-[32px] md:text-[38px]">
            Jak kalkulačka funguje
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Tři kroky. Žádné tabulky, žádná raketová věda.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEP_CONTENT.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-3xl bg-[var(--card-bg)] p-6 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-own)] text-white">
                  <span className="font-displaySerif text-xl font-semibold">{step.step}</span>
                </div>
                <h3 className="mt-4 text-[19px] font-semibold leading-tight">{step.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results section */}
      <section className="bg-[var(--bg-alt)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Výsledek
          </p>
          <h2 className="mt-2 text-[32px] md:text-[38px]">
            Jak vypadá výsledek
          </h2>
          
          <div className="mt-6 space-y-3">
            <p className="text-[17px] leading-relaxed text-[var(--text-secondary)]">
              Výsledek není jen jedno číslo. Uvidíš:
            </p>
            <ul className="space-y-2 pl-6 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <li className="list-disc">Dva sloupce nebo box ploty pro scénář vlastního bydlení a scénář nájem plus ETF</li>
              <li className="list-disc">Střední odhad hodnoty majetku po třiceti letech</li>
              <li className="list-disc">Pásmo, ve kterém se výsledky typicky pohybují, pokud se trh vyvíjí lépe nebo hůř</li>
            </ul>
          </div>

          {/* Comparison card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-3xl bg-[var(--card-bg)] p-8 shadow-card"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--text-secondary)]">
              Ukázkové srovnání
            </p>
            <h3 className="mt-3 text-[25px]">
              30 let dopředu, dva scénáře
            </h3>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-own)]/10 px-3 py-1.5 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-own)]" />
                  Byt na hypotéku
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Medián čistého majetku
                  </p>
                  <p className="mt-1 font-displaySerif text-[36px] font-semibold leading-none">
                    8,4 mil. Kč
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Hodnota bytu po odečtení poplatků a hypotéky
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-etf)]/10 px-3 py-1.5 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-etf)]" />
                  Nájem + ETF
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Medián čistého majetku
                  </p>
                  <p className="mt-1 font-displaySerif text-[36px] font-semibold leading-none">
                    7,1 mil. Kč
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Hodnota portfolia z rozdílu plateb
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-[14px] leading-[1.6] text-[var(--text-secondary)]">
              Scénáře porovnávají stejné měsíční výdaje – rozdíl je jen v tom, kam peníze jdou.
            </p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Čísla jsou ilustrativní. Přesný výsledek uvidíš po zadání svých parametrů.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Myth vs Reality */}
      <section className="bg-[var(--bg-main)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Mýty o nájmu
          </p>
          <h2 className="mt-2 text-[32px] md:text-[38px]">
            Nájem není vyhazování peněz z okna
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Pokud peníze navíc pracují
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
            {/* Myth column */}
            <div>
              <h3 className="text-[15px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Mýtus
              </h3>
              <ul className="mt-4 space-y-3">
                {MYTH_LIST.map((myth) => (
                  <li key={myth} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-1.5 text-[var(--text-secondary)]">×</span>
                    <span>{myth}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reality column */}
            <div>
              <h3 className="text-[15px] font-semibold uppercase tracking-wide text-[var(--text-primary)]">
                Realita
              </h3>
              <ul className="mt-4 space-y-3">
                {REALITY_LIST.map((reality) => (
                  <li key={reality} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-primary)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-etf)]" />
                    <span>{reality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios section */}
      <section className="bg-[var(--bg-alt)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            Dvě cesty
          </p>
          <h2 className="mt-2 text-[32px] md:text-[38px]">
            Co přesně kalkulačka porovnává
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--text-secondary)]">
            Stejný měsíční rozpočet. Jiný výsledek po třiceti letech.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {SCENARIO_LIST.map((scenario) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-[var(--card-bg)] p-7 shadow-card"
              >
                <span className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                  scenario.id === "A" ? "bg-[var(--accent-own)]/10" : "bg-[var(--accent-etf)]/10"
                )}>
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    scenario.id === "A" ? "bg-[var(--accent-own)]" : "bg-[var(--accent-etf)]"
                  )} />
                  {scenario.badge}
                </span>
                <h3 className="mt-4 text-[22px] font-semibold leading-tight">{scenario.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {scenario.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--text-secondary)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency section */}
      <section className="bg-[var(--bg-main)] py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[32px] md:text-[38px]">
            Transparentní výpočet, žádná tajemství
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {/* Left: Methodology */}
            <div className="space-y-6">
              <p className="text-[17px] leading-relaxed text-[var(--text-secondary)]">
                Nejsme banka ani prodejce hypoték. Kalkulačku jsme postavili tak, aby si každý mohl výpočty zkontrolovat a upravit podle sebe.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Veřejný Google Sheet se všemi vzorci a předpoklady",
                  "Popis vstupních dat a zdrojů",
                  "Možnost změnit parametry a spočítat si vlastní scénáře"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-own)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="secondary">
                <a 
                  href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Otevřít metodiku v Google Sheets
                </a>
              </Button>
            </div>

            {/* Right: Author card */}
            <div className="rounded-3xl bg-[var(--card-bg)] p-7 shadow-card">
              <h3 className="text-[19px] font-semibold">Kdo za kalkulačkou stojí</h3>
              
              <div className="mt-6 flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-200">
                  {/* Placeholder for avatar */}
                  <div className="flex h-full w-full items-center justify-center bg-[var(--accent-neutral-pill)] text-2xl font-semibold text-[var(--text-primary)]">
                    M
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">Michal Humaj</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Produktový manažer a investor, který řeší stejné otázky jako ty.
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    Kalkulačka je nezávislý projekt. Michal neprodává hypotéky ani investiční produkty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-alt)] py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[32px] md:text-[38px]">
            Nejčastější otázky
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Shrnujeme odpovědi na otázky, které slyšíme nejčastěji. Pokud hledáš detailnější metodiku, otevři veřejný Google Sheet.
          </p>

          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border border-gray-200 bg-[var(--card-bg)] px-6 py-2 shadow-sm"
              >
                <AccordionTrigger className="text-left text-[16px] font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[var(--bg-main)] py-12">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} kamspenezi.cz
          </p>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Nejedná se o investiční ani hypoteční poradenství. Používej vlastní rozum a případně se poraď s odborníkem.
          </p>
          <p className="mt-4">
            <a
              href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-primary)] underline underline-offset-4 hover:text-[var(--text-secondary)]"
            >
              Metodika v Google Sheets
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
