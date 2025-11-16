"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithUnitProps {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  helperText: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "number";
  step?: string;
  min?: number;
  max?: number;
  isAnimating?: boolean;
}

export function InputWithUnit({
  id,
  label,
  value,
  unit,
  helperText,
  onChange,
  onBlur,
  type = "text",
  step,
  min,
  max,
  isAnimating = false,
}: InputWithUnitProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-uiSans text-sm font-medium text-[var(--color-primary)]">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          step={step}
          min={min}
          max={max}
          className={`
            font-uiSans text-base pr-20 transition-all duration-200
            ${isAnimating ? 'bg-[rgba(125,90,226,0.06)]' : ''}
          `}
          style={{
            transitionProperty: 'background-color, opacity',
            transitionDuration: '250ms',
            transitionTimingFunction: 'ease-out',
          }}
        />
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-uiSans text-sm text-[var(--color-secondary)]"
          style={{ userSelect: 'none' }}
        >
          {unit}
        </span>
      </div>
      <p className="font-uiSans text-xs leading-relaxed text-[var(--color-secondary)]">
        {helperText}
      </p>
    </div>
  );
}

