"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface UncertaintyInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
  resultsMode: "realistic" | "fixed";
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
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="font-uiSans text-base pr-12 text-right tabular-nums"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center font-uiSans text-sm text-gray-400" style={{ lineHeight: '1' }}>
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
  return (
    <div className="space-y-2">
      <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
        {label}
      </Label>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor={minId} className="font-uiSans text-xs uppercase tracking-wide text-[var(--color-secondary)]">
            Pesimisticky
          </Label>
          <div className="relative mt-1">
            <Input
              id={minId}
              type="text"
              inputMode="decimal"
              value={minValue}
              onChange={(e) => onMinChange(Number(e.target.value))}
              className="font-uiSans text-base pr-9 text-right tabular-nums"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center font-uiSans text-xs text-gray-400" style={{ lineHeight: '1' }}>
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={expectedId} className="font-uiSans text-xs uppercase tracking-wide text-[var(--color-secondary)]">
            Očekávaně
          </Label>
          <div className="relative mt-1">
            <Input
              id={expectedId}
              type="text"
              inputMode="decimal"
              value={expectedValue}
              onChange={(e) => onExpectedChange(Number(e.target.value))}
              className="font-uiSans text-base pr-9 text-right tabular-nums"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center font-uiSans text-xs text-gray-400" style={{ lineHeight: '1' }}>
              {unit}
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor={maxId} className="font-uiSans text-xs uppercase tracking-wide text-[var(--color-secondary)]">
            Optimisticky
          </Label>
          <div className="relative mt-1">
            <Input
              id={maxId}
              type="text"
              inputMode="decimal"
              value={maxValue}
              onChange={(e) => onMaxChange(Number(e.target.value))}
              className="font-uiSans text-base pr-9 text-right tabular-nums"
            />
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center font-uiSans text-xs text-gray-400" style={{ lineHeight: '1' }}>
              {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UncertaintyInputs({ state, updateState, resultsMode }: UncertaintyInputsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Accordion type="single" collapsible onValueChange={(value) => setIsExpanded(value === "uncertainty")}>
      <AccordionItem
        value="uncertainty"
        className="rounded-none border-none bg-transparent p-0 shadow-none transition-all md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:bg-[var(--bg-card)] md:shadow-[var(--shadow-card)]"
        onMouseEnter={(e) => {
          if (window.innerWidth >= 768 && !isExpanded) {
            e.currentTarget.style.background = "rgba(15,23,42,0.02)";
            e.currentTarget.style.borderColor = "var(--color-border-hover)";
          }
        }}
        onMouseLeave={(e) => {
          if (window.innerWidth >= 768 && !isExpanded) {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.borderColor = "var(--color-border)";
          }
        }}
      >
        <AccordionTrigger 
          className="w-full cursor-pointer px-4 py-4 font-uiSans text-lg font-semibold hover:no-underline md:px-6 md:text-xl"
          style={{
            color: "var(--color-primary)",
            transitionDuration: "var(--transition-duration)",
            transitionTimingFunction: "var(--transition-easing)",
          }}
        >
          <div className="flex w-full items-center justify-between pr-2">
            <span>Nejistota vývoje v čase</span>
            <span 
              className="rounded-[var(--radius-pill)] px-3 py-1 font-uiSans text-xs font-medium"
              style={{
                background: "var(--bg-lilac-section)",
                color: "var(--color-secondary)",
              }}
            >
              Pro pokročilé
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 px-4 pb-5 pt-2 md:px-6 md:pb-6">
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
