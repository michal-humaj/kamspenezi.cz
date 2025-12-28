"use client";

import { useEffect } from "react";
import { trackTrustPageEvent } from "@/lib/analytics";

// Extend Window interface for Crisp
declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
    CRISP_RUNTIME_CONFIG: {
      color_theme?: string;
      locale?: string;
    };
  }
}

const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

// Brand color from design manual: Forest Green (Scenario B - growth/wealth)
const CRISP_BRAND_COLOR = "#2F5C45";

/**
 * Crisp.chat integration component
 * 
 * To enable Crisp:
 * 1. Create account at https://crisp.chat
 * 2. Get your Website ID from Settings > Website Settings > Setup
 * 3. Add NEXT_PUBLIC_CRISP_WEBSITE_ID to your .env.local
 * 
 * Crisp handles:
 * - Lazy loading (only loads when needed)
 * - Mobile responsive chat bubble
 * - Offline messages
 * - Chat history persistence
 * 
 * Brand customization:
 * - Uses Forest Green (#2F5C45) to match design manual
 */
export function CrispChat() {
  useEffect(() => {
    // Don't initialize if no website ID
    if (!CRISP_WEBSITE_ID) {
      console.warn("Crisp: NEXT_PUBLIC_CRISP_WEBSITE_ID not set");
      return;
    }

    // Set runtime config BEFORE loading script (sets brand color)
    window.CRISP_RUNTIME_CONFIG = {
      color_theme: CRISP_BRAND_COLOR,
      locale: "cs",
    };

    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    // Load Crisp script
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    // Track when chat is opened and apply additional styling
    const checkCrispReady = setInterval(() => {
      if (window.$crisp && typeof window.$crisp.push === "function") {
        // Set color theme via API as well (backup)
        window.$crisp.push(["config", "color:theme", [CRISP_BRAND_COLOR]]);
        
        // Track chat opens
        window.$crisp.push(["on", "chat:opened", () => {
          trackTrustPageEvent("start_crisp_chat", "chat_opened");
        }]);
        clearInterval(checkCrispReady);
      }
    }, 500);

    // Cleanup
    return () => {
      clearInterval(checkCrispReady);
      // Note: Crisp doesn't provide a clean unload method
    };
  }, []);

  return null;
}

/**
 * Hook to programmatically open Crisp chat
 */
export function useCrispChat() {
  const openChat = () => {
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
      trackTrustPageEvent("start_crisp_chat", "programmatic_open");
    }
  };

  const sendMessage = (message: string) => {
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(["do", "message:send", ["text", message]]);
    }
  };

  return { openChat, sendMessage };
}

