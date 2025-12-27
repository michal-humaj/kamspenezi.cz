"use client";

import { useRef, useEffect } from "react";
import { calculatorDefaults } from "@/data/calculator-defaults";
import type { ApartmentSize } from "@/data/calculator-defaults.types";
import { APARTMENT_SIZES } from "@/data/calculator-defaults.types";

interface ApartmentSizeCardsProps {
  selectedCity: string | null;
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

// Use typed config
const config = calculatorDefaults;

// Get apartment sizes from types
const SIZES: ApartmentSize[] = ["1+kk", "2+kk", "3+kk", "4+kk"];

// Simplified formatting with separated price and area
function formatCardPrice(price: number): string {
  return (price / 1000000).toFixed(1).replace(".", ",") + " mil";
}

function formatCardArea(squareMeters: number): string {
  return `${squareMeters} m²`;
}

export function ApartmentSizeCards({
  selectedCity,
  selectedSize,
  onSizeSelect,
}: ApartmentSizeCardsProps) {
  // Get city data from config, fallback to Praha if city not found
  const cityData = selectedCity && config.cities[selectedCity] 
    ? config.cities[selectedCity] 
    : config.cities["Praha"];

  // Refs for scroll container and individual cards
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll selected card to the left when selection changes
  useEffect(() => {
    if (selectedSize && cardRefs.current[selectedSize] && scrollContainerRef.current) {
      const selectedCard = cardRefs.current[selectedSize];
      const container = scrollContainerRef.current;
      
      if (selectedCard && container) {
        // scroll-padding-left on container handles the 16px offset
        // Just scroll to align card with the snap point
        container.scrollTo({
          left: selectedCard.offsetLeft,
          behavior: "smooth"
        });
      }
    }
  }, [selectedSize]);

  const handleSelect = (size: string) => {
    onSizeSelect(size);
  };

  return (
    <div>
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {SIZES.map((size) => {
          const data = cityData.apartments[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => handleSelect(size)}
              className={`group rounded-[var(--radius-card)] p-5 text-left transition-all duration-200 ease-out focus:outline-none border-2 ${
                isSelected 
                  ? "border-[#0F172A] relative z-10 bg-white" 
                  : "border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 bg-white hover:bg-gray-50"
              }`}
              style={{
                boxShadow: isSelected 
                  ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
                  : undefined,
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
                    {formatCardArea(data.squareMeters)}
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
        className="flex gap-3 overflow-x-auto pl-4 pr-4 pb-0 md:hidden" 
        style={{ 
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "16px",
          scrollPaddingRight: "16px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {SIZES.map((size) => {
          const data = cityData.apartments[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              ref={(el) => {
                cardRefs.current[size] = el;
              }}
              onClick={() => handleSelect(size)}
              className={`min-w-[140px] shrink-0 rounded-[18px] p-3 md:p-5 text-left transition-all duration-200 ease-out focus:outline-none border-2 ${
                isSelected 
                  ? "border-[#0F172A] relative z-10 bg-white" 
                  : "border-gray-200 shadow-sm bg-white"
              }`}
              style={{
                boxShadow: isSelected 
                  ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
                  : undefined,
                scrollSnapAlign: "start",
              }}
            >
              <div className="space-y-1.5">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price (prominent) · Area (muted) */}
                <div className="font-uiSans text-xs">
                  <span className="font-medium text-kp-text-main">
                    {formatCardPrice(data.kupniCena)}
                  </span>
                  <span className="mx-1 text-gray-300">·</span>
                  <span className="font-normal text-kp-text-muted">
                    {formatCardArea(data.squareMeters)}
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
