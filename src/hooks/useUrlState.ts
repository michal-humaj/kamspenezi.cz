"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CalculatorState } from "@/app/page";

/**
 * Fields to sync to URL
 * Includes all user-editable fields AND expected values for complete state sharing
 */
const URL_SYNC_FIELDS: (keyof CalculatorState)[] = [
  "selectedCity",
  "selectedApartmentSize",
  "kupniCena",
  "vlastniZdroje",
  "urokovaSazbaHypoteky",
  "najemne",
  "vynosInvestice",
  "prispevekRodicu",
  "zarizeniNemovitosti",
  "rustHodnotyNemovitosti",
  "fondOprav",
  "pojisteniNemovitosti",
  "danZNemovitosti",
  "nakladyUdrzba",
  "ocekavanaInflace",
  "rustNajemneho",
  "pasmoDane",
  // Key market assumptions (expected values)
  "vynosInvesticeExpected",
  "rustHodnotyExpected",
  "rustNajemnehoExpected",
  "urokovaSazbaHypotekyExpected",
];

/**
 * Short parameter names for cleaner URLs
 */
const PARAM_ALIASES: Record<string, string> = {
  selectedCity: "c",
  selectedApartmentSize: "a",
  kupniCena: "kc",
  vlastniZdroje: "vz",
  urokovaSazbaHypoteky: "us",
  najemne: "n",
  vynosInvestice: "vi",
  prispevekRodicu: "pr",
  zarizeniNemovitosti: "zn",
  rustHodnotyNemovitosti: "rh",
  fondOprav: "fo",
  pojisteniNemovitosti: "pn",
  danZNemovitosti: "dn",
  nakladyUdrzba: "nu",
  ocekavanaInflace: "oi",
  rustNajemneho: "rn",
  pasmoDane: "pd",
  // Expected values (short aliases)
  vynosInvesticeExpected: "vie",
  rustHodnotyExpected: "rhe",
  rustNajemnehoExpected: "rne",
  urokovaSazbaHypotekyExpected: "use",
};

const REVERSE_ALIASES: Record<string, keyof CalculatorState> = Object.fromEntries(
  Object.entries(PARAM_ALIASES).map(([k, v]) => [v, k as keyof CalculatorState])
);

/**
 * Parse URL params into partial state
 */
export function parseUrlState(searchParams: URLSearchParams): Partial<CalculatorState> {
  const state: Partial<CalculatorState> = {};

  for (const [alias, value] of searchParams.entries()) {
    const fieldName = REVERSE_ALIASES[alias];
    if (!fieldName) continue;

    // Parse based on field type
    if (fieldName === "selectedCity" || fieldName === "selectedApartmentSize") {
      state[fieldName] = value || null;
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        (state as Record<string, number>)[fieldName] = numValue;
      }
    }
  }

  return state;
}

/**
 * Fields that MUST be serialized if city/apartment differ from defaults
 * (because their defaults change per city/apartment)
 */
const CITY_DEPENDENT_FIELDS: (keyof CalculatorState)[] = [
  "kupniCena",
  "najemne",
  "fondOprav",
  "zarizeniNemovitosti",
  "danZNemovitosti",
  "pojisteniNemovitosti",
  "nakladyUdrzba",
  "rustHodnotyNemovitosti",
  "rustNajemneho",
  "rustHodnotyExpected",
  "rustNajemnehoExpected",
];

/**
 * Serialize state to URL params
 */
export function serializeStateToUrl(
  state: CalculatorState,
  defaultState: CalculatorState
): URLSearchParams {
  const params = new URLSearchParams();

  // Check if city or apartment differ from defaults
  const cityChanged = state.selectedCity !== defaultState.selectedCity;
  const apartmentChanged = state.selectedApartmentSize !== defaultState.selectedApartmentSize;

  for (const field of URL_SYNC_FIELDS) {
    const currentValue = state[field];
    const defaultValue = defaultState[field];

    // Always serialize city-dependent fields if city or apartment changed
    const forceSerialized = 
      (cityChanged || apartmentChanged) && 
      CITY_DEPENDENT_FIELDS.includes(field) &&
      currentValue !== null;

    // Include if value differs from default OR it's a city-dependent field that must be preserved
    if ((currentValue !== defaultValue && currentValue !== null) || forceSerialized) {
      const alias = PARAM_ALIASES[field];
      params.set(alias, String(currentValue));
    }
  }

  return params;
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(state: CalculatorState, defaultState: CalculatorState): string {
  const params = serializeStateToUrl(state, defaultState);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://kamspenezi.cz";
  
  if (params.toString()) {
    return `${baseUrl}/?${params.toString()}`;
  }
  return baseUrl;
}

/**
 * Hook to sync calculator state with URL
 */
export function useUrlState(
  state: CalculatorState,
  defaultState: CalculatorState,
  updateState: (updates: Partial<CalculatorState>) => void
) {
  const hasInitializedFromUrl = useRef(false);
  const isUpdatingFromUrl = useRef(false);

  // On mount, parse URL and apply to state
  useEffect(() => {
    if (hasInitializedFromUrl.current) return;
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.toString()) {
      const urlState = parseUrlState(searchParams);
      if (Object.keys(urlState).length > 0) {
        isUpdatingFromUrl.current = true;
        updateState(urlState);
        setTimeout(() => {
          isUpdatingFromUrl.current = false;
        }, 100);
      }
    }
    hasInitializedFromUrl.current = true;
  }, [updateState]);

  // Update URL when state changes (debounced)
  useEffect(() => {
    if (!hasInitializedFromUrl.current) return;
    if (isUpdatingFromUrl.current) return;
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      const params = serializeStateToUrl(state, defaultState);
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      // Update URL without triggering navigation
      window.history.replaceState(null, "", newUrl);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state, defaultState]);

  // Copy share URL to clipboard
  const copyShareUrl = useCallback(async (): Promise<boolean> => {
    const url = generateShareUrl(state, defaultState);
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        return true;
      } catch {
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [state, defaultState]);

  return {
    shareUrl: generateShareUrl(state, defaultState),
    copyShareUrl,
  };
}

