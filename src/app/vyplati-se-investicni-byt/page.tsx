import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Vyplatí se investiční byt v roce 2026? | kamspenezi.cz",
  description:
    "Hrubé výnosové procento 3,5–4,3 % ignoruje odpisy, fond oprav, neobsazenost a alternativní náklady. Spočítejte si čisté jmění po 30 letech — investiční byt vs. ETF fond.",
  alternates: { canonical: "https://kamspenezi.cz/vyplati-se-investicni-byt" },
  openGraph: {
    title: "Vyplatí se investiční byt v roce 2026?",
    description:
      "Skutečná čísla: daňový model s odpisy, neobsazenost, fond oprav vs. ETF za 30 let. Bez bankovní provize.",
    url: "https://kamspenezi.cz/vyplati-se-investicni-byt",
    type: "article",
  },
};

const FAQ_ITEMS = [
  {
    q: "Jaké je hrubé výnosové procento investičního bytu v Praze v roce 2026?",
    a: "V Praze se pohybuje mezi 3,5–4,3 % ročně (roční nájemné / kupní cena). Po odečtení skutečných nákladů (fond oprav, pojistné, daň, správa) a daní klesá čistý výnos na přibližně 1,5–2,5 %. To je výrazně méně, než ukazují reklamní materiály realitních kanceláří.",
  },
  {
    q: "Je investiční byt v roce 2026 stále výhodný?",
    a: "Záleží na konkrétním bytu, ceně, výši hypotéky a alternativě. Kalkulačka kamspenezi.cz porovnává investiční byt s ETF fondem se stejným počátečním kapitálem. Výsledek závisí na vašich parametrech — v Praze při sazbě 4,9 % a konzervativním růstu bývá ETF fond výhodnější, v menších městech s nižším P/R ratiem může vycházet byt lépe.",
  },
  {
    q: "Jak fungují odpisy investičního bytu pro daňové účely?",
    a: "Investiční byt patří do odpisové skupiny 5 (§31 ZDP). Odpisuje se 90 % kupní ceny (bez pozemku). Rok 1: 1,4 % z odpisové základny. Rok 2 a dále: 3,4 % ročně. Odpisy snižují daňový základ z příjmů z nájmu (§9 ZDP). Případná ztráta se přenáší až 5 let (§34 ZDP).",
  },
  {
    q: "Kolik procent zálohy potřebuji na investiční byt?",
    a: "ČNB vyžaduje minimálně 20 % vlastních zdrojů pro investiční nemovitost (LTV max 80 %). Banky mohou mít přísnější podmínky. Od roku 2024 platí pravidlo DSTI: celková splátka všech úvěrů nesmí překročit 40–45 % čistého měsíčního příjmu.",
  },
  {
    q: "Je ETF fond bezpečnější než investiční byt?",
    a: "Globálně diverzifikovaný ETF fond (MSCI World) drží tisíce akcií z desítek zemí — riziko je rozložené. Investiční byt v jednom konkrétním místě je koncentrovaná investice citlivá na lokální trh, vývoj nájmů a fyzický stav nemovitosti. Z pohledu diverzifikace je ETF fond bezpečnější, i když krátkodobě volatilnější.",
  },
  {
    q: "Co se změní pro investory v roce 2026?",
    a: "Klíčové změny: (1) ČNB vyžaduje 20–30% zálohu pro investiční byt. (2) DSTI omezení snižuje přístup k úvěrům. (3) Hypoindex 4,9 % zdražuje financování. (4) Nájmy v Praze rostou, ale pomalejším tempem než ceny bytů. Kalkulačka automaticky používá aktuální výchozí sazby.",
  },
  {
    q: "Jak kalkulačka počítá daně z investičního bytu?",
    a: "Kalkulačka používá metodu skutečných výdajů §9 ZDP (ne 30% paušál). Odečítá: úroky z hypotéky, fond oprav, pojistné, daň z nemovitosti, odpisy (skupina 5). Daňová ztráta se přenáší dle §34 ZDP. Výsledná daňová povinnost se odečte z čistého cashflow. Sazba 15 % nebo 23 % dle vašeho pásma.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const YIELD_PROBLEMS = [
  {
    id: "problem-hrube-vynosove-procento",
    title: "Problém 1: Hrubé výnosové procento ignoruje náklady",
    content: "Hrubý výnos 4 % = roční nájemné / kupní cena. Do výpočtu vůbec nevstupují: fond oprav, pojistné, daň z nemovitosti, náklady na údržbu, poplatky při koupi a neobsazenost.",
    detail: "Po odečtení těchto nákladů klesá čistý výnos v Praze na přibližně 1,5–2,5 %. To je srovnatelné se státními dluhopisy — bez páky a bez rizika nemovitosti.",
  },
  {
    id: "problem-alternativni-naklad",
    title: "Problém 2: Výnos se porovnává se ničím",
    content: `Když říkáte \u201evydělám 4\u00a0% na nájmu\u201c, s čím to srovnáváte? MSCI World ETF dosáhl za posledních 30\u00a0let průměrného nominálního výnosu přibližně 9,5\u00a0% ročně.`,
    detail: `Správná otázka není \u201ekolik % vydělám na nájmu?\u201c, ale \u201ekolik čistého jmění budu mít za 30\u00a0let — investiční byt nebo ETF se stejným kapitálem?\u201c Kalkulačka kamspenezi.cz přesně toto počítá.`,
  },
  {
    id: "problem-jednorocni-snapshot",
    title: "Problém 3: Výnosové % je jednoroční snímek",
    content: "Hrubý výnos nevypovídá nic o tom, jak se vyvíjí situace v čase: roste nájemné? Splácí se jistina hypotéky? Jaká je hodnota bytu za 30 let?",
    detail: "Kalkulačka počítá rok po roce po celých 30 let — cashflow, daně, splácení jistiny, zhodnocení nemovitosti, vedlejší ETF fond. Teprve to dá úplný obrázek.",
  },
];

const MYTHS = [
  {
    id: "mytus-nemovitost-nejlepsi",
    title: "Mýtus 1: Nemovitost je nejlepší investice",
    content: "Studie Jordà et al. (2024) analyzovala výnosy z nemovitostí a akcií v 17 zemích od roku 1870. Výsledek: <strong>reálný výnos nemovitostí po inflaci byl průměrně 2–3 % ročně</strong> — srovnatelný s dluhopisy, nikoli s akciemi (7–9 % reálně).",
    source: "Zdroj: Jordà, Ò. et al. (2024). The Rate of Return on Everything. NBER Working Paper.",
  },
  {
    id: "mytus-inflace",
    title: "Mýtus 2: Nemovitost chrání před inflací",
    content: "Nemovitosti jsou dílčí ochranou proti inflaci, ale ne dokonalou. IPF Research Report (2024) ukazuje, že <strong>v 60 % sledovaných období nemovitosti inflaci neporazily</strong> v reálném vyjádření.",
    source: "Zdroj: IPF Research Programme (2024). Real Estate as an Inflation Hedge.",
  },
  {
    id: "mytus-pasivni-prijem",
    title: "Mýtus 3: Pronájem je pasivní příjem",
    content: "Průzkumy ukazují, že pronajímatelé věnují správě bytu průměrně <strong>2–5 hodin měsíčně</strong>: hledání nájemníků, výběr nájmu, komunikace, opravy, dohadování s dodavateli. Při náhradní mzdě 300 Kč/hod to je 600–1 500 Kč měsíčně, které výnosy snižují.",
    source: "Kalkulačka tento náklad nezahrnuje — reálný výnos je nižší.",
  },
];

export default function VyplatiSeInvesticniByPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── 1. Hero ── */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Investice", href: "/investice" },
          { label: "Vyplatí se investiční byt?" },
        ]}
        title="Vyplatí se investiční byt? Čísla bez příkras"
        subtitle="Hrubé výnosové procento 3,5–4,3 % v Praze zní lákavě. Ale co po odečtení nákladů, daní a ve srovnání s alternativou — akciovým ETF fondem?"
        ctaText="Spočítat investiční byt vs. ETF"
        ctaHref="/investice"
        ctaAnalytics="cta_vsib_hero"
      />

      {/* ── 2. Tři důvody proč výnosové % nestačí ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-primary)" }}>
            Tři důvody, proč výnosové procento nestačí
          </h2>
          <p className="text-base leading-relaxed mb-10 font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Realitní kanceláře prezentují hrubé výnosové procento jako klíčový ukazatel výhodnosti
            investice. Jsou tři zásadní důvody, proč to nestačí.
          </p>

          <div className="space-y-6">
            {YIELD_PROBLEMS.map((problem) => (
              <div
                key={problem.id}
                id={problem.id}
                className="rounded-3xl border p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h3 className="font-uiSans font-semibold text-xl mb-3" style={{ color: "var(--color-primary)" }}>
                  {problem.title}
                </h3>
                <p className="text-base leading-relaxed mb-3 font-uiSans" style={{ color: "var(--color-secondary)" }}>
                  {problem.content}
                </p>
                <p className="text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                  {problem.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Co většina investorů neporovnává ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Co většina investorů neporovnává
          </h2>
          <p className="text-base leading-relaxed mb-8 font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Správné srovnání musí být symetrické: stejný počáteční kapitál, stejné měsíční výdaje,
            stejný časový horizont.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                <li>Záloha 20 % → hypotéka 80 %</li>
                <li>Příjem z nájmu − náklady − daně = čistý cashflow</li>
                <li>Čistý cashflow se investuje do vedlejšího ETF fondu</li>
                <li>Plný daňový model: odpisy skupiny 5, §9 ZDP, přenos ztráty §34</li>
                <li>Po 30 letech: hodnota bytu − dluh + vedlejší fond</li>
              </ul>
            </div>

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
                ETF fond
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                <li>Stejnou zálohu okamžitě investujete do ETF</li>
                <li>Každý měsíc investujete částku = čisté náklady investičního bytu</li>
                <li>Složené úročení bez daní po celých 30 let (§4 ZDP osvobození)</li>
                <li>Žádné provozní starosti, žádná neobsazenost</li>
                <li>Po 30 letech: celková hodnota ETF portfolia</li>
              </ul>
            </div>
          </div>

          <CalloutBox variant="tip" title="Symetrie je klíčová">
            <p>
              Pokud má investiční byt v daném roce záporný cashflow (náklady převyšují nájemné),
              kalkulačka tuto chybějící částku odečte z ETF scénáře. Obě alternativy tak mají
              vždy stejné celkové výdaje — výsledek je srovnatelný.
            </p>
          </CalloutBox>
        </div>
      </section>

      {/* ── 4. Tři investiční mýty ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Tři investiční mýty a data
          </h2>
          <div className="space-y-6">
            {MYTHS.map((myth) => (
              <div
                key={myth.id}
                id={myth.id}
                className="rounded-3xl border p-6 md:p-8"
                style={{ background: "var(--bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="font-uiSans font-semibold text-xl mb-3" style={{ color: "var(--color-primary)" }}>
                  {myth.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-3 font-uiSans"
                  style={{ color: "var(--color-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: myth.content }}
                />
                <p className="text-xs font-uiSans italic" style={{ color: "var(--color-bullet)" }}>
                  {myth.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Jak kalkulačka počítá daně ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Jak kalkulačka počítá daně
          </h2>
          <div className="space-y-4 text-base leading-relaxed font-uiSans mb-8" style={{ color: "var(--color-secondary)" }}>
            <p>
              Daňový model je klíčovým odlišovačem od ostatních kalkulaček. Zahrnuje plný zákonný rámec
              pro pronájem bytu v Česku.
            </p>
          </div>

          <CalloutBox variant="info" title="Odpisy — odpisová skupina 5, §31 ZDP">
            <div className="space-y-2 text-sm">
              <p>
                Odpisová základna = <strong>90 % kupní ceny</strong> (10 % připadá na pozemek,
                který není odpisovatelný).
              </p>
              <p>
                <strong>Rok 1:</strong> 1,4 % → <strong>Roky 2–30:</strong> 3,4 % ročně
              </p>
              <p className="pt-1">
                <strong>Příklad — Praha 2+kk, cena 8 100 000 Kč:</strong><br />
                Základ: 7 290 000 Kč → Odpis rok 1: <strong>102 060 Kč</strong><br />
                Odpis rok 2–30: <strong>247 860 Kč/rok</strong><br />
                Daňová úspora (sazba 15 %): <strong>~37 179 Kč/rok</strong>
              </p>
              <p className="pt-1">
                Případná daňová ztráta (§9 ZDP) se přenáší dle §34 ZDP — až 5 let zpětně.
                Kalkulačka přenos ztráty automaticky sleduje.
              </p>
            </div>
          </CalloutBox>
        </div>
      </section>

      {/* ── 6. Co se mění v 2026 ── */}
      {/* UPDATE: Refresh quarterly — next update Q2 2026 */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Co se mění pro investory v roce 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                value: "20–30 %",
                label: "Minimální záloha",
                detail: "ČNB — LTV omezení pro investiční byt (vyšší než pro vlastní bydlení)",
              },
              {
                value: "40–45 %",
                label: "Max. DSTI",
                detail: "ČNB — celková splátka všech úvěrů jako % čistého příjmu",
              },
              {
                value: "4,9 %",
                label: "Průměrná sazba",
                detail: "Hypoindex.cz, únor 2025 — výrazně nad minimy z let 2020–2021",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border p-6 text-center"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="font-displaySerif text-3xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
                  {stat.value}
                </div>
                <div className="font-uiSans font-semibold text-sm mb-2" style={{ color: "var(--color-primary)" }}>
                  {stat.label}
                </div>
                <div className="font-uiSans text-xs leading-relaxed" style={{ color: "var(--color-bullet)" }}>
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Vyšší sazba a přísnější LTV podmínky prodražují financování investičního bytu.
            Zároveň to snižuje dostupnost pro širší skupinu investorů, což tlumí poptávku
            a potenciálně i růst cen. V kalkulačce si nastavte vlastní podmínky.
          </p>
        </div>
      </section>

      {/* ── 7. CTA + FAQ ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          {/* CTA */}
          <div className="text-center mb-14">
            <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-4" style={{ color: "var(--color-primary)" }}>
              Spočítejte si investiční byt vs. ETF
            </h2>
            <p className="text-base leading-relaxed mb-8 font-uiSans max-w-xl mx-auto" style={{ color: "var(--color-secondary)" }}>
              Zdarma, bez registrace. Praha 2+kk předvyplněno, ale nastavte si
              jakékoli město, dispozici a parametry.
            </p>
            <Link
              href="/investice"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold font-uiSans transition-all"
              style={{
                background: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
                boxShadow: "var(--btn-primary-shadow)",
              }}
            >
              Otevřít kalkulačku investice →
            </Link>
          </div>

          {/* FAQ */}
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Časté otázky
          </h2>
          <div
            className="rounded-3xl border overflow-hidden"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Accordion type="multiple" className="divide-y divide-[var(--color-border)]">
              {FAQ_ITEMS.map(({ q, a }, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-left font-uiSans font-medium text-base hover:no-underline" style={{ color: "var(--color-primary)" }}>
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 font-uiSans text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
