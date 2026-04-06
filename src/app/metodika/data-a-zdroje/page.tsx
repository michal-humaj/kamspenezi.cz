import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Data a zdroje kalkulačky | kamspenezi.cz",
  description:
    "Přehled všech parametrů kalkulačky: co každý z nich znamená, jakou hodnotu používáme, odkud pochází a co kalkulačka záměrně nezahrnuje.",
  alternates: {
    canonical: "https://kamspenezi.cz/metodika/data-a-zdroje",
  },
  openGraph: {
    title: "Data a zdroje kalkulačky | kamspenezi.cz",
    description:
      "Přehled všech parametrů kalkulačky: co každý z nich znamená, jakou hodnotu používáme, odkud pochází a co kalkulačka záměrně nezahrnuje.",
    type: "website",
    url: "https://kamspenezi.cz/metodika/data-a-zdroje",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
  },
};

const CONTENT_WIDTH = "max-w-[760px]";
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-uiSans text-base font-semibold mb-3 mt-8 first:mt-0"
      style={{ color: "var(--color-primary)" }}
    >
      {children}
    </h3>
  );
}

function Prose({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-uiSans text-base md:text-lg leading-relaxed ${className}`}
      style={{ color: PROSE_COLOR }}
    >
      {children}
    </p>
  );
}

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <span
        className="font-uiSans text-sm font-semibold flex-shrink-0"
        style={{ color: "var(--color-primary)" }}
      >
        {label}
      </span>
      <span className="font-uiSans text-sm" style={{ color: PROSE_COLOR }}>
        {children}
      </span>
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="mt-[0.45em] h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{ background: "var(--color-bullet)" }}
          />
          <span
            className="font-uiSans text-base md:text-lg leading-relaxed"
            style={{ color: PROSE_COLOR }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="mt-4 mb-2 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
      <table className="w-full font-uiSans text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--bg-lilac-section)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                borderBottom:
                  ri < rows.length - 1
                    ? "1px solid var(--color-border)"
                    : "none",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2.5"
                  style={{
                    color:
                      ci === 0 ? "var(--color-primary)" : PROSE_COLOR,
                    fontWeight: ci === 0 ? 500 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExtLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150"
      style={{ color: "var(--color-primary)" }}
    >
      {children}
    </a>
  );
}

export default function DataAZdrojePage() {
  return (
    <div style={{ background: "var(--bg-base)" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="pt-[var(--section-padding-y-mobile)] pb-12 md:pt-[var(--section-padding-y-desktop)] md:pb-16"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <p
            className="font-uiSans text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-secondary)" }}
          >
            Metodika
          </p>
          <h1
            className="font-displaySerif text-[clamp(30px,4.5vw,48px)] leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--color-primary)" }}
          >
            Odkud bereme data
          </h1>
          <Prose>
            Tato stránka vysvětluje každé číslo, se kterým kalkulačka pracuje. Pro každý parametr najdeš: co přesně měří, jakou hodnotu používáme a odkud pochází. Důležité rozlišení: některé hodnoty jsou ověřitelná tržní data platná dnes. Jiné jsou kalibrované odhady pro 30letý horizont. Víš-li, které je které, lépe pochopíš, kde výsledku věřit a kde si nastavit vlastní hodnoty.
          </Prose>
          <p
            className="font-uiSans text-sm mt-4 font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            Poslední aktualizace dat: 5. dubna 2026
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <section
        className="pb-[var(--section-padding-y-mobile)] md:pb-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-base)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>

          {/* Ověřená tržní data */}
          <div>
            <SectionHeading>Ověřená tržní data</SectionHeading>
            <Prose>
              Tyto hodnoty jsou ověřitelná tržní data platná k datu poslední aktualizace. Čteme je z konkrétních zdrojů, neodhadujeme je.
            </Prose>

            {/* Ceny nemovitostí */}
            <SubHeading>Ceny nemovitostí</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Vstupní kupní cena bytu pro danou dispozici a město, ze které kalkulačka vychází. Vypočítá se jako Kč/m² × průměrná plocha dané dispozice.
              </MetaRow>
            </div>
            <Prose>
              Zdroj cen za m²: vlastní dotaz na <ExtLink href="https://www.sreality.cz">Sreality.cz</ExtLink> API, duben 2026 (filtr: starší zástavba, cihlové a panelové domy). Nabídkové ceny bytů jsou vyšší než ceny, za které byty ve skutečnosti mění majitele. Pro každé město jsme vypočítali vlastní převodní koeficient: vzali jsme ověřené transakční ceny (<ExtLink href="https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta">ČBA Monitor</ExtLink> Q4 2025), upravili je o mezičasový posun (+5 %, odpovídá tržnímu růstu od Q4 2025 do dubna 2026) a vydělili nabídkovou cenou Sreality. Koeficienty dle města: 0,870 (Praha), 0,843 (Brno), 0,882 (Pardubice), 0,854 (ČB), 0,804 (Plzeň, Ostrava, HK: záložní medián), 0,780 (Liberec), 0,783 (Olomouc), 0,777 (Ústí), 0,798 (Jihlava), 0,804 (KV: záložní). Záložní koeficient 0,804 platí pro města, kde transakční data ČBA Monitoru nejsou reprezentativní nebo je Sreality vzorek příliš malý.
            </Prose>
            <Prose className="mt-3">
              Výjimka: Zlín používá ČBA Monitor Q4 2025, protože Sreality vzorek pro Zlín vykazoval anomální koeficienty (3+kk a 4+kk {`>`} 2+kk).
            </Prose>
            <Prose className="mt-3">
              Proč Sreality API, a ne přímo transakční databáze? V ČR jsou transakční ceny nemovitostí dostupné ze dvou zdrojů: katastr nemovitostí (Finanční správa) a ČBA Monitor, který vychází z bankovních odhadů při poskytnutí hypotéky. Katastr nemá veřejné strojově čitelné API s kompletním pokrytím všech 13 krajských měst. ČBA Monitor poskytuje spolehlivá data pro velká města, ale pro menší trhy zachycuje jen hypotečně financované transakce staré zástavby, a v některých z nich (Ostrava, Karlovy Vary) pokrývá zjevně pouze nejlevnější segment trhu. Sreality nabízí konzistentní pokrytí všech 13 měst stejnou metodikou. A klíčové: nájemné v kalkulačce vychází také ze Sreality. Kupní cena i nájemné tak popisují tentýž typ bytů (starší zástavbu, cihla a panel) ze stejného zdroje.
            </Prose>
            <DataTable
              headers={["Město", "Kč/m² (transakční cena, duben 2026)"]}
              rows={[
                ["Praha", "152 300"],
                ["Brno", "120 100"],
                ["Hradec Králové", "96 500"],
                ["Pardubice", "88 200"],
                ["České Budějovice", "85 200"],
                ["Olomouc", "83 200"],
                ["Plzeň", "82 300"],
                ["Zlín", "75 700"],
                ["Liberec", "77 900"],
                ["Jihlava", "71 500"],
                ["Ostrava", "74 300"],
                ["Karlovy Vary", "73 600"],
                ["Ústí nad Labem", "48 700"],
              ]}
            />
            <Prose className="mt-3">
              Průměrné plochy dispozic vychází z analýzy inzertní databáze <ExtLink href="https://www.sreality.cz">Sreality.cz</ExtLink> (duben 2026). Plochy se liší podle města. Níže jsou orientační národní mediány; kalkulačka používá per-city hodnoty.
            </Prose>
            <DataTable
              headers={["Dispozice", "Průměrná plocha"]}
              rows={[
                ["1+kk", "34 m²"],
                ["2+kk", "54 m²"],
                ["3+kk", "80 m²"],
                ["4+kk", "102 m²"],
              ]}
            />

            {/* Výše nájemného */}
            <SubHeading>Výše nájemného</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Průměrná výše měsíčního nájmu ve zvoleném městě, přepočtená na dispozici pomocí průměrné plochy.
              </MetaRow>
            </div>
            <Prose>
              Zdroj: vlastní dotaz na <ExtLink href="https://www.sreality.cz">Sreality.cz</ExtLink> API, duben 2026. Medián nabídkového nájemného pro starší zástavbu (cihlové a panelové domy). Novostavby a developerské projekty jsou záměrně vynechány.
            </Prose>
            <Prose className="mt-3">
              Proč Sreality.cz filtrované na starší zástavbu? Metodická konzistence s cenami nemovitostí: obě strany výpočtu (cena bytu i nájemné) vycházejí ze stejné populace bytů (starší zástavba). <ExtLink href="https://www2.deloitte.com/cz/cs/pages/real-estate/articles/rent-index.html">Deloitte Rent Index</ExtLink> zahrnuje všechny typy bytů včetně developerských projektů, což systematicky nadhodnocuje nájemné ve srovnání se starší zástavbou (+2–17 % dle města). Výnosové procento je smysluplné pouze tehdy, jsou-li obě hodnoty odvozeny ze stejného segmentu trhu.
            </Prose>
            <Prose className="mt-3">
              <ExtLink href="https://www2.deloitte.com/cz/cs/pages/real-estate/articles/rent-index.html">Deloitte Rent Index</ExtLink> Q4 2025 je použit jako křížová validace. Shoda je těsná pro Prahu (–0,4 %), Brno (+1,5 %), Olomouc (0 %). Výraznější odchylka u Liberce (Deloitte o 17 % níže) a Jihlavy (o 10 % níže): menší vzorky, větší nejistota.
            </Prose>
            <DataTable
              headers={["Město", "Kč/m²/měsíc (Sreality, duben 2026)"]}
              rows={[
                ["Praha", "457"],
                ["Brno", "398"],
                ["Hradec Králové", "324"],
                ["Pardubice", "303"],
                ["Plzeň", "300"],
                ["Olomouc", "293"],
                ["Zlín", "303"],
                ["České Budějovice", "297"],
                ["Liberec", "318"],
                ["Jihlava", "281"],
                ["Karlovy Vary", "257"],
                ["Ostrava", "261"],
                ["Ústí nad Labem", "214"],
              ]}
            />

            {/* Vlastní zdroje */}
            <SubHeading>Vlastní zdroje (akontace)</SubHeading>
            <div className="space-y-2">
              <MetaRow label="Co to je:">
                Podíl kupní ceny, který zaplatíš z vlastních prostředků. Zbytek kryje hypotéka. Jde o regulatorní minimum stanovené ČNB, ne o tržně odvozenou hodnotu.
              </MetaRow>
              <MetaRow label="Výchozí hodnota:">20 % kupní ceny.</MetaRow>
              <MetaRow label="Zdroj:">
                <ExtLink href="https://www.cnb.cz/cs/financni-stabilita/makroobezretnostni-politika/limity-uverovych-ukazatelu/">ČNB regulace</ExtLink> stanovuje maximální LTV 80 % pro investiční nemovitosti. Pro vlastní bydlení do 36 let lze za určitých podmínek jít níže, ale 20 % je konzervativní výchozí hodnota platná pro většinu kupujících. V kalkulačce si hodnotu změníš.
              </MetaRow>
            </div>
          </div>

          <Divider />

          {/* Dlouhodobé odhady */}
          <div>
            <SectionHeading>Dlouhodobé odhady</SectionHeading>
            <Prose>
              Tyto hodnoty nejsou tržní fakta platná dnes. Jsou to kalibrované odhady pro 30letý horizont. Každý z nich může být špatně. Proto jsou v kalkulačce nastavitelné a proto záleží, jestli si je změníš.
            </Prose>

            {/* Výnos fondu */}
            <SubHeading>Výnos globálního akciového fondu</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Předpokládaný průměrný roční výnos globálně diverzifikovaného akciového fondu po odečtení nákladů fondu.
              </MetaRow>
              <MetaRow label="Hodnota:">6,5 % p.a.</MetaRow>
              <MetaRow label="Zdroj:">
                Průměr pěti institucionálních výhledů pro rok 2026:{" "}
                <ExtLink href="https://corporate.vanguard.com/content/corporatesite/us/en/corp/vemo/vemo-return-forecasts.html">Vanguard VCMM</ExtLink>,{" "}
                <ExtLink href="https://www.bny.com/wealth/global/en/insights/2026-capital-market-assumptions.html">BNY Investments</ExtLink>,{" "}
                <ExtLink href="https://www.aqr.com/Insights/Research/Alternative-Thinking/2026-Capital-Market-Assumptions-for-Major-Asset-Classes">AQR</ExtLink>,{" "}
                <ExtLink href="https://www.ubs.com/global/en/wealthmanagement/insights/2025/global-investment-returns-yearbook.html">DMS (Global Investment Returns Yearbook/UBS)</ExtLink>,{" "}
                <ExtLink href="https://ntam.northerntrust.com/content/dam/northerntrust/investment-management/global/en/documents/thought-leadership/2026/cma/2026-capital-market-assumptions-report.pdf">Northern Trust</ExtLink>. Náklady fondu: přibližně 0,20 % p.a. pro nízkonákladový indexový fond.
              </MetaRow>
              <MetaRow label="Proč ne historický průměr (~7 %):">
                Historický nominální výnos globálních akcií (DMS Yearbook) se pohybuje kolem 7 % ročně. My používáme 6,5 % jako konzervativní kotvu. Zkušení investoři s diverzifikovaným portfoliem mohou na dlouhém horizontu dosáhnout výnosů blízkých historickému průměru.
              </MetaRow>
              <MetaRow label="Citlivost:">
                Výrazně ovlivňuje výsledek Scénáře B. Každý procentní bod navíc za 30 let výrazně mění konečnou hodnotu portfolia.
              </MetaRow>
            </div>

            {/* Úrokové sazby */}
            <SubHeading>Úroková sazba hypotéky po refixaci (roky 6–30)</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Předpokládaná sazba, na kterou se hypotéka přestaví po uplynutí první 5leté fixace. Platí pro zbývajících 25 let.
              </MetaRow>
              <MetaRow label="Hodnota:">4,5 % p.a.</MetaRow>
              <MetaRow label="Zdroj:">
                Odvozeno: reálná neutrální sazba ČNB + střednědobý inflační cíl + standardní bankovní marže. Data hypoték: <ExtLink href="https://www.hypoindex.cz/hypoindex-vyvoj/">Hypoindex.cz</ExtLink>.
              </MetaRow>
              <MetaRow label="Proč záleží víc než počáteční sazba (3,99 %):">
                Platí po dobu 25 z 30 let. Změna o 0,5 % v tomto parametru má větší vliv na celkové náklady Scénáře A než jakákoli změna počáteční sazby.
              </MetaRow>
            </div>

            {/* Růst nemovitostí */}
            <SubHeading>Růst hodnoty nemovitosti</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Předpokládané průměrné roční zdražování nemovitosti ve zvoleném městě za 30letý horizont.
              </MetaRow>
              <MetaRow label="Hodnoty:">3,0–4,5 % p.a. dle města (viz tabulka níže).</MetaRow>
            </div>
            <Prose>
              Výchozím bodem je historická řada{" "}
              <ExtLink href="https://ec.europa.eu/eurostat/databrowser/product/page/ei_hppi_q">
                Eurostat HPI (ei_hppi_q)
              </ExtLink>{" "}
              (zdrojem primárních dat je Hypostat, European Mortgage Federation). Klíčové CAGR z historické řady pro Českou republiku:
            </Prose>
            <DataTable
              headers={["Období", "CAGR", "Poznámka"]}
              rows={[
                ["2010–2015", "1,0 %", "Post-krizová stagnace"],
                ["2010–2019", "4,5 %", "Plný cyklus bez COVID anomálie"],
                ["2015–2019", "9,2 %", "Boom záporných reálných sazeb"],
                ["2010–Q3/2025", "6,3 %", "Zahrnuje COVID distorze"],
              ]}
            />
            <Prose className="mt-3">
              Jako referenční strukturální tempo používáme CAGR 2010–2019 (4,5 %). Zahrnuje celý hospodářský cyklus: stagnaci po finanční krizi i nízkoúrokový boom. COVID anomálie (2021–2022: +19,7 % a +16,9 %) je z výpočtu vyloučena jako jednorázová a neopakovatelná.
            </Prose>
            <Prose className="mt-3">
              Proč nepoužíváme vyšší číslo (6,3 % z delší řady): Boom 2015–2019 byl tažen zápornou reálnou sazbou ČNB. Tento tailwind je pryč. Navíc ČNB makroprudenčními limity (max LTV 80 %, DTI max 8,5×, DSTI max 45 %) systematicky omezuje leverage-driven cenový růst. A dostupnost bydlení: v Praze vzrostly ceny bytů 2,8× rychleji než příjmy (2015–2023), což vytváří přirozenou bariéru dalšího přehřívání.
            </Prose>
            <Prose className="mt-3">
              Výsledek potvrzuje rovnovážný model: inflace (2,0 %) + reálný mzdový příspěvek (~1,5 %) + supply prémie (–0,5 až +1,0 % dle města) = 3,0–4,5 % p.a.
            </Prose>
            <Prose className="mt-3">
              Per-city hodnoty jsou zkalibrované dolů od pražské kotvy na základě relativní síly místní poptávky, demografického vývoje a historické konvergence cen.
            </Prose>
            <p
              className="font-uiSans text-sm leading-relaxed mt-2"
              style={{ color: "var(--color-secondary)" }}
            >
              Citlivost: Toto je nejcitlivější parametr celého modelu. Každý procentní bod navíc za 30 let výrazně posiluje Scénář A. Výchozí hodnoty jsou průměry za celé město. Lokalita uvnitř města může výsledek výrazně změnit.
            </p>
            <DataTable
              headers={["Město", "Předpokládaný roční růst"]}
              rows={[
                ["Praha", "4,5 % p.a."],
                ["Brno", "4,5 % p.a."],
                ["Hradec Králové", "4,0 % p.a."],
                ["Pardubice", "4,0 % p.a."],
                ["České Budějovice", "3,5 % p.a."],
                ["Olomouc", "4,0 % p.a."],
                ["Plzeň", "4,0 % p.a."],
                ["Zlín", "3,5 % p.a."],
                ["Liberec", "3,5 % p.a."],
                ["Jihlava", "3,5 % p.a."],
                ["Ostrava", "3,5 % p.a."],
                ["Karlovy Vary", "3,0 % p.a."],
                ["Ústí nad Labem", "3,0 % p.a."],
              ]}
            />

            {/* Růst nájemného */}
            <SubHeading>Růst nájemného</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Předpokládané průměrné roční zdražování nájmů. Ovlivňuje, jak rychle se zmenšuje měsíční investiční výhoda Scénáře B.
              </MetaRow>
              <MetaRow label="Hodnoty:">
                2,5–3,5 % p.a. dle města (Praha a Brno 3,5 %; Plzeň, Olomouc, HK, Pardubice, ČB, Liberec, Zlín, Jihlava 3,0 %; Ostrava, Ústí, KV 2,5 %).
              </MetaRow>
            </div>
            <Prose>
              Metodika: Na 30letém horizontu existují dva různé ukazatele. New-to-market nájemné (nové smlouvy, zachycuje <ExtLink href="https://www2.deloitte.com/cz/cs/pages/real-estate/articles/rent-index.html">Deloitte Rent Index</ExtLink>, CAGR 2014–2025 = 7,2 % p.a.) a in-situ nájemné (průběžně platí všichni nájemníci, zachycuje{" "}
              <ExtLink href="https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_aind?geo=CZ&coicop=CP041&unit=INX_A_AVG">
                Eurostat HICP CP041
              </ExtLink>
              , CAGR 2015–2025 = 4,0 % p.a.). Efektivní 30Y průměr je vážená kombinace: 25 % new-to-market + 75 % in-situ (odhad průměrné doby nájemní smlouvy v ČR). Historický out-turn: 0,25 × 7,2 % + 0,75 × 4,0 % ≈ 4,8 %. Forward 30Y odhad je konzervativnější: boom 2022–2025 (tažen nízkými zásobami a post-COVID catch-up) není strukturálně udržitelný. Výsledné hodnoty 2,5–3,5 % dle dynamiky lokálního trhu jsou kotevní strukturální tempo. Silnější trhy (Praha, Brno) mají supply deficit, který udržuje tlak na nájmy výše.
            </Prose>

            {/* Inflace */}
            <SubHeading>Očekávaná inflace</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Předpokládaná průměrná roční inflace za 30letý horizont. Slouží pro přibližný přepočet nominálního výsledku do reálné hodnoty. Pro orientační hodnotu v dnešních korunách vyděl výsledek kalkulačky číslem 2,1.
              </MetaRow>
              <MetaRow label="Hodnota:">2,5 % p.a.</MetaRow>
              <MetaRow label="Zdroj:">
                Empiricky odvozený odhad z historické české inflace (<ExtLink href="https://www.inflationtool.com/rates/czech-republic/historical">ČSÚ via InflationTool</ExtLink>). Průměr EU-éry 2004–2021 = 2,3 % p.a. Zahrnuje výkyvy mimo ČNB cíl (2008: 6,3 %; 2020: 3,2 %; 2021: 3,8 %). ČNB cíl (2 %) záměrně nepoužíváme: historická průměrná inflace v ČR leží konzistentně nad ním. 2,5 % je konzervativní 30Y průměr zohledňující inflační cykly. Inflační cíl ČNB: <ExtLink href="https://www.cnb.cz/cs/menova-politika/inflacni-cil/">cnb.cz</ExtLink>.
              </MetaRow>
            </div>
          </div>

          <Divider />

          {/* Náklady vlastnictví */}
          <div>
            <SectionHeading>Náklady vlastnictví</SectionHeading>
            <Prose>
              Tyto náklady snižují ekonomiku Scénáře A. Fond oprav, pojištění, daň z nemovitosti a náklady na údržbu jsou roční. Vybavení bytu je jednorázový výdaj při pořízení.
            </Prose>

            <SubHeading>Fond oprav</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Povinný měsíční příspěvek do fondu oprav budovy, který platí každý vlastník bytu. Nelze se mu vyhnout, ukládá ho zákon (<ExtLink href="https://www.zakonyprolidi.cz/cs/2012-89#p1180">NOZ § 1180</ExtLink>) prostřednictvím SVJ (společenství vlastníků jednotek). Fond oprav hradí opravy a renovace společných částí budovy: střecha, výtah, fasáda, rozvody. Tento náklad nesouvisí s udržováním interiéru bytu, to je samostatná položka (viz Náklady na údržbu níže).
              </MetaRow>
              <MetaRow label="Výchozí hodnota:">23–30 Kč/m²/měsíc dle města. Konkrétní hodnoty dle lokality jsou v Google Sheets.</MetaRow>
              <MetaRow label="Zdroj:">
                <ExtLink href="https://www.zakonyprolidi.cz/cs/2012-89#p1180">NOZ § 1180</ExtLink>, tržní průzkum výše příspěvků SVJ: <ExtLink href="https://www.portalsvj.cz/anketa/vysledky.php">portalsvj.cz</ExtLink>.
              </MetaRow>
            </div>

            <SubHeading>Pojištění nemovitosti</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Pojištění konstrukce bytu: stěny, podlahy, rozvody v rámci bytu. Nevztahuje se na vybavení ani na obsah. Většina hypotečních bank ho vyžaduje jako podmínku úvěru.
              </MetaRow>
              <MetaRow label="Výchozí hodnota:">Praha 28 Kč/m²/rok, ostatní města 20 Kč/m²/rok.</MetaRow>
              <MetaRow label="Zdroj:">
                <ExtLink href="https://www.skrblik.cz/finance/pojisteni/majetku/nemovitost/">Skrblik.cz</ExtLink>,{" "}
                <ExtLink href="https://kalkulackapojisteni.com/pojisteni-majetku/jak-pojistit-byt/">kalkulackapojisteni.com</ExtLink> a{" "}
                <ExtLink href="https://www.koop.cz/pojisteni/pojisteni-majetku/pruvodce-majitele-nemovitosti/ceny-nemovitosti-v-roce-2025">Kooperativa</ExtLink> (tržní přehledy pojistného pro bytové jednotky, 2025–2026). Hodnoty validovány proti reprodukční hodnotě interiéru × tržní pojistná sazba ~0,10 % ročně.
              </MetaRow>
            </div>

            <SubHeading>Daň z nemovitosti</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Roční daň z vlastnictví bytu, vypočítaná zákonným vzorcem. Platí každý vlastník nemovitosti v ČR bez výjimky.
              </MetaRow>
              <MetaRow label="Výpočet:">
                Plocha × sazba × koef. 1,22 × základní koeficient × místní koeficient.{" "}
                <ExtLink href="https://www.zakonyprolidi.cz/cs/1992-338">Zákon č. 338/1992 Sb.</ExtLink> ve znění novely 2024.
              </MetaRow>
            </div>

            <SubHeading>Náklady na údržbu</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Odhadované roční náklady na údržbu interiéru bytu: výměny, opravy, pravidelné renovace. Nezaměňovat s fondem oprav, který hradí společné části budovy. Do údržby patří: rekonstrukce koupelny (jednou za 20–25 let), výměna kuchyňské linky (jednou za 15–20 let), výměna podlah, spotřebiče, malování.
              </MetaRow>
              <MetaRow label="Výchozí hodnota:">
                Fixní základ 14 000 Kč + 160 Kč/m²/rok, celé vynásobeno místním koeficientem. Typický byt 2+kk v Praze (koeficient 1,18) vychází přibližně na 26 000 Kč ročně, v ostatních městech 19 000–23 000 Kč.
              </MetaRow>
              <MetaRow label="Metodika:">
                Výpočet zdola nahoru, amortizující konkrétní výdaje přes jejich reálné životnosti. Detailní kalkulace v Google Sheets.
              </MetaRow>
            </div>

            <SubHeading>Vybavení bytu</SubHeading>
            <div className="space-y-2 mb-4">
              <MetaRow label="Co to je:">
                Jednorázový výdaj na vybavení bytu při pořízení. Kalkulačka bydlení a kalkulačka investice pracují s touto hodnotou odlišně.
              </MetaRow>
            </div>
            <Prose>
              <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Kalkulačka bydlení (diferenciál):</strong>{" "}
              Kupující (Scénář A) vybavuje byt na střední IKEA standard včetně všech spotřebičů. Nájemník (Scénář B) nakoupí jen economy IKEA nábytek a s 50% pravděpodobností pračku (lednička, sporák a digestoř jsou v nezařízeném českém pronájmu zpravidla součástí kuchyňské linky). Hodnota v tabulce je rozdíl: o kolik více zaplatí kupující oproti nájemníkovi v roce 0.
            </Prose>
            <Prose className="mt-3">
              <strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Kalkulačka investice (plné náklady):</strong>{" "}
              Celkové náklady pronajímatele na economy standard nutný pro pronájem (economy IKEA + základní spotřebiče).
            </Prose>
            <DataTable
              headers={["Dispozice", "Bydlení (diferenciál)", "Investice (plné náklady)"]}
              rows={[
                ["1+kk", "50 000 Kč", "48 000 Kč"],
                ["2+kk", "75 000 Kč", "75 000 Kč"],
                ["3+kk", "95 000 Kč", "88 000 Kč"],
                ["4+kk", "110 000 Kč", "105 000 Kč"],
              ]}
            />
            <Prose className="mt-3">
              Zdroj: <ExtLink href="https://www.ikea.com/cz/">IKEA.cz</ExtLink> ceník 2026, spotřebiče z <ExtLink href="https://www.heureka.cz">Heureka.cz</ExtLink>. Výpočet zdola nahoru pro každou dispozici: nábytek + spotřebiče + doprava a montáž + osvětlení, závěsy, doplňky. Detailní kalkulace v Google Sheets.
            </Prose>
          </div>

          <Divider />

          {/* Obsazenost */}
          <div>
            <SectionHeading>Obsazenost investičního bytu</SectionHeading>
            <Prose>
              Platí pouze pro kalkulačku Investice.
            </Prose>
            <div className="space-y-2 mt-4 mb-4">
              <MetaRow label="Co to je:">
                Podíl roku, po který je byt skutečně pronajat a generuje příjem. Hodnota nižší než 100 % odráží přirozenou mezeru mezi nájemníky (výběr nájemníka, předání bytu, drobné opravy) a občasné delší prázdné období.
              </MetaRow>
              <MetaRow label="Zdroj:">
                Hodnoty pro Prahu a Brno vychází z dat o vakanci institucionálního nájemního trhu (<ExtLink href="https://knightfrankprostory.cz/blog/institucionalni-najemni-bydleni-q4-2024-q1-2025">Knight Frank</ExtLink>, <ExtLink href="https://flatservice.cz/clanky/kolik-investicnich-bytu-v-praze-zustava-prazdnych/">BTR Consulting via flatservice.cz</ExtLink>), upravených dolů pro soukromého pronajímatele, který má pomalejší proces výběru nájemníků. Pro ostatní města jsou hodnoty odvozeny na základě relativní síly místní poptávky po nájemním bydlení.
              </MetaRow>
            </div>
            <DataTable
              headers={["Město", "Obsazenost"]}
              rows={[
                ["Praha", "93 %"],
                ["Brno", "92 %"],
                ["Hradec Králové", "90 %"],
                ["Pardubice", "90 %"],
                ["České Budějovice", "88 %"],
                ["Olomouc", "90 %"],
                ["Plzeň", "90 %"],
                ["Zlín", "88 %"],
                ["Liberec", "88 %"],
                ["Jihlava", "87 %"],
                ["Ostrava", "87 %"],
                ["Karlovy Vary", "83 %"],
                ["Ústí nad Labem", "83 %"],
              ]}
            />
          </div>

          <Divider />

          {/* Daňová pravidla */}
          <div>
            <SectionHeading>Daňová pravidla</SectionHeading>
            <Prose>
              Tato pravidla vstupují do výpočtu automaticky. Jsou pevně daná zákonem a není je třeba nastavovat. Poslední sloupec říká, které kalkulačky se pravidlo týká.
            </Prose>
            <DataTable
              headers={["Pravidlo", "Hodnota", "Zákonný základ", "Kalkulačka"]}
              rows={[
                ["Odpočet hypotečních úroků od základu daně", "Max. 150 000 Kč/rok", "§ 15 ZDP", "Bydlení"],
                ["Základní sazba daně z příjmů", "15 %", "§ 16 ZDP", "obě"],
                ["Vyšší sazba daně z příjmů", "23 % (nad cca 132 000 Kč hrubého měsíčně)", "§ 16 ZDP", "obě"],
                ["Osvobození zisku z cenných papírů od daně", "Po 3 letech držení", "§ 4 odst. 1 písm. w) ZDP", "obě"],
                ["Odpisy nemovitosti, rok 1", "1,4 % z odpisového základu", "§ 31 ZDP, odpisová skupina 5", "Investice"],
                ["Odpisy nemovitosti, roky 2–30", "3,4 % z odpisového základu", "§ 31 ZDP, odpisová skupina 5", "Investice"],
                ["Odpisový základ", "90 % kupní ceny (bez pozemku)", "§ 29 ZDP", "Investice"],
                ["Přenos daňové ztráty z nájmu", "Max. 5 let", "§ 34 ZDP", "Investice"],
              ]}
            />
          </div>

          <Divider />

          {/* Aktualizace */}
          <div>
            <SectionHeading>Jak a kdy data aktualizujeme</SectionHeading>
            <Prose>
              Ceny bytů, nájemné i úrokové sazby hypoték aktualizujeme čtvrtletně. Zdrojem sazeb je <ExtLink href="https://www.hypoindex.cz/hypoindex-vyvoj/">Hypoindex.cz</ExtLink>. Daňová pravidla kontrolujeme při každé legislativní změně.
            </Prose>
            <Prose className="mt-4">
              Datum poslední aktualizace je uvedeno v úvodu této stránky.
            </Prose>
            <Prose className="mt-4">
              Máš otázku k některému zdroji nebo chceš upozornit na novější data? Napiš na{" "}
              <a
                href="mailto:michal.humaj@gmail.com"
                className="font-medium underline decoration-[rgba(15,23,42,0.25)] underline-offset-2 hover:decoration-[rgba(15,23,42,1)] transition-colors duration-150"
                style={{ color: "var(--color-primary)" }}
              >
                michal.humaj@gmail.com
              </a>
              .
            </Prose>
          </div>

          <Divider />

          {/* Co kalkulačka nezahrnuje */}
          <div>
            <SectionHeading>Co kalkulačka nezahrnuje</SectionHeading>
            <Prose>
              Každý model zjednodušuje. Zde jsou věci, které kalkulačka záměrně nebo z praktických důvodů nezahrnuje.
            </Prose>
            <BulletList
              items={[
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Náklady na pořízení nemovitosti:</strong> Právní služby, odhad nemovitosti pro banku, zástavní právo a poplatek za vklad do katastru. Celkem typicky 30 000–60 000 Kč jednorázově. Pokud bys tyto náklady zahrnul, mírně by zhoršily výsledek Scénáře A.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Provize realitní kanceláři při prodeji:</strong> Typicky 3–5 % z prodejní ceny. Kalkulačka modeluje 30leté držení, ne prodej. Pokud bys byt po 30 letech prodával přes realitku, zhorší to výsledek Scénáře A.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Pojištění schopnosti splácet:</strong> Produkt, který banky k hypotéce nabízejí. Zahrnout ho nebo ne závisí na individuálním rozhodnutí. Kalkulačka ho nezahrnuje.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Správcovský poplatek:</strong> Pokud místo vlastní správy využiješ správcovskou firmu, počítej typicky s 8–12 % z měsíčního nájmu jako extra nákladem. Kalkulačka předpokládá vlastní správu.</>,
                <><strong className="font-semibold" style={{ color: "var(--color-primary)" }}>Mimořádné opravné události:</strong> Velká pojistná událost (zatopení od souseda, požár) není běžný provozní náklad. Kalkulačka ji nemodeluje jako pravděpodobnostní scénář.</>,
              ]}
            />
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]"
        style={{ background: "var(--bg-lilac-section)" }}
      >
        <div className={`mx-auto ${CONTENT_WIDTH} px-4 md:px-6`}>
          <p
            className="font-uiSans text-base leading-relaxed mb-6"
            style={{ color: PROSE_COLOR }}
          >
            Chceš si to spočítat?
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
