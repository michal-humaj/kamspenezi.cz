/**
 * Structured source data for /metodika-a-zdroje page
 * Extracted from calculator-defaults.meta.ts for display in tables
 */

export type SourceCategory = 
  | "nemovitost" 
  | "hypoteka" 
  | "najem" 
  | "investice" 
  | "dane-poplatky";

export interface SourceEntry {
  id: string;
  category: SourceCategory;
  name: string;
  description: string;
  formula?: string;
  sources: {
    name: string;
    url?: string;
    date: string;
  }[];
  notes?: string;
}

export const SOURCES_DATA: SourceEntry[] = [
  // =========================================================================
  // Nemovitost
  // =========================================================================
  {
    id: "kupniCena",
    category: "nemovitost",
    name: "Kupní cena nemovitosti",
    description: "Transakční cena bytu podle města a dispozice. Vychází z realizovaných prodejů (ne nabídkových cen).",
    formula: "kupniCena = CBA_baseline × sizeMultiplier × squareMeters",
    sources: [
      { 
        name: "CBA Monitor Q3 2025", 
        url: "https://www.cbamonitor.cz/statistika/ceny-starsich-bytu-krajska-mesta",
        date: "2025-12" 
      },
      { 
        name: "Sreality.cz API (size multipliers)", 
        url: "https://www.sreality.cz",
        date: "2025-01" 
      },
    ],
    notes: "Menší byty mají vyšší cenu za m² (premium 15% pro 1+kk, 7% pro 2+kk).",
  },
  {
    id: "squareMeters",
    category: "nemovitost",
    name: "Výměra bytu (m²)",
    description: "Mediánová výměra bytu podle města a dispozice z aktivních inzerátů.",
    sources: [
      { 
        name: "Sreality.cz API", 
        url: "https://www.sreality.cz",
        date: "2025-01" 
      },
    ],
    notes: "Interiér bytu bez balkonu, sklepa, parkování.",
  },
  {
    id: "rustHodnotyNemovitosti",
    category: "nemovitost",
    name: "Růst hodnoty nemovitosti",
    description: "Očekávaný roční růst ceny nemovitosti. Liší se podle města.",
    sources: [
      { 
        name: "ČNB Zpráva o měnové politice", 
        url: "https://www.cnb.cz/cs/menova-politika/",
        date: "2025-12" 
      },
      { 
        name: "CBA Monitor historická data", 
        url: "https://www.cbamonitor.cz",
        date: "2025-12" 
      },
    ],
    notes: "Placeholder hodnoty. Praha 6%, Brno 5.5%, menší města 3.5-5%.",
  },
  {
    id: "zarizeniNemovitosti",
    category: "nemovitost",
    name: "Zařízení nemovitosti",
    description: "Jednorázové náklady na nábytek a vybavení nového bytu.",
    formula: "Fixní částka podle dispozice: 1+kk=90k, 2+kk=120k, 3+kk=170k, 4+kk=200k Kč",
    sources: [
      { 
        name: "IKEA Czech Republic", 
        url: "https://www.ikea.com/cz/cs/",
        date: "2025-12" 
      },
    ],
    notes: "Standard tier vybavení (ne nejlevnější, ne premium). Národní ceny – stejné pro všechna města.",
  },

  // =========================================================================
  // Hypotéka
  // =========================================================================
  {
    id: "urokovaSazbaHypoteky",
    category: "hypoteka",
    name: "Úroková sazba hypotéky",
    description: "Aktuální průměrná sazba nových hypoték v ČR.",
    sources: [
      { 
        name: "Swiss Life Hypoindex", 
        url: "https://www.hypoindex.cz/",
        date: "2025-12" 
      },
    ],
    notes: "Prosinec 2025: 4.91%, zaokrouhleno na 4.9%.",
  },
  {
    id: "urokovaSazbaHypotekyFuture",
    category: "hypoteka",
    name: "Budoucí úroková sazba",
    description: "Očekávaná sazba po skončení fixace (cca 5 let).",
    formula: "Equilibrium PRIBOR (~3.5%) + spread (~1.5%) ≈ 4.5%",
    sources: [
      { 
        name: "ČNB Prognóza Podzim 2025", 
        url: "https://www.cnb.cz/cs/menova-politika/prognoza/",
        date: "2025-11" 
      },
    ],
    notes: "Konzervativní odhad předpokládající stabilní makro podmínky.",
  },

  // =========================================================================
  // Nájem
  // =========================================================================
  {
    id: "najemne",
    category: "najem",
    name: "Měsíční nájemné",
    description: "Tržní nájemné podle města a dispozice.",
    formula: "najemne = GPG_rentPerM2 × rentMultiplier × squareMeters",
    sources: [
      { 
        name: "Global Property Guide (ČSÚ-referenced)", 
        url: "https://www.globalpropertyguide.com/Europe/Czech-Republic/Price-History",
        date: "2025-03" 
      },
      { 
        name: "Sreality.cz API (rent multipliers)", 
        url: "https://www.sreality.cz",
        date: "2025-01" 
      },
    ],
    notes: "Menší byty mají vyšší nájem za m² (premium 15% pro 1+kk).",
  },
  {
    id: "rustNajemneho",
    category: "najem",
    name: "Růst nájemného",
    description: "Očekávaný roční růst nájemného. Liší se podle města.",
    sources: [
      { 
        name: "ČNB Zpráva o měnové politice", 
        url: "https://www.cnb.cz/cs/menova-politika/",
        date: "2025-12" 
      },
    ],
    notes: "Placeholder hodnoty. Praha 4%, Brno 3.5%, menší města 2.5-3.5%.",
  },

  // =========================================================================
  // Investice
  // =========================================================================
  {
    id: "vynosInvestice",
    category: "investice",
    name: "Očekávaný výnos investic",
    description: "Dlouhodobý nominální výnos globálně diverzifikovaného akciového portfolia.",
    formula: "7% ročně (nominálně, před inflací)",
    sources: [
      { 
        name: "Goldman Sachs Global Outlook 2024", 
        url: "https://www.goldmansachs.com/insights/",
        date: "2024-12" 
      },
      { 
        name: "Vanguard Capital Market Assumptions", 
        url: "https://investor.vanguard.com/",
        date: "2024-12" 
      },
    ],
    notes: "Globální akcie (MSCI World style). NE jen US akcie (S&P 500 má nižší očekávaný výnos kvůli valuacím).",
  },
  {
    id: "ocekavanaInflace",
    category: "investice",
    name: "Očekávaná inflace",
    description: "Dlouhodobá očekávaná inflace v ČR.",
    formula: "2.5% ročně",
    sources: [
      { 
        name: "ČNB Prognóza Podzim 2025", 
        url: "https://www.cnb.cz/cs/menova-politika/prognoza/",
        date: "2025-11" 
      },
    ],
    notes: "ČNB cíluje 2%, prognóza ukazuje 2.2-2.5%. Použito 2.5% pro konzervativní odhad.",
  },

  // =========================================================================
  // Daně a poplatky
  // =========================================================================
  {
    id: "danZNemovitosti",
    category: "dane-poplatky",
    name: "Daň z nemovitosti",
    description: "Roční daň z nemovitosti podle zákona 338/1992 Sb.",
    formula: "squareMeters × 1.22 × 3.50 × sizeCoef × localCoef",
    sources: [
      { 
        name: "Zákon 338/1992 Sb.", 
        url: "https://www.zakonyprolidi.cz/cs/1992-338",
        date: "2025-12" 
      },
      { 
        name: "MFČR Koeficienty", 
        url: "https://adisspr.mfcr.cz/pmd/vyhledani-koeficientu",
        date: "2025-12" 
      },
    ],
    notes: "Místní koeficienty: Praha 1.5, Liberec/Olomouc/Pardubice/KV/ÚL/Zlín 2.0, HK 1.3, Jihlava 1.8, ostatní 1.0.",
  },
  {
    id: "fondOprav",
    category: "dane-poplatky",
    name: "Fond oprav (SVJ)",
    description: "Měsíční příspěvek na správu domu a dlouhodobou zálohu.",
    formula: "22 Kč/m² × squareMeters, zaokrouhleno na 50 Kč",
    sources: [
      { 
        name: "SVJ PŘEDSEDA benchmark", 
        url: "https://svjpredseda.cz/kolik-se-ma-platit-fondu-oprav/",
        date: "2025-12" 
      },
      { 
        name: "RE/MAX Brno benchmark", 
        url: "https://www.realitni-maklerka.cz/realitni-slovnik/fond-oprav/",
        date: "2025-12" 
      },
    ],
    notes: "Nezahrnuje služby (voda, teplo, odpad). Novostavby 10-20 Kč/m², starší domy 30-45 Kč/m².",
  },
  {
    id: "pojisteniNemovitosti",
    category: "dane-poplatky",
    name: "Pojištění domácnosti",
    description: "Roční pojištění domácnosti + odpovědnosti (platí vlastník).",
    formula: "20 Kč/m²/rok × squareMeters",
    sources: [
      { 
        name: "Srovnávač.cz kalkulačka", 
        url: "https://www.srovnavac.cz/pojisteni-domacnosti/kalkulacka-a-srovnani",
        date: "2025-12" 
      },
    ],
    notes: "Standard tier coverage. Nezahrnuje pojištění budovy (to je v SVJ).",
  },
  {
    id: "nakladyUdrzba",
    category: "dane-poplatky",
    name: "Náklady na údržbu",
    description: "Roční náklady na interiérovou údržbu (malování, podlahy, koupelna, kuchyň).",
    formula: "(baseFixed + 73 Kč/m²) × regionalCoef",
    sources: [
      { 
        name: "CeníkyŘemesel.cz", 
        url: "https://www.cenikyremesel.cz/ceniky",
        date: "2025-12" 
      },
      { 
        name: "ČSÚ Mzdy v krajích Q3 2025", 
        url: "https://www.kurzy.cz/mzda/prumerne-mzdy-regiony-podrobne/",
        date: "2025-12" 
      },
    ],
    notes: "Nezahrnuje spotřebiče (ty platí i nájemník). Praha +16% kvůli vyšším mzdám řemeslníků. Nový byt: snížit na 30-35%.",
  },
];

/**
 * Get sources by category
 */
export function getSourcesByCategory(category: SourceCategory): SourceEntry[] {
  return SOURCES_DATA.filter(s => s.category === category);
}

/**
 * Category display names
 */
export const CATEGORY_NAMES: Record<SourceCategory, string> = {
  "nemovitost": "Nemovitost",
  "hypoteka": "Hypotéka",
  "najem": "Nájem",
  "investice": "Investice",
  "dane-poplatky": "Daně a poplatky",
};

/**
 * Praha 2+kk example values for methodology page
 */
export const PRAHA_2KK_EXAMPLE = {
  city: "Praha",
  layout: "2+kk",
  values: {
    kupniCena: { value: "8 100 000 Kč", calculation: "140 900 Kč/m² × 1.07 × 54 m²" },
    najemne: { value: "25 500 Kč/měsíc", calculation: "438 Kč/m² × 1.07 × 54 m²" },
    squareMeters: { value: "54 m²", calculation: "Medián z 481 inzerátů" },
    fondOprav: { value: "1 200 Kč/měsíc", calculation: "22 Kč/m² × 54 m²" },
    danZNemovitosti: { value: "1 600 Kč/rok", calculation: "54 × 1.22 × 3.50 × 4.5 × 1.5" },
    pojisteniNemovitosti: { value: "1 100 Kč/rok", calculation: "20 Kč/m² × 54 m²" },
    nakladyUdrzba: { value: "20 000 Kč/rok", calculation: "(13 000 + 73 × 54) × 1.16" },
    zarizeniNemovitosti: { value: "120 000 Kč", calculation: "IKEA basket pro 2+kk" },
  },
  global: {
    urokovaSazbaHypoteky: { value: "4.9%", source: "Hypoindex 12/2025" },
    urokovaSazbaHypotekyFuture: { value: "4.5%", source: "ČNB prognóza" },
    vynosInvestice: { value: "7.0%", source: "GS/Vanguard" },
    ocekavanaInflace: { value: "2.5%", source: "ČNB prognóza" },
  },
};

