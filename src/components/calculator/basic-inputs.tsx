"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

// Format number with spaces as thousand separators
function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Parse formatted number back to plain number
function parseFormattedNumber(value: string): number {
  return Number(value.replace(/\s/g, ""));
}

export function BasicInputs({ state, updateState }: BasicInputsProps) {
  return (
    <div className="space-y-5">
      {/* 1. Kupní cena nemovitosti - CRITICAL */}
      <div className="space-y-2">
        <Label htmlFor="kupni-cena" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Kupní cena nemovitosti (Kč)
        </Label>
        <Input
          id="kupni-cena"
          type="text"
          value={formatNumber(state.kupniCena)}
          onChange={(e) => {
            const parsed = parseFormattedNumber(e.target.value);
            if (!isNaN(parsed)) {
              updateState({ kupniCena: parsed });
            }
          }}
          onBlur={(e) => {
            // Re-format on blur
            e.target.value = formatNumber(state.kupniCena);
          }}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Celková cena bytu, který chceš koupit
        </p>
      </div>

      {/* 2. Vlastní zdroje - CRITICAL */}
      <div className="space-y-2">
        <Label htmlFor="vlastni-zdroje" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Vlastní zdroje (%)
        </Label>
        <Input
          id="vlastni-zdroje"
          type="number"
          value={state.vlastniZdroje}
          onChange={(e) => updateState({ vlastniZdroje: Number(e.target.value) })}
          className="font-uiSans text-base"
          min={0}
          max={100}
          step={1}
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Kolik procent kupní ceny máš našetřeno
        </p>
      </div>

      {/* 3. Úroková sazba hypotéky - CRITICAL */}
      <div className="space-y-2">
        <Label htmlFor="urokova-sazba" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Úroková sazba hypotéky (% p.a.)
        </Label>
        <Input
          id="urokova-sazba"
          type="number"
          step="0.1"
          value={state.urokovaSazba}
          onChange={(e) => updateState({ urokovaSazba: Number(e.target.value) })}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Roční úroková sazba hypotéky
        </p>
      </div>

      {/* 4. Nájemné - CRITICAL */}
      <div className="space-y-2">
        <Label htmlFor="najemne" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Nájemné (Kč / měsíc)
        </Label>
        <Input
          id="najemne"
          type="text"
          value={formatNumber(state.najemne)}
          onChange={(e) => {
            const parsed = parseFormattedNumber(e.target.value);
            if (!isNaN(parsed)) {
              updateState({ najemne: parsed });
            }
          }}
          onBlur={(e) => {
            // Re-format on blur
            e.target.value = formatNumber(state.najemne);
          }}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Měsíční nájem za podobný byt
        </p>
      </div>

      {/* 5. Očekávaný výnos ETF */}
      <div className="space-y-2">
        <Label htmlFor="etf-vynos" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Očekávaný výnos ETF (% p.a.)
        </Label>
        <Input
          id="etf-vynos"
          type="number"
          step="0.1"
          value={state.etfVynos}
          onChange={(e) => updateState({ etfVynos: Number(e.target.value) })}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Průměrný roční výnos investice do ETF
        </p>
      </div>
    </div>
  );
}
