/**
 * Google Analytics utilities
 * Handles GA4 tracking with internal user exclusion
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if current user should be excluded from analytics
 */
export const isInternalUser = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check localStorage flag (set this in console to exclude yourself)
  if (localStorage.getItem('kamspenezi-internal') === 'true') {
    return true;
  }

  // Exclude localhost/development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return true;
  }

  return false;
};

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA Measurement ID not found');
    return;
  }

  if (isInternalUser()) {
    console.log('Internal user detected - GA disabled');
    return;
  }

  // GA will be initialized via Script tag in layout
};

/**
 * Track page view
 */
export const pageview = (url: string) => {
  if (isInternalUser()) return;
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom event
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (isInternalUser()) return;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track calculator interaction
 */
export const trackCalculatorEvent = (action: string, label?: string) => {
  event({
    action,
    category: 'Calculator',
    label,
  });
};

