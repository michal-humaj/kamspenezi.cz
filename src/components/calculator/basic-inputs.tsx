"use client";

import { LabeledSliderInput } from "./labeled-slider-input";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";
import {
  formatMillionsCzk,
  parseMillionsCzk,
  formatCzk,
  parseCzk,
  formatPercent,
  parsePercent,
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
  step: 1,
} as const;

const INTEREST_RATE_RANGE = {
  min: 0,
  max: 10,
  step: 0.1,
} as const;

const RENT_RANGE = {
  min: 0,
  max: 100_000,
  step: 1_000,
} as const;

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  animatingFields?: Set<string>;
}

export function BasicInputs({ state, updateState, animatingFields = new Set() }: BasicInputsProps) {
  return (
    <div className="space-y-6">
      {/* 1. Kupní cena nemovitosti (in millions) */}
      <LabeledSliderInput
        id="kupni-cena"
        label="Kupní cena nemovitosti"
        description="Celková cena bytu, který chceš koupit"
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
        description="Kolik procent kupní ceny máš našetřeno"
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
        description="Roční úroková sazba hypotéky"
        value={state.urokovaSazba}
        onChange={(value) => updateState({ urokovaSazba: value })}
        unit="percent"
        min={INTEREST_RATE_RANGE.min}
        max={INTEREST_RATE_RANGE.max}
        step={INTEREST_RATE_RANGE.step}
        formatter={formatPercent}
        parser={parsePercent}
        inputMode="decimal"
      />

      {/* 4. Nájemné */}
      <LabeledSliderInput
        id="najemne"
        label="Nájemné"
        description="Měsíční nájem za podobný byt"
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
    </div>
  );
}
