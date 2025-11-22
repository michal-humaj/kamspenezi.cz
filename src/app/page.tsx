import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { HeroSection } from "@/components/home/hero-section";
import { CityPresetsSection } from "@/components/home/city-presets-section";
import { ComparisonCard } from "@/components/home/comparison-card";
import { ScenarioCards } from "@/components/home/scenario-cards";
import { FAQSection } from "@/components/home/faq-section";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { PersonSchema } from "@/components/seo/person-schema";
import { FAQSchema } from "@/components/seo/faq-schema";

// Page-specific metadata for SEO
export const metadata: Metadata = {
  title: "Kalkulačka bydlení: Hypotéka vs. Nájem + ETF | kamspenezi.cz",
  description:
    "Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat do ETF. Nezávislá kalkulačka s daty z českých měst. Zdarma, bez registrace.",
  keywords: [
    "kalkulačka bydlení",
    "hypotéka vs nájem",
    "koupit byt nebo pronajímat",
    "investice do ETF",
    "kalkulačka hypotéky",
    "vlastní bydlení",
    "nájem a investice",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Kalkulačka bydlení: Hypotéka vs. Nájem + ETF",
    description:
      "Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat do ETF. Zdarma, bez registrace.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz",
    siteName: "kamspenezi.cz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkulačka bydlení: Hypotéka vs. Nájem + ETF",
    description:
      "Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat do ETF.",
  },
  alternates: {
    canonical: "https://kamspenezi.cz",
  },
};

const MYTH_LIST = [
  "Nájem se vždy nevyplatí, protože 'vyhazuješ peníze z okna'",
  "Hypotéka je vždy lepší, protože \"buduješ vlastní majetek\"",
  "Nájem znamená posílat každý měsíc peníze pryč a nic z nich nemít",
];

const REALITY_LIST = [
  "Vlastní byt má hodnotu, ale přináší i náklady. Důležité je, co se děje s rozdílem mezi nájmem a hypotékou",
  "Když rozdíl mezi nájmem a hypotékou investuješ, peníze pracují",
  "Po třiceti letech může mít investiční portfolio hodnotu srovnatelnou s bytem",
];

const CALCULATOR_LIMITS = [
  "Neřeší extrémní scénáře příjmů nebo nezaměstnanosti",
  "Neumí odhadnout náklady na velké rekonstrukce",
  "Nezohledňuje individuální daně a legislativní změny v budoucnu",
];

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <PersonSchema />
      <FAQSchema />

      {/* Hero Section - Client Component for animations */}
      <HeroSection />

      {/* City Presets Section - Client Component for animations */}
      <CityPresetsSection />

      {/* Results Section - Mostly static, only comparison card is animated */}
      <section className="bg-[var(--bg-base)] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
            Výsledek
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Jak vypadá výsledek
          </h2>
          
          <div className="mt-6 max-w-3xl space-y-3">
            <p className="text-base text-[var(--color-secondary)] md:text-lg font-uiSans">
              Výsledek není jen jedno číslo. Uvidíš:
            </p>
            <ul className="space-y-2.5 text-base text-[#4B5563] font-uiSans leading-relaxed">
              <li className="flex items-start gap-3">
                <span 
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                  style={{ background: 'var(--color-bullet)' }}
                />
                <span>Dva sloupce nebo box ploty pro scénář vlastního bydlení a scénář nájem plus ETF</span>
              </li>
              <li className="flex items-start gap-3">
                <span 
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                  style={{ background: 'var(--color-bullet)' }}
                />
                <span>Střední odhad hodnoty majetku po třiceti letech</span>
              </li>
              <li className="flex items-start gap-3">
                <span 
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                  style={{ background: 'var(--color-bullet)' }}
                />
                <span>Pásmo, ve kterém se výsledky typicky pohybují, pokud se trh vyvíjí lépe nebo hůř</span>
              </li>
            </ul>
          </div>

          {/* Comparison card - Client Component for animations */}
          <ComparisonCard />
        </div>
      </section>

      {/* Myth vs Reality - Static content */}
      <section className="bg-[var(--bg-lilac-section)] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
            Mýty o nájmu
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Nájem není vyhazování peněz z okna
          </h2>
          <p className="mt-3 text-base text-[var(--color-secondary)] md:text-lg font-uiSans">
            Pokud peníze navíc pracují
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
            {/* Myth column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[#9CA3AF] font-uiSans">
                Mýtus
              </h4>
              <ul className="mt-4 space-y-4">
                {MYTH_LIST.map((myth) => (
                  <li key={myth} className="flex items-start gap-2.5 text-base leading-relaxed text-[#4B5563] font-uiSans">
                    <span className="shrink-0 mt-[0.3em] text-[#6B7280] text-base leading-none">×</span>
                    <span>{myth}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reality column */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[#0F172A] font-uiSans">
                Realita
              </h4>
              <ul className="mt-4 space-y-4">
                {REALITY_LIST.map((reality) => (
                  <li key={reality} className="flex items-start gap-2.5 text-base leading-relaxed text-[#0F172A] font-uiSans">
                    <span 
                      className="shrink-0 mt-[0.5em] h-1.5 w-1.5 rounded-full" 
                      style={{ background: 'var(--color-bullet)' }}
                    />
                    <span>{reality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios section - Client Component for animations */}
      <section className="bg-[var(--bg-base)] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
            Dvě cesty
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl">
            Co přesně kalkulačka porovnává
          </h2>
          <p className="mt-3 max-w-3xl text-base text-[var(--color-secondary)] md:text-lg font-uiSans">
            Stejný měsíční rozpočet. Jiný výsledek po třiceti letech.
          </p>

          <ScenarioCards />
        </div>
      </section>

      {/* Transparency section - Static content */}
      <section id="transparentnost" className="scroll-mt-20 bg-[var(--bg-lilac-section)] pt-[var(--section-padding-y-mobile)] md:pt-[var(--section-padding-y-desktop)] pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl">
            Transparentní výpočet, žádná tajemství
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {/* Left: Methodology */}
            <div className="space-y-6">
              <p className="text-base text-[var(--color-secondary)] md:text-lg font-uiSans">
                Nejsme banka ani prodejce hypoték. Kalkulačku jsme postavili tak, aby si každý mohl výpočty zkontrolovat a upravit podle sebe.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base leading-relaxed text-[#4B5563] font-uiSans">
                  <span 
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                    style={{ background: 'var(--color-bullet)' }}
                  />
                  <span>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-[var(--color-primary)] hover:text-[var(--color-primary)] font-uiSans"
                      style={{
                        transition: `color var(--transition-duration) var(--transition-easing)`
                      }}
                    >
                      Veřejný Google Sheet se všemi vzorci a předpoklady
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-base leading-relaxed text-[#4B5563] font-uiSans">
                  <span 
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                    style={{ background: 'var(--color-bullet)' }}
                  />
                  <span>Popis vstupních dat a zdrojů</span>
                </li>
                <li className="flex items-start gap-3 text-base leading-relaxed text-[#4B5563] font-uiSans">
                  <span 
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                    style={{ background: 'var(--color-bullet)' }}
                  />
                  <span>Možnost změnit parametry a spočítat si vlastní scénář</span>
                </li>
              </ul>

              <a
                href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center h-[52px] rounded-full bg-white hover:bg-[rgba(15,23,42,0.02)] text-[16px] font-semibold px-6 transition-all duration-200 ease-out border hover:border-[var(--btn-secondary-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-focus-ring)]"
                style={{
                  borderColor: 'var(--btn-secondary-border)',
                  color: 'var(--btn-secondary-text)'
                }}
              >
                Otevřít metodiku v Google Sheets
              </a>
            </div>

            {/* Right: Author card */}
            <div className="rounded-3xl bg-white border border-[#EDEEF3] shadow-[0_8px_28px_rgba(15,23,42,0.06)] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
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
                  <p className="font-semibold text-[#0F172A] font-uiSans">Michal Humaj</p>
                  <p className="mt-1 text-base leading-relaxed text-[#4B5563] font-uiSans">
                    Produktový manažer a investor, který řeší stejné otázky jako ty.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[#4B5563] font-uiSans">
                    Kalkulačku jsem postavil hlavně pro sebe, abych porovnal vlastní bydlení s nájmem a investicemi. Neprodávám hypotéky ani investiční produkty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What calculator doesn't solve - Static content */}
      <section className="bg-[var(--bg-base)] py-12 md:py-16">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <div className="rounded-3xl bg-white border border-[#EDEEF3] shadow-[0_8px_28px_rgba(15,23,42,0.06)] p-8 md:p-10">
            <h3 className="text-xl font-semibold md:text-2xl">
              Co kalkulačka neřeší
            </h3>
            <ul className="mt-6 space-y-3">
              {CALCULATOR_LIMITS.map((limit) => (
                <li key={limit} className="flex items-start gap-3 text-base leading-relaxed text-[#4B5563] font-uiSans">
                  <span 
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" 
                    style={{ background: 'var(--color-bullet)' }}
                  />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ - Client Component for accordion interactivity */}
      <FAQSection />

      {/* Footer */}
      <footer 
        className="border-t border-[#EDEEF3] py-12"
        style={{
          background: 'var(--bg-base)'
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-4 text-center lg:px-8">
          <p className="text-sm text-[var(--color-secondary)] font-uiSans">
            © {new Date().getFullYear()} kamspenezi.cz
          </p>
          <p className="mt-2 text-xs text-[#9CA3AF] font-uiSans">
            Nejedná se o investiční ani hypoteční poradenství. Používej vlastní rozum a případně se poraď s odborníkem.
          </p>
          <p className="mt-4">
            <a
              href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary)] font-uiSans"
              style={{
                transition: `color var(--transition-duration) var(--transition-easing)`
              }}
            >
              Metodika v Google Sheets
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
