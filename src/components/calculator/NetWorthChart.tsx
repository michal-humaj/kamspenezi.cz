"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLOR_A = "#C2410C"; // terracotta — matches --scenario-a-dot
const COLOR_B = "#2F5C45"; // forest green — matches --scenario-b-dot

interface NetWorthChartProps {
  netWorthA: number[]; // length 31, years 0–30
  netWorthB: number[]; // length 31, years 0–30
  labelA: string;
  labelB: string;
}

function fmtMillions(value: number): string {
  return (
    (value / 1_000_000).toLocaleString("cs-CZ", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) + " mil. Kč"
  );
}

function yAxisFormatter(value: number): string {
  return (
    (value / 1_000_000).toLocaleString("cs-CZ", { maximumFractionDigits: 0 }) +
    " mil."
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length < 2) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg text-sm font-uiSans">
      <p className="font-semibold text-gray-700 mb-2">Rok {label}</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLOR_A }} />
          <span className="text-gray-600">{payload[0]?.name}:</span>
          <span className="font-medium text-gray-800">{fmtMillions(payload[0]?.value ?? 0)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLOR_B }} />
          <span className="text-gray-600">{payload[1]?.name}:</span>
          <span className="font-medium text-gray-800">{fmtMillions(payload[1]?.value ?? 0)}</span>
        </div>
      </div>
    </div>
  );
}

export function NetWorthChart({ netWorthA, netWorthB, labelA, labelB }: NetWorthChartProps) {
  const chartData = Array.from({ length: 31 }, (_, i) => ({
    year: i,
    a: netWorthA[i] ?? 0,
    b: netWorthB[i] ?? 0,
  }));

  return (
    <div className="rounded-none md:rounded-[24px] md:bg-white md:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.06)] px-0 py-6 md:px-8 md:py-8">
      {/* External legend */}
      <div className="flex items-center gap-6 mb-4 px-4 md:px-0">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: COLOR_A }} />
          <span className="font-uiSans text-sm font-medium text-gray-600">{labelA}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: COLOR_B }} />
          <span className="font-uiSans text-sm font-medium text-gray-600">{labelB}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] md:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLOR_A} stopOpacity={0.15} />
                <stop offset="95%" stopColor={COLOR_A} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLOR_B} stopOpacity={0.15} />
                <stop offset="95%" stopColor={COLOR_B} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="year"
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "var(--font-ui-sans)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}`}
            />

            <YAxis
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "var(--font-ui-sans)" }}
              axisLine={false}
              tickLine={false}
              width={56}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="a"
              name={labelA}
              stroke={COLOR_A}
              strokeWidth={2}
              fill="url(#gradA)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: COLOR_A }}
            />
            <Area
              type="monotone"
              dataKey="b"
              name={labelB}
              stroke={COLOR_B}
              strokeWidth={2}
              fill="url(#gradB)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: COLOR_B }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
