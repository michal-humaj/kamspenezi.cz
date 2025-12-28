import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Calculator, Clock, TrendingUp, Percent, Home, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { 
  SOURCES_DATA, 
  CATEGORY_NAMES, 
  PRAHA_2KK_EXAMPLE,
  type SourceCategory 
} from "@/data/sources-data";

export const metadata: Metadata = {
  title: "Metodika a zdroje dat | kamspenezi.cz",
  description: "Transparentní metodika kalkulačky bydlení. Všechny vzorce, zdroje dat a defaultní hodnoty na jednom místě. Auditovatelné a ověřitelné.",
  openGraph: {
    title: "Metodika a zdroje dat | kamspenezi.cz",
    description: "Transparentní metodika kalkulačky bydlení. Všechny vzorce, zdroje dat a defaultní hodnoty.",
    type: "article",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz/metodika-a-zdroje",
    siteName: "kamspenezi.cz",
    images: [{ url: "/hero-couch.webp", width: 1600, height: 873 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metodika a zdroje dat | kamspenezi.cz",
    description: "Transparentní metodika kalkulačky bydlení. Všechny vzorce a zdroje dat.",
    images: ["/hero-couch.webp"],
  },
  alternates: {
    canonical: "https://kamspenezi.cz/metodika-a-zdroje",
  },
};

const METHODOLOGY_OVERVIEW = [
  {
    icon: Clock,
    title: "Horizont 30 let",
    desc: "Simulace běží 30 let – typická doba splácení hypotéky.",
  },
  {
    icon: Calculator,
    title: "Roční periodicita",
    desc: "Výpočty probíhají po rocích. Měsíční platby agregujeme na roční.",
  },
  {
    icon: Home,
    title: "Fixace 5 let",
    desc: "Hypotéka má 5letou fixaci, pak se přepočítá s novou sazbou.",
  },
  {
    icon: TrendingUp,
    title: "Globální akcie",
    desc: "Investice = široce diverzifikované globální akciové portfolio.",
  },
  {
    icon: Percent,
    title: "Nominální hodnoty",
    desc: "Výsledky v nominálních Kč (bez očištění o inflaci).",
  },
  {
    icon: FileSpreadsheet,
    title: "Dva režimy",
    desc: "Fixní výpočet (deterministický) a Realistický (Monte Carlo simulace).",
  },
];

const CATEGORIES: SourceCategory[] = ["nemovitost", "hypoteka", "najem", "investice", "dane-poplatky"];

export default function MetodikaPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero Section */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Metodika a zdroje" },
        ]}
        title="Metodika a zdroje dat"
        subtitle="Kalkulačka stojí na veřejných datech a transparentních vzorcích. Každý default má původ a pravidlo odvození."
      />

      {/* Rychlý přehled Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Jak výpočet funguje
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY_OVERVIEW.map((item) => (
              <div 
                key={item.title}
                className="rounded-2xl border p-5"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <item.icon 
                  className="h-5 w-5 mb-3"
                  style={{ color: 'var(--color-primary)' }}
                />
                <h3 
                  className="font-uiSans font-semibold text-base mb-1"
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
        </div>
      </section>

      {/* Praha 2+kk příklad Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-3">
            Příklad: Praha 2+kk
          </h2>
          <p 
            className="text-base mb-6"
            style={{ color: 'var(--color-secondary)' }}
          >
            Konkrétní hodnoty pro typický byt v Praze. Vaše hodnoty se liší podle města a dispozice.
          </p>

          <div 
            className="rounded-3xl border overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Header */}
            <div 
              className="px-6 py-4 border-b flex items-center gap-3"
              style={{ 
                borderColor: 'var(--color-border)',
                background: 'var(--bg-lilac-section)',
              }}
            >
              <span 
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium font-uiSans"
                style={{
                  background: 'var(--scenario-a-bg)',
                  color: 'var(--scenario-a-dot)',
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--scenario-a-dot)' }} />
                Praha
              </span>
              <span 
                className="font-uiSans font-medium"
                style={{ color: 'var(--color-primary)' }}
              >
                2+kk · 54 m²
              </span>
            </div>

            {/* Values Grid */}
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(PRAHA_2KK_EXAMPLE.values).map(([key, data]) => (
                  <div 
                    key={key}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(15, 23, 42, 0.02)' }}
                  >
                    <p 
                      className="font-uiSans text-xs uppercase tracking-wide mb-1"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      {key === 'kupniCena' && 'Kupní cena'}
                      {key === 'najemne' && 'Měsíční nájemné'}
                      {key === 'squareMeters' && 'Výměra'}
                      {key === 'fondOprav' && 'Fond oprav'}
                      {key === 'danZNemovitosti' && 'Daň z nemovitosti'}
                      {key === 'pojisteniNemovitosti' && 'Pojištění'}
                      {key === 'nakladyUdrzba' && 'Náklady na údržbu'}
                      {key === 'zarizeniNemovitosti' && 'Zařízení bytu'}
                    </p>
                    <p 
                      className="font-uiSans font-semibold text-lg tabular-nums"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {data.value}
                    </p>
                    <p 
                      className="font-uiSans text-xs mt-1 font-mono"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      {data.calculation}
                    </p>
                  </div>
                ))}
              </div>

              {/* Global params */}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <p 
                  className="font-uiSans text-xs uppercase tracking-wide mb-3"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  Globální parametry
                </p>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(PRAHA_2KK_EXAMPLE.global).map(([key, data]) => (
                    <div key={key} className="flex items-baseline gap-2">
                      <span 
                        className="font-uiSans text-sm"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        {key === 'urokovaSazbaHypoteky' && 'Úrok hypotéky:'}
                        {key === 'urokovaSazbaHypotekyFuture' && 'Budoucí úrok:'}
                        {key === 'vynosInvestice' && 'Výnos investic:'}
                        {key === 'ocekavanaInflace' && 'Inflace:'}
                      </span>
                      <span 
                        className="font-uiSans font-semibold tabular-nums"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {data.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defaulty a zdroje Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-3">
            Defaulty a zdroje
          </h2>
          <p 
            className="text-base mb-8"
            style={{ color: 'var(--color-secondary)' }}
          >
            Kompletní seznam všech parametrů, jejich výpočtů a zdrojů dat.
          </p>

          {/* Category sections */}
          <div className="space-y-8">
            {CATEGORIES.map((category) => {
              const sources = SOURCES_DATA.filter(s => s.category === category);
              return (
                <div key={category} id={`sources-${category}`}>
                  <h3 
                    className="font-uiSans font-semibold text-lg mb-4 flex items-center gap-2"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <span 
                      className="h-2 w-2 rounded-full"
                      style={{ 
                        background: category === 'nemovitost' || category === 'hypoteka' 
                          ? 'var(--scenario-a-dot)' 
                          : category === 'najem' || category === 'investice'
                          ? 'var(--scenario-b-dot)'
                          : 'var(--color-bullet)'
                      }}
                    />
                    {CATEGORY_NAMES[category]}
                  </h3>

                  <div className="space-y-4">
                    {sources.map((source) => (
                      <div 
                        key={source.id}
                        className="rounded-2xl border p-5 md:p-6"
                        style={{
                          background: 'var(--bg-card)',
                          borderColor: 'var(--color-border)',
                        }}
                      >
                        <h4 
                          className="font-uiSans font-semibold text-base mb-2"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {source.name}
                        </h4>
                        <p 
                          className="font-uiSans text-sm mb-3"
                          style={{ color: 'var(--color-secondary)' }}
                        >
                          {source.description}
                        </p>

                        {source.formula && (
                          <div 
                            className="rounded-lg px-3 py-2 mb-3 font-mono text-sm"
                            style={{ 
                              background: 'rgba(15, 23, 42, 0.03)',
                              color: 'var(--color-primary)',
                            }}
                          >
                            {source.formula}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          {source.sources.map((s, i) => (
                            <span key={i}>
                              {s.url ? (
                                <a
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors hover:opacity-80"
                                  style={{
                                    background: 'var(--bg-lilac-section)',
                                    color: 'var(--color-primary)',
                                  }}
                                >
                                  {s.name}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : (
                                <span 
                                  className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full"
                                  style={{
                                    background: 'var(--bg-lilac-section)',
                                    color: 'var(--color-secondary)',
                                  }}
                                >
                                  {s.name}
                                </span>
                              )}
                            </span>
                          ))}
                          <span 
                            className="text-xs px-2 py-1"
                            style={{ color: 'var(--color-secondary)' }}
                          >
                            {source.sources[0]?.date}
                          </span>
                        </div>

                        {source.notes && (
                          <p 
                            className="font-uiSans text-xs"
                            style={{ color: 'var(--color-secondary)' }}
                          >
                            💡 {source.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Limity Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Co model neřeší
          </h2>

          <div className="space-y-4 mb-8">
            {[
              "Transakční náklady při prodeji nemovitosti (daň z příjmu, provize)",
              "Daň z kapitálových výnosů u investic (předpokládáme časový test)",
              "Změny životní situace (rodina, stěhování, ztráta příjmu)",
              "Emocionální hodnotu vlastního bydlení",
              "Konkrétní investiční produkty nebo hypoteční nabídky",
              "Regionální rozdíly uvnitř měst (centrum vs. okraj)",
            ].map((item) => (
              <div 
                key={item}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: 'rgba(15, 23, 42, 0.02)' }}
              >
                <span 
                  className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: 'var(--color-bullet)' }}
                />
                <span 
                  className="font-uiSans text-sm"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <CalloutBox variant="warning" title="Důležité upozornění">
            <p>
              Toto není finanční poradenství. Kalkulačka je orientační nástroj pro porovnání 
              dvou strategií při zadaných parametrech. Před jakýmkoli rozhodnutím se poraďte 
              s odborníkem a zvažte svou konkrétní situaci.
            </p>
          </CalloutBox>
        </div>
      </section>

      {/* Google Sheet CTA Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl mb-3">
            Ověřte si výpočet sami
          </h2>
          <p 
            className="text-base mb-6"
            style={{ color: 'var(--color-secondary)' }}
          >
            Celý model je dostupný jako veřejný Google Sheet. Můžete si projít vzorce, 
            zkopírovat si ho a upravit podle sebe.
          </p>

          <Button asChild size="lg" data-analytics-click="open_google_sheet">
            <a
              href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <FileSpreadsheet className="h-5 w-5" />
              Otevřít Google Sheet
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          <p 
            className="text-xs mt-4"
            style={{ color: 'var(--color-secondary)' }}
          >
            Vzorce v sheetu odpovídají webové kalkulačce.
          </p>
        </div>
      </section>

      {/* Back to calculator CTA */}
      <section className="py-8 md:py-10" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <Button asChild variant="secondary">
            <Link href="/#zacni-mestem">
              ← Zpět na kalkulačku
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Metodika a zdroje dat kalkulačky bydlení",
            "description": "Transparentní metodika kalkulačky bydlení. Všechny vzorce, zdroje dat a defaultní hodnoty.",
            "author": {
              "@type": "Person",
              "name": "Michal Humaj"
            },
            "publisher": {
              "@type": "Organization",
              "name": "kamspenezi.cz",
              "logo": {
                "@type": "ImageObject",
                "url": "https://kamspenezi.cz/logo-mark.svg"
              }
            },
            "datePublished": "2025-12-28",
            "dateModified": "2025-12-28",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://kamspenezi.cz/metodika-a-zdroje"
            }
          })
        }}
      />
    </main>
  );
}

