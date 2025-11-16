"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { InputWithSuffix } from "./input-with-suffix";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface AdvancedInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

function formatNumber(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseNumber(value: string): number {
  if (!value || value.trim() === "") return 0;
  const cleanValue = value.replace(/\s/g, "").replace(/,/g, ".");
  const parsed = Number(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

function formatDecimal(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  return value.toString().replace(".", ",");
}

function parseDecimal(value: string): number {
  if (!value || value.trim() === "") return 0;
  const cleanValue = value.replace(/,/g, ".");
  const parsed = Number(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

function sanitizeNumericInput(value: string): string {
  return value.replace(/[^\d\s]/g, "");
}

function sanitizeDecimalInput(value: string): string {
  let sanitized = value.replace(/[^\d,\.]/g, "");
  sanitized = sanitized.replace(/\./g, ",");
  const parts = sanitized.split(",");
  if (parts.length > 2) {
    sanitized = parts[0] + "," + parts.slice(1).join("");
  }
  return sanitized;
}

export function AdvancedInputs({ state, updateState }: AdvancedInputsProps) {
  const [localValues, setLocalValues] = React.useState<Record<string, string>>({});
  const debounceTimers = React.useRef<Record<string, NodeJS.Timeout>>({});
  
  const getDisplayValue = (key: string, stateValue: number, formatter: (v: number) => string) => {
    return localValues[key] !== undefined ? localValues[key] : formatter(stateValue);
  };
  
  const handleChange = React.useCallback((key: string, value: string, isDecimal: boolean, updater: (v: number) => void) => {
    const sanitized = isDecimal ? sanitizeDecimalInput(value) : sanitizeNumericInput(value);
    setLocalValues(prev => ({ ...prev, [key]: sanitized }));
    
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    
    debounceTimers.current[key] = setTimeout(() => {
      const parser = isDecimal ? parseDecimal : parseNumber;
      const parsed = parser(sanitized);
      updater(parsed);
    }, 500);
  }, []);
  
  const handleBlur = (key: string, parser: (v: string) => number, updater: (v: number) => void) => {
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
      delete debounceTimers.current[key];
    }
    
    if (localValues[key] === undefined) {
      return;
    }
    
    const parsed = parser(localValues[key]);
    updater(parsed);
    setLocalValues(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };
  
  React.useEffect(() => {
    const timers = debounceTimers;
    return () => {
      Object.values(timers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="advanced"
        className="-mx-4 rounded-none border-none bg-[var(--bg-lilac-section)] p-4 py-6 shadow-none transition-all md:mx-0 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-4 md:py-4 md:shadow-[var(--shadow-card)]"
      >
        <AccordionTrigger 
          className="!p-0 hover:no-underline [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden"
        >
          <div className="calc-collapse-header w-full">
            <span className="calc-collapse-header-title">Rozšířené předpoklady</span>
            <ChevronDown className="chevron h-5 w-5 shrink-0 transition-transform duration-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 px-4 pb-5 pt-4 md:px-0 md:pb-0 md:pt-4">
          <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
            Vše je předvyplněné realistickými hodnotami, měnit je nemusíš.
          </p>

          {/* 1. Příspěvek od rodičů */}
          <InputWithSuffix
            id="prispevek-rodicu"
            label="Příspěvek od rodičů na koupi nemovitosti"
            value={getDisplayValue("prispevekRodicu", state.prispevekRodicu, formatNumber)}
            suffix="Kč"
            helperText="Jednorázový finanční dar od rodičů (pouze při koupi bytu)"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => handleChange("prispevekRodicu", value, false, (v) => updateState({ prispevekRodicu: v }))}
            onBlur={() => handleBlur("prispevekRodicu", parseNumber, (v) => updateState({ prispevekRodicu: v }))}
          />

          {/* 2. Zařízení nemovitosti */}
          <InputWithSuffix
            id="zarizeni"
            label="Zařízení nemovitosti"
            value={getDisplayValue("zarizeniNemovitosti", state.zarizeniNemovitosti, formatNumber)}
            suffix="Kč"
            helperText="Náklady na nábytek a vybavení bytu (jednorázově)"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => handleChange("zarizeniNemovitosti", value, false, (v) => updateState({ zarizeniNemovitosti: v }))}
            onBlur={() => handleBlur("zarizeniNemovitosti", parseNumber, (v) => updateState({ zarizeniNemovitosti: v }))}
          />

          {/* 3. Fond oprav */}
          <InputWithSuffix
            id="fond-oprav"
            label="Fond oprav (Kč / měsíc)"
            value={getDisplayValue("fondOprav", state.fondOprav, formatNumber)}
            suffix="Kč"
            helperText="Měsíční příspěvek do fondu oprav domu"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => handleChange("fondOprav", value, false, (v) => updateState({ fondOprav: v }))}
            onBlur={() => handleBlur("fondOprav", parseNumber, (v) => updateState({ fondOprav: v }))}
          />

          {/* 4. Pojištění nemovitosti */}
          <InputWithSuffix
            id="pojisteni"
            label="Pojištění nemovitosti (Kč / rok)"
            value={getDisplayValue("pojisteniNemovitosti", state.pojisteniNemovitosti, formatNumber)}
            suffix="Kč"
            helperText="Roční náklady na pojištění bytu"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => handleChange("pojisteniNemovitosti", value, false, (v) => updateState({ pojisteniNemovitosti: v }))}
            onBlur={() => handleBlur("pojisteniNemovitosti", parseNumber, (v) => updateState({ pojisteniNemovitosti: v }))}
          />

          {/* 5. Daň z nemovitosti */}
          <InputWithSuffix
            id="dan"
            label="Daň z nemovitosti (Kč / rok)"
            value={getDisplayValue("danZNemovitosti", state.danZNemovitosti, formatNumber)}
            suffix="Kč"
            helperText="Roční daň z nemovitosti"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => handleChange("danZNemovitosti", value, false, (v) => updateState({ danZNemovitosti: v }))}
            onBlur={() => handleBlur("danZNemovitosti", parseNumber, (v) => updateState({ danZNemovitosti: v }))}
          />

          {/* 6. Náklady na údržbu */}
          <InputWithSuffix
            id="naklady-udrzba"
            label="Náklady na údržbu (% z hodnoty / rok)"
            value={getDisplayValue("nakladyUdrzba", state.nakladyUdrzba, formatDecimal)}
            suffix="%"
            helperText="Roční náklady na údržbu jako procento z hodnoty bytu"
            type="text"
            inputMode="decimal"
            onChange={(value) => handleChange("nakladyUdrzba", value, true, (v) => updateState({ nakladyUdrzba: v }))}
            onBlur={() => handleBlur("nakladyUdrzba", parseDecimal, (v) => updateState({ nakladyUdrzba: v }))}
          />

          {/* 7. Očekávaná inflace nákladů */}
          <InputWithSuffix
            id="inflace"
            label="Očekávaná inflace nákladů (% p.a.)"
            value={getDisplayValue("ocekavanaInflace", state.ocekavanaInflace, formatDecimal)}
            suffix="%"
            helperText="Roční růst nákladů (pojištění, údržba, atd.)"
            type="text"
            inputMode="decimal"
            onChange={(value) => handleChange("ocekavanaInflace", value, true, (v) => updateState({ ocekavanaInflace: v }))}
            onBlur={() => handleBlur("ocekavanaInflace", parseDecimal, (v) => updateState({ ocekavanaInflace: v }))}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
