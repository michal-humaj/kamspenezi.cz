"use client";

import { formatCzk } from "@/lib/format";
import { Download } from "lucide-react";
import { trackCalculatorEvent } from "@/lib/analytics";

export type YearlyRow = {
  year: number;
  // Scenario A: mortgage
  mortgageRemaining: number;
  mortgagePayment: number;
  // Scenario A: recurring costs
  propertyTax: number;
  repairFund: number;
  insurance: number;
  maintenance: number;
  taxSaving: number;          // Daňová úspora z odpočtu úroků
  totalPropertyCosts: number; // Celkové náklady na nemovitost
  // Scenario A: side fund
  savingsA: number;           // Ušetřeno oproti nájmu
  sideFundA: number;          // Zhodnocené úspory — vedlejší fond
  // Scenario A: asset overview
  propertyValue: number;
  propertyNetWorth: number;   // Kept for compat
  netWorthA: number;          // Čisté jmění Scénář A
  // Scenario B
  rent: number;
  savingsB: number;           // Ušetřeno oproti vlastnímu bydlení
  portfolioValue: number;     // Hodnota investičního portfolia (ETF)
};

interface YearlyOverviewTableProps {
  rows: YearlyRow[];
}

function formatValue(val: number) {
  if (val === 0) return <span className="text-slate-400">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

export function YearlyOverviewTable({ rows }: YearlyOverviewTableProps) {
  // ── Shared column-header class (uniform across all groups) ────────────────
  const thA   = "bg-white px-2 py-1 text-right align-bottom text-xs font-medium tracking-normal text-[#6B7280] whitespace-normal overflow-hidden";
  const thAHi = "bg-white px-2 py-1 text-right align-bottom text-xs font-medium tracking-normal text-[#0F172A] whitespace-normal overflow-hidden";

  return (
    <section className="mb-10 overflow-x-auto">
      <div className="w-fit mx-auto rounded-3xl bg-white overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>

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
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-uiSans text-[13px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-focus-ring)] focus-visible:ring-offset-2"
            onClick={() => {
              trackCalculatorEvent("export_table_clicked", "yearly_overview");
              alert("Export bude brzy dostupný! Děkujeme za váš zájem.");
            }}
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Exportovat tabulku</span>
          </button>
        </div>

        {/* Table Wrapper */}
        <div>
          <table
            className="border-collapse font-uiSans tabular-nums"
            style={{ tableLayout: "fixed", width: `${78 * 16}px` }}
          >
            {/* 1 Rok + 12 Scénář A + 3 Scénář B = 16 columns */}
            <colgroup>
              {Array.from({ length: 16 }, (_, i) => (
                <col key={i} style={{ width: 78 }} />
              ))}
            </colgroup>

            <thead>
              {/* ── Super-headers ── */}
              <tr className="border-b border-slate-200">
                {/* empty Rok spacer */}
                <th className="bg-white px-2 py-1 text-right text-xs font-semibold tracking-normal uppercase text-slate-500 sticky left-0 z-20" />
                {/* Scénář A */}
                <th
                  colSpan={12}
                  className="bg-white px-2 py-1 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář A: Vlastní bydlení na hypotéku
                </th>
                {/* Scénář B — carries the single A/B divider */}
                <th
                  colSpan={3}
                  className="bg-white border-l-2 border-slate-300 px-2 py-1 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář B: Bydlení v nájmu a investování
                </th>
              </tr>

              {/* ── Column headers — uniform bg-white, no group tints ── */}
              <tr className="border-b border-slate-200" style={{ height: "48px" }}>
                {/* Rok */}
                <th className="bg-white px-2 py-1 text-right align-bottom text-xs font-medium tracking-normal text-[#0F172A] sticky left-0 z-20 whitespace-normal overflow-hidden">
                  Rok
                </th>
                {/* Scenario A */}
                <th className={thA}>Splátka hypotéky</th>
                <th className={thA}>Daň z nemovitosti</th>
                <th className={thA}>Fond oprav</th>
                <th className={thA}>Pojištění nemovitosti</th>
                <th className={thA}>Náklady na údržbu</th>
                <th className={thA}>Daňová úspora z odpočtu úroků</th>
                <th className={thA}>Celkové náklady</th>
                <th className={thA}>Ušetřeno oproti nájmu</th>
                <th className={thA}>Zhodnocené úspory (vedlejší fond)</th>
                <th className={thAHi}>Hodnota bytu</th>
                <th className={thA}>Dlužná částka hypotéky</th>
                {/* Summary A — no special bg */}
                <th className={thAHi}>Čisté jmění (Scénář A)</th>
                {/* Scenario B — first col carries A/B divider */}
                <th className="bg-white border-l-2 border-slate-300 px-2 py-1 text-right align-bottom text-xs font-medium tracking-normal text-[#6B7280] whitespace-normal overflow-hidden">
                  Nájemné
                </th>
                <th className={thA}>Ušetřeno oproti vlastnímu bydlení</th>
                {/* Summary B — no extra border, same header style */}
                <th className={thAHi}>Hodnota portfolia (ETF)</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isLastRow = row.year === 30;
                // No stripes — A cols white, B cols #FBFBFF, year-30 anchor
                const bgA = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";
                const bgB = isLastRow ? "bg-slate-100" : "bg-[#FBFBFF] group-hover:bg-slate-50";

                const tdGrey  = `px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgA}`;
                const tdNavy  = `px-1.5 py-1 text-right text-xs leading-tight text-[#0F172A] ${bgA}`;
                const tdGreyB = `px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgB}`;

                return (
                  <tr
                    key={row.year}
                    className="group transition-colors duration-150 border-b border-[#E5E7EB]"
                  >
                    {/* Year */}
                    <td className={`sticky left-0 z-20 px-1.5 py-1 text-right text-xs leading-tight font-semibold text-[#0F172A] ${bgA}`}>
                      {row.year}
                    </td>

                    {/* Scenario A — breakdown columns (grey) */}
                    <td className={tdGrey}>{formatValue(Math.round(row.mortgagePayment))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.propertyTax))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.repairFund))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.insurance))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.maintenance))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.taxSaving))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.totalPropertyCosts))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.savingsA))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.sideFundA))}</td>
                    {/* Key metric — navy */}
                    <td className={tdNavy}>{formatValue(Math.round(row.propertyValue))}</td>
                    <td className={tdGrey}>{formatValue(Math.round(row.mortgageRemaining))}</td>
                    {/* Summary A — bold */}
                    <td className={`px-1.5 py-1 text-right text-xs leading-tight font-bold text-[#0F172A] ${bgA}`}>
                      {formatValue(Math.round(row.netWorthA))}
                    </td>

                    {/* Scenario B — #FBFBFF tint; first col carries A/B divider */}
                    <td className={`border-l-2 border-slate-300 px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgB}`}>
                      {formatValue(Math.round(row.rent))}
                    </td>
                    <td className={tdGreyB}>{formatValue(Math.round(row.savingsB))}</td>
                    {/* Summary B — bold, no extra border */}
                    <td className={`px-1.5 py-1 text-right text-xs leading-tight font-bold text-[#0F172A] ${bgB}`}>
                      {formatValue(Math.round(row.portfolioValue))}
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
