"use client";

interface ApartmentSizeCardsProps {
  selectedCity: string | null;
  selectedSize: string | null;
  onSizeSelect: (size: string, kupniCena: number, najemne: number) => void;
}

// Mock apartment data by city and size
// Structure: city -> size -> { kupniCena, najemne }
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
  // Default fallback for other cities
  Default: {
    "1+kk": { kupniCena: 2500000, najemne: 9000 },
    "2+kk": { kupniCena: 3800000, najemne: 12000 },
    "3+kk": { kupniCena: 5000000, najemne: 16000 },
    "4+kk": { kupniCena: 6300000, najemne: 20000 },
  },
};

const SIZES = ["1+kk", "2+kk", "3+kk", "4+kk"];

function formatPrice(price: number): string {
  return `${(price / 1000000).toFixed(1)} mil. Kč`;
}

function formatRent(rent: number): string {
  return `${(rent / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Kč / měsíc`;
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
              className="rounded-[var(--radius-card)] p-5 text-left"
              style={{
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--bg-lilac-section)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                transition: "all var(--transition-duration) var(--transition-easing)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--btn-secondary-hover-bg)";
                  e.currentTarget.style.borderColor = "var(--color-border-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }
              }}
            >
              <div className="space-y-3">
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                <div className="space-y-1.5">
                  <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                    {formatPrice(data.kupniCena)}
                  </div>
                  <div className="font-uiSans text-sm text-[var(--color-secondary)]">
                    {formatRent(data.najemne)}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: Horizontal scrollable with visible overflow hint */}
      <div 
        className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:hidden" 
        style={{ 
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "16px",
          scrollPaddingRight: "16px"
        }}
      >
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size, data.kupniCena, data.najemne)}
              className="min-w-[260px] shrink-0 rounded-[18px] p-4 text-left"
              style={{
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--bg-lilac-section)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                scrollSnapAlign: "start",
                transition: "all var(--transition-duration) var(--transition-easing)",
              }}
            >
              <div className="space-y-3">
                <div className="font-uiSans text-2xl font-bold text-[var(--color-primary)]">
                  {size}
                </div>
                <div className="space-y-1.5">
                  <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                    {formatPrice(data.kupniCena)}
                  </div>
                  <div className="font-uiSans text-sm text-[var(--color-secondary)]">
                    {formatRent(data.najemne)}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
