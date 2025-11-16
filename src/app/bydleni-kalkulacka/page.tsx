"use client";

import { useState } from "react";
import { CitySelector } from "@/components/calculator/city-selector";
import { ApartmentSizeCards } from "@/components/calculator/apartment-size-cards";
import { BasicInputs } from "@/components/calculator/basic-inputs";
import { UncertaintyInputs } from "@/components/calculator/uncertainty-inputs";
import { AdvancedInputs } from "@/components/calculator/advanced-inputs";
import { ResultsPanel } from "@/components/calculator/results-panel";
import { Button } from "@/components/ui/button";

// Types for calculator state
export interface CalculatorState {
  // City and apartment
  selectedCity: string | null;
  selectedApartmentSize: string | null;
  
  // Basic inputs
  kupniCena: number;
  vlastniZdroje: number; // percentage
  urokovaSazba: number; // percentage p.a.
  najemne: number;
  etfVynos: number; // percentage p.a.
  
  // Advanced inputs
  prispevekRodicu: number;
  zarizeniNemovitosti: number;
  rustHodnotyNemovitosti: number; // percentage p.a.
  fondOprav: number;
  pojisteniNemovitosti: number;
  danZNemovitosti: number;
  nakladyUdrzba: number; // percentage
  ocekavanaInflace: number; // percentage p.a.
  rustNajemneho: number; // percentage p.a.
  
  // Monte Carlo uncertainty parameters
  etfVynosMin: number;
  etfVynosExpected: number;
  etfVynosMax: number;
  rustHodnotyMin: number;
  rustHodnotyExpected: number;
  rustHodnotyMax: number;
  rustNajemnehoMin: number;
  rustNajemnehoExpected: number;
  rustNajemnehoMax: number;
  urokovaSazbaMin: number;
  urokovaSazbaExpected: number;
  urokovaSazbaMax: number;
}

// Initial state with Praha + 2+kk preselected
const initialState: CalculatorState = {
  selectedCity: "Praha",
  selectedApartmentSize: "2+kk",
  kupniCena: 7800000, // Praha 2+kk default
  vlastniZdroje: 20,
  urokovaSazba: 5.5,
  najemne: 24000, // Praha 2+kk default
  etfVynos: 8.0,
  prispevekRodicu: 0,
  zarizeniNemovitosti: 150000,
  rustHodnotyNemovitosti: 3.0,
  fondOprav: 1500,
  pojisteniNemovitosti: 3000,
  danZNemovitosti: 2000,
  nakladyUdrzba: 0.5,
  ocekavanaInflace: 2.5,
  rustNajemneho: 3.0,
  etfVynosMin: 4.0,
  etfVynosExpected: 8.0,
  etfVynosMax: 12.0,
  rustHodnotyMin: 1.0,
  rustHodnotyExpected: 3.0,
  rustHodnotyMax: 6.0,
  rustNajemnehoMin: 1.5,
  rustNajemnehoExpected: 3.0,
  rustNajemnehoMax: 5.0,
  urokovaSazbaMin: 4.0,
  urokovaSazbaExpected: 5.5,
  urokovaSazbaMax: 8.0,
};

export default function BydleniKalkulackaPage() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [resultsMode, setResultsMode] = useState<"realistic" | "fixed">("realistic");

  // Handler for city selection
  const handleCitySelect = (city: string) => {
    setState((prev) => ({ ...prev, selectedCity: city }));
  };

  // Handler for apartment size selection
  const handleApartmentSelect = (size: string, kupniCena: number, najemne: number) => {
    setState((prev) => ({
      ...prev,
      selectedApartmentSize: size,
      kupniCena,
      najemne,
    }));
  };

  // Handler for input updates
  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Check if user can view results (city and apartment selected)
  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  const scrollToResults = () => {
    document.getElementById("vysledek")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToInputs = () => {
    document.getElementById("nastaveni")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 md:space-y-12 md:px-6" style={{ paddingTop: "var(--section-padding-y-mobile)", paddingBottom: "var(--section-padding-y-mobile)" }}>
      {/* Hero Header */}
      <header className="space-y-3 text-center">
        <h1 className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] md:text-4xl">
          Bydlení kalkulačka
        </h1>
        <p className="mx-auto max-w-2xl font-uiSans text-base text-[var(--color-secondary)] md:text-lg">
          Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat do ETF. 
          Stačí vybrat město a velikost bytu.
        </p>
      </header>

      {/* City and Apartment Selection Section */}
      <section
        className="space-y-6 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 md:p-6"
        style={{ 
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)"
        }}
      >
        <div className="space-y-2">
          <h2 className="font-uiSans text-xl font-semibold text-[var(--color-primary)] md:text-2xl">
            Začni městem a velikostí bytu
          </h2>
          <p className="font-uiSans text-sm text-[var(--color-secondary)] md:text-base">
            Stačí vybrat město a typ bytu. Ceny doplníme za tebe podle dat z českých měst.
          </p>
        </div>

        <CitySelector
          selectedCity={state.selectedCity}
          onCitySelect={handleCitySelect}
        />

        <ApartmentSizeCards
          selectedCity={state.selectedCity}
          selectedSize={state.selectedApartmentSize}
          onSizeSelect={handleApartmentSelect}
        />

        {/* Mobile: Show results button after selection */}
        <div className="md:hidden">
          {canViewResults && (
            <Button
              onClick={scrollToResults}
              className="w-full"
              style={{
                background: "var(--btn-primary-bg)",
                color: "var(--btn-primary-text)",
              }}
            >
              Zobrazit výsledek
            </Button>
          )}
        </div>
      </section>

      {/* Desktop: Two-column layout for Inputs + Results */}
      {/* Mobile: Stacked layout */}
      <div className="md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:gap-8">
        {/* Left Column: Inputs */}
        <div id="nastaveni" className="space-y-6">
          {/* Basic Inputs */}
          <section
            className="space-y-4 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 md:p-6"
            style={{ 
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <h2 className="font-uiSans text-lg font-semibold text-[var(--color-primary)] md:text-xl">
              Základní nastavení
            </h2>
            <BasicInputs state={state} updateState={updateState} />
          </section>

          {/* Uncertainty Inputs (Advanced, Collapsed) */}
          <UncertaintyInputs state={state} updateState={updateState} />

          {/* Advanced Inputs (Collapsed) */}
          <AdvancedInputs state={state} updateState={updateState} />
        </div>

        {/* Right Column: Results (Sticky on Desktop) */}
        <aside className="md:sticky md:top-24 md:self-start">
          <ResultsPanel
            state={state}
            resultsMode={resultsMode}
            setResultsMode={setResultsMode}
            onEditSettings={scrollToInputs}
          />
        </aside>
      </div>
    </main>
  );
}

