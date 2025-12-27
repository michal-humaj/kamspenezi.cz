"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculatorDefaults } from "@/data/calculator-defaults";

interface CitySelectorProps {
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
}

// Use typed config
const config = calculatorDefaults;

// Get all cities from config
const ALL_CITIES = Object.keys(config.cities);

// Popular cities shown as main chips
const POPULAR_CITIES = ["Praha", "Brno", "Ostrava", "Plzeň"];

export function CitySelector({ selectedCity, onCitySelect }: CitySelectorProps) {
  const [showAllCities, setShowAllCities] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = ALL_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if selected city is one of the popular cities
  const isPopularCity = POPULAR_CITIES.includes(selectedCity || "");
  const showSelectedInMoreCities = selectedCity && !isPopularCity;

  return (
    <div className="space-y-4">
      {/* Popular city chips */}
      <div className="flex flex-wrap gap-2">
        {POPULAR_CITIES.map((city) => {
          const isSelected = selectedCity === city;
          return (
            <button
              key={city}
              onClick={() => onCitySelect(city)}
              className="shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-3 font-uiSans text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0"
              style={{
                background: isSelected ? "var(--color-primary)" : "#FFFFFF",
                color: isSelected ? "var(--color-on-primary)" : "var(--color-primary)",
                border: `1.5px solid ${isSelected ? "var(--color-primary)" : "rgb(229, 231, 235)"}`,
                boxShadow: isSelected 
                  ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
                  : "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "rgb(249, 250, 251)";
                  e.currentTarget.style.borderColor = "rgb(209, 213, 219)";
                  e.currentTarget.style.boxShadow = "0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = "rgb(229, 231, 235)";
                  e.currentTarget.style.boxShadow = "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {city}
            </button>
          );
        })}
        
        {/* "Více měst" dropdown button - shows selected city if not popular */}
        <button
          onClick={() => setShowAllCities(!showAllCities)}
          className="shrink-0 whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-3 font-uiSans text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0 inline-flex items-center gap-1.5"
          style={{
            background: showSelectedInMoreCities ? "var(--color-primary)" : "#FFFFFF",
            color: showSelectedInMoreCities ? "var(--color-on-primary)" : "var(--color-primary)",
            border: `1.5px solid ${showSelectedInMoreCities ? "var(--color-primary)" : "rgb(229, 231, 235)"}`,
            boxShadow: showSelectedInMoreCities 
              ? "0 12px 24px -6px rgba(15, 23, 42, 0.15)" 
              : "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            if (!showSelectedInMoreCities) {
              e.currentTarget.style.background = "rgb(249, 250, 251)";
              e.currentTarget.style.borderColor = "rgb(209, 213, 219)";
              e.currentTarget.style.boxShadow = "0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!showSelectedInMoreCities) {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.borderColor = "rgb(229, 231, 235)";
              e.currentTarget.style.boxShadow = "0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.transform = "translateY(0)";
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
          className="relative z-50 space-y-3 rounded-[var(--radius-card)] p-4 shadow-2xl"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--bg-card)",
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Hledat město..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-uiSans text-base border-gray-200"
              style={{
                fontSize: "16px", // Force 16px to prevent iOS zoom
              }}
            />
          </div>
          <div 
            className="max-h-64 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredCities.map((city) => {
              const isSelected = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => {
                    onCitySelect(city);
                    setShowAllCities(false);
                    setSearchQuery("");
                  }}
                  className="block w-full rounded-md px-4 py-3.5 text-left font-uiSans text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-focus-ring)] focus:ring-offset-0 active:bg-gray-50"
                  style={{
                    background: isSelected ? "var(--bg-lilac-section)" : "transparent",
                    color: isSelected ? "var(--color-primary)" : "var(--color-text-main)",
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
                  <span className="text-kp-text-main font-medium">{city}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
