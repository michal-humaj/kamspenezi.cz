/**
 * Výchozí hodnoty kalkulačky
 *
 * Tento soubor importuje hodnoty z jednotlivých atributových souborů v src/data/attributes/.
 * Každý atributový soubor obsahuje vlastní výzkum, zdroje a metodiku v češtině.
 *
 * Chceš-li změnit hodnotu: uprav příslušný atributový soubor, ne tento soubor.
 *
 * zarizeniNemovitosti: full bydlení differential (furnishing from scratch vs. furnished rental).
 * zarizeniNemovitostiInvestice: economy landlord standard (lower — see zarizeni-nemovitosti.ts).
 */

import type { CalculatorDefaults } from "./calculator-defaults.types";

// Globální atributy
import { vynosInvesticeValue }             from "./attributes/vynos-investice";
import { urokovaSazbaHypotekyValue }       from "./attributes/urokova-sazba-hypoteky";
import { urokovaSazbaHypotekyFutureValue } from "./attributes/urokova-sazba-hypoteky-future";
import { ocekavanaInflaceValue }           from "./attributes/ocekavana-inflace";

// Per-city atributy
import { rustNajemnehoValues }           from "./attributes/rust-najemneho";
import { rustHodnotyNemovitostiValues }  from "./attributes/rust-hodnoty-nemovitosti";
import { obsazenostValues }              from "./attributes/obsazenost";

// Per-city-per-size atributy
import { squareMetersValues }            from "./attributes/square-meters";
import { kupniCenaValues }               from "./attributes/kupni-cena";
import { najemneValues }                 from "./attributes/najemne";
import { fondOpravValues }               from "./attributes/fond-oprav";
import { danZNemovitostiValues }         from "./attributes/dan-z-nemovitosti";
import { pojisteniNemovitostiValues }    from "./attributes/pojisteni-nemovitosti";
import { nakladyUdrzbyValues }           from "./attributes/naklady-udrzby";
import { zarizeniNemovitosti }           from "./attributes/zarizeni-nemovitosti";

// =============================================================================
// Sestavení výchozích hodnot z atributových souborů
// =============================================================================

export const calculatorDefaults: CalculatorDefaults = {
  lastUpdated: "2026-04-04",

  global: {
    vynosInvestice:                vynosInvesticeValue,
    urokovaSazbaHypoteky:          urokovaSazbaHypotekyValue,
    urokovaSazbaHypotekyFuture:    urokovaSazbaHypotekyFutureValue,
    ocekavanaInflace:              ocekavanaInflaceValue,
  },

  cities: {
    "praha": {
      displayName: "Praha",
      rustNajemneho:              rustNajemnehoValues["praha"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["praha"],
      obsazenost:                 obsazenostValues["praha"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["praha"]["1+kk"],
          kupniCena:              kupniCenaValues["praha"]["1+kk"],
          najemne:                najemneValues["praha"]["1+kk"],
          fondOprav:              fondOpravValues["praha"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["praha"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["praha"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["praha"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["praha"]["2+kk"],
          kupniCena:              kupniCenaValues["praha"]["2+kk"],
          najemne:                najemneValues["praha"]["2+kk"],
          fondOprav:              fondOpravValues["praha"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["praha"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["praha"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["praha"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["praha"]["3+kk"],
          kupniCena:              kupniCenaValues["praha"]["3+kk"],
          najemne:                najemneValues["praha"]["3+kk"],
          fondOprav:              fondOpravValues["praha"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["praha"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["praha"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["praha"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["praha"]["4+kk"],
          kupniCena:              kupniCenaValues["praha"]["4+kk"],
          najemne:                najemneValues["praha"]["4+kk"],
          fondOprav:              fondOpravValues["praha"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["praha"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["praha"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["praha"]["4+kk"],
        },
      },
    },

    "brno": {
      displayName: "Brno",
      rustNajemneho:              rustNajemnehoValues["brno"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["brno"],
      obsazenost:                 obsazenostValues["brno"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["brno"]["1+kk"],
          kupniCena:              kupniCenaValues["brno"]["1+kk"],
          najemne:                najemneValues["brno"]["1+kk"],
          fondOprav:              fondOpravValues["brno"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["brno"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["brno"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["brno"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["brno"]["2+kk"],
          kupniCena:              kupniCenaValues["brno"]["2+kk"],
          najemne:                najemneValues["brno"]["2+kk"],
          fondOprav:              fondOpravValues["brno"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["brno"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["brno"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["brno"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["brno"]["3+kk"],
          kupniCena:              kupniCenaValues["brno"]["3+kk"],
          najemne:                najemneValues["brno"]["3+kk"],
          fondOprav:              fondOpravValues["brno"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["brno"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["brno"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["brno"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["brno"]["4+kk"],
          kupniCena:              kupniCenaValues["brno"]["4+kk"],
          najemne:                najemneValues["brno"]["4+kk"],
          fondOprav:              fondOpravValues["brno"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["brno"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["brno"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["brno"]["4+kk"],
        },
      },
    },

    "ostrava": {
      displayName: "Ostrava",
      rustNajemneho:              rustNajemnehoValues["ostrava"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["ostrava"],
      obsazenost:                 obsazenostValues["ostrava"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["ostrava"]["1+kk"],
          kupniCena:              kupniCenaValues["ostrava"]["1+kk"],
          najemne:                najemneValues["ostrava"]["1+kk"],
          fondOprav:              fondOpravValues["ostrava"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["ostrava"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ostrava"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ostrava"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["ostrava"]["2+kk"],
          kupniCena:              kupniCenaValues["ostrava"]["2+kk"],
          najemne:                najemneValues["ostrava"]["2+kk"],
          fondOprav:              fondOpravValues["ostrava"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["ostrava"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ostrava"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ostrava"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["ostrava"]["3+kk"],
          kupniCena:              kupniCenaValues["ostrava"]["3+kk"],
          najemne:                najemneValues["ostrava"]["3+kk"],
          fondOprav:              fondOpravValues["ostrava"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["ostrava"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ostrava"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ostrava"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["ostrava"]["4+kk"],
          kupniCena:              kupniCenaValues["ostrava"]["4+kk"],
          najemne:                najemneValues["ostrava"]["4+kk"],
          fondOprav:              fondOpravValues["ostrava"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["ostrava"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ostrava"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ostrava"]["4+kk"],
        },
      },
    },

    "plzen": {
      displayName: "Plzeň",
      rustNajemneho:              rustNajemnehoValues["plzen"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["plzen"],
      obsazenost:                 obsazenostValues["plzen"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["plzen"]["1+kk"],
          kupniCena:              kupniCenaValues["plzen"]["1+kk"],
          najemne:                najemneValues["plzen"]["1+kk"],
          fondOprav:              fondOpravValues["plzen"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["plzen"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["plzen"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["plzen"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["plzen"]["2+kk"],
          kupniCena:              kupniCenaValues["plzen"]["2+kk"],
          najemne:                najemneValues["plzen"]["2+kk"],
          fondOprav:              fondOpravValues["plzen"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["plzen"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["plzen"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["plzen"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["plzen"]["3+kk"],
          kupniCena:              kupniCenaValues["plzen"]["3+kk"],
          najemne:                najemneValues["plzen"]["3+kk"],
          fondOprav:              fondOpravValues["plzen"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["plzen"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["plzen"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["plzen"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["plzen"]["4+kk"],
          kupniCena:              kupniCenaValues["plzen"]["4+kk"],
          najemne:                najemneValues["plzen"]["4+kk"],
          fondOprav:              fondOpravValues["plzen"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["plzen"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["plzen"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["plzen"]["4+kk"],
        },
      },
    },

    "ceske-budejovice": {
      displayName: "České Budějovice",
      rustNajemneho:              rustNajemnehoValues["ceske-budejovice"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["ceske-budejovice"],
      obsazenost:                 obsazenostValues["ceske-budejovice"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["ceske-budejovice"]["1+kk"],
          kupniCena:              kupniCenaValues["ceske-budejovice"]["1+kk"],
          najemne:                najemneValues["ceske-budejovice"]["1+kk"],
          fondOprav:              fondOpravValues["ceske-budejovice"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["ceske-budejovice"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ceske-budejovice"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ceske-budejovice"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["ceske-budejovice"]["2+kk"],
          kupniCena:              kupniCenaValues["ceske-budejovice"]["2+kk"],
          najemne:                najemneValues["ceske-budejovice"]["2+kk"],
          fondOprav:              fondOpravValues["ceske-budejovice"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["ceske-budejovice"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ceske-budejovice"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ceske-budejovice"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["ceske-budejovice"]["3+kk"],
          kupniCena:              kupniCenaValues["ceske-budejovice"]["3+kk"],
          najemne:                najemneValues["ceske-budejovice"]["3+kk"],
          fondOprav:              fondOpravValues["ceske-budejovice"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["ceske-budejovice"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ceske-budejovice"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ceske-budejovice"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["ceske-budejovice"]["4+kk"],
          kupniCena:              kupniCenaValues["ceske-budejovice"]["4+kk"],
          najemne:                najemneValues["ceske-budejovice"]["4+kk"],
          fondOprav:              fondOpravValues["ceske-budejovice"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["ceske-budejovice"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["ceske-budejovice"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["ceske-budejovice"]["4+kk"],
        },
      },
    },

    "hradec-kralove": {
      displayName: "Hradec Králové",
      rustNajemneho:              rustNajemnehoValues["hradec-kralove"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["hradec-kralove"],
      obsazenost:                 obsazenostValues["hradec-kralove"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["hradec-kralove"]["1+kk"],
          kupniCena:              kupniCenaValues["hradec-kralove"]["1+kk"],
          najemne:                najemneValues["hradec-kralove"]["1+kk"],
          fondOprav:              fondOpravValues["hradec-kralove"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["hradec-kralove"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["hradec-kralove"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["hradec-kralove"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["hradec-kralove"]["2+kk"],
          kupniCena:              kupniCenaValues["hradec-kralove"]["2+kk"],
          najemne:                najemneValues["hradec-kralove"]["2+kk"],
          fondOprav:              fondOpravValues["hradec-kralove"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["hradec-kralove"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["hradec-kralove"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["hradec-kralove"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["hradec-kralove"]["3+kk"],
          kupniCena:              kupniCenaValues["hradec-kralove"]["3+kk"],
          najemne:                najemneValues["hradec-kralove"]["3+kk"],
          fondOprav:              fondOpravValues["hradec-kralove"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["hradec-kralove"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["hradec-kralove"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["hradec-kralove"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["hradec-kralove"]["4+kk"],
          kupniCena:              kupniCenaValues["hradec-kralove"]["4+kk"],
          najemne:                najemneValues["hradec-kralove"]["4+kk"],
          fondOprav:              fondOpravValues["hradec-kralove"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["hradec-kralove"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["hradec-kralove"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["hradec-kralove"]["4+kk"],
        },
      },
    },

    "liberec": {
      displayName: "Liberec",
      rustNajemneho:              rustNajemnehoValues["liberec"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["liberec"],
      obsazenost:                 obsazenostValues["liberec"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["liberec"]["1+kk"],
          kupniCena:              kupniCenaValues["liberec"]["1+kk"],
          najemne:                najemneValues["liberec"]["1+kk"],
          fondOprav:              fondOpravValues["liberec"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["liberec"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["liberec"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["liberec"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["liberec"]["2+kk"],
          kupniCena:              kupniCenaValues["liberec"]["2+kk"],
          najemne:                najemneValues["liberec"]["2+kk"],
          fondOprav:              fondOpravValues["liberec"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["liberec"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["liberec"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["liberec"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["liberec"]["3+kk"],
          kupniCena:              kupniCenaValues["liberec"]["3+kk"],
          najemne:                najemneValues["liberec"]["3+kk"],
          fondOprav:              fondOpravValues["liberec"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["liberec"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["liberec"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["liberec"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["liberec"]["4+kk"],
          kupniCena:              kupniCenaValues["liberec"]["4+kk"],
          najemne:                najemneValues["liberec"]["4+kk"],
          fondOprav:              fondOpravValues["liberec"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["liberec"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["liberec"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["liberec"]["4+kk"],
        },
      },
    },

    "olomouc": {
      displayName: "Olomouc",
      rustNajemneho:              rustNajemnehoValues["olomouc"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["olomouc"],
      obsazenost:                 obsazenostValues["olomouc"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["olomouc"]["1+kk"],
          kupniCena:              kupniCenaValues["olomouc"]["1+kk"],
          najemne:                najemneValues["olomouc"]["1+kk"],
          fondOprav:              fondOpravValues["olomouc"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["olomouc"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["olomouc"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["olomouc"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["olomouc"]["2+kk"],
          kupniCena:              kupniCenaValues["olomouc"]["2+kk"],
          najemne:                najemneValues["olomouc"]["2+kk"],
          fondOprav:              fondOpravValues["olomouc"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["olomouc"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["olomouc"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["olomouc"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["olomouc"]["3+kk"],
          kupniCena:              kupniCenaValues["olomouc"]["3+kk"],
          najemne:                najemneValues["olomouc"]["3+kk"],
          fondOprav:              fondOpravValues["olomouc"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["olomouc"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["olomouc"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["olomouc"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["olomouc"]["4+kk"],
          kupniCena:              kupniCenaValues["olomouc"]["4+kk"],
          najemne:                najemneValues["olomouc"]["4+kk"],
          fondOprav:              fondOpravValues["olomouc"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["olomouc"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["olomouc"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["olomouc"]["4+kk"],
        },
      },
    },

    "pardubice": {
      displayName: "Pardubice",
      rustNajemneho:              rustNajemnehoValues["pardubice"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["pardubice"],
      obsazenost:                 obsazenostValues["pardubice"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["pardubice"]["1+kk"],
          kupniCena:              kupniCenaValues["pardubice"]["1+kk"],
          najemne:                najemneValues["pardubice"]["1+kk"],
          fondOprav:              fondOpravValues["pardubice"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["pardubice"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["pardubice"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["pardubice"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["pardubice"]["2+kk"],
          kupniCena:              kupniCenaValues["pardubice"]["2+kk"],
          najemne:                najemneValues["pardubice"]["2+kk"],
          fondOprav:              fondOpravValues["pardubice"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["pardubice"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["pardubice"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["pardubice"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["pardubice"]["3+kk"],
          kupniCena:              kupniCenaValues["pardubice"]["3+kk"],
          najemne:                najemneValues["pardubice"]["3+kk"],
          fondOprav:              fondOpravValues["pardubice"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["pardubice"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["pardubice"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["pardubice"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["pardubice"]["4+kk"],
          kupniCena:              kupniCenaValues["pardubice"]["4+kk"],
          najemne:                najemneValues["pardubice"]["4+kk"],
          fondOprav:              fondOpravValues["pardubice"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["pardubice"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["pardubice"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["pardubice"]["4+kk"],
        },
      },
    },

    "usti-nad-labem": {
      displayName: "Ústí nad Labem",
      rustNajemneho:              rustNajemnehoValues["usti-nad-labem"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["usti-nad-labem"],
      obsazenost:                 obsazenostValues["usti-nad-labem"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["usti-nad-labem"]["1+kk"],
          kupniCena:              kupniCenaValues["usti-nad-labem"]["1+kk"],
          najemne:                najemneValues["usti-nad-labem"]["1+kk"],
          fondOprav:              fondOpravValues["usti-nad-labem"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["usti-nad-labem"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["usti-nad-labem"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["usti-nad-labem"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["usti-nad-labem"]["2+kk"],
          kupniCena:              kupniCenaValues["usti-nad-labem"]["2+kk"],
          najemne:                najemneValues["usti-nad-labem"]["2+kk"],
          fondOprav:              fondOpravValues["usti-nad-labem"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["usti-nad-labem"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["usti-nad-labem"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["usti-nad-labem"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["usti-nad-labem"]["3+kk"],
          kupniCena:              kupniCenaValues["usti-nad-labem"]["3+kk"],
          najemne:                najemneValues["usti-nad-labem"]["3+kk"],
          fondOprav:              fondOpravValues["usti-nad-labem"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["usti-nad-labem"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["usti-nad-labem"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["usti-nad-labem"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["usti-nad-labem"]["4+kk"],
          kupniCena:              kupniCenaValues["usti-nad-labem"]["4+kk"],
          najemne:                najemneValues["usti-nad-labem"]["4+kk"],
          fondOprav:              fondOpravValues["usti-nad-labem"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["usti-nad-labem"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["usti-nad-labem"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["usti-nad-labem"]["4+kk"],
        },
      },
    },

    "karlovy-vary": {
      displayName: "Karlovy Vary",
      rustNajemneho:              rustNajemnehoValues["karlovy-vary"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["karlovy-vary"],
      obsazenost:                 obsazenostValues["karlovy-vary"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["karlovy-vary"]["1+kk"],
          kupniCena:              kupniCenaValues["karlovy-vary"]["1+kk"],
          najemne:                najemneValues["karlovy-vary"]["1+kk"],
          fondOprav:              fondOpravValues["karlovy-vary"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["karlovy-vary"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["karlovy-vary"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["karlovy-vary"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["karlovy-vary"]["2+kk"],
          kupniCena:              kupniCenaValues["karlovy-vary"]["2+kk"],
          najemne:                najemneValues["karlovy-vary"]["2+kk"],
          fondOprav:              fondOpravValues["karlovy-vary"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["karlovy-vary"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["karlovy-vary"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["karlovy-vary"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["karlovy-vary"]["3+kk"],
          kupniCena:              kupniCenaValues["karlovy-vary"]["3+kk"],
          najemne:                najemneValues["karlovy-vary"]["3+kk"],
          fondOprav:              fondOpravValues["karlovy-vary"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["karlovy-vary"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["karlovy-vary"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["karlovy-vary"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["karlovy-vary"]["4+kk"],
          kupniCena:              kupniCenaValues["karlovy-vary"]["4+kk"],
          najemne:                najemneValues["karlovy-vary"]["4+kk"],
          fondOprav:              fondOpravValues["karlovy-vary"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["karlovy-vary"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["karlovy-vary"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["karlovy-vary"]["4+kk"],
        },
      },
    },

    "jihlava": {
      displayName: "Jihlava",
      rustNajemneho:              rustNajemnehoValues["jihlava"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["jihlava"],
      obsazenost:                 obsazenostValues["jihlava"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["jihlava"]["1+kk"],
          kupniCena:              kupniCenaValues["jihlava"]["1+kk"],
          najemne:                najemneValues["jihlava"]["1+kk"],
          fondOprav:              fondOpravValues["jihlava"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["jihlava"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["jihlava"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["jihlava"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["jihlava"]["2+kk"],
          kupniCena:              kupniCenaValues["jihlava"]["2+kk"],
          najemne:                najemneValues["jihlava"]["2+kk"],
          fondOprav:              fondOpravValues["jihlava"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["jihlava"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["jihlava"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["jihlava"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["jihlava"]["3+kk"],
          kupniCena:              kupniCenaValues["jihlava"]["3+kk"],
          najemne:                najemneValues["jihlava"]["3+kk"],
          fondOprav:              fondOpravValues["jihlava"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["jihlava"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["jihlava"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["jihlava"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["jihlava"]["4+kk"],
          kupniCena:              kupniCenaValues["jihlava"]["4+kk"],
          najemne:                najemneValues["jihlava"]["4+kk"],
          fondOprav:              fondOpravValues["jihlava"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["jihlava"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["jihlava"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["jihlava"]["4+kk"],
        },
      },
    },

    "zlin": {
      displayName: "Zlín",
      rustNajemneho:              rustNajemnehoValues["zlin"],
      rustHodnotyNemovitosti:     rustHodnotyNemovitostiValues["zlin"],
      obsazenost:                 obsazenostValues["zlin"],
      apartments: {
        "1+kk": {
          squareMeters:           squareMetersValues["zlin"]["1+kk"],
          kupniCena:              kupniCenaValues["zlin"]["1+kk"],
          najemne:                najemneValues["zlin"]["1+kk"],
          fondOprav:              fondOpravValues["zlin"]["1+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["1+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["1+kk"],
          danZNemovitosti:        danZNemovitostiValues["zlin"]["1+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["zlin"]["1+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["zlin"]["1+kk"],
        },
        "2+kk": {
          squareMeters:           squareMetersValues["zlin"]["2+kk"],
          kupniCena:              kupniCenaValues["zlin"]["2+kk"],
          najemne:                najemneValues["zlin"]["2+kk"],
          fondOprav:              fondOpravValues["zlin"]["2+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["2+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["2+kk"],
          danZNemovitosti:        danZNemovitostiValues["zlin"]["2+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["zlin"]["2+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["zlin"]["2+kk"],
        },
        "3+kk": {
          squareMeters:           squareMetersValues["zlin"]["3+kk"],
          kupniCena:              kupniCenaValues["zlin"]["3+kk"],
          najemne:                najemneValues["zlin"]["3+kk"],
          fondOprav:              fondOpravValues["zlin"]["3+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["3+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["3+kk"],
          danZNemovitosti:        danZNemovitostiValues["zlin"]["3+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["zlin"]["3+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["zlin"]["3+kk"],
        },
        "4+kk": {
          squareMeters:           squareMetersValues["zlin"]["4+kk"],
          kupniCena:              kupniCenaValues["zlin"]["4+kk"],
          najemne:                najemneValues["zlin"]["4+kk"],
          fondOprav:              fondOpravValues["zlin"]["4+kk"],
          zarizeniNemovitosti:          zarizeniNemovitosti.hodnoty.bydleni["4+kk"],
          zarizeniNemovitostiInvestice: zarizeniNemovitosti.hodnoty.investice["4+kk"],
          danZNemovitosti:        danZNemovitostiValues["zlin"]["4+kk"],
          pojisteniNemovitosti:   pojisteniNemovitostiValues["zlin"]["4+kk"],
          nakladyUdrzba:          nakladyUdrzbyValues["zlin"]["4+kk"],
        },
      },
    },
  },
};

// =============================================================================
// Helper funkce
// =============================================================================

export function getCitySlug(displayName: string): string | undefined {
  return Object.entries(calculatorDefaults.cities).find(
    ([, city]) => city.displayName === displayName
  )?.[0];
}

export function getCityDisplayName(slug: string): string | undefined {
  return calculatorDefaults.cities[slug]?.displayName;
}

export default calculatorDefaults;
