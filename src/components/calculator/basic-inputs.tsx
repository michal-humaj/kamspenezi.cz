"use client";

import { useState, useEffect } from "react";
import { InputWithSuffix } from "./input-with-suffix";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseNumber(value: string): number {
  const cleanValue = value.replace(/\s/g, "");
  return cleanValue === "" ? 0 : Number(cleanValue);
}

export function BasicInputs({ state, updateState }: BasicInputsProps) {
  // Track which fields are animating
  const [animatingFields, setAnimatingFields] = useState<Set<string>>(new Set());

  // Trigger animation when kupniCena or najemne change from outside
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatingFields(new Set());
    }, 300);
    return () => clearTimeout(timer);
  }, [state.kupniCena, state.najemne]);

  const triggerAnimation = (field: string) => {
    setAnimatingFields(prev => new Set(prev).add(field));
    setTimeout(() => {
      setAnimatingFields(prev => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }, 300);
  };

  return (
    <div className="space-y-5">
      {/* 1. Kupní cena nemovitosti */}
      <InputWithSuffix
        id="kupni-cena"
        label="Kupní cena nemovitosti"
        value={formatNumber(state.kupniCena)}
        suffix="Kč"
        helperText="Celková cena bytu, který chceš koupit"
        type="text"
        inputMode="numeric"
        pattern="[0-9 ]*"
        onChange={(value) => {
          const numValue = parseNumber(value);
          if (!isNaN(numValue)) {
            updateState({ kupniCena: numValue });
          }
        }}
        isAnimating={animatingFields.has("kupniCena")}
      />

      {/* 2. Vlastní zdroje */}
      <InputWithSuffix
        id="vlastni-zdroje"
        label="Vlastní zdroje (%)"
        value={state.vlastniZdroje}
        suffix="%"
        helperText="Kolik procent kupní ceny máš našetřeno"
        type="text"
        inputMode="decimal"
        onChange={(value) => updateState({ vlastniZdroje: Number(value) })}
      />

      {/* 3. Úroková sazba hypotéky */}
      <InputWithSuffix
        id="urokova-sazba"
        label="Úroková sazba hypotéky (% p.a.)"
        value={state.urokovaSazba}
        suffix="%"
        helperText="Roční úroková sazba hypotéky"
        type="text"
        inputMode="decimal"
        onChange={(value) => updateState({ urokovaSazba: Number(value) })}
      />

      {/* 4. Nájemné */}
      <InputWithSuffix
        id="najemne"
        label="Nájemné (Kč / měsíc)"
        value={formatNumber(state.najemne)}
        suffix="Kč"
        helperText="Měsíční nájem za podobný byt"
        type="text"
        inputMode="numeric"
        pattern="[0-9 ]*"
        onChange={(value) => {
          const numValue = parseNumber(value);
          if (!isNaN(numValue)) {
            updateState({ najemne: numValue });
          }
        }}
        isAnimating={animatingFields.has("najemne")}
      />

      {/* 5. Očekávaný výnos ETF */}
      <InputWithSuffix
        id="etf-vynos"
        label="Očekávaný výnos ETF (% p.a.)"
        value={state.etfVynos}
        suffix="%"
        helperText="Průměrný roční výnos investice do ETF"
        type="text"
        inputMode="decimal"
        onChange={(value) => updateState({ etfVynos: Number(value) })}
      />
    </div>
  );
}
