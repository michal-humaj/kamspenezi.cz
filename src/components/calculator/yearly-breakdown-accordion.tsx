"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import { formatCzk } from "@/lib/format";
import type { YearlyRow } from "./yearly-breakdown-table";

interface YearlyBreakdownAccordionProps {
  data: YearlyRow[];
}

export function YearlyBreakdownAccordion({ data }: YearlyBreakdownAccordionProps) {
  return (
    <section className="block lg:hidden w-full">
      {/* Section Header */}
      <div className="px-4 space-y-2 mb-4">
        <h3 className="font-displaySerif text-2xl font-bold text-[var(--color-primary)]">
          Vývoj v čase (podrobný přehled)
        </h3>
        <p className="font-uiSans text-sm text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      {/* Accordion List */}
      <Accordion type="single" collapsible defaultValue={`year-${data.length - 1}`} className="space-y-3">
        {data.map((row) => {
          const isLastYear = row.year === data[data.length - 1]?.year;

          return (
            <AccordionItem
              key={row.year}
              value={`year-${row.year}`}
              className="-mx-4 rounded-none border-none bg-white p-4 shadow-none md:mx-0 md:rounded-[var(--radius-card)] md:border md:border-[var(--color-border)] md:shadow-sm"
            >
              <AccordionTrigger className="!p-0 hover:no-underline [&[data-state=open]_.chevron]:rotate-180 [&>svg]:hidden">
                <div className="flex w-full items-start justify-between gap-3">
                  {/* Left: Year Label */}
                  <div className="flex flex-col items-start text-left">
                    <span className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                      Rok {row.year}
                    </span>
                    {isLastYear && (
                      <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                        Výsledek
                      </span>
                    )}
                    {!isLastYear && row.year > 0 && (
                      <span className="text-xs text-[var(--color-secondary)]">
                        Po {row.year} {row.year === 1 ? 'roce' : row.year < 5 ? 'letech' : 'letech'}
                      </span>
                    )}
                  </div>

                  {/* Right: Key Values as Chips + Chevron */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end gap-1">
                      {/* ETF Chip */}
                      <div 
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ 
                          backgroundColor: 'rgba(125, 90, 226, 0.1)',
                          color: 'var(--scenario-b-dot)'
                        }}
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--scenario-b-dot)' }}
                        />
                        <span className="whitespace-nowrap tabular-nums" style={{ fontFeatureSettings: '"tnum" 1' }}>
                          {formatCzk(row.etfPortfolioValue)} Kč
                        </span>
                      </div>

                      {/* Property Chip */}
                      <div 
                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ 
                          backgroundColor: 'rgba(201, 141, 78, 0.1)',
                          color: 'var(--scenario-a-dot)'
                        }}
                      >
                        <div
                          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--scenario-a-dot)' }}
                        />
                        <span className="whitespace-nowrap tabular-nums" style={{ fontFeatureSettings: '"tnum" 1' }}>
                          {formatCzk(row.propertyValue)} Kč
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDown className="chevron h-5 w-5 shrink-0 text-[var(--color-secondary)] transition-transform duration-200" />
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="space-y-5 pt-4">
                {/* Scénář B - Nájem + ETF */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--scenario-b-dot)' }}
                    />
                    <h4 className="font-uiSans text-sm font-semibold text-[var(--color-primary)]">
                      Scénář B – Nájem + ETF
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <MetricRow 
                      label="Nájem" 
                      value={row.rentPaid} 
                    />
                    <MetricRow 
                      label="Hodnota ETF portfolia" 
                      value={row.etfPortfolioValue}
                      isKeyMetric={true}
                    />
                    <MetricRow 
                      label="Ušetřeno oproti vlastnictví" 
                      value={row.netAdvantageVsOwnership} 
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200" />

                {/* Scénář A - Byt na hypotéku */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--scenario-a-dot)' }}
                    />
                    <h4 className="font-uiSans text-sm font-semibold text-[var(--color-primary)]">
                      Scénář A – Byt na hypotéku
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <MetricRow 
                      label="Hodnota nemovitosti" 
                      value={row.propertyValue}
                      isKeyMetric={true}
                    />
                    <MetricRow 
                      label="Dlužná částka hypotéky" 
                      value={row.mortgageBalance} 
                    />
                    <MetricRow 
                      label="Součet nákladů na nemovitost" 
                      value={row.totalPropertyCosts} 
                    />
                    
                    {/* Collapsible: Detailed costs */}
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between py-2 text-xs font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)]">
                        <span>Zobrazit podrobné náklady</span>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-2 pt-2">
                        <MetricRow 
                          label="Splátka hypotéky" 
                          value={row.mortgagePayment}
                          isSecondary={true}
                        />
                        <MetricRow 
                          label="Daň z nemovitosti" 
                          value={row.propertyTax}
                          isSecondary={true}
                        />
                        <MetricRow 
                          label="Fond oprav" 
                          value={row.repairFund}
                          isSecondary={true}
                        />
                        <MetricRow 
                          label="Pojištění nemovitosti" 
                          value={row.propertyInsurance}
                          isSecondary={true}
                        />
                        <MetricRow 
                          label="Náklady na údržbu" 
                          value={row.maintenanceCost}
                          isSecondary={true}
                        />
                      </div>
                    </details>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

interface MetricRowProps {
  label: string;
  value: number;
  isKeyMetric?: boolean;
  isSecondary?: boolean;
}

function MetricRow({ label, value, isKeyMetric = false, isSecondary = false }: MetricRowProps) {
  return (
    <div className={`flex items-center justify-between ${isSecondary ? 'pl-4' : ''}`}>
      <span className={`font-uiSans ${isSecondary ? 'text-xs' : 'text-sm'} text-[var(--color-secondary)] truncate pr-3`}>
        {label}:
      </span>
      <span 
        className={`font-uiSans ${isSecondary ? 'text-xs' : 'text-sm'} ${isKeyMetric ? 'font-semibold' : 'font-medium'} text-[var(--color-primary)] tabular-nums whitespace-nowrap`}
        style={{ fontFeatureSettings: '"tnum" 1' }}
      >
        {formatCzk(value)} Kč
      </span>
    </div>
  );
}
