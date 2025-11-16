"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithSuffixProps {
  id: string;
  label: string;
  value: string | number;
  suffix: string;
  helperText: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  step?: string;
  min?: number;
  max?: number;
  isAnimating?: boolean;
  placeholder?: string;
  className?: string;
  inputMode?: "text" | "decimal" | "numeric";
  pattern?: string;
}

export function InputWithSuffix({
  id,
  label,
  value,
  suffix,
  helperText,
  onChange,
  onBlur,
  type = "text",
  step,
  min,
  max,
  isAnimating = false,
  placeholder,
  className = "",
  inputMode,
  pattern,
}: InputWithSuffixProps) {
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
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          className={`
            font-uiSans text-base pr-12 text-right tabular-nums transition-all duration-200
            ${isAnimating ? 'bg-[rgba(125,90,226,0.06)]' : ''}
            ${className}
          `}
          style={{
            transitionProperty: 'background-color, opacity',
            transitionDuration: '250ms',
            transitionTimingFunction: 'ease-out',
          }}
        />
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center font-uiSans text-sm text-gray-400"
          style={{ userSelect: 'none', lineHeight: '1' }}
        >
          {suffix}
        </span>
      </div>
      <p className="font-uiSans text-xs leading-relaxed text-[var(--color-secondary)]">
        {helperText}
      </p>
    </div>
  );
}

