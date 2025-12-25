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
import { CalculatorSchema } from "@/components/seo/calculator-schema";

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

export default function Home() {
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
    <main className="bg-[#F5F6F8] min-h-screen overflow-x-hidden">
      <CalculatorSchema />
      
      {/* Hero Section */}
      <section className="bg-[#F5F6F8] pt-12 pb-8 md:pt-20 lg:pt-16 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-start">
            {/* Left Column: Text */}
            <div className="text-left md:pt-4">
              <p className="font-uiSans text-xs md:text-sm font-medium uppercase tracking-wider text-slate-400 mb-3 md:mb-4">
                Kalkulačka: vlastní vs nájem
              </p>
              <h1 className="font-displaySerif text-4xl font-bold text-slate-900 md:text-6xl tracking-tight">
                Bydlet ve vlastním, nebo v nájmu?
              </h1>
              <p className="mt-6 max-w-2xl font-uiSans text-lg leading-relaxed text-slate-600 md:text-xl">
                Porovnáme, co je finančně výhodnější v horizontu 30 let. Dva scénáře.
              </p>
              <ul className="mt-4 max-w-2xl font-uiSans text-base leading-relaxed text-slate-600 space-y-1.5">
                <li className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full shrink-0 mt-[7px]" style={{ background: 'var(--scenario-a-dot)' }} />
                  Scénář A: Vlastní bydlení na hypotéku
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-2 w-2 rounded-full shrink-0 mt-[7px]" style={{ background: 'var(--scenario-b-dot)' }} />
                  Scénář B: Bydlení v nájmu a investování
                </li>
              </ul>
              {/* Desktop micro-CTA */}
              <p className="hidden md:block mt-6 font-uiSans text-sm text-slate-500">
                Začněte výběrem města a velikosti bytu níže.{' '}
                <button 
                  onClick={() => {
                    const target = document.getElementById('zacni-mestem');
                    const card = document.getElementById('city-card');
                    if (target) {
                      // Check for reduced motion preference
                      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                      
                      target.scrollIntoView({ 
                        behavior: prefersReducedMotion ? 'auto' : 'smooth', 
                        block: 'start' 
                      });
                      
                      // Add highlight animation to card after scroll starts
                      if (card && !prefersReducedMotion) {
                        setTimeout(() => {
                          card.classList.add('card-highlight-animation');
                          setTimeout(() => {
                            card.classList.remove('card-highlight-animation');
                          }, 800);
                        }, 250);
                      }
                    }
                  }}
                  className="text-[var(--color-primary)] hover:underline font-medium active:opacity-70 transition-opacity duration-100 motion-reduce:transition-none"
                >
                  Vybrat město →
                </button>
              </p>
            </div>

            {/* Right Column: The Window (Hero Visual) */}
            <div className="mt-8 md:mt-0">
              <div 
                className="bg-stone-700 rounded-[24px] md:rounded-[32px] shadow-2xl w-full aspect-[16/9] md:aspect-[4/3] md:rotate-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BAND B: Inputs Workbench (Lilac on mobile) ===== */}
      <div className="bg-[#F4F5FB] md:bg-[#F5F6F8]">
        {/* City and Apartment Selection Section */}
        <section id="zacni-mestem" className="py-8 lg:pt-0 lg:pb-8 overflow-x-hidden md:overflow-visible scroll-mt-20">
          <div className="mx-auto max-w-7xl px-0 md:px-6">
            <div id="city-card" className="md:rounded-[24px] md:bg-white md:p-8 md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
              <div className="space-y-2 px-4 md:px-0">
                <h2 className="section-title">
                  Začni městem a velikostí bytu
                </h2>
                <p className="font-uiSans text-sm leading-relaxed text-slate-600 md:text-base">
                  Stačí vybrat město a typ bytu. Ceny doplníme za tebe podle dat z českých měst.
                </p>
              </div>

              <div className="mt-6 md:mt-4 px-4 md:px-0">
                <CitySelector
                  selectedCity={state.selectedCity}
                  onCitySelect={handleCitySelect}
                />
              </div>

              <div className="mt-6 md:mt-4">
                <ApartmentSizeCards
                  selectedCity={state.selectedCity}
                  selectedSize={state.selectedApartmentSize}
                  onSizeSelect={handleApartmentSelect}
                />
              </div>

              {/* Mobile: Show results button after selection */}
              <div className="mt-4 px-4 md:hidden">
                  {canViewResults && (
                    <Button
                      onClick={scrollToResults}
                      className="w-full rounded-[var(--radius-pill)] border px-6 py-3 font-uiSans text-base font-medium transition-all duration-75 hover:bg-gray-50 active:scale-[0.98] active:bg-gray-100 focus:outline-none shadow-sm"
                      style={{
                        background: "#FFFFFF",
                        color: "var(--color-primary)",
                        borderColor: "var(--color-border)",
                      }}
                    >
                      Zobrazit výsledek
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section (Byt, který zvažujete + Accordions) */}
        <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 md:px-6 lg:pt-8 lg:pb-8">
          {/* Desktop: Two-column layout / Mobile: Stacked */}
          <div className="md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:gap-8 md:items-start">
            {/* Left Column: Inputs - UNIFIED CARD */}
            <div id="nastaveni" className="space-y-6">
              <section
                className="space-y-0 mb-0 rounded-none border-none shadow-none md:mb-0 md:mx-0 md:rounded-[24px] md:border-0 md:bg-white md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] md:overflow-hidden"
              >
                {/* Basic Inputs Header + Content */}
                <div className="px-0 py-8 md:p-8 space-y-6">
                  <h2 className="section-title mb-0">
                    Byt, který zvažujete
                  </h2>
                  <BasicInputs 
                    state={state} 
                    updateState={updateState} 
                    animatingFields={animatingFields}
                  />
                </div>

                {/* Unified Advanced Footer (Naked Accordions) */}
                <div className="px-0 pb-8 md:px-8 md:pb-8 md:bg-white">
                  <UncertaintyInputs state={state} updateState={updateState} resultsMode={resultsMode} />
                  <AdvancedInputs state={state} updateState={updateState} />
                </div>
              </section>
            </div>

            {/* Right Column: Results - Desktop only in grid */}
            <aside id="vysledek-desktop" className="hidden md:block md:sticky md:top-24 md:self-start">
              <ResultsPanel
                state={state}
                resultsMode={resultsMode}
                setResultsMode={setResultsMode}
                onEditSettings={scrollToInputs}
                calculationResults={calculationResults}
              />
            </aside>
          </div>
        </div>
      </div>

      {/* ===== BAND C: Results (Off-white on mobile) ===== */}
      <div className="bg-[#F5F6F8]">
        {/* Mobile Results */}
        <div id="vysledek" className="md:hidden">
          <ResultsPanel
            state={state}
            resultsMode={resultsMode}
            setResultsMode={setResultsMode}
            onEditSettings={scrollToInputs}
            calculationResults={calculationResults}
          />
        </div>

        {/* Yearly Overview Section */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Desktop: Analytical table */}
          <div className="hidden lg:block lg:pt-8 lg:pb-12">
            <YearlyOverviewTable rows={yearlyRows} />
          </div>

          {/* Mobile: Accordion */}
          <div className="block lg:hidden py-8">
            <YearlyBreakdownMobile rows={yearlyRows} />
          </div>
        </div>
      </div>
    </main>
  );
}
