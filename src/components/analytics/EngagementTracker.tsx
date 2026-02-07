'use client';

import { useCumulativeEngagement } from '@/hooks/useCumulativeEngagement';

/**
 * Thin client wrapper that activates cumulative engagement tracking.
 * Renders nothing — purely a side-effect component.
 */
export function EngagementTracker() {
  useCumulativeEngagement();
  return null;
}
