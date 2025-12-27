"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CitySelector } from "@/components/calculator/city-selector";
import { ApartmentSizeCards } from "@/components/calculator/apartment-size-cards";
import { BasicInputs } from "@/components/calculator/basic-inputs";
import { UncertaintyInputs } from "@/components/calculator/uncertainty-inputs";
import { AdvancedInputs } from "@/components/calculator/advanced-inputs";
import { ResultsPanel } from "@/components/calculator/results-panel";
import { calculateBydleniFixed } from "@/lib/calculations/bydleni-fixed";
import { YearlyOverviewTable, type YearlyRow } from "@/components/calculator/YearlyOverviewTable";
import { YearlyBreakdownMobile } from "@/components/calculator/yearly-breakdown-mobile";
import { CalculatorSchema } from "@/components/seo/calculator-schema";
import { calculatorDefaults } from "@/data/calculator-defaults";
import type { ApartmentSize } from "@/data/calculator-defaults.types";

// Types for calculator state
export interface CalculatorState {
  selectedCity: string | null;
  selectedApartmentSize: string | null;
  
  // Basic inputs
  kupniCena: number;
  vlastniZdroje: number;
  urokovaSazbaHypoteky: number;
  najemne: number;
  vynosInvestice: number;
  
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
  
  // Key market assumptions (used by both Fixed and Monte Carlo modes)
  vynosInvesticeExpected: number;
  rustHodnotyExpected: number;
  rustNajemnehoExpected: number;
  urokovaSazbaHypotekyExpected: number;
}

// Use typed config
const config = calculatorDefaults;

// Get Praha defaults for initial state (using slug)
const prahaDefaults = config.cities["praha"];
const praha2kkDefaults = prahaDefaults.apartments["2+kk"];

// Initial state with Praha preselected (using slug), apartment size requires user selection
const initialState: CalculatorState = {
  selectedCity: "praha",
  selectedApartmentSize: null,
  // Use 2+kk defaults as initial values (user will select actual apartment)
  kupniCena: praha2kkDefaults.kupniCena,
  vlastniZdroje: 10,
  urokovaSazbaHypoteky: config.global.urokovaSazbaHypoteky,
  najemne: praha2kkDefaults.najemne,
  vynosInvestice: config.global.vynosInvestice,
  prispevekRodicu: 0,
  zarizeniNemovitosti: praha2kkDefaults.zarizeniNemovitosti,
  rustHodnotyNemovitosti: prahaDefaults.rustHodnotyNemovitosti,
  fondOprav: praha2kkDefaults.fondOprav,
  pojisteniNemovitosti: praha2kkDefaults.pojisteniNemovitosti,
  danZNemovitosti: praha2kkDefaults.danZNemovitosti,
  nakladyUdrzba: praha2kkDefaults.nakladyUdrzba,
  ocekavanaInflace: config.global.ocekavanaInflace,
  rustNajemneho: prahaDefaults.rustNajemneho,
  // Key market assumptions
  vynosInvesticeExpected: config.global.vynosInvestice,
  rustHodnotyExpected: prahaDefaults.rustHodnotyNemovitosti,
  rustNajemnehoExpected: prahaDefaults.rustNajemneho,
  urokovaSazbaHypotekyExpected: config.global.urokovaSazbaHypotekyFuture,
};

export default function Home() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [animatingFields, setAnimatingFields] = useState<Set<string>>(new Set());

  const handleCitySelect = (city: string) => {
    const cityDefaults = config.cities[city];
    if (!cityDefaults) {
      setState((prev) => ({ ...prev, selectedCity: city }));
      return;
    }

    // Apply per-city parameters
    setState((prev) => {
      const updates: Partial<CalculatorState> = {
        selectedCity: city,
        rustNajemneho: cityDefaults.rustNajemneho,
        rustHodnotyNemovitosti: cityDefaults.rustHodnotyNemovitosti,
        // Update market assumptions based on city
        rustHodnotyExpected: cityDefaults.rustHodnotyNemovitosti,
        rustNajemnehoExpected: cityDefaults.rustNajemneho,
      };

      // If apartment size is already selected, also update apartment-specific values
      if (prev.selectedApartmentSize) {
        const apartmentDefaults = cityDefaults.apartments[prev.selectedApartmentSize as ApartmentSize];
        if (apartmentDefaults) {
          Object.assign(updates, {
            kupniCena: apartmentDefaults.kupniCena,
            najemne: apartmentDefaults.najemne,
            fondOprav: apartmentDefaults.fondOprav,
            zarizeniNemovitosti: apartmentDefaults.zarizeniNemovitosti,
            danZNemovitosti: apartmentDefaults.danZNemovitosti,
            pojisteniNemovitosti: apartmentDefaults.pojisteniNemovitosti,
            nakladyUdrzba: apartmentDefaults.nakladyUdrzba,
          });
        }
      }

      return { ...prev, ...updates };
    });
  };

  const handleApartmentSelect = (size: string) => {
    const cityDefaults = state.selectedCity ? config.cities[state.selectedCity] : null;
    const apartmentDefaults = cityDefaults?.apartments[size as ApartmentSize];

    if (!apartmentDefaults) {
      setState((prev) => ({ ...prev, selectedApartmentSize: size }));
      return;
    }

    // Mark fields as animating
    setAnimatingFields(new Set(["kupniCena", "najemne", "fondOprav", "zarizeniNemovitosti", "danZNemovitosti", "pojisteniNemovitosti", "nakladyUdrzba"]));
    
    setState((prev) => ({
      ...prev,
      selectedApartmentSize: size,
      kupniCena: apartmentDefaults.kupniCena,
      najemne: apartmentDefaults.najemne,
      fondOprav: apartmentDefaults.fondOprav,
      zarizeniNemovitosti: apartmentDefaults.zarizeniNemovitosti,
      danZNemovitosti: apartmentDefaults.danZNemovitosti,
      pojisteniNemovitosti: apartmentDefaults.pojisteniNemovitosti,
      nakladyUdrzba: apartmentDefaults.nakladyUdrzba,
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
      mortgageRateAnnual: state.urokovaSazbaHypoteky / 100, // Convert % to decimal
      mortgageRateFuture: state.urokovaSazbaHypotekyExpected / 100, // Convert % to decimal
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
      investiceReturnAnnual: state.vynosInvesticeExpected / 100,
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
      portfolioValue: calculationResults.investiceValue[index],
    }));
  }, [calculationResults]);

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
    <main className="bg-[#F5F6F8] min-h-screen">
      <CalculatorSchema />
      
      {/* Hero Section */}
      <section className="bg-[#F5F6F8] pt-10 pb-2 md:pt-16 lg:pt-12 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-start">
            {/* Left Column: Text */}
            <div className="text-left md:pt-10">
              {/* 1. Eyebrow Label */}
              <p className="text-xs font-semibold tracking-widest text-slate-700 uppercase mb-2">
                Online kalkulačka
              </p>

              {/* 2. H1 Headline */}
              <h1 className="font-displaySerif text-4xl font-bold text-[#0F172A] md:text-6xl tracking-tight leading-[1.05] md:leading-[1.1]">
                Bydlet ve vlastním, nebo v nájmu?
              </h1>

              {/* 3. Subtitle */}
              <p className="mt-4 font-uiSans text-base leading-relaxed text-slate-700 md:text-lg">
                 Spočítejte si, co je finančně výhodnější v horizontu 30 let. Porovnáme hypotéku oproti nájmu, kde ušetřené peníze investujete do akcií.
              </p>

              {/* 4. Scenario Pills - Below Subtitle (Stacked on mobile for readability) */}
              <div className="flex flex-col items-start gap-2 mt-4 md:flex-row md:items-center md:gap-5">
                {/* Pill A: Own */}
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-800">
                  Scénář A: Vlastní bydlení
                </span>
                
                {/* Pill B: Rent - Forest Green */}
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold" style={{ background: 'var(--scenario-b-bg)', color: 'var(--scenario-b-dot)' }}>
                  Scénář B: Nájem a investice
                </span>
              </div>

              {/* Mobile-only Hero Image - Full Bleed Panoramic Band (no shadow, no radius) */}
              <div className="mt-6 mb-0 md:hidden -mx-4 w-[calc(100%+2rem)]">
                <Image 
                  src="/hero-couch-mobile.webp"
                  alt="Kalkulačka bydlení - porovnání vlastního bydlení a nájmu"
                  width={800}
                  height={437}
                  className="w-full h-44 object-cover object-[center_30%]"
                  sizes="100vw"
                  quality={85}
                />
              </div>
            </div>

            {/* Right Column: The Window (Hero Visual) - Hidden on Mobile */}
            <div className="hidden md:block md:mt-0 overflow-hidden rounded-[32px]">
              <Image 
                src="/hero-couch.webp"
                alt="Kalkulačka bydlení - porovnání vlastního bydlení a nájmu"
                width={1600}
                height={873}
                className="shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] w-full aspect-[4/3] object-cover scale-105 rotate-[1.5deg]"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BAND B: Inputs Workbench (Lilac on mobile) ===== */}
      <div className="bg-[#F4F5FB] md:bg-[#F5F6F8]">
        {/* City and Apartment Selection Section */}
        <section id="zacni-mestem" className="pt-5 pb-8 md:-mt-6 lg:-mt-12 md:pt-4 lg:pt-0 lg:pb-0 overflow-visible scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div id="city-card">
              <h2 className="section-title mb-3 md:mb-0">
                Začni městem a velikostí bytu
              </h2>

              <div className="mt-3 md:mt-4">
                <CitySelector
                  selectedCity={state.selectedCity}
                  onCitySelect={handleCitySelect}
                />
              </div>

              <div className="mt-4 md:mt-4 -mx-4 md:mx-0">
                <ApartmentSizeCards
                  selectedCity={state.selectedCity}
                  selectedSize={state.selectedApartmentSize}
                  onSizeSelect={handleApartmentSelect}
                />
              </div>

              {/* Mobile: Show results button - Primary CTA (Neutral Black, Chunky) */}
              <div className="mt-6 pb-4 md:hidden">
                <button
                  onClick={scrollToResults}
                  className="w-full rounded-full bg-gray-900 hover:bg-gray-800 py-4 font-uiSans text-base font-bold text-white shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all"
                >
                  Zobrazit výsledek →
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Spacer between Quick Selection and Detailed Inputs */}
        <div className="h-0 md:h-8 lg:h-10" />

        {/* Inputs Section (Byt, který zvažujete + Accordions) */}
        <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 md:px-6 lg:pt-4 lg:pb-8">
          {/* Desktop: Two-column layout / Mobile: Stacked */}
          <div className="md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:gap-8">
            {/* Left Column: Inputs - UNIFIED CARD */}
            <div id="nastaveni" className="space-y-6">
              <section
                className="space-y-0 mb-0 rounded-none border-none shadow-none md:mb-0 md:mx-0 md:rounded-[24px] md:border-0 md:bg-white md:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)] md:overflow-hidden"
              >
                {/* Basic Inputs Header + Content */}
                <div className="px-0 py-4 md:p-8 space-y-6">
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
                  <UncertaintyInputs state={state} updateState={updateState} />
                  <AdvancedInputs state={state} updateState={updateState} />
                </div>
              </section>
            </div>

            {/* Right Column: Results - Desktop only in grid (Sticky) */}
            <div id="vysledek-desktop" className="hidden md:block">
              <div className="sticky top-6">
                <ResultsPanel
                  state={state}
                  onEditSettings={scrollToInputs}
                  calculationResults={calculationResults}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BAND C: Results (Off-white on mobile) ===== */}
      <div className="bg-[#F5F6F8]">
        {/* Mobile Results */}
        <div id="vysledek" className="md:hidden">
          <ResultsPanel
            state={state}
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
