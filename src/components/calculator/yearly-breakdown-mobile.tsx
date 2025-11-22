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
import type { YearlyRow } from "./yearly-breakdown-table";

interface YearlyBreakdownMobileProps {
  rows: YearlyRow[];
}

export function YearlyBreakdownMobile({ rows }: YearlyBreakdownMobileProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="space-y-1.5">
        <h2 className="calc-section-title text-xl">
          Vývoj v čase (podrobný přehled)
        </h2>
        <p className="max-w-[560px] font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {rows.map((row) => {
          // Format summary for header
          const propertyValueMil = formatMillionsCzk(row.propertyValue);
          const etfValueMil = formatMillionsCzk(row.etfPortfolioValue);
          
          return (
            <AccordionItem
              key={row.year}
              value={`year-${row.year}`}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--bg-card)] shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden">
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                    Rok {row.year}
                  </span>
                  <div className="flex items-center gap-2 font-uiSans text-xs text-[var(--color-secondary)]">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--scenario-a-dot)]" />
                      <span className="whitespace-nowrap tabular-nums">
                        {propertyValueMil} mil
                      </span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--scenario-b-dot)]" />
                      <span className="whitespace-nowrap tabular-nums">
                        {etfValueMil} mil
                      </span>
                    </div>
                    <ChevronDown className="chevron ml-1 h-4 w-4 shrink-0 text-[var(--color-secondary)] transition-transform duration-200" />
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-4 pt-2">
                {/* Scenario A */}
                <div className="mb-4 rounded-xl bg-[var(--scenario-a-bg)] p-3">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[var(--scenario-a-dot)]" />
                    <h4 className="font-uiSans text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                      Scénář A – Byt
                    </h4>
                  </div>
                  <dl className="space-y-1.5">
                    <div className="flex justify-between gap-2">
                      <dt className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">Dluh hypotéky:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-sm font-semibold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.mortgageRemaining))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">Splátka:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-sm font-semibold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.mortgagePayment))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">Náklady celkem:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-sm font-semibold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.totalPropertyCosts))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-[var(--scenario-a-dot)]/20 pt-1.5">
                      <dt className="font-uiSans text-sm font-semibold text-[var(--color-primary)]">Hodnota bytu:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-base font-bold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.propertyValue))}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                {/* Scenario B */}
                <div className="rounded-xl bg-[var(--scenario-b-bg)] p-3">
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[var(--scenario-b-dot)]" />
                    <h4 className="font-uiSans text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                      Scénář B – Nájem + ETF
                    </h4>
                  </div>
                  <dl className="space-y-1.5">
                    <div className="flex justify-between gap-2">
                      <dt className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">Nájem:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-sm font-semibold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.rent))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-uiSans text-sm font-medium text-[var(--color-secondary)]">Ušetřeno:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-sm font-semibold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.savedComparedToOwnership))}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-[var(--scenario-b-dot)]/20 pt-1.5">
                      <dt className="font-uiSans text-sm font-semibold text-[var(--color-primary)]">Hodnota ETF:</dt>
                      <dd className="whitespace-nowrap font-uiSans text-base font-bold tabular-nums text-[var(--color-primary)]">
                        {formatCzk(Math.round(row.etfPortfolioValue))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
