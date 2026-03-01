import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { ArticleDataTable } from "@/components/shared/ArticleDataTable";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Metodika kalkulačky bydlení | kamspenezi.cz",
  description:
    "Jak kalkulačka bydlení přesně počítá čisté jmění po 30 letech? Podrobná metodika: předvyplněné hodnoty, zdroje dat, daňový model, fond oprav, pojistné a konzervativní předpoklady růstu.",
  alternates: { canonical: "https://kamspenezi.cz/metodika/bydleni" },
  openGraph: {
    title: "Metodika kalkulačky bydlení | kamspenezi.cz",
    description:
      "Transparentní metodika kalkulačky bydlení — všechny předpoklady, zdroje dat a výpočetní pravidla na jednom místě.",
    url: "https://kamspenezi.cz/metodika/bydleni",
  },
};

const PREDVYPLNENE_HODNOTY = [
  { parameter: "Kupní cena nemovitosti", value: "Dle výběru města a dispozice", source: "Průměry z nabídek Sreality.cz a Bezrealitky.cz (2024–2025)", badge: "VERIFIED" as const },
  { parameter: "Vlastní zdroje", value: "20 % kupní ceny", source: "ČNB — minimální zákonný požadavek LTV 80 %", badge: "VERIFIED" as const },
  { parameter: "Úroková sazba hypotéky", value: "4,9 % p.a.", source: "Hypoindex.cz — průměrná sazba únor 2025", badge: "VERIFIED" as const },
  { parameter: "Nájemné", value: "Dle výběru města a dispozice", source: "Průměry z nabídek Sreality.cz a Bezrealitky.cz (2024–2025)", badge: "VERIFIED" as const },
  { parameter: "Výnos investice (ETF)", value: "7 % p.a.", source: "MSCI World Index — historický nominální výnos 1970–2024", badge: "VERIFIED" as const },
  { parameter: "Fond oprav", value: "22 Kč/m²/měsíc", source: "Zákon č. 89/2012 Sb. — doporučené minimum pro panelové domy; dle stáří a stavu budovy", badge: "DERIVED" as const },
  { parameter: "Pojistné nemovitosti", value: "20 Kč/m²/rok", source: "Srovnávač.cz — průměrná cena pojistného pro byt 2+kk v ČR (2024)", badge: "VERIFIED" as const },
  { parameter: "Daň z nemovitosti", value: "Dle zákonného vzorce", source: "Zákon č. 338/1992 Sb. — výměra × koeficient × sazba; přepočítáno na Kč/m²/rok dle obce", badge: "VERIFIED" as const },
  { parameter: "Náklady údržby", value: "Fixní základ + 73 Kč/m²/rok", source: "SFRB — výzkum nákladů na údržbu bytového fondu (2022); regionální koeficient dle průměrné mzdy", badge: "DERIVED" as const },
  { parameter: "Odpočet úroků z hypotéky", value: "Max. 150 000 Kč/rok", source: "§15 zákona č. 586/1992 Sb. o daních z příjmů — od r. 2021", badge: "VERIFIED" as const },
  { parameter: "Pásmo daně z příjmu", value: "15 % (základní)", source: "§16 ZDP — sazba 15 % pro příjmy do 36násobku průměrné mzdy", badge: "VERIFIED" as const },
  { parameter: "Délka horizonu", value: "30 let", source: "Standardní délka hypotéky; dostatečně dlouhý horizont pro porovnání ETF cyklů", badge: "DERIVED" as const },
  { parameter: "Růst hodnoty nemovitosti", value: "3 % p.a. (Praha: 3,5 %)", source: "Konzervativní — viz sekce Proč konzervativní předpoklady níže", badge: "DERIVED" as const },
  { parameter: "Růst nájemného", value: "2,5 % p.a.", source: "Deloitte Czech Real Estate Market Overview — průměrný růst 2015–2024", badge: "VERIFIED" as const },
  { parameter: "Očekávaná inflace", value: "2,5 % p.a.", source: "ČNB — střednědobý inflační cíl", badge: "VERIFIED" as const },
  { parameter: "Příspěvek rodičů", value: "0 Kč (výchozí)", source: "Uživatelsky nastavitelné — vliv na výchozí kapitál scénáře A", badge: "DERIVED" as const },
];

export default function MetodikaBydleniPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── 1. Hero ── */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "Metodika: Bydlení" },
        ]}
        title="Jak kalkulačka bydlení počítá"
        subtitle="Transparentní metodika — všechny předpoklady, zdroje dat a výpočetní pravidla. Výsledky si ověříte v připojeném Google Sheetu."
      />

      {/* Verify in spreadsheet CTA */}
      <div className="mx-auto max-w-4xl px-4 md:px-6 pb-10">
        <a
          href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?gid=1260855363#gid=1260855363"
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
          Ověřit výpočet v Google Sheetu
        </a>
      </div>

      {/* ── 2. Jak kalkulačka počítá ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Jak kalkulačka počítá
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-secondary)" }}>
            Kalkulačka porovnává dvě finanční strategie ve stejném časovém horizontu (30 let) se stejným
            výchozím kapitálem. Rozdíl v měsíčních platbách se v obou scénářích aktivně investuje,
            aby bylo srovnání fér.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Scénář A */}
            <div
              className="rounded-3xl p-6 border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--scenario-a-dot)" }} />
                <span className="text-xs font-semibold uppercase tracking-wide font-uiSans" style={{ color: "var(--scenario-a-dot)" }}>
                  Scénář A
                </span>
              </div>
              <h3 className="font-uiSans font-semibold text-lg mb-3" style={{ color: "var(--color-primary)" }}>
                Vlastní bydlení na hypotéku
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                <li>Pořídíte byt, zaplatíte vlastní zdroje + vedlejší náklady</li>
                <li>Každý měsíc splácíte hypotéku, platíte fond oprav, pojistné, daň z nemovitosti a údržbu</li>
                <li>Pokud je splátka nižší než nájemné, rozdíl investujete do vedlejšího fondu (ETF)</li>
                <li>Odpočítávají se zaplacené hypoteční úroky (§15 ZDP, max 150 000 Kč/rok)</li>
                <li>Po 30 letech: hodnota nemovitosti − zbývající dluh + vedlejší fond</li>
              </ul>
            </div>

            {/* Scénář B */}
            <div
              className="rounded-3xl p-6 border"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--scenario-b-dot)" }} />
                <span className="text-xs font-semibold uppercase tracking-wide font-uiSans" style={{ color: "var(--scenario-b-dot)" }}>
                  Scénář B
                </span>
              </div>
              <h3 className="font-uiSans font-semibold text-lg mb-3" style={{ color: "var(--color-primary)" }}>
                Nájem + investování
              </h3>
              <ul className="space-y-2 text-sm leading-relaxed font-uiSans" style={{ color: "var(--color-secondary)" }}>
                <li>Bydlíte v nájmu, vlastní zdroje investujete ihned do ETF portfolia</li>
                <li>Každý měsíc platíte nájemné</li>
                <li>Pokud je nájemné nižší než splátka hypotéky, rozdíl investujete do ETF portfolia</li>
                <li>Celkové výdaje jsou symetrické — scénáře jsou srovnatelné</li>
                <li>Po 30 letech: hodnota ETF portfolia</li>
              </ul>
            </div>
          </div>

          {/* Praha 2+kk example */}
          <CalloutBox variant="info" title="Příklad — Praha 2+kk (výchozí nastavení)">
            <div className="space-y-1 text-sm">
              <p>Kupní cena: <strong>8 100 000 Kč</strong> · Vlastní zdroje (20 %): <strong>1 620 000 Kč</strong></p>
              <p>Hypotéka: <strong>6 480 000 Kč</strong> na 30 let při 4,9 % → splátka <strong>34 370 Kč/měsíc</strong></p>
              <p>Nájemné Praha 2+kk: <strong>25 500 Kč/měsíc</strong></p>
              <p>Rozdíl (investuje Scénář B navíc): <strong>8 870 Kč/měsíc</strong></p>
              <p className="pt-1 text-xs" style={{ color: "var(--color-bullet)" }}>
                Odpočet úroků §15 ZDP: první rok ~295 000 Kč úroků, odpočet v pásmu 15 % = úspora ~44 250 Kč/rok
              </p>
            </div>
          </CalloutBox>
        </div>
      </section>

      {/* ── 3. Co kalkulačka zahrnuje ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-8" style={{ color: "var(--color-primary)" }}>
            Co kalkulačka zahrnuje
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "Počáteční investice",
                items: ["Vlastní zdroje (záloha)", "Příspěvek rodičů (volitelný)", "Zařízení nemovitosti (Scénář A)", "Okamžitá investice vlastních zdrojů do ETF (Scénář B)"],
              },
              {
                title: "Roční náklady a příjmy",
                items: ["Splátka hypotéky (jistina + úroky)", "Fond oprav, pojistné, daň z nemovitosti", "Náklady na údržbu", "Nájemné (Scénář B)", "Investice přebytků do ETF"],
              },
              {
                title: "Daně",
                items: ["Odpočet hypotečních úroků §15 ZDP (max 150 000 Kč/rok)", "Daň z příjmu dle zvoleného pásma (15 % nebo 23 %)", "Zdanění ETF výnosů při prodeji (nezapočítáno — zjednodušení)"],
              },
              {
                title: "Růst a zhodnocení",
                items: ["Roční růst hodnoty nemovitosti (nastavitelný)", "Roční zhodnocení ETF portfolia (nastavitelný)", "Roční růst nájemného (nastavitelný)", "Splácení jistiny hypotéky"],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="rounded-2xl p-5 border font-uiSans"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-card-soft)",
                }}
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

      {/* ── 4. Co kalkulačka nezahrnuje ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-4" style={{ color: "var(--color-primary)" }}>
            Co kalkulačka nezahrnuje
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-secondary)" }}>
            Pro jednoduchost a srovnatelnost jsou některé položky záměrně vynechány. Všechny vynechávky
            platí symetricky pro oba scénáře, takže výsledné srovnání zůstává férové.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Transakční náklady",
                text: "Daň z nabytí nemovitosti (zrušena 2020), realitní provize (2–3 %), poplatky za návrh vkladu (2 000 Kč), ocenění nemovitosti (~5 000 Kč). Tyto jednorázové náklady zvýhodňují Scénář B (nájem).",
              },
              {
                title: "Rekonstrukce a větší opravy",
                text: "Výměna jádra, kuchyně nebo koupelny jsou velké jednorázové výdaje, které fond oprav pokrývá jen částečně. Reálné náklady v Scénáři A mohou být vyšší.",
              },
              {
                title: "Psychologická hodnota vlastnictví",
                text: "Jistota, možnost rekonstrukce dle libosti, trvalé bydlení bez výpovědi — tyto hodnoty jsou reálné, ale finančně nevyčíslitelné. Kalkulačka měří jen čisté jmění.",
              },
              {
                title: "Zdanění výnosů ETF",
                text: "Výnosy z ETF jsou při prodeji po 3 letech osvobozeny od daně (§4 ZDP, limit 100 000 Kč/rok) nebo zdaněny 15 %. Kalkulačka toto nezapočítává — mírně nadhodnocuje výnos Scénáře B.",
              },
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

      {/* ── 5. Předvyplněné hodnoty ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-3" style={{ color: "var(--color-primary)" }}>
            Předvyplněné hodnoty a zdroje
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-secondary)" }}>
            Výchozí hodnoty vycházejí z ověřených veřejných dat. Všechny parametry jsou uživatelsky
            upravitelné. Označení VERIFIED = přímo z datasetu, DERIVED = vypočítáno z dat.
          </p>

          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ArticleDataTable rows={PREDVYPLNENE_HODNOTY} />
          </div>
        </div>
      </section>

      {/* ── 6. Proč konzervativní předpoklady ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-lilac-section)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="font-uiSans font-semibold text-2xl md:text-3xl mb-6" style={{ color: "var(--color-primary)" }}>
            Proč konzervativní předpoklady růstu?
          </h2>

          <div className="space-y-5 text-base leading-relaxed font-uiSans mb-8" style={{ color: "var(--color-secondary)" }}>
            <p>
              Historický CAGR cen bytů v Praze za posledních 20 let je přibližně <strong style={{ color: "var(--color-primary)" }}>9,2 % ročně</strong>.
              Výchozí hodnota v kalkulačce je <strong style={{ color: "var(--color-primary)" }}>3,5 %</strong> pro Prahu a <strong style={{ color: "var(--color-primary)" }}>3 %</strong> pro ostatní města.
            </p>
            <p>
              Jsme záměrně konzervativní ze dvou důvodů: (1) dlouhodobá data z 17 zemí (studie Jordà et al., 2024)
              ukazují, že reálný výnos nemovitostí po inflaci je průměrně <strong style={{ color: "var(--color-primary)" }}>2–3 % ročně</strong>,
              ne dvojciferný nominální výnos. (2) Minulý výkon nezaručuje budoucí výsledky — zejména v kontextu
              demografického vývoje a možné korekce.
            </p>
            <p>
              Stejná konzervativnost platí pro ETF: výchozích 7 % ročně je pod historickým průměrem
              MSCI World (~9,5 % nominálně), ale nad průměrem po inflaci (~7 %).
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="border-l-4 pl-5 py-2 font-uiSans italic text-lg"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            "Raději podceníme růst a příjemně vás překvapíme, než abychom stavěli na optimistických
            předpokladech, které se nemusí naplnit."
          </blockquote>
          <p className="mt-3 text-sm font-uiSans" style={{ color: "var(--color-secondary)" }}>
            Zdroj: Jordà, Ò. et al. (2024). <em>The Rate of Return on Everything, 1870–2015</em>. NBER Working Paper.
          </p>
        </div>
      </section>

      {/* ── 7. Právní upozornění + CTA ── */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg-base)" }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CalloutBox variant="warning" title="Právní upozornění">
            <p>
              Tato kalkulačka slouží výhradně k orientačním a vzdělávacím účelům. Výsledky nejsou
              finančním poradenstvím ve smyslu zákona č. 256/2004 Sb. Před jakýmkoli finančním
              rozhodnutím doporučujeme konzultaci s licencovaným finančním poradcem.
              Kalkulačka nezohledňuje individuální daňovou situaci uživatele.
            </p>
          </CalloutBox>

          <div className="mt-10 text-center">
            <p className="text-base font-uiSans mb-4" style={{ color: "var(--color-secondary)" }}>
              Připraveni spočítat si vlastní situaci?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold font-uiSans transition-all"
              style={{
                background: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
                boxShadow: "var(--btn-primary-shadow)",
              }}
            >
              Otevřít kalkulačku bydlení →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
