import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { ArticleDataTable } from "@/components/shared/ArticleDataTable";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Metodika kalkulačky investičního bytu | kamspenezi.cz",
  description:
    "Jak kalkulačka investičního bytu počítá čisté jmění po 30 letech? Podrobná metodika: daňový model (§9 ZDP, odpisy skupiny 5), předvyplněné hodnoty, obsazenost po městech a srovnání s ETF.",
  alternates: { canonical: "https://kamspenezi.cz/metodika/investice" },
  openGraph: {
    title: "Metodika kalkulačky investičního bytu | kamspenezi.cz",
    description:
      "Transparentní metodika — daňový model s odpisy, obsazenost po městech, všechny předpoklady a zdroje dat.",
    url: "https://kamspenezi.cz/metodika/investice",
  },
};

const PREDVYPLNENE_HODNOTY = [
  { parameter: "Kupní cena nemovitosti", value: "Dle výběru města a dispozice", source: "Průměry z nabídek Sreality.cz (2024–2025)", badge: "VERIFIED" as const },
  { parameter: "Vlastní zdroje", value: "20 % kupní ceny", source: "ČNB — minimální zákonný požadavek pro investiční byt LTV 80 %", badge: "VERIFIED" as const },
  { parameter: "Úroková sazba hypotéky", value: "4,9 % p.a.", source: "Hypoindex.cz — průměrná sazba únor 2025", badge: "VERIFIED" as const },
  { parameter: "Příjem z nájmu", value: "Dle výběru města a dispozice", source: "Průměry z nabídek Sreality.cz a Bezrealitky.cz (2024–2025)", badge: "VERIFIED" as const },
  { parameter: "Obsazenost bytu", value: "Dle města (Praha 95 %, Ústí 87 %)", source: "Viz tabulka obsazenosti níže", badge: "DERIVED" as const },
  { parameter: "Výnos ETF (Scénář B)", value: "7 % p.a.", source: "MSCI World Index — historický nominální výnos 1970–2024", badge: "VERIFIED" as const },
  { parameter: "Fond oprav", value: "22 Kč/m²/měsíc", source: "Zákon č. 89/2012 Sb. — doporučené minimum", badge: "DERIVED" as const },
  { parameter: "Pojistné nemovitosti", value: "20 Kč/m²/rok", source: "Srovnávač.cz — průměr pro investiční byt (2024)", badge: "VERIFIED" as const },
  { parameter: "Daň z nemovitosti", value: "Dle zákonného vzorce", source: "Zákon č. 338/1992 Sb.", badge: "VERIFIED" as const },
  { parameter: "Náklady na údržbu", value: "Fixní základ + 73 Kč/m²/rok", source: "SFRB — výzkum nákladů na údržbu bytového fondu (2022)", badge: "DERIVED" as const },
  { parameter: "Odpisy (rok 1)", value: "1,4 % z 90 % kupní ceny", source: "§31 ZDP — odpisová skupina 5, první rok", badge: "VERIFIED" as const },
  { parameter: "Odpisy (rok 2–30)", value: "3,4 % z 90 % kupní ceny", source: "§31 ZDP — odpisová skupina 5, roční sazba", badge: "VERIFIED" as const },
  { parameter: "Přenos ztráty", value: "Až 5 let zpětně (§34 ZDP)", source: "§34 odst. 1 ZDP — daňová ztráta z §9", badge: "VERIFIED" as const },
  { parameter: "Růst hodnoty nemovitosti", value: "3 % p.a. (Praha: 3,5 %)", source: "Konzervativní — Jordà et al. 2024, reálný výnos 2–3 % p.a.", badge: "DERIVED" as const },
  { parameter: "Růst nájemného", value: "2,5 % p.a.", source: "Deloitte Czech Real Estate Market Overview (2015–2024)", badge: "VERIFIED" as const },
  { parameter: "Pásmo daně z příjmu", value: "15 % (nastavitelné: 23 %)", source: "§16 ZDP", badge: "VERIFIED" as const },
  { parameter: "Délka horizonu", value: "30 let", source: "Standardní délka hypotéky", badge: "DERIVED" as const },
];

const OBSAZENOST_ROWS = [
  { parameter: "Praha", value: "95 %", source: "JLL — Prague Residential Market 2024", badge: "VERIFIED" as const },
  { parameter: "Brno", value: "94 %", source: "JLL — Brno Residential Market 2024", badge: "VERIFIED" as const },
  { parameter: "Ostrava", value: "90 %", source: "Průměr z realitních portálů + EuroProperty data", badge: "DERIVED" as const },
  { parameter: "Plzeň", value: "92 %", source: "Průměr z realitních portálů + EuroProperty data", badge: "DERIVED" as const },
  { parameter: "Liberec", value: "90 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Olomouc", value: "91 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Hradec Králové", value: "90 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "České Budějovice", value: "90 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Pardubice", value: "90 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Zlín", value: "89 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Jihlava", value: "89 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Karlovy Vary", value: "88 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
  { parameter: "Ústí nad Labem", value: "87 %", source: "Průměr z realitních portálů", badge: "DERIVED" as const },
];

export default function MetodikaInvesticePage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── 1. Hero ── */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Investice", href: "/investice" },
          { label: "Metodika: Investice" },
        ]}
        title="Jak kalkulačka investičního bytu počítá"
        subtitle="Úplný daňový model s odpisy, obsazenost dle města, všechny předpoklady a zdroje. Žádná jiná česká kalkulačka toto nepočítá takto podrobně."
      />

      {/* Google Sheet CTA */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 pb-10">
        <a
          href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=275768974#gid=275768974"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-uiSans transition-all"
          style={{
            background: "var(--btn-primary-bg)",
            color: "var(--btn-primary-text)",
            boxShadow: "var(--btn-primary-shadow)",
          }}
        >
          <ExternalLink className="h-4 w-4" />
          Ověřit výpočet v Google Sheetu (záložka Investice)
        </a>
      </div>

      {/* ── 2. Proč ne výnosové procento ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Proč ne výnosové procento?
          </h2>
          <div className="space-y-4 text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            <p>
              Hrubé výnosové procento (roční nájemné / kupní cena) je v Praze <strong style={{ color: "var(--color-primary)" }}>3,5–4,3 %</strong>.
              Tento ukazatel ignoruje pět zásadních faktorů: daně z příjmu, odpisy, fond oprav, pojistné
              a neobsazenost. Po odečtení všech nákladů klesá čistý výnos na <strong style={{ color: "var(--color-primary)" }}>1,5–2,5 %</strong>.
            </p>
            <p>
              Správná otázka není "kolik procent vydělám na nájmu?", ale{" "}
              <strong style={{ color: "var(--color-primary)" }}>
                "jaké čisté jmění mi po 30 letech přinese investiční byt oproti stejné částce vložené do ETF?"
              </strong>
            </p>
            <p>
              Kalkulačka porovnává obě alternativy se stejným počátečním kapitálem a symetrickými
              měsíčními výdaji, aby byl výsledek skutečně srovnatelný.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Jak kalkulačka počítá ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Jak kalkulačka počítá
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scénář A */}
            <div
              className="rounded-3xl p-6 border"
              style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--scenario-a-dot)" }} />
                <span className="text-xs font-semibold uppercase tracking-wide font-uiSans" style={{ color: "var(--scenario-a-dot)" }}>
                  Scénář A
                </span>
              </div>
              <h3 className="font-uiSans font-semibold text-lg mb-3" style={{ color: "var(--color-primary)" }}>
                Investiční byt
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                <li>Koupíte byt na hypotéku, pronajímáte ho</li>
                <li>Příjem z nájmu (upravený o obsazenost) krytí hypotéky, fondu oprav, pojistného a daní</li>
                <li>Čistý cashflow po nákladech se investuje do vedlejšího ETF fondu</li>
                <li>Plný daňový model: skutečné výdaje §9 ZDP + odpisy skupiny 5 + přenos ztráty §34 ZDP</li>
                <li>Po 30 letech: hodnota nemovitosti − zbytek dluhu + vedlejší fond</li>
              </ul>
            </div>

            {/* Scénář B */}
            <div
              className="rounded-3xl p-6 border"
              style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--scenario-b-dot)" }} />
                <span className="text-xs font-semibold uppercase tracking-wide font-uiSans" style={{ color: "var(--scenario-b-dot)" }}>
                  Scénář B
                </span>
              </div>
              <h3 className="font-uiSans font-semibold text-lg mb-3" style={{ color: "var(--color-primary)" }}>
                Akciový fond (ETF)
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                <li>Stejnou počáteční hotovost (vlastní zdroje) investujete ihned do ETF</li>
                <li>Každý měsíc investujete částku odpovídající čistým nákladům investičního bytu</li>
                <li>Výnos ETF roste složeným úrokem po celých 30 let</li>
                <li>Žádné provozní náklady, žádná neobsazenost, žádná správa</li>
                <li>Po 30 letech: celková hodnota ETF portfolia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Daňový model ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Daňový model podrobně
          </h2>
          <div className="space-y-5 text-base leading-relaxed font-uiSans mb-8" style={{ color: "var(--color-secondary)" }}>
            <p>
              Příjmy z pronájmu jsou zdaňovány jako příjmy z nájmu dle <strong style={{ color: "var(--color-primary)" }}>§9 ZDP</strong>.
              Kalkulačka používá metodu skutečných výdajů (ne 30% paušál), protože při investičním
              bytu s hypotékou jsou skutečné výdaje obvykle vyšší.
            </p>
          </div>

          <CalloutBox variant="info" title="Odpisy nemovitosti — odpisová skupina 5 (§31 ZDP)">
            <div className="space-y-2 text-sm">
              <p>
                Z kupní ceny se jako základ pro odpisy bere <strong>90 %</strong> — zbývajících 10 % připadá na
                pozemek (pozemek není odpisovatelný dle českého daňového práva).
              </p>
              <p>
                <strong>Rok 1:</strong> 1,4 % z 90 % kupní ceny
                <br />
                <strong>Roky 2–30:</strong> 3,4 % z 90 % kupní ceny
              </p>
              <p className="pt-1">
                <strong>Příklad — Praha 2+kk (kupní cena 8 100 000 Kč):</strong>
                <br />
                Odpisová základna: 8 100 000 × 0,9 = <strong>7 290 000 Kč</strong>
                <br />
                Rok 1: 7 290 000 × 1,4 % = <strong>102 060 Kč</strong>
                <br />
                Roky 2–30: 7 290 000 × 3,4 % = <strong>247 860 Kč/rok</strong>
              </p>
              <p className="pt-1 text-xs" style={{ color: "var(--color-bullet)" }}>
                Odpisy snižují základ daně z příjmu z nájmu. Při sazbě 15 % to představuje úsporu
                až <strong>37 179 Kč/rok</strong> od roku 2.
              </p>
            </div>
          </CalloutBox>

          <div className="mt-6 space-y-4 text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            <p>
              <strong style={{ color: "var(--color-primary)" }}>Přenos daňové ztráty (§34 ZDP):</strong>{" "}
              V letech, kdy jsou náklady vyšší než příjmy (zejména na začátku, kdy jsou úroky vysoké),
              vzniká daňová ztráta. Tu lze uplatnit v následujících 5 letech. Kalkulačka přenos ztráty
              automaticky počítá.
            </p>
            <p>
              <strong style={{ color: "var(--color-primary)" }}>Základ daně:</strong>{" "}
              Příjmy z nájmu (upravené o obsazenost) − fond oprav − pojistné − daň z nemovitosti −
              úroky z hypotéky − odpisy − údržba (bez odpočtu, není daňový náklad).
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Co kalkulačka zahrnuje ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Co kalkulačka zahrnuje
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "Počáteční investice",
                items: ["Vlastní zdroje (záloha)", "Příspěvek rodičů (volitelný)", "Zařízení nemovitosti", "Okamžitá investice do ETF (Scénář B)"],
              },
              {
                title: "Roční náklady a příjmy",
                items: ["Splátka hypotéky (jistina + úroky)", "Příjmy z nájmu (upraveno o obsazenost)", "Fond oprav, pojistné, daň z nemovitosti", "Náklady na údržbu"],
              },
              {
                title: "Daně — plný model",
                items: ["Skutečné výdaje §9 ZDP", "Odpisy skupiny 5 (1,4 % / 3,4 % z 90 % ceny)", "Přenos daňové ztráty §34 ZDP (5 let)", "Pásmo daně z příjmu 15 % nebo 23 %"],
              },
              {
                title: "Investování a vedlejší fond",
                items: ["Kladný čistý cashflow se investuje do ETF", "Vedlejší fond Scénáře A je symetrický k ETF portfoliu Scénáře B", "Zhodnocení vedlejšího fondu stejnou sazbou jako ETF"],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="rounded-2xl p-5 border font-uiSans"
                style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card-soft)" }}
              >
                <h3 className="font-semibold text-base mb-3" style={{ color: "var(--color-primary)" }}>
                  {group.title}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-bullet)" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Co kalkulačka nezahrnuje ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Co kalkulačka nezahrnuje
          </h2>
          <div className="space-y-4">
            {[
              { title: "Čas na správu nemovitosti", text: "Hledání nájemníků, výběr nájmu, komunikace, opravy — odhadem 2–5 hodin měsíčně. Hodnota tohoto času není zahrnuta." },
              { title: "Správcovský poplatek", text: "Pokud využijete správcovskou agenturu, stojí to 6–10 % měsíčního nájmu. Kalkulačka předpokládá vlastní správu." },
              { title: "Právní a transakční náklady", text: "Notářské poplatky, advokátní poplatky při koupi, realitní provize. Tyto jednorázové náklady zvýhodňují ETF alternativu." },
              { title: "Zdanění ETF výnosů", text: "ETF výnosy jsou po 3 letech od nákupu osvobozeny do 100 000 Kč/rok (§4 ZDP). Kalkulačka tento přínos nezahrnuje — mírně konzervativní vůči ETF." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "var(--color-border)" }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-bullet)" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm font-uiSans mb-0.5" style={{ color: "var(--color-primary)" }}>{item.title}</p>
                  <p className="text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Předvyplněné hodnoty ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-primary)" }}>
            Předvyplněné hodnoty a zdroje
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-secondary)" }}>
            Všechny parametry jsou uživatelsky upravitelné. Výchozí hodnoty vycházejí z ověřených veřejných dat.
          </p>
          <div
            className="rounded-3xl border p-6 md:p-8 mb-10"
            style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
          >
            <ArticleDataTable rows={PREDVYPLNENE_HODNOTY} />
          </div>

          <h3 className="font-uiSans font-semibold text-xl mb-3" style={{ color: "var(--color-primary)" }}>
            Obsazenost dle města
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-secondary)" }}>
            Obsazenost (occupancy rate) snižuje efektivní příjem z nájmu. Hodnoty jsou konzervativní
            průměry z trhu nájemního bydlení.
          </p>
          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
          >
            <ArticleDataTable rows={OBSAZENOST_ROWS} caption="Obsazenost dle města (výchozí hodnoty)" />
          </div>
        </div>
      </section>

      {/* ── 8. Právní upozornění + CTA ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CalloutBox variant="warning" title="Právní upozornění">
            <p>
              Tato kalkulačka slouží výhradně k orientačním a vzdělávacím účelům. Výsledky nejsou
              finančním poradenstvím. Daňové dopady závisí na individuální situaci každého investora.
              Před jakýmkoli investičním rozhodnutím doporučujeme konzultaci s daňovým poradcem
              a licencovaným finančním poradcem.
            </p>
          </CalloutBox>

          <div className="mt-10 text-center">
            <p className="text-base font-uiSans mb-4" style={{ color: "var(--color-secondary)" }}>
              Připraveni spočítat si vlastní investiční byt?
            </p>
            <Link
              href="/investice"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold font-uiSans transition-all"
              style={{
                background: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
                boxShadow: "var(--btn-primary-shadow)",
              }}
            >
              Otevřít kalkulačku investice →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
