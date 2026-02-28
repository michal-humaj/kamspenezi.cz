"use client";

import * as React from "react";

export interface LabeledSliderInputProps {
  /** Unique ID for the input */
  id: string;
  /** Label text displayed on the left */
  label: string;
  /** Optional helper text displayed under the label */
  description?: string;
  /** Optional tooltip content shown in info icon popover */
  tooltip?: React.ReactNode;
  /** Optional extra content displayed below the description (e.g. computed value) */
  extraLabel?: React.ReactNode;
  /** Optional content displayed between the header row and the slider */
  middleContent?: React.ReactNode;
  /** Optional content displayed below the slider (e.g. mortgage payment) */
  bottomContent?: React.ReactNode;
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
  tooltip,
  extraLabel,
  middleContent,
  bottomContent,
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
  // Tooltip state
  const [showTooltip, setShowTooltip] = React.useState(false);
  // Local state for when user is actively editing the text input
  const [localValue, setLocalValue] = React.useState<string | null>(null);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Slider optimization state - defer calculation until drag ends
  const [localSliderValue, setLocalSliderValue] = React.useState<number>(value);
  const [isDragging, setIsDragging] = React.useState(false);

  // Touch intent detection - prevents Android scroll from accidentally changing sliders
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const touchIntentRef = React.useRef<"unknown" | "scroll" | "drag">("unknown");
  // Ref to the range input DOM element so we can read its current value when drag is confirmed
  const sliderRef = React.useRef<HTMLInputElement>(null);

  // Sync local slider with prop when not dragging
  React.useEffect(() => {
    if (!isDragging) {
      setLocalSliderValue(value);
    }
  }, [value, isDragging]);

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

  // Get display value - local text if editing, otherwise formatted slider/prop value
  const currentMetricValue = isDragging ? localSliderValue : value;
  const displayValue = localValue !== null ? localValue : format(currentMetricValue);

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
        // Also update slider local value
        setLocalSliderValue(clamped);
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
      setLocalSliderValue(clamped);
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

  // Handle slider change - suppress all touch-driven changes until drag intent is confirmed.
  // This prevents the slider from visually jumping when the user's finger touches it while scrolling.
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If a touch is active but intent isn't confirmed as horizontal drag, ignore the event entirely.
    // The value will be read from the DOM directly once intent is confirmed in handleTouchMove.
    if (touchStartRef.current && touchIntentRef.current !== "drag") return;

    const newValue = Number(e.target.value);
    setLocalSliderValue(newValue);
    setLocalValue(null);
  };

  // Handle slider drag end - emit final value
  const handleSliderDragEnd = () => {
    setIsDragging(false);
    // Emit the final value to trigger calculation
    onChange(localSliderValue);
  };

  // Touch handlers with intent detection to prevent Android scroll from hijacking sliders
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchIntentRef.current = "unknown";
    // Do NOT mark as dragging yet — wait for intent to be determined on touchmove
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || touchIntentRef.current === "scroll") return;
    const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
    if (touchIntentRef.current === "unknown") {
      if (dy > dx && dy > 8) {
        // Vertical movement dominates → user is scrolling, do not engage slider
        touchIntentRef.current = "scroll";
      } else if (dx > dy && dx > 8) {
        // Horizontal movement dominates → user intends to drag slider.
        // Read the current DOM value and apply it now (onChange was suppressed up to this point).
        touchIntentRef.current = "drag";
        setIsDragging(true);
        if (sliderRef.current) {
          setLocalSliderValue(Number(sliderRef.current.value));
          setLocalValue(null);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchIntentRef.current === "drag") {
      handleSliderDragEnd();
    }
    // For scroll or undetermined: onChange was already suppressed, so localSliderValue
    // was never changed — nothing to restore and no visual snap-back.
    touchStartRef.current = null;
    touchIntentRef.current = "unknown";
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
    <div className="space-y-2">
      {/* Label and Input Row */}
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-4">
        {/* Left: Label */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <label
              htmlFor={id}
              className="font-uiSans text-base font-medium leading-tight text-[var(--color-primary)] md:text-base"
            >
              {label}
            </label>
            {tooltip && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-600 hover:bg-gray-300 transition-colors"
                  aria-label="Více informací"
                >
                  i
                </button>
                {showTooltip && (
                  <div 
                    className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-sm text-gray-700 leading-relaxed"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    {tooltip}
                  </div>
                )}
              </div>
            )}
          </div>
          {description && (
            <p className="mt-1 font-uiSans text-sm leading-snug text-[var(--color-secondary)]">
              {description}
            </p>
          )}
          {extraLabel}
        </div>

        {/* Right: Input with Unit - Self-contained flex container */}
        <div className="flex items-center justify-end">
          <div
            className={`inline-flex items-center justify-end rounded-full border bg-white px-4 py-2.5 shadow-sm transition-all w-full md:w-[160px] ${
              isAnimating ? "animate-[highlight_600ms_ease-out]" : ""
            }`}
            style={{
              borderColor: "var(--color-border)",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.querySelector("input:focus")) {
                e.currentTarget.style.borderColor = "var(--color-border-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.querySelector("input:focus")) {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }
            }}
          >
            <input
              id={id}
              type="text"
              inputMode={inputMode}
              value={displayValue}
              onChange={handleInputChange}
              onFocus={(e) => {
                handleInputFocus(e);
                const wrapper = e.target.closest("div");
                if (wrapper) {
                  wrapper.style.borderColor = "var(--color-accent)";
                  wrapper.style.boxShadow =
                    "0 0 0 4px var(--color-accent-ring-strong), 0 0 0 1px rgba(15, 23, 42, 0.04), 0 8px 20px rgba(15, 23, 42, 0.08)";
                }
              }}
              onBlur={(e) => {
                handleInputBlur();
                const wrapper = e.target.closest("div");
                if (wrapper) {
                  wrapper.style.borderColor = "var(--color-border)";
                  wrapper.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04)";
                }
              }}
              className="border-none bg-transparent font-uiSans text-right text-base text-[var(--color-primary)] outline-none tabular-nums w-auto max-w-[110px]"
              style={{
                fontSize: "16px", // Must be 16px minimum to prevent iOS auto-zoom
              }}
            />
            <span
              className="ml-3 whitespace-nowrap font-uiSans text-sm text-[var(--color-secondary)]"
              aria-hidden="true"
            >
              {unitLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Optional Middle Content (e.g. Mortgage Payment Pill) */}
      {middleContent}

      {/* Slider Row (Full Width) */}
      <div className="relative mt-1">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={localSliderValue}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={handleSliderDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-labelledby={id}
          className="slider-input w-full"
          style={{
            // @ts-ignore - CSS custom property
            "--slider-progress": `${((localSliderValue - min) / (max - min)) * 100}%`,
          }}
        />
      </div>

      {/* Optional Bottom Content */}
      {bottomContent}
    </div>
  );
}
