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

interface AdvancedInputsProps {
  state: CalculatorState;
  updateState: (updates: Partial<CalculatorState>) => void;
}

export function AdvancedInputs({ state, updateState }: AdvancedInputsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="advanced"
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
          className="w-full cursor-pointer px-5 py-4 font-uiSans text-[18px] font-semibold text-[var(--color-primary)] hover:no-underline md:px-6"
          style={{
            transitionDuration: "var(--transition-duration)",
            transitionTimingFunction: "var(--transition-easing)",
            fontFamily: "var(--font-ui-sans)",
          }}
        >
          <span className="font-uiSans">Rozšířené předpoklady</span>
        </AccordionTrigger>
        <AccordionContent className="space-y-5 px-5 pb-5 pt-2 md:px-6 md:pb-6">
          <p className="font-uiSans text-sm text-[var(--color-secondary)]">
            Vše je předvyplněné realistickými hodnotami, měnit je nemusíš.
          </p>

          {/* Příspěvek od rodičů */}
          <div className="space-y-2">
            <Label htmlFor="prispevek-rodicu" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Příspěvek od rodičů na koupi nemovitosti (Kč)
            </Label>
            <Input
              id="prispevek-rodicu"
              type="number"
              value={state.prispevekRodicu}
              onChange={(e) => updateState({ prispevekRodicu: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Jednorázový finanční dar od rodičů (pouze při koupi bytu)
            </p>
          </div>

          {/* Zařízení nemovitosti */}
          <div className="space-y-2">
            <Label htmlFor="zarizeni" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Zařízení nemovitosti (Kč, jednorázově)
            </Label>
            <Input
              id="zarizeni"
              type="number"
              value={state.zarizeniNemovitosti}
              onChange={(e) => updateState({ zarizeniNemovitosti: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Náklady na nábytek a vybavení bytu
            </p>
          </div>

          {/* Růst hodnoty nemovitosti */}
          <div className="space-y-2">
            <Label htmlFor="rust-hodnoty" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Růst hodnoty nemovitosti (% p.a.)
            </Label>
            <Input
              id="rust-hodnoty"
              type="number"
              step="0.1"
              value={state.rustHodnotyNemovitosti}
              onChange={(e) => updateState({ rustHodnotyNemovitosti: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Očekávané roční zhodnocení nemovitosti
            </p>
          </div>

          {/* Fond oprav */}
          <div className="space-y-2">
            <Label htmlFor="fond-oprav" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Fond oprav (Kč / měsíc)
            </Label>
            <Input
              id="fond-oprav"
              type="number"
              value={state.fondOprav}
              onChange={(e) => updateState({ fondOprav: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Měsíční příspěvek do fondu oprav domu
            </p>
          </div>

          {/* Pojištění nemovitosti */}
          <div className="space-y-2">
            <Label htmlFor="pojisteni" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Pojištění nemovitosti (Kč / rok)
            </Label>
            <Input
              id="pojisteni"
              type="number"
              value={state.pojisteniNemovitosti}
              onChange={(e) => updateState({ pojisteniNemovitosti: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Roční náklady na pojištění nemovitosti
            </p>
          </div>

          {/* Daň z nemovitosti */}
          <div className="space-y-2">
            <Label htmlFor="dan" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Daň z nemovitosti (Kč / rok)
            </Label>
            <Input
              id="dan"
              type="number"
              value={state.danZNemovitosti}
              onChange={(e) => updateState({ danZNemovitosti: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Roční daň z nemovitosti
            </p>
          </div>

          {/* Náklady na údržbu */}
          <div className="space-y-2">
            <Label htmlFor="udrzba" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Náklady na údržbu (% z hodnoty / rok)
            </Label>
            <Input
              id="udrzba"
              type="number"
              step="0.1"
              value={state.nakladyUdrzba}
              onChange={(e) => updateState({ nakladyUdrzba: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Roční náklady na údržbu jako procento hodnoty nemovitosti
            </p>
          </div>

          {/* Očekávaná inflace nákladů */}
          <div className="space-y-2">
            <Label htmlFor="inflace" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Očekávaná inflace nákladů (% p.a.)
            </Label>
            <Input
              id="inflace"
              type="number"
              step="0.1"
              value={state.ocekavanaInflace}
              onChange={(e) => updateState({ ocekavanaInflace: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Očekávaný roční růst všech nákladů
            </p>
          </div>

          {/* Růst nájemného */}
          <div className="space-y-2">
            <Label htmlFor="rust-najemneho" className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
              Růst nájemného (% p.a.)
            </Label>
            <Input
              id="rust-najemneho"
              type="number"
              step="0.1"
              value={state.rustNajemneho}
              onChange={(e) => updateState({ rustNajemneho: Number(e.target.value) })}
              className="font-uiSans text-base"
            />
            <p className="font-uiSans text-xs text-[var(--color-secondary)]">
              Očekávaný roční růst nájemného
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

