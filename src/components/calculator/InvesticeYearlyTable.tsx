"use client";

import { formatCzk } from "@/lib/format";
import { Download } from "lucide-react";
import { trackCalculatorEvent } from "@/lib/analytics";

// ─── Row type ────────────────────────────────────────────────────────────────

export type InvesticeYearlyRow = {
  year: number;
  // Scénář A sub-costs (cols 2–5)
  propertyTax: number;
  repairFund: number;
  insurance: number;
  maintenance: number;
  // Scénář A core (cols 6–11)
  propertyValue: number;
  operatingCosts: number;
  remainingDebt: number;
  mortgagePayment: number;
  interestPaid: number;
  depreciation: number;
  // Tax calculation (cols 12–17)
  taxDeductibleCosts: number;
  rentIncome: number;
  rawTaxBase: number;
  lossCarryForward: number;
  effectiveTaxBase: number;
  incomeTax: number;
  // Cash flow (cols 18–22)
  netIncomeAfterTax: number;
  netCashflow: number;
  monthlyCashflow: number;
  sideFundValue: number;
  netWorthA: number;
  // Scénář B (cols 23–24)
  investedThisYear: number;
  etfPortfolioValue: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtVal(val: number) {
  if (val === 0) return <span className="text-slate-400">—</span>;
  if (val < 0) return <span className="text-red-600">{formatCzk(val)}</span>;
  return formatCzk(val);
}

function fmtSigned(val: number) {
  return fmtVal(val);
}

// ─── Component ───────────────────────────────────────────────────────────────

const COL_W = 78;

interface InvesticeYearlyTableProps {
  rows: InvesticeYearlyRow[];
}

export function InvesticeYearlyTable({ rows }: InvesticeYearlyTableProps) {
  const handleExport = () => {
    trackCalculatorEvent("export_table_clicked", "investice_yearly_overview");

    const headers = [
      "Rok",
      "Daň z nemovitosti",
      "Fond oprav",
      "Pojištění nemovitosti",
      "Náklady na údržbu",
      "Hodnota nemovitosti",
      "Celkové náklady na nemovitost",
      "Dlužná částka hypotéky",
      "Splátka hypotéky",
      "Zaplacené úroky hypotéky",
      "Odpisy nemovitosti",
      "Součet nákladů pro daň z příjmu",
      "Příjem z nájmu",
      "Základ daně před uplatněním ztráty",
      "Ztráta z předchozích let k dispozici",
      "Základ daně po uplatnění ztráty",
      "Daň z příjmu",
      "Čistý příjem po dani",
      "Čistý cash flow",
      "Měsíčně čistý cash flow",
      "Vedlejší fond",
      "Čisté jmění (A)",
      "Investováno v daném roce",
      "Hodnota akciového portfolia (B)",
    ];

    const csvRows = rows.map((r) =>
      [
        r.year,
        Math.round(r.propertyTax),
        Math.round(r.repairFund),
        Math.round(r.insurance),
        Math.round(r.maintenance),
        Math.round(r.propertyValue),
        Math.round(r.operatingCosts),
        Math.round(r.remainingDebt),
        Math.round(r.mortgagePayment),
        Math.round(r.interestPaid),
        Math.round(r.depreciation),
        Math.round(r.taxDeductibleCosts),
        Math.round(r.rentIncome),
        Math.round(r.rawTaxBase),
        Math.round(r.lossCarryForward),
        Math.round(r.effectiveTaxBase),
        Math.round(r.incomeTax),
        Math.round(r.netIncomeAfterTax),
        Math.round(r.netCashflow),
        Math.round(r.monthlyCashflow),
        Math.round(r.sideFundValue),
        Math.round(r.netWorthA),
        Math.round(r.investedThisYear),
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

  // ── Shared header class fragments ─────────────────────────────────────────
  const thA   = "bg-white px-2 py-1 text-right align-bottom text-xs font-medium text-[#6B7280] whitespace-normal overflow-hidden";
  const thAHi = "bg-white px-2 py-1 text-right align-bottom text-xs font-medium text-[#0F172A] whitespace-normal overflow-hidden";

  return (
    <section className="mb-10 overflow-x-auto">
      <div className="w-fit mx-auto rounded-3xl bg-white overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>

        {/* Card header */}
        <div className="p-6 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between bg-white">
          <div>
            <h2 className="section-title mb-0">Vývoj v čase (podrobný přehled)</h2>
            <p className="mt-1 max-w-[560px] font-uiSans text-sm leading-relaxed text-[#6B7280]">
              Přehled po jednotlivých letech pro investiční byt i ETF portfolio.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-uiSans text-[13px] font-medium text-[#0F172A] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-focus-ring)] focus-visible:ring-offset-2"
            onClick={handleExport}
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Exportovat CSV</span>
          </button>
        </div>

        {/* Table */}
        <div>
          <table
            className="border-collapse font-uiSans tabular-nums"
            style={{ tableLayout: "fixed", width: `${COL_W * 24}px` }}
          >
            {/* 24 columns: 1 Rok + 21 Scénář A + 2 Scénář B */}
            <colgroup>
              {Array.from({ length: 24 }, (_, i) => (
                <col key={i} style={{ width: COL_W }} />
              ))}
            </colgroup>

            <thead>
              {/* ── Super-header row ── */}
              <tr className="border-b border-slate-100">
                {/* empty Rok spacer */}
                <th className="bg-white px-2 py-1 sticky left-0 z-20" />
                {/* Scénář A */}
                <th
                  colSpan={21}
                  className="bg-white px-2 py-1 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář A: Investiční byt na hypotéku
                </th>
                {/* Scénář B */}
                <th
                  colSpan={2}
                  className="bg-white border-l-2 border-slate-300 px-2 py-1 text-left text-xs font-semibold tracking-normal uppercase text-slate-500"
                >
                  Scénář B: ETF
                </th>
              </tr>

              {/* ── Column label row ── */}
              <tr className="border-b border-slate-200" style={{ height: "48px" }}>
                {/* Rok */}
                <th className="bg-white px-2 py-1 text-right align-bottom text-xs font-medium text-[#0F172A] sticky left-0 z-20 whitespace-normal overflow-hidden">
                  Rok
                </th>
                {/* cols 2–5: sub-costs */}
                <th className={thA} style={{ minWidth: COL_W }}>Daň z nemovitosti</th>
                <th className={thA} style={{ minWidth: COL_W }}>Fond oprav</th>
                <th className={thA} style={{ minWidth: COL_W }}>Pojištění nemovitosti</th>
                <th className={thA} style={{ minWidth: COL_W }}>Náklady na údržbu</th>
                {/* cols 6–11: core */}
                <th className={thAHi} style={{ minWidth: COL_W }}>Hodnota nemovitosti</th>
                <th className={thA}  style={{ minWidth: COL_W }}>Celkové náklady na nemovitost</th>
                <th className={thA}  style={{ minWidth: COL_W }}>Dlužná částka hypotéky</th>
                <th className={thA}  style={{ minWidth: COL_W }}>Splátka hypotéky</th>
                <th className={thA}  style={{ minWidth: COL_W }}>Zaplacené úroky hypotéky</th>
                <th className={thA}  style={{ minWidth: COL_W }}>Odpisy nemovitosti</th>
                {/* cols 12–17: tax */}
                <th className={thA}   style={{ minWidth: COL_W }}>Součet nákladů pro daň z příjmu</th>
                <th className={thAHi} style={{ minWidth: COL_W }}>Příjem z nájmu</th>
                <th className={thA}   style={{ minWidth: COL_W }}>Základ daně před uplatněním ztráty</th>
                <th className={thA}   style={{ minWidth: COL_W }}>Ztráta z předchozích let k dispozici</th>
                <th className={thA}   style={{ minWidth: COL_W }}>Základ daně po uplatnění ztráty</th>
                <th className={thA}   style={{ minWidth: COL_W }}>Daň z příjmu</th>
                {/* cols 18–21: cash flow */}
                <th className={thA} style={{ minWidth: COL_W }}>Čistý příjem po dani</th>
                <th className={thA} style={{ minWidth: COL_W }}>Čistý cash flow</th>
                <th className={thA} style={{ minWidth: COL_W }}>Měsíčně čistý cash flow</th>
                <th className={thA} style={{ minWidth: COL_W }}>Vedlejší fond</th>
                {/* col 22: netWorthA summary */}
                <th className={thAHi} style={{ minWidth: COL_W }}>Čisté jmění (A)</th>
                {/* col 23: first B col — carries the A/B divider */}
                <th className="bg-white border-l-2 border-slate-300 px-2 py-1 text-right align-bottom text-xs font-medium text-[#6B7280] whitespace-normal overflow-hidden" style={{ minWidth: COL_W }}>
                  Investováno v daném roce
                </th>
                {/* col 24: ETF summary */}
                <th className={thAHi} style={{ minWidth: COL_W }}>Hodnota akciového portfolia (B)</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const isLastRow = row.year === 30;
                const bgA = isLastRow ? "bg-slate-100" : "bg-white group-hover:bg-slate-50";
                const bgB = isLastRow ? "bg-slate-100" : "bg-[#FBFBFF] group-hover:bg-slate-50";

                const tdGrey  = `px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgA}`;
                const tdNavy  = `px-1.5 py-1 text-right text-xs leading-tight text-[#0F172A] ${bgA}`;
                const tdGreyB = `px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgB}`;

                return (
                  <tr
                    key={row.year}
                    className="group transition-colors duration-100 border-b border-[#E5E7EB]"
                  >
                    {/* Rok — sticky left */}
                    <td className={`sticky left-0 z-20 px-1.5 py-1 text-right text-xs leading-tight font-semibold text-[#0F172A] ${bgA}`}>
                      {row.year}
                    </td>

                    {/* cols 2–5: sub-costs */}
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.propertyTax))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.repairFund))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.insurance))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.maintenance))}</td>

                    {/* cols 6–11: core */}
                    <td className={tdNavy} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.propertyValue))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.operatingCosts))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.remainingDebt))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.mortgagePayment))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.interestPaid))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.depreciation))}</td>

                    {/* cols 12–17: tax */}
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.taxDeductibleCosts))}</td>
                    <td className={tdNavy} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.rentIncome))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtSigned(Math.round(row.rawTaxBase))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtSigned(Math.round(row.lossCarryForward))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.effectiveTaxBase))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.incomeTax))}</td>

                    {/* cols 18–21: cash flow */}
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtSigned(Math.round(row.netIncomeAfterTax))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtSigned(Math.round(row.netCashflow))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtSigned(Math.round(row.monthlyCashflow))}</td>
                    <td className={tdGrey} style={{ minWidth: COL_W }}>{fmtVal(Math.round(row.sideFundValue))}</td>

                    {/* col 22: netWorthA — bold summary */}
                    <td className={`px-1.5 py-1 text-right text-xs leading-tight font-bold text-[#0F172A] ${bgA}`} style={{ minWidth: COL_W }}>
                      {fmtVal(Math.round(row.netWorthA))}
                    </td>

                    {/* col 23: investedThisYear — first B col, A/B divider */}
                    <td className={`border-l-2 border-slate-300 px-1.5 py-1 text-right text-xs leading-tight text-[#6B7280] ${bgB}`} style={{ minWidth: COL_W }}>
                      {fmtVal(Math.round(row.investedThisYear))}
                    </td>

                    {/* col 24: etfPortfolioValue — bold summary */}
                    <td className={`px-1.5 py-1 text-right text-xs leading-tight font-bold text-[#0F172A] ${bgB}`} style={{ minWidth: COL_W }}>
                      {fmtVal(Math.round(row.etfPortfolioValue))}
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
