"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { LabeledSliderInput } from "./labeled-slider-input";
import { formatPercent, parsePercent } from "@/lib/format";
import type { CalculatorState } from "@/app/page";

interface UncertaintyInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  resultsMode: "realistic" | "fixed";
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

// Component for triple input with units (realistic mode)
function TripleInput({
  label,
  unit,
  minId,
  minValue,
  expectedId,
  expectedValue,
  maxId,
  maxValue,
  onMinChange,
  onExpectedChange,
  onMaxChange,
}: {
  label: string;
  unit: string;
  minId: string;
  minValue: number;
  expectedId: string;
  expectedValue: number;
  maxId: string;
  maxValue: number;
  onMinChange: (value: number) => void;
  onExpectedChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}) {
  const [localMin, setLocalMin] = React.useState<string | null>(null);
  const [localExpected, setLocalExpected] = React.useState<string | null>(null);
  const [localMax, setLocalMax] = React.useState<string | null>(null);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const length = input.value.length;
    setTimeout(() => {
      input.setSelectionRange(length, length);
    }, 0);
  };
  
  const sanitizeDecimal = (value: string): string => {
    let sanitized = value.replace(/[^\d,\.]/g, "");
    sanitized = sanitized.replace(/\./g, ",");
    const parts = sanitized.split(",");
    if (parts.length > 2) {
      sanitized = parts[0] + "," + parts.slice(1).join("");
    }
    return sanitized;
  };
  
  return (
    <div className="space-y-2">
      <Label className="font-uiSans text-base font-medium text-[var(--color-primary)]">
        {label}
      </Label>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor={minId} className="mb-1 block font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            Pesimisticky
          </Label>
          <div className="relative">
            <input
              id={minId}
              type="text"
              inputMode="decimal"
              value={localMin !== null ? localMin : formatDecimal(minValue)}
              onChange={(e) => setLocalMin(sanitizeDecimal(e.target.value))}
              onBlur={() => {
                if (localMin !== null) {
                  onMinChange(parseDecimal(localMin));
                }
                setLocalMin(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
            />
            <span className="calc-input-unit text-xs">
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={expectedId} className="mb-1 block font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            Očekávaně
          </Label>
          <div className="relative">
            <input
              id={expectedId}
              type="text"
              inputMode="decimal"
              value={localExpected !== null ? localExpected : formatDecimal(expectedValue)}
              onChange={(e) => setLocalExpected(sanitizeDecimal(e.target.value))}
              onBlur={() => {
                if (localExpected !== null) {
                  onExpectedChange(parseDecimal(localExpected));
                }
                setLocalExpected(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
            />
            <span className="calc-input-unit text-xs">
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={maxId} className="mb-1 block font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            Optimisticky
          </Label>
          <div className="relative">
            <input
              id={maxId}
              type="text"
              inputMode="decimal"
              value={localMax !== null ? localMax : formatDecimal(maxValue)}
              onChange={(e) => setLocalMax(sanitizeDecimal(e.target.value))}
              onBlur={() => {
                if (localMax !== null) {
                  onMaxChange(parseDecimal(localMax));
                }
                setLocalMax(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
            />
            <span className="calc-input-unit text-xs">
              {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UncertaintyInputs({ state, updateState, resultsMode }: UncertaintyInputsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="uncertainty"
        className="border-t border-gray-100 pt-6 mt-6 lg:mt-4 transition-all"
      >
        <AccordionTrigger 
          className="group flex items-center justify-between py-3 hover:no-underline transition-colors outline-none focus:outline-none focus:text-[var(--color-primary)]"
        >
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-kp-text-main group-hover:text-[var(--color-primary)]">
              Klíčové tržní předpoklady
            </span>
            <span className="text-sm text-gray-500 font-normal mt-0.5">
              Největší vliv na výsledek. Předvyplněno podle dat.
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 pb-6 pt-4">

          {resultsMode === "realistic" ? (
            <>
              {/* 1. ETF výnos */}
              <TripleInput
                label="Výnos ETF v čase (% p.a.)"
                unit="%"
                minId="etf-min"
                minValue={state.etfVynosMin}
                expectedId="etf-expected"
                expectedValue={state.etfVynosExpected}
                maxId="etf-max"
                maxValue={state.etfVynosMax}
                onMinChange={(v) => updateState({ etfVynosMin: v })}
                onExpectedChange={(v) => updateState({ etfVynosExpected: v })}
                onMaxChange={(v) => updateState({ etfVynosMax: v })}
              />

              {/* 2. Růst hodnoty nemovitosti */}
              <TripleInput
                label="Růst hodnoty nemovitosti (% p.a.)"
                unit="%"
                minId="rust-hodnoty-min"
                minValue={state.rustHodnotyMin}
                expectedId="rust-hodnoty-expected"
                expectedValue={state.rustHodnotyExpected}
                maxId="rust-hodnoty-max"
                maxValue={state.rustHodnotyMax}
                onMinChange={(v) => updateState({ rustHodnotyMin: v })}
                onExpectedChange={(v) => updateState({ rustHodnotyExpected: v })}
                onMaxChange={(v) => updateState({ rustHodnotyMax: v })}
              />

              {/* 3. Růst nájemného */}
              <TripleInput
                label="Růst nájemného (% p.a.)"
                unit="%"
                minId="rust-najemneho-min"
                minValue={state.rustNajemnehoMin}
                expectedId="rust-najemneho-expected"
                expectedValue={state.rustNajemnehoExpected}
                maxId="rust-najemneho-max"
                maxValue={state.rustNajemnehoMax}
                onMinChange={(v) => updateState({ rustNajemnehoMin: v })}
                onExpectedChange={(v) => updateState({ rustNajemnehoExpected: v })}
                onMaxChange={(v) => updateState({ rustNajemnehoMax: v })}
              />

              {/* 4. Úroková sazba hypotéky v budoucnu */}
              <TripleInput
                label="Úroková sazba hypotéky (roky 6-30) (% p.a.)"
                unit="%"
                minId="sazba-min"
                minValue={state.urokovaSazbaMin}
                expectedId="sazba-expected"
                expectedValue={state.urokovaSazbaExpected}
                maxId="sazba-max"
                maxValue={state.urokovaSazbaMax}
                onMinChange={(v) => updateState({ urokovaSazbaMin: v })}
                onExpectedChange={(v) => updateState({ urokovaSazbaExpected: v })}
                onMaxChange={(v) => updateState({ urokovaSazbaMax: v })}
              />
            </>
          ) : (
            <>
              {/* Fixed mode: Show with sliders like basic inputs */}
              <LabeledSliderInput
                id="rust-hodnoty-expected"
                label="Zhodnocení nemovitosti (ročně)"
                description="Očekávaný roční růst ceny nemovitosti"
                value={state.rustHodnotyExpected}
                onChange={(v) => updateState({ rustHodnotyExpected: v })}
                unit="percent"
                min={-5}
                max={15}
                step={0.1}
                formatter={formatPercent}
                parser={parsePercent}
                inputMode="decimal"
              />

              <LabeledSliderInput
                id="etf-expected"
                label="Výnos ETF (ročně)"
                description="Očekávaný roční výnos investičního portfolia"
                value={state.etfVynosExpected}
                onChange={(v) => updateState({ etfVynosExpected: v })}
                unit="percent"
                min={0}
                max={20}
                step={0.1}
                formatter={formatPercent}
                parser={parsePercent}
                inputMode="decimal"
              />

              <LabeledSliderInput
                id="sazba-expected"
                label="Budoucí sazba hypotéky (od roku 6)"
                description="Očekávaná úroková sazba po skončení fixace"
                value={state.urokovaSazbaExpected}
                onChange={(v) => updateState({ urokovaSazbaExpected: v })}
                unit="percent"
                min={0}
                max={15}
                step={0.1}
                formatter={formatPercent}
                parser={parsePercent}
                inputMode="decimal"
              />

              <LabeledSliderInput
                id="rust-najemneho-expected"
                label="Růst nájemného (ročně)"
                description="Očekávaný roční růst nájemného"
                value={state.rustNajemnehoExpected}
                onChange={(v) => updateState({ rustNajemnehoExpected: v })}
                unit="percent"
                min={0}
                max={10}
                step={0.1}
                formatter={formatPercent}
                parser={parsePercent}
                inputMode="decimal"
              />
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
