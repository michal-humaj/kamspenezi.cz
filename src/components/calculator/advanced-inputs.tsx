"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InputWithSuffix } from "./input-with-suffix";
import type { CalculatorState } from "@/app/bydleni-kalkulacka/page";

interface AdvancedInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function parseNumber(value: string): number {
  const cleanValue = value.replace(/\s/g, "");
  return cleanValue === "" ? 0 : Number(cleanValue);
}

export function AdvancedInputs({ state, updateState }: AdvancedInputsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Accordion type="single" collapsible onValueChange={(value) => setIsExpanded(value === "advanced")}>
      <AccordionItem
        value="advanced"
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
          <span>Rozšířené předpoklady</span>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 px-4 pb-5 pt-2 md:px-6 md:pb-6">
          <p className="font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
            Vše je předvyplněné realistickými hodnotami, měnit je nemusíš.
          </p>

          {/* 1. Příspěvek od rodičů */}
          <InputWithSuffix
            id="prispevek-rodicu"
            label="Příspěvek od rodičů na koupi nemovitosti"
            value={formatNumber(state.prispevekRodicu)}
            suffix="Kč"
            helperText="Jednorázový finanční dar od rodičů (pouze při koupi bytu)"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => {
              const numValue = parseNumber(value);
              if (!isNaN(numValue)) {
                updateState({ prispevekRodicu: numValue });
              }
            }}
          />

          {/* 2. Zařízení nemovitosti */}
          <InputWithSuffix
            id="zarizeni"
            label="Zařízení nemovitosti"
            value={formatNumber(state.zarizeniNemovitosti)}
            suffix="Kč"
            helperText="Náklady na nábytek a vybavení bytu (jednorázově)"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => {
              const numValue = parseNumber(value);
              if (!isNaN(numValue)) {
                updateState({ zarizeniNemovitosti: numValue });
              }
            }}
          />

          {/* 3. Růst hodnoty nemovitosti */}
          <InputWithSuffix
            id="rust-hodnoty"
            label="Růst hodnoty nemovitosti (% p.a.)"
            value={state.rustHodnotyNemovitosti}
            suffix="%"
            helperText="Očekávané roční zhodnocení nemovitosti"
            type="text"
            inputMode="decimal"
            onChange={(value) => updateState({ rustHodnotyNemovitosti: Number(value) })}
          />

          {/* 4. Fond oprav */}
          <InputWithSuffix
            id="fond-oprav"
            label="Fond oprav (Kč / měsíc)"
            value={formatNumber(state.fondOprav)}
            suffix="Kč"
            helperText="Měsíční příspěvek do fondu oprav domu"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => {
              const numValue = parseNumber(value);
              if (!isNaN(numValue)) {
                updateState({ fondOprav: numValue });
              }
            }}
          />

          {/* 5. Pojištění nemovitosti */}
          <InputWithSuffix
            id="pojisteni"
            label="Pojištění nemovitosti (Kč / rok)"
            value={formatNumber(state.pojisteniNemovitosti)}
            suffix="Kč"
            helperText="Roční náklady na pojištění bytu"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => {
              const numValue = parseNumber(value);
              if (!isNaN(numValue)) {
                updateState({ pojisteniNemovitosti: numValue });
              }
            }}
          />

          {/* 6. Daň z nemovitosti */}
          <InputWithSuffix
            id="dan"
            label="Daň z nemovitosti (Kč / rok)"
            value={formatNumber(state.danZNemovitosti)}
            suffix="Kč"
            helperText="Roční daň z nemovitosti"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={(value) => {
              const numValue = parseNumber(value);
              if (!isNaN(numValue)) {
                updateState({ danZNemovitosti: numValue });
              }
            }}
          />

          {/* 7. Náklady na údržbu */}
          <InputWithSuffix
            id="naklady-udrzba"
            label="Náklady na údržbu (% z hodnoty / rok)"
            value={state.nakladyUdrzba}
            suffix="%"
            helperText="Roční náklady na údržbu jako procento z hodnoty bytu"
            type="text"
            inputMode="decimal"
            onChange={(value) => updateState({ nakladyUdrzba: Number(value) })}
          />

          {/* 8. Očekávaná inflace nákladů */}
          <InputWithSuffix
            id="inflace"
            label="Očekávaná inflace nákladů (% p.a.)"
            value={state.ocekavanaInflace}
            suffix="%"
            helperText="Roční růst nákladů (pojištění, údržba, atd.)"
            type="text"
            inputMode="decimal"
            onChange={(value) => updateState({ ocekavanaInflace: Number(value) })}
          />

          {/* 9. Růst nájemného */}
          <InputWithSuffix
            id="rust-najemneho"
            label="Růst nájemného (% p.a.)"
            value={state.rustNajemneho}
            suffix="%"
            helperText="Očekávaný roční růst nájemného"
            type="text"
            inputMode="decimal"
            onChange={(value) => updateState({ rustNajemneho: Number(value) })}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
