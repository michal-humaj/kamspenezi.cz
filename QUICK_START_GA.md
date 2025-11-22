# Quick Start: Google Analytics Setup

## 🚀 To Enable Google Analytics on Production:

### 1. Add Environment Variable in Vercel

1. Go to your [Vercel project](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: Your GA4 Measurement ID (e.g., `G-ABC123XYZ`)
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development

4. Redeploy your site (or it will use the new variable on next deployment)

### 2. Get Your GA4 Measurement ID

If you don't have one yet:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (bottom left)
3. Under **Property**, click **Data Streams**
4. Click on your web stream (or create a new one with URL: `https://kamspenezi.cz`)
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Exclude Your Own Visits

**Open your browser console on kamspenezi.cz and run:**

```javascript
localStorage.setItem('kamspenezi-internal', 'true');
```

This will prevent YOUR visits from being tracked in analytics. ✅

**OR install the official [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout)**

---

## ✅ What's Already Implemented:

- ✅ GA4 page view tracking (all pages)
- ✅ Client-side navigation tracking (Next.js App Router)
- ✅ Internal user exclusion (via localStorage flag)
- ✅ Localhost automatic exclusion
- ✅ IP anonymization (GDPR-friendly)
- ✅ Proper cookie settings
- ✅ TypeScript support
- ✅ Build succeeds

---

## 📊 Optional: Add Custom Event Tracking

You can track specific user actions (e.g., calculator interactions):

```typescript
import { trackCalculatorEvent } from '@/lib/analytics';

// Example: Track when user selects a city
trackCalculatorEvent('city_selected', 'Praha');

// Example: Track calculation completion
trackCalculatorEvent('results_calculated', 'fixed_mode');
```

---

## 🔍 Testing

### Local Testing:
```bash
npm run dev
```

Open http://localhost:3000 - you should see in console:
```
Internal user detected - GA disabled
```

(Because localhost is automatically excluded)

### Production Testing:

1. Deploy to Vercel with the environment variable set
2. Visit your site in an incognito window
3. Check GA4 real-time reports (Admin → Reports → Realtime)
4. You should see your visit!

---

## 🛡️ Privacy & GDPR

- ✅ IP addresses are anonymized
- ✅ No PII (personally identifiable information) collected
- ✅ Cookies use secure flags
- ✅ Can be easily extended with cookie consent banner if needed

---

**That's it! Your analytics are ready to go.** 🎉

