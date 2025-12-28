'use client';

import { useEffect, Suspense, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_MEASUREMENT_ID, pageview, isInternalUser } from '@/lib/analytics';

// Check if we're in development mode (works on both server and client)
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (!pathname) return;
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only render GA if:
    // 1. We have a measurement ID
    // 2. We're NOT in development mode
    // 3. User is NOT an internal user (localhost, localStorage flag)
    if (GA_MEASUREMENT_ID && !IS_DEVELOPMENT && !isInternalUser()) {
      setShouldRender(true);
    }
  }, []);

  // Don't render anything until client-side check completes
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
      <Script
        id="gtag-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}

