# Google Analytics Setup

## 1. Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

## 2. Add Environment Variable

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## 3. Deploy to Vercel

Add the environment variable in Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX`
   - **Environment**: Production, Preview, Development

## 4. Exclude Your Own Visits

### Option A: Set Internal User Flag (Recommended)

Open browser console on your site and run:

```javascript
localStorage.setItem('kamspenezi-internal', 'true');
```

This will exclude your visits from analytics.

### Option B: Install Browser Extension

Install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)

### Option C: Filter by IP in GA4

1. Go to GA4 Admin → Data filters
2. Create filter for "Internal traffic"
3. Add your IP address
4. Set filter to "Active"

## 5. Event Tracking

The following events are automatically tracked:

- **Page views**: All page navigation
- Custom events can be added using the `trackCalculatorEvent` function

### Example: Track Calculator Events

```typescript
import { trackCalculatorEvent } from '@/lib/analytics';

// Track when user selects a city
trackCalculatorEvent('city_selected', 'Praha');

// Track when results are calculated
trackCalculatorEvent('results_calculated', 'fixed_mode');
```

## Features Implemented

✅ Page view tracking  
✅ Client-side navigation tracking  
✅ Internal user exclusion (localStorage flag)  
✅ Localhost exclusion  
✅ IP anonymization  
✅ GDPR-friendly cookie settings  
✅ No tracking without explicit consent (can be extended)

## Privacy Notes

- IP addresses are anonymized (`anonymize_ip: true`)
- Cookies use `SameSite=None;Secure` flags
- Internal users are automatically excluded
- No PII (personally identifiable information) is collected

