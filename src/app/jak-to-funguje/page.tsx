import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, TrendingUp, Building2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { ScenarioComparisonCards } from "@/components/shared/ScenarioComparisonCards";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Jak funguje kalkulačka bydlení | kamspenezi.cz",
  description: "Pochopte, jak kalkulačka porovnává vlastní bydlení na hypotéku s nájmem a investováním. Dva scénáře, stejný rozpočet, 30 let dopředu.",
  openGraph: {
    title: "Jak funguje kalkulačka bydlení | kamspenezi.cz",
    description: "Pochopte, jak kalkulačka porovnává vlastní bydlení na hypotéku s nájmem a investováním.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz/jak-to-funguje",
    siteName: "kamspenezi.cz",
    images: [{ url: "/hero-couch.webp", width: 1600, height: 873 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jak funguje kalkulačka bydlení | kamspenezi.cz",
    description: "Pochopte, jak kalkulačka porovnává vlastní bydlení na hypotéku s nájmem a investováním.",
    images: ["/hero-couch.webp"],
  },
  alternates: {
    canonical: "https://kamspenezi.cz/jak-to-funguje",
  },
};

// FAQ data specific to "jak-to-funguje" page
const HOW_IT_WORKS_FAQ = [
  {
    question: "Co přesně kalkulačka porovnává?",
    answer: "Kalkulačka porovnává dva způsoby, jak nakládat se stejným rozpočtem na bydlení po dobu 30 let. Scénář A: koupíte byt na hypotéku a bydlíte ve vlastním. Scénář B: bydlíte v nájmu a rozdíl mezi náklady na vlastnictví a nájmem investujete do globálních akcií.",
  },
  {
    question: "Jak moc jsou výpočty přesné?",
    answer: "Model pracuje s realistickými odhady na základě historických dat a expertních prognóz. Cílem není trefit přesné číslo, ale ukázat rozdíl mezi scénáři při rozumných předpokladech. Detaily najdete v metodice.",
  },
  {
    question: "Počítáte s inflací?",
    answer: "Ano. Náklady na bydlení rostou v čase podle inflace. Výsledky ukazujeme v nominálních korunách (bez očištění o inflaci), protože se tak lépe čtou a porovnávají s dnešními cenami.",
  },
  {
    question: "Jaké investice předpokládáte?",
    answer: "Model předpokládá dlouhodobé investování do široce diverzifikovaných globálních akciových fondů. Nejde o konkrétní produkt, ale o obecný model výnosu globálního akciového trhu (očekávaný výnos ~7 % ročně).",
  },
  {
    question: "Zohledňujete daně?",
    answer: "Ano, tam kde to dává smysl. U investic počítáme s dlouhodobým horizontem, kde v Česku často platí daňové osvobození po časovém testu. U nemovitostí zohledňujeme daň z nemovitosti. Detaily v metodice.",
  },
];

export default function JakToFungujePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero Section */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Jak to funguje" },
        ]}
        title="Jak kalkulačka porovnává vlastní bydlení a nájem"
        subtitle="Porovnáváme dvě cesty k bydlení a majetku na horizontu 30 let. Liší se jen to, kam směřují peníze: do nemovitosti, nebo do investic."
        ctaText="Otevřít kalkulačku"
        ctaHref="/#zacni-mestem"
        ctaAnalytics="open_calculator_from_trust"
      />

      {/* Dva scénáře Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-3">
            Dva scénáře, stejný rozpočet
          </h2>
          <p 
            className="text-base md:text-lg mb-8 max-w-2xl"
            style={{ color: 'var(--color-secondary)' }}
          >
            Představte si, že máte určitou částku na bydlení. Kalkulačka ukáže, co se stane, 
            když ji použijete dvěma různými způsoby.
          </p>

          <ScenarioComparisonCards
            scenarioA={{
              title: "Koupím byt na hypotéku",
              subtitle: "Klasická cesta k vlastnímu bydlení",
              bullets: [
                "Složíte vlastní zdroje jako zálohu na byt",
                "Zbytek financujete hypotékou (typicky 30 let)",
                "Platíte splátky, daně, pojištění, fond oprav, údržbu",
                "Na konci vlastníte nemovitost v plné hodnotě",
              ],
              icon: (
                <div className="flex items-center justify-center gap-3 text-[var(--scenario-a-dot)]">
                  <Home className="h-8 w-8" />
                  <ArrowRight className="h-5 w-5" />
                  <Building2 className="h-8 w-8" />
                </div>
              ),
            }}
            scenarioB={{
              title: "Bydlím v nájmu a investuju",
              subtitle: "Alternativní cesta k budování majetku",
              bullets: [
                "Vlastní zdroje investujete místo zálohy na byt",
                "Platíte měsíční nájem (bez starostí o údržbu domu)",
                "Rozdíl mezi náklady na vlastnictví a nájmem také investujete",
                "Na konci máte investiční portfolio",
              ],
              icon: (
                <div className="flex items-center justify-center gap-3 text-[var(--scenario-b-dot)]">
                  <Wallet className="h-8 w-8" />
                  <ArrowRight className="h-5 w-5" />
                  <TrendingUp className="h-8 w-8" />
                </div>
              ),
            }}
          />
        </div>
      </section>

      {/* Férovost porovnání Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Co držíme stejné
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {[
              {
                title: "Stejný rozpočet na bydlení",
                desc: "Oba scénáře startují se stejnými vlastními zdroji a počítají se stejnými měsíčními výdaji.",
              },
              {
                title: "Vlastní zdroje se investují",
                desc: "Ve scénáři B se peníze, které byste dali jako zálohu na byt, investují od prvního dne.",
              },
              {
                title: "Rozdíl v nákladech jde do investic",
                desc: "Pokud je nájem levnější než náklady na vlastnictví, rozdíl se automaticky investuje.",
              },
              {
                title: "Stejný časový horizont",
                desc: "Oba scénáře sledujeme 30 let – typická doba splácení hypotéky.",
              },
            ].map((item) => (
              <div 
                key={item.title}
                className="rounded-2xl border p-5"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <h3 
                  className="font-uiSans font-semibold text-base mb-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="font-uiSans text-sm"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <CalloutBox variant="tip" title="Proč to dává smysl">
            <p>
              Většina kalkulaček porovnává &bdquo;splátku hypotéky vs. nájem&ldquo;. To je zavádějící, 
              protože ignoruje alternativní využití peněz. Naše kalkulačka ukazuje, 
              co se stane s celým vaším rozpočtem &ndash; nejen s měsíční platbou.
            </p>
          </CalloutBox>
        </div>
      </section>

      {/* Jak číst výsledek Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Jak číst výsledek
          </h2>

          <div className="space-y-6">
            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 
                className="font-uiSans font-semibold text-lg mb-3"
                style={{ color: 'var(--color-primary)' }}
              >
                Co znamená &bdquo;čisté jmění za 30 let&ldquo;
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span 
                    className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: 'var(--scenario-a-dot)' }}
                  />
                  <span className="font-uiSans text-sm" style={{ color: 'var(--color-secondary)' }}>
                    <strong>Scénář A:</strong> Hodnota nemovitosti minus případný zbytek hypotéky (po 30 letech typicky splacená).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span 
                    className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: 'var(--scenario-b-dot)' }}
                  />
                  <span className="font-uiSans text-sm" style={{ color: 'var(--color-secondary)' }}>
                    <strong>Scénář B:</strong> Hodnota investičního portfolia (vlastní zdroje + průběžné investice)
                  </span>
                </li>
              </ul>
            </div>

            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 
                className="font-uiSans font-semibold text-lg mb-3"
                style={{ color: 'var(--color-primary)' }}
              >
                Co výsledek není
              </h3>
              <p className="font-uiSans text-sm" style={{ color: 'var(--color-secondary)' }}>
                Výsledek není doporučení, co máte dělat. Je to simulace na základě zadaných parametrů. 
                Nezohledňuje vaše osobní preference, rodinnou situaci, plány do budoucna ani emocionální 
                hodnotu vlastního bydlení.
              </p>
            </div>

            <div 
              className="rounded-2xl border p-6"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <h3 
                className="font-uiSans font-semibold text-lg mb-3"
                style={{ color: 'var(--color-primary)' }}
              >
                Co nejvíc ovlivňuje výsledek
              </h3>
              <ul className="space-y-2">
                {[
                  "Kupní cena nemovitosti vs. výše nájmu",
                  "Očekávaný růst hodnoty nemovitosti",
                  "Očekávaný výnos z investic",
                  "Úroková sazba hypotéky",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span 
                      className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: 'var(--color-bullet)' }}
                    />
                    <span className="font-uiSans text-sm" style={{ color: 'var(--color-secondary)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/#zacni-mestem">
                Vyzkoušet kalkulačku
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/metodika-a-zdroje">
                Prohlédnout metodiku
              </Link>
            </Button>
            <Button variant="secondary" asChild data-analytics-click="open_google_sheet">
              <a 
                href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Otevřít Google Sheet
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-3">
            Nejčastější otázky
          </h2>
          <p 
            className="text-sm md:text-base mb-8"
            style={{ color: 'var(--color-secondary)' }}
          >
            Máte další otázky? Podívejte se na{" "}
            <Link 
              href="/metodika-a-zdroje" 
              className="underline hover:no-underline"
              style={{ color: 'var(--color-primary)' }}
            >
              detailní metodiku
            </Link>{" "}
            nebo nám{" "}
            <Link 
              href="/kontakt" 
              className="underline hover:no-underline"
              style={{ color: 'var(--color-primary)' }}
            >
              napište
            </Link>.
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            {HOW_IT_WORKS_FAQ.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-3xl bg-white border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 ease-out font-uiSans"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <AccordionTrigger 
                  className="text-left text-base font-medium hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": HOW_IT_WORKS_FAQ.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}

