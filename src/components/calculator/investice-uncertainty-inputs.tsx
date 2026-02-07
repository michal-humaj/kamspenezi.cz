"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LabeledSliderInput } from "./labeled-slider-input";
import { formatPercent, parsePercent } from "@/lib/format";
import type { InvesticeCalculatorState } from "@/app/investice/page";

interface InvesticeUncertaintyInputsProps {
  state: InvesticeCalculatorState;
  updateState: (updates: Partial<InvesticeCalculatorState>) => void;
}

export function InvesticeUncertaintyInputs({ state, updateState }: InvesticeUncertaintyInputsProps) {
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
          <LabeledSliderInput
            id="inv-rust-hodnoty-expected"
            label="Zhodnocení nemovitosti (ročně)"
            description="Očekávaný roční růst ceny nemovitosti"
            value={state.rustHodnotyExpected}
            onChange={(v) => updateState({ rustHodnotyExpected: v })}
            unit="percent"
            min={0}
            max={15}
            step={0.1}
            formatter={formatPercent}
            parser={parsePercent}
            inputMode="decimal"
          />

          <LabeledSliderInput
            id="inv-investice-expected"
            label="Výnos investic / ETF (ročně)"
            description="Očekávaný roční výnos akciového ETF"
            value={state.vynosInvesticeExpected}
            onChange={(v) => updateState({ vynosInvesticeExpected: v })}
            unit="percent"
            min={0}
            max={15}
            step={0.1}
            formatter={formatPercent}
            parser={parsePercent}
            inputMode="decimal"
          />

          <LabeledSliderInput
            id="inv-sazba-expected"
            label="Budoucí sazba hypotéky (od roku 6)"
            description="Očekávaná úroková sazba po skončení fixace"
            value={state.urokovaSazbaHypotekyExpected}
            onChange={(v) => updateState({ urokovaSazbaHypotekyExpected: v })}
            unit="percent"
            min={1}
            max={9}
            step={0.1}
            formatter={formatPercent}
            parser={parsePercent}
            inputMode="decimal"
          />

          <LabeledSliderInput
            id="inv-rust-najemneho-expected"
            label="Růst nájemného (ročně)"
            description="Očekávaný roční růst nájemného od nájemníka"
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
