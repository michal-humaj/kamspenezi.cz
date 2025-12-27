"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { formatCzk, formatMillionsCzk } from "@/lib/format";
import type { YearlyRow } from "./YearlyOverviewTable";

interface YearlyBreakdownMobileProps {
  rows: YearlyRow[];
}

/**
 * Formats numeric values:
 * - 0 => "—"
 * - Negative => Red text
 * - Standard => Czech locale spaces
 */
function formatValue(val: number) {
  if (val === 0) return <span className="text-slate-400">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

function TerracottaDot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--scenario-a-dot)]" />;
}

function LilacDot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--scenario-b-dot)]" />;
}

export function YearlyBreakdownMobile({ rows }: YearlyBreakdownMobileProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="space-y-1.5">
        <h2 className="section-title">
          Vývoj v čase (podrobný přehled)
        </h2>
        <p className="max-w-[560px] font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      {/* Ledger Style Card - Standard Margins (removed negative margin) */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Accordion type="single" collapsible className="w-full divide-y divide-slate-100">
          {rows.map((row) => {
            // Format summary for header
            const propertyNetWorthMil = formatMillionsCzk(row.propertyNetWorth);
            const portfolioValueMil = formatMillionsCzk(row.portfolioValue);
            
            return (
              <AccordionItem
                key={row.year}
                value={`year-${row.year}`}
                className="border-none"
              >
                <AccordionTrigger className="px-3 py-3 hover:no-underline hover:bg-slate-50/50 [&[data-state=open]]:bg-slate-50 [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden">
                  {/* Fixed Grid Layout for Perfect Alignment */}
                  <div className="grid w-full grid-cols-[1fr_auto_auto_16px] items-center gap-x-3">
                    {/* Col 1: Year */}
                    <span className="font-uiSans text-sm font-medium text-slate-900 text-left">
                      Rok {row.year}
                    </span>

                    {/* Col 2: Scenario A Value - Fixed Width */}
                    <div className="flex w-[75px] items-center justify-end gap-1.5 font-uiSans text-sm tabular-nums text-slate-700">
                      <TerracottaDot />
                      {propertyNetWorthMil} mil
                    </div>
                    
                    {/* Col 3: Scenario B Value - Fixed Width */}
                    <div className="flex w-[75px] items-center justify-end gap-1.5 font-uiSans text-sm tabular-nums text-slate-700">
                      <LilacDot />
                      {portfolioValueMil} mil
                    </div>

                    {/* Col 4: Chevron */}
                    <div className="flex justify-end">
                      <ChevronDown className="chevron h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200" />
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="bg-slate-50 p-3">
                  
                  {/* Block A: Scenario A */}
                  <div className="border-l-2 border-[var(--scenario-a-dot)] bg-white py-3 pl-3 pr-2 shadow-sm my-2">
                    <div className="mb-2 flex items-center gap-1.5">
                      <TerracottaDot />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--scenario-a-dot)]">
                        VLASTNÍ BYDLENÍ NA HYPOTÉKU
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      <dt className="pl-2 text-xs text-slate-500">Dlužná částka</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.mortgageRemaining))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Splátka hypotéky</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.mortgagePayment))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Daň z nemovitosti</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.propertyTax))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Fond oprav</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.repairFund))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Pojištění nemovitosti</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.insurance))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Náklady na údržbu</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.maintenance))}</dd>

                      <dt className="pl-2 text-xs text-slate-500 pt-1 border-t border-slate-100 mt-1">Náklady celkem</dt>
                      {/* Sub-total hierarchy: font-medium */}
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums pt-1 border-t border-slate-100 mt-1">{formatValue(Math.round(row.totalPropertyCosts))}</dd>

                      <dt className="pl-2 text-xs font-medium text-slate-900 mt-2 pt-3 border-t border-dashed border-slate-200">Hodnota nemovitosti</dt>
                      <dd className="pr-2 text-right text-sm font-bold text-slate-900 tabular-nums mt-2 pt-3 border-t border-dashed border-slate-200">{formatValue(Math.round(row.propertyValue))}</dd>

                      <dt className="pl-2 text-xs font-medium text-slate-900">Hodnota minus dluh</dt>
                      <dd className="pr-2 text-right text-sm font-bold text-slate-900 tabular-nums">{formatValue(Math.round(row.propertyNetWorth))}</dd>
                    </dl>
                  </div>

                  {/* Block B: Scenario B */}
                  <div className="border-l-2 border-[var(--scenario-b-dot)] bg-white py-3 pl-3 pr-2 shadow-sm">
                    <div className="mb-2 flex items-center gap-1.5">
                      <LilacDot />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--scenario-b-dot)]">
                        BYDLENÍ V NÁJMU A INVESTOVÁNÍ
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      <dt className="pl-2 text-xs text-slate-500">Nájemné</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.rent))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Ušetřeno k investici</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.savedComparedToOwnership))}</dd>

                      <dt className="pl-2 text-xs font-medium text-slate-900 mt-2 pt-3 border-t border-dashed border-slate-200">Hodnota portfolia</dt>
                      <dd className="pr-2 text-right text-sm font-bold text-slate-900 tabular-nums mt-2 pt-3 border-t border-dashed border-slate-200">{formatValue(Math.round(row.portfolioValue))}</dd>
                    </dl>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
