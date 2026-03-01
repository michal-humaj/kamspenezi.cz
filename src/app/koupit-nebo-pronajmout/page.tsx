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
  title: "Koupit nebo pronajmout byt? Kompletní průvodce 2026 | kamspenezi.cz",
  description:
    "Hypotéka vs. nájem — co je finančně výhodnější? Rozbor 4 rozšířených mýtů, klíčové proměnné a aktuální data českého trhu 2026. Spočítejte si to sami.",
  alternates: { canonical: "https://kamspenezi.cz/koupit-nebo-pronajmout" },
  openGraph: {
    title: "Koupit nebo pronajmout byt? Kompletní průvodce 2026",
    description:
      "Rozbor 4 mýtů o koupi vs. nájmu, klíčové proměnné a data z českého trhu 2026. Bez bankovní provize, bez vychytralých doporučení.",
    url: "https://kamspenezi.cz/koupit-nebo-pronajmout",
    type: "article",
  },
};

const FAQ_ITEMS = [
  {
    q: "Je nájem vždy horší než vlastní bydlení z pohledu čistého jmění?",
    a: "Ne. Záleží na ceně bytu, výši nájemného, úrokové sazbě a výnosu investic. Kalkulačka kamspenezi.cz vám přesně ukáže, která varianta vede k vyššímu čistému jmění po 30 letech právě ve vaší situaci.",
  },
  {
    q: "Kolik % hypotéky je nutná záloha?",
    a: "ČNB vyžaduje minimum 20 % vlastních zdrojů pro investiční nemovitost (LTV max 80 %). Pro běžné bydlení platí stejná pravidla od roku 2024. Pravidla DSTI omezují splátky na 40–45 % čistého příjmu.",
  },
  {
    q: "Jak kalkulačka zohledňuje investování peněz z nájmu?",
    a: "V scénáři 'nájem a investice' kalkulačka automaticky investuje: (1) vlastní zdroje, které by šly do zálohy, (2) každý měsíc rozdíl, o který je nájem nižší než splátka hypotéky. To zajišťuje férové srovnání.",
  },
  {
    q: "Jak realistický je výnos 7 % ročně z ETF?",
    a: "MSCI World Index (globální akcie) dosáhl od roku 1970 nominálního výnosu přibližně 9,5 % ročně. Výchozí hodnota 7 % je záměrně konzervativní. Hodnotu si v kalkulačce upravíte dle svého odhadu.",
  },
  {
    q: "Co dělat, když ceny nemovitostí v Česku dál porostou o 10 % ročně?",
    a: "Výchozí předpoklad kalkulačky je 3–3,5 % ročně, ne historický peak. V kalkulačce lze růst nastavit na libovolnou hodnotu a okamžitě vidíte dopad na výsledek. Při 10 % ročně vychází koupě téměř vždy lépe.",
  },
  {
    q: "Zahrnuje kalkulačka daňový odpočet hypotečních úroků?",
    a: "Ano. Kalkulačka bydlení zahrnuje odpočet úroků z hypotéky dle §15 ZDP (max 150 000 Kč ročně při zástavě). Při daňovém pásmu 15 % to znamená úsporu až 22 500 Kč ročně.",
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

const MYTHS = [
  {
    id: "mytus-najem-vyhazovani",
    title: "Mýtus 1: Nájem je vyhazování peněz",
    content: `Průzkum Air Bank a Ipsos z roku 2023 ukázal, že <strong>86 % Čechů považuje nájem za vyhazování peněz</strong>.
    Jenže nájem není plýtvání — je to platba za bydlení, stejně jako splátka úroků z hypotéky.
    A úroky tvoří v prvních letech až 80 % splátky.`,
    detail: `Při hypotéce 6 500 000 Kč na 30 let při 4,9 % zaplatíte první rok na úrocích přibližně
    295 000 Kč — peníze, které se do vlastní nemovitosti nepromítají vůbec. Přidejte fond oprav,
    pojistné a daň z nemovitosti: reálné náklady na vlastní byt jsou v prvních letech výrazně
    vyšší než samotná splátka.`,
  },
  {
    id: "mytus-splatka-naklady",
    title: "Mýtus 2: Splátka hypotéky = náklady na bydlení",
    content: `Skutečné náklady na vlastní byt zahrnují mnohem víc: fond oprav (22 Kč/m²/měsíc),
    pojistné (~20 Kč/m²/rok), daň z nemovitosti, náklady na údržbu a případné větší opravy.`,
    detail: `U bytu 60 m² v Praze přidají tyto položky k hypotéce zhruba 2 000–3 500 Kč měsíčně.
    Standardní srovnání "splátka vs. nájem" tyto náklady ignoruje — a tím zkresluje výsledek
    ve prospěch koupě.`,
  },
  {
    id: "mytus-ceny-neklesnou",
    title: "Mýtus 3: Ceny nemovitostí nikdy neklesnou",
    content: `Česká republika zažila dvě výrazné korekce: v letech 2008–2009 klesly ceny bytů
    o <strong>−18,1 %</strong> a v letech 2022–2023 o <strong>−5,8 %</strong>. Ceny nemovitostí
    neklesají tak dramaticky jako akcie, ale tvrzení o "jisté investici" je naivní.`,
    detail: `Historická data z 17 zemí za období 1870–2015 (Jordà et al., 2024) ukazují průměrný
    reálný výnos nemovitostí 2–3 % ročně po inflaci — srovnatelný s dlouhodobými dluhopisy,
    nikoli s akciovými trhy (7–9 % reálně).`,
  },
  {
    id: "mytus-nemovitost-bezpecna",
    title: "Mýtus 4: Nemovitost je bezpečná, akcie jsou hazard",
    content: `Průzkumy ukazují, že <strong>77 % Čechů se bojí akciových investic</strong>. Přitom
    globálně diverzifikovaný ETF fond je méně rizikový než jeden konkrétní byt v jednom
    konkrétním městě — jde o koncentraci vs. diverzifikaci.`,
    detail: `Nemovitost je jednorázová, illiquidní a geograficky fixovaná investice. ETF fond
    (např. sledující MSCI World) drží tisíce akcií z desítek zemí. Riziko je rozložené.
    Bezpečnost nemovitosti je do velké míry psychologický dojem — ne finanční realita.`,
  },
];

const KEY_VARIABLES = [
  {
    title: "Price-to-Rent ratio",
    value: "V Praze ~33×",
    description: "Kolikrát roční nájemné odpovídá kupní ceně. Nad 20× je nájem obvykle výhodnější — pokud investujete úspory.",
  },
  {
    title: "Úroková sazba hypotéky",
    value: "Klíčová proměnná",
    description: "Při sazbě 3 % vychází koupě v Praze výhodněji. Při 5 % a výš to závisí na dalších faktorech. Výchozí hodnota: 4,9 %.",
  },
  {
    title: "Výnos ETF portfolia",
    value: "7 % p.a. (výchozí)",
    description: "Čím vyšší výnos, tím lépe pro nájemní scénář. Historický MSCI World: ~9,5 % nominálně. Konzervativní odhad: 7 %.",
  },
  {
    title: "Investiční horizont",
    value: "30 let (výchozí)",
    description: "Na kratším horizontu (< 10 let) vychází koupě hůře kvůli transakčním nákladům. Na delším vítěz závisí na parametrech.",
  },
];

export default function KoupitNeboPronajmoutPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── 1. Hero ── */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Koupit nebo pronajmout?" },
        ]}
        title="Koupit, nebo pronajmout? Záleží na víc než na splátce"
        subtitle="Praha 2+kk: splátka hypotéky 34 370 Kč, nájemné 25 500 Kč. Koupě vypadá dráž — ale je skutečně finančně horší? Záleží na tom, co s rozdílem uděláte."
        ctaText="Spočítat moji situaci"
        ctaHref="/"
        ctaAnalytics="cta_kop_hero"
      />

      {/* ── 2. Čtyři mýty ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-primary)" }}>
            Čtyři mýty, které kazí rozhodnutí o bydlení
          </h2>
          <p className="text-base leading-relaxed mb-10 font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Než se podíváme na čísla, pojďme se vypořádat s rozšířenými přesvědčeními,
            která vedou lidi k ukvapeným závěrům na obě strany.
          </p>

          <div className="space-y-8">
            {MYTHS.map((myth) => (
              <div
                key={myth.id}
                id={myth.id}
                className="rounded-3xl border p-6 md:p-8"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <h3 className="font-uiSans font-semibold text-xl mb-3" style={{ color: "var(--color-primary)" }}>
                  {myth.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-3 font-uiSans"
                  style={{ color: "var(--color-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: myth.content }}
                />
                <p className="text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                  {myth.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Co skutečně rozhoduje ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-primary)" }}>
            Co skutečně rozhoduje
          </h2>
          <p className="text-base leading-relaxed mb-8 font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Výsledek závisí na čtyřech klíčových proměnných. Změna v kterékoli z nich může
            otočit výsledek o desítky milionů korun za 30 let.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {KEY_VARIABLES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border p-5 font-uiSans"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-card-soft)",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-base" style={{ color: "var(--color-primary)" }}>
                    {v.title}
                  </h3>
                  <span
                    className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: "var(--bg-lilac-section)", color: "var(--color-primary)" }}
                  >
                    {v.value}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-secondary)" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CalloutBox variant="tip" title="Proč neexistuje univerzální odpověď">
              <p>
                Praha s P/R ratio 33× a sazbou 4,9 % dává jiný výsledek než Ostrava s P/R ratio 18×
                při stejné sazbě. Kalkulačka kamspenezi.cz má výchozí hodnoty pro 13 měst
                a 4 velikosti bytů — odpověď si spočítejte pro svoji konkrétní situaci.
              </p>
            </CalloutBox>
          </div>
        </div>
      </section>

      {/* ── 4. Český trh 2026 ── */}
      {/* UPDATE: Refresh quarterly — next update Q2 2026 */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Český trh v roce 2026
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                value: "4,9 %",
                label: "Průměrná sazba hypotéky",
                source: "Hypoindex.cz, únor 2025",
              },
              {
                value: "+10–19 %",
                label: "Meziroční růst cen bytů",
                source: "CBA Monitor, 2024",
              },
              {
                value: "+3,1 %",
                label: "Meziroční růst nájmů",
                source: "Deloitte Real Estate, 2024",
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
                <div
                  className="font-displaySerif text-3xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {stat.value}
                </div>
                <div className="font-uiSans font-semibold text-sm mb-2" style={{ color: "var(--color-primary)" }}>
                  {stat.label}
                </div>
                <div className="font-uiSans text-xs" style={{ color: "var(--color-bullet)" }}>
                  {stat.source}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-base leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
            <p>
              Sazba 4,9 % je výrazně vyšší než historické minimum okolo 2 % (2021). Pro mnoho
              domácností to znamená, že splátka hypotéky překračuje nájemné za srovnatelný byt —
              a scénář "nájem a investice" je tak finančně zajímavější než kdykoli v předchozí dekádě.
            </p>
            <p>
              Rychlý růst cen bytů (+10–19 %) ve výchozím nastavení kalkulačky nezohledňujeme —
              používáme konzervativní 3–3,5 % p.a. Pokud věříte pokračujícímu boomu, nastavte si
              vyšší hodnotu a podívejte se, jak to změní výsledek.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-4" style={{ color: "var(--color-primary)" }}>
            Spočítejte si to sami
          </h2>
          <p className="text-base leading-relaxed mb-8 font-uiSans max-w-xl mx-auto" style={{ color: "var(--color-secondary)" }}>
            Žádná obecná rada nenahradí výpočet pro vaše konkrétní čísla. Kalkulačka
            je zdarma, bez registrace a výsledky uvidíte okamžitě.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold font-uiSans transition-all"
            style={{
              background: "var(--btn-primary-bg)",
              color: "var(--btn-primary-text)",
              boxShadow: "var(--btn-primary-shadow)",
            }}
          >
            Otevřít kalkulačku bydlení →
          </Link>
          <p className="mt-3 text-sm font-uiSans" style={{ color: "var(--color-bullet)" }}>
            Zdarma · Bez registrace · Praha 2+kk předvyplněno
          </p>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-3xl px-4 md:px-6">
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
