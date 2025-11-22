"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

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

// Component for single input in fixed mode
function SingleInput({
  label,
  unit,
  id,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const [localValue, setLocalValue] = React.useState<string | null>(null);
  
  const displayValue = localValue !== null ? localValue : formatDecimal(value);
  
  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
  };
  
  const handleBlur = () => {
    // If no local value, don't update (prevents resetting to 0)
    if (localValue === null) {
      return;
    }
    const parsed = parseDecimal(localValue);
    onChange(parsed);
    setLocalValue(null);
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const length = input.value.length;
    setTimeout(() => {
      input.setSelectionRange(length, length);
    }, 0);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="calc-input pr-16 text-right tabular-nums"
        />
        <span className="calc-input-unit">
          {unit}
        </span>
      </div>
    </div>
  );
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
  
  return (
    <div className="space-y-2">
      <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
        {label}
      </Label>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor={minId} className="font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            pesimisticky
          </Label>
          <div className="relative mt-1">
            <Input
              id={minId}
              type="text"
              inputMode="decimal"
              value={localMin !== null ? localMin : formatDecimal(minValue)}
              onChange={(e) => setLocalMin(e.target.value)}
              onBlur={() => {
                if (localMin !== null) {
                  onMinChange(parseDecimal(localMin));
                }
                setLocalMin(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
              style={{ fontSize: "16px" }}
            />
            <span className="calc-input-unit text-xs">
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={expectedId} className="font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            očekávaně
          </Label>
          <div className="relative mt-1">
            <Input
              id={expectedId}
              type="text"
              inputMode="decimal"
              value={localExpected !== null ? localExpected : formatDecimal(expectedValue)}
              onChange={(e) => setLocalExpected(e.target.value)}
              onBlur={() => {
                if (localExpected !== null) {
                  onExpectedChange(parseDecimal(localExpected));
                }
                setLocalExpected(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
              style={{ fontSize: "16px" }}
            />
            <span className="calc-input-unit text-xs">
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={maxId} className="font-uiSans text-xs font-medium text-[var(--color-secondary)]">
            optimisticky
          </Label>
          <div className="relative mt-1">
            <Input
              id={maxId}
              type="text"
              inputMode="decimal"
              value={localMax !== null ? localMax : formatDecimal(maxValue)}
              onChange={(e) => setLocalMax(e.target.value)}
              onBlur={() => {
                if (localMax !== null) {
                  onMaxChange(parseDecimal(localMax));
                }
                setLocalMax(null);
              }}
              onFocus={handleFocus}
              className="calc-input pr-10 text-right tabular-nums"
              style={{ fontSize: "16px" }}
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
        className="-mx-4 rounded-none border-none bg-[var(--bg-base)] p-4 py-6 shadow-none transition-all md:mx-0 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:p-4 md:py-4 md:shadow-[var(--shadow-card)]"
      >
        <AccordionTrigger 
          className="!p-0 hover:no-underline [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden"
        >
          <div className="calc-collapse-header w-full">
            <div className="flex items-center gap-3">
              <span className="calc-collapse-header-title">Nejistota vývoje v čase</span>
              <span 
                className="rounded-[var(--radius-pill)] px-3 py-1 font-uiSans text-xs font-medium whitespace-nowrap"
                style={{
                  background: "var(--bg-lilac-section)",
                  color: "var(--color-secondary)",
                }}
              >
                Pro pokročilé
              </span>
            </div>
            <ChevronDown className="chevron h-5 w-5 shrink-0 transition-transform duration-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 px-4 pb-5 pt-4 md:px-0 md:pb-0 md:pt-4">
          <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
            {resultsMode === "realistic" 
              ? "Nastav pesimistické, očekávané a optimistické hodnoty pro nejistotu v budoucnosti."
              : "Nastav očekávané hodnoty pro vývoj v čase."}
          </p>

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
                label="Úroková sazba hypotéky v budoucnu (% p.a.)"
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
              {/* Fixed mode: Show only expected values */}
              <SingleInput
                label="Výnos ETF v čase (% p.a.)"
                unit="%"
                id="etf-expected"
                value={state.etfVynosExpected}
                onChange={(v) => updateState({ etfVynosExpected: v })}
              />

              <SingleInput
                label="Růst hodnoty nemovitosti (% p.a.)"
                unit="%"
                id="rust-hodnoty-expected"
                value={state.rustHodnotyExpected}
                onChange={(v) => updateState({ rustHodnotyExpected: v })}
              />

              <SingleInput
                label="Růst nájemného (% p.a.)"
                unit="%"
                id="rust-najemneho-expected"
                value={state.rustNajemnehoExpected}
                onChange={(v) => updateState({ rustNajemnehoExpected: v })}
              />

              <SingleInput
                label="Úroková sazba hypotéky v budoucnu (% p.a.)"
                unit="%"
                id="sazba-expected"
                value={state.urokovaSazbaExpected}
                onChange={(v) => updateState({ urokovaSazbaExpected: v })}
              />
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
