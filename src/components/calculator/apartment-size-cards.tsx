"use client";

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

// Simplified formatting: "7,8 mil · 24 tis / měsíc"
function formatCardText(price: number, rent: number): string {
  const priceInMil = (price / 1000000).toFixed(1).replace(".", ",");
  const rentInTis = Math.round(rent / 1000);
  return `${priceInMil} mil · ${rentInTis} tis / měsíc`;
}

export function ApartmentSizeCards({
  selectedCity,
  selectedSize,
  onSizeSelect,
}: ApartmentSizeCardsProps) {
  const cityData = selectedCity
    ? APARTMENT_DATA[selectedCity] || APARTMENT_DATA.Default
    : APARTMENT_DATA.Default;

  return (
    <div>
      {/* Desktop: Grid layout */}
      <div className="hidden gap-4 md:grid md:grid-cols-4">
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size, data.kupniCena, data.najemne)}
              className="group rounded-[var(--radius-card)] p-5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                border: isSelected
                  ? "2px solid var(--selection-border)"
                  : "2px solid var(--color-border)",
                background: isSelected ? "var(--selection-bg)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--selection-shadow), var(--selection-shadow-inner)" : "var(--shadow-card)",
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
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price and rent merged */}
                <div className="font-uiSans text-sm text-[var(--color-secondary)]">
                  {formatCardText(data.kupniCena, data.najemne)}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: Horizontal scrollable - cuts off at screen edges */}
      <div 
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:hidden" 
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
              onClick={() => onSizeSelect(size, data.kupniCena, data.najemne)}
              className="min-w-[230px] shrink-0 rounded-[18px] px-4 py-3.5 text-left transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                border: isSelected
                  ? "2px solid var(--selection-border)"
                  : "2px solid var(--color-border)",
                background: isSelected ? "var(--selection-bg)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--selection-shadow), var(--selection-shadow-inner)" : "var(--shadow-card)",
                scrollSnapAlign: "start",
                transform: "scale(1)",
              }}
            >
              <div className="space-y-2">
                {/* Line 1: Apartment size */}
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                {/* Line 2: Price and rent merged */}
                <div className="font-uiSans text-sm text-[var(--color-secondary)]">
                  {formatCardText(data.kupniCena, data.najemne)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
