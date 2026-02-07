import { cn } from "@/lib/utils";

type Scenario = "A" | "B";

const SCENARIO_STYLES: Record<
  Scenario,
  { bg: string; color: string; dotBg: string }
> = {
  A: {
    bg: "var(--scenario-a-bg)",      // #FFF7ED - Light warm beige/orange
    color: "var(--scenario-a-dot)",  // #C2410C - Architectural copper/terracotta
    dotBg: "var(--scenario-a-dot)",
  },
  B: {
    bg: "var(--scenario-b-bg)",      // #E3EBE6 - Soft sage/mint
    color: "var(--scenario-b-dot)",  // #2F5C45 - Forest green
    dotBg: "var(--scenario-b-dot)",
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
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1 text-[13px] font-medium font-uiSans",
        className
      )}
      style={{
        background: style.bg,
        color: style.color,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: style.dotBg }}
        aria-hidden
      />
      {label}
    </span>
  );
}

