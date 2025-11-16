"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CitySelectorProps {
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
}

// Mock city data with median apartment prices
const POPULAR_CITIES = [
  { name: "Praha", medianPrice: 8500000 },
  { name: "Brno", medianPrice: 5200000 },
  { name: "Ostrava", medianPrice: 3100000 },
  { name: "Plzeň", medianPrice: 4200000 },
];

const ALL_CITIES = [
  ...POPULAR_CITIES,
  { name: "Liberec", medianPrice: 3500000 },
  { name: "Olomouc", medianPrice: 3300000 },
  { name: "České Budějovice", medianPrice: 3600000 },
  { name: "Hradec Králové", medianPrice: 3800000 },
  { name: "Pardubice", medianPrice: 3400000 },
  { name: "Zlín", medianPrice: 3000000 },
  { name: "Havířov", medianPrice: 2400000 },
  { name: "Kladno", medianPrice: 3700000 },
  { name: "Most", medianPrice: 1800000 },
  { name: "Opava", medianPrice: 2600000 },
  { name: "Frýdek-Místek", medianPrice: 2800000 },
  { name: "Karlovy Vary", medianPrice: 2900000 },
  { name: "Jihlava", medianPrice: 3200000 },
  { name: "Teplice", medianPrice: 2100000 },
  { name: "Děčín", medianPrice: 2300000 },
  { name: "Karviná", medianPrice: 1700000 },
];

export function CitySelector({ selectedCity, onCitySelect }: CitySelectorProps) {
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = ALL_CITIES.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Popular city chips */}
      <div className="flex flex-wrap gap-2">
        {POPULAR_CITIES.map((city) => {
          const isSelected = selectedCity === city.name;
          return (
            <button
              key={city.name}
              onClick={() => onCitySelect(city.name)}
              className="whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-2 font-uiSans text-sm font-medium transition-all"
              style={{
                background: isSelected ? "var(--btn-primary-bg)" : "var(--bg-card)",
                color: isSelected ? "var(--btn-primary-text)" : "var(--color-primary)",
                border: `1px solid ${isSelected ? "var(--btn-primary-bg)" : "var(--color-border)"}`,
                boxShadow: isSelected ? "var(--btn-primary-shadow)" : "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--bg-lilac-section)";
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
              {city.name}
            </button>
          );
        })}
        <button
          onClick={() => setShowAllCities(!showAllCities)}
          className="flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-2 font-uiSans text-sm font-medium transition-all"
          style={{
            background: "var(--bg-card)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-lilac-section)";
            e.currentTarget.style.borderColor = "var(--color-border-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-card)";
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
        >
          Více měst…
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: showAllCities ? "rotate(180deg)" : "rotate(0deg)",
              transitionDuration: "var(--transition-duration)",
              transitionTimingFunction: "var(--transition-easing)",
            }}
          />
        </button>
      </div>

      {/* Expandable city list */}
      {showAllCities && (
        <div
          className="space-y-3 rounded-lg p-4"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--bg-card)",
          }}
        >
          <Input
            type="text"
            placeholder="Hledat město..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="font-uiSans"
          />
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {filteredCities.map((city) => {
              const isCitySelected = selectedCity === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    onCitySelect(city.name);
                    setShowAllCities(false);
                    setSearchQuery("");
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left font-uiSans text-sm transition-colors"
                  style={{
                    background: isCitySelected ? "var(--bg-lilac-section)" : "transparent",
                    color: "var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isCitySelected) {
                      e.currentTarget.style.background = "var(--bg-lilac-section)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCitySelected) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-xs text-[var(--color-secondary)]">
                      od {(city.medianPrice / 1000000).toFixed(1)} mil. Kč
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
