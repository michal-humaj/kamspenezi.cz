/**
 * Sdílené typy pro atributové soubory kalkulačky.
 *
 * Každý atribut kalkulačky má vlastní soubor v tomto adresáři.
 * Tento soubor definuje sdílené rozhraní pro všechny atributy.
 */

export type CitySlug =
  | "praha"
  | "brno"
  | "ostrava"
  | "plzen"
  | "ceske-budejovice"
  | "hradec-kralove"
  | "liberec"
  | "olomouc"
  | "pardubice"
  | "usti-nad-labem"
  | "karlovy-vary"
  | "jihlava"
  | "zlin";

export type ApartmentSize = "1+kk" | "2+kk" | "3+kk" | "4+kk";

/** Hodnota pro každé krajské město. TypeScript zajistí, že všechna města jsou vyplněna. */
export type PerCity<T> = Record<CitySlug, T>;

/** Hodnota pro každé krajské město a každou dispozici. TypeScript zajistí úplnost. */
export type PerCityPerSize<T> = Record<CitySlug, Record<ApartmentSize, T>>;

/**
 * Jeden zdroj dat použitý při výzkumu atributu.
 * Každý zdroj musí mít URL a datum přístupu, aby bylo možné data ověřit a obnovit.
 */
export interface Zdroj {
  /** Název zdroje (organizace, název reportu nebo webu) */
  nazev: string;
  /** Přímý odkaz na konkrétní stránku nebo soubor s daty */
  url: string;
  /** Datum přístupu ke zdroji ve formátu ISO (YYYY-MM-DD) */
  datumPristupeno: string;
  /** Co zdroj konkrétně uvádí — citace nebo parafráze relevantní informace */
  coUvadi: string;
}

/**
 * Dokumentace metodiky aproximace hodnoty atributu.
 * Vysvětluje, proč byla zvolena konkrétní metoda výpočtu a jaká jsou její omezení.
 */
export interface MetodaAproximace {
  /** Stručný popis zvolené metody výpočtu */
  zvolenaMetoda: string;
  /** Zdůvodnění, proč je tato metoda nejlepší volbou pro naše vstupy */
  procTatoMetoda: string;
  /** Popis typické přesnosti metody a za jakých podmínek */
  presnost: string;
  /** Situace, kdy metoda ztrácí přesnost */
  kdyNeniPresna: string[];
  /** Vzorec nebo algoritmus výpočtu (pokud je relevantní) */
  vzorec?: string;
}

/**
 * Kompletní dokumentace jednoho atributu kalkulačky.
 * Slouží dvěma účelům:
 *   1. Jako zdroj výchozích hodnot pro kalkulačku
 *   2. Jako obsah pro stránku metodiky a zdrojů pro uživatele
 */
export interface AttributeDoc<TValues = unknown> {
  /** Klíč atributu v kódu kalkulačky (camelCase) */
  kodNazev: string;
  /** Česky psaný název atributu pro zobrazení uživatelům */
  nazev: string;
  /** Jednotka hodnoty (např. "Kč / měsíc", "Kč / m²", "m²") */
  jednotka: string;
  /** Kalkulačky, ve kterých se tento atribut používá */
  kalkulator: ("bydleni" | "investice")[];
  /**
   * Přesná definice atributu — co přesně měří nebo představuje.
   * Musí být jednoznačná: žádné překryvy s jinými atributy.
   */
  definice: string;
  /** Co je zahrnuto v hodnotě atributu */
  coZahrnuje: string[];
  /** Co naopak zahrnuto není — kde jsou hranice atributu */
  coNezahrnuje: string[];
  /** Faktory, které hodnotu atributu v reálném životě ovlivňují */
  coOvlivnujeHodnotu: string[];
  /** Metodika aproximace hodnoty z dostupných vstupů */
  metodaAproximace: MetodaAproximace;
  /** Krátký text pro tooltip v kalkulačce (max. ~200 znaků) */
  tooltipText: string;
  /** Výzkumné podklady — zdroje a odvození konkrétních hodnot */
  vyzkum: {
    /** Datum provedení výzkumu ve formátu ISO (YYYY-MM-DD) */
    datumVyzkumu: string;
    /** Seznam zdrojů použitých při výzkumu */
    zdroje: Zdroj[];
    /**
     * Popis odvození konkrétních čísel z dostupných zdrojů.
     * Musí být dostatečně detailní, aby bylo možné výzkum reprodukovat.
     */
    odvozeniHodnoty: string;
  };
  /** Výchozí hodnoty pro kalkulačku */
  hodnoty: TValues;
}
