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
              {/* 1. Eyebrow Label */}
              <p className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-3">
                Online kalkulačka
              </p>

              {/* 2. H1 Headline */}
              <h1 className="font-displaySerif text-4xl font-bold text-[#0F172A] md:text-6xl tracking-tight">
                Bydlet ve vlastním, nebo v nájmu?
              </h1>

              {/* 3. Subtitle */}
              <p className="mt-6 font-uiSans text-lg leading-relaxed text-slate-600">
                Spočítejte si, co je finančně výhodnější v horizontu 30 let.
              </p>

              {/* 4. Versus Pills - Below Subtitle */}
              <div className="flex flex-col items-start mt-6 md:flex-row md:items-center md:gap-3">
                {/* Pill A: Own */}
                <span className="inline-flex items-center rounded-full bg-[#F7EAD9] px-3 py-1.5 text-sm font-semibold text-[#C98D4E]">
                  Scénář A: Vlastní bydlení
                </span>
                
                {/* Separator - Centered relative to pills on mobile */}
                <span className="block text-sm italic text-slate-400 my-1 ml-24 md:my-0 md:ml-0">vs</span>
                
                {/* Pill B: Rent */}
                <span className="inline-flex items-center rounded-full bg-[#EAE7FF] px-3 py-1.5 text-sm font-semibold text-[#7D5AE2]">
                  Scénář B: Nájem a investice
                </span>
              </div>

              {/* 5. Visual Bridge (Arrow) - Desktop Only */}
              <div className="hidden md:flex items-center gap-3 mt-8 text-slate-500">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 65 60" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-slate-400 rotate-12"
                >
                  <path d="M10 10 C 20 40, 40 50, 50 50" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M35 55 L 50 50 L 55 35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-base font-medium">Začněte výběrem města</span>
              </div>
            </div>

            {/* Right Column: The Window (Hero Visual) - Hidden on Mobile */}
            <div className="hidden md:block md:mt-0">
              <div 
                className="bg-stone-700 rounded-[32px] shadow-2xl w-full aspect-[4/3] rotate-1"
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

              {/* Mobile-only Hero Image - Below City Selection */}
              <div className="mt-6 px-4 md:hidden">
                <div 
                  className="bg-stone-700 rounded-[24px] shadow-xl w-full h-48 aspect-video"
                  aria-hidden="true"
                />
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
