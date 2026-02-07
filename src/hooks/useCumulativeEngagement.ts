'use client';

import { useEffect, useRef } from 'react';
import { isInternalUser } from '@/lib/analytics';

const LS_KEY_SECONDS = 'cumulative_seconds';
const LS_KEY_FIRED = 'high_intent_fired';
const THRESHOLD_SECONDS = 600; // 10 minutes

/**
 * Tracks cumulative time spent on the site across sessions using localStorage.
 * Fires a GA4 `high_intent_user` event exactly once when the user crosses
 * 10 minutes (600 seconds) of total engagement.
 *
 * Respects the internal-user exclusion from analytics.ts so the event is
 * never fired for developers / testers.
 */
export function useCumulativeEngagement() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Bail out if localStorage is not available (SSR guard)
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    // Don't track internal users (localhost, dev flag)
    if (isInternalUser()) {
      return;
    }

    // If the event has already been fired in a previous session, do nothing
    if (localStorage.getItem(LS_KEY_FIRED) === '1') {
      return;
    }

    intervalRef.current = setInterval(() => {
      try {
        const current = parseInt(localStorage.getItem(LS_KEY_SECONDS) || '0', 10);
        const next = current + 1;
        localStorage.setItem(LS_KEY_SECONDS, String(next));

        if (next === THRESHOLD_SECONDS) {
          // Mark as fired so we never fire again
          localStorage.setItem(LS_KEY_FIRED, '1');

          // Fire GA4 event
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'high_intent_user', {
              engagement_type: 'cumulative_10m',
            });
          }

          if (process.env.NODE_ENV === 'development') {
            console.log(
              '[Engagement] high_intent_user fired — cumulative 10 min reached'
            );
          }

          // Stop the interval — no more work to do
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch {
        // localStorage can throw in private browsing — silently ignore
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
}
