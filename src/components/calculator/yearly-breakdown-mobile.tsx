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
    <Accordion type="single" collapsible className="space-y-3">
      {rows.map((row) => {
        // Format summary for header
        const propertyValueMil = formatMillionsCzk(row.propertyValue);
        const etfValueMil = formatMillionsCzk(row.etfPortfolioValue);
        
        return (
          <AccordionItem
            key={row.year}
            value={`year-${row.year}`}
            className="rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden">
              <div className="flex w-full items-center justify-between gap-3">
                <span className="font-uiSans text-sm font-semibold text-slate-900">
                  Rok {row.year}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="whitespace-nowrap">
                    A: {propertyValueMil} mil. Kč
                  </span>
                  <span>·</span>
                  <span className="whitespace-nowrap">
                    B: {etfValueMil} mil. Kč
                  </span>
                  <ChevronDown className="chevron ml-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200" />
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-4 pb-4 pt-2">
              {/* Scenario A */}
              <div className="mb-4">
                <h4 className="mb-2 font-uiSans text-xs font-semibold uppercase tracking-wide text-orange-600">
                  Scénář A – Byt na hypotéku
                </h4>
                <dl className="space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Dlužná částka hypotéky:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.mortgageRemaining))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Splátka hypotéky:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.mortgagePayment))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Daň z nemovitosti:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.propertyTax))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Fond oprav:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.repairFund))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Pojištění nemovitosti:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.insurance))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Náklady na údržbu:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.maintenance))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Součet nákladů na nemovitost:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.totalPropertyCosts))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2 border-t border-slate-100 pt-1.5">
                    <dt className="text-xs font-semibold text-slate-700">Hodnota nemovitosti:</dt>
                    <dd className="whitespace-nowrap text-sm font-bold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.propertyValue))} Kč
                    </dd>
                  </div>
                </dl>
              </div>
              
              {/* Scenario B */}
              <div className="border-t border-slate-100 pt-3">
                <h4 className="mb-2 font-uiSans text-xs font-semibold uppercase tracking-wide text-purple-600">
                  Scénář B – Nájem + ETF
                </h4>
                <dl className="space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Nájem:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.rent))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs font-medium text-slate-500">Ušetřeno oproti vlastnictví:</dt>
                    <dd className="whitespace-nowrap text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.savedComparedToOwnership))} Kč
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2 border-t border-slate-100 pt-1.5">
                    <dt className="text-xs font-semibold text-slate-700">Hodnota ETF portfolia:</dt>
                    <dd className="whitespace-nowrap text-sm font-bold text-slate-900 tabular-nums">
                      {formatCzk(Math.round(row.etfPortfolioValue))} Kč
                    </dd>
                  </div>
                </dl>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

