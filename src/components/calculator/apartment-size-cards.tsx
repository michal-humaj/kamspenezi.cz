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
      <div className="hidden gap-3 md:grid md:grid-cols-4">
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size, data.kupniCena, data.najemne)}
              className="rounded-xl p-4 text-left transition-all"
              style={{
                border: isSelected
                  ? "2px solid var(--btn-primary-bg)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--bg-lilac-section)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--shadow-card)" : "none",
              }}
            >
              <div className="space-y-3">
                <div className="font-uiSans text-2xl font-semibold text-[var(--color-primary)]">
                  {size}
                </div>
                <div className="space-y-1">
                  <div>
                    <div className="font-uiSans text-xs text-[var(--color-secondary)]">
                      Kupní cena
                    </div>
                    <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                      {(data.kupniCena / 1000000).toFixed(1)} mil. Kč
                    </div>
                  </div>
                  <div>
                    <div className="font-uiSans text-xs text-[var(--color-secondary)]">
                      Nájem
                    </div>
                    <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                      {(data.najemne / 1000).toFixed(0)} tis. Kč/měsíc
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile: Horizontal scrollable */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:hidden" style={{ scrollSnapType: "x mandatory" }}>
        {SIZES.map((size) => {
          const data = cityData[size];
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeSelect(size, data.kupniCena, data.najemne)}
              className="min-w-[260px] shrink-0 rounded-xl p-4 text-left transition-all"
              style={{
                border: isSelected
                  ? "2px solid var(--btn-primary-bg)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--bg-lilac-section)" : "var(--bg-card)",
                boxShadow: isSelected ? "var(--shadow-card)" : "none",
                scrollSnapAlign: "start",
              }}
            >
              <div className="space-y-3">
                <div className="font-uiSans text-2xl font-semibold text-[var(--color-primary)]">
                  {size}
                </div>
                <div className="space-y-1">
                  <div>
                    <div className="font-uiSans text-xs text-[var(--color-secondary)]">
                      Kupní cena
                    </div>
                    <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                      {(data.kupniCena / 1000000).toFixed(1)} mil. Kč
                    </div>
                  </div>
                  <div>
                    <div className="font-uiSans text-xs text-[var(--color-secondary)]">
                      Nájem
                    </div>
                    <div className="font-uiSans text-base font-semibold text-[var(--color-primary)]">
                      {(data.najemne / 1000).toFixed(0)} tis. Kč/měsíc
                    </div>
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

