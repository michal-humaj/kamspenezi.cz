"use client";

import { formatCzk } from "@/lib/format";

export type YearlyRow = {
  year: number;
  // Scenario B: Nájem + ETF
  rentPaid: number;
  netAdvantageVsOwnership: number;
  etfPortfolioValue: number;
  // Scenario A: Byt na hypotéku
  propertyValue: number;
  mortgageBalance: number;
  totalPropertyCosts: number;
  mortgagePayment: number;
  propertyTax: number;
  repairFund: number;
  propertyInsurance: number;
  maintenanceCost: number;
};

interface YearlyBreakdownTableProps {
  data: YearlyRow[];
}

export function YearlyBreakdownTable({ data }: YearlyBreakdownTableProps) {
  const isLastRow = (index: number) => index === data.length - 1;

  return (
    <section className="hidden md:block w-full mt-8 md:mt-10 mb-16">
      {/* Section Header */}
      <div className="mx-auto px-4 md:px-6 space-y-2 mb-4">
        <h2 className="font-displaySerif text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-primary)]">
          Vývoj v čase (podrobný přehled)
        </h2>
        <p className="font-uiSans text-sm text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      {/* Scrollable Table Container */}
      <div className="px-4 md:px-6">
        <div className="relative w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-base" style={{ fontFeatureSettings: '"tnum" 1, "lnum" 1' }}>
            <thead className="sticky top-0 z-20 bg-white shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
              {/* Header Row 1: Scenario Grouping */}
              <tr className="border-b border-slate-200">
                <th 
                  rowSpan={2} 
                  className="sticky left-0 z-30 bg-white px-4 py-2 lg:py-1 text-left font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]"
                  style={{ boxShadow: '2px 0 0 0 rgba(226, 232, 240, 1)', width: '70px', minWidth: '70px' }}
                >
                  Rok
                </th>
                <th 
                  colSpan={8} 
                  className="px-4 py-2 lg:py-1 text-left align-bottom border-r-2 border-slate-300"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--scenario-a-dot)' }} />
                    <span>Scénář A - Byt na hypotéku</span>
                  </div>
                </th>
                <th 
                  colSpan={3} 
                  className="px-4 py-2 lg:py-1 text-left align-bottom"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--scenario-b-dot)' }} />
                    <span>Scénář B - Nájem + ETF</span>
                  </div>
                </th>
              </tr>

              {/* Header Row 2: Column Labels */}
              <tr className="border-b-2 border-slate-300">
                {/* Scenario A Columns */}
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '100px' }}>
                  Dlužná částka hypotéky
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '100px' }}>
                  Součet nákladů na nemovitost
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '90px' }}>
                  Splátka hypotéky
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '90px' }}>
                  Daň z nemovitosti
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '80px' }}>
                  Fond oprav
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '90px' }}>
                  Pojištění nemovitosti
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '90px' }}>
                  Náklady na údržbu
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-semibold text-[var(--color-primary)] bg-slate-50 border-r-2 border-slate-300" style={{ minWidth: '110px' }}>
                  Hodnota nemovitosti (výsledek)
                </th>

                {/* Scenario B Columns */}
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-semibold text-[var(--color-primary)] bg-slate-50" style={{ minWidth: '110px' }}>
                  Hodnota ETF portfolia (výsledek)
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '100px' }}>
                  Ušetřeno oproti vlastnictví
                </th>
                <th className="px-3 py-1.5 lg:py-0.5 text-right text-xs font-medium text-[var(--color-secondary)]" style={{ minWidth: '80px' }}>
                  Nájem
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => {
                const isLast = isLastRow(index);
                
                return (
                  <tr
                    key={row.year}
                    className={`transition-colors ${
                      isLast 
                        ? 'border-t-2 border-slate-300 bg-slate-100' 
                        : 'border-b border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    {/* Year Column - Sticky */}
                    <td 
                      className={`sticky left-0 z-10 px-4 py-1.5 lg:py-0.5 text-left font-uiSans text-sm ${
                        isLast ? 'font-semibold bg-slate-100' : 'font-medium bg-white group-hover:bg-slate-50'
                      } tabular-nums text-[var(--color-primary)]`}
                      style={{ boxShadow: '2px 0 0 0 rgba(226, 232, 240, 1)', width: '70px', minWidth: '70px' }}
                    >
                      {isLast ? (
                        <div className="flex flex-col">
                          <span>Rok {row.year}</span>
                          <span className="text-[10px] font-normal uppercase tracking-wide text-[var(--color-secondary)]">
                            Výsledek
                          </span>
                        </div>
                      ) : (
                        row.year
                      )}
                    </td>

                    {/* Scenario A: Byt na hypotéku */}
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.mortgageBalance)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.totalPropertyCosts)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.mortgagePayment)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.propertyTax)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.repairFund)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.propertyInsurance)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.maintenanceCost)} Kč
                    </td>
                    <td className={`px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums ${isLast ? 'font-semibold' : 'font-medium'} text-[var(--color-primary)] bg-slate-50 border-r-2 border-slate-300 whitespace-nowrap`}>
                      {formatCzk(row.propertyValue)} Kč
                    </td>

                    {/* Scenario B: Nájem + ETF */}
                    <td className={`px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums ${isLast ? 'font-semibold' : 'font-medium'} text-[var(--color-primary)] bg-slate-50 whitespace-nowrap`}>
                      {formatCzk(row.etfPortfolioValue)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.netAdvantageVsOwnership)} Kč
                    </td>
                    <td className="px-3 py-1.5 lg:py-0.5 text-right text-sm tabular-nums text-[var(--color-secondary)] whitespace-nowrap">
                      {formatCzk(row.rentPaid)} Kč
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
