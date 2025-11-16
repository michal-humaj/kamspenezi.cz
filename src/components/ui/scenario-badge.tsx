import { cn } from "@/lib/utils";

type Scenario = "A" | "B";

const SCENARIO_STYLES: Record<
  Scenario,
  { container: string; dot: string }
> = {
  A: {
    container: "bg-accent-peachSoft",
    dot: "bg-accent-peach",
  },
  B: {
    container: "bg-accent-lilacSoft",
    dot: "bg-accent-lilac",
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
        "inline-flex items-center gap-2 rounded-pill px-3 py-1 text-body-sm font-medium text-text-main",
        style.container,
        className
      )}
    >
      <span
        className={cn("h-2.5 w-2.5 rounded-full", style.dot)}
        aria-hidden
      />
      {label}
    </span>
  );
}

