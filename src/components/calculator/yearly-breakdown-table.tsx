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
    <section className="hidden lg:block w-full">
      {/* Section Header */}
      <div className="mx-auto px-6 space-y-2 mb-4 max-w-7xl">
        <h3 className="font-displaySerif text-2xl font-bold text-[var(--color-primary)]">
          Vývoj v čase (podrobný přehled)
        </h3>
        <p className="font-uiSans text-sm text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      {/* Table Container - Centered and sized to content */}
      <div className="w-full overflow-x-auto px-6">
        <div className="flex justify-center">
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] overflow-hidden">
            <table className="border-collapse" style={{ fontFeatureSettings: '"tnum" 1, "lnum" 1' }}>
            <thead>
              {/* Header Row 1: Scenario Grouping */}
              <tr className="border-b border-slate-200">
                <th 
                  rowSpan={2} 
                  className="sticky left-0 top-0 z-30 bg-white px-4 py-3 text-left font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)] border-r border-slate-200"
                  style={{ boxShadow: '2px 0 4px rgba(0,0,0,0.03)', width: '70px', minWidth: '70px' }}
                >
                  Rok
                </th>
                <th 
                  colSpan={3} 
                  className="sticky top-0 z-20 px-4 py-3 text-left font-uiSans text-sm font-semibold text-[var(--color-primary)] border-r-2 border-slate-300"
                  style={{ backgroundColor: 'rgba(125, 90, 226, 0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--scenario-b-dot)' }}
                    />
                    <span className="whitespace-nowrap">Scénář B: Nájem + ETF</span>
                  </div>
                </th>
                <th 
                  colSpan={8} 
                  className="sticky top-0 z-20 px-4 py-3 text-left font-uiSans text-sm font-semibold text-[var(--color-primary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.06)' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--scenario-a-dot)' }}
                    />
                    <span className="whitespace-nowrap">Scénář A: Byt na hypotéku</span>
                  </div>
                </th>
              </tr>

              {/* Header Row 2: Column Labels */}
              <tr className="border-b-2 border-slate-200">
                {/* Scenario B Columns */}
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(125, 90, 226, 0.04)', minWidth: '85px', width: '85px' }}
                >
                  Nájem
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(125, 90, 226, 0.04)', minWidth: '95px', width: '95px' }}
                >
                  Ušetřeno oproti vlastnictví
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-primary)] border-r-2 border-slate-300"
                  style={{ backgroundColor: 'rgba(125, 90, 226, 0.04)', minWidth: '120px', width: '120px' }}
                >
                  <div className="flex flex-col items-end gap-1">
                    <span>Hodnota ETF portfolia</span>
                    <span className="inline-flex items-center rounded-md border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-secondary)] whitespace-nowrap">
                      VÝSLEDEK
                    </span>
                  </div>
                </th>

                {/* Scenario A Columns */}
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '120px', width: '120px' }}
                >
                  <div className="flex flex-col items-end gap-1">
                    <span>Hodnota nemovitosti</span>
                    <span className="inline-flex items-center rounded-md border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-secondary)] whitespace-nowrap">
                      VÝSLEDEK
                    </span>
                  </div>
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '95px', width: '95px' }}
                >
                  Dlužná částka hypotéky
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '95px', width: '95px' }}
                >
                  Součet nákladů na nemovitost
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '85px', width: '85px' }}
                >
                  Splátka hypotéky
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '80px', width: '80px' }}
                >
                  Daň z nemovitosti
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '75px', width: '75px' }}
                >
                  Fond oprav
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '85px', width: '85px' }}
                >
                  Pojištění nemovitosti
                </th>
                <th 
                  className="sticky top-[53px] z-20 px-4 py-3 text-right font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]"
                  style={{ backgroundColor: 'rgba(201, 141, 78, 0.04)', minWidth: '85px', width: '85px' }}
                >
                  Náklady na údržbu
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => {
                const isLast = isLastRow(index);
                
                return (
                  <tr
                    key={row.year}
                    className={`${
                      isLast 
                        ? 'border-t-2 border-slate-300 bg-slate-50' 
                        : index % 2 === 0 
                          ? 'bg-white border-b border-slate-100' 
                          : 'bg-slate-50/50 border-b border-slate-100'
                    }`}
                  >
                    {/* Year Column - Sticky */}
                    <td 
                      className={`sticky left-0 z-10 px-4 py-2.5 text-left font-uiSans text-sm ${
                        isLast ? 'font-semibold bg-slate-50' : 'font-medium bg-white'
                      } tabular-nums text-[var(--color-primary)] border-r border-slate-200`}
                      style={isLast ? { width: '70px', minWidth: '70px' } : { boxShadow: '2px 0 4px rgba(0,0,0,0.03)', width: '70px', minWidth: '70px' }}
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

                    {/* Scenario B: Nájem + ETF */}
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.rentPaid)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.netAdvantageVsOwnership)} Kč</span>
                    </td>
                    <td className={`px-4 py-2.5 text-right font-uiSans text-sm tabular-nums ${isLast ? 'font-bold' : ''} text-[var(--color-primary)] border-r-2 border-slate-300`}>
                      <span className="whitespace-nowrap">{formatCzk(row.etfPortfolioValue)} Kč</span>
                    </td>

                    {/* Scenario A: Byt na hypotéku */}
                    <td className={`px-4 py-2.5 text-right font-uiSans text-sm tabular-nums ${isLast ? 'font-bold' : ''} text-[var(--color-primary)]`}>
                      <span className="whitespace-nowrap">{formatCzk(row.propertyValue)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.mortgageBalance)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.totalPropertyCosts)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.mortgagePayment)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.propertyTax)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.repairFund)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.propertyInsurance)} Kč</span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-uiSans text-sm tabular-nums text-[var(--color-secondary)]">
                      <span className="whitespace-nowrap">{formatCzk(row.maintenanceCost)} Kč</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </section>
  );
}
