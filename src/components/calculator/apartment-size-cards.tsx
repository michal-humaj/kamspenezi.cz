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

// Simplified formatting with separated price and rent
function formatCardPrice(price: number): string {
  return (price / 1000000).toFixed(1).replace(".", ",") + " mil";
}

function formatCardRent(rent: number): string {
  const rentInTis = Math.round(rent / 1000);
  return `${rentInTis} tis / měsíc`;
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
              className="group rounded-[var(--radius-card)] p-5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                border: isSelected
                  ? "2px solid var(--selection-border)"
                  : "2px solid var(--color-border)",
                background: "#FFFFFF",
                boxShadow: isSelected 
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                  : "0 8px 30px rgba(0, 0, 0, 0.04)",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--bg-hover)";
                  e.currentTarget.style.borderColor = "var(--color-border-hover)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.04)";
                }
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price (prominent) · Rent (muted) */}
                <div className="font-uiSans text-sm">
                  <span className="font-medium text-[var(--color-primary)]">
                    {formatCardPrice(data.kupniCena)}
                  </span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="text-[var(--color-secondary)]">
                    {formatCardRent(data.najemne)}
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
        className="-mx-4 flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:hidden" 
        style={{ 
          scrollPaddingLeft: "24px",
          scrollPaddingRight: "24px",
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
              className="min-w-[230px] shrink-0 rounded-[18px] px-4 py-3.5 text-left transition-all snap-center focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                border: isSelected
                  ? "2px solid var(--selection-border)"
                  : "2px solid var(--color-border)",
                background: "#FFFFFF",
                boxShadow: isSelected 
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                  : "0 8px 30px rgba(0, 0, 0, 0.04)",
                transform: "scale(1)",
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price (prominent) · Rent (muted) */}
                <div className="font-uiSans text-sm">
                  <span className="font-medium text-[var(--color-primary)]">
                    {formatCardPrice(data.kupniCena)}
                  </span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span className="text-[var(--color-secondary)]">
                    {formatCardRent(data.najemne)}
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
