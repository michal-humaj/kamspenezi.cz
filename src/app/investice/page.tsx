"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { CitySelector } from "@/components/calculator/city-selector";
import { ApartmentSizeCards } from "@/components/calculator/apartment-size-cards";
import { InvesticeBasicInputs } from "@/components/calculator/investice-basic-inputs";
import { InvesticeUncertaintyInputs } from "@/components/calculator/investice-uncertainty-inputs";
import { InvesticeAdvancedInputs } from "@/components/calculator/investice-advanced-inputs";
import { InvesticeResultsPanel } from "@/components/calculator/investice-results-panel";
import { calculateInvesticeFixed } from "@/lib/calculations/investice-fixed";
import { InvesticeYearlyTable, type InvesticeYearlyRow } from "@/components/calculator/InvesticeYearlyTable";
import { InvesticeYearlyBreakdownMobile } from "@/components/calculator/investice-yearly-breakdown-mobile";
import { NetWorthChart } from "@/components/calculator/NetWorthChart";
import { calculatorDefaults } from "@/data/calculator-defaults";
import { useInvesticeUrlState } from "@/hooks/useInvesticeUrlState";
import type { ApartmentSize } from "@/data/calculator-defaults.types";

// ============================================================================
// State Type
// ============================================================================

export interface InvesticeCalculatorState {
  selectedCity: string | null;
  selectedApartmentSize: string | null;

  // Basic inputs
  kupniCena: number;
  vlastniZdroje: number;
  urokovaSazbaHypoteky: number;
  najemne: number;
  obsazenost: number;          // NEW: Occupancy rate (percentage, e.g. 90)

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
  pasmoDane: number;           // NEW: Tax bracket (15 or 23)

  // Key market assumptions
  vynosInvesticeExpected: number;
  rustHodnotyExpected: number;
  rustNajemnehoExpected: number;
  urokovaSazbaHypotekyExpected: number;
}

// ============================================================================
// Defaults from shared config
// ============================================================================

const config = calculatorDefaults;
const prahaDefaults = config.cities["praha"];
const praha1kkDefaults = prahaDefaults.apartments["1+kk"];

const initialState: InvesticeCalculatorState = {
  selectedCity: "praha",
  selectedApartmentSize: "1+kk",
  kupniCena: praha1kkDefaults.kupniCena,
  vlastniZdroje: 10,
  urokovaSazbaHypoteky: config.global.urokovaSazbaHypoteky,
  najemne: praha1kkDefaults.najemne,
  obsazenost: prahaDefaults.obsazenost,
  prispevekRodicu: 0,
  zarizeniNemovitosti: praha1kkDefaults.zarizeniNemovitosti,
  rustHodnotyNemovitosti: prahaDefaults.rustHodnotyNemovitosti,
  fondOprav: praha1kkDefaults.fondOprav,
  pojisteniNemovitosti: praha1kkDefaults.pojisteniNemovitosti,
  danZNemovitosti: praha1kkDefaults.danZNemovitosti,
  nakladyUdrzba: praha1kkDefaults.nakladyUdrzba,
  ocekavanaInflace: config.global.ocekavanaInflace,
  rustNajemneho: prahaDefaults.rustNajemneho,
  pasmoDane: 15,                       // 15% default tax bracket
  vynosInvesticeExpected: config.global.vynosInvestice,
  rustHodnotyExpected: prahaDefaults.rustHodnotyNemovitosti,
  rustNajemnehoExpected: prahaDefaults.rustNajemneho,
  urokovaSazbaHypotekyExpected: config.global.urokovaSazbaHypotekyFuture,
};

// ============================================================================
// Page Component
// ============================================================================

export default function InvesticePage() {
  const [state, setState] = useState<InvesticeCalculatorState>(initialState);
  const [animatingFields, setAnimatingFields] = useState<Set<string>>(new Set());

  const handleCitySelect = (city: string) => {
    const cityDefaults = config.cities[city];
    if (!cityDefaults) {
      setState((prev) => ({ ...prev, selectedCity: city }));
      return;
    }

    setState((prev) => {
      const updates: Partial<InvesticeCalculatorState> = {
        selectedCity: city,
        rustNajemneho: cityDefaults.rustNajemneho,
        rustHodnotyNemovitosti: cityDefaults.rustHodnotyNemovitosti,
        rustHodnotyExpected: cityDefaults.rustHodnotyNemovitosti,
        rustNajemnehoExpected: cityDefaults.rustNajemneho,
        obsazenost: cityDefaults.obsazenost,
      };

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

    setTimeout(() => setAnimatingFields(new Set()), 400);
  };

  const updateState = useCallback((updates: Partial<InvesticeCalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // URL state sync
  const { copyShareUrl } = useInvesticeUrlState(state, initialState, updateState);

  // Calculate results
  const calculationResults = useMemo(() => {
    return calculateInvesticeFixed({
      purchasePrice: state.kupniCena,
      parentsContribution: state.prispevekRodicu,
      ownFundsRatio: state.vlastniZdroje / 100,
      furnishingOneOff: state.zarizeniNemovitosti,
      rentMonthly: state.najemne,
      occupancyRate: state.obsazenost / 100,
      repairFundMonthly: state.fondOprav,
      insuranceAnnual: state.pojisteniNemovitosti,
      propertyTaxAnnual: state.danZNemovitosti,
      maintenanceBaseKc: state.nakladyUdrzba,
      costInflationAnnual: state.ocekavanaInflace / 100,
      taxRate: state.pasmoDane / 100,
      propertyGrowthAnnual: state.rustHodnotyExpected / 100,
      rentGrowthAnnual: state.rustNajemnehoExpected / 100,
      investiceReturnAnnual: state.vynosInvesticeExpected / 100,
      mortgageRateAnnual: state.urokovaSazbaHypoteky / 100,
      mortgageRateFuture: state.urokovaSazbaHypotekyExpected / 100,
    });
  }, [state]);

  // Pre-compute net worth arrays for sparkline + chart
  const netWorthAArray = useMemo(
    () => calculationResults.propertyValue.map((v, i) => v - calculationResults.remainingDebt[i] + calculationResults.sideFundValue[i]),
    [calculationResults]
  );
  const netWorthBArray = calculationResults.etfPortfolioValue;

  // Map to table rows — 24 columns matching Excel A–X
  const yearlyRows: InvesticeYearlyRow[] = useMemo(() => {
    const r = calculationResults;
    return r.years.map((year, i) => {
      // Costs deductible for income tax (repair fund + insurance + property tax + interest + depreciation)
      // Note: maintenance is NOT tax-deductible under Czech rental income rules
      const taxDeductibleCosts =
        r.repairFundAnnual[i] +
        r.insuranceAnnualSeries[i] +
        r.taxPropertyAnnual[i] +
        r.interestPaidAnnual[i] +
        r.depreciationAnnual[i];

      return {
        year,
        // Sub-costs
        propertyTax: r.taxPropertyAnnual[i],
        repairFund: r.repairFundAnnual[i],
        insurance: r.insuranceAnnualSeries[i],
        maintenance: r.maintenanceAnnual[i],
        // Core A
        propertyValue: r.propertyValue[i],
        operatingCosts: r.operatingCostsAnnual[i],
        remainingDebt: r.remainingDebt[i],
        mortgagePayment: r.mortgagePaymentAnnual[i],
        interestPaid: r.interestPaidAnnual[i],
        depreciation: r.depreciationAnnual[i],
        // Tax
        taxDeductibleCosts,
        rentIncome: r.rentIncomeAnnual[i],
        rawTaxBase: r.rentIncomeAnnual[i] - taxDeductibleCosts,
        lossCarryForward: i === 0 ? 0 : r.lossBank[i - 1],
        effectiveTaxBase: r.taxBaseAnnual[i],
        incomeTax: r.incomeTaxAnnual[i],
        // Cash flow
        netIncomeAfterTax:
          r.rentIncomeAnnual[i] -
          r.operatingCostsAnnual[i] -
          r.interestPaidAnnual[i] -
          r.incomeTaxAnnual[i],
        netCashflow: r.netCashflowAnnual[i],
        monthlyCashflow: r.netCashflowAnnual[i] / 12,
        sideFundValue: r.sideFundValue[i],
        netWorthA: r.propertyValue[i] - r.remainingDebt[i] + r.sideFundValue[i],
        // Scénář B
        investedThisYear: Math.max(0, -r.netCashflowAnnual[i]),
        etfPortfolioValue: r.etfPortfolioValue[i],
      };
    });
  }, [calculationResults]);

  // QA validation harness (dev mode only)
  useMemo(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      const qaYears = [0, 1, 5, 6, 30];
      const r = calculationResults;
      console.group("🔍 Investice QA Validation");
      qaYears.forEach((t) => {
        console.log(
          `Year ${t}: ` +
          `PropVal=${Math.round(r.propertyValue[t])} ` +
          `RentInc=${Math.round(r.rentIncomeAnnual[t])} ` +
          `OpCosts=${Math.round(r.operatingCostsAnnual[t])} ` +
          `MtgPmt=${Math.round(r.mortgagePaymentAnnual[t])} ` +
          `Interest=${Math.round(r.interestPaidAnnual[t])} ` +
          `Debt=${Math.round(r.remainingDebt[t])} ` +
          `Depr=${Math.round(r.depreciationAnnual[t])} ` +
          `TaxBase=${Math.round(r.taxBaseAnnual[t])} ` +
          `Tax=${Math.round(r.incomeTaxAnnual[t])} ` +
          `Cashflow=${Math.round(r.netCashflowAnnual[t])} ` +
          `SideFund=${Math.round(r.sideFundValue[t])} ` +
          `ETF=${Math.round(r.etfPortfolioValue[t])}`
        );
      });
      console.log(`NetWorth A: ${Math.round(r.netWorthScenarioA)}`);
      console.log(`NetWorth B: ${Math.round(r.netWorthScenarioB)}`);
      console.groupEnd();
    }
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
      {/* Hero Section */}
      <section className="bg-[#F5F6F8] pt-10 pb-2 md:pt-16 lg:pt-12 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-start">
            {/* Left Column: Text */}
            <div className="text-left md:pt-10">
              <p className="text-xs font-semibold tracking-widest text-slate-700 uppercase mb-2">
                Online kalkulačka
              </p>

              <h1 className="font-displaySerif text-4xl font-bold text-[#0F172A] md:text-6xl tracking-tight leading-[1.05] md:leading-[1.1]">
                Investiční byt, nebo akciový fond ETF?
              </h1>

              <p className="mt-4 font-uiSans text-base leading-relaxed text-slate-700 md:text-lg">
                Spočítejte si, jestli se víc vyplatí koupit investiční byt na pronájem, nebo stejnou hotovost investovat do globálního akciového fondu ETF.
              </p>

              <div className="flex flex-col items-start gap-2 mt-4 md:flex-row md:items-center md:gap-5">
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium" style={{ background: 'var(--scenario-a-bg)', color: 'var(--scenario-a-dot)' }}>
                  Scénář A: Investiční byt
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium" style={{ background: 'var(--scenario-b-bg)', color: 'var(--scenario-b-dot)' }}>
                  Scénář B: Akciový fond
                </span>
              </div>

              {/* Mobile Hero Image */}
              <div className="mt-6 mb-0 md:hidden -mx-4 w-[calc(100%+2rem)]">
                <Image
                  src="/bars-mobile.webp"
                  alt="Kalkulačka investice - porovnání investičního bytu a ETF"
                  width={768}
                  height={512}
                  className="w-full h-44 object-cover object-[center_60%]"
                  sizes="100vw"
                  quality={80}
                />
              </div>
            </div>

            {/* Right Column: Hero Image - Desktop */}
            <div className="hidden md:block md:mt-0 overflow-hidden rounded-[32px]">
              <Image
                src="/bars.webp"
                alt="Kalkulačka investice - porovnání investičního bytu a ETF"
                width={1200}
                height={800}
                className="shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] w-full aspect-[4/3] object-cover scale-105 rotate-[1.5deg]"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={82}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BAND B: Inputs ===== */}
      <div className="bg-[#F4F5FB] md:bg-[#F5F6F8]">
        {/* City and Apartment Selection */}
        <section id="zacni-mestem" className="pt-5 pb-8 md:-mt-6 lg:-mt-12 md:pt-4 lg:pt-0 lg:pb-0 overflow-visible scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div id="city-card">
              <h2 className="section-title mb-3 md:mb-0">
              Začněte městem a velikostí bytu
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

              {/* Mobile CTA */}
              <div className="mt-6 pb-4 md:hidden">
                <button
                  onClick={scrollToResults}
                  className="w-full rounded-full py-4 font-uiSans text-base font-semibold text-white active:scale-[0.98] transition-all"
                  style={{
                    background: "var(--btn-primary-bg)",
                    boxShadow: "var(--btn-primary-shadow)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--btn-primary-hover-bg)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--btn-primary-shadow-hover)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--btn-primary-bg)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--btn-primary-shadow)";
                  }}
                >
                  Zobrazit výsledek →
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="h-0 md:h-8 lg:h-10" />

        {/* Inputs + Results */}
        <div className="mx-auto max-w-7xl px-4 pt-0 pb-8 md:px-6 lg:pt-4 lg:pb-8">
          <div className="md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:gap-8">
            {/* Left: Inputs */}
            <div id="nastaveni" className="space-y-6">
              <section
                className="space-y-0 mb-0 rounded-none border-none shadow-none md:mb-0 md:mx-0 md:rounded-[24px] md:border-0 md:bg-white md:shadow-[var(--shadow-card)] md:overflow-hidden"
              >
                <div className="px-0 py-4 md:p-8 space-y-6">
                  <h2 className="section-title mb-0">
                    Investiční byt, který zvažujete
                  </h2>
                  <InvesticeBasicInputs
                    state={state}
                    updateState={updateState}
                    animatingFields={animatingFields}
                  />
                </div>

                <div className="px-0 pb-2 md:px-8 md:pb-8 md:bg-white">
                  <InvesticeUncertaintyInputs state={state} updateState={updateState} />
                  <InvesticeAdvancedInputs state={state} updateState={updateState} />
                </div>
              </section>
            </div>

            {/* Right: Results (Desktop sticky) */}
            <div id="vysledek-desktop" className="hidden md:block">
              <div className="sticky top-24">
                <InvesticeResultsPanel
                  state={state}
                  calculationResults={calculationResults}
                  copyShareUrl={copyShareUrl}
                  netWorthA={netWorthAArray}
                  netWorthB={netWorthBArray}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BAND C: Results ===== */}
      <div className="bg-[#F5F6F8]">
        {/* Mobile Results */}
        <div id="vysledek" className="md:hidden">
          <InvesticeResultsPanel
            state={state}
            calculationResults={calculationResults}
            copyShareUrl={copyShareUrl}
            netWorthA={netWorthAArray}
            netWorthB={netWorthBArray}
          />
        </div>

        {/* Net Worth Chart */}
        {calculationResults && (
          <div className="mx-auto max-w-7xl px-4 md:px-6 pt-2 pb-6">
            <NetWorthChart
              netWorthA={netWorthAArray}
              netWorthB={netWorthBArray}
              labelA="Investiční byt"
              labelB="Akciový fond"
            />
          </div>
        )}

        {/* Yearly Overview */}
        <div className="hidden lg:block px-4 md:px-6 lg:pb-12">
          <InvesticeYearlyTable rows={yearlyRows} />
        </div>
        <div className="block lg:hidden mx-auto max-w-7xl px-4 md:px-6 py-8">
          <InvesticeYearlyBreakdownMobile rows={yearlyRows} />
        </div>
      </div>
    </main>
  );
}
