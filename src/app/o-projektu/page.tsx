import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Linkedin, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "O projektu — nezávislá kalkulačka bydlení a investic | kamspenezi.cz",
  description:
    "Kdo stojí za kamspenezi.cz a proč vznikl. Nezávislá kalkulačka bydlení a investičního bytu bez reklam a bankovních provizí — postavená pro lidi, kteří chtějí dělat rozhodnutí na datech.",
  alternates: {
    canonical: "https://kamspenezi.cz/o-projektu",
  },
  openGraph: {
    title: "O projektu — nezávislá kalkulačka bydlení a investic | kamspenezi.cz",
    description:
      "Kdo stojí za kamspenezi.cz a proč vznikl. Nezávislá kalkulačka bez reklam a bankovních provizí.",
    type: "website",
    url: "https://kamspenezi.cz/o-projektu",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
  },
};

// Shared max-width keeps hero left-edge flush with prose left-edge
const CONTENT_WIDTH = "max-w-[760px]";

// Body prose text — slightly darker than --color-secondary for comfortable reading
const PROSE_COLOR = "#4B5563";

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

export default function OProjektuPage() {
  return (
    <div style={{ background: "var(--bg-base)" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {/* Fix 1: same max-width as content so left edges align
          Fix 2: reduced bottom padding (was full section-padding, now 48px/64px) */}
      <section
        className="pt-[var(--section-padding-y-mobile)] pb-12 md:pt-[var(--section-padding-y-desktop)] md:pb-16"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12">

            {/* Left: identity */}
            <div>
              <p
                className="font-uiSans text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-secondary)" }}
              >
                O projektu
              </p>

              <h1
                className="font-displaySerif text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-tight mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                Michal Humaj
              </h1>

              <p
                className="font-uiSans text-base md:text-lg leading-relaxed mb-8"
                style={{ color: "var(--color-secondary)" }}
              >
                Produktový manažer v IT · Praha
              </p>

              {/* Fix 4: three separate pills instead of one long badge */}
              <div className="flex flex-wrap gap-2">
                {["Bez reklam", "Bez bankovních provizí", "Nezávislý projekt"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-uiSans text-sm font-medium"
                    style={{
                      background: "var(--scenario-b-bg)",
                      color: "var(--scenario-b-dot)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--scenario-b-dot)" }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: photo — Fix 3: 200 → 240px */}
            <div className="flex md:justify-end">
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  width: 240,
                  height: 240,
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <Image
                  src="/michal.jpeg"
                  alt="Michal Humaj"
                  fill
                  className="object-cover object-top"
                  sizes="240px"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section
        className="pb-[var(--section-padding-y-mobile)] md:pb-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>

          {/* Osobní příběh — Fix 5: prose uses PROSE_COLOR (#4B5563) */}
          <div>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg"
              style={{ color: PROSE_COLOR }}
            >
              Řešil jsem dvě finanční otázky. Možná je řešíš taky.
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              Má smysl kupovat byt na vlastní bydlení, nebo je lepší platit
              nájem a investovat? Nejblíže jsem přišel ke kalkulačce New York
              Times, skvěle zpracované, ale pro americký trh. Nepočítá fond
              oprav, pojistění ani daňovou úsporu z hypotečních úroků, které
              jsou pro českou realitu klíčové.
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              A pak: je výhodné kupovat investiční byt, nebo je lepší dát ty
              samé peníze do globálního akciového fondu? Investiční byty mají
              v Česku auru dobrého rozhodnutí. Výsledek, který mi kalkulačka
              ukázala, mě překvapil.{" "}
              <Link
                href="/investice"
                className="font-medium underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                Jdi si ho spočítat sám.
              </Link>
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              Pro český trh jsem nenašel nic srovnatelného. Tak jsem ho
              postavil.
            </p>
          </div>

          <Divider />

          {/* Kdo za tím stojí */}
          <div>
            <SectionHeading>Kdo za tím stojí</SectionHeading>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg"
              style={{ color: PROSE_COLOR }}
            >
              Jsem produktový manažer v Grouponu a drobný investor do
              nemovitostí.
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              Nejsem finanční poradce ani hypoteční makléř. Právě proto mi
              nikdo neplatí za to, abys koupil konkrétní produkt nebo volil
              konkrétní scénář.
            </p>
          </div>

          <Divider />

          {/* Co kamspenezi.cz není */}
          <div>
            <SectionHeading>Co kamspenezi.cz není</SectionHeading>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg"
              style={{ color: PROSE_COLOR }}
            >
              Není to projekt banky, pojišťovny ani hypotečního makléře. Na
              webu nejsou reklamy. Žádný affiliate odkaz, žádné komerční
              partnerství.
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              Výsledek kalkulačky není doporučení. Ukáže ti čísla a rozhodnutí
              je na tobě.
            </p>
          </div>

          <Divider />

          {/* Jak to funguje */}
          <div>
            <SectionHeading>Jak to funguje</SectionHeading>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg"
              style={{ color: PROSE_COLOR }}
            >
              Obě kalkulačky porovnávají dva scénáře na horizontu 30 let.
              Ceny bytů, výše nájmů a úrokové sazby vychází z veřejně
              dostupných dat. Každý předpoklad je zdokumentovaný a
              dohledatelný.
            </p>
            <p
              className="font-uiSans text-base leading-relaxed md:text-lg mt-4"
              style={{ color: PROSE_COLOR }}
            >
              Výpočet si ověříš v Google Sheets. Tabulka počítá úplně stejně
              jako kalkulačka, řádek po řádku.
            </p>

            <a
              href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-4 shadow-[var(--shadow-card)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
            >
              <div>
                <p
                  className="font-uiSans text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Ověřit výpočet v Google Sheets
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

            <div className="mt-5 flex flex-col gap-2">
              <p
                className="font-uiSans text-sm font-medium mb-1"
                style={{ color: "var(--color-secondary)" }}
              >
                Detailní metodiku najdeš tady:
              </p>
              {[
                { href: "/metodika/bydleni", label: "Jak kalkulačka bydlení počítá" },
                { href: "/metodika/investice", label: "Jak kalkulačka investičního bytu počítá" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 font-uiSans text-sm font-medium transition-colors hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── KONTAKT ───────────────────────────────────────────────────────── */}
      <section
        className="py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-lilac-section)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <h2
            className="font-uiSans text-xl font-semibold tracking-[-0.01em] mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Kontakt
          </h2>
          <p
            className="font-uiSans text-base leading-relaxed mb-6"
            style={{ color: PROSE_COLOR }}
          >
            Máš otázku k metodice nebo jiný pohled na některý předpoklad?
            Napiš mi.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://linkedin.com/in/michal-humaj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white px-5 py-3 font-uiSans text-sm font-medium text-[var(--color-primary)] shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-card)]"
            >
              <Linkedin className="h-4 w-4 flex-shrink-0" />
              LinkedIn: Michal Humaj
            </a>

            <a
              href="mailto:michal@kamspenezi.cz"
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white px-5 py-3 font-uiSans text-sm font-medium text-[var(--color-primary)] shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-card)]"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              michal@kamspenezi.cz
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <p
            className="font-uiSans text-base leading-relaxed mb-6"
            style={{ color: PROSE_COLOR }}
          >
            Chceš vidět výsledek? Spočítej si to.
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
