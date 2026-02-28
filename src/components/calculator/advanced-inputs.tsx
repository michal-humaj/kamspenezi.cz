"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LabeledSliderInput } from "./labeled-slider-input";
import type { CalculatorState } from "@/app/page";
import {
  formatCzk,
  parseCzk,
  formatPercent,
  parsePercent,
} from "@/lib/format";

// Input ranges and steps
const PARENT_CONTRIBUTION_RANGE = {
  min: 0,
  max: 5_000_000,
  step: 50_000,
} as const;

const FURNITURE_RANGE = {
  min: 0,
  max: 1_000_000,
  step: 10_000,
} as const;

const REPAIR_FUND_RANGE = {
  min: 0,
  max: 10_000,
  step: 100,
} as const;

const INSURANCE_RANGE = {
  min: 0,
  max: 50_000,
  step: 1_000,
} as const;

const PROPERTY_TAX_RANGE = {
  min: 0,
  max: 20_000,
  step: 500,
} as const;

const MAINTENANCE_RANGE = {
  min: 0,
  max: 80_000,
  step: 1_000,
} as const;

const INFLATION_RANGE = {
  min: 0,
  max: 10,
  step: 0.1,
} as const;

interface AdvancedInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

export function AdvancedInputs({ state, updateState }: AdvancedInputsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="advanced"
        className="border-t border-gray-100 pt-6 mt-6 lg:mt-4 transition-all"
      >
        <AccordionTrigger 
          className="group flex items-center justify-between py-3 hover:no-underline transition-colors outline-none focus:outline-none focus:text-[var(--color-primary)]"
        >
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-kp-text-main group-hover:text-[var(--color-primary)]">
              Poplatky a náklady
            </span>
            <span className="text-sm text-gray-500 font-normal mt-0.5">
              Předvyplněno realistickými hodnotami. Upravte jen pokud víte lépe.
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-6 pb-6 pt-4">

          {/* 1. Příspěvek od rodičů */}
          <LabeledSliderInput
            id="prispevek-rodicu"
            label="Příspěvek od rodičů"
            description="Jednorázový dar (pouze při koupi)"
            value={state.prispevekRodicu}
            onChange={(value) => updateState({ prispevekRodicu: value })}
            unit="kc"
            min={PARENT_CONTRIBUTION_RANGE.min}
            max={PARENT_CONTRIBUTION_RANGE.max}
            step={PARENT_CONTRIBUTION_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 2. Vybavení bytu */}
          <LabeledSliderInput
            id="zarizeni"
            label="Vybavení bytu"
            description="Jednorázové náklady na zařízení"
            value={state.zarizeniNemovitosti}
            onChange={(value) => updateState({ zarizeniNemovitosti: value })}
            unit="kc"
            min={FURNITURE_RANGE.min}
            max={FURNITURE_RANGE.max}
            step={FURNITURE_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 3. Fond oprav */}
          <LabeledSliderInput
            id="fond-oprav"
            label="Fond oprav"
            description="Měsíčně (bez služeb)"
            tooltip={
              <div className="space-y-2">
                <p className="font-medium">Příspěvek do SVJ dle stavu domu:</p>
                <ul className="space-y-1 text-xs">
                  <li><span className="font-medium">Novostavba (0–5 let):</span> 10–20 Kč/m²</li>
                  <li><span className="font-medium">Středně starý (5–20 let):</span> 20–30 Kč/m²</li>
                  <li><span className="font-medium">Starší dům (20+ let):</span> 30–45 Kč/m²</li>
                </ul>
                <p className="text-xs text-gray-500 pt-1 border-t border-gray-100">
                  Výchozí hodnota počítá s 22 Kč/m² (typický starší byt). Nezahrnuje služby jako voda, teplo, odpad.
                </p>
              </div>
            }
            value={state.fondOprav}
            onChange={(value) => updateState({ fondOprav: value })}
            unit="custom"
            customUnitLabel="Kč / měsíc"
            min={REPAIR_FUND_RANGE.min}
            max={REPAIR_FUND_RANGE.max}
            step={REPAIR_FUND_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 4. Pojištění bytu */}
          <LabeledSliderInput
            id="pojisteni"
            label="Pojištění bytu"
            description="Ročně"
            value={state.pojisteniNemovitosti}
            onChange={(value) => updateState({ pojisteniNemovitosti: value })}
            unit="custom"
            customUnitLabel="Kč / rok"
            min={INSURANCE_RANGE.min}
            max={INSURANCE_RANGE.max}
            step={INSURANCE_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 5. Daň z nemovitosti */}
          <LabeledSliderInput
            id="dan"
            label="Daň z nemovitosti"
            description="Ročně"
            value={state.danZNemovitosti}
            onChange={(value) => updateState({ danZNemovitosti: value })}
            unit="custom"
            customUnitLabel="Kč / rok"
            min={PROPERTY_TAX_RANGE.min}
            max={PROPERTY_TAX_RANGE.max}
            step={PROPERTY_TAX_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 6. Náklady na údržbu */}
          <LabeledSliderInput
            id="naklady-udrzba"
            label="Náklady na údržbu"
            description="Malování, podlahy, koupelna, kuchyň, drobné opravy. Ročně."
            tooltip={
              <div className="space-y-2">
                <p><strong>Co zahrnuje:</strong> Interiérové náklady vlastníka – malování, obnova podlah, koupelny, kuchyně a drobné opravy.</p>
                <p><strong>Co nezahrnuje:</strong> Společné části domu (střecha, fasáda, výtah) – ty jsou ve fondu oprav. Spotřebiče a nábytek (ty musí kupovat i nájemník).</p>
                <p className="text-emerald-700 font-medium">💡 Nový byt nebo po rekonstrukci? Snižte na 30–35 % výchozí hodnoty: menší byty ~4–5 tis. Kč/rok, větší ~6–9 tis. Kč/rok.</p>
              </div>
            }
            value={state.nakladyUdrzba}
            onChange={(value) => updateState({ nakladyUdrzba: value })}
            unit="custom"
            customUnitLabel="Kč / rok"
            min={MAINTENANCE_RANGE.min}
            max={MAINTENANCE_RANGE.max}
            step={MAINTENANCE_RANGE.step}
            formatter={formatCzk}
            parser={parseCzk}
            inputMode="numeric"
          />

          {/* 7. Růst nákladů */}
          <LabeledSliderInput
            id="inflace"
            label="Inflace nákladů (ročně)"
            description="Údržba, pojištění, fond oprav"
            value={state.ocekavanaInflace}
            onChange={(value) => updateState({ ocekavanaInflace: value })}
            unit="percent"
            min={INFLATION_RANGE.min}
            max={INFLATION_RANGE.max}
            step={INFLATION_RANGE.step}
            formatter={formatPercent}
            parser={parsePercent}
            inputMode="decimal"
          />

          {/* 8. Sazba daně z příjmu */}
          <div className="space-y-2">
            <label className="font-uiSans text-sm font-medium text-slate-900">
              Sazba daně z příjmu
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => updateState({ pasmoDane: 15 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  state.pasmoDane === 15
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                15 %
              </button>
              <button
                type="button"
                onClick={() => updateState({ pasmoDane: 23 })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  state.pasmoDane === 23
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                23 %
              </button>
            </div>
            <p className="font-uiSans text-xs text-slate-400 mt-1">
              15 % pro příjmy do 36× průměrné mzdy, 23 % nad touto hranicí
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
