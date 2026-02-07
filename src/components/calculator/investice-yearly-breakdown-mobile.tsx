"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { formatCzk, formatMillionsCzk } from "@/lib/format";
import type { InvesticeYearlyRow } from "./InvesticeYearlyTable";

interface InvesticeYearlyBreakdownMobileProps {
  rows: InvesticeYearlyRow[];
}

function formatValue(val: number) {
  if (val === 0) return <span className="text-slate-400">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

function TerracottaDot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--scenario-a-dot)]" />;
}

function GreenDot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--scenario-b-dot)]" />;
}

export function InvesticeYearlyBreakdownMobile({ rows }: InvesticeYearlyBreakdownMobileProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="space-y-1.5">
        <h2 className="section-title">
          Vývoj v čase (podrobný přehled)
        </h2>
        <p className="max-w-[560px] font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
          Přehled po jednotlivých letech pro investiční byt i ETF portfolio.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Accordion type="single" collapsible className="w-full divide-y divide-slate-100">
          {rows.map((row) => {
            const netWorthAMil = formatMillionsCzk(row.netWorthA);
            const etfMil = formatMillionsCzk(row.etfPortfolioValue);

            return (
              <AccordionItem key={row.year} value={`year-${row.year}`} className="border-none">
                <AccordionTrigger className="px-3 py-3 hover:no-underline hover:bg-slate-50/50 [&[data-state=open]]:bg-slate-50 [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden">
                  <div className="grid w-full grid-cols-[1fr_auto_auto_16px] items-center gap-x-3">
                    <span className="font-uiSans text-sm font-medium text-slate-900 text-left">
                      Rok {row.year}
                    </span>
                    <div className="flex w-[75px] items-center justify-end gap-1.5 font-uiSans text-sm tabular-nums text-slate-700">
                      <TerracottaDot />
                      {netWorthAMil} mil
                    </div>
                    <div className="flex w-[75px] items-center justify-end gap-1.5 font-uiSans text-sm tabular-nums text-slate-700">
                      <GreenDot />
                      {etfMil} mil
                    </div>
                    <div className="flex justify-end">
                      <ChevronDown className="chevron h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200" />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="bg-slate-50 p-3">
                  {/* Scenario A */}
                  <div className="border-l-2 border-[var(--scenario-a-dot)] bg-white py-3 pl-3 pr-2 shadow-sm my-2">
                    <div className="mb-2 flex items-center gap-1.5">
                      <TerracottaDot />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--scenario-a-dot)]">
                        INVESTIČNÍ BYT NA HYPOTÉKU
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      <dt className="pl-2 text-xs text-slate-500">Hodnota nemovitosti</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.propertyValue))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Příjem z nájmu</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.rentIncome))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Provozní náklady</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.operatingCosts))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Splátka hypotéky</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.mortgagePayment))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Úroky</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.interestPaid))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Daň z příjmu</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.incomeTax))}</dd>

                      <dt className="pl-2 text-xs text-slate-500 pt-1 border-t border-slate-100 mt-1">Čistý cashflow</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums pt-1 border-t border-slate-100 mt-1">{formatValue(Math.round(row.netCashflow))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Dlužná částka</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.remainingDebt))}</dd>

                      <dt className="pl-2 text-xs text-slate-500">Vedlejší fond</dt>
                      <dd className="pr-2 text-right text-sm font-medium text-slate-900 tabular-nums">{formatValue(Math.round(row.sideFundValue))}</dd>

                      <dt className="pl-2 text-xs font-medium text-slate-900 mt-2 pt-3 border-t border-dashed border-slate-200">Čisté jmění (A)</dt>
                      <dd className="pr-2 text-right text-sm font-bold text-slate-900 tabular-nums mt-2 pt-3 border-t border-dashed border-slate-200">{formatValue(Math.round(row.netWorthA))}</dd>
                    </dl>
                  </div>

                  {/* Scenario B */}
                  <div className="border-l-2 border-[var(--scenario-b-dot)] bg-white py-3 pl-3 pr-2 shadow-sm">
                    <div className="mb-2 flex items-center gap-1.5">
                      <GreenDot />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--scenario-b-dot)]">
                        ETF PORTFOLIO
                      </span>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      <dt className="pl-2 text-xs font-medium text-slate-900 mt-2 pt-3 border-t border-dashed border-slate-200">ETF portfolio (B)</dt>
                      <dd className="pr-2 text-right text-sm font-bold text-slate-900 tabular-nums mt-2 pt-3 border-t border-dashed border-slate-200">{formatValue(Math.round(row.etfPortfolioValue))}</dd>
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
