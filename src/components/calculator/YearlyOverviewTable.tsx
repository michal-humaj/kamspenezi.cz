"use client";

import { formatCzk } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export type YearlyRow = {
  year: number;
  mortgageRemaining: number;
  mortgagePayment: number;
  propertyTax: number;
  repairFund: number;
  insurance: number;
  maintenance: number;
  totalPropertyCosts: number;
  propertyValue: number;
  rent: number;
  savedComparedToOwnership: number;
  etfPortfolioValue: number;
};

interface YearlyOverviewTableProps {
  rows: YearlyRow[];
}

export function YearlyOverviewTable({ rows }: YearlyOverviewTableProps) {
  const lastRow = rows[rows.length - 1];
  const dataRows = rows.slice(0, -1);
  
  return (
    <section className="mx-auto mt-4 mb-10 max-w-[1200px] px-6 md:px-0">
      {/* Section header with export button */}
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <h2 className="calc-section-title text-lg md:text-xl">
            Vývoj v čase (podrobný přehled)
          </h2>
          <p className="mt-1 max-w-[560px] font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
            Ukazujeme přehled po jednotlivých letech pro oba scénáře.
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-secondary)]">
            Jednotka: roky
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-secondary)]">
            Tlačítko Exportovat tabulku pracuje s tabulkou níže.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
          onClick={() => {
            console.log("Export table to CSV/Excel - not implemented yet");
          }}
          aria-label="Exportovat tuto tabulku do CSV nebo Excelu"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Exportovat tabulku</span>
        </Button>
      </div>

      {/* Premium analytical table card */}
      <div 
        className="overflow-hidden rounded-3xl border bg-[var(--bg-card)]"
        style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-card-soft)' }}
      >
        <div className="-mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
          <table className="w-full table-auto border-collapse bg-transparent font-uiSans" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              {/* Scenario grouping row */}
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th 
                  rowSpan={2}
                  className="w-[44px] border-b border-[#E5E7EB] border-r border-r-[#D0D4DD] px-2 py-1.5 text-center align-bottom first:pl-6 last:pr-6"
                >
                  <div className="text-[12px] font-medium text-[var(--color-primary)]">
                    Rok
                  </div>
                </th>
                <th 
                  colSpan={8}
                  className="border-b border-[#E5E7EB] px-2 py-1.5 text-center first:pl-6 last:pr-6"
                >
                  <div className="inline-flex items-center justify-center gap-1.5 leading-[1.1]">
                    <span 
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--scenario-a-dot)' }}
                    />
                    <span 
                      className="font-uiSans text-[11px] font-semibold uppercase tracking-[0.02em]"
                      style={{ color: 'var(--scenario-a-dot)' }}
                    >
                      SCÉNÁŘ A – BYT NA HYPOTÉKU
                    </span>
                  </div>
                </th>
                <th 
                  colSpan={3}
                  className="border-b border-[#E5E7EB] border-l border-l-[#E5E7EB] px-2 py-1.5 text-center first:pl-6 last:pr-6"
                >
                  <div className="inline-flex items-center justify-center gap-1.5 leading-[1.1]">
                    <span 
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--scenario-b-dot)' }}
                    />
                    <span 
                      className="font-uiSans text-[11px] font-semibold uppercase tracking-[0.02em]"
                      style={{ color: 'var(--scenario-b-dot)' }}
                    >
                      SCÉNÁŘ B – NÁJEM + ETF
                    </span>
                  </div>
                </th>
              </tr>

              {/* Column headers row */}
              <tr className="border-b-2 border-b-[#D1D5DB] bg-[#F9FAFB]">
                {/* Scenario A columns */}
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Dlužná částka hypotéky
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Splátka hypotéky
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Daň z nemovitosti
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Fond oprav
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Pojištění nemovitosti
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Náklady na údržbu
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Součet nákladů
                  </div>
                </th>
                
                {/* Result column A */}
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Hodnota nemovitosti
                  </div>
                </th>
                
                {/* Scenario B columns */}
                <th className="border-l border-l-[#E5E7EB] px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Nájem
                  </div>
                </th>
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Ušetřeno (do ETF)
                  </div>
                </th>
                
                {/* Result column B */}
                <th className="px-2 py-1.5 text-right align-top first:pl-6 last:pr-6">
                  <div className="text-[11.5px] font-medium leading-[1.1] text-[var(--color-primary)] md:text-[12px]">
                    Hodnota ETF portfolia
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Data rows */}
              {dataRows.map((row) => (
                <tr
                  key={row.year}
                  className="group border-b border-[#E5E7EB] transition-colors duration-150 even:bg-[rgba(15,23,42,0.01)] hover:bg-[rgba(15,23,42,0.03)] hover:[&>td:first-child]:border-l-[var(--color-primary)]"
                >
                  {/* Year */}
                  <td className="border-l-[3px] border-l-transparent border-r border-r-[#D0D4DD] px-2 py-0.5 text-center text-[12px] font-medium leading-[1.25] text-[var(--color-primary)] group-hover:font-semibold first:pl-6 last:pr-6 md:py-[3px]">
                    {row.year}
                  </td>

                  {/* Scenario A - operational columns */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.mortgageRemaining))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.mortgagePayment))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.propertyTax))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.repairFund))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.insurance))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.maintenance))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.totalPropertyCosts))}
                  </td>
                  
                  {/* Result A */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-medium leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-a-dot)' }}>
                    {formatCzk(Math.round(row.propertyValue))}
                  </td>

                  {/* Scenario B - operational columns */}
                  <td className="whitespace-nowrap border-l border-l-[#E5E7EB] px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(row.rent))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-medium leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-b-dot)', opacity: 0.8 }}>
                    {formatCzk(Math.round(row.savedComparedToOwnership))}
                  </td>
                  
                  {/* Result B */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-medium leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-b-dot)' }}>
                    {formatCzk(Math.round(row.etfPortfolioValue))}
                  </td>
                </tr>
              ))}

              {/* Final row (Year 30) */}
              {lastRow && (
                <tr className="border-t border-[#D1D5DB] bg-[rgba(15,23,42,0.03)]">
                  {/* Year */}
                  <td className="border-l-[3px] border-l-transparent border-r border-r-[#D0D4DD] px-2 py-0.5 first:pl-6 last:pr-6 md:py-[3px]">
                    <div className="flex flex-col items-center">
                      <span className="text-[12px] font-semibold text-[var(--color-primary)]">
                        {lastRow.year}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                        Výsledek
                      </span>
                    </div>
                  </td>

                  {/* Scenario A - operational columns */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.mortgageRemaining))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.mortgagePayment))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.propertyTax))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.repairFund))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.insurance))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.maintenance))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.totalPropertyCosts))}
                  </td>
                  
                  {/* Result A */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-semibold leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-a-dot)' }}>
                    {formatCzk(Math.round(lastRow.propertyValue))}
                  </td>

                  {/* Scenario B - operational columns */}
                  <td className="whitespace-nowrap border-l border-l-[#E5E7EB] px-2 py-0.5 text-right text-[12px] font-normal leading-[1.25] text-[var(--color-primary)] first:pl-6 last:pr-6 md:py-[3px]">
                    {formatCzk(Math.round(lastRow.rent))}
                  </td>
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-semibold leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-b-dot)', opacity: 0.8 }}>
                    {formatCzk(Math.round(lastRow.savedComparedToOwnership))}
                  </td>
                  
                  {/* Result B */}
                  <td className="whitespace-nowrap px-2 py-0.5 text-right text-[12px] font-semibold leading-[1.25] first:pl-6 last:pr-6 md:py-[3px]" style={{ color: 'var(--scenario-b-dot)' }}>
                    {formatCzk(Math.round(lastRow.etfPortfolioValue))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

