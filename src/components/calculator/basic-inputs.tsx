"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

export function BasicInputs({ state, updateState }: BasicInputsProps) {
  return (
    <div className="space-y-5">
      {/* Kupní cena nemovitosti */}
      <div className="space-y-2">
        <Label htmlFor="kupni-cena" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Kupní cena nemovitosti (Kč)
        </Label>
        <Input
          id="kupni-cena"
          type="number"
          value={state.kupniCena}
          onChange={(e) => updateState({ kupniCena: Number(e.target.value) })}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Celková cena bytu, který chceš koupit
        </p>
      </div>

      {/* Vlastní zdroje */}
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
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Kolik procent kupní ceny máš našetřeno
        </p>
      </div>

      {/* Úroková sazba hypotéky */}
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

      {/* Nájemné */}
      <div className="space-y-2">
        <Label htmlFor="najemne" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
          Nájemné (Kč / měsíc)
        </Label>
        <Input
          id="najemne"
          type="number"
          value={state.najemne}
          onChange={(e) => updateState({ najemne: Number(e.target.value) })}
          className="font-uiSans text-base"
        />
        <p className="font-uiSans text-xs text-[var(--color-secondary)]">
          Měsíční nájem za podobný byt
        </p>
      </div>

      {/* Očekávaný výnos ETF */}
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

