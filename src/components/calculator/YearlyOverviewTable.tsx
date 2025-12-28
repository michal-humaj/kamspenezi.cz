"use client";

import { formatCzk } from "@/lib/format";
import { Download } from "lucide-react";
import { trackCalculatorEvent } from "@/lib/analytics";

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
  propertyNetWorth: number; // Hodnota bytu minus dluh
  rent: number;
  savedComparedToOwnership: number;
  portfolioValue: number; // Hodnota investičního portfolia
};

interface YearlyOverviewTableProps {
  rows: YearlyRow[];
}

/**
 * Formats numeric values according to strict "Wealthsimple" rules:
 * - 0 => "—" (light grey)
 * - Negative => Red text
 * - Standard => Czech locale spaces
 */
function formatValue(val: number) {
  if (val === 0) return <span className="text-slate-300">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

export function YearlyOverviewTable({ rows }: YearlyOverviewTableProps) {
  return (
    <section className="mb-10 mt-8">
      {/* Breakout container to exceed parent max-w-6xl */}
      <div className="relative left-1/2 -ml-[50vw] w-screen px-4 md:px-6">
        <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            
            {/* Header Section */}
            <div className="p-6 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between bg-white">
          <div>
            <h2 className="section-title mb-0">
              Vývoj v čase (podrobný přehled)
            </h2>
            <p className="mt-1 max-w-[560px] font-uiSans text-sm leading-relaxed text-[#6B7280]">
              Ukazujeme přehled po jednotlivých letech pro oba scénáře.
            </p>
            <p className="mt-2 font-uiSans text-xs font-medium text-indigo-600">
              Tabulka zobrazuje vývoj očekávané střední hodnoty (mediánu).
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-uiSans text-[13px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2"
            onClick={() => {
              // Track interest in this feature
              trackCalculatorEvent("export_table_clicked", "yearly_overview");
              // TODO: Implement CSV/Excel export
              alert("Export bude brzy dostupný! Děkujeme za váš zájem.");
            }}
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Exportovat tabulku</span>
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse font-uiSans text-sm tabular-nums">
            <thead>
              {/* Super-Headers Row */}
              <tr className="border-b border-slate-200">
                <th className="bg-white px-4 py-3 text-right text-xs font-semibold tracking-normal uppercase text-slate-500 sticky left-0 z-20">
                  {/* Empty for Year */}
                </th>
                <th 
                  colSpan={9} 
                  className="bg-white px-4 py-3 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář A: Vlastní bydlení na hypotéku
                </th>
                <th 
                  colSpan={3} 
                  className="bg-[#FBFBFF] border-l-2 border-slate-300 px-4 py-3 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář B: Bydlení v nájmu a investování
                </th>
              </tr>

              {/* Column Headers Row */}
              <tr className="border-b border-slate-200">
                {/* Sticky Year Header */}
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-semibold tracking-normal text-[#0F172A] sticky left-0 z-20 whitespace-normal">
                  Rok
                </th>

                {/* Scenario A Columns (White) - Order matched to CSV */}
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Splátka hypotéky
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Daň z nemovitosti
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Fond oprav
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Pojištění nemovitosti
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Náklady na údržbu
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#0F172A] whitespace-normal">
                  Hodnota bytu
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#0F172A] whitespace-normal">
                  Dlužná částka hypotéky
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-semibold tracking-normal text-[#0F172A] whitespace-normal">
                  Hodnota bytu minus dluh
                </th>
                <th className="bg-white px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#0F172A] whitespace-normal">
                  Celkové náklady na nemovitost
                </th>
                
                {/* Scenario B Columns (Lilac Tint + Divider) */}
                <th className="bg-[#FBFBFF] border-l-2 border-slate-300 px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Nájemné
                </th>
                <th className="bg-[#FBFBFF] px-4 py-3 text-right align-bottom text-xs font-normal tracking-normal text-[#6B7280] whitespace-normal">
                  Ušetřeno k investici
                </th>
                <th className="bg-[#FBFBFF] px-4 py-3 text-right align-bottom text-xs font-semibold tracking-normal text-[#0F172A] whitespace-normal">
                  Hodnota portfolia
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isLastRow = row.year === 30;
                // For the last row, we use bg-slate-100 and no hover effect (or keep it consistent).
                // We'll apply bg-slate-100 to cells.
                const cellBgA = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";
                const cellBgB = isLastRow ? "bg-slate-100" : "bg-[#FBFBFF] group-hover:bg-slate-50";
                const stickyBg = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";

                return (
                  <tr 
                    key={row.year} 
                    className={`group transition-colors duration-150 ${isLastRow ? "" : "hover:bg-slate-50"}`}
                  >
                    {/* Sticky Year Column */}
                    <td className={`sticky left-0 z-20 px-4 py-1 text-right text-[12px] leading-tight font-semibold text-[#0F172A] ${stickyBg}`}>
                      {row.year}
                    </td>

                    {/* Scenario A Data - Order matched to Headers */}
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>
                      {formatValue(Math.round(row.mortgagePayment))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>
                      {formatValue(Math.round(row.propertyTax))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>
                      {formatValue(Math.round(row.repairFund))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>
                      {formatValue(Math.round(row.insurance))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>
                      {formatValue(Math.round(row.maintenance))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>
                      {formatValue(Math.round(row.propertyValue))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>
                      {formatValue(Math.round(row.mortgageRemaining))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight font-bold text-[#0F172A] ${cellBgA}`}>
                      {formatValue(Math.round(row.propertyNetWorth))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>
                      {formatValue(Math.round(row.totalPropertyCosts))}
                    </td>

                    {/* Scenario B Data */}
                    <td className={`border-l-2 border-slate-300 px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgB}`}>
                      {formatValue(Math.round(row.rent))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgB}`}>
                      {formatValue(Math.round(row.savedComparedToOwnership))}
                    </td>
                    <td className={`px-4 py-1 text-right text-[12px] leading-tight font-bold text-[#0F172A] ${cellBgB}`}>
                      {formatValue(Math.round(row.portfolioValue))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
