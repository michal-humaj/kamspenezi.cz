"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

export interface LabeledSliderInputProps {
  /** Unique ID for the input */
  id: string;
  /** Label text displayed on the left */
  label: string;
  /** Optional helper text displayed under the label */
  description?: string;
  /** Current numeric value (in base units: Kč or percentage points) */
  value: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Unit type for display */
  unit?: "kc" | "percent" | "custom";
  /** Custom unit label (e.g. "mil. Kč") */
  customUnitLabel?: string;
  /** Minimum value for slider and validation */
  min: number;
  /** Maximum value for slider and validation */
  max: number;
  /** Step increment for slider */
  step: number;
  /** Function to format value for display in input */
  formatter?: (value: number) => string;
  /** Function to parse user input back to number */
  parser?: (input: string) => number | null;
  /** Input mode hint for mobile keyboards */
  inputMode?: "decimal" | "numeric";
  /** Whether the field is currently animating (e.g. from preset) */
  isAnimating?: boolean;
}

export function LabeledSliderInput({
  id,
  label,
  description,
  value,
  onChange,
  unit = "kc",
  customUnitLabel,
  min,
  max,
  step,
  formatter,
  parser,
  inputMode = "numeric",
  isAnimating = false,
}: LabeledSliderInputProps) {
  // Local state for when user is actively editing the text input
  const [localValue, setLocalValue] = React.useState<string | null>(null);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Default formatters/parsers
  const defaultFormatter = React.useCallback((v: number) => {
    if (unit === "percent") {
      return new Intl.NumberFormat("cs-CZ", {
        minimumFractionDigits: v % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1,
      }).format(v);
    }
    return new Intl.NumberFormat("cs-CZ", {
      maximumFractionDigits: 0,
    }).format(v);
  }, [unit]);

  const defaultParser = React.useCallback((input: string): number | null => {
    if (!input || input.trim() === "") return null;
    const normalized = input.replace(/\s/g, "").replace(",", ".");
    const numeric = Number(normalized);
    return Number.isNaN(numeric) ? null : numeric;
  }, []);

  const format = formatter || defaultFormatter;
  const parse = parser || defaultParser;

  // Get display value - local if editing, otherwise formatted state
  const displayValue = localValue !== null ? localValue : format(value);

  // Get unit label
  const unitLabel = customUnitLabel || (unit === "percent" ? "%" : "Kč");

  // Sanitize input based on type
  const sanitizeInput = (input: string): string => {
    if (unit === "percent" || inputMode === "decimal") {
      // Allow digits, comma, dot
      let sanitized = input.replace(/[^\d,\.]/g, "");
      // Replace dot with comma
      sanitized = sanitized.replace(/\./g, ",");
      // Allow only one comma
      const parts = sanitized.split(",");
      if (parts.length > 2) {
        sanitized = parts[0] + "," + parts.slice(1).join("");
      }
      return sanitized;
    } else {
      // Allow only digits and spaces
      return input.replace(/[^\d\s]/g, "");
    }
  };

  // Handle text input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = sanitizeInput(raw);
    setLocalValue(sanitized);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounced update (500ms)
    debounceTimer.current = setTimeout(() => {
      const parsed = parse(sanitized);
      if (parsed !== null) {
        const clamped = Math.max(min, Math.min(max, parsed));
        onChange(clamped);
      }
    }, 500);
  };

  // Handle input blur - parse immediately and clear local state
  const handleInputBlur = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }

    if (localValue === null) {
      return;
    }

    const parsed = parse(localValue);
    if (parsed !== null) {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(clamped);
    }

    setLocalValue(null);
  };

  // Handle input focus - move cursor to end
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const length = input.value.length;
    setTimeout(() => {
      input.setSelectionRange(length, length);
    }, 0);
  };

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    // Clear local text input state when slider is used
    setLocalValue(null);
  };

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      {/* Label and Input Row */}
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-4">
        {/* Left: Label */}
        <div className="flex flex-col justify-center">
          <label
            htmlFor={id}
            className="font-uiSans text-base font-medium leading-tight text-[var(--color-primary)] md:text-base"
          >
            {label}
          </label>
          {description && (
            <p className="mt-1 font-uiSans text-sm leading-snug text-[var(--color-secondary)]">
              {description}
            </p>
          )}
        </div>

        {/* Right: Input with Unit */}
        <div className="relative flex items-center">
          <Input
            id={id}
            type="text"
            inputMode={inputMode}
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            className={`calc-input pr-[calc(3ch+28px)] text-right ${
              isAnimating ? "animate-[highlight_600ms_ease-out]" : ""
            }`}
            style={{
              fontSize: "16px", // Must be 16px minimum to prevent iOS auto-zoom
            }}
          />
          <span
            className="calc-input-unit pointer-events-none absolute right-[14px] font-uiSans text-base text-[var(--color-secondary)]"
            aria-hidden="true"
          >
            {unitLabel}
          </span>
        </div>
      </div>

      {/* Slider Row (Full Width) */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          aria-labelledby={id}
          className="slider-input w-full"
          style={{
            // @ts-ignore - CSS custom property
            "--slider-progress": `${((value - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

