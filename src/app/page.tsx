"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HERO_BULLETS = [
  "Výsledek vidíš v korunách jako srovnání majetku po třiceti letech",
  "Počítáme s realistickými předpoklady výnosů globálních ETF",
  <>
    Vzorce jsou transparentní a můžeš si je projít v{" "}
    <a
      href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 transition-colors hover:text-[var(--accent-cool)]"
    >
      Google Sheets krok za krokem
    </a>
  </>,
];

const CITY_PRESETS = [
  {
    id: "praha-2kk-par",
    title: "Praha – 2+kk pro mladý pár",
    description: "Vyrovnaný rozpočet s vyšší pořizovací cenou a nižším nájmem díky sdílení nákladů.",
  },
  {
    id: "brno-2kk-prvni",
    title: "Brno – 2+kk první vlastní bydlení",
    description: "Standardní měsíční rozpočet pro první hypotéku s kombinací vlastních zdrojů a podpory od rodičů.",
  },
  {
    id: "ostrava-31-rodina",
    title: "Ostrava – 3+1 pro rodinu",
    description: "Větší dispozice s nižší pořizovací cenou, ale vyššími náklady na údržbu.",
  },
  {
    id: "plzen-2kk-start",
    title: "Plzeň – 2+kk startovní byt",
    description: "Střední rozpočet s rozumným poměrem nájem vs. hypotéka.",
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

const CALCULATOR_LIMITS = [
  "Neřeší extrémní scénáře příjmů nebo nezaměstnanosti",
  "Neumí odhadnout náklady na velké rekonstrukce",
  "Nezohledňuje individuální daně a legislativní změny v budoucnu",
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
];

export default function HomePage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePresetSelect = (presetId: string) => {
    // TODO: Load preset values from Google Sheet and prefill calculator
    console.log("Selected preset:", presetId);
    // Navigate to calculator with preset query param
    // window.location.href = `/bydleni-kalkulacka?preset=${presetId}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--bg-page)] pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Copy and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="inline-flex items-center rounded-full bg-[var(--bg-section)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Online kalkulačka bydlení
              </span>
              
              <h1 className="mt-5 text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-tight">
                Bydlet ve vlastním, nebo v nájmu
              </h1>

              <p className="mt-4 max-w-xl text-lg text-[var(--text-main)] md:text-xl">
                Kalkulačka porovná dvě cesty: koupit byt na hypotéku, nebo bydlet v nájmu a rozdíl v platbách investovat do ETF. Uvidíš, jaký majetek ti vyjde po třiceti letech.
              </p>

              <p className="mt-3 max-w-xl text-base italic text-[var(--text-muted)] md:text-lg">
                Rozhodnutí o bydlení ti ovlivní celý život. Udělej ho na datech, ne na pocitu.
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-col items-start gap-3">
                <Button 
                  size="lg" 
                  asChild 
                  className="bg-[var(--cta-bg)] text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#1a1a1a]"
                >
                  <Link href="/bydleni-kalkulacka">Spočítat moje bydlení</Link>
                </Button>
                
                <button
                  onClick={() => scrollToSection("transparentnost")}
                  className="inline-block text-sm font-medium text-[var(--text-main)] underline underline-offset-4 transition-colors hover:text-[var(--text-muted)] md:text-base"
                >
                  Zjistit, jak výpočet funguje
                </button>
              </div>

              {/* Meta pills */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-section)] px-4 py-1.5 text-sm text-[var(--text-muted)]">
                  Zdarma, bez registrace
                </span>
                
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-section)] px-4 py-1.5 text-sm text-[var(--text-muted)]">
                  <span>🇨🇿</span>
                  <span>Pracujeme s daty pro Prahu, Brno, Ostravu, Plzeň a další města</span>
                </span>
              </div>

              {/* Hero bullets */}
              <ul className="mt-6 space-y-2 text-sm text-[var(--text-muted)] md:text-base">
                {HERO_BULLETS.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="mt-10 lg:mt-0 lg:w-[380px] xl:w-[420px] lg:ml-auto"
            >
              <div className="flex flex-col items-center rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-8 text-center shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-cool)]/20">
                  <svg className="h-10 w-10 text-[var(--accent-cool)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="13" width="4" height="8" rx="1" />
                    <rect x="10" y="9" width="4" height="12" rx="1" />
                    <rect x="17" y="5" width="4" height="16" rx="1" />
                  </svg>
                </div>
                <h3 className="mt-6 font-displaySerif text-xl font-semibold text-[var(--text-main)]">
                  Vizualizace výsledků tvého bydlení
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  Později sem doplníme prémiovou ilustraci s grafem a výsledkem kalkulačky.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* City Presets Section */}
      <section className="bg-[var(--bg-section)] py-12 lg:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl">
            Začni podle svého města a velikosti bytu
          </h2>
          <p className="mt-2 max-w-3xl text-base text-[var(--text-muted)] md:text-lg">
            Vyber si výchozí scénář, který se ti nejvíc blíží. V kalkulačce ho pak můžeš doladit podle sebe.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CITY_PRESETS.map((preset, index) => (
              <motion.div
                key={preset.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(15,23,42,0.08)" }}
                className="flex flex-col rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-shadow"
              >
                <h3 className="font-displaySerif text-lg font-semibold leading-tight text-[var(--text-main)]">
                  {preset.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                  {preset.description}
                </p>
                <button
                  onClick={() => handlePresetSelect(preset.id)}
                  className="mt-4 text-sm font-medium text-[var(--text-main)] underline underline-offset-4 transition-colors hover:text-[var(--accent-cool)]"
                >
                  Použít jako výchozí
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results section */}
      <section className="bg-[var(--bg-page)] py-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Výsledek
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Jak vypadá výsledek
          </h2>
          
          <div className="mt-6 max-w-3xl space-y-3">
            <p className="text-base text-[var(--text-muted)] md:text-lg">
              Výsledek není jen jedno číslo. Uvidíš:
            </p>
            <ul className="space-y-2 pl-6 text-sm text-[var(--text-muted)] md:text-base">
              <li className="list-disc">Dva sloupce nebo box ploty pro scénář vlastního bydlení a scénář nájem plus ETF</li>
              <li className="list-disc">Střední odhad hodnoty majetku po třiceti letech</li>
              <li className="list-disc">Pásmo, ve kterém se výsledky typicky pohybují, pokud se trh vyvíjí lépe nebo hůř</li>
            </ul>
          </div>

          {/* Comparison card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-5xl rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Ukázkové srovnání
            </p>
            <h3 className="mt-2 font-displaySerif text-xl font-semibold md:text-2xl">
              30 let dopředu, dva scénáře
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Scenario A */}
              <motion.div
                whileHover={{ y: -4 }}
                className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 transition-transform"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent-warm)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-main)]/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-main)]" />
                  Byt na hypotéku
                </span>
                <div className="mt-2">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                    Medián čistého majetku
                  </p>
                  <p className="mt-1 font-displaySerif text-2xl font-semibold leading-none text-[var(--text-main)] md:text-3xl">
                    8,4 mil. Kč
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    Hodnota bytu po odečtení poplatků a zůstatku hypotéky.
                  </p>
                </div>
              </motion.div>

              {/* Scenario B */}
              <motion.div
                whileHover={{ y: -4 }}
                className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 transition-transform"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent-cool)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-main)]/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-main)]" />
                  Nájem + ETF
                </span>
                <div className="mt-2">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                    Medián čistého majetku
                  </p>
                  <p className="mt-1 font-displaySerif text-2xl font-semibold leading-none text-[var(--text-main)] md:text-3xl">
                    7,1 mil. Kč
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    Hodnota investičního portfolia z rozdílu mezi nájmem a hypotékou.
                  </p>
                </div>
              </motion.div>
            </div>

            <p className="mt-6 text-sm leading-[1.6] text-[var(--text-muted)]">
              Scénáře porovnávají stejné měsíční výdaje – rozdíl je jen v tom, kam peníze jdou.
            </p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Čísla jsou ilustrativní. Přesný výsledek uvidíš po zadání svých parametrů.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Myth vs Reality */}
      <section className="bg-[var(--bg-section)] py-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Mýty o nájmu
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Nájem není vyhazování peněz z okna
          </h2>
          <p className="mt-3 text-base text-[var(--text-muted)] md:text-lg">
            Pokud peníze navíc pracují
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
            {/* Myth column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Mýtus
              </h3>
              <ul className="mt-4 space-y-3">
                {MYTH_LIST.map((myth) => (
                  <li key={myth} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                    <span className="mt-1.5 text-[var(--text-muted)]">×</span>
                    <span>{myth}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reality column */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-main)]">
                Realita
              </h3>
              <ul className="mt-4 space-y-3">
                {REALITY_LIST.map((reality) => (
                  <li key={reality} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-main)] md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-cool)]" />
                    <span>{reality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios section */}
      <section className="bg-[var(--bg-page)] py-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Dvě cesty
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Co přesně kalkulačka porovnává
          </h2>
          <p className="mt-3 max-w-3xl text-base text-[var(--text-muted)] md:text-lg">
            Stejný měsíční rozpočet. Jiný výsledek po třiceti letech.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {SCENARIO_LIST.map((scenario) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(15,23,42,0.08)" }}
                className="rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition-shadow"
              >
                <span className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
                  scenario.id === "A" 
                    ? "bg-[var(--accent-warm)]/80 text-[var(--text-main)]/90" 
                    : "bg-[var(--accent-cool)]/80 text-[var(--text-main)]/90"
                )}>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-main)]" />
                  {scenario.badge}
                </span>
                <h3 className="mt-4 font-displaySerif text-xl font-semibold leading-tight md:text-[22px]">
                  {scenario.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {scenario.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]" />
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
      <section id="transparentnost" className="scroll-mt-20 bg-[var(--bg-section)] py-12 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl">
            Transparentní výpočet, žádná tajemství
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {/* Left: Methodology */}
            <div className="space-y-6">
              <p className="text-base text-[var(--text-muted)] md:text-lg">
                Nejsme banka ani prodejce hypoték. Kalkulačku jsme postavili tak, aby si každý mohl výpočty zkontrolovat a upravit podle sebe.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                  <span>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-[var(--accent-cool)]"
                    >
                      Veřejný Google Sheet se všemi vzorci a předpoklady
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                  <span>Popis vstupních dat a zdrojů</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                  <span>Možnost změnit parametry a spočítat si vlastní scénáře</span>
                </li>
              </ul>

              <Button 
                asChild 
                variant="secondary"
                className="mt-4"
              >
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
            <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-card)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Kdo za kalkulačkou stojí
              </p>
              
              <div className="mt-6 flex items-start gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/michal.jpeg"
                    alt="Michal Humaj"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div>
                  <p className="font-semibold text-[var(--text-main)]">Michal Humaj</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    Produktový manažer a investor, který řeší stejné otázky jako ty.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    Kalkulačku jsem postavil hlavně pro sebe, abych porovnal vlastní bydlení s nájmem a investicemi. Neprodávám hypotéky ani investiční produkty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What calculator doesn't solve */}
      <section className="bg-[var(--bg-page)] py-12 lg:py-16">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <h3 className="text-xl font-semibold md:text-2xl">
            Co kalkulačka neřeší
          </h3>
          <ul className="mt-6 space-y-3">
            {CALCULATOR_LIMITS.map((limit) => (
              <li key={limit} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-warm)]" />
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--bg-section)] py-12 lg:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl">
            Nejčastější otázky
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] md:text-base">
            Shrnujeme odpovědi na otázky, které slyšíme nejčastěji. Pokud hledáš detailnější metodiku, otevři veřejný Google Sheet.
          </p>

          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-card)] px-6 py-2 shadow-sm"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[var(--text-muted)] md:text-[15px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-soft)] bg-[var(--bg-page)] py-12">
        <div className="mx-auto w-full max-w-6xl px-4 text-center lg:px-8">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} kamspenezi.cz
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Nejedná se o investiční ani hypoteční poradenství. Používej vlastní rozum a případně se poraď s odborníkem.
          </p>
          <p className="mt-4">
            <a
              href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-main)] underline underline-offset-4 transition-colors hover:text-[var(--text-muted)]"
            >
              Metodika v Google Sheets
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
