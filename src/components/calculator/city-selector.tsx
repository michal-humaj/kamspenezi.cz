"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CitySelectorProps {
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
}

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

  // Check if selected city is one of the popular cities
  const isPopularCity = POPULAR_CITIES.some((city) => city.name === selectedCity);
  const showSelectedInMoreCities = selectedCity && !isPopularCity;

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
              className="shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                background: isSelected ? "var(--color-primary)" : "var(--bg-card)",
                color: isSelected ? "var(--color-on-primary)" : "var(--color-primary)",
                border: `1px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                boxShadow: isSelected ? "var(--shadow-card)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "var(--bg-hover-strong)";
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
        
        {/* "Více měst" dropdown button - shows selected city if not popular */}
        <button
          onClick={() => setShowAllCities(!showAllCities)}
          className="shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-2.5 font-uiSans text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0 inline-flex items-center gap-1.5"
          style={{
            background: showSelectedInMoreCities ? "var(--color-primary)" : "var(--bg-card)",
            color: showSelectedInMoreCities ? "var(--color-on-primary)" : "var(--color-primary)",
            border: `1px solid ${showSelectedInMoreCities ? "var(--color-primary)" : "var(--color-border)"}`,
            boxShadow: showSelectedInMoreCities ? "var(--shadow-card)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!showSelectedInMoreCities) {
              e.currentTarget.style.background = "var(--bg-hover-strong)";
              e.currentTarget.style.borderColor = "var(--color-border-hover)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showSelectedInMoreCities) {
              e.currentTarget.style.background = "var(--bg-card)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }
          }}
        >
          <span>{showSelectedInMoreCities ? selectedCity : "Více měst"}</span>
          <ChevronDown
            className="h-4 w-4"
            style={{
              transform: showAllCities ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform var(--transition-duration) var(--transition-easing)",
            }}
          />
        </button>
      </div>

      {/* Expandable city list */}
      {showAllCities && (
        <div
          className="space-y-3 rounded-[var(--radius-card)] p-4"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-card)",
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
              const isSelected = selectedCity === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    onCitySelect(city.name);
                    setShowAllCities(false);
                    setSearchQuery("");
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left font-uiSans text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
                  style={{
                    background: isSelected ? "var(--bg-lilac-section)" : "transparent",
                    color: "var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "var(--bg-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
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
