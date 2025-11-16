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
            calc-input pr-16 text-right tabular-nums
            ${isAnimating ? 'bg-[var(--bg-highlight)]' : ''}
          `}
        />
        <span className="calc-input-unit">
          {unit}
        </span>
      </div>
      <p className="font-uiSans text-xs leading-relaxed text-[var(--color-secondary)]">
        {helperText}
      </p>
    </div>
  );
}

