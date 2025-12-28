"use client";

import { ReactNode } from "react";

interface ScenarioCardProps {
  scenario: "A" | "B";
  title: string;
  subtitle: string;
  bullets: string[];
  icon?: ReactNode;
}

function ScenarioCard({ scenario, title, subtitle, bullets, icon }: ScenarioCardProps) {
  const isA = scenario === "A";
  const dotColor = isA ? "var(--scenario-a-dot)" : "var(--scenario-b-dot)";
  const bgColor = isA ? "var(--scenario-a-bg)" : "var(--scenario-b-bg)";

  return (
    <div
      className="rounded-3xl border p-6 md:p-8 transition-shadow duration-200 hover:shadow-lg"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Scenario Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium font-uiSans"
          style={{
            background: bgColor,
            color: dotColor,
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: dotColor }}
            aria-hidden="true"
          />
          Scénář {scenario}
        </span>
      </div>

      {/* Title */}
      <h3 
        className="font-uiSans text-xl font-semibold mb-2"
        style={{ color: 'var(--color-primary)' }}
      >
        {title}
      </h3>

      {/* Subtitle */}
      <p 
        className="font-uiSans text-sm mb-5"
        style={{ color: 'var(--color-secondary)' }}
      >
        {subtitle}
      </p>

      {/* Icon (optional) */}
      {icon && (
        <div className="mb-5 flex justify-center">
          {icon}
        </div>
      )}

      {/* Bullet Points */}
      <ul className="space-y-3">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ background: dotColor }}
              aria-hidden="true"
            />
            <span 
              className="font-uiSans text-sm leading-relaxed"
              style={{ color: 'var(--color-secondary)' }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ScenarioComparisonCardsProps {
  scenarioA: Omit<ScenarioCardProps, "scenario">;
  scenarioB: Omit<ScenarioCardProps, "scenario">;
}

export function ScenarioComparisonCards({ scenarioA, scenarioB }: ScenarioComparisonCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ScenarioCard scenario="A" {...scenarioA} />
      <ScenarioCard scenario="B" {...scenarioB} />
    </div>
  );
}

