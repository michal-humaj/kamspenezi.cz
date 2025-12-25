"use client";

import { useRef, useEffect } from "react";

interface ApartmentSizeCardsProps {
  selectedCity: string | null;
  selectedSize: string | null;
  onSizeSelect: (size: string, kupniCena: number, najemne: number) => void;
}

// Mock apartment data by city and size
const APARTMENT_DATA: Record<string, Record<string, { kupniCena: number; najemne: number }>> = {
  Praha: {
    "1+kk": { kupniCena: 5200000, najemne: 18000 },
    "2+kk": { kupniCena: 7800000, najemne: 24000 },
    "3+kk": { kupniCena: 10500000, najemne: 32000 },
    "4+kk": { kupniCena: 13200000, najemne: 42000 },
  },
  Brno: {
    "1+kk": { kupniCena: 3200000, najemne: 12000 },
    "2+kk": { kupniCena: 4800000, najemne: 16000 },
    "3+kk": { kupniCena: 6400000, najemne: 21000 },
    "4+kk": { kupniCena: 8000000, najemne: 27000 },
  },
  Ostrava: {
    "1+kk": { kupniCena: 1900000, najemne: 8000 },
    "2+kk": { kupniCena: 2900000, najemne: 11000 },
    "3+kk": { kupniCena: 3800000, najemne: 14000 },
    "4+kk": { kupniCena: 4800000, najemne: 18000 },
  },
  Plzeň: {
    "1+kk": { kupniCena: 2600000, najemne: 10000 },
    "2+kk": { kupniCena: 3900000, najemne: 13000 },
    "3+kk": { kupniCena: 5200000, najemne: 17000 },
    "4+kk": { kupniCena: 6500000, najemne: 22000 },
  },
  Default: {
    "1+kk": { kupniCena: 2500000, najemne: 9000 },
    "2+kk": { kupniCena: 3800000, najemne: 12000 },
    "3+kk": { kupniCena: 5000000, najemne: 16000 },
    "4+kk": { kupniCena: 6300000, najemne: 20000 },
  },
};

const SIZES = ["1+kk", "2+kk", "3+kk", "4+kk"];

// Area data for each apartment size
const APARTMENT_AREAS: Record<string, string> = {
  "1+kk": "32 m²",
  "2+kk": "54 m²",
  "3+kk": "76 m²",
  "4+kk": "98 m²",
};

// Simplified formatting with separated price and area
function formatCardPrice(price: number): string {
  return (price / 1000000).toFixed(1).replace(".", ",") + " mil";
}

function formatCardArea(size: string): string {
  return APARTMENT_AREAS[size] || "—";
}

export function ApartmentSizeCards({
  selectedCity,
  selectedSize,
  onSizeSelect,
}: ApartmentSizeCardsProps) {
  const cityData = selectedCity
    ? APARTMENT_DATA[selectedCity] || APARTMENT_DATA.Default
    : APARTMENT_DATA.Default;

  // Refs for scroll container and individual cards
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll selected card to the left when selection changes
  useEffect(() => {
    if (selectedSize && cardRefs.current[selectedSize] && scrollContainerRef.current) {
      const selectedCard = cardRefs.current[selectedSize];
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start", // Align to the left
        });
      }
    }
  }, [selectedSize]);

  const handleSelect = (size: string, kupniCena: number, najemne: number) => {
    onSizeSelect(size, kupniCena, najemne);
  };

  return (
    <div>
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => handleSelect(size, data.kupniCena, data.najemne)}
              className={`group rounded-[var(--radius-card)] p-5 text-left bg-white transition-all duration-200 ease-out focus:outline-none border-2 ${
                isSelected 
                  ? "border-[#0F172A] relative z-10" 
                  : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
              style={{
                boxShadow: isSelected 
                  ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
                  : undefined,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--bg-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "#FFFFFF";
                }
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price (prominent) · Area (muted) */}
                <div className="font-uiSans text-sm">
                  <span className="font-medium text-kp-text-main">
                    {formatCardPrice(data.kupniCena)}
                  </span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="font-normal text-kp-text-muted">
                    {formatCardArea(size)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: Horizontal scrollable - cuts off at screen edges */}
      <div 
        ref={scrollContainerRef}
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-0 md:hidden" 
        style={{ 
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "16px",
          scrollPaddingRight: "16px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              ref={(el) => {
                cardRefs.current[size] = el;
              }}
              onClick={() => handleSelect(size, data.kupniCena, data.najemne)}
              className={`min-w-[230px] shrink-0 rounded-[18px] px-4 py-3.5 text-left bg-white transition-all duration-200 ease-out focus:outline-none border-2 ${
                isSelected 
                  ? "border-[#0F172A] relative z-10" 
                  : "border-gray-200 shadow-sm"
              }`}
              style={{
                boxShadow: isSelected 
                  ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
                  : undefined,
                scrollSnapAlign: "start",
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price (prominent) · Area (muted) */}
                <div className="font-uiSans text-sm">
                  <span className="font-medium text-kp-text-main">
                    {formatCardPrice(data.kupniCena)}
                  </span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="font-normal text-kp-text-muted">
                    {formatCardArea(size)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
