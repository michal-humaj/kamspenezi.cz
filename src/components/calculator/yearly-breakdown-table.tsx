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
    <div className="mx-auto max-w-[1280px] overflow-x-auto rounded-3xl bg-white px-8 py-6 shadow-sm" style={{
      border: "1px solid var(--color-border)",
    }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th 
              className="border-b border-slate-200 pb-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              rowSpan={2}
            >
              Rok
            </th>
            <th 
              colSpan={8}
              className="border-b-2 border-orange-300 pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Scénář A – Byt na hypotéku
            </th>
            <th 
              colSpan={3}
              className="border-b-2 border-purple-300 pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Scénář B – Nájem + ETF
            </th>
          </tr>
          
          <tr className="border-b border-slate-200">
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Dlužná částka hypotéky (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Splátka hypotéky (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Daň z nemovitosti (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Fond oprav (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Pojištění (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Náklady na údržbu (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Součet nákladů (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Hodnota nemovitosti (Kč)
            </th>
            
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Nájem (Kč)
            </th>
            <th className="whitespace-normal pb-3 pr-4 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Ušetřeno oproti vlastnictví (Kč)
            </th>
            <th className="whitespace-normal pb-3 pt-2 text-left text-[11px] font-medium leading-snug text-slate-500">
              Hodnota ETF portfolia (Kč)
            </th>
          </tr>
        </thead>
        
        <tbody>
          {rows.map((row, index) => {
            const isLastRow = index === rows.length - 1;
            const isEvenRow = index % 2 === 0;
            
            return (
              <tr 
                key={row.year}
                className={`
                  border-b border-slate-100
                  ${isEvenRow ? "bg-slate-50" : "bg-white"}
                  ${isLastRow ? "border-t border-slate-200 bg-slate-50 font-semibold" : ""}
                `}
              >
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900">
                  {row.year}
                </td>
                
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.mortgageRemaining))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.mortgagePayment))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.propertyTax))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.repairFund))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.insurance))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.maintenance))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.totalPropertyCosts))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-semibold text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.propertyValue))}
                </td>
                
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.rent))}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-[13px] font-medium text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.savedComparedToOwnership))}
                </td>
                <td className="whitespace-nowrap py-2.5 text-[13px] font-semibold text-slate-900 tabular-nums">
                  {formatCzk(Math.round(row.etfPortfolioValue))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

