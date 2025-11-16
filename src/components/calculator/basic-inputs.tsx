"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { InputWithSuffix } from "./input-with-suffix";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface BasicInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  animatingFields?: Set<string>;
}

function formatNumber(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseNumber(value: string): number {
  if (!value || value.trim() === "") return 0;
  // Remove spaces, replace comma/dot with dot for parsing
  const cleanValue = value.replace(/\s/g, "").replace(/,/g, ".");
  const parsed = Number(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

function formatDecimal(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return "0";
  // Use comma as decimal separator for Czech locale
  return value.toString().replace(".", ",");
}

function parseDecimal(value: string): number {
  if (!value || value.trim() === "") return 0;
  // Replace comma with dot for parsing
  const cleanValue = value.replace(/,/g, ".");
  const parsed = Number(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

// Validate and sanitize numeric input (integers with spaces)
function sanitizeNumericInput(value: string): string {
  // Allow only digits and spaces
  return value.replace(/[^\d\s]/g, "");
}

// Validate and sanitize decimal input (decimals with comma/dot)
function sanitizeDecimalInput(value: string): string {
  // Allow only digits, comma, and dot
  // Replace dot with comma for consistency
  let sanitized = value.replace(/[^\d,\.]/g, "");
  // Replace dot with comma
  sanitized = sanitized.replace(/\./g, ",");
  // Allow only one comma
  const parts = sanitized.split(",");
  if (parts.length > 2) {
    sanitized = parts[0] + "," + parts.slice(1).join("");
  }
  return sanitized;
}

export function BasicInputs({ state, updateState, animatingFields = new Set() }: BasicInputsProps) {
  // Local state for input values being edited
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  
  // Debounce timers
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  
  // Get display value - use local if editing, otherwise formatted state
  const getDisplayValue = (key: string, stateValue: number, formatter: (v: number) => string) => {
    return localValues[key] !== undefined ? localValues[key] : formatter(stateValue);
  };
  
  // Handle change with validation and debounced update
  const handleChange = useCallback((key: string, value: string, isDecimal: boolean, updater: (v: number) => void) => {
    // Sanitize input
    const sanitized = isDecimal ? sanitizeDecimalInput(value) : sanitizeNumericInput(value);
    
    // Update local state with sanitized value
    setLocalValues(prev => ({ ...prev, [key]: sanitized }));
    
    // Clear existing timer
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }
    
    // Set new debounced update (500ms)
    debounceTimers.current[key] = setTimeout(() => {
      const parser = isDecimal ? parseDecimal : parseNumber;
      const parsed = parser(sanitized);
      updater(parsed);
    }, 500);
  }, []);
  
  // Handle blur - parse and update immediately, clear local
  const handleBlur = (key: string, parser: (v: string) => number, updater: (v: number) => void) => {
    // Clear any pending debounce
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
      delete debounceTimers.current[key];
    }
    
    // If no local value, don't update (prevents resetting to 0)
    if (localValues[key] === undefined) {
      return;
    }
    
    const parsed = parser(localValues[key]);
    updater(parsed);
    
    // Clear local state
    setLocalValues(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };
  
  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="space-y-5">
      {/* 1. Kupní cena nemovitosti */}
      <InputWithSuffix
        id="kupni-cena"
        label="Kupní cena nemovitosti"
        value={getDisplayValue("kupniCena", state.kupniCena, formatNumber)}
        suffix="Kč"
        helperText="Celková cena bytu, který chceš koupit"
        type="text"
        inputMode="numeric"
        pattern="[0-9 ]*"
        onChange={(value) => handleChange("kupniCena", value, false, (v) => updateState({ kupniCena: v }))}
        onBlur={() => handleBlur("kupniCena", parseNumber, (v) => updateState({ kupniCena: v }))}
        isAnimating={animatingFields.has("kupniCena")}
      />

      {/* 2. Vlastní zdroje */}
      <InputWithSuffix
        id="vlastni-zdroje"
        label="Vlastní zdroje (%)"
        value={getDisplayValue("vlastniZdroje", state.vlastniZdroje, formatDecimal)}
        suffix="%"
        helperText="Kolik procent kupní ceny máš našetřeno"
        type="text"
        inputMode="decimal"
        onChange={(value) => handleChange("vlastniZdroje", value, true, (v) => updateState({ vlastniZdroje: v }))}
        onBlur={() => handleBlur("vlastniZdroje", parseDecimal, (v) => updateState({ vlastniZdroje: v }))}
      />

      {/* 3. Úroková sazba hypotéky */}
      <InputWithSuffix
        id="urokova-sazba"
        label="Úroková sazba hypotéky (% p.a.)"
        value={getDisplayValue("urokovaSazba", state.urokovaSazba, formatDecimal)}
        suffix="%"
        helperText="Roční úroková sazba hypotéky"
        type="text"
        inputMode="decimal"
        onChange={(value) => handleChange("urokovaSazba", value, true, (v) => updateState({ urokovaSazba: v }))}
        onBlur={() => handleBlur("urokovaSazba", parseDecimal, (v) => updateState({ urokovaSazba: v }))}
      />

      {/* 4. Nájemné */}
      <InputWithSuffix
        id="najemne"
        label="Nájemné (Kč / měsíc)"
        value={getDisplayValue("najemne", state.najemne, formatNumber)}
        suffix="Kč"
        helperText="Měsíční nájem za podobný byt"
        type="text"
        inputMode="numeric"
        pattern="[0-9 ]*"
        onChange={(value) => handleChange("najemne", value, false, (v) => updateState({ najemne: v }))}
        onBlur={() => handleBlur("najemne", parseNumber, (v) => updateState({ najemne: v }))}
        isAnimating={animatingFields.has("najemne")}
      />
    </div>
  );
}
