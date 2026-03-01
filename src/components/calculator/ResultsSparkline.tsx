"use client";

const COLOR_A = "#C2410C"; // terracotta
const COLOR_B = "#2F5C45"; // forest green
const W = 300;
const H = 90;

interface ResultsSparklineProps {
  netWorthA: number[]; // length 31, years 0–30
  netWorthB: number[]; // length 31, years 0–30
  legendA?: string;
  legendB?: string;
}

function toPoints(values: number[], minVal: number, maxVal: number): string {
  const range = maxVal - minVal || 1;
  return values
    .map((v, i) => {
      const x = (i / 30) * W;
      const y = H - ((v - minVal) / range) * (H * 0.9); // slight top inset so strokes don't clip
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ResultsSparkline({
  netWorthA,
  netWorthB,
  legendA = "Scénář A",
  legendB = "Scénář B",
}: ResultsSparklineProps) {
  const allValues = [...netWorthA, ...netWorthB];
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(...allValues, 0);

  // Determine winner from year-30 values to set line opacity
  const aFinal = netWorthA[30] ?? 0;
  const bFinal = netWorthB[30] ?? 0;
  const winnerLine: "A" | "B" | "tie" =
    aFinal > bFinal ? "A" : aFinal < bFinal ? "B" : "tie";

  const opacityA = winnerLine === "B" ? 0.7 : 1;
  const opacityB = winnerLine === "A" ? 0.7 : 1;
  const strokeWidthA = winnerLine === "B" ? 2 : 2.5;
  const strokeWidthB = winnerLine === "A" ? 2 : 2.5;

  const pointsA = toPoints(netWorthA, minVal, maxVal);
  const pointsB = toPoints(netWorthB, minVal, maxVal);

  return (
    <div className="w-full">
      {/* Micro-legend — subtle, 11px, #9CA3AF */}
      <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#9CA3AF" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLOR_A,
              opacity: opacityA,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {legendA}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#9CA3AF" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: COLOR_B,
              opacity: opacityB,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          {legendB}
        </span>
      </div>
      {/* Chart — x=0 maps to left edge, overflow visible so strokes aren't clipped */}
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", overflow: "visible" }}
      >
        <polyline
          points={pointsB}
          stroke={COLOR_B}
          strokeWidth={strokeWidthB}
          strokeOpacity={opacityB}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={pointsA}
          stroke={COLOR_A}
          strokeWidth={strokeWidthA}
          strokeOpacity={opacityA}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
