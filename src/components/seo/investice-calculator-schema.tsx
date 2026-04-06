/**
 * SoftwareApplication Schema for the Investment Apartment Calculator (/investice)
 */
export function InvesticeCalculatorSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kalkulačka investičního bytu",
    "alternateName": "Investiční byt vs. akciový fond kalkulačka",
    "description": "Porovnej investiční byt na hypotéku s akciovým ETF fondem. Kalkulačka spočítá čisté jmění za 30 let včetně daní, odpisů a inflace.",
    "url": "https://kamspenezi.cz/investice",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK",
    },
    "featureList": [
      "Porovnání investičního bytu a akciového fondu ETF",
      "Výpočet čisté hodnoty majetku po 30 letech",
      "Simulace odpisů a daňové optimalizace",
      "Obsazenost a výpočet čistého cashflow",
      "Data pro všech 13 českých krajských měst",
      "Zdarma bez registrace",
    ],
    "screenshot": "https://kamspenezi.cz/og/og-investice.png",
    "author": {
      "@type": "Person",
      "name": "Michal Humaj",
    },
    "provider": {
      "@type": "Organization",
      "name": "kamspenezi.cz",
    },
    "inLanguage": "cs",
    "isFamilyFriendly": true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
