import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { Linkedin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "O projektu | kamspenezi.cz",
  description:
    "Kdo stojí za kalkulačkou kamspenezi.cz a proč vznikla. Nezávislá, bez reklam, bez bankovních provizí. Michal Humaj — produkt a data.",
  alternates: { canonical: "https://kamspenezi.cz/o-projektu" },
  openGraph: {
    title: "O projektu | kamspenezi.cz",
    description:
      "Nezávislá kalkulačka pro rozhodnutí o bydlení a investicích. Kdo za ní stojí a proč vznikla.",
    url: "https://kamspenezi.cz/o-projektu",
  },
};

const STATS = [
  { value: "28+", label: "datasetů a studií", description: "ČNB, Hypoindex, JLL, Deloitte, Jordà et al. a další" },
  { value: "52", label: "sady parametrů", description: "13 měst × 4 dispozice — každé kombinaci vlastní hodnoty" },
  { value: "23 000+", label: "slov výzkumu", description: "Dokumentace předpokladů, zdrojů a metodiky" },
];

export default function OProjektuPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── 1. Hero — autor ── */}
      <TrustPageHero
        breadcrumbs={[{ label: "Domů", href: "/" }, { label: "O projektu" }]}
        title="Michal Humaj"
        subtitle="Řešil jsem stejnou otázku jako vy — koupit byt, nebo bydlet v nájmu a investovat? Nenašel jsem kalkulačku, která by to počítala poctivě. Tak jsem ji postavil."
      />

      {/* Author photo placeholder + LinkedIn */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 pb-12">
        <div className="flex items-center gap-5">
          {/* Circular photo placeholder */}
          <div
            className="h-20 w-20 flex-shrink-0 rounded-full border-2 flex items-center justify-center text-2xl font-displaySerif font-bold"
            style={{ background: "var(--bg-lilac-section)", borderColor: "var(--color-border)", color: "var(--color-primary)" }}
            aria-label="Fotka Michala Humaje"
          >
            MH
          </div>
          <div>
            <p className="font-uiSans font-semibold text-base" style={{ color: "var(--color-primary)" }}>
              Michal Humaj
            </p>
            <p className="font-uiSans text-sm" style={{ color: "var(--color-secondary)" }}>
              Produkt · Data · Praha
            </p>
            <a
              href="https://linkedin.com/in/michal-humaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium font-uiSans transition-colors hover:text-[var(--color-primary)]"
              style={{ color: "var(--color-secondary)" }}
            >
              <Linkedin className="h-3.5 w-3.5" />
              linkedin.com/in/michal-humaj
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Proč projekt vznikl ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Proč projekt vznikl
          </h2>
          <div className="space-y-5 text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            <p>
              České kalkulačky pro rozhodnutí o bydlení tradičně srovnávají jedno číslo: splátka hypotéky
              vs. nájemné. To je jako porovnávat auta jen podle barvy.
            </p>
            <p>
              Správné srovnání musí zohledňovat celkové jmění po 30 letech — tedy nejen co platíte dnes,
              ale i co vlastníte na konci. Scénář "nájem" neznamená jen vyhazovat peníze. Znamená to, že
              stejný kapitál, který byste dali do zálohy, investujete místo toho do indexových fondů —
              a každý měsíc, kdy je nájem nižší než splátka, investujete i tento rozdíl.
            </p>
            <p>
              Strávil jsem několik měsíců sbíráním dat z{" "}
              <strong style={{ color: "var(--color-primary)" }}>28+ datasetů</strong>, psáním výpočetních
              modelů a ověřováním předpokladů, než jsem dostal výsledky, kterým věřím. Pak jsem to
              celé otevřel veřejnosti.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Nezávislost ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Nezávislost
          </h2>
          <CalloutBox variant="tip" title="Bez konfliktů zájmů">
            <div className="space-y-2 text-sm">
              <p>Tento projekt nemá žádné vazby na banky, realitní kanceláře, ani investiční poradce.</p>
              <ul className="space-y-1 mt-2">
                {[
                  "Žádné provize za hypotéky ani jiné produkty",
                  "Žádné leadové formuláře pro třetí strany",
                  "Žádná reklama ani sponzorovaný obsah",
                  "Zdrojový kód a výpočetní model jsou veřejně dostupné",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-base" style={{ color: "var(--scenario-b-dot)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </CalloutBox>
          <p className="mt-6 text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Projekt vznikl z osobní potřeby a zůstane nezávislý. Jediný zájem je poskytnout co
            nejpřesnější orientaci při jednom z největších finančních rozhodnutí v životě.
          </p>
        </div>
      </section>

      {/* ── 4. Data za projektem ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Data za projektem
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-3xl p-6 text-center border"
                style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="font-displaySerif text-4xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stat.value}
                </div>
                <div className="font-uiSans font-semibold text-base mb-2" style={{ color: "var(--color-primary)" }}>
                  {stat.label}
                </div>
                <div className="font-uiSans text-xs leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Podrobnou metodiku výpočtů najdete na stránkách{" "}
            <Link href="/metodika/bydleni" className="font-medium underline underline-offset-2 hover:text-[var(--color-primary)]" style={{ color: "var(--color-primary)" }}>
              Metodika: Bydlení
            </Link>{" "}
            a{" "}
            <Link href="/metodika/investice" className="font-medium underline underline-offset-2 hover:text-[var(--color-primary)]" style={{ color: "var(--color-primary)" }}>
              Metodika: Investice
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── 5. Psali o nás ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Psali o nás
          </h2>
          <div
            className="rounded-3xl border p-8 text-center"
            style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-uiSans text-base" style={{ color: "var(--color-secondary)" }}>
              Kalkulačka byla spuštěna v březnu 2026.
            </p>
            <p className="font-uiSans text-sm mt-2" style={{ color: "var(--color-bullet)" }}>
              Mediální zmínky budou přibývat.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Kontakt ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Kontakt
          </h2>
          <p className="text-base leading-relaxed font-uiSans mb-6" style={{ color: "var(--color-secondary)" }}>
            Máte dotaz k metodice, upozornění na chybu v datech, nebo zájem o spolupráci?
            Napište mi.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:michal.humaj@gmail.com"
              className="inline-flex items-center gap-3 rounded-2xl border px-5 py-4 font-uiSans text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-primary)",
                boxShadow: "var(--shadow-card-soft)",
              }}
            >
              <Mail className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-secondary)" }} />
              michal.humaj@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/michal-humaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl border px-5 py-4 font-uiSans text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-primary)",
                boxShadow: "var(--shadow-card-soft)",
              }}
            >
              <Linkedin className="h-5 w-5 flex-shrink-0" style={{ color: "var(--color-secondary)" }} />
              linkedin.com/in/michal-humaj
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. Právní upozornění ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CalloutBox variant="warning" title="Právní upozornění">
            <p>
              Obsah na tomto webu slouží výhradně k vzdělávacím a orientačním účelům. Nepředstavuje
              finanční poradenství ve smyslu zákona č. 256/2004 Sb. ani investiční doporučení.
              Veškerá rozhodnutí o financování bydlení nebo investicích děláte výhradně na vlastní
              odpovědnost. Před jakýmkoli závazným rozhodnutím doporučujeme konzultaci s licencovaným
              odborníkem.
            </p>
          </CalloutBox>
        </div>
      </section>
    </main>
  );
}
