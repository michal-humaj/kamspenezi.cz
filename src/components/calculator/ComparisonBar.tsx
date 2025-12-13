"use client";

import * as React from "react";

interface ComparisonBarProps {
  scenarioAValue: number;
  scenarioBValue: number;
  scenarioALabel?: string;
  scenarioBLabel?: string;
}

export function ComparisonBar({
  scenarioAValue,
  scenarioBValue,
}: ComparisonBarProps) {
  const [widthA, setWidthA] = React.useState(0);
  const [widthB, setWidthB] = React.useState(0);

  React.useEffect(() => {
    const maxValue = Math.max(scenarioAValue, scenarioBValue);
    // Prevent division by zero
    if (maxValue === 0) {
      setWidthA(0);
      setWidthB(0);
      return;
    }

    // Add a small delay to trigger animation on mount
    const timer = setTimeout(() => {
      setWidthA((scenarioAValue / maxValue) * 100);
      setWidthB((scenarioBValue / maxValue) * 100);
    }, 100);

    return () => clearTimeout(timer);
  }, [scenarioAValue, scenarioBValue]);

  return (
    <div className="space-y-4">
      {/* Scenario A Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${widthA}%`,
            backgroundColor: "var(--scenario-a-dot)",
          }}
        />
      </div>

      {/* Scenario B Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${widthB}%`,
            backgroundColor: "var(--scenario-b-dot)",
          }}
        />
      </div>
    </div>
  );
}
