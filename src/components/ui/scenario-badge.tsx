import { cn } from "@/lib/utils";

type Scenario = "A" | "B";

const SCENARIO_STYLES: Record<
  Scenario,
  { container: string; dot: string }
> = {
  A: {
    container: "bg-scenarioA/10",
    dot: "bg-scenarioA",
  },
  B: {
    container: "bg-scenarioB/10",
    dot: "bg-scenarioB",
  },
};

interface ScenarioBadgeProps {
  scenario: Scenario;
  label: string;
  className?: string;
}

export function ScenarioBadge({
  scenario,
  label,
  className,
}: ScenarioBadgeProps) {
  const style = SCENARIO_STYLES[scenario];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-xs font-medium text-brand-text",
        style.container,
        className
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", style.dot)}
        aria-hidden
      />
      {label}
    </span>
  );
}

