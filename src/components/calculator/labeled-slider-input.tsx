"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";

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
  // Whether we're running in a mobile viewport
  const [isMobile, setIsMobile] = React.useState(false);
  // Guard against SSR — portal only renders after mount
  const [mounted, setMounted] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const desktopPopoverRef = React.useRef<HTMLDivElement>(null);

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

  // ── Mobile detection ────────────────────────────────────────────────────────
  React.useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Desktop: close popover on outside click ──────────────────────────────────
  React.useEffect(() => {
    if (!showTooltip || isMobile) return;
    const handler = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        desktopPopoverRef.current?.contains(e.target as Node)
      )
        return;
      setShowTooltip(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTooltip, isMobile]);

  // ── Mobile: lock body scroll while sheet is open ────────────────────────────
  React.useEffect(() => {
    if (!isMobile) return;
    if (showTooltip) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTooltip, isMobile]);

  // ── Escape key closes both sheet and popover ────────────────────────────────
  React.useEffect(() => {
    if (!showTooltip) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowTooltip(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showTooltip]);

  // Sync local slider with prop when not dragging
  React.useEffect(() => {
    if (!isDragging) {
      setLocalSliderValue(value);
    }
  }, [value, isDragging]);

  // Default formatters/parsers
  const defaultFormatter = React.useCallback(
    (v: number) => {
      if (unit === "percent") {
        return new Intl.NumberFormat("cs-CZ", {
          minimumFractionDigits: v % 1 === 0 ? 0 : 1,
          maximumFractionDigits: 1,
        }).format(v);
      }
      return new Intl.NumberFormat("cs-CZ", {
        maximumFractionDigits: 0,
      }).format(v);
    },
    [unit]
  );

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
      let sanitized = input.replace(/[^\d,\.]/g, "");
      sanitized = sanitized.replace(/\./g, ",");
      const parts = sanitized.split(",");
      if (parts.length > 2) {
        sanitized = parts[0] + "," + parts.slice(1).join("");
      }
      return sanitized;
    } else {
      return input.replace(/[^\d\s]/g, "");
    }
  };

  // Handle text input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = sanitizeInput(raw);
    setLocalValue(sanitized);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const parsed = parse(sanitized);
      if (parsed !== null) {
        const clamped = Math.max(min, Math.min(max, parsed));
        onChange(clamped);
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

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (touchStartRef.current && touchIntentRef.current !== "drag") return;
    const newValue = Number(e.target.value);
    setLocalSliderValue(newValue);
    setLocalValue(null);
  };

  // Handle slider drag end - emit final value
  const handleSliderDragEnd = () => {
    setIsDragging(false);
    onChange(localSliderValue);
  };

  // Touch handlers with intent detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchIntentRef.current = "unknown";
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || touchIntentRef.current === "scroll") return;
    const dx = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
    if (touchIntentRef.current === "unknown") {
      if (dy > dx && dy > 8) {
        touchIntentRef.current = "scroll";
      } else if (dx > dy && dx > 8) {
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

  // ── Info button handlers ────────────────────────────────────────────────────
  const handleInfoClick = () => {
    // On mobile: always open. On desktop: toggle (backup for keyboard users).
    setShowTooltip((prev) => !prev);
  };
  const handleInfoMouseEnter = () => {
    if (!isMobile) setShowTooltip(true);
  };
  const handleInfoMouseLeave = () => {
    if (!isMobile) setShowTooltip(false);
  };

  return (
    <div className="space-y-2">
      {/* Label and Input Row */}
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-4">
        {/* Left: Label */}
        <div className="flex flex-col justify-center">
          <div className="flex items-start gap-1.5">
            <label
              htmlFor={id}
              className="font-uiSans text-base font-medium leading-tight text-[var(--color-primary)] md:text-base"
            >
              {label}
            </label>
            {tooltip && (
              <div className="relative flex-shrink-0 mt-[2px]">
                {/* Info button — visual 18px, tappable 44px via padding + negative margin */}
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={handleInfoClick}
                  onMouseEnter={handleInfoMouseEnter}
                  onMouseLeave={handleInfoMouseLeave}
                  className="group relative flex items-center justify-center p-[13px] -m-[13px] rounded-full"
                  aria-label="Více informací"
                  aria-expanded={showTooltip}
                >
                  <span
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[10px] font-medium transition-colors group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-border-hover)",
                      color: "var(--color-secondary)",
                    }}
                  >
                    i
                  </span>
                </button>

                {/* ── Desktop hover popover ─────────────────────────────────── */}
                {!isMobile && showTooltip && (
                  <div
                    ref={desktopPopoverRef}
                    className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_8px_32px_rgba(15,23,42,0.12)] text-sm text-gray-600 leading-relaxed"
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

        {/* Right: Input with Unit */}
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
                fontSize: "16px",
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

      {/* Optional Middle Content */}
      {middleContent}

      {/* Slider Row */}
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

      {/* ── Mobile bottom sheet (portal) ───────────────────────────────────── */}
      {mounted &&
        isMobile &&
        showTooltip &&
        tooltip &&
        ReactDOM.createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-50 bg-black/50"
              style={{ animation: "backdropFadeIn 200ms ease-out" }}
              onClick={() => setShowTooltip(false)}
              aria-hidden="true"
            />

            {/* Sheet */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="fixed bottom-0 left-0 right-0 z-[51] bg-white rounded-t-[20px] shadow-[0_-8px_40px_rgba(15,23,42,0.15)]"
              style={{ animation: "slideUpSheet 300ms cubic-bezier(0.32,0.72,0,1)" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="h-[3px] w-9 rounded-full bg-gray-200" />
              </div>

              {/* Header row */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <span className="font-uiSans text-[15px] font-semibold text-[var(--color-primary)]">
                  {label}
                </span>
                <button
                  type="button"
                  onClick={() => setShowTooltip(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200 transition-colors"
                  aria-label="Zavřít"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path
                      d="M1 1L10 10M10 1L1 10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px mx-5" style={{ background: "var(--color-border)" }} />

              {/* Tooltip content */}
              <div className="px-5 pt-4 pb-2 font-uiSans text-[14px] leading-[1.6] text-[var(--color-secondary)]">
                {tooltip}
              </div>

              {/* iOS safe area */}
              <div style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }} />
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
