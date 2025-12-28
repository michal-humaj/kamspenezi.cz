import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

type CalloutVariant = "info" | "warning" | "tip" | "success";

interface CalloutBoxProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantConfig: Record<CalloutVariant, {
  icon: typeof Info;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}> = {
  info: {
    icon: Info,
    bgColor: "rgba(15, 23, 42, 0.03)",
    borderColor: "var(--color-border)",
    iconColor: "var(--color-secondary)",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "#FEF3C7",
    borderColor: "#FCD34D",
    iconColor: "#D97706",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "var(--scenario-b-bg)",
    borderColor: "var(--scenario-b-dot)",
    iconColor: "var(--scenario-b-dot)",
  },
  success: {
    icon: CheckCircle,
    bgColor: "#DCFCE7",
    borderColor: "#86EFAC",
    iconColor: "#16A34A",
  },
};

export function CalloutBox({ 
  variant = "info", 
  title, 
  children,
  className = "",
}: CalloutBoxProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-2xl p-5 md:p-6 ${className}`}
      style={{
        background: config.bgColor,
        borderLeft: `3px solid ${config.borderColor}`,
      }}
    >
      <div className="flex gap-3">
        <Icon 
          className="h-5 w-5 flex-shrink-0 mt-0.5" 
          style={{ color: config.iconColor }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          {title && (
            <p 
              className="font-uiSans font-semibold text-base mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              {title}
            </p>
          )}
          <div 
            className="font-uiSans text-sm leading-relaxed"
            style={{ color: 'var(--color-secondary)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

