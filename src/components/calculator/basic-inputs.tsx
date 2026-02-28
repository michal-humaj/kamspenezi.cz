"use client";

import { LabeledSliderInput } from "./labeled-slider-input";
import type { CalculatorState } from "@/app/page";
import {
  formatMillionsCzk,
  parseMillionsCzk,
  formatCzk,
  parseCzk,
  formatPercent,
  parsePercent,
  formatCashShort,
} from "@/lib/format";

// Input ranges and steps
const PURCHASE_PRICE_RANGE = {
  min: 1_000_000,
  max: 30_000_000,
  step: 100_000,
} as const;

const OWN_FUNDS_RANGE = {
  min: 0,
  max: 100,
  step: 5,
} as const;

const INTEREST_RATE_RANGE = {
  min: 1,
  max: 9,
  step: 0.1,
} as const;

const RENT_RANGE = {
  min: 3_000,
  max: 90_000,
  step: 1_000,
} as const;

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  animatingFields?: Set<string>;
}

export function BasicInputs({ state, updateState, animatingFields = new Set() }: BasicInputsProps) {
  // Calculations for Smart Values
  const downPaymentCzk = state.kupniCena * (state.vlastniZdroje / 100);
  
  // Mortgage Payment Calculation (30 years fixed)
  const loanAmount = state.kupniCena - downPaymentCzk;
  const monthlyRate = (state.urokovaSazbaHypoteky / 100) / 12;
  const numPayments = 30 * 12;
  
  let monthlyPayment = 0;
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numPayments;
    } else {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Scenario A */}
      <div className="mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-700" />
          <span className="text-base font-semibold text-slate-900">Scénář A: Vlastní bydlení na hypotéku</span>
        </div>
        <p className="text-sm text-slate-500 mt-1 ml-4 mb-6">
          Koupíte byt. Vložíte vlastní zdroje a zbytek splácíte bance. Po 30 letech vlastníte nemovitost bez dluhů.
        </p>
      </div>

      {/* 1. Kupní cena nemovitosti (in millions) */}
      <LabeledSliderInput
        id="kupni-cena"
        label="Kupní cena nemovitosti"
        value={state.kupniCena}
        onChange={(value) => updateState({ kupniCena: value })}
        unit="custom"
        customUnitLabel="mil. Kč"
        min={PURCHASE_PRICE_RANGE.min}
        max={PURCHASE_PRICE_RANGE.max}
        step={PURCHASE_PRICE_RANGE.step}
        formatter={formatMillionsCzk}
        parser={parseMillionsCzk}
        inputMode="decimal"
        isAnimating={animatingFields.has("kupniCena")}
      />

      {/* 2. Vlastní zdroje */}
      <LabeledSliderInput
        id="vlastni-zdroje"
        label="Vlastní zdroje"
        extraLabel={
          <span className="mt-1 font-uiSans text-[13px] font-medium tabular-nums text-gray-600">
            Hotovost: {formatCashShort(downPaymentCzk)}
          </span>
        }
        value={state.vlastniZdroje}
        onChange={(value) => updateState({ vlastniZdroje: value })}
        unit="percent"
        min={OWN_FUNDS_RANGE.min}
        max={OWN_FUNDS_RANGE.max}
        step={OWN_FUNDS_RANGE.step}
        formatter={formatPercent}
        parser={parsePercent}
        inputMode="decimal"
      />

      {/* 3. Úroková sazba hypotéky */}
      <LabeledSliderInput
        id="urokova-sazba"
        label="Úroková sazba hypotéky"
        description="Během prvních 5 let fixace"
        extraLabel={
          <span className="mt-1 font-uiSans text-[13px] font-medium tabular-nums text-gray-600">
            Splátka: {formatCzk(Math.round(monthlyPayment))} Kč / měsíc
          </span>
        }
        value={state.urokovaSazbaHypoteky}
        onChange={(value) => updateState({ urokovaSazbaHypoteky: value })}
        unit="percent"
        min={INTEREST_RATE_RANGE.min}
        max={INTEREST_RATE_RANGE.max}
        step={INTEREST_RATE_RANGE.step}
        formatter={formatPercent}
        parser={parsePercent}
        inputMode="decimal"
      />

      {/* Divider */}
      <div className="mt-8 pt-6 mb-6 border-t border-slate-100">
        {/* Header Scenario B */}
        <div className="mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--scenario-b-dot)' }} />
            <span className="text-base font-semibold text-slate-900">Scénář B: Bydlení v nájmu a investování</span>
          </div>
          <p className="text-sm text-slate-500 mt-1 ml-4 mb-6">
            Bydlíte v nájmu. Ušetřené vlastní zdroje i rozdíl v měsíčních platbách investujete. Po 30 letech máte vybudované investiční portfolio.
          </p>
        </div>
      </div>

      {/* 4. Nájemné */}
      <LabeledSliderInput
        id="najemne"
        label="Nájemné"
        description="Za kolik byste si pronajali podobný byt dnes?"
        value={state.najemne}
        onChange={(value) => updateState({ najemne: value })}
        unit="custom"
        customUnitLabel="Kč / měsíc"
        min={RENT_RANGE.min}
        max={RENT_RANGE.max}
        step={RENT_RANGE.step}
        formatter={formatCzk}
        parser={parseCzk}
        inputMode="numeric"
        isAnimating={animatingFields.has("najemne")}
      />

      {/* 5. Výnos investic */}
      <LabeledSliderInput
        id="investice-expected"
        label="Výnos investic (ročně)"
        description="Očekávaný roční výnos investičního portfolia"
        value={state.vynosInvesticeExpected}
        onChange={(v) => updateState({ vynosInvesticeExpected: v })}
        unit="percent"
        min={0}
        max={15}
        step={0.1}
        formatter={formatPercent}
        parser={parsePercent}
        inputMode="decimal"
      />

      {/* Mobile CTA Button */}
      <div className="md:hidden mt-8 pb-2">
        <button
          type="button"
          onClick={() => {
            document.getElementById("vysledek")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full rounded-full bg-gray-900 hover:bg-gray-800 py-4 font-uiSans text-base font-bold text-white shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all"
        >
          Zobrazit výsledek →
        </button>
      </div>
    </div>
  );
}
