"use client";

import { useCallback, useEffect, useRef } from "react";
import type { InvesticeCalculatorState } from "@/app/investice/page";

/**
 * Fields to sync to URL for the Investice calculator.
 */
const URL_SYNC_FIELDS: (keyof InvesticeCalculatorState)[] = [
  "selectedCity",
  "selectedApartmentSize",
  "kupniCena",
  "vlastniZdroje",
  "urokovaSazbaHypoteky",
  "najemne",
  "obsazenost",
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
  // Expected values
  "vynosInvesticeExpected",
  "rustHodnotyExpected",
  "rustNajemnehoExpected",
  "urokovaSazbaHypotekyExpected",
];

/**
 * Short parameter names for cleaner URLs.
 * Prefix "i_" avoids collisions with Bydlení params.
 */
const PARAM_ALIASES: Record<string, string> = {
  selectedCity: "i_c",
  selectedApartmentSize: "i_a",
  kupniCena: "i_kc",
  vlastniZdroje: "i_vz",
  urokovaSazbaHypoteky: "i_us",
  najemne: "i_n",
  obsazenost: "i_ob",
  prispevekRodicu: "i_pr",
  zarizeniNemovitosti: "i_zn",
  rustHodnotyNemovitosti: "i_rh",
  fondOprav: "i_fo",
  pojisteniNemovitosti: "i_pn",
  danZNemovitosti: "i_dn",
  nakladyUdrzba: "i_nu",
  ocekavanaInflace: "i_oi",
  rustNajemneho: "i_rn",
  pasmoDane: "i_pd",
  vynosInvesticeExpected: "i_vie",
  rustHodnotyExpected: "i_rhe",
  rustNajemnehoExpected: "i_rne",
  urokovaSazbaHypotekyExpected: "i_use",
};

const REVERSE_ALIASES: Record<string, keyof InvesticeCalculatorState> = Object.fromEntries(
  Object.entries(PARAM_ALIASES).map(([k, v]) => [v, k as keyof InvesticeCalculatorState])
);

function parseUrlState(searchParams: URLSearchParams): Partial<InvesticeCalculatorState> {
  const state: Partial<InvesticeCalculatorState> = {};

  for (const [alias, value] of searchParams.entries()) {
    const fieldName = REVERSE_ALIASES[alias];
    if (!fieldName) continue;

    if (fieldName === "selectedCity" || fieldName === "selectedApartmentSize") {
      (state as Record<string, string | null>)[fieldName] = value || null;
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        (state as Record<string, number>)[fieldName] = numValue;
      }
    }
  }

  return state;
}

const CITY_DEPENDENT_FIELDS: (keyof InvesticeCalculatorState)[] = [
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

function serializeStateToUrl(
  state: InvesticeCalculatorState,
  defaultState: InvesticeCalculatorState
): URLSearchParams {
  const params = new URLSearchParams();

  const cityChanged = state.selectedCity !== defaultState.selectedCity;
  const apartmentChanged = state.selectedApartmentSize !== defaultState.selectedApartmentSize;

  for (const field of URL_SYNC_FIELDS) {
    const currentValue = state[field];
    const defaultValue = defaultState[field];

    const forceSerialized =
      (cityChanged || apartmentChanged) &&
      CITY_DEPENDENT_FIELDS.includes(field) &&
      currentValue !== null;

    if ((currentValue !== defaultValue && currentValue !== null) || forceSerialized) {
      const alias = PARAM_ALIASES[field];
      params.set(alias, String(currentValue));
    }
  }

  return params;
}

function generateShareUrl(state: InvesticeCalculatorState, defaultState: InvesticeCalculatorState): string {
  const params = serializeStateToUrl(state, defaultState);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://kamspenezi.cz";

  if (params.toString()) {
    return `${baseUrl}/investice?${params.toString()}`;
  }
  return `${baseUrl}/investice`;
}

export function useInvesticeUrlState(
  state: InvesticeCalculatorState,
  defaultState: InvesticeCalculatorState,
  updateState: (updates: Partial<InvesticeCalculatorState>) => void
) {
  const hasInitializedFromUrl = useRef(false);
  const isUpdatingFromUrl = useRef(false);

  // On mount, parse URL and apply
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

  // Update URL on state change (debounced)
  useEffect(() => {
    if (!hasInitializedFromUrl.current) return;
    if (isUpdatingFromUrl.current) return;
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      const params = serializeStateToUrl(state, defaultState);
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState(null, "", newUrl);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state, defaultState]);

  const copyShareUrl = useCallback(async (): Promise<boolean> => {
    const url = generateShareUrl(state, defaultState);
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
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
