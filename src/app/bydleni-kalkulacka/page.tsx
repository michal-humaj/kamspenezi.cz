"use client";

import { useState, useMemo } from "react";
import { CitySelector } from "@/components/calculator/city-selector";
import { ApartmentSizeCards } from "@/components/calculator/apartment-size-cards";
import { BasicInputs } from "@/components/calculator/basic-inputs";
import { UncertaintyInputs } from "@/components/calculator/uncertainty-inputs";
import { AdvancedInputs } from "@/components/calculator/advanced-inputs";
import { ResultsPanel } from "@/components/calculator/results-panel";
import { Button } from "@/components/ui/button";
import { calculateBydleniFixed } from "@/lib/calculations/bydleni-fixed";
import { YearlyOverviewTable, type YearlyRow } from "@/components/calculator/YearlyOverviewTable";
import { YearlyBreakdownMobile } from "@/components/calculator/yearly-breakdown-mobile";

// Types for calculator state
export interface CalculatorState {
  selectedCity: string | null;
  selectedApartmentSize: string | null;
  
  // Basic inputs
  kupniCena: number;
  vlastniZdroje: number;
  urokovaSazba: number;
  najemne: number;
  etfVynos: number;
  
  // Advanced inputs
  prispevekRodicu: number;
  zarizeniNemovitosti: number;
  rustHodnotyNemovitosti: number;
  fondOprav: number;
  pojisteniNemovitosti: number;
  danZNemovitosti: number;
  nakladyUdrzba: number;
  ocekavanaInflace: number;
  rustNajemneho: number;
  
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
  kupniCena: 6000000,
  vlastniZdroje: 10,
  urokovaSazba: 4.7,
  najemne: 17000,
  etfVynos: 8.0,
  prispevekRodicu: 0,
  zarizeniNemovitosti: 250000,
  rustHodnotyNemovitosti: 6.0,
  fondOprav: 300,
  pojisteniNemovitosti: 1900,
  danZNemovitosti: 2000,
  nakladyUdrzba: 30000,
  ocekavanaInflace: 3.0,
  rustNajemneho: 4.0,
  etfVynosMin: 4.0,
  etfVynosExpected: 8.0,
  etfVynosMax: 12.0,
  rustHodnotyMin: 1.0,
  rustHodnotyExpected: 6.0,
  rustHodnotyMax: 10.0,
  rustNajemnehoMin: 1.5,
  rustNajemnehoExpected: 4.0,
  rustNajemnehoMax: 6.0,
  urokovaSazbaMin: 3.0,
  urokovaSazbaExpected: 4.3,
  urokovaSazbaMax: 7.0,
};

export default function BydleniKalkulackaPage() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [resultsMode, setResultsMode] = useState<"realistic" | "fixed">("fixed");
  const [animatingFields, setAnimatingFields] = useState<Set<string>>(new Set());

  const handleCitySelect = (city: string) => {
    setState((prev) => ({ ...prev, selectedCity: city }));
  };

  const handleApartmentSelect = (size: string, kupniCena: number, najemne: number) => {
    // Mark fields as animating
    setAnimatingFields(new Set(["kupniCena", "najemne"]));
    
    setState((prev) => ({
      ...prev,
      selectedApartmentSize: size,
      kupniCena,
      najemne,
    }));

    // Clear animation state after 400ms
    setTimeout(() => {
      setAnimatingFields(new Set());
    }, 400);
  };

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Calculate results - both modes use the same calculation
  const calculationResults = useMemo(() => {
    return calculateBydleniFixed({
      purchasePrice: state.kupniCena,
      parentsContribution: state.prispevekRodicu,
      mortgageRateAnnual: state.urokovaSazba / 100, // Convert % to decimal
      mortgageRateFuture: state.urokovaSazbaExpected / 100, // Convert % to decimal
      ownFundsRatio: state.vlastniZdroje / 100, // Convert % to decimal
      furnishingOneOff: state.zarizeniNemovitosti,
      // Use EXPECTED values from uncertainty section for time-based growth
      propertyGrowthAnnual: state.rustHodnotyExpected / 100,
      repairFundMonthly: state.fondOprav,
      insuranceAnnual: state.pojisteniNemovitosti,
      propertyTaxAnnual: state.danZNemovitosti,
      maintenanceBaseKc: state.nakladyUdrzba,
      costInflationAnnual: state.ocekavanaInflace / 100,
      rentGrowthAnnual: state.rustNajemnehoExpected / 100,
      rentMonthly: state.najemne,
      etfReturnAnnual: state.etfVynosExpected / 100,
    });
  }, [state]);

  // Map calculation results to yearly rows for the breakdown table
  const yearlyRows: YearlyRow[] = useMemo(() => {
    return calculationResults.years.map((year, index) => ({
      year,
      mortgageRemaining: calculationResults.remainingDebt[index],
      mortgagePayment: calculationResults.mortgagePaymentsAnnual[index],
      propertyTax: calculationResults.taxAnnual[index],
      repairFund: calculationResults.repairFundAnnual[index],
      insurance: calculationResults.insuranceAnnualSeries[index],
      maintenance: calculationResults.maintenanceAnnual[index],
      totalPropertyCosts: calculationResults.ownershipCosts[index],
      propertyValue: calculationResults.propertyValue[index],
      propertyNetWorth: calculationResults.propertyValue[index] - calculationResults.remainingDebt[index],
      rent: calculationResults.rentAnnual[index],
      savedComparedToOwnership: calculationResults.savedVsOwnership[index],
      etfPortfolioValue: calculationResults.etfValue[index],
    }));
  }, [calculationResults]);

  const canViewResults = state.selectedCity && state.selectedApartmentSize;

  const scrollToResults = () => {
    const element = document.getElementById("vysledek");
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToInputs = () => {
    const element = document.getElementById("nastaveni");
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[var(--bg-base)] min-h-screen">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-[var(--section-padding-y-mobile)] md:space-y-12 md:px-6 md:py-[var(--section-padding-y-desktop)]">
        {/* Hero Header */}
        <header className="space-y-3 text-center">
          <h1 className="font-displaySerif text-3xl font-bold text-[var(--color-primary)] md:text-4xl lg:text-5xl">
            Bydlení kalkulačka
          </h1>
          <p className="mx-auto max-w-2xl font-uiSans text-base leading-relaxed text-[var(--color-secondary)] md:text-lg">
            Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat do ETF. 
            Stačí vybrat město a velikost bytu.
          </p>
        </header>

        {/* City and Apartment Selection Section */}
        <section
          className="space-y-6 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-6 md:shadow-[var(--shadow-card)]"
        >
          <div className="space-y-2 px-4 md:px-0">
            <h2 className="calc-section-title">
              Začni městem a velikostí bytu
            </h2>
            <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)] md:text-base">
              Stačí vybrat město a typ bytu. Ceny doplníme za tebe podle dat z českých měst.
            </p>
          </div>

          <div className="px-4 md:px-0">
            <CitySelector
              selectedCity={state.selectedCity}
              onCitySelect={handleCitySelect}
            />
          </div>

          <ApartmentSizeCards
            selectedCity={state.selectedCity}
            selectedSize={state.selectedApartmentSize}
            onSizeSelect={handleApartmentSelect}
          />

          {/* Mobile: Show results button after selection */}
          <div className="px-4 md:hidden">
            {canViewResults && (
              <Button
                onClick={scrollToResults}
                className="w-full rounded-[var(--radius-pill)] px-6 py-3 font-uiSans text-base font-semibold focus:outline-none"
                style={{
                  background: "var(--color-primary)",
                  color: "#FFFFFF",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                Zobrazit výsledek
              </Button>
            )}
          </div>
        </section>

        {/* Desktop: Two-column layout / Mobile: Stacked */}
        <div className="md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:gap-8 md:items-start">
          {/* Left Column: Inputs */}
          <div id="nastaveni" className="space-y-6">
            {/* Basic Inputs */}
            <section
              className="space-y-6 -mx-4 rounded-none border-none bg-[var(--bg-lilac-section)] p-4 py-8 shadow-none md:mx-0 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-6 md:py-6 md:shadow-[var(--shadow-card)]"
            >
              <h2 className="calc-section-title">
                Základní nastavení
              </h2>
              <BasicInputs 
                state={state} 
                updateState={updateState} 
                animatingFields={animatingFields}
              />
            </section>

            {/* Uncertainty Inputs (Advanced, Collapsed) */}
            <UncertaintyInputs state={state} updateState={updateState} resultsMode={resultsMode} />

            {/* Advanced Inputs (Collapsed) */}
            <AdvancedInputs state={state} updateState={updateState} />
          </div>

          {/* Right Column: Results (Sticky on Desktop, Below on Mobile) */}
          <aside className="mt-12 md:mt-0 md:sticky md:top-24 md:self-start">
            <ResultsPanel
              state={state}
              resultsMode={resultsMode}
              setResultsMode={setResultsMode}
              onEditSettings={scrollToInputs}
              calculationResults={calculationResults}
            />
          </aside>
        </div>

        {/* Yearly Overview Section */}
        {/* Desktop: Analytical table */}
        <div className="hidden lg:block">
          <YearlyOverviewTable rows={yearlyRows} />
        </div>

        {/* Mobile: Accordion */}
        <div className="block lg:hidden">
          <YearlyBreakdownMobile rows={yearlyRows} />
        </div>
      </div>
    </main>
  );
}
