"use client";

import { formatCzk } from "@/lib/format";

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

interface YearlyBreakdownTableProps {
  rows: YearlyRow[];
}

export function YearlyBreakdownTable({ rows }: YearlyBreakdownTableProps) {
  return (
    <div 
      className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]"
      style={{ maxWidth: "1200px" }}
    >
      {/* Section header inside card */}
      <div className="border-b border-[var(--color-border)] px-6 py-5">
        <h2 className="calc-section-title text-xl">
          Vývoj v čase (podrobný přehled)
        </h2>
        <p className="mt-1.5 max-w-[560px] font-uiSans text-sm leading-relaxed text-[var(--color-secondary)]">
          Ukazujeme přehled po jednotlivých letech pro oba scénáře.
        </p>
      </div>

      {/* Table container with vertical scroll */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-6 pb-6 pt-4">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[var(--bg-card)]">
            {/* Scenario grouping row */}
            <tr>
              <th className="sticky left-0 z-20 bg-[var(--bg-card)] pb-2 pt-1 text-left" rowSpan={2}>
                <span className="inline-block rounded-md bg-slate-50 px-2 py-1 font-uiSans text-xs font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Rok
                </span>
              </th>
              <th 
                colSpan={8}
                className="border-b-2 border-[var(--scenario-a-dot)] bg-[var(--scenario-a-bg)] px-3 py-2 text-left"
              >
                <span className="font-uiSans text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                  Scénář A – Byt na hypotéku
                </span>
              </th>
              <th 
                colSpan={3}
                className="border-b-2 border-[var(--scenario-b-dot)] bg-[var(--scenario-b-bg)] px-3 py-2 text-left"
              >
                <span className="font-uiSans text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                  Scénář B – Nájem + ETF
                </span>
              </th>
            </tr>
            
            {/* Column headers */}
            <tr className="border-b border-[var(--color-border)] bg-slate-50/50">
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Dluh (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Splátka (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Daň (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Fond (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Pojištění (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Údržba (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Náklady (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                  Hodnota (Kč)
                </span>
              </th>
              
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Nájem (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-medium uppercase tracking-wide text-[var(--color-secondary)]">
                  Úspora (Kč)
                </span>
              </th>
              <th className="whitespace-nowrap px-3 py-2 text-left">
                <span className="font-uiSans text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                  Portfolio (Kč)
                </span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {rows.map((row, index) => {
              const isLastRow = index === rows.length - 1;
              
              return (
                <tr 
                  key={row.year}
                  className={`
                    border-b border-slate-100/50
                    transition-colors duration-150
                    hover:bg-slate-50/30
                    ${isLastRow ? "border-b-2 border-[var(--color-border)] bg-slate-50/40" : ""}
                  `}
                >
                  <td className="sticky left-0 z-10 bg-inherit whitespace-nowrap px-3 py-1.5 text-left">
                    <span className={`font-uiSans text-[13px] ${isLastRow ? "font-semibold" : "font-medium"} text-[var(--color-secondary)]`}>
                      {row.year}
                    </span>
                  </td>
                  
                  {/* Scenario A columns */}
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.mortgageRemaining))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.mortgagePayment))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.propertyTax))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.repairFund))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.insurance))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.maintenance))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.totalPropertyCosts))}
                  </td>
                  <td className={`whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums ${isLastRow ? "font-semibold" : "font-medium"} text-[var(--color-primary)]`}>
                    {formatCzk(Math.round(row.propertyValue))}
                  </td>
                  
                  {/* Scenario B columns */}
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.rent))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums text-[var(--color-primary)]">
                    {formatCzk(Math.round(row.savedComparedToOwnership))}
                  </td>
                  <td className={`whitespace-nowrap px-3 py-1.5 text-right font-uiSans text-[13px] tabular-nums ${isLastRow ? "font-semibold" : "font-medium"} text-[var(--color-primary)]`}>
                    {formatCzk(Math.round(row.etfPortfolioValue))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
