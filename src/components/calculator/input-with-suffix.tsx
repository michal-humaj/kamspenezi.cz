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
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Move cursor to the end of the input
    const input = e.target;
    const length = input.value.length;
    setTimeout(() => {
      input.setSelectionRange(length, length);
    }, 0);
  };

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
          onFocus={handleFocus}
          step={step}
          min={min}
          max={max}
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          className={`
            calc-input pr-16 text-right tabular-nums
            ${isAnimating ? 'bg-[var(--bg-highlight)]' : ''}
            ${className}
          `}
        />
        <span className="calc-input-unit">
          {suffix}
        </span>
      </div>
      <p className="font-uiSans text-xs leading-relaxed text-[var(--color-secondary)]">
        {helperText}
      </p>
    </div>
  );
}

