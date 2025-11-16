"use client";

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
}

export function UncertaintyInputs({ state, updateState }: UncertaintyInputsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="uncertainty"
        className="rounded-[var(--radius-card)] border-0 bg-[var(--bg-card)] transition-all"
        style={{ 
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card)";
        }}
      >
        <AccordionTrigger 
          className="w-full cursor-pointer px-5 py-4 font-uiSans text-lg font-semibold text-[var(--color-primary)] hover:no-underline md:px-6"
          style={{
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
        <AccordionContent className="space-y-5 px-5 pb-5 pt-2 md:px-6 md:pb-6">
          <p className="font-uiSans text-sm text-[var(--color-secondary)]">
            Nastav pesimistické, očekávané a optimistické hodnoty pro nejistotu v budoucnosti.
          </p>

          {/* ETF výnos */}
          <div className="space-y-2">
            <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Výnos ETF v čase (% p.a.)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="etf-min" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Pesimisticky
                </Label>
                <Input
                  id="etf-min"
                  type="number"
                  step="0.1"
                  value={state.etfVynosMin}
                  onChange={(e) => updateState({ etfVynosMin: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="etf-expected" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Očekávaně
                </Label>
                <Input
                  id="etf-expected"
                  type="number"
                  step="0.1"
                  value={state.etfVynosExpected}
                  onChange={(e) => updateState({ etfVynosExpected: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="etf-max" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Optimisticky
                </Label>
                <Input
                  id="etf-max"
                  type="number"
                  step="0.1"
                  value={state.etfVynosMax}
                  onChange={(e) => updateState({ etfVynosMax: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
            </div>
          </div>

          {/* Růst hodnoty nemovitosti */}
          <div className="space-y-2">
            <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Růst hodnoty nemovitosti (% p.a.)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="rust-hodnoty-min" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Pesimisticky
                </Label>
                <Input
                  id="rust-hodnoty-min"
                  type="number"
                  step="0.1"
                  value={state.rustHodnotyMin}
                  onChange={(e) => updateState({ rustHodnotyMin: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="rust-hodnoty-expected" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Očekávaně
                </Label>
                <Input
                  id="rust-hodnoty-expected"
                  type="number"
                  step="0.1"
                  value={state.rustHodnotyExpected}
                  onChange={(e) => updateState({ rustHodnotyExpected: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="rust-hodnoty-max" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Optimisticky
                </Label>
                <Input
                  id="rust-hodnoty-max"
                  type="number"
                  step="0.1"
                  value={state.rustHodnotyMax}
                  onChange={(e) => updateState({ rustHodnotyMax: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
            </div>
          </div>

          {/* Růst nájemného */}
          <div className="space-y-2">
            <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Růst nájemného (% p.a.)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="rust-najemneho-min" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Pesimisticky
                </Label>
                <Input
                  id="rust-najemneho-min"
                  type="number"
                  step="0.1"
                  value={state.rustNajemnehoMin}
                  onChange={(e) => updateState({ rustNajemnehoMin: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="rust-najemneho-expected" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Očekávaně
                </Label>
                <Input
                  id="rust-najemneho-expected"
                  type="number"
                  step="0.1"
                  value={state.rustNajemnehoExpected}
                  onChange={(e) => updateState({ rustNajemnehoExpected: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="rust-najemneho-max" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Optimisticky
                </Label>
                <Input
                  id="rust-najemneho-max"
                  type="number"
                  step="0.1"
                  value={state.rustNajemnehoMax}
                  onChange={(e) => updateState({ rustNajemnehoMax: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
            </div>
          </div>

          {/* Úroková sazba hypotéky */}
          <div className="space-y-2">
            <Label className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Úroková sazba hypotéky v budoucnu (% p.a.)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="sazba-min" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Pesimisticky
                </Label>
                <Input
                  id="sazba-min"
                  type="number"
                  step="0.1"
                  value={state.urokovaSazbaMin}
                  onChange={(e) => updateState({ urokovaSazbaMin: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="sazba-expected" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Očekávaně
                </Label>
                <Input
                  id="sazba-expected"
                  type="number"
                  step="0.1"
                  value={state.urokovaSazbaExpected}
                  onChange={(e) => updateState({ urokovaSazbaExpected: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
              <div>
                <Label htmlFor="sazba-max" className="font-uiSans text-xs text-[var(--color-secondary)]">
                  Optimisticky
                </Label>
                <Input
                  id="sazba-max"
                  type="number"
                  step="0.1"
                  value={state.urokovaSazbaMax}
                  onChange={(e) => updateState({ urokovaSazbaMax: Number(e.target.value) })}
                  className="mt-1 font-uiSans text-sm"
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
