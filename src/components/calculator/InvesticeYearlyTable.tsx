"use client";

import { formatCzk } from "@/lib/format";
import { Download } from "lucide-react";
import { trackCalculatorEvent } from "@/lib/analytics";

export type InvesticeYearlyRow = {
  year: number;
  // Scenario A
  propertyValue: number;
  rentIncome: number;
  operatingCosts: number;
  mortgagePayment: number;
  principalPaid: number;
  interestPaid: number;
  remainingDebt: number;
  depreciation: number;
  taxBase: number;
  incomeTax: number;
  netCashflow: number;
  sideFundValue: number;
  netWorthA: number;          // propertyValue - remainingDebt + sideFundValue
  // Scenario B
  etfPortfolioValue: number;
};

interface InvesticeYearlyTableProps {
  rows: InvesticeYearlyRow[];
}

function formatValue(val: number) {
  if (val === 0) return <span className="text-slate-300">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

export function InvesticeYearlyTable({ rows }: InvesticeYearlyTableProps) {
  const handleExport = () => {
    trackCalculatorEvent("export_table_clicked", "investice_yearly_overview");
    
    // CSV export
    const headers = [
      "Rok",
      "Hodnota nemovitosti",
      "Příjem z nájmu",
      "Provozní náklady",
      "Splátka hypotéky",
      "Jistina",
      "Úroky",
      "Dlužná částka",
      "Odpisy",
      "Základ daně",
      "Daň z příjmu",
      "Čistý cashflow",
      "Vedlejší fond",
      "Čisté jmění (A)",
      "ETF portfolio (B)",
    ];

    const csvRows = rows.map((r) =>
      [
        r.year,
        Math.round(r.propertyValue),
        Math.round(r.rentIncome),
        Math.round(r.operatingCosts),
        Math.round(r.mortgagePayment),
        Math.round(r.principalPaid),
        Math.round(r.interestPaid),
        Math.round(r.remainingDebt),
        Math.round(r.depreciation),
        Math.round(r.taxBase),
        Math.round(r.incomeTax),
        Math.round(r.netCashflow),
        Math.round(r.sideFundValue),
        Math.round(r.netWorthA),
        Math.round(r.etfPortfolioValue),
      ].join(";")
    );

    const csv = [headers.join(";"), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investice-kalkulacka-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mb-10 mt-8">
      <div className="relative left-1/2 -ml-[50vw] w-screen px-4 md:px-6">
        <div className="mx-auto max-w-[95%] xl:max-w-[1400px] 2xl:max-w-[1600px]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between bg-white">
              <div>
                <h2 className="section-title mb-0">
                  Vývoj v čase (podrobný přehled)
                </h2>
                <p className="mt-1 max-w-[560px] font-uiSans text-sm leading-relaxed text-[#6B7280]">
                  Přehled po jednotlivých letech pro investiční byt i ETF portfolio.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-uiSans text-[13px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] focus-visible:ring-offset-2"
                onClick={handleExport}
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span>Exportovat CSV</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse font-uiSans text-sm tabular-nums">
                <thead>
                  {/* Super-headers */}
                  <tr className="border-b border-slate-200">
                    <th className="bg-white px-3 py-3 text-right text-xs font-semibold tracking-normal uppercase text-slate-500 sticky left-0 z-20" />
                    <th colSpan={13} className="bg-white px-3 py-3 text-left text-xs font-semibold tracking-normal uppercase text-slate-500">
                      Scénář A: Investiční byt na hypotéku
                    </th>
                    <th className="bg-[#FBFBFF] border-l-2 border-slate-300 px-3 py-3 text-left text-xs font-semibold tracking-normal uppercase text-slate-500">
                      Scénář B: ETF
                    </th>
                  </tr>

                  {/* Column headers */}
                  <tr className="border-b border-slate-200">
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-semibold text-[#0F172A] sticky left-0 z-20 whitespace-normal">
                      Rok
                    </th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#0F172A] whitespace-normal">Hodnota nemovitosti</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Příjem z nájmu</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Provozní náklady</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Splátka hypotéky</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Jistina</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Úroky</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#0F172A] whitespace-normal">Dlužná částka</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Odpisy</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Základ daně</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Daň z příjmu</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#6B7280] whitespace-normal">Čistý cashflow</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-normal text-[#0F172A] whitespace-normal">Vedlejší fond</th>
                    <th className="bg-white px-3 py-3 text-right align-bottom text-xs font-semibold text-[#0F172A] whitespace-normal">Čisté jmění (A)</th>
                    <th className="bg-[#FBFBFF] border-l-2 border-slate-300 px-3 py-3 text-right align-bottom text-xs font-semibold text-[#0F172A] whitespace-normal">ETF portfolio (B)</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => {
                    const isLastRow = row.year === 30;
                    const cellBgA = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";
                    const cellBgB = isLastRow ? "bg-slate-100" : "bg-[#FBFBFF] group-hover:bg-slate-50";
                    const stickyBg = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";

                    return (
                      <tr key={row.year} className={`group transition-colors duration-150 ${isLastRow ? "" : "hover:bg-slate-50"}`}>
                        <td className={`sticky left-0 z-20 px-3 py-1 text-right text-[12px] leading-tight font-semibold text-[#0F172A] ${stickyBg}`}>
                          {row.year}
                        </td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>{formatValue(Math.round(row.propertyValue))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.rentIncome))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.operatingCosts))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.mortgagePayment))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.principalPaid))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.interestPaid))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>{formatValue(Math.round(row.remainingDebt))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.depreciation))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.taxBase))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.incomeTax))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight text-[#6B7280] ${cellBgA}`}>{formatValue(Math.round(row.netCashflow))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight font-medium text-[#0F172A] ${cellBgA}`}>{formatValue(Math.round(row.sideFundValue))}</td>
                        <td className={`px-3 py-1 text-right text-[12px] leading-tight font-bold text-[#0F172A] ${cellBgA}`}>{formatValue(Math.round(row.netWorthA))}</td>
                        <td className={`border-l-2 border-slate-300 px-3 py-1 text-right text-[12px] leading-tight font-bold text-[#0F172A] ${cellBgB}`}>{formatValue(Math.round(row.etfPortfolioValue))}</td>
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
